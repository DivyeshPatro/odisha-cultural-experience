# Asset folders

These are intentionally empty. Every illustration on this site is drawn as inline SVG in
`src/components/Plates.tsx`, `src/components/Motifs.tsx` and the section components —
there are no raster assets to ship, nothing to lazy-load and nothing that can 404.

If you add photographs later, drop them here and read
[README → Assets and attribution](../../README.md#8-assets-and-attribution) first.
Two things to get right:

1. CC-BY and CC-BY-SA both require visible credit. The footer currently states that no
   image attribution is required — adding a photo makes that statement false, so update
   `src/sections/Footer.tsx` at the same time.
2. Verify the *identification* of freedom-fighter portraits, not just the licence.

Recommended: WebP or AVIF, max 1600px on the long edge, and always set
`loading="lazy" decoding="async"` plus explicit `width`/`height` to avoid layout shift.
