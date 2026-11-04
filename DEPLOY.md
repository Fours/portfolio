# Deploying

The site is a static build (`dist/`) hosted on **S3 behind CloudFront**:

- **Bucket:** `kylewillett.com`, objects under the `portfolio/` prefix (`s3://kylewillett.com/portfolio/`)
- **Region:** `us-east-1`
- **Served at a subdomain root** (e.g. `portfolio.kylewillett.com`). CloudFront's
  **Origin Path** is set to `/portfolio`, so the app sees itself at `/` — that's
  why Vite's `base` stays the default `/` and no path rewriting is needed.
- Bucket stays **private**; CloudFront reads it via an **Origin Access Control (OAC)**.

## One-time setup

1. **Install & configure the AWS CLI** with credentials that can deploy:
   ```bash
   aws configure
   ```
   The credentials need: `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` on the
   bucket, and `cloudfront:CreateInvalidation` on the distribution.

2. **Provide your CloudFront distribution ID.** Copy the example config and fill it in
   (the real file is gitignored, so the ID never gets committed):
   ```bash
   cp scripts/deploy.config.local.example scripts/deploy.config.local
   # edit scripts/deploy.config.local and set CLOUDFRONT_DISTRIBUTION_ID
   ```
   Alternatively, export it in your shell instead of using the file:
   ```bash
   export CLOUDFRONT_DISTRIBUTION_ID=EXXXXXXXXXXXXX
   ```

## Deploy

```bash
npm run deploy
```

That runs [`scripts/deploy.sh`](scripts/deploy.sh), which:

1. **Builds** the site (`npm run build` → `dist/`).
2. **Syncs assets** to `s3://kylewillett.com/portfolio/` with a 1-year immutable
   cache. Filenames are content-hashed, so they can be cached forever; `--delete`
   prunes old bundles.
3. **Uploads `index.html`** with `Cache-Control: no-cache` so new deploys are
   picked up immediately (it's the one file whose name never changes).
4. **Invalidates CloudFront** (`/*`) so edge caches serve the new `index.html`.

## Config overrides

The script reads these from the environment or `scripts/deploy.config.local`:

| Variable | Default | Purpose |
| --- | --- | --- |
| `CLOUDFRONT_DISTRIBUTION_ID` | *(required)* | Distribution to invalidate |
| `DEPLOY_BUCKET` | `kylewillett.com` | Target bucket |
| `DEPLOY_PREFIX` | `portfolio` | Key prefix within the bucket |
| `DEPLOY_REGION` | `us-east-1` | Bucket region |

## Notes

- **If you ever serve the site under a URL path** (e.g. `kylewillett.com/portfolio/`
  instead of a subdomain root), set `base: '/portfolio/'` in `vite.config.ts` and
  rebuild — otherwise the hashed assets will 404.
- The CloudFront invalidation uses `/*`. If you want to minimize invalidation cost,
  you can narrow it to `/index.html` since the hashed assets are immutable and never
  need invalidating.
