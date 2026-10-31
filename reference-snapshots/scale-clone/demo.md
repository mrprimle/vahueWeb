# scale.com/demo ("Contact us") → /scale-clone/demo

Route: `/scale-clone/demo/` · Page: `app/scale-clone/demo/page.tsx` · Components: `components/scale-clone/demo/` · Assets: none (no imagery on this page) · QA: `reference-snapshots/scale-clone/qa/demo/`

Captured 2026-10-31 at 1440×900 and 390×844: REA against an isolated Chrome tab (CDP 9230), production chunks and CSS fetched and grepped locally, the public HubSpot form definition, then Playwright + system Chrome for computed styles, form states, a 50%-viewport scroll sweep and in-page rAF traces of the reveal. Copy is Scale's own (RSC payload of the page + the HubSpot form definition) so QA lines up.

**Data handling.** The live Scale form posts to HubSpot (portal `4823527`, form `0babf6e5-e7d0-412a-b673-6e18e76e0c1f`, action `forms.hsforms.com/submissions/v3/public/submit/formsnext/multipart/…`). It was never submitted. Every Playwright session on scale.com ran behind a route allowlist: only GETs to scale.com (minus its two analytics proxies), `js.hsforms.net`, `static.hsappstatic.net` and the form-definition GET were let through; all POSTs, HubSpot counters, email checks, Segment, Dreamdata and Vercel analytics were aborted. The only values typed on scale.com were a dummy `abc` in the email field (to see the format error) and checkbox/radio toggles. The clone's Submit validates client-side and swaps in the thank-you state; it makes no network request.

## Reusable page component
`DemoPage({ content, className?, onSubmit? })` (`DemoPage.tsx`, client component) renders the whole page from a `DemoContent` object (`content.ts`):

- `heading`, `intro`
- `form: DemoFormContent`
  - `rows: FormRow[]`: one per HubSpot fieldset, `{ columns: 1 | 2, fields }`
  - field kinds: `text | email | textarea | select | checkbox | radio | consent`, each with `name`, `required`, `showWhen: { field, values }` (HubSpot dependent field) and kind-specific `placeholder`, `label`, `description`, `options`, `hideRequiredMark` or `labelHtml`
  - `legalHtml`, `submitLabel`, `successHtml`, `messages` (HubSpot strings), `blockedEmailDomains`
- `sidebar`: `quote`, `name`, `position`, `trustedLabel`, `logos: { alt, width, height, src? }[]`. Without `src` a neutral tile is drawn in Scale's display box.

`scaleDemoContent` is Scale's copy; `scaleFormFields.ts` holds the 8 base fields + 17 dependent fields generated from the HubSpot definition (252 countries, every option list, every dependency).

`onSubmit(values)` receives only the visible fields' values. It is a no-op on the clone. Vahue's `/contact` can pass its own `content` and wire `onSubmit` to its own endpoint.

**Theme tokens** (`demo.module.css`, defaults on `.root`; override them on a wrapper class passed as `className`):

| Token | Default | Used for |
|---|---|---|
| `--demo-bg` | `#fff` | page |
| `--demo-heading` / `--demo-intro` | `#212121` / `#575757` | h1 / intro |
| `--demo-text` | `#575757` | form text, legal copy, choice rows |
| `--demo-strong` | `#171717` | input text, links, focus border, checked fill, select chevron |
| `--demo-label` | `#373737` | group labels + choice labels (spans) |
| `--demo-placeholder` | `#929292` | placeholders |
| `--demo-field-bg` / `--demo-border` / `--demo-choice-border` | `#fff` / `#d1d5db` / `#c7c7c7` | fields |
| `--demo-ring` | `#17171714` | 3px focus ring, 2px checked ring |
| `--demo-error` | `#dc2626` | error text |
| `--demo-divider` | `#17171729` | consent divider centre |
| `--demo-cta-bg/-fg/-icon-bg/-icon-fg` | `#000/#fff/#fff/#000` | Submit |
| `--demo-card` / `--demo-card-fg` | `#839cb2` / `#212121` | sidebar card / quote, name |
| `--demo-card-muted` / `--demo-card-mark` / `--demo-card-line` | black 50% / 30% / 15% | position + label / quote marks / rule |
| `--demo-logo` | `#212121` | logo fill |

