# Devpost Submission Copy

Verification date for contest conditions: 2026-06-04
Contest source: https://phystech-2026.devpost.com/

## T142/T143 — Final Public Title And Subtitle

Title: MotionQuest: Adaptive Home Movement Lab

Subtitle: Webcam movement practice for older adults and seated users, ending in a caregiver-readable report.

## T142 — One-Paragraph Devpost Abstract

MotionQuest is a browser-based functional movement lab that helps older adults and seated/standing users practice evidence-aligned physical activity with only a webcam. The app runs two short activities: Adaptive Chair Movement, which supports either a safe standing branch or a seated hand-movement branch, and Reach Stars, which records steady hand-to-target interactions. Browser MediaPipe tracking runs locally during the session; no account, backend, database, wearable, or video upload is required. After the session, MotionQuest produces a caregiver-readable report with movement counts, reach hits, tracking confidence, limitations, and export text. This browser release is research-aligned but not a medical device, diagnosis tool, or fall-risk predictor.

## T144 — Actual-Outcome Package

Use these as the submission package surfaces, not as future plans:

- Live app: https://motionquest-app.vercel.app
- Source package: https://github.com/AI-Nikitka93/motionquest-phystech-2026
- Final screenshots: `output/devpost-screenshots/`
- Backup proof video: `output/demo-video/motionquest-adaptive-demo.webm`
- Evidence and limits: `docs/RELEASE_EVIDENCE_2026_05_05.md`, `docs/JUDGING_CLAIMS_AND_LIMITS.md`, `docs/EVIDENCE_PANEL_CONTENT.md`

Before final submission, recheck the live app and source package from a clean browser after the final public redeploy/push. The current local package was refreshed on 2026-06-04; publication is a separate public-action step.

## T148 — Research, Social Impact And Entrepreneurship Story

Research angle: MotionQuest turns cited movement-practice ideas into an honest browser artifact: adaptive chair movement, reach-style interaction, confidence-by-mode and a report that says what the camera could and could not observe.

Social impact angle: the seated path is not treated as failure. A user can choose seated adaptive movement, use one visible hand, avoid wearables/accounts/uploads and still receive a caregiver-readable practice note.

Entrepreneurship angle: the product wedge is the report, not a generic game. Community wellness programs, caregivers and senior centers can understand one short session without buying hardware or managing medical records.

## T145 — Presentation Registration Description

MotionQuest demonstrates how a normal browser webcam can become an accessible physical-activity technology for older adults and seated users. It combines adaptive browser-tracked movement practice, a safe fallback demo path, and a plain-language caregiver report while keeping video local and claims non-clinical.

## Short Tagline

Webcam-based adaptive movement practice with a caregiver-readable report.

## Public Links

- Live app: https://motionquest-app.vercel.app
- Source package: https://github.com/AI-Nikitka93/motionquest-phystech-2026
- Research basis: `docs/ADAPTIVE_SEATED_METRICS_RESEARCH_2026_05_05.md`
- Implementation proof: `docs/ADAPTIVE_SEATED_IMPLEMENTATION_2026_05_05.md`
- Screenshot proof: `output/devpost-screenshots/`
- Backup proof: `output/demo-video/motionquest-adaptive-demo.webm`

## Devpost Requirements Cross-Check

| Requirement | Prepared Value |
|---|---|
| Submit by June 27, 2026 12:00pm EDT | Checklist in `docs/FINAL_SUBMISSION_CHECKLIST.md` |
| Register presentation by June 27, 2026 12:00pm EDT | Registration copy in this file |
| Present online June 28, 2026 | Script in `docs/PRESENTATION_SCRIPT.md` |
| Public actual-outcome link | Live app plus source/storage package |
| 10 minute presentation including Q&A | 7-minute story plus 3-minute Q&A buffer |

## What To Avoid In Devpost Copy

- Do not call the browser release clinically validated.
- Do not claim diagnosis, fall prediction, or medical scoring.
- Do not imply safe demo numbers are live camera measurements.
- Do not describe it as only a game; use functional movement lab / evidence-aligned exergame.
