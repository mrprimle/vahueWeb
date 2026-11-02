# /security

Live source: https://scale.com/security, read 2026-11-02 at 1440x900 and 390x844, geometry also at 640, 768, 1024, 1280, 1920. Menu label: Security. QA sheets: scratchpad `new-qa/security/` (clone and filled).

## Stack
Next 16.4.2 App Router route, no page-specific library. Everything runs on shared ports, see [../stack.md](../stack.md): 478135 (`compact` hero, non-globe branch, so `pb-10! pt-12! md:pt-24!` around 540431 with `startPercentage: 0`), 540409 and 874328 (`CardGrid`, `LinkCard`), 317967 (`BaseCard`), 756386 (`ScrollRevealSection`), 892855 (`FlatCta`), 961870 (`AnimatedFlatCta`), 947153 (`AnimatedText`), 141280 (`RichText`), 656598 (`ClipScrollSection`), 243385 and 995634 (theme setter and watcher). Page modules on Scale, chunk `2qkslhdhpvl_d.js`: 307270 (`CommitmentGrid`), 156373 (`PublicSectorCta`, `TrustCenterCta`). Those two are data only and live in `content.ts` and `SecurityPage.tsx`.

Files: `app/security/page.tsx`, `components/pages/security/` (`SecurityPage.tsx`, `content.scale.ts`, `content.ts`, `types.ts`, `icons.tsx`), `public/security/`.

## REA evidence
Private headless Chrome on 9271, closed and deleted after use.

| Tool | Scope | Evidence |
|---|---|---|
| `analyze_web_bundle`, script sources on | 46 of 46 scripts parsed, no parse failures, Next and React fingerprints | `ev_c79924f9b7e3dd79…` |
| `inspect_web_event_listeners` | hero root | `ev_3e0e0cd6bef970d5…`: none |
| same | `.CardGrid` | `ev_48e3118a2a83e256…`: none |
| same | `.CardGrid .BaseCard` | `ev_af70d2efb16f8fb4…`: none |
| same | `.ScrollRevealSection` | `ev_f2e1418af29d0fad…`: none |
| same | `.ScrollRevealSection article` | `ev_6e4c2fbd8f4e4996…`: none |
| same | article link | `ev_e9da2f6422b4957c…`: HubSpot `mousedown`, React root `click` |
| same | split card CTA | `ev_ec121370048555cb…`: same two |
| same | mailto link | `ev_8c63e004c6105c2c…`: same two |
| same | pre-footer CTA | `ev_dec331e14763f073…`: same two |
| same | `html` | `ev_f1b8e70567246971…`: passive `scroll` (`1h0nvyhf5gbrf.js`), OneTrust `keydown` and `click` |
| same | `body` | `ev_5782e9356743c92e…`: passive `touchstart` (`1h0nvyhf5gbrf.js`) |
| `observe_web_execution`, 20 s during wheel and hover | `ev_e7f69668045f0e2f…` | Executed: 756386 (136 calls, reveal scrub), 656598 and 540431 (24, clip and media scrub), 681201 (226), 210104 (207), 947153, 892855 (40), 961870, 317967 (42), 540409, 874328, 995634 (361), 474053, 511174 |

The response of `observe_web_execution` exceeded the MCP budget, so the retained record was exported and read by module, then deleted. `capture_browser_scenario` not needed: the observe window ran with real input from Playwright over CDP. No drag, tabs, carousels or pointer-move effects exist on this page: no section root has a listener and the executed code has none.

## Sections
1. Hero, `FullBleedMediaSection` compact, no CTA. 720 tall at 1440, 480 at 390.
2. Our Commitment: left-aligned title block (module 1900 with its left variant, inline in the page), `CardGrid` of 3 `LinkCard`s, no links.
3. Compliance: `ScrollRevealSection` (`scale-gray-95` behind a black panel), title block with side text, 4 articles, 2 columns from `md`, row layout inside from `sm`.
4. Two `cloud-slate` cards, `min-h-[600px]`, 288px image bottom right, `arrowOutline` CTA.
5. Responsible Disclosure, centred.
6. Pre-footer `FullBleedMediaSection`.

