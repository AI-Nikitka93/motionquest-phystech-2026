# MotionQuest MASTER TODO — Full Contest-Winning Product Plan

PROJECT ONE-LINER

MotionQuest is an accessible browser-based functional movement lab that turns research-aligned physical activity tasks into short playable sessions and caregiver-readable reports using only a webcam.

IDEA ANCHOR
- core value: make evidence-aligned physical activity easier to practice, explain and verify outside formal clinical settings.
- core user: older adults, caregivers, family members, community wellness organizers and judges evaluating physical-activity technology.
- correct end-state: a public, judge-ready, research-backed, accessible product that demonstrates real webcam-based movement measurement, explains its impact, produces a useful report, and is packaged for Devpost verification and book-chapter expansion.
- do not drift into: a generic fitness mini-game, medical diagnosis tool, leaderboard app, social network, toy demo, fake clinical system, or backend-heavy platform.

INTERPRETATION

Current MotionQuest is deployed and technically works as a webcam mini-game, but it is not yet a complete PhysTech submission. The project must be upgraded into a credible contest artifact: clear problem, research basis, differentiated experience, measurable outcome, public repository/package, demo story and post-submission readiness.

RECOMMENDED PROJECT SHAPE

Keep the client-only app, but transform it into a judge-facing physical-activity technology product with five visible layers:
- mission and impact layer;
- research and method layer;
- accessible camera-based movement session;
- caregiver / judge-readable outcome report;
- submission package with README, abstract, demo script, screenshots and public verification links.

ASSUMPTIONS / NEEDS CONFIRMATION
- MotionQuest remains the selected idea unless explicitly replaced.
- The project should compete primarily for Excellence in Research, Excellence in Social Impact and placement prizes, while still improving Creativity and Presentation.
- No backend, auth or database should be added unless a later decision proves they are required for judging.
- Contest conditions must be re-read regularly because deadlines, links, requirements or judging details can change.

PHASE MAP
1. Contest Conditions, Winning Strategy And Scope Reset
2. Research, Impact And Methodology Layer
3. Product Experience And Information Architecture
4. Visual Identity, Accessibility And Trust Surface
5. Movement Engine, Calibration And Report Outcome
6. Public Artifact, Devpost Package And Presentation
7. Verification, Smoke Testing And Risk Control
8. Final Submission, Rehearsal And Post-Contest Continuity

MASTER TODO

## PHASE 1 — Contest Conditions, Winning Strategy And Scope Reset

[x] T001 [P0] Перечитать `УСЛОВИЯ.txt` полностью и выписать все обязательные требования подачи, регистрации, презентации и публичной проверки результата.
[x] T002 [P0] Открыть live Devpost PhysTech 2026 и сверить дедлайны, критерии, ссылки, требования к публичному результату и список призов на текущую дату.
[x] T003 [P0] Составить таблицу расхождений между локальным `УСЛОВИЯ.txt` и live Devpost, если такие расхождения найдены.
[x] T004 [P0] Зафиксировать точную временную шкалу: Devpost submission, presentation registration, verification afternoon, online presentation and Q&A.
[x] T005 [P0] Переписать цель проекта с "сделать приложение" на "создать проверяемый конкурсный outcome, который судьи могут открыть, понять и оценить".
[x] T006 [P0] Определить главную конкурсную ставку MotionQuest: Research + Social Impact with strong Presentation.
[x] T007 [P0] Определить вторичную ставку MotionQuest: Creativity through accessible camera-only functional movement, not through decorative gameplay.
[x] T008 [P0] Сформулировать один главный problem statement, который будет одинаковым в приложении, README, Devpost abstract and presentation.
[x] T009 [P0] Сформулировать one-sentence solution statement, который не звучит как обычная фитнес-игра.
[x] T010 [P0] Составить список того, что текущая версия уже закрывает: HTTPS deployment, camera flow, MediaPipe, two activities, report shell.
[x] T011 [P0] Составить список того, что текущая версия не закрывает против критериев Impact, Creativity and Presentation.
[x] T012 [P0] Перевести `docs/CONDITIONS_GAP_AUDIT.md` в actionable checklist для продукта, презентации и публичного artifact package.
[x] T013 [P0] Закрыть терминологический дрейф: везде заменить framing "toy/game demo" на "functional movement lab / evidence-aligned exergame prototype", где это правда.
[x] T014 [P1] Определить три judging claims, которые проект будет доказывать: accessibility, research alignment, caregiver-readable outcome.
[x] T015 [P1] Определить три claims, которые запрещено делать: medical diagnosis, fall prediction, clinical validation.
[x] T016 [P1] Составить список публичных ссылок, которые понадобятся для подачи: app URL, repository/storage URL, research artifact, demo video/screenshot if available.
[x] T017 [P1] Определить минимальный состав submission package: README, abstract, app, source, screenshots, research summary, demo script.
[x] T018 [P1] Определить owner для каждого обязательного конкурсного артефакта: app, README, Devpost text, presentation, live demo, backup demo.
[x] T019 [P1] Перепроверить, что все планы остаются в рамках allowed PhysTech formats: apps, games, data analysis, data visualization, physical activity technology.
[x] T020 [P0] Обновить `docs/STATE.md` так, чтобы текущий active step был не "demo rehearsal", а "contest-winning product upgrade".
[x] T020A [P1] Усилить T014-T015 отдельным reusable artifact `docs/JUDGING_CLAIMS_AND_LIMITS.md`.
[x] T020B [P1] Усилить T016-T018 отдельным reusable artifact `docs/SUBMISSION_PACKAGE_PLAN.md`.
[x] T021 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечитать IDEA ANCHOR и условия PhysTech 2026 из `УСЛОВИЯ.txt`.
    2. Проверить live Devpost, если с последней проверки прошло больше 48 часов или изменился этап проекта.
    3. Перечислить одной строкой: что реально закрыто в этой фазе.
    4. Сравнить с критериями Impact / Creativity / Presentation.
    5. Дать явный сигнал: "Фаза 1 закрыта. Переходим к фазе 2" или "Фаза 1 не закрыта. Стоп. Вот что мешает: ..."

