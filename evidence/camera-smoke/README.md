# Real Camera Evidence Needed For T086-T089

Production URL: `https://motionquest-app.vercel.app`

Place the real webcam proof files in this folder:

- `home-calibration.png`
- `chair-stand-tracking.png`
- `reach-stars-tracking.png`
- `caregiver-report.png`
- `live-evidence.txt`

Required proof:

1. Home calibration: `Required joints` panel shows the needed joints visible.
2. Chair/Reach copied evidence includes `cameraActive: yes`, `stageTrackingUsable: yes`, and `error: none`.
3. Chair Stand: camera status reaches tracking and the rep counter changes after a sit-to-stand cycle.
4. Reach Stars: wrist tracking reaches a target, holds for at least 0.5 sec, and the hit counter changes.
5. Report: Caregiver Report opens with metrics, method, limitations and export text.

Do not use fake camera, safe demo data or headless screenshots for these four proof files.

Final audit details:

- `live-evidence.txt` must include copied blocks containing `MotionQuest live camera evidence`, `cameraActive: yes`, `stageTrackingUsable: yes`, `error: none`, `mode: chair`, and `mode: reach`.
- Camera proof screenshots must be real image files, not empty placeholders.
- The audit rejects copied evidence that says `safe demo`, `fake camera`, `placeholder` or `template`.
