import assert from "node:assert/strict";
import test from "node:test";
import {
  classifyPoseReadiness,
  detectChairStandTransition,
  detectReachDwellHit,
  detectReachHit,
  detectSeatedArmTransition,
  detectSeatedWristLiftTransition,
  getPoseConfidence,
  getVisibleWristLiftDeltas,
  hasPlausibleBodyFrame,
  hasUsablePose,
  type ChairStandPhase,
  type NormalizedLandmark,
  type SeatedArmPhase,
  type StarTarget,
} from "./gameLogic";
import { buildDemoSession, buildSession } from "./sessionStorage";

const landmark = (
  x: number,
  y: number,
  visibility = 0.95,
): NormalizedLandmark => ({ x, y, z: 0, visibility });

test("detectChairStandTransition counts one full seated to standing to seated cycle", () => {
  let phase: ChairStandPhase = "seated";
  let reps = 0;
  const frames = [
    { hipsY: 0.72, kneesY: 0.64 },
    { hipsY: 0.56, kneesY: 0.64 },
    { hipsY: 0.50, kneesY: 0.64 },
    { hipsY: 0.70, kneesY: 0.64 },
  ];

  for (const frame of frames) {
    const result = detectChairStandTransition({
      previousPhase: phase,
      reps,
      hipY: frame.hipsY,
      kneeY: frame.kneesY,
    });
    phase = result.phase;
    reps = result.reps;
  }

  assert.equal(reps, 1);
  assert.equal(phase, "seated");
});

test("detectReachHit returns true when either hand interaction point enters the star target", () => {
  const target: StarTarget = {
    id: "left",
    label: "Left",
    x: 18,
    y: 42,
    size: 16,
    shownAt: 0,
  };

  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  landmarks[15] = landmark(0.22, 0.48, 0.96);

  assert.equal(detectReachHit(landmarks, target), true);
});

test("detectReachHit accepts target overlap with visible hand area", () => {
  const target: StarTarget = {
    id: "palm-overlap",
    label: "Palm overlap",
    x: 10,
    y: 24,
    size: 15,
    shownAt: 0,
  };

  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  landmarks[15] = landmark(0.34, 0.14, 0.96);
  const handArea = Array.from({ length: 21 }, (_, index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    return landmark(0.16 + column * 0.07, 0.18 + row * 0.08, 0.92);
  });

  assert.equal(detectReachHit([...landmarks, ...handArea], target), true);
});

test("detectReachHit rejects hand area away from the target", () => {
  const target: StarTarget = {
    id: "miss",
    label: "Miss",
    x: 10,
    y: 24,
    size: 15,
    shownAt: 0,
  };

  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  landmarks[15] = landmark(0.72, 0.72, 0.96);
  const handArea = Array.from({ length: 21 }, (_, index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    return landmark(0.66 + column * 0.04, 0.62 + row * 0.04, 0.92);
  });

  assert.equal(detectReachHit([...landmarks, ...handArea], target), false);
});

test("getPoseConfidence returns low when required landmarks are missing", () => {
  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.9));
  landmarks[25] = landmark(0.5, 0.5, 0.05);

  assert.equal(getPoseConfidence(landmarks, "chair"), "low");
});

test("getPoseConfidence returns medium for usable but incomplete full-body pose", () => {
  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.05));
  landmarks[11] = landmark(0.42, 0.28, 0.9);
  landmarks[12] = landmark(0.58, 0.28, 0.9);
  landmarks[23] = landmark(0.44, 0.56, 0.9);
  landmarks[24] = landmark(0.56, 0.56, 0.9);
  landmarks[25] = landmark(0.44, 0.72, 0.9);
  landmarks[26] = landmark(0.56, 0.72, 0.9);

  assert.equal(hasUsablePose(landmarks, "chair"), true);
  assert.equal(getPoseConfidence(landmarks, "chair"), "medium");
});

