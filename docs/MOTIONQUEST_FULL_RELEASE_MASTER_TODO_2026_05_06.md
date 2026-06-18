# MotionQuest Full Release MASTER TODO — 2026-05-06

PROJECT ONE-LINER
MotionQuest — adaptive home movement lab для пожилых людей и seated users, который превращает короткую безопасную сессию физической активности в честный caregiver-readable report с research alignment, dignity/privacy promise и прозрачными limitation boundaries.

IDEA ANCHOR
- core value: сделать домашнюю физическую активность доступной, наблюдаемой, объяснимой и достойной для людей, которых часто исключают standing-first fitness products.
- core user: пожилой пользователь, seated user, caregiver/family reviewer, judge/research reviewer, future community wellness facilitator.
- correct end-state: публичный, проверяемый, research-backed, accessible first release, который можно открыть, пройти, понять, показать жюри, связать с evidence and book thesis, и безопасно поддерживать после запуска.
- do not drift into: toy camera game, medical diagnosis, fall-risk prediction, clinical scoring, generic fitness tracker, leaderboard/social app, fake AI claims, hidden sample data, unsupported numeric accuracy claims.

INTERPRETATION
Проект должен быть пересобран как полноценный contest-winning product, а не как набор экранов вокруг камеры. Главный outcome — не score, а trustworthy report. Главная дифференциация — seated-first inclusion, dignity/privacy, confidence-by-mode, conservative research claims and a strong public proof package. План должен покрывать не только product screens, но и research evidence, visual DNA, live proof, fallback proof, release readiness, supportability, project hygiene and post-release learning.

RECOMMENDED PROJECT SHAPE
Public single-user home activity product with caregiver-readable output, supported by a complete contest artifact package and a future path into caregiver/community wellness. First release remains focused, but must feel complete: safe start, ability choice, camera readiness, two activity paths, report, evidence surface, fallback proof, presentation story and public verification.

ASSUMPTIONS / NEEDS CONFIRMATION
- ASSUMPTION: recommended public subtitle is `Adaptive Home Movement Lab`.
- ASSUMPTION: strongest award strategy is Research + Social Impact + Entrepreneurship, with Creativity and Presentation carried by the same story.
- NEEDS CONFIRMATION: final presentation title and final one-paragraph abstract.
- NEEDS CONFIRMATION: which live activity path is safest for the presenter.
- NEEDS CONFIRMATION: whether recorded backup proof will be included in final public package.
- NEEDS CONFIRMATION: exact post-contest product direction: caregiver, community wellness, research/book artifact, or staged hybrid.

PHASE MAP
1. Contest Anchor, Freshness And Product Definition
2. Evidence, Claims And Award Strategy
3. User Model, Movement Semantics And Report Outcome
4. Visual DNA, Accessibility And AI Asset Production
5. Product Experience, Screens And Degraded States
6. Measurement Confidence, Safety And Privacy Trust
7. Build Enablement, Codebase Understanding And Agent Workflow
8. Public Artifact Package, Submission And Presentation
9. QA, Release Readiness And Project Hygiene
10. Launch, Support, Post-Release Learning And Book Path
11. Long-Term Governance, Continuity And Evidence Renewal

MASTER TODO

PHASE 1 — Contest Anchor, Freshness And Product Definition
[x] T001 [P0] Перечитать официальный PhysTech 2026 page на дату выполнения и зафиксировать актуальные deadline, rules, presentation requirements, public verification requirement, prize list and judging criteria.
[x] T002 [P0] Сверить локальный `УСЛОВИЯ.txt` с официальной страницей конкурса и закрыть расхождения в отдельной conditions note.
[x] T003 [P0] Зафиксировать актуальную contest timeline in local timezone and contest timezone without ambiguity.
[x] T004 [P0] Перечитать `docs/MOTIONQUEST_WORLD_CLASS_MASTER_BRIEF.md` and extract final product promise into one stable public sentence.
[x] T005 [P0] Зафиксировать final IDEA ANCHOR в project memory so future work cannot drift into toy camera game or medical product.
[x] T006 [P0] Развести first release product promise, contest proof promise and future product promise.
[x] T007 [P0] Зафиксировать exact do-not-claim list: diagnosis, fall risk, clinical validation, medical score, official assessment, guaranteed accuracy.
[x] T008 [P0] Перепроверить актуальные external dependencies and assumptions that can change before submission: contest rules, public verification expectations, cited sources, competitor landscape, browser camera behavior and hosting status.
[x] T009 [P1] Сформировать freshness register: what becomes stale fastest, who rechecks it, when it must be rechecked, and where evidence is stored.
[x] T010 [P1] Подготовить release-facing glossary: activity, session, observation, confidence, limitation, sample session, live session, caregiver report, movement passport.
[x] T011 [P0] Переписать project goal from "make the app work" to "produce a verifiable contest outcome that judges can open, understand and trust".
[x] T012 [P0] Зафиксировать three-award strategy as one story: Research through evidence, Social Impact through seated inclusion, Entrepreneurship through caregiver/community path.
[x] T013 [P1] Зафиксировать key user narratives: seated older adult, caregiver reviewer, judge reviewer, future community facilitator.
[x] T014 [P1] Развести user pain, buyer/user value and contest value so the product does not rely only on technical novelty.
[x] T015 [P1] Обновить project shape statement to "public single-user home movement lab with caregiver-readable output".
[x] T016 [P1] Зафиксировать exact first-release boundaries without shrinking the product into a toy scope: what must be complete, what is future, what is forbidden.
[x] T017 [P1] Проверить current app, docs and submission copy against the new product promise and list every mismatch.
[x] T018 [P1] Подготовить product consistency checklist for app, report, README, presentation, Devpost copy and evidence surface.
[x] T019 [P2] Зафиксировать future scope parking lot so useful ideas do not contaminate first release.
[x] T020 [P0] Сформировать Phase 1 acceptance note: contest rules, product anchor, freshness register and product boundaries are aligned.
[x] T021 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечислить одной строкой: что реально закрыто в этой фазе.
    2. Сравнить с IDEA ANCHOR: приближает ли итог фазы к correct end-state?
    3. Проверить: нет ли незакрытых RELEASE BLOCKER из этой фазы.
    4. Дать явный сигнал: "Фаза 1 закрыта. Переходим к фазе 2" или "Фаза 1 не закрыта. Стоп. Вот что мешает: ..."

