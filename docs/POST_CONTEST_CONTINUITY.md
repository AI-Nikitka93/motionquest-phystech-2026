# Post-Contest Continuity

## T188 — Judge Feedback Notes Template

```md
# Judge Feedback Notes

Date:
Presentation time:
Presenter:

## What judges understood quickly

## Questions judges asked

## Concerns raised

## Positive signals

## Claims to tighten

## Product changes to make next
```

Do not close T188 until real judge, participant or self-review feedback has been captured.

## T189 — Issue / Decision Log Template

Use one entry per judge question or product gap.

```md
## Issue

Date:
Source: judge / participant / self-review / technical failure
Question or observation:
Affected surface: app / presentation / evidence / business / camera / privacy
Risk level:

Decision:
Owner:
Next action:
Claim impact:
Evidence needed to close:
```

Do not close T189 until actual post-presentation questions have been logged.

## T190 — Feedback Classification

Classify every real feedback item into exactly one primary category and optional secondary categories:

| Category | Use When | Required Next Evidence |
|---|---|---|
| Trust | The feedback concerns medical claims, confidence, privacy, data storage or fallback labels. | Claim review plus visible copy/report check. |
| Usability | The feedback concerns instructions, readability, timing, navigation or older-adult setup. | Screenshot/browser check plus user-note evidence. |
| Movement design | The feedback concerns activity meaning, seated/standing choice, reach targets or safety. | Activity semantics check plus camera/rehearsal evidence. |
| Research | The feedback asks for stronger citations, study design or clinical boundary. | Source review and claim-boundary update. |
| Business | The feedback concerns adoption, buyers, senior centers, caregivers or pricing. | Non-fake market/adoption evidence; no invented paid demand. |
| Presentation | The feedback concerns story, timebox, visuals, Q&A or demo flow. | Rehearsal note and revised script. |

Do not close T190 until real feedback has been classified.

## T193 — Recurring Knowledge Refresh

| Surface | Refresh When | Source / Evidence |
|---|---|---|
| Contest/public links | 72h before deadline, 24h before deadline, presentation morning, after submission | Devpost, Binnovative page, Discord organizer channel, `evidence/submission-proof/`. |
| Evidence citations | Before any public claim change and every post-contest milestone | Primary source URLs in `docs/RELEASE_EVIDENCE_2026_05_05.md` and research trace docs. |
| Browser camera assumptions | Before live rehearsal, after browser/MediaPipe package updates, before public demo | Real camera smoke evidence under `evidence/camera-smoke/`. |
| Competitor/product landscape | Before business/adoption claims or book chapter expansion | Current primary product pages, papers and source-backed notes; no fake market numbers. |
| Dependency/security state | Before release, after dependency updates and before any redeploy | `npm audit --audit-level=moderate`, package diff, `docs/DECISIONS.md`. |

## T194 — Post-Contest Direction Decision

Selected direction: staged hybrid, starting with caregiver/community wellness validation and preserving the book/research artifact path.

Rationale:

- Caregiver/community wellness gives the clearest near-term user setting without pretending MotionQuest is a clinical tool.
- The book/research path is valuable because PhysTech explicitly rewards publishable project stories, but it should describe a disciplined prototype and evidence boundaries, not inflated efficacy.
- A standalone paid product path is premature until real user sessions, camera reliability and caregiver usefulness are observed.

Rejected for now:

- Medical/rehabilitation product: requires clinical protocol, validation, compliance and safety review outside the hackathon MVP.
- Enterprise wellness platform: would force backend, accounts, pricing and procurement claims before user proof.
- Generic fitness game: weakens the seated-inclusion, confidence-aware report and research story.

## T195 — Book Chapter Thesis

Working thesis:

> MotionQuest shows how a browser-only physical-activity prototype can turn short, confidence-aware movement practice into a dignity-preserving Movement Passport: seated users are included as first-class participants, webcam limits are made visible, and the outcome is a caregiver-readable report rather than a medical score.

Chapter argument:

1. Physical-activity technology often excludes people who cannot safely stand, wear devices or interpret raw metrics.
2. A webcam prototype can still be useful when it narrows its claim to visible session observations.
3. Seated participation, privacy and confidence labels are not accessibility extras; they are the trust model.
4. The Movement Passport is future-facing and non-medical: it records participation and limitations until real validation supports anything stronger.

## T196 — Post-Contest Roadmap

1. Capture final contest version, submission proof and judge feedback.
2. Collect real-camera seated evidence from the presenter setup and, if safe, a standing full-body setup.
3. Run a small caregiver/community wellness pilot with consented qualitative feedback and no diagnosis collection.
4. Tune seated/reach instructions, target placement and camera guidance from observed setup failures.
5. Compare standing and seated branches for usability and tracking stability.
6. Improve export/report wording only when feedback shows a real comprehension gap.
7. Consider repeated-session history only after privacy/governance review.
8. Convert the project into a book chapter using the thesis above and the final evidence package.

## T197 — Continuity Package

Start here for any future agent or teammate:

- Instructions: `AGENTS.md`
- Current state: `docs/STATE.md`
- Execution plan: `docs/EXEC_PLAN.md`
- Project map: `docs/PROJECT_MAP.md`
- Product brief: `docs/MOTIONQUEST_WORLD_CLASS_MASTER_BRIEF.md`
- Full TODO: `docs/MOTIONQUEST_FULL_RELEASE_MASTER_TODO_2026_05_06.md`
- Release evidence: `docs/RELEASE_EVIDENCE_2026_05_05.md`
- Submission checklist: `docs/FINAL_SUBMISSION_CHECKLIST.md`
- Presentation script: `docs/PRESENTATION_SCRIPT.md`
- Q&A bank: `docs/JUDGE_QA_ANSWER_BANK.md`
- Camera evidence protocol: `docs/CAMERA_SMOKE_TEST_PROTOCOL.md` and `evidence/camera-smoke/README.md`
- Submission proof protocol: `evidence/submission-proof/README.md`
- App: `motionquest-app/`

Known blockers that future work must not hide:

- Final Devpost submission and presentation registration are not done.
- Clean-browser public verification after final deploy/push is not done.
- Real presenter-side camera proof is not collected.
- Standing path requires a safe full-body setup before proof can close.
- Production redeploy/push requires explicit public-action approval.

## T202 — Post-Contest Governance Rule

Any future feature must preserve all four identity constraints:

1. Dignity: no blame language, surveillance framing or hidden data capture.
2. Seated inclusion: seated participation remains a first-class path, not a fallback failure.
3. Report outcome: the caregiver-readable report remains the product artifact.
4. Non-medical boundary: no diagnosis, fall-risk prediction, clinical validation, official score or accuracy claim without a separate validated evidence process.

## T203 — Evidence Renewal Calendar

| Cadence | Required Action |
|---|---|
| Before any public copy update | Re-run claim scan against `docs/JUDGING_CLAIMS_AND_LIMITS.md` and cited-source links. |
| Before any redeploy or submission update | Run full local verification gate and clean-browser public-link check. |
| Monthly during active development | Recheck evidence URLs, browser-camera assumptions, dependency audit and competitor/product landscape. |
| After any real-user or judge feedback | Classify feedback, update the issue log and weaken claims before adding stronger promises. |
| Before book chapter draft | Refresh citations, final contest outcome, real-camera evidence and post-contest roadmap. |

## T204 — Long-Term Claim Review Process

1. Identify every new public claim in app, README, Devpost copy, presentation or book text.
2. Classify the claim as implementation fact, cited research support, measured MotionQuest evidence, product inference or hypothesis.
3. Require a named source or dated MotionQuest evidence for all numeric, clinical, reliability, adoption or business claims.
4. If evidence is missing, use weaker qualitative wording or remove the claim.
5. Run banned-claim scan for diagnosis, fall prediction, clinical validation, official scoring, perfect tracking and proven market demand.
6. Update `docs/JUDGING_CLAIMS_AND_LIMITS.md` when a new claim category appears.

