# labs.scale.com/leaderboard clone spec

| | |
|---|---|
| Source | https://labs.scale.com/leaderboard (labs Next 16 app, see [labs-stack.md](./labs-stack.md)) |
| Clone | `/scale-clone/labs-leaderboard/` |
| Page | `app/scale-clone/labs-leaderboard/page.tsx` (wrapped in `<LabsShell>`, no `smoothScroll`: labs runs Lenis on `/` only) |
| Components | `components/scale-clone/labs-leaderboard/`: `LabsLeaderboard.tsx` (page), `LabsTooltip.tsx` (Radix Tooltip stand-in), `EvaluateDialog.tsx` (HubSpot dialog), `iconSvgs.tsx` (lucide + flag SVGs), `content.ts` (data) |
| Shared chrome | `components/scale-clone/labs-shared/` (header with `[LEADERBOARDS]` active, footer, `LabsDialog`, search stand-in, `labsHref`, `s.btn`, `s.mono`). Not modified |
| Assets | none (no images on this page; icons are inline SVG) |
| Static snapshot | **captured 2026-11-01** from the RSC payload: `Home` props `categories` (45 leaderboards in server order, of which 20 active + 25 deprecated, none `isSinglePage`) and `colorConfig` (18 brand colours). Only the top 3 `scores` of each board are kept (the card renders `scores.slice(0, 3)`). No runtime API calls. Re-capture by decoding `self.__next_f` on the live page and reading the `$L17` (`Home`) props |

## Libraries (REA `analyze_web_bundle` `ev_b2255dc286524a455f47ff398e7abc4f61306d39e4dd7803edaad57f64fa9fbe`, 31 scripts, parse complete)
- Same labs stack as the other labs routes: Next.js 16.3.6 Turbopack, React, Tailwind v4, shadcn/ui on Radix (Tabs, Tooltip, Switch, Label, Dialog), lucide-react, HubSpot form embed, Inkeep (lazy). No Lenis on this route, no framer `ScrollReveal`, no GSAP.
- Page component: `Home` (chunk `2jo7h7vmxpuz6.js`, module 218341, which also bundles all of lucide + country-flag-icons for the Sanity icon picker).
- Score rows: `LeaderboardScoreEntry` (chunk `37yhmp3ou6exv.js`, module 41336). Brand colours: module 371198 (`BRAND_COLORS`, `getProviderKeyFromModelOrOrg`). Tabs: module 795322 (Radix Tabs + RovingFocusGroup). Tooltip: module 650118 (shadcn wrapper of Radix Tooltip in `2ri_cj1i8zivb.js`). Badge: 441068. Button: 979543. HubSpot dialog button: 385368 (`043v05hl3en9y.js`). URL helpers: 480201 (`buildUrl`, `buildUrlWithCategory`).
- The repo has no Radix, so Tabs, Switch and Tooltip are reproduced by hand with the same behaviour (see the inventory). The labs Tailwind build has no tailwindcss-animate, so the tooltip/dialog `animate-in` classes are inert there: everything shows and hides instantly, as in the clone.
- `html.loaded *` 200 ms colour transition override (shared `LabsLoaded`) applies: hover colours tween 200 ms ease-in-out; `transition-all duration-300/1000` on cards and score bars, and `transition-transform` on the switch thumb, are killed by it (thumb jumps instantly; measured on both).

## Listener map
| Target | Events | Evidence | Source |
|---|---|---|---|
| card `<a>` (`#all a`) | React root-delegated `click` (`3k3q0u73winx8.js`) | `inspect_web_event_listeners` `ev_f2f9a69d1656900342b9f9abf174b5453d4017af7bfd55852866357c23e50181` | Next `Link` to `/leaderboard/<id>[?tab=<tabKey>]` |
| `#show-deprecated` | React root-delegated `click` | `ev_90dc152f6ff582cb9d02e2e3b27c0903daf4f3e3a8a33f0ea9ff05511bf66e93` | Radix Switch `onCheckedChange` → `toggleDeprecated` |
| tabs, tooltip triggers, info button, buttons | React props (`onMouseDown`, `onFocus`, `onKeyDown`, `onClick`, `onPointerMove`, `onPointerLeave`, `onPointerDown`, `onBlur`) | module source | 795322, 650118/Radix, 41336, 218341 |
| `document` | `keydown` Escape (open tooltip), ⌘/Ctrl+K (header search) | module source | Radix DismissableLayer; header 595877 (shared) |
| `window` | `scroll` capture (closes an open tooltip whose trigger is inside the scrolled node) | module source | Radix TooltipContentImpl |

