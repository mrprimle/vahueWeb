# /public-sector

Live source: https://scale.com/public-sector, 2026-11-01. Menu label here: **Scale-ups** (B2B scale-ups whose volume has outgrown the team), per Mike's 22:46 direction. Scale's structure and motion are kept; government and defense content is replaced in the same slots. Stack: [../stack.md](../stack.md), chrome: [_chrome.md](_chrome.md).

Files: `app/public-sector/page.tsx`, `components/pages/public-sector/` (`PublicSectorPage.tsx`, `content.ts`, `content.scale.ts`, `icons.ts`, `types.ts`). New in `components/site/shared`: `Features.tsx`. Additive: `NewButtonLink` gained the glass branch and `theme`, `SectionTitle` gained `as`.

## Stack on this page
The RSC payload loads these client modules: 243385 PageThemeSetter, 478135 hero (non-globe branch, wraps 540431), 970272 LogoCloud, 450359 Features with bullets 842862, 872447 ChecklistWithMedia, 51051 CTAs with 408298 glass button, 460138 FeaturesWithIcons, 382790 ResourcesCarousel (Keen Slider), 799808 glow. No WebGL scene renders: 478135 only mounts the globe for `media[0]._type === 'meshGlobe'`, and this page passes an image. REA `analyze_web_bundle`: 55 of 55 scripts parsed, `ev_7576003b2af279d584749851679be4f76f25595360d0f6fd6516a47e42e7b4b0`.

## Sections
Clone heights in px. All 8 section tops and heights equal Scale at 1920, 1600, 1450, 1440, 1280, 1024, 1023, 767, 500 and 390. Differences at 1100, 900, 768 and 640 are one wrapped line from the font (see Gaps).

| # | Section | Module | 1440 top, height | 390 top, height | Changes with width |
|---|---|---|---|---|---|
| 1 | Hero, `pb-10! pt-24!` | 478135 > 540431 | 39, 856 | 102, 616 | Media 720 to 480 tall below `md`; body rewraps |
| 2 | Logos, `!py-12` | 970272 | 895, 245 | 718, 159 | 7 logos: grid 4 + 3 from `md`, marquee below it |
| 3 | Use Cases, glow | 450359, 842862, 799808 | 1140, 1680 | 877, 3279 | 3 across from `lg`, 2 from `md`, 1 below; 5 items leave an empty cell |
| 4 | Capabilities, glow | 872447, 51051, 408298 | 2820, 1558 | 4156, 1908 | Row from `md`, stacked below it; image order flips with `mediaPosition` only from `md` |
| 5 | Why, `!py-12` | 460138 | 4379, 576 | 6064, 1090 | Flex wrap, 3 across from `lg` |
| 6 | Callout, `!py-12` | box-asset-light markup, 51051 | 4955, 536 | 7154, 640 | Row and fixed 440 tall from `lg`; `max-w-[440px]` centred below it, so 676 tall from `md` to `lg` |
| 7 | Resources, `!py-12` | 382790 | 5491, 758 | 7794, 595 | Slides per view 1.05, 1.4 from 640, 2 from 768, 2.8 from 1280 |
| 8 | Pre-footer, `pt-16! pb-8` | 540431 | 6249, 816 | 8389, 576 | CTAs stack below `md` |

## Interaction inventory

| Element | Input | Listener and REA evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Section roots, feature cards, logo `ul`, `figure`, callout box | none | 0 direct listeners: `ev_298e695a…` (first section), `ev_73d82d22…` (glow section), `ev_5794f4bd…` (hero), `ev_acdc1c46…` (logos), `ev_7913241b…` (feature card), `ev_1e68c609…` (figure), `ev_762f6f9e…` (callout), `ev_3c35f40c…` (pre-footer) | | No hover state on cards or images | Same |
| Hero, pre-footer CTA | hover | React delegated; 892855 | 961870 | Shared FlatCta port, verified on `/about` | Box 154.2 vs 154.3; this page's sampler read only identity transforms at both, so per-frame values come from the shared port's checks |
| Hero headline, body, CTA | load, in view | `useInViewTrigger`, delay .2 x index, CTA .85s delay .5 | 540431, 947153 | Shared port | Rest values equal |
| Hero media | scroll | `useScrubTrigger` | 540431 | Scale 1.25 to 1 | 1.0139 at rest, 1 from the first stage at 1440; 1.006, 1 at 390, equal |
| Pre-footer media | scroll | Same | 540431 | 1.25 to 1 | 1.2275, 1.0886, 1 at scrollY 5400, 5850, 6300, equal; 1.1118, 1 at 390, equal |
| Glass "Learn more" | hover enter, leave | CSS | 408298 | Wrapper `hover:scale-[1.02]`, shadow; link brightness 1.15, sheen `::before`, 500ms | Brightness 1.066, 1.103, 1.126 vs 1.066, 1.103, 1.126; sheen .085, .457, .776 vs .085, .457, .776; leave 1.084, 1.047 vs 1.084, 1.047 |
| Glass "Learn more" | press | CSS | 408298 | `active:brightness-105`, `active:scale-[.97]` | Brightness 1.05, sheen 1, equal |
| Glass "Learn more" | focus | CSS | 408298 | Browser default | Outline style and width equal |
| Carousel `.keen-slider` | drag | `ev_0cca3b6a…`: 14 listeners from `2vj2iettvig10.js` (mousedown, mousemove, mouseleave, mouseup, touch*, `ksDrag*`, click capture, dragstart, wheel) | 382790 | Free mode from 640, snap below; `rubberband: false` | 112, 82, 52 … -218 during, -313.7 … -482.9 after, equal |
| Carousel | cursor | Inline, `dragStarted`, `dragEnded` | 382790 | grab, grabbing | Same |
| Carousel | wheel | 29713 plugin | 382790 | Horizontal wheel at the end stays put; vertical wheel scrolls the page | -484 stays; 160 page px in both |
| Carousel | Tab | keydown on wrapper | 382790 | `next()` | -484 to -853.7, equal |
| Carousel | touch swipe at 390 | CDP touch | 382790 | Snap, perView 1.05 | -288.6, -332.5, -345.2, -347.4, equal |
| Logo marquee | below `md`, time | CSS | 922998 | 16.54s linear, infinite | Equal |
| Lenis wheel | wheel | Shared | 2d7ykwtxp | | 450 per step at 1440, 422 at 390, equal to the last stage |

