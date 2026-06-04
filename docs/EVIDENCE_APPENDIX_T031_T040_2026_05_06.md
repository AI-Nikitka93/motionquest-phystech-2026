# MotionQuest Evidence Appendix — T031-T040

Project: MotionQuest
Date verified: 2026-05-06
Use in: evidence surface, README, Devpost, presentation, judge Q&A and future book/research package.

## T031 Dignity & Privacy Source Note

MotionQuest should make dignity and privacy visible before camera use because older-adult technology adoption literature does not treat these as cosmetic concerns.

Source basis:

- The JMIR 2025 scoping review on older-adult fitness technologies highlights dignity, independence and privacy concerns as under-addressed factors in product fit.
- The review describes stigma, dependency, over-collection and fear of being watched as adoption risks for older adults.
- PRISM technology-adoption research supports the idea that senior-focused systems need usefulness, usability, reduced barriers and support.
- Remote wellness technology research with mobility-impaired adults reports privacy/security and ease-of-use concerns.

MotionQuest product rule:

- The welcome layer must say that camera use is session-bound.
- The product must say video is not saved.
- The user must understand that the report is under their control.
- The app must avoid surveillance language.
- The product must not imply passive monitoring, continuous tracking or hidden recording.

Safe public wording:

> Dignity and privacy are part of the product, not a footnote: MotionQuest uses the camera only during the session, does not upload video and turns the session into a report the user can review.

Boundary:

- This is a design promise and implementation boundary, not proof that all older adults will adopt the product.

## T032 Movement Passport Source Note

Movement Passport is a future book/product thesis, not a first-release feature and not a medical history.

Thesis:

> Can a non-medical, dignity-preserving activity history help people excluded from normal fitness tracking turn short movement sessions into understandable, confidence-aware records of participation?

Why it belongs in the future story:

- Many fitness products treat measurable activity as steps, workouts, calories or wearable signals.
- Seated and mobility-diverse users can be excluded by these defaults.
- MotionQuest can preserve participation meaning without converting it into diagnosis.
- Caregivers may need readable continuity, not raw sensor files.
- Judges/research reviewers can understand the idea as a social-impact and research-translation path.

First-release boundary:

- The first release may mention Movement Passport only as future direction.
- It must not store long-term health records.
- It must not create medical timelines.
- It must not imply clinical progression or treatment effect.
- It must not require accounts or backend scope in the first release.

Safe public wording:

> Future direction: a Movement Passport could become a non-medical record of participation and confidence-aware movement practice, especially for users excluded by normal fitness tracking.

## T033 Confidence-By-Mode Evidence Note

MotionQuest confidence is not a clinical accuracy score. It is a product transparency layer showing what the app could observe in the current session.

| Mode | Required observation | Can say | Cannot say | Report language |
|---|---|---|---|---|
| Standing Adaptive Chair Movement | Enough standing-path body landmarks for visible sit-to-stand practice. | "Standing movement was observed as a practice signal." | "Lower-body strength was clinically measured." | "Practice signal only; not an official chair-stand score." |
| Seated Adaptive Movement | One visible open hand for seated participation signal. | "Seated hand movement was visible." | "Sitting posture, lower-body ability or wheelchair mobility was assessed." | "This seated path observes visible hand participation only." |
| Reach Stars | One visible hand interacting with the target area. | "Reach target interaction was observed." | "Range of motion or balance was measured." | "Reach Stars is a reach-practice proxy." |
| Low-confidence live session | Camera was attempted but visibility was insufficient. | "The session was not valid enough for usable numbers." | "The user failed." | "Repeat with better framing before using the numbers." |
| Sample fallback | Prebuilt example data. | "Report format can be demonstrated." | "Live movement was measured." | "Safe demo data only; not live camera data." |

## T034 Numeric Landmark-Loss Rule

Numeric landmark-loss, detection accuracy, tracking reliability and model-performance claims cannot be published unless one of these is true:

- The exact number comes from a named source cited next to the claim.
- The exact number comes from a MotionQuest validation run stored as project evidence.
- The exact number is presented as a clearly labeled measured result with setup, date, camera condition and sample context.

Forbidden examples:

- "MediaPipe loses about half of lower-body landmarks in seated mode."
- "MotionQuest is 95% accurate."
- "The app reliably detects seated posture."
- "The webcam can measure lower-body function from a desk camera."

Safe replacements:

- "Seated lower-body landmarks are often occluded or unavailable in normal desk-camera framing."
- "The report labels confidence and limitations for each session."
- "MotionQuest only reports what was visible enough to observe."

## T035 Chair-Stand Evidence Language

