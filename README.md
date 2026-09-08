# ODISHA — An Interactive Digital Cultural Exhibition

**Independence Day 2026 · built to live behind a QR code on an office bay wall.**

Twelve chapters that take someone who has never heard of Odisha from *"where is that?"*
to *"why did nobody tell me about this?"* — via a Konark wheel you can spin, a map you
can pick apart, three chariots drawn to their published dimensions, and a disaster-
management story told honestly enough to include the death tolls.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build locally
```

---

## Table of contents

1. [What this is](#1-what-this-is)
2. [The three decisions that shaped it](#2-the-three-decisions-that-shaped-it)
3. [Project structure](#3-project-structure)
4. [Running it](#4-running-it)
5. [Deploying to GitHub Pages](#5-deploying-to-github-pages)
6. [Content architecture — how to edit anything](#6-content-architecture--how-to-edit-anything)
7. [Fact-checking: what was verified, corrected and flagged](#7-fact-checking-what-was-verified-corrected-and-flagged)
8. [Assets and attribution](#8-assets-and-attribution)
9. [Performance](#9-performance)
10. [Accessibility](#10-accessibility)
11. [The office bay — QR board copy and the ₹10 note](#11-the-office-bay--qr-board-copy-and-the-10-note)
12. [Known limitations](#12-known-limitations)
13. [Future improvements](#13-future-improvements)

---

## 1. What this is

A single-page, static, dependency-light React site. No backend, no database, no API
keys, no analytics, no cookies. It builds to a `dist/` folder you can drop on GitHub
Pages, and it will still work in five years because there is nothing in it that can go
down.

**The narrative route** — the site is a walk, not a stack of cards:

| # | Chapter | What happens |
|---|---------|--------------|
| — | Hero | The outline of Odisha draws itself over a slowly turning Konark wheel |
| I | Odisha in 60 Seconds | Animated figures + four "you did not know this" hooks |
| II | **The Wheel** | Drag a Konark chakra to choose a chapter |
| III | The Land | Interactive SVG map: 12 places, rivers, Chilika |
| IV | Stone | 8 monuments, each opening a detail sheet |
| V | Jagannath | **Pull the rope** and haul a chariot down the Grand Road |
| VI | Art | Odissi, Pattachitra, Saura, bandha, palm leaf, silver filigree |
| VII | Taste | A rotating carousel of five dishes |
| VIII | Heroes | Timeline from the Paika rebellion of 1817 to Parbati Giri |
| IX | Wild | An ocean you can **splash**, with an Olive Ridley you can tap |
| X | Resilience | 1999 → Fani, with the death tolls stated first |
| XI | Odisha Now | Missiles, hockey, ore, and the ₹10 note |
| XII | One India | Real map of India with Odisha lit, and the closing statement |

Running alongside all of it: a **Konark wheel that rolls as you scroll**, down the right
margin on desktop and along the bottom edge on a phone. Drag it to scrub the page.

And a **Present** mode for a monitor in the bay: it measures each chapter into viewport-
sized stops, includes the opening hero, supports fullscreen and keyboard controls, and
can loop automatically every 16 seconds. Manual scrolling or touch pauses the tour.

### The four things people actually touch

| Interaction | Where | What makes it more than an animation |
|---|---|---|
| **Spin the chakra** | II | Eight major spokes = the eight praharas of a day, so the wheel *is* the table of contents. Drag has inertia and snaps to a spoke. |
| **Roll the wheel** | everywhere | One full turn per screenful scrolled, so you can see it rolling. Doubles as a draggable scrubber. |
| **Pull the rath** | V | **Tap** and six devotees heave it forward a stretch; **drag** and it moves strictly 1:1 with your hand — no easing, no momentum, because the one thing everyone says about these chariots is how hard they are to move. Wheel rotation is derived from distance, so Nandighosa's sixteen wheels and Darpadalana's twelve turn at the same rate. |
| **Splash the water** | IX | Rings spread on an ellipse (it is a water surface seen at an angle, not a flat disc) and droplets arc out and fall back under gravity. |

---

## 2. The three decisions that shaped it

These are the calls worth knowing about before you change anything.

### Mobile is the primary target, and it was measured

Most people meet this by scanning a code with a phone, so the phone layout is the one
that had to be right. It was not, at first — it was designed at desktop width and merely
*worked* at 390px. Measuring it found:

| | before | after |
|---|---|---|
| Whole exhibition on a 390px phone | 35,800px / **42 screenfuls** | 27,700px / **33 screenfuls** |
| Odisha in 60 Seconds | 3.2 screens | **1.2** |
| Art | 3.7 screens | **2.2** |
| Wild | 3.6 screens | **1.3** |

What changed: the type scale's *floor* came down (desktop is untouched — a one-sentence
lede was running to six lines); section rhythm tightened; and two chapters that were
stacks of full-width cards became **horizontal swipe rails**, which was chosen over a
line-clamp because a rail hides nothing. The six art cards went side-by-side — plate
left, text right — turning ~560px-tall cards into ~150px ones.

### No Three.js

The brief allowed 3D "only where justified". A procedurally generated 3D Konark wheel
would have been a torus with spokes — visibly worse than the real thing, and 150 KB of
library to ship over a phone connection to render it.

Instead the wheel is **hand-drawn SVG built to Konark's actual anatomy** — eight major
spokes, eight minor ones between them, twenty-four rim medallions, a carved bead on each
major spoke, an eight-petal lotus hub — spun with pointer drag and inertia through a
single CSS transform. Depth comes from drawing the whole carving twice, once in shadow
offset two units down. It costs about 8 KB and holds 60fps on a phone.

Depth elsewhere is CSS 3D (`perspective` on the food carousel) and layered parallax.

### Zero runtime dependencies except React

No Tailwind — it would have made this look like every other site built this month. No
Framer Motion — `IntersectionObserver` plus CSS transitions does everything needed here.
No icon library — the eleven pictograms are drawn in `Glyph.tsx`.

**Result: 95 KB gzipped of JavaScript, ~45 KB of which is React itself.**

### Every image is a drawn SVG

There is not a single photograph, stock asset or hotlinked image on this site. The
Jagannath triad, the Odissi dancer in her niche, the palm-leaf folios, the bandha
diamonds, the Olive Ridley, the ₹10 note, the chariots — all drawn as SVG for this
project.

The one exception is **map geometry**. The Odisha and India boundaries were originally
hand-drawn from latitude/longitude anchors, and the result was recognisably *not*
Odisha — a lumpy pentagon that would have failed the "someone from Odisha looks at
this" test immediately. They are now derived from real boundary data (see
[§6](#regenerating-the-map-geometry)) and credited under CC-BY.

That is not only a licensing dodge. It means: nothing to lazy-load, nothing that can
404, nothing that looks like an AI-generated photograph, and a visual language that is
consistently in Odisha's own idiom rather than a stock library's. It also means the
whole site is legible at any zoom on any screen.

[Section 8](#8-assets-and-attribution) explains where to add real photographs if you
want them.

---

## 3. Project structure

```
odisha-cultural-experience/
├── .github/workflows/deploy.yml   # GitHub Pages CI
├── index.html                     # meta, fonts, JSON-LD, no-JS fallback
├── vite.config.ts                 # base: './' — works at any URL depth
├── tsconfig*.json
├── public/
│   └── favicon.svg                # a Konark wheel, drawn
└── src/
    ├── main.tsx
    ├── App.tsx                    # the chapter running order
    ├── data/                      # ← ALL CONTENT LIVES HERE
    │   ├── sources.ts             # source registry + Claim/Confidence types
    │   ├── facts.ts               # "Odisha in 60 seconds"
    │   ├── wheel.ts               # the 8 spokes + the wheel's own essay
    │   ├── mapPlaces.ts           # Odisha outline, rivers, Chilika, 12 pins
    │   ├── india.ts               # India outline + Odisha inside it + threads
    │   ├── heritage.ts            # 8 monuments + Jagannath/Rath Yatra
    │   ├── art.ts                 # 6 art forms
    │   ├── food.ts                # 5 dishes
    │   ├── freedomFighters.ts     # 6 figures
    │   ├── nature.ts              # 7 ecosystems + the turtle story
    │   ├── resilience.ts          # the cyclone timeline
    │   ├── modernOdisha.ts        # science, hockey, minerals, governance
    │   └── nav.ts                 # chapter list
    ├── components/
    │   ├── Nav.tsx                # top bar, progress rail, chapter overlay
    │   ├── KonarkWheel.tsx        # the chakra artwork
    │   ├── Plates.tsx             # the art + food illustration plates
    │   ├── Motifs.tsx             # frieze, lotus, temple skyline, saura, bandha
    │   ├── Glyph.tsx              # 11 line pictograms
    │   ├── Sheet.tsx              # focus-trapped bottom sheet / dialog
    │   ├── SourceTag.tsx          # the credibility chip
    │   ├── SectionHeader.tsx      # numeral + eyebrow + title + lede
    │   ├── Counter.tsx            # animated figure, a11y-safe
    │   └── Reveal.tsx             # scroll-triggered fade
    ├── sections/                  # one file per chapter (14)
    ├── hooks/
    │   ├── useInView.ts
    │   ├── useActiveSection.ts
    │   ├── useReducedMotion.ts
    │   ├── useScrollLock.ts
    │   └── useAmbience.ts         # synthesised sound, no audio files
    ├── utils/scroll.ts
    └── styles/
        ├── tokens.css             # the palette, derived from real materials
        ├── global.css             # reset, type, layout, grain
        ├── components.css
        └── sections.css
