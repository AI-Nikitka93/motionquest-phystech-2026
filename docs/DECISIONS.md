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
