# Research Synthesis: BlindCourt

Проект: PhysTech 2026  
Идея: BlindCourt - Audio/Haptic Sport Assistant for Inclusive Physical Activity  
Дата поиска: 2026-05-04  
Активный режим P-PAPERS: DISCOVERY + OPEN_ACCESS + PAPER_TO_CODE-adjacent  
Freshness anchor: 2022-2026

## SUMMARY

BlindCourt имеет сильный **impact** и достаточно сильную смежную научную основу, но узкая формулировка "computer vision + haptic feedback specifically for blind sports participation" пока слабо покрыта peer-reviewed работами. Поэтому отчет честно опирается на два доказательных слоя:

1. Problem evidence: люди с visual impairment сталкиваются с барьерами к физической активности, спорту и самостоятельному движению.
2. Method evidence: computer vision, audio navigation, vibrotactile encoding and haptic sensory substitution могут передавать пространственные cues без зрения.

Для MVP лучше не обещать полноценный assistive sport device. Правильная формулировка: **supervised inclusive drill prototype**, где камера отслеживает яркий объект/мишень, а пользователь получает directional audio/vibration cues.

## Search Plan / Query Pack

Lanes:
- arXiv
- PubMed-style discovery
- Semantic Scholar-style web discovery
- publisher OA pages

Queries:
- `visually impaired sport assistive technology haptic feedback computer vision 2022 2026`
- `blind athletes audio haptic feedback sports navigation computer vision`
- `accessible exergame visually impaired physical activity haptic audio feedback`
- `visual impairment physical activity barriers sports participation technology`
- `object localization computer vision vibrotactile encoding blind`

Stop condition: 6 relevant papers found, including problem evidence, haptic/CV method evidence and accessibility-program evidence.

## Literature Review

### 1. Exploring the Experiences of Runners with Visual Impairments and Sighted Guides

Citation:
Longmuir, P. E. et al. (2022). Exploring the Experiences of Runners with Visual Impairments and Sighted Guides. International Journal of Environmental Research and Public Health, 19(19), 12907.  
URL: https://www.mdpi.com/1660-4601/19/19/12907

Key evidence:
- The paper reports that adults with visual impairments have higher sedentary behavior than sighted peers.
- Reported barriers include transportation, facilities, accessible sports, reliance on others and unwanted attention.
- Sighted guides are important but create a dependence bottleneck.

How we use it in the hackathon:
- Establishes the impact problem: participation is blocked by spatial accessibility and reliance on other people.
- Supports a product that reduces dependence in controlled practice drills.

MVP metrics:
- task completion with/without guidance;
- target-finding time;
- number of wrong-direction corrections;
- number of boundary alerts;
- user confidence rating after drill.

### 2. Group-Based Exercise Programs for Adults With Visual Impairment: A Scoping Review of Implementations and Outcomes

Citation:
Chang, C.-W., Thomacos, N., Chen, M.-D., & Lalor, A. (2026). Group-Based Exercise Programs for Adults With Visual Impairment: A Scoping Review of Implementations and Outcomes. American Journal of Health Promotion.  
URL: https://journals.sagepub.com/doi/full/10.1177/08901171261440719

Key evidence:
- The review covers peer-reviewed experimental studies and outcomes for adults with visual impairment.
- It identifies environmental and personal barriers, including inaccessible equipment, transportation, limited social support and lack of inclusive opportunities.
- It concludes group-based exercise programs can benefit adults with visual impairment across multiple domains but daily functioning, social interaction and exercise intensity evidence remains limited.

How we use it in the hackathon:
- Supports designing BlindCourt as a structured drill system, not just a gadget.
- Shows that social participation and accessible program design matter.

MVP metrics:
- exercise session completion;
- repeated drill participation;
- partner/coach assist level: none / verbal / physical;
- perceived autonomy score.

### 3. A Haptic Interface for Guiding People with Visual Impairment using Three Dimensional Computer Vision

Citation:
Swingler, K., & Grigson, C. (2022). A Haptic Interface for Guiding People with Visual Impairment using Three Dimensional Computer Vision. Proceedings of IJCCI 2022, 315-322.  
DOI: https://doi.org/10.5220/0011307800003332  
URL: https://www.scitepress.org/Papers/2022/113078/113078.pdf