## Sections (1440 / 390; every probe below measured equal on both sites)
| Section | Markup | 1440 (top · size) | 390 |
|---|---|---|---|
| Hero `qX` | `section border-b hairline`, wrap `max-w-1400 px-6 lg:px-10 py-16 md:py-20 lg:py-24`. h2 `[LEADERBOARDS]` 12/18 500 tracking .025em, mb-10. h1 `testing the limits of AI.` 36→48→60 px / 1.25, 300, tracking -0.05em, balance. Lead 12/21.6 `#525252` max-w-lg. Button black `Start Exploring` + ArrowRight (forced 16 px by `[&_svg]:size-4`). Stats column `lg:w-[320px]`: label 12 `#999` uppercase, number 30/45 300 tracking -0.025em, copy 12/1.7; 2nd stat `border-l` (mobile) / `border-t` (lg) | 57 · 1440×556; h1 211, 672×75; button 364, 175×40; stats x 812 | 57 · 390×571; h1 179, 342×45; stats side by side (2nd at x 184) |
| Tabs + grid `#leaderboards` (`scroll-mt-20`) | top rule `#e5e5e5`; TabsList `bg-#f5f5f5 border hairline p-1 md:h-10`, text `#71717a`; triggers `px-3 py-1.5` 12/18 500 `#525252`, active `bg-ink text-white shadow-xs`. Panel: only the active one mounts; `all` has `pb-16`, others none. Grid `grid-cols-1 sm:2 lg:3 gap-6` | tablist 638 · 246×40; first card 702 · 424×306; 20 cards, last 2682 | tablist 653; card0 717 · 342×374; last 8067 |
| Card `qG` | `<a>` `border hairline p-6 bg-white hover:bg-#f5f5f5 group`; h3 14/21 500 (country flag first for SA/CN/JP/KR/ES, `w-5 h-5 mt-0.5 rounded grayscale`); description 12/19.5 `#525252`; 3 score rows (`gap-3 mt-4 mb-4`); `View Full Ranking →` 12 `#525252`, group-hover ink + underline (offset 2), arrow in `--font-unicode` | — | — |
| Score row (41336) | rank 1-3 in 32 px circles (`#111`, `#525252`, `#a3a3a3`, Geist Mono 12 500 white), else mono 14 `#a3a3a3`. Name row `h-[22px] gap-x-2` (mobile `flex-wrap h-auto`): model mono 12 ellipsis; with a contamination message the model (and NEW badge) sit inside a button with a `CircleAlert` 16 px, text `#525252`; NEW badge 10/10 600 tracking .1em (mobile .05em, px-1) `bg-#e5e5e5 #525252` pill; score mono 12 `score.toFixed(2)` + `±ci.toFixed(2)` `#525252` (hidden when ci = 0; mobile wraps to its own right-aligned line). Bar: `h-4 bg-#f5f5f5`, fill width `score/maxScore`, colour from brand map (`getProviderKeyFromModelOrOrg` → `colorConfig`, fallback hash of company), CI line 2 px + two 8 px ticks in ink. Deprecated entries use `#d4d4d4` and 0.4 fill opacity (none in the top 3 of the snapshot) | model 812 · 151×18; badge 288 · 45×16; bar 833 · 330×16, fill 298 | badge 35×16; score on 2nd line (863); bar 248 |
| About `qK` | `section py-16 border-t hairline`, `grid md:grid-cols-3 gap-8`; lucide Mountain / PencilRuler / Shield 20 px `#525252` mb-4; h2 14/21 500 tracking .025em; p 12/19.5 | 3032 · h 257 | 8485 · h 615 |
| Deprecated `br` (`#deprecated`) | `py-8`, centred row gap-2: Switch (44×24, `bg-#d9d9d9` → `#18181b`, thumb 20 px white shadow-lg, x 0→20), Label 12 500 `#525252`, Info button (16 px `#525252` hover ink). When on: grid `mt-12` with the 25 deprecated cards | 3289 · h 88 | 9100 |
| Evaluate `bp` | `section py-16 border-t`; box `border hairline p-8` centred: h2 `[EVALUATE YOUR MODEL]` 14/21; copy 12/19.5 centred `max-w-3xl` with `mailto:leaderboards@scale.com` (Cloudflare-obfuscated on labs, decoded by `email-decode.min.js`; the clone renders the decoded link) underline, hover `#525252`; black button `Evaluate your Model` | box 3442 · 1320×206 | 9253 · 342×284 |
| Footer | shared LabsFooter | 3712 · h 175 | 9601 · h 283 |

