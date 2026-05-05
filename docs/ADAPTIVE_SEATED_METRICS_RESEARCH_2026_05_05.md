# Adaptive Seated Metrics Research

Project: MotionQuest  
Date checked: 2026-05-05, Europe/Minsk  
Mode: rapid scholarly/product-method refresh for inclusive movement metrics  
Question: should MotionQuest support users who cannot stand, and which webcam metrics are defensible?

## Executive Verdict

MotionQuest should not require standing as the only valid path.

The strongest product improvement is to reframe the first activity from a fixed `Chair Stand` game into an `Adaptive Chair Movement` game with two branches:

- `Standing path`: chair-stand-inspired sit-to-stand reps when the person can safely stand and full lower body is visible.
- `Seated path`: seated upper-body movement and reach metrics when the person cannot or should not stand.

This keeps the MVP at two activities:

1. Adaptive Chair Movement.
2. Reach Stars.
3. Caregiver Report.

The product should not add a third game right now. It should make activity 1 adaptive.

## Research Snapshot

### 1. CDC guidance for adults with disabilities

Source: CDC, `Increasing Physical Activity among Adults with Disabilities`  
URL: https://www.cdc.gov/disability-and-health/conditions/physical-activity.html

Evidence:

- Adults with disabilities should engage in regular physical activity according to their abilities when they cannot meet the full guideline.
- CDC examples include wheelchair-based and adapted physical activity.
- CDC emphasizes barriers, appropriate activity options, and avoiding inactivity.

Product implication:

- A forced stand-up test is a bad inclusive default.
- MotionQuest should ask ability/safety first and offer a seated branch.

### 2. WHO physical activity guidelines

Source: WHO, `Guidelines on physical activity and sedentary behaviour`  
URL: https://www.who.int/publications/i/item/9789240015128

Evidence:

- WHO guidelines explicitly include older adults and people living with chronic conditions or disability.
- Recommendations cover amount, frequency, intensity and duration, but must be adapted to subpopulations.

Product implication:

- The app can be framed as ability-adapted physical activity support, not a one-size-fits-all fitness test.

### 3. Senior Fitness Test includes seated upper-body metrics

Source: BMC Geriatrics 2024, `Establishing sex- and age-specific normative values for the Senior Fitness Test among community-dwelling elderly aged 70 and older in Eastern China`  
URL: https://link.springer.com/article/10.1186/s12877-024-05423-1

Evidence:

- The Senior Fitness Test battery includes 30-second Chair Stand, 30-second Arm Curl, 2-minute Step Test, Chair Sit-and-Reach, Back Scratch and Up-and-Go.
- The arm curl test is performed while seated with a specified weight, and reps are counted over 30 seconds.

Product implication:

- A 30-second seated arm-curl-inspired counter is more defensible than inventing a random seated game.
- For MVP, do not require dumbbells. Use `no-weight / light-object optional` and report as `arm-curl-inspired movement practice`, not strength testing.

### 4. Sitting reach is a real functional construct

Source: Ademiluyi & Aruin, 2024, `The effect of advanced age and stool modification on reaching distance in sitting`  
URL: https://pubmed.ncbi.nlm.nih.gov/39493681/

Evidence:

- Reaching is described as an important functional ability.
- Older adults reached less far than younger adults across forward and lateral sitting reach conditions.
- Authors conclude age affects sitting functional reach ability and call for interventions to enhance functional tasks in sitting older adults.

Product implication:

- `Reach Stars` is not just game decoration. It can be presented as seated forward/lateral reach practice.
- The report should include `seated reach attempts`, `left/right reach hits`, `comfortable reach zone`, and `tracking quality`.

### 5. Functional Reach can be instrumented with sensors

Source: 2024 systematic review, `Sensor-based systems for the measurement of Functional Reach Test results`  
URL: https://pubmed.ncbi.nlm.nih.gov/38660214/

Evidence:

