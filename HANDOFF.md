# Handoff: AI automation research + Scale 1:1 clone + Vahue rebuild

Last updated: 2026-10-31 by the cloud session. If there are newer commits on the branch than this file describes, trust `git log`.

## The original ask (Mike, verbatim)

> /anthropic-skills:nmt-market-research  I'm building AI automation company, I want to gather some biggest jobs from top AI Automation agencies like hessian.sh (main inspiration), ciclum, epam and others (find on reviews aggregators in g2 and clutch the top copanies and their case studies - from case studies extract most common jobs (AJTBD), pains, triggers, point A, point B, job graph) and put the research in the doc
>
> figure out the biggest common jobs and features and if we were to create ideal AI automation company - what would be the feature list, positioning, VP, jobs covered (AJTBD). - put that into the doc.
>
> Then from that research - think how best fit that into existing vahue website structure (think content-wise, page stuctures, industries, features) into current design.  and do it.
>
> use REA MCP to go through each pages in scale.com there and for each page run an agent that will do this:
>
> we need to copy 1:1 each section on each scale page from their menu - all layout, ui/ux, scroll amination, motions, mouse events, reveal triggrrs - everything - use REA MCP for those scale pages clone that you'll fill with the NMT research data later. pay attention to the reveal animations and mouse movement animations and scroll triggered controlled animations as well.  in the end do the 1:1 side by side visual checks with screenshots or useing browser use and looking at it side by side at each scroll stage and mouse position stage. - use REA to intercept js runtime and other js frameworks and libs used to copy the behaviour, icons (they are public, you can copy from scale src) and design exactly. make sure we use same motion or animation libs/frameworks/svgs that scale with same params.
>
> do that in that redesign branch (do another branch out of that) where we already started the scale parity - should be 1:1

## Where things are

| What | Where |
|---|---|
| Repo | `mrprimle/vahueWeb` (source of truth). `mrprimle/vahuevercel` is the Vercel deploy mirror; don't push there. |
| Working branch | `claude/project-thread-pizfhg`, branched from `claude/motion-system-rebuild` (the earlier Scale-parity branch). All work goes here. No PR has been opened yet. |
| Local checkout | `~/Desktop/Vahue` on Mike's Mac |
| Research doc | "AI Automation Agencies — Jobs Research & Ideal Company Blueprint", a Claude Doc: https://claude.ai/artifact/LmiQYQr5koeghEbXd9gkPf. If a new account can't open it, ask Mike to share it or export it. |
| Research copy for the site | `lib/automation-content.ts`: positioning, Audit/Pilot/Operate phases, control features, integrations, the 6 workflows, industry workflows, and `PAGE_TEMPLATES` (which Scale clone layout each Vahue page reuses) |
| Scale stack analysis (REA) | `reference-snapshots/scale-motion-stack.md`: GSAP 3.15 + ScrollTrigger/SplitText/Flip, Lenis 1.3.21 (lerp 0.14, gsap.ticker), three r181, Keen Slider, Embla, Rive. Includes easing, durations and the SplitText reveal variants |
| Scale page list | `reference-snapshots/scale-pages.md` (32 menu pages) and the registry `components/scale-clone/shared/pages.ts` |
| Per-page clone specs + QA notes | `reference-snapshots/scale-clone/<slug>.md` (sections, motion params, listeners, QA, remaining gaps) |
| QA screenshots | `reference-snapshots/scale-clone/qa/<slug>/` |
| Clone routes | `/scale-clone/<slug>`, built from `app/scale-clone/` and `components/scale-clone/<slug>/` |

## Research summary (full version in the doc)

