# Research Synthesis: MotionQuest

Проект: PhysTech 2026  
Идея: MotionQuest - Webcam Exergame for Frailty, Balance and Older-Adult Physical Activity  
Дата поиска: 2026-05-04  
Активный режим P-PAPERS: DISCOVERY + OPEN_ACCESS + PDF_TEXT_PIPELINE  
Freshness anchor: 2022-2026

## SUMMARY

MotionQuest имеет самый плотный research foundation из трех идей. В 2022-2026 есть RCTs, systematic reviews и meta-analyses по exergames для older adults, balance, falls, physical literacy, functional performance и AI-supported exercise. Это сильный кандидат для `Excellence in Research` и `Social Impact`, если MVP будет не просто "игрой", а **evidence-aligned movement intervention prototype**.

Главный вывод: MVP должен кодить не абстрактные очки, а clinically familiar functional tasks:
- sit-to-stand / 30-second chair stand;
- step-in-place / stepping reaction;
- reach targets;
- balance hold;
- timed up-and-go-style proxy;
- 8-foot up-and-go-style agility/dynamic balance proxy.

## Search Plan / Query Pack

Lanes:
- PubMed
- Springer/BMC
- Nature
- PLOS
- SAGE / Games for Health Journal
- Semantic Scholar-style web discovery

Queries:
- `exergame older adults balance randomized trial frailty physical function 2022 2026`
- `exergames older adults balance systematic review meta analysis randomized controlled trials`
- `AI exercise older adults physical activity scoping review real-time feedback`
- `webcam pose estimation exergame rehabilitation older adults balance`
- `30-second chair stand exergame older adults randomized controlled trial`

Stop condition: 7 relevant papers found, including recent reviews/meta-analyses, RCTs and AI exercise review.

## Literature Review

### 1. Using artificial intelligence for physical exercise and healthy ageing among older adults: a scoping review

Citation:
Ye, M. Z. et al. (2026). Using artificial intelligence for physical exercise and healthy ageing among older adults: a scoping review. BMC Geriatrics.  
URL: https://link.springer.com/article/10.1186/s12877-026-07544-1

Key evidence:
- The review maps AI-based exercise tools for older adults.
- AI-based tools commonly used sensing/tracking, real-time feedback and personalized guidance.
- 55.6% of included studies reported positive findings for exercise motivation.
- 72.2% reported positive changes in balance, gait, muscle strength and movement accuracy.
- Limitations include small samples, short follow-up and external validity issues.

How we use it in the hackathon:
- Supports AI/webcam feedback as a serious mechanism for older-adult exercise.
- Also tells us to avoid overclaiming long-term health outcomes.

MVP metrics:
- movement accuracy score;
- real-time feedback events;
- balance/gait/strength proxy tasks;
- adherence/session completion;
- personalization: easier/same/harder next level.

### 2. Standalone commercial exergame training to improve balance in older adults in care facilities: a systematic review and meta-analysis of recent 10-year randomized controlled trials

Citation:
Standalone commercial exergame training to improve balance in older adults in care facilities: a systematic review and meta-analysis of recent 10-year randomized controlled trials. (2026). BMC Geriatrics.  
URL: https://link.springer.com/article/10.1186/s12877-026-07471-1

Key evidence:
- Meta-analysis of recent RCTs in care facilities.
- Exergame interventions significantly improved balance:
  - Timed Up-and-Go: SMD = -0.87 s, 95% CI -1.47 to -0.27, p = 0.004.
  - Berg Balance Scale: WMD = 2.88, 95% CI 0.36 to 5.41, p = 0.03.
  - Tinetti test: WMD = 4.58, 95% CI 2.64 to 6.51, p < 0.00001.
- Higher training doses of 9 weeks or more were more likely to improve balance.

How we use it in the hackathon:
- Core evidence for balance-oriented exergame design.
- MVP can mirror functional balance components rather than inventing random motions.

MVP metrics:
- TUG-style time proxy;
- balance hold duration;
- step reaction time;
- center-of-body sway proxy from pose landmarks;
- Tinetti-like safe/unsafe movement checklist.

### 3. Exergame and cognitive training for preventing falls in community-dwelling older people: a randomized controlled trial

Citation:
Sturnieks, D. L. et al. (2024). Exergame and cognitive training for preventing falls in community-dwelling older people: a randomized controlled trial. Nature Medicine, 30, 98-105.  
URL: https://www.nature.com/articles/s41591-023-02739-0

