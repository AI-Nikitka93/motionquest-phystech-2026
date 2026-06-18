export type MotionQuestIcon =
  | "privacy"
  | "camera"
  | "evidence"
  | "caregiver"
  | "asset"
  | "warning"
  | "report";

export const dignityPrivacyItems: {
  icon: MotionQuestIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: "camera",
    title: "Camera only during the session",
    body: "MotionQuest asks for the camera when the participant starts camera setup or a movement activity.",
  },
  {
    icon: "privacy",
    title: "Video is not saved",
    body: "The report stores movement counts, confidence and limitations. It does not store raw webcam footage.",
  },
  {
    icon: "caregiver",
    title: "Participant controls the data",
    body: "The report can be copied, downloaded or cleared by starting over. There is no account, backend or hidden upload.",
  },
];

export const evidenceCards: {
  icon: MotionQuestIcon;
  label: string;
  title: string;
  body: string;
  source: string;
  href: string;
}[] = [
  {
    icon: "evidence",
    label: "Functional movement",
    title: "Practice tasks have a traceable basis",
    body: "Chair-style movement and reach tasks are presented as practice observations, not as diagnostic scores.",
    source: "APTA 30-Second Chair Stand Test",
    href: "https://www.apta.org/patient-care/evidence-based-practice-resources/test-measures/30-second-chair-stand-test",
  },
  {
    icon: "camera",
    label: "Browser pose limits",
    title: "Confidence is visible to the user",
    body: "MotionQuest separates seated and standing modes because camera landmarks can disappear when the lower body is occluded.",
    source: "MediaPipe Pose Landmarker web guidance",
    href: "https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker/web_js",
  },
  {
    icon: "privacy",
    label: "Dignity and privacy",
    title: "Trust is part of the interface",
    body: "The welcome layer states camera use, video retention and user control before the participant starts movement.",
    source: "W3C older-user accessibility guidance",
    href: "https://www.w3.org/WAI/older-users/",
  },
];

export const visualAssetStandards: {
  icon: MotionQuestIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: "asset",
    title: "One asset at a time",
    body: "Generate or select each icon, illustration or slide image individually, then reject anything that breaks anatomy, readability or style.",
  },
  {
    icon: "warning",
    title: "Reject fake medical cues",
    body: "Do not use hospital symbols, distorted bodies, cheap gradients, unreadable mini-icons or inconsistent stroke weights.",
  },
  {
    icon: "evidence",
    title: "Keep provenance visible",
    body: "Every non-original visual reference must keep its source and usage note so MotionQuest uses references without copying assets.",
  },
];

export const beforeAfterSlide = {
  leftTitle: "Prototype risk",
  leftBody:
    "Camera overlay, standing-first mental model, score-first result and unclear trust boundary.",
  rightTitle: "Inclusive movement lab",
  rightBody:
    "Seated-first option, visible privacy promise, confidence layer and caregiver-readable report as the outcome.",
};

export const phaseFourAcceptanceItems = [
  "Dignity and privacy are visible before camera use.",
  "Evidence cards are credible without turning the app into an academic paper.",
  "The report looks like a shareable caregiver artifact, not a scoreboard.",
  "Icons and visual assets follow one large-readable, dignity-first system.",
  "Camera-stage hierarchy tells the participant what to do before decorative overlay details.",
];

export const phaseFiveStateMatrix = [
  {
    screen: "Home calibration",
    normal: "Camera setup explains the chosen movement path before live access.",
    degraded: "No camera and permission issues show recovery guidance.",
    fallback: "Safe demo data remains labeled and opens the report artifact.",
  },
  {
    screen: "Adaptive movement",
    normal: "Standing or seated branch counts only observable movement.",
    degraded: "Timer pauses when tracking is not valid enough.",
    fallback: "Participant can finish and get a report that names tracking limits.",
  },
  {
    screen: "Reach Stars",
    normal: "One visible hand can hit large targets after a steady dwell.",
    degraded: "Partial visibility names the missing hand signal.",
    fallback: "Report stores low-confidence limits instead of hiding weak evidence.",
  },
  {
    screen: "Caregiver report",
    normal: "Live session note explains counts, confidence and next step.",
    degraded: "Limited sessions say when counts may be incomplete.",
    fallback: "Sample sessions keep a persistent yellow banner.",
  },
];

