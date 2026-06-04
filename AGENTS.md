# PhysTech 2026 Project Notes

Purpose: prepare a winning PhysTech 2026 hackathon project around physical activity technology.

Current selected direction: MotionQuest - webcam exergame for older-adult functional movement.

Key artifacts:
- `УСЛОВИЯ.txt` - local copy of hackathon rules.
- `IDEA_DISCOVERY_REPORT_2026-05-04.md` - idea discovery and TOP-3.
- `research-synthesis-MotionQuest.md` - scholarly basis for MotionQuest.
- `docs/mvp-plan.md` - MVP scope plan.
- `docs/visual-spec.md` - MotionQuest visual language and screen spec.
- `motionquest-app/` - Next.js client-only MotionQuest implementation.

Project memory:
- `docs/STATE.md`
- `docs/EXEC_PLAN.md`
- `docs/PROJECT_HISTORY.md`
- `docs/DECISIONS.md`
- `docs/PROJECT_MAP.md`

Current implementation rule: no backend, no database, no auth for MVP unless a later decision explicitly changes this.

Future-agent startup order:
1. Read this `AGENTS.md`.
2. Read `docs/STATE.md`, `docs/EXEC_PLAN.md`, `docs/PROJECT_MAP.md`, `docs/MOTIONQUEST_WORLD_CLASS_MASTER_BRIEF.md`, and `docs/MOTIONQUEST_FULL_RELEASE_MASTER_TODO_2026_05_06.md`.
3. Recheck current PhysTech contest conditions before changing claims, deadlines, awards, Devpost/Discord instructions, public links, or submission wording.
4. Inspect the owning source file before editing; do not rely on TODO text alone.

Build/readiness guardrails:
- Run `npm run project:readiness` from `motionquest-app/` before closing project-structure, agent-workflow, release, or public-package TODOs.
- Use `rg` / `rg --files` for unknown exploration before broad file reads.
- For known identifiers, UI copy, test names, TODO IDs, env names, or exact error strings, preserve exact string search first.
- Before shared changes to report, activity, camera, tracking, storage, submission, or public-claim logic, check the impacted unit tests, e2e flow, report export text, and visible user copy.
- No secrets in chat, docs, source, screenshots, or copied evidence. Use existing auth, environment variables, or local credential stores; never print or commit tokens.

No-secret workflow rule:
- Do not paste, print, screenshot, export, or commit tokens, API keys, cookies, Vercel credentials, GitHub tokens, OAuth codes, `.env*` contents, local credential-store output, or browser storage secrets.
- Use existing authenticated CLIs, environment variables, Vercel dashboard storage, or local OS credential stores. If a key is genuinely needed, ask for the exact secret name and storage location, not the secret value in chat.
- If a credential may have been exposed, stop using it, rotate it before invalidating the old value, redeploy affected environments, and weaken any release claim until the replacement is verified.

Codebase impact checklist:
- Report/export changes: check `src/lib/sessionStorage.ts`, report UI copy, downloadable text, fallback labeling, and `tests/e2e/motionquest-flow.spec.ts`.
- Activity/game changes: check `src/lib/gameLogic.ts`, `src/lib/gameLogic.test.ts`, `CameraStage.tsx`, scoring gates, timer behavior, and mode-specific confidence text.
- Camera/tracking changes: check `src/hooks/usePoseTracking.ts`, `src/hooks/usePoseTracking.test.ts`, `src/lib/cameraRecovery.ts`, no-camera recovery, in-app browser console, and real-camera evidence requirements.
- Submission/public-copy changes: check `docs/JUDGING_CLAIMS_AND_LIMITS.md`, `docs/DEVPOST_SUBMISSION_COPY.md`, `docs/PRESENTATION_SCRIPT.md`, `docs/PROJECT_MAP.md`, and visible app copy for overclaims.

Dependency audit checklist:
- Runtime dependencies must stay limited to the client app: `next`, `react`, `react-dom`, and `@mediapipe/tasks-vision`.
- Dev dependencies must support TypeScript, linting, Tailwind, Playwright, and tests only.
- Before adding a package, record why it is necessary for the product outcome, whether it touches browser camera/storage/network, and why existing code or platform APIs are insufficient.
- Run `npm audit --audit-level=moderate` after dependency changes. Treat `npm audit` as a known-vulnerability gate, not as proof that the supply chain is fully safe.

Agent handoff checklist:
- Start from `AGENTS.md`, `docs/STATE.md`, `docs/EXEC_PLAN.md`, `docs/PROJECT_MAP.md`, the world-class master brief, and the full-release TODO.
- Keep product, design, build, QA, launch, and evidence claims synchronized in the same turn as the code change.
- Do not mark human-camera, Devpost, Discord, rehearsal, or post-contest tasks complete without real external evidence.

Verification contract:
- Required local checks before closing app/workflow TODOs: `npm run project:readiness`, `npm test`, `npm run lint`, `npm run build`, `npm audit --audit-level=moderate`, and `E2E_APP_URL=http://localhost:3013 npm run test:e2e`.
- Human-camera evidence is separate from automated tests: screenshots, copied live evidence, and notes must go under `evidence/camera-smoke/` when real presenter-side camera proof is available.
- Automated safe-demo and fake-camera tests do not close real physical-camera evidence TODOs.

Camera limitation notes:
- Close laptop webcams can make body landmarks unreliable; seated/reach paths intentionally use visible hand tracking.
- Standing mode still needs a usable full-body frame and must pause scoring if full-body tracking is not usable.
- Lighting, camera height, background contrast, browser permission state, and physical room space remain user-side setup constraints.

Branch and change hygiene:
- Do not rewrite unrelated docs/code while closing a narrow TODO.
- Do not silently change sample data, public claims, scoring semantics, or fallback labels.
- Do not weaken safety/privacy wording to make screenshots look cleaner.
- Preserve existing user changes and treat dirty worktree files as owned by the user unless the current task requires touching them.

Release evidence structure:
- Devpost/public screenshots live in `output/devpost-screenshots/` with numbered filenames.
- Demo video lives in `output/demo-video/`.
- Playwright verification screenshots live in `output/playwright/`.
- Real presenter-side camera proof lives in `evidence/camera-smoke/` and must include screenshots plus copied live evidence text.

Tooling decisions:
- Do not install third-party AI skills automatically for this project unless a later decision names the exact skill and why it is needed.
- `autoskills --dry-run` on 2026-05-06 detected React, Next.js, Tailwind CSS, TypeScript, Playwright, Vercel, and Node.js skills, but no installation was needed because the active Codex/Vercel/Playwright skills already cover the current client-only scope.
- Do not add external codebase-indexing services for the current app size. Prefer local `rg`, existing project memory, tests, and targeted file reads unless the codebase becomes too large for reliable local navigation.

MotionQuest app commands:
- `cd motionquest-app`
- `npm run dev -- --port 3001`
- `npm run project:readiness`
- `npm run build`
- `npm test`
- `npm run lint`
- `E2E_APP_URL=http://localhost:3013 npm run test:e2e`
- `npm run project:final-audit`

Production URL:
- `https://motionquest-app.vercel.app`