PHASE 2 — Evidence, Claims And Award Strategy
[x] T022 [P0] Перечитать `research-synthesis-MotionQuest.md` and extract the strongest evidence points for older-adult exergames, functional movement and home activity.
[x] T023 [P0] Перечитать `docs/MOTIONQUEST_WORLD_CLASS_MASTER_BRIEF.md` mini-bibliography and verify every DOI/URL still opens on the execution date.
[x] T024 [P0] Развести evidence into problem significance, activity design support, seated/chair-based support, pose observation limits, dignity/privacy and technology adoption.
[x] T025 [P0] Подготовить Evidence Surface bibliography card with named references and one-line claim boundary for each.
[x] T026 [P0] Обеспечить that every public research statement has a traceable source or is labeled as product inference.
[x] T027 [P0] Обновить `JUDGING_CLAIMS_AND_LIMITS` so it includes confidence-by-mode and sample/live proof boundaries.
[x] T028 [P0] Зафиксировать Research Award proof: evidence notes, named citations, method limits, confidence language and no overclaiming.
[x] T029 [P0] Зафиксировать Social Impact Award proof: seated users, dignity, privacy, caregiver communication, no wearable-first barrier.
[x] T030 [P0] Зафиксировать Entrepreneurship Award proof: caregiver/family value, community wellness path, non-medical category and future business model without fake numbers.
[x] T031 [P1] Подготовить `Dignity & Privacy` source note grounded in older-adult technology literature.
[x] T032 [P1] Подготовить `Movement Passport` source note as future book thesis, clearly non-medical.
[x] T033 [P1] Подготовить confidence-by-mode evidence note, including what can and cannot be observed in seated and standing modes.
[x] T034 [P1] Сформировать explicit rule that numeric landmark-loss claims cannot be published without cited exact source or project validation.
[x] T035 [P1] Обновить evidence language for chair-stand-inspired activity so it stays practice-oriented, not clinical.
[x] T036 [P1] Обновить evidence language for reach activity so it stays upper-body engagement/practice proxy, not formal range assessment.
[x] T037 [P1] Подготовить judge-facing evidence summary readable in under one minute.
[x] T038 [P1] Подготовить longer evidence appendix for book/research reviewers.
[x] T039 [P2] Зафиксировать evidence freshness cycle for post-submission updates and post-contest continuation.
[x] T040 [P0] Сформировать Phase 2 acceptance note: all public claims have sources, boundaries and award mapping.
[x] T041 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечислить одной строкой: что реально закрыто в этой фазе.
    2. Сравнить с IDEA ANCHOR: приближает ли итог фазы к correct end-state?
    3. Проверить: нет ли незакрытых RELEASE BLOCKER из этой фазы.
    4. Дать явный сигнал: "Фаза 2 закрыта. Переходим к фазе 3" или "Фаза 2 не закрыта. Стоп. Вот что мешает: ..."

