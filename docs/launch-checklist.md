# Mike's checklist after parity

Everything Mike needs to change or verify before this site goes public. Claude adds to it as each page is finished. Tick items as you go.

To see every marked line in the code, with file and line number:

```bash
git grep -n PLACEHOLDER -- 'components/**/content.ts'
```

Not everything here is marked in the code, so go through this list as well.

## Decide first

- [ ] **Scale's design and media.** The site copies Scale's design, behaviour, images, videos and most of its copy. Check the legal risk before publishing, and replace the media listed below.
- [ ] **URLs.** Routes still use Scale's paths, such as `/public-sector`, `/automotive`, `/donovan`, and `/blog/category/defense` (labelled Regulated), `/blog/category/robotics` (Operations), `/blog/category/autonomous-vehicle` (Voice Agents). Rename them?
- [ ] **Names.** Confirm "Vahue Context Engine", "Agent Environments" and "Vahue Baselines", the menu labels, and the "Book a Demo" button.
- [ ] **Shorter lists.** Long lists stop at 24 invented rows instead of matching Scale's count: `/labs/papers` 24 of 88, `/events` 24 of 88, `/careers` 24 of 275. At rest only `/labs/papers` is visibly shorter than Scale's. Tell me if you want more rows.
- [ ] **Proof pages.** Blog, customer and guide cards link to the nearest existing page because no detail pages exist. Build them, or remove the cards?

## Certifications

Vahue holds: SOC 2, ISO 27001, ISO 42001, HIPAA, GDPR, EU AI Act, CSA STAR, CCPA (Mike, 2026-11-02).

- [ ] Is the SOC 2 Type II? The site says plain "SOC 2". If it is, also rename the title on `/security`.
- [ ] CSA STAR level. The `/enterprise/healthcare` badge says "Level One: Self-Assessment".
- [ ] "Enterprise Security Review Passed" on `/genai-portfolio`.
- [ ] `/public-sector/national-security` (Regulated Industries): "Vahue products are authorized for SOC 2, HIPAA, ISO 27001, and ISO 42001 environments; CSA STAR and EU AI Act are covered." The sentence follows Scale's template, so check the wording.
- [ ] `/public-sector/national-security`: "pre-assessed for third-party risk", "pre-negotiated MSA and DPA".
- [ ] `/security`: the ISO certificate is offered for download, and reports are offered through a Trust Center that doesn't exist yet. Those links go to `/demo`.
- [ ] `/security`: confirm the `vulnerabilities@vahue.ai` mailbox exists.

## Company facts

- [ ] `/about` stats, all invented: 15M decisions, $10M paid to experts, $29M valuation, 100+ employees, founded 2016.
- [ ] Home: "10 years putting AI to work" and "Since 2016".
- [ ] `/about`: headquarters caption is "City, Country", and the press tiles have invented headlines with "Full Name".
- [ ] Footer: legal entity name, LinkedIn and X links.
- [ ] Announcement bar and menu featured cards: titles are placeholders.

## Demo form

- [ ] **The `/demo` form sends nothing.** It shows the success message and the lead is lost. You asked for it to go to human@vahue.ai, which needs an email service and its keys. See `TODO(backend)` in `components/pages/demo/DemoForm.tsx`.
- [ ] Heading "Let's Scale Together": keep it? "Scale" is a verb there, but it's also the name of the site we copied.
- [ ] Budget bands `<$100k` to `$1M+` are Scale's. Do they fit scale-ups?
- [ ] Free-mail addresses are refused, as on Scale, using a local list of 19 domains. Keep that?
- [ ] "Review Site" replaces Scale's "Billboard" under how you heard about us. Company types were also reworded.
- [ ] Quote, name, role, "Trusted by" line and 7 logo tiles are placeholders.

## Customers and quotes

- [ ] Customer logos are neutral tiles on home, `/data-engine`, `/automotive`, `/donovan`, `/enterprise`, `/enterprise/healthcare`, `/about`, `/experts`.
- [ ] "Trusted by the world's most ambitious..." lines: `/enterprise`, `/enterprise/insurance`, `/evaluation/public-sector`, `/generative-ai-data-engine`, `/physical-ai`, `/public-sector-data-engine`, `/automotive`, `/data-engine`, `/genai-portfolio`.
- [ ] Testimonials with "Full Name, Role, Company": `/data-engine`, `/enterprise` (3), `/enterprise/healthcare`, `/evaluation/model-developers` (2), `/experts` (2), `/genai-portfolio` (3), `/generative-ai-data-engine`, `/global-public-sector`, `/physical-ai` (2), `/public-sector-data-engine`. Many are reworded from Scale's real customer quotes, including "Experts are the new GPUs", so replace the quote rather than only adding a name.
- [ ] Home: 11 customer story tiles (insurer, distributor, PE firm and so on).
- [ ] Case studies: `/data-engine` insurer, `/generative-ai-data-engine` distributor, `/enterprise/healthcare` Care Group, `/global-public-sector` contract and proposal cases.
- [ ] Blog tiles naming invented partners: home, `/enterprise`, `/genai-portfolio`, `/public-sector`, `/public-sector-data-engine`, `/public-sector/national-security`.

