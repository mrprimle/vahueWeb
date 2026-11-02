# Mike's checklist after parity

Everything Mike needs to change or verify before this site goes public. Claude adds to it as each page is finished. Tick items as you go.

To see every marked line in the code, with file and line number:

```bash
git grep -n PLACEHOLDER -- 'components/**/content.ts'
```

Not everything here is marked in the code, so go through this list as well.

## Added in the final pass (2026-11-02)

- [ ] **Reversible calls:** `/labs` is hidden (no links, not indexed, pages still exist), and Research became a Company tab. Service URLs moved to `/services/*` and `/solutions/*`, with redirects from the old paths. `/docs` slugs and `/blog/category` slugs weren't all renamed. If you want `/labs` back, its benchmarks, papers, posts and jobs are all invented.
- [ ] **Send one test email from `/demo`.** No real email has been sent. Check the EmailJS template's To field, allowed domains and Vercel env vars. The form shows an error if sending fails.
- [ ] **Items marked `// FROM OLD SITE: confirm`:** stats, four results, awards and logos. Run `git grep -n "FROM OLD SITE"`. "Top 1%" conflicts with a badge reading "Top 1000, 2022", so it's text only.
- [ ] **Quotes on `/enterprise`:** these three were deleted from your old site on 2026-09-04 and are about developer work. Keep them?
- [ ] **Logo permission:** eToro, Qonto and others now show in Trusted By rows. Only Qonto ever rendered on your old site. The `kaprise` file reads Captriz. Blueair was skipped because it could expose the NDA client.
- [ ] **Office photos:** home and `/enterprise` use crops of old-site office photos with identifiable staff. The originals show a StartupSoft sign, and one is retouched to read Vahue. Replace them or confirm the rights. `/about` uses your four Desktop photos, which are 800px and soft in full-bleed slots.
- [ ] **Stand-in images:** replacement photos are softer than Scale's, and baked text behind some hero copy is blurred rather than redrawn. Real or stock photos would close this gap. The CSA STAR badge is drawn, so supply the official mark.
- [ ] **Legal:** Terms, Privacy and Cookie text came from your old site unchanged. They mention Vercel Analytics, Calendly and CV storage, which this branch doesn't have. Data Processing is a placeholder page. Legal entity: "Vahue AI, Inc." in the footer is unconfirmed.
- [ ] **Small differences left:** menu labels are shortened (Integrations, Decision Scoring, others drop Agents) to fit Scale's column. Tiny arrowheads remain in Knowledge Agents videos. The cookie banner covers the `/enterprise` CTA until answered at 1440. The healthcare card is mostly cropped at 390. No Cookies Settings button, because there's nothing to configure.
- [ ] **Not verified:** the fresh-session cookie banner walk covered 8 routes for scroll, not all. Most final-check sheets were taken before the last fixes, and only repaired spots were re-shot.

## Copy rewrite (2026-11-02)

The 80% rule is gone. Menu and pages now follow the 12 services from the research's most common jobs. 

- [ ] **Promises:** "we stay and run it" monthly is an untested bet. Also confirm the 2-week Audit and 4 to 6-week Pilot timelines, "you own the code and IP" and "your cloud or ours".
- [ ] **Service names:** confirm the 12 names, and whether Team Training should be added. It's not a top job in the research, but your old site sold it.
- [ ] **Invented proof still marked `PLACEHOLDER`:** home and `/enterprise` stats, cases and quotes; 75% entry, 30 to 40% CRM time and 200 to 500 cases on the workflow pages; 10%/30% on `/evaluation/enterprise`; the new Professional Services quote; specialist backgrounds on `/experts`.
- [ ] **Unmarked claims to check:** NetSuite and SAP integrations; "leading foundation model providers"; red-teaming; "cost in every monthly report"; "Meet our customers"; "Best In The Business"; the `/genai-portfolio` comparison table against Platforms, In House and Dev Agencies.
- [ ] **Old case studies:** six in the old site's `lib/case-studies.ts` match other firms' work in the research. They aren't used here. Check whether they're live on vahue.ai.
- [ ] **`/guides`** books open service pages because no guides exist. Healthcare hero text touches the card art at 390.
- [ ] **"Log in"** goes to `/demo`.

## Decide first

