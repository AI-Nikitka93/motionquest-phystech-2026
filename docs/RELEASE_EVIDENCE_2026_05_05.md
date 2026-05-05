# MotionQuest Release Evidence

Date: 2026-05-05  
Timezone: Europe/Minsk  
Contest-condition source checked: https://phystech-2026.devpost.com/

## Public Outcome

| Item | Evidence |
|---|---|
| Production app | https://motionquest-app.vercel.app returned HTTP 200 |
| Public source package | https://github.com/AI-Nikitka93/motionquest-phystech-2026 returned HTTP 200 |
| Raw README | https://raw.githubusercontent.com/AI-Nikitka93/motionquest-phystech-2026/master/README.md returned HTTP 200 |
| Raw app source | https://raw.githubusercontent.com/AI-Nikitka93/motionquest-phystech-2026/master/motionquest-app/src/components/MotionQuestApp.tsx returned HTTP 200 |
| GitHub repository visibility | PUBLIC, default branch `master` |
| Initial public package commit | `0aa645fd5a19eb96a08a6ed5a18ca2cbc4317265` |
| Release-evidence push commit | `cb3b84bdbb09844525200bfff2e40735690cbe18` |
| Latest production deployment recorded in state | `dpl_2qhbJ1xCbc11WD1XFPX3D8eYS479` |

## Fresh Verification Commands

Run from `motionquest-app/` on 2026-05-05:

| Command | Result |
|---|---|
| `npm run lint` | Passed, exit 0 |
| `npm test` | Passed, 14/14 tests |
| `npm run build` | Passed, Next.js production build exit 0 |
| `npm run test:e2e` | Passed, 7/7 Chromium Playwright tests |
| `rg -n "TODO\|placeholder\|insert code" src tests` | No matches, exit 1 because no matches were found |

## Live-Camera False-Positive Fix Evidence

User screenshot on 2026-05-05 showed a hand close to the camera being accepted as `Tracking: High`. The release now includes:

- A regression test proving hand-close false body geometry is rejected.
- Geometric shoulder/hip body-frame gating before high confidence, overlay drawing, readiness and Reach Stars scoring.
- Reach Stars dwell scoring disabled while the body frame is unstable.
- Corrected Reach Stars copy and HUD layout so timer and instructions do not overlap.

## Real-Camera Closeout Instrumentation

The production app now includes a `Copy live evidence` button on every camera
stage. It copies:

- timestamp and URL;
- stage and mode;
- camera/model status;
- pose confidence;
- body-frame usability verdict;
- visible joint group status;
- setup target.

This is the required text evidence for T086-T089, T092-T093, T104 and T105
alongside screenshots in `evidence/camera-smoke/`.

## Reach Stars Seated Webcam Fix

User screenshot on 2026-05-05 showed a realistic seated webcam frame where
shoulders were visible but hips/wrists were not yet visible, causing Reach Stars
to remain stuck while the timer continued.

Fix shipped:

- Reach Stars no longer requires hips.
- Reach Stars accepts shoulders plus one visible elbow/wrist pair.
- Timer pauses until usable reach pose exists.
- Target is hidden until the reach pose is usable.
- Target positions stay in upper reachable camera zones.
- E2E was rerun against production after deployment.

## Seated Adaptive Webcam Fix

User screenshot on 2026-05-05 showed a seated upper body visible while Seated
Adaptive still stayed in warning state and the 30-second timer continued to run.

Fix shipped:

- Seated Adaptive no longer requires hips.
- Seated Adaptive accepts shoulders plus one visible elbow/wrist pair.
- Seated Adaptive timer pauses until usable seated arm pose exists.
- Seated Adaptive copy now asks for one visible forearm instead of generic
  `Move into frame`.
- E2E was rerun against production after deployment `dpl_HxrY5sN9bamDrqULiJvripyVXiZP`.

## Partial Landmark Diagnostic Fix

