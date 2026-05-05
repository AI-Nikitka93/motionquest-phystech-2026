# Research Synthesis: CoachLens

Проект: PhysTech 2026  
Идея: CoachLens - Biomechanics From One Phone Video  
Дата поиска: 2026-05-04  
Активный режим P-PAPERS: DISCOVERY + OPEN_ACCESS + PDF_TEXT_PIPELINE  
Freshness anchor: 2022-2026

## SUMMARY

CoachLens имеет сильный академический фундамент: в 2022-2026 годах быстро растет литература по markerless motion capture, smartphone video biomechanics, 2D/3D pose estimation и спортивной/реабилитационной кинематике. Наука поддерживает MVP, если мы честно ограничим его как **movement-screening / coaching-feedback tool**, а не как медицинскую диагностику.

Главный вывод: MVP должен отслеживать **крупные, визуально устойчивые метрики**: углы hip/knee/ankle, trunk lean, shoulder/hip alignment, range of motion, side-to-side asymmetry, movement phase timing. Нельзя обещать точную клиническую оценку быстрых движений и мелких отклонений: published error bands для markerless systems часто находятся в диапазоне нескольких градусов и выше.

## Search Plan / Query Pack

Lanes:
- arXiv
- PubMed / Journal of Biomechanics
- Semantic Scholar-style web discovery
- publisher OA pages

Queries:
- `markerless motion capture smartphone video biomechanics 2D pose estimation sports joint angle validation 2022 2026`
- `MediaPipe pose estimation biomechanics joint angles exercise validation`
- `OpenCap markerless motion capture validation biomechanics smartphone`
- `2D video pose estimation lower limb kinematics sports biomechanics validation`
- `Sports2D compute 2D human pose angles webcam`

Stop condition: 6 relevant papers / scholarly artifacts found, covering feasibility, technical method, validation error and MVP metrics.

## Literature Review

### 1. OpenCap: Human movement dynamics from smartphone videos

Citation:
Uhlrich, S. D., Falisse, A., Kidzinski, L., Muccini, J., Ko, M., Chaudhari, A. S., Hicks, J. L., & Delp, S. L. (2023). OpenCap: Human movement dynamics from smartphone videos. PLOS Computational Biology.  
URL: https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011462

Key evidence:
- OpenCap estimates human movement kinematics and dynamics from videos captured by two or more smartphones.
- The paper reports kinematic mean absolute error around 4.5 degrees for rotational degrees of freedom in one setup and highlights lower-extremity RMSE ranges around a few to about 10 degrees in related analysis.
- The paper frames movement dynamics as relevant to injury risk, disease progression, rehabilitation decisions and large-scale studies.
- It reports a practical field-study argument: movement dynamics estimated far faster and much cheaper than a lab-based approach.

How we use it in the hackathon:
- Scientific anchor for "biomechanics without lab hardware".
- Supports a smartphone-video movement report as a real research direction.
- MVP should show **confidence and limitations**, not overclaim medical precision.

MVP metrics:
- hip/knee/ankle flexion-extension angle;
- trunk lean during squat or sit-to-stand;
- side-to-side differences for bilateral movements;
- movement phase segmentation: descent, bottom, ascent, landing.

### 2. Validation of OpenCap: A low-cost markerless motion capture system for lower-extremity kinematics during return-to-sport tasks

Citation:
Turner, J. A., Chaaban, C. R., & Padua, D. A. (2024). Validation of OpenCap: A low-cost markerless motion capture system for lower-extremity kinematics during return-to-sport tasks. Journal of Biomechanics, 171, 112200.  
DOI: https://doi.org/10.1016/j.jbiomech.2024.112200  
PubMed: https://pubmed.ncbi.nlm.nih.gov/38905926/

Key evidence:
- The study validates OpenCap-derived lower-extremity kinematics against optoelectronic marker-based motion capture.
- Participants were athletes after ACL reconstruction, 12-18 months post-surgery.
- Tasks included jump-landing-rebound, single-leg hop and lateral-vertical hop.
- Search/publisher snippets report RMSE ranges around 3.7-10.2 degrees and emphasize OpenCap's accessibility for return-to-sport kinematics.

How we use it in the hackathon:
- Supports CoachLens task selection: jump landing, single-leg hop and lateral movement are scientifically relevant.
- Supports return-to-sport / movement quality framing, but not injury diagnosis.

