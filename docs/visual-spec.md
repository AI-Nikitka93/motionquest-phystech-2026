# MotionQuest Visual Spec

Research date: 2026-05-04, Europe/Minsk  
Mode: VISUAL DIRECTION + VISUAL HANDOFF  
Product: MotionQuest, adaptive home movement lab for older adults and seated/standing users
Source of truth: `docs/mvp-plan.md`, WCAG contrast and target-size guidance, current visual scouting
Design handoff contract: `DESIGN.md` is the root Stitch-ready visual contract for future AI design and frontend work.

## 1. Visual Direction Summary

MotionQuest should feel like a warm, trustworthy movement lab, not a medical dashboard or toy camera game. The visual language is "warm kinetic trust": large readable typography, high contrast, calm surfaces, clear action buttons, and a camera stage that makes the movement feel immediate, inclusive, and explainable.

The interface must be usable by people 65+ without hidden menus, tiny icons, low-contrast labels, or fast-changing visual clutter. The product should still feel modern through confident spacing, game-like feedback, large live counters, task-relevant tracking overlays, and a caregiver-readable report that feels like the primary outcome.

## 2. Inspiration Board

EVIDENCE:
- WCAG contrast guidance supports 7:1 contrast for enhanced normal text and 4.5:1 as the minimum AA baseline for normal text. MotionQuest uses AAA-level pairs for primary text and buttons where practical.
- WCAG target-size guidance supports large pointer targets; MotionQuest exceeds the common 44-48px target by using 56-64px primary controls.
- Older-adult accessibility guidance consistently points toward larger text, clear interaction states, reduced cognitive load, and visible controls rather than hidden gestures.
- Webcam fitness and landmark-tracking interfaces work best when the camera is the central stage and the UI overlay is sparse: live timer, large counter, task-relevant points, and immediate success feedback.

INFERENCE:
- For this MVP, the strongest visual wedge is not a dense dashboard. It is a camera-first stage with very few, very large controls and a report screen that translates movement into caregiver-readable outcomes.
- A sterile blue/white medical palette would weaken the exergame framing. A warm cream background, deep teal action color, amber targets, and mint success feedback create trust without feeling clinical.

References used:
- W3C WCAG contrast requirements: https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html
- W3C WCAG target size: https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html
- W3C older users accessibility overview: https://www.w3.org/WAI/older-users/
- Google MediaPipe Pose Landmarker web guidance: https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker/web_js

## 3. Design Language

### Mood / Tone

- Warm, active, encouraging.
- Game-like but not childish.
- Trustworthy but not clinical.
- High-contrast and low-cognitive-load.
- Calm by default, expressive only during feedback moments.

### Palette

| Token | HEX | Usage | Text Pair |
|---|---:|---|---|
| `background.warm` | `#FFF8E7` | App background, non-camera screens | `#10231F` |
| `surface.card` | `#FFFFFF` | Report panels, calibration checklist | `#10231F` |
| `text.primary` | `#10231F` | Main text | On warm/surface |
| `text.muted` | `#394B45` | Secondary helper text | On warm/surface only |
| `primary.action` | `#075E54` | Primary buttons, active state | White text |
| `primary.hover` | `#064C45` | Hover/pressed primary | White text |
| `secondary.target` | `#F6C85F` | Stars, secondary action, progress accent | Dark text |
| `success.tint` | `#D8F3DC` | Success panels and calm success state | Dark text |
| `success.solid` | `#075E2B` | Success badge if white text is required | White text |
| `warning.tint` | `#FFE8A3` | Camera warning, posture prompt | Dark text |
| `error.solid` | `#8A1C1C` | Camera denied / model failed | White text |
| `camera.scrim` | `rgba(7, 27, 23, 0.58)` | Text legibility over video | White text |
| `overlay.skeleton` | `#7CF7D4` | Pose lines | Halo required |
| `overlay.point` | `#FFE66D` | Key joints / reach targets | Dark outline |

Do not use light gray text on white. Do not put normal text directly on raw camera video without a scrim or solid label.

### Contrast Verification

| Pair | Ratio | Verdict |
|---|---:|---|
| `#10231F` on `#FFF8E7` | 15.47:1 | AAA |
| `#FFFFFF` on `#075E54` | 7.67:1 | AAA |
| `#394B45` on `#FFF8E7` | 8.75:1 | AAA |
| `#10231F` on `#D8F3DC` | 13.86:1 | AAA |
| `#FFFFFF` on `#075E2B` | 7.94:1 | AAA |
| `#10231F` on `#F6C85F` | 10.41:1 | AAA |
| `#10231F` on `#FFE66D` | 13.10:1 | AAA |
| `#10231F` on `#FFE8A3` | 13.51:1 | AAA |
| `#FFFFFF` on `#8A1C1C` | 9.28:1 | AAA |
| `#FFFFFF` on `#071B17` scrim | 17.82:1 | AAA |

### Typography

