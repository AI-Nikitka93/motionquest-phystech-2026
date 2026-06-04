# Research Evidence Trace — T022-T030

Date: 2026-05-05  
Use with: `docs/PHASE2_T022_T030_RESULTS.md`, `docs/RESEARCH_LAYER_PUBLIC_COPY.md`

## Verified Source Trace

| Source | Verified URL | Supports | Safe product use |
|---|---|---|---|
| Ye et al. (2026), BMC Geriatrics, AI exercise and healthy ageing scoping review | https://link.springer.com/article/10.1186/s12877-026-07544-1 | AI exercise tools for older adults; sensing/tracking, real-time feedback and personalization; motivation and physical-function signals with limitations. | Use to justify webcam feedback and conservative research-aligned positioning. |
| 2026 BMC Geriatrics exergame balance meta-analysis | https://link.springer.com/article/10.1186/s12877-026-07471-1 | Exergame training and balance-related outcomes in older-adult care settings. | Use to justify exergame mechanics as serious movement practice, not decorative play. |
| Sturnieks et al. (2024), Nature Medicine RCT | https://www.nature.com/articles/s41591-023-02739-0 | Step exergame training in community-dwelling older adults and fall-related outcome research. | Use only as broader impact context; do not claim MotionQuest prevents falls. |
| Guede-Rojas et al. (2023), Games for Health Journal RCT | https://journals.sagepub.com/doi/10.1089/g4h.2022.0194 | 30-second chair stand, functional physical performance and exergames in older adults. | Use to justify Chair Stand as inspired-by functional practice, not clinical scoring. |
| PLOS ONE (2024), home-based exergame usability review | https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0306816 | Home-based exergames, usability, immediate feedback, engagement, challenge and balance-training design primitives. | Use to justify large accessible UI, feedback and simple target mechanics. |
| Hou & Li (2022), Applied Ergonomics RCT | https://www.sciencedirect.com/science/article/pii/S0003687022000138 | Exergame/video game training and cognitive/physical function in older adults. | Use to justify combining movement with simple target/reaction tasks. |

## Claim-To-Source Map

| Public claim | Backing sources | Boundary |
|---|---|---|
| MotionQuest is research-aligned. | Ye et al.; BMC exergame meta-analysis; Guede-Rojas et al.; PLOS ONE review. | Do not say clinically validated. |
| Webcam feedback is a plausible prototype mechanism. | Ye et al. AI scoping review; implemented MediaPipe prototype. | Do not say medically accurate. |
| Chair Stand is inspired by functional-performance research. | Guede-Rojas et al.; Senior Fitness Test references in synthesis. | Do not report official clinical score. |
| Reach Stars is an engagement/reach-practice proxy. | PLOS ONE review; exergame design primitives; functional reach inference. | Do not call it a medical range-of-motion assessment. |
| Immediate feedback and challenge support exergame design. | PLOS ONE review; physical literacy RCT from synthesis. | Do not claim long-term improvement from one session. |
| Social impact comes from no wearable hardware, browser access and readable reports. | Contest fit + MotionQuest implementation facts + research motivation. | Mark as product inference, not trial evidence. |

## Evidence / Inference / Hypothesis Split

Evidence:
- The cited literature exists and supports exergame / AI-exercise research relevance for older adults.
- The current MotionQuest app exists at `https://motionquest-app.vercel.app`.
- The current app is client-only and uses browser webcam pose tracking.

Inference:
- Chair Stand and Reach Stars are credible simplified practice proxies when labeled honestly.
- Browser access and no wearable hardware can reduce friction for a hackathon prototype.

Hypothesis:
- Judges will value the project more when the public app visibly connects movement mechanics to research and caregiver-readable outcomes.
- Older adults/caregivers will find the report useful after real-user testing.