Page height: 3887 (1440) / 9884 (390) on both; with deprecated shown 6884 / 19304 on both.

## Motion
| What | Trigger | Params | Clone |
|---|---|---|---|
| Hover colours (card bg, View Full Ranking, info icon, mail link, tabs) | hover | 200 ms ease-in-out (`html.loaded *`); card at 100 ms `rgb(250,250,250)` on both | `LabsLoaded` (shared) |
| Switch | click | track colour 200 ms; thumb transform instant (override kills `transition-transform`) | same (60 ms sample `rgb(192,192,192)` both at 1440 in the final run) |
| Start Exploring | click | `#leaderboards.scrollIntoView({behavior:'smooth', block:'start'})`, `scroll-mt-20` → lands at 533 (1440) / 548 (390) | same; samples every 100 ms 142 449 517 533 on both |
| Tooltip / dialog | open/close | instant (no tailwindcss-animate) | instant |
| Reveal / smooth wheel | — | none on this route | none |

## Interaction inventory
Method: REA bundle + listener evidence above; module source read from the curl'd chunks; Playwright with identical inputs on both sites at 1440×900 and 390×844 (`scratchpad/lb/qa.js`, `cards2.js`, `row.js`, `deep.js`). QA images: `qa/labs-leaderboard/{scale,clone}-{1440,390}-sNN.jpg` (every 50% viewport; 1440 every 2nd, 390 every 4th) and `qa/labs-leaderboard/interactions/`.