## Interaction inventory

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero clip and media | scroll | ScrollTrigger on Lenis, `ev_e7f69668…` | 656598, 540431 | Clip `startPercentage: 0`, media scale 1.25 to 1, `top bottom` to `center center` | Clip 0 both; frames equal |
| Hero text | load | `useInViewTrigger` `top center`, retroactive | 540431, 947153 | Headline then body, .2s apart | First-paint sheets equal at 1440 and 390 |
| Cards scale and fade | scroll | `useScrubTrigger`, same evidence | 317967 | Scale .96 to 1, opacity 0 to 1 | Scale and opacity within .02 at every stage: 35 at 1440, 40 at 390 |
| Card title words | reveal | `useInViewTrigger` `top bottom` | 540409, 947153 | Delay .125, stagger .05 per card, title at +.16, body at +.34 | .23, .57, .77, .90, .96 vs .24, .54, .74, .87, .95 |
| Card icon | reveal | same | 874328 | Clip right 100% to 0, .5s `power1.out`; opacity 1s from +.05 | t0 .99, .98, .96 equal at 1440 |
| Reveal panel | scroll | `useScrubTrigger`, 136 calls in `ev_e7f69668…` | 756386 | `top bottom` to `top top`, scaleX from `1 - 48/width`, radius 16 to 0 in last half | .967 16px, .975 12px, .983 8px, .992 4px, .998 .76px equal |
| Pre-footer clip | scroll | `useScrubTrigger` | 656598 | Inset 5% to 0, round 1.5rem | 4.5, 4, 3.6, 3, 2.5, 2, 1.5, 1, .82 equal |
| Pre-footer headline and CTA | reveal | `useInViewTrigger` `top center` | 540431, 961870 | CTA .85s, delay .5; radius 0 to 8 | Words .24, .58, .77, .89 vs .24, .54, .77, .89; CTA .082, .45, .694, .865, .943 vs .078, .447, .692, .845, .933 |
| Split card CTA | hover | React, FlatCta | 892855 | Fill 600ms from `-100%`, arrow slide, leave through +100% then reset | Enter -55.9, -31.5, -14.1, -4.5 vs -61.2, -34.8, -16.1, -6.6 (sample phase); leave 38.8, 68.5, 85.9, 95.5, 99.3 vs 38.8, 65.2, 83.9, 93.4, 98.5; reset -100 on the same sample; re-enter equal |
| Pre-footer CTA | hover | same | 892855 | Same | Enter -55.8, -31.5, -16.1, -6.6 vs -61.2, -34.8, -16.1, -6.6; leave equal within .03 |
| Links | Tab | Native | 463059 | Outline 1px `#86bff2` | `solid 1px rgb(134,191,242)` equal |
| CTA | tap at 390 | React root `click` | 892855 | Client navigation | Ours reached `/public-sector` in 2 of 3 runs, the first only missed the 2.5s window on a dev compile. Scale reached it in 1 of 3 inside the window, on the same Playwright tap |
| Split cards | hover | None | | No state | Colour and transform unchanged, both |

## Layout at widths, filled page vs Scale
Equal section tops and heights at 1440 and 640, and total height equal at 390 (two articles swap one line). 1920 checked by eye on the full-page pair only. Remaining deltas are one text line, 22.8px, from Vahue's longer name and Aeonik vs Aeonik Pro: 1024 reveal 1253.5 vs 1276.3, 768 reveal 1562 vs 1539.3. At 1280 card text wraps one line less, 627.6 vs 653.5, already in the clone with Scale's copy. Footer heights at 768 and 1024 are the known chrome issue.

Clone with Scale's copy: equal at 1440, 640, 768, 1024, 1920. 390: 22.8 shorter on Scale, FedRAMP body wraps one line less there (font). 1280: the card line above.

## Copy mapping
41 visible strings: 32 verbatim (78%), 2 light, 7 rewritten. Rewritten: DoD IL4 and FedRAMP became GDPR and HIPAA (no military or federal topics, same template, word counts 35 of 35 and 40 of 41); the Public Sector card became Scale-ups, matching the menu mapping for `/public-sector`, and the second card's Department of Defense list became the site's segments. Light: "government" to "customers" in card 3; "computer vision" to "back-office" in the Scale-ups body.

## Placeholders
18 lines with `// PLACEHOLDER` in `content.ts`: compliance intro, 4 certification logos, titles and bodies, the shared Trust Center link, both program claims on the split cards, the Trust Center CTA, `vulnerabilities@vahue.ai`. Capitol became a neutral line drawing of an office block (`office-tower.webp`, drawn for this page). GDPR and HIPAA badges come from `/enterprise/healthcare`. `capitol.webp`, `logo-disa.png` and `logo-fedramp.png` stay in `public/security/` for `content.scale.ts` only; the filled page does not load them.

## Gaps
- **Fonts:** Aeonik vs Aeonik Pro, DM Mono for Aeonik Mono, see stack.md.
- **Load-time reveal at 390:** on Scale the announcement bar lands after the first layout, so the grid sits at 807 under an 844 viewport and its cards reveal off screen before any scroll. Ours has the bar from the first paint, so they reveal when scrolled to. Part of the chrome issue the lead handles.
- **Image format:** Scale's optimizer serves AVIF at q85, ours WebP at q75 (Next's default `images.qualities`, shared `next.config`). The shield and office images carry a faint alpha backdrop: 1.0 of 255 levels on Scale, 1.6 here.
- **Dev only:** a Fast Refresh during a QA run re-ran `CardGrid`'s `animateSet` and left icons hidden in one 390 clone capture. The rerun and live sampling show them correct. Production has no Fast Refresh.
- **Trust Center:** no such site exists, so its links go to `/demo`.