Key evidence:
- Uses computer vision to locate objects and the user's hand.
- Computes relative location and signals required direction through a haptic wristband.
- The wristband uses four haptic motors at compass points.
- User testing found participants could follow haptic instructions to move their hand to targets on vertical/horizontal surfaces.

How we use it in the hackathon:
- Strong technical template for BlindCourt's directional cue design.
- We can map target bearing to four directions: left, right, forward, back/stop.

MVP metrics:
- target bearing angle;
- target distance bin;
- cue direction: left/right/forward/stop;
- successful target reach;
- correction count per drill.

### 4. Object Localization Assistive System Based on CV and Vibrotactile Encoding

Citation:
Wei, Z., & Hu, X. (2022). Object Localization Assistive System Based on CV and Vibrotactile Encoding. arXiv:2206.09432; EMBC 2022.  
URL: https://arxiv.org/abs/2206.09432

Key evidence:
- Presents computer-vision-based spatial object localization with vibrotactile encoding for blind users.
- Compares vibrotactile feedback with voice prompt feedback.
- Reports vibrotactile feedback reduced task completion time by more than 25% compared with voice prompts.

How we use it in the hackathon:
- Supports haptic/vibration as more than decoration: it can be faster than speech prompts for spatial tasks.
- For a sport drill, haptic cues may reduce cognitive/audio overload.

MVP metrics:
- time-to-target;
- haptic vs audio-only completion time;
- cue latency;
- cue clarity rating;
- directional error rate.

### 5. Obstacle avoidance for blind people using a 3D camera and a haptic feedback sleeve

Citation:
Obstacle avoidance for blind people using a 3D camera and a haptic feedback sleeve. (2022). arXiv:2201.04453.  
URL: https://arxiv.org/abs/2201.04453

Key evidence:
- Tests a haptic feedback sleeve for obstacle avoidance.
- Users identified and localized 98.6% of single-motor vibration patterns and 70% of multidirectional/multi-motor patterns.
- All users completed a dark testing route and improved over runs.

How we use it in the hackathon:
- Provides concrete design warning: simple vibration patterns are much easier than complex multi-motor patterns.
- BlindCourt MVP should start with simple left/right/near/stop cues, not a complex symbolic language.

MVP metrics:
- vibration pattern class: single direction vs compound;
- pattern recognition accuracy in user test;
- route/drill completion;
- collision/boundary count;
- learning improvement across attempts.

### 6. The Unfolding Space Glove: A Wearable Spatio-Visual to Haptic Sensory Substitution Device for Blind People

Citation:
Kilian, J., Neugebauer, A., Scherffig, L., & Wahl, S. (2022). The Unfolding Space Glove: A Wearable Spatio-Visual to Haptic Sensory Substitution Device for Blind People. Sensors, 22(5), 1859.  
DOI: https://doi.org/10.3390/s22051859  
URL: https://www.mdpi.com/1424-8220/22/5/1859

Key evidence:
- Open-source sensory-substitution device transmitting relative position and distance of objects as vibratory stimuli.
- Study included blind and blindfolded sighted participants.
- Participants learned to use the device and completed trials, though the paper cautions that further work is needed for full navigation aid claims.

How we use it in the hackathon:
- Supports the theoretical basis: spatial information can be translated into haptic cues.
- Supports training/progressive learning loop in BlindCourt.

MVP metrics:
- distance-to-target bin;
- pulse frequency or intensity as distance proxy;
- learning curve across repeated drills;
- subjective usability after 3-5 attempts.

### 7. Sound-based navigation system for visually impaired individuals

Citation:
Malaekah, E., Alfahad, O., Bakouri, M., Gadallah, A., Selman, S., Al Rashdi, A., & Saied, H. (2026). Sound-based navigation system for visually impaired individuals. Journal of Radiation Research and Applied Sciences.  
DOI: https://doi.org/10.1016/j.jrras.2026.102160  
URL: https://www.sciencedirect.com/science/article/pii/S1687850726000038

Key evidence:
- Combines voice recognition, route guidance and real-time haptic feedback.
- Reports 91.04% voice recognition, 4% navigation error and 3% speed regulation error.

