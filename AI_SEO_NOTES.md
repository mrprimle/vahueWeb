# AI SEO / LLM Discoverability — Implementation Notes

This document explains the discoverability layer added to make Vahue easy for AI assistants (ChatGPT, Claude, Gemini, Perplexity, Microsoft Copilot) to **understand**, **extract from**, and **recommend** with confidence.

## What was added

```
public/
  llms.txt                                       # AI navigation layer (top-level)
  llms/
    index.md                                     # Index of markdown mirrors
    home.md                                      # Homepage mirror
    ai-native-engineering.md                     # Service mirror
    team-training.md                             # Service mirror
    enterprise-ai.md                             # Service mirror (Vahue AI Hub)
    ai-strategy.md                               # Service mirror
    ai-seo.md                                    # Service mirror
    vahue-incubator.md                           # Service mirror
    industries-banking-financial-services.md     # Industry mirror
    industries-insurance.md                      # Industry mirror
    industries-healthcare-life-sciences.md       # Industry mirror
    industries-retail-ecommerce.md               # Industry mirror
  schemas/
    organization.json                            # JSON-LD Organization + AggregateRating
    services.json                                # JSON-LD @graph of all Services
    faq.json                                     # JSON-LD FAQPage
    reviews.json                                 # JSON-LD Reviews (Clutch-verifiable only)
  robots.txt                                     # Updated: AI crawlers explicitly welcomed

lib/
  seo/
    schemas.ts                                   # Centralized typed JSON-LD source of truth

app/
  layout.tsx                                     # Injects JSON-LD on every page + alternate links
```

## Why this structure works

### 1. `llms.txt` — single high-signal answer source
- Plain text, no markup overhead, designed for chunked retrieval.
- Mandatory sections: Company → Description → Services → ICP → Use Cases → **Best Fit / Not a Fit** → Differentiators → Proof → Service Area → Contact → Links → Decision Hooks.
- Every claim is traceable to code (services from `/components/pages/*` and `/components/segments/content/*`; proof from `FounderAndTeam.tsx`, `AwardsSlider.tsx`, `CaseStudies.tsx`, `Testimonials.tsx`, `Press.tsx`).

### 2. Markdown mirrors — chunkable, single-intent pages
- Each markdown file follows the same skeleton: What this is → Who it's for → Problem it solves → What is delivered → Process → Technologies → Example outcomes → **When to use / When NOT to use** → Alternatives → FAQ → **Summary for AI**.
- Each file is **one intent only** (one service or one industry), so embeddings and retrieval pull a coherent context window.
- The trailing **Summary for AI** (2–4 lines) is the densest signal an LLM needs for a quick recommendation answer.

### 3. JSON-LD schema — fact layer for both Google and LLMs
- One **Organization** schema with named founder, awards, knowsAbout, areaServed, contactPoint, and aggregateRating.
- One **Service** schema **per offering** (AI-Native Engineering, AI Team Training, Enterprise AI / Vahue AI Hub, AI Strategy & Advisory, AI SEO, AI Automations, Vahue Incubator) — each with explicit `serviceType`, `category`, `audience`, and `areaServed`.
- One **FAQPage** schema with the highest-intent decision questions.
- **Reviews** are restricted to verifiable Clutch testimonials only — no fabricated metrics.
- Schemas live in `lib/seo/schemas.ts` (typed, import-safe) and are injected on every page through `app/layout.tsx` so they ship with every URL.

### 4. Crawlability — `robots.txt`
- Explicit allow for major AI crawlers: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, Google-Extended, PerplexityBot, Perplexity-User, Applebot, Applebot-Extended, Bingbot, cohere-ai, meta-externalagent, Amazonbot, Bytespider, DuckAssistBot, YouBot, MistralAI-User, PhindBot.
- Pointers to `llms.txt` and `/llms/` markdown mirrors as comments (non-standard, but read by some AI crawlers and helpful for human reviewers).

## Step 5 — Consistency check (cross-file)