- [ ] **Scale's design and media.** The site copies Scale's design, behaviour, images, videos and most of its copy. Check the legal risk before publishing, and replace the media listed below.
- [ ] **Shorter lists.** Long lists stop at 24 invented rows instead of matching Scale's count: `/labs/papers` 24 of 88, `/events` 24 of 88, `/careers` 24 of 275. At rest only `/labs/papers` is visibly shorter than Scale's. Tell me if you want more rows.
- [ ] **Detail pages.** The 33 pages are Scale's menu pages. Scale's detail pages under them aren't built: blog and customer posts, guides, events, jobs, partner pages, `/careers/university`, papers, leaderboards. Cards link to the nearest existing page. Build them, or remove the cards?

- [ ] **Home hero corners below 1450 wide.** Scale's top corners are square at the top of the page between 768 and 1449 wide, and round after about 30px of scroll. From 1450 up they're round from the start. Ours now does the same. Tell me if you want round corners from the start at every width, which would differ from Scale.

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
- [ ] `/about`: headquarters caption is "City, Country", and the press tiles have invented headlines with "Full Name".
- [ ] Footer: legal entity name, LinkedIn and X links. The footer says "Vahue AI, Inc." and `/labs` says "Vahue Inc.", and neither is confirmed. A much shorter real name brings small footer height gaps back at 320 and 768.
- [ ] Footer wording changed to fit Scale's line breaks: "Workflow Automation Guide", and "Teams" in the announcement bar. The footer headline's "workflows" is wider than Scale's "decisions", so the footer is 116px taller at 1366 wide, a common laptop size. Switch to "decisions" to close that?
- [ ] Announcement bar and menu featured cards: titles are placeholders.

## Demo form

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


- [ ] `/blog`: all 24 posts are invented (Scale has 164). `/blog/<slug>` is a stub with a title and a back link, not a real post page. Search is a static filter, not a real index.



- [ ] `/partnership`: both partner cards are invented ("CRM Implementers", "Telephony Firms x Vahue") with neutral logo tiles, and they link to product pages because there are no partner pages. Add real partners or drop the page. Also check the footer's "Data Partnerships" link.


- [ ] `/docs`: only the landing page and its chrome are cloned. Scale has 40 docs pages, and the other 39 are stubs with a title and a Placeholder note. Write them or remove them from the sidebar.
- [ ] `/docs`: Vahue has no public API, so every API Reference row has a Placeholder pill and no endpoints are shown. Keep the tab or hide it? The API names are invented or carried over from Scale.
- [ ] `/docs`: sidebar names imply features that aren't confirmed: Customer Dashboard, Data Hosting (S3, Google Cloud Storage, Azure, IP Allowlisting), Agent Evals, Technical Limits, API Compatibility Policy.
- [ ] `/docs` landing paragraph: "we began with context" is an origin story. Is it true?
- [ ] `/docs` search only matches page titles. Ask Assistant returns a placeholder reply, but the "Responses are generated using AI" line still shows. Keep the assistant? Also check "Vahue Documentation" as the site name, and system font (what Scale actually renders) vs Aeonik.

## Numbers

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


## Media to replace

Home, `/data-engine`, `/generative-ai-data-engine`, `/physical-ai`, `/public-sector-data-engine`, `/automotive` and `/rlenvironments` were re-checked by eye at the end. The other pages' items come from their own page checks.

- [ ] `/rlenvironments`: the capability screenshots show GUI and MCP executor screens with "GPT-5.1". `/experts` still has the Engineering Enablement card.
- [ ] Demo videos are stand-ins: `/automotive`, `/donovan`, `/enterprise/insurance`, `/enterprise/healthcare`, `/generative-ai-data-engine`, `/global-public-sector`, `/public-sector-data-engine`.
- [ ] Replaced visuals are drawn UI mocks, so they look more uniform than Scale's photos. Send real or stock photos if you want that look back.
- [ ] `/evaluation/model-developers`: the taxonomy image names harms such as "Promotion of violence".
- [ ] Home blog tiles: the category labels sit on top of the mock dashboards' own small text (Operations, Customers). The tile 7 image is now the shared pre-footer photo, a stand-in. `public/home/post-7.webp` is no longer used.
- [ ] `/physical-ai`, "Expansive Global Environments": the heading and "Train on data collected from diverse locations" still sit over inbox and queue mocks.

## Missing from the site

- [ ] Trust Center.