- Functional Reach Test is widely used in physical therapy, rehabilitation and geriatrics.
- Sensor-based systems can provide objective measurements of reach distance, postural sway and movement parameters.
- Reviewed automation methods included camera-based and motion sensor systems.

Product implication:

- MotionQuest should measure reach displacement/proxy and stability parameters, but must label them as `FRT-inspired` or `reach-practice proxy`, not official FRT scoring.

### 6. MediaPipe interactive training for older adults

Source: 2026 PMC article, `Development of motion recognition-based interactive training content to enhance motor functions in older adults`  
URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC12960042/

Evidence:

- The intervention used a webcam-like digital mirror with MediaPipe Pose and real-time targets.
- Target success was based on body-part coordinates entering a target area and staying there for 0.5 seconds.
- Physical fitness assessment included Senior Fitness Test components, including seated biceps curl, chair stand, up-and-go, sit-and-reach and 2-min step.
- Participants were older adults aged 65+.

Product implication:

- MotionQuest should require a short hold on target hits, not count one-frame wrist glitches.
- `0.5 sec dwell` is a strong MVP rule for Reach Stars and seated targets.

### 7. MediaPipe is feasible but limited for unusual seated/rehab poses

Source: Clemente et al., 2023/2024, `Feasibility of 3D Body Tracking from Monocular 2D Video Feeds in Musculoskeletal Telerehabilitation`  
URL: https://www.it.pt/Publications/PaperJournal/34005

Evidence:

- The study compared MediaPipe-based monocular video pose estimation with ground truth across physiotherapy exercises.
- Reported correlations were high for some exercises, but certain exercises including seated knee extension and shoulder flexion were challenging due to unusual poses, occlusion and depth ambiguity.

Product implication:

- The app must not pretend every seated pose is reliably measurable.
- Use simple frontal-plane metrics first: wrist-to-target, elbow flex/extend cycles, shoulder/hip visibility, and tracking confidence.

### 8. Wheelchair users are underrepresented in pose-estimation models

Source: CHI 2024 / arXiv, `WheelPose: Data Synthesis Techniques to Improve Pose Estimation Performance on Wheelchair Users`  
URL: https://arxiv.org/abs/2404.17063

Evidence:

- The paper states that existing pose-estimation models perform poorly on wheelchair users because of underrepresentation in training data.
- The work creates synthetic wheelchair-user data to improve detection and pose estimation.

Product implication:

- MotionQuest should not claim validated wheelchair pose estimation.
- The seated branch should be conservative: upper-body landmarks only, no wheelchair-specific clinical claims, and clear `tracking quality` warnings.

### 9. Digital exercise programs are feasible for older adults, but tailoring matters

Source: 2026 PMC article, `The Benefits of a Digital Exercise Intervention for Older Adults: Findings from the Fittle Randomized Controlled Trial`  
URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC12931955/

Evidence:

- RCT included 181 adults aged 60-95.
- Digital exercise programs were feasible and associated with improvements in health and psychosocial outcomes.
- The paper notes digital interventions cannot follow a one-size-fits-all model and must be tailored to aging populations.

Product implication:

- Ability choice and adaptive session mode should be visible before movement starts.

## Recommended MVP Metrics

### A. Ability / Safety Mode

Collect before camera session:

- `I can stand safely`
- `I will stay seated`

Store in report:

- `sessionMode: standing | seated-adaptive`

Do not infer disability label. Let user choose the safe mode.

### B. Posture / Visibility Classification

Use MediaPipe landmarks only as a browser measurement aid:

- `standing-ready`: shoulders, hips, knees visible; hip-knee geometry supports standing task.
- `seated-ready`: shoulders, elbows/wrists and optionally hips visible; lower-body full visibility not required.
- `partial-body`: some useful landmarks visible, but not enough for reliable scoring.
- `not-trackable`: only one limb/no stable body.

Implementation rule:

- Standing chair-stand counting requires shoulders + hips + knees.
- Seated reach requires shoulders + at least one wrist.
- Seated arm movement requires shoulder + elbow + wrist on at least one side.