Approved wording:

> Adaptive Chair Movement includes a standing path inspired by the 30-second chair-stand construct. MotionQuest can count visible sit-to-stand practice cycles when enough of the body is in frame, but it reports a session practice signal, not an official clinical score.

Do not say:

- "MotionQuest measures lower-body strength."
- "MotionQuest performs the 30-second chair-stand test."
- "MotionQuest produces a Senior Fitness Test score."
- "MotionQuest can predict fall risk from chair stand."

## T036 Reach Stars Evidence Language

Approved wording:

> Reach Stars is a visible hand-to-target activity inspired by exergame feedback and upper-body reach practice. It records target interactions and dwell-based hits as an engagement and reach-practice proxy, not a formal range-of-motion or balance assessment.

Do not say:

- "MotionQuest measures range of motion."
- "Reach Stars evaluates balance."
- "Reach Stars clinically assesses upper-limb function."
- "A hit count proves mobility improvement."

## T037 Judge-Facing Evidence Summary Under One Minute

> MotionQuest is research-aligned, not clinically validated. The standing branch is inspired by chair-stand functional movement research. The seated branch is grounded in the idea that chair-based activity is legitimate and should not be treated as failure. Reach Stars uses simple exergame-style feedback for visible hand-to-target practice. The camera layer is deliberately honest: it reports source, mode, confidence and limitations, and it never turns a single webcam session into diagnosis, fall-risk prediction or a clinical score. That evidence discipline is what makes the project stronger than a toy camera game.

## T038 Longer Evidence Appendix For Book / Research Reviewers

MotionQuest sits between older-adult exergame research, functional movement constructs, chair-based activity, remote wellness acceptance and camera-based landmark observation.

The product does not claim to validate a new clinical instrument. Instead, it translates known constructs into a safe, public, low-friction practice artifact:

- Chair-stand research gives the standing branch a recognizable functional movement anchor.
- Exergame research supports using feedback, targets and short challenges for engagement.
- Chair-based exercise literature supports seated movement as meaningful physical activity.
- Pose landmark documentation explains why visibility and confidence thresholds matter.
- Older-adult technology adoption research supports reducing friction and making usefulness/usability visible.
- Dignity/privacy research supports making camera boundaries explicit before use.

The key design move is not "webcam equals measurement." The key design move is:

> Webcam observation plus confidence boundaries plus caregiver-readable reporting can make a short home activity session understandable without medical overclaiming.

Book/research angle:

- MotionQuest can be discussed as a case study in evidence translation.
- The interesting question is not whether a hackathon product is clinically validated.
- The interesting question is whether inclusive, non-medical, confidence-aware movement records can help people normally excluded by standing-first fitness products.

## T039 Evidence Freshness Cycle

| Moment | What to recheck | Required action |
|---|---|---|
| Before Devpost final submission | Contest rules, public URL, source package URL, bibliography URLs, forbidden claim scan. | Update release evidence and remove stale wording. |
| Before presentation rehearsal | Evidence summary, Q&A sheet, fallback proof labels, confidence language. | Confirm presenter can explain boundaries in under one minute. |
| After contest | New user/caregiver feedback, tracking failure cases, source updates. | Separate product findings from research claims. |
| Before public article/book chapter | DOI availability, newer systematic reviews, pose-estimation literature, dignity/privacy literature. | Refresh evidence appendix and cite exact sources. |
| Before any product commercialization | Privacy promise, data handling, caregiver value, non-medical category, user consent expectations. | Reassess claim boundaries and legal/commercial framing. |

Fast-stale items:

- Official contest requirements.
- Public deployment and source links.
- Browser camera behavior.
- MediaPipe / pose-landmark documentation.
- Current literature on older-adult fitness technology and privacy.
- Any numeric performance claim.

## T040 Phase 2 Acceptance Note

Phase 2 T022-T040 acceptance result:

- Every public research claim now has a source, product proof label or inference label.
- Evidence surface exists and is ready for app/submission copy use.
- Dignity/privacy source note is grounded in older-adult technology literature.
- Movement Passport is clearly future, non-medical and outside first-release scope.
- Confidence-by-mode defines what can and cannot be observed.
- Numeric landmark-loss claims are banned unless sourced or measured.
- Chair Stand language is practice-oriented, not clinical.
- Reach Stars language is upper-body engagement/reach-practice proxy, not formal range measurement.
- Judge-facing and long-form evidence summaries are ready.
- Evidence freshness cycle is defined for submission, presentation and post-contest continuation.

Phase 2 can continue to the anchor review only after verification confirms no open markers and app checks still pass.
