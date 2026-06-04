# MotionQuest Release Evidence

Date: 2026-05-05  
Last updated: 2026-06-04
Timezone: Europe/Minsk  
Contest-condition source checked: https://phystech-2026.devpost.com/

## 2026-06-04 Public Package Refresh

Current official-condition sources checked:

- Devpost: https://phystech-2026.devpost.com/
- Binnovative page: https://binnovative-boston.github.io/phystech/2026.html

Current actual-outcome package prepared locally:

| Artifact | Status |
|---|---|
| Live app link | Prepared: `https://motionquest-app.vercel.app`; final redeploy/check is still a separate public-action step. |
| Source package link | Prepared: `https://github.com/AI-Nikitka93/motionquest-phystech-2026`; final push/check is still a separate public-action step. |
| Public title | `MotionQuest: Adaptive Home Movement Lab` |
| Public subtitle | `Webcam movement practice for older adults and seated users, ending in a caregiver-readable report.` |
| Public abstract | Updated in `docs/DEVPOST_SUBMISSION_COPY.md` for seated hand movement, Reach Stars, local MediaPipe tracking, no backend and non-medical limits. |
| Submission checklist | Updated in `docs/FINAL_SUBMISSION_CHECKLIST.md`, including the organizer-requested country/time-zone registration field. |
| Judge story | Updated in `docs/DEVPOST_SUBMISSION_COPY.md` with Research, Social Impact and Entrepreneurship angles. |

Fresh local verification on 2026-06-04:

| Command/check | Result |
|---|---|
| `git diff --check` | Passed; CRLF warnings only. |
| `npm run project:readiness` | Passed. |
| `npm test` | Passed, 33/33 tests. |
| `npm run lint` | Passed. |
| `npm run build` | Passed with Next.js 16.2.7. |
| `npm audit --audit-level=moderate` | Passed, 0 vulnerabilities. |
| `E2E_APP_URL=http://localhost:3013 npm run test:e2e` | Passed, 11/11 Chromium tests. |
| Local production server cleanup | Server stopped; port 3013 confirmed free after e2e and artifact capture. |

Product fix found during screenshot review:

- The Activity 1 completion bridge was incorrectly visible before the user started Adaptive Chair Movement.
- Fixed by moving `Activity 1 saved / Adaptive movement is complete` from the Activity 1 screen to the Reach Stars screen.
- Added an e2e assertion that the completion bridge is not visible before Activity 1 completion and is visible after `Finish early`.

Current public proof artifacts generated on 2026-06-04:

| Artifact | Size |
|---|---:|
| `output/devpost-screenshots/01-home-desktop.png` | 267663 bytes |
| `output/devpost-screenshots/02-seated-adaptive-stage.png` | 164135 bytes |
| `output/devpost-screenshots/03-reach-stars-stage.png` | 403713 bytes |
| `output/devpost-screenshots/04-caregiver-report.png` | 968557 bytes |
| `output/devpost-screenshots/05-home-mobile.png` | 224529 bytes |
| `output/devpost-screenshots/06-evidence-surface-before-after.png` | 1496734 bytes |
| `output/devpost-screenshots/07-safe-demo-fallback-banner.png` | 149993 bytes |
| `output/demo-video/motionquest-adaptive-demo.webm` | 1692689 bytes |
| `output/playwright/motionquest-demo-video-contact-2026-06-04.jpg` | Contact-sheet QA artifact for the backup video. |

Preliminary clean-browser public-link smoke on 2026-06-04:

| Public surface | Result | Evidence |
|---|---|---|
| Production app home | `https://motionquest-app.vercel.app` returned HTTP 200 in a fresh Playwright Chromium context; `MotionQuest`, `Seated` and `Safe demo` were visible. | `output/playwright/public-link-clean-browser-current-home-2026-06-04.png` |
| Production safe-demo report | Same clean context opened the safe-demo report; `Demo fallback`, `Source: safe demo fallback` and `Caregiver report` were visible. | `output/playwright/public-link-clean-browser-current-report-2026-06-04.png` |
| Public GitHub repository | `https://github.com/AI-Nikitka93/motionquest-phystech-2026` returned HTTP 200 while logged out; repository name and `MotionQuest` were visible. | `output/playwright/public-link-clean-browser-current-github-2026-06-04.png` |
| Raw public source links | Raw README and raw `motionquest-app/src/components/MotionQuestApp.tsx` returned HTTP 200 and contained `MotionQuest`. | Console result from the 2026-06-04 Playwright/fetch smoke. |
| Official contest pages | Devpost and Binnovative pages returned HTTP 200 and still exposed the public-link/actual-outcome requirement text. | Browser-open source check plus raw HTTP smoke on 2026-06-04. |

Boundary: this is preliminary proof that the currently published app/source links open from a clean context. It does not close T147/T158/T160/T161 because the local dependency, UX, documentation and artifact refresh is newer than the latest recorded production/source publication; final public deploy/push, then the pre-submission clean-browser verification, still must happen.

Backup proof video technical check:

- Format: WebM / VP8.
- Resolution: 1280x720.
- Duration: 10.8 seconds.
- Content route: home screen, evidence panel, labeled safe demo report, report/evidence/export scroll.
- Boundary: backup proof only; it is not real live-camera evidence.

Open release blockers as of 2026-06-04:

- Final public deploy/push and post-publication clean-browser public-link verification are not performed in this local refresh; the current clean-browser smoke above is preliminary only.
- Real presenter-side camera evidence remains separate from automated/fake-device checks.
- Devpost submission, Discord/Google Forms presentation registration and proof screenshots require human/public-action timing.

## 2026-06-04 Phase 9 Local QA Pass

Official registration check:

- Devpost and the Binnovative PhysTech 2026 page still say the presentation registration link will be shared in the PhysTech Discord channel.
- No public Google Forms registration link was visible on those pages during this check.
- T146 remains open until the organizer-provided Discord link/process is checked at the required time.

Locally verified QA tasks:

| Task | Evidence |
|---|---|
| T162 seated path to report | `E2E_APP_URL=http://localhost:3013 npm run test:e2e` passed 11/11; judge walkthrough covers Home -> `Seated adaptive` -> seated stage -> Reach Stars -> report. |
| T164 no-camera flow | E2E camera recovery test verifies `Camera/model needs attention`, no-camera/no-runtime/no-frames branches and fallback guidance. |
| T165 weak-observation flow | E2E seated walkthrough finishes without usable camera evidence and verifies `Session not valid enough` plus non-medical report language. |
| T166 sample-data banner persistence | E2E safe-demo test verifies `Demo fallback`, sample warning, `Source: safe demo fallback`, export source text and fallback report labels. |
| T167 public claims | Claim-safety scan across public README/app/docs/source found banned/unsafe terms only in explicit negative, disclaimer or limit contexts, not as positive claims. |
| T169 accessibility | E2E verifies large controls, no tiny visible text, contrast, keyboard focus rings and reduced-motion usability. |
| T170 visual consistency | Screenshot/video artifact set generated on 2026-06-04 covers home, seated path, reach activity, report, evidence surface, fallback banner and before/after frame. |

Remaining QA blockers:

- T163: standing-path complete proof needs a safe physical full-body setup.
- T171-T173: real presenter-side camera proof remains separate from automated/fake-device checks.

## 2026-06-04 T168 Cited-Source Review

Scope: current public package and evidence sources used by the README/app evidence surface, Devpost copy, presentation script, Q&A, checklist, claim limits, release evidence and the current research trace.

| Source | Claim supported | Status | Boundary |
|---|---|---|---|
| Devpost PhysTech 2026 | Requirements, deadlines, public-link verification and judging criteria | Browser-open verified and raw HTTP 200 on 2026-06-04 | Recheck before deadline and presentation day because schedule/form links can change. |
| Binnovative PhysTech 2026 page | Discord registration process, Google Forms expectation, 10-minute presentation and prize/judging context | Browser-open verified and raw HTTP 200 on 2026-06-04 | Discord/Google Forms link still needs organizer-channel evidence. |
| BMC Geriatrics 2026 AI exercise scoping review | AI exercise tools for older adults commonly include sensing/tracking, feedback and personalization | Browser-open verified and raw HTTP 200 on 2026-06-04 | Supports research alignment, not clinical validation of MotionQuest. |
| BMC Geriatrics 2026 exergame balance meta-analysis | Exergame training has balance-related older-adult evidence with caveats | Browser-open verified and raw HTTP 200 on 2026-06-04 | Keep low-certainty caveat; do not claim MotionQuest prevents falls. |
| Games for Health Journal 2023 RCT | Exergames and functional physical performance measures including 30-second chair stand | Browser-open verified on 2026-06-04; raw bot request returned 403 | Use as chair-stand inspiration only, not as an official clinical score claim. |
| IJERPH 2021 chair-based exercise systematic review/meta-analysis | Chair-based exercise is a legitimate older-adult activity format with physical-function evidence | Browser-open verified on 2026-06-04; raw bot request returned 403 | Does not prove one MotionQuest session improves function. |
| JMIR 2025 older-adult fitness technology scoping review | Older-adult fitness technology fit should consider lifestyle, dignity, independence, privacy and outcomes | Browser-open verified and raw HTTP 200 on 2026-06-04 | Supports dignity/privacy design emphasis, not product adoption proof. |
| APTA 30-Second Chair Stand Test | 30-second chair stand is a recognized functional lower-body strength test for older adults | Browser-open verified and raw HTTP 200 on 2026-06-04 | MotionQuest uses practice-inspired framing and does not report an official test score. |
| Google MediaPipe Pose Landmarker web docs | Pose Landmarker can be used in web/JavaScript apps and returns pose landmark results for video | Browser-open verified and raw HTTP 200 on 2026-06-04 | Supports implementation mechanism, not accuracy/medical-grade claims. |
| W3C WAI older-user accessibility guidance | Older users have web-accessibility needs; WCAG-based design guidance applies to older users | Browser-open verified and raw HTTP 200 on 2026-06-04 | Supports accessibility design choices, not universal accessibility for every condition. |
| PLOS ONE 2024 home-based exergame usability review | Exergames for older adults involve home use, usability, motivation, challenge, immediate feedback and engagement | Browser-open verified and raw HTTP 200 on 2026-06-04 | Supports design primitives, not clinical outcome claims. |
| Nature Medicine 2024 exergame RCT | Broader exergame/fall-prevention research context exists in older adults | Browser-open verified and raw HTTP 200 on 2026-06-04 | Use only as background context; public copy must not say MotionQuest predicts or prevents falls. |
| Applied Ergonomics 2022 exergame/video-game RCT | Exergame training can combine cognitive and physical activity and reported physical/cognitive signals in older adults | Browser-open verified on 2026-06-04; raw bot request returned 403 | Use only as supporting research context, not as direct MotionQuest efficacy proof. |

