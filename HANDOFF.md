# Handoff: AI automation research + Scale 1:1 clone + Vahue rebuild

Last updated: 2026-11-01 (all clones, audits and Vahue pages done; PR to main open). If there are newer commits on the branch than this file describes, trust `git log`.

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

## Scale clone status (32 menu pages) — updated 2026-11-01

All 32 menu pages are cloned at `/scale-clone/<slug>/` (index at `/scale-clone/`), each with a full spec in `reference-snapshots/scale-clone/<slug>.md` that ends with a per-section **Interaction inventory** (REA listener evidence ids, source modules, params, Scale-vs-clone measurements) and QA images in `reference-snapshots/scale-clone/qa/<slug>/` (+ `interactions/`).
- Every clone was instrumented per section with REA (listeners traced to source + params) and driven with Playwright at identical inputs on scale.com and the clone (cursor paths, hovers, drag, wheel/scroll scrub, keyboard, triggers) at 1440×900 and 390×844.
- labs.scale.com (labs, labs-papers, labs-leaderboard, labs-blog, labs-jobs) is a separate stack (Next + Tailwind 4 + framer-motion + WebGPU hero): see `labs-stack.md`; shared chrome in `components/scale-clone/labs-shared/`. `/scale-clone/docs` is Scale's Mintlify docs. Both skip the scale.com header/footer via `components/scale-clone/shared/CloneChrome.tsx`.
- Shared fixes proven across clones: FlatCta state machine (wash on CSS `translate`, reset on the 680ms timer only), `#86bff2` `:focus` outline on internal links, retroactive intro trigger (end `bottom 20%`), `lib/useRefreshOnPageGrow.ts`, full-bleed media scale only during scroll.
- Known shared gaps: Vahue fonts instead of Scale's commercial fonts (small text-width deltas), shared footer 40px shorter at 390, third-party logos as neutral tiles, `oml:` short-landscape variants not reproduced, static data snapshots (blog/events/careers/labs) dated in each spec.

## Vahue pages built from clones (copy from lib/automation-content.ts)

Mike's rules (2026-10-31), applied to every page below: strict parity with the clone (every section in order, same element roles/counts, copy of similar length doing the same storytelling job; only the copy comes from the research), **Scale's colour design** (supersedes the earlier Vahue-dark rule), Vahue fonts and logo, no Scale imagery/logos, placeholder numbers allowed where Scale has a number but marked `// PLACEHOLDER METRIC`, and every clone interaction kept with the same params. Agent-written copy is marked `// page copy`.