```

---

## 4. Running it

Requires Node 18+ (built and tested on Node 24).

```bash
npm install
npm run dev        # dev server with HMR
npm run build      # typecheck (tsc -b) then Vite production build
npm run preview    # serve dist/ locally to check the real build
npm run typecheck  # types only
```

`npm run build` runs `tsc -b` first, so **a type error fails the build**. That is
deliberate.

---

## 5. Deploying to GitHub Pages

`vite.config.ts` sets `base: './'`, so the built site works unchanged at
`https://user.github.io/`, at `https://user.github.io/repo-name/`, in a subfolder, or
opened off disk. **You do not need to edit a base path.** There is no client-side
router, so there is no SPA 404 fallback to configure either.

### Option A — GitHub Actions (recommended)

`.github/workflows/deploy.yml` is already in the repo.

1. Push to `main`.
2. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Done. Every push to `main` builds and deploys.

### Option B — manual, via a `gh-pages` branch

```bash
npm run build
npx gh-pages -d dist          # or push dist/ to the gh-pages branch by hand
```

Then set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**.

### Option C — any static host

`dist/` is plain files. Netlify, Cloudflare Pages, S3, an intranet share, a USB stick.

> **Custom domain:** add a `CNAME` file to `public/`. Because the base is relative,
> nothing else changes.

