# Vahue — Design Guidance (for AI agents and contributors)

This file captures hard visual rules for the Vahue marketing site. Follow it any time you generate or edit UI. If a rule conflicts with an explicit user request, surface the conflict before breaking a rule.

## Hard rules

1. **No gradients in hero sections.**
   - Do not add `hero-glow`, radial `background: radial-gradient(...)`, or any colored overlay ellipse in `<section>` blocks that render the page hero (first screen, H1, main CTA).
   - Allowed in hero: `hero-texture` (dot pattern), flat `bg-bg`, subtle vignette fade to `bg-bg` at the bottom (`bg-gradient-to-b from-transparent to-bg`).
   - Do not use `gradient-text-animated`, `gradient-text-animated-teal`, `gradient-text-shine`, or `gradient-text-scale` inside hero.
   - If emphasis is needed in hero, use a light white→lavender text gradient like the incubator hero (`linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)`) or plain white. Never end on a strong blue or purple in hero.
   - **No badge/pill "plate"** above the H1 (the `badge-dark` eyebrow pill with code/category). Heroes go straight to the H1 — same as the main site hero and the incubator hero.
   - **Hero H1 typography uses the display scale:** `font-display text-hero font-light text-balance text-white`. `text-hero` is fluid: 40px on phones up to **116px at about 1440px and wider**, line-height 1.0, tracking −0.01em (defined in `tailwind.config.ts`). Light weight, not semibold. Do not invent new size scales per landing; use the type ladder below.

## Type and spacing system

Hierarchy comes from size, not weight. Everything is light (300) or regular (400); 500 only for small card titles. Tracking is −0.01em at every size except uppercase mono labels (+0.05em).

| Token | Desktop → mobile | Line-height | Use |
| --- | --- | --- | --- |
| `text-hero` | 116 → 40px | 1.0 | One H1 per page |
| `text-section` | 64 → 28px | 1.05 | Section H2 |
| `text-lead` | 40 → 24px | 1.15 | H3, large lead paragraphs |
| `text-card` | 24 → 20px | 1.5 | Card titles |
| `text-base` | 16px | 1.5 | Body |
| mono 11–13px uppercase | — | 1.2 | Eyebrows (outside the hero) |

- **Spacing:** 8px base. Section padding `py-16` (64) for standard sections and `py-24` (96) for featured ones; `py-12` (48) on phones.
- **Layout:** `max-w-shell` (1472px) container with `px-6`, a 12-column grid with an 8px gutter (`gap-2`). Whitespace comes from column spans and section padding, not wide gutters.
- **Radii:** 4 / 8 / 16 for UI and cards, 24 for large media panels. 1px hairline borders (`border-border-soft/mid`), almost no shadows.
- **Motion:** headings reveal by masked line (`components/motion`). Use 0.3s `ease-out` for hovers, 0.5s for standard moves, 0.85–1s for reveals.

2. **No strong blue-purple gradients anywhere prominent.**
   - Avoid the paired `#0389f4` (blue) + `#8434e9` (purple) combination in backgrounds, cards, section accents, CTAs, or decorative glows.
   - This specifically means:
     - Do not reuse `.hero-glow` (blue → purple radial) as a decorative background.
     - Do not apply `.gradient-text-animated` / `.gradient-text-animated-teal` / `.gradient-text-shine` to headlines, metrics, outcomes, or body copy.
     - Do not apply `.gradient-text-scale` (white → lavender → purple) to key numbers or H1/H2.
     - Do not build custom radial overlays whose stops combine `rgba(3,137,244,*)` with `rgba(132,52,233,*)`.
   - If a section truly needs lift, use a single soft tint (e.g., `rgba(255,255,255,0.04)` surface, a faint lavender-only wash, or a single-hue radial below ~10% alpha) — never a blue→purple rainbow.