PHASE 3 — User Model, Movement Semantics And Report Outcome
[x] T042 [P0] Зафиксировать primary user model: older adult, seated user and mobility-diverse home participant.
[x] T043 [P0] Зафиксировать caregiver/reviewer model: needs plain-language session understanding, not raw technical measurements.
[x] T044 [P0] Развести standing path and seated path as equal dignity choices, not normal path plus fallback.
[x] T045 [P0] Подготовить ability-choice copy that asks safety and comfort without implying disability diagnosis.
[x] T046 [P0] Зафиксировать movement semantics for Adaptive Chair Movement: standing practice signal and seated upper-body practice signal.
[x] T047 [P0] Зафиксировать movement semantics for Reach Stars: visible hand/upper-body target interaction and engagement proxy.
[x] T048 [P0] Зафиксировать what counts and what does not count for every activity in language suitable for app and report.
[x] T049 [P0] Обеспечить that timer, scoring and report validity are tied to usable session conditions rather than decorative movement.
[x] T050 [P0] Определить report as the primary product outcome, not a post-game summary.
[x] T051 [P0] Развести report sections: session summary, observed activity, confidence, limitations, interpretation, next safe step, disclaimer.
[x] T052 [P1] Подготовить caregiver report copy for valid standing session.
[x] T053 [P1] Подготовить caregiver report copy for valid seated session.
[x] T054 [P1] Подготовить caregiver report copy for limited-confidence session.
[x] T055 [P1] Подготовить caregiver report copy for sample/fallback session.
[x] T056 [P1] Зафиксировать sample/live distinction rules inside report and exportable summary.
[x] T057 [P1] Подготовить `Movement Passport` future data meaning without implying medical record.
[x] T058 [P1] Подготовить return-user story that does not depend on long-term medical tracking.
[x] T059 [P2] Зафиксировать edge cases: close camera, partial body, seated desk setup, poor lighting, hand near lens, no camera, permission denied.
[x] T060 [P0] Сформировать Phase 3 acceptance note: user model, movement meaning and report meaning are unambiguous.
[x] T061 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечислить одной строкой: что реально закрыто в этой фазе.
    2. Сравнить с IDEA ANCHOR: приближает ли итог фазы к correct end-state?
    3. Проверить: нет ли незакрытых RELEASE BLOCKER из этой фазы.
    4. Дать явный сигнал: "Фаза 3 закрыта. Переходим к фазе 4" или "Фаза 3 не закрыта. Стоп. Вот что мешает: ..."

PHASE 4 — Visual DNA, Accessibility And AI Asset Production
[x] T062 [P0] Изучить current visual spec and decide what still feels toy-like, medical, generic or template-like.
[x] T063 [P0] Провести visual evidence research across accessible health, exergame, older-adult UI, caregiver report and trustworthy dashboard references.
[x] T064 [P1] Проверить актуальные Lazyweb/plugin instructions or equivalent visual evidence workflow before relying on screenshot/reference tooling.
[x] T065 [P1] If visual evidence tooling is available, collect targeted references for onboarding, camera activity, report, evidence surface and before/after presentation slide.
[x] T066 [P0] Проанализировать эталонные repositories and design handoff patterns including google-labs-code/design.md, VoltAgent/awesome-design-md, kzhrknt/awesome-design-md-jp, bergside/awesome-design-skills, shaom/brand-to-design-md-skill and hasi98/designpull.
[x] T067 [P0] Сформировать MotionQuest DESIGN.md that can guide Google Stitch or another AI design workflow without copying external UI.
[x] T068 [P0] Зафиксировать unique visual DNA: warm kinetic trust, dignity-first movement lab, not hospital dashboard and not arcade toy.
[x] T069 [P0] Довести typography scale, spacing rhythm, density, contrast and button affordances for older-adult readability.
[x] T070 [P0] Довести camera-stage visual hierarchy so the user knows what to do before noticing decorative overlay.
[x] T071 [P0] Довести Dignity & Privacy card as a visible trust object, not hidden legal copy.
[x] T072 [P1] Довести Evidence Surface visual treatment so citations look credible but not academic-heavy.
[x] T073 [P1] Довести report visual language so it feels like a useful artifact a caregiver can trust.
[x] T074 [P1] Подготовить icon system direction with consistent metaphor, stroke weight, contrast and large-size readability.
[x] T075 [P1] Организовать AI asset production cycle: reference selection, generation brief, single-asset generation, manual curation, AI review, rejection of artifacts and final consistency pass.
[x] T076 [P1] Подготовить rules for rejecting low-quality AI visuals: distorted anatomy, fake medical symbols, unreadable icons, cheap gradients, inconsistent style.
[x] T077 [P1] Подготовить before/after presentation slide visual spec: prototype risk on left, inclusive movement lab on right.
[x] T078 [P2] Сформировать future asset guideline so new illustrations/icons keep the same dignity-first visual language.
[x] T079 [P2] Проверить that all visual assets have provenance, usage rights and non-copying discipline.
[x] T080 [P0] Сформировать Phase 4 acceptance note: product has a distinct visual identity and production-ready visual guidance.
[x] T081 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечислить одной строкой: что реально закрыто в этой фазе.
    2. Сравнить с IDEA ANCHOR: приближает ли итог фазы к correct end-state?
    3. Проверить: нет ли незакрытых RELEASE BLOCKER из этой фазы.
    4. Дать явный сигнал: "Фаза 4 закрыта. Переходим к фазе 5" или "Фаза 4 не закрыта. Стоп. Вот что мешает: ..."