Primary font: `Inter`  
High-legibility fallback: `Atkinson Hyperlegible`  
System fallback: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Rules:
- Minimum text: `1rem / 16px`, only for legal/disclaimer text.
- Default body: `1.25rem / 20px`, line-height `1.55`.
- Helper text: `1.125rem / 18px`, line-height `1.45`.
- Button text: `1.25rem / 20px`, weight `700`.
- Screen title: `2rem / 32px`, line-height `1.2`, weight `750`.
- Game counter: `5rem-6rem / 80-96px`, line-height `1`, weight `800`.
- Timer: `3rem-4rem / 48-64px`, line-height `1`, tabular numbers.
- Report metric value: `3rem / 48px`, weight `800`.

No viewport-width font scaling. Use responsive steps, not `vw` type.

### Spacing, Shape, Elevation

Base spacing unit: `0.5rem / 8px`.

Recommended scale:
- Page padding mobile: `1rem / 16px`.
- Page padding desktop: `2rem / 32px`.
- Panel padding: `1.5rem-2rem / 24-32px`.
- Section gap: `1.5rem / 24px`.
- Game HUD gap: `1rem / 16px`.
- Button gap: `1rem / 16px`.

Shape:
- Cards / panels: `0.5rem / 8px`.
- Buttons: `0.75rem / 12px`.
- Camera frame: `1rem / 16px`, but avoid decorative card nesting.
- Pills / badges: `999px`, only for status chips and short labels.

Elevation:
- Use subtle shadow only for panels over camera: `0 12px 32px rgba(7, 27, 23, 0.18)`.
- Avoid glassmorphism and blur-heavy cards. They reduce readability over video.

### Controls and States

Buttons:
- Minimum size: `56px` height, `56px` width.
- Primary game action: `64px` height.
- Padding: `20px 28px`.
- Large visible label, optional single icon, never icon-only for critical actions.
- Focus: `4px` amber ring `#F6C85F` plus `2px` dark offset/outline.
- Disabled: keep text readable; do not use low-contrast grey. Use muted surface plus explanatory label.

States:
- Success: green/mint pulse, counted-rep chip, counter bounce capped at `scale(1.04)`.
- Warning: amber prompt with explicit instruction, e.g. "Step back so knees are visible."
- Error: deep red only for camera permission/model failure.
- Reduced motion: replace pulse/bounce with static high-contrast success panel.

## 4. Screen Set

### Screen 1: Home / Camera Setup

Purpose: Let the participant choose a safe standing or seated path, then understand what the camera must see for that path. This screen reduces demo risk and makes the webcam observation boundary credible.

Composition:
- Warm full-screen background.
- Header: MotionQuest title and one-line promise: "Webcam movement practice with a clear caregiver report."
- Central camera preview, max width `960px`, aspect ratio `4:3` or `16:9` depending on webcam.
- Overlay silhouette guide: soft teal outline with high-contrast frame boundary.
- Right side on desktop / below camera on mobile: checklist panel.
- Checklist items:
  - Seated/reach path: one open hand visible.
  - Standing path: shoulders, hips and knees visible.
  - Enough light.
  - Comfortable movement range.
- Primary buttons: "Seated adaptive" and "I can stand safely", `56-64px` high.
- Secondary button: "Safe demo", visible and explicitly labeled for presentation fallback.

Visual rules:
- The instruction must be the largest text after the title: "Choose the safest movement path, then keep the required hand or body signals visible."
- If tracking confidence is low, show an amber panel over the camera bottom with the specific missing signal: hand, shoulders, hips, knees, lighting, or camera startup.
- No hidden hamburger menu.

### Screen 2: Adaptive Chair Movement

Purpose: Demonstrate a 30-second adaptive movement practice branch with immediate visual feedback: chair-stand-style practice when standing is safe, or seated hand movement when standing is not the right path.

Composition:
- Camera is the main stage and takes most of the viewport.
- Top-left HUD: timer, huge `30`, then counts down.
- Top-right HUD: tracking status chip: "Tracking" / "Need hand" / "Move into frame".
- Bottom-left HUD: repetition counter, huge number, label "stands".
- Bottom-right: pause/finish control, always visible, `56px+`.
- Standing branch overlay centers on the participant's task-relevant body frame.
- Seated branch overlay draws only task-relevant hand points.
- Short instruction banner before start: "Choose standing only if safe; seated mode counts visible hand raises."

Feedback:
- On counted rep:
  - counter briefly scales to `1.04`;
  - screen edge emits mint pulse for `280ms`;
  - skeleton line flashes from teal to success green;
  - chip says "Rep counted".
- On uncertain rep:
  - amber chip names the missing signal, e.g. "Raise one open hand" or "Keep hips and knees visible";
  - do not subtract points or show failure tone.

Cut for clarity:
- Do not display raw joint angles during the live game.
- Do not show charts during movement.
- Do not draw all landmarks.

### Screen 3: Reach Stars

Purpose: Make upper-body reach measurable and game-like without becoming childish.

