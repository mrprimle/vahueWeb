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

Page list: `reference-snapshots/scale-pages.md`. Registry: `components/scale-clone/shared/pages.ts`. Every clone lives at `/scale-clone/<slug>/`, with an index at `/scale-clone/`.

**Done (spec, motion table and side-by-side QA at 1440×900 and 390×844):**
- data-engine, generative-ai-data-engine, physical-ai, public-sector-data-engine, donovan
  - first built without REA; then an REA verification pass (commit 1c2b96b) fixed the hero clip, overlay, late pre-footer trigger and slider wheel plugin
  - each spec now ends with an "REA verification" section
- automotive, rlenvironments, security, evaluation-enterprise, enterprise-insurance, guides, genai-portfolio
  - built with REA from the start
- shared header, announcement bar and footer (`shared-chrome.md`)
  - pages switch the dark nav with `data-nav-theme="dark"` or `setScaleNavTheme()`

Each spec lists its own small gaps: placeholder logos and imagery, Wistia/HLS video not embedded, Scale imagery with Scale text baked in, and text-wrap deltas from placeholder copy.

**Known follow-up (not done):**
- The automotive clone has no media scale. The REA pass showed Scale scales full-bleed media 1.25→1 on every page it checked, so automotive (and `/automations/scoring-decisions`, built from it) probably needs that scale added.
- Re-check the late pre-footer trigger (fixed in the five early clones with a ResizeObserver re-measure) on rlenvironments, security, evaluation-enterprise, enterprise-insurance and guides, and on the Vahue pages copied from clones.
- A fix-propagation agent was stopped before it changed any files.

**WIP, committed but unfinished:** enterprise, enterprise-healthcare, blog, events
- the agents were stopped mid-build
- the code compiles and `npm run build` passes
- each has a stub spec marked WIP
- enterprise has the most done (three.js hero, drag-to-rotate object, Embla 3D carousel and the pull-apart text variant in progress); see the existing QA images in `qa/enterprise/`

**Not started:** experts, evaluation-model-developers, evaluation-public-sector, public-sector, global-public-sector, public-sector-national-security, labs-papers, labs-leaderboard, labs, labs-blog, labs-jobs, about, careers, demo, docs, partnership.
- Priority: finish enterprise and enterprise-healthcare first (Vahue pages depend on them), then careers, demo, about and experts.
- The public-sector and research (labs.scale.com) pages have no Vahue page to fill, so they come last.

## Vahue pages built from clones (copy from lib/automation-content.ts)

Workflow pages load through `app/automations/[slug]/page.tsx` and `components/automation/workflows/registry.ts`, which maps each workflow slug to `components/automation/workflows/<template>/WorkflowPage.tsx`.

**Done and checked on the dev server** (200, no console errors, compared with the template clone):
- `/automations` hub (data-engine layout)
- `/automations/back-office-sync` (generative-ai-data-engine)
- `/automations/document-intake` (physical-ai)
- `/automations/support-agents` (donovan)
- `/automations/scoring-decisions` (automotive)
- `/automations/engineering-enablement` (rlenvironments)
- `/security` (security)
  - ISO 27001 and GDPR are claimed because the site already claims them elsewhere
  - confirm the ISO certificate is current before shipping

**Built but not fully checked** (the agents were stopped during their final screenshot pass; `npm run build` passes):
- `/strategy` → "Workflow audit" (evaluation-enterprise; components in `components/strategy-audit/`)
- `/industries/insurance` (enterprise-insurance; generic `components/industry/enterprise-insurance/IndustryPage.tsx` taking `{ content, workflows }`)
- `/guides` and `/case-studies` indexes (guides book-card layout; `components/book-index/`)

**WIP, not committed:** `/automations/knowledge-agents` on genai-portfolio
- the agent was stopped mid-build and the files don't compile yet (`Lower.tsx` syntax error)
- parked locally, gitignored, in `.wip/knowledge-agents-genai-portfolio/`
- to finish:
  - move it back to `components/automation/workflows/genai-portfolio/`
  - fix it
  - add `'knowledge-agents': () => import('./genai-portfolio/WorkflowPage'),` to the registry
- the plan: replace Scale's scene videos with our own SVG/three.js visuals on the same pin/scrub params

**Navbar:** an Automation menu was added first, with the hub, five workflows and How we operate.
- Knowledge agents and the Distribution & Manufacturing industry link are left out until those pages exist.
- How we operate links to the existing `/operations`, which isn't rebuilt yet.

**Rules applied to the Vahue pages:**
- no imagery from `public/scale-clone/` on Vahue pages
- dark dot-texture panels where Scale had media
- only verified cases from `lib/case-studies.ts`
- some headings, CTA labels and mock UI text were written by agents (not in `lib/automation-content.ts`), so give them a copy review

**Still to do:**
- `/automations/knowledge-agents` (above)
- `/operations` → "How we operate" on enterprise, once that clone is finished
- the other industry landings with `INDUSTRY_WORKFLOWS`:
  - banking and retail on enterprise
  - healthcare on enterprise-healthcare
  - a new `/industries/distribution-manufacturing` on enterprise
  - then add Distribution & Manufacturing and Knowledge agents to the Navbar
- `/blog`, `/events`, `/careers` and `/contact` on their clones
- Security under Resources in the Navbar
- Case-study template fields: point A, time to first agent live, point B, payback
- Homepage copy pass with the positioning, the six workflows and Audit → Pilot → Operate
- Final side-by-side QA of the real pages, `npm run build`, then open a PR to `main` (don't deploy)

## Mac memory budget (Mike's rules, mandatory)

The Mac has 16 GB, shared with other Claude sessions and a Chrome on port 9223 that you must never touch.
- One browser only: reuse a single Chrome tab via REA (CDP 9230), and close each page or tab as soon as you're done with it. No parallel browser agents; at most 2 agents running at once in total.
- Before starting any browser or build, check free memory (`memory_pressure` / `vm_stat`). If it's below 25% free, wait and don't start anything new.
- Don't run tsc, builds or dev servers in parallel. Run one heavy command at a time, and stop dev servers you're not using.
- Kill only processes you started yourself.

## Rules to follow

- `DESIGN.md` and `PRODUCT.md` in the repo, and the project memory rules:
  - Vahue fonts, logo and dark palette (don't ship Scale's commercial font or logos)
  - no gradient hero, no blue+purple pairing
  - no AJTBD words in section labels
  - no third-party or unverified metrics; only Vahue's own cases from `lib/case-studies.ts`
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