Citation cleanup:

- Replaced the older PubMed PMID link for the Guede-Rojas et al. chair-stand RCT with the direct SAGE article URL in current evidence surfaces and research traces because the SAGE page exposes the title, DOI and abstract more directly for public verification.
- Replaced the app evidence card's Human Kinetics product-page source with APTA's `30-Second Chair Stand Test` page, which is a clearer public source for the chair-stand construct.
- Exact scan after cleanup found no remaining old PubMed PMID chair-stand URL or Human Kinetics product-page citation in `docs/` or `motionquest-app/src/`.

Post-cleanup verification:

| Command/check | Result |
|---|---|
| `npm run project:readiness` | Passed. |
| `npm test` | Passed, 33/33 tests. |
| `npm run lint` | Passed. |
| `npm run build` | Passed with Next.js 16.2.7. |
| `npm audit --audit-level=moderate` | Passed, 0 vulnerabilities. |
| `E2E_APP_URL=http://localhost:3013 npm run test:e2e` | Passed, 11/11 Chromium tests. |
| Local production server cleanup | Server stopped; port 3013 confirmed free after e2e. |

## 2026-06-04 Phase 9 Repo Hygiene Pass

Scope: T174-T179 local release hygiene. This pass did not change public claims, sample data, scoring semantics, fallback labels or camera behavior.

| Task | Result | Evidence |
|---|---|---|
| T174 dead-code audit | No unused app modules or components found in the active source graph. | Import/export scan shows `MotionQuestApp`, `CameraStage`, `usePoseTracking`, `gameLogic`, `cameraRecovery`, `sessionStorage` and `visualSystem` are used by app code, tests or the readiness gate. |
| T175 orphan asset audit | Removed unused default Next starter SVG files from `motionquest-app/public/`. | Deleted the five starter SVG assets; exact filename reference scan found no remaining app/docs references after the evidence note was normalized. |
| T176 draft/raw/temp audit | No release-bundle paths matching draft/raw/tmp/temp/prompt/generation/rejected/secret naming were found. | Path scan returned no matches. The older `output/playwright/*.txt` files are safe-demo downloaded report evidence, not temp logs. |
| T177 dependency audit | Dependency list remains intentionally narrow; no safe dependency removals were identified. | Runtime dependencies remain `next`, `react`, `react-dom`, `@mediapipe/tasks-vision`; dev dependencies are TypeScript, lint, Tailwind, Playwright and test tooling only. |
| T178 release-bundle exclusion check | No raw references, prompt drafts, generation logs or local-only secrets were found in the release bundle. | `npm run project:readiness` checks instruction/docs/src token-like patterns; manual path/content review found policy/copy uses of words like token/session only, not exposed credentials. |
| T179 release evidence report | Current release evidence report is prepared with commands, screenshots, public links, known limitations, source review and hygiene status. | This file now records verification commands, screenshot/video artifacts, public URLs, open blockers, cited-source review and repo hygiene. |

Hygiene boundaries:

- Historical Playwright screenshots and report text downloads are retained when referenced by phase QA docs or release history.
- Current Devpost/README screenshot map now points to the 2026-06-04 public artifact set.
- Phase 9 acceptance is not closed because standing-path physical proof, presenter-side camera evidence and final public deploy/push/link checks remain open.

Post-hygiene verification:

| Command/check | Result |
|---|---|
| `npm run project:readiness` | Passed. |
| `npm test` | Passed, 33/33 tests. |
| `npm run lint` | Passed. |
| `npm run build` | Passed with Next.js 16.2.7. |
| `npm audit --audit-level=moderate` | Passed, 0 vulnerabilities. |
| `E2E_APP_URL=http://localhost:3013 npm run test:e2e` | Passed, 11/11 Chromium tests. |
| Local production server cleanup | Server stopped; port 3013 confirmed free after e2e. |

## 2026-06-04 Phase 10/11 Launch And Continuity Preparation

Current official-condition sources rechecked:

- Devpost: https://phystech-2026.devpost.com/
- Binnovative page: https://binnovative-boston.github.io/phystech/2026.html

Prepared locally:

| Task | Evidence |
|---|---|
| T187 day-of presentation checklist | `docs/FINAL_SUBMISSION_CHECKLIST.md` now covers morning, 2-hour, 1-hour, 30-minute, 10-minute, during-demo and after-presentation checks. |
| T191 public-link failure recovery | `docs/FINAL_SUBMISSION_CHECKLIST.md` now separates pre-deadline recovery from after-submission/verification recovery. |
| T192 support responses | `docs/FINAL_REHEARSAL_PLAN.md` now has templates for camera permission, no camera, weak tracking, sample data, non-medical disclaimer and timebox recovery. |
| T193 recurring refresh | `docs/POST_CONTEST_CONTINUITY.md` now has a refresh cadence for contest links, citations, browser-camera assumptions, competitor/product landscape and dependency/security state. |
| T194 post-contest direction | Selected staged hybrid: caregiver/community wellness validation first, preserving the book/research artifact path. |
| T195 book thesis | Drafted Movement Passport thesis around dignity, seated inclusion, confidence-aware observation and caregiver-readable reporting. |
| T196 post-contest roadmap | Roadmap covers final contest proof, real-camera evidence, small pilot, setup tuning, report copy and book chapter conversion without medical claims. |
| T197 continuity package | `docs/POST_CONTEST_CONTINUITY.md` lists startup files, evidence artifacts, known blockers and next decisions for future agents/teammates. |
| T198 artifact archive labels | `output/README.md`, `output/devpost-screenshots/README.md`, `output/demo-video/README.md` and `output/playwright/README.md` separate current public proof from historical verification evidence. |
| T202-T209 long-term governance | `docs/POST_CONTEST_CONTINUITY.md` now defines governance identity constraints, evidence renewal calendar, claim review, decision filter, archive policy, owner map, minimal-data feedback loop and partnership screening. |
| Submission proof folder | `evidence/submission-proof/README.md` defines the required proof files and no-secret/redaction rules for Devpost/registration/public-link evidence. |

Still not closed by this preparation:

- T182-T184: actual Devpost submission, presentation registration and official public verification window proof.
- T185-T186: real presenter rehearsal with live path/fallback path and Q&A.
- T188-T190: actual post-presentation feedback capture, issue log and classification.
- T199-T201 and T210-T211: final retrospective and phase acceptance work after unresolved launch/camera/post-contest blockers are handled.

Post-preparation verification:

| Command/check | Result |
|---|---|
| `git diff --check` | Passed; CRLF warnings only. |
| `npm run project:readiness` | Passed. |
| `npm test` | Passed, 33/33 tests. |
| `npm run lint` | Passed. |
| `npm run build` | Passed with Next.js 16.2.7. |
| `npm audit --audit-level=moderate` | Passed, 0 vulnerabilities. |
| `E2E_APP_URL=http://localhost:3013 npm run test:e2e` | Passed, 11/11 Chromium tests. |
| Local production server cleanup | Server stopped; port 3013 confirmed free after e2e. |
| Task status guard | No accidental closure found for T182-T186, T188-T190, T199-T201 or T210-T211. |

Post-T198 archive-label verification:

| Command/check | Result |
|---|---|
| `git diff --check` | Passed; CRLF warnings only. |
| `npm run project:readiness` | Passed. |
| `npm test` | Passed, 33/33 tests. |
| `npm run lint` | Passed. |
| `npm run build` | Passed with Next.js 16.2.7. |
| `npm audit --audit-level=moderate` | Passed, 0 vulnerabilities. |
| `E2E_APP_URL=http://localhost:3013 npm run test:e2e` | Passed, 11/11 Chromium tests. |
| Local production server cleanup | Server stopped; port 3013 confirmed free after e2e. |
| Task status guard | T198 is closed; T199-T201 and T210-T211 remain open. |

Post-preliminary public-link smoke verification:

| Command/check | Result |
|---|---|
| `git diff --check` | Passed; CRLF warnings only. |
| `npm run project:readiness` | Passed. |
| `npm test` | Passed, 33/33 tests. |
| `npm run lint` | Passed. |
| `npm run build` | Passed with Next.js 16.2.7. |
| `npm audit --audit-level=moderate` | Passed, 0 vulnerabilities. |
| `E2E_APP_URL=http://localhost:3013 npm run test:e2e` | Passed, 11/11 Chromium tests. |
| Local production server cleanup | Server stopped; port 3013 confirmed free after e2e. |
| Task status guard | T147/T158/T160/T161 remain open; preliminary public-link smoke did not close final public verification blockers. |

Final submission audit gate added on 2026-06-04:

