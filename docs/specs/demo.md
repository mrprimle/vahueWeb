# /demo

Live source: https://scale.com/demo, 2026-11-02. Stack: [../stack.md](../stack.md). Scale's strings: `components/pages/demo/content.scale.ts`. Rendered strings: `content.ts`. Menu label: Contact us. Footer label: Contact Us.

Safety on the live form: Submit was never clicked and Enter never pressed. All Playwright sessions aborted every non-GET and every third party except `js.hsforms.net/forms/embed/v2.js` and the form definition GET on `forms.hsforms.com`. The private Chrome also resolved no other host. Typed values were dummies (`abc`, `abc@abc`, `abc@abc.com`). `abc@abc.com` made HubSpot try its `emailcheck` POST, which the guard aborted. The script, the definition, chunks and logos were also fetched with `curl` GET.

REA, in a one-tab headless Chrome on port 9271, closed and deleted afterwards:
- `analyze_web_bundle` with sources: `ev_9e20f8bc…`, 44 of 44 scripts parsed, Next.js and React fingerprints, chunks as in stack.md plus `0_fm2xcv8_y2d.js` for this page.
- `observe_web_execution` over 9s of real input (typing, Tab, radios, arrow keys, company type changes, checkbox, Submit hover): `ev_b0bb2b1c…`.
- `inspect_web_page`, `capture_web_screenshot`: run on the same target.
- `inspect_web_event_listeners`: see the inventory.
- `capture_browser_scenario` errored (`cleanup_incomplete`, 1000ms transport timeout) and was not used. `observe_web_execution` covers the requirement. Trace tools not needed: no source maps are shipped, and the modules and HubSpot's script were read directly.

Submit could not be pressed on Scale, so its behaviour comes from a local fixture: HubSpot's own `v2.js`, the saved definition and Scale's CSS module, on a made-up host with every request answered from disk and DNS mapped to nothing. Nothing reached scale.com or HubSpot. It gave the required errors and the rollup and its position in the DOM. The fixture did not reach `onFormSubmitted`, so the success state is from module 721992 and the definition's `inlineMessage`.

## Sections

One section in a two-column grid, then the shared footer. Page body from the RSC payload, 721992 StaticForm, 659050 DemoQuoteSidebar, 243385, 995634, all in `0_fm2xcv8_y2d.js` (`1301cd0246981951`). Form CSS: module 877420, `0wrf93oshhpjv.css`.

| Part | 1440 top, height | 390 top, height |
|---|---|---|
| Section | 39.3, 887 | 101.8, 1775.9 |
| Heading | 151.3, 50 | 205.8, 25.2 |
| Intro | 213.3, 24 | 242.9, 37.8 |
| Form, resting | 277.3, 473 | 320.7, 664 |
| Submit | 750.3, 40 | 984.7, 40 |
| Quote panel | 135.3, 555.1 | 1048.7, 756.9 |
| Footer | 939.3, 898.6 | 1877.6, 1360.3 |

Equal to Scale, clone and filled, in all of these form states at 1440 and 390: resting, each of the 7 company types, and France + budget + Other. Every field's x, y, width and height is compared in each state, within 0.6px. Filled resting state also equal at 1920. At 768 and 1024 only the footer differs (1472 vs 1444.2, 1151.6 vs 1130.6), the known shared chrome issue.

The panel shrinks after the first change on the page (555.1 to about 544 at 1440, 756.9 to 733.3 at 390), on Scale and here: SplitText re-splits when the body resizes, and the unmasked lines take less room. Line breaks also change. Same in both.

New here: `DemoForm.tsx` (the HubSpot behaviour written out), `DemoForm.css` (module 877420 with the modal variant removed), `DemoPage.tsx`. FlatCta, AnimatedText, useInViewTrigger and SectionTheme are shared ports.

## Form structure

No script, no iframe, no network. The markup copies what HubSpot renders (`form.hs-form > fieldset.form-columns-N > .hs-dependent-field > .hs_<name>.hs-form-field`, `.hs-input`, `is-placeholder`, `invalid error`, `.hs-error-msgs`, `.legal-consent-container`, `.hs_error_rollup`, hidden `input[type=submit]`), so Scale's CSS applies unchanged. The fields come from the definition in the content file: 9 groups, 5 text fields, 3 top-level selects, and dependents read from each field's `dependents` with Scale's filter logic.

