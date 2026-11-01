# scale.com: motion and framework analysis

Captured 2026-10-17 with REA (`analyze_web_bundle`) in an isolated Chrome instance (CDP port 9230). I grepped the downloaded production chunks for library signatures and settings. Pages covered: `/` and `/enterprise`. Both pages load the same shared vendor chunks; `/enterprise` adds a few page-specific inline scripts.

## Stack

| Layer | Library | Version | Evidence |
|---|---|---|---|
| Framework | Next.js (App Router, Turbopack build) | — | REA `next-runtime` fingerprint, `turbopack-*.js` chunk |
| UI | React | — | REA `react-runtime` fingerprint |
| Animation | GSAP | **3.15.0** | `version:"3.15.0"` in 8 chunks |
| Scroll animation | GSAP ScrollTrigger | 3.15.0 | 8× `ScrollTrigger.create`, `scrollTrigger:{…}` configs |
| Text animation | GSAP SplitText | 3.15.0 | `SplitText` in 3 chunks |
| Layout animation | GSAP Flip | 3.15.0 | `Flip.` in 3 chunks |
| Smooth scroll | Lenis | **1.3.21** | version string + options |
| WebGL | three.js (custom ShaderMaterials, InstancedMesh) | **r181** (runtime `window.__THREE__`) | `WebGLRenderer`, 26× `ShaderMaterial`, 14× `InstancedMesh`, WebGL2 context |
| Carousel / drag (homepage) | **Keen Slider** | — | runtime: `div.keen-slider` with mouse/touch/drag listeners |
| Carousel / drag (enterprise) | Embla Carousel | — | runtime: drag listeners on a `perspective-[900px]` track; `dragThreshold: 10`, `watchDrag`, `loop`, `align` |
| Vector animation | Rive | — | `rive` in 6 chunks |

Not present: Framer Motion / Motion, Swiper, Lottie, GSAP Draggable or Inertia, React Three Fiber.

**Compared with Vahue:** `package.json` already has `gsap ^3.15.0`, `lenis ^1.3.26` and `three ^0.181.0`, and three.js is already on the same r181. To match the stack we'd add `keen-slider` and `embla-carousel-react`, plus `@rive-app/react-canvas` if we want Rive animations. SplitText and Flip ship inside the `gsap` package. Pin Lenis to `1.3.21` only if we see behaviour differences; 1.3.26 uses the same options.

## Settings

### Lenis
- `lerp: 0.14`, set explicitly at app level (the library default is 0.1)
- `autoRaf: false`: Lenis is driven by an external RAF loop, almost certainly `gsap.ticker`
- `smoothWheel: true`, `anchors: false`