Key evidence:
- Large RCT with 769 community-dwelling participants aged 65+.
- Step exergame training significantly reduced monthly reported fall rate over 12 months compared with control.
- Reported incidence rate ratio: 0.74, 95% CI 0.56-0.98.
- No serious intervention-related adverse events were reported.

How we use it in the hackathon:
- Strongest impact evidence: exergame-style step training can connect to fall prevention.
- We should implement stepping tasks rather than only upper-body reaches.

MVP metrics:
- step accuracy;
- step timing;
- reaction to visual/audio target;
- missed steps;
- dual-task simple cue: step to color/number/side.

### 4. Physical and Affective Physical Literacy Domains Improved After a Six-Week Exergame Exercise Program in Older Adults: A Randomized Controlled Clinical Trial

Citation:
Campelo, A. M., Weisberg, A., Sheehan, D. P., Schneider, K., Cossich, V. R. A., & Katz, L. (2023). Physical and Affective Physical Literacy Domains Improved After a Six-Week Exergame Exercise Program in Older Adults. Games for Health Journal.  
DOI: https://doi.org/10.1089/g4h.2022.0212  
URL: https://journals.sagepub.com/doi/10.1089/g4h.2022.0212

Key evidence:
- 40 older adults, mean age 72.
- Exergame training, conventional training and no-training groups.
- Training was 3 times per week for 6 weeks.
- Authors conclude 6-week exergame training may improve physical and affective physical literacy domains.

How we use it in the hackathon:
- Supports designing MotionQuest around enjoyment, confidence and affective engagement, not just raw scores.

MVP metrics:
- session completion;
- perceived exertion / enjoyment quick rating;
- progress streak;
- confidence after movement;
- movement score improvement.

### 5. Effects of Exergames and Conventional Physical Therapy on Functional Physical Performance in Older Adults: A Randomized Controlled Trial

Citation:
Guede-Rojas, F. et al. (2023). Effects of Exergames and Conventional Physical Therapy on Functional Physical Performance in Older Adults. Games for Health Journal.  
DOI: https://doi.org/10.1089/g4h.2022.0194  
URL: https://journals.sagepub.com/doi/10.1089/g4h.2022.0194

Key evidence:
- 50 independent older adults.
- CPT + exergames group vs conventional physical therapy alone.
- Protocol: 2 sessions per week, 60 minutes/session for 8 weeks; exergame group added 30 minutes each session.
- Senior Fitness Test was used, including 30-second chair stand as primary outcome.
- CPT + exergames improved 30-second chair stand, back scratch and 8-foot up-and-go tests.

How we use it in the hackathon:
- Directly tells us which tasks are credible to implement:
  - 30-second chair stand;
  - upper-body reach/flexibility proxy;
  - 8-foot up-and-go dynamic balance proxy.

MVP metrics:
- repetitions in 30 seconds;
- reach range;
- transition time sit-to-stand;
- dynamic balance time;
- upper/lower limb movement completion.

### 6. A systematic review of exergame usability as home-based balance training tool for older adults

Citation:
A systematic review of exergame usability as home-based balance training tool for older adults. (2024). PLOS ONE.  
DOI: https://doi.org/10.1371/journal.pone.0306816  
URL: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0306816

Key evidence:
- Review summarizes exergames as a home-based balance training tool.
- Intervention groups showed better balance outcomes than usual care/no intervention, but certainty of evidence was low to very low.
- Exergames showed acceptable/good usability in included studies.
- Design elements associated with benefit include interaction, enjoyment, motivation, challenge, immediate feedback and engagement.
- Games involved center-of-gravity variations, steps in different directions, weight shifts, coordinated upper/lower limb movement, quick reactions and cognitive tasks.

How we use it in the hackathon:
- Gives design primitives for MotionQuest levels.
- Also gives honest limitation: evidence certainty is not uniformly high.

MVP metrics:
- weight-shift left/right;
- target reach;
- step direction;
- reaction time;
- immediate feedback count;
- usability quick score.

### 7. Effects of exergame and video game training on cognitive and physical function in older adults: A randomized controlled trial

Citation:
Hou, H.-Y., & Li, H.-J. (2022). Effects of exergame and video game training on cognitive and physical function in older adults: A randomized controlled trial. Applied Ergonomics, 101, 103690.  
DOI: https://doi.org/10.1016/j.apergo.2022.103690  
URL: https://www.sciencedirect.com/science/article/pii/S0003687022000138

Key evidence:
- 84 healthy older adults randomized to exergame, video game and control groups.
- Exergame training combines cognitive engagement and physical activity.
- The paper reports better overall effects for exergame training, including lower-limb strength, balance and aerobic endurance.
- The authors explain that exergames require users to monitor and adjust body position, supporting position-changing movements and postural control.

