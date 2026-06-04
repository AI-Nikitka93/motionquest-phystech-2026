# MotionQuest Evidence Surface — T022-T030

Project: MotionQuest
Date verified: 2026-05-06
Use in: app evidence panel, README, Devpost copy, presentation, judge Q&A.

## Evidence Surface Card

MotionQuest is evidence-aligned, not clinically validated. The evidence below supports the product direction: older-adult functional movement, chair-based activity, exergame-style feedback, pose/hand observation limits, dignity/privacy, technology adoption and contest award fit.

## Bibliography Verification

| Evidence role | Reference | Verified URL | 2026-05-06 result | Safe MotionQuest use | Boundary |
|---|---|---|---|---|---|
| Functional movement anchor | Jones, Rikli & Beam, 1999, 30-s Chair-Stand Test | https://cir.nii.ac.jp/crid/1360574094500487808 | Opened; DOI shown as `10.1080/02701367.1999.10608028`. | Chair-stand-inspired activity can reference a familiar older-adult functional movement construct. | Not an official score unless the supervised protocol is reproduced. |
| Practical chair stand reference | American Physical Therapy Association, 30-Second Chair Stand Test | https://www.apta.org/patient-care/evidence-based-practice-resources/test-measures/30-second-chair-stand-test | Opened; page states the test counts chair stands in 30 seconds and is primarily for ages 60+. | Public explanation of why chair stand is meaningful. | MotionQuest does not reproduce APTA clinical conditions. |
| Exergame functional-performance evidence | Guede-Rojas et al., 2023, Games for Health Journal | https://doi.org/10.1089/g4h.2022.0194 | Opened in browser; local HTTP request returned publisher/bot 403. | Exergame mechanics can connect to older-adult functional performance research. | Do not claim MotionQuest has the same intervention effect. |
| Chair-based exercise evidence | Klempel et al., 2021, systematic review/meta-analysis | https://doi.org/10.3390/ijerph18041902 | Opened in browser; local HTTP request returned publisher/bot 403. | Seated/chair-based activity is legitimate physical-activity framing. | Do not claim every seated exercise improves every outcome. |
| Balance/exercise evidence context | Cochrane, Exercise for improving balance in older people | https://www.cochrane.org/evidence/CD004963_exercise-improving-balance-older-people | Opened; page includes evidence caveats. | Exercise/balance context for cautious movement-practice language. | Do not claim fall prevention or clinical balance improvement. |
| Pose-estimation capability and limits | Google AI Edge Pose Landmarker guide | https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker | Opened; guide documents landmarks and confidence thresholds. | Explains why confidence and visible landmarks matter. | Do not claim perfect detection in occluded seated views. |
| Pose model origin | Bazarevsky et al., 2020, BlazePose | https://arxiv.org/abs/2006.10204 | Opened; abstract describes 33 body keypoints and fitness-style use cases. | Supports real-time body keypoint tracking as a plausible browser-camera technique. | Do not claim MotionQuest accuracy equals paper benchmarks. |
| Mobility impairment and remote health acceptance | Mitzner et al., 2017, televideo acceptance | https://doi.org/10.1177/2055668317692755 | Opened through publisher/search; local HTTP request returned publisher/bot 403. | Supports remote wellness framing for adults aging with mobility impairment. | Do not claim universal acceptance of camera technology. |
| Older-adult technology adoption | Mitzner et al., 2019, PRISM Trial | https://academic.oup.com/gerontologist/article/59/1/34/5108474 | Opened through Oxford page; local HTTP request returned publisher/bot 403. | Supports usability, usefulness, support and adoption framing for older adults. | Do not generalize beyond older-adult technology-adoption context. |
| Dignity/privacy design gap | JMIR 2025 scoping review | https://doi.org/10.2196/75667 | Opened; page discusses dignity/independence and privacy concerns. | Supports visible dignity/privacy promise before camera use. | Promise card is not proof of long-term adoption. |

## T022 Strongest Evidence Points From Research Synthesis

