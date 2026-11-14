#!/usr/bin/env bash
#
# Build the site and deploy it to S3 + invalidate CloudFront.
#
# Hosting model (Option B): private S3 bucket behind CloudFront (OAC).
# The site is served at a subdomain root; CloudFront's Origin Path points at
# the "portfolio" prefix, so Vite's base stays "/" and no path rewriting is
# needed in the app.
#
# Config can be overridden with environment variables, or by creating a
# gitignored scripts/deploy.config.local (see DEPLOY.md). At minimum you must
# provide CLOUDFRONT_DISTRIBUTION_ID.

set -euo pipefail

# ---- Config (env overrides win) --------------------------------------------
BUCKET="${DEPLOY_BUCKET:-kylewillett.com}"
PREFIX="${DEPLOY_PREFIX:-portfolio}"
REGION="${DEPLOY_REGION:-us-east-1}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Load gitignored local overrides (e.g. CLOUDFRONT_DISTRIBUTION_ID) if present.
if [ -f "$SCRIPT_DIR/deploy.config.local" ]; then
  # shellcheck disable=SC1091
  source "$SCRIPT_DIR/deploy.config.local"
fi

# ---- Preconditions ---------------------------------------------------------
command -v aws >/dev/null 2>&1 || {
  echo "error: aws CLI not found. Install and configure it (aws configure)." >&2
  exit 1
}

: "${CLOUDFRONT_DISTRIBUTION_ID:?Set CLOUDFRONT_DISTRIBUTION_ID (env var or scripts/deploy.config.local)}"

DEST="s3://${BUCKET}/${PREFIX}"

cd "$ROOT_DIR"

# ---- Build -----------------------------------------------------------------
echo "==> Building (npm run build)..."
npm run build

# ---- Upload ----------------------------------------------------------------
# 1) Everything except HTML pages and PDFs: content-hashed filenames, cache forever.
#    --delete removes stale objects (old bundles) under the prefix.
echo "==> Syncing assets to ${DEST}/ (immutable, 1y cache)..."
aws s3 sync dist/ "${DEST}/" \
  --region "$REGION" \
  --delete \
  --exclude "*.html" \
  --exclude "*.pdf" \
  --cache-control "public, max-age=31536000, immutable"

# 2) PDFs (the resume) keep a fixed filename but get updated, so browsers must
#    revalidate instead of holding a stale copy for a year.
echo "==> Syncing PDFs (no-cache)..."
aws s3 sync dist/ "${DEST}/" \
  --region "$REGION" \
  --exclude "*" \
  --include "*.pdf" \
  --cache-control "no-cache"

# 3) HTML pages (index.html, and static pages from public/ such as
#    privacy/channel-analytics.html): fixed names, so no caching; a new deploy
#    is picked up immediately.
echo "==> Syncing HTML pages (no-cache)..."
aws s3 sync dist/ "${DEST}/" \
  --region "$REGION" \
  --delete \
  --exclude "*" \
  --include "*.html" \
  --cache-control "no-cache" \
  --content-type "text/html"

# ---- Invalidate CloudFront -------------------------------------------------
# Viewers hit the subdomain root, so the viewer-facing paths are "/*".
echo "==> Invalidating CloudFront (${CLOUDFRONT_DISTRIBUTION_ID})..."
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths "/*" \
  --query 'Invalidation.{Id:Id,Status:Status}' \
  --output table

echo "==> Done. New version will be live once the invalidation completes (usually <1 min)."