MVP metrics:
- peak knee flexion on landing;
- peak hip flexion on landing;
- left/right landing asymmetry;
- frontal-plane knee displacement proxy if camera angle supports it;
- "large deviation only" rule because subtle differences may be below measurement reliability.

### 3. Markerless joint angle estimation using MediaPipe with a rapid setup for joint moment calculation

Citation:
Markerless joint angle estimation using MediaPipe with a rapid setup for joint moment calculation. (2026). Multimedia Tools and Applications.  
URL: https://link.springer.com/article/10.1007/s11042-026-21256-z

Key evidence:
- The paper develops a low-cost markerless motion analysis system using a single RGB camera and MediaPipe.
- It processes sit-to-stand movement and estimates ankle, knee and hip joint angles.
- It states that a sagittal-plane camera can detect fingertip, heel, ankle, knee, hip and shoulder points, which is adequate for lower-extremity biomechanics in sit-to-stand.
- It integrates MediaPipe outputs with an inverse dynamics model to compute joint moments.

How we use it in the hackathon:
- Strong support for the practical MVP implementation path: browser/webcam or phone video with MediaPipe-style landmarks.
- Supports choosing controlled sagittal-plane exercises for the first demo.

MVP metrics:
- ankle angle;
- knee angle;
- hip angle;
- shoulder-hip-knee alignment;
- sit-to-stand phase timing;
- minimum/maximum joint angle per repetition.

### 4. Sports2D: Compute 2D human pose and angles from a video or a webcam

Citation:
Pagnon, D., & Kim, D. (2024). Sports2D: Compute 2D human pose and angles from a video or a webcam. Journal of Open Source Software, 9(101), 6849.  
DOI: https://doi.org/10.21105/joss.06849  
URL: https://joss.theoj.org/papers/10.21105/joss.06849

Key evidence:
- Sports2D computes 2D joint and segment angles from video or webcam.
- Outputs include annotated video, joint locations, joint angles and segment angles.
- The paper explicitly notes sports coaches can use such tools to quantify KPIs and compare movement patterns.
- It states that 2D analysis is often sufficient when movement mostly lies in sagittal or frontal plane.

How we use it in the hackathon:
- Supports a 2D-first MVP instead of overbuilding 3D reconstruction.
- Supports showing annotated video + spreadsheet-style metrics as a serious output.

MVP metrics:
- joint angles;
- segment angles;
- per-frame time series;
- annotated replay;
- CSV/exportable movement report.

### 5. OpenCap Monocular: 3D Human Kinematics and Musculoskeletal Dynamics from a Single Smartphone Video

Citation:
OpenCap Monocular: 3D Human Kinematics and Musculoskeletal Dynamics from a Single Smartphone Video. (2026). arXiv:2603.24733.  
URL: https://arxiv.org/abs/2603.24733

Key evidence:
- The paper validates a single-smartphone approach against marker-based motion capture and force plates.
- Reported metrics include 4.8 degree mean absolute error for rotational degrees of freedom and 3.4 cm for pelvis translations.
- It claims improvement over a regression-only computer vision baseline and demonstrates applications related to frailty and knee osteoarthritis.

How we use it in the hackathon:
- Supports a single-phone framing for CoachLens if we want a very accessible product story.
- Since this is an arXiv preprint, use it as a forward-looking technical signal, not as the only foundation.

MVP metrics:
- rotational-degree error awareness;
- pelvis/trunk translation proxy;
- walking/squat/sit-to-stand tasks as safer first demos.

### 6. The potential of human pose estimation for motion capture in sports: a validation study

Citation:
The potential of human pose estimation for motion capture in sports: a validation study. (2024). Sports Engineering.  
URL: https://link.springer.com/article/10.1007/s12283-024-00460-w

Key evidence:
- Validates human pose estimation against marker-based motion capture in sports contexts.
- Uses statistical tests and effect size logic to compare synchronized marker-based motion capture and human pose estimation by joint angle, movement and participant.

How we use it in the hackathon:
- Supports the claim that sports pose-estimation validation is an active scholarly field.
- Helps justify caution: validation must be task-specific and joint-specific.

