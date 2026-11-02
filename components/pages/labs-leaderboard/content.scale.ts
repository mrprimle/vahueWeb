// Scale's strings and data from labs.scale.com/leaderboard (flight payload of the page, module 218341), snapshot 2026-11-02. Top three rows per board, the only ones the cards show.
// Hrefs keep Scale's slugs under /labs/leaderboard. Colours resolved with module 371198 and checked against the 60 bars in the server HTML.
import type { LeaderboardContent } from './types'

export const content: LeaderboardContent = {
  "meta": {
    "title": "AI Model Leaderboards & Benchmarks | Scale Labs",
    "description": "Explore leaderboards with expert-driven LLM benchmarks and updated AI model rankings across coding, reasoning and more.",
    "keywords": "LLM leaderboards, expert-driven, private, regularly updated, LLM rankings, LLM evaluations, coding, instruction following",
    "siteName": "Scale Labs Leaderboards"
  },
  "baseHref": "/labs/leaderboard",
  "hero": {
    "heading": "[LEADERBOARDS]",
    "title": "testing the limits of AI.",
    "body": "Benchmarks for frontier, agentic, and safety capabilities",
    "cta": "Start Exploring",
    "stats": [
      {
        "label": "Benchmarks",
        "value": "20+",
        "body": "Including benchmarks on agentic coding, frontier reasoning, and safety alignment."
      },
      {
        "label": "Models evaluated",
        "value": "100+",
        "body": "From leading AI labs including OpenAI, Anthropic, Google, Meta, and open-source contributors."
      }
    ]
  },
  "tabs": {
    "all": "All",
    "agentic": "Agentic",
    "safety": "Safety",
    "frontier": "Frontier"
  },
  "card": {
    "viewFull": "View Full Ranking",
    "arrow": "→",
    "newBadge": "NEW",
    "score": "Score:",
    "range": "Range:",
    "to": "to",
    "deprecated": "Deprecated"
  },
  "features": [
    {
      "title": "Frontier AI Model Evaluations & Benchmarks",
      "body": "We conduct high-complexity evaluations to expose model failures, prevent benchmark saturation, and push model capabilities--while continuously evaluating the latest frontier models."
    },
    {
      "title": "Scaling with Human Expertise",
      "body": "Humans design complex evaluations and define precise criteria to assess models, while LLMs scale evaluations--ensuring efficiency and alignment with human judgment."
    },
    {
      "title": "Robust Datasets for Reliable AI Benchmarks",
      "body": "Our leaderboards are built on carefully curated evaluation sets, combining private datasets to prevent overfitting and open-source datasets for broad benchmarking and comparability."
    }
  ],
  "deprecated": {
    "label": "Show Deprecated Leaderboards",
    "infoLabel": "Information about deprecated leaderboards",
    "info": "As models advance, benchmarks must evolve. We're retiring the saturated legacy leaderboards and introducing new benchmarks targeting complex reasoning, robustness, and emerging AI capabilities."
  },
  "evaluate": {
    "heading": "[EVALUATE YOUR MODEL]",
    "bodyBefore": "If you'd like to add your model to this leaderboard or a future version, please contact",
    "email": "leaderboards@scale.com",
    "bodyAfter": ". To ensure leaderboard integrity, we require that models can only be featured the FIRST TIME when an organization encounters the prompts.",
    "cta": "Evaluate your Model",
    "form": {
      "title": "Evaluate your Model",
      "firstName": "First name*",
      "lastName": "Last name*",
      "company": "Company name*",
      "jobTitle": "Job title*",
      "message": "Please provide details on your project.*",
      "legalBefore": "By submitting this form, your information will be processed in accordance with our",
      "legalLink": {
        "label": "Privacy Policy",
        "href": "/legal/privacy"
      },
      "legalAfter": "."
    }
  },
  "items": [
    {
      "key": "hss",
      "href": "/labs/leaderboard/hss",
      "name": "Humanity's Sixth Sense",
      "description": "HSS, in partnership with Elorian, is a benchmark for intuitive visual reasoning across diverse image and video inputs.",
      "category": "frontier",
      "deprecated": false,
      "scores": [
        {
          "model": "Gemini-4-Argon (high)",
          "rank": 1,
          "score": 55.4,
          "ci": 4.2,
          "isNew": true,
          "deprecated": false,
          "maxScore": 61.388000000000005,
          "color": "#598DD2"
        },
        {
          "model": "GPT-6-Astra (max)",
          "rank": 2,
          "score": 53.6,
          "ci": 4.1,
          "isNew": true,
          "deprecated": false,
          "maxScore": 61.388000000000005,
          "color": "#65C2B9"
        },
        {
          "model": "GPT-6.1-Sol (max)",
          "rank": 3,
          "score": 46.6,
          "ci": 3.8,
          "isNew": true,
          "deprecated": false,
          "maxScore": 61.388000000000005,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "distressbench",
      "href": "/labs/leaderboard/distressbench",
      "name": "DistressBench",
      "description": "We introduce DistressBench, designed to measure the quality of crisis support a model delivers.",
      "category": "safety",
      "deprecated": false,
      "scores": [
        {
          "model": "muse-spark-1.2",
          "rank": 1,
          "score": 88.39,
          "ci": 0.93,
          "isNew": false,
          "deprecated": false,
          "maxScore": 91.99960000000002,
          "color": "#6FCBEF"
        },
        {
          "model": "muse-spark-open",
          "rank": 2,
          "score": 87.74,
          "ci": 1.03,
          "isNew": true,
          "deprecated": false,
          "maxScore": 91.99960000000002,
          "color": "#6FCBEF"
        },
        {
          "model": "muse-wonder-1.0",
          "rank": 3,
          "score": 85.89,
          "ci": 1.05,
          "isNew": true,
          "deprecated": false,
          "maxScore": 91.99960000000002,
          "color": "#6FCBEF"
        }
      ]
    },
    {
      "key": "hle-diamond",
      "href": "/labs/leaderboard/hle-diamond",
      "name": "Humanity's Last Exam (Diamond)",
      "description": "Challenging LLMs at the frontier of human knowledge",
      "category": "frontier",
      "deprecated": false,
      "scores": [
        {
          "model": "gpt-6-astra",
          "rank": 1,
          "score": 60.6,
          "ci": 3,
          "message": "Potential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 65.50800000000001,
          "color": "#65C2B9"
        },
        {
          "model": "claude-opus-5-5",
          "rank": 2,
          "score": 55,
          "ci": 3.1,
          "message": "Potential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 65.50800000000001,
          "color": "#E27553"
        },
        {
          "model": "gemini-4-argon",
          "rank": 3,
          "score": 53.2,
          "ci": 3.07,
          "isNew": true,
          "deprecated": false,
          "maxScore": 65.50800000000001,
          "color": "#598DD2"
        }
      ]
    },
    {
      "key": "drugdiscoverybench",
      "href": "/labs/leaderboard/drugdiscoverybench",
      "name": "DrugDiscoveryBench",
      "description": "DrugDiscoveryBench: 82 expert-curated tasks evaluating how reliably frontier coding agents perform the computational work of early-stage drug discovery.",
      "category": "agentic",
      "deprecated": false,
      "scores": [
        {
          "model": "GPT 6 Astra (mini-SWE-agent) max",
          "rank": 1,
          "score": 68.7,
          "ci": 2.5,
          "isNew": true,
          "deprecated": false,
          "maxScore": 73.336,
          "color": "#65C2B9"
        },
        {
          "model": "GPT 6 Astra (Codex) max",
          "rank": 2,
          "score": 65.4,
          "ci": 1.9,
          "isNew": true,
          "deprecated": false,
          "maxScore": 73.336,
          "color": "#65C2B9"
        },
        {
          "model": "Gemini 4 Argon (mini-swe-agent) high",
          "rank": 3,
          "score": 65.4,
          "ci": 2.9,
          "isNew": true,
          "deprecated": false,
          "maxScore": 73.336,
          "color": "#598DD2"
        }
      ]
    },
    {
      "key": "sweatlas-refactoring",
      "href": "/labs/leaderboard/sweatlas-refactoring",
      "name": "SWE Atlas - Refactoring",
      "description": "Evaluating an agent's ability to restructure code while preserving behavior.",
      "category": "agentic",
      "deprecated": false,
      "scores": [
        {
          "model": "GPT 6 Astra (Codex) xHigh",
          "rank": 1,
          "score": 59.05,
          "ci": 6.43,
          "isNew": true,
          "deprecated": false,
          "maxScore": 67.44439999999999,
          "color": "#65C2B9"
        },
        {
          "model": "Fable-5.1 (Claude Code) xHigh",
          "rank": 2,
          "score": 56.67,
          "ci": 6.52,
          "isNew": true,
          "deprecated": false,
          "maxScore": 67.44439999999999,
          "color": "#E27553"
        },
        {
          "model": "Fable-5 (Claude Code) xHigh",
          "rank": 3,
          "score": 54.76,
          "ci": 6.76,
          "isNew": false,
          "deprecated": false,
          "maxScore": 67.44439999999999,
          "color": "#E27553"
        }
      ]
    },
    {
      "key": "sweatlas-tw",
      "href": "/labs/leaderboard/sweatlas-tw",
      "name": "SWE Atlas - Test Writing",
      "description": "Evaluating an agent’s ability to write production-grade tests",
      "category": "agentic",
      "deprecated": false,
      "scores": [
        {
          "model": "Fable-5.1 (Claude Code) xHigh*",
          "rank": 1,
          "score": 67.04,
          "ci": 5.33,
          "isNew": true,
          "deprecated": false,
          "maxScore": 74.5411,
          "color": "#E27553"
        },
        {
          "model": "Opus 5 (Claude Code) xHigh",
          "rank": 2,
          "score": 62.22,
          "ci": 5.58,
          "isNew": false,
          "deprecated": false,
          "maxScore": 74.5411,
          "color": "#E27553"
        },
        {
          "model": "Fable-5 (Claude Code) xHigh*",
          "rank": 3,
          "score": 55.6,
          "ci": 5.8,
          "isNew": false,
          "deprecated": false,
          "maxScore": 74.5411,
          "color": "#E27553"
        }
      ]
    },
    {
      "key": "sweatlas-qna",
      "href": "/labs/leaderboard/sweatlas-qna",
      "name": "SWE Atlas - Codebase QnA",
      "description": "Evaluating deep code comprehension and reasoning",
      "category": "agentic",
      "deprecated": false,
      "scores": [
        {
          "model": "Opus 5 (Claude Code) xHigh\n",
          "rank": 1,
          "score": 63.17,
          "ci": 5.01,
          "isNew": false,
          "deprecated": false,
          "maxScore": 70.22540000000001,
          "color": "#E27553"
        },
        {
          "model": "Fable-5.1 (Claude Code) xHigh*",
          "rank": 2,
          "score": 59.95,
          "ci": 4.85,
          "isNew": true,
          "deprecated": false,
          "maxScore": 70.22540000000001,
          "color": "#E27553"
        },
        {
          "model": "GPT 6 Astra (Codex) xHigh*",
          "rank": 3,
          "score": 59.14,
          "ci": 4.88,
          "isNew": true,
          "deprecated": false,
          "maxScore": 70.22540000000001,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "hil",
      "href": "/labs/leaderboard/hil",
      "name": "HiL-Bench (Human-in-Loop Benchmark)",
      "description": "Evaluates whether agents recognize information gaps and ask targeted clarifying questions.",
      "category": "agentic",
      "deprecated": false,
      "scores": [
        {
          "model": "Muse Wonder 1.0",
          "rank": 1,
          "score": 79.67,
          "ci": 4.17,
          "isNew": true,
          "deprecated": false,
          "maxScore": 86.35520000000001,
          "color": "#6FCBEF"
        },
        {
          "model": "Muse Spark 1.3",
          "rank": 2,
          "score": 66.89,
          "ci": 5.12,
          "isNew": false,
          "deprecated": false,
          "maxScore": 86.35520000000001,
          "color": "#6FCBEF"
        },
        {
          "model": "GPT 6 Astra",
          "rank": 3,
          "score": 65.32,
          "ci": 5.19,
          "isNew": false,
          "deprecated": false,
          "maxScore": 86.35520000000001,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "mcp_atlas",
      "href": "/labs/leaderboard/mcp_atlas",
      "name": "MCP Atlas",
      "description": "Evaluating real-world tool use through the Model Context Protocol (MCP)",
      "category": "agentic",
      "deprecated": false,
      "scores": [
        {
          "model": "Muse Spark 1.1",
          "rank": 1,
          "score": 88.1,
          "ci": 1.95,
          "isNew": false,
          "deprecated": false,
          "maxScore": 92.7515,
          "color": "#6FCBEF"
        },
        {
          "model": "Fable 5.1",
          "rank": 2,
          "score": 87.2,
          "ci": 2.05,
          "isNew": true,
          "deprecated": false,
          "maxScore": 92.7515,
          "color": "#E27553"
        },
        {
          "model": "claude-opus-5 (xhigh)",
          "rank": 3,
          "score": 85.8,
          "ci": 2.1,
          "isNew": false,
          "deprecated": false,
          "maxScore": 92.7515,
          "color": "#E27553"
        }
      ]
    },
    {
      "key": "swe_bench_pro_public_v2-full",
      "href": "/labs/leaderboard/swe_bench_pro_public_v2?tab=full",
      "name": "SWE-Bench Pro V2 Full",
      "description": "Evaluating long-horizon software engineering tasks in public open source repositories",
      "category": "agentic",
      "deprecated": false,
      "scores": [
        {
          "model": "Opus 5 (Claude Code) xhigh",
          "rank": 1,
          "score": 99.4,
          "ci": 0.4,
          "isNew": false,
          "deprecated": false,
          "maxScore": 102.79400000000001,
          "color": "#E27553"
        },
        {
          "model": "Gemini 4 Argon (mini-swe-agent) high",
          "rank": 2,
          "score": 99.22,
          "ci": 0.45,
          "isNew": true,
          "deprecated": false,
          "maxScore": 102.79400000000001,
          "color": "#65C2B9"
        },
        {
          "model": "Fable 5.1 (Claude Code) high",
          "rank": 3,
          "score": 99.1,
          "ci": 0.5,
          "isNew": false,
          "deprecated": false,
          "maxScore": 102.79400000000001,
          "color": "#E27553"
        }
      ]
    },
    {
      "key": "swe_bench_pro_public_v2-hard",
      "href": "/labs/leaderboard/swe_bench_pro_public_v2?tab=hard",
      "name": "SWE-Bench Pro V2 HARD",
      "description": "Evaluating long-horizon software engineering tasks in public open source repositories",
      "category": "agentic",
      "deprecated": false,
      "scores": [
        {
          "model": "Opus 5 (Claude Code) xhigh",
          "rank": 1,
          "score": 98,
          "ci": 0,
          "isNew": false,
          "deprecated": false,
          "maxScore": 100.94,
          "color": "#E27553"
        },
        {
          "model": "Fable 5.1 (Claude Code) high",
          "rank": 2,
          "score": 92.2,
          "ci": 0,
          "isNew": false,
          "deprecated": false,
          "maxScore": 100.94,
          "color": "#E27553"
        },
        {
          "model": "Gemini 4 Argon (mini-swe-agent) high",
          "rank": 3,
          "score": 92.16,
          "ci": 0,
          "isNew": true,
          "deprecated": false,
          "maxScore": 100.94,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "swe_bench_pro-public",
      "href": "/labs/leaderboard/swe_bench_pro?tab=public",
      "name": "SWE-Bench Pro (Public Dataset)",
      "description": "Evaluating long-horizon software engineering tasks in public open source repositories",
      "category": "agentic",
      "deprecated": true,
      "scores": [
        {
          "model": "Muse Spark 1.1*",
          "rank": 1,
          "score": 61.5,
          "ci": 3.1,
          "isNew": true,
          "deprecated": false,
          "maxScore": 66.538,
          "color": "#6FCBEF"
        },
        {
          "model": "gpt-5.4 (xHigh)*",
          "rank": 2,
          "score": 59.1,
          "ci": 3.56,
          "isNew": false,
          "deprecated": false,
          "maxScore": 66.538,
          "color": "#65C2B9"
        },
        {
          "model": "Muse Spark*",
          "rank": 3,
          "score": 55,
          "ci": 3.6,
          "isNew": false,
          "deprecated": false,
          "maxScore": 66.538,
          "color": "#6FCBEF"
        }
      ]
    },
    {
      "key": "swe_bench_pro-private",
      "href": "/labs/leaderboard/swe_bench_pro?tab=private",
      "name": "SWE-Bench Pro (Private Dataset)",
      "description": "Evaluating long-horizon software engineering tasks in public open source repositories",
      "category": "agentic",
      "deprecated": true,
      "scores": [
        {
          "model": "Muse Spark 1.1*",
          "rank": 1,
          "score": 51.5,
          "ci": 5.5,
          "isNew": true,
          "deprecated": false,
          "maxScore": 58.71,
          "color": "#6FCBEF"
        },
        {
          "model": "claude-opus-4-6 (thinking)*",
          "rank": 2,
          "score": 47.1,
          "ci": 6.07,
          "isNew": false,
          "deprecated": false,
          "maxScore": 58.71,
          "color": "#E27553"
        },
        {
          "model": "Muse Spark*",
          "rank": 3,
          "score": 44.7,
          "ci": 6.05,
          "isNew": false,
          "deprecated": false,
          "maxScore": 58.71,
          "color": "#6FCBEF"
        }
      ]
    },
    {
      "key": "scipredict",
      "href": "/labs/leaderboard/scipredict",
      "name": "SciPredict",
      "description": "Forecasting scientific experiment outcomes",
      "category": "frontier",
      "deprecated": true,
      "scores": [
        {
          "model": "gemini-3-pro-preview",
          "rank": 1,
          "score": 25.27,
          "ci": 1.92,
          "isNew": false,
          "deprecated": false,
          "maxScore": 28.005699999999997,
          "color": "#598DD2"
        },
        {
          "model": "claude-opus-4-5-20251101",
          "rank": 2,
          "score": 23.05,
          "ci": 0.51,
          "isNew": false,
          "deprecated": false,
          "maxScore": 28.005699999999997,
          "color": "#E27553"
        },
        {
          "model": "claude-sonnet-4-5-20250929",
          "rank": 3,
          "score": 22.55,
          "ci": 0.75,
          "isNew": false,
          "deprecated": false,
          "maxScore": 28.005699999999997,
          "color": "#E27553"
        }
      ]
    },
    {
      "key": "humanitys_last_exam",
      "href": "/labs/leaderboard/humanitys_last_exam",
      "name": "Humanity's Last Exam",
      "description": "Challenging LLMs at the frontier of human knowledge",
      "category": "frontier",
      "deprecated": true,
      "scores": [
        {
          "model": "GPT 6 Astra",
          "rank": 1,
          "score": 54.8,
          "ci": 1.94,
          "message": "Potential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.",
          "isNew": true,
          "deprecated": false,
          "maxScore": 58.4422,
          "color": "#65C2B9"
        },
        {
          "model": "Fable 5.1 (xhigh)\n",
          "rank": 2,
          "score": 46.5,
          "ci": 2,
          "message": "Potential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.",
          "isNew": true,
          "deprecated": false,
          "maxScore": 58.4422,
          "color": "#E27553"
        },
        {
          "model": "gemini-3.1-pro-preview (thinking high)",
          "rank": 3,
          "score": 46.44,
          "ci": 1.96,
          "message": "Potential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 58.4422,
          "color": "#598DD2"
        }
      ]
    },
    {
      "key": "humanitys_last_exam_text_only",
      "href": "/labs/leaderboard/humanitys_last_exam_text_only",
      "name": "Humanity's Last Exam (Text Only)",
      "description": "Challenging LLMs at the frontier of human knowledge",
      "category": "frontier",
      "deprecated": true,
      "scores": [
        {
          "model": "GPT 6 Astra",
          "rank": 1,
          "score": 54.17,
          "ci": 2.09,
          "message": "Potential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.",
          "isNew": true,
          "deprecated": false,
          "maxScore": 57.94780000000001,
          "color": "#65C2B9"
        },
        {
          "model": "gemini-3.1-pro-preview (thinking high)",
          "rank": 2,
          "score": 47.31,
          "ci": 2.11,
          "message": "Potential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 57.94780000000001,
          "color": "#598DD2"
        },
        {
          "model": "Fable 5.1 (xhigh)",
          "rank": 3,
          "score": 46.8,
          "ci": 2.1,
          "message": "Potential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.",
          "isNew": true,
          "deprecated": false,
          "maxScore": 57.94780000000001,
          "color": "#E27553"
        }
      ]
    },
    {
      "key": "audiomc",
      "href": "/labs/leaderboard/audiomc",
      "name": "AudioMultiChallenge ",
      "description": "Evaluating spoken dialogue systems in multi-turn interaction",
      "category": "frontier",
      "deprecated": false,
      "scores": [
        {
          "model": "gemini-3.8-flash (high)",
          "rank": 1,
          "score": 60.4,
          "ci": 4.49,
          "isNew": false,
          "deprecated": false,
          "maxScore": 66.83670000000001,
          "color": "#598DD2"
        },
        {
          "model": "salesforce-launa-omni-1",
          "rank": 2,
          "score": 59.69,
          "ci": 4.13,
          "isNew": true,
          "deprecated": false,
          "maxScore": 66.83670000000001,
          "color": "#65C2B9"
        },
        {
          "model": "gemini-4-argon (high)",
          "rank": 3,
          "score": 58.41,
          "ci": 4.53,
          "isNew": true,
          "deprecated": false,
          "maxScore": 66.83670000000001,
          "color": "#598DD2"
        }
      ]
    },
    {
      "key": "audiomc-audio",
      "href": "/labs/leaderboard/audiomc-audio",
      "name": "AudioMultiChallenge  - Audio Output",
      "description": "Evaluating spoken dialogue systems in multi-turn interaction",
      "category": "frontier",
      "deprecated": false,
      "scores": [
        {
          "model": "gpt-realtime-2 (xHigh)",
          "rank": 1,
          "score": 48.45,
          "ci": 4.59,
          "isNew": false,
          "deprecated": false,
          "maxScore": 54.63120000000001,
          "color": "#65C2B9"
        },
        {
          "model": "tml-interaction-small",
          "rank": 2,
          "score": 43.36,
          "ci": 4.55,
          "isNew": false,
          "deprecated": false,
          "maxScore": 54.63120000000001,
          "color": "#9ACD32"
        },
        {
          "model": "gpt-realtime-2",
          "rank": 3,
          "score": 37.61,
          "ci": 4.45,
          "isNew": false,
          "deprecated": false,
          "maxScore": 54.63120000000001,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "audiomc-text",
      "href": "/labs/leaderboard/audiomc-text",
      "name": "AudioMultiChallenge - Text Output",
      "description": "Evaluating spoken dialogue systems in multi-turn interaction",
      "category": "frontier",
      "deprecated": false,
      "scores": [
        {
          "model": "gemini-3.8-flash (high)",
          "rank": 1,
          "score": 60.4,
          "ci": 4.49,
          "isNew": true,
          "deprecated": false,
          "maxScore": 66.83670000000001,
          "color": "#598DD2"
        },
        {
          "model": "salesforce-launa-omni-1",
          "rank": 2,
          "score": 59.69,
          "ci": 4.13,
          "isNew": true,
          "deprecated": false,
          "maxScore": 66.83670000000001,
          "color": "#65C2B9"
        },
        {
          "model": "gemini-4-argon (high)",
          "rank": 3,
          "score": 58.41,
          "ci": 4.53,
          "isNew": true,
          "deprecated": false,
          "maxScore": 66.83670000000001,
          "color": "#598DD2"
        }
      ]
    },
    {
      "key": "prbench-finance",
      "href": "/labs/leaderboard/prbench-finance",
      "name": "Professional Reasoning Benchmark - Finance",
      "description": "Evaluating Professional Reasoning in Finance",
      "category": "frontier",
      "deprecated": false,
      "scores": [
        {
          "model": "Muse Spark 1.3",
          "rank": 1,
          "score": 59.54,
          "ci": 1.66,
          "isNew": true,
          "deprecated": false,
          "maxScore": 63.035999999999994,
          "color": "#6FCBEF"
        },
        {
          "model": "Muse Wonder 1.0",
          "rank": 2,
          "score": 58.67,
          "ci": 1.69,
          "isNew": true,
          "deprecated": false,
          "maxScore": 63.035999999999994,
          "color": "#6FCBEF"
        },
        {
          "model": "Muse Spark 1.1\n",
          "rank": 3,
          "score": 55.01,
          "ci": 0.14,
          "isNew": false,
          "deprecated": false,
          "maxScore": 63.035999999999994,
          "color": "#6FCBEF"
        }
      ]
    },
    {
      "key": "prbench-legal",
      "href": "/labs/leaderboard/prbench-legal",
      "name": "Professional Reasoning Benchmark - Legal",
      "description": "Evaluating Professional Reasoning in Legal Practice",
      "category": "frontier",
      "deprecated": false,
      "scores": [
        {
          "model": "Muse Spark 1.3",
          "rank": 1,
          "score": 61.56,
          "ci": 1.72,
          "isNew": true,
          "deprecated": false,
          "maxScore": 65.1784,
          "color": "#6FCBEF"
        },
        {
          "model": "Muse Spark Open",
          "rank": 2,
          "score": 59.76,
          "ci": 0.88,
          "isNew": true,
          "deprecated": false,
          "maxScore": 65.1784,
          "color": "#6FCBEF"
        },
        {
          "model": "Muse Wonder 1.0",
          "rank": 3,
          "score": 58.4,
          "ci": 1.76,
          "isNew": true,
          "deprecated": false,
          "maxScore": 65.1784,
          "color": "#6FCBEF"
        }
      ]
    },
    {
      "key": "rli",
      "href": "/labs/leaderboard/rli",
      "name": "Remote Labor Index (RLI)",
      "description": "Evaluating AI agents ability to perform real-world, economically valuable remote work",
      "category": "agentic",
      "deprecated": false,
      "scores": [
        {
          "model": "Opus 5.5",
          "rank": 1,
          "score": 21.25,
          "ci": 0,
          "isNew": false,
          "deprecated": false,
          "maxScore": 21.8875,
          "color": "#E27553"
        },
        {
          "model": "GPT 6 Astra",
          "rank": 2,
          "score": 20.83,
          "ci": 0,
          "isNew": false,
          "deprecated": false,
          "maxScore": 21.8875,
          "color": "#65C2B9"
        },
        {
          "model": "Fable 5.1",
          "rank": 3,
          "score": 17.92,
          "ci": 0,
          "isNew": false,
          "deprecated": false,
          "maxScore": 21.8875,
          "color": "#E27553"
        }
      ]
    },
    {
      "key": "propensitybench",
      "href": "/labs/leaderboard/propensitybench",
      "name": "PropensityBench",
      "description": "Simulating real-world pressure to choose between safe or harmful behavior",
      "category": "safety",
      "deprecated": true,
      "scores": [
        {
          "model": "o3-2025-04-16",
          "rank": 1,
          "score": 10.5,
          "ci": 0.6,
          "isNew": false,
          "deprecated": false,
          "maxScore": 81.988,
          "color": "#65C2B9"
        },
        {
          "model": "claude-sonnet-4-20250514",
          "rank": 2,
          "score": 12.2,
          "ci": 0.2,
          "isNew": false,
          "deprecated": false,
          "maxScore": 81.988,
          "color": "#E27553"
        },
        {
          "model": "o4-mini-2025-04-16",
          "rank": 3,
          "score": 15.8,
          "ci": 0.4,
          "isNew": false,
          "deprecated": false,
          "maxScore": 81.988,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "vtb",
      "href": "/labs/leaderboard/vtb",
      "name": "VisualToolBench (VTB)",
      "description": "Evaluating how LLMs can dynamically interact with and reason about visual information",
      "category": "frontier",
      "deprecated": true,
      "scores": [
        {
          "model": "Muse Spark 1.1",
          "rank": 1,
          "score": 44.77,
          "ci": 2.82,
          "isNew": true,
          "deprecated": false,
          "maxScore": 49.017700000000005,
          "color": "#6FCBEF"
        },
        {
          "model": "gpt-5.4-2026-03-05 (reasoning effort = high)",
          "rank": 2,
          "score": 29.17,
          "ci": 0.13,
          "isNew": false,
          "deprecated": false,
          "maxScore": 49.017700000000005,
          "color": "#65C2B9"
        },
        {
          "model": "gemini-3.1-pro-preview",
          "rank": 3,
          "score": 28.97,
          "ci": 0.91,
          "isNew": false,
          "deprecated": false,
          "maxScore": 49.017700000000005,
          "color": "#598DD2"
        }
      ]
    },
    {
      "key": "multinrc",
      "href": "/labs/leaderboard/multinrc",
      "name": "MultiNRC",
      "description": "Multilingual Native Reasoning Evaluation Benchmark for LLMs",
      "category": "frontier",
      "deprecated": true,
      "scores": [
        {
          "model": "Muse Spark 1.1",
          "rank": 1,
          "score": 65.59,
          "ci": 2.87,
          "isNew": true,
          "deprecated": false,
          "maxScore": 70.5138,
          "color": "#6FCBEF"
        },
        {
          "model": "gpt-5-pro-2025-10-06",
          "rank": 2,
          "score": 65.2,
          "ci": 1.24,
          "message": "Potential contamination warning: This model was evaluated after the public release of MultiNRC, allowing model builder access to the prompts and solutions.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 70.5138,
          "color": "#65C2B9"
        },
        {
          "model": "gemini-3.1-pro-preview",
          "rank": 3,
          "score": 64.74,
          "ci": 2.88,
          "message": "Potential contamination warning: This model was evaluated after the public release of MultiNRC, allowing model builder access to the prompts and solutions.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 70.5138,
          "color": "#598DD2"
        }
      ]
    },
    {
      "key": "multichallenge-large",
      "href": "/labs/leaderboard/multichallenge?tab=large",
      "name": "MultiChallenge (Large Language Models)",
      "description": "Assessing models across diverse, interdisciplinary challenges",
      "category": "frontier",
      "deprecated": false,
      "scores": [
        {
          "model": "gpt 6.1 Sol",
          "rank": 1,
          "score": 81.95,
          "ci": 4.16,
          "isNew": true,
          "deprecated": false,
          "maxScore": 88.69330000000001,
          "color": "#65C2B9"
        },
        {
          "model": "Gemini 4 Argon",
          "rank": 2,
          "score": 78.7,
          "ci": 5.3,
          "isNew": true,
          "deprecated": false,
          "maxScore": 88.69330000000001,
          "color": "#598DD2"
        },
        {
          "model": "Muse Spark",
          "rank": 3,
          "score": 75.52,
          "ci": 4.05,
          "isNew": false,
          "deprecated": false,
          "maxScore": 88.69330000000001,
          "color": "#6FCBEF"
        }
      ]
    },
    {
      "key": "multichallenge-small",
      "href": "/labs/leaderboard/multichallenge?tab=small",
      "name": "MultiChallenge (Small Language Models)",
      "description": "Assessing models across diverse, interdisciplinary challenges",
      "category": "frontier",
      "deprecated": false,
      "scores": [
        {
          "model": "Nemotron 3.5 Bolt E4B (Thinking)",
          "rank": 1,
          "score": 56.03,
          "ci": 6.2,
          "isNew": true,
          "deprecated": false,
          "maxScore": 64.0969,
          "color": "#76B900"
        },
        {
          "model": "Gemma 4 E4B (Thinking)",
          "rank": 2,
          "score": 43.23,
          "ci": 6.13,
          "isNew": false,
          "deprecated": false,
          "maxScore": 64.0969,
          "color": "#598DD2"
        },
        {
          "model": "Nemotron 3 Nano 4B (Thinking)",
          "rank": 3,
          "score": 38.67,
          "ci": 6.27,
          "isNew": false,
          "deprecated": false,
          "maxScore": 64.0969,
          "color": "#76B900"
        }
      ]
    },
    {
      "key": "fortress",
      "href": "/labs/leaderboard/fortress",
      "name": "Fortress",
      "description": "Frontier Risk Evaluation for National Security and Public Safety",
      "category": "safety",
      "deprecated": false,
      "scores": [
        {
          "model": "claude-opus-5-5-max",
          "rank": 1,
          "score": 5.78,
          "ci": 1.26,
          "message": "ORS score: 28.78",
          "isNew": true,
          "deprecated": false,
          "maxScore": 79.4233,
          "color": "#E27553"
        },
        {
          "model": "gpt-oss-120b",
          "rank": 2,
          "score": 8.24,
          "ci": 1.93,
          "message": "ORS score: 18.00",
          "isNew": false,
          "deprecated": false,
          "maxScore": 79.4233,
          "color": "#65C2B9"
        },
        {
          "model": "Claude Haiku 5.5",
          "rank": 3,
          "score": 9.48,
          "ci": 1.34,
          "message": "ORS score: 9.00",
          "isNew": true,
          "deprecated": false,
          "maxScore": 79.4233,
          "color": "#E27553"
        }
      ]
    },
    {
      "key": "mask",
      "href": "/labs/leaderboard/mask",
      "name": "MASK",
      "description": "Evaluate model honesty when pressured to lie",
      "category": "safety",
      "deprecated": true,
      "scores": [
        {
          "model": "claude-opus-4-6 (Non-Thinking) ",
          "rank": 1,
          "score": 96.28,
          "ci": 0.41,
          "message": "Potential contamination warning: This model was evaluated after the public release of MASK, allowing model builder access to the prompts and solutions.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 100.54860000000001,
          "color": "#E27553"
        },
        {
          "model": "claude-sonnet-4-5-20250929-thinking",
          "rank": 2,
          "score": 96.13,
          "ci": 0.57,
          "message": "Potential contamination warning: This model was evaluated after the public release of MASK, allowing model builder access to the prompts and solutions.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 100.54860000000001,
          "color": "#E27553"
        },
        {
          "model": "Claude Sonnet 4 (Thinking)",
          "rank": 3,
          "score": 95.33,
          "ci": 2.29,
          "isNew": false,
          "deprecated": false,
          "maxScore": 100.54860000000001,
          "color": "#E27553"
        }
      ]
    },
    {
      "key": "enigma_eval",
      "href": "/labs/leaderboard/enigma_eval",
      "name": "EnigmaEval",
      "description": "Evaluating model performance on complex, multi-step reasoning tasks",
      "category": "frontier",
      "deprecated": true,
      "scores": [
        {
          "model": "claude-fable-5-high",
          "rank": 1,
          "score": 39.28,
          "ci": 2.8,
          "isNew": false,
          "deprecated": false,
          "maxScore": 43.3424,
          "color": "#E27553"
        },
        {
          "model": "gpt-5.6-sol-high",
          "rank": 2,
          "score": 37.12,
          "ci": 2.8,
          "isNew": false,
          "deprecated": false,
          "maxScore": 43.3424,
          "color": "#65C2B9"
        },
        {
          "model": "gemini-3.1-pro-preview-high",
          "rank": 3,
          "score": 36.78,
          "ci": 2.71,
          "isNew": false,
          "deprecated": false,
          "maxScore": 43.3424,
          "color": "#598DD2"
        }
      ]
    },
    {
      "key": "visual_language_understanding",
      "href": "/labs/leaderboard/visual_language_understanding",
      "name": "VISTA",
      "description": "Vision-Language Understanding benchmark for multimodal models",
      "category": "frontier",
      "deprecated": true,
      "scores": [
        {
          "model": "Gemini 2.5 Pro Experimental (March 2025)",
          "rank": 1,
          "score": 54.65,
          "ci": 1.46,
          "isNew": false,
          "deprecated": false,
          "maxScore": 57.7933,
          "color": "#598DD2"
        },
        {
          "model": "gemini-2.5-pro-preview-06-05",
          "rank": 2,
          "score": 54.63,
          "ci": 0.55,
          "isNew": false,
          "deprecated": false,
          "maxScore": 57.7933,
          "color": "#598DD2"
        },
        {
          "model": "gpt-5.4-pro-2026-03-05",
          "rank": 3,
          "score": 53.89,
          "ci": 2.02,
          "isNew": false,
          "deprecated": false,
          "maxScore": 57.7933,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "tutorbench",
      "href": "/labs/leaderboard/tutorbench",
      "name": "TutorBench",
      "description": "Evaluating model performance on common tutoring tasks for high school and AP-level subjects",
      "category": "frontier",
      "deprecated": true,
      "scores": [
        {
          "model": "Muse Spark",
          "rank": 1,
          "score": 68.55,
          "ci": 0.95,
          "isNew": false,
          "deprecated": false,
          "maxScore": 71.58500000000001,
          "color": "#6FCBEF"
        },
        {
          "model": "gpt-5.4-pro-2026-03-05",
          "rank": 2,
          "score": 56.6249,
          "ci": 1.02,
          "isNew": false,
          "deprecated": false,
          "maxScore": 71.58500000000001,
          "color": "#65C2B9"
        },
        {
          "model": "gemini-2.5-pro-preview-06-05",
          "rank": 3,
          "score": 55.65,
          "ci": 1.11,
          "isNew": false,
          "deprecated": false,
          "maxScore": 71.58500000000001,
          "color": "#598DD2"
        }
      ]
    },
    {
      "key": "adversarial_robustness",
      "href": "/labs/leaderboard/adversarial_robustness",
      "name": "Adversarial Robustness",
      "description": "Retired test for measuring models' resilience against adversarial inputs",
      "category": "",
      "deprecated": true,
      "scores": [
        {
          "model": "Gemini 1.5 Pro (May 2024)",
          "rank": 1,
          "score": 8,
          "ci": 8,
          "isNew": false,
          "deprecated": false,
          "maxScore": 86.52,
          "color": "#598DD2"
        },
        {
          "model": "Llama 3.1 405B Instruct",
          "rank": 2,
          "score": 10,
          "ci": 8,
          "isNew": false,
          "deprecated": false,
          "maxScore": 86.52,
          "color": "#6FCBEF"
        },
        {
          "model": "Claude 3 Opus",
          "rank": 3,
          "score": 13,
          "ci": 9,
          "isNew": false,
          "deprecated": false,
          "maxScore": 86.52,
          "color": "#E27553"
        }
      ]
    },
    {
      "key": "tool_use_chat",
      "href": "/labs/leaderboard/tool_use_chat",
      "name": "Agentic Tool Use (Chat)",
      "description": "Assessing chatbots' proficiency in leveraging external tools",
      "category": "",
      "deprecated": true,
      "scores": [
        {
          "model": "o3-mini (high)",
          "rank": 1,
          "score": 63.45,
          "ci": 5.52,
          "isNew": false,
          "deprecated": false,
          "maxScore": 71.2657,
          "color": "#65C2B9"
        },
        {
          "model": "Gemini 2.5 Pro Experimental (March 2025)",
          "rank": 2,
          "score": 62.43,
          "ci": 6.76,
          "message": "Potential contamination warning: Gemini 2.5 Pro Experimental (March 2025) was evaluated  after Gemini 1.5 Pro (May 2024), possibly allowing Google to access the prompt set from API logs.",
          "isNew": true,
          "deprecated": false,
          "maxScore": 71.2657,
          "color": "#598DD2"
        },
        {
          "model": "o3-mini (medium)",
          "rank": 3,
          "score": 62.42,
          "ci": 6.76,
          "isNew": false,
          "deprecated": false,
          "maxScore": 71.2657,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "tool_use_enterprise",
      "href": "/labs/leaderboard/tool_use_enterprise",
      "name": "Agentic Tool Use (Enterprise)",
      "description": "Evaluating AI agents' ability to use enterprise tools effectively",
      "category": "",
      "deprecated": true,
      "scores": [
        {
          "model": "o1 (December 2024)",
          "rank": 1,
          "score": 70.14,
          "ci": 5.32,
          "isNew": false,
          "deprecated": false,
          "maxScore": 77.72380000000001,
          "color": "#65C2B9"
        },
        {
          "model": "Gemini 2.5 Pro Experimental (March 2025)",
          "rank": 2,
          "score": 68.75,
          "ci": 5.35,
          "message": "Potential contamination warning: Gemini 2.5 Pro Experimental (March 2025) was evaluated  after Gemini 1.5 Pro (May 2024), possibly allowing Google to access the prompt set from API logs.",
          "isNew": true,
          "deprecated": false,
          "maxScore": 77.72380000000001,
          "color": "#598DD2"
        },
        {
          "model": "o1 Pro (March 2025)",
          "rank": 3,
          "score": 67.01,
          "ci": 5.43,
          "message": "o1 Pro (March 2025) - Potential contamination warning: o1 Pro was evaluated after gpt-4o possibly allowing OpenAI to access the prompt set from API logs. However, OpenAI’s policy states they don't train on these data.",
          "isNew": true,
          "deprecated": false,
          "maxScore": 77.72380000000001,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "humanitys_last_exam_preview",
      "href": "/labs/leaderboard/humanitys_last_exam_preview",
      "name": "Humanity's Last Exam (Preview)",
      "description": "Challenging LLMs at the frontier of human knowledge",
      "category": "frontier",
      "deprecated": true,
      "scores": [
        {
          "model": "Gemini 2.5 Pro Experimental (March 2025)",
          "rank": 1,
          "score": 18.81,
          "ci": 1.47,
          "message": "Potential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.\n\nSampled at temperature = 1.0, top_p = 0.95.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 20.888399999999997,
          "color": "#598DD2"
        },
        {
          "model": "o1 Pro (March 2025)*",
          "rank": 2,
          "score": 9.15,
          "ci": 1.09,
          "message": "o1-Pro: 7% (193 prompts) failed due to a post-training bug and were counted as failures. OpenAI has been informed and is working on a fix.\n---\nPotential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 20.888399999999997,
          "color": "#65C2B9"
        },
        {
          "model": "Claude 3.7 Sonnet (thinking)",
          "rank": 3,
          "score": 8.93,
          "ci": 1.08,
          "message": "Thinking budget: 16,000 tokens.\n\nPotential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 20.888399999999997,
          "color": "#E27553"
        }
      ]
    },
    {
      "key": "humanitys_last_exam_text_only_preview",
      "href": "/labs/leaderboard/humanitys_last_exam_text_only_preview",
      "name": "Humanity's Last Exam Text Only (Preview)",
      "description": "Models evaluated on text-only HLE questions",
      "category": "frontier",
      "deprecated": true,
      "scores": [
        {
          "model": "Gemini 2.5 Pro Experimental (March 2025)",
          "rank": 1,
          "score": 18.57,
          "ci": 1.57,
          "message": "Potential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.\n\nSampled at temperature = 1.0, top_p = 0.95.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 20.744200000000003,
          "color": "#598DD2"
        },
        {
          "model": "o3-mini (high)**",
          "rank": 2,
          "score": 13.97,
          "ci": 1.4,
          "message": "Potential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 20.744200000000003,
          "color": "#65C2B9"
        },
        {
          "model": "o3-mini (medium)**",
          "rank": 3,
          "score": 11.1,
          "ci": 1.26,
          "message": "Potential contamination warning: This model was evaluated after the public release of HLE, allowing model builder access to the prompts and solutions.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 20.744200000000003,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "instruction_following",
      "href": "/labs/leaderboard/instruction_following",
      "name": "Instruction Following",
      "description": "Former benchmark for assessing models' ability to follow complex instructions",
      "category": "",
      "deprecated": true,
      "scores": [
        {
          "model": "o1 (December 2024)",
          "rank": 1,
          "score": 91.96,
          "ci": 1.6,
          "isNew": false,
          "deprecated": false,
          "maxScore": 96.36679999999998,
          "color": "#65C2B9"
        },
        {
          "model": "DeepSeek R1",
          "rank": 2,
          "score": 87.75,
          "ci": 1.91,
          "isNew": false,
          "deprecated": false,
          "maxScore": 96.36679999999998,
          "color": "#E39CAB"
        },
        {
          "model": "o1-preview",
          "rank": 3,
          "score": 86.58,
          "ci": 1.58,
          "isNew": false,
          "deprecated": false,
          "maxScore": 96.36679999999998,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "arabic",
      "href": "/labs/leaderboard/arabic",
      "name": "Arabic",
      "description": "Assessing performance on Arabic language understanding and generation",
      "category": "",
      "deprecated": true,
      "flag": "SA",
      "scores": [
        {
          "model": "Gemini 1.5 Pro (August 27, 2024)",
          "rank": 1,
          "score": 1147,
          "ci": 33,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1215.4,
          "color": "#598DD2"
        },
        {
          "model": "Gemini 2.0 Pro (December 2024)",
          "rank": 2,
          "score": 1138,
          "ci": 29,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1215.4,
          "color": "#598DD2"
        },
        {
          "model": "o1 (December 2024)",
          "rank": 3,
          "score": 1120,
          "ci": 27,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1215.4,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "chinese",
      "href": "/labs/leaderboard/chinese",
      "name": "Chinese",
      "description": "Evaluating language models' proficiency in Chinese language tasks",
      "category": "",
      "deprecated": true,
      "flag": "CN",
      "scores": [
        {
          "model": "o1 (December 2024)",
          "rank": 1,
          "score": 1165,
          "ci": 30,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1230.8500000000001,
          "color": "#65C2B9"
        },
        {
          "model": "o3-mini",
          "rank": 2,
          "score": 1156,
          "ci": 32,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1230.8500000000001,
          "color": "#65C2B9"
        },
        {
          "model": "Gemini 1.5 Pro (August 27, 2024)",
          "rank": 3,
          "score": 1120,
          "ci": 35,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1230.8500000000001,
          "color": "#598DD2"
        }
      ]
    },
    {
      "key": "coding",
      "href": "/labs/leaderboard/coding",
      "name": "Coding",
      "description": "Assessing models' ability to understand and generate programming code",
      "category": "",
      "deprecated": true,
      "scores": [
        {
          "model": "o1-mini",
          "rank": 1,
          "score": 1237,
          "ci": 31,
          "message": "Potential contamination warning: o1-mini was evaluated approximately 4 months after GPT-4o (May 2024), possibly allowing OpenAI to access the prompt set from API logs. However, OpenAI's policy states they don't train on these data.",
          "isNew": false,
          "deprecated": false,
          "maxScore": 1306.04,
          "color": "#65C2B9"
        },
        {
          "model": "o3-mini",
          "rank": 2,
          "score": 1137,
          "ci": 34,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1306.04,
          "color": "#65C2B9"
        },
        {
          "model": "GPT-4o (November 2024)",
          "rank": 3,
          "score": 1132,
          "ci": 31,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1306.04,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "japanese",
      "href": "/labs/leaderboard/japanese",
      "name": "Japanese",
      "description": "Testing models' proficiency in Japanese language tasks and cultural nuances",
      "category": "",
      "deprecated": true,
      "flag": "JP",
      "scores": [
        {
          "model": "o1-preview",
          "rank": 1,
          "score": 1118,
          "ci": 43,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1195.83,
          "color": "#65C2B9"
        },
        {
          "model": "Gemini 2.0 Pro (December 2024)",
          "rank": 2,
          "score": 1117,
          "ci": 36,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1195.83,
          "color": "#598DD2"
        },
        {
          "model": "o3-mini",
          "rank": 3,
          "score": 1104,
          "ci": 31,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1195.83,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "korean",
      "href": "/labs/leaderboard/korean",
      "name": "Korean",
      "description": "Measuring capabilities in Korean language processing and comprehension",
      "category": "",
      "deprecated": true,
      "flag": "KR",
      "scores": [
        {
          "model": "o1-preview",
          "rank": 1,
          "score": 66.43,
          "ci": 5.47,
          "isNew": false,
          "deprecated": false,
          "maxScore": 74.057,
          "color": "#65C2B9"
        },
        {
          "model": "Claude 3.7 Sonnet (February 2025)",
          "rank": 2,
          "score": 64.93,
          "ci": 5.51,
          "isNew": false,
          "deprecated": false,
          "maxScore": 74.057,
          "color": "#E27553"
        },
        {
          "model": "GPT-4o (May 2024)",
          "rank": 3,
          "score": 64.58,
          "ci": 5.52,
          "isNew": false,
          "deprecated": false,
          "maxScore": 74.057,
          "color": "#65C2B9"
        }
      ]
    },
    {
      "key": "math",
      "href": "/labs/leaderboard/math",
      "name": "Math",
      "description": "Previously used for evaluating mathematical problem-solving capabilities",
      "category": "",
      "deprecated": true,
      "scores": [
        {
          "model": "Claude 3.5 Sonnet (June 2024)",
          "rank": 1,
          "score": 96.6,
          "ci": 1.02,
          "isNew": false,
          "deprecated": false,
          "maxScore": 100.5486,
          "color": "#E27553"
        },
        {
          "model": "GPT-4o (August 2024)",
          "rank": 2,
          "score": 95.68,
          "ci": 1.15,
          "isNew": false,
          "deprecated": false,
          "maxScore": 100.5486,
          "color": "#65C2B9"
        },
        {
          "model": "Llama 3.1 405B Instruct",
          "rank": 3,
          "score": 95.6,
          "ci": 1.16,
          "isNew": false,
          "deprecated": false,
          "maxScore": 100.5486,
          "color": "#6FCBEF"
        }
      ]
    },
    {
      "key": "spanish",
      "href": "/labs/leaderboard/spanish",
      "name": "Spanish",
      "description": "Evaluating Spanish language skills across various linguistic challenges",
      "category": "",
      "deprecated": true,
      "flag": "ES",
      "scores": [
        {
          "model": "Gemini 2.0 Pro (December 2024)",
          "rank": 1,
          "score": 1176,
          "ci": 38,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1250.42,
          "color": "#598DD2"
        },
        {
          "model": "o1 (December 2024)",
          "rank": 2,
          "score": 1134,
          "ci": 36,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1250.42,
          "color": "#65C2B9"
        },
        {
          "model": "Gemini Pro Flash 2",
          "rank": 3,
          "score": 1119,
          "ci": 32,
          "isNew": false,
          "deprecated": false,
          "maxScore": 1250.42,
          "color": "#598DD2"
        }
      ]
    }
  ]
}
