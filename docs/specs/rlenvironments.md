# /rlenvironments

Live source: https://scale.com/rlenvironments at 1440x900 and 390x844 (touch), plus geometry and pairs at 768 and 1024 and geometry at 1280 and 1920, 2026-11-01. Menu label here: Engineering Enablement. Page: `app/rlenvironments/page.tsx`, `components/pages/rlenvironments/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md): GSAP, ScrollTrigger, SplitText, Lenis. Fingerprint from `analyze_web_bundle` with sources: Next.js and React, 37 of 37 scripts parsed, no failures. The page body is one client component, module 799680 in `3za68ndmpk06v.js`, with its strings inline. There is no CMS payload for this page.

Reused: `FullBleedMediaSection` (with `ClipScrollSection`, `AnimatedText`, `AnimatedFlatCta`, `FlatCta`, `ResponsiveVideo`, `ResponsiveImage`), `CardGrid` with `LinkCard` and `BaseCard`, `SectionTitle`, `RichText`, `PageThemeSetter`, `SectionThemeWatcher`.

New in `components/site/shared`: `EnterprisePillars` (909085) and `HeadlineWithCta` (925107). Page-only ports: the capability list (497052, light theme, no mockup or plain branch), the container (858675), the icons (473665, paths read from `2qomgocduultg.js`).

Scale's `<Header border />` prop does nothing: module 511174 never reads it. Its page footer slot (137083) returns null.

## Sections
Tops and heights at 1440, Scale then filled page, after a full scroll with images loaded.

| # | Section | Module | Top | Height | Height at 390 |
|---|---|---|---|---|---|
| 1 | Hero, video | 478135 non-globe compact, 540431 | 135.3, 135.3 | 720, 720 | 480, 480 |
| 2 | Features, 4 link cards | 1900, 540409, 874328, 317967 | 1127.3, 1127.3 | 666.5, 666.5 | 1136.6, 1136.6 |
| 3 | Overview, 3 cards | 1900, inline | 1793.8, 1793.8 | 960.8, 960.8 | 1682, 1681.6 |
| 4 | Capabilities, 2 rows | 1900, 497052 | 2754.5, 2754.5 | 1420.8, 1420.8 | 1151.4, 1151.4 |
| 5 | Pillars, 3 items, video | 909085, 925107 | 4175.3, 4175.3 | 982.2, 982.2 | 1252.8, 1252.8 |
| 6 | Pre-footer | 540431, `startPercentage` 10 | 5157.4, 5157.4 | 720, 720 | 480, 480 |
| | Page height | | | 6808, 6808 | 7890, 7890 |

Other widths, Scale then filled, page height:
- **1280:** 6811, 6811. Equal in every section.
- **1024:** 6487, 6466. All body sections equal. The 21px gap is the shared footer, 1151.6 vs 1130.6.
- **768:** 7941, 7926. The overview row is 13.2px taller, one extra line in a 176px column, and the shared footer is 27.8px shorter (1472 vs 1444.2).
- **1920:** the overview row is 13.3px taller for the same reason. The measured page height is not comparable here (8102 vs 7036): Scale's two lazy capability images had not loaded when the script read it, and that accounts for 1,042px of the gap. Sections that do not depend on those images are equal in size.

On the clone, before fill, the only body wrap gap was one paragraph at 768 (159.3 vs 136.5, Aeonik vs Aeonik Pro, no effect on the row). The footer gaps at 768 and 1024 were already there: they come from the shared footer, not this page.

**Layout jump, on both sites:** the capability images declare 598x820 and 598x900, but the files are 598x371 and 598x374. Until they load, the page is 7861 tall at 1440 on both sites. It drops to its final height as they load. Kept, since it is Scale's behaviour.

## Layout changes by width
| Width | Change | Checked |
|---|---|---|
| below 768 | Card stack, overview stack, pillars stack, smaller hero and pre-footer | 390 |
| 768 | Overview goes to 3 columns, pillars to two columns, hero to 720 tall | 768, equal |
| below 1024 | Link cards stay stacked, no side entrance | 768 and 390: `x` offset 0, both |
| 1024 | Link cards go to 4 columns with the 160px side entrance, capability rows go to 2 columns | 1024, equal |
| 1280 | Link card padding and type step up (`xl`) | 1280, equal |
| 1472 and up | Container stops at 1472 | 1920, equal apart from the wrap above |