## PHASE 2 — Research, Impact And Methodology Layer

[x] T022 [P0] Перечитать `research-synthesis-MotionQuest.md` и выделить 4-6 strongest evidence points для публичного продукта.
[x] T023 [P0] Разделить evidence на три группы: problem significance, exergame intervention evidence, webcam/pose-estimation feasibility.
[x] T024 [P0] Подготовить короткий "Research-backed, not medical" блок для приложения.
[x] T025 [P0] Подготовить простой текст о 30-second chair stand как inspired-by functional measure без медицинского overclaim.
[x] T026 [P0] Подготовить простой текст о Reach Stars как upper-body reach and engagement proxy.
[x] T027 [P0] Подготовить блок "What MotionQuest measures" с конкретными, честными метриками: reps, targets hit, reaction time, tracking confidence.
[x] T028 [P0] Подготовить блок "What MotionQuest does not measure" с ограничениями: diagnosis, fall risk, clinical impairment, long-term health outcome.
[x] T029 [P0] Сформировать "Impact logic chain": older adult activity challenge -> low-friction practice -> immediate feedback -> caregiver-readable summary.
[x] T030 [P0] Сформировать "Social impact logic": no wearable hardware, browser access, large UI, privacy-preserving local processing.
[x] T030A [P1] Усилить T024-T030 отдельным reusable app/README artifact `docs/RESEARCH_LAYER_PUBLIC_COPY.md`.
[x] T030B [P1] Усилить T022-T030 отдельным source-trace artifact `docs/RESEARCH_EVIDENCE_TRACE_T022_T030.md`.
[x] T031 [P0] Сформировать "Creativity logic": game mechanics are attached to functional movement constructs, not generic gamification.
[x] T032 [P1] Проверить актуальность ключевых research claims на дату текущего этапа, если прошло больше 7 дней с последней scholarly check.
[x] T033 [P1] Зафиксировать список research facts, которые могут устареть или потребовать уточнения перед подачей.
[x] T034 [P1] Подготовить evidence panel content для Home or Method section.
[x] T035 [P1] Подготовить compact citation cards для приложения или README без перегрузки интерфейса.
[x] T036 [P1] Подготовить одну академичную формулировку для будущей book chapter angle.
[x] T037 [P1] Подготовить plain-language interpretation для caregivers: что значит low/medium/high tracking confidence.
[x] T038 [P1] Подготовить plain-language interpretation для chair stand result without clinical score.
[x] T039 [P1] Подготовить plain-language interpretation для reach result without medical claims.
[x] T040 [P1] Сверить все тексты research layer на отсутствие fake validation, fake trials or fake clinical authority.
[x] T040A [P1] Усилить T034-T035 отдельным reusable artifact `docs/EVIDENCE_PANEL_CONTENT.md`.
[x] T040B [P1] Усилить T037-T039 отдельным reusable artifact `docs/CAREGIVER_INTERPRETATION_COPY.md`.
[x] T040C [P1] Усилить T040 отдельным reusable artifact `docs/RESEARCH_OVERCLAIM_AUDIT.md`.
[x] T041 [P0] Обновить research artifact index so judges can trace every claim to a real source.
[x] T042 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечитать IDEA ANCHOR, `УСЛОВИЯ.txt`, live Devpost and research synthesis.
    2. Проверить, усиливает ли research layer Impact, Research award and book-chapter potential.
    3. Перечислить одной строкой: что реально закрыто в этой фазе.
    4. Проверить, не появились ли медицинские claims без evidence.
    5. Дать явный сигнал: "Фаза 2 закрыта. Переходим к фазе 3" или "Фаза 2 не закрыта. Стоп. Вот что мешает: ..."

