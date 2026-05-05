# Phase 5 T085-T090 Camera Readiness

Дата проверки: 2026-05-05, Europe/Minsk.

## T085 MediaPipe Production Loading

Production URL: `https://motionquest-app.vercel.app`

Browser production smoke result:

```json
{
  "mediaPipeRequests": [
    {
      "url": "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm/vision_wasm_internal.js",
      "status": 200
    },
    {
      "url": "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm/vision_wasm_internal.wasm",
      "status": 200
    },
    {
      "url": "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task",
      "status": 200
    }
  ],
  "demoModeAvailable": true
}
```

Separate HEAD check:

- `vision_wasm_internal.wasm`: HTTP 200, `application/wasm`
- `pose_landmarker_lite.task`: HTTP 200, `application/octet-stream`

Status: closed.

## T086 Live Camera Smoke Test: Home Calibration

Agent environment result:

```json
{
  "ok": false,
  "name": "NotFoundError",
  "message": "Requested device not found"
}
```

Status: blocked until a physical webcam is available.

## T087 Live Camera Smoke Test: Chair Stand Tracking

Status: blocked until a physical webcam is available.

Required evidence:

- Home calibration shows required joints visible.
- Chair Stand screen reaches `Tracking`.
- At least one sit-to-stand cycle changes the chair rep count.

## T088 Live Camera Smoke Test: Reach Stars Tracking

Status: blocked until a physical webcam is available.

Required evidence:

- Reach screen reaches `Tracking`.
- Wrists are visible in Required Joints.
- At least one star hit increments the target count.

## T089 Exact Demo Camera Setup

Prepared setup protocol:

- Camera distance: start at 1.8-2.4 m from chair.
- Camera height: roughly waist-to-chest height, stable, not handheld.
- Body visibility: shoulders, hips, knees and ankles visible for Chair Stand; shoulders, elbows, wrists and hips visible for Reach Stars.
- Chair position: stable chair, side/front diagonal view, enough room to stand without leaving frame.
- Lighting: bright front/side light, avoid strong backlight from windows.
- Clothing/background: avoid low-contrast clothing against same-colored background.

Status: protocol ready, but exact setup cannot be marked as works until a real webcam run confirms it.

## T090 Calibration Required-Joint Visibility

Implemented in `motionquest-app/src/components/CameraStage.tsx`.

Calibration now shows:

- Required Joints panel.
- Mode-specific joint groups.
- Visible/missing status per group.
- Actionable setup guidance for missing shoulders, hips, knees, ankles, elbows or wrists.

Production content check:

- `Required joints`: true
- `Browser pose lab`: true
- `Measurement stage`: true

Status: closed.

## Verification

- `npm run lint`: passed.
- `npm test`: 3 passed.
- `npm run build`: passed.
- `npm run test:e2e`: 6 passed.
- Vercel production deployment: `dpl_J27F9Hj9iQQjh6YUa8tTfVwR1y7u`, Ready.
