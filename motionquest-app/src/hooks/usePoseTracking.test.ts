import assert from "node:assert/strict";
import test from "node:test";
import type { NormalizedLandmark } from "@/lib/gameLogic";
import {
  buildHandLandmarkerOptions,
  buildCameraAttempts,
  buildPoseLandmarkerOptions,
  getCameraFitNotes,
  HAND_STABLE_FRAME_THRESHOLD,
  mergeHandLandmarksIntoPose,
  shouldRunVideoDetection,
  trackingStatusForFrame,
  updateHandSignalStability,
} from "./usePoseTracking";

const landmark = (
  x: number,
  y: number,
  visibility = 0.95,
): NormalizedLandmark => ({ x, y, z: 0, visibility });

test("seated tracking keeps pose wrists when the hand model has no palm result", () => {
  const poseLandmarks = Array.from({ length: 33 }, () =>
    landmark(0.5, 0.5, 0.02),
  );
  poseLandmarks[15] = landmark(0.32, 0.26, 0.9);

  const merged = mergeHandLandmarksIntoPose(poseLandmarks, [], "seated");

  assert.equal(merged[15].x, 0.32);
  assert.equal(merged[15].y, 0.26);
  assert.equal(merged[15].visibility, 0.9);
});

test("reach tracking does not treat pose wrist fallback as a usable hand", () => {
  const poseLandmarks = Array.from({ length: 33 }, () =>
    landmark(0.5, 0.5, 0.02),
  );
  poseLandmarks[15] = landmark(0.32, 0.26, 0.9);

  const merged = mergeHandLandmarksIntoPose(poseLandmarks, [], "reach");

  assert.equal(merged[15].visibility, 0);
  assert.equal(merged[16].visibility, 0);
});

test("hand model wrist overrides pose wrist when a palm is visible", () => {
  const poseLandmarks = Array.from({ length: 33 }, () =>
    landmark(0.5, 0.5, 0.02),
  );
  poseLandmarks[15] = landmark(0.32, 0.26, 0.9);

  const merged = mergeHandLandmarksIntoPose(
    poseLandmarks,
    [[landmark(0.68, 0.22, 0.95)]],
    "seated",
  );

  assert.equal(merged[16].x, 0.68);
  assert.equal(merged[16].y, 0.22);
  assert.equal(merged[16].visibility, 0.96);
});

test("reach tracking uses the palm center so a visible hand can hit targets", () => {
  const poseLandmarks = Array.from({ length: 33 }, () =>
    landmark(0.5, 0.5, 0.02),
  );
  const hand = Array.from({ length: 21 }, (_, index) =>
    index === 0 ? landmark(0.22, 0.62, 0.95) : landmark(0.34, 0.31, 0.95),
  );

  const merged = mergeHandLandmarksIntoPose(poseLandmarks, [hand], "reach");

  assert.equal(merged[15].x.toFixed(2), "0.34");
  assert.equal(merged[15].y.toFixed(2), "0.31");
  assert.equal(merged[15].visibility, 0.96);
});

test("reach tracking rejects hand results without enough palm points", () => {
  const poseLandmarks = Array.from({ length: 33 }, () =>
    landmark(0.5, 0.5, 0.02),
  );
  const wristOnlyHand = Array.from({ length: 21 }, (_, index) =>
    index === 0 ? landmark(0.22, 0.62, 0.95) : landmark(0.34, 0.31, 0.02),
  );

  const merged = mergeHandLandmarksIntoPose(
    poseLandmarks,
    [wristOnlyHand],
    "reach",
  );

  assert.equal(merged[15].visibility, 0);
  assert.equal(merged[16].visibility, 0);
});

test("camera setup tries a stable 4:3 presenter frame before browser defaults", () => {
  const attempts = buildCameraAttempts();

  assert.equal(attempts[0].label, "stable 4:3 presenter camera");
  assert.deepEqual(attempts[0].constraints, {
    audio: false,
    video: {
      width: { ideal: 640 },
      height: { ideal: 480 },
      aspectRatio: { ideal: 4 / 3 },
      frameRate: { ideal: 24, max: 30 },
      facingMode: { ideal: "user" },
    },
  });
});

