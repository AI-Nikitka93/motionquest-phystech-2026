# Phase 1 Results — T011-T020

Date: 2026-05-05  
Scope: second 10 TODO items from `docs/MASTER_TODO_WINNING_PROJECT.md`  
Current rule sources rechecked:
- Local conditions: `УСЛОВИЯ.txt`
- Live Devpost: https://phystech-2026.devpost.com/
- Official PhysTech page: https://binnovative-boston.github.io/phystech/2026.html

## T011 — What Current Version Does Not Close Against Impact, Creativity And Presentation

| Criterion | Current gap | Required closure |
|---|---|---|
| Impact | The public app does not yet explain the older-adult movement-practice problem or why no-special-hardware access matters. | Add a visible mission/problem layer on Home and report pages. |
| Impact | The app records reps and targets but does not explain the caregiver or community-wellness use case. | Add caregiver-readable interpretation, privacy note and suggested next-session framing. |
| Impact | The current report is a result shell, not yet a strong outcome artifact. | Add copy/export report, method summary, limitations and plain-language interpretation. |
| Creativity | The experience can look like a basic pose-tracking activity if the method layer is hidden. | Frame the product as an accessible functional movement lab using camera-only evidence-aligned tasks. |
| Creativity | The game layer does not yet prove why the mechanics are tied to functional movement rather than generic gamification. | Add "what counts" and "why this movement" explanations before and during each activity. |
| Presentation | A judge opening the app without narration may not understand the story in under 90 seconds. | Add judge-facing summary, how-it-works flow, evidence panel and guided demo entry point. |
| Presentation | Submission proof is incomplete without public source/storage package. | Prepare README, source package, screenshots, research summary and Devpost abstract. |
| Presentation | Live camera reliability is not yet proven with a physical webcam in the final demo environment. | Add fallback demo session and run physical-camera smoke tests before submission. |

## T012 — Actionable Checklist From Conditions Gap Audit

### Product Checklist

| Checklist ID | Action | Owner artifact |
|---|---|---|
| PRODUCT-01 | Add Home mission/problem/method sections. | `motionquest-app/src/components/MotionQuestApp.tsx` |
| PRODUCT-02 | Add visible "Research-backed, not medical" block. | App Home / Method section |
| PRODUCT-03 | Add serious calibration explanation with required joints and tracking confidence. | Calibration/Home screen |
| PRODUCT-04 | Upgrade Caregiver Report with interpretation, limitations, method used and copy/export. | Report screen |
| PRODUCT-05 | Add Judge Demo path with 90-second guided walkthrough. | App Home / navigation |
| PRODUCT-06 | Add safe fallback session clearly labeled as fallback data. | App Home / report |
| PRODUCT-07 | Keep all processing client-side and no-auth/no-backend for privacy and reliability. | App + README |

### Presentation Checklist

| Checklist ID | Action | Owner artifact |
|---|---|---|
| PRESENT-01 | Prepare one consistent problem statement. | Devpost + slides + README |
| PRESENT-02 | Prepare one consistent solution statement. | Devpost + slides + README |
| PRESENT-03 | Prepare 10-minute talk structure with 90-second live demo. | Presentation script |
| PRESENT-04 | Prepare backup demo script if webcam fails. | Demo runbook |
| PRESENT-05 | Prepare Q&A answers for medical-claim limits, privacy, accuracy and accessibility. | Q&A sheet |
| PRESENT-06 | Rehearse with exact browser, chair, lighting and internet setup. | Demo checklist |

### Public Artifact Package Checklist

| Checklist ID | Action | Owner artifact |
|---|---|---|
| PACKAGE-01 | Create public README with problem, solution, demo URL, setup, research basis and limitations. | Public repository/storage package |
| PACKAGE-02 | Add screenshots or short GIF/video if available. | `docs/assets/` or public package |
| PACKAGE-03 | Add research summary and citation trace. | Research artifact |
| PACKAGE-04 | Add public source code or storage link that proves actual outcome. | GitHub / Google Drive |
| PACKAGE-05 | Add Devpost-ready abstract and title. | Submission copy |
| PACKAGE-06 | Verify all public links from a logged-out/incognito browser before final submission. | Submission checklist |

## T013 — Terminology Drift Closed

Approved framing:
- `MotionQuest is an accessible browser-based functional movement lab.`
- `MotionQuest is an evidence-aligned exergame prototype for physical activity practice.`
- `MotionQuest turns a normal webcam into a privacy-preserving movement session and caregiver-readable report.`

Allowed only when describing a risk or rejected framing:
- `toy`
- `generic fitness mini-game`
- `plain webcam mini-game`
- `technical demo`

Active replacement rule:
- Public-facing copy must use `functional movement lab`, `evidence-aligned exergame prototype`, `camera-only movement session` or `caregiver-readable report`.
- Risk/audit docs may mention weak framing only to explain what must be avoided.
- The app, README, Devpost abstract and presentation must not present MotionQuest as only a game, toy, generic fitness tracker or clinical product.

