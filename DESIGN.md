# Vahue — Design Guidance (for AI agents and contributors)

This file captures hard visual rules for the Vahue marketing site. Follow it any time you generate or edit UI. If a rule conflicts with an explicit user request, surface the conflict before breaking a rule.

## Hard rules

1. **No gradients in hero sections.**
   - Do not add `hero-glow`, radial `background: radial-gradient(...)`, or any colored overlay ellipse in `<section>` blocks that render the page hero (first screen, H1, main CTA).
   - Allowed in hero: `hero-texture` (dot pattern), flat `bg-bg`, subtle vignette fade to `bg-bg` at the bottom (`bg-gradient-to-b from-transparent to-bg`).
   - Do not use `gradient-text-animated`, `gradient-text-animated-teal`, `gradient-text-shine`, or `gradient-text-scale` inside hero.
   - If emphasis is needed in hero, use a light white→lavender text gradient like the incubator hero (`linear-gradient(90deg, #ffffff 0%, #b8b8ff 100%)`) or plain white. Never end on a strong blue or purple in hero.
   - **No badge/pill "plate"** above the H1 (the `badge-dark` eyebrow pill with code/category). Heroes go straight to the H1 — same as the main site hero and the incubator hero.
   - **Hero H1 typography must match the main page hero** (`components/Hero.tsx`): `font-display text-[2.7rem] font-light leading-none md:leading-tight xl:leading-[80px] lg:text-6xl xl:text-7xl -tracking-[0.01em] max-w-2xl xl:max-w-4xl text-balance text-white`. Light weight, not semibold. Do not invent new size scales per landing.

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