## Interaction inventory
Same script on both sites (`new-qa/rlenvironments/instr.cjs` in the scratchpad). React handlers are delegated to the root, so element-level REA results show only native listeners.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Section roots, cards, rows | any | None: `.FullBleedMediaSection` `ev_31ddba2c…`, `.CardGrid` `ev_b43e2b63…`, `.LinkCard` `ev_42afa231…`, overview `ev_f074d6bf…`, overview card `ev_78483351…`, `article` `ev_5ffb3761…`, `.EnterprisePillars` `ev_a42d5351…`, its `article` `ev_cfbf1128…` | | No hover, no pointer tracking | Pointer grid at 8 scroll stops at 1440 and 390: 0 style changes on any node, both |
| Link card link | | `.LinkCard a` not found, `ev_3a5ddfe7…` | 874328 | Scale passes no `link`, so cards are not links | Tab skips them, both |
| Hero text | load | ScrollTrigger `top center`, retroactive | 540431, 947153 | Lines and words, .2s between h2 and p | Same curve. Line y 70.7, 33.6, 13.6, 4.1, .8 vs 102.3, 52.6, 28.3, 13.7, 5.6 sampled at different phases, both at 0 by the same elapsed time |
| Hero and pre-footer CTA | load, trigger | gsap, delay .5 | 961870 | .85s, `filledWhiteArrow` | Opacity .44, .75, .91, .98 vs .46, .75, .91, .98 |
| Hero restart | `refresh` before the text ends | `retroactiveOnEnter` | 210104, 540431 | `onEnter` runs again until the text is done, so the CTA resets | Seen on both sites in repeat runs: Scale hidden, visible, hidden, visible; ours the same on the second run. A race, not fixed in either direction |
| Hero video | scroll | None | 310080, 540431 | Scale's `ref` never reaches the video, so no scale | `transform: none` at 11 stops, identical. Top 135.3, 85.3, 35.3… identical |
| Hero video element, pillars video | play | 24 React media listeners, `ev_892d703a…` | 310080 | Plays only while on screen | Ported |
| Link cards | scroll | ScrollTrigger scrub `top bottom` to `top 50%` | 317967 | Scale .96 to 1, opacity 0 to 1, x -160, 0, 0, 160, stagger .1 | 15 stops at 1440 and 390, identical strings on clone and filled |
| Card icon, title, body | `top bottom`, once | ScrollTrigger | 874328 | Clip .5s, icon 1s, title at +.16, body at +.34, stagger .05 per card | Clip 90.25, 72.25, 56.25… vs the same. Title opacity .2357, .5139, .7082 vs the same |
| Pillars icon | `top 80%`, once | ScrollTrigger | 909085 | Opacity .5s | .363, .64, .842, .96 vs .36, .64, .842, .96 |
| Pillars rule | same | same | 909085 | `scaleX` .5s, delay .2i + .2 | .19, .51, .752, .911 vs .19, .51, .75, .91 |
| Pillars headline, subtitle | same | setTimeout 200i ms | 909085, 925107 | Delay .2 and .4 | p0 line 65.4, 21.4, 4.5 vs 64.5, 21, 4.4; p2 same at +400ms |
| Pre-footer clip, media | scroll | ScrollTrigger scrub | 656598, 540431 | Inset 5% to 0, scale 1.25 to 1 | 14 stops, identical strings |
| CTA wash and arrow | enter, leave, re-enter | React, HubSpot `mousedown` on Scale only, `ev_3a4da873…` | 892855 | Fill 600ms | Enter -67.1, -38.4 vs -61.2, -38.4 (frame phase). Leave 32.9, 61.6 vs 32.9, 61.6 |
| Page body | Tab | Native | | Hero CTA, then the footer | Same order and the same focus ring (`1px solid rgb(134,191,242)`) |
| Images | load, error | React, `ev_4b9f169e…` | 325164 | Lazy | Same sizes at 1440 |
| Window | scroll, touch | `html` passive `scroll` `ev_be0fbf4b…`, `body` `touchstart` `ev_6f8f5c7a…` | `1h0nvyhf5gbrf.js` | | Shared chrome |
| Swipe at 390 | touch | Lenis `syncTouch` | | | 503, 504, 505, 506, 507 vs 503, 504, 506, 506, 507 |

One swipe run gave Scale 903 and ours 507 after a 3s wait. Two later runs after a 4s wait matched, as above, so I read it as a load race. No cause was confirmed.

Not on this page: drag and drop, Keen or Embla, canvas, cursor effects. Three.js and the 975 KB chunk load on Scale's page, but no section uses them.

## Visual check
Real wheel input, pairs at every 50% of the viewport plus 10% steps through the card and pre-footer scrub ranges: 39 stops at 1440, 42 at 390, on clone and filled. 768 and 1024 got 38 to 41 stops on the clone. First paint through a CDP screencast at 1440 and 390. Sheets opened and read: `new-qa/rlenvironments/sheets/` in the scratchpad.

Same by eye: direction of movement, what the header covers, rounded corners from the first frame, what is visible when. Differences:

- **Pre-footer image while loading:** Scale serves a 1.8 MB JPEG, which paints top-down over the `#193A29` placeholder of `ResponsiveImage`, so a dark green band shows for several seconds. Ours is a 48 KB webp and paints at once. The placeholder is ported.
- **First 400ms at 390, chrome:** the header sits over the server-rendered announcement bar until `--announcement-offset` is set. Already reported in physical-ai.md. For the lead.
- **Logo at 1024:** Scale's logo touches "Products". Ours has space, because the wordmark is narrower. Chrome.
- **Hero video frame:** differs between any two shots because it plays freely.

