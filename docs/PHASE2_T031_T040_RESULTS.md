# Phase 2 Results — T031-T040

Date: 2026-05-05  
Scope: second Phase 2 block from `docs/MASTER_TODO_WINNING_PROJECT.md`  
Primary source files:
- `research-synthesis-MotionQuest.md`
- `docs/RESEARCH_EVIDENCE_TRACE_T022_T030.md`
- `docs/JUDGING_CLAIMS_AND_LIMITS.md`
- `docs/RESEARCH_LAYER_PUBLIC_COPY.md`

## T031 — Creativity Logic

Core creativity statement:

> MotionQuest is creative because the game mechanics are not generic rewards layered on exercise. Each activity is tied to a functional movement construct: Chair Stand turns sit-to-stand practice into counted repetitions, Reach Stars turns upper-body reaching into target interaction, and the report translates movement into a caregiver-readable session summary.

Creativity proof:

| Game mechanic | Functional construct | Why it is not generic gamification |
|---|---|---|
| Chair Stand counter | Sit-to-stand repetition practice | The score comes from a recognizable functional movement pattern, not arbitrary points. |
| Reach Stars targets | Upper-body reach and coordination practice | The target hit is connected to visible wrist tracking and controlled reaching. |
| Tracking confidence | Pose visibility and measurement quality | The system tells users when the estimate is more or less trustworthy. |
| Caregiver report | Communication artifact | The outcome is not a leaderboard; it is a plain-language session summary. |
| Safe fallback session | Demo resilience | It is labeled as fallback data, not fake live measurement. |

One-line creativity logic:

> Game mechanics are attached to functional movement constructs and readable outcomes, not decorative gamification.

## T032 — Research Freshness Check

Last scholarly synthesis date: 2026-05-04.  
Current task date: 2026-05-05.  
Freshness gap: 1 day.

Result:
- The master TODO requires a fresh scholarly recheck only if more than 7 days passed since the last scholarly check.
- Because only 1 day passed, the existing scholarly synthesis remains current for this stage.
- A targeted live source check was still performed on 2026-05-05 for the highest-risk public claims.

Live source check status:

| Source | Live status on 2026-05-05 | Use status |
|---|---|---|
| BMC Geriatrics AI exercise scoping review, 2026 | Opened live | Current enough for AI exercise / older-adult exercise framing. |
| BMC Geriatrics exergame balance meta-analysis, 2026 | Opened live | Current enough for exergame/balance framing with low-certainty caveat. |
| Nature Medicine exergame RCT, 2024 | Opened live | Use only as broader context; do not claim MotionQuest prevents falls. |
| Games for Health Journal RCT, 2023 | Opened live | Use for chair-stand / functional performance inspiration, not clinical scoring. |

## T033 — Research Facts That May Need Recheck Before Submission

| Fact / claim | Why it may need recheck | Recheck trigger |
|---|---|---|
| 2026 AI exercise scoping review details | Springer page says the manuscript is an unedited early version. | Recheck before final Devpost/public README. |
| 2026 BMC exergame meta-analysis effect sizes | Review reports very low certainty of evidence and may receive editorial updates. | Recheck before claiming quantified results publicly. |
| Nature Medicine fall-rate RCT wording | High-impact claim can be misunderstood as MotionQuest fall prevention. | Recheck and keep as context only. |
| Games for Health Journal chair-stand RCT details | Full access may be limited; use abstract-visible facts carefully. | Recheck before citation cards or book chapter draft. |
| Participant counts on Devpost | Devpost participant count changes over time. | Recheck on every submission/package pass. |
| PhysTech prize names | Devpost and official page differ slightly in prize naming. | Recheck before Devpost copy and slides. |
| Presentation registration requirements | Form link appears later in Discord. | Recheck when organizers post Google Form. |

## T034 — Evidence Panel Content For Home / Method

Panel title:

> Why MotionQuest is research-aligned

Panel copy:

> MotionQuest uses short webcam-guided activities inspired by older-adult exergame and functional-movement research. The prototype focuses on session signals a browser can honestly estimate: chair-stand repetitions, reach targets, reaction timing and tracking confidence. It is designed for movement practice and caregiver communication, not diagnosis.

Three evidence bullets:

1. Exergame research with older adults studies balance, functional performance, motivation and engagement.
2. AI exercise tools often use sensing, tracking and real-time feedback, which matches the webcam-first MotionQuest approach.
3. Functional tasks such as chair stand and reach-style activities are useful inspiration for practice metrics, but MotionQuest does not reproduce clinical scoring.

Footer disclaimer:

> Research-aligned prototype. Not a medical device.

## T035 — Compact Citation Cards