How we use it in the hackathon:
- Supports dual-task game mechanics: physical movement plus simple cognitive challenge.

MVP metrics:
- movement accuracy;
- color/number reaction accuracy;
- lower-limb strength proxy through repeated sit-to-stand;
- balance score;
- aerobic endurance proxy through step-in-place duration.

## Metrics & Thresholds for MVP

### Metrics to code first

1. Sit-to-stand / chair stand:
   - count repetitions in 30 seconds;
   - detect seated -> standing transition;
   - trunk lean warning;
   - incomplete rep count.

2. Step-in-place / step target:
   - step count;
   - reaction time to target;
   - missed target;
   - left/right balance of steps.

3. Reach target:
   - reach side: left/right/up/down;
   - range of motion proxy;
   - smoothness proxy from landmark path;
   - completion time.

4. Balance hold:
   - hold duration;
   - center-body sway proxy;
   - foot/hip/shoulder stability proxy;
   - recovery events.

5. Engagement:
   - session completed;
   - level completed;
   - retries;
   - difficulty adjustment.

### Threshold discipline

Evidence:
- Trials and reviews commonly use standardized functional outcomes such as TUG, Berg Balance Scale, Tinetti, 30-second chair stand and 8-foot up-and-go.
- A hackathon webcam prototype cannot reproduce clinical scoring exactly.

Inference for MVP:
- Use these as **inspired-by functional proxies**, not official clinical tests.
- Show the metric names honestly:
  - "TUG-style timing proxy";
  - "BBS-inspired balance task";
  - "30-second chair-stand counter".
- Do not claim fall prevention from one session.

### Recommended demo flow

1. Choose participant profile: older adult / caregiver / rehab coach.
2. Run 3 short game tasks:
   - sit-to-stand counter;
   - reach the stars;
   - step to the target.
3. Generate report:
   - completed reps;
   - reaction time;
   - balance hold;
   - movement confidence;
   - suggested next difficulty.

## Evidence / Inference / Hypothesis

### Evidence
- Exergames have RCT and meta-analysis support for balance and fall-related outcomes in older adults.
- AI exercise tools commonly include sensing, real-time feedback and personalization.
- Functional tasks such as chair stand, TUG, BBS, Tinetti and 8-foot up-and-go are recurring outcome measures.

### Inference
- A webcam-based MotionQuest prototype can credibly implement simplified functional proxies.
- Presentation should emphasize research-informed task design and accessibility, not entertainment alone.

### Hypothesis to validate
- Users will complete more repetitions and show better engagement when movement tasks are game-like and feedback is immediate.
- Judges will value MotionQuest for Research/Social Impact if the demo is tied to standardized measures.

## Book Chapter Angle

Working title:
**From Exergame to Evidence-Aligned Movement Support: Webcam-Based Functional Tasks for Healthy Ageing**

Draft abstract:
This chapter presents MotionQuest, a hackathon prototype that translates evidence from older-adult exergame research into a browser-based movement experience. The system uses webcam pose estimation to guide and score simplified functional tasks inspired by established outcomes such as the 30-second chair stand, Timed Up-and-Go, Berg Balance Scale, Tinetti test and 8-foot up-and-go. Rather than treating gamification as a decorative layer, the prototype uses game mechanics to deliver immediate feedback, progressive challenge and movement repetition in a format designed for accessibility and adherence. The chapter argues that physical-activity technology for ageing populations should connect playful interaction with validated functional constructs, while clearly distinguishing early prototypes from clinical interventions.

## Blockers

- A webcam prototype is not a clinical fall-prevention intervention.
- Standardized outcomes cannot be fully replicated without protocol control and safety supervision.
- Older-adult testing requires careful safety and accessibility handling.
- Evidence for exergames is positive but heterogeneous; some reviews rate certainty as low to very low.

## Source Links

- AI exercise and healthy ageing review: https://link.springer.com/article/10.1186/s12877-026-07544-1
- 2026 BMC exergame balance meta-analysis: https://link.springer.com/article/10.1186/s12877-026-07471-1
- Nature Medicine fall prevention RCT: https://www.nature.com/articles/s41591-023-02739-0
- Physical literacy RCT: https://journals.sagepub.com/doi/10.1089/g4h.2022.0212
- Functional performance RCT: https://journals.sagepub.com/doi/10.1089/g4h.2022.0194
- PLOS ONE home-based exergame usability review: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0306816
- Applied Ergonomics RCT: https://www.sciencedirect.com/science/article/pii/S0003687022000138
