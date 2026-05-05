# Phase 1 Results — T001-T010

Date: 2026-05-05  
Scope: first 10 TODO items from `docs/MASTER_TODO_WINNING_PROJECT.md`  
Sources:
- Local conditions: `УСЛОВИЯ.txt`
- Live Devpost: https://phystech-2026.devpost.com/
- Official PhysTech page: https://binnovative-boston.github.io/phystech/2026.html
- Live recheck: 2026-05-05

## T001 — Local Conditions Extracted

Mandatory requirements from `УСЛОВИЯ.txt`:
- Eligibility: above legal age of majority in country of residence; all countries/territories except standard exceptions.
- Entry is free; event is online and public.
- Complete all 3 required actions: submit project to Devpost, register project presentation, and give online presentation.
- Submit project to Devpost by June 27, 2026, 12:00pm Eastern / 7:00pm GMT+3.
- Register project presentation by June 27, 2026, 12:00pm Eastern / 7:00pm GMT+3.
- Give online presentation on June 28, 2026.
- Provide name/contact info, country/time zone, project presentation title, short abstract / description and a publicly accessible link to the actual work.
- Public link must reference the actual outcome of the work; organizers verify the result before scheduling presentation.
- Firm deadlines; failure to complete all requirements disqualifies from award judging.
- Presentation total: 10 minutes, including approximately 3 minutes for Q&A.
- Judging criteria: Impact, Creativity, Presentation.

## T002 — Live Devpost / Official Site Check

Live Devpost confirms:
- Deadline: June 27, 2026, 12:00pm EDT.
- Online, public hackathon.
- 10 non-cash prizes.
- 201 participants shown on Devpost at the 2026-05-05 live recheck.
- Categories: Education, Health, IoT.
- Required presentation registration data includes name/contact, title, abstract and public actual-work link.
- Judging criteria are Impact, Creativity and Presentation.
- Project topics include monitoring performance, logging/tracking practice, recording/analyzing/communicating activity data, engagement, health/wellness and injury-related support.

Official PhysTech page confirms:
- Event date: June 28, 2026, EST.
- Registration asks for country of residence / time zone in addition to contact, title, summary and public link.
- Public link may be code repository or online storage; actual outcome must be verifiable.
- Solutions may include apps, games, websites, sensors, data analysis, visualization, AI/ML and algorithms.
- Book chapter publication is planned for selected projects.

## T003 — Local vs Live Discrepancy Table

| Area | Local `УСЛОВИЯ.txt` | Live Devpost / Official site | Action |
|---|---|---|---|
| Deadline | June 27, 2026 12pm EST wording plus local GMT+3 display | Devpost shows June 27, 2026 12:00pm EDT; local display is 7:00pm GMT+3 | Use June 27, 2026 12:00pm Eastern / 7:00pm GMT+3 as working deadline and recheck live before final submission. |
| Presentation registration | Name/contact, title, abstract, public link | Official site also asks country/time zone | Add country/time zone to submission data checklist. |
| Prize naming | Creativity, Research, Entrepreneurship, Social Impact, Emerging Talent, Key Contributor | Official site also mentions Innovation and Team Work | Track Devpost prize list for submission; mention Research/Social Impact as primary fit. |
| Public proof | Public code repo or online storage actual work link | Same, with strong verification warning | App URL alone is insufficient; prepare repo/storage package. |
| Book publication | Binnovative Innovation Book Series | Official site says selected abstracts can become book chapters through Amazon KDP | Keep book-chapter angle as major artifact. |
| Presentation timing | June 28, 10am EST, 10 min incl. Q&A | Same, may adjust by time zones | Prepare flexible time-zone readiness. |

## T004 — Exact Timeline

| Time | Requirement | Owner Artifact |
|---|---|---|
| Now through June 26 | Build real project artifact, public package, presentation and backup demo | App, README, research summary, screenshots, demo script |
| June 27, 2026 before 12:00pm Eastern / 7:00pm GMT+3 | Submit project to Devpost | Devpost submission page |
| June 27, 2026 before 12:00pm Eastern / 7:00pm GMT+3 | Register project presentation | Google Form / Discord-shared link |
| Afternoon June 27, 2026 | Organizers verify actual work through public link | Public app + public repo/storage package |
| Early morning June 28, 2026 EDT | Presentation schedule announced | Discord / official channel |
| June 28, 2026 around 10:00am EDT | Online presentation event starts, timing may adjust | Zoom |
| Assigned presentation slot | 10-minute presentation including about 3 minutes Q&A | Slides, app, backup demo, Q&A sheet |

Operational buffer:
- Submit Devpost project and presentation registration at least 24 hours before the official deadline.
- Reopen Devpost and the official page on submission day before final send.

## T005 — Revised Project Goal

Old insufficient goal:
> Build and deploy a webcam exergame.

Correct contest goal:
> Create a publicly verifiable, research-backed physical-activity technology project that judges can open, understand and evaluate: MotionQuest demonstrates camera-only functional movement practice, explains why it matters, produces a caregiver-readable session outcome and is packaged for Devpost, presentation and book-chapter extension.

## T006 — Main Contest Bet

Primary contest bet:
- Excellence in Research.
- Excellence in Social Impact.
- Strong placement potential if Presentation is clear.

Reason:
- MotionQuest has the strongest fit when framed as evidence-aligned functional movement support, not as entertainment.
- The target audience and hardware-free access support Social Impact.
- Research synthesis and method explanation support Research / book-chapter potential.

## T007 — Secondary Contest Bet

Secondary contest bet:
- Creativity through accessible camera-only functional movement lab.

Creativity claim:
> MotionQuest is creative because it connects short exergame mechanics to functional movement constructs and caregiver-readable outcomes using only a browser webcam, instead of treating gamification as decoration.

Risk:
- If the app shows only counters and stars, judges will see a generic fitness game.

Mitigation:
- Add visible problem, method, evidence and report interpretation layers before final submission.

## T008 — Problem Statement

Final problem statement:

> Many older adults need safe, low-friction ways to practice physical activity and communicate progress outside formal clinical settings, but most tools either require wearables, feel clinical, or provide activity scores that caregivers cannot easily interpret.

Short version:

> Older adults need accessible movement practice and understandable feedback without special hardware.

## T009 — Solution Statement

Final solution statement:

> MotionQuest turns a normal webcam into an accessible functional movement lab: participants complete short chair-stand and reach games, while the browser estimates movement, tracks confidence and creates a caregiver-readable report grounded in research-inspired physical-activity measures.

Short version:

> A browser webcam becomes a research-aligned movement session and report, not just a fitness game.

## T010 — Current Closed Scope

Already completed:
- Client-only Next.js application exists in `motionquest-app/`.
- Production deployment exists at `https://motionquest-app.vercel.app`.
- HTTPS hosting is available for webcam permissions.
- MediaPipe Tasks Vision is integrated in a client hook.
- WASM/model URLs are CDN-hosted and returned HTTP 200 during deployment verification.
- Two movement activities exist: Chair Stand and Reach Stars.
- Camera stage and canvas overlay exist.
- localStorage report flow exists.
- Basic tests for movement heuristics exist.
- Local `npm run lint`, `npm test` and `npm run build` passed before deployment.

Still not closed by T010:
- App does not yet visibly communicate problem, method, research basis or contest impact.
- Public repository/storage package is not prepared.
- Live tracking has not been tuned with a physical webcam.
- Caregiver report needs interpretation/export to become a real outcome artifact.