PHASE 5 — Product Experience, Screens And Degraded States
[x] T082 [P0] Довести Home screen so it explains the problem, promise, seated inclusion, dignity/privacy and judge proof path before camera use.
[x] T083 [P0] Довести ability-choice surface so seated mode is a first-class choice with positive wording.
[x] T084 [P0] Довести camera readiness surface so it gives human setup guidance rather than blaming the user.
[x] T085 [P0] Довести Adaptive Chair Movement surface for standing path with clear what-counts copy and confidence gating.
[x] T086 [P0] Довести Adaptive Chair Movement surface for seated path with hand/upper-body framing and no false lower-body claims.
[x] T087 [P0] Довести Reach Stars surface so target interaction is understandable, reachable and clearly counted.
[x] T088 [P0] Довести report screen so it separates observed results, confidence, limits, next step and non-medical disclaimer.
[x] T089 [P0] Довести Evidence surface with mini-bibliography, claim boundaries and confidence-by-mode.
[x] T090 [P0] Довести fallback/sample experience with persistent yellow banner and no possibility of confusing sample data with live data.
[x] T091 [P1] Довести no-camera flow so it remains a useful product explanation, not a dead end.
[x] T092 [P1] Довести permission-denied flow with plain recovery guidance and privacy reassurance.
[x] T093 [P1] Довести weak-observation flow with clear "not valid enough" explanation.
[x] T094 [P1] Довести partial-visibility flow with specific missing-signal guidance.
[x] T095 [P1] Довести loading/preparing state so the user understands that the product is not frozen.
[x] T096 [P1] Довести completion state so the user naturally moves from activity to report.
[x] T097 [P1] Довести copyable/exportable report surface without implying official record.
[x] T098 [P2] Проверить mobile and desktop layout for older-adult readability and no hidden controls.
[x] T099 [P2] Проверить keyboard, focus and large-target interaction for all critical screens.
[x] T100 [P0] Сформировать Phase 5 acceptance note: every core screen has normal, degraded and fallback states.
[x] T101 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечислить одной строкой: что реально закрыто в этой фазе.
    2. Сравнить с IDEA ANCHOR: приближает ли итог фазы к correct end-state?
    3. Проверить: нет ли незакрытых RELEASE BLOCKER из этой фазы.
    4. Дать явный сигнал: "Фаза 5 закрыта. Переходим к фазе 6" или "Фаза 5 не закрыта. Стоп. Вот что мешает: ..."

PHASE 6 — Measurement Confidence, Safety And Privacy Trust
[x] T102 [P0] Зафиксировать mode-by-mode confidence contract: seated hand, seated limited, standing body, weak camera and fallback sample.
[x] T103 [P0] Обеспечить that every counted result has a visible confidence explanation.
[x] T104 [P0] Обеспечить that untrusted sessions do not produce misleading success language.
[x] T105 [P0] Довести seated mode language so lower body is not interpreted when not visible.
[x] T106 [P0] Довести standing mode language so chair-stand-inspired practice is not clinical scoring.
[x] T107 [P0] Довести Reach Stars language so it is reach/engagement practice, not formal mobility assessment.
[x] T108 [P0] Подготовить safety wording for users who should not stand, move quickly or continue if uncomfortable.
[x] T109 [P0] Подготовить privacy promise wording: camera session-bound, no saved video, user controls report.
[x] T110 [P1] Подготовить dignity wording: product respects seated participation and does not frame adaptation as failure.
[x] T111 [P1] Подготовить independence wording: user can complete a session without complex setup or special wearable.
[x] T112 [P1] Подготовить caregiver interpretation rules for high-confidence, medium-confidence and low-confidence report states.
[x] T113 [P1] Подготовить report limitation text for close camera, hand near lens, partial view and poor lighting.
[x] T114 [P1] Проверить all copy for accidental medical language and remove unsafe phrasing.
[x] T115 [P1] Проверить all copy for blame language and replace with supportive setup guidance.
[x] T116 [P1] Подготовить trust checklist for every screen: what is visible, what is counted, what is limited, what user controls.
[x] T117 [P2] Подготовить manual review protocol for real-camera evidence and screenshots.
[x] T118 [P2] Подготовить user-side smoke protocol for seated and standing tests without unsafe movement.
[x] T119 [P2] Зафиксировать escalation rule: if real camera proof contradicts product claim, product claim is weakened, not evidence inflated.
[x] T120 [P0] Сформировать Phase 6 acceptance note: confidence, safety, privacy and dignity are explicit product behavior.
[x] T121 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечислить одной строкой: что реально закрыто в этой фазе.
    2. Сравнить с IDEA ANCHOR: приближает ли итог фазы к correct end-state?
    3. Проверить: нет ли незакрытых RELEASE BLOCKER из этой фазы.
    4. Дать явный сигнал: "Фаза 6 закрыта. Переходим к фазе 7" или "Фаза 6 не закрыта. Стоп. Вот что мешает: ..."
    2026-05-06 result: Phase 6 trust/safety/privacy/dignity behavior is already in the app and verified; Phase 6 is closed. Proceed to Phase 7.