test("standing pose options use the full model and stricter confidence thresholds", () => {
  const options = buildPoseLandmarkerOptions("chair", "GPU");

  assert.match(
    options.baseOptions.modelAssetPath,
    /pose_landmarker_full\/float16\/latest\/pose_landmarker_full\.task$/,
  );
  assert.equal(options.baseOptions.delegate, "GPU");
  assert.equal(options.minPoseDetectionConfidence, 0.6);
  assert.equal(options.minTrackingConfidence, 0.6);
});

test("hand-mode options use the lightweight pose model with demo-tolerant thresholds", () => {
  const poseOptions = buildPoseLandmarkerOptions("reach", "CPU");
  const handOptions = buildHandLandmarkerOptions("CPU");

  assert.match(
    poseOptions.baseOptions.modelAssetPath,
    /pose_landmarker_lite\/float16\/latest\/pose_landmarker_lite\.task$/,
  );
  assert.equal(handOptions.baseOptions.delegate, "CPU");
  assert.equal(handOptions.minHandDetectionConfidence, 0.5);
  assert.equal(handOptions.minHandPresenceConfidence, 0.5);
  assert.equal(handOptions.minTrackingConfidence, 0.5);
});

test("video detection skips duplicate video timestamps", () => {
  assert.equal(shouldRunVideoDetection(12.25, null), true);
  assert.equal(shouldRunVideoDetection(12.25, 12.24), true);
  assert.equal(shouldRunVideoDetection(12.25, 12.25), false);
});

test("camera fit notes flag wide or slow camera settings", () => {
  assert.deepEqual(
    getCameraFitNotes({ width: 640, height: 480, frameRate: 30 }),
    ["camera fit: 4:3 stable presenter frame"],
  );
  assert.deepEqual(getCameraFitNotes({ width: 1280, height: 720, frameRate: 12 }), [
    "camera fit: wide frame may crop standing body; use seated adaptive or step back",
    "camera fit: low frame rate can make landmarks jump; close other camera apps",
  ]);
});

test("hand-mode tracking becomes usable only after consecutive visible frames", () => {
  const hidden = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  const visible = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  visible[15] = landmark(0.32, 0.42, 0.96);

  let state = updateHandSignalStability({ frames: 0 }, hidden, "reach");
  assert.equal(state.stable, false);

  for (let index = 1; index < HAND_STABLE_FRAME_THRESHOLD; index += 1) {
    state = updateHandSignalStability(state, visible, "reach");
    assert.equal(state.stable, false);
  }

  state = updateHandSignalStability(state, visible, "reach");
  assert.equal(state.stable, true);

  state = updateHandSignalStability(state, hidden, "reach");
  assert.equal(state.frames, 0);
  assert.equal(state.stable, false);
});

test("hand-mode stability resets after an implausible hand jump", () => {
  const first = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  first[15] = landmark(0.18, 0.42, 0.96);
  const jumped = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  jumped[15] = landmark(0.82, 0.42, 0.96);

  let state = { frames: HAND_STABLE_FRAME_THRESHOLD, point: first[15] };
  state = updateHandSignalStability(state, jumped, "reach");

  assert.equal(state.frames, 1);
  assert.equal(state.stable, false);
});

test("hand-mode status asks for steady hold before the signal is stable", () => {
  const landmarks = Array.from({ length: 33 }, () => landmark(0.5, 0.5, 0.02));
  landmarks[15] = landmark(0.32, 0.42, 0.96);

  assert.equal(
    trackingStatusForFrame("reach", false, true, landmarks),
    "Keep one open palm steady with fingers visible",
  );
  assert.equal(
    trackingStatusForFrame("reach", true, true, landmarks),
    "Tracking stable hand signal",
  );
});