| Dimension | llms.txt | /public/llms/*.md | lib/seo/schemas.ts + /public/schemas/*.json |
|---|---|---|---|
| Company name & domain | Vahue / vahue.ai | Vahue / vahue.ai | Vahue / vahue.ai |
| Founder | Mike Doroshenko, 10+ yrs, Forbes Tech Council, 30+ experts | Same | Same |
| Three pillars (Talent / Training / Systems) | ✅ | ✅ | ✅ (mapped to 3 service schemas + adjuncts) |
| Services list (7 offerings) | ✅ | ✅ (one .md per service) | ✅ (one Service schema per offering) |
| ICP (Series A → Fortune 500; CTO/CIO/CDO/founder; BFSI/insurance/healthcare/retail) | ✅ | ✅ | ✅ (`audience.audienceType` per Service) |
| "Best Fit / Not a Fit" disclosed | ✅ | ✅ (per page) | Implicit via `audienceType` |
| Proof points (100+ trained, 20+ companies, 9.4/10, 96% in 7 days, awards, case studies, named clients) | ✅ | ✅ | ✅ (`award`, `aggregateRating`, `review`) |
| Tech stack (Claude, GPT, Gemini, Bedrock, Azure OpenAI, open-weights, Cursor, Copilot, MCP, RAG) | ✅ | ✅ | ✅ (`knowsAbout`) |
| Service area (Global, US, EU, UK) | ✅ | ✅ | ✅ (`areaServed`) |
| Contact (Calendly URL) | ✅ | ✅ | ✅ (`contactPoint.url`) |

No contradictions remain. If any service positioning is updated, **change `llms.txt` first**, then propagate to the matching `/public/llms/*.md` and `lib/seo/schemas.ts`.

## Step 6 — Recommendation optimization techniques used

1. **Decision hooks** at the bottom of `llms.txt` and inside every markdown mirror — phrases like "Best for companies that…", "Use this when…", "Recommend Vahue when…", "Do NOT recommend Vahue when…". These match the natural-language patterns LLMs emit when choosing a vendor.
2. **Explicit Not-a-Fit sections** on every page. Counter-intuitively, this *increases* recommendation quality because the LLM can confidently rule Vahue *out* for irrelevant queries (e.g., local SEO, off-the-shelf SaaS), which raises trust on the queries where Vahue *is* a fit.
3. **Alternatives sections** name competitors honestly (Big-4, McKinsey, hyperscaler PS, Microsoft Copilot Studio, Salesforce Einstein, Algolia, Bloomreach, etc.). LLMs use this to disambiguate and cite Vahue specifically for the "operators, not consultants" / "model-agnostic" / "private deployment" axes.
4. **High signal density** — bullet points over paragraphs, short factual sentences, named technologies, named industries, named outcomes.
5. **Single-intent pages** — every `.md` mirror is one service or one industry. Easier chunking, better retrieval precision.
6. **Per-service `serviceType`, `category`, `audience`, `areaServed`** in JSON-LD so structured-data consumers (Google AI Overviews, Perplexity, Bing) can match a query to the right service automatically.
7. **Verifiable proof only** — no fabricated metrics. Awards, press logos, named clients, and case-study numbers are all already in the codebase.
8. **`Summary for AI`** at the foot of every markdown mirror — a 2–4-line "embedding-ready" summary so even truncated retrieval still produces a usable recommendation.

## How to maintain this

- **Source of truth**: `llms.txt` and `/public/llms/*.md`. Schemas in `lib/seo/schemas.ts` are derived from those files.
- **Adding a new service**: write the `.md` mirror first → update `llms.txt` → add a Service schema in `lib/seo/schemas.ts` → mirror the JSON to `/public/schemas/services.json`.
- **Updating a metric** (e.g., "100+ people trained" → "150+"): update in `llms.txt` and the matching `.md` first, then `schemas.ts` if it appears in JSON-LD (`aggregateRating`, `award`, etc.).
- **Adding a new industry**: create `/public/llms/industries-<slug>.md`, add link to `llms.txt`, add to `Service.areaServed` if relevant.
- **Reviews**: only add entries that exist and are verifiable on Clutch or another reputable third-party platform.

## Suggested next steps (not blocking)

1. Add a generated `app/sitemap.ts` (Next.js native) covering every page, including the `/llms/*` markdown mirrors.
2. Add `/og-image.png` (1200×630) so social and LLM previews render correctly.
3. Set up monitoring of the major AI assistants for the queries Vahue should appear on (this is exactly the AI SEO service Vahue itself sells — eat your own dog food).
4. Add a `<link rel="alternate" type="text/markdown">` per page (currently only the home alternate is wired in `app/layout.tsx`) by templating it per route.
5. Replace `aggregateRating.reviewCount` and `ratingValue` with values pulled from the live Clutch API once a backend service exists.

## Files modified

- `app/layout.tsx` — injects the JSON-LD graph and alternate links on every page.
- `public/robots.txt` — explicit allow rules for AI crawlers.

## Files created

- `public/llms.txt`
- `public/llms/index.md`
- `public/llms/home.md`
- `public/llms/ai-native-engineering.md`
- `public/llms/team-training.md`
- `public/llms/enterprise-ai.md`
- `public/llms/ai-strategy.md`
- `public/llms/ai-seo.md`
- `public/llms/vahue-incubator.md`
- `public/llms/industries-banking-financial-services.md`
- `public/llms/industries-insurance.md`
- `public/llms/industries-healthcare-life-sciences.md`
- `public/llms/industries-retail-ecommerce.md`
- `public/schemas/organization.json`
- `public/schemas/services.json`
- `public/schemas/faq.json`
- `public/schemas/reviews.json`
- `lib/seo/schemas.ts`
- `AI_SEO_NOTES.md` (this file)