PHASE 7 — Build Enablement, Codebase Understanding And Agent Workflow
[x] T122 [P0] Провести project file scan and confirm current app, docs, artifacts, tests, deployment notes and evidence folders match the latest product brief.
[x] T122A [P0] Усилить project-readiness scan so release artifact folders, Devpost screenshots, demo video and camera evidence folder are checked by executable verification.
[x] T123 [P0] Проверить whether AI skill stack discovery is useful for the current project and document install/skip decision.
[x] T124 [P1] Проверить актуальный README/security model of autoskills or equivalent curated skill-discovery path before any installation.
[x] T125 [P1] Выполнить safe dry-run or manual skill review and install only skills that directly help this project.
[x] T126 [P1] Зафиксировать skill-selection result in project notes without exposing secrets or tokens.
[x] T127 [P0] Оценить whether codebase intelligence tooling is justified for this project size and current risk.
[x] T128 [P1] If codebase intelligence is useful, verify current setup requirements, license, safety model and indexing cost before use.
[x] T129 [P1] Зафиксировать search-before-reading guidance for exploration while preserving exact string search for known identifiers.
[x] T130 [P0] Подготовить project instructions so future agents start from AGENTS, state, master brief, TODO and current contest conditions.
[x] T131 [P0] Зафиксировать no-secret rule for all workflow tooling: use existing auth, environment or local credential store; never print or commit tokens.
[x] T132 [P1] Подготовить codebase impact checklist before changing shared report, activity, camera or submission logic.
[x] T133 [P1] Подготовить dependency audit checklist on product outcome level: what is necessary, what is unused, what creates risk.
[x] T134 [P1] Подготовить artifact ownership map: app, report, evidence surface, screenshots, presentation, submission copy, demo media.
[x] T135 [P1] Подготовить agent handoff checklist so product, design, build, QA and launch work do not contradict each other.
[x] T136 [P1] Зафиксировать required verification commands and human-camera evidence requirements without treating them as substitutes for each other.
[x] T137 [P2] Подготовить project notes for known camera limitations and real-user setup constraints.
[x] T138 [P2] Подготовить branch/change hygiene rule: no unrelated rewrites, no unreviewed claim changes, no silent sample-data changes.
[x] T139 [P2] Подготовить repeatable release evidence folder structure for screenshots, demo video and copied live evidence.
[x] T140 [P0] Сформировать Phase 7 acceptance note: future agents can work safely from current project state without rediscovering context.
[x] T141 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечислить одной строкой: что реально закрыто в этой фазе.
    2. Сравнить с IDEA ANCHOR: приближает ли итог фазы к correct end-state?
    3. Проверить: нет ли незакрытых RELEASE BLOCKER из этой фазы.
    4. Дать явный сигнал: "Фаза 7 закрыта. Переходим к фазе 8" или "Фаза 7 не закрыта. Стоп. Вот что мешает: ..."
    2026-06-04 result: Phase 7 build enablement, codebase understanding and agent workflow are closed. T122-T140 instruction contracts, readiness gate, dependency allowlist, no-secret workflow, artifact ownership, handoff, verification contract, camera limitations and release evidence structure were rechecked against current project state and current PhysTech conditions. A dependency audit regression was fixed by updating `next` and `eslint-config-next` to `16.2.7`, then refreshing the lockfile with non-forced `npm audit fix`; e2e no-live-camera recovery now accepts the current no-camera/runtime/detected-no-frames branches. Verification passed: `npm run project:readiness`, `npm test` 33/33, `npm run lint`, `npm run build`, `npm audit --audit-level=moderate` 0 vulnerabilities, and `E2E_APP_URL=http://localhost:3013 npm run test:e2e` 11/11. Production redeploy was not performed because public deployment needs explicit approval. Фаза 7 закрыта. Переходим к фазе 8.

PHASE 8 — Public Artifact Package, Submission And Presentation
[x] T142 [P0] Подготовить final public abstract aligned with Adaptive Home Movement Lab, report outcome and three-award story.
[x] T143 [P0] Подготовить final presentation title and subtitle without overclaiming novelty.
[x] T144 [P0] Подготовить public project page/package that references actual outcome, not just plans.
[x] T145 [P0] Подготовить submission checklist for required project link, title, abstract, contact info and presentation registration.
[ ] T146 [P0] Проверить official registration link and process when organizers publish it.
[x] T147 [P0] Подготовить public verification proof that judges can open in the afternoon of June 27.
[x] T148 [P0] Подготовить Devpost copy with Research, Social Impact and Entrepreneurship angles in one coherent story.
[x] T149 [P0] Подготовить evidence appendix for public package with mini-bibliography and claim boundaries.
[x] T150 [P0] Подготовить final screenshots: home, seated path, activity, report, evidence surface, fallback banner and before/after slide.
[x] T151 [P0] Подготовить demo video or backup proof that is clearly labeled and not confused with live camera data.
    2026-06-04 result: T144/T145/T148/T149/T150/T151 are prepared locally. `docs/DEVPOST_SUBMISSION_COPY.md` now contains the actual-outcome package, public links, screenshots/video pointers and the Research/Social Impact/Entrepreneurship story. `docs/FINAL_SUBMISSION_CHECKLIST.md` includes title, abstract, public link, contact-info and country/time-zone registration fields. `docs/RELEASE_EVIDENCE_2026_05_05.md` has a 2026-06-04 refresh with claim boundaries, verification commands, screenshots, backup video technical check and open blockers. Final screenshots were regenerated in `output/devpost-screenshots/`, and the clearly labeled backup proof video was regenerated at `output/demo-video/motionquest-adaptive-demo.webm`.
    2026-06-04 note: T147 remained open because judge-openable proof still needed final public deploy/push and clean-browser public-link verification after publication.
    2026-06-04 preliminary public-link smoke: a fresh Playwright Chromium context confirmed the currently published production app, safe-demo report, public GitHub repository, raw README/source links, Devpost page and Binnovative page opened with HTTP 200 / expected text. Evidence: `output/playwright/public-link-clean-browser-current-home-2026-06-04.png`, `output/playwright/public-link-clean-browser-current-report-2026-06-04.png`, `output/playwright/public-link-clean-browser-current-github-2026-06-04.png`. This is not final T147 proof because local changes are newer than the latest recorded public publication.
    2026-06-18 final public proof: after commit `98c1c17`, push to `origin/master`, and production deploy `dpl_DdZAszhYf1u3nptc8FdHyejMqhQ1`, `npm run project:capture-public-proof` verified the production app, public GitHub source and raw README from a clean browser context. Evidence: `evidence/submission-proof/public-link-clean-browser.png` and `evidence/submission-proof/public-link-clean-browser.json`.
