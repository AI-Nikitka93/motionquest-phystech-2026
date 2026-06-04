# Decisions

## 2026-05-04 - MotionQuest MVP must be client-only

Decision: Build MotionQuest as a browser-only MVP with no backend, no auth and no database.

Reason: The hackathon prototype must be feasible for one person in 24-48 hours and reliable in a 10-minute presentation.

Rejected:
- Backend API: not needed for demo evidence.
- Database: localStorage is enough for one session.
- Authentication: adds failure surface without helping the judging criteria.
- Leaderboards/social feed: outside research-backed MVP scope.

## 2026-05-04 - MotionQuest visual language is warm kinetic trust

Decision: Use a warm, high-contrast, camera-first exergame visual system instead of a clinical blue/white health dashboard.

Reason: The target audience is 65+, so readability and clear affordances are mandatory; the hackathon demo also needs to feel active and confidence-building rather than medical or sterile.

Rejected:
- Sterile hospital palette: weakens exergame positioning.
- Raw full MediaPipe skeleton: looks technical and cognitively noisy.
- Small icon-only controls: risky for older adults and live demo reliability.
- Decorative glassmorphism: reduces readability over webcam video.

## 2026-05-05 - MotionQuest implementation uses client-only MediaPipe Tasks

Decision: Implement pose tracking with `@mediapipe/tasks-vision` loaded dynamically in a client hook, using the official lite pose landmarker model URL and CDN wasm assets.

Reason: This keeps Next.js build safe, avoids backend/API scope, and preserves the hackathon requirement that the webcam proves the concept in-browser.

Rejected:
- Backend pose processing: violates MVP constraint and adds demo failure surface.
- Three.js/R3F avatar: outside the 24-48h implementation scope.
- Drawing all 33 pose points: too noisy for older adults and inconsistent with visual spec.
- Server-side model initialization: incompatible with webcam-only client flow.

## 2026-05-05 - Deploy MotionQuest to Vercel with CDN-hosted MediaPipe assets

Decision: Keep MediaPipe wasm assets on version-pinned jsDelivr CDN and deploy the client-only Next.js app to Vercel production.

Reason: HTTPS is required for camera permissions, Vercel is the lowest-friction host for this Next.js prototype, and CDN-hosted MediaPipe wasm avoids fragile Vercel static-copy paths.

Rejected:
- VPS/Docker: unnecessary for static/client-only Next.js.
- Copying wasm into `public/`: more moving parts than a version-pinned CDN path already returning 200.
- Backend proxy for model assets: violates MVP deployment scope.

## 2026-05-05 - MotionQuest judging claims are constrained

Decision: MotionQuest will prove exactly three judging claims in Phase 1: accessibility, research alignment and caregiver-readable outcome.

Reason: These claims map directly to PhysTech Impact, Creativity, Presentation, Research and Social Impact without turning the prototype into an unsupported medical product.

Rejected:
- Medical diagnosis: unsupported and outside hackathon prototype scope.
- Fall prediction: unsafe overclaim from one webcam session.
- Clinical validation: no clinical study has been run for this specific app.

## 2026-05-05 - Safe demo data must be visibly labeled

Decision: Any fallback/demo numbers shown without a live webcam must be labeled as `Demo fallback` in metric cards and exported report text.

Reason: Devpost and judge screenshots need to show the product artifact without pretending that synthetic fallback values are live measurements.

Rejected:
- Showing fallback numbers as `Measured`: creates trust risk.
- Hiding the fallback label in small copy only: too easy to miss during presentation.
- Claiming real camera smoke tests without a physical webcam: false completion.

## 2026-05-05 - Chair Stand becomes Adaptive Chair Movement

Decision: Replace the mandatory first-game framing `Chair Stand` with `Adaptive Chair Movement`, with two explicit user-selected branches: `standing` and `seated-adaptive`.

Reason: Current research and user feedback showed that a standing-only flow excludes participants who cannot safely stand and makes the app look unrealistic for disability-inclusive physical activity. The MVP still keeps exactly two activities by making seated support a branch of Activity 1, not a third game.

Rejected:
- Training a custom body model during the hackathon: not feasible and not needed because MediaPipe already provides useful browser landmarks.
- Inferring disability or wheelchair status automatically: unsafe and unsupported.
- Keeping seated mode as a hidden fallback: weakens inclusion and makes the report less honest.
- Adding a third activity: breaks the intentionally small MVP scope.

## 2026-05-05 - TODO closure requires evidence, not checkbox completion

Decision: Close only TODO items backed by source files, public links, tests, screenshots, demo media, deployment status or live contest-rule verification.