---

## 6. Content architecture — how to edit anything

Nothing is hard-coded in a component. Everything a person would want to correct lives in
`src/data/`.

Every factual claim is an object carrying its own evidence:

```ts
{
  text: 'Odisha holds the overwhelming majority of India’s chromite reserves…',
  confidence: 'verified',                  // 'verified' | 'interpretation' | 'contested'
  cite: ['odisha-mines'],                  // keys into SOURCES in sources.ts
  caveat: 'Reserve shares move with…',     // shown in the UI when not 'verified'
}
```

The `<SourceTag>` component renders that as a chip the reader can open. It is a native
`<details>` element, so the caveat is real text in the document rather than a hover
tooltip — screen readers and Ctrl-F both find it.

**To add a source:** add an entry to `SOURCES` in `src/data/sources.ts` with a `tier`
of `official`, `academic` or `press`, then reference its key. It appears automatically
in the footer's Sources & Credits list, grouped by tier.

**To add a chapter:** add to `CHAPTERS` in `nav.ts`, write `sections/YourSection.tsx`
with a matching `id`, and drop it into `App.tsx`. The progress rail, active-section
highlighting and chapter menu pick it up with no further wiring.

### Regenerating the map geometry

`src/data/geo.ts` is **generated — do not hand-edit it.** It holds the Odisha outline,
the projection constants, the rivers, the Chilika lens and all 34 India state paths.