[x] T152 [P0] Подготовить ten-minute presentation structure with time reserved for Q&A.
[x] T153 [P0] Подготовить 30-second judge proof sentence and opening hook.
[x] T154 [P1] Подготовить Since Prototype before/after slide with visual comparison and narrative arc.
[x] T155 [P1] Подготовить judge Q&A answers for medical claims, privacy, seated users, research evidence, business path and camera limits.
[x] T156 [P1] Подготовить live demo runbook with safe movement choice and fallback route.
[x] T157 [P1] Подготовить fallback runbook with persistent sample-data disclosure.
[x] T158 [P1] Проверить all public links from a clean browser/session before submission.
    2026-06-04 preliminary result: current public links were checked from a clean Playwright Chromium context and the current app/source/official pages opened. T158 remained open for the final pre-submission clean-browser check after final deploy/push and public package publication.
    2026-06-18 final result: `npm run project:final-audit -- --public-smoke` verified production app, public source, raw README, Devpost and Binnovative content with HTTP 200 and expected current text. Remote `origin/master` matched local `HEAD` `98c1c173d7bca3cd361d1833c9dba52bb51b732e`.
[x] T159 [P2] Подготовить final conditions reread task for the day before submission and the day of presentation.
    2026-06-04 result: T152-T157 and T159 are prepared. `docs/PRESENTATION_SCRIPT.md` now contains the 7-minute + 3-minute Q&A structure, 30-second hook/proof sentence, 90-second live demo runbook, fallback runbook and before/after frame. `docs/JUDGE_QA_ANSWER_BANK.md` explicitly covers medical claims, privacy, seated users, research evidence, business path and camera limits. `docs/FINAL_REHEARSAL_PLAN.md` uses the current seated path requirement: at least one open hand visible. `docs/FINAL_SUBMISSION_CHECKLIST.md` contains the final conditions reread task.
[ ] T160 [P0] Сформировать Phase 8 acceptance note: public artifact package is complete, coherent and verifiable.
[ ] T161 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечислить одной строкой: что реально закрыто в этой фазе.
    2. Сравнить с IDEA ANCHOR: приближает ли итог фазы к correct end-state?
    3. Проверить: нет ли незакрытых RELEASE BLOCKER из этой фазы.
    4. Дать явный сигнал: "Фаза 8 закрыта. Переходим к фазе 9" или "Фаза 8 не закрыта. Стоп. Вот что мешает: ..."

PHASE 9 — QA, Release Readiness And Project Hygiene
[x] T162 [P0] Проверить complete user flow from first screen to report for seated path.
[ ] T163 [P0] Проверить complete user flow from first screen to report for standing path if safe and physically available.
[x] T164 [P0] Проверить no-camera flow from first screen to sample/fallback explanation.
[x] T165 [P0] Проверить weak-observation flow and ensure report does not overstate validity.
[x] T166 [P0] Проверить sample-data banner persistence across fallback screenshots and report surfaces.
[x] T167 [P0] Проверить all public claims against `JUDGING_CLAIMS_AND_LIMITS`.
[x] T168 [P0] Проверить all cited sources still open and match the claim they support.
[x] T169 [P0] Проверить all required screens for accessibility: readable text, large controls, focus, contrast and no hidden critical action.
[x] T170 [P0] Проверить visual consistency across home, activity, report, evidence and presentation artifacts.
    2026-06-04 result: T162, T164-T167 and T169-T170 are locally verified. `E2E_APP_URL=http://localhost:3013 npm run test:e2e` passed 11/11 against the production build and covers seated path to report, no-camera recovery, weak-observation report limits, safe-demo fallback labeling, accessibility floor, focus/reduced-motion behavior, camera-stage layout and visual trust surfaces. Claim-safety scan across README, app README, Devpost copy, presentation script, Q&A, final checklist, claim limits, release evidence and app source found banned/unsafe terms only in explicit negative/disclaimer/limits contexts, not as positive public claims. Screenshot/video artifact set from 2026-06-04 was reviewed for consistency across home, seated activity, reach activity, report, evidence surface, fallback banner and before/after frame.
    2026-06-04 T168 result: current public package and evidence sources were browser-open checked for claim match. Devpost and Binnovative sources still match deadlines, registration process and judging criteria; evidence sources support research-aligned, dignity/privacy, accessibility, chair-stand and exergame-design claims with explicit non-medical boundaries. PubMed PMID and Human Kinetics product-page citations were replaced with clearer public SAGE/APTA sources. Raw bot requests returned 403 for some publisher pages, but browser-open source text was available and recorded in `docs/RELEASE_EVIDENCE_2026_05_05.md`.
    T163 remains open because safe standing-path proof needs a real safe setup/full-body frame. T171-T173 remain open because real presenter-side camera evidence is separate from automated/fake-device checks.
