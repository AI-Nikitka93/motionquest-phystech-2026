"use client";

import type { ReactNode } from "react";
import { usePoseTracking } from "@/hooks/usePoseTracking";
import {
  LANDMARK_VISIBILITY_THRESHOLD,
  isVisibleLandmark,
  type NormalizedLandmark,
  type PoseConfidence,
  type PoseMode,
} from "@/lib/gameLogic";

export type CameraStageRenderProps = ReturnType<typeof usePoseTracking>;
export type CameraTrackingData = Pick<
  CameraStageRenderProps,
  "landmarks" | "confidence" | "status" | "error" | "isReady"
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
    startCamera,
  } = usePoseTracking(mode, autoStart);
  const trackingData: CameraTrackingData = {
    landmarks,
    confidence,
    status,
    error,
    isReady,
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
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
          {confidenceLabel(confidence)}
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
          This stage verifies body visibility, camera readiness and pose model
          status before the report treats the session as usable practice data.
        </p>
        <div className="mt-5 space-y-4 text-xl leading-relaxed">
          <StageStatusItem tone={confidence !== "low" ? "success" : "warning"}>
            {mode === "seated"
              ? "Shoulders, elbows and wrists are visible"
              : "Shoulders, hips and knees are visible"}
          </StageStatusItem>
          <StageStatusItem tone={isReady ? "success" : "warning"}>
            Camera is active
          </StageStatusItem>
          <StageStatusItem tone={!error ? "success" : "error"}>
            {error ? "Camera/model needs attention" : "Pose model is ready"}
          </StageStatusItem>
        </div>
        <JointVisibilityPanel mode={mode} landmarks={landmarks} />
        {error ? (
          <div className="mt-6 rounded-lg bg-[#8A1C1C] p-4 text-base font-bold leading-relaxed text-white">
            <p className="text-xl font-black">{recoveryTitle(error)}</p>
            <p className="mt-2">{error}</p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              {recoverySteps(error).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {!isReady ? (
          <button
            type="button"
            onClick={() => void startCamera()}
            className="mt-6 min-h-14 w-full rounded-xl bg-[#075E54] px-7 text-xl font-bold text-white hover:bg-[#064C45] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
          >
            Start Camera Check
          </button>
        ) : null}
      </aside>
    </section>
  );
}

function recoveryTitle(error: string) {
  if (error.includes("Pose model could not load")) {
    return "Pose model loading failed";
  }
  if (error.includes("permission is blocked")) {
    return "Camera permission blocked";
  }
  if (error.includes("No usable camera")) {
    return "Camera not found";
  }
  return "Camera issue";
}

function recoverySteps(error: string) {
  if (error.includes("Pose model could not load")) {
    return [
      "Check internet connection.",
      "Reload the HTTPS page.",
      "Use labeled safe demo data if the stage network blocks model files.",
    ];
  }
  if (error.includes("permission is blocked")) {
    return [
      "Click the browser camera icon and allow access.",
      "Keep using the HTTPS production URL.",
      "Press Start Camera Check again after permission changes.",
    ];
  }
  if (error.includes("No usable camera")) {
    return [
      "Connect a webcam or enable the built-in camera.",
      "Close privacy shutters or OS camera blockers.",
      "Use safe demo data only as a clearly labeled fallback.",
    ];
  }
  return [
    "Close other apps using the camera.",
    "Improve lighting and reload the page.",
    "Use safe demo data only as a clearly labeled fallback.",
  ];
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
      label: "Shoulders",
      indexes: [11, 12],
      help: "Shoulders anchor the reach frame.",
    },
    {
      label: "Elbows",
      indexes: [13, 14],
      help: "Elbows help show arm extension.",
    },
    {
      label: "Wrists",
      indexes: [15, 16],
      help: "Wrists must be visible to hit stars.",
    },
    {
      label: "Hips",
      indexes: [23, 24],
      help: "Hips keep the body frame stable.",
    },
  ],
  seated: [
    {
      label: "Shoulders",
      indexes: [11, 12],
      help: "Keep upper body centered while seated.",
    },
    {
      label: "Elbows",
      indexes: [13, 14],
      help: "Keep elbows in frame for arm movement counting.",
    },
    {
      label: "Wrists",
      indexes: [15, 16],
      help: "Wrists must be visible for seated movement and reach.",
    },
    {
      label: "Hips",
      indexes: [23, 24],
      help: "Hips help confirm a stable seated frame when visible.",
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
  const allVisible =
    requiredGroups.length > 0 &&
    requiredGroups.every((group) =>
      group.indexes.every((index) => {
        const point = landmarks[index];
        return isVisibleLandmark(point, LANDMARK_VISIBILITY_THRESHOLD);
      }),
    );

  return (
    <div className="mt-5 rounded-lg border-2 border-[#D8F3DC] bg-[#FFF8E7] p-4">
      <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
        Required joints
      </p>
      <div
        className={`mt-3 rounded-lg p-4 ${
          allVisible ? "bg-[#D8F3DC]" : "bg-[#FFE8A3]"
        }`}
      >
        <p className="text-xl font-black">
          {allVisible ? "Ready to start" : "Adjust camera"}
        </p>
        <p className="mt-1 text-base font-bold leading-relaxed text-[#394B45]">
          {allVisible
            ? "Required joints are visible enough for this activity."
            : "Show every required joint before treating the session as usable."}
        </p>
      </div>
      <div className="mt-3 grid gap-3">
        {requiredGroups.map((group) => {
          const visible = group.indexes.every((index) => {
            const point = landmarks[index];
            return isVisibleLandmark(point, LANDMARK_VISIBILITY_THRESHOLD);
          });
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

function confidenceLabel(confidence: PoseConfidence) {
  if (confidence === "high") return "Tracking: High";
  if (confidence === "medium") return "Tracking: Medium";
  return "Move into frame";
}

function modeLabel(mode: PoseMode) {
  if (mode === "chair") return "Chair Stand";
  if (mode === "seated") return "Seated Adaptive";
  if (mode === "reach") return "Reach Stars";
  return "Calibration";
}
