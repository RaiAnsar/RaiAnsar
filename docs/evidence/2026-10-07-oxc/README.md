# Oxc migration evidence — 2026-10-07

Worktree: `/Users/rai/Desktop/Work/Projects/Vibe/raiansar-nextjs-oxc`.
Branch: `codex/oxc-toolchain`, based on
`origin/codex/acefina-portfolio-pilot` at
`efc2c5ea18ca323458dfd7c42b4f9e7be9ce81b4`.
Approval: Rai approved the migration in chat, “Okay on Raiansar”.

## Commits

- `4406bff`: replace lint/format dependencies and configs, add preview CI and
  verification docs, fix the testimonial render-time ref read.
- `015c1d76b20952d35dd33922ba6a7c4ecc4b62fc`: Oxfmt formatting only;
  recorded in `.git-blame-ignore-revs` by the subsequent evidence commit.
- The evidence commit contains this report, screenshots, lint diagnostics,
  comparison results, and the blame-ignore entry. Its exact SHA is available
  from `git log -1` after the evidence commit.

All commit messages end with
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Migration and lint findings

Standalone `oxlint@1.87.0` and `oxfmt@0.72.0` are pinned in the lockfile.
Scripts are `lint: oxlint`, `format: oxfmt`, and
`format:check: oxfmt --check`. The old lint/format dependencies and their
config files are removed; none remain in the locked dependency graph.

The first `npx oxfmt --migrate=prettier` attempt failed on the duplicate
`prettier.config.js`: it used CommonJS `module.exports` in an ESM package.
After removing that duplicate, the same command successfully migrated
`prettier.config.mjs`. Single quotes, no semicolons, 80 columns, and Tailwind
stylesheet sorting are preserved. `clsx` sorting is retained from the other
legacy config. The migration reports that the import-organizing plugin is
unsupported; equivalent import organization is not enabled.

Oxlint initially reported **13 errors, 0 warnings** on the unchanged source
with the new configuration. The final result is **0 errors, 0 warnings**,
exit 0, using 186 rules. Full diagnostics are in `oxlint-before.json` and
`oxlint-after.json`.

- Real bug: `useSpring(computeOpacity(), ...)` read the testimonial card's
  DOM ref during render. Initialize the spring to `1`; its existing layout
  effect and scroll event measure the mounted element. The testimonial
  selection button was exercised in Chrome; the active state settled on
  Joy Mallard after the smooth scroll.
- False positive: the server footer's current year is intentionally evaluated
  per render/build. A reasoned `react/purity` suppression retains that behavior.
  No clock value is hoisted to module scope.
- Eleven image advisories recommend Next image optimization. This site uses
  `output: 'export'` and `images.unoptimized: true`, so there is no image
  optimizer at runtime. Each image site has a reasoned, local JSX suppression
  for `nextjs/no-img-element`; source paths and CSS sizing remain intact.
  The rule remains enabled for new code. No broad rule downgrade is used.

## Local verification

All checks below completed successfully on the migrated dependency graph:

| Command | Result |
| --- | --- |
| `npm ci --cache /private/tmp/raiansar-oxc-npm-cache` | Exit 0; locked graph installed |
| `npm run build` | Exit 0; Next 16.1.6 static export produced `out/` |
| `npx tsc --noEmit` | Exit 0 |
| `npm run lint` | Exit 0; no findings |
| `npm run format:check` | Exit 0; all 37 matched files formatted |
| `git diff --check` | Exit 0 |
| `npx oxlint --version` | 1.87.0 |
| `npx oxfmt --version` | 0.72.0 |

Local runtime: Node 26.8.1, npm 11.19.0. The preview workflow uses Node 22
and runs install, lint, formatting, build, and typecheck on the pilot and Oxc
branches. The existing main-only deployment workflow is unchanged and was
never invoked.

The baseline also passed install, build, and typecheck. Both pre-format and
post-format migrated builds passed. The installed graph's npm audit summary
has 6 vulnerabilities (1 moderate, 4 high, 1 critical), down from the baseline's
16 after removing the old tooling. Runtime dependency upgrades are outside
this migration; no automatic audit fix was applied.

## Browser evidence

Served `out/` using:

```sh
python3 -m http.server 3837 --bind 127.0.0.1 --directory out
```

Chrome's existing browser connection was used at viewport sizes 1280×900 and
390×900. Baseline screenshots were captured before source edits. After
screenshots were captured after the formatting commit and final build.
These are full-page JPEGs; the browser's capture excludes the 15px scrollbar
and can reflow content during full-page capture. The recorded DOM measurements
use the requested viewport width.

| Route | Desktop before / after | Phone before / after |
| --- | --- | --- |
| Home | [before](before-home-1280.jpg) / [after](after-home-1280.jpg) | [before](before-home-390.jpg) / [after](after-home-390.jpg) |
| About | [before](before-about-1280.jpg) / [after](after-about-1280.jpg) | [before](before-about-390.jpg) / [after](after-about-390.jpg) |
| Contact | [before](before-contact-1280.jpg) / [after](after-contact-1280.jpg) | [before](before-contact-390.jpg) / [after](after-contact-390.jpg) |

Additional evidence: `pre-format-home-1280.jpg`,
`after-home-1280-viewport.jpg`, `after-reviews-{1280,390}.jpg`, and
`after-thank-you-{1280,390}.jpg`.

Results:

- Heading text, positions, widths, heights, and document dimensions match
  across all six baseline/after route-width pairs. See `before-layout.json`,
  `after-layout.json`, and `visual-comparison.json`.
- Pre/post-format generated CSS is byte-identical. See `css-comparison.json`.
- About at both widths and contact at 390 have pixel-identical JPEG captures.
  Contact at 1280 has only JPEG rounding differences, at most 2/255 per channel.
  Home differences are in animated content and the testimonial edge opacity;
  page geometry and styles match. No formatting or class-sorting regression
  was observed. Animated home captures are not claimed to be pixel-identical.
- No horizontal document overflow or broken images on any of the five routes
  at either width. Reviews and thank-you were additionally inspected because
  they share the footer; see `additional-route-checks.json`.
- Primary content and buttons remain readable. The home link receives a
  visible keyboard focus outline. The phone menu expands, and Tab moves to
  About with a visible focus outline. No contact form was submitted.
- Browser logs showed only the existing Ahrefs localhost warning; no app
  console errors were observed during these checks.
- Reduced-motion emulation remains unverified: browser approval review denied
  the raw CDP `Emulation.setEmulatedMedia` action. No alternative mechanism was
  used to bypass that denial. The temporary viewport override was reset.

## peerBench and remaining work

Ran peerBench after the code and visual evidence were ready, using an isolated
temporary panel selecting the required Grok and MiMo reviewers:

```sh
BENCH_ROOT=/private/tmp/raiansar-oxc-bench \
BENCH_SESSION_ID="${CODEX_SESSION_ID:-${BENCH_SESSION_ID:-}}" \
node /Users/rai/.codex/plugins/cache/aiwithrai/bench/0.5.0/scripts/bench-runner.mjs \
review --json --strict --base origin/codex/acefina-portfolio-pilot
```

Exit 1, **unreviewed**: Grok reported
`sandbox-exec: sandbox_apply: Operation not permitted`; MiMo reported
`authentication failed on this run — no API key`. Full output is in
`peerbench.json`. The configured default panel was Grok/Gemini; it was not
changed globally. Credentials were not inspected or copied to the isolated
panel. This is a missing review, not an approval or a code finding.

Rerun in an authorized terminal with the project's configured Grok/MiMo panel:

```sh
cd /Users/rai/Desktop/Work/Projects/Vibe/raiansar-nextjs-oxc
BENCH_SESSION_ID="${CODEX_SESSION_ID:-${BENCH_SESSION_ID:-}}" \
node /Users/rai/.codex/plugins/cache/aiwithrai/bench/0.5.0/scripts/bench-runner.mjs \
review --json --strict --base origin/codex/acefina-portfolio-pilot
```

Attach this evidence and the final commit SHA to the named Acefina run. No run
identifier or connected Acefina recorder was supplied in this session.
Named acceptance and separate production approval remain with Rai in Acefina
Portal. Main, production, DNS, and Cloudflare remain untouched. The original
checkout still has only its user-owned uncommitted `.gitignore` change.