## REA evidence
- Bundle: `analyze_web_bundle` `ev_38d098bcf00216a5…`, 37 of 37 parsed.
- Page: `inspect_web_page` `ev_3f786f1764590ee3…`.
- Listeners: the ids in the table.
- Execution, precise coverage over the same scripted drive (hover, 34 wheel steps, pointer moves): Scale `ev_98fa2f8fe479749f…`, filled page `ev_754a70e58d1ceb7a…`. Over the MCP response limit, so read from `export_evidence_bundle`, then deleted. An earlier window, `ev_cf971b2821aaadde…`, is void: the drive started after it closed.
- `capture_browser_scenario` failed twice, once connected to 9230 and once with its own headless launch: `cleanup_incomplete`, "timed out after 1000ms". A third call to `observe_web_execution` lost its target because my driver closed the tab early.
- Not run: `trace_web_source_location` (no maps requested), `trace_web_module_imports` and `export_web_scripts` (Turbopack chunks, read directly by module), `compare_web_captures`, `compare_web_screenshots` and `observe_web_session` (comparison came from the samples and pairs).

### Calls in the window
| Function | Module | Scale | Ours |
|---|---|---|---|
| Card scrub `onUpdate` | 317967 | 248 | 236 |
| Clip scrub `onUpdate` | 656598 | 99 | 98 |
| Media scale `onUpdate` | 540431 | 99 | 98 |
| Link card `animateIn` | 874328 | 4 | 4 |
| Pillar `animateIn` | 909085 | 3 | Grouped under the 4 `onEnter` calls by name: 1 section + 3 pillars |
| CTA `prepareForIn`, `appendAnimateIn` | 961870 | 1, 1 | 1, 1 |

The scrub counts follow frame timing. Module attribution on ours is by function name and source path, since dev chunks differ.

## Deviations from Scale
- **Fonts:** see stack.md. No effect on heights at 1440 and 390 on the clone.
- **Video:** hero re-encoded from 1920 to 1280 wide, 5.4 MB to 2.7 MB, audio track dropped (Scale's is muted). Pillars from 1200 to 960 wide, 4.4 MB to 0.2 MB.
- **Pillars video, changed at fill:** it showed three tiles with a coloured triangle, which reads as Scale's mark. I wiped coloured pixels frame by frame, so the tiles are now empty and the line motion is unchanged. It overwrites `public/rlenvironments/pillars.mp4`, so `content.scale.ts` now shows the neutral video too. The original is in commit bebd715.
- **`EnterprisePillars` port:** the `iconName` branch and CMS icon assets are not ported, because this page does not use them. `wordStagger` is dropped: module 668761 ignores it.
- **Pre-footer image:** a webp of the same picture instead of Scale's JPEG, as on physical-ai.

## Copy mapping
Engineering Enablement, the research's own mapping for this template (`research.ts`, `template: 'rlenvironments'`). Substance comes from that entry: the headline, control group, uneven adoption, no agreed measure, Baseline, Pilot, Coach, Scale, code stays in your repositories, security review, GitHub, GitLab, Jira. Also from the full research's jobs on software delivery: reviewed output with cycle time, correctness and developer control (L07), changing an inherited codebase without added defect risk (F12), and consistent QA artifacts (M171).

Features became the promises. Overview became the trigger, the measurement and the coaching. Capabilities became the agents. Environment Types became the three stages. "Features", "Overview", "Capabilities" and "Available as" are unchanged generic labels.

Word counts: 45 strings compared, 38 within 15%. Of the other 7, 5 are one or two words off, on the title metadata, short titles and one alt. "Inside Vahue's Engineering Rollout" and "Try Engineering Enablement" are one word short so they keep Scale's line count. The largest gap is "Agents and practices, measured on one team for 12 weeks.", 10 words against 6, which keeps the two-line row at 390, 1024 and 1280.

## Placeholders
None. Scale's page has no numbers, customers, case studies or quotes, so there are no `// PLACEHOLDER` lines. "12 weeks" comes from `research.ts`.

## For Mike
- **Pilot length:** this page says 12 weeks, from the research's engineering entry. The menu says "Pilot in Six Weeks". Pick one.
- **Capability screenshots:** both are Scale's own product UI, with no Scale name in them. They show "GUI Agent Executor", "MCP Agent Executor", a calendar task, GPT-5.1 and tool names such as `zendesk_get-tickets`, not code review or tests. They carry no brand, so the rule keeps them, but they do not show our offer. Replace them if you have real screens.
- **Overview illustrations:** same point, neutral UI drawings, kept.
- **Claims:** "Security review" and "code stays in your repositories" are from the research. Check they hold before publishing.

## Gaps
- `oml:` landscape and real iOS were not driven: touch runs through CDP on Chrome.
- 768, 1024, 1280 and 1920 were checked for geometry. Motion was sampled only at 1440 and 390. Filled pairs were read only at 1440 and 390.
- Filled-page motion was not re-sampled for the first-load hero or the card reveal: same code as the clone, and only the strings changed.
- The final pre-footer heading change was re-checked for geometry and console errors at 1440 and 390, not re-photographed.
- Timings were measured against Scale's production build on our dev server.
