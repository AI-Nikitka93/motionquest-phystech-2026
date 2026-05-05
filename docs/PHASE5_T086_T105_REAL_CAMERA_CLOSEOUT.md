# Phase 5 Real Camera Closeout Package

Date: 2026-05-05  
Production URL: https://motionquest-app.vercel.app  
Latest deployment: `dpl_BcT6QQDRShkgSxosRLaS4CtE4W1o`

## Status

The engineering side for T086-T105 is ready, but the physical evidence tasks
remain open until a real camera run is captured from the presenter environment.

This is intentional. T086, T087, T088, T089, T104 and T105 cannot be honestly
closed from a headless agent environment. The app now contains the evidence
capture surface needed to close them quickly after a real run.

## Implemented For This Closeout

- Added `Copy live evidence` to every camera stage.
- Evidence text includes timestamp, URL, stage, mode, camera state, pose
  confidence, body-frame usability, visible joint groups and current status.
- Added body geometry validation so a close hand cannot pass as a usable body
  frame.
- Disabled Reach Stars scoring while body-frame usability is false.
- Added explicit setup instruction in the evidence text: camera 1.8-2.4 m away,
  waist/chest height, front light, shoulders/hips visible, hands away from lens.
- Updated `docs/CAMERA_SMOKE_TEST_PROTOCOL.md` with pass/fail criteria.
- Updated `evidence/camera-smoke/README.md` with required files and copied
  evidence requirement.

## T086-T105 Closure Gate

| TODO | Closure evidence required |
|---|---|
| T086 Home calibration | `home-calibration.png` plus copied evidence with `cameraActive: yes`, `bodyFrameUsable: yes`, no error. |
| T087 Standing branch | `chair-stand-tracking.png` plus copied evidence and visible rep change after sit-to-stand-return. |
| T088 Reach Stars | `reach-stars-tracking.png` plus copied evidence and visible star hit after 0.5 sec wrist hold. |
| T089 Working setup | `live-evidence.txt` must include distance, lighting and chair placement used in the successful run. |
| T092 Standing thresholds | Three slow standing cycles pass without false reps. |
| T093 Reach hit detection | No hit when body frame is unstable; one hit after 0.5 sec wrist hold in target. |
| T104 End-to-end | Home -> standing branch -> Reach Stars -> Caregiver Report completed with a real camera. |
| T105 Phase anchor | Close only after all above evidence files exist and no clinical overclaim was introduced. |

## Exact Demo Setup To Try First

- Camera distance: 1.8-2.4 m.
- Camera height: waist to chest height.
- Lighting: front or side light; avoid bright window behind the user.
- Standing branch: stable chair centered, shoulders/hips/knees visible before start.
- Reach Stars: sit or stand farther back; keep shoulders, hips, elbows and wrists visible.
- Hands: do not bring palm close to lens; keep hands at least 35-50 cm away from camera.
- Clothing/background: avoid dark clothes on dark background.

## Verification Already Completed

Commands run after implementation:

- `npm run lint` passed.
- `npm test` passed, 12/12.
- `npm run build` passed.
- `npm run test:e2e` passed, 7/7.
- Production deploy completed and alias `https://motionquest-app.vercel.app` updated.
