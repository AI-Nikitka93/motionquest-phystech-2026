# Camera Smoke Test Protocol

Production URL: `https://motionquest-app.vercel.app`

## Evidence Folder

Place real test screenshots or short captures here:

- `evidence/camera-smoke/home-calibration.png`
- `evidence/camera-smoke/chair-stand-tracking.png`
- `evidence/camera-smoke/reach-stars-tracking.png`
- `evidence/camera-smoke/caregiver-report.png`
- `evidence/camera-smoke/live-evidence.txt`
- `evidence/camera-smoke/README.md` contains the exact evidence checklist.

Each camera stage now has a `Copy live evidence` button. Press it after every
stage and paste the text into `live-evidence.txt`. A pass requires:

- `cameraActive: yes`
- `stageTrackingUsable: yes`
- expected joint groups listed as `visible`
- no camera/model error

## Setup

1. Use a laptop or USB webcam on HTTPS production URL.
2. Put a stable chair 1.8-2.4 m from the camera.
3. Set camera around waist-to-chest height; avoid looking down from a high monitor angle.
4. Use bright front or side lighting.
5. Keep full upper body visible for seated mode and full body visible for standing mode.
6. Keep hands at least 35-50 cm away from the lens; do not let a palm fill the frame.
7. Avoid backlight, dark clothes on dark background and clutter around the chair.

## Home Calibration

1. Open `https://motionquest-app.vercel.app`.
2. Click `Start Camera Check`.
3. Accept browser camera permission.
4. Confirm `Required joints` shows visible groups for shoulders, hips, knees and ankles.
5. Press `Copy live evidence` and paste into `evidence/camera-smoke/live-evidence.txt`.
6. Capture `evidence/camera-smoke/home-calibration.png`.

## Chair Stand

1. Click `Start Live Camera Session`.
2. Choose `I can stand safely`.
3. Confirm standing readiness.
4. Do one slow sit-to-stand and return to seated.
5. Confirm the counter changes.
6. Press `Copy live evidence` and paste into `evidence/camera-smoke/live-evidence.txt`.
7. Capture `evidence/camera-smoke/chair-stand-tracking.png`.

## Reach Stars

1. Continue to Reach Stars.
2. Click `Start Reach Stars`.
3. Move either wrist into a yellow target.
4. Hold the wrist in the target for at least 0.5 sec.
5. Confirm the hit count changes.
6. Press `Copy live evidence` and paste into `evidence/camera-smoke/live-evidence.txt`.
7. Capture `evidence/camera-smoke/reach-stars-tracking.png`.

## Report

1. Click `View Report`.
2. Confirm report contains Chair Stand, Reach Stars, Tracking, Method, Limitations and Export.
3. Copy or download the report text.
4. Capture `evidence/camera-smoke/caregiver-report.png`.

## Threshold Tuning Criteria

T092 can close only if standing branch passes three slow cycles without false
reps:

- seated -> standing transition happens only after hips rise clearly above knees;
- standing -> seated transition happens only after returning to the chair;
- no rep is counted while only a hand or partial limb is visible.

T093 can close only if Reach Stars passes these checks:

- no hit is counted while `stageTrackingUsable: no`;
- a wrist inside a target for less than 0.5 sec does not count;
- a wrist held in the target for at least 0.5 sec counts once;
- the next target appears after a valid hit.
