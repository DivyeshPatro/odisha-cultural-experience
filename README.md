# ODISHA — An Interactive Digital Cultural Exhibition

**A digital journey to bring the rich heritage, culture, and stories of Odisha to the public.**

[**View the Live Exhibition Here**](https://divyeshpatro.github.io/odisha-cultural-experience/)

Twelve chapters that take someone who has never heard of Odisha from *"where is that?"*
to *"why did nobody tell me about this?"* — via a Konark wheel you can spin, a map you
can pick apart, three chariots drawn to their published dimensions, and a disaster-
management story told honestly enough to include the death tolls.

Our goal is to portray the true essence of Odisha: from Jagannath to Konark, from Pattachitra to hockey, from ancient heritage to modern India. We want to bring more details about the Odisha state to the wider public in an interactive, verifiable, and engaging format.

---

## Table of contents

1. [The Exhibition Journey](#1-the-exhibition-journey)
2. [What We Want to Portray](#2-what-we-want-to-portray)
3. [Fact-checking: what was verified, corrected and flagged](#3-fact-checking-what-was-verified-corrected-and-flagged)
4. [Assets and attribution](#4-assets-and-attribution)
5. [Known limitations](#5-known-limitations)
6. [Future improvements](#6-future-improvements)
7. [Licence & corrections](#7-licence--corrections)

---

## 1. The Exhibition Journey

The site is designed as a walk, not just a stack of cards:

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

### Interactive Elements

- **Spin the chakra**: Eight major spokes = the eight praharas of a day, so the wheel *is* the table of contents. Drag has inertia and snaps to a spoke.
- **Roll the wheel**: One full turn per screenful scrolled, so you can see it rolling. Doubles as a draggable scrubber.
- **Pull the rath**: **Tap** and six devotees heave it forward a stretch; **drag** and it moves strictly 1:1 with your hand.
- **Splash the water**: Rings spread on an ellipse and droplets arc out and fall back under gravity.

---

## 2. What We Want to Portray

This exhibition was built to take the stories of Odisha out to the wider public. We want to move beyond the typical tourist brochures and present a historically grounded, culturally rich, and interactive experience that anyone can access.

Whether it's understanding the exact scale of the Puri chariots, learning about the state's resilience in the face of devastating cyclones, or discovering that the ₹10 note in your wallet carries the Konark wheel—this project aims to educate and inspire audiences globally.

---

## 3. Fact-checking: what was verified, corrected and flagged

This is a core pillar of the project. Every claim was checked against a government, UN, UNESCO or institutional source before it was written, and the site labels its own confidence in public.

### Claims that were corrected rather than repeated

| Popular claim | What is actually supported |
|---|---|
| "Odisha contributes **42% of India's natural resource extraction**" | The reported figure is Odisha's share of India's **mineral production**, not of "natural resources", and it moves year to year. |
| "Odisha's disaster management **won a UN award**" | What is documented is **public commendation** by the UN Office for Disaster Risk Reduction after Cyclone Fani (2019). |
| Cyclone Fani was a "**zero-casualty**" event | "Zero casualty" is the name of the *policy*. Deaths were reported and revised upward. |
| 1999 super cyclone death toll | Sources differ (~8,200 official to ~10,000 independent). The site shows the range. |
| Odisha's coastline is 480 km | Two official figures coexist: the long-standing ~480 km state figure and ~575 km from the 2023–24 higher-resolution national re-survey. |
| Hirakud is "the **longest dam in the world**" | Definitionally unstable. The site gives the measured length instead of the ranking. |
| The Konark wheels are **sundials** | The geometry is measured fact; the sundial reading is a traditional interpretation. Labelled `interpretation`. |
| The Paika rebellion was India's "**first war of independence**" | The 1817 events are documented; the framing is a contested historiographical claim. |
| Kharavela's dates | Genuinely disputed across roughly a century. Flagged `contested`. |
| Chhena Poda's Dasapalla origin | Consistently reported but resting on oral tradition. Presented as attribution, not fact. |

**Two editorial rules applied throughout:**
- **No invented quotations.** Not one line is attributed to any historical figure unless verified.
- **Costs are stated alongside achievements.** 

Full source list with links is provided directly within the experience.

---

## 4. Assets and attribution

**External assets: three fonts and one map dataset.**

| Asset | Source | Licence | Attribution required? |
|---|---|---|---|
| Marcellus (display) | Google Fonts | SIL OFL 1.1 | No |
| Inter (body) | Google Fonts | SIL OFL 1.1 | No |
| Noto Sans Oriya (Odia) | Google Fonts | SIL OFL 1.1 | No |
| Odisha + India boundaries | [`@svg-maps/india`](https://www.npmjs.com/package/@svg-maps/india) v2.0.0 | **CC-BY 4.0** | **Yes — given in the footer** |

**Everything else:** Every illustration, motif, emblem, plate, icon and the favicon is original SVG written for this project. The audio is synthesised in the browser with the Web Audio API.

---

## 5. Known limitations

- **Adivasi Odisha is under-served.** The state has 62 recognised Scheduled Tribes and a very large Adivasi population. Twelve chapters could not do that justice; the Saura entry is a doorway, not a summary. This is the most important gap and it is named in the footer.
- **No photographs.** The illustrations are a deliberate and defensible choice to maintain aesthetic consistency, but someone who wants to *see* the temple will not see it here.
- **English only.** Odia appears as headings, names and labels, but the body content is not translated to ensure nuances aren't lost in machine translation.
- Some sections are text-dense. The card/sheet pattern hides the depth behind a tap, but a visitor who opens everything is doing a fair amount of reading.

---

## 6. Future improvements

Roughly in order of value returned:

1. **Odia translation, reviewed by a native speaker.** 
2. **An Adivasi Odisha chapter**, developed with someone from the communities involved.
3. **Photography**, licensed properly, as an optional layer behind the drawn plates.
4. **Deep links** — hash routing so a link could open on a specific chapter.
5. **A printable one-page PDF** generated from the content for offline access.

---

## 7. Licence & corrections

Content is presented for cultural and educational purposes with sources cited throughout.

**Corrections are welcome and easy to make.** If something here is wrong, feel free to open a PR or an issue. 

*ଓଡ଼ିଶା — One state. Many stories. One India.*
