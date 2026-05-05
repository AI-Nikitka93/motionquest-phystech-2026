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

const TASKS_VERSION = "0.10.35";
const WASM_ROOT = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${TASKS_VERSION}/wasm`;
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task";

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

const REACH_CONNECTIONS = [
  [11, 12],
  [11, 13],
  [13, 15],
  [12, 14],
  [14, 16],
  [11, 23],
  [12, 24],
  [23, 24],
] as const;

const KEY_POINTS: Record<PoseMode, number[]> = {
  calibration: [11, 12, 23, 24, 25, 26, 27, 28],
  chair: [11, 12, 23, 24, 25, 26, 27, 28],
  seated: [11, 12, 13, 14, 15, 16, 23, 24],
  reach: [11, 12, 13, 14, 15, 16, 23, 24],
};

const SMOOTHING_ALPHA = 0.38;
const MAX_MISSING_FRAMES_BEFORE_CLEAR = 8;
const DIAGNOSTIC_VISIBILITY_THRESHOLD = 0.3;

export function usePoseTracking(mode: PoseMode, autoStart = false) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const landmarkerRef = useRef<PoseLandmarkerInstance | null>(null);
  const frameRef = useRef<number | null>(null);
  const runFrameRef = useRef<() => void>(() => undefined);
  const streamRef = useRef<MediaStream | null>(null);
  const smoothedLandmarksRef = useRef<NormalizedLandmark[]>([]);
  const missingFramesRef = useRef(0);

  const [landmarks, setLandmarks] = useState<NormalizedLandmark[]>([]);
  const [confidence, setConfidence] = useState<PoseConfidence>("low");
  const [status, setStatus] = useState("Camera not started");
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const video = videoRef.current;

      if (landmarker && video && video.readyState >= 2) {
        const result = landmarker.detectForVideo(video, performance.now());
        const rawLandmarks = result.landmarks?.[0] ?? [];
        const usable = hasUsablePose(rawLandmarks, mode);

        if (usable || hasDiagnosticPose(rawLandmarks, mode)) {
          missingFramesRef.current = 0;
          const nextLandmarks = smoothLandmarks(
            smoothedLandmarksRef.current,
            rawLandmarks,
          );
          smoothedLandmarksRef.current = nextLandmarks;
          setLandmarks(nextLandmarks);
          setConfidence(usable ? getPoseConfidence(nextLandmarks, mode) : "low");
          setStatus(
            usable ? "Tracking stable body pose" : framingHint(mode, nextLandmarks),
          );
          drawOverlay(nextLandmarks);
        } else {
          missingFramesRef.current += 1;
          setConfidence("low");
          setStatus(framingHint(mode, rawLandmarks));
          if (missingFramesRef.current >= MAX_MISSING_FRAMES_BEFORE_CLEAR) {
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
    try {
      setError(null);
      setStatus("Loading pose model");
      const vision = await import("@mediapipe/tasks-vision");
      const filesetResolver = await vision.FilesetResolver.forVisionTasks(WASM_ROOT);
      try {
        landmarkerRef.current = (await vision.PoseLandmarker.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath: MODEL_URL,
              delegate: "GPU",
            },
            runningMode: "VIDEO",
            numPoses: 1,
            minPoseDetectionConfidence: 0.45,
            minTrackingConfidence: 0.45,
          },
        )) as PoseLandmarkerInstance;
      } catch {
        landmarkerRef.current = (await vision.PoseLandmarker.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath: MODEL_URL,
              delegate: "CPU",
            },
            runningMode: "VIDEO",
            numPoses: 1,
            minPoseDetectionConfidence: 0.45,
            minTrackingConfidence: 0.45,
          },
        )) as PoseLandmarkerInstance;
      }
    } catch {
      setError(
        "Pose model could not load. Check internet connection, reload the page, or use safe demo data for the presentation fallback.",
      );
      setStatus("Model loading failed");
      return;
    }

    try {
      setStatus("Starting camera");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsReady(true);
      setStatus("Move into frame for body tracking");
      frameRef.current = window.requestAnimationFrame(runFrameRef.current);
    } catch (cause) {
      setError(formatCameraError(cause));
      setStatus("Demo mode available");
    }
  }, []);

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
    startCamera,
  };
}

function formatCameraError(cause: unknown) {
  if (cause instanceof DOMException) {
    if (cause.name === "NotAllowedError" || cause.name === "SecurityError") {
      return "Camera permission is blocked. Allow camera access in the browser, keep the HTTPS page open, then press Start Camera Check again.";
    }
    if (cause.name === "NotFoundError" || cause.name === "OverconstrainedError") {
      return "No usable camera was found. Connect a webcam or use the labeled safe demo report until a real camera is available.";
    }
    if (cause.name === "NotReadableError") {
      return "The camera is busy in another app. Close the other camera app, reload this page, then retry.";
    }
  }

  if (
    cause instanceof Error &&
    cause.message.toLowerCase().includes("not supported")
  ) {
    return "No usable camera was found. Connect a webcam, enable browser camera support, or use the labeled safe demo report until a real camera is available.";
  }

  return cause instanceof Error
    ? cause.message
    : "Camera failed. Check camera permission, lighting, and browser support.";
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
  const upperBodyCandidate = countVisibleLandmarks(landmarks, [
    11, 12, 13, 14, 15, 16, 23, 24,
  ], DIAGNOSTIC_VISIBILITY_THRESHOLD);
  if (upperBodyCandidate >= 5) {
    return mode === "reach"
      ? "Reach tracking unstable. Keep shoulders visible and raise one hand away from the lens"
      : mode === "seated"
        ? "Seated tracking unstable. Keep shoulders visible and raise one forearm away from the lens"
        : "Body frame unstable. Move hands away from the lens and show your shoulders and hips";
  }

  if (mode === "reach") {
    return "Show shoulders, then raise one hand until elbow and wrist are visible";
  }
  if (mode === "seated") {
    return "Keep shoulders in frame, then raise one forearm until elbow and wrist are visible";
  }
  return "Step back until shoulders, hips and knees are visible";
}

function hasDiagnosticPose(landmarks: NormalizedLandmark[], mode: PoseMode) {
  if (landmarks.length === 0) return false;

  if (mode === "seated" || mode === "reach") {
    return countVisibleLandmarks(
      landmarks,
      [11, 12, 13, 14, 15, 16],
      DIAGNOSTIC_VISIBILITY_THRESHOLD,
    ) >= 2;
  }

  return countVisibleLandmarks(
    landmarks,
    [11, 12, 23, 24, 25, 26],
    DIAGNOSTIC_VISIBILITY_THRESHOLD,
  ) >= 3;
}