Reason: The remaining open items depend on physical webcam behavior, final Devpost/Discord timing, presenter rehearsal, or post-contest outcomes. Marking those done on 2026-05-05 would create fake confidence and weaken the submission.

Rejected:
- Marking physical camera tasks as complete from Playwright fallback flow.
- Treating safe demo data as real measured evidence.
- Marking Devpost submission and presentation registration complete before those forms are actually submitted.
- Closing post-contest tasks before presentation/results/book invitation exist.

## 2026-05-05 - MotionQuest becomes an adaptive home movement lab

Decision: Use `MotionQuest: Adaptive Home Movement Lab` as the recommended product framing, with caregiver-readable report as the main outcome and seated users as a first-class audience.

Reason: The official PhysTech criteria reward Impact, Creativity and Presentation, and the current project is strongest when it proves inclusive physical activity, conservative research alignment and clear human communication rather than raw camera tracking novelty.

Rejected:
- Positioning MotionQuest as a generic webcam mini-game: too toy-like and weak against judging criteria.
- Positioning MotionQuest as a clinical assessment: unsupported and unsafe.
- Positioning MotionQuest as only a caregiver report tool: hides the physical activity experience that makes the demo compelling.
- Adding broad social or community features as the first answer: dilutes the core contest story before the first release is credible.

## 2026-05-06 - Submission story targets Research, Social Impact and Entrepreneurship

Decision: Extend the MotionQuest master brief with one coherent three-award story: Research through evidence and confidence limits, Social Impact through seated inclusion and caregiver communication, and Entrepreneurship through caregiver/community wellness paths.

Reason: The official contest page lists Research, Social Impact and Entrepreneurship awards, all with book-chapter invitations, and MotionQuest can support all three without changing the core product promise.

Rejected:
- A single Research-only story: underuses the caregiver and community product potential.
- Entrepreneurship based on unverified TAM, pricing or revenue claims: would create fake business certainty.
- Numeric lower-landmark loss claims without project validation or a cited exact source: unacceptable evidence risk.
- "First in the world" positioning: not verified by competitor audit.

## 2026-05-06 - Build enablement uses local checks before extra agent tooling

Decision: Add a local `npm run project:readiness` check and keep MotionQuest on existing Codex/Vercel/Playwright/browser tooling instead of installing third-party AI skill bundles or external codebase indexers now.

Reason: A current autoskills dry-run detected relevant React, Next.js, Tailwind CSS, TypeScript, Playwright, Vercel and Node.js skills, but the active project is still a small client-only Next.js app with enough local tests and searchable structure. Extra installs would add supply-chain and maintenance surface without solving a current MotionQuest blocker.

Rejected:
- Installing all autoskills recommendations: includes broad Node/backend guidance that is not needed for the no-backend MVP.
- Using external codebase-indexing services now: unnecessary for the current repository size and adds privacy/indexing policy review work.
- Relying on documentation-only readiness: project structure, scripts, no-backend boundary and token hygiene now have an executable check.

## 2026-05-07 - Phase 7 workflow rules are executable gates

Decision: Treat Phase 7 handoff, secret handling, dependency scope, artifact ownership and verification rules as executable readiness contracts, not only prose.

Reason: Future agents must be able to continue the project without rediscovering context or silently changing claims, sample data, camera behavior or evidence boundaries. `project-readiness` now checks required instruction contracts, dependency allowlists, release artifacts and token-like patterns.

Rejected:
- Depending only on markdown checklists: too easy to drift from the actual app and artifact package.
- Adding CI/deployment services during the MVP without a current blocker: increases setup surface before final public submission work.
- Treating automated browser tests as a substitute for physical webcam evidence: creates fake confidence for the main live-demo risk.

## 2026-06-04 - Dependency security gates stay inside the client-only stack

Decision: Update `next` and `eslint-config-next` from `16.2.4` to `16.2.7`, then refresh the lockfile with non-forced `npm audit fix`.

Reason: `npm audit --audit-level=moderate` found high-severity Next.js advisories and one moderate transitive `brace-expansion` advisory. The fix keeps the existing allowed dependency surface, adds no backend/auth/database code, and restores the project dependency gate to 0 known moderate-or-higher audit vulnerabilities.

Rejected:
- Ignoring the audit failure: would violate the release verification contract.
- Running `npm audit fix --force`: unnecessary after `16.2.7` was available and would risk larger dependency drift.
- Adding new runtime packages to work around audit warnings: outside the no-backend, tightly scoped MVP dependency policy.
- Deploying the updated package automatically: production redeploy is a public action and still needs explicit approval.