Equivalent setup:
```js
const lenis = new Lenis({ lerp: 0.14, autoRaf: false, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

### ScrollTrigger patterns
| Pattern | start → end | Notes |
|---|---|---|
| Scrubbed reveal | `top bottom` → `bottom 75%` | `scrub: true` |
| Pinned section | `top top` → `+=1.5 × innerHeight` | `pin: true`, `pinSpacing: false` (15 uses) |
| Pinned, variable length | `top top` → `+=innerHeight × n` | length computed per section |
| Mobile-aware pin | `bottom bottom-=50vh` (≤769px) or `bottom bottom` → `+=1.5 × innerHeight` | breakpoint at **769px** |
| Exit parallax | `bottom 100%` → `bottom top` | `scrub: true` |
| One-shot | — | `toggleActions: "play"` |

Also `invalidateOnRefresh: true` on function-based ends, and `anticipatePin: 0`.

### Easing and duration
- Easing, in order of use: `power2.out` (60), `power3.out` (23), `power2.in` (16), `cubic.inOut` (15), `none` (13), `power1.inOut` (10)
- Duration, in order of use: **0.5s** (41), 1s (24), 0.3s (21), 0.85s (13), 0.8s (9)
- In short: UI motion is `power2.out` over 0.5s, hover and micro-interactions are around 0.3s, larger reveals take 0.85–1s.

### Embla
- `loop: true` is common, `align: "center"` or `"left"`
- `dragThreshold: 10`, `dragFree: false` (snaps to slides), `watchDrag: true`

### SplitText (from the live DOM)
Captured by scrolling each page in half-viewport steps and sampling the generated nodes. I recorded structure and inline styles only, not text.

Every split element has the same shape: `root > div (overflow: clip) > div > piece`. That's SplitText's line masking, so the setup is roughly `SplitText.create(el, { type: "lines" | "words,lines", mask: "lines", aria: "auto" })`. The original string goes on the root's `aria-label` and the pieces get `aria-hidden`.

The reveal variants, read from inline transforms on elements caught mid-animation:

| Variant | From | To | Where |
|---|---|---|---|
| Line rise (large) | `yPercent: 400, opacity: 0` | `0, 1` | h2/h3/h5 headings, body blocks, CTAs (most common) |
| Word rise | `yPercent: 100, opacity: 0` | `0, 1` | paragraphs split by word |
| Word slide | `xPercent: 30, opacity: 0` | `0, 1` | combined with the line rise on headings |
| 3D flip-up | `transformPerspective: 900, yPercent: 108, rotationX: -90` | `0, 0` | enterprise page, large statement lines |
| Exit (scrubbed) | `0` | `yPercent: -50` or `-100`, `opacity: 0` | text leaving the pinned sections |

Line wrappers clip with `overflow: clip`, not `hidden`, so they don't create a scroll container. A `p.AnimatedText` gets an `is-visible` class toggled by the trigger. That's a CSS class switch, not a tween.

## Interactive elements (runtime listener map)
I called `DOMDebugger.getEventListeners` on window, document and every element (2,975 on the homepage, 1,785 on enterprise). The `mousedown` listeners on links and buttons are analytics (GTM, FullStory, the cookie banner); I've left them out.

| Element | Listeners | Chunk | What it does |
|---|---|---|---|
| Homepage hero `<canvas>` (full viewport, fixed under the content, WebGL2) | `pointerdown`, `wheel` on the canvas; `pointermove` (passive) on **window** | three.js scene chunk | The cursor drives the hero from anywhere on the page because the listener is on window. Scroll feeds the hero values (`uHomeHeroPullApartBand`, phone and tablet scene Y and scale). |
| Homepage carousel `div.keen-slider` (`overflow: visible`, full-bleed, about 373px tall) | `mousedown/move/up/leave`, `touchstart/move`, `dragstart` | carousel chunk | Draggable Keen Slider; slides spill past the container edge. |
| Enterprise hero `<canvas>` inside `.parallaxOut` | `pointerdown`, `wheel`; window `pointermove` ×2 | three.js scene chunk | Same cursor-reactive scene, plus a scroll parallax as it leaves. |
| Enterprise second `<canvas>` (about 827×887, in a split layout) | `pointerdown/move/up`, `wheel` | three.js + app chunk | **Click-and-drag to rotate** a WebGL object. |
| Enterprise carousel track (`perspective: 900px`, about 440px tall) | `touchstart/move`, `mousedown`, `dragstart` | app chunk (Embla) | Draggable Embla carousel with 3D perspective on the slides. |
| window and document | passive `wheel` ×3–4, `touchstart/move` | Lenis + GSAP chunks | Lenis smooth scroll and ScrollTrigger's normalisation. |

## CSS system (structure, not brand)
Measured with computed styles at 1440×900 and 390×844, after scrolling the page once so lazy sections mount. I recorded sizes, spacing and structure. I didn't capture the colour palette or the typeface: those are Scale's brand identity, and their face (Aeonik) is a commercial font with its own licence. Vahue keeps its own palette and fonts from [DESIGN.md](../DESIGN.md).

**How it's built:** Tailwind CSS (213 `--tw-*` variable groups), page sections from the Plasmic CMS (`--plsmc-*`, `CMSSliceRenderer`), and a small `--token-*` layer. Type uses `clamp()` (14 rules) and `vw` sizes (9 rules) at the largest sizes; everything else steps at breakpoints. No container queries.

### Type scale
One weight (400) for almost everything; 500 only on small card titles; 600 on nav links. Hierarchy comes from size, not weight. Tracking is a uniform **−1% (−0.01em)** at every size; only 11px uppercase labels go positive (+0.05em).

| Role | Desktop size / line-height | Mobile size / line-height |
|---|---|---|
| Display (one per page) | 116 / 1.0 | 40 / 1.0 |
| Section H2 | 64 / 1.05 | 28–32 / 1.05–1.07 |
| H3 / large lead | 40 / 1.1–1.25 | 24 / 1.05–1.17 |
| Card title, h5 | 24 / 1.5 | 20 / 1.5 |
| Body | 16 / 1.3 (tight) or 1.5 | 16, unchanged |
| Small, UI | 14 / 1.5 | 14 |
| Mono eyebrow, uppercase | 13 → 10 mobile / 1.2 | 10–11 |

Roughly a 1.6× step between levels on desktop (116 → 64 → 40 → 24 → 16), compressed to about 1.25× on mobile. Display and H2 lines are set solid (line-height ≈ 1.0), which is what makes the SplitText line masks look tight.

Vahue's current hero H1 (`text-[2.7rem]` → `xl:text-7xl`, light weight, −0.01em) already uses the same tracking and the same "light weight, size does the work" approach. The difference is scale: Scale's display goes to 116px and Vahue's to 72px. That's a decision to make; DESIGN.md currently fixes the H1.

### Spacing
- **8px base.** The most-used gaps are 16, 12, 8, then 24, 32, 48, 64 and 128.
- **Section padding:** 64px for standard sections and 96px for featured ones on desktop (some go to 120–160 on enterprise); 48px on mobile.
- **Grid:** a 12-column grid with an **8px gutter** everywhere on desktop (8-, 6- and 4-column subgrids for cards). The gutter is unusually tight; whitespace comes from section padding and column spans, not gaps. It collapses to flex stacks on mobile.
- **Container:** about 1472px wide with 24px side padding (from the class names `max-w-[1472px] ps-6 pe-6`), centred with padding rather than auto margins.

### Breakpoints
Tailwind defaults dominate: 640, 768, 1024 and 1280px, plus a custom **1450px** for the widest layout and 390/425px for small phones. ScrollTrigger uses **769px** as its mobile switch.

### Radii, borders, depth
- Radius scale: **4, 8, 16** for UI and cards, **24** for large media and feature panels (most common on enterprise), and full pills for chips.
- Borders: all 1px solid. Separation comes from hairlines, not shadows.
- Shadows are almost absent: Tailwind's `shadow-sm` on a few controls and one `shadow-2xl` on a floating panel. One `backdrop-blur(24px)` glass bar (the sticky nav).

### CSS transitions (non-GSAP)
- Transforms: **0.3s `cubic-bezier(0, 0, 0.2, 1)`** (Tailwind `ease-out`) for hovers; 0.5s and 0.6s for larger moves; 1s for slow drifts.
- Colours: 0.15s `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind's default `ease-in-out`).
- These match the GSAP timings above: 0.3s micro, 0.5s standard, 0.85–1s reveals.

### Surfaces
The homepage is light with one dark band near the end. Enterprise is six light sections and then a dark footer. Vahue is dark-first, so we'd reverse it: dark surfaces (`bg-bg`, `bg-surface`) with one lighter accent band, using the opacity steps already in DESIGN.md.

### Mapping to Vahue
| Pattern | Adopt as-is | Vahue-specific |
|---|---|---|
| 8px spacing, 64/96 section rhythm, 48 mobile | yes | — |
| 12-col, 8px gutter, about 1472 container, 24px side padding | yes | — |
| Uniform −0.01em tracking, size-led hierarchy | yes (already Vahue's rule) | Vahue display font, light weight |
| Type steps (116/64/40/24/16) | the ratios | the top size needs a DESIGN.md decision |
| Radii 4/8/16/24, 1px hairlines, almost no shadows | yes | border colours `border-soft/mid/strong` |
| Transition timings and easings | yes | — |
| Light-dominant surfaces | no | dark-first with Vahue's white opacity scale |

## Gaps
None from the earlier list remain. Not captured: the exact stagger values (they're inside the tween calls) and the shader source, which we wouldn't reuse anyway. For stagger, the sampled pieces are consistent with roughly 0.05–0.1s per line, which we can tune by eye.