User screenshots on 2026-05-05 showed the person visibly seated in frame, but
the UI still reported every joint group as missing because the app cleared all
landmarks whenever the pose was not yet scoreable.

Fix shipped:

- Partial upper-body landmarks stay available for the overlay and right-side
  diagnostic panel.
- Timers and scoring still require the stricter usable pose gate.
- Diagnostic visibility uses a lower threshold than scoring, so the UI can show
  what the model is starting to see without treating it as a valid measurement.
- E2E was rerun against production after deployment `dpl_EXh6hjLJVYUPRLKeZyxbLoFZBh6Q`.

## Hand Tracking Fix For Seated Webcam

User screenshots on 2026-05-05 showed MediaPipe Pose drawing false seated arm
lines in the lower empty part of the camera frame while the real hand was near
the face.

Fix shipped:

- Seated and Reach modes load MediaPipe HandLandmarker in addition to
  PoseLandmarker.
- PoseLandmarker shoulders anchor the body frame.
- HandLandmarker wrist data replaces unreliable pose-arm wrist data when a hand
  is visible.
- Seated/reach overlay no longer draws hip connections.
- Seated Adaptive counts hand raise/lower cycles instead of relying only on
  elbow-angle skeletons.
- Hand model URL returned HTTP 200 before deployment.
- E2E was rerun against production after deployment `dpl_2qhbJ1xCbc11WD1XFPX3D8eYS479`.

## MediaPipe Production Asset Checks

| Asset | Result |
|---|---|
| `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm/vision_wasm_internal.wasm` | HTTP 206 with byte-range GET |
| `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm/vision_wasm_internal.js` | HTTP 206 with byte-range GET |
| `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm/vision_wasm_module_internal.wasm` | HTTP 206 with byte-range GET |
| `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/vision_bundle.mjs` | HTTP 206 with byte-range GET |
| `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task` | HTTP 200 |
| `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task` | HTTP 200 |

## Demo Media Evidence

| Artifact | Size |
|---|---:|
| `output/devpost-screenshots/01-home-desktop.png` | 699273 bytes |
| `output/devpost-screenshots/02-seated-adaptive-stage.png` | 327287 bytes |
| `output/devpost-screenshots/03-reach-stars-stage.png` | 320557 bytes |
| `output/devpost-screenshots/04-caregiver-report.png` | 343146 bytes |
| `output/devpost-screenshots/05-home-mobile.png` | 1606667 bytes |
| `output/demo-video/motionquest-adaptive-demo.webm` | 794368 bytes |

## Devpost Rule Alignment Checked

Live Devpost page on 2026-05-05 confirms:

- Project submission deadline: June 27, 2026, 12:00pm EDT.
- Presentation registration deadline: June 27, 2026, 12:00pm EDT.
- Online presentation: June 28, 2026.
- Public link must reference the actual outcome of the work and is verified by organizers in the afternoon of June 27.
- Judging criteria: Impact, Creativity, Presentation.

## Security / Dependency Check

`npm audit --omit=dev` reports 2 moderate vulnerabilities through `next -> postcss@8.4.31`.

Action taken:

- Did not run `npm audit fix --force`.
- Reason: npm proposes a breaking downgrade to `next@9.3.3`, which would destroy the current Next.js 16 app.
- Residual risk is documented for final release review.

## Honest Open Blockers

These tasks are not closed because they need physical or future evidence:

- Physical webcam verification: T086-T089, T104, T131, T134.
- Post-camera threshold tuning: T092-T093.
- Second-browser camera permission verification: T132; only Chromium e2e is available in this environment.
- Final pre-submission checks: T143-T144, T148-T152.
- Actual Devpost submission, presentation registration and proof: T153-T155.
- Presenter rehearsals: T157-T159.
- Post-contest updates: T165-T167.
- Phase anchors T105, T147 and T168 remain open until their blocking tasks are actually closed.
