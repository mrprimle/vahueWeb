// Scale's original strings for labs.scale.com/, snapshot of 2026-11-02 (SSR HTML and flight payload). Links point at this site's routes.
import type { LabsHomeContent } from './types'

export const contentScale: LabsHomeContent = {
  "meta": {
    "title": "Scale Labs - Research to Advance AI | Scale Labs",
    "description": "Scale Labs advances AI through research focusing on agents, post-training, reasoning, safety, evaluation, and alignment, and the science of data."
  },
  "hero": {
    "title": "Research to Advance AI",
    "body": "Scale Labs advances AI through research. Our research focuses on agents, post-training, reasoning, safety, evaluation, and alignment, and the science of data."
  },
  "leaderboards": {
    "heading": "[LEADERBOARDS]",
    "blurb": "Benchmarks for frontier, agentic, and safety capabilities",
    "items": [
      {
        "name": "Humanity's Sixth Sense",
        "href": "/labs/leaderboard"
      },
      {
        "name": "DistressBench",
        "href": "/labs/leaderboard"
      },
      {
        "name": "Humanity's Last Exam (Diamond)",
        "href": "/labs/leaderboard"
      },
      {
        "name": "DrugDiscoveryBench",
        "href": "/labs/leaderboard"
      },
      {
        "name": "SWE Atlas - Refactoring",
        "href": "/labs/leaderboard"
      }
    ],
    "more": {
      "label": "View more",
      "href": "/labs/leaderboard"
    }
  },
  "papers": {
    "heading": "[PAPERS]",
    "blurb": "Research papers and publications covering agents, post-training, reasoning, safety, evaluation, and alignment, and the science of data.",
    "columns": {
      "date": "Date",
      "title": "Title",
      "category": "Category",
      "authors": "Authors"
    },
    "items": [
      {
        "title": "DistressBench: Evaluating Multi-Dimensional Crisis Support in Large Language Models",
        "href": "/labs/papers",
        "date": "10/9/2026",
        "categories": [
          "Safety & Oversight"
        ],
        "authors": "Drew Rein, Patrick Oathout, Vishal Kumar, Udari Madhushani Sehwag",
        "image": "/labs/papers/paper-1.webp"
      },
      {
        "title": "Humanity's Sixth Sense: Benchmarking Intuitive Visual Reasoning in Multimodal Models",
        "href": "/labs/papers",
        "date": "10/7/2026",
        "categories": [
          "Multimodal"
        ],
        "authors": "Xingang Guo, Jing Gu, Brian Jang, Renxiong Wang, Utkarsh Tyagi, Daniel Quigley, Steven Li, David Yan, Daniel Yue Zhang, Darvin Yi, Forrest Huang, HiJae Kim, Tianyi Zhang, Jared Lichtarge, Jihua Huang, Le Xue, Manan Tomar, Qiuyi Richard Zhang, Ruofei Yu, Seth Neel, Yaning Hu, Marcella Valentine, Xinzhe Jiang, Daniel Evans, Chenguang Wang, Dustin Tran, Tong Zhao, Yinfei Yang, Yunzhong He",
        "image": "/labs/papers/paper-2.webp"
      },
      {
        "title": "SteerDuplex: Steerable Duplex Speech Dialogue Models",
        "href": "/labs/papers",
        "date": "9/17/2026",
        "categories": [
          "Multimodal"
        ],
        "authors": "Utkarsh Tyagi, Ramaneswaran Selvakumar, Advait Gosai, Sonal Kumar, Nikhil Barhate, Isabell Sagar, Steven Li, Miheer Bavare, Daniel Quigley, Fabiola Tapia Carrillo, Jose M Patron E, Diego Macías Gutiérrez, Paul Song, Ramani Duraiswami, Dinesh Manocha, Yunzhong He",
        "image": "/labs/papers/paper-3.webp"
      },
      {
        "title": "READY or Not: Reliable Enterprise Agent Deployment",
        "href": "/labs/papers",
        "date": "9/4/2026",
        "categories": [
          "Agents",
          "Enterprise"
        ],
        "authors": "Veronica Chatrath, Bryan Zhu, Jingxuan Fan, George Pu, Soham Dinesh Tiwari, Soham Dan, Ryan Young, Yuan (Christy) Li, Yuang Yao, Apaar Shanker, Minglai Yang , Daniel Yue Zhang, Yunzhong He, Ying Liu, Chenguang Wang, Zhijun Yin, Yuan (Emily) Xue",
        "image": "/labs/papers/paper-4.webp"
      },
      {
        "title": "Spine-Branch Coordination for Multi-agent Computer Use",
        "href": "/labs/papers",
        "date": "8/27/2026",
        "categories": [
          "Agents"
        ],
        "authors": "Mian Zhang, Manasi Sharma, Sheng Zhang, Minlai Yang, Kejian Shi, Ying Liu, Zhiyu Zoey Chen, Daniel Yue Zhang",
        "image": "/labs/papers/paper-5.webp"
      },
      {
        "title": "CliniCARE-Bench: Clinical Calibrated Audit of Medical Reasoning in EHR",
        "href": "/labs/papers",
        "date": "8/20/2026",
        "categories": [
          "Evaluation and Alignment"
        ],
        "authors": "Veronica Chatrath, Bryan Zhu, George Pu, Jingxuan Fan, Apaar Shanker, Varun Ursekar, Anahita Sharma, Jason Qin, Keqi Han, Soham Dinesh Tiwari, Soham Dan, Vijay Kalmath, Yuan (Christy) Li, Daniel Yue Zhang, Chenguang Wang, Zainab Doctor, Zhijun Yin, Nigam H. Shah, Yuan Xue",
        "image": "/labs/papers/paper-6.webp"
      }
    ],
    "noImage": "No image",
    "more": {
      "label": "View more",
      "href": "/labs/papers"
    }
  },
  "blog": {
    "heading": "[BLOG]",
    "blurb": "Insights, analysis, and updates from Scale Labs",
    "previous": "Previous",
    "next": "Next",
    "items": [
      {
        "title": "FineART: Scale AI’s First Open-Source Robotics Dataset and Model",
        "href": "/labs/blog",
        "date": "Oct 29, 2026",
        "intro": "We’re releasing FineART-VLA, an open model co-developed with Hugging Face's LeRobot team. It builds upon FineART, Scale’s first open-source robotics dataset, which includes 40,000 plus robot demonstrations.\n",
        "category": "Physical AI"
      },
      {
        "title": "DistressBench: A clinician-authored benchmark for how AI models handle users in distress",
        "href": "/labs/blog",
        "date": "Oct 9, 2026",
        "intro": "People increasingly turn to chatbots for emotional support, and some of those conversations involve suicide or self-harm.\n\nDistressBench measures whether models give the support those conversations need, using rubrics written by licensed clinicians: 718 clinician-authored conversations across 23 suicide and self-harm subcategories.",
        "category": "Safety & Oversight"
      },
      {
        "title": "Introducing Humanity's Sixth Sense: Measuring Intuitive Visual Reasoning",
        "href": "/labs/blog",
        "date": "Oct 7, 2026",
        "intro": "Today we're introducing Humanity's Sixth Sense (HSS), in partnership with Elorian, a benchmark for intuitive visual reasoning with 522 open-ended tasks across 288 images and 234 video clips (17.6 hours of video in total). "
      },
      {
        "title": "Introducing AgentEnv: An Open-Source Framework for Building RL Environments",
        "href": "/labs/blog",
        "date": "Oct 5, 2026",
        "intro": "An agent is only as good as the world it practices in, and building worlds that are realistic, accurate, and scalable all at once is the hard part of scaling RL. Every RL environment Scale builds runs on AgentEnv. Today we're open-sourcing it.\n"
      }
    ],
    "viewAll": "View all",
    "allPosts": "All posts",
    "allHref": "/labs/blog"
  },
  "jobs": {
    "heading": "[Jobs]",
    "columns": {
      "date": "Date",
      "position": "Position",
      "location": "Location"
    },
    "items": [
      {
        "title": "Machine Learning Research Scientist, Evaluations",
        "location": "San Francisco, CA; Seattle, WA; New York, NY",
        "date": "10.22.2026",
        "href": "/labs/jobs"
      },
      {
        "title": "Machine Learning Research Scientist, Post-Training",
        "location": "San Francisco, CA; Seattle, WA; New York, NY",
        "date": "10.22.2026",
        "href": "/labs/jobs"
      },
      {
        "title": "ML Research Engineer, ML Systems",
        "location": "San Francisco, CA; Seattle, WA; New York, NY",
        "date": "10.22.2026",
        "href": "/labs/jobs"
      },
      {
        "title": "Research Scientist, Agent Robustness",
        "location": "San Francisco, CA; New York, NY",
        "date": "10.22.2026",
        "href": "/labs/jobs"
      },
      {
        "title": "Research Scientist, AI Controls and Monitoring",
        "location": "San Francisco, CA; New York, NY",
        "date": "10.22.2026",
        "href": "/labs/jobs"
      },
      {
        "title": "Research Scientist, Frontier Risk Evaluations",
        "location": "San Francisco, CA; New York, NY",
        "date": "10.22.2026",
        "href": "/labs/jobs"
      }
    ],
    "more": {
      "label": "View more",
      "href": "/labs/jobs"
    }
  }
}