## PHASE 3 — Product Experience And Information Architecture

[x] T043 [P0] Перестроить Home screen вокруг story: problem, why now, what MotionQuest does, start demo.
[x] T044 [P0] Добавить visible judge-facing project summary above the camera game.
[x] T045 [P0] Добавить "How it works" section with three steps: calibrate, move, read report.
[x] T046 [P0] Добавить "Why this matters" section tied directly to PhysTech physical activity challenge.
[x] T047 [P0] Добавить "Method" section explaining the two activities and measured outputs.
[x] T048 [P0] Добавить "Privacy" note: video stays in browser and no account is required.
[x] T049 [P0] Добавить "Limitations" note before or after report so judges see honest boundaries.
[x] T050 [P0] Переделать navigation chips into meaningful flow indicators instead of decorative labels.
[x] T051 [P1] Добавить "Judge Demo" entry point that guides a 90-second walkthrough.
[x] T052 [P1] Добавить "Use Safe Demo Data" explanation so fallback does not look like fake result.
[x] T053 [P1] Уточнить Home call-to-action hierarchy: primary real camera, secondary demo fallback, tertiary research.
[x] T054 [P1] Добавить activity intro cards before Chair Stand and Reach Stars explaining what will be measured.
[x] T055 [P1] Добавить pre-game readiness confirmation so participant knows where to stand and what joints are needed.
[x] T056 [P1] Добавить in-game "what counts" microcopy for Chair Stand.
[x] T057 [P1] Добавить in-game "what counts" microcopy for Reach Stars.
[x] T058 [P1] Улучшить report information architecture: summary, metrics, interpretation, limitations, export.
[x] T059 [P1] Добавить "Method used" section inside report.
[x] T060 [P1] Добавить "Next session suggestion" that is conservative and non-clinical.
[x] T061 [P1] Добавить "For judges" section explaining how to verify the actual outcome.
[x] T062 [P0] Провести UX review against one clear question: would a judge understand the project without our narration?
[x] T063 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечитать IDEA ANCHOR and PhysTech conditions.
    2. Проверить последние 20 задач: усиливают ли они Presentation and actual outcome verification.
    3. Перечислить одной строкой: что реально закрыто в этой фазе.
    4. Проверить, не превратился ли product flow обратно в обычную мини-игру.
    5. Дать явный сигнал: "Фаза 3 закрыта. Переходим к фазе 4" или "Фаза 3 не закрыта. Стоп. Вот что мешает: ..."

## PHASE 4 — Visual Identity, Accessibility And Trust Surface

