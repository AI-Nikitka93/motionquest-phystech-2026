# PhysTech 2026 Conditions Gap Audit

Date: 2026-05-05  
Source checked:
- Local: `УСЛОВИЯ.txt`
- Live Devpost: https://phystech-2026.devpost.com/

## Hard Verdict

The current deployed MotionQuest is a working early functional movement lab prototype, but it is not yet a strong hackathon submission package.

The problem is not that it uses game mechanics. PhysTech explicitly allows games and physical-activity technology. The problem is that the current app can read like a simple webcam activity unless it visibly proves:
- why the problem matters;
- what physical-activity challenge it addresses;
- what is research-backed;
- what is creative beyond pose tracking;
- what outcome the judges can verify;
- why it deserves a book chapter or Excellence in Research / Social Impact.

## What The Conditions Actually Require

### Submission Requirements

Confirmed requirements:
- Submit the project to Devpost by June 27, 2026, 12:00pm EDT.
- Register the project presentation by June 27, 2026, 12:00pm EDT.
- Give an online presentation on June 28, 2026.
- Provide a publicly accessible link to the actual outcome of the work.
- The organizers will verify the outcome in the afternoon of June 27.
- Presentation time is 10 minutes total, including approximately 3 minutes Q&A.

Implication:
- A public Vercel URL alone is not enough.
- We also need a public code repository or storage link containing the real project artifact, README, evidence, and instructions.
- The deployed app must communicate the project without us standing next to it.

### Judging Criteria

PhysTech judges on:
- Impact: quality and quantity of impact, big vs small problem, helps/inspires many or few.
- Creativity: innovative vs incremental.
- Presentation: story clarity, why important, what challenge, how solution delivers.

Implication:
- Current app mostly demonstrates "webcam estimates and counts movement."
- It does not yet demonstrate the size of the problem, research logic, target user, or broader physical-activity impact inside the product.
- It needs a project narrative layer and verifiable outcome layer, not just game screens.

### Prize Fit

Relevant prize tracks:
- Grand Prix / 2nd / 3rd / Honorable Mention.
- Excellence in Creativity.
- Excellence in Research.
- Excellence in Entrepreneurship.
- Excellence in Social Impact.
- Book publication invitation.

Implication:
- MotionQuest can compete for Research/Social Impact only if it is framed and implemented as an evidence-aligned physical-activity practice prototype.
- As a plain movement counter, it is weak for Creativity and too shallow for Research.

## Current MotionQuest Gap

| Condition / judging need | Current state | Gap severity |
|---|---|---:|
| Public actual outcome | Vercel URL exists | Medium |
| Public repository/storage proof | Not prepared | High |
| Clear problem statement | Mostly absent from app | High |
| Impact story | Not visible in product | High |
| Creativity story | Looks like pose-tracking game | High |
| Research basis | Exists in markdown, not surfaced in app | High |
| Presentation story | Not encoded in app flow | High |
| Book chapter angle | Exists in research doc, not packaged | High |
| Verifiable outcome | Counts reps/stars, but no protocol/methodology panel | High |
| Social impact | Target is older adults, but not explained enough | High |
| Entrepreneurship | No user/buyer/deployment story | Medium |

## Why The Current Prototype Is Not Yet Submission-Ready

The current app has:
- game screens;
- webcam overlay;
- counters;
- a report.

But it lacks:
- "why this matters" before the game;
- evidence-backed explanation of 30-sec chair stand / reach proxies;
- calibration protocol that looks serious;
- confidence and limitations explained clearly;
- caregiver report with interpretation, not just numbers;
- export/shareable artifact;
- source/research panel;
- Devpost-ready README and abstract;
- a presentation path inside the app.

So the prototype proves "we can run camera-based movement estimation in Next.js", but not yet "we built a meaningful physical-activity technology project."

## Required Reframe

Reframe from:

> Webcam exergame for older adults.

To:

> MotionQuest is an accessible browser-based functional movement lab that converts validated older-adult movement constructs into short, playable, caregiver-readable sessions using only a webcam.

This keeps the game layer, but makes the project real:
- target user: older adults, caregivers, community wellness programs;
- problem: safe, low-friction movement engagement and informal functional tracking outside clinics;
- method: webcam pose estimation + evidence-aligned chair stand/reach tasks;
- outcome: session report, confidence level, limitations, next-session recommendation;
- impact: accessible physical activity support without wearable hardware.

## What Must Change In The App

### Must Add Before Submission

1. Landing / Mission section on Home
   - Problem: older adults need safe movement practice and understandable feedback outside clinical settings.
   - Solution: camera-only functional movement games.
   - Why it matters: accessibility, participation, caregiver communication.

2. Research-backed Method panel
   - Explain that Chair Stand is inspired by 30-second chair stand.
   - Explain Reach Stars as simplified upper-body reach / engagement task.
   - Link to `research-synthesis-MotionQuest.md` or include short citations.
   - Explicitly state "not a medical device / not diagnosis."

3. Serious Calibration flow
   - Show detected joints and tracking confidence.
   - Explain why shoulders/hips/knees/wrists matter.
   - Make calibration part of the methodology, not just setup.

4. Better Caregiver Report
   - Add "what this means" plain-language interpretation.
   - Add "tracking quality" and "limitations."
   - Add "copy report" or "download JSON" so there is an artifact.
   - Add "method used" so judges see research logic.

5. Devpost / Presentation mode
   - A visible "Presentation Mode" or "Judge Demo" route/section.
   - 90-second guided flow:
     - problem;
     - calibration;
     - Chair Stand;
     - Reach Stars;
     - report;
     - research and limitations.

6. Public project package
   - README with problem, solution, research, demo URL, setup, limitations.
   - Public GitHub or Google Drive artifact.
   - Short abstract for presentation registration.
   - Screenshots/GIF if possible.

### Should Add If Time Allows

- Session export as `.json`.
- Printable caregiver report.
- "Evidence map" section inside the app.
- A small privacy note: no video leaves browser.
- A "Community center / at-home use" scenario.

## What Not To Do

Do not add:
- social feed;
- leaderboard;
- auth;
- database;
- 3D avatar;
- generic health dashboard;
- clinical claims;
- fake validation;
- fake user data.

These would increase surface area without fixing the judging gap.

## Better Build Direction

The right next implementation step is not "more game features."

The right next step is:

> Convert the app into a credible judge-facing project: mission + method + measurement + report + evidence + public artifact.

This can be done without backend and without months of work.

## Revised Priority

| Priority | Work item | Why |
|---:|---|---|
| 1 | Add Home mission/problem/method sections | Fixes Impact and Presentation |
| 2 | Add research/evidence panel | Fixes Excellence in Research / Book angle |
| 3 | Upgrade Caregiver Report interpretation/export | Creates a real outcome artifact |
| 4 | Add presentation mode | Makes 10-minute presentation coherent |
| 5 | Create public README/Devpost package | Required for verification |
| 6 | Tune live tracking | Needed for demo confidence |

## Revised Acceptance Bar

MotionQuest is not submission-ready until:
- public app explains the problem and method;
- public repo/storage link exists;
- README includes demo URL, setup and research basis;
- app has an evidence/method panel;
- report produces copyable/exportable output;
- live camera flow is smoke-tested;
- Devpost abstract and presentation title are prepared.

## Concrete Next Step

Create a `PROJECT_REALITY_UPGRADE` implementation pass:
- update Home screen;
- add Method / Evidence section;
- add Report export and interpretation;
- add Judge Demo path;
- create README and Devpost abstract;
- redeploy.

This is the shortest path from early prototype to real hackathon project.
