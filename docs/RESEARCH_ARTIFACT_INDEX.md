# MotionQuest Research Artifact Index

Date: 2026-05-05  
Purpose: let judges trace public MotionQuest claims to real sources and safe claim boundaries.

## Public Claim Trace

| Claim in product | Evidence source | Artifact to cite | Boundary |
|---|---|---|---|
| MotionQuest is research-aligned. | Older-adult AI exercise review; exergame reviews/RCTs. | `docs/RESEARCH_EVIDENCE_TRACE_T022_T030.md` | Do not say clinically validated. |
| Webcam feedback is a plausible prototype mechanism. | AI exercise review plus current MediaPipe implementation. | `docs/RESEARCH_EVIDENCE_TRACE_T022_T030.md`; `motionquest-app/src/hooks/usePoseTracking.ts` | Do not say medically accurate. |
| Chair Stand is inspired by functional movement research. | Games for Health Journal RCT / PubMed PMID 37585611. | `docs/EVIDENCE_PANEL_CONTENT.md`; `docs/PHASE2_T031_T040_RESULTS.md` | Do not report official clinical score. |
| Reach Stars is an engagement and reach-practice proxy. | Exergame usability/design literature and MotionQuest implementation. | `docs/CAREGIVER_INTERPRETATION_COPY.md`; `docs/PHASE2_T031_T040_RESULTS.md` | Do not call it a range-of-motion assessment. |
| MotionQuest measures session-level signals. | Current app logic and research-layer copy. | `docs/RESEARCH_LAYER_PUBLIC_COPY.md`; `motionquest-app/src/lib/sessionStorage.ts` | Do not claim long-term health outcomes. |
| MotionQuest supports Social Impact through access. | Contest fit plus product architecture: no wearable, no account, browser URL. | `docs/PHASE2_T022_T030_RESULTS.md`; `docs/SUBMISSION_PACKAGE_PLAN.md` | Mark as product logic, not trial evidence. |

## Source Files

| Artifact | Role |
|---|---|
| `research-synthesis-MotionQuest.md` | Full scholarly synthesis. |
| `docs/RESEARCH_EVIDENCE_TRACE_T022_T030.md` | Source-to-claim trace. |
| `docs/RESEARCH_LAYER_PUBLIC_COPY.md` | App/README copy. |
| `docs/EVIDENCE_PANEL_CONTENT.md` | Home/Method evidence panel and citation cards. |
| `docs/CAREGIVER_INTERPRETATION_COPY.md` | Report interpretation language. |
| `docs/RESEARCH_OVERCLAIM_AUDIT.md` | Safe wording and banned wording. |
| `docs/JUDGING_CLAIMS_AND_LIMITS.md` | Judging claims and forbidden claims. |

## External Source URLs

- https://link.springer.com/article/10.1186/s12877-026-07544-1
- https://link.springer.com/article/10.1186/s12877-026-07471-1
- https://www.nature.com/articles/s41591-023-02739-0
- https://journals.sagepub.com/doi/10.1089/g4h.2022.0194
- https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0306816
- https://www.sciencedirect.com/science/article/pii/S0003687022000138

## Public Copy Rule

Every public research statement must use one of these labels:
- evidence-inspired;
- research-aligned;
- webcam-estimated;
- session observation;
- caregiver-readable.

Every public research statement must avoid:
- diagnosis;
- fall prediction;
- clinical validation;
- official clinical score;
- medical-grade accuracy.