- [ ] `/events`: all 24 events are invented, so replace them with real ones. Event cards link to site pages because `/events/<slug>` pages don't exist. Do you want them?

- [ ] `/careers`: 23 roles and their locations are invented, and Apply goes to `/demo`. Benefits still use Scale's wording, so confirm they're true for Vahue. "Graduate Engineer Careers" and Early Careers imply a programme Vahue may not run, and the press cards are placeholders. Scale's office photos are still used.

- [ ] `/labs/papers`: all 24 papers are invented (titles, dates, benchmark names, `Full Name` authors), and rows 1 to 6 also appear on `/labs`. Rows go nowhere because there are no paper pages. The blurb says Vahue publishes research, so confirm you want this page before there are real papers.

- [ ] `/blog`: all 24 posts are invented (Scale has 164). `/blog/<slug>` is a stub with a title and a back link, not a real post page. Search is a static filter, not a real index.

- [ ] `/labs/blog`: all 24 posts are invented, with invented figures (for example IntakeBench "40,000 plus documents", ExceptionBench "718 cases") and claims ("Every agent Vahue runs is proven on CaseEnv", open-source releases). **Five posts still carry Scale's own wording about its real research:** "MCP vs. CLI", "Insights Generator", "Coverage Not Averages" (title and intro), and "Introducing READY", "Who Grades the Graders?", "HiL-Dynamics", "Long Horizon Augmented Workflows" (title). Those must not go live as Vahue's. "Read post" goes nowhere because there are no post pages.

- [ ] `/labs/leaderboard`: all 132 score rows use invented labels (`Model A` to `Model J`) with Scale's real numbers kept so the bars hold their shape, so replace them all. Also `20+` benchmarks, `100+` models, and "From leading AI labs including OpenAI, Anthropic, Google, Meta", which is only true if Vahue evaluates them. All 44 benchmark names are invented or inherited, and some read as real programmes (`Fortress`, `Remote Labor Index`). The first five must match `/labs`. Also `PartnerCo` and "82 expert-curated tasks".
- [ ] `/labs/leaderboard`: confirm the `evals@vahue.ai` mailbox exists. The Evaluate form sends nothing and needs a backend. "View Full Ranking" links back to the same page because ranking pages aren't built.

## Numbers

- [ ] Home: "25% fewer errors", "90% of the AI pilots".
- [ ] `/enterprise`: 93%, $4M+, 100%, 36,000+, 6 weeks.
- [ ] `/public-sector/national-security`: 36% faster, 80% reduction, 40% savings, 12x, 6+ years.
- [ ] `/global-public-sector`: 85%, 100K+, 50%, 10x, 80%, 6 weeks, 5x, 32+.
- [ ] `/enterprise/healthcare`: 11+ minutes, and the chart and record figures in the mock screens.
- [ ] `/donovan`: scores and percentages in the demo table.
- [ ] `/physical-ai`: "1000+ hours of diverse document data ... every day".
- [ ] `/evaluation/enterprise`: "Only 10% of enterprises" and "more than 30%" need a source. The mock window shows `app.vahue.ai`.
- [ ] `/evaluation/model-developers`: "100s of red team staff".

## Capability claims

- [ ] `/experts`: "Millions of experts", every Ivy League school, 60%+ of the Fortune 500, 65+ languages, 117 countries, 370+ fields, the "who they are" lines and the logos in each expert group.
- [ ] `/generative-ai-data-engine`: "developed more high-quality data than anybody else".
- [ ] `/public-sector`: "available for purchase on AWS Marketplace".
- [ ] `/public-sector/national-security`: "available through systems integrators, managed service providers, and consulting partners".
- [ ] `/rlenvironments`: has no marks in the code. Check "code stays in your repos" and the security review.

- [ ] `/labs`: every benchmark, paper, post and job is invented, including "Open-Source" releases such as IntakeBench and CaseEnv. Also check job locations and dates, and the footer's "Vahue Inc." Does Vahue want a research lab section at all?
- [ ] `/labs` newsletter form shows a thank-you message and sends nothing. It needs a backend.

## Media to replace

Claude will confirm in the final pass exactly which of these are still on the site.

- [ ] `/about`: Scale's office photos, labelled "Vahue office".
- [ ] Off-topic or Scale-specific images: military and government imagery on home and in menu photos, the Audio-Technica mark on the `/data-engine` hero, robot photos on `/physical-ai`, street and living-room photos on `/automotive`, tower, rig, X-ray and surgeon images and Scale's triangle mark on `/enterprise`, the capability map regions on `/generative-ai-data-engine`.
- [ ] Demo videos are stand-ins: `/automotive`, `/donovan`, `/enterprise/insurance`, `/enterprise/healthcare`, `/generative-ai-data-engine`, `/global-public-sector`, `/public-sector-data-engine`.
- [ ] Replaced visuals are drawn UI mocks, so they look more uniform than Scale's photos. Send real or stock photos if you want that look back.
- [ ] `/evaluation/model-developers`: the taxonomy image names harms such as "Promotion of violence".

## Missing from the site

- [ ] Terms and Privacy text. The footer links to `/legal/terms` and `/legal/privacy`, and those pages don't exist.
- [ ] Favicon and cookie consent banner.
- [ ] Trust Center.