| Parent value (Scale, ours) | Fields shown |
|---|---|
| Country in the 31 consent countries | Consent checkbox |
| Enterprise, Operations-Heavy Scale-up | Industry, solution, budget, message |
| Model Builder/Research Lab, Software/Product Company | Solution, stage, domain checkboxes, current handling, size, budget, message |
| Physical AI/Robotics, Sales/Service-Led Company | Org type, budget, message |
| U.S. Government Agency, Regulated Company | Needs checkboxes |
| Global Public Sector Entity, Professional Services Firm | Solution |
| Partners | Partnership type, LinkedIn URL, description textarea |
| Other | Industry, solution, budget |
| How did you hear = Other | Please specify |

Values stay in state when their field hides and come back when it returns, as on Scale (`retained` check).

## Interaction inventory

Every native listener REA found is HubSpot's or React's. HubSpot adds `input` (`v2.js:410486`, untrusted events only, for jQuery-style autofill) and React's `invalid` to each control; everything else is delegated from `[data-hs-forms-root]`.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Text, email | focus, empty | React `onFocus`, `ev_a14c6d9a…`, `ev_98088f61…` | `v2.js` `getHandleFocus` | Hides a stored error when the field is empty | `companyEmptyMouseRefocus`, `companyKbRefocus`: none, both |
| Text, email | focus, value | Same | | Format error stays | `emailRefocus`: stays, both |
| Text, email | blur | React `onBlur` | `getHandleBlur` | Validates, draws at once | 1ms after `focusout` on Scale; `emailAfterBlur`, `companyEmpty` equal |
| Text, email | typing | React `onChange` | `getHandleChange`, `staleTimeout: 1000` | Error goes on the first key, validation runs 1000ms after the last key while focused | `emailWhileTyping` none, none, none, error, error, both; `companyClearedWait` equal |
| Email | format | | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | `Email must be formatted correctly.` | Equal |
| Email | blocked domain | HubSpot server POST on Scale | Definition `hmail.com,outlook.com` + default list | Message with the domain | Not seen live, POST aborted. Local list here, see Differences |
| Select | focus | | | Border, ring, chevron removed; error stays | `regionRefocused` equal. Chevron `background-image: none` on focus, both |
| Select | change | React | | Validates at once, drops `is-placeholder` | `regionPicked` none, both |
| Select | blur | React | | Required error | Equal |
| Select | keyboard | Native | | Native picker | Not reimplemented, native on both |
| Textarea | focus, type, blur | `ev_32b72205…` | | As text, optional, `min-height` 128 then 152 from `sm`, `resize: none` | Heights equal |
| Radio | change | `ev_9b969e13…` | | Clears error | `radioSpace` none, both |
| Radio | Tab out, empty | React `onBlur` | | Required error, focus moves to the next control | `radioTabOut` via the keyboard path; `annual_budget0` then `message`, equal to Scale's order |
| Radio | Arrow keys, Space | Native | | Moves and checks | Scale `$500k-1M` then `$100k-500k`. Ours moves the same, one Tab stop |
| Radio | checked | CSS | 877420 | `#171717`, `radial-gradient` 3px dot, `0 0 0 2px #17171714` | Computed equal |
| Checkbox group | change | `ev_6a4872b1…` | | Validates at once, unchecking all shows the error | `cbUnchecked`, `cbPick` equal |
| Checkbox group | Tab between boxes | React `onBlur` | | Blur of any box validates the group | `cbTab1` error with focus on Code, both |
| Consent checkbox | click, Space | `ev_6bc42035…` | | Optional, never an error | Heights equal |
| Please specify | type | `ev_37146315…` | | Optional text | Equal |
| Form | submit, empty | Hidden `input[type=submit]`, React | Fixture | All visible required fields show errors, rollup `Please complete all required fields.` under Submit; no scroll, focus stays | Ours: 8 errors, rollup at wrapper bottom + 2.4, x 40, focus stays on Submit |
| Form | submit, format only | | `By(e)` in `v2.js` | Field error, no rollup | `formatOnly` matches source |
| Form | submit, blocked | | Same | `Please change your email address to continue.` | Ours equal to source |
| Rollup | fixing errors | | | Stays until no required error is left, then goes | `rollupBeforeFinal`, `fixed` |
| Text | Enter | Native implicit submit | | Runs the same path | Ours tested, Scale not pressed |
| Submit | hover | `ev_82b01687…` (React click only) | 892855 | Fill and arrow 600ms ease-out | Fill -112.6, -75.5, -47.6, -28.8 vs -112, -75.2, -47.3, -28.6; arrow equal; leave through +, then reset |
| Submit | click | React `onClick` | 721992 | Clicks the hidden input | Ours only |
| Submit | focus | Native | | `auto 1px` outline | Tab order equal |
| Success | valid submit | | 721992, definition | Form and Submit replaced by `.submitted-message`, 16/24 `#171717`, no scroll. `TODO(backend)` in `DemoForm.tsx`, nothing sent | Ours: no request other than page assets (`nonLocalOrNonGet` empty) |
| Quote, name | reveal | `ScrollTrigger` | 659050, 947153 | `top 85%`, lines, delay 0 and .15 | Shared port. Scale's line y 49.9, 7.2, .1 sampled live; ours compared by eye on the 390 scroll sheets, mid-reveal frames match. Not sampled at matched phase |
| Logos | reveal | gsap | 659050 | `opacity` 0, `y` 8 to rest, `stagger` .06, `delay` .3, `.5s power2.out` | t 200ms: .78, .62, .39, .1 vs .75, .6, .4, .06 |
| Privacy link | hover | None | | No hover state | Same |
| Panel, form root | | `ev_3f5c9239…`, `ev_3ef31eb9…`: 0 listeners | | | Same |
| Scroll | wheel | Lenis | stack.md | | Scroll positions equal at every step |