| Command/check | Result |
|---|---|
| `npm run project:final-audit` | Passed audit execution; `local_package: GO`, `boundary: GO`, `public_publication: NO-GO`, `external_submission: NO-GO`, `real_camera_evidence: NO-GO`, `final_submission: NO-GO`. |
| `npm run project:final-audit -- --public-smoke` | Passed audit execution with public HTTP smoke: production app, public source, raw README, Devpost and Binnovative returned HTTP 200. Final submission remained `NO-GO` because final public-action proof and real-camera proof are missing. |
| Proof validation hardening | The final audit now rejects placeholder-like submission notes, requires plausible screenshot file sizes and requires `live-evidence.txt` to contain real copied camera status text such as `cameraActive: yes`, `stageTrackingUsable: yes`, `error: none`, `mode: chair` and `mode: reach`. |
| Public package sync hardening | The final audit now treats `public_publication` as its own gate. It requires T147/T158 closure, plausible final clean-browser proof, no unpublished local changes in public-package paths and remote branch freshness during `--public-smoke`. Current result: `public-package-dirty=93`, `remoteHead` matches local `HEAD`, so publication remains `NO-GO` until the local package is committed/pushed and rechecked. |

Post-final-audit gate verification:

| Command/check | Result |
|---|---|
| `git diff --check` | Passed; CRLF warnings only. |
| `npm run project:readiness` | Passed; readiness now checks the final audit script and 10 app files. |
| `npm run project:final-audit -- --public-smoke` | Passed; local package and boundary are `GO`, final submission is still `NO-GO`, public smoke returned HTTP 200 for app/source/raw README/official pages. |
| `npm test` | Passed, 33/33 tests. |
| `npm run lint` | Passed. |
| `npm run build` | Passed with Next.js 16.2.7. |
| `npm audit --audit-level=moderate` | Passed, 0 vulnerabilities. |
| `E2E_APP_URL=http://localhost:3013 npm run test:e2e` | Passed, 11/11 Chromium tests. |
| Local production server cleanup | Server stopped; port 3013 confirmed free after e2e. |

Post-proof-validation hardening verification:

| Command/check | Result |
|---|---|
| `git diff --check` | Passed; CRLF warnings only. |
| `npm run project:readiness` | Passed. |
| `npm run project:final-audit -- --public-smoke` | Passed; local package and boundary are `GO`, final submission is still `NO-GO`, public smoke returned HTTP 200 for app/source/raw README/official pages. |
| `npm test` | Passed, 33/33 tests. |
| `npm run lint` | Passed. |
| `npm run build` | Passed with Next.js 16.2.7. |
| `npm audit --audit-level=moderate` | Passed, 0 vulnerabilities. |
| `E2E_APP_URL=http://localhost:3013 npm run test:e2e` | Passed, 11/11 Chromium tests. |
| Local production server cleanup | Server stopped; port 3013 confirmed free after e2e. |

Post-publication-sync hardening check:

| Command/check | Result |
|---|---|
| `npm run project:final-audit -- --public-smoke` | Passed audit execution; `local_package: GO`, `boundary: GO`, `public_publication: NO-GO`, `external_submission: NO-GO`, `real_camera_evidence: NO-GO`, `final_submission: NO-GO`. |
| Public package sync | `public-package-dirty=93`; remote branch check succeeded and `origin/master` matched local `HEAD` (`4a3eb54340961a40ba90c8e8da49a531ea98112e`), but public package remains `NO-GO` because the working tree has unpublished public-package changes. |
| Public HTTP smoke | Production app, public source, raw README, Devpost and Binnovative returned HTTP 200. |

Post-publication-sync hardening verification:

| Command/check | Result |
|---|---|
| `git diff --check` | Passed; CRLF warnings only. |
| `npm run project:readiness` | Passed. |
| `npm run project:final-audit -- --public-smoke` | Passed audit execution; current publication blockers are T147/T158/final clean-browser proof and `public-package-dirty=93`. |
| `npm test` | Passed, 33/33 tests. |
| `npm run lint` | Passed. |
| `npm run build` | Passed with Next.js 16.2.7. |
| `npm audit --audit-level=moderate` | Passed, 0 vulnerabilities. |
| `E2E_APP_URL=http://localhost:3013 npm run test:e2e` | Passed, 11/11 Chromium tests. |
| Local production server cleanup | Server stopped; port 3013 confirmed free after e2e. |

## Public Outcome

| Item | Evidence |
|---|---|
| Production app | https://motionquest-app.vercel.app returned HTTP 200 |
| Public source package | https://github.com/AI-Nikitka93/motionquest-phystech-2026 returned HTTP 200 |
| Raw README | https://raw.githubusercontent.com/AI-Nikitka93/motionquest-phystech-2026/master/README.md returned HTTP 200 |
| Raw app source | https://raw.githubusercontent.com/AI-Nikitka93/motionquest-phystech-2026/master/motionquest-app/src/components/MotionQuestApp.tsx returned HTTP 200 |
| GitHub repository visibility | PUBLIC, default branch `master` |
| Initial public package commit | `0aa645fd5a19eb96a08a6ed5a18ca2cbc4317265` |
| Release-evidence push commit | `cb3b84bdbb09844525200bfff2e40735690cbe18` |
| Latest production deployment recorded in state | `dpl_D5JKs8JbbaLgGL4EXYDz6UedEc3Z` |

## Fresh Verification Commands

Run from `motionquest-app/` on 2026-05-05:

