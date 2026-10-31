# scale.com top-navigation pages

Captured 2026-10-31 by opening each top-nav dropdown on https://scale.com/ at 1440×900 (headless Chrome) and reading the visible links. The clone route for each page is `/scale-clone/<slug>`; the registry lives in `components/scale-clone/shared/pages.ts`.

## Products
| Column | Item | Source | Slug |
|---|---|---|---|
| Data | Scale Data Engine | https://scale.com/data-engine | `data-engine` |
| Data | For Generative AI | https://scale.com/generative-ai-data-engine | `generative-ai-data-engine` |
| Data | For Physical AI | https://scale.com/physical-ai | `physical-ai` |
| Data | For Government | https://scale.com/public-sector-data-engine | `public-sector-data-engine` |
| Data | For Automotive | https://scale.com/automotive | `automotive` |
| Data | RL Environments | https://scale.com/rlenvironments | `rlenvironments` |
| Data | Experts | https://scale.com/experts | `experts` |
| Applications | Scale GenAI Portfolio | https://scale.com/genai-portfolio | `genai-portfolio` |
| Applications | Scale Donovan | https://scale.com/donovan | `donovan` |
| Evaluation | For Model Developers | https://scale.com/evaluation/model-developers | `evaluation-model-developers` |
| Evaluation | For Public Sector | https://scale.com/evaluation/public-sector | `evaluation-public-sector` |
| Evaluation | For Enterprise | https://scale.com/evaluation/enterprise | `evaluation-enterprise` |

Two image cards in the Products panel link to `/enterprise` and `/data-engine` (already listed).

## Solutions
| Item | Source | Slug |
|---|---|---|
| Enterprise | https://scale.com/enterprise | `enterprise` |
| US Public Sector | https://scale.com/public-sector | `public-sector` |
| Global Public Sector | https://scale.com/global-public-sector | `global-public-sector` |
| Insurance | https://scale.com/enterprise/insurance | `enterprise-insurance` |
| Healthcare | https://scale.com/enterprise/healthcare | `enterprise-healthcare` |
| National Security | https://scale.com/public-sector/national-security | `public-sector-national-security` |

## Research (labs.scale.com, a separate site)
| Item | Source | Slug |
|---|---|---|
| Research Papers | https://labs.scale.com/papers | `labs-papers` |
| Frontier Leaderboards | https://labs.scale.com/leaderboard | `labs-leaderboard` |
| Labs | https://labs.scale.com/ | `labs` |
| Research Blog | https://labs.scale.com/blog | `labs-blog` |
| Research Careers | https://labs.scale.com/jobs | `labs-jobs` |

## Resources
| Item | Source | Slug |
|---|---|---|
| About | https://scale.com/about | `about` |
| Security | https://scale.com/security | `security` |
| Guides | https://scale.com/guides | `guides` |
| Careers | https://scale.com/careers | `careers` |
| Contact us | https://scale.com/demo | `demo` |
| Blog | https://scale.com/blog | `blog` |
| Events | https://scale.com/events | `events` |
| Documentation | https://scale.com/docs | `docs` |
| Partnerships | https://scale.com/partnership | `partnership` |

## Not cloned
- **Log in** (`dashboard.scale.com/login`): the product app, not a marketing page.
- **Get Started** (`/demo`): same page as Contact us.
- Two promo cards in the Resources panel: an eBook landing on `go.scale.com` (a marketing-automation form) and one blog post (`/blog/arabic-first-ai`). The blog index clone covers the post template.