export const phaseSixTrustContracts = [
  {
    mode: "Seated hand",
    confidence: "Medium or high when one or two real hands are visible.",
    counts: "Counts only comfortable visible hand raise/lower movement.",
    boundary: "No lower-body, chair-stand or clinical strength claim is made.",
  },
  {
    mode: "Seated limited",
    confidence: "Limited when a hand is intermittent, too close to the lens or lighting is poor.",
    counts: "Numbers stay visible for transparency, but the report says they may be incomplete.",
    boundary: "The product weakens the claim instead of calling the session successful.",
  },
  {
    mode: "Standing body",
    confidence: "Usable only when shoulders, hips and knees form a plausible body frame.",
    counts: "Counts chair-stand-style practice cycles, not a clinical Senior Fitness Test score.",
    boundary: "Timer and scoring pause if body visibility is not valid enough.",
  },
  {
    mode: "Weak camera",
    confidence: "Low when the camera cannot observe the selected movement reliably.",
    counts: "Result cards remain labeled as setup feedback, not success.",
    boundary: "The report asks for repeat setup before using the numbers.",
  },
  {
    mode: "Fallback sample",
    confidence: "Labeled demo data when live camera conditions are unavailable.",
    counts: "Demonstrates report format only.",
    boundary: "Never presented as live measurement or an official record.",
  },
];

export const phaseSixSafetyPrivacyItems = [
  {
    title: "Safety first",
    body: "Choose seated mode if standing is unsafe. Stop the session if movement feels uncomfortable, rushed or unstable.",
  },
  {
    title: "Camera control",
    body: "The camera is used only during the browser session. MotionQuest stores report values, not raw video.",
  },
  {
    title: "Dignity by design",
    body: "Seated participation is a first-class path. Adaptation is treated as valid participation, not a lesser status.",
  },
  {
    title: "Independence",
    body: "The user can complete the session with a browser webcam only: no account, wearable, hidden menu, clinic room or complex setup.",
  },
];

export const caregiverInterpretationRules = [
  {
    state: "High confidence",
    reportLanguage:
      "Use the note as a readable practice summary for this session, while keeping it outside clinical scoring.",
  },
  {
    state: "Medium confidence",
    reportLanguage:
      "Treat counts as useful but conservative practice feedback; repeat with the same setup before comparing sessions.",
  },
  {
    state: "Low confidence",
    reportLanguage:
      "Treat numbers as setup feedback only; improve camera position, distance or light before using them for a trend.",
  },
];

export const cameraLimitationRules = [
  {
    condition: "Close camera",
    reportLanguage:
      "A close camera can crop shoulders, hands or knees, so the report weakens movement claims.",
  },
  {
    condition: "Hand near lens",
    reportLanguage:
      "A hand very near the lens can hide the body frame, so hits and reps are interpreted conservatively.",
  },
  {
    condition: "Partial view",
    reportLanguage:
      "If only part of the body is visible, MotionQuest names which movement signals were observable.",
  },
  {
    condition: "Poor lighting",
    reportLanguage:
      "Backlight or low light can reduce landmark confidence; the report asks for a calmer repeat setup.",
  },
];

