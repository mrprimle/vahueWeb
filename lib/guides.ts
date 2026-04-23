export type GuideCategory =
  | 'Claude Code'
  | 'MCP'
  | 'Cursor'
  | 'Deploy'
  | 'Setup'
  | 'Basics'

export type Guide = {
  slug: string
  title: string
  excerpt: string
  category: GuideCategory
  readTime: string
  readMinutes: number
  views: number
  date: string
  dateISO: string
  author: string
  content: string
}

export const guideCategories: GuideCategory[] = [
  'Claude Code',
  'MCP',
  'Cursor',
  'Deploy',
  'Setup',
  'Basics',
]

const skillsInClaudeCodeContent = `
<h2>What is a Skill, in plain words</h2>

<p>Imagine: you need to put together a presentation for a meeting. You ask Claude for help and explain what you want.</p>

<p>A week later — another presentation. You explain the same thing all over again. Then another one. And again. The fourth time you think: "Can I stop repeating myself every single time?"</p>

<p>You can. That's exactly what skills are for.</p>

<p><strong>A Skill is an instruction you write once, and Claude reaches for it on its own, whenever it's needed.</strong> Write it — and stop repeating yourself.</p>

<p><strong>Without a skill</strong> — you spell everything out again each time:</p>

<pre><code>Make a presentation. One point per slide,
no more than 6 lines per slide, large headline,
short bullets, final slide with takeaways.
Use our brand colors.</code></pre>

<p><strong>With a skill</strong> — you just say what you need:</p>

<pre><code>Make a presentation about year-end results</code></pre>

<p>Claude sees that the task involves a presentation, pulls in the skill, and follows your rules — no reminders needed.</p>

<p>You can also invoke a skill explicitly:</p>

<pre><code>/presentation-style year-end results</code></pre>

<p><strong>Two ways to invoke:</strong></p>
<ol>
<li><strong>Automatically:</strong> Claude loads the skill itself when the task matches its description.</li>
<li><strong>Manually:</strong> you type <code>/skill-name</code> — and Claude uses it.</li>
</ol>

<hr />

<h2>What a Skill is made of</h2>

<p>A skill is a Markdown file called <code>SKILL.md</code>. Here's its minimal structure:</p>

<pre><code class="language-markdown">---
name: presentation-style
description: Rules for formatting presentations. Use whenever a presentation needs to be created.
---

Rules and instructions for Claude go here.</code></pre>

<p>Everything between the <code>---</code> markers is <strong>frontmatter</strong> (metadata). Everything after is the instruction.</p>

<h3>Key frontmatter fields</h3>

<table>
<thead>
<tr><th>Field</th><th>Required</th><th>What it does</th></tr>
</thead>
<tbody>
<tr><td><code>name</code></td><td>No</td><td>Skill name, used to invoke it via <code>/name</code>. If omitted — taken from the folder name.</td></tr>
<tr><td><code>description</code></td><td>Recommended</td><td>Tells Claude when to use this skill. The sharper — the better Claude understands when to apply it automatically.</td></tr>
<tr><td><code>disable-model-invocation</code></td><td>No</td><td>If <code>true</code> — Claude won't invoke the skill itself. You call it manually via <code>/name</code>.</td></tr>
<tr><td><code>argument-hint</code></td><td>No</td><td>Hint for the user: what to type after <code>/name</code>. For example: <code>&lt;presentation topic&gt;</code>.</td></tr>
</tbody>
</table>

<blockquote><p><strong>Important:</strong> <code>description</code> is the most valuable field. Claude uses it to decide whether to pull in the skill automatically. Be specific: "Use when a presentation needs to be created" beats "A useful skill."</p></blockquote>

<p>There are more advanced fields too — you can read about them in the <a href="https://code.claude.com/docs/en/skills" target="_blank" rel="noopener noreferrer">documentation</a>.</p>

<hr />

<h2>Where skills live</h2>

<p>Skills can be stored in different places, depending on where you need them.</p>

<p><strong>Project skills</strong> are only visible to that one project — other folders don't know about them. <strong>Personal skills</strong> are available everywhere — in any project where you open Claude Code.</p>

<table>
<thead>
<tr><th>Type</th><th>Location</th><th>When to use</th></tr>
</thead>
<tbody>
<tr><td><strong>Project</strong></td><td>Inside the project folder: <code>.claude/skills/skill-name/SKILL.md</code> (e.g. <code>my-project/.claude/skills/presentation-style/SKILL.md</code>)</td><td>Rules only apply to this project.</td></tr>
<tr><td><strong>Personal</strong></td><td>In your home folder: <code>~/.claude/skills/skill-name/SKILL.md</code></td><td>Rules apply to every project.</td></tr>
</tbody>
</table>

<p>Say you work at an agency and run several clients.</p>

<p><strong>Project skills</strong> — each client has their own:</p>
<ul>
<li>Presentation for "AlphaBank" — strict style, corporate colors, formal tone.</li>
<li>Presentation for a startup — bright design, informal tone, lots of visuals.</li>
</ul>

<p><strong>Personal skills</strong> — the things you use everywhere:</p>
<ul>
<li>Your delivery style — the argumentation structure you use in any deck.</li>
<li>Data-visualization rules — how you lay out charts and tables.</li>
</ul>

<hr />

<h2>Types of skills</h2>

<p>After the frontmatter you can write anything — instructions, rules, steps, examples. But there are two base types of skills.</p>

<p><strong>Reference skills</strong> — knowledge and rules Claude applies to your work. Formatting standards, guidelines, conventions. Claude pulls them in on its own when the task fits.</p>

<pre><code class="language-markdown">---
name: presentation-style
description: Rules for formatting presentations
---

When creating a presentation:
- One point — one slide
- No more than 6 lines of text
- Numbers and facts instead of vague phrases
- Final slide — conclusions and next steps</code></pre>

<p><strong>Command skills</strong> — a sequence of actions you trigger manually via <code>/name</code>. Deploys, generating a report, building a deck from scratch. These usually aren't meant to run automatically, so they add <code>disable-model-invocation: true</code>.</p>

<pre><code class="language-markdown">---
name: create-presentation
description: Create a presentation on a topic
disable-model-invocation: true
---

Create a presentation on the topic: $ARGUMENTS

1. Gather data on the topic
2. Form a structure of 6–8 slides
3. Fill each slide with content
4. Add a takeaways & next-steps slide</code></pre>

<p>Both types are just a <code>SKILL.md</code> file. The difference is in the content and who invokes it — Claude or you.</p>

<hr />

<h2>Build your first Skill, step by step</h2>

<p>Let's build a skill with presentation-formatting rules.</p>

<h3>1. Ask Claude to create the skill</h3>

<p><strong>Project skill (available only inside that project folder)</strong> — open Claude Code inside the project folder:</p>

<pre><code>Create a skill for presentation formatting in this project. Rules:
- one point per slide
- no more than 6 lines of text per slide
- numbers and facts instead of generic phrases
- final slide — conclusions and next steps</code></pre>

<p><strong>Personal skill (available in any folder)</strong> — open Claude Code anywhere:</p>

<pre><code>Create a personal (user-level) skill for presentation formatting. Rules:
- one point per slide
- no more than 6 lines of text per slide
- numbers and facts instead of generic phrases
- final slide — conclusions and next steps</code></pre>

<p>Claude will pick a name itself and create the file.</p>

<blockquote><p><strong>Tip:</strong> If you want Claude to ask clarifying questions first — switch into plan mode (<code>shift+tab</code> until the "Plan" mode appears) before sending the prompt. Claude will ask for details, propose a name and structure, and only create the skill once you approve. You can also pick the name yourself: "Create a skill called presentation-style that…"</p></blockquote>

<h3>2. Restart Claude Code</h3>

<p>Skills are loaded at startup. To make the new skill register:</p>

<pre><code>/exit</code></pre>

<p>Then:</p>

<pre><code>claude</code></pre>

<h3>3. Use the skill</h3>

<p>Just ask for a presentation:</p>

<pre><code>Make a presentation: Q4 team results</code></pre>

<p>Claude will notice it has a skill for presentations and apply the rules automatically.</p>

<p>Or invoke it directly:</p>

<pre><code>/presentation-style Q4 team results</code></pre>

<h3>4. What you should see</h3>

<p>Claude will build out a presentation structure following the rules from your skill — without any extra instructions.</p>

<p>If that didn't happen — make sure you restarted Claude Code after creating the skill.</p>

<h3>What happened "under the hood"?</h3>

<p>Claude created a folder for the skill and a <code>SKILL.md</code> file inside it.</p>

<p><strong>If you created a project skill</strong>, the file lives inside the project folder:</p>

<pre><code>my-project/.claude/skills/presentation-style/SKILL.md</code></pre>

<p><strong>If it's a personal skill</strong> — in your home folder:</p>

<pre><code>~/.claude/skills/presentation-style/SKILL.md</code></pre>

<p>In both cases the file's contents will look roughly like this:</p>

<pre><code class="language-markdown">---
name: presentation-style
description: Rules for presentation formatting. Use whenever a presentation needs to be created, polished, or reworked.
---

When creating a presentation, follow these rules:

## Slide structure

- One point per slide
- Headline — the core message, not "Introduction" or "Slide 3"
- No more than 6 lines of text
- Short bullets, no filler words

## Content

- Numbers and facts instead of generic phrases ("grew 23%" instead of "grew significantly")
- Every slide answers the question "so what?"
- Final slide — conclusions and concrete next steps

## Output format

Format every slide as:
## Slide N: [Message-as-headline]
- Bullet 1
- Bullet 2
- Bullet 3</code></pre>

<p>It's a plain text file — you can ask Claude to show its contents and tweak the rules to your taste.</p>

<blockquote><p><strong>Tip:</strong> You can also create a skill manually — just make the folder and drop a <code>SKILL.md</code> inside. For a project skill: <code>my-project/.claude/skills/skill-name/SKILL.md</code>. For a user-level one: <code>~/.claude/skills/skill-name/SKILL.md</code>.</p></blockquote>

<hr />

<h2>Leveling up: templates and brand style</h2>

<p>A simple skill is a single file with rules. But a skill can be a whole folder with templates, examples, and reference material.</p>

<p>Say you want Claude not just to know the rules, but to use a specific presentation template and your company's brand style:</p>

<pre><code>presentation-style/
├── SKILL.md              # Formatting rules
├── template.md           # Template: standard 8-slide structure
└── brand-guidelines.md   # Brand style: colors, fonts, tone</code></pre>

<p>Inside <code>SKILL.md</code> you reference these files:</p>

<pre><code class="language-markdown">## Extra material

- Presentation structure template: [template.md](template.md)
- Company brand style: [brand-guidelines.md](brand-guidelines.md)</code></pre>

<p>Claude loads these files only when it needs to — keeping the context from getting overloaded every time.</p>

<blockquote><p><strong>Important:</strong> <code>SKILL.md</code> is the entry point. Keep it compact (under 500 lines). Heavy material belongs in separate files.</p></blockquote>

<hr />

<h2>$ARGUMENTS — passing data into a skill</h2>

<p>When you invoke a skill through <code>/</code>, you can add text after the name:</p>

<pre><code>/presentation-style Q4 results for the board</code></pre>

<p>The text <code>Q4 results for the board</code> is the argument. Claude gets it together with the skill's contents and understands what exactly you want. This works out of the box — nothing to configure.</p>

<p>But if you want more control over where the argument lands, use <code>$ARGUMENTS</code> inside the skill body:</p>

<pre><code class="language-markdown">---
name: presentation-style
description: Rules for formatting presentations.
argument-hint: &lt;presentation topic&gt;
---

Create a presentation on the topic: $ARGUMENTS

Follow these rules when creating it:
...</code></pre>

<p>In this case <code>$ARGUMENTS</code> gets replaced with <code>Q4 results for the board</code> directly in the instruction text.</p>

<p>The <code>argument-hint</code> field in the frontmatter is a hint for the user. When you start typing <code>/presentation-style</code> in Claude Code, the text from <code>argument-hint</code> appears next to the skill name:</p>

<pre><code>/presentation-style &lt;presentation topic&gt;</code></pre>

<p>So it's immediately clear what to type after the name. Without <code>argument-hint</code> you just see <code>/presentation-style</code> — and you have to remember what goes next.</p>

<hr />

<h2>Where to find ready-made skills</h2>

<p>You don't have to write skills from scratch — there's a catalog of ready-to-install skills.</p>

<h3>The skills.sh catalog</h3>

<p>Open <a href="https://skills.sh/" target="_blank" rel="noopener noreferrer">skills.sh</a> — it's an open catalog of skills. It already has more than 49,000 skills, from frontend formatting to database work. There are community skills and official ones from Anthropic.</p>

<p>The homepage has a leaderboard of the most popular skills and a search box.</p>

<img src="/img/guides/skills1.png" alt="skills.sh home — skill catalog with search and leaderboard" />

<p>Click on a skill and you'll see its description and installation command.</p>

<img src="/img/guides/skills2.png" alt="find-skills page — description and install command" />

<h3>How to install a skill</h3>

<p>Every skill page has an install command. For example, for the <code>find-skills</code> skill (it helps Claude search for and install other skills):</p>

<pre><code class="language-bash">npx skills add https://github.com/vercel-labs/skills --skill find-skills</code></pre>

<p>Paste the command into your terminal. The installer will ask a few things:</p>

<p><strong>1. Which agents to install into</strong> — pick Claude Code (space to select, Enter to confirm):</p>

<img src="/img/guides/skills3.png" alt="Select agents — pick Claude Code" />

<p><strong>2. Installation scope</strong> — Project (this project only) or Global (every project):</p>

<img src="/img/guides/skills4.png" alt="Installation scope — Project or Global" />

<p><strong>3. Installation method</strong> — pick Symlink (Recommended):</p>

<img src="/img/guides/skills5.png" alt="Installation method — Symlink recommended" />

<p><strong>4. Proceed with installation?</strong> — Yes:</p>

<img src="/img/guides/skills6.png" alt="Confirm install" />

<p>After installation, restart Claude Code. Type <code>/</code> and you'll see the new skill in the list:</p>

<img src="/img/guides/skills7.png" alt="find-skills now appears in the command list" />

<h3>find-skills: let Claude look up skills for you</h3>

<p>One of the most useful starter skills is <code>find-skills</code>. After installing it, just describe to Claude what you need:</p>

<pre><code>I need a skill for building landing pages</code></pre>

<p>Claude will search the catalog on its own, show a list with install commands, and recommend the best option.</p>

<p>Try searching for skills for different tasks — experiment:</p>

<pre><code>Find a skill for writing social media posts</code></pre>

<pre><code>Find a skill for code review</code></pre>

<pre><code>Find a skill for building API documentation</code></pre>

<p>The catalog already has thousands of skills — with new ones appearing every day. Search, try them, combine them. And if the skill you need doesn't exist — you already know how to create one in a couple of minutes.</p>

<h3>skill-creator: let Claude build skills for you</h3>

<p>Another handy one is <code>skill-creator</code>. It helps Claude create new skills. Install it:</p>

<pre><code class="language-bash">npx skills add https://github.com/anthropics/skills --skill skill-creator</code></pre>

<p>Once installed, just describe what you need:</p>

<pre><code>Help me build a skill for presentation formatting using skill-creator</code></pre>

<p>Claude will generate a ready-to-use skill from your description.</p>

<p>And <code>skill-creator</code> can also review existing skills and suggest improvements:</p>

<pre><code>Review my presentation-style skill and suggest how to improve it</code></pre>

<hr />

<h2>A Skill is just the start. What's next?</h2>

<p>The skill taught Claude <strong>how</strong> to format a presentation. But Claude Code has other primitives that solve other jobs. Here's how they fit together — using the same presentation example:</p>

<h3>Skill vs <code>CLAUDE.md</code></h3>

<p>Both a skill and <code>CLAUDE.md</code> hold instructions for Claude. The difference is when they load.</p>

<p><strong><code>CLAUDE.md</code></strong> loads every time, on every start. It's where you put things Claude should always remember — for example, "all documents in English."</p>

<p><strong>A skill</strong> loads only when needed. Ask for a presentation — the presentation skill kicks in. Ask to write an email — a different skill loads instead.</p>

<p>Simple rule: if Claude must always know it — put it in <code>CLAUDE.md</code>. If it's only for a specific task — build a skill.</p>

<p><strong>Together:</strong> in <code>CLAUDE.md</code> you write "follow our document formatting rules", and the rules themselves live in a skill. <code>CLAUDE.md</code> sets the direction, the skill holds the detail.</p>

<h3>Skill vs Agent</h3>

<p>A skill is knowledge or a sequence of steps. An agent is a separate worker.</p>

<p>A skill is a cheat-sheet Claude keeps in front of itself while working with you. An agent is a helper Claude dispatches to run a separate task and report back. An agent works in its own isolated context — it doesn't see your conversation.</p>

<p><strong>Example:</strong> you need a presentation with data from several sources. You can launch one agent to collect sales metrics, another to analyze customer feedback. Each works in parallel, in its own context. When the agents come back with data — Claude pulls it all into a deck using the formatting skill.</p>

<p>Skills and agents can be combined:</p>

<p><strong>1. An agent loads skills.</strong> In the agent's settings you list a <code>skills:</code> field — and the agent inherits that knowledge on launch.</p>

<p>Agent file <code>.claude/agents/presentation-maker.md</code>:</p>

<pre><code class="language-markdown">---
name: presentation-maker
description: Prepares presentations using the company rules
skills:
  - presentation-style
---

You prepare presentations. Use the formatting rules from the loaded skill.</code></pre>

<p>Now when Claude launches this agent — the agent already knows your formatting rules, even though it works in a separate context.</p>

<p><strong>2. A skill calls agents.</strong> Inside the skill's instructions you describe a process where Claude launches agents for parallel work.</p>

<p>Skill file <code>.claude/skills/create-presentation/SKILL.md</code>:</p>

<pre><code class="language-markdown">---
name: create-presentation
description: Full cycle: building a data-driven presentation
---

Create a presentation

Process:
1. Launch an agent to collect data from sheets and reports
2. Launch an agent to build charts and visuals
3. Collect the results and format the deck using the presentation-style skill</code></pre>

<p>You call <code>/create-presentation Q4 results</code> — and Claude distributes the work between agents itself.</p>

<h3>Skill vs MCP</h3>

<p>MCP connects Claude to external services — Google Sheets, Slack, databases. Without MCP, Claude simply can't reach them.</p>

<p>A skill teaches Claude <strong>how</strong> to use those services correctly.</p>

<p><strong>Example:</strong> the Google Sheets MCP gives Claude the ability to read sheets. A skill explains which sheets to open, how to format the data, and where it goes in the deck.</p>

<pre><code class="language-markdown">---
name: quarterly-report
description: Gather data for the quarterly report from Google Sheets
---

To prepare the quarterly report:

1. Open the "Sales Metrics" sheet (ID: abc123) — take data from the "Summary" tab
2. Open the "Customer Feedback" sheet (ID: xyz789) — take average scores from the "Q4" tab
3. Format everything into a presentation using the presentation-style skill</code></pre>

<p>MCP gives access to the sheets; the skill explains which sheets to open and what to do with the data.</p>

<h3>How it all fits together</h3>

<p>Every primitive owns its own job. In a real project they complement each other:</p>
<ul>
<li><strong><code>CLAUDE.md</code></strong> sets the global rules: "documents in English"</li>
<li><strong>Skill</strong> holds instructions for a specific task: how to format a presentation</li>
<li><strong>MCP</strong> connects external services: Google Sheets for data, Google Slides for the final deck</li>
<li><strong>Agent</strong> takes on part of the work: one collects data, another analyzes it — each in its own context</li>
</ul>

<hr />

<h2>Common issues</h2>

<h3>The skill doesn't show up under <code>/</code></h3>

<p>Restart Claude Code: <code>/exit</code> → <code>claude</code>. Skills load at startup.</p>

<h3>Claude ignores my skill</h3>
<ul>
<li>Check the path: the file must be exactly <code>SKILL.md</code> (uppercase) inside <code>.claude/skills/skill-name/</code>.</li>
<li>Check the YAML of the frontmatter: spaces, not tabs; colon-then-space after the key; <code>---</code> on its own lines.</li>
<li>Make sure the <code>description</code> clearly explains when to apply the skill.</li>
</ul>

<h3>YAML frontmatter error</h3>
<ul>
<li>Use <strong>spaces</strong>, not tabs.</li>
<li>Always put a space after the colon: <code>name: my-skill</code> (correct), <code>name:my-skill</code> (wrong).</li>
<li>If the value contains a colon — wrap it in quotes: <code>description: "Skill: generating presentations"</code>.</li>
</ul>

<hr />

<h2>You're set</h2>

<p>You now know how to build skills and how they differ from the other primitives in Claude Code.</p>

<p><strong>Useful links:</strong></p>
<ul>
<li>Skills documentation: <a href="https://code.claude.com/docs/en/skills" target="_blank" rel="noopener noreferrer">code.claude.com/docs/en/skills</a></li>
<li>Anthropic's full guide to building skills: <a href="https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en" target="_blank" rel="noopener noreferrer">The Complete Guide to Building Skills for Claude</a></li>
<li>Anthropic's official skills: <a href="https://github.com/anthropics/skills" target="_blank" rel="noopener noreferrer">github.com/anthropics/skills</a></li>
<li>Skills catalog: <a href="https://skills.sh/" target="_blank" rel="noopener noreferrer">skills.sh</a></li>
</ul>
`

export const guides: Guide[] = [
  {
    slug: 'skills-in-claude-code',
    title: 'Skills in Claude Code: teach Claude to work your way',
    excerpt:
      'Skills are single-file instructions Claude pulls in on its own when needed — a practical intro, frontmatter reference, and how they pair with CLAUDE.md, Agents, and MCP.',
    category: 'Claude Code',
    readTime: '10 min read',
    readMinutes: 10,
    views: 618,
    date: 'February 10, 2026',
    dateISO: '2026-02-10',
    author: 'Vahue Team',
    content: skillsInClaudeCodeContent,
  },
]

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug)
}

export function getRelatedGuides(slug: string, limit = 2): Guide[] {
  return guides.filter((guide) => guide.slug !== slug).slice(0, limit)
}