`observe_web_execution` during real input (CTA hover, 9 wheels, glass hover, keyboard scroll, carousel drag, final scrollY 6604): `ev_690be98608cf40a91a99837e3e009236e46727a30fa20bc4fcc1b4c1a6d46450`, own one-tab headless Chrome. Over MCP's 10 MB limit; the session export was 640 MB, so it was deleted without reading the ranges. Handlers above come from reading the modules. `capture_browser_scenario` was not run; `observe_web_execution` covered the requirement. No source maps ship, so `trace_web_source_location` does not apply.

## Filled copy and images
85 strings: 32 unchanged, 5 only Scale to Vahue or SI to AI, 28 changed by a few words, 20 rewritten. So 44% stay and 77% stay or change lightly, below the 80% target because nearly every line on Scale's page is about government or defense, which Mike's 22:46 direction replaces. All word counts within 15% of Scale's except the headline ("US Public Sector" to "B2B Scale-ups").

Mapping, from the research: Mission Planning to Revenue Planning (segment 2), ISR to Knowledge, Reporting, and Decision Support (segment 3), Cyber to Support and Service Operations, Computer Vision to Document Intake, Super Intelligence Agents to Operations AI Agents, the St. Louis block to "AI workforce of the future with you" and "without the next hire". Enterprise Support & Back Office is verbatim.

Images, same display size:
- `hero-filled.webp`, 1920 x 1280, replaces the soldier: dark app panels drawn for this page, no figures.
- `img-revenue`, `img-knowledge`, `img-support`, `img-backoffice` replace the war table, satellite map, military control room and Pentagon. They are crops of photos already in the repo (`site/nav/labs-papers`, `about`, `experts`, `enterprise/hero-consumer`). `img-acquisition-procurement` stays: a pen on a contract.
- `agents-filled.webp` is Scale's agent builder with `scale.com`, the logo and the weapons prompt painted over.
- `document-intake-filled.webp` is Scale's Data Engine frame with the warships replaced by document thumbnails, relabelled Context Engine.
- `callout-steps.webp` replaces the St. Louis Arch with rising bars, same 1500 square and grey gradient.
- Resource icons are generic line art and stay.

Scale's originals are removed from `public/public-sector/`; recover them from commit 72ff4ae to re-check the clone.

Links: `/stl` has no route, so the callout goes to `/experts`. Computer Vision's link was `/public-sector-data-engine`; Document Intake goes to `/physical-ai`. Blog posts have no routes, so all 9 resources go to `/blog`.

## Placeholders
18 lines with `// PLACEHOLDER`: 7 logo tiles at Scale's boxes, the Proven experience customers, 9 resource articles, and the comment header naming the marker. No stats on this page.

## Gaps
- **Font:** Aeonik, not Aeonik Pro, per stack.md. With Scale's copy one bullet wraps differently at 1100, 900, 768 and 640, moving later sections by 12 to 36. The glass button is 124.5 wide vs 119.8 because the Aeonik arrow is wider.
- **Filled heights:** equal at 1920 to 1280, 767 and 390. New wraps change a section by up to 52 at 1100, 1024, 1023, 900, 768, 640 and 500. No section or item is dropped.
- **Footer:** at 1100, 1024 and 500 the footer height differs by up to 40 from shared copy, not this page.
- **`img-backoffice`** comes from a 640 wide source and is soft in the 719 wide card at 767.
- **Not driven:** `oml:` landscape, Safari. The carousel's `focusin` branch was not sampled separately.
- **First paint in dev:** the announcement bar and header sit differently until hydration on the dev server; the same frames on Scale were taken later because its load is slower. Rest frames match.
- **Lazy images in Scale's full-page shots** at some widths look blank because of quick scroll; ours loaded. Not a layout difference.
