---
version: alpha
name: MotionQuest
description: Dignity-first adaptive home movement lab for older adults and seated or standing users.
colors:
  primary: "#075E54"
  primary-hover: "#064C45"
  text-primary: "#10231F"
  text-muted: "#394B45"
  background-warm: "#FFF8E7"
  surface-card: "#FFFFFF"
  surface-lab: "#071B17"
  surface-lab-panel: "#10231F"
  target-amber: "#F6C85F"
  success-tint: "#D8F3DC"
  warning-tint: "#FFE8A3"
  error-solid: "#8A1C1C"
  overlay-skeleton: "#7CF7D4"
  overlay-point: "#FFE66D"
typography:
  display:
    fontFamily: Inter, Atkinson Hyperlegible, system-ui, sans-serif
    fontSize: 3rem
    fontWeight: 900
    lineHeight: 1.08
    letterSpacing: 0
  screen-title:
    fontFamily: Inter, Atkinson Hyperlegible, system-ui, sans-serif
    fontSize: 2rem
    fontWeight: 850
    lineHeight: 1.2
    letterSpacing: 0
  section-title:
    fontFamily: Inter, Atkinson Hyperlegible, system-ui, sans-serif
    fontSize: 1.5rem
    fontWeight: 850
    lineHeight: 1.2
    letterSpacing: 0
  body:
    fontFamily: Inter, Atkinson Hyperlegible, system-ui, sans-serif
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: 0
  helper:
    fontFamily: Inter, Atkinson Hyperlegible, system-ui, sans-serif
    fontSize: 1.125rem
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: 0
  label:
    fontFamily: Inter, Atkinson Hyperlegible, system-ui, sans-serif
    fontSize: 1rem
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: 0
  metric:
    fontFamily: Inter, Atkinson Hyperlegible, system-ui, sans-serif
    fontSize: 4rem
    fontWeight: 900
    lineHeight: 1
    letterSpacing: 0
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  pill: 999px
spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    padding: 20px 28px
    height: 64px
    typography: "{typography.body}"
  button-secondary:
    backgroundColor: "{colors.target-amber}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: 20px 28px
    height: 64px
    typography: "{typography.body}"
  card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: 24px
  warning-card:
    backgroundColor: "{colors.warning-tint}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: 16px
  success-card:
    backgroundColor: "{colors.success-tint}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: 16px
  camera-stage:
    backgroundColor: "{colors.surface-lab}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.lg}"
    padding: 0
---

## Overview

MotionQuest must feel like a warm adaptive movement lab, not a hospital dashboard, arcade toy or generic SaaS panel. The product promise is dignity-first movement practice: a browser webcam checks whether a short activity is observable, then produces a caregiver-readable report with limits and confidence.

The visual language is warm kinetic trust. It combines cream surfaces, deep teal action areas, amber targets, mint success feedback, thick readable type, and a dark camera stage that feels like an instrument panel. It should be confident enough for judges, calm enough for older adults, and honest enough for caregivers.

## Colors

- Primary teal `#075E54` is the main action color. Use it for primary decisions, camera-ready states and report confidence borders.
- Warm background `#FFF8E7` makes the product feel domestic and non-clinical. It must not be replaced with sterile white/blue medical styling.
- Dark lab surface `#071B17` belongs only to camera and measurement areas. It creates contrast and makes the live stage feel intentional.
- Amber `#F6C85F` is for targets, judge timing and visible attention. It must communicate "look here", not warning unless paired with `#FFE8A3`.
- Mint `#D8F3DC` is for calm success, valid state and report reassurance.
- Error red `#8A1C1C` is reserved for camera permission, model load and hard failure states.

All text/background pairs used for normal text should target WCAG AAA where practical. Interactive text must not be placed directly on raw camera footage without a dark scrim or solid panel.

## Typography

Use Inter first, Atkinson Hyperlegible as the accessibility reference, then system sans-serif fallback. Keep letter spacing at zero. Do not use viewport-width type.

Minimum visible text is 16px. Default body copy should sit at 20px with generous line height. Labels are allowed at 16px only when they are uppercase metadata, never when they carry an instruction. Game counters use tabular numerals and should be visually dominant only after the user knows what action to perform.

## Layout

The camera stage is the product center, but it must not drown the instructions. The hierarchy inside movement screens is:

1. Current stage and readiness verdict.
2. Human instruction: what to do now.
3. Timer and count.
4. Decorative or diagnostic overlay.
5. Secondary evidence and smoke-test controls.

Home should read as a guided judge path: problem, method, privacy, live camera route, safe demo route, and report proof. Report should read like a useful artifact, not a stats dump.

## Elevation & Depth

Use one soft shadow family for cards and camera panels: `0 12px 32px rgba(7, 27, 23, 0.18)`. Do not use glassmorphism, blur-heavy cards, floating gradient blobs, nested card piles or decorative depth that reduces readability.

## Shapes

Cards use 8px radius. Buttons use 12px radius. The camera frame can use 16px radius because it is a framed measurement surface. Status pills can be fully rounded, but only for short state labels.

## Components

Primary buttons are at least 56px tall and preferably 64px for flow-changing actions. Critical actions must have text labels, not icon-only controls. Focus states require a high-contrast visible ring. Disabled or limited states must remain readable and explain why the action is limited.

Camera overlays use only the minimum necessary hand/body signal. Seated and reach modes should not draw fake full-body limbs. If tracking is not usable, the UI should show a plain instruction instead of a decorative skeleton.

Report cards must separate observed activity, confidence, limitations, interpretation, next session suggestion and export. A sample report must carry a persistent yellow banner that cannot be confused with live data.

## Do's and Don'ts

Do:

- Keep seated users first-class, not fallback users.
- Show privacy and dignity as visible product objects, not hidden legal text.
- Use motion sparingly: counted success pulse, target confirmation, focus ring.
- Prefer human-readable evidence and limitations over raw technical data.
- Preserve a consistent warm-lab feel across home, camera and report.

Do not:

- Use medical-blue styling, hospital iconography or clinical diagnosis language.
- Make the app look like a casual toy game with points as the main outcome.
- Hide critical controls behind menus, gestures or small icon buttons.
- Let overlays cover stage labels, timer chips or what-counts instructions.
- Copy external reference UI, screenshots, imagery, text, logos or brand systems.

## Screen Inventory

- Home and calibration: explains problem, method, privacy, seated inclusion and safe demo route.
- Adaptive Chair Movement: shows the selected standing or seated branch, what counts, timer, count and valid/paused state.
- Reach Stars: shows one visible hand requirement, target, dwell instruction, hit count and finish route.
- Caregiver Report: shows observed activity, confidence, limits, interpretation, next safe step, export and disclaimer.
- Degraded states: no camera, permission denied, model loading failure, weak tracking, sample fallback and not-valid-enough report.

## Accessibility

MotionQuest is designed for older adults and mobility-diverse users. The product requires large targets, clear labels, visible focus, non-color-only states, stable layout and readable copy. Nothing critical should rely on small text, rapid animation, precise cursor movement or hidden gestures.

## Motion

Default motion should be restrained. Counted actions can trigger a short mint pulse and small counter scale, but reduced-motion mode must remove animation while keeping the flow fully usable.

## Asset Guidance

Use graphic assets only when they improve trust or comprehension. Any future generated icon or illustration must go through reference selection, single-asset generation, manual curation, rejection of anatomy/medical-symbol artifacts, consistency review and provenance logging before it enters the product.

### Icon System

All MotionQuest interface icons use one metaphor family: privacy shield, camera, evidence note, caregiver pair, report page, asset frame and warning triangle. Icons must be large enough to read at 56px containers, use a consistent 2.4px rounded stroke, avoid filled decorative detail, and sit on deep teal with white stroke unless a warning state requires amber context.

### AI Visual Rejection Rules

Reject any generated or external visual that shows distorted anatomy, fake clinical authority, hospital symbolism, unreadable mini-icons, inconsistent stroke weight, cheap generic gradients, copied product screenshots, unclear usage rights or a style that makes seated users look secondary.

### Provenance Rules

Every non-original reference or generated asset must keep its source, usage note, generation date if generated, reviewer decision and final status. Reference material may guide composition and quality bar, but MotionQuest must not copy external layout, text, logos, images or brand systems.

### Before/After Presentation Frame

The presentation slide should contrast "Prototype risk" against "Inclusive movement lab": left side shows standing-first camera overlay and score-first thinking; right side shows seated-first path, visible dignity/privacy promise, confidence layer and caregiver-readable report outcome.
