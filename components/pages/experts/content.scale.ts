// Scale's strings, from the RSC payload of https://scale.com/experts and module 558779.
import type { ExpertsContent } from './types'

export const content: ExpertsContent = {
  "meta": {
    "title": "Expert AI Training Data | Scale AI",
    "description": "Train frontier AI with Scale's network of verified PhDs, MDs, engineers, and domain experts. Bring research-grade expertise to your hardest problems."
  },
  "hero": {
    "headline": "The human experts behind frontier AI.",
    "body": "Millions of experts deployed against the world's hardest training problems.",
    "cta": {
      "text": "Work With Us",
      "url": "/demo"
    },
    "backdrop": {
      "tailwindClass": "white",
      "contrastColor": "#010101"
    },
    "video": {
      "url": "/experts/hero.mp4"
    },
    "poster": "/experts/hero-poster.webp"
  },
  "cardGrid": {
    "heading": "World class experts from top institutions",
    "cards": [
      {
        "key": "academic",
        "title": "Elite academic backgrounds",
        "description": "Alumni of every Ivy League school, plus Stanford, MIT, and beyond",
        "hoveredColor": "foundry-tan"
      },
      {
        "key": "industry",
        "title": "Deep, top-tier industry experience",
        "description": "Representation from employees of 60%+ of the Fortune 500",
        "hoveredColor": "archive-purple"
      },
      {
        "key": "worldwide",
        "title": "Worldwide representation",
        "description": "65+ languages. 117 countries.",
        "hoveredColor": "scale-gray-60"
      },
      {
        "key": "domain",
        "title": "Specialized domain expertise",
        "description": "Expertise across 370+ unique fields",
        "hoveredColor": "cloud-slate"
      }
    ]
  },
  "domains": {
    "headline": "The best minds in",
    "labels": {
      "who": "Who they are",
      "expertise": "Expertise",
      "projectType": "Project Type",
      "publications": "Peer Reviewed Publications"
    },
    "items": [
      {
        "label": "Finance",
        "key": "finance",
        "whoTheyAre": "Investment bankers, sell-side analysts, portfolio managers, quant researchers, risk & compliance officers, buy-side private equity analysts",
        "skills": "Financial statement analysis, earnings modeling, valuation methodology, trading logic",
        "projectType": "Financial reasoning evaluation, content understanding, prompt generation, and model preference ranking",
        "logos": [
          {
            "src": "/experts/logos/finance/goldman-sachs.webp",
            "alt": "Goldman Sachs",
            "width": 70,
            "height": 29
          },
          {
            "src": "/experts/logos/finance/jp-morgan.webp",
            "alt": "JP Morgan",
            "width": 110,
            "height": 22
          },
          {
            "src": "/experts/logos/software/citadel.png",
            "alt": "Citadel",
            "width": 100,
            "height": 12
          },
          {
            "src": "/experts/logos/software/jane-street.png",
            "alt": "Jane Street",
            "width": 110,
            "height": 29
          },
          {
            "src": "/experts/logos/finance/morgan-stanley.png",
            "alt": "Morgan Stanley",
            "width": 120,
            "height": 17
          },
          {
            "src": "/experts/logos/finance/kkr.png",
            "alt": "KKR",
            "width": 44,
            "height": 44
          },
          {
            "src": "/experts/logos/software/two-sigma.png",
            "alt": "Two Sigma",
            "width": 110,
            "height": 21
          },
          {
            "src": "/experts/logos/finance/citi.webp",
            "alt": "Citi",
            "width": 60,
            "height": 38
          },
          {
            "src": "/experts/logos/finance/boa.png",
            "alt": "Bank of America",
            "width": 110,
            "height": 11
          },
          {
            "src": "/experts/logos/finance/barclays.png",
            "alt": "Barclays",
            "width": 110,
            "height": 19
          },
          {
            "src": "/experts/logos/finance/blackstone.png",
            "alt": "Blackstone",
            "width": 110,
            "height": 43
          },
          {
            "src": "/experts/logos/finance/tpg.png",
            "alt": "TPG",
            "width": 60,
            "height": 25
          },
          {
            "src": "/experts/logos/finance/brookfield.png",
            "alt": "Brookfield",
            "width": 110,
            "height": 16
          },
          {
            "src": "/experts/logos/finance/silverlake.png",
            "alt": "Silver Lake",
            "width": 110,
            "height": 21
          },
          {
            "src": "/experts/logos/finance/carlyle.png",
            "alt": "Carlyle",
            "width": 110,
            "height": 14
          },
          {
            "src": "/experts/logos/finance/apollo.png",
            "alt": "Apollo",
            "width": 100,
            "height": 15
          },
          {
            "src": "/experts/logos/finance/vista.png",
            "alt": "Vista Equity",
            "width": 100,
            "height": 21
          },
          {
            "src": "/experts/logos/finance/ares.png",
            "alt": "Ares",
            "width": 80,
            "height": 25
          }
        ],
        "color": "#193A29"
      },
      {
        "label": "Law & Policy",
        "key": "law & policy",
        "whoTheyAre": "Verified big law partners & practicing attorneys, public policy specialists, regulatory & compliance professionals, M&A corporate counsel, federal litigators, state prosecutors, defense lawyers, appellate attorneys",
        "skills": "Contract review & clause-level annotation, Regulatory interpretation, Legislative drafting & policy analysis, Case law reasoning & legal citation verification",
        "projectType": "Legal reasoning evaluation, content understanding, prompt generation, and model preference ranking",
        "logos": [
          {
            "src": "/experts/logos/law-policy/white-house.png",
            "alt": "White House",
            "width": 55,
            "height": 56
          },
          {
            "src": "/experts/logos/law-policy/un.svg",
            "alt": "United Nations",
            "width": 36,
            "height": 36
          },
          {
            "src": "/experts/logos/law-policy/pentagon.svg",
            "alt": "Pentagon",
            "width": 120,
            "height": 22
          },
          {
            "src": "/experts/logos/law-policy/latham-watkins.svg",
            "alt": "Latham & Watkins",
            "width": 140,
            "height": 22
          },
          {
            "src": "/experts/logos/law-policy/sullivan-cromwell.svg",
            "alt": "Sullivan & Cromwell",
            "width": 150,
            "height": 9
          },
          {
            "src": "/experts/logos/law-policy/linklaters.svg",
            "alt": "Linklaters",
            "width": 140,
            "height": 24
          },
          {
            "src": "/experts/logos/law-policy/skadden.png",
            "alt": "Skadden",
            "width": 100,
            "height": 22
          },
          {
            "src": "/experts/logos/law-policy/clifford-chance.svg",
            "alt": "Clifford Chance",
            "width": 140,
            "height": 22
          },
          {
            "src": "/experts/logos/law-policy/freshfields.svg",
            "alt": "Freshfields",
            "width": 150,
            "height": 14
          },
          {
            "src": "/experts/logos/law-policy/cravath.webp",
            "alt": "Cravath",
            "width": 140,
            "height": 20
          },
          {
            "src": "/experts/logos/law-policy/kirkland-ellis.svg",
            "alt": "Kirkland & Ellis",
            "width": 110,
            "height": 13
          },
          {
            "src": "/experts/logos/law-policy/gibson-dunn.svg",
            "alt": "Gibson Dunn",
            "width": 130,
            "height": 22
          },
          {
            "src": "/experts/logos/law-policy/cia.webp",
            "alt": "CIA",
            "width": 44,
            "height": 44
          },
          {
            "src": "/experts/logos/law-policy/nsa.svg",
            "alt": "NSA",
            "width": 56,
            "height": 22
          },
          {
            "src": "/experts/logos/law-policy/darpa.webp",
            "alt": "DARPA",
            "width": 70,
            "height": 40
          },
          {
            "src": "/experts/logos/law-policy/us-courts.svg",
            "alt": "U.S. Courts",
            "width": 120,
            "height": 22
          },
          {
            "src": "/experts/logos/law-policy/brookings.svg",
            "alt": "Brookings",
            "width": 130,
            "height": 17
          },
          {
            "src": "/experts/logos/law-policy/rand.png",
            "alt": "RAND",
            "width": 100,
            "height": 20
          },
          {
            "src": "/experts/logos/law-policy/doj.png",
            "alt": "DOJ",
            "width": 110,
            "height": 42
          },
          {
            "src": "/experts/logos/law-policy/sec.svg",
            "alt": "SEC",
            "width": 56,
            "height": 22
          }
        ],
        "color": "#273252"
      },
      {
        "label": "Healthcare",
        "key": "healthcare",
        "whoTheyAre": "Attending physicians, board-certified specialists, postdoctoral researchers, registered nurses, computational biologists — including oncologists, cardiologists, radiologists, dermatologists, and neurologists",
        "skills": "Diagnostic reasoning, medical imaging annotation, trial data review",
        "projectType": "Clinical reasoning evaluation, content understanding, prompt generation, and model preference ranking",
        "logos": [
          {
            "src": "/experts/logos/healthcare/who.png",
            "alt": "WHO",
            "width": 170,
            "height": 52
          },
          {
            "src": "/experts/logos/healthcare/mount-sinai.webp",
            "alt": "Mount Sinai",
            "width": 190,
            "height": 56
          },
          {
            "src": "/experts/logos/healthcare/mass-general.png",
            "alt": "Mass General",
            "width": 180,
            "height": 26
          },
          {
            "src": "/experts/logos/healthcare/mayo-clinic.webp",
            "alt": "Mayo Clinic",
            "width": 36,
            "height": 36
          },
          {
            "src": "/experts/logos/healthcare/johns-hopkins.svg",
            "alt": "Johns Hopkins",
            "width": 120,
            "height": 25
          },
          {
            "src": "/experts/logos/healthcare/cleveland-clinic.png",
            "alt": "Cleveland Clinic",
            "width": 120,
            "height": 19
          },
          {
            "src": "/experts/logos/healthcare/ucsf.png",
            "alt": "UCSF",
            "width": 90,
            "height": 44
          },
          {
            "src": "/experts/logos/healthcare/stanford-medicine.webp",
            "alt": "Stanford Medicine",
            "width": 110,
            "height": 36
          },
          {
            "src": "/experts/logos/healthcare/nyu-langone.png",
            "alt": "NYU Langone",
            "width": 80,
            "height": 34
          },
          {
            "src": "/experts/logos/healthcare/nih.png",
            "alt": "NIH",
            "width": 170,
            "height": 26
          },
          {
            "src": "/experts/logos/healthcare/cdc.webp",
            "alt": "CDC",
            "width": 140,
            "height": 33
          }
        ],
        "color": "#1A4A5A"
      },
      {
        "label": "Software Engineering",
        "key": "software engineering",
        "whoTheyAre": "Engineers specializing in backend, system & infrastructure, frontend, data, distributed systems, performance, hardware architecture, cryptography, network and protocols",
        "skills": "Code generation and correctness evaluation, security vulnerability identification, system architecture review, debugging",
        "projectType": "Code generation and review, reinforcement learning with verifiable rewards, tool use evaluation, and model preference ranking",
        "logos": [
          {
            "src": "/experts/logos/software/jane-street.png",
            "alt": "Jane Street",
            "width": 110,
            "height": 29
          },
          {
            "src": "/experts/logos/software/two-sigma.png",
            "alt": "Two Sigma",
            "width": 110,
            "height": 21
          },
          {
            "src": "/experts/logos/software/citadel.png",
            "alt": "Citadel",
            "width": 100,
            "height": 12
          },
          {
            "src": "/experts/logos/software/spacex.png",
            "alt": "SpaceX",
            "width": 110,
            "height": 14
          },
          {
            "src": "/experts/logos/software/waymo.webp",
            "alt": "Waymo",
            "width": 90,
            "height": 82
          },
          {
            "src": "/experts/logos/software/stripe.png",
            "alt": "Stripe",
            "width": 65,
            "height": 31
          },
          {
            "src": "/experts/logos/software/palantir.webp",
            "alt": "Palantir",
            "width": 110,
            "height": 27
          },
          {
            "src": "/experts/logos/software/anduril.png",
            "alt": "Anduril",
            "width": 110,
            "height": 25
          },
          {
            "src": "/experts/logos/software/hugging-face.png",
            "alt": "Hugging Face",
            "width": 44,
            "height": 44
          }
        ],
        "color": "#839CB2"
      },
      {
        "label": "Other Engineering",
        "key": "other engineering",
        "whoTheyAre": "Mechanical and chemical engineers with hands-on domain expertise across industrial systems, materials science, and process engineering",
        "skills": "Technical analysis, system design, quality assurance, CAD review",
        "projectType": "Technical task completion, chain-of-thought reasoning, tool use, and model preference ranking",
        "logos": [
          {
            "src": "/experts/logos/other-engineering/ge.svg",
            "alt": "GE",
            "width": 44,
            "height": 44
          },
          {
            "src": "/experts/logos/other-engineering/siemens.svg",
            "alt": "Siemens",
            "width": 110,
            "height": 18
          },
          {
            "src": "/experts/logos/other-engineering/honeywell.svg",
            "alt": "Honeywell",
            "width": 110,
            "height": 20
          },
          {
            "src": "/experts/logos/other-engineering/bosch.svg",
            "alt": "Bosch",
            "width": 110,
            "height": 25
          },
          {
            "src": "/experts/logos/other-engineering/shell.svg",
            "alt": "Shell",
            "width": 48,
            "height": 44
          },
          {
            "src": "/experts/logos/other-engineering/bp.webp",
            "alt": "BP",
            "width": 44,
            "height": 44
          },
          {
            "src": "/experts/logos/other-engineering/dow.webp",
            "alt": "Dow",
            "width": 100,
            "height": 33
          },
          {
            "src": "/experts/logos/other-engineering/3m.svg",
            "alt": "3M",
            "width": 80,
            "height": 42
          },
          {
            "src": "/experts/logos/other-engineering/abb.svg",
            "alt": "ABB",
            "width": 90,
            "height": 36
          },
          {
            "src": "/experts/logos/other-engineering/exxon.svg",
            "alt": "ExxonMobil",
            "width": 110,
            "height": 21
          }
        ],
        "color": "#A8927C"
      },
      {
        "label": "Research & Academia",
        "key": "research & academia",
        "whoTheyAre": "Postdoctoral researchers, research scientists, tenure-track faculty, and verified h-index contributors — published in Nature, Science, or Cell",
        "skills": "Published in Nature, Science, or Cell — plus recipients of Rhodes, Fulbright, and NSF fellowships",
        "projectType": "Research reasoning tasks, content understanding, tool use, and model preference ranking",
        "peerReviewedPublications": "Verified peer reviewed publications in top-tier journals including Nature, Science, and Cell",
        "logos": [
          {
            "src": "/experts/logos/universities/harvard.svg",
            "alt": "Harvard",
            "width": 110,
            "height": 36
          },
          {
            "src": "/experts/logos/universities/stanford.svg",
            "alt": "Stanford",
            "width": 110,
            "height": 30
          },
          {
            "src": "/experts/logos/universities/caltech.svg",
            "alt": "Caltech",
            "width": 110,
            "height": 30
          },
          {
            "src": "/experts/logos/universities/cambridge.svg",
            "alt": "Cambridge",
            "width": 110,
            "height": 36
          },
          {
            "src": "/experts/logos/research/fulbright.png",
            "alt": "Fulbright",
            "width": 110,
            "height": 21
          },
          {
            "src": "/experts/logos/universities/mit.svg",
            "alt": "MIT",
            "width": 80,
            "height": 32
          },
          {
            "src": "/experts/logos/universities/princeton.svg",
            "alt": "Princeton",
            "width": 110,
            "height": 32
          },
          {
            "src": "/experts/logos/universities/yale.svg",
            "alt": "Yale",
            "width": 80,
            "height": 40
          },
          {
            "src": "/experts/logos/universities/uchicago.svg",
            "alt": "UChicago",
            "width": 110,
            "height": 32
          },
          {
            "src": "/experts/logos/universities/upenn.svg",
            "alt": "UPenn",
            "width": 110,
            "height": 28
          },
          {
            "src": "/experts/logos/universities/imperial.svg",
            "alt": "Imperial",
            "width": 110,
            "height": 28
          },
          {
            "src": "/experts/logos/universities/ucl.png",
            "alt": "UCL",
            "width": 80,
            "height": 36
          },
          {
            "src": "/experts/logos/research/nature.png",
            "alt": "Nature",
            "width": 100,
            "height": 24
          },
          {
            "src": "/experts/logos/research/science.svg",
            "alt": "Science",
            "width": 100,
            "height": 28
          },
          {
            "src": "/experts/logos/research/cell.png",
            "alt": "Cell",
            "width": 100,
            "height": 18
          },
          {
            "src": "/experts/logos/research/rhodes.webp",
            "alt": "Rhodes Trust",
            "width": 36,
            "height": 36
          },
          {
            "src": "/experts/logos/research/nsf.webp",
            "alt": "NSF",
            "width": 60,
            "height": 8
          },
          {
            "src": "/experts/logos/healthcare/nih.png",
            "alt": "NIH",
            "width": 170,
            "height": 26
          }
        ],
        "color": "#79648C"
      },
      {
        "label": "Professional Services",
        "key": "professional services",
        "whoTheyAre": "Management consultants, strategy advisors, Big 4 auditors & accountants, actuaries, tax specialists, operations professionals",
        "skills": "Business process analysis, financial controls & audit, strategy frameworks, organizational design",
        "projectType": "Business reasoning evaluation, document comprehension & summarization, structured decision-making annotation",
        "logos": [
          {
            "src": "/experts/logos/professional-services/mckinsey.svg",
            "alt": "McKinsey",
            "width": 110,
            "height": 22
          },
          {
            "src": "/experts/logos/professional-services/deloitte.svg",
            "alt": "Deloitte",
            "width": 118,
            "height": 22
          },
          {
            "src": "/experts/logos/professional-services/pwc.svg",
            "alt": "PwC",
            "width": 72,
            "height": 22
          },
          {
            "src": "/experts/logos/professional-services/kpmg.svg",
            "alt": "KPMG",
            "width": 55,
            "height": 22
          },
          {
            "src": "/experts/logos/professional-services/ey.svg",
            "alt": "EY",
            "width": 22,
            "height": 22
          },
          {
            "src": "/experts/logos/professional-services/accenture.svg",
            "alt": "Accenture",
            "width": 120,
            "height": 22
          },
          {
            "src": "/experts/logos/professional-services/oliver-wyman.svg",
            "alt": "Oliver Wyman",
            "width": 120,
            "height": 22
          },
          {
            "src": "/experts/logos/professional-services/booz-allen.svg",
            "alt": "Booz Allen",
            "width": 110,
            "height": 22
          },
          {
            "src": "/experts/logos/professional-services/roland-berger.svg",
            "alt": "Roland Berger",
            "width": 130,
            "height": 22
          },
          {
            "src": "/experts/logos/professional-services/kearney.svg",
            "alt": "A.T. Kearney",
            "width": 110,
            "height": 22
          }
        ],
        "color": "#3D5566"
      }
    ]
  },
  "testimonials": {
    "heading": "Expert voices",
    "backdrop": {
      "tailwindClass": "white",
      "contrastColor": "#010101"
    },
    "colorTheme": {
      "tailwindClass": "evergreen",
      "hex": "#193A29",
      "contrastColor": "#ffffff"
    },
    "items": [
      {
        "_key": "amer-iqbal",
        "clientName": "Amer Iqbal",
        "title": "MIT, Goldman Sachs",
        "testimonial": "I've asked the frontier models a lot of questions related to the Gopakumar-Vafa invariants for a specific geometry, and I've always used my favorite technique in order to solve it: the \"topological vertex\" method. Now, it often defaults to that technique. So I think somewhere in there, my contributions to the training might be having a visible impact.",
        "logo": "/experts/logos/finance/goldman-sachs.webp"
      },
      {
        "_key": "vivian-wei",
        "clientName": "Vivian Wei",
        "title": "Harvard, Bank of America",
        "testimonial": "At Bank of America, I analyzed regulatory capital data across eight lines of business. It led me to develop a strong intuition that I now use to stump the model: I know precisely where humans make the most mistakes in financial modeling, and I can transfer that knowledge into an agent environment.",
        "logo": "/experts/logos/finance/boa.png"
      }
    ]
  },
  "resources": {
    "heading": "Resources",
    "posts": [
      {
        "_key": "leaderboard",
        "title": "Scale Labs: AI Model Leaderboards & Benchmarks",
        "category": "Leaderboard",
        "image": "/experts/resources-leaderboard.webp",
        "url": "https://labs.scale.com/leaderboard"
      },
      {
        "_key": "hfc",
        "title": "Human Frontier Collective: Lead the Future of Intelligence, Together",
        "category": "Fellowship",
        "image": "/experts/resources-hfc.webp",
        "url": "https://hfc.scale.com/"
      },
      {
        "_key": "outlier",
        "title": "Outlier: Become the Expert That AI Learns From",
        "category": "Platform",
        "image": "/experts/resources-outlier.webp",
        "url": "https://outlier.ai/"
      },
      {
        "_key": "rlenvironments",
        "title": "Reinforcement Learning Environments for AI Agents",
        "category": "Product",
        "image": "/experts/resources-rlenvironments.webp",
        "url": "/rlenvironments"
      },
      {
        "_key": "genai-data-engine",
        "title": "Generative AI Data Engine",
        "category": "Product",
        "image": "/experts/resources-genai-data-engine.webp",
        "url": "/generative-ai-data-engine"
      }
    ]
  },
  "prefooter": {
    "headline": "Start with the Right Experts.",
    "body": "Scale's team will match your project to the verified domain experts, fast.",
    "cta": {
      "text": "Work With Us",
      "url": "/demo"
    },
    "backdrop": {
      "tailwindClass": "white",
      "contrastColor": "#ffffff"
    },
    "image": "/experts/prefooter.webp"
  }
}