How we use it in the hackathon:
- Supports multimodal cueing: audio + haptic.
- Use as adjacent evidence, not direct sport evidence.

MVP metrics:
- target direction accuracy;
- cue latency;
- navigation/drill error rate;
- audio/haptic cue mode preference.

## Metrics & Thresholds for MVP

### Metrics to code first

1. Object tracking:
   - object center x/y;
   - confidence;
   - lost-object frames;
   - distance proxy from object size or calibrated zone.

2. Directional guidance:
   - bearing left/right/center;
   - near/far distance bins;
   - stop/boundary warning.

3. Cue encoding:
   - stereo audio pan left/right;
   - vibration pulse frequency for distance;
   - short pulse = correction;
   - long pulse = stop / boundary.

4. Drill outcomes:
   - time-to-target;
   - number of corrections;
   - target acquisition success;
   - boundary/collision alerts;
   - improvement across attempts.

### Threshold discipline

Evidence:
- Simple vibration patterns are much more recognizable than complex multi-motor patterns in adjacent haptic navigation work.
- Vibrotactile feedback can reduce task completion time compared with voice prompts in object localization research.

Inference for MVP:
- Start with no more than 3-4 cue types:
  - left;
  - right;
  - forward/center;
  - stop/too close/boundary.
- Do not build a complex haptic language.
- Use controlled objects: bright ball, cone, marker or phone screen target.

### Recommended demo task

Best first demo:
- laptop/phone camera tracks a bright ball or target;
- user receives stereo audio or vibration guidance;
- user tries to move toward/point to target while not looking;
- dashboard shows time-to-target and corrections.

Avoid first:
- full competitive sport;
- unsupervised navigation;
- high-speed ball sports;
- crowded scenes;
- safety-critical claims.

## Evidence / Inference / Hypothesis

### Evidence
- People with visual impairments face barriers to sport and physical activity.
- CV/haptic systems can encode object location and direction.
- Vibrotactile cues can be faster or more intuitive than voice-only prompts in certain spatial localization tasks.

### Inference
- A controlled inclusive sport drill can transfer object-localization and navigation findings into physical activity.
- Haptic/audio spatial cues may reduce reliance on sighted assistance in limited practice scenarios.

### Hypothesis to validate
- BlindCourt can improve target-finding speed or confidence in a supervised drill.
- Simple audio/haptic cues will be preferred over voice-only instructions for fast spatial corrections.

## Book Chapter Angle

Working title:
**Inclusive Sport Through Multimodal Spatial Cues: A Computer-Vision and Haptic Feedback Prototype for Blind Physical Activity**

Draft abstract:
This chapter presents BlindCourt, a hackathon prototype that explores how computer vision, spatial audio and vibrotactile feedback can support inclusive physical-activity drills for blind and visually impaired participants. The work is grounded in research on visual impairment barriers to sport participation, haptic sensory substitution and computer-vision-based object localization. Rather than claiming to replace trained guides or safety systems, the prototype focuses on a supervised drill environment where a camera tracks a visible target and translates its position into simple directional audio and vibration cues. The chapter argues that inclusive sports technology should be evaluated not only by tracking accuracy, but also by autonomy, cue interpretability, safety and the reduction of reliance on purely visual information.

## Blockers

- Direct peer-reviewed literature for "CV/haptic blind sports assistant" is limited.
- Most supporting evidence comes from navigation, object localization and sensory substitution, not sports-specific trials.
- Safety is a hard constraint; present as supervised drill prototype.
- User validation with blind/low-vision participants would require careful ethics and accessibility handling.

## Source Links

- Runners with visual impairments: https://www.mdpi.com/1660-4601/19/19/12907
- Group-based exercise programs for adults with VI: https://journals.sagepub.com/doi/full/10.1177/08901171261440719
- Haptic interface with 3D computer vision: https://www.scitepress.org/Papers/2022/113078/113078.pdf
- Object localization with CV and vibrotactile encoding: https://arxiv.org/abs/2206.09432
- 3D camera + haptic sleeve: https://arxiv.org/abs/2201.04453
- Unfolding Space Glove: https://www.mdpi.com/1424-8220/22/5/1859
- Sound-based navigation system: https://www.sciencedirect.com/science/article/pii/S1687850726000038
