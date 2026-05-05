# Project Map

## Goal
Build a PhysTech 2026 hackathon submission that can compete on Impact, Creativity and Presentation.

## Current Product Direction
MotionQuest: a browser-based webcam exergame for older adults and seated/standing users, using research-aligned functional movement tasks.

## Core Scope
- 2 activities: Adaptive Chair Movement and Reach Stars.
- Adaptive Chair Movement has two branches: standing sit-to-stand and seated-adaptive upper-body movement.
- 1 Caregiver Report screen.
- Client-only web app.

## Dependencies
- Hackathon rules: `УСЛОВИЯ.txt`.
- Research evidence: `research-synthesis-MotionQuest.md`.
- Adaptive seated research refresh: `docs/ADAPTIVE_SEATED_METRICS_RESEARCH_2026_05_05.md`.
- MVP plan: `docs/mvp-plan.md`.
- Visual spec: `docs/visual-spec.md`.
- Conditions action checklist: `docs/CONDITIONS_GAP_ACTION_CHECKLIST.md`.
- Phase 1 T011-T020 results: `docs/PHASE1_T011_T020_RESULTS.md`.
- Claims and limits: `docs/JUDGING_CLAIMS_AND_LIMITS.md`.
- Submission package plan: `docs/SUBMISSION_PACKAGE_PLAN.md`.
- Phase 1 anchor review: `docs/PHASE1_T021_REVIEW.md`.
- Phase 2 research layer results: `docs/PHASE2_T022_T030_RESULTS.md`.
- Phase 2 research copy and audit: `docs/PHASE2_T031_T040_RESULTS.md`.
- Public research copy: `docs/RESEARCH_LAYER_PUBLIC_COPY.md`.
- Research evidence trace: `docs/RESEARCH_EVIDENCE_TRACE_T022_T030.md`.
- Research artifact index: `docs/RESEARCH_ARTIFACT_INDEX.md`.
- Phase 2 anchor review: `docs/PHASE2_T042_REVIEW.md`.
- Phase 3 T043-T050 results: `docs/PHASE3_T043_T050_RESULTS.md`.
- Phase 3 T051-T060 results: `docs/PHASE3_T051_T060_RESULTS.md`.
- Phase 3 T061-T063 review: `docs/PHASE3_T061_T063_REVIEW.md`.
- Phase 4 visual QA T064-T070: `docs/PHASE4_T064_T070_VISUAL_QA.md`.
- Phase 4 accessibility/trust QA T071-T080: `docs/PHASE4_T071_T080_ACCESSIBILITY_TRUST_QA.md`.
- Phase 4 final visual review T081-T084: `docs/PHASE4_T081_T084_FINAL_VISUAL_REVIEW.md`.
- Phase 5 camera readiness T085-T090: `docs/PHASE5_T085_T090_CAMERA_READINESS.md`.
- Phase 5 report outcome T091-T100: `docs/PHASE5_T091_T100_RESULTS.md`.
- Phase 5 recovery/privacy T101-T104: `docs/PHASE5_T101_T104_RESULTS.md`.
- Camera smoke protocol: `docs/CAMERA_SMOKE_TEST_PROTOCOL.md`.
- Visual screenshots: `output/playwright/motionquest-home-desktop-t061-t070.png`, `output/playwright/motionquest-home-mobile-t061-t070.png`.
- Visual screenshots T071-T080: `output/playwright/motionquest-home-desktop-t071-t080.png`, `output/playwright/motionquest-home-mobile-t071-t080.png`, `output/playwright/motionquest-report-desktop-t071-t080.png`.
- Devpost/README screenshots: `output/devpost-screenshots/01-home-desktop.png`, `output/devpost-screenshots/02-home-mobile.png`, `output/devpost-screenshots/03-safe-demo-report-desktop.png`.
- Visual screenshots T081-T090: `output/playwright/motionquest-home-desktop-t081-t090.png`, `output/playwright/motionquest-home-mobile-t081-t090.png`, `output/playwright/motionquest-safe-demo-report-desktop-t081-t090.png`.
- Real camera evidence target folder: `evidence/camera-smoke/`; checklist: `evidence/camera-smoke/README.md`.
- Evidence panel content: `docs/EVIDENCE_PANEL_CONTENT.md`.
- Caregiver interpretation copy: `docs/CAREGIVER_INTERPRETATION_COPY.md`.
- Research overclaim audit: `docs/RESEARCH_OVERCLAIM_AUDIT.md`.
- Implementation: `motionquest-app/`.

## Implementation Structure
- `motionquest-app/src/app/` - Next.js App Router entrypoint.
- `motionquest-app/src/components/` - MotionQuest screens and camera stage.
- `motionquest-app/src/hooks/usePoseTracking.ts` - webcam and MediaPipe Pose integration.
- `motionquest-app/src/lib/gameLogic.ts` - pure Adaptive Chair Movement / Reach Stars heuristics.
- `motionquest-app/src/lib/sessionStorage.ts` - localStorage session persistence.
- `motionquest-app/tailwind.config.ts` - visual tokens from `docs/visual-spec.md`.

## Deployment
- Host: Vercel.
- Production URL: `https://motionquest-app.vercel.app`.
- Deployment id: `dpl_HxrY5sN9bamDrqULiJvripyVXiZP`.
- Public source package: `https://github.com/AI-Nikitka93/motionquest-phystech-2026`.
- Vercel local project metadata is in `motionquest-app/.vercel/` and ignored by `.gitignore`.

## Risks
- Browser pose tracking calibration may be fragile.
- Pose overlay now rejects single-limb/partial-body noise and supports seated upper-body tracking without requiring hips for seated-adaptive/reach branches, but real-room camera distance, lighting and framing still need physical smoke testing.
- Webcam permission and lighting can break live demo.
- Clinical claims must stay conservative.
- Dev server uses port `3001` in this workspace because `3000` was already occupied during verification.
- Public source/storage package and demo media are created; real webcam evidence and final Devpost submission remain future blockers.
- T086-T089 cannot be fully closed in this environment until a real physical webcam or real camera evidence is available; seated-adaptive mode is implemented and deployed but still needs user-side live-camera tuning evidence.