### Hero
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| Start Exploring | click | React onClick | 218341 | smooth `scrollIntoView` to `#leaderboards` (scroll-margin 80) | yes (same samples, end 533 / 548) | — |
| Start Exploring | hover | CSS | 979543 | `hover:opacity-75` (instant: opacity isn't in the override) | yes | — |

### Tabs + leaderboard grid
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| tab trigger | mousedown (button 0, no ctrl) | Radix `onMouseDown` | 795322 | selects on mousedown; only the active panel mounts. Counts All 20, Agentic 9, Safety 2, Frontier 9 | yes (same cards, first card, page height per tab) | `*-tab-agentic.jpg` |
| tab trigger | click | React onClick | 218341 | `history.replaceState({category}, '', '/leaderboard?category=<t>')` (`all` → no query). Clone: `/scale-clone/labs-leaderboard/?category=<t>` | yes (`?category=agentic` … `''`) | — |
| tab trigger | ArrowLeft/Right/Up/Down, Home/End/PageUp/PageDown | Radix RovingFocusGroup `onKeyDown` | 795322 | loop, focus moves via `setTimeout`, automatic activation on focus; keyboard does NOT update the URL | yes (ArrowRight, End, loop wrap, ArrowLeft wrap: same tab, focus and URL) | — |
| tab trigger | focus | Radix `onFocus` | 795322 | activates when focused (automatic mode) | yes | — |
| `?category=` deep link | load | server `Tabs defaultValue` | 218341 | `agentic/safety/frontier` preselect the tab | yes (clone reads it on mount; `?category=safety` → Safety, 2 cards on both) | — |
| card | hover | CSS | 218341 | bg `#f5f5f5` + View Full Ranking ink/underline, 200 ms | yes (100 ms and 400 ms samples equal) | `*-card-hover.jpg` |
| card | click | Next Link | 218341 / 480201 | `/leaderboard/<id>` plus `?tab=<tabKey>` for SWE-Bench Pro V2 / MultiChallenge / SWE-Bench Pro. Clone links to the live labs detail page via `labsHref` | yes | — |
| model name | pointermove / leave | Radix Tooltip | 41336 | delay 300, side top, sideOffset 5; content `border #d9d9d9 bg-white px-3 py-1.5` 14/21 `#09090b` shadow-md, radius 0 | yes (closed at 250 ms, open at 350 ms, rect 117,772 176×35 on both) | `*-tip-model.jpg` |
| score bar | pointermove / leave | Radix Tooltip | 41336 | delay 300, sideOffset 4; "Score: x / ± ci / Range: a to b" | yes (rect 207,361 174×77 on both) | `*-tip-bar.jpg` |
| contamination model (+ NEW) | pointermove | Radix Tooltip (controlled) | 41336 `u` | delay 0, w-400 max `100vw-2rem`, sideOffset 5 | yes (open at 30 ms, rect 877,239 400×77) | `*-tip-contam.jpg` |
| contamination model | click / tap | React onClick | 41336 `u` | `preventDefault + stopPropagation` (card doesn't navigate), `setOpen(true)` (Radix trigger click closes first, so a mouse click toggles it closed; a touch tap opens it) | yes (1440: stays on page, closed; 390 tap: open 0,310 358×98 on both) | `*-390-tip-contam-tap.jpg` |
| any tooltip | leave toward content / away | Radix grace area | Radix TooltipContentHoverable | stays open while the pointer is in the hull of exit point (±5 px) + content; closes outside | yes (toward: open, away: closed on both) | — |
| any tooltip | Escape, ancestor scroll, focus/blur, pointerdown+click | Radix | Radix | Esc closes; wheel scroll closes; focus (not from pointer) opens instantly; one tooltip at a time | yes (Esc and scroll checked) | — |

### About
No interactions (static icons and copy). Reproduced 1:1 (positions equal).

### Deprecated
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| Switch | click / Space / Enter | Radix Switch | 218341 (`q7`) | toggles `showDeprecated`; 25 deprecated cards in a `mt-12` grid; first `SWE-Bench Pro (Public Dataset)` → `?tab=public` | yes (count, order, page height 6884 / 19304 equal) | `*-deprecated-on.jpg` |
| Label | click | native `for=show-deprecated` | 218341 (`bd`) | toggles the switch; double-click text selection blocked (`detail > 1` preventDefault) | yes | — |
| Info button | pointermove | Radix Tooltip | 218341 | delay 700 (provider default), sideOffset 5, w-400; click is prevented/stopped | yes (closed at 650 ms, open at 760 ms, rect 643,339 400×98) | `*-tip-info.jpg` |
| Info icon | hover | CSS | 218341 | `#525252` → ink 200 ms | yes | — |

### Evaluate your model
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| Evaluate your Model | click | React onClick | 385368 | Radix Dialog `w-[calc(100vw-2rem)] sm:max-w-2xl`, title = label, HubSpot form `066ee34e-76d9-46cd-ad4d-b47ee39ee16a`: first/last name, company/job title (2 columns, stacked < 480), work email, country (252), project details textarea (65 px), hidden utm_*, privacy line, black `Submit →` | yes: dialog 384,146 672×607 (1440), 16,32 358×780 (390), every field at the same offset and size | `*-dialog.jpg` |
| dialog | Escape / overlay click / close X | Radix | shared `LabsDialog` | instant close | yes | — |
| mail link | hover | CSS | 218341 | ink → `#525252` | yes | — |

## QA
- 40 geometry/type probes per width (hero, stats, tabs, cards, score rows, badge, bars, about, switch, evaluate box, footer, page height) match exactly at 1440 and 390, and per-card heights match for all 20 active and 25 deprecated cards at both widths.
- Interaction logs (tabs, keyboard, deep link, hover, four tooltip kinds, contamination click/tap, switch, label, Start Exploring, dialog) match line for line.
- 0 console errors on both.
- Fixes during QA: card h3 inherited the site's global heading letter-spacing (-0.35 px) → `tracking-normal` (390 page was 21 px short); the NEW badge moved inside the contamination button (labs passes both as children of `u`; 390 deprecated cards were 16 px taller); flags added after finding that labs does render `Flags[icon]` (only the lucide `Icon` lookup fails, because lucide exports are forwardRef objects and labs requires `typeof === "function"`); HubSpot rows stack with 32 px gaps on mobile; about-section icons rendered as direct SVG children.
- Only known difference: the shared footer sits outside the page's `text-xs` wrapper, so its computed base font-size is 16 px (labs 12 px). All footer text has explicit sizes, so nothing renders differently.

## Remaining gaps
- Leaderboard detail pages (`/leaderboard/<id>`) aren't cloned; cards open the live labs page.
- The data is a static 2026-11-01 snapshot; live rankings change.
- `?category=` is applied on mount (labs renders it on the server), so a deep link shows "All" for one frame before switching.
- Tooltip popper is a hand-written stand-in for floating-ui (top/bottom flip, x shift with limitShift); positions matched in all sampled cases.
- Search is the shared static stand-in, indexing the 45 leaderboards.
- HubSpot forms validate but never post.