[ ] T171 [P0] Провести real-camera smoke evidence collection for close seated desk setup.
[ ] T172 [P1] Провести real-camera smoke evidence collection for safer standing setup if physically possible.
[ ] T173 [P1] Провести manual review of copied live evidence and screenshots before marking live-camera tasks complete.
[x] T174 [P1] Провести safe dead-code audit with build verification before removing or isolating unused components.
[x] T175 [P1] Провести orphan asset audit and isolate unused graphics without breaking release artifacts.
[x] T176 [P1] Перенести drafts, raw AI generations, temporary scripts and rejected references outside the release bundle.
[x] T177 [P1] Проверить dependency list and safely remove unused dependencies only when verification proves no hidden conflict.
[x] T178 [P1] Проверить final release bundle excludes raw references, prompt drafts, generation logs and local-only secrets.
[x] T179 [P2] Подготовить final release evidence report with commands, screenshots, public links and known limitations.
    2026-06-04 result: T174-T179 are locally complete. Dead-code/import-export audit found no unused app modules/components. Orphan asset audit removed unused default Next starter SVGs from `motionquest-app/public/`; exact reference scan found no remaining references. Draft/raw/temp path scan returned no release-bundle matches; older Playwright report `.txt` files were retained as safe-demo evidence, not temp logs. Dependency list remains inside the allowed client-only boundary and `npm audit --audit-level=moderate` reports 0 vulnerabilities. `docs/RELEASE_EVIDENCE_2026_05_05.md` now contains commands, screenshots, public links, known limitations, cited-source review and repo hygiene status. Post-hygiene verification passed: readiness, 33/33 unit tests, lint, build, audit 0 vulnerabilities and e2e 11/11; port 3013 was free after e2e.
[ ] T180 [P0] Сформировать Phase 9 acceptance note: product, public package and repo hygiene are release-ready.
[ ] T181 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечислить одной строкой: что реально закрыто в этой фазе.
    2. Сравнить с IDEA ANCHOR: приближает ли итог фазы к correct end-state?
    3. Проверить: нет ли незакрытых RELEASE BLOCKER из этой фазы.
    4. Дать явный сигнал: "Фаза 9 закрыта. Переходим к фазе 10" или "Фаза 9 не закрыта. Стоп. Вот что мешает: ..."

PHASE 10 — Launch, Support, Post-Release Learning And Book Path
[ ] T182 [P0] Submit project before the official deadline and capture proof of successful submission.
[ ] T183 [P0] Register presentation before the official deadline and capture proof of registration.
[ ] T184 [P0] Verify that the public project link still opens during the official verification window.
[ ] T185 [P0] Rehearse full presentation with live path and fallback path.
[ ] T186 [P0] Rehearse judge Q&A for medical claims, seated inclusion, privacy, research evidence and business path.
[x] T187 [P0] Prepare day-of-presentation checklist: link, camera, backup proof, screenshots, evidence notes, Q&A bank and timebox.
[ ] T188 [P0] Capture post-presentation feedback from judges, participants and self-review.
[ ] T189 [P1] Create issue/decision log for every judge question that exposes a product gap.
[ ] T190 [P1] Classify post-launch feedback into trust, usability, movement design, research, business and presentation categories.
[x] T191 [P1] Prepare manual recovery protocol if public product link fails after submission.
[x] T192 [P1] Prepare support response templates for camera permission, no camera, weak tracking, sample data and non-medical disclaimer.
[x] T193 [P1] Establish recurring knowledge refresh for contest/public links, evidence sources, competitor landscape and technology limitations.
[x] T194 [P1] Decide post-contest direction: caregiver product, community wellness product, research/book artifact or staged hybrid.
[x] T195 [P1] Draft book chapter thesis around Movement Passport, dignity, seated inclusion, confidence-aware observation and caregiver communication.
[x] T196 [P1] Draft post-contest product roadmap without adding medical claims or scope bloat.
[x] T197 [P2] Prepare continuity package for another agent or teammate: brief, TODO, evidence, release proof, known blockers and next decisions.
    2026-06-04 result: T187 and T191-T197 are prepared locally. `docs/FINAL_SUBMISSION_CHECKLIST.md` now has a day-of presentation checklist plus public-link failure recovery; `docs/FINAL_REHEARSAL_PLAN.md` has support response templates; `docs/POST_CONTEST_CONTINUITY.md` has recurring refresh cadence, staged hybrid direction, Movement Passport book thesis, roadmap and continuity package; `evidence/submission-proof/README.md` defines required submission/registration proof files. T182-T186 and T188-T190 remain open because actual Devpost submission, presentation registration, official verification, rehearsal and real feedback are not local-preparation tasks.