Source: [`@svg-maps/india`](https://www.npmjs.com/package/@svg-maps/india) v2.0.0, under
**CC-BY 4.0**. The generation step parses the source paths (they are pure `m`/`l`/`L`/`z`
polylines), simplifies them with Douglas-Peucker, and re-emits them:

| Output | Tolerance | Precision | Result |
|---|---|---|---|
| Odisha outline | 0.12 source units | 1 dp | ~410 points, its own viewBox |
| India states | 1.2 source units | integer | 174,453 → 20,862 chars (88% smaller) |

Pin positions are **not** eyeballed. Each place carries its real `lonLat` in
`mapPlaces.ts`, and its `x`/`y` come from `projectOdisha(lon, lat)` — a linear
calibration of the outline's bounding box against Odisha's true geographic extent
(lat 17°49′–22°34′ N, lon 81°27′–87°29′ E). The rivers and the Chilika lens are built
the same way, from real control points. That is why Puri lands on the coast and Chilika
lands behind the spit.

To change the geometry, edit the extraction script (kept out of the shipped bundle) and
re-run it; the constants are documented in the header of `geo.ts`. If you only need to
move a pin, change its `lonLat` and re-project — do not nudge `x`/`y` by hand, or the
next regeneration will silently disagree with it.

> **Attribution is a licence condition, not a courtesy.** CC-BY 4.0 requires credit; it
> is given in the site footer under "Map data" and here. If you replace the geometry
> with another source, update both.

---

## 7. Fact-checking: what was verified, corrected and flagged

This was treated as the hard requirement it was stated to be. Every claim was checked
against a government, UN, UNESCO or institutional source before it was written, and the
site labels its own confidence in public.

### Claims that were corrected rather than repeated

These are the ones that matter — each is a widely circulated line that does not survive
checking as usually worded.

| Popular claim | What is actually supported | Where it's handled |
|---|---|---|
| "Odisha contributes **42% of India's natural resource extraction**" | The reported figure is Odisha's share of India's **mineral production**, not of "natural resources", and it moves year to year. The site leads with reserve shares by mineral instead, and explicitly names the garbled version. | `modernOdisha.ts` → `resources` |
| "Odisha's disaster management **won a UN award**" | No specific verifiable award record. What is documented is **public commendation** by the UN Office for Disaster Risk Reduction after Cyclone Fani (2019), including a statement by the SRSG for Disaster Risk Reduction. The site says exactly that and says why it is not calling it an award. | `resilience.ts` → `UN_RECOGNITION_NOTE` |
| Cyclone Fani was a "**zero-casualty**" event | It was not. "Zero casualty" is the name of the *policy*. Deaths were reported and revised upward. The verified claims are the scale/speed of the evacuation and the UN's commendation. | `resilience.ts` → `fani` |
| 1999 super cyclone death toll | Sources differ (~8,200 official to ~10,000 independent). The site shows the range and says the counting itself was disrupted. | `resilience.ts` → `1999` |
| Odisha's coastline is 480 km | Two official figures coexist: the long-standing ~480 km state figure and ~575 km from the 2023–24 higher-resolution national re-survey. Both are shown. | `facts.ts` → `coast` |
| Hirakud is "the **longest dam in the world**" | Definitionally unstable — it depends on counting the flanking dykes. The site gives the measured length instead of the ranking. | `heritage.ts` → `hirakud` |
| The Konark wheels are **sundials** | The geometry is measured fact; the sundial reading is a traditional and widely repeated interpretation, not something an inscription at the site states. Labelled `interpretation`. | `wheel.ts` |
| The Paika rebellion was India's "**first war of independence**" | The 1817 events are documented; the framing is a contested historiographical claim. The site states the events and flags the framing. | `freedomFighters.ts` → `jagabandhu` |
| Kharavela's dates | Genuinely disputed across roughly a century. Flagged `contested`. | `heritage.ts` → `caves` |
| Chhena Poda's Dasapalla origin | Consistently reported but resting on oral tradition, not a documentary record. Presented as attribution, not fact. | `food.ts` → `chhenapoda` |

### Verified anchors

Konark built c. 1250 CE under Narasimhadeva I, UNESCO-inscribed 1984 · Lingaraj c. 1100
CE · Hathigumpha inscription at Udayagiri, Prakrit in Brahmi · Kalinga War c. 261 BCE;
Dhauli Shanti Stupa built 1972 by the Japan Buddha Sangha with the Kalinga Nippon Buddha
Sangha · Odisha province formed 1 April 1936, first Indian province on linguistic lines ·
Odia granted classical language status 2014 · Chilika: India's first Ramsar site, 1981 ·
Gahirmatha: largest known Olive Ridley rookery, marine sanctuary since 1997 · Simlipal
~2,750 km² · Hirakud inaugurated January 1957 · Wheeler Island renamed Abdul Kalam
Island 4 September 2015 · Odisha sponsors the Indian hockey teams since 2018, extended
2023 to 2033 · **RBI ₹10 note (Mahatma Gandhi New Series, 2018) carries the Sun Temple,
Konark on its reverse** · Rath Yatra chariots: Nandighosa 45 ft/16 wheels, Taladhwaja 44
ft/14, Darpadalana 43 ft/12, rebuilt annually · Sudarsan Pattnaik, Padma Shri 2014 ·
Baji Rout killed 11 October 1938, aged 12 · Surendra Sai 1809–1884 · Gopabandhu Das
1877–1928 · Cyclone Phailin 2013, ~1 million evacuated · Cyclone Fani 2019, ~1.2 million
evacuated in about a day.

Full source list with links is in `src/data/sources.ts` and rendered in the site footer.

### Two editorial rules applied throughout

- **No invented quotations.** Not one line is attributed to any historical figure. Where
  a famous quote could not be traced to a reliable source it was left out.
- **Costs are stated alongside achievements.** The minerals chapter names displacement
  and forest loss. The Hirakud entry names submergence. The resilience chapter says
  plainly that deaths have fallen and damage has not.

---

## 8. Assets and attribution

**External assets: three fonts and one map dataset.**

| Asset | Source | Licence | Attribution required? |
|---|---|---|---|
| Marcellus (display) | Google Fonts | SIL OFL 1.1 | No |
| Inter (body) | Google Fonts | SIL OFL 1.1 | No |
| Noto Sans Oriya (Odia) | Google Fonts | SIL OFL 1.1 | No |
| Odisha + India boundaries | [`@svg-maps/india`](https://www.npmjs.com/package/@svg-maps/india) v2.0.0 | **CC-BY 4.0** | **Yes — given in the footer and above** |

The map data is baked into `src/data/geo.ts` at author time; the package is **not** a
runtime dependency and does not ship in the bundle.

**Everything else: no attribution required.** Every illustration, motif, emblem, plate,
icon and the favicon is original SVG written for this project. Nothing is hotlinked;
nothing is downloaded at runtime except the fonts.

**Audio: no attribution required.** Both sounds are synthesised in the browser with the
Web Audio API — the sea is filtered white noise driven by two slow, mutually detuned
LFOs; the temple bell is additive synthesis on inharmonic partials (1, 2.76, 5.40, 8.93
× f₀). No audio file exists in the repo. It never autoplays and pauses when the tab is
hidden.

### If you want to add real photographs

Folders are the natural place for them:

```
public/assets/{heritage,art,food,nature,heroes,patterns}/
```

Then replace the relevant plate/emblem in `Plates.tsx` or the section component with an
`<img>` and set `loading="lazy" decoding="async" width height`.

Two cautions, both deliberate:

1. **Freedom fighter portraits.** The heroes chapter uses drawn lamps rather than faces
   because rights-cleared, correctly attributed portraits of several of these figures are
   genuinely hard to source — and putting the wrong face on a freedom fighter is worse
   than declining to guess. If you add photographs, verify the identification, not just
   the licence.
2. **Licence check.** Wikimedia Commons is the practical source for most of these
   monuments, but CC-BY and CC-BY-SA both require visible credit. Add it to the footer's
   "Image attribution" block in `sections/Footer.tsx`, which currently says none is
   required — that statement would stop being true.

---

## 9. Performance

Measured on the production build:

| Output | Raw | Gzipped |
|---|---|---|
| `index.html` | 3.0 KB | **1.3 KB** |
| CSS (one file) | 66 KB | **14.3 KB** |
| JS (one chunk) | 332 KB | **112 KB** |
| **Total transfer** | | **≈ 128 KB** |

Plus the font requests from Google Fonts.

About 11 KB gzipped of that JS is real map geometry (the Odisha outline plus 34 India
state paths). That is the deliberate price of the maps being correct rather than
approximated; the simplification pass already cut the India data by 88%.

What is doing the work:

- **No images.** Nothing to lazy-load, no layout shift from images, no decode cost. The
  hero is painted straight from markup that arrived in the HTML response.
- **No 3D library, no animation library, no CSS framework, no icon package.**
- **Fonts never block paint** — the stylesheet is loaded with `media="print"` and
  promoted on load, with a `<noscript>` fallback, and everything is `display=swap`.
- **Scroll work is cheap** — one `IntersectionObserver` for all reveals, one for active
  section, and the progress bar is rAF-throttled and uses `transform: scaleX()` so it
  never triggers layout.
- **Dragging the wheel does not re-render React.** Rotation is written to a CSS custom
  property on a ref during the drag; React state is only touched when the selected
  sector actually changes.
- **The rolling scroll wheel updates React once per whole percent**, not once per
  frame. Its position and rotation are CSS custom properties written from a
  rAF-throttled scroll handler; state exists only to keep `aria-valuenow` honest.
- **The 40px wheel is a separate drawing, not a scaled one.** At that size the full
  chakra's 24 medallions and doubled shadow pass collapse into mud, so `MiniWheel` is
  ~45 nodes instead of ~300 — which matters for the one element on screen the whole visit.
- **`prefers-reduced-motion` is honoured throughout** — the motion duration tokens
  collapse to 1ms, the wheel loses its inertia, the turtle stops swimming and parks in
  view, the hero stops drawing, the grain stops shifting, the scroll wheel stops
  rotating, the rope handle stops tugging, and **splashes are not spawned at all**
  (a guard in the handler, not just a CSS override — verified by emulating the
  setting in a real browser).

Single-chunk delivery is intentional: at 96 KB gzipped, code-splitting would add
round-trips on a phone for no benefit. If the site grows substantially, split at the
section boundary.

Lighthouse was not run in this environment (no CI runner available) — the targets are
Performance 85+, Accessibility 90+, Best Practices 90+, SEO 90+. Run
`npx lighthouse http://localhost:4173 --preset=desktop` against `npm run preview` to
confirm on your machine.

---

## 10. Accessibility

- **Semantic HTML first, ARIA only where it earns its place.** The wheel is a real
  `tablist`/`tab`/`tabpanel` with arrow-key, Home and End support. Accordions are
  buttons with `aria-expanded` controlling `hidden` panels. Source disclosures are native
  `<details>`.
- **Nothing is hover-only, and every drag has a keyboard equivalent.** The map is
  driven by real buttons under it, not SVG click handlers. The chakra is a
  `tablist`. The rolling scroll wheel and the chariot rope are both `role="slider"`
  with `aria-valuenow`/`aria-valuetext`, arrow keys, Shift for a bigger step, and
  Home/End — so the chariot can be hauled the whole way without a mouse.
- **Percentages are announced, not just drawn.** The chariot reports "40% of the way to
  the Gundicha Temple", and "Arrived" when it gets there.
- **The sheet is a proper dialog** — focus moves in on open, is trapped while open,
  Escape closes, and focus returns to the trigger. Body scroll is locked without the iOS
  jump-to-top.
- **Counters announce once.** The animating number is `aria-hidden`; the final value is
  exposed as text, so a screen reader says "155,707 km²" and not every frame.
- **Contrast** was checked against the page background: body text ≈ 10.4:1, muted text
  ≈ 6.1:1, dimmest supporting text ≈ 4.8:1 — all at or above WCAG AA.
- **Tap targets** are ≥ 44px on every interactive control.
- **Visible focus rings** everywhere, a skip link, `lang="or"` on Odia text, a
  `<noscript>` fallback that still tells you what Odisha is.

Verified at 360, 390, 412, 768, 1024, 1440 and 1920px: **no horizontal overflow and no
console errors at any width.**

---

## 11. The office bay — QR board copy and the ₹10 note

### Suggested QR board

> ### SCAN TO DISCOVER ODISHA
>
> From Jagannath to Konark.
> From Pattachitra to hockey.
> From ancient heritage to modern India.
>
> *Twelve chapters. About eight minutes.*

Print the QR at **≥ 4 cm** square with a quiet margin, matte not glossy, mounted at
roughly chest height. Test the scan under the actual office lighting before the day —
dark laminate under fluorescent tubes is the usual failure.

### The ₹10 note — why it belongs in the bay

This one is genuinely worth getting right, because it is the single best "wait,
*really?*" moment in the whole exhibition.

**The connection is real and verifiable.** In January 2018 the Reserve Bank of India
issued the ₹10 banknote in the Mahatma Gandhi (New) Series with the **Sun Temple at
Konark as the motif on its reverse**, chosen to depict the country's cultural heritage.
The chocolate-brown ₹10 note in your wallet has Odisha printed on the back of it.

So the note is *not* an Odisha symbol in itself — it is legal tender for the whole
country. What makes it belong in the bay is that it is the most widely distributed image
of Odisha in existence, and almost nobody carrying one knows what they are looking at.
Pin a ₹10 note next to a drawing of the Konark wheel and let people make the connection
themselves. That framing is what the site uses, in Chapter XI.

### Physical ↔ digital pairing

| In the bay | Chapter it opens |
|---|---|
| Rath / Jagannath | V — Jagannath |
| Konark wheel cut-out | II — The Wheel |
| ₹10 note | XI — Odisha Now |
| Turtle | IX — Wild |
| Ashoka Chakra | IV — Stone (Dhauli) and XII — One India |
| Pattachitra / Sambalpuri cloth | VI — Art |
| Food display | VII — Taste |
| Freedom fighter cut-outs | VIII — Heroes |

---

## 12. Known limitations

**Content**

- **Adivasi Odisha is under-served.** The state has 62 recognised Scheduled Tribes and a
  very large Adivasi population. Twelve chapters could not do that justice; the Saura
  entry is a doorway, not a summary. This is the most important gap and it is named in
  the footer.
- **No photographs.** A drawn plate of Konark is not a photograph of Konark. The
  illustrations are a deliberate and defensible choice, but someone who wants to *see*
  the temple will not see it here.
- **English only.** Odia appears as headings, names and labels, and the font is loaded —
  but the body content is not translated. Machine-translating a chapter of cultural
  history into Odia without a native reviewer would have been worse than not doing it.
  The language switcher is deliberately absent rather than half-built.
- Some sections are text-dense. The card/sheet pattern hides the depth behind a tap, but
  a visitor who opens everything is doing a fair amount of reading.

**Technical**

- **Lighthouse has not been run** in this environment; the numbers in §9 are measured
  bundle sizes, not audited scores.
- **The chakra's drag area blocks vertical page scroll** on touch (`touch-action: none`
  on the disc). This is necessary for rotation to feel right, and there is scrollable
  page on either side of it — but on a very narrow screen a user could try to scroll by
  dragging the wheel and be surprised. The chariot rope does *not* have this problem: it
  uses `touch-action: pan-y`, so vertical scrolling still works over it and only the
  horizontal drag is captured.
- **Present mode does not open interactions automatically.** It advances through measured
  viewport stops and loops back to the hero, but sheets, accordions and interactive scenes
  still need a person. Auto-advance pauses after wheel or touch input so it never pulls
  the page away from someone exploring it.
- **Scroll-snap is `proximity`, never `mandatory`.** Mandatory snapping on sections
  taller than the viewport makes their middles unreachable. Proximity gives the settle
  at each chapter start and otherwise leaves scrolling alone; it is also disabled below
  700px and under reduced motion.
- **The rolling scroll wheel occupies the bottom ~34px** of the viewport below 1340px.
  The footer is padded to compensate, but it does sit above page content while
  scrolling. It was tried riding the nav's hairline instead and got clipped by the bar;
  raising it above the bar let it slide over the Sound and Chapters buttons.
- **The maps are simplified.** The geometry is real, but Douglas-Peucker at display
  tolerance drops coastal detail, and simplifying each Indian state independently means
  adjacent borders can differ by up to a pixel — which reads as a boundary line, so it is
  left as is. Both maps are captioned and must not be used as political or survey
  boundaries.
- **The Web Audio ambience** is unavailable in browsers without `AudioContext`; the
  control hides itself in that case.
- **`overflow: clip`-style behaviour on the food carousel** uses `overflow: hidden`,
  which clips the front plate's drop shadow slightly at the edges.
- Tested in Chromium. The CSS uses `backdrop-filter`, `aspect-ratio`, `dvh/svh`, `mask-image`
  and individual `translate`/`rotate` properties — all broadly supported, but Safari 15
  and older will degrade (gracefully — nothing becomes unusable).

---

## 13. Future improvements

Roughly in order of value returned:

1. **Odia translation, reviewed by a native speaker.** The `Claim`/data structure is
   already a clean seam for it — add a `textOr` field and a language toggle. Do not ship
   this machine-translated.
2. **An Adivasi Odisha chapter**, developed with someone from the communities involved —
   Saura, Kondh, Santal, Bonda — rather than about them.
3. **Photography**, licensed properly, as an optional layer behind the drawn plates
   (tap the plate → see the real thing). Best of both.
4. **Deep links** — `#/chapter/wheel` style hash routing so a QR code could open on a
   specific chapter, letting each object in the bay carry its own code.
5. **Lighthouse and axe-core in CI**, failing the build on regression.
6. **A printable one-page PDF** generated from the same `src/data/` files, for people who
   would rather take something away than scan something.
7. **Chapter-level code splitting** if the site grows past ~200 KB gzipped.

---

## Licence & corrections

Built for an office Independence Day bay decoration. Content is presented for cultural
and educational purposes with sources cited throughout.

**Corrections are welcome and easy to make.** `src/data/` is the single source of truth
for every factual claim on this site — no fact is written inside a component. If
something here is wrong, that is where to fix it, and the source registry in
`sources.ts` is where to say why.

*ଓଡ଼ିଶା — One state. Many stories. One India.*