test("standing pose rejects hand-close false body geometry even when required landmarks are visible", () => {
  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  landmarks[11] = landmark(0.32, 0.35, 0.96);
  landmarks[12] = landmark(0.39, 0.36, 0.96);
  landmarks[13] = landmark(0.28, 0.43, 0.96);
  landmarks[14] = landmark(0.52, 0.42, 0.96);
  landmarks[15] = landmark(0.22, 0.49, 0.96,);
  landmarks[16] = landmark(0.58, 0.48, 0.96);
  landmarks[23] = landmark(0.41, 0.62, 0.96);
  landmarks[24] = landmark(0.46, 0.63, 0.96);

  assert.equal(hasPlausibleBodyFrame(landmarks, "chair"), false);
  assert.equal(hasUsablePose(landmarks, "chair"), false);
  assert.equal(getPoseConfidence(landmarks, "chair"), "low");
});

test("Reach Stars accepts one visible hand without shoulders, elbows or hips", () => {
  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  landmarks[15] = landmark(0.24, 0.32, 0.88);

  assert.equal(hasPlausibleBodyFrame(landmarks, "reach"), true);
  assert.equal(hasUsablePose(landmarks, "reach"), true);
  assert.equal(getPoseConfidence(landmarks, "reach"), "medium");
});

test("Reach Stars rejects shoulders only until at least one hand is visible", () => {
  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  landmarks[11] = landmark(0.42, 0.28, 0.9);
  landmarks[12] = landmark(0.58, 0.29, 0.9);

  assert.equal(hasPlausibleBodyFrame(landmarks, "reach"), false);
  assert.equal(hasUsablePose(landmarks, "reach"), false);
});

test("hasUsablePose rejects a single noisy limb so the overlay does not pretend tracking is valid", () => {
  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  landmarks[25] = landmark(0.44, 0.65, 0.95);
  landmarks[27] = landmark(0.45, 0.82, 0.95);

  assert.equal(hasUsablePose(landmarks, "chair"), false);
  assert.equal(getPoseConfidence(landmarks, "chair"), "low");
});

test("buildSession marks sessions without landmarks as not valid enough", () => {
  const session = buildSession({
    sessionMode: "standing",
    chairReps: 0,
    seatedArmReps: 0,
    primaryMovement: "chair-stand",
    chairDurationSec: 1,
    reachTargetsShown: 0,
    reachTargetsHit: 0,
    reachReactionTimes: [],
    poseConfidence: "low",
    bodyLandmarksDetected: false,
  });

  assert.equal(session.trackingQuality.validity, "not-valid-enough");
  assert.match(session.report.interpretation, /camera did not capture enough movement signal/i);
});

test("buildSession labels seated adaptive movement without pretending chair stand was required", () => {
  const session = buildSession({
    sessionMode: "seated-adaptive",
    primaryMovement: "seated-arm-movement",
    chairReps: 0,
    seatedArmReps: 7,
    chairDurationSec: 30,
    reachTargetsShown: 4,
    reachTargetsHit: 3,
    reachReactionTimes: [720, 760, 810],
    poseConfidence: "medium",
    bodyLandmarksDetected: true,
  });

  assert.equal(session.sessionMode, "seated-adaptive");
  assert.equal(session.primaryMovement, "seated-arm-movement");
  assert.equal(session.adaptiveMovement.reps, 7);
  assert.match(session.report.interpretation, /7 seated arm movement reps/);
  assert.doesNotMatch(session.report.interpretation, /chair-stand reps/);
});

test("buildSession writes caregiver copy for valid standing sessions", () => {
  const session = buildSession({
    sessionMode: "standing",
    primaryMovement: "chair-stand",
    chairReps: 6,
    seatedArmReps: 0,
    chairDurationSec: 30,
    reachTargetsShown: 5,
    reachTargetsHit: 4,
    reachReactionTimes: [700, 760, 810, 790],
    poseConfidence: "high",
    bodyLandmarksDetected: true,
  });

  assert.match(session.report.summary, /Live standing session/);
  assert.match(session.report.interpretation, /6 chair-stand-style practice reps/);
  assert.match(session.report.disclaimer, /Not a diagnosis/);
  assert.equal(session.trackingQuality.validity, "valid");
});

