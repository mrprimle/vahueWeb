// Scale's original strings for https://scale.com/automotive (module 583338, 2kbgdjj-19374.js). Reference for the clone; the page renders content.ts.
import { TEXT_PANEL_SCALE } from './textPanel.scale'
import type { AutomotiveContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }

export const content: AutomotiveContent = {
  meta: { title: 'Autonomous Driving Data Solutions | Scale AI', description: "Scale's Automotive Data Engine provides all the tools you need to drive model improvements with data." },
  hero: {
    headline: 'Automotive Data Engine',
    body: 'Unlocking Autonomy with best-inclass data.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: WHITE,
    image: { path: '/automotive/hero.webp' },
  },
  logos: [
    { alt: 'Valeo', width: 92, height: 40, src: '/automotive/valeo.svg' },
    { alt: 'Oshkosh', width: 96, height: 32, src: '/automotive/oshkosh.svg' },
  ],
  overview: {
    title: 'The Automotive Data Engine',
    subtitle: "Scale's Automotive Data Engine has everything you need to drive model improvements with data.",
    features: [
      { title: 'Data Labeling', description: 'Industry-leading annotation of 2D and 3D data sourced from multiple sensors. Achieve high quality data at low cost from ML-assisted labeling workflows, best in class operations, and advanced labeling interfaces.' },
      { title: 'Data Curation', description: 'Explore both labeled and unlabelled data. Understand dataset distribution, curate data matching target scenarios and send data for annotation.' },
      { title: 'Model Evaluation', description: 'Analyze the performance of your machine learning models. Explore model metrics, identify model weaknesses and evaluate your model on scenario tests.' },
    ],
    image: { src: '/automotive/overview.png', alt: 'Automotive Data Engine', width: 662, height: 594 },
  },
  stack: {
    overtitle: 'Autonomy tech stack',
    title: 'How to Build Autonomy',
    tabs: {
      panelTitle: 'Supported Data',
      panelSubtitle: 'Best-in-class data to fuel autonomy',
      description: 'Scale has pioneered in the data labeling industry by combining AI-based techniques with human-in-the-loop, delivering labeled data at unprecedented quality, scalability, and efficiency.',
      cta: { text: 'Label My Data', href: 'https://dashboard.scale.com/signup?product=rapid&redirect_url=%2Frapid' },
      titles: ['3D', 'Image', 'Mapping', 'Text', 'Audio'],
      frame: {
        src: `https://lidar-now.scale.com/scene?title=${encodeURIComponent('Scene #1')}`,
        placeholder: { src: '/automotive/lidar.jpeg', alt: '', width: 1461, height: 905 },
      },
      image: {
        src: '/automotive/living-room.webp',
        alt: 'a living room with furniture',
        width: 649,
        height: 402,
        blurDataURL: 'data:image/webp;base64,UklGRu4AAABXRUJQVlA4TOIAAAAvBwABAM1VICICHghACgMAAADinQKYJCAAAAAAAAAAAAAAAAAAAAAAAAAAGAJDkEAQkG8GWDMiDwAAwAMByEEAAAA4/3uYiQCYfywCIDAAAAAAAAAAAAAAAAAAAAAAAAAAwAAFYLzNKhD074EApDAAAACc/71+BDQCvDDEAAAAAAAAAAAAAAAAAAAAAAAAAAAYIAAYAg9A5dn6yHOZL+39RfMzAA0s9wkf0nl7EU3cyeAdgcgR5DmOcWJ+dKq6VIwaV843upgqrKG8o9+rgq9UMl9l3VEs7bhL+o/8hd+29ugD',
      },
      map: {
        src: '/automotive/map.webp',
        alt: 'A map',
        width: 649,
        height: 402,
        blurDataURL: 'data:image/webp;base64,UklGRuQAAABXRUJQVlA4TNgAAAAvBwABEM1VICICHghACgMAAIC/BltjRpsBgCAmAAQEQAAAAAAAAAAAAAAAAAAAAGAIMwAgBIFGgR4AAMADQStiAAAAOP93P1sFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACyzsoDAUhhAAAAOP+73y2ZAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADJfLW/SLe8TfvTv288wx8uoIGQoVJCZay0+cLTknDPO/dbda3++AgbhgxwdG6xzjNh/3DJVxAZpmnzz1jnrSz18d08IAw=',
      },
      textArtwork: TEXT_PANEL_SCALE,
      audio: {
        prompt: 'Please transcribe this audio.',
        fileName: 'steve-jobs-speech.mp3',
        time: '0:00',
        run: 'Run Code',
        code: `client.createAudioSpeechTask({ 
            "attachment_type": "audio", 
            "attachment": "THE_URL_WE_UPLOAD_THIS_TO", 
            "verbatim": true, 
            "callback_url": "http://www.example.com/callback", 
            }, (err, task) => { 
            // do something with task 
          });`,
        result: `{
              "transcript": "On the back cover of their final issue was a photograph of an early morning country road, the kind you might find yourself hitchhiking on if you were so adventurous. Beneath it were the words: “Stay Hungry. Stay Foolish.” It was their farewell message as they signed off. Stay Hungry. Stay Foolish. And I have always wished that for myself. And now, as you graduate to begin anew, I wish that for you.Stay Hungry. Stay Foolish. Thank you all very much.",
              "duration": 0.36
            }`,
        src: '/automotive/transcription.mp3',
      },
    },
  },
  phases: {
    title: 'Phases of Model Development',
    subtitle: 'Scale partners with you at every stage of developing your model within the Data Engine.',
    items: [
      {
        title: 'Base Phase',
        subtitle: "Scale's Data Engine helps you collect and label a base dataset to unlock initial model performance. Our platform lets you randomly sample data or add constraints (ex. Time of day = night) matching your intended distribution.",
        image: { src: '/automotive/img-base-phase.webp', alt: 'Base Phase' },
        video: 'https://stream.mux.com/zTbZlTfZeUlgvpe4O7ueS8nYsAFoG8C2.m3u8',
      },
      {
        title: 'Improvement Phase',
        subtitle: 'In this phase, the Data Engine ensures new datapoints continually challenge your model and maximally improve performance. To achieve this, Scale offers both automated (ML-based) and manual curation methods.',
        image: { src: '/automotive/img-improvement-phase.webp', alt: 'Improvement Phase' },
        video: 'https://stream.mux.com/pya00YVaQ45MTVUh00jM1ik55yYxlv2aSL.m3u8',
      },
      {
        title: 'Target Phase',
        subtitle: 'Scale helps you collect and curate data targeted to specific scenarios with Natural Language Search and Autotag, we then label that data and improve your model performance on those specific scenarios. Scale helps you close the loop by evaluating your model on scenario tests.',
        image: { src: '/automotive/img-target-phase.webp', alt: 'Target Phase' },
        video: 'https://stream.mux.com/WGvF3ByeLfUOcWV00EZVE1FAaav01meV01W.m3u8',
      },
    ],
  },
  why: {
    overtitle: 'Why Scale',
    title: 'Trusted by Leading Automotive Companies',
    subtitle: 'Automotive leaders work with Scale for building autonomy for the following reasons:',
    features: [
      { icon: 'flame', title: 'Sure-Fire Improvements', subtitle: 'Data is the sure-fire way to improve your models. With every larger/higher quality/more diverse dataset, Scale helps your machine learning models improve.' },
      { icon: 'gauge', title: 'Maximum Performance', subtitle: 'All the components of the Scale Data Engine maximize the value of each annotated label to improve model performance.' },
      { icon: 'bolt', title: 'Faster Development', subtitle: 'Scale accelerates the data engine loop - improving labeling speed, curating optimal datasets, and scaling up the workforce to drive faster development of AI applications.' },
    ],
  },
  resources: {
    overtitle: 'RESOURCES',
    title: 'Learn More About the Data Engine',
    items: [
      {
        id: 'upgrading-fleet-av-data-engine',
        overtitle: 'Data Engine',
        title: 'Upgrading Your Fleet Into an AV Data Engine',
        image: { src: '/automotive/upgrading-fleet-av-data-engine.png', alt: 'Upgrading Your Fleet Into an AV Data Engine' },
        link: 'https://exchange.scale.com/home/videos/upgrading-your-fleet-into-an-av-data-engine-2023-04-19',
      },
      {
        id: 'guide-data-labeling',
        overtitle: 'Guides',
        title: 'The Authoritative Guide',
        image: { src: '/automotive/guide-computer-vision.png', alt: 'The Authoritative Guide' },
        link: '/guides/data-labeling-annotation-guide',
      },
    ],
  },
  foundation: {
    title: 'The Automotive Foundation Model',
    overtitle: 'Live Demo',
    heading: "Introducing Scale's Automotive Foundation Model",
    body: 'State of the art, language-grounded, perception model to accelerate the development of autonomous vehicles.',
    link: { text: 'Test Drive AFM-1 →', href: '/foundation-model/automotive' },
    image: { src: '/automotive/img-foundation-model.webp', alt: 'Automotive Foundation Model', width: 544, height: 306 },
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Build AI', url: '/data-engine' },
    backdrop: WHITE,
    image: { path: '/automotive/prefooter.webp' },
  },
}
