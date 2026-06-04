# Final Submission Checklist

Verification date for contest conditions: 2026-06-04

## Official Source Ledger

Primary contest sources checked on 2026-06-04:

- Devpost: https://phystech-2026.devpost.com/ - deadline, Devpost submission requirement, public project requirement, presentation outline, judges and criteria.
- Binnovative: https://binnovative-boston.github.io/phystech/2026.html - Google Forms presentation-registration process, country/time-zone field, public actual-outcome link wording, presentation start plan and book-publication context.

Deadline conversions for the presenter timezone:

| Official item | Official time | Europe/Minsk action time |
|---|---:|---:|
| Devpost submission deadline | June 27, 2026, 12:00pm EDT | June 27, 2026, 19:00 Europe/Minsk |
| Presentation registration deadline | June 27, 2026, 12:00pm EDT | June 27, 2026, 19:00 Europe/Minsk |
| Tentative presentation kickoff | June 28, 2026, 10:00am EDT | June 28, 2026, 17:00 Europe/Minsk |

Prize wording differs between current official surfaces: Devpost lists 10 non-cash prizes, while the Binnovative page also includes Innovation and Team Work wording. Do not depend on exact award names in final claims. Anchor the pitch to the official judging criteria, Impact, Creativity and Presentation, and use Research, Social Impact and Entrepreneurship as story angles only where the current submission surface supports them.

## T123 — Deadline Checklist

| Item | Deadline | Status |
|---|---:|---|
| Submit project to Devpost | June 27, 2026, 12:00pm EDT | Prepared, not yet submitted |
| Register project presentation | June 27, 2026, 12:00pm EDT | Copy prepared, registration link expected in Discord |
| Public actual-outcome link ready | June 27 afternoon EDT verification | App ready; source/storage link must remain public |
| Online presentation | June 28, 2026, tentatively 10:00am EDT | Script prepared |

## T124 — Presentation Registration Checklist

- Name and contact info: user must enter real personal details.
- Country of residence / time zone: user must enter the real presenter location and time zone when the organizer form asks for it.
- Presentation title: `MotionQuest: Adaptive Home Movement Lab`
- Abstract: use `docs/DEVPOST_SUBMISSION_COPY.md`.
- Public link: use live app plus public repository/storage link.
- Verify Discord for registration link before deadline.

2026-06-04 check: Devpost and the Binnovative PhysTech 2026 page still describe the registration link as organizer-provided in the PhysTech Discord channel. No public Google Forms registration link was visible on those pages during this check, so T146 remains open.

## T125 — Public Outcome Verification Checklist

Judges must be able to verify:

- Live app opens on HTTPS.
- README explains problem, method, limitations and run commands.
- App has adaptive seated/standing choice.
- Safe demo is visibly labeled.
- Report export works.
- Source/storage link references actual code/artifacts, not a placeholder.
- Screenshot/video proof exists in `output/devpost-screenshots/` and `output/demo-video/motionquest-adaptive-demo.webm`.
- Public copy includes Research, Social Impact and Entrepreneurship angles without medical or market overclaims.

## T150-T151 — Current Local Proof Artifacts

Prepared on 2026-06-04:

- `output/devpost-screenshots/01-home-desktop.png`
- `output/devpost-screenshots/02-seated-adaptive-stage.png`
- `output/devpost-screenshots/03-reach-stars-stage.png`
- `output/devpost-screenshots/04-caregiver-report.png`
- `output/devpost-screenshots/05-home-mobile.png`
- `output/devpost-screenshots/06-evidence-surface-before-after.png`
- `output/devpost-screenshots/07-safe-demo-fallback-banner.png`
- `output/demo-video/motionquest-adaptive-demo.webm`

## T148-T155 — Final Timing Checklist

