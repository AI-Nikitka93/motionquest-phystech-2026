# MotionQuest Presentation Script

Target: PhysTech 2026 online presentation  
Time limit: 10 minutes total, including about 3 minutes Q&A  
Recommended structure: 7-minute story + 3-minute Q&A buffer

## T152 — 10-Minute Presentation Structure

| Time | Section | Content |
|---:|---|---|
| 0:00-0:45 | Hook | Older adults and caregivers need movement practice that is easy to start, explain, and verify outside a clinic. |
| 0:45-1:30 | Problem | Many tools require wearables, accounts, apps, or movements that are not safe for every user. Standing-only design excludes seated users. |
| 1:30-2:15 | Insight | A webcam can provide enough visible movement signal for practice feedback when the app is honest about confidence and limitations. |
| 2:15-3:00 | Product | MotionQuest runs in the browser: choose standing/seated, move through two activities, then read a caregiver report. |
| 3:00-4:30 | Live demo | Run the 90-second flow below. |
| 4:30-5:30 | Research basis | Functional movement inspiration, exergame engagement, browser pose feasibility, seated-adaptive inclusion. |
| 5:30-6:20 | Impact and creativity | No wearable, no account, no backend, adaptive branch, exportable outcome. |
| 6:20-7:00 | Limits and next step | Not medical diagnosis; next step is real-world camera/threshold tuning and small caregiver pilot. |
| 7:00-10:00 | Q&A | Use `docs/JUDGE_QA_ANSWER_BANK.md`. |

## T153 — 30-Second Judge Proof Sentence And Opening Hook

Opening hook:
"Most movement technology assumes the user can stand, wear a device, create an account, or interpret a score. MotionQuest starts from the opposite constraint: one browser webcam, seated users included, and a report a caregiver can actually read."

Judge proof sentence:
"In under two minutes, judges can open MotionQuest, choose a seated or standing movement path, see what the webcam is allowed to count, and end with a labeled caregiver-readable report that states confidence and limits instead of pretending to be a medical score."

## T156 — 90-Second Live Demo Runbook

| Time | Action | Spoken Line |
|---:|---|---|
| 0-10s | Open Home | "This is MotionQuest: a webcam movement lab, not a medical device." |
| 10-20s | Point to problem/method/privacy | "No wearable, account, backend, or video upload is needed." |
| 20-30s | Click `Seated adaptive` | "The first activity is adaptive; users do not have to stand if standing is unsafe." |
| 30-45s | Click `Start seated mode` | "For seated and reach paths, the app uses visible hand movement instead of pretending it can see hidden lower-body landmarks." |
| 45-60s | Finish early, start Reach Stars | "The second activity records steady reach-to-target interactions." |
| 60-75s | Click `Finish & View Report` | "The outcome is not just a score; it is a caregiver-readable session artifact." |
| 75-90s | Show report/export/limitations | "The report includes confidence and limits, so we do not overclaim." |

## T157 — Backup Demo Runbook If Webcam Fails

1. Say: "Stage lighting or webcam permissions can fail in online demos, so the app includes a labeled safe-demo path."
2. Click `Safe demo`.
3. Point to `Demo fallback`, `Source: safe demo fallback`, `Session mode`, `Primary movement`, `Tracking validity`.
4. Say: "These values are not presented as live measurement. They show the report format judges can expect from a live session."
5. Open export text and download the practice note.
6. Show `output/demo-video/motionquest-adaptive-demo.webm` only as backup proof if live browser interaction is interrupted.
7. Return to the live app URL and explain that camera/media assets have been separately verified, but real presenter-side camera proof is still collected separately.

## T154 — Slide Outline And Before/After Frame

1. Title: MotionQuest
2. Problem: physical activity practice is hard to start and hard to explain outside clinics.
3. User: older adults, seated users, caregivers, wellness organizers.
4. Insight: webcam pose landmarks can support practice feedback when confidence/limits are visible.
5. Product demo: Adaptive Chair Movement + Reach Stars + Caregiver Report.
6. Research basis: functional movement, exergames, pose estimation feasibility, seated inclusion.
7. Impact: lower hardware/account friction and inclusive seated option.
8. Creativity: adaptive webcam movement lab instead of generic tracker.
9. Limits: not diagnosis, not fall prediction, not clinical validation.
10. Next steps: real camera tuning, caregiver pilot, book chapter.

Before/after frame:

- Before: standing-first webcam prototype with unclear evidence, unclear seated support and score-first framing.
- After: adaptive seated/standing path, visible hand-based seated/reach tracking, caregiver-readable report, evidence surface, fallback labels and explicit limits.
- Proof artifact: `output/devpost-screenshots/06-evidence-surface-before-after.png`.
