# Final Rehearsal Plan

## T156 — Live Demo Setup

Prepare before presentation:

- Browser: Chrome or Edge, clean tab with https://motionquest-app.vercel.app
- Backup tab: safe demo report already reachable from Home.
- Camera: front-facing webcam, privacy shutter open.
- Lighting: bright front light, no strong backlight.
- Chair: stable, no wheels, visible from camera.
- Standing branch: use only if safe and full body is visible.
- Seated branch: default demo branch; at least one open hand visible to the camera.
- Internet: confirm app and MediaPipe model assets load.
- Export: test `Download report`.

## T157 — 10-Minute Rehearsal Loop

Run three rehearsals:

1. Full 7-minute story without interruption.
2. Full 90-second demo inside the story.
3. Full Q&A practice with hard questions from `docs/JUDGE_QA_ANSWER_BANK.md`.

Record after each rehearsal:

- total time;
- demo branch used;
- camera issues;
- unclear wording;
- one improvement before next run.

## T158 — 90-Second Demo Rehearsal

Pass criteria:

- Home opens.
- Presenter states the problem in one sentence.
- Seated adaptive branch starts cleanly.
- Reach Stars starts cleanly.
- Report opens.
- Safe fallback can be shown if webcam path fails.
- Export text is visible.

## T159 — Q&A Rehearsal

Practice these questions first:

- Is it clinically validated?
- What if the person cannot stand?
- How accurate is webcam pose tracking?
- Why not train a custom model?
- Where does video data go?
- Why is this not just a fitness game?

## T192 — Support Response Templates

Use these only as presenter/support copy. They do not replace actual troubleshooting or evidence collection.

Camera permission:

> MotionQuest needs temporary browser camera access only during the session. Please allow camera permission in the browser, refresh the page, and start with `Seated adaptive`. The app does not upload or save video.

No camera:

> If no camera is available, use `Safe demo` to inspect the report format. The report will stay labeled as sample data and should not be treated as live movement evidence.

Weak tracking:

> Improve front lighting, move farther from the camera, keep one open hand visible for seated/reach paths, and use standing mode only when the full body fits safely in frame. Low-confidence sessions should be treated as setup feedback, not as movement results.

Sample data:

> The safe-demo values are fixed example data for presentation continuity. They prove report labeling and fallback behavior, not live camera measurement.

Non-medical disclaimer:

> MotionQuest is a hackathon prototype for movement practice and caregiver communication. It is not a medical device, diagnosis, fall-risk predictor or clinical assessment.

Presentation timebox recovery:

> If the live path takes too long, finish early, show the report, and use the saved backup video only to demonstrate the intended flow. Preserve Q&A time for clinical-claim, privacy, seated-user and camera-limit questions.