| Command | Result |
|---|---|
| `npm run lint` | Passed, exit 0 |
| `npm test` | Passed, 14/14 tests |
| `npm run build` | Passed, Next.js production build exit 0 |
| `npm run test:e2e` | Passed, 7/7 Chromium Playwright tests |
| `rg -n "TODO\|placeholder\|insert code" src tests` | No matches, exit 1 because no matches were found |

## Live-Camera False-Positive Fix Evidence

User screenshot on 2026-05-05 showed a hand close to the camera being accepted as `Tracking: High`. The release now includes:

- A regression test proving hand-close false body geometry is rejected.
- Geometric shoulder/hip body-frame gating before high confidence, overlay drawing, readiness and Reach Stars scoring.
- Reach Stars dwell scoring disabled while the body frame is unstable.
- Corrected Reach Stars copy and HUD layout so timer and instructions do not overlap.

## Real-Camera Closeout Instrumentation

The production app now includes a `Copy live evidence` button on every camera
stage. It copies:

- timestamp and URL;
- stage and mode;
- camera/model status;
- pose confidence;
- body-frame usability verdict;
- visible joint group status;
- setup target.

This is the required text evidence for T086-T089, T092-T093, T104 and T105
alongside screenshots in `evidence/camera-smoke/`.

## Reach Stars Seated Webcam Fix

User screenshot on 2026-05-05 showed a realistic seated webcam frame where
shoulders were visible but hips/wrists were not yet visible, causing Reach Stars
to remain stuck while the timer continued.

Fix shipped:

- Reach Stars no longer requires hips.
- Reach Stars accepts shoulders plus one visible elbow/wrist pair.
- Timer pauses until usable reach pose exists.
- Target is hidden until the reach pose is usable.
- Target positions stay in upper reachable camera zones.
- E2E was rerun against production after deployment.

## Seated Adaptive Webcam Fix

User screenshot on 2026-05-05 showed a seated upper body visible while Seated
Adaptive still stayed in warning state and the 30-second timer continued to run.

Fix shipped:

- Seated Adaptive no longer requires hips.
- Seated Adaptive accepts shoulders plus one visible elbow/wrist pair.
- Seated Adaptive timer pauses until usable seated arm pose exists.
- Seated Adaptive copy now asks for one visible forearm instead of generic
  `Move into frame`.
- E2E was rerun against production after deployment `dpl_HxrY5sN9bamDrqULiJvripyVXiZP`.

## Partial Landmark Diagnostic Fix

User screenshots on 2026-05-05 showed the person visibly seated in frame, but
the UI still reported every joint group as missing because the app cleared all
landmarks whenever the pose was not yet scoreable.

Fix shipped:

- Partial upper-body landmarks stay available for the overlay and right-side
  diagnostic panel.
- Timers and scoring still require the stricter usable pose gate.
- Diagnostic visibility uses a lower threshold than scoring, so the UI can show
  what the model is starting to see without treating it as a valid measurement.
- E2E was rerun against production after deployment `dpl_EXh6hjLJVYUPRLKeZyxbLoFZBh6Q`.

## Hand Tracking Fix For Seated Webcam

User screenshots on 2026-05-05 showed MediaPipe Pose drawing false seated arm
lines in the lower empty part of the camera frame while the real hand was near
the face.

Fix shipped:

- Seated and Reach modes load MediaPipe HandLandmarker in addition to
  PoseLandmarker.
- PoseLandmarker shoulders anchor the body frame.
- HandLandmarker wrist data replaces unreliable pose-arm wrist data when a hand
  is visible.
- Seated/reach overlay no longer draws hip connections.
- Seated Adaptive counts hand raise/lower cycles instead of relying only on
  elbow-angle skeletons.
- Hand model URL returned HTTP 200 before deployment.
- E2E was rerun against production after deployment `dpl_2qhbJ1xCbc11WD1XFPX3D8eYS479`.

## Pose Arm Rejection Fix

User screenshot on 2026-05-05 still showed false lower-frame arm points after
HandLandmarker integration.

Fix shipped:

- In seated/reach modes, PoseLandmarker elbow and wrist landmarks are cleared
  before any hand data is merged.
- A real hand is accepted only from HandLandmarker.
- If no hand is detected, the arm remains missing instead of drawing a false
  lower-frame limb.
- E2E was rerun against production after deployment `dpl_D5JKs8JbbaLgGL4EXYDz6UedEc3Z`.

## Hand-Only Seated / Reach Fix

User screenshots on 2026-05-05 showed that close seated PC webcam framing still
made PoseLandmarker body/shoulder logic unstable and could leave the user stuck
even while seated in front of the camera.

Fix shipped:

- User-selected seated mode is now treated as the seated branch; the app no
  longer tries to infer "sitting" from body landmarks in seated mode.
- Seated Adaptive and Reach Stars now require one visible open hand, not
  shoulders, elbows, hips or knees.
- Seated/reach modes ignore PoseLandmarker body, shoulder, elbow and wrist
  landmarks for usability and overlay drawing.
