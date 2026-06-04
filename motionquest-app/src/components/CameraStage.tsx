"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { usePoseTracking } from "@/hooks/usePoseTracking";
import {
  cameraRecoveryContent,
  classifyCameraIssue,
  isPreparingStatus,
  partialVisibilityMessage,
} from "@/lib/cameraRecovery";
import { cameraSetupGuidance } from "@/lib/visualSystem";
import {
  countVisibleLandmarks,
  hasUsablePose,
  isVisibleLandmark,
  type NormalizedLandmark,
  type PoseConfidence,
  type PoseMode,
} from "@/lib/gameLogic";

const DIAGNOSTIC_VISIBILITY_THRESHOLD = 0.3;

export type CameraStageRenderProps = ReturnType<typeof usePoseTracking>;
export type CameraTrackingData = Pick<
  CameraStageRenderProps,
  "landmarks" | "confidence" | "status" | "error" | "isReady" | "cameraDiagnostics"
>;

export function CameraStage({
  mode,
  autoStart = false,
  title,
  instruction,
  children,
}: {
  mode: PoseMode;
  autoStart?: boolean;
  title: string;
  instruction: string;
  children?: (tracking: CameraTrackingData) => ReactNode;
}) {
  const {
    videoRef,
    canvasRef,
    landmarks,
    confidence,
    status,
    error,
    isReady,
    cameraDiagnostics,
    startCamera,
  } = usePoseTracking(mode, autoStart);
  const trackingData: CameraTrackingData = {
    landmarks,
    confidence,
    status,
    error,
    isReady,
    cameraDiagnostics,
  };
  const poseUsable = hasUsablePose(landmarks, mode);
  const recovery = cameraRecoveryContent(error);
  const cameraIssue = classifyCameraIssue(error);
  const [copyStatus, setCopyStatus] = useState("Copy live evidence");
  const evidenceText = useMemo(
    () =>
      buildCameraEvidenceText({
        mode,
        title,
        confidence,
        status,
        error,
        isReady,
        poseUsable,
        landmarks,
        cameraDiagnostics,
      }),
    [
      cameraDiagnostics,
      confidence,
      error,
      isReady,
      landmarks,
      mode,
      poseUsable,
      status,
      title,
    ],
  );

  const copyEvidence = async () => {
    try {
      await navigator.clipboard.writeText(evidenceText);
      setCopyStatus("Evidence copied");
      window.setTimeout(() => setCopyStatus("Copy live evidence"), 1400);
    } catch {
      setCopyStatus("Copy unavailable");
      window.setTimeout(() => setCopyStatus("Copy live evidence"), 1800);
    }
  };

  return (
    <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
      <div className="relative overflow-hidden rounded-2xl border-4 border-[#075E54] bg-[#071B17] shadow-camera">
        <video
          ref={videoRef}
          className="aspect-[4/3] w-full bg-[#071B17] object-cover"
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(124,247,212,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(124,247,212,0.10)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute left-4 top-4 rounded-full bg-[#071B17]/90 px-5 py-3 text-base font-bold text-white shadow-camera">
          <span className="text-[#F6C85F]">Measurement stage</span> ·{" "}
          {confidenceLabel(confidence, mode, status)}
        </div>
        <div className="absolute right-4 top-4 hidden rounded-full bg-[#D8F3DC] px-5 py-3 text-base font-black text-[#10231F] shadow-camera sm:block">
          {modeLabel(mode)}
        </div>
        <div className="absolute inset-x-4 bottom-4 rounded-xl bg-[#071B17]/85 p-4 text-white">
          <p className="text-xl font-bold">{instruction}</p>
          <p className="mt-1 text-base">{status}</p>
        </div>
        {children?.(trackingData)}
      </div>

      <aside className="rounded-lg border-2 border-[#D8F3DC] bg-white p-6 text-[#10231F] shadow-camera">
        <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
          Browser pose lab
        </p>
        <h2 className="text-3xl font-extrabold leading-tight">{title}</h2>
        <p className="mt-3 text-lg font-bold leading-relaxed text-[#394B45]">
          This stage verifies camera readiness and tracking model
          status before the report treats the session as usable practice data.
        </p>
        <div className="mt-5 rounded-lg bg-[#FFF8E7] p-4">
          <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
            Human setup guidance
          </p>
          <ul className="mt-3 space-y-2 text-base font-bold leading-relaxed text-[#394B45]">
            {cameraSetupGuidance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        {isPreparingStatus(status) && !error ? (
          <div
            className="mt-5 rounded-lg border-2 border-[#075E54] bg-[#D8F3DC] p-4"
            role="status"
            aria-live="polite"
          >
            <p className="text-xl font-black">Preparing camera check</p>
            <p className="mt-2 text-base font-bold leading-relaxed text-[#394B45]">
              MotionQuest is loading the camera/model path. The page is still
              working; keep this tab open and wait for the readiness result.
            </p>
          </div>
        ) : null}
        <div className="mt-5 space-y-4 text-xl leading-relaxed">
          <StageStatusItem tone={poseUsable ? "success" : "warning"}>
            {mode === "seated"
              ? poseUsable
                ? "Seated mode is selected and one hand is visible"
                : "Seated mode is selected; raise one open hand"
              : mode === "reach"
                ? poseUsable
                  ? "At least one reaching hand is visible"
                  : "Raise one open hand for tracking"
                : "Shoulders, hips and knees are visible"}
          </StageStatusItem>
          <StageStatusItem tone={isReady ? "success" : "warning"}>
            {isReady ? "Camera is active" : "Camera not started"}
          </StageStatusItem>
          <StageStatusItem tone={error ? "error" : isReady ? "success" : "warning"}>
            {error
              ? "Camera/model needs attention"
              : isReady
                ? "Pose model is ready"
                : "Pose model not started"}
          </StageStatusItem>
        </div>
        <JointVisibilityPanel mode={mode} landmarks={landmarks} />
        {error ? (
          <div className="mt-6 rounded-lg bg-[#8A1C1C] p-4 text-base font-bold leading-relaxed text-white">
            <p className="text-xl font-black">{recovery.title}</p>
            <p className="mt-2">{recovery.explanation}</p>
            <p className="mt-3 rounded-lg bg-white/15 p-3">
              {recovery.reassurance}
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              {recovery.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {cameraDiagnostics.length > 0 ? (
          <div className="mt-5 rounded-lg border-2 border-[#F6C85F] bg-[#FFF8E7] p-4">
            <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
              Camera diagnostics
            </p>
            <ul className="mt-3 space-y-2 text-base font-bold leading-relaxed text-[#394B45]">
              {cameraDiagnostics.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {cameraIssue === "no-camera" ? <NoCameraProductPath /> : null}
        {!isReady ? (
          <button
            type="button"
            onClick={() => void startCamera()}
            className="mt-6 min-h-14 w-full rounded-xl bg-[#075E54] px-7 text-xl font-bold text-white hover:bg-[#064C45] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
          >
            Start Camera Check
          </button>
        ) : null}
        <div className="mt-5 rounded-lg border-2 border-[#075E54] bg-[#F7F1DE] p-4">
          <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
            Live smoke evidence
          </p>
          <p className="mt-2 text-base font-bold leading-relaxed text-[#394B45]">
            Copy this after each real camera stage. It records the camera
            state, visible tracking points and stage verdict for T086-T104.
          </p>
          <button
            type="button"
            onClick={() => void copyEvidence()}
            className="mt-4 min-h-14 w-full rounded-xl bg-[#10231F] px-7 text-lg font-bold text-white hover:bg-[#263B34] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
          >
            {copyStatus}
          </button>
        </div>
      </aside>
    </section>
  );
}

const JOINT_GROUPS: Record<
  PoseMode,
  { label: string; indexes: number[]; help: string }[]
> = {
  calibration: [
    {
      label: "Shoulders",
      indexes: [11, 12],
      help: "Keep upper body centered in the camera.",
    },
    {
      label: "Hips",
      indexes: [23, 24],
      help: "Step back until the waist is visible.",
    },
    {
      label: "Knees",
      indexes: [25, 26],
      help: "Move the camera lower or step farther back.",
    },
    {
      label: "Ankles",
      indexes: [27, 28],
      help: "Show full legs for chair-stand readiness.",
    },
  ],
  chair: [
    {
      label: "Shoulders",
      indexes: [11, 12],
      help: "Shoulders help stabilize the pose frame.",
    },
    {
      label: "Hips",
      indexes: [23, 24],
      help: "Hips drive sit-to-stand detection.",
    },
    {
      label: "Knees",
      indexes: [25, 26],
      help: "Knees are needed for the stand/seated threshold.",
    },
    {
      label: "Ankles",
      indexes: [27, 28],
      help: "Ankles confirm full-body visibility.",
    },
  ],
  reach: [
    {
      label: "Left hand",
      indexes: [15],
      help: "Raise your left hand where the camera can see it.",
    },
    {
      label: "Right hand",
      indexes: [16],
      help: "Raise your right hand where the camera can see it.",
    },
  ],
  seated: [
    {
      label: "Left hand",
      indexes: [15],
      help: "Raise your left hand where the camera can see it.",
    },
    {
      label: "Right hand",
      indexes: [16],
      help: "Raise your right hand where the camera can see it.",
    },
  ],
};

function JointVisibilityPanel({
  mode,
  landmarks,
}: {
  mode: PoseMode;
  landmarks: NormalizedLandmark[];
}) {
  const requiredGroups = JOINT_GROUPS[mode];
  const groupStates = requiredGroups.map((group) => ({
    ...group,
    visible: isGroupVisible(group, landmarks),
  }));
  const missingLabels = groupStates
    .filter((group) => !group.visible)
    .map((group) => group.label);
  const hasAnyVisible = groupStates.some((group) => group.visible);
  const hasPartialVisibility = hasAnyVisible && missingLabels.length > 0;
  const allVisible =
    mode === "reach" || mode === "seated"
      ? groupStates.some((group) => group.visible)
      : requiredGroups.length > 0 &&
        groupStates.every((group) => group.visible);
  const poseUsable = hasUsablePose(landmarks, mode);

  return (
    <div className="mt-5 rounded-lg border-2 border-[#D8F3DC] bg-[#FFF8E7] p-4">
      <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
        Required joints
      </p>
      <div
        className={`mt-3 rounded-lg p-4 ${
          allVisible && poseUsable ? "bg-[#D8F3DC]" : "bg-[#FFE8A3]"
        }`}
      >
        <p className="text-xl font-black">
          {allVisible && poseUsable ? "Ready to start" : "Adjust camera"}
        </p>
        <p className="mt-1 text-base font-bold leading-relaxed text-[#394B45]">
          {allVisible && poseUsable
            ? mode === "reach" || mode === "seated"
              ? "One hand is visible enough for this activity."
              : "Required joints are visible enough for this activity."
            : allVisible
              ? "Tracking points are detected, but the stage is not stable yet."
              : mode === "reach" || mode === "seated"
                ? "Raise one open hand where the camera can see it."
                : "Show every required joint before treating the session as usable."}
        </p>
      </div>
      {hasPartialVisibility ? (
        <div className="mt-3 rounded-lg border-2 border-[#F6C85F] bg-white p-4">
          <p className="text-lg font-black">Partial visibility</p>
          <p className="mt-2 text-base font-bold leading-relaxed text-[#394B45]">
            {partialVisibilityMessage(missingLabels)}
          </p>
        </div>
      ) : null}
      <div className="mt-3 grid gap-3">
        {groupStates.map((group) => {
          const visible = group.visible;
          return (
            <div
              key={group.label}
              className={`rounded-lg p-3 ${
                visible ? "bg-[#D8F3DC]" : "bg-[#FFE8A3]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-black ${
                    visible
                      ? "bg-[#075E54] text-white"
                      : "bg-[#10231F] text-white"
                  }`}
                >
                  {visible ? "✓" : "!"}
                </span>
                <span className="text-lg font-black">{group.label}</span>
              </div>
              {!visible ? (
                <p className="mt-2 text-base font-bold leading-relaxed text-[#394B45]">
                  {group.help}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NoCameraProductPath() {
  return (
    <div className="mt-5 rounded-lg border-2 border-[#075E54] bg-[#FFF8E7] p-4">
      <p className="text-xl font-black">No camera is not a dead end</p>
      <p className="mt-2 text-base font-bold leading-relaxed text-[#394B45]">
        The home screen still shows the product promise, research boundary,
        privacy layer and safe demo report. The fallback remains labeled so
        judges can inspect the full flow without confusing it with live data.
      </p>
    </div>
  );
}

function isGroupVisible(
  group: { indexes: number[] },
  landmarks: NormalizedLandmark[],
) {
  return group.indexes.every((index) => {
    const point = landmarks[index];
    return isVisibleLandmark(point, DIAGNOSTIC_VISIBILITY_THRESHOLD);
  });
}

function buildCameraEvidenceText({
  mode,
  title,
  confidence,
  status,
  error,
  isReady,
  poseUsable,
  landmarks,
  cameraDiagnostics,
}: {
  mode: PoseMode;
  title: string;
  confidence: PoseConfidence;
  status: string;
  error: string | null;
  isReady: boolean;
  poseUsable: boolean;
  landmarks: NormalizedLandmark[];
  cameraDiagnostics: string[];
}) {
  const groups = JOINT_GROUPS[mode].map((group) => {
    const visible = group.indexes.every((index) =>
      isVisibleLandmark(landmarks[index], DIAGNOSTIC_VISIBILITY_THRESHOLD),
    );
    return `${group.label}: ${visible ? "visible" : "missing"}`;
  });
  const visibleKeypoints = countVisibleLandmarks(
    landmarks,
    JOINT_GROUPS[mode].flatMap((group) => group.indexes),
    DIAGNOSTIC_VISIBILITY_THRESHOLD,
  );

  return [
    "MotionQuest live camera evidence",
    `timestamp: ${new Date().toISOString()}`,
    `url: ${typeof window !== "undefined" ? window.location.href : "unknown"}`,
    `stage: ${title}`,
    `mode: ${mode}`,
    `cameraActive: ${isReady ? "yes" : "no"}`,
    `poseConfidence: ${confidence}`,
    `stageTrackingUsable: ${poseUsable ? "yes" : "no"}`,
    `status: ${status}`,
    `error: ${error ?? "none"}`,
    `visibleKeypoints: ${visibleKeypoints}`,
    `jointGroups: ${groups.join("; ")}`,
    `cameraDiagnostics: ${
      cameraDiagnostics.length > 0 ? cameraDiagnostics.join(" | ") : "none"
    }`,
    "setupTarget: seated/reach modes need one visible open hand; standing mode needs shoulders/hips/knees",
  ].join("\n");
}

function StageStatusItem({
  tone,
  children,
}: {
  tone: "success" | "warning" | "error";
  children: ReactNode;
}) {
  const styles = {
    success: {
      wrap: "bg-[#D8F3DC] text-[#10231F]",
      symbol: "✓",
      symbolClass: "bg-[#075E54] text-white",
    },
    warning: {
      wrap: "bg-[#FFE8A3] text-[#10231F]",
      symbol: "!",
      symbolClass: "bg-[#10231F] text-white",
    },
    error: {
      wrap: "bg-[#8A1C1C] text-white",
      symbol: "!",
      symbolClass: "bg-white text-[#8A1C1C]",
    },
  }[tone];

  return (
    <div className={`flex items-start gap-3 rounded-lg p-3 ${styles.wrap}`}>
      <span
        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-black ${styles.symbolClass}`}
      >
        {styles.symbol}
      </span>
      <span>{children}</span>
    </div>
  );
}

function confidenceLabel(
  confidence: PoseConfidence,
  mode: PoseMode,
  status: string,
) {
  if (confidence === "high") return "Tracking: High";
  if (confidence === "medium") return "Tracking: Medium";
  if (mode === "seated" || mode === "reach") {
    if (/stable|visible/i.test(status)) return "Tracking: Hand visible";
    return "Tracking: Need hand";
  }
  return "Move into frame";
}

function modeLabel(mode: PoseMode) {
  if (mode === "chair") return "Chair Stand";
  if (mode === "seated") return "Seated Adaptive";
  if (mode === "reach") return "Reach Stars";
  return "Calibration";
}
