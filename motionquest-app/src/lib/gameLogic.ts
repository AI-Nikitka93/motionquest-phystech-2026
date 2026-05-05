export type NormalizedLandmark = {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
};

export type PoseConfidence = "high" | "medium" | "low";
export type PoseMode = "calibration" | "chair" | "seated" | "reach";
export type ChairStandPhase = "seated" | "standing";
export type SessionMode = "standing" | "seated-adaptive";
export type PoseReadiness =
  | "standing-ready"
  | "seated-ready"
  | "partial-body"
  | "not-trackable";
export type SeatedArmPhase = "extended" | "flexed";

export type StarTarget = {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  shownAt: number;
};

export type ChairStandTransitionInput = {
  previousPhase: ChairStandPhase;
  reps: number;
  hipY: number;
  kneeY: number;
};

export type SeatedArmTransitionInput = {
  previousPhase: SeatedArmPhase;
  reps: number;
  elbowAngle: number;
};

export type ReachDwellInput = {
  landmarks: NormalizedLandmark[];
  target: StarTarget;
  nowMs: number;
  dwellStartedAtMs: number | null;
  dwellMs?: number;
};

export const LANDMARK_VISIBILITY_THRESHOLD = 0.55;
export const REACH_TARGET_DWELL_MS = 500;

const REQUIRED_LANDMARKS: Record<PoseMode, number[]> = {
  calibration: [11, 12, 23, 24, 25, 26, 27, 28],
  chair: [11, 12, 23, 24, 25, 26, 27, 28],
  seated: [11, 12, 13, 14, 15, 16, 23, 24],
  reach: [11, 12, 13, 14, 15, 16, 23, 24],
};

const MIN_USABLE_LANDMARKS: Record<PoseMode, number[]> = {
  calibration: [11, 12, 23, 24, 25, 26],
  chair: [11, 12, 23, 24, 25, 26],
  seated: [11, 12, 13, 14, 15, 16],
  reach: [11, 12, 15, 16],
};

export function isVisibleLandmark(
  point: NormalizedLandmark | undefined,
  threshold = LANDMARK_VISIBILITY_THRESHOLD,
): point is NormalizedLandmark {
  return Boolean(
    point &&
      Number.isFinite(point.x) &&
      Number.isFinite(point.y) &&
      point.x >= -0.15 &&
      point.x <= 1.15 &&
      point.y >= -0.15 &&
      point.y <= 1.15 &&
      (point.visibility ?? 1) >= threshold,
  );
}

export function countVisibleLandmarks(
  landmarks: NormalizedLandmark[],
  indexes: number[],
  threshold = LANDMARK_VISIBILITY_THRESHOLD,
) {
  return indexes.filter((index) => isVisibleLandmark(landmarks[index], threshold))
    .length;
}

export function hasUsablePose(
  landmarks: NormalizedLandmark[],
  mode: PoseMode,
) {
  const required = MIN_USABLE_LANDMARKS[mode];
  return required.every((index) => isVisibleLandmark(landmarks[index]));
}

export function classifyPoseReadiness(
  landmarks: NormalizedLandmark[],
): PoseReadiness {
  if (hasUsablePose(landmarks, "chair")) return "standing-ready";
  if (hasUsablePose(landmarks, "seated")) return "seated-ready";

  const upperBodyVisible = countVisibleLandmarks(landmarks, [
    11, 12, 13, 14, 15, 16, 23, 24,
  ]);
  const fullBodyVisible = countVisibleLandmarks(landmarks, [
    11, 12, 23, 24, 25, 26,
  ]);

  if (upperBodyVisible >= 3 || fullBodyVisible >= 3) return "partial-body";
  return "not-trackable";
}

export function averageY(
  landmarks: NormalizedLandmark[],
  indexes: number[],
): number | null {
  const points = indexes
    .map((index) => landmarks[index])
    .filter((point) => isVisibleLandmark(point));

  if (points.length === 0) {
    return null;
  }

  return points.reduce((sum, point) => sum + point.y, 0) / points.length;
}