- Only HandLandmarker wrist data can create visible hand points or trigger
  seated/reach scoring.
- Seated reps now use one-hand raise/lower cycles.
- Product-facing copy was tightened from `prototype` / `Judge Demo` to
  `Evidence-aligned exergame session` / `Judge Proof`.
- Local and production browser smoke checks confirmed no old seated/reach copy:
  `First show shoulders`, `Keep shoulders`, `Show shoulders`, `elbow and wrist`,
  `Left arm`, `Right arm`.
- Screenshot evidence:
  `output/playwright/seated-hand-only-local.png` and
  `output/playwright/seated-hand-only-production.png`.
- E2E was rerun against production after deployment `dpl_2cZWQerAMoowNVrKM56ySApA5p7j`.

## Hand-Only Seated / Reach Fix

User screenshot on 2026-05-05 showed that close seated PC webcam framing still
made the app depend on unreliable shoulder/body pose. The practical issue was
product-level: when the user chooses seated mode, the app should not try to
prove that the user is seated from body-pose landmarks.

Fix shipped:

- Seated Adaptive and Reach Stars now use HandLandmarker-only usability.
- User-selected seated mode is treated as the seated branch.
- Seated/reach modes no longer use PoseLandmarker body, shoulder, elbow or
  wrist landmarks for scoring or overlay.
- A seated/reach stage becomes usable when one real HandLandmarker wrist is
  visible.
- Overlay for seated/reach draws only visible hand points and no fake arm/body
  skeleton.
- Seated reps count one visible hand raise/lower cycle.
- HUD and diagnostics now say `one open hand`, `Left hand`, `Right hand` instead
  of `shoulders`, `elbow` and `wrist`.
- Local browser smoke confirmed old shoulder/elbow contract is gone and
  hand-only copy is present.
- Production browser smoke confirmed old shoulder/elbow contract is gone and
  hand-only copy is present.
- E2E was rerun against production after deployment `dpl_7ba5eAUjCkbmnYpzL4JXJhi4NUcm`.

Evidence artifacts:

- `output/playwright/seated-hand-only-local.png`
- `output/playwright/seated-hand-only-production.png`

## MediaPipe Production Asset Checks

| Asset | Result |
|---|---|
| `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm/vision_wasm_internal.wasm` | HTTP 206 with byte-range GET |
| `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm/vision_wasm_internal.js` | HTTP 206 with byte-range GET |
| `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm/vision_wasm_module_internal.wasm` | HTTP 206 with byte-range GET |
| `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/vision_bundle.mjs` | HTTP 206 with byte-range GET |
| `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task` | HTTP 200 |
| `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task` | HTTP 200 |

## Demo Media Evidence

| Artifact | Size |
|---|---:|
| `output/devpost-screenshots/01-home-desktop.png` | 699273 bytes |
| `output/devpost-screenshots/02-seated-adaptive-stage.png` | 327287 bytes |
| `output/devpost-screenshots/03-reach-stars-stage.png` | 320557 bytes |
| `output/devpost-screenshots/04-caregiver-report.png` | 343146 bytes |
| `output/devpost-screenshots/05-home-mobile.png` | 1606667 bytes |
| `output/demo-video/motionquest-adaptive-demo.webm` | 794368 bytes |

## Devpost Rule Alignment Checked

Live Devpost page on 2026-05-05 confirms:

- Project submission deadline: June 27, 2026, 12:00pm EDT.
- Presentation registration deadline: June 27, 2026, 12:00pm EDT.
- Online presentation: June 28, 2026.
- Public link must reference the actual outcome of the work and is verified by organizers in the afternoon of June 27.
- Judging criteria: Impact, Creativity, Presentation.

## Security / Dependency Check

2026-06-04 status: `npm audit --audit-level=moderate` reports 0 vulnerabilities.

Action taken:

- Updated `next` and `eslint-config-next` to `16.2.7`.
- Ran non-forced `npm audit fix`.
- Did not add runtime packages, backend, auth, database or external codebase-indexing services.
- Did not run `npm audit fix --force`.

## Public Framing Sync

2026-06-04 12:29 update:

- Public metadata now renders `MotionQuest: Adaptive Home Movement Lab` with the caregiver-report description.
- `motionquest-app/README.md`, root `README.md`, `docs/DEVPOST_SUBMISSION_COPY.md`, `docs/JUDGE_QA_ANSWER_BANK.md` and `docs/visual-spec.md` were aligned to current seated-hand, Pose/Hand Landmarker and caregiver-report framing.
- Exact stale-term scan found no remaining `webcam exergame prototype`, `Camera-only exergame prototype`, `Two quick movement games`, `Stand so your shoulders`, `validated 30-second chair stand`, `shoulder-elbow-wrist`, `Pose-only` or `browser pose landmarks` wording in the current public framing surfaces.
- Browser verification on local production `http://localhost:3013` confirmed title/description metadata, e2e 11/11, desktop/mobile no horizontal overflow, no sub-44px targets, no sub-16px visible text and no console errors.
- `M:\AI` layout measurement script was attempted but skipped as the final measurement route because it imports standalone `playwright`; this project intentionally has `@playwright/test` only. Equivalent inline measurement was run through the existing project Playwright dependency without adding packages.