[x] T064 [P0] Перечитать `docs/visual-spec.md` и проверить, какие visual rules уже выполнены в приложении.
[x] T065 [P0] Провести screenshot-based review текущего deployed app на desktop.
[x] T066 [P0] Провести screenshot-based review текущего app на mobile viewport.
[x] T067 [P0] Найти визуальные места, где приложение выглядит как toy или generic dashboard.
[x] T068 [P0] Усилить visual hierarchy so problem/method/outcome are as visible as game controls.
[x] T069 [P0] Проверить, что все interactive controls remain at least 56px high.
[x] T070 [P0] Проверить, что no text below 16px appears in app surfaces.
[x] T071 [P0] Проверить contrast of all new sections against visual spec.
[x] T072 [P1] Сделать report cards visually more serious and artifact-like, not just score cards.
[x] T073 [P1] Сделать Method / Evidence section visually distinct but calm.
[x] T074 [P1] Улучшить camera stage so it reads as measurement lab + accessible game, not generic webcam box.
[x] T075 [P1] Согласовать all status chips, warnings, success states and error messages.
[x] T076 [P1] Добавить consistent icon or symbol language only where it improves comprehension.
[x] T077 [P1] Подготовить small product mark / logo treatment if it helps presentation identity.
[x] T078 [P1] Проверить reduced-motion behavior after adding presentation and report interactions.
[x] T079 [P1] Проверить keyboard navigation for all primary flows.
[x] T080 [P1] Проверить focus visibility on camera start, game finish, report export and demo controls.
[x] T081 [P2] Создать screenshot set for README and Devpost from the improved app.
[x] T082 [P2] Отбраковать screenshots that make the product look like a toy or template.
[x] T083 [P0] Провести final visual QA against "warm kinetic trust" and not "hospital / toy / generic SaaS".
[x] T084 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечитать IDEA ANCHOR, visual spec and contest conditions.
    2. Проверить последние 20 задач: усиливают ли они trust, accessibility and visual differentiation.
    3. Перечислить одной строкой: что реально закрыто в этой фазе.
    4. Проверить, нет ли визуального дрейфа в игрушку, hospital style or generic AI dashboard.
    5. Дать явный сигнал: "Фаза 4 закрыта. Переходим к фазе 5" или "Фаза 4 не закрыта. Стоп. Вот что мешает: ..."

## PHASE 5 — Movement Engine, Calibration And Report Outcome

[x] T085 [P0] Проверить MediaPipe model loading on production URL before working on scoring.
[ ] T086 [P0] Провести live camera smoke test on real webcam for Home calibration.
[ ] T087 [P0] Провести live camera smoke test for Adaptive Chair Movement standing branch.
[ ] T088 [P0] Провести live camera smoke test for Reach Stars tracking.
[ ] T089 [P0] Зафиксировать exact camera setup that works for demo: distance, lighting, body visibility, chair position.
[x] T090 [P0] Улучшить calibration so it shows which required joints are visible.
[x] T091 [P0] Добавить calibration pass/fail state that is understandable to older adults and judges.
[ ] T092 [P0] Уточнить Adaptive Chair Movement standing thresholds after live camera test.
[ ] T093 [P0] Уточнить Reach Stars hit detection after live camera test.
[x] T093A [P0] Добавить seated-adaptive branch so the first activity no longer requires every participant to stand.
[x] T093B [P0] Добавить seated arm movement counter based on visible shoulder-elbow-wrist angle cycles.
[x] T093C [P0] Добавить 0.5-second dwell guard for Reach Stars so one-frame wrist noise does not count as a hit.
[x] T093D [P0] Добавить session-mode and primary-movement labels into saved sessions, report cards and exported report text.
[x] T094 [P0] Добавить confidence and limitation data into saved session.
[x] T095 [P0] Добавить report interpretation generated from actual session values.
[x] T096 [P0] Добавить copyable report text for Devpost verification and caregiver use.
[x] T097 [P1] Добавить downloadable session artifact or plain export so the app produces a tangible outcome.
[x] T098 [P1] Добавить safe demo session that is clearly labeled as fallback, not fake real tracking.
[x] T099 [P1] Добавить "tracking quality" explanation when report confidence is low.
[x] T100 [P1] Добавить "session not valid enough" state if no body landmarks were detected.
[x] T101 [P1] Добавить camera permission recovery text for blocked permissions.
[x] T102 [P1] Добавить model loading failure recovery text.
[x] T103 [P1] Проверить that localStorage session history does not expose sensitive video data.
[ ] T104 [P0] Провести end-to-end run with real camera and save observed metrics, issues and fixes.
[ ] T105 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечитать IDEA ANCHOR, contest conditions and Movement Engine assumptions.
    2. Проверить последние 20 задач: доказывают ли они real outcome, not toy interaction.
    3. Перечислить одной строкой: что реально закрыто в этой фазе.
    4. Проверить, что no clinical overclaim was introduced by scoring improvements.
    5. Дать явный сигнал: "Фаза 5 закрыта. Переходим к фазе 6" или "Фаза 5 не закрыта. Стоп. Вот что мешает: ..."

