# Phase 5 T091-T100 Results

Дата проверки: 2026-05-05, Europe/Minsk.

## Closed

- T091: calibration now shows `Ready to start` / `Adjust camera` pass-fail state in the Required Joints panel.
- T094: saved sessions now include `trackingQuality` with confidence, body-detection status, validity and limitations.
- T095: report interpretation is generated from actual session values: chair reps, reach hits, confidence and validity.
- T096: copyable report text includes source, tracking validity, interpretation and limitations.
- T097: report can be downloaded as a plain `.txt` session artifact.
- T098: safe demo sessions are labeled as `safe-demo`, `Demo fallback`, and export text says `Source: safe demo fallback`.
- T099: report includes explicit tracking quality explanation for valid, limited and not-valid-enough sessions.
- T100: sessions with no detected body landmarks are marked `not-valid-enough` and explain that the user should repeat calibration.

## Blocked

- T086: real webcam Home calibration smoke test remains blocked by missing physical camera.
- T087: real webcam Chair Stand smoke test remains blocked by missing physical camera.
- T088: real webcam Reach Stars smoke test remains blocked by missing physical camera.
- T089: exact camera setup cannot be honestly confirmed as working until a real webcam run is captured.
- T092: Chair Stand heuristic thresholds cannot be tuned after live camera test until T087 is completed.
- T093: Reach Stars hit detection cannot be tuned after live camera test until T088 is completed.

## Verification

- `npm run lint`: passed.
- `npm test`: 5 passed.
- `npm run build`: passed.
- `npm run test:e2e`: 6 passed.
- Production deployment: `dpl_71BFPQbxe1bv3tLk1yihkwZRmPGf`, Ready.
- Production MediaPipe browser requests: `vision_wasm_internal.js` 200, `vision_wasm_internal.wasm` 200, `pose_landmarker_lite.task` 200.
- Camera probe: `NotFoundError: Requested device not found`.
