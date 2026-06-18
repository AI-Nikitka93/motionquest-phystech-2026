"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NormalizedLandmark, PoseConfidence, PoseMode } from "@/lib/gameLogic";
import {
  countVisibleLandmarks,
  getPoseConfidence,
  hasUsablePose,
  isVisibleLandmark,
} from "@/lib/gameLogic";

type PoseLandmarkerInstance = {
  detectForVideo: (
    video: HTMLVideoElement,
    timestampMs: number,
  ) => { landmarks?: NormalizedLandmark[][] };
};

type HandLandmarkerInstance = {
  detectForVideo: (
    video: HTMLVideoElement,
    timestampMs: number,
  ) => { landmarks?: NormalizedLandmark[][] };
};

type CameraAttempt = {
  label: string;
  constraints: MediaStreamConstraints;
};

type VisionDelegate = "GPU" | "CPU";

export type HandSignalStability = {
  frames: number;
  point?: NormalizedLandmark;
  stable?: boolean;
};

const TASKS_VERSION = "0.10.35";
const WASM_ROOT = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${TASKS_VERSION}/wasm`;
const POSE_LITE_MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task";
const POSE_FULL_MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task";
const HAND_MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task";

const CHAIR_CONNECTIONS = [
  [11, 12],
  [11, 23],
  [12, 24],
  [23, 24],
  [23, 25],
  [25, 27],
  [24, 26],
  [26, 28],
] as const;

const REACH_CONNECTIONS = [] as const;

const KEY_POINTS: Record<PoseMode, number[]> = {
  calibration: [11, 12, 23, 24, 25, 26, 27, 28],
  chair: [11, 12, 23, 24, 25, 26, 27, 28],
  seated: [15, 16],
  reach: [15, 16],
};

const SMOOTHING_ALPHA = 0.38;
const MAX_MISSING_FRAMES_BEFORE_CLEAR = 8;
const DIAGNOSTIC_VISIBILITY_THRESHOLD = 0.3;
export const HAND_STABLE_FRAME_THRESHOLD = 4;
const MAX_HAND_FRAME_JUMP = 0.28;

export function usePoseTracking(mode: PoseMode, autoStart = false) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const landmarkerRef = useRef<PoseLandmarkerInstance | null>(null);
  const handmarkerRef = useRef<HandLandmarkerInstance | null>(null);
  const frameRef = useRef<number | null>(null);
  const runFrameRef = useRef<() => void>(() => undefined);
  const streamRef = useRef<MediaStream | null>(null);
  const smoothedLandmarksRef = useRef<NormalizedLandmark[]>([]);
  const missingFramesRef = useRef(0);
  const handSignalStabilityRef = useRef<HandSignalStability>({ frames: 0 });
  const lastVideoTimeRef = useRef<number | null>(null);

  const [landmarks, setLandmarks] = useState<NormalizedLandmark[]>([]);
  const [confidence, setConfidence] = useState<PoseConfidence>("low");
  const [status, setStatus] = useState("Camera not started");
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraDiagnostics, setCameraDiagnostics] = useState<string[]>([]);

  const drawOverlay = useCallback(
    (points: NormalizedLandmark[]) => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const width = video.videoWidth || 960;
      const height = video.videoHeight || 720;
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      if (!context) return;

      context.clearRect(0, 0, width, height);
      if (points.length === 0) return;

      const connections =
        mode === "reach" || mode === "seated"
          ? REACH_CONNECTIONS
          : CHAIR_CONNECTIONS;

      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = 12;
      context.strokeStyle = "rgba(255,255,255,0.85)";
      for (const [from, to] of connections) {
        drawLine(context, points[from], points[to], width, height);
      }

      context.lineWidth = 8;
      context.strokeStyle = "rgba(124,247,212,0.86)";
      for (const [from, to] of connections) {
        drawLine(context, points[from], points[to], width, height);
      }

      for (const index of KEY_POINTS[mode]) {
        const point = points[index];
        if (!isVisibleLandmark(point)) continue;
        const radius =
          (mode === "reach" || mode === "seated") &&
          (index === 15 || index === 16)
            ? 10
            : 8;
        const x = point.x * width;
        const y = point.y * height;
        context.beginPath();
        context.arc(x, y, radius + 3, 0, Math.PI * 2);
        context.fillStyle = "rgba(16,35,31,0.88)";
        context.fill();
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = "#FFE66D";
        context.fill();
      }
    },
    [mode],
  );

  useEffect(() => {
    runFrameRef.current = () => {
      const landmarker = landmarkerRef.current;
      const handmarker = handmarkerRef.current;
      const video = videoRef.current;

      if (landmarker && video && video.readyState >= 2) {
        if (!shouldRunVideoDetection(video.currentTime, lastVideoTimeRef.current)) {
          frameRef.current = window.requestAnimationFrame(runFrameRef.current);
          return;
        }
        lastVideoTimeRef.current = video.currentTime;

        const now = performance.now();
        const result = landmarker.detectForVideo(video, now);
        const rawPoseLandmarks = result.landmarks?.[0] ?? [];
        const handResult =
          mode === "seated" || mode === "reach"
            ? handmarker?.detectForVideo(video, now)
            : undefined;
        const rawLandmarks = mergeHandLandmarksIntoPose(
          rawPoseLandmarks,
          handResult?.landmarks ?? [],
          mode,
        );
        const handStability = updateHandSignalStability(
          handSignalStabilityRef.current,
          rawLandmarks,
          mode,
        );
        handSignalStabilityRef.current = handStability;
        const rawUsable = hasUsablePose(rawLandmarks, mode);
        const usable = rawUsable && handStability.stable !== false;
        const displayRawLandmarks =
          rawUsable && !usable
            ? hideHandTrackingLandmarks(rawLandmarks, mode)
            : rawLandmarks;

        if (usable || rawUsable || hasDiagnosticPose(rawLandmarks, mode)) {
          missingFramesRef.current = 0;
          const nextLandmarks = smoothLandmarks(
            smoothedLandmarksRef.current,
            displayRawLandmarks,
          );
          smoothedLandmarksRef.current = nextLandmarks;
          setLandmarks(nextLandmarks);
          setConfidence(usable ? getPoseConfidence(nextLandmarks, mode) : "low");
          setStatus(
            trackingStatusForFrame(mode, usable, rawUsable, rawLandmarks),
          );
          drawOverlay(nextLandmarks);
        } else {
          missingFramesRef.current += 1;
          handSignalStabilityRef.current = { frames: 0 };
          setConfidence("low");
          setStatus(framingHint(mode, rawLandmarks));
          if (mode === "seated" || mode === "reach") {
            const nextLandmarks = hideHandTrackingLandmarks(rawLandmarks, mode);
            smoothedLandmarksRef.current = nextLandmarks;
            setLandmarks(nextLandmarks);
            drawOverlay(nextLandmarks);
          } else if (missingFramesRef.current >= MAX_MISSING_FRAMES_BEFORE_CLEAR) {
            smoothedLandmarksRef.current = [];
            setLandmarks([]);
            drawOverlay([]);
          }
        }
      }

      frameRef.current = window.requestAnimationFrame(runFrameRef.current);
    };
  }, [drawOverlay, mode]);

  const startCamera = useCallback(async () => {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    smoothedLandmarksRef.current = [];
    missingFramesRef.current = 0;
    handSignalStabilityRef.current = { frames: 0 };
    lastVideoTimeRef.current = null;
    setLandmarks([]);
    drawOverlay([]);
    setConfidence("low");
    setIsReady(false);
    setCameraDiagnostics([]);
    setError(null);

    try {
      setStatus("Starting camera");
      const { stream, diagnostics } = await requestCameraStream();
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        await waitForVideoFrames(videoRef.current, diagnostics);
      }

      const videoSettings = stream.getVideoTracks()[0]?.getSettings();
      setCameraDiagnostics([
        ...diagnostics,
        `active settings: ${formatTrackSettings(videoSettings)}`,
        ...getCameraFitNotes(videoSettings),
      ]);
      setIsReady(true);
      setStatus("Loading pose model");
    } catch (cause) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setError(formatCameraError(cause));
      setStatus("Demo mode available");
      if (isCameraStartError(cause)) {
        setCameraDiagnostics(cause.diagnostics);
      }
      return;
    }

    try {
      const vision = await import("@mediapipe/tasks-vision");
      const filesetResolver = await vision.FilesetResolver.forVisionTasks(WASM_ROOT);
      try {
        landmarkerRef.current = (await vision.PoseLandmarker.createFromOptions(
          filesetResolver,
          buildPoseLandmarkerOptions(mode, "GPU"),
        )) as PoseLandmarkerInstance;
      } catch {
        landmarkerRef.current = (await vision.PoseLandmarker.createFromOptions(
          filesetResolver,
          buildPoseLandmarkerOptions(mode, "CPU"),
        )) as PoseLandmarkerInstance;
      }

      if (mode === "seated" || mode === "reach") {
        try {
          handmarkerRef.current = (await vision.HandLandmarker.createFromOptions(
            filesetResolver,
            buildHandLandmarkerOptions("GPU"),
          )) as HandLandmarkerInstance;
        } catch {
          handmarkerRef.current = (await vision.HandLandmarker.createFromOptions(
            filesetResolver,
            buildHandLandmarkerOptions("CPU"),
          )) as HandLandmarkerInstance;
        }
      }
    } catch {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setIsReady(false);
      setError(
        "Pose model could not load. Check internet connection, reload the page, or use safe demo data for the presentation fallback.",
      );
      setStatus("Pose model needs retry");
      return;
    }

    setStatus("Move into frame for body tracking");
    frameRef.current = window.requestAnimationFrame(runFrameRef.current);
  }, [drawOverlay, mode]);

  useEffect(() => {
    let autoStartTimer: number | null = null;
    if (autoStart) {
      autoStartTimer = window.setTimeout(() => void startCamera(), 0);
    }

    return () => {
      if (autoStartTimer !== null) {
        window.clearTimeout(autoStartTimer);
      }
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [autoStart, startCamera]);

  return {
    videoRef,
    canvasRef,
    landmarks,
    confidence,
    status,
    error,
    isReady,
    cameraDiagnostics,
    startCamera,
  };
}

export function buildPoseLandmarkerOptions(
  mode: PoseMode,
  delegate: VisionDelegate,
) {
  const needsFullBody = mode === "chair" || mode === "calibration";

  return {
    baseOptions: {
      modelAssetPath: needsFullBody ? POSE_FULL_MODEL_URL : POSE_LITE_MODEL_URL,
      delegate,
    },
    runningMode: "VIDEO",
    numPoses: 1,
    minPoseDetectionConfidence: 0.6,
    minPosePresenceConfidence: 0.6,
    minTrackingConfidence: 0.6,
  } as const;
}

export function buildHandLandmarkerOptions(delegate: VisionDelegate) {
  return {
    baseOptions: {
      modelAssetPath: HAND_MODEL_URL,
      delegate,
    },
    runningMode: "VIDEO",
    numHands: 2,
    minHandDetectionConfidence: 0.5,
    minHandPresenceConfidence: 0.5,
    minTrackingConfidence: 0.5,
  } as const;
}

export function shouldRunVideoDetection(
  currentVideoTime: number,
  previousVideoTime: number | null,
) {
  return previousVideoTime === null || currentVideoTime !== previousVideoTime;
}

class CameraStartError extends Error {
  constructor(
    message: string,
    public diagnostics: string[],
    public causeName: string,
  ) {
    super(message);
    this.name = causeName;
  }
}

async function requestCameraStream() {
  const diagnostics: string[] = [];
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoInputs = devices.filter((device) => device.kind === "videoinput");
  diagnostics.push(
    `video inputs: ${
      videoInputs.length > 0
        ? videoInputs.map((device) => device.label || "unlabeled camera").join(", ")
        : "none"
    }`,
  );

  const attempts = buildCameraAttempts();

  let lastError: unknown = null;
  for (const attempt of attempts) {
    try {
      diagnostics.push(`attempt: ${attempt.label}`);
      const stream = await navigator.mediaDevices.getUserMedia(attempt.constraints);
      diagnostics.push(`attempt result: ${attempt.label} ok`);
      return { stream, diagnostics };
    } catch (cause) {
      lastError = cause;
      diagnostics.push(
        `attempt result: ${attempt.label} failed: ${formatCauseName(cause)} ${
          cause instanceof Error ? cause.message : ""
        }`.trim(),
      );
    }
  }

  throw new CameraStartError(
    lastError instanceof Error
      ? lastError.message
      : "Camera stream could not start.",
    diagnostics,
    formatCauseName(lastError),
  );
}

export function buildCameraAttempts(): CameraAttempt[] {
  return [
    {
      label: "stable 4:3 presenter camera",
      constraints: {
        audio: false,
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          aspectRatio: { ideal: 4 / 3 },
          frameRate: { ideal: 24, max: 30 },
          facingMode: { ideal: "user" },
        },
      },
    },
    {
      label: "browser default camera",
      constraints: {
        audio: false,
        video: true,
      },
    },
    {
      label: "presenter HD ideal",
      constraints: {
        audio: false,
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: { ideal: "user" },
        },
      },
    },
    {
      label: "stable VGA fallback",
      constraints: {
        audio: false,
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 15, max: 24 },
          facingMode: { ideal: "user" },
        },
      },
    },
  ];
}

function formatTrackSettings(settings: MediaTrackSettings | undefined) {
  if (!settings) return "unknown";
  const parts = [
    settings.deviceId ? "deviceId=present" : null,
    settings.width ? `width=${settings.width}` : null,
    settings.height ? `height=${settings.height}` : null,
    settings.frameRate ? `frameRate=${settings.frameRate}` : null,
    settings.facingMode ? `facingMode=${settings.facingMode}` : null,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "unknown";
}

export function getCameraFitNotes(
  settings:
    | Pick<MediaTrackSettings, "width" | "height" | "frameRate">
    | undefined,
) {
  if (!settings) return [];

  const notes: string[] = [];
  const { width, height, frameRate } = settings;

  if (width && height) {
    const aspectRatio = width / height;
    if (Math.abs(aspectRatio - 4 / 3) <= 0.12) {
      notes.push("camera fit: 4:3 stable presenter frame");
    } else if (aspectRatio >= 1.6) {
      notes.push(
        "camera fit: wide frame may crop standing body; use seated adaptive or step back",
      );
    }
  }

  if (frameRate && frameRate < 18) {
    notes.push(
      "camera fit: low frame rate can make landmarks jump; close other camera apps",
    );
  }

  return notes;
}

function formatCauseName(cause: unknown) {
  if (cause instanceof DOMException || cause instanceof Error) {
    return cause.name;
  }
  return "UnknownError";
}

function isCameraStartError(cause: unknown): cause is CameraStartError {
  return Boolean(
    cause &&
      typeof cause === "object" &&
      Array.isArray((cause as { diagnostics?: unknown }).diagnostics),
  );
}

export function mergeHandLandmarksIntoPose(
  poseLandmarks: NormalizedLandmark[],
  handLandmarks: NormalizedLandmark[][],
  mode: PoseMode,
) {
  if (mode !== "seated" && mode !== "reach") {
    return poseLandmarks;
  }

  const merged: NormalizedLandmark[] = Array.from(
    { length: Math.max(33, poseLandmarks.length) },
    (_, index) =>
      poseLandmarks[index] ?? {
        x: 0,
        y: 0,
        visibility: 0,
      },
  );

  if (mode === "reach") {
    merged[15] = hiddenLandmark();
    merged[16] = hiddenLandmark();
  }

  if (handLandmarks.length === 0) {
    return merged;
  }

  for (const hand of handLandmarks) {
    const wrist = hand[0];
    if (!isVisibleLandmark(wrist, 0.2)) continue;

    const wristIndex = wrist.x < 0.5 ? 15 : 16;
    const palm = mode === "reach" ? palmCenter(hand) : null;
    if (mode === "reach" && !palm) continue;
    const targetPoint = palm ?? wrist;
    merged[wristIndex] = {
      x: targetPoint.x,
      y: targetPoint.y,
      z: targetPoint.z,
      visibility: 0.96,
    };

    if (mode === "reach") {
      merged.push(
        ...hand.map((point) => ({
          x: point.x,
          y: point.y,
          z: point.z,
          visibility: point.visibility ?? 1,
        })),
      );
    }
  }

  return merged;
}

function hiddenLandmark(): NormalizedLandmark {
  return { x: 0, y: 0, visibility: 0 };
}

function hideHandTrackingLandmarks(
  landmarks: NormalizedLandmark[],
  mode: PoseMode,
) {
  if (mode !== "seated" && mode !== "reach") {
    return landmarks;
  }

  const next = landmarks.slice(0, Math.max(33, landmarks.length));
  next[15] = hiddenLandmark();
  next[16] = hiddenLandmark();
  if (mode === "reach") {
    return next.slice(0, 33);
  }
  return next;
}

export function updateHandSignalStability(
  previous: HandSignalStability,
  landmarks: NormalizedLandmark[],
  mode: PoseMode,
): HandSignalStability {
  if (mode !== "seated" && mode !== "reach") {
    return { frames: HAND_STABLE_FRAME_THRESHOLD, stable: true };
  }

  const point = primaryVisibleHandPoint(landmarks);
  if (!point) {
    return { frames: 0, stable: false };
  }

  const jumped =
    previous.point && distance(previous.point, point) > MAX_HAND_FRAME_JUMP;
  const frames = jumped ? 1 : previous.frames + 1;

  return {
    frames,
    point,
    stable: frames >= HAND_STABLE_FRAME_THRESHOLD,
  };
}

function primaryVisibleHandPoint(landmarks: NormalizedLandmark[]) {
  const candidates = [landmarks[15], landmarks[16]].filter((point) =>
    isVisibleLandmark(point, 0.42),
  );
  return candidates[0];
}

function distance(first: NormalizedLandmark, second: NormalizedLandmark) {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

function palmCenter(hand: NormalizedLandmark[]) {
  const palmPoints = [5, 9, 13, 17]
    .map((index) => hand[index])
    .filter((point) => isVisibleLandmark(point, 0.2));

  if (palmPoints.length < 3) {
    return null;
  }

  return {
    x: palmPoints.reduce((sum, point) => sum + point.x, 0) / palmPoints.length,
    y: palmPoints.reduce((sum, point) => sum + point.y, 0) / palmPoints.length,
    z:
      palmPoints.reduce((sum, point) => sum + (point.z ?? 0), 0) /
      palmPoints.length,
    visibility: Math.max(...palmPoints.map((point) => point.visibility ?? 1)),
  };
}

function formatCameraError(cause: unknown) {
  const causeName = formatCauseName(cause);
  const causeMessage = cause instanceof Error ? cause.message : "";

  if (cause instanceof DOMException || isCameraStartError(cause)) {
    if (causeName === "NotAllowedError" || causeName === "SecurityError") {
      return "Camera permission is blocked. Allow camera access in the browser, keep the HTTPS page open, then press Start Camera Check again.";
    }
    if (causeName === "NotFoundError" || causeName === "OverconstrainedError") {
      return "No usable camera was found. Connect a webcam or use the labeled safe demo report until a real camera is available.";
    }
    if (causeName === "NotReadableError") {
      return "The camera is busy in another app. Close the other camera app, reload this page, then retry.";
    }
    if (causeName === "AbortError") {
      return "The camera was found but the video source did not start. Close other camera tabs/apps, reconnect the webcam, then retry the camera check.";
    }
    if (causeName === "NotSupportedError") {
      return "Browser camera runtime is not supported in this browser mode. Open the HTTPS page in a regular Chrome or Edge window, then retry Start Camera Check.";
    }
  }

  if (
    causeMessage.toLowerCase().includes("not supported")
  ) {
    return "No usable camera was found. Connect a webcam, enable browser camera support, or use the labeled safe demo report until a real camera is available.";
  }

  if (causeMessage.toLowerCase().includes("timeout starting video source")) {
    return "The camera was found but the video source timed out before frames arrived. Close other camera tabs/apps, reconnect the webcam, then retry the camera check.";
  }

  return causeMessage
    ? `${causeName}: ${causeMessage}`
    : "Camera needs attention. Check camera permission, lighting, and browser support.";
}

function waitForVideoFrames(video: HTMLVideoElement, diagnostics: string[]) {
  if (hasVideoFrame(video)) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    let frameId: number | null = null;
    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(
        new CameraStartError(
          "The camera was found but the video source timed out before frames arrived.",
          [
            ...diagnostics,
            `video element: readyState=${video.readyState}, width=${video.videoWidth}, height=${video.videoHeight}`,
          ],
          "AbortError",
        ),
      );
    }, 5000);

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      video.removeEventListener("loadeddata", check);
      video.removeEventListener("playing", check);
    };

    const check = () => {
      if (hasVideoFrame(video)) {
        cleanup();
        resolve();
        return;
      }
      frameId = window.requestAnimationFrame(check);
    };

    video.addEventListener("loadeddata", check);
    video.addEventListener("playing", check);
    check();
  });
}

function hasVideoFrame(video: HTMLVideoElement) {
  return video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
    video.videoWidth > 0 &&
    video.videoHeight > 0;
}

function drawLine(
  context: CanvasRenderingContext2D,
  from: NormalizedLandmark | undefined,
  to: NormalizedLandmark | undefined,
  width: number,
  height: number,
) {
  if (!from || !to) return;
  if (
    !isVisibleLandmark(from, DIAGNOSTIC_VISIBILITY_THRESHOLD) ||
    !isVisibleLandmark(to, DIAGNOSTIC_VISIBILITY_THRESHOLD)
  ) {
    return;
  }

  context.beginPath();
  context.moveTo(from.x * width, from.y * height);
  context.lineTo(to.x * width, to.y * height);
  context.stroke();
}

function smoothLandmarks(
  previous: NormalizedLandmark[],
  next: NormalizedLandmark[],
) {
  if (previous.length !== next.length || previous.length === 0) {
    return next;
  }

  return next.map((point, index) => {
    const prior = previous[index];
    if (!prior || !isVisibleLandmark(point, 0.25)) {
      return point;
    }

    return {
      x: prior.x + (point.x - prior.x) * SMOOTHING_ALPHA,
      y: prior.y + (point.y - prior.y) * SMOOTHING_ALPHA,
      z:
        prior.z !== undefined && point.z !== undefined
          ? prior.z + (point.z - prior.z) * SMOOTHING_ALPHA
          : point.z,
      visibility: point.visibility,
    };
  });
}

function framingHint(mode: PoseMode, landmarks: NormalizedLandmark[]) {
  if (mode === "reach") {
    return "Show one open palm with fingers visible inside the frame";
  }
  if (mode === "seated") {
    return "Show one open palm with fingers visible, then raise and lower it";
  }

  const upperBodyCandidate = countVisibleLandmarks(landmarks, [
    11, 12, 13, 14, 15, 16, 23, 24,
  ], DIAGNOSTIC_VISIBILITY_THRESHOLD);
  if (upperBodyCandidate >= 5) {
    return "Body frame unstable. Move hands away from the lens and show your shoulders and hips";
  }

  return "Step back until shoulders, hips and knees are visible";
}

function stableTrackingStatus(mode: PoseMode) {
  if (mode === "reach" || mode === "seated") {
    return "Tracking stable hand signal";
  }
  return "Tracking stable body pose";
}

export function trackingStatusForFrame(
  mode: PoseMode,
  usable: boolean,
  rawUsable: boolean,
  landmarks: NormalizedLandmark[],
) {
  if (usable) {
    return stableTrackingStatus(mode);
  }
  if ((mode === "reach" || mode === "seated") && rawUsable) {
    return "Keep one open palm steady with fingers visible";
  }
  return framingHint(mode, landmarks);
}

function hasDiagnosticPose(landmarks: NormalizedLandmark[], mode: PoseMode) {
  if (landmarks.length === 0) return false;

  if (mode === "seated" || mode === "reach") {
    return countVisibleLandmarks(
      landmarks,
      [15, 16],
      DIAGNOSTIC_VISIBILITY_THRESHOLD,
    ) >= 1;
  }

  return countVisibleLandmarks(
    landmarks,
    [11, 12, 23, 24, 25, 26],
    DIAGNOSTIC_VISIBILITY_THRESHOLD,
  ) >= 3;
}