export const phaseSixScreenTrustChecklist = [
  {
    screen: "Home",
    visible: "Purpose, privacy promise, safe seated choice and fallback label.",
    counted: "Nothing is counted before the user chooses a path.",
    limited: "Camera setup explains that visibility affects confidence.",
    control: "User chooses seated, standing, method review or labeled sample report.",
  },
  {
    screen: "Adaptive movement",
    visible: "Selected branch, timer, what counts and current tracking status.",
    counted: "Only observable standing cycles or seated hand raises are counted.",
    limited: "Timer pauses or report weakens claims when observation is incomplete.",
    control: "User can finish early and stop if movement feels uncomfortable.",
  },
  {
    screen: "Reach Stars",
    visible: "Target, score, timer, hand visibility instruction and hit feedback.",
    counted: "Only a visible hand held inside the target is counted.",
    limited: "Hand/lighting/camera limits are surfaced before report interpretation.",
    control: "User can end the activity and review the report.",
  },
  {
    screen: "Caregiver report",
    visible: "Counts, confidence, limitations, interpretation, export and disclaimer.",
    counted: "Every number has a confidence explanation and source label.",
    limited: "Weak or sample sessions are labeled before the user reads the metrics.",
    control: "User can copy, download, restart or use a labeled sample report.",
  },
];

export const manualReviewProtocol = [
  "Capture one screenshot for Home, Adaptive Movement, Reach Stars and Caregiver Report.",
  "Confirm the sample-data banner or live-camera source label is visible in every fallback artifact.",
  "Check that visible joints or hands match the mode claim before accepting the screenshot as evidence.",
  "Reject any screenshot where the claim sounds stronger than what the camera actually observed.",
];

export const userSmokeProtocol = [
  "Seated smoke: stay seated, keep shoulders comfortable, raise one hand in view, and stop if discomfort appears.",
  "Standing smoke: use standing only when safe, keep a stable chair nearby, and stop immediately if balance feels unstable.",
  "Camera smoke: avoid bright backlight, keep the body away from the lens, and use sample data only when live capture is not reliable.",
];

export const claimEscalationRule =
  "If real camera evidence contradicts a product claim, MotionQuest weakens the claim and labels the limitation instead of inflating the evidence.";

export const phaseSixAcceptanceNote =
  "Phase 6 is accepted only when confidence, safety, privacy, dignity, independence, caregiver interpretation and claim escalation are visible in the product behavior.";

export const homeProofPathItems = [
  {
    title: "Problem",
    body: "Older adults and seated users are often excluded when movement tools assume standing, wearables or clinical setup.",
  },
  {
    title: "Promise",
    body: "MotionQuest starts in the browser, keeps seated mode first-class and turns movement into a readable report.",
  },
  {
    title: "Judge proof path",
    body: "Read the trust card, choose standing or seated movement, run Reach Stars and open the caregiver report.",
  },
];

export const cameraSetupGuidance = [
  "Place the camera at chest height when possible and keep a 4:3-style frame.",
  "For a close laptop webcam, seated adaptive is the reliable path; standing needs hips and knees in view.",
  "Use steady front lighting instead of a bright window behind the participant.",
  "Keep one safe chair nearby and leave room for comfortable arm movement.",
  "If the app asks for visibility, adjust the camera or body position; it is not blaming the participant.",
];

export const confidenceByMode = [
  {
    mode: "Standing",
    observes: "Shoulders, hips and knees for chair-style movement",
    boundary: "Timer and scoring pause until full-body tracking is usable.",
  },
  {
    mode: "Seated adaptive",
    observes: "One visible open hand for upper-body movement",
    boundary: "No lower-body or chair-stand claim is made in seated mode.",
  },
  {
    mode: "Reach Stars",
    observes: "One visible wrist/hand entering a large target",
    boundary: "Counts reach interaction only, not clinical range of motion.",
  },
];

export const miniBibliography = [
  {
    label: "Senior Fitness Test",
    note: "Functional movement construct for older-adult fitness tasks.",
  },
  {
    label: "MediaPipe Pose Landmarker",
    note: "Browser pose tracking with visible landmark limitations.",
  },
  {
    label: "WAI Older Users",
    note: "Large readable controls, clear instructions and no hidden interaction.",
  },
];
