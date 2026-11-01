# scale.com/careers clone spec

Route: `/scale-clone/careers/` · Page: `app/scale-clone/careers/page.tsx` · Components: `components/scale-clone/careers/` · Assets: `public/scale-clone/careers/` · QA: `reference-snapshots/scale-clone/qa/careers/`

Captured 2026-10-31 at 1440×900 and 390×844 (computed styles after a 50%-viewport sweep), REA on an isolated Chrome tab (CDP 9230), production chunks and CSS grepped locally, RSC payload parsed from the page HTML.

The layout is reusable: `CareersPage({ content, theme })` renders everything from a `CareersContent` object (`content.tsx`, with Scale's own copy in `scaleCareersContent`) and reads every colour from `--car-*` variables, so Vahue's `/careers` can pass its own content and a dark theme (see "Reuse" below).

## Libraries (REA `analyze_web_bundle`, evidence `ev_f1398348…`)
- 48 scripts parsed, 0 failures. Next.js (high, `next-runtime`, Turbopack), React (medium). GSAP 3.15 + ScrollTrigger + SplitText (AnimatedText module 668761 in `1h0nvyhf5gbrf.js`), Lenis 1.3.21 (module 255667 in `2fbrdg5m4_g_8.js`). three.js chunk `3kd41k7ews14b.js` loads site-wide; no canvas on this page. No carousel, no Rive.
- Endpoints found by REA (module 165311, chunk `18ec6cjdps6ll.js`): `https://api.greenhouse.io/v1/boards/scaleai/jobs?content=true`, `/offices`, `/departments`, fetched client-side with a 5-minute in-memory cache. The page renders "Loading positions…" until they resolve.
- Page-specific chunks: `0fwc0347bccaa.js` (the page's own FullBleedMediaSection copy, same body as module 540431 in `37xz28pjbnlx4.js`; also FeatureCards 15518 and NewsCards 756380), `2hf-m2wen5p-4.js` (module 442707: Radix DropdownMenu + `FilterPosition`, `FilterDropdown`, `DepartmentSection`, `PositionItem`, `CollapsibleDepartmentListings`), `18ec6cjdps6ll.js` (Greenhouse fetch + flag/department maps, module 242648), `2qomgocduultg.js` (react-icons Material Design paths, module 473665).
- Radix UI DropdownMenu (Menu, RovingFocusGroup, Collection, Portal, DismissableLayer, react-remove-scroll) is bundled for the filters. The repo has no Radix dependency, so the clone ports the behaviour by hand (see the gaps).

## Page structure (RSC)
The route is hand-built, not CMS slices: `PageTheme light` → `Header border` → `main` with:
1. `div.pt-24!` → FullBleedMediaSection (`animateCta: false`, cta `smoothScrollTargetId: "open-roles"`, media `/static/img/reskin/headers/careers.webp`)
2. section "In The News" → NewsCards (3 items, `bgClass` evergreen / atlas-blue / scale-gray-10)
3. section "Our Mission" (two columns, server markup)
4. section "Our Credos" (6 cards, server markup)
5. section "Our Benefits" → FeatureCards `columns "2"`, `variant "borderless"`
6. `section#open-roles` → FilterPosition (`initialSearchString ""`, `customSelectedDepartments []`, `customSelectedLocations []`, `specificPositions []`, `settingCareers false`)
7. `div.mt-16! pb-8` → FullBleedMediaSection (University, default `animateCta: true`)

## Listener map (REA `inspect_web_event_listeners`)
| Element | Listeners | Source |
|---|---|---|
| Filter trigger `#open-roles button[aria-haspopup]` | `mousedown` (capture) | HubSpot analytics `hs-analytics.net …4823527.js:28:18443`. Radix's `pointerdown`/`keydown` are React-delegated at the root (not on the node) |
| Department button `#open-roles button[aria-controls]` | `mousedown` (capture), `click` | HubSpot; `42ixmvih7808g.js:0:20015` (Next router/React) |
| Position row `#open-roles [role=region] a` | `mousedown` (capture), `click` | same two |
| Search `#open-roles input` | `invalid`, `select` (passive) | React `42ixmvih7808g.js:193832`; FullStory `fs.js` |
| FlatCta / CMSLink (hero, news, pre-footer) | React-delegated `click` (smooth scroll), `pointerenter/leave` (hover fill) | module 737900 in `1h0nvyhf5gbrf.js` |
| window / document | Lenis wheel/touch, ScrollTrigger | shared |

## Sections (top → bottom, 1440 / 390)
Global: `p` and headings carry letter-spacing −0.01em; spans, buttons and links stay `normal` (measured). Colours: scale-gray-10 `#212121`, -30 `#575757`, -60 `#929292`, -90 `#EAEAEA`, -95 `#F2F2F2`, evergreen `#193A29`, atlas-blue `#273252`, overtitle `#525252`.

1. **Hero** FullBleedMediaSection in a ClipScrollSection, wrapper `pt-24` (no bottom padding), `px-4`. Card 1408×720 (358×480), radius 24, `p-16` (`p-8`), content bottom-left `max-w-[72rem]` gap 24. H2 header2 `clamp(2rem,.5rem+5vw,4rem)`/1.05 (64 / 32) white; body1 20/1.5 (16/1.45) balanced. CTA "View Open Positions": FlatCta arrow, white, 196×40, **radius 6** (`animateCta false` → plain FlatCta, no intro), click → `pushState('#open-roles')` + a Lenis glide to `#open-roles` (measured, see the interaction inventory; href `/careers#open-roles`). Media bg `#193A29`, `.media-overlay` computes to `linear-gradient(#0000, #000)` (sampled; it beats the flat `bg-black/45`).
2. **In The News** `py-[72px] md:py-[120px]`, container `max-w-[1472px] px-6`. SectionHeader centred (`items-center mx-auto max-w-3xl text-center`, `!mt-0 !mb-10`): overtitle 12/24 +1px uppercase mono `#525252` mb 20; title 30/1.375 → md 40 → lg 48/1.25, balanced. Grid `md:grid-cols-2 gap-4`; cards `min-h-[220px] p-8 md:p-10 rounded-2xl`, flex column `justify-between gap-8` (688×246 at 1440): detail-mono 13/1.2 (10) white/60; h3 header5-regular 24/1.5 (22/1.05) white, `text-pretty`; FlatCta arrowOutline white (145×50, 1px border, transparent 32px icon box, fill opacity .30), external links open in a new tab.
3. **Our Mission** header `!mb-0 md:mt-12`; wrapper `flex-col gap-16`; columns `flex-col sm:flex-row gap-[72px]`, each `sm:w-1/2 gap-6` (660 wide). Lead body1 20/1.5 (16/1.45) `#212121` (`text-pretty` wins over `text-balance`); paragraphs body2-regular 16/1.5 (14/1.35) `#575757`; links underlined, hover `#212121`.
4. **Our Credos** section `overflow-hidden`, header with subtitle (`mt-4 lg:mt-2`, 16/1.6 → lg 20/1.6, black/70, balanced). Grid `mt-16 sm:grid-cols-2 gap-6`; cards `p-8 sm:p-10 rounded-2xl #F2F2F2 gap-8` (684×314); 88px line-art SVG with `filter: invert` (Scale ships white strokes); h3 header6 20/1.5 (18/1.05) `#212121`; body2 `#575757`, inner gap 12.
5. **Our Benefits** FeatureCards borderless, 2 columns, `gap-16`; item `flex-col gap-8`: image `h-[320px] w-full object-cover rounded-lg shadow-[0_4px_16px_rgba(0,0,0,.2)]` (664×320); text gap 8: h3 24/1.5 black; p 16/1.65 black/70.
6. **Open positions** `section#open-roles py-16 md:py-24`, container `#jobs`. Header `!mb-10 md:mt-12`. FilterPosition:
   - sticky bar: `position: sticky; top: 0; z-index: 10` (it never actually sticks: `main` is `overflow-x-hidden`, which makes it the scroll container; measured on both), `bg-white/90`, `backdrop-blur(8px)`, `pt-2 pb-6`; row `flex-col sm:flex-row gap-3`.
   - search input 256×43 (`sm:w-64`, full width < 640), `pl-4 pr-9 py-2.5 rounded-xl`, border `#EAEAEA`, bg `#F2F2F2`, body3 14/1.5 `#212121`, placeholder `#929292`, focus border `#575757`; clear "×" button (14px) when non-empty; Escape clears.
   - two FilterDropdown triggers 224×43 (`sm:w-56`): `pl-4 pr-3 py-2.5 rounded-xl`, gap 8, 14px chevron; idle `#F2F2F2`/`#EAEAEA`/`#929292`, hover border+text `#575757`, active (internal selection non-empty) bg+border `#212121`, text white.
   - menu (Radix content, portalled): 288 wide (`calc(100vw-2rem)` < 640), `max-h-[60vh]`, scroll, white, 1px `#EAEAEA`, radius 12, `shadow-lg`, align start, sideOffset 6, no open animation. Items `px-4 py-3 gap-3`, 46 tall, divider `#F2F2F2`, hover bg `#F2F2F2`; 16px checkbox radius 4, border `#929292` → checked bg/border `#212121` with a white 10×8 tick; label body3 `#212121`. Department options relabel `CFO Team`, `EPD`, `GTM` (`e9`).
   - active-filter row (`mt-3`): "Showing **N** roles[ matching "q"][ in N depts][, N locations]" or "No roles match your criteria." + "Clear filters ×".
   - list header `mb-6` (`mt-2` above): "**N** roles across **M** departments" + "Expand all/Collapse all" + "k of M expanded" (detail-mono `#929292`, numbers `#212121`).
   - department row: button `px-6 py-5` (88 tall at 1440), hover bg `#F2F2F2`; 18px Material icon `#929292`, gap 12; h3 header6 `#212121`; "N roles" detail-mono `#929292` mt 2; 18px chevron (rotates 180°); rows separated by 1px `#EAEAEA`, list top border.
   - open panel `bg #F2F2F2`; position row link `pl-8 md:pl-16 pr-6 py-4` (57 tall), border-top `#EAEAEA`, `flex-col sm:flex-row sm:items-center justify-between gap-3`, hover bg `#EAEAEA` + title black; title body2-regular `#212121`; right side `gap-2 sm:gap-5`: 20×14 flag + detail-mono location `#929292` (gap 6), "Apply →" detail-mono `#575757` hover `#212121` → `window.open(absolute_url, '_blank')` with `preventDefault` on the row link; the row links to `/careers/<id>`.
7. **Pre-footer** FullBleedMediaSection, wrapper `mt-16 pb-8`, H2 only ("Join University Student Careers"), CTA "Explore Opportunities" with the filledWhiteArrow intro (ends at radius 8).

## Data rules (FilterPosition, ported 1:1)
- Each job is split into one row per office (`location.name.split(";")`), so counts are office rows (live: 170 jobs → 275 rows).
- Department = `metadata["External Department"]` else `departments[0].name`; groups sorted with `localeCompare`, rows by title (stable). Department options = unique names sorted; location options = unique trimmed offices, default sort.
- Filters: department (plus Scale's aliases Communications/Marketing → "Marketing and Communications", Enterprise EPD → "Product and Design"), location (`row.location.includes(option)`), search (title contains query, only from 3 characters).
- Every filter change scrolls the FilterPosition root into view (smooth).
- Flags: last comma part of the office (`"San Francisco, CA"` → `CA`) looked up in the `U` map, else `earth.svg`.
- **Scale quirk (reproduced, `scaleLabelQuirk: true`)**: the page passes `customSelectedDepartments: []`, and FilterPosition reads `D = customSelected || selected`, so the trigger label, the "in N depts / N locations" summary and `initialExpandedDepartments` always see `[]`. Picking a department filters the list and turns the trigger dark, but it keeps saying "All Departments" (verified live).

## Motion
| Element | Trigger | Start → End | From → To | Ease / dur | Notes |
|---|---|---|---|---|---|
| ClipScrollSection clip (both FBMs) | wrapper | top bottom → center center | `inset(5% round 1.5rem)` → `inset(0%)` | linear (progress) | startPercentage 10 (default) ×0.5. Hero reads `inset(0.2778%)` at load (1440) / `0.1208%` (390) on Scale and clone |
| FullBleedMedia media | section | top bottom → center center | scale 1.25 → 1 | linear (progress) | hero `matrix(1.0139)` at load (1440), `1.006` (390), both sides |
| FBM text | section | top center, once, retroactive | AnimatedText intro: h2 delay 0, body delay 0.2 | lines yPercent 400→0 1s power3.out (+0.08/line), words x 30%→0 0.9s stagger 0.03, tint #72CE7B→#79648C→final | pre-footer h2 sampled `translateY(268.75px)`, opacity 0 before the trigger on both |
| Pre-footer CTA | same | — | filledWhiteArrow: scaleX 0→1, radius 0→8, autoAlpha | 0.85s power3.out, delay 0.5; counter +0.1s; arrow x −6→0 power3.inOut | sampled `matrix(0,…)`, hidden, r 0 before; r 8 after, both sides |
| Department panel | click | — | `grid-template-rows 0fr ↔ 1fr` | 300ms `cubic-bezier(0,0,.2,1)` (`transition-all`) | transitionend → 50ms debounce → rAF → lenis.resize + ScrollTrigger.refresh |
| Chevron | click | — | rotate 0 ↔ 180° | 300ms ease-out | |
| Expand all / Collapse all | click | — | all panels | as above | refresh 340ms later |
| Dropdown | pointerdown / Enter / Space / ArrowDown | — | appears instantly (no animation) | — | onOpenChange → 120ms debounce → refresh; modal: body `pointer-events: none` + scroll lock |
| Filter change | change | — | root scrolls into view | smooth | see gaps for how the clone drives it |
| Colour hovers | pointer | — | colours / backgrounds | 150ms `cubic-bezier(.4,0,.2,1)` | Tailwind v4 `hover:` only on `(hover: hover)` |
| FlatCta hover | pointer | — | fill `-translateX(100%)`→0 (opacity .35 / .30); chevron track −50%→0 | 600ms `cubic-bezier(0,0,.2,1)` | |

The middle sections (news, mission, credos, benefits, positions header) have **no** scroll or reveal animation on scale.com: they are plain server markup without AnimatedText. All tweens respect `prefers-reduced-motion` (text visible, no scrubs, smooth scrolls jump).

## Assets (`public/scale-clone/careers/`)
`hero.webp` (1600×1200, from 1920), `university-hero.webp` (1600×1067), `benefit-*.webp` ×4 (1200 wide, from 1920; Scale serves w=1200 at 2x), `credo-*.svg` ×6 (Scale's line art, 88px), `flags/*.svg` (US, UK, Qatar, Saudi Arabia, Mexico, Canada, UAE, India, earth fallback). Department icons are inline react-icons paths (`icons.tsx`). Job data: `jobs.ts`, a static snapshot of the Greenhouse board taken 2026-10-31 (all 15 departments, first 3 roles of each by title: 37 jobs → 55 office rows).

## Reuse (Vahue /careers)
- `CareersPage({ content, theme })`. `content` is plain data plus React elements (no functions), so a server page can pass it. Hero/pre-footer accept `media` (a ReactNode instead of the image, same scroll scale), credos accept `iconNode`, benefits accept `media`, positions accept `jobs`, `jobBaseHref` (or per-job `href`), `flags`, `flagFallback`, `departmentLabels`, `labels` (every UI string), `scaleLabelQuirk` (set `false` for Vahue so the triggers show the live selection).
- Theme variables (defaults = Scale light): `--car-bg`, `--car-fg`, `--car-fg-2`, `--car-fg-3`, `--car-muted`, `--car-line`, `--car-card`, `--car-over`, `--car-sub`, `--car-hover-ink`, `--car-active-bg`, `--car-active-fg`, `--car-menu-bg`, `--car-sticky-bg`, `--car-shadow`, `--car-credo-filter` (`none` on dark). The dropdown portals into `[data-careers-root]` so the variables reach it. A dark override was checked: `qa/careers/1440-theme-dark-*.jpg`.

## QA
Side-by-side composites (Scale left, clone right), every 50% viewport: `1440-00..19.jpg`, `390-00..25.jpg`. Cursor / interaction states: `1440-hover-00..09-*.jpg` and `390-hover-00..09-*.jpg` (hero CTA, news CTA, mission link, department hover, open department + row hover, Apply hover, trigger hover, menu open + item hover, item picked, Expand all). Raw numbers: `report.json`.
- 1440: document 9262 = 9262. Every anchor matches to the pixel: hero h2 606, section titles 1019 / 1994 / 2714 / 4208 / 5840, credo titles 3070 / 3746, benefits 4816 / 5408, search 6008, first department 6143, `#open-roles` 5652 (1896 tall), pre-footer section 7611, footer 8363. Heading widths within 1px (font).
- 390: every anchor matches (hero h2 438, titles 794 / 1827 / 2674 / 5023 / 7799, search 7930, first department 8189, pre-footer 9424); document 11296 vs 11256, all of it in the shared footer (1360 vs 1320, known).
- Mid-scroll pre-footer samples at −1.0/−0.8/−0.6/−0.4/−0.2 viewport from its top: clip `inset(5%) → 3.8889% → 2.7778% → 1.6667% → 0.5556%` and media `1.25 → 1.1944 → 1.1389 → 1.0833 → 1.0278` at 1440, identical on both; same at 390 (`3.7236% / 1.1862`, …).
- Interaction probe (computed styles, Scale vs clone): sticky bar, input, triggers (idle / hover / active), menu (288×540, radius 12, item 46px, checkbox), department hover `#F2F2F2`, row hover `#EAEAEA` + black title, panel `#F2F2F2`, row 57px with 64px left padding all match. Keyboard: Enter opens and focuses the first item, ArrowDown + Space toggles and closes, focus returns to the trigger (both). Hero CTA smooth-scrolls `#open-roles` to the top (5651 Scale / 5652 clone). Picking a department scrolls the list root to the top (6000 both).
- Clone: 200 on the dev server, no console errors or warnings during load, scroll and the interaction run.

## Interaction inventory (audit 2026-11-01)

Method: REA on a fresh CDP 9230 tab (closed afterwards). `analyze_web_bundle` (`ev_1a8d3367aa60…`, 48/48 scripts parsed, 0 failures). Every page chunk the clone was built from is byte-identical to the live copy (sha256): `0fwc0347bccaa.js` `c762ac84…`, `2hf-m2wen5p-4.js` `25e64e57…`, `18ec6cjdps6ll.js` `61b47c01…`, `2qomgocduultg.js` `8afa411a…`, `2fbrdg5m4_g_8.js` (Lenis) `c8dcfe22…`. The shared chunks `1h0nvyhf5gbrf.js` (FlatCta 892855 / CMSLink 737900 / AnimatedText, `10b2627a…`) and `37xz28pjbnlx4.js` (FullBleed 540431 / useScrollTrigger 210104, `b234eef5…`) are the same files read in the security, guides and enterprise audits, so their FlatCta and retroactive-intro fixes were ported as-is.

`inspect_web_event_listeners` ran on every section root and interactive child (ids in the tables). Window/document listeners can't be selected; they were read from the chunks (Radix DismissableLayer `pointerdown`/`focusin` on document, react-remove-scroll `wheel`/`touchmove` on document, Lenis `wheel`/`touch*` on window). Runtime probe on scale.com: `Element.scrollIntoView`, `history.pushState/replaceState` and `window.scrollTo` were wrapped, then the hero CTA and the search input were driven.

Playwright, identical inputs on scale.com, the clone and Vahue `/careers` (scripts `scratchpad/careers-audit/qa.js`, `probe2.js`, `probe3.js`; 1440×900 and 390×844; OneTrust hidden with CSS; fresh page load per part):
- CTA hover: fill sampled at 200 / 400 / 600ms after entering, every 100ms for 800ms after leaving, re-entry 150ms into a leave, focus
- hero CTA click: scroll position every 50ms and every 250ms, URL
- search: focus, typing 2 then 3 characters (scroll every 120ms), clear button, Escape, no-match
- dropdowns: hover, pointerdown (state at down), menu geometry, body styles, a 400px wheel outside and a 200px wheel inside the open menu, item hover / leave, End / ArrowDown / PageUp / ArrowUp / PageDown / Home / typeahead `s`, `a`, (1.1s) `r` / Tab, outside click, a click on a department row while open, right-click outside, pick (scroll every 120ms), reopen, Escape, Clear filters
- keyboard: trigger Enter / ArrowDown / Space / Escape, ArrowDown on the trigger while open, Tab order
- departments: hover, open and close (panel height every 75ms), Expand all / Collapse all, page height and scroll every 100ms, row and Apply hover, Apply click (`window.open` recorded), focus styles
- sticky bar at a point inside the list, then a 300px wheel up
- pre-footer: reload, jump to the page bottom, CTA state 2.5s later

QA images: `qa/careers/interactions/<w>-<name>-{scale,clone,vahue}.jpg`.

### Fixes in this audit
- **FlatCta** (hero, news cards, pre-footer): Scale's state machine (module 892855) as on the security / guides / enterprise clones: the fill moves on the CSS `translate` property (the `transform` transitionend never matches, so leave resets on the 680ms timer), re-entry during a leave snaps the fill back first, the chevron strip snaps back on leave. CMSLink focus rules: internal links get `focus:outline-1 focus:outline-scale-skyblue` (1px #86bff2), external links (news cards) show the UA ring. The clone used `transform` (fill sampled in px), a 380/680ms phase timer without the re-entry snap, a CSS-hover strip, and a transparent 2px outline on every CTA (the app resets `a { outline }`).
- **Hero CTA click**: measured on scale.com, the click does `pushState('#open-roles')` and glides there through Lenis (per-frame `scrollTo({ behavior: 'instant' })`, damping ratio 0.87 per 16.7ms frame = lerp 0.14), not a native `scrollIntoView`. The clone called `scrollIntoView` smooth (912 / 4294 / 5212 px at 250ms steps against Scale's 5200 / 5595 / 5644) and left the URL alone. It now pushes the hash and calls the shared `window.__lenis.scrollTo(target)` (lerp 0.14); href `/scale-clone/careers/#open-roles` like Scale's `/careers#open-roles`.
- **FullBleed** (hero, pre-footer): the intro uses useScrollTrigger's end `bottom 20%` and the retroactive refresh check (`progress > 0 || scroll ≥ start − 1`) instead of `once`; the media scale is set in `onUpdate` only (no `onRefresh`), as in the page's own copy of the section.
- **Filter scroll**: native `scrollIntoView({ behavior: 'smooth' })` like Scale (the clone ran its own 300–700ms ease-in-out), re-issued when a ScrollTrigger refresh cuts it short (see Remaining gaps).
- **Dropdowns** (Radix DropdownMenu, module 442707's `e7`):
  - Lenis keeps scrolling the page on wheel while the menu is open (Scale +319px for a 400px wheel), and the menu follows the trigger (6px below it after the wheel on both). The clone blocked the wheel and left the menu where it was.
  - Outside click: closes, the click doesn't reach the element under the pointer, focus returns to the trigger; a right-click closes without refocusing. The clone let the click through (in the first run it followed the header link and navigated) and didn't refocus.
  - Keys: ArrowDown on the trigger only opens (it toggled); in the menu Tab does nothing (it closed), PageUp/PageDown = first/last, typeahead with Radix's 1s buffer and repeated-character cycling (missing), focus moves in a setTimeout as in RovingFocusGroup (a Space pressed right after ArrowDown lands on the previous item on both).
  - Items: pointer leave hands focus back to the menu; a keyboard-focused item has no highlight style (Scale's items only have `hover:` and `focus:outline-none`; the clone painted gray-95 on `:focus-visible`); boundary events from a keyboard scroll under a resting pointer don't steal focus; the menu scrolls with `scroll-behavior: auto` (the app sets `smooth` on every element).
  - Body gets `data-scroll-locked="1"` with the overflow lock.
- **Cursors / focus**: department buttons, triggers, Apply and the text buttons keep the default cursor (Tailwind v4 preflight; the app's Tailwind 3 preflight gave them `pointer`). Position rows and the mission links show the UA focus ring (plain links on Scale).
- `refreshScroll` calls `lenis.resize()` before `ScrollTrigger.refresh()`, as Scale does.

### 1 · Hero FullBleedMediaSection
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| CTA "View Open Positions" (`<a href="/careers#open-roles">`) | pointerenter / leave | React; the anchor itself has HubSpot `mousedown` (capture) + Next Link `click` (`ev_bb996bc48838…`) | 892855 + 737900 | white arrow: wash .35, 600ms ease-out on `translate`. Enter at 200 / 400 / 600ms: Scale −34.81 / −7.84 / 0%, clone −34.82 / −6.59 / 0%. Leave every 100ms: Scale 0, 38.78, 65.18, 83.92, 93.41, 98.46, 100, −100%; clone 0, 38.80, 65.18, 83.92, 93.40, 98.46, 100, −100%. Strip −50% → 0 on both | yes (**fixed**) | `*-cta-hero-hover-*` |
| CTA | focus | — | 737900 | `solid 1px rgb(134,191,242)` on both (clone had a transparent outline) | yes (**fixed**) | — |
| CTA | click | Next Link + Lenis | runtime probe | `pushState #open-roles`, then Lenis lerp 0.14 to the section. 1440 at 250ms steps: Scale 5200 / 5595 / 5644 / 5650 / 5651, clone 5047 / 5577 / 5644 / 5651 / 5652 (root top 1 vs 0); 390: Scale 7083 / 7617 / 7683 / 7691 / 7692, clone 6875 / 7593 / 7679 / 7690 / 7691 | yes (**fixed**) | — |
| clip / media | scroll scrub | ScrollTrigger (`html` scroll, `ev_57e8021756d0…`) | 0fwc 540431 copy | unchanged from the Motion table; media scale now set in onUpdate only | yes | — |

### 2 · In The News
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| card CTA (arrowOutline, external `<a target=_blank>`) | hover / leave / re-entry | HubSpot `mousedown` only on the anchor (`ev_acf3a0faef30…`); React pointer handlers delegated | 892855 + 737900 external branch | wash .30. Enter: Scale −34.82 / −7.84 / 0%, clone −34.80 / −7.83 / −0.04%. Leave: Scale 0, 38.79, 65.19, 81.82, 93.41, 98.46, 100, −100%; clone 0, 38.81, 65.18, 81.81, 93.40, 98.46, 100, −100%. Re-entry 150ms into a leave: Scale −100, −89.39, −61.18%; clone −100, −89.36, −61.20% | yes (**fixed**) | `*-cta-news-hover-*` |
| card CTA | focus | — | 737900 | UA ring `auto 1px rgb(0,95,204)` on both | yes (**fixed**) | — |

### 3 · Our Mission · 4 · Our Credos · 5 · Our Benefits
Server markup with no listeners besides the mission links (plain `<a class="underline transition-colors hover:text-scale-gray-10">`): colour #575757 → #212121 over 150ms on both, UA focus ring (**fixed**: the app's `a { outline }` reset hid it). Credo and benefit cards have no hover or focus states on Scale. Reproduced.

### 6 · Open positions (FilterPosition, module 442707)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| section root `#open-roles`, sticky bar | — | none (`ev_94e8254ba432…`, `ev_0c4b5ebb9762…`) | 442707 | the bar is `sticky top-0 z-10 bg-white/90 backdrop-blur-sm` but never sticks (the `overflow-x-hidden` main is its scroll container): inside the list at 1440 its top is −352px, −112px after a 300px wheel up, on both; 390: −469 / −229 on both | yes | `*-sticky-*`, `*-sticky-up-*` |
| search input | focus / type / Escape | React `invalid` + FullStory `select` (`ev_57a8f08968a1…`); `onChange`/`onKeyDown` delegated | 442707 | border #EAEAEA → #575757 on focus; every keystroke (from 1 character) calls `root.scrollIntoView({ behavior: 'smooth' })`; filtering from 3 characters; Escape clears; "×" clear button (gray-60 → gray-10). Typing `x` from 5252, every 50ms: Scale 5252, 5310, 5574, 5784, 5881, 5936, 5977, 5992, 5999, 6000; clone 5252, 5279, 5460, 5733, 5798, 5950, 5984, 5997, 6000 (one refresh restart at 150ms). "eng": summary and header lines identical in form; no-match strings identical | yes (**fixed** scroll) | `1440-search-eng-*` |
| filter trigger (`button[aria-haspopup]`) | hover / pointerdown / keys | HubSpot `mousedown`; Radix `pointerdown`/`keydown` delegated (`ev_c06a15be0a19…`) | Radix trigger in 2hf-m2wen5p-4 | idle #F2F2F2 / #EAEAEA / #929292, hover border + text #575757, 150ms; opens on pointerdown (open at mousedown on both); Enter / Space toggle, ArrowDown only opens (open stays open on both after the fix) | yes (**fixed** ArrowDown) | — |
| menu (Radix content) | open | DismissableLayer + react-remove-scroll (document) | 2hf-m2wen5p-4 | 288×540 at 6px below the trigger (390: 358×506, flipped above), item 46px (44), no open animation; body `overflow hidden`, `pointer-events none`, `data-scroll-locked 1` on both (attribute **added**); z 50 vs 60 (portal target) | yes | `*-dd-open-*` |
| menu | wheel | Lenis on window; remove-scroll on document | 2fbrdg5m4_g_8 + Radix | 400px wheel outside: page +319 on both (clone was 0); menu then sits 6px below the trigger on both; 200px wheel inside: menu scrollTop 151, page +1 on both | yes (**fixed**) | — |
| menu items | pointer / keys | Radix item `pointermove`/`pointerleave`, RovingFocusGroup | 2hf-m2wen5p-4 | hover focuses the item (`data-highlighted`, bg #F2F2F2); leave focuses the menu. Keys from a hovered item: End → University, ArrowDown → University (no loop), PageUp → first, ArrowUp → first, PageDown → last, Home → first, `s` → Sales, `a` → Sales, 1.1s later `r` → Research, Tab → stays open: identical sequences on both. Boundary events after a keyboard scroll don't move focus (both) | yes (**fixed**) | — |
| menu | outside click / right-click / Escape | DismissableLayer | Radix | outside click closes, focus → trigger, the click doesn't reach the department row under it (it opens on the next click) on both; right-click closes, focus → body on both; Escape closes, focus → trigger | yes (**fixed**) | — |
| item pick | click | Radix CheckboxItem `onCheckedChange` + default `onSelect` close | 442707 `e7` | toggles, closes, focus → trigger, trigger turns #212121 / white but keeps "All Departments" (Scale quirk, `customSelectedDepartments []`), then `scrollIntoView` smooth: Scale 5502 → 5983 → 6000, clone 5502 → 5967 → 6000 (120ms samples) | yes | `1440-dd-picked-*` |
| department button | hover / click / focus | HubSpot `mousedown` + React `click` (`ev_cb16d5dcd218…`) | 442707 `ri` | hover bg #F2F2F2 (150ms), cursor default (**fixed**), `focus:outline-none`; panel `grid-template-rows 0fr ↔ 1fr`, `transition-all 300ms ease-out`: open fractions at 75ms steps Scale .54 / .84 / .98 / 1, clone .62 / .88 / .97 / 1 (sampling phase); counter "1 of 15 expanded" on both | yes | `*-dept-hover-*`, `*-dept-open-*` |
| Expand all / Collapse all | hover / click | React | 442707 `rc` | gray-60 → gray-10; all 15 open, "15 of 15 expanded", "Collapse all", scroll unchanged (5502 on both); 340ms → 50ms → rAF → `lenis.resize()` + refresh (**added** the resize) | yes | — |
| position row (`<a href="/careers/<id>">`) | hover / focus | HubSpot `mousedown` + Next Link `click` (`ev_cceb62719cac…`) | 442707 `rs` | bg #EAEAEA + title black (150ms), cursor pointer; UA focus ring (**fixed**) | yes | `*-row-hover-*` |
| Apply → | hover / click | React | 442707 `rs` | #575757 → #212121, cursor default (**fixed**); click `preventDefault` + `window.open(absolute_url, '_blank', 'noopener,noreferrer')`, no navigation, on both | yes | — |

### 7 · Pre-footer FullBleedMediaSection
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| CTA "Explore Opportunities" (internal CMSLink) | hover / leave / focus | HubSpot `mousedown` + Next Link `click` (`ev_f7427fd87f4f…`) | 892855 + 961870 intro | leave: Scale 0, 38.80, 68.50, 83.92, 93.40, 98.46, 100, −100%; clone 0, 38.80, 65.20, 83.92, 93.41, 98.46, 100, −100%; focus 1px #86bff2 on both | yes (**fixed**) | `*-cta-prefooter-hover-*` |
| intro | scroll `top center`, retroactive | useScrollTrigger 210104 | 0fwc / 37xz28 | reload + jump to the bottom: h2 opacity 1, CTA `1 visible 8px` on Scale, the clone and Vahue | yes (**fixed**: `once` → refresh check) | — |

### Vahue `/careers`
`components/careers/VahueCareersPage.tsx` renders this `CareersPage`, so every fix applies with the same params. Measured with the same script (1440 and 390, no console errors):
- CTA wash curves are identical to the clone, and the focus outline is skyblue on internal CTAs. The hero click pushes `/careers/#open-roles` and glides through Lenis. It stops with the section 88px down, under the sticky site navbar, because `#open-roles` carries `scroll-margin-top: 88px` (vahueCareers.module.css), which Lenis and `scrollIntoView` honour. The hero CTA href is now `/careers/#open-roles`.
- Search and filter scrolls land the bar at 96px, the same 88px offset.
- The dropdown opens on pointerdown 6px below the trigger and gets the body lock with `data-scroll-locked`. Lenis scrolls the page on a wheel (+319) and the menu follows the trigger (6px). The same keys, outside-click and Tab behaviour apply.
- The pre-footer retro intro plays.
- The board has a single department and a single role, so the multi-row checks (department index, menu scrolling) don't apply. With one option, the keyboard round trip unticks the same item, so the trigger ends light.
- Mission links show the UA focus ring (`focus-visible:[outline:revert]`).

### Not reproducible / not measured
- Department counts, panel heights and option lists differ (static 55-row snapshot against the live 275-row board), so the department panel heights are compared as fractions, not pixels.
- The menu's z-index stays 60 (portal into the page root for theming).
- The bottom-right HubSpot / OptinMonster widgets on scale.com are not part of the clone.

## Remaining gaps
- Job data is a static snapshot (37 jobs / 55 rows instead of the live 170 / 275), so role counts, open-panel heights and the location option list differ from the live board; the collapsed list (15 departments) lines up exactly. No "Loading positions…" spinner or "Try again" error state (no fetch).
- Row links go to `https://scale.com/careers/<id>` (no job detail page in the clone); Apply opens the Greenhouse URL.
- Fonts: Vahue display/mono instead of Aeonik / Aeonik Mono. Mono labels run a few px wider (e.g. "APPLY →" 64 vs 56 px, and the arrow glyph is longer); headings within 1px.
- The dropdown is a hand port of Radix DropdownMenu (no Radix dependency); since the 2026-11-01 audit its pointer, keyboard, typeahead, dismiss and scroll behaviour match Radix as measured (see the interaction inventory). Not ported: `aria-hidden` on the rest of the page (hideOthers) and the FocusScope trap internals (Tab is swallowed, as on Scale). The menu sits at z 60 (Radix portals to the end of `<body>` at z 50, above the z-50 header); the clone portals into the page root for theming.
- Filter smooth scroll: native `scrollIntoView({ behavior: 'smooth' })` as on Scale. In the clone the filter also changes the page height, and the ScrollTrigger refresh that follows (`useRefreshOnPageGrow`, 150ms) restores the recorded scroll position, which cancels a native smooth scroll; for 1.5s a refresh that leaves the root short of its target re-issues the scroll from there (wheel/touch cancels). The curve is Chrome's own, with one restart when a refresh lands mid-way. The clone's own dropdown/collapse refreshes wait until scrolling has been idle for 120ms.
- The app's global `* { scroll-behavior: smooth }` (app/globals.css) also applies on the clone and Vahue pages (Scale: `auto`). Every scroll the page itself starts passes an explicit behaviour (Lenis `instant`, filter `smooth`), and the dropdown sets `auto` on itself, but browser-initiated scrolls (find-in-page, Tab focus scrolling a link into view) glide on the clone and jump on Scale. Left alone: it is a shared app rule.
- Mission links point to `/scale-clone/data-engine` (Scale: `/data-engine`).
- 390 page total differs by 40px, all in the shared `ScaleFooter`.

## REA evidence
- `analyze_web_bundle` `ev_f1398348df35c7a8…` (48 scripts, Greenhouse endpoints, chunk list).
- `inspect_web_event_listeners`: trigger `ev_634a4311b26d…`, department button `ev_6b4a5606cff…`, position row `ev_08c31f7b6c3…`, search input `ev_323feace7ad…`.
- Source modules read: 442707 (`2hf-m2wen5p-4.js`), 165311 + 242648 (`18ec6cjdps6ll.js`), 540431 (`37xz28pjbnlx4.js`) and its copy in `0fwc0347bccaa.js`, 15518 / 756380 (`0fwc0347bccaa.js`), 737900 CMSLink (`1h0nvyhf5gbrf.js`), 473665 icons (`2qomgocduultg.js`), 255667 Lenis 1.3.21, 883495 ScrollTrigger.