## T205 — Future Release Decision Filter

Approve future work only if it passes all gates:

- Caregiver value: makes the report clearer, easier to share or more useful.
- Community wellness value: helps a facilitator run safe, low-friction practice without accounts/wearables.
- Research/book value: improves evidence discipline, observed limitations or publishable learning.
- Operational feasibility: works within browser/client-only constraints unless a separate decision approves backend/security scope.
- Claim safety: does not require medical, market or accuracy promises the project cannot prove.

## T206 — Archive Policy

- Current release screenshots stay in `output/devpost-screenshots/`.
- Current demo video stays in `output/demo-video/`.
- Historical QA screenshots may stay in `output/playwright/` when referenced by docs/history.
- Superseded public screenshots should be moved out of current Devpost lists or labeled historical before reuse.
- Rejected references, raw generations and prompt drafts must not enter the release bundle.
- Old public copy must not remain linked as current submission copy after it is superseded.

## T207 — Maintenance Owner Map

| Surface | Owner Role | Update Trigger |
|---|---|---|
| Product brief | Product/story owner | Product direction, award strategy or book thesis changes. |
| Full TODO and state | Execution owner | Every task closure, blocker change or handoff. |
| Evidence package | Research/claims owner | Source update, claim change, final submission or judge feedback. |
| App copy and report | Product/implementation owner | Camera, scoring, report or fallback behavior changes. |
| Presentation assets | Presenter | Script, Q&A, schedule, demo route or backup proof changes. |
| Public app/source links | Release owner | Deploy, push, clean-browser verification or public-link recovery. |

## T208 — Post-Contest User Feedback Loop

Run interviews/sessions only with minimal data:

- Ask for comfort, clarity, perceived usefulness, setup difficulty and caregiver-readability.
- Do not collect diagnoses, medications, fall history, insurance data or unnecessary personal identifiers.
- Store notes as anonymized observations unless explicit consent says otherwise.
- Separate live camera evidence from participant feedback.
- Treat negative feedback as a reason to weaken or revise claims, not as a presentation problem to hide.

## T209 — Partnership Screening Rules

Accept a community/research partnership only if:

- It allows non-medical positioning unless a formal clinical protocol is created.
- It supports seated users and does not require standing-only proof.
- It agrees that camera/video privacy boundaries remain visible and minimal.
- It does not demand fake market numbers, clinical efficacy claims or hidden data collection.
- It provides a safe setting for real-camera setup feedback and caregiver report review.

## Existing Post-Contest Issue List

- Validate seated-adaptive branch with real users.
- Tune thresholds for different camera heights and room sizes.
- Add calibration screenshots or animated setup guide.
- Add repeated-session trend only after storage/privacy review.
- Add caregiver export format after user interviews.
- Keep medical claims out unless a real study supports them.

## Book Chapter Outline

1. Introduction: physical activity participation and measurement outside clinics.
2. Problem: friction, access, and exclusion from standing-only exercise tools.
3. Related work: exergames, functional movement measures, webcam pose estimation, seated/adaptive activity.
4. Prototype: MotionQuest architecture and workflow.
5. Method: browser-only MediaPipe landmarks, adaptive branch selection, report generation.
6. Demo findings: what worked in the hackathon prototype.
7. Limitations: no clinical validation, camera constraints, small sample/no pilot yet.
8. Future work: caregiver pilot, threshold tuning, accessibility improvements.

## Small Pilot Continuation Plan

Target first pilot:

- 3-5 older adults or caregiver-supported users.
- 2 seated-only runs and 2 standing-if-safe runs per participant.
- Collect qualitative feedback: clarity, comfort, perceived usefulness, setup difficulty.
- Do not collect medical diagnoses.
- Store only session summaries and consented notes.

## After Event Actions

- Record what worked, what failed, and what judges asked.
- Update README with final contest outcome honestly.
- If invited for book chapter, convert research synthesis and implementation notes into the chapter outline above.