Composition:
- Camera remains central.
- Top center: score, e.g. "8 stars".
- Top right: tracking confidence.
- Stars appear in large target zones left/right/up, not at extreme edges.
- Each target is at least `96px`, preferred `112-128px` on desktop.
- Active target uses amber fill `#F6C85F`, dark outline, and a simple star shape.
- Hand point is highlighted only when Reach Stars is active.

Feedback:
- Hit:
  - star pops into mint success ring;
  - score increments with one clear animation;
  - short text chip: "Nice reach".
- Miss / low confidence:
  - target remains visible longer;
  - amber prompt: "Reach toward the yellow star";
  - no fast flashing or punishment.

Accessibility:
- Targets must never rely on color alone. Use shape, position, label, and motion.
- Avoid dense background effects behind the camera.

### Screen 4: Caregiver Report

Purpose: Translate the game session into a caregiver-readable summary without pretending to be a diagnosis.

Composition:
- Warm background, no camera required.
- Header: "Caregiver Report".
- Three metric panels:
  - Adaptive Movement: standing reps or seated hand reps in 30 seconds.
  - Reach Stars: hits and reachable zones.
  - Tracking Confidence: percentage or simple "High / Medium / Low".
- Plain-language insight block:
  - "Participant completed the session with steady tracking."
  - "Use this as a session note, not a medical diagnosis."
- CTA row:
  - Primary: "Run again".
  - Secondary: "Export summary" or "Copy report" only if feasible in client-only MVP.

Visual rules:
- Metric values use `48px+`.
- Disclaimer can be `16-18px`, but must keep AAA contrast.
- Avoid clinical table overload. Use 3 clear panels, not a full analytics dashboard.

## 5. Camera Overlay Aesthetics

Do not render MediaPipe as a raw developer skeleton. The user should see a friendly movement guide, not a diagnostic rig. Draw only what the selected activity can honestly observe.

Landmarks to draw:
- Chair Stand:
  - shoulders `11/12`;
  - hips `23/24`;
  - knees `25/26`;
  - ankles `27/28`.
- Seated Adaptive:
  - visible hand point from Hand Landmarker / merged wrist signal only;
  - no hip, knee or lower-body overlay.
- Reach Stars:
  - visible hand point from Hand Landmarker / merged wrist signal only;
  - large target zone and dwell feedback.

Landmarks not drawn by default:
- Face mesh / all facial points.
- Fingers / all 33 pose landmarks.
- Small intermediate points that add noise without helping the task.
- Lower-body landmarks in seated/reach paths.

Line style:
- Stroke: `8px` desktop, `6px` mobile.
- Color: `#7CF7D4` at `0.80` opacity.
- Caps and joins: round.
- Add `2px` white halo or shadow so lines remain visible on dark clothing.

Point style:
- Key points: `14-18px` circles.
- Fill: `#FFE66D`.
- Outline: `3px #10231F` or white halo depending on camera background.
- Wrist point during Reach Stars can be slightly larger: `20px`.

Tracking states:
- High confidence: teal lines stable.
- Medium confidence: amber lines and instruction chip.
- Low confidence: fade skeleton, show one large instruction: "Step into the frame."

## 6. Tailwind-Ready Token Notes

Example class mapping:
- App background: `bg-[#FFF8E7] text-[#10231F]`.
- Primary button: `bg-[#075E54] text-white hover:bg-[#064C45] min-h-14 px-7 text-xl font-bold rounded-xl`.
- Focus: `focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]`.
- Success panel: `bg-[#D8F3DC] text-[#10231F]`.
- Error panel: `bg-[#8A1C1C] text-white`.
- Camera label: `bg-[#071B17]/[0.82] text-white`.

Implementation guardrails:
- Do not use text smaller than `text-base`.
- Prefer `text-xl` for normal instructions.
- Use `tabular-nums` for timer and counters.
- Keep camera HUD labels on solid/scrimmed backgrounds.

## 7. Visual Acceptance Criteria

- Four screens are visually specified: Calibration/Home, Chair Stand, Reach Stars, Caregiver Report.
- Normal text/background pairs meet AAA contrast where specified.
- Critical buttons are at least `56px` high, exceeding the 48px requirement.
- Camera overlay is limited to task-relevant landmarks.
- Success, warning, error, focus, disabled and low-confidence states are visually defined.
- The interface has no hidden critical navigation.
- The style avoids sterile hospital blue/white and generic SaaS glass-card aesthetics.
- The spec can be translated directly into Tailwind tokens and component rules.

## 8. Known Visual Risks

- Webcam lighting can destroy overlay contrast. Use skeleton halos, dark camera scrims behind labels, and high-contrast target outlines.
- Busy backgrounds can make yellow stars and teal skeleton lines harder to see. Keep targets large and outlined.
- Color-only feedback is not enough. Pair success/warning/error with text and shape.
- Too many pose points will look technical and intimidating. Draw only the joints needed for the current mini-game.
- Motion feedback can overwhelm older users. Keep animations short and support reduced-motion mode.