| Vahue page | Clone |
|---|---|
| `/automations` hub | data-engine |
| `/automations/back-office-sync` | generative-ai-data-engine |
| `/automations/document-intake` | physical-ai |
| `/automations/support-agents` | donovan |
| `/automations/scoring-decisions` | automotive |
| `/automations/engineering-enablement` | rlenvironments |
| `/automations/knowledge-agents` | genai-portfolio |
| `/operations` (How we operate) | enterprise |
| `/industries/banking-financial-services`, `/retail-ecommerce`, `/distribution-manufacturing` (new) | enterprise (shared `components/industry/enterprise/` + `components/enterprise-vahue/`) |
| `/industries/insurance` | enterprise-insurance |
| `/industries/healthcare-life-sciences` | enterprise-healthcare (renders the clone's `HealthcarePage`) |
| `/strategy` (Workflow audit) | evaluation-enterprise |
| `/security` | security |
| `/guides`, `/case-studies` | guides |
| `/careers` | careers |
| `/contact` | demo (EmailJS, same as the site's other form; accepts free-mail addresses; `to_email: human@vahue.ai`) |
| `/blog` (+ `/blog/category/[slug]`) | blog |
| `/events` | events |

Also done: homepage copy pass (positioning, six workflows, Audit → Pilot → Operate), Navbar (Automation menu incl. Knowledge agents, Distribution & Manufacturing, Security under Resources), case-study fields (point A, time to live, point B, payback — only where stated), llms alternates and `llms.txt` updated for rebuilt pages.

**For Mike to review** (full list in the PR description): agent-written copy, placeholder metrics (`grep -rn "PLACEHOLDER METRIC"`), /guides slots that link to service pages under guide titles, ISO 27001 claim on /security and healthcare, unused old components (`components/careers/CareersExperience.tsx`, `components/events/EventsClient.tsx`, `BookNowModal.tsx`, `components/segments/content/operations.ts`), experts clone ships Scale's 5.3 MB hero video.

## Mac memory budget (Mike's rules, mandatory)

The Mac has 16 GB, shared with other Claude sessions and a Chrome on port 9223 that you must never touch.
- One browser only: reuse a single Chrome tab via REA (CDP 9230), and close each page or tab as soon as you're done with it. No parallel browser agents; at most 2 agents running at once in total.
- Before starting any browser or build, check free memory (`memory_pressure` / `vm_stat`). If it's below 25% free, wait and don't start anything new.
- Don't run tsc, builds or dev servers in parallel. Run one heavy command at a time, and stop dev servers you're not using.
- Kill only processes you started yourself.

## Rules to follow

- `DESIGN.md` and `PRODUCT.md` in the repo, and the project memory rules:
  - Vahue fonts and logo (don't ship Scale's commercial font or logos)
  - on pages built from a Scale clone, Mike's 2026-10-31 override applies: Scale's colour design (not the Vahue dark palette / no-gradient / no-blue+purple rules), strict structural parity, placeholder numbers allowed but marked `// PLACEHOLDER METRIC`
  - no AJTBD words in section labels
  - otherwise only Vahue's own cases from `lib/case-studies.ts`; never invent cases, quotes, events or posts
- Same libraries and parameters as Scale (see `scale-motion-stack.md`). Honour reduced motion.

## Tools and setup

- **REA MCP** is the local reverse-engineering MCP; it runs only on Mike's Mac. A cloud session can't reach it, so run clone work in Claude Code on the Mac in `~/Desktop/Vahue`.
  - It's configured in `~/.claude.json` under `mcpServers.rea` as `npx -y rea-agents@6.4.0 mcp`, with env `HOPPER_LAUNCHER_PATH=/Applications/Hopper Disassembler.app/Contents/MacOS/hopper`. Claude Code starts it automatically, and its tools appear as `mcp__rea__*` (load them with ToolSearch).
  - REA doesn't launch the browser for web work. Start an isolated Chrome with remote debugging yourself:
    ```bash
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9230 --user-data-dir=<scratch dir>/chrome-profile --no-first-run --no-default-browser-check --window-size=1440,900 https://scale.com/ &
    ```
    Use a throwaway profile dir, never the real Chrome profile.
  - Open one tab per page with `curl -s -X PUT 'http://127.0.0.1:9230/json/new?<url>'`, which returns the target id, and close it with `curl -s http://127.0.0.1:9230/json/close/<id>`.
  - Then call `mcp__rea__analyze_web_bundle` (`cdp_endpoint: "http://127.0.0.1:9230"`, `target_id`, `include_script_sources: true`) and `mcp__rea__inspect_web_event_listeners` (with a CSS selector).
  - REA never evaluates JS. For live mid-scroll samples and screenshots use Playwright (below).
- **Playwright:** the repo doesn't have it. Use `require('/Users/mykhailodoroshenko/Desktop/hvn-main-fresh/node_modules/playwright-core')` and `chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })`.
  - `connectOverCDP` to port 9230 hangs, so launch a separate browser.
  - scale.com is slow to reach domcontentloaded: use `page.goto(url, { waitUntil: 'commit', timeout: 90000 })` and then wait for a selector.
- **Gotchas found while cloning:**
  - The site's global `h1–h6` styles (white, semibold) override headings, so set colour and weight explicitly.
  - This repo's `leading-snug` is 1.25, while Scale's is 1.375.
  - Scale configures shared components per page (FullBleedMediaSection `startPercentage`/`startScale`, gradient-only `.media-overlay`), so read each page's own props from its bundle.
- **Visual QA:** `npm run dev -- -p 3100`, then Scale and the clone side by side at 1440×900 and 390×844, with screenshots every 50% viewport and at several cursor positions. Save JPEGs of 300 KB or less to `reference-snapshots/scale-clone/qa/<slug>/`.
- **Research:** NMT skill `/anthropic-skills:nmt-market-research` (AJTBD), Deep mode, with web research subagents.
