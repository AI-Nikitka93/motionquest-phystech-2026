# MotionQuest

MotionQuest is a client-only adaptive home movement lab for PhysTech 2026. It turns a browser camera into two short evidence-aligned movement activities and a caregiver-readable session report for older adults and seated/standing users.

Live app: https://motionquest-app.vercel.app

## What It Does

- Activity 1: Adaptive Chair Movement
  - `standing` branch counts visible sit-to-stand cycles when standing is safe.
  - `seated-adaptive` branch counts seated hand movement cycles when at least one open hand is visible.
- Activity 2: Reach Stars
  - Counts wrist-to-target hits only after a 0.5-second dwell inside the target.
- Caregiver Report
  - Stores the session in localStorage.
  - Labels `sessionMode`, `primaryMovement`, tracking confidence, limitations and export text.

## What It Does Not Claim

- No medical diagnosis.
- No fall-risk prediction.
- No clinical validation for this browser release.
- No video upload, backend, database, account or authentication.

## Local Commands

```bash
npm run project:readiness
npm run dev -- --port 3001
npm run lint
npm test
npm run build
npm audit --audit-level=moderate
E2E_APP_URL=http://localhost:3013 npm run test:e2e
npm run project:final-audit
npm run project:final-audit -- --public-smoke
npm run project:capture-public-proof -- --dry-run
```

## Implementation Notes

- Next.js App Router, React, Tailwind CSS.
- MediaPipe Tasks Vision runs Pose and Hand Landmarker paths in the browser through `@mediapipe/tasks-vision`.
- WASM/model assets are loaded from version-pinned public CDNs.
- The app draws only task-relevant signals instead of all 33 MediaPipe pose landmarks.
- The overlay requires usable landmark sets before drawing or counting movement, to avoid single-limb noise.

## Remaining Real-World Check

The code path is verified through unit tests, build and production Playwright tests. `npm run project:final-audit` separates local package readiness from public submission readiness. Final threshold tuning still needs a physical webcam run with real lighting, chair position and seated/standing framing evidence.
