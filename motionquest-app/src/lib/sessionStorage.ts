import { createSessionId, type PoseConfidence, type SessionMode } from "./gameLogic";

export type MotionQuestSession = {
  id: string;
  createdAt: string;
  source: "live" | "safe-demo";
  participantLabel: string;
  sessionMode: SessionMode;
  primaryMovement: "chair-stand" | "seated-arm-movement";
  poseConfidence: PoseConfidence;
  trackingQuality: {
    confidence: PoseConfidence;
    bodyDetected: boolean;
    validity: "valid" | "limited" | "not-valid-enough";
    limitations: string[];
  };
  chairStand: {
    durationSec: number;
    reps: number;
    incompleteReps: number;
    avgRepSec: number | null;
  };
  adaptiveMovement: {
    label: string;
    durationSec: number;
    reps: number;
    avgRepSec: number | null;
  };
  reachStars: {
    targetsShown: number;
    targetsHit: number;
    avgReactionMs: number | null;
    leftRightBalance: "balanced" | "left" | "right" | "unknown";
  };
  report: {
    summary: string;
    interpretation: string;
    nextDifficulty: "same" | "easier" | "harder";
    disclaimer: string;
  };
};

export type SessionDraft = {
  sessionMode: SessionMode;
  primaryMovement: "chair-stand" | "seated-arm-movement";
  chairReps: number;
  seatedArmReps: number;
  chairDurationSec: number;
  reachTargetsShown: number;
  reachTargetsHit: number;
  reachReactionTimes: number[];
  poseConfidence: PoseConfidence;
  bodyLandmarksDetected: boolean;
};

const STORAGE_KEY = "motionquest_sessions";

export function buildSession(draft: SessionDraft): MotionQuestSession {
  const primaryReps =
    draft.primaryMovement === "seated-arm-movement"
      ? draft.seatedArmReps
      : draft.chairReps;
  const avgRepSec =
    primaryReps > 0 ? draft.chairDurationSec / primaryReps : null;
  const avgReactionMs =
    draft.reachReactionTimes.length > 0
      ? Math.round(
          draft.reachReactionTimes.reduce((sum, value) => sum + value, 0) /
            draft.reachReactionTimes.length,
        )
      : null;
  const bodyLandmarksDetected =
    draft.bodyLandmarksDetected || draft.poseConfidence !== "low";
  const validity = getSessionValidity(bodyLandmarksDetected, draft.poseConfidence);
  const limitations = buildLimitations(draft, bodyLandmarksDetected, validity);

  return {
    id: createSessionId(),
    createdAt: new Date().toISOString(),
    source: "live",
    participantLabel: "Demo participant",
    sessionMode: draft.sessionMode,
    primaryMovement: draft.primaryMovement,
    poseConfidence: draft.poseConfidence,
    trackingQuality: {
      confidence: draft.poseConfidence,
      bodyDetected: bodyLandmarksDetected,
      validity,
      limitations,
    },
    chairStand: {
      durationSec: draft.chairDurationSec,
      reps: draft.chairReps,
      incompleteReps: 0,
      avgRepSec:
        draft.chairReps > 0
          ? Number((draft.chairDurationSec / draft.chairReps).toFixed(1))
          : null,
    },
    adaptiveMovement: {
      label:
        draft.primaryMovement === "seated-arm-movement"
          ? "Seated arm movement"
          : "Chair stand",
      durationSec: draft.chairDurationSec,
      reps: primaryReps,
      avgRepSec: avgRepSec ? Number(avgRepSec.toFixed(1)) : null,
    },
    reachStars: {
      targetsShown: draft.reachTargetsShown,
      targetsHit: draft.reachTargetsHit,
      avgReactionMs,
      leftRightBalance: "balanced",
    },
    report: {
      summary: buildSummary(validity),
      interpretation: buildInterpretation(draft, validity),
      nextDifficulty: "same",
      disclaimer:
        "Research-inspired movement feedback, not a medical diagnosis.",
    },
  };
}

export function saveSession(session: MotionQuestSession): void {
  if (typeof window === "undefined") return;
  const existing = getSessions();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ sessions: [session, ...existing].slice(0, 5) }),
  );
}

export function getSessions(): MotionQuestSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { sessions?: MotionQuestSession[] };
    return Array.isArray(parsed.sessions)
      ? parsed.sessions.map(normalizeSession)
      : [];
  } catch {
    return [];
  }
}

export function buildDemoSession(): MotionQuestSession {
  const session = buildSession({
    sessionMode: "seated-adaptive",
    primaryMovement: "seated-arm-movement",
    chairReps: 8,
    seatedArmReps: 10,
    chairDurationSec: 30,
    reachTargetsShown: 12,
    reachTargetsHit: 10,
    reachReactionTimes: [930, 1010, 890, 970, 940, 920, 980, 910, 960, 945],
    poseConfidence: "high",
    bodyLandmarksDetected: true,
  });
  return {
    ...session,
    source: "safe-demo",
    participantLabel: "Safe demo participant",
    report: {
      ...session.report,
      summary:
        "Safe demo data loaded to show the report format when a live webcam is unavailable.",
      disclaimer:
        "Safe demo data only; use live camera results for real session feedback.",
    },
  };
}