Files already checked for drift:
- `docs/CONDITIONS_GAP_AUDIT.md`
- `docs/STATE.md`
- `docs/MASTER_TODO_WINNING_PROJECT.md`
- `docs/mvp-plan.md`
- `motionquest-app/src/components/MotionQuestApp.tsx`

## T014 — Three Judging Claims To Prove

1. Accessibility claim:
   MotionQuest supports physical-activity practice without wearables, accounts, backend setup or specialized hardware; a browser and webcam are enough.

2. Research-alignment claim:
   MotionQuest maps simple activity mechanics to evidence-inspired movement constructs, especially chair-stand repetitions, reach targets, tracking confidence and session-level interpretation.

3. Caregiver-readable outcome claim:
   MotionQuest produces a plain-language session report that explains what was attempted, what was observed, tracking quality and limitations without turning the result into a diagnosis.

## T015 — Three Claims The Project Must Not Make

1. No medical diagnosis:
   MotionQuest must not diagnose frailty, impairment, disease, injury, fall risk or rehabilitation status.

2. No fall prediction:
   MotionQuest must not claim to predict falls, prevent falls or estimate clinical fall probability from one webcam session.

3. No clinical validation:
   MotionQuest must not claim clinical-grade accuracy, validated clinical scoring, treatment recommendation or equivalence to in-person assessment.

Required disclaimer language:
> MotionQuest is a hackathon prototype for physical-activity practice and communication. It is not a medical device, diagnostic tool, fall-risk predictor or substitute for professional evaluation.

## T016 — Public Links Needed For Submission

| Link | Current status | Required final value |
|---|---|---|
| Public app URL | Ready | `https://motionquest-app.vercel.app` |
| Public source / storage URL | Required next public artifact | GitHub repository or Google Drive folder containing actual work |
| Research artifact | Local ready | Public copy of `research-synthesis-MotionQuest.md` or summarized `research-summary.md` |
| Devpost project URL | External submission artifact | Devpost project page |
| Presentation registration form | External organizer artifact | Google Form link from PhysTech Discord |
| Screenshots / demo media | Required next public artifact | Public screenshot/GIF/video in repo/storage package |
| Demo runbook | Required next internal artifact | Public or internal `docs/demo-runbook.md` |

Detailed link/package register:
- `docs/SUBMISSION_PACKAGE_PLAN.md`

## T017 — Minimum Submission Package

Minimum package that must exist before Devpost submission:

1. Public deployed app:
   `https://motionquest-app.vercel.app`

2. Public source or storage package:
   - app source;
   - setup instructions;
   - evidence artifacts;
   - screenshots or short demo media;
   - demo fallback instructions.

3. README:
   - problem;
   - solution;
   - who it helps;
   - why it fits PhysTech;
   - demo URL;
   - local setup;
   - research basis;
   - limitations and non-medical disclaimer.

4. Devpost copy:
   - title;
   - short abstract;
   - judging-category framing;
   - public links.

5. Presentation assets:
   - 10-minute outline;
   - 90-second demo script;
   - backup demo script;
   - Q&A sheet.

6. Research package:
   - citation trace;
   - book-chapter angle;
   - claims / forbidden claims list.

## T018 — Artifact Owners

| Artifact | Owner | Completion standard |
|---|---|---|
| Public app | P-FRONTEND / P-DEPLOY | Production URL opens over HTTPS and app flow works. |
| README | P-PACKAGE / P-PRODUCT | Judge can understand problem, solution, setup, evidence and limitations without narration. |
| Devpost text | P-PITCH / P-PRODUCT | One title, one abstract, public links, prize framing and no overclaims. |
| Presentation | P-PITCH / P-VISUAL | 10-minute structure with clear story and a reliable 90-second demo. |
| Live demo | P-SMOKE / P-DEMO | Tested with exact webcam, lighting, chair, browser and fallback path. |
| Backup demo | P-SMOKE / P-DEMO | Works without webcam and is labeled as fallback, not fabricated live tracking. |
| Research artifact | P-PAPERS / P-RESEARCH | Claims trace to real papers; no fake validation or medical overclaim. |
| Screenshots / media | P-VISUAL / P-PACKAGE | Public, clear, non-generic, and not misleading. |

## T019 — Allowed PhysTech Format Check

MotionQuest remains inside allowed PhysTech formats because it is:
- an app / website;
- a game-like physical-activity experience;
- a physical-activity technology project;
- a data-analysis and data-communication prototype;
- a browser AI/ML / algorithmic movement-estimation prototype;
- a health/wellness and participation-support project;
- a public, online, verifiable hackathon artifact.

MotionQuest must stay outside these risky directions:
- medical device;
- clinical diagnostic system;
- fall-risk predictor;
- social network;
- leaderboard-first fitness app;
- backend-heavy platform;
- fake trial / fake validation presentation.

## T020 — State Updated

Required state target:
- `active_step: Contest-winning product upgrade`

State file:
- `docs/STATE.md`

Completion status:
- Updated.
