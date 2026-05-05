# Camera Smoke Test Protocol

Production URL: `https://motionquest-app.vercel.app`

## Evidence Folder

Place real test screenshots or short captures here:

- `evidence/camera-smoke/home-calibration.png`
- `evidence/camera-smoke/chair-stand-tracking.png`
- `evidence/camera-smoke/reach-stars-tracking.png`
- `evidence/camera-smoke/caregiver-report.png`
- `evidence/camera-smoke/README.md` contains the exact evidence checklist.

## Setup

1. Use a laptop or USB webcam on HTTPS production URL.
2. Put a stable chair 1.8-2.4 m from the camera.
3. Set camera around waist-to-chest height.
4. Use bright front or side lighting.
5. Keep full body visible: shoulders, hips, knees and ankles.
6. Avoid backlight, dark clothes on dark background and clutter around the chair.

## Home Calibration

1. Open `https://motionquest-app.vercel.app`.
2. Click `Start Camera Check`.
3. Accept browser camera permission.
4. Confirm `Required joints` shows visible groups for shoulders, hips, knees and ankles.
5. Capture `evidence/camera-smoke/home-calibration.png`.

## Chair Stand

1. Click `Start Live Camera Session`.
2. Confirm Chair Stand readiness.
3. Click `I am in position`.
4. Do one slow sit-to-stand and return to seated.
5. Confirm the counter changes.
6. Capture `evidence/camera-smoke/chair-stand-tracking.png`.

## Reach Stars

1. Continue to Reach Stars.
2. Click `Start Reach Stars`.
3. Move either wrist into a yellow target.
4. Confirm the hit count changes.
5. Capture `evidence/camera-smoke/reach-stars-tracking.png`.

## Report

1. Click `View Report`.
2. Confirm report contains Chair Stand, Reach Stars, Tracking, Method, Limitations and Export.
3. Capture `evidence/camera-smoke/caregiver-report.png`.