Keyboard order: first, last, company, title, email, country, company type, its dependents, radios as one stop, each checkbox, message, how heard, Privacy link, Submit, footer.

## Differences

- **First paint:** on Scale the form is empty with `min-height: 1000` until HubSpot's script and definition arrive (about 2s), and Submit sits 1000px down. Ours renders at once: it is a loading artefact of a third-party script we do not load.
- **Blocked email domains:** HubSpot's default free-mail list lives on its server and was not called. `blockedEmailDomains` holds Scale's two plus 17 common free-mail domains. It runs on blur and after the stale timeout, where Scale waits on a POST.
- **Fonts:** Aeonik vs Aeonik Pro: Submit 112 vs 112.6 wide, text about 1px lower. The textarea's baseline gap is 6 vs 7, so `DemoForm.css` adds 1px under it. DM Mono is narrower than Aeonik Mono, so "Trusted by…" gets `max-sm:px-1` to wrap on 2 lines at 390 as on Scale.
- **Hidden fields:** `utm_*` are rendered empty, for the backend to fill.
- **Field names:** renamed in the fill (`ent_*`, `gen_ai_*`, `ps_*`, `gps_*`, `brand_*`, `how_did_you_hear_about_scale`), so no public sector or Scale names sit in the markup.
- **Programmatic focus only:** calling `.focus()` on a radio straight after a checkbox blur lets the next Tab land on the next radio, once. Keyboard and mouse paths behave as on Scale, so this is left.

## Fill

Copy source §0, §5, §7, §0.5. Company types follow the research's segments: Operations-Heavy Scale-up (segment 1), Software/Product Company (4), Sales/Service-Led Company (2), Regulated Company (menu: Regulated Industries), Professional Services Firm (3), Partners, Other. Same 7 slots, same branches, no government or defense option. Options changed in the same way: war planning became claims and contract review, Civilian and Global Defense became Legal and Compliance, Consulting and Audit, RL environments became Agent Environments.

Counts over 124 strings, countries excluded: 90 verbatim (73%), 29 light, 5 rewritten (Professional Services Firm, Property or booking team, Agentic Claims…, Document intake…, meta description).

`// PLACEHOLDER`, 15 lines: quote, name, role, "Trusted by" line, 7 logo tiles at Scale's exact boxes, 4 budget bands.

## Gaps

- Submit behaviour on Scale itself: read from HubSpot's code and the fixture, never pressed live, on purpose.
- Touch on real devices: phone layout checked with `hasTouch` in headless. No touch-specific handlers exist on Scale's form.
