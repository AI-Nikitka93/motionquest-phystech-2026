# Phase 2 Results — T022-T030

Date: 2026-05-05  
Scope: first 9 Phase 2 tasks plus Phase 1 anchor carry-over from `docs/MASTER_TODO_WINNING_PROJECT.md`  
Research source: `research-synthesis-MotionQuest.md`

## T022 — Strongest Evidence Points For Public Product

1. AI-supported exercise tools for older adults are an active research area, with sensing/tracking, real-time feedback and personalization appearing as common mechanisms.

2. Recent reviews/meta-analyses report positive signals for exergames and balance-related outcomes in older adults, while also warning that evidence quality and follow-up are heterogeneous.

3. A large Nature Medicine randomized trial on step exergame training in community-dwelling adults aged 65+ reported a lower monthly fall rate in the intervention group, supporting the broader impact relevance of exergame-style movement training.

4. Functional-performance research on older adults uses familiar measures such as 30-second chair stand, Timed Up-and-Go, Berg Balance Scale, Tinetti and 8-foot up-and-go; MotionQuest should use these as inspiration, not as official clinical scoring.

5. Exergame programs can support physical and affective physical-literacy domains, which matters because MotionQuest must motivate movement practice, not only count movement.

6. Home-based exergame usability evidence supports immediate feedback, challenge, interaction, engagement and motivation as useful design primitives, while preserving honest limitations.

## T023 — Evidence Groups

### Problem Significance

- Older adults are a meaningful target for physical-activity technology because the PhysTech challenge explicitly includes health/wellness, participation, tracking practice, recording/analyzing/communicating activity data and injury-related support.
- Research synthesis shows older-adult exergame work repeatedly studies balance, functional performance, movement accuracy, adherence, motivation and safe activity support.
- Product implication: the public product must explain older-adult movement practice and caregiver communication as the problem, not just webcam tracking.

### Exergame Intervention Evidence

- Reviews and RCTs support exergame-style interventions as a serious design pattern for older adults.
- Research supports movement tasks involving stepping, reach targets, weight shifts, reaction, immediate feedback and progressive challenge.
- Product implication: Chair Stand and Reach Stars should be framed as evidence-inspired functional activities.

### Webcam / Pose-Estimation Feasibility

- AI exercise research commonly uses sensing/tracking and real-time feedback.
- MotionQuest already implements browser webcam pose tracking with MediaPipe Tasks Vision and local session reporting.
- Product implication: the MVP can credibly demonstrate camera-only movement estimation, but must avoid claims of clinical-grade measurement.

## T024 — App Block: Research-Backed, Not Medical

Short app-ready block:

> MotionQuest is research-backed, not medical. The activities are inspired by older-adult exergame and functional-movement research, but this prototype does not diagnose, predict falls or replace professional assessment. It uses the webcam only to estimate simple session signals: repetitions, reach targets, timing and tracking confidence.

Compact label:

> Research-aligned practice, not a medical test.

## T025 — App Block: 30-Second Chair Stand

App-ready text:

> Chair Stand is inspired by the 30-second chair-stand style of functional movement task used in older-adult physical-performance research. MotionQuest counts visible sit-to-stand repetitions during a short session and reports tracking confidence. The result is a practice signal for this session, not a clinical score.

Microcopy:

> What counts: a controlled seated-to-standing movement that returns safely to the chair.

Metric name:

> Chair-stand repetitions counted by webcam.

## T026 — App Block: Reach Stars

App-ready text:

> Reach Stars turns upper-body reaching into a simple target task. The webcam estimates whether the left or right wrist reaches visible targets and records hits, timing and tracking confidence. It is an engagement and reach-practice proxy, not a medical range-of-motion assessment.

Microcopy:

> What counts: touch the target zone with either wrist while keeping the body visible to the camera.

Metric name:

> Reach targets hit.

## T027 — What MotionQuest Measures

MotionQuest measures only session-level, webcam-estimated signals:

| Metric | Meaning | Display label |
|---|---|---|
| Chair-stand reps | Counted sit-to-stand repetitions during the session. | Reps completed |
| Reach targets hit | Number of visible target zones reached by a tracked wrist. | Stars reached |
| Reaction time | Time between target appearing and target hit when available. | Average response |
| Tracking confidence | Whether required landmarks were visible enough for the app to trust the estimate. | Tracking quality |
| Session completion | Whether participant completed Chair Stand, Reach Stars and report flow. | Session complete |

## T028 — What MotionQuest Does Not Measure

MotionQuest does not measure:

| Not measured | Required wording |
|---|---|
| Diagnosis | MotionQuest does not diagnose health, frailty, impairment, disease or injury. |
| Fall risk | MotionQuest does not predict fall risk or claim fall prevention from one session. |
| Clinical impairment | MotionQuest does not estimate clinical impairment or rehabilitation status. |
| Long-term health outcome | MotionQuest does not prove long-term health improvement from a single session. |
| Clinical score | MotionQuest does not reproduce official Senior Fitness Test, TUG, BBS or Tinetti scoring. |

Required report disclaimer:

> These are session observations from a hackathon prototype. They are useful for practice and communication, not for diagnosis or clinical decisions.

## T029 — Impact Logic Chain

Older-adult physical-activity challenge:
Many older adults need low-friction ways to practice movement and communicate activity outside formal clinical settings.

Low-friction practice:
MotionQuest runs in a browser, uses a normal webcam and does not require wearables, accounts, backend setup or special hardware.

Immediate feedback:
The app gives visible targets, counts repetitions, shows success feedback and records tracking confidence during the session.

Caregiver-readable summary:
The report turns raw counters into plain-language session observations, method notes and limitations that a caregiver, family member or community wellness organizer can understand.

One-line impact chain:

> Older-adult activity challenge -> browser webcam practice -> immediate feedback -> caregiver-readable session summary.

## T030 — Social Impact Logic

Social-impact claims MotionQuest can honestly support:

1. No wearable hardware:
   A webcam-based prototype lowers access friction compared with sensors or specialized devices.

2. Browser access:
   The public app can be opened through a normal HTTPS URL, supporting hackathon verification and at-home/community-center scenarios.

3. Large UI:
   The existing visual direction prioritizes 65+ readability, large controls, high contrast and clear affordances.

4. Privacy-preserving local processing:
   The MVP does not need accounts, backend storage or video upload; movement estimation and localStorage session data stay client-side.

5. Caregiver communication:
   The report layer turns activity into understandable observations rather than opaque scores.

Social-impact statement:

> MotionQuest focuses on accessible participation: no wearable hardware, no account, large readable controls, browser access and a report that helps movement practice become easier to discuss.

