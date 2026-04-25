# Quick Copy Editing Guide

1. Open the `main` variant files:
   - `src/content/copy/main/hero.md`
   - `src/content/copy/main/about.md`
   - `src/content/copy/main/commitspace.md`
2. Edit frontmatter for labels/links and Markdown body for prose.
3. Save and run `npm run dev` (or `npm run build`) to confirm.

## Create a Variant (A/B Copy)

1. Duplicate `src/content/copy/main/` as `src/content/copy/variant-b/`.
2. Change only the copy you want to test in `variant-b/*.md`.
3. Build with `COPY_VARIANT=variant-b npm run build` (or set `COPY_VARIANT` in deploy env).

## Deploy

Commit and push. The deployed site will use whichever `COPY_VARIANT` is set in your CI/deploy environment (defaults to `main`).