MVP metrics:
- per-joint error/confidence;
- per-movement comparison;
- task-specific reliability label: "high confidence for controlled sagittal movement", "low confidence for fast/occluded motion".

## Metrics & Thresholds for MVP

### Metrics to code first

1. Pose quality:
   - landmark visibility/confidence;
   - missing landmark count;
   - frame drop / tracking instability.

2. Joint angle metrics:
   - knee flexion angle;
   - hip flexion angle;
   - ankle angle;
   - trunk lean angle;
   - shoulder-hip alignment;
   - hip-knee-ankle line in selected plane.

3. Movement timing:
   - start/end of repetition;
   - descent duration;
   - bottom hold;
   - ascent duration;
   - landing stabilization time.

4. Symmetry:
   - left/right knee angle difference;
   - left/right hip angle difference;
   - left/right landing or squat depth difference.

5. Output confidence:
   - `high`: all key landmarks visible, single-plane movement, stable camera;
   - `medium`: minor occlusion or rotation;
   - `low`: fast motion, camera movement, side occlusion, poor lighting.

### Threshold discipline

Evidence:
- Published markerless systems often show angle errors in the range of several degrees and sometimes around 10 degrees depending on task/joint.

Inference for MVP:
- Do not flag tiny deviations below 5-10 degrees as meaningful.
- Use broad bins:
  - `normal / watch / review`;
  - or `low / medium / high movement concern`.
- Prefer comparative feedback: "your left/right difference increased" rather than "your knee angle is exactly unsafe".

### Recommended demo movements

Best for first prototype:
- squat;
- sit-to-stand;
- countermovement jump;
- jump landing;
- single-leg balance or single-leg squat.

Avoid as first demo:
- high-speed sprint full biomechanics;
- complex twisting sport movement;
- crowded multi-person scenes;
- official injury-risk diagnosis.

## Evidence / Inference / Hypothesis

### Evidence
- Smartphone and webcam markerless motion capture is a real scholarly and open-source direction.
- 2D joint/segment angles from webcam/video are accepted as useful for some movement-analysis cases.
- OpenCap and related work validate smartphone-based biomechanics against lab systems with non-zero but usable error ranges.

### Inference
- A hackathon MVP can win by making the biomechanics output visually clear, honest and accessible.
- CoachLens should focus on explainable screening, not clinical-grade diagnosis.

### Hypothesis to validate
- Judges will value a single-phone movement report if it includes a live overlay, quantitative metrics and explicit uncertainty.
- Amateur coaches/users will understand angle overlays and asymmetry reports without needing sports-science training.

## Book Chapter Angle

Working title:
**Democratizing Biomechanics: Explainable Smartphone Pose Estimation for Accessible Movement Feedback**

Draft abstract:
This chapter presents CoachLens, a hackathon prototype that explores how consumer video and markerless pose estimation can make basic movement analysis available outside specialized biomechanics laboratories. Drawing on recent research in OpenCap, 2D sports pose analysis and MediaPipe-based joint-angle estimation, the project focuses on controlled physical-activity tasks such as squats, sit-to-stand transitions and jump landings. The system extracts visible pose landmarks, estimates interpretable joint and segment angles, and communicates movement feedback with confidence labels rather than diagnostic claims. The chapter argues that the next opportunity in physical-activity technology is not merely tracking more workouts, but translating biomechanical signals into understandable, uncertainty-aware coaching feedback for athletes, trainers and recreational participants.

## Blockers

- Fine-grained injury prediction is not supported for a hackathon MVP.
- Fast or occluded sport movements may produce unreliable landmarks.
- Camera angle matters; 2D analysis should be constrained to sagittal/frontal plane tasks.
- Claims must be framed as coaching support / screening, not medical advice.

## Source Links

- OpenCap PLOS Computational Biology: https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011462
- OpenCap validation PubMed: https://pubmed.ncbi.nlm.nih.gov/38905926/
- OpenCap validation DOI: https://doi.org/10.1016/j.jbiomech.2024.112200
- MediaPipe joint-angle paper: https://link.springer.com/article/10.1007/s11042-026-21256-z
- Sports2D JOSS: https://joss.theoj.org/papers/10.21105/joss.06849
- OpenCap Monocular arXiv: https://arxiv.org/abs/2603.24733
- Sports pose validation: https://link.springer.com/article/10.1007/s12283-024-00460-w
