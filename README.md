# MotionQuest — PhysTech 2026

MotionQuest is an accessible browser-based functional movement lab for older adults and seated/standing users. It turns a normal webcam into two short evidence-aligned movement activities and a caregiver-readable report.

- Live app: https://motionquest-app.vercel.app
- Public source package: https://github.com/AI-Nikitka93/motionquest-phystech-2026
- Hackathon: [PhysTech 2026: Physical Activity and Technology Hack Day](https://phystech-2026.devpost.com/)
- Verification date for contest rules: 2026-05-05

## Problem

Physical activity tools often assume that users can install apps, wear sensors, create accounts, or perform standard exercises in a fixed way. That excludes many older adults, caregivers, and people who need a seated option. MotionQuest focuses on a lower-friction path: browser, webcam, adaptive movement, visible limits, and a report that a caregiver or judge can understand.

## Solution

MotionQuest runs entirely in the browser:

1. The user chooses a safe movement branch.
2. MediaPipe Pose estimates visible body landmarks locally.
3. The app runs two short movement activities.
4. The report explains reps, reach hits, tracking quality, limitations, and export text.

## Activities

### 1. Adaptive Chair Movement

The first activity is no longer standing-only.

- `standing` branch: counts visible sit-to-stand cycles when standing is safe.
- `seated-adaptive` branch: counts seated arm movement cycles using visible shoulder-elbow-wrist angles.

This keeps the project inclusive without adding a third game or requiring custom hardware.

### 2. Reach Stars

The user reaches toward large targets. A hit counts only when a visible wrist stays inside the target for 0.5 seconds, reducing false positives from one-frame landmark noise.

## What Judges Can Verify

Open the live app at https://motionquest-app.vercel.app and check:

1. Home explains the physical-activity problem, method, privacy boundary, and judging story.
2. `I will stay seated` starts the seated-adaptive path.
3. `I can stand safely` starts the standing path.
4. `Use Safe Demo Data` opens a clearly labeled fallback report when camera conditions fail.
5. The Caregiver Report labels source, session mode, primary movement, tracking confidence, limitations, and export text.

## Privacy

- No account.
- No backend.
- No database.
- No video upload.
- No raw video or frames are stored.
- Session summaries are stored only in browser `localStorage`.

## Research Boundary

MotionQuest is research-aligned, not clinically validated.

It does:

- demonstrate webcam-based movement practice;
- use functional-movement-inspired metrics;
- expose tracking confidence and limitations;
- support a seated adaptive branch.

It does not:

- diagnose disease;
- predict fall risk;
- produce a clinical impairment score;
- replace professional evaluation;
- claim a validated medical device.

## PhysTech Criteria Mapping

| Criterion | MotionQuest Fit |
|---|---|
| Impact | Supports low-friction movement practice for older adults, caregivers, and seated users without wearables or accounts. |
| Creativity | Turns browser pose landmarks into an adaptive movement lab, not a generic fitness tracker or leaderboard. |
| Presentation | Provides a 90-second judge walkthrough, safe fallback report, exportable artifact, and clear claim boundaries. |

## Award Fit

| Award | Why It Fits |
|---|---|
| Excellence in Research | Built from a documented research synthesis and an adaptive seated metrics refresh. |
| Excellence in Social Impact | Removes hardware/account barriers and avoids excluding users who cannot stand. |
| Excellence in Creativity | Combines camera-only pose tracking, adaptive movement branching, and caregiver-readable reporting. |

## Local Run

```bash
cd motionquest-app
npm install
npm run dev -- --port 3001
```

## Verification Commands

```bash
cd motionquest-app
npm run lint
npm test
npm run build
npm run test:e2e
```

## Key Artifacts

- `docs/MASTER_TODO_WINNING_PROJECT.md`
- `docs/ADAPTIVE_SEATED_METRICS_RESEARCH_2026_05_05.md`
- `docs/ADAPTIVE_SEATED_IMPLEMENTATION_2026_05_05.md`
- `docs/DEVPOST_SUBMISSION_COPY.md`
- `docs/PRESENTATION_SCRIPT.md`
- `docs/JUDGE_QA_ANSWER_BANK.md`
- `docs/FINAL_SUBMISSION_CHECKLIST.md`
- `docs/RELEASE_RISK_REGISTER.md`
- `docs/RELEASE_EVIDENCE_2026_05_05.md`

## Current Known Limitation

The code, build, production deployment, and browser fallback paths are verified. Final real-camera threshold tuning still requires physical webcam evidence for the actual demo room, lighting, chair position, standing branch, seated branch, and Reach Stars tracking.