export function getPoseConfidence(
  landmarks: NormalizedLandmark[],
  mode: PoseMode,
): PoseConfidence {
  const required = REQUIRED_LANDMARKS[mode];
  const visible = countVisibleLandmarks(landmarks, required);
  const ratio = visible / required.length;
  const visiblePoints = required
    .map((index) => landmarks[index])
    .filter((point) => isVisibleLandmark(point));
  const averageVisibility =
    visiblePoints.length === 0
      ? 0
      : visiblePoints.reduce((sum, point) => sum + (point.visibility ?? 1), 0) /
        visiblePoints.length;

  if (ratio >= 0.95 && averageVisibility >= 0.72) return "high";
  if (ratio >= 0.7 && hasUsablePose(landmarks, mode)) return "medium";
  return "low";
}

export function detectChairStandTransition({
  previousPhase,
  reps,
  hipY,
  kneeY,
}: ChairStandTransitionInput): { phase: ChairStandPhase; reps: number } {
  const standingThreshold = kneeY - 0.08;
  const seatedThreshold = kneeY + 0.02;

  if (previousPhase === "seated" && hipY < standingThreshold) {
    return { phase: "standing", reps };
  }

  if (previousPhase === "standing" && hipY > seatedThreshold) {
    return { phase: "seated", reps: reps + 1 };
  }

  return { phase: previousPhase, reps };
}

export function detectSeatedArmTransition({
  previousPhase,
  reps,
  elbowAngle,
}: SeatedArmTransitionInput): { phase: SeatedArmPhase; reps: number } {
  const flexedThreshold = 75;
  const extendedThreshold = 145;

  if (previousPhase === "extended" && elbowAngle < flexedThreshold) {
    return { phase: "flexed", reps };
  }

  if (previousPhase === "flexed" && elbowAngle > extendedThreshold) {
    return { phase: "extended", reps: reps + 1 };
  }

  return { phase: previousPhase, reps };
}

export function getVisibleElbowAngles(landmarks: NormalizedLandmark[]) {
  const left = calculateJointAngle(landmarks[11], landmarks[13], landmarks[15]);
  const right = calculateJointAngle(landmarks[12], landmarks[14], landmarks[16]);
  return [left, right].filter((angle): angle is number => angle !== null);
}

export function detectReachHit(
  landmarks: NormalizedLandmark[],
  target: StarTarget,
): boolean {
  const wrists = [landmarks[15], landmarks[16]].filter(
    (point) => isVisibleLandmark(point),
  );
  const left = target.x;
  const right = target.x + target.size;
  const top = target.y;
  const bottom = target.y + target.size;

  return wrists.some((wrist) => {
    const x = wrist.x * 100;
    const y = wrist.y * 100;
    return x >= left && x <= right && y >= top && y <= bottom;
  });
}

export function detectReachDwellHit({
  landmarks,
  target,
  nowMs,
  dwellStartedAtMs,
  dwellMs = REACH_TARGET_DWELL_MS,
}: ReachDwellInput): { hit: boolean; dwellStartedAtMs: number | null } {
  if (!detectReachHit(landmarks, target)) {
    return { hit: false, dwellStartedAtMs: null };
  }

  const startedAt = dwellStartedAtMs ?? nowMs;
  return {
    hit: nowMs - startedAt >= dwellMs,
    dwellStartedAtMs: startedAt,
  };
}

export function createSessionId(): string {
  return `motionquest-${new Date().toISOString()}`;
}

function calculateJointAngle(
  first: NormalizedLandmark | undefined,
  middle: NormalizedLandmark | undefined,
  last: NormalizedLandmark | undefined,
) {
  if (
    !isVisibleLandmark(first) ||
    !isVisibleLandmark(middle) ||
    !isVisibleLandmark(last)
  ) {
    return null;
  }

  const firstVector = { x: first.x - middle.x, y: first.y - middle.y };
  const secondVector = { x: last.x - middle.x, y: last.y - middle.y };
  const dot = firstVector.x * secondVector.x + firstVector.y * secondVector.y;
  const firstLength = Math.hypot(firstVector.x, firstVector.y);
  const secondLength = Math.hypot(secondVector.x, secondVector.y);
  if (firstLength === 0 || secondLength === 0) return null;

  const cosine = Math.min(1, Math.max(-1, dot / (firstLength * secondLength)));
  return (Math.acos(cosine) * 180) / Math.PI;
}
