// Static snapshot of https://labs.scale.com/ (captured 2026-11-01). labs renders these from Sanity at request time;
// the clone keeps them as data so the page never calls an API.
export type LabsHomeContent = {
  hero: { title: string; body: string }
  leaderboards: { title: string; intro: string; items: { name: string; href: string }[]; more: string }
  papers: {
    title: string
    intro: string
    items: { date: string; title: string; categories: string; authors: string; href: string; image?: string }[]
    more: string
  }
  blog: { title: string; intro: string; posts: { category?: string; date: string; title: string; intro: string; href: string }[] }
  jobs: { title: string; items: { date: string; title: string; location: string; href: string }[]; more: string }
}

export const LABS_HOME: LabsHomeContent = {
  hero: {
    title: 'Research to Advance AI',
    body: 'Scale Labs advances AI through research. Our research focuses on agents, post-training, reasoning, safety, evaluation, and alignment, and the science of data.',
  },
  leaderboards: {
    title: '[LEADERBOARDS]',
    intro: 'Benchmarks for frontier, agentic, and safety capabilities',
    items: [
      { name: "Humanity's Sixth Sense", href: '/leaderboard/hss' },
      { name: 'DistressBench', href: '/leaderboard/distressbench' },
      { name: "Humanity's Last Exam (Diamond)", href: '/leaderboard/hle-diamond' },
      { name: 'DrugDiscoveryBench', href: '/leaderboard/drugdiscoverybench' },
      { name: 'SWE Atlas - Refactoring', href: '/leaderboard/sweatlas-refactoring' },
    ],
    more: '/leaderboard',
  },
  papers: {
    title: '[PAPERS]',
    intro: 'Research papers and publications covering agents, post-training, reasoning, safety, evaluation, and alignment, and the science of data.',
    items: [
      {
        date: '10/9/2026',
        title: 'DistressBench: Evaluating Multi-Dimensional Crisis Support in Large Language Models',
        categories: 'Safety & Oversight',
        authors: 'Drew Rein, Patrick Oathout, Vishal Kumar, Udari Madhushani Sehwag',
        href: '/papers/distressbench',
        image: '/templates/labs/papers/p1.png',
      },
      {
        date: '10/7/2026',
        title: "Humanity's Sixth Sense: Benchmarking Intuitive Visual Reasoning in Multimodal Models",
        categories: 'Multimodal',
        authors:
          'Xingang Guo, Jing Gu, Brian Jang, Renxiong Wang, Utkarsh Tyagi, Daniel Quigley, Steven Li, David Yan, Daniel Yue Zhang, Darvin Yi, Forrest Huang, HiJae Kim, Tianyi Zhang, Jared Lichtarge, Jihua Huang, Le Xue, Manan Tomar, Qiuyi Richard Zhang, Ruofei Yu, Seth Neel, Yaning Hu, Marcella Valentine, Xinzhe Jiang, Daniel Evans, Chenguang Wang, Dustin Tran, Tong Zhao, Yinfei Yang, Yunzhong He',
        href: '/papers/humanitys-sixth-sense',
        image: '/templates/labs/papers/p2.png',
      },
      {
        date: '9/17/2026',
        title: 'SteerDuplex: Steerable Duplex Speech Dialogue Models',
        categories: 'Multimodal',
        authors:
          'Utkarsh Tyagi, Ramaneswaran Selvakumar, Advait Gosai, Sonal Kumar, Nikhil Barhate, Isabell Sagar, Steven Li, Miheer Bavare, Daniel Quigley, Fabiola Tapia Carrillo, Jose M Patron E, Diego Macías Gutiérrez, Paul Song, Ramani Duraiswami, Dinesh Manocha, Yunzhong He',
        href: '/papers/steerduplex-steerable-duplex-speech-dialogue-models',
        image: '/templates/labs/papers/p3.png',
      },
      {
        date: '9/4/2026',
        title: 'READY or Not: Reliable Enterprise Agent Deployment',
        categories: 'Agents, Enterprise',
        authors:
          'Veronica Chatrath, Bryan Zhu, Jingxuan Fan, George Pu, Soham Dinesh Tiwari, Soham Dan, Ryan Young, Yuan (Christy) Li, Yuang Yao, Apaar Shanker, Minglai Yang , Daniel Yue Zhang, Yunzhong He, Ying Liu, Chenguang Wang, Zhijun Yin, Yuan (Emily) Xue',
        href: '/papers/reliable-enterprise-agent-deployment',
        image: '/templates/labs/papers/p4.png',
      },
      {
        date: '8/27/2026',
        title: 'Spine-Branch Coordination for Multi-agent Computer Use',
        categories: 'Agents',
        authors: 'Mian Zhang, Manasi Sharma, Sheng Zhang, Minlai Yang, Kejian Shi, Ying Liu, Zhiyu Zoey Chen, Daniel Yue Zhang',
        href: '/papers/spine-branch-coordination',
        image: '/templates/labs/papers/p5.png',
      },
      {
        date: '8/20/2026',
        title: 'CliniCARE-Bench: Clinical Calibrated Audit of Medical Reasoning in EHR',
        categories: 'Evaluation and Alignment',
        authors:
          'Veronica Chatrath, Bryan Zhu, George Pu, Jingxuan Fan, Apaar Shanker, Varun Ursekar, Anahita Sharma, Jason Qin, Keqi Han, Soham Dinesh Tiwari, Soham Dan, Vijay Kalmath, Yuan (Christy) Li, Daniel Yue Zhang, Chenguang Wang, Zainab Doctor, Zhijun Yin, Nigam H. Shah, Yuan Xue',
        href: '/papers/clinicare-bench',
        image: '/templates/labs/papers/p6.png',
      },
    ],
    more: '/papers',
  },
  blog: {
    title: '[BLOG]',
    intro: 'Insights, analysis, and updates from Scale Labs',
    posts: [
      {
        category: 'Physical AI',
        date: 'Oct 29, 2026',
        title: 'FineART: Scale AI’s First Open-Source Robotics Dataset and Model',
        intro:
          "We’re releasing FineART-VLA, an open model co-developed with Hugging Face's LeRobot team. It builds upon FineART, Scale’s first open-source robotics dataset, which includes 40,000 plus robot demonstrations.\n",
        href: '/blog/fineart',
      },
      {
        category: 'Safety & Oversight',
        date: 'Oct 9, 2026',
        title: 'DistressBench: A clinician-authored benchmark for how AI models handle users in distress',
        intro:
          'People increasingly turn to chatbots for emotional support, and some of those conversations involve suicide or self-harm.\n\nDistressBench measures whether models give the support those conversations need, using rubrics written by licensed clinicians: 718 clinician-authored conversations across 23 suicide and self-harm subcategories.',
        href: '/blog/distressbench',
      },
      {
        date: 'Oct 7, 2026',
        title: "Introducing Humanity's Sixth Sense: Measuring Intuitive Visual Reasoning",
        intro:
          "Today we're introducing Humanity's Sixth Sense (HSS), in partnership with Elorian, a benchmark for intuitive visual reasoning with 522 open-ended tasks across 288 images and 234 video clips (17.6 hours of video in total). ",
        href: '/blog/introducing-humanitys-sixth-sense',
      },
      {
        date: 'Oct 5, 2026',
        title: 'Introducing AgentEnv: An Open-Source Framework for Building RL Environments',
        intro:
          "An agent is only as good as the world it practices in, and building worlds that are realistic, accurate, and scalable all at once is the hard part of scaling RL. Every RL environment Scale builds runs on AgentEnv. Today we're open-sourcing it.\n",
        href: '/blog/introducing-agentenv',
      },
    ],
  },
  jobs: {
    title: '[Jobs]',
    items: [
      { date: '10.22.2026', title: 'Machine Learning Research Scientist, Evaluations', location: 'San Francisco, CA; Seattle, WA; New York, NY', href: 'https://job-boards.greenhouse.io/scaleai/jobs/4728014005' },
      { date: '10.22.2026', title: 'Machine Learning Research Scientist, Post-Training', location: 'San Francisco, CA; Seattle, WA; New York, NY', href: 'https://job-boards.greenhouse.io/scaleai/jobs/4528009005' },
      { date: '10.22.2026', title: 'ML Research Engineer, ML Systems', location: 'San Francisco, CA; Seattle, WA; New York, NY', href: 'https://job-boards.greenhouse.io/scaleai/jobs/4534631005' },
      { date: '10.22.2026', title: 'Research Scientist, Agent Robustness', location: 'San Francisco, CA; New York, NY', href: 'https://job-boards.greenhouse.io/scaleai/jobs/4675684005' },
      { date: '10.22.2026', title: 'Research Scientist, AI Controls and Monitoring', location: 'San Francisco, CA; New York, NY', href: 'https://job-boards.greenhouse.io/scaleai/jobs/4675694005' },
      { date: '10.22.2026', title: 'Research Scientist, Frontier Risk Evaluations', location: 'San Francisco, CA; New York, NY', href: 'https://job-boards.greenhouse.io/scaleai/jobs/4677657005' },
    ],
    more: '/jobs',
  },
}