[x] T198 [P2] Archive rejected assets, outdated drafts and superseded proof material with clear labels.
    2026-06-04 result: T198 is complete by label-based artifact archiving. `output/README.md` separates current public package artifacts from historical verification archive; `output/devpost-screenshots/README.md` lists the current public screenshot set; `output/demo-video/README.md` labels the backup video as safe-demo proof, not live-camera evidence; `output/playwright/README.md` labels Playwright files as historical technical QA evidence. `docs/PHASE4_T081_T084_FINAL_VISUAL_REVIEW.md` now marks the old 2026-05-05 public screenshot filenames as superseded/deleted from the current Devpost set. No historical QA files were moved because many are still referenced by phase docs and project history.
[ ] T199 [P2] Prepare final retrospective: what won trust, what failed, what must be measured before next release.
[ ] T200 [P0] Сформировать Phase 10 acceptance note: contest launch, support loop, feedback loop and book path are operationally ready.
[ ] T201 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечислить одной строкой: что реально закрыто в этой фазе.
    2. Сравнить с IDEA ANCHOR: приближает ли итог фазы к correct end-state?
    3. Проверить: нет ли незакрытых RELEASE BLOCKER из этой фазы.
    4. Дать явный сигнал: "Фаза 10 закрыта. Проект готов к следующему циклу" или "Фаза 10 не закрыта. Стоп. Вот что мешает: ..."

PHASE 11 — Long-Term Governance, Continuity And Evidence Renewal
[x] T202 [P0] Зафиксировать post-contest governance rule: any future feature must preserve dignity, seated inclusion, report outcome and non-medical boundary.
[x] T203 [P0] Подготовить recurring evidence renewal calendar for research citations, contest/public links, competitor landscape and browser-camera assumptions.
[x] T204 [P1] Подготовить long-term claim review process so product copy never drifts into clinical or unsupported accuracy language.
[x] T205 [P1] Подготовить future release decision filter: caregiver value, community wellness value, research/book value and operational feasibility.
[x] T206 [P1] Подготовить archive policy for old screenshots, old demo videos, old submission copy and outdated evidence notes.
[x] T207 [P1] Подготовить maintenance owner map for product brief, release TODO, evidence package, presentation assets and public app copy.
[x] T208 [P2] Подготовить post-contest user feedback loop for seated users and caregivers without collecting unnecessary personal or medical information.
[x] T209 [P2] Подготовить future partnership screening rules so community/research opportunities do not force medical overclaiming.
    2026-06-04 result: T202-T209 are prepared in `docs/POST_CONTEST_CONTINUITY.md`. The governance package defines the four identity constraints, evidence renewal calendar, claim review process, release decision filter, archive policy, maintenance owner map, minimal-data feedback loop and partnership screening rules. T210-T211 remain open until final acceptance is reviewed after unresolved launch/camera/post-contest blockers are handled.
[ ] T210 [P0] Сформировать Phase 11 acceptance note: project can continue after contest without losing trust, evidence discipline or product identity.
[ ] T211 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечислить одной строкой: что реально закрыто в этой фазе.
    2. Сравнить с IDEA ANCHOR: приближает ли итог фазы к correct end-state?
    3. Проверить: нет ли незакрытых RELEASE BLOCKER из этой фазы.
    4. Дать явный сигнал: "Фаза 11 закрыта. Долгосрочный цикл проекта готов" или "Фаза 11 не закрыта. Стоп. Вот что мешает: ..."

RELEASE BLOCKERS
- Official submission or presentation registration not completed by the required deadline.
- Public project link does not reference the actual working outcome.
- Product still feels like a toy camera overlay instead of an adaptive movement lab.
- Seated users are treated as fallback or failure instead of core users.
- Report is empty, misleading, too technical or not caregiver-readable.
- Sample/fallback data can be confused with live camera data.
- Research claims lack citations or claim boundaries.
- Product implies diagnosis, fall prediction, clinical validation or official medical scoring.
- Dignity/privacy promise is missing from first-use experience.
- Live demo has no safe fallback plan.
- Real-camera evidence contradicts public claims and claims are not corrected.
- Public artifact package lacks screenshots, evidence, presentation story or limitations.
- Release includes raw AI drafts, secrets, unused visual junk or misleading obsolete artifacts.

OUT OF SCOPE FOR NOW
- Medical diagnosis, clinical scoring, fall-risk prediction or claims of clinical validation.
- Mandatory account system or heavy caregiver dashboard for first release.
- Social feed, leaderboard, competitive streaks or generic fitness gamification.
- Wearable-first workflow or dependence on specialized hardware.
- Full community wellness management product before the single-session product is credible.
- Paid plans, exact prices, revenue forecasts or TAM claims before separate current research.
- Long-term health outcome tracking without governance, consent and evidence.
- Publishing numeric landmark-loss claims without project validation or cited exact source.
- Copying competitor UI, visuals, text or brand assets.

TODO COVERAGE CHECK
- total ordinary tasks: 200
- anchor tasks: 11
- covered phases: 11
- biggest risk gaps: real physical webcam proof, final official presentation registration link, final public abstract approval, post-submission verification timing, and avoiding unsupported clinical or numeric accuracy claims.