| Evidence point | Source path | Product meaning | Boundary |
|---|---|---|---|
| Older-adult exergames are studied as serious physical-activity interventions. | `research-synthesis-MotionQuest.md` and Guede-Rojas et al. | MotionQuest can be presented as evidence-aligned exergame practice, not as a decorative game. | A hackathon release is not an intervention trial. |
| 30-second chair stand is a recurring functional movement construct. | Jones/Rikli/Beam; APTA; synthesis. | Standing branch can be chair-stand-inspired. | No official clinical scoring. |
| Chair-based exercise is a legitimate older-adult activity format. | Klempel et al.; adaptive seated research. | Seated branch is first-class, not failure mode. | No claim that all seated users can be measured reliably. |
| Home-based exergame usability and feedback matter. | `research-synthesis-MotionQuest.md` home-exergame review entries. | Large accessible UI, simple targets and feedback are product-relevant. | Usability still needs real users. |
| Pose models can observe landmarks, but confidence and occlusion matter. | Google AI Edge; BlazePose; adaptive seated research. | MotionQuest must show confidence and limitation text. | No perfect tracking or hidden measurement claims. |

## T024 Evidence Categories

| Category | MotionQuest evidence use | Public wording |
|---|---|---|
| Problem significance | Older adults and mobility-diverse users face adoption and activity barriers. | "Movement practice should be easy to start, inclusive and understandable." |
| Activity design support | Chair stand and exergame-style feedback connect to older-adult functional activity research. | "Activities are inspired by functional movement and exergame literature." |
| Seated/chair-based support | Chair-based exercise literature supports seated activity as legitimate. | "Seated movement is a first-class path, not a fallback." |
| Pose observation limits | Pose/hand tracking depends on visibility, confidence and camera conditions. | "The report shows what was visible and how much to trust the session." |
| Dignity/privacy | Older-adult fitness technology literature highlights dignity, independence and privacy. | "Camera use is visible, limited and explained before the session." |
| Technology adoption | Older-adult adoption depends on usefulness, usability, support and reduced barriers. | "No wearable, no account and plain-language report reduce friction." |

## T026 Public Claim Trace

| Public statement | Evidence status | Source / proof | Required label |
|---|---|---|---|
| MotionQuest is evidence-aligned. | Traceable evidence. | Synthesis plus bibliography above. | Research-aligned, not clinically validated. |
| Chair stand branch is functional-movement-inspired. | Traceable evidence. | Jones/Rikli/Beam; APTA; Guede-Rojas. | Practice signal, not official score. |
| Seated path is legitimate activity framing. | Traceable evidence plus product inference. | Klempel et al.; adaptive seated research. | Seated practice signal. |
| Reach Stars is a reach/engagement proxy. | Product inference from exergame and reach-practice logic. | Synthesis and implemented mechanics. | Proxy, not range-of-motion assessment. |
| Camera observations have limits. | Traceable technical source plus project behavior. | Google AI Edge Pose Landmarker; app confidence layer. | Confidence/limitation required. |
| Dignity/privacy is a product advantage. | Traceable design/research support. | JMIR scoping review and project privacy implementation. | Promise, not adoption proof. |
| Caregiver report is valuable. | Product inference. | Project outcome and caregiver communication problem. | Hypothesis until user testing. |
| Entrepreneurship path is caregiver/community wellness. | Product inference. | Award strategy and report-led value model. | Future business path, no fake numbers. |

## T028 Research Award Proof

- Named sources are available and verified on 2026-05-06.
- Evidence is split into activity constructs, exergame support, chair-based activity, pose limits, dignity/privacy and adoption.
- Every public claim must be source-backed or labeled as product inference.
- MotionQuest must keep the wording `research-aligned`, not `clinically validated`.
- Confidence-by-mode and sample/live boundaries are part of the research honesty story.

## T029 Social Impact Award Proof

- Seated mode is a first-class path.
- No wearable, account, backend or app install is required for the core experience.
- Dignity and privacy are visible promises, not hidden policy text.
- Caregiver-readable reporting turns a session into understandable communication.
- The product explicitly excludes medical claims that would erode trust.

## T030 Entrepreneurship Award Proof

- The first release demonstrates a report-led value model: home user completes a session, caregiver/reviewer understands the outcome.
- Future buyer path is caregiver/family review and community wellness facilitation.
- Future model can be described without fake market size, revenue or conversion numbers.
- The non-medical boundary keeps the initial category simpler than clinical software.
- The product has a plausible expansion path through repeated session records, caregiver sharing and community wellness use, all parked outside first-release scope.

## Evidence Surface Copy Block

MotionQuest is research-aligned, not clinically validated. The activities are inspired by older-adult functional movement, chair-based activity and exergame research. The camera only produces session observations when enough of the relevant movement is visible. The report therefore shows source, mode, confidence and limits, and it never treats a single webcam session as a diagnosis, fall-risk prediction or official clinical score.