## PHASE 6 — Public Artifact, Devpost Package And Presentation

[x] T106 [P0] Создать public-facing README with problem, solution, demo URL, setup, research basis, limitations and submission status.
[x] T107 [P0] Добавить README section explaining how judges can verify actual work.
[x] T108 [P0] Добавить README section explaining that no video leaves browser.
[x] T109 [P0] Добавить README section mapping project to PhysTech criteria: Impact, Creativity, Presentation.
[x] T110 [P0] Добавить README section mapping project to Research and Social Impact awards.
[x] T111 [P0] Подготовить Devpost project title.
[x] T112 [P0] Подготовить Devpost one-paragraph abstract.
[x] T113 [P0] Подготовить short project description for presentation registration.
[x] T114 [P0] Подготовить 10-minute presentation structure with 7-minute story and 3-minute Q&A buffer.
[x] T115 [P0] Подготовить 90-second live demo script inside the 10-minute presentation.
[x] T116 [P0] Подготовить backup demo script if webcam fails.
[x] T117 [P1] Подготовить slide outline: problem, insight, solution, demo, evidence, impact, limitations, next steps.
[x] T118 [P1] Подготовить judge Q&A answer bank for clinical claims, accuracy, privacy, accessibility, scalability and research.
[x] T119 [P1] Подготовить screenshot set showing mission, calibration, Adaptive Chair Movement, Reach Stars and report.
[x] T120 [P1] Подготовить short demo video or GIF if time allows.
[x] T121 [P1] Подготовить public repository or storage package and ensure the link references actual work.
[x] T122 [P1] Проверить that Vercel URL, repo/storage URL and research artifacts are all publicly accessible.
[x] T123 [P1] Подготовить final submission checklist for June 27 EDT deadlines.
[x] T124 [P1] Подготовить presentation registration checklist with name, contact, title, abstract and public link.
[x] T125 [P0] Сверить entire public package against Devpost requirement: actual outcome must be verifiable in afternoon of June 27.
[x] T126 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечитать IDEA ANCHOR and live PhysTech Devpost page.
    2. Проверить последние 20 задач: закрывают ли они public actual outcome, submission and presentation.
    3. Перечислить одной строкой: что реально закрыто в этой фазе.
    4. Проверить, что public package would make sense to a judge without private context.
    5. Дать явный сигнал: "Фаза 6 закрыта. Переходим к фазе 7" или "Фаза 6 не закрыта. Стоп. Вот что мешает: ..."

## PHASE 7 — Verification, Smoke Testing And Risk Control

[x] T127 [P0] Провести full local build after all product upgrades.
[x] T128 [P0] Провести lint and test verification after all product upgrades.
[x] T129 [P0] Провести production redeploy after all product upgrades.
[x] T130 [P0] Проверить production URL returns correct page and updated content.
[ ] T131 [P0] Проверить production app on HTTPS with physical webcam.
[ ] T132 [P0] Проверить camera permission flow in at least two browsers if available.
[x] T133 [P0] Проверить fallback demo flow without camera.
[ ] T134 [P0] Проверить report export/copy flow after real session.
[x] T135 [P0] Проверить that public README links are correct and not private/local.
[x] T136 [P0] Проверить that no local-only paths are required for judges to understand the project.
[x] T137 [P1] Проверить mobile layout for Home, Method, Camera and Report.
[x] T138 [P1] Проверить desktop layout for presentation sharing over Zoom.
[x] T139 [P1] Проверить loading, empty, camera denied, model failed and low-confidence states.
[x] T140 [P1] Проверить accessible focus order through the whole flow.
[x] T141 [P1] Проверить that all medical limitation text is visible where needed.
[x] T142 [P1] Проверить that report numbers are not misleading when confidence is low.
[ ] T143 [P1] Проверить Devpost abstract against current contest conditions one final time before submission.
[ ] T144 [P1] Проверить research citations and claims one final time before submission.
[x] T145 [P1] Составить final release risk register with owner and mitigation for every live demo risk.
[x] T146 [P0] Зафиксировать release evidence: build logs, deploy URL, screenshots, smoke test notes and known limitations.
[ ] T147 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед переходом в следующую фазу:
    1. Перечитать IDEA ANCHOR, contest conditions and release blockers.
    2. Проверить последние 20 задач: закрывают ли они verification, recovery and judge trust.
    3. Перечислить одной строкой: что реально закрыто в этой фазе.
    4. Проверить, что no unresolved blocker can disqualify submission or ruin the demo.
    5. Дать явный сигнал: "Фаза 7 закрыта. Переходим к фазе 8" или "Фаза 7 не закрыта. Стоп. Вот что мешает: ..."