### C. Seated Arm Curl / Arm Raise Counter

Evidence basis:

- Senior Fitness Test 30-second Arm Curl is seated and counts reps in 30 seconds.

MVP metric:

- Count elbow flexion/extension cycles using shoulder-elbow-wrist angle.
- Use no weight by default; optional light household object only in copy.
- Report as `arm movement reps`, not clinical upper-body strength.

Suggested logic:

- `extended`: elbow angle > 145 degrees.
- `flexed`: elbow angle < 75 degrees.
- one rep = extended -> flexed -> extended.
- require same arm landmarks visibility for at least 6 stable frames.

### D. Seated Reach Stars

Evidence basis:

- Sitting reach is a functional construct; sensor-based FRT automation supports reach distance and stability measurement; 2026 interactive training content used target-area entry plus 0.5-sec hold.

MVP metrics:

- targets shown;
- targets hit;
- left/right balance;
- average reaction time;
- dwell success count;
- comfortable reach zone reached.

Suggested logic:

- A hit counts only if wrist remains inside target for 0.5 seconds.
- Use large targets near shoulder-height zones first.
- Avoid extreme overhead targets for older/disability mode.

### E. Seated Trunk Stability Proxy

Evidence basis:

- Seated reach and dynamic sitting balance literature treats trunk/pelvis control as relevant.

MVP metric:

- low/medium/high `trunk steadiness proxy` based on shoulder-midpoint and hip-midpoint movement during seated reach.

Important limitation:

- Do not call it balance score or fall-risk score.

## What To Remove Or Avoid

- Do not require `Chair Stand` for everyone.
- Do not mark seated mode as fallback or failure.
- Do not infer wheelchair status automatically.
- Do not score wheelchair users with full-body standing landmarks.
- Do not claim clinical balance impairment, fall prediction, or validated rehab assessment.
- Do not use age/sex normative values in report unless protocol and equipment match the original test.

## Product Copy Changes

Replace:

`Chair Stand`

With:

`Adaptive Chair Movement`

Subcopy:

`Choose a safe mode: stand if safe, or stay seated and use upper-body movement. MotionQuest adapts the session instead of treating seated movement as a failed setup.`

Report labels:

- `Session mode: Seated adaptive`
- `Primary movement: Seated arm movement`
- `Reach practice: Seated forward/lateral targets`
- `Tracking validity: based on visible upper-body landmarks`

## Evidence / Inference / Hypothesis

### Evidence

- CDC and WHO guidance supports ability-adapted physical activity and avoiding inactivity.
- Senior Fitness Test includes seated upper-body measures such as 30-second arm curl.
- Seated reach has published older-adult evidence and is affected by age.
- Sensor-based FRT measurement and MediaPipe-based interactive training support webcam/sensor instrumentation of reach-like tasks.
- Wheelchair-user pose estimation is an identified bias/underrepresentation problem.

### Inference

- MotionQuest should become an adaptive functional movement lab, not a standing-only exergame.
- Seated upper-body metrics are more defensible than forcing sit-to-stand for people who cannot stand.
- Large-target, dwell-based wrist interaction is safer and more robust than frame-level star hits.

### Hypothesis To Validate

- Users who cannot stand can still complete a meaningful webcam-guided movement session if the app focuses on upper-body visibility and seated reach/arm movement.
- Judges will rate impact and inclusion higher if MotionQuest visibly adapts to ability instead of excluding seated users.

## Implementation Priority

1. Add ability choice on Home.
2. Rename first activity to `Adaptive Chair Movement`.
3. Branch first activity:
   - standing path: current Chair Stand.
   - seated path: 30-second arm-curl/arm-raise-inspired counter.
4. Update Reach Stars with 0.5-sec dwell requirement and seated-friendly target zones.
5. Add `sessionMode` and `primaryMovement` to localStorage/report.
6. Update report copy and research panel with inclusive metrics.
7. Keep safe-demo fallback, but do not label seated adaptive mode as fallback.