| Card title | Compact text | Link |
|---|---|---|
| AI exercise for healthy ageing | A 2026 scoping review maps AI exercise tools for older adults and highlights sensing, tracking, feedback and personalization. | https://link.springer.com/article/10.1186/s12877-026-07544-1 |
| Exergames and balance | A 2026 systematic review/meta-analysis reports balance-related signals for exergame training in older-adult care settings, with low-certainty caveats. | https://link.springer.com/article/10.1186/s12877-026-07471-1 |
| Step exergame RCT | A 2024 Nature Medicine randomized trial provides broader evidence that exergame-style movement training can matter for older adults. | https://www.nature.com/articles/s41591-023-02739-0 |
| Chair-stand inspiration | A 2023 Games for Health Journal RCT used the 30-second chair stand in functional performance evaluation for older adults. | https://journals.sagepub.com/doi/10.1089/g4h.2022.0194 |
| Home exergame usability | A 2024 PLOS ONE review supports immediate feedback, challenge, usability and engagement as home-based exergame design primitives. | https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0306816 |

UI rule:
- Show at most 3 cards in the app.
- Put full citation list in README or research artifact.
- Keep every card under 35 words.

## T036 — Book Chapter Angle

Academic formulation:

> MotionQuest demonstrates how a browser-based exergame can translate evidence-inspired functional movement constructs into accessible, privacy-preserving physical-activity practice. The chapter argues that hackathon-scale physical-activity technology can be rigorous without claiming clinical validation: the system connects webcam pose estimation, chair-stand and reach-style tasks, immediate feedback and caregiver-readable reporting into a transparent prototype for healthy-ageing support.

Working chapter title:

> From Playful Motion To Research-Aligned Practice: A Webcam-Based Exergame Prototype For Healthy Ageing

## T037 — Caregiver Interpretation: Tracking Confidence

| Level | App wording | Caregiver interpretation | Safe next action |
|---|---|---|---|
| High | Tracking quality: high | The camera could see the key joints clearly for most of the session. The numbers are the most useful session estimate. | Compare with the next session under similar lighting and distance. |
| Medium | Tracking quality: medium | The camera could estimate movement, but visibility or body position may have affected some counts. | Repeat with better lighting, more full-body visibility and less background motion. |
| Low | Tracking quality: low | The camera could not see enough landmarks reliably. Treat the numbers as incomplete. | Do not interpret the score; rerun calibration and repeat the activity if safe. |

Report note:

> Tracking confidence describes camera visibility, not the person’s health or ability.

## T038 — Caregiver Interpretation: Chair Stand

Plain-language report block:

> Chair Stand shows how many controlled sit-to-stand repetitions the webcam counted during this session. A higher count can mean the participant completed more repetitions, but the result also depends on camera position, lighting, chair setup and whether the full body stayed visible. Treat this as a practice observation, not a clinical score.

Result labels:

| Result state | Interpretation |
|---|---|
| Completed reps recorded | The app detected repeated sit-to-stand movement during the session. |
| Few reps recorded | The participant may have moved slowly, stopped early, or the camera may have missed transitions. |
| No reps recorded | Check camera visibility, chair position and calibration before interpreting the result. |

## T039 — Caregiver Interpretation: Reach Stars

Plain-language report block:

> Reach Stars shows how many visible targets were reached by a tracked wrist during the session. It reflects interaction with the target game and basic reach practice, not a medical range-of-motion result.

Result labels:

| Result state | Interpretation |
|---|---|
| Many targets hit | The participant interacted with the targets and the camera could track wrist movement. |
| Some targets hit | The participant reached some targets; missed targets may reflect timing, visibility or comfort. |
| Few or no targets hit | Check whether wrists were visible and targets were reachable before interpreting the result. |

## T040 — Research Layer Overclaim Audit

Checked files:
- `docs/PHASE2_T022_T030_RESULTS.md`
- `docs/RESEARCH_LAYER_PUBLIC_COPY.md`
- `docs/RESEARCH_EVIDENCE_TRACE_T022_T030.md`
- `docs/JUDGING_CLAIMS_AND_LIMITS.md`

Audit results:

| Risk | Result | Required wording |
|---|---|---|
| Fake validation | No fake validation claim approved. | Use "research-aligned" or "evidence-inspired". |
| Fake trial | No MotionQuest user trial claim approved. | Say real-user testing is still needed. |
| Clinical authority | No clinical-grade claim approved. | Say hackathon prototype and session observation. |
| Diagnosis | Diagnosis claims are explicitly banned. | Say not a diagnostic tool. |
| Fall prediction | Fall-prediction claims are explicitly banned. | Say does not predict fall risk. |
| Long-term outcomes | Long-term health improvement claims are explicitly banned. | Say single-session practice signal. |

Approved public wording:

> MotionQuest is a research-aligned hackathon prototype for physical-activity practice and communication. It estimates session-level movement signals with a webcam and explains limitations clearly.