| Task | When | Ready Action |
|---|---|---|
| Re-read Devpost and local rules | 72h before deadline | Open Devpost and compare with this checklist. |
| Check Discord / official channel | 72h before deadline | Confirm registration link and Zoom info. |
| Submission dry run | 48h before deadline | Fill Devpost fields without final submission until all links pass. |
| Final audit dry run | 48h before deadline | Run `npm run project:final-audit -- --public-smoke` from `motionquest-app/`; do not submit while public/submission/final decisions are `NO-GO`. |
| Clean-browser public link check | 48h before deadline | After final push/deploy, run `npm run project:capture-public-proof` from `motionquest-app/` and keep the generated screenshot. |
| Scope freeze | 24h before deadline | Only critical fixes after this point. |
| Submit Devpost | Before June 27 12:00pm EDT | Save screenshot/proof. |
| Register presentation | Before June 27 12:00pm EDT | Save confirmation/proof. |
| Save proof | Immediately after submission/registration | Store screenshots in `evidence/submission-proof/`. |

## T159 — Final Conditions Reread Task

Run this twice: 24 hours before the Devpost deadline and again before the presentation day.

- Reopen https://phystech-2026.devpost.com/ and the Binnovative PhysTech 2026 page.
- Confirm Devpost deadline, presentation registration deadline, presentation date/time, Q&A timebox and public-link requirement.
- Check Discord for the current Google Forms registration link, Zoom link and any schedule update.
- Verify the public app and source/package links from a clean browser/session after final deploy/push.
- Run `npm run project:capture-public-proof -- --dry-run` first; after final deploy/push, run `npm run project:capture-public-proof` to generate `evidence/submission-proof/public-link-clean-browser.png`.
- Run `npm run project:final-audit -- --public-smoke` from `motionquest-app/` and confirm any remaining `NO-GO` decision is understood and backed by a real blocker.
- Save any submission/registration confirmation screenshots under `evidence/submission-proof/`.

## T187 — Day-Of Presentation Checklist

Run this checklist on June 28, 2026 before joining the PhysTech presentation call.

| When | Check | Evidence/Action |
|---|---|---|
| Morning EDT | Reopen Devpost, Binnovative page and Discord. | Confirm presentation schedule, Zoom link, timebox and any organizer update. |
| 2 hours before slot | Open `https://motionquest-app.vercel.app` in a clean browser/session. | Confirm Home, `Seated adaptive`, `Safe demo`, report and export still work. |
| 2 hours before slot | Open public source/package link. | Confirm README, screenshots and demo video are judge-openable. |
| 1 hour before slot | Check camera setup. | Bright front light, stable seated position, one open hand visible; standing path only if safe and full body fits. |
| 30 minutes before slot | Prepare backup artifacts. | Keep `output/demo-video/motionquest-adaptive-demo.webm`, screenshots, evidence notes and Q&A bank open. |
| 10 minutes before slot | Close unrelated tabs/apps. | Keep only Zoom, live app, Devpost/source package, presentation script, Q&A bank and backup video. |
| During demo | Use seated path by default. | If camera fails, switch to labeled safe-demo route and state that fallback values are not live data. |
| After presentation | Save proof and notes. | Put confirmation screenshots and schedule/Zoom proof notes under `evidence/submission-proof/`; put judge feedback in `docs/POST_CONTEST_CONTINUITY.md`. |

## T191 — Public-Link Failure Recovery

If the public product link fails before the Devpost deadline:

1. Redeploy only after explicit public-action approval and rerun clean-browser checks.
2. If the app URL changes, update Devpost, registration form, README and this checklist in the same pass.
3. Save the clean-browser screenshot under `evidence/submission-proof/public-link-clean-browser.png`.

If the public product link fails after submission or during organizer verification:

1. Do not hide the failure or replace the link with unrelated material.
2. Send the organizer a concise recovery note through the official channel: live app issue, source/package link, screenshot set and backup video path.
3. Use the public repository/package as the actual-outcome fallback while restoring the live app.
4. Record what failed, when it failed, what link was provided, and what proof was sent in `evidence/submission-proof/submission-proof-notes.md`.

## Not Yet Closeable On 2026-06-04

- Actual Devpost submission.
- Actual presentation registration.
- Proof screenshots of submission/registration.
- Discord registration link verification near deadline.