function getSessionValidity(
  bodyLandmarksDetected: boolean,
  poseConfidence: PoseConfidence,
): MotionQuestSession["trackingQuality"]["validity"] {
  if (!bodyLandmarksDetected) return "not-valid-enough";
  if (poseConfidence === "low") return "limited";
  return "valid";
}

function buildSummary(
  validity: MotionQuestSession["trackingQuality"]["validity"],
) {
  if (validity === "not-valid-enough") {
    return "The session did not capture enough body landmarks for a usable movement report.";
  }
  if (validity === "limited") {
    return "Completed both movement games, but tracking quality was low. Treat the report as limited practice feedback.";
  }
  return "Completed both functional movement games with browser-based pose tracking.";
}

function buildInterpretation(
  draft: SessionDraft,
  validity: MotionQuestSession["trackingQuality"]["validity"],
) {
  if (validity === "not-valid-enough") {
    return "No usable body tracking was detected. Repeat the setup with full-body visibility before using the numbers.";
  }

  const reachRatio =
    draft.reachTargetsShown > 0
      ? draft.reachTargetsHit / draft.reachTargetsShown
      : 0;
  const movementSignal =
    draft.primaryMovement === "seated-arm-movement"
      ? draft.seatedArmReps > 0
        ? `${draft.seatedArmReps} seated arm movement reps were recorded`
        : "no complete seated arm movement reps were recorded"
      : draft.chairReps > 0
        ? `${draft.chairReps} chair-stand reps were recorded`
        : "no complete chair-stand reps were recorded";
  const reachSignal =
    draft.reachTargetsShown > 0
      ? `${draft.reachTargetsHit} of ${draft.reachTargetsShown} reach targets were hit`
      : "no reach targets were completed";
  const confidenceSignal =
    draft.poseConfidence === "high"
      ? "tracking confidence was high"
      : draft.poseConfidence === "medium"
        ? "tracking confidence was medium"
        : "tracking confidence was low";
  const reachMeaning =
    reachRatio >= 0.7
      ? "reach interaction looked consistent"
      : "reach interaction may need easier target placement";

  return `${movementSignal}, ${reachSignal}, and ${confidenceSignal}. ${reachMeaning}. Use this as session feedback, not diagnosis.`;
}

function buildLimitations(
  draft: SessionDraft,
  bodyLandmarksDetected: boolean,
  validity: MotionQuestSession["trackingQuality"]["validity"],
) {
  const limitations = [
    "Results depend on camera angle, lighting, body visibility, and safe chair setup.",
  ];

  if (!bodyLandmarksDetected) {
    limitations.push("No body landmarks were detected during the session.");
  }
  if (validity === "limited") {
    limitations.push("Tracking confidence was low, so movement counts may be incomplete.");
  }
  if (draft.primaryMovement === "seated-arm-movement") {
    limitations.push(
      "Seated adaptive mode uses visible upper-body landmarks and is not a clinical strength score.",
    );
  }
  if (draft.primaryMovement === "chair-stand" && draft.chairReps === 0) {
    limitations.push("No complete chair-stand cycle was recorded.");
  }
  if (
    draft.primaryMovement === "seated-arm-movement" &&
    draft.seatedArmReps === 0
  ) {
    limitations.push("No complete seated arm movement cycle was recorded.");
  }
  if (draft.reachTargetsShown === 0 || draft.reachTargetsHit === 0) {
    limitations.push("Reach target interaction was not strong enough to show consistent hits.");
  }

  return limitations;
}

function normalizeSession(session: MotionQuestSession): MotionQuestSession {
  if (session.trackingQuality && session.report.interpretation) {
    return session;
  }

  const draft: SessionDraft = {
    sessionMode: session.sessionMode ?? "standing",
    primaryMovement: session.primaryMovement ?? "chair-stand",
    chairReps: session.chairStand.reps,
    seatedArmReps: session.adaptiveMovement?.reps ?? 0,
    chairDurationSec: session.chairStand.durationSec,
    reachTargetsShown: session.reachStars.targetsShown,
    reachTargetsHit: session.reachStars.targetsHit,
    reachReactionTimes: session.reachStars.avgReactionMs
      ? [session.reachStars.avgReactionMs]
      : [],
    poseConfidence: session.poseConfidence,
    bodyLandmarksDetected: session.poseConfidence !== "low",
  };
  const normalized = buildSession(draft);
  return {
    ...normalized,
    id: session.id,
    createdAt: session.createdAt,
    source: session.source ?? "live",
    participantLabel: session.participantLabel,
    sessionMode: session.sessionMode ?? normalized.sessionMode,
    primaryMovement: session.primaryMovement ?? normalized.primaryMovement,
  };
}
