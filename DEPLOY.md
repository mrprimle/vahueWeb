# Deployment Guide (for the AI agent)

This project is deployed to **Vercel** via a dedicated GitHub mirror remote. Vercel is connected to that mirror repo and auto-deploys on every push to `main`.

## Remotes

- `origin` → `https://github.com/mrprimle/vahueWeb.git` (source of truth, NOT connected to Vercel)
- `vercel` → `https://github.com/mrprimle/vahuevercel.git` (connected to the Vercel project, pushing here triggers a deploy)

## Deploy Procedure

When the user says "deploy" / "deploy to vercel" / "ship it" / similar, run these steps in order. Do NOT ask for confirmation unless something is wrong.

### 1. Verify clean working tree

```bash
git status
```

- If there are uncommitted changes, stop and ask the user whether to commit them first. Do not commit on your own unless explicitly asked.
- If the tree is clean, continue.

### 2. Confirm we're on `main` and up to date with `origin`

```bash
git rev-parse --abbrev-ref HEAD
git fetch origin
git log --oneline origin/main..HEAD
git log --oneline HEAD..origin/main
```

- Must be on branch `main`. If not, stop and ask.
- If `origin/main` has commits we don't have locally, pull first: `git pull --ff-only origin main`.

### 3. Verify the production build

```bash
npm run build
```

- This is a Next.js static export (`output: 'export'` in `next.config.js`).
- If the build fails, stop. Report the error and fix it before deploying.
- Expected: build completes with "✓ Compiled successfully" and a route table.

### 4. Push to the `vercel` remote

```bash
git push vercel main
```

- This is the step that triggers the Vercel deployment.
- Requires `git_write` permission when using the Shell tool in sandbox.
- If the push is rejected as non-fast-forward (rare), check with the user before force-pushing. Never force-push without explicit permission.

### 5. Report back

Tell the user:
- The commit SHA range that was pushed (from `git push` output, e.g. `9a917b1..58acd61`).
- Which commit(s) are now being deployed (short `git log` summary).
- That they should check the Vercel dashboard for build status.

## One-liner (when everything is known-good)

```bash
git status && npm run build && git push vercel main
```

Only use this if the previous checks all pass. Prefer the step-by-step flow so failures surface cleanly.

## Notes / Gotchas

- `next.config.js` uses `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`. Do not change these when preparing a deploy.
- There is no `vercel.json` and no Vercel CLI installed locally — the deployment is entirely GitHub-integration-driven. Do not run `vercel` CLI commands; they will fail.
- Do not push `origin` as part of the deploy flow unless the user asks. `origin` is the source repo, `vercel` is the deploy mirror.
- If the user asks to deploy but there are unpushed commits on `origin`, it's usually fine to also push to `origin` — but ask first if unsure.
- Environment variables (if any are ever added) are configured in the Vercel dashboard, not in this repo.