3. **No blue bullet points.**
   - Do not use `bg-primary` (`#0389f4`), `bg-accent`, or any blue/purple fill on list markers, dots, badges-as-bullets, or sidebar dots.
   - Standard bullet styles:
     - Primary bullets: `bg-white/45` (muted) or `bg-white/60` (emphasized).
     - Secondary/tertiary: `bg-white/30` or `bg-white/20`.
     - Positive marker in "will start / will stop" pairs: solid `bg-white`.
   - Bullet size: `w-1.5 h-1.5 rounded-full` aligned with `mt-1.5` or `mt-2` depending on text size.
   - Same rule applies to status dots inside badges (use `bg-white/60`, not `bg-primary`).

## Section naming (B2B voice, no AJTBD jargon)

Landing pages are modeled on AJTBD internally, but section labels must speak B2B sales language. Never expose AJTBD terminology in UI copy.

| Internal (AJTBD) | Public label (eyebrow) | Headline style |
| --- | --- | --- |
| Oneliner / hero | industry / segment code + label | product headline + subcopy |
| Core job | The mandate | what Vahue owns / delivers |
| Aha moments | Why it works | principles that shift the frame |
| Values / outcomes metrics | Outcomes | "The outcomes we commit to." |
| Self-recognition (triggers / emotions / pains) | Pain points | "Do you recognize your team?" with columns `What's happening`, `How it feels`, `Where it hurts` |
| Micro-jobs table | What we ship | "Workstream" column (never "Micro-job") |
| Point B | After-state / "Where this lands" | "What changes on the other side." — sub-columns: `How it feels`, `What becomes possible` |
| Barriers / objections | Concerns, answered | cards labeled `Concern 01`, `Concern 02`, … |
| Competitors fired | Alternatives | "Why us, not…" (mirrors incubator) |

Reference section voice in `components/incubator/*`: `RecognizeYourself.tsx`, `WhatChanges.tsx`, `HowItWorks.tsx`, `WhyUsNot.tsx`. When in doubt, name sections the way those components do — a one-to-three-word eyebrow and a plain-English headline.

## Allowed color / accent palette (marketing)

- Surface: `bg-bg`, `bg-surface`, `bg-white/[0.02..0.06]`.
- Borders: `border-border-soft`, `border-border-mid`, `border-border-strong`.
- Text: `text-white`, `text-white/85`, `text-white/70`, `text-white/55`, `text-white/45`.
- Accent for emphasis: plain `text-white` on `bg-white` pills, or `text-bg` on white CTA buttons.
- Decorative tints (outside hero, single-hue only, ≤ 12% alpha): neutral white glow, very soft lavender, very soft teal. Never paired blue+purple.

## When you need energy

- Prefer typography scale, weight, and negative space over gradients.
- Use the existing incubator feature-card pattern (mono eyebrow → display headline → body → sub-grid) instead of colorful backgrounds.
- Keep CTAs flat white on dark, or `btn-outline`.

## Do / Don't summary

**Do**
- Remove hero overlays and let `hero-texture` + the H1 do the work.
- Rename AJTBD labels to the B2B mapping above when building or editing landings.
- Use white-toned bullets and status dots.
- Keep metrics in plain white display type.

**Don't**
- Don't apply `hero-glow`, `gradient-text-animated`, `gradient-text-shine`, or `gradient-text-scale` in marketing sections.
- Don't pair `#0389f4` with `#8434e9` in any overlay, border, or text.
- Don't use `bg-primary` / `bg-accent` as a bullet, dot, or badge indicator.
- Don't ship UI copy that says "Triggers", "Micro-jobs", "Point B", "Aha moment", "Big job" — these are internal only.
- Don't add a `badge-dark` eyebrow pill above hero H1s.
- Don't include the shared `EngagementModels` ("Services") section on industry/segment landings — those pages already tell the story of what we ship via the "What we ship" section.

## Copy hygiene

- Read every oneLiner and headline out loud. Watch for parses that make Vahue sound like it delivers the bad thing (e.g. "ship fraud" reads as shipping fraud — write "ship fraud-detection copilots" or "ship copilots for fraud"). Always pair verbs like *ship*, *deploy*, *roll out* with the positive noun (copilot, platform, guardrail), not the problem (fraud, risk, churn).
- Avoid lists where the first item can be read as an object of the verb. Put the verb-compatible noun first or add the noun phrase after the verb.