## Libraries (REA `analyze_web_bundle`)
- 44 scripts parsed, 0 failures, 692,440 AST nodes. Fingerprints: Next.js (high, Turbopack runtime `turbopack-1byz1flvc-bu1.js`), React (medium).
- GSAP 3.15 (`2d7ykwtxp_8ed.js`) with ScrollTrigger; SplitText via AnimatedText (module 668761, `1h0nvyhf5gbrf.js`); Lenis via the site shell. three.js r181 (`3kd41k7ews14b.js`) loads site-wide but nothing mounts a canvas here. No carousel, no Rive.
- Form: Scale's `StaticForm` (module 721992 in `058pnujclak3f.js` / `0_fm2xcv8_y2d.js`) wraps the HubSpot v2 embed (`//js.hsforms.net/forms/embed/v2.js`, hook module 365478 → `hbspt.forms.create({ portalId: "4823527", formId, target, submitButtonClass: "hidden", onFormReady, onFormSubmitted })`). Styling is the CSS module `_1N8NtW_*` in `0wrf93oshhpjv.css`. The light theme is `form__wrapper__light`.
- Sidebar: `DemoQuoteSidebar` (module 659050, `0_fm2xcv8_y2d.js`). Scroll hook: `useScrollTrigger` (module 210104), defaults `start "top 80%", end "bottom 20%"`.
- Page tree (RSC): `PageTheme {theme:"light"}` → `Navigation {border:true}` (the nav ignores `border`) → `main > section` → `StaticForm {formId:"0babf6e5-…", theme:"light", enableThankYou:false, downloadLabel:"Download Now"}` + `DemoQuoteSidebar {quote,name,position}` → section-theme watcher (module 995634, no dark sections here). The announcement bar is mounted client-side, as on other pages, so the shared `ScaleHeader` is unchanged.

## Listener map (REA `inspect_web_event_listeners`)
| Element | Listeners | Source |
|---|---|---|
| `form.hs-form input[name=firstname]` | `invalid`, `input` (HubSpot embed v2.js col 178673 / 410488); `select` passive (FullStory) | evidence `ev_01ee3061…` |
| Submit `._1N8NtW_form__wrapper > button.FlatCta` | `mousedown` (HubSpot analytics `4823527.js:18443`), `click` (React root, `42ixmvih7808g.js:20015`) | evidence `ev_14f8dd18…` |

Blur/change validation comes from HubSpot's own React tree, which is delegated and so not visible on the node. FlatCta hover uses React's delegated `pointerenter/leave`.

## Section (one per page)
`section.pt-24 pb-[72px] md:pb-[120px]` → container `max-w-[1472px] px-6` → grid `items-start gap-4`, `lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]` (756.8 + 619.2 at 1440). The page wrapper is `min-h-screen`, so at 1440 the footer starts at 39.25 + 900 = 939.25.

**Left column** `flex flex-col gap-10 p-2 md:p-4`:
- Header block `flex flex-col gap-3`:
  - h1 header3-regular: 40/50 −0.4px `#212121` at md, 24/25.2 on mobile
  - p body2-regular: 16/24 `#575757` at md, 14/18.9 on mobile
- StaticForm wrapper: `relative flex flex-col justify-between`. Until HubSpot reports ready it has `min-height:1000px` and only the Submit button. The clone renders the form at once, so it skips that loading frame.

**Form** (`form.hs-form`, grid, `column-gap 1rem`, 2 columns from 1024; colour `#575757`, 16/24):

