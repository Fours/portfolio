# AGENTS.md

Personal portfolio site for Kyle Willett. Single-page React app, built with Vite and TypeScript. No backend — it's a static site.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # Type-check (tsc -b) then build to dist/
npm run preview  # Serve the production build locally
```

There is no linter or test suite. `npm run build` is the gate — it fails on type errors and on unused locals/parameters (`noUnusedLocals`/`noUnusedParameters` are on). Run it before calling a change done.

## Layout

- `src/main.tsx` — entry point, mounts `<App>` in React StrictMode.
- `src/App.tsx` — composes the page by stacking section components in order. Add or reorder sections here.
- `src/components/` — one component per section (`Hero`, `About`, `Systems`, `Experience`, `Skills`, `Education`, `Contact`, etc.), plus shared pieces (`Nav`, `Footer`, `SectionHeading`, `Icons`). Default exports, named after the file.
- `src/data/resume.ts` — all page content (nav links, highlights, experience, skills, systems diagram data) as typed exports. **Edit copy and data here, not in the components.** Components read from this file.
- `src/index.css` — the single global stylesheet. All styling lives here.
- `index.html` — document shell: meta tags, Google Fonts (Inter + JetBrains Mono), `#root`.
- `design/` — source design assets, gitignored. Not part of the build.

## Conventions

- **Styling is plain CSS**, not CSS-in-JS or a utility framework. Components use string `className`s that map to selectors in `src/index.css`. When adding a component, add its styles to that file.
- **Design tokens** are CSS custom properties on `:root` at the top of `index.css` (`--accent`, `--bg`, `--text`, `--line-*`, fonts, etc.). The site is dark-mode only (`color-scheme: dark`). Reuse existing tokens rather than hardcoding colors.
- A section component typically renders `<section id="..." className="section container">` and uses `<SectionHeading>` for its title. Follow the existing sections as the template.
- Section `id`s are anchor targets for the nav — if you rename one, update `navLinks` in `resume.ts` to match.
- TypeScript is strict. Type new data shapes in `resume.ts` (see the `ArchNode` / `ArchEdge` pattern).

## Systems diagram

The Systems section is a hand-built inline SVG of a fictional event-driven platform, rendered by `Systems.tsx` from the `arch*` exports in `resume.ts`.

- **Coordinates are hand-placed** in viewBox units (`archViewBox`), not auto-laid-out. Moving a node means moving its connected edges and labels too, and growing the layout means bumping `archViewBox`. The SVG scales to 100% width; there is no separate mobile layout.
- **Edges** are polylines through `points`. `kind: 'request'` draws a solid line, `kind: 'event'` a dashed, animated one; `twoWay` adds an arrowhead at the start. Event dashes flow from the first point to the last, so the point order sets the animation direction.
- **The API gateway's routes are nested elbows** (the farthest service uses the highest track) so they don't cross. Keep that ordering if you add a service. They stop 12px above each service, at the top of its `cluster` card stack, so the arrowheads stay visible.
- **Outline color** comes from a node's `tone` (`gateway` yellow, `service` orange, `store` purple) via the `.arch-node.is-*` rules and the `--yellow` / `--orange` / `--purple` tokens.

## Hero background

`NeuralNet.tsx` draws the animated node-and-edge backdrop on a `<canvas>` behind the hero (`.hero-shell` / `.neural-net` in `index.css`). Node placement comes from a density field in `buildDensity`: a top band, a right column that dips behind the photo, a left fringe, a halo around the photo, and a quiet pocket behind the copy (measured from refs that `Hero` passes in). Adjust that function to reshape the frame; the palette is `PALETTE` at the top of the file. It rebuilds on resize, pauses offscreen, and renders one static frame under `prefers-reduced-motion`.

## Notes

- `design/` is intentionally gitignored (see `.gitignore`); don't commit it.
- No routing, state management, or data fetching — it's a static composed page.