- 87 records: 9 EPAM cases, 11 Ciklum cases, and 50 Clutch reviews + 17 case studies from 12 agencies ranked on Clutch/G2. Hessian.sh publishes no cases, so it was used for positioning only (forward-deployed Embed → Build → Operate, outcome pricing).
- Top jobs: cross-system back-office sync (18/87), document intake (17), knowledge Q&A (14), support/voice agents (12), scoring/decisions (11), engineering enablement (5).
- Triggers: volume outgrew the team (13), stalled PoC/RPA (9), avoid hiring (7).
- Gap in the market: agencies rarely publish a baseline; handover is the top complaint; almost nobody runs the agents after launch.
- Chosen direction (hypothesis): mid-market ops/finance leaders (100–2,000 staff). Positioning: "Your busiest workflows, run by agents. Measured from day one." Offer: Audit (2 wk) → Pilot (4–6 wk) → Operate (monthly).
- Riskiest assumption: buyers will pay a monthly fee to have the agents run for them. Test plan is in the doc.

## Scale clone status (32 menu pages)

Cloned with a spec and QA notes (side-by-side at 1440×900 and 390×844):
data-engine, generative-ai-data-engine, physical-ai, public-sector-data-engine, automotive, rlenvironments, donovan, genai-portfolio, security, evaluation-enterprise, enterprise-insurance, guides, and the shared header/footer (`shared-chrome.md`).
Known small gaps are listed in each spec. Example: Keen Slider's wheel/keyboard plugins aren't ported. Text-wrap deltas come from placeholder copy.

In progress or not started (QA folder for `enterprise` exists, so it was in progress):
enterprise, enterprise-healthcare, experts, evaluation-model-developers, evaluation-public-sector, public-sector, global-public-sector, public-sector-national-security, labs-papers, labs-leaderboard, labs, labs-blog, labs-jobs, about, careers, demo, blog, events, docs, partnership.
Priority order: enterprise, enterprise-healthcare, then blog, events, careers, demo, about, experts. The public-sector and research pages have no Vahue page to fill and come last.

## Vahue pages built from clones (copy from lib/automation-content.ts)

Done:
- `/automations` hub (data-engine layout)
- `/automations/back-office-sync` (generative-ai-data-engine)
- `/automations/document-intake` (physical-ai)
- `/automations/support-agents` (donovan)
- `/automations/scoring-decisions` (automotive)
- `/automations/engineering-enablement` (rlenvironments)
- `/security` (security)

Still to do:
- `/automations/knowledge-agents` on genai-portfolio (the clone is ready)
- `/operations` → "How we operate" on enterprise
- `/strategy` → "Workflow audit" on evaluation-enterprise
- Industry landings with `INDUSTRY_WORKFLOWS`, plus a new `/industries/distribution-manufacturing`
- Navbar: add an Automation menu first (hub, 6 workflows, How we operate); add Distribution & Manufacturing under Industries; add Security under Resources
- Case-study template fields: point A, time to first agent live, point B, payback
- Homepage copy pass with the positioning, the six workflows and Audit → Pilot → Operate
- Final side-by-side QA of the real pages, `npm run build`, then open a PR to `main` (don't deploy)

## Rules to follow

- `DESIGN.md` and `PRODUCT.md` in the repo, and the project memory rules:
  - Vahue fonts, logo and dark palette (don't ship Scale's commercial font or logos)
  - no gradient hero, no blue+purple pairing
  - no AJTBD words in section labels
  - no third-party or unverified metrics; only Vahue's own cases from `lib/case-studies.ts`
- Same libraries and parameters as Scale (see `scale-motion-stack.md`). Honour reduced motion.

## Tools and setup

- **REA MCP** (local reverse-engineering MCP) runs only on Mike's Mac. It was used for `analyze_web_bundle`, JS runtime interception and event-listener maps, in an isolated Chrome on CDP port 9230. A cloud session can't reach it, so run clone work in Claude Code on the Mac in `~/Desktop/Vahue`.
- **Visual QA:** `npm run dev`, then Scale and the clone side by side at 1440×900 and 390×844, screenshots every 50% viewport and at several cursor positions.
- **Research:** NMT skill `/anthropic-skills:nmt-market-research` (AJTBD), Deep mode, with web research subagents.