| Fieldset | Fields (placeholder / unselected label) |
|---|---|
| form-columns-2 | First name*, Last name* (two columns ≥1024) |
| form-columns-2 | Company name*, Job title* |
| form-columns-1 | Work email* (`type=email`) |
| form-columns-1 + `.hs-dependent-field` | Country* (252 options) → EU/EEA/UK/CH → consent checkbox (`booleancheckbox`, not required) |
| form-columns-1 + dependents | What best describes your company?* → Enterprise (`true`) / Other: industry + solution selects; Model Builder (`false`): solution, model stage, modality checkboxes (required), current handling, initiative size; Physical AI: org type; US Gov: needs checkboxes (7); Global PS: solution; Partners: partnership type, LinkedIn URL, message textarea (with description). Project Budget radios for `true/false/Physical AI/Other`; project textarea for `true/false/Physical AI` |
| form-columns-1 + dependents | How did you hear about Scale?* → Other → "Please specify" |
| form-columns-1 | legal rich text "By submitting this form … **Privacy Policy.**" |

- Inputs and selects:
  - box: `box-sizing border-box`, min-h 46, `padding 12px 16px`, radius 8, 1px `#d1d5db`, bg `#fff`
  - text: 14/19.25 `#171717`; placeholder `#929292`
  - transition 150ms `cubic-bezier(.4,0,.2,1)`
- Focus: border `#171717`, `box-shadow 0 0 0 3px #17171714`, outline transparent. There is no hover style.
- Select: `appearance none`, padding-right 44, chevron drawn with two 7×7 linear-gradient triangles at `calc(100% - 22px)` / `calc(100% - 15px)`. The unselected label is `#171717` too.
- Field: `position relative`, margin-bottom 24. So rows step by 70px: 46 field + 24 margin.
- Textarea: min-h 128, 152 from 768. Scale's textarea is inline, so its line box adds 7px below it (field 159 at 1440); the clone reproduces this with `padding-bottom:7px` on `.input`.
- Group label box: 16/24 (the strut); its spans are 14px `#373737`, the first span weight 500. The budget group's `*` is hidden.
- Checkbox group:
  - layout: flex column gap 8, `margin-bottom 2rem`, label `mb .75rem`
  - list: grid gap 12
  - row: grid `16px 1fr` gap 8, 15px/1.35, span 14/18.9 `#373737`
- Radio group: `margin-bottom 1.75rem`, list grid gap 6 max-w 240, rows flex gap 8 min-h 22.
- Choice inputs: 16×16, `appearance none`, 1px `#c7c7c7`. Radios are round; checkboxes have radius 4.
  - Checked: fill and border `#171717`, `box-shadow 0 0 0 2px #17171714`.
  - Checkbox tick: Scale's `checkbox.svg` at 120%, inlined as a data URI. Radio: radial-gradient white dot of 3px.
- Consent: `padding-top 1.25rem` (2rem ≥640, +mb 2rem). A `::before` 1px divider `linear-gradient(270deg, #17171700, #17171729 52.07%, #17171700)` sits at `bottom 1rem` (2rem ≥640).
- Legal text: `mb 2rem`, `#575757`; 16/24 on mobile (3 lines at 390), 14/21 from 768. The link is `#171717`, weight 500, underlined.

**Submit** (FlatCta `variant arrow`, theme black, rendered as a `<button>`):
- Box: 112.6×40, radius 6, `pl-4 py-1 pr-1 gap-4`. Label 14px/500.
- Icon box: 32×32, radius 6, `bg #fff`, with a 16px chevron.

**Sidebar** `flex flex-col gap-8 rounded-2xl bg-cloud-slate (#839cb2) p-8 md:p-10`:
- Blockquote:
  - opening `“`: `absolute -left-4 top-0`, serif 30/1, black/30
  - quote p: header5-regular + leading-snug 24/33 (22/30.25 on mobile), `#212121`, closing `”` serif black/30
- Person block (body3 14/21, 14/18.9 on mobile): name weight 500 `#212121`, position black/50.
- Rule: `hr h-px bg-black/15`.
- Label: detail-mono 13/15.6 (10/12 on mobile) uppercase black/50, centred.
- Logos: `flex-col items-center gap-8`, rows `grid max-w-[480px] place-items-center gap-x-4 gap-y-6`.
  - Row 1: `grid-cols-2 md:grid-cols-4`, Cohere 92×16, Adept 74×25, Meta 88×18, Cisco 64×34.
  - Row 2: `grid-cols-3`, Time 74×23, Mayo Clinic 40×40, DLA Piper 62×35.
  - Each slot is 96×40. On Scale they are mask images filled `#212121`.