## PHASE 8 — Final Submission, Rehearsal And Post-Contest Continuity

[ ] T148 [P0] За 72 часа до дедлайна перечитать `УСЛОВИЯ.txt` and live Devpost again.
[ ] T149 [P0] За 72 часа до дедлайна проверить Discord / official channel for presentation registration link and late updates.
[ ] T150 [P0] За 48 часов до дедлайна выполнить full submission dry run without actually submitting if submission is not ready.
[ ] T151 [P0] За 48 часов до дедлайна проверить all public links from a clean browser/session.
[ ] T152 [P0] За 24 часа до дедлайна freeze product scope except critical fixes.
[x] T152A [P0] Настроить автоматическое напоминание на 72h/48h/24h windows so AI team rereads contest conditions and checks submission readiness.
[ ] T153 [P0] Submit project to Devpost before June 27, 2026, 12:00pm EDT.
[ ] T154 [P0] Register project presentation before June 27, 2026, 12:00pm EDT.
[ ] T155 [P0] Save proof of submission and registration.
[x] T156 [P0] Prepare final live demo setup: browser, webcam, lighting, chair, fallback data, tabs, internet check.
[ ] T157 [P0] Rehearse the 10-minute presentation at least three times with stopwatch.
[ ] T158 [P0] Rehearse the 90-second live demo until it works without improvisation.
[ ] T159 [P0] Rehearse Q&A answers for research, clinical limitations, accessibility, privacy and impact.
[x] T160 [P1] Prepare a concise "what changed after hackathon" roadmap for book chapter and future work.
[x] T161 [P1] Prepare post-contest notes template to record judge feedback.
[x] T162 [P1] Prepare post-contest issue list for real-world validation, not fake success claims.
[x] T163 [P1] Prepare book chapter outline from problem, method, prototype, findings, limitations and future work.
[x] T164 [P1] Prepare continuation plan for small pilot with caregivers or community wellness users if invited.
[ ] T165 [P1] After presentation, record what worked, what failed and what judges asked.
[ ] T166 [P1] After results, update public README with outcome honestly.
[ ] T167 [P1] If invited for book chapter, convert research synthesis and project evidence into chapter draft plan.
[ ] T168 [ANCHOR] 🏁 PHASE END REVIEW — итог фазы и проверка направления
    Агент-исполнитель обязан перед завершением проекта:
    1. Перечитать IDEA ANCHOR, final Devpost conditions and all submission proof.
    2. Проверить последние 20 задач: закрывают ли они submission, presentation and continuity.
    3. Перечислить одной строкой: что реально закрыто в этой фазе.
    4. Проверить, что final public artifact still matches correct end-state and does not overclaim.
    5. Дать явный сигнал: "Фаза 8 закрыта. Проект готов к конкурсной подаче" или "Фаза 8 не закрыта. Стоп. Вот что мешает: ..."

RELEASE BLOCKERS
- Условия конкурса не перечитаны на live Devpost в течение последней недели перед подачей.
- Нет публичной ссылки на фактический результат, которую организаторы могут проверить 27 июня.
- Приложение всё ещё выглядит как обычная мини-игра и не объясняет problem / method / impact.
- Research layer не виден в продукте или README.
- Caregiver Report не даёт понятного outcome beyond numbers.
- Live webcam flow не проверен на физической камере.
- Нет backup demo flow if webcam fails.
- README / Devpost / presentation tell different stories.
- Есть medical claims without evidence.
- Нет финального rehearsal before presentation.

OUT OF SCOPE FOR NOW
- Social feed.
- Leaderboards.
- Accounts and authentication.
- Backend database.
- Clinical diagnosis.
- Fall prediction.
- Medical-device claims.
- Paid plans or commercial checkout.
- Full caregiver portal.
- Complex 3D avatar.
- Hardware sensors beyond webcam.

TODO COVERAGE CHECK
- total ordinary tasks: 160
- anchor tasks: 8
- covered phases: 8
- biggest risk gaps: live webcam reliability, judge-facing narrative quality, public repository/storage package, final Devpost submission timing