test("buildSession writes caregiver copy for limited-confidence sessions", () => {
  const session = buildSession({
    sessionMode: "standing",
    primaryMovement: "chair-stand",
    chairReps: 2,
    seatedArmReps: 0,
    chairDurationSec: 30,
    reachTargetsShown: 3,
    reachTargetsHit: 1,
    reachReactionTimes: [1200],
    poseConfidence: "low",
    bodyLandmarksDetected: true,
  });

  assert.equal(session.trackingQuality.validity, "limited");
  assert.match(session.report.summary, /Camera observation was limited/);
  assert.match(session.trackingQuality.limitations.join(" "), /may be incomplete/);
  assert.match(session.trackingQuality.limitations.join(" "), /close camera/i);
  assert.match(session.trackingQuality.limitations.join(" "), /Poor lighting/i);
});

test("buildDemoSession labels fallback data explicitly", () => {
  const session = buildDemoSession();

  assert.equal(session.source, "safe-demo");
  assert.equal(session.trackingQuality.validity, "valid");
  assert.match(session.report.summary, /Sample session loaded/);
  assert.match(session.report.disclaimer, /not live camera data/);
});

test("classifyPoseReadiness accepts seated hand tracking without visible knees", () => {
  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  landmarks[15] = landmark(0.34, 0.54, 0.9);

  assert.equal(classifyPoseReadiness(landmarks), "seated-ready");
  assert.equal(hasUsablePose(landmarks, "seated"), true);
  assert.equal(hasUsablePose(landmarks, "chair"), false);
});

test("detectSeatedArmTransition counts one full extended flexed extended cycle", () => {
  let phase: SeatedArmPhase = "extended";
  let reps = 0;
  const frames = [162, 118, 62, 88, 151];

  for (const elbowAngle of frames) {
    const result = detectSeatedArmTransition({
      previousPhase: phase,
      reps,
      elbowAngle,
    });
    phase = result.phase;
    reps = result.reps;
  }

  assert.equal(reps, 1);
  assert.equal(phase, "extended");
});

test("detectSeatedWristLiftTransition counts one visible hand raise and lower cycle", () => {
  let phase: SeatedArmPhase = "extended";
  let reps = 0;
  const frames = [-0.12, 0.04, 0.16, 0.03, -0.09];

  for (const liftDelta of frames) {
    const result = detectSeatedWristLiftTransition({
      previousPhase: phase,
      reps,
      liftDelta,
    });
    phase = result.phase;
    reps = result.reps;
  }

  assert.equal(reps, 1);
  assert.equal(phase, "extended");
});

test("getVisibleWristLiftDeltas reads a raised hand as positive lift without shoulders", () => {
  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  landmarks[15] = landmark(0.3, 0.22, 0.95);

  assert.equal(getVisibleWristLiftDeltas(landmarks)[0]?.toFixed(2), "0.43");
});

test("detectReachDwellHit requires the hand to stay inside the target for 500ms", () => {
  const target: StarTarget = {
    id: "safe-left",
    label: "Left",
    x: 18,
    y: 42,
    size: 16,
    shownAt: 1000,
  };
  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  landmarks[15] = landmark(0.22, 0.48, 0.96);

  const first = detectReachDwellHit({
    landmarks,
    target,
    nowMs: 1200,
    dwellStartedAtMs: null,
  });

  assert.equal(first.hit, false);
  assert.equal(first.dwellStartedAtMs, 1200);

  const second = detectReachDwellHit({
    landmarks,
    target,
    nowMs: 1699,
    dwellStartedAtMs: first.dwellStartedAtMs,
  });

  assert.equal(second.hit, false);
  assert.equal(second.dwellStartedAtMs, 1200);

  const third = detectReachDwellHit({
    landmarks,
    target,
    nowMs: 1700,
    dwellStartedAtMs: first.dwellStartedAtMs,
  });

  assert.equal(third.hit, true);
  assert.equal(third.dwellStartedAtMs, 1200);
});