## Validation and states (HubSpot v2, `enableLiveValidation: true`)
| Trigger | Scale (observed) | Clone |
|---|---|---|
| Blur an empty required text/email/select | "Please complete this required field." (selects too) | same |
| Blur email `abc` | "Email must be formatted correctly." | same |
| Free-mail domain (`useDefaultBlockList` + `hmail.com,outlook.com`) | checked by HubSpot's server email check (blocked in QA, not observed) | client list (`FREE_EMAIL_DOMAINS`) → "Please enter a different email address. This form does not accept addresses from {domain}." |
| Uncheck the last box of a required checkbox group, then leave it | "Please complete this required field." | same |
| Typing in a field that has an error | live re-validation | same (after first blur) |
| Change a parent select | dependents mount/unmount; hidden dependents keep their values | same; only visible values are submitted |
| Submit with errors | all visible fields flagged, rollup hidden by CSS | same |
| Valid submit | HubSpot posts; StaticForm adds `form__submitted`, drops the Submit button and min-height; inline message "Thanks for reaching out! We'll be in touch shortly." (16/24 `#171717`); no scroll (`enableThankYou` false) | no request; same message and layout |

- Error markup: `ul.hs-error-msgs[role=alert] > li > label.hs-error-msg`. It is absolute at `bottom -.15rem` (email: `bottom 0`) with `translateY(100%)`, so it sits in the field's 24px bottom margin.
- Error text: 12px/15 (13px under 768), `#dc2626`. The input gets `invalid error` classes but no visual change.

## Motion
| Element | Trigger | From → To | Ease / duration | Notes |
|---|---|---|---|---|
| Quote (AnimatedText `type:"lines"`, mask lines) | ScrollTrigger on the card, `start "top 85%"`, `end "bottom 20%"`, onEnter | lines `yPercent 400 → 0`, opacity 0 → 1, colour `#72CE7B` → `#79648C` → final | 1s power3.out, 0.08s per line; colour at +0.22 (0.3276s) then 0.4524s power1.inOut | descender compensation 0.12em on the masks |
| Name + position (AnimatedText lines) | same onEnter | same intro | delay 0.15 | no descender compensation (the collapsed mask margins would add 1.68px) |
| Logos `[role=img]` | set on mount, then same onEnter | `{opacity 0, y 8}` → `{1, 0}` | 0.5s power2.out, stagger 0.06, delay 0.3 | |
| Inputs | focus | border + 3px ring | 150ms `cubic-bezier(.4,0,.2,1)` | CSS |
| Submit FlatCta | pointerenter / leave | fill `translateX(-100%) → 0` → leaves to `100%` (opacity .30); chevron track `-50% → 0` | 600ms `cubic-bezier(0,0,.2,1)` | the label doesn't scale on the arrow variant |

- At 1440 the card is above the start line on load, so the reveal plays at once. At 390 it plays on scroll.
- Reduced motion: text is visible and there are no tweens or CTA transitions.

**Reveal timing.** At 390 the reveal fires at the same scroll position on both sites. Stepping 5px at a time, Scale and the clone both fire at scrollY 336, against an expected 331 (card top − 0.85·844).

**rAF trace after a jump scroll** (`yPercent` of line 1 / logo 1 opacity; `qa/demo/390-*-reveal-450ms.jpg`):
- Scale: 100ms 244% / 0, 300ms 87.6% / 0.09, 500ms 22% / 0.82, 700ms 2.6% / 1, 1000ms 0.
- Clone: the same curve, starting about 100ms later on a jump scroll; this is dev-server latency, not a different trigger.