## Public Framing Audit Guard

2026-06-04 12:36 update:

- Added `motionquest-app/src/lib/finalSubmissionAuditOutput.test.ts` with a failing-first TDD check that `npm run project:final-audit` reports public-framing guardrails.
- Updated `motionquest-app/scripts/final-submission-audit.mjs` so `local_package` now checks the public metadata title/description, rejects stale prototype/stand-only public wording, and requires current seated hand movement / Hand Landmarker / caregiver-readable report framing in the public surfaces.
- The stale-wording guard intentionally scans current public framing surfaces only: root README, app README, Devpost copy, judge Q&A, visual spec and app metadata. It does not scan release history files, where old terms may appear as historical evidence.

Post-guard verification:

| Command/check | Result |
|---|---|
| `npm test` | Passed, 34/34 tests including the new audit-output test. |
| `npm run project:final-audit` | Passed audit execution; local package and boundary are `GO`, while public publication, external submission, real-camera evidence and final submission remain `NO-GO`. |
| `npm run project:final-audit -- --public-smoke` | Passed audit execution after doc writeback; public smoke returned HTTP 200 for production app, public source, raw README, Devpost and Binnovative. `public_publication` remains `NO-GO` because T147/T158/final proof are open and `public-package-dirty=95`. |
| `git diff --check` | Passed; CRLF warnings only. |
| `npm run project:readiness` | Passed. |
| `npm run lint` | Passed. |
| `npm run build` | Passed with Next.js 16.2.7. |
| `npm audit --audit-level=moderate` | Passed, 0 vulnerabilities. |
| `E2E_APP_URL=http://localhost:3013 npm run test:e2e` | Passed, 11/11 Chromium tests. |
| Local production server cleanup | Server stopped; port 3013 confirmed free after e2e. |

## Local Release Candidate Commit

2026-06-04 12:44 update:

- Created a local release-candidate commit (`chore: prepare MotionQuest release package`) on `master`.
- No push, deploy, Devpost submission or registration action was performed in this step.
- Post-commit `npm run project:final-audit -- --public-smoke` reported `public-package-dirty=0`, so the local public package is no longer blocked by uncommitted public-package paths.
- Public publication still remains `NO-GO` because the current local commit has not been pushed to `origin/master`, T147/T158 remain open and final clean-browser public proof files do not exist yet.

Post-commit publication audit:

| Check | Result |
|---|---|
| Local package | `GO` |
| Boundary | `GO` |
| Public package dirty count | `0` |
| Remote branch freshness | Checked; remote branch does not match local commit yet. |
| Public HTTP smoke | Production app, public source, raw README, Devpost and Binnovative returned HTTP 200. |
| Final submission | `NO-GO` until final push/deploy, clean-browser public proof, Devpost submission, presentation registration and real-camera evidence exist. |

## Content-Aware Public Smoke Gate

2026-06-04 12:52 update:

- Added a TDD-covered public-smoke requirements path: `node scripts/final-submission-audit.mjs --public-smoke-dry-run`.
- `npm run project:final-audit -- --public-smoke` now checks expected text content, not only HTTP status, for the production app, GitHub source page, raw README, Devpost page and Binnovative page.
- Root `README.md` now starts with the final public title `MotionQuest: Adaptive Home Movement Lab — PhysTech 2026`, so raw README can pass the current-title content gate after the release-candidate commit is pushed.
- Current public smoke correctly reports content mismatch before push/deploy: production app and raw README return HTTP 200 but still miss `Adaptive Home Movement Lab` in the public content. This keeps `public_publication` at `NO-GO` until the release candidate is pushed/deployed and rechecked.

Current public-smoke content expectations:

| Surface | Required content snippets |
|---|---|
| Production app | `MotionQuest`, `Adaptive Home Movement Lab`, `Safe demo` |
| Public source | `motionquest-phystech-2026` |
| Raw README | `MotionQuest`, `Adaptive Home Movement Lab`, `caregiver-readable` |
| Devpost | `Physical Activity and Technology Hack Day` |
| Binnovative | `PhysTech 2026` |

## Honest Open Blockers

These tasks are not closed because they need physical, public-action or future evidence:

- T146: official registration link/process must be checked when organizers publish it in Discord.
- T147: judge-openable public verification proof must be rechecked after final deploy/push from a clean browser/session.
- T158 and T160-T161: clean-browser public-link checks and Phase 8 acceptance remain open until the full public package is externally verified after final public deploy/push.
- T163: standing-path proof still needs a safe physical full-body setup.
- T171-T173: real presenter-side camera smoke evidence and manual review are still separate from automated/fake-device screenshots.
- T182-T186: actual Devpost submission, presentation registration, public verification-window proof and real rehearsals cannot be closed locally.
- T188-T190: post-presentation feedback, issue logging and classification require the real presentation event.
