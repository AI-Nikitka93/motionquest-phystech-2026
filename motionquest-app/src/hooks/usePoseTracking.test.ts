import assert from "node:assert/strict";
import test from "node:test";
import type { NormalizedLandmark } from "@/lib/gameLogic";
import { mergeHandLandmarksIntoPose } from "./usePoseTracking";

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