## QA
- **1440:**
  - Page height: Scale 1838 = clone 1838; footer at 939.3 on both.
  - Every probe matches to 0.1px: h1, intro, form, the 8 field boxes, legal, card, blockquote, name, hr, label and logo boxes.
  - Submit is 112.0 wide vs 112.6 (the label font).
- **390:**
  - Matches to the pixel through the form, legal, Submit, card top, quote, name and hr.
  - The card is 12px shorter because the mono label fits on one line in Vahue's mono face; on Scale it wraps to two.
  - The footer is 40px shorter (shared `ScaleFooter`, known; see security.md).
- **States (1440)**, `state-*-{scale,clone}.jpg`:
  - Focus ring values are identical.
  - Error texts and positions are identical (5 errors at the same x/y).
  - Model Builder dependents: form height 1320 = 1320, every field height equal (`[46×9, 186, 46, 46, 138, 159, 46]`).
  - Choice row geometry and colours are identical.
  - Submit hover mid-tween and settled frames match.
  - Clone-only shots: `state-clone-empty-submit.jpg` (all required errors) and `state-clone-success.jpg`.
- **Scroll sweep:** `1440-{scale,clone}-00..03.jpg`, `390-{scale,clone}-00..06.jpg`.
- **Health:** the clone returns 200. Its only console errors were resources aborted by the QA allowlist (Vercel analytics), so there are none in normal runs.

## Remaining gaps
- The customer logos (Cohere, Adept, Meta, Cisco, Time, Mayo Clinic, DLA Piper) aren't shipped. Neutral `#212121` tiles fill Scale's display boxes; pass `src` to use real marks.
- Fonts: Vahue's faces replace aeonik and aeonik mono. Some lines wrap differently: the quote breaks "high-quality" one word later at some widths, and the 390 mono label stays on one line.
- The free-mail check is client-side, with a subset of HubSpot's server block list, so the exact domain set differs.
- HubSpot's ~1s loading frame (wrapper `min-height:1000px` with only Submit) is not reproduced.
- Not modelled: HubSpot's hidden utm_* fields, `hs_context`, cookies and analytics.
- The partnership textarea description renders as a `legend.hs-field-desc` with assumed styles (14/21 `#575757`); it wasn't measured on Scale.
- The consent checkbox and the Partners/Other branches were checked visually only (`state-dep-eu`, `state-dep-partners`), not probed field by field.

## REA evidence
- `analyze_web_bundle` (include_script_sources, observation 3000ms): `ev_a3a80e89217e34dea7354aa45c9f178abfdcae1efb49f57b32d8c5a55a33083c`. 44 scripts parsed. Routes found: `/static/img/reskin/prefooter-default.jpg`, `/static/images/components/side-by-side/media-placeholder.svg` (shared modules, unused here).
- `inspect_web_event_listeners`: `ev_01ee3061e1dfa594c2f2b53b352e44428c240cbaab195579799067ef36ccadd3` (first-name input), `ev_14f8dd18d233cb9486fa1246e201e1926ffa60781924997ee2f1196b7bf2ed30` (Submit).
- Chunks grepped:
  - `058pnujclak3f.js` / `0_fm2xcv8_y2d.js`: StaticForm 721992, HubSpot hook 365478, DemoQuoteSidebar 659050, useScrollTrigger 210104, CSS-module map 877420
  - `0sle6wl7ucd3b.js`: nav; `border` is not read
  - `1p75rvt-mr0xr.js`: PageTheme 243385
- CSS grepped: `0wrf93oshhpjv.css` (266 `_1N8NtW_` rules, ported in `demo.module.css`); `3ektzubma58z1.css` (`bg-cloud-slate #839cb2`, `header5-regular`, `detail-mono`).
- HubSpot form definition: `forms.hsforms.com/embed/v3/form/4823527/0babf6e5-e7d0-412a-b673-6e18e76e0c1f/json` (a public GET).
  - `themeName sharp`, `captchaEnabled false`
  - `inlineMessage` is the thank-you text
  - `legalConsentOptions`: legitimate interest, privacy text only for non-EU visitors
