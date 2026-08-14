# Rai Ansar portfolio pilot contract

This repository is the first low-risk Acefina Portal runner pilot. Work
incrementally from the current Radiant migration; do not replace the site or
publish directly to production.

## Start here

1. Read `README.md` and inspect the current rendered pages before editing.
2. Check `git status` and preserve every user-owned change.
3. Work only in an isolated worktree created for the assigned Acefina run.
4. Keep the change bounded to the canonical work item and capture before/after
   visual evidence at desktop and phone widths.

## Hard boundaries

- `raiansar.com`, DNS, Cloudflare, the production web root, and `main` are
  immutable until Rai records named acceptance and a separate production
  approval in Acefina Portal.
- The pilot branch is `codex/acefina-portfolio-pilot`. A branch push or green
  build is preview evidence, never production approval.
- Never read, copy, commit, print, or place in agent context the ignored local
  `.env`, `.mcp.json`, `CREDENTIALS.md`, SSH material, or deployment secrets.
- Do not run the repository's rsync deployment workflow, alter GitHub secrets,
  or invoke any server, DNS, email, payment, or customer-facing action.
- Do not touch `dash.raiansar.com`, Acefina Portal production candidates,
  VisualSentinel, or another Mac Mini checkout.

## Verification

- Use the locked Node.js dependency graph with `npm ci`.
- Run `npm run build` and `npx tsc --noEmit` for every code change.
- Inspect the static `out/` preview locally; test all changed routes at desktop
  and mobile widths and check keyboard focus, reduced motion, overflow, and
  readable contrast.
- Run peerBench after the code and visual evidence are ready. Grok and MiMo are
  reviewers for the Codex implementation; reviewer output does not replace
  tests or Rai's named acceptance.
- Record the exact commit, commands, results, screenshots, and remaining risks
  in the Acefina run. Leave production unchanged.
