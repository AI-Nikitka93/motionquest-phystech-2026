export type CameraIssue =
  | "permission-denied"
  | "no-camera"
  | "browser-unsupported"
  | "model-load"
  | "camera-busy"
  | "camera-start-failed"
  | "generic";

export type CameraRecoveryContent = {
  issue: CameraIssue;
  title: string;
  explanation: string;
  reassurance: string;
  steps: string[];
};

export function classifyCameraIssue(error: string | null): CameraIssue {
  const value = error?.toLowerCase() ?? "";

  if (value.includes("permission") || value.includes("blocked")) {
    return "permission-denied";
  }

  if (value.includes("no usable camera") || value.includes("not found")) {
    return "no-camera";
  }

  if (
    value.includes("notsupportederror") ||
    value.includes("not supported") ||
    value.includes("browser camera runtime is not supported")
  ) {
    return "browser-unsupported";
  }

  if (value.includes("pose model could not load")) {
    return "model-load";
  }

  if (value.includes("another app") || value.includes("busy")) {
    return "camera-busy";
  }

  if (
    value.includes("video source did not start") ||
    value.includes("timed out") ||
    value.includes("timeout starting video source") ||
    value.includes("aborterror")
  ) {
    return "camera-start-failed";
  }

  return "generic";
}

export function cameraRecoveryContent(
  error: string | null,
): CameraRecoveryContent {
  const issue = classifyCameraIssue(error);

  if (issue === "permission-denied") {
    return {
      issue,
      title: "Camera permission blocked",
      explanation:
        "The browser denied camera access, so MotionQuest cannot observe movement yet.",
      reassurance:
        "Privacy remains under participant control: video is not saved, and camera access can be denied or changed in the browser at any time.",
      steps: [
        "Click the browser camera icon and allow access for this HTTPS page.",
        "Reload only after changing the browser permission.",
        "Use the labeled safe demo report if live camera access is not allowed on stage.",
      ],
    };
  }

  if (issue === "no-camera") {
    return {
      issue,
      title: "Camera not found",
      explanation:
        "No usable camera was found, but the product still explains the method, privacy promise and report outcome.",
      reassurance:
        "This is not a dead end: use the labeled safe demo report to show the caregiver artifact without pretending it is live camera data.",
      steps: [
        "Connect a webcam or enable the built-in camera.",
        "Close privacy shutters or operating-system camera blockers.",
        "Return to the home screen and use Safe Demo Data only as a clearly labeled fallback.",
      ],
    };
  }

  if (issue === "model-load") {
    return {
      issue,
      title: "Pose model needs retry",
      explanation:
        "The camera page opened, but the browser could not load the pose model files.",
      reassurance:
        "No video has been stored. The session should stay in fallback mode until the model loads normally.",
      steps: [
        "Check the internet connection.",
        "Reload the HTTPS page.",
        "Use labeled safe demo data if the stage network blocks model files.",
      ],
    };
  }

  if (issue === "browser-unsupported") {
    return {
      issue,
      title: "Camera runtime not supported",
      explanation:
        "The browser can see a camera path, but this browser mode cannot open a usable webcam stream for MotionQuest.",
      reassurance:
        "This is a browser/runtime limitation, not a movement result. No report should claim live observation until a real video stream starts.",
      steps: [
        "Open the HTTPS page in a regular Chrome or Edge window.",
        "Avoid embedded, remote, automation, privacy-hardened or headless browser modes for the live camera proof.",
        "Check Windows camera privacy access, then reload and retry Start Camera Check.",
        "Use labeled safe demo data only if live observation cannot be restored before judging.",
      ],
    };
  }

  if (issue === "camera-busy") {
    return {
      issue,
      title: "Camera is already in use",
      explanation:
        "Another app or browser tab is holding the camera, so MotionQuest cannot start observation.",
      reassurance:
        "Nothing is recorded while the camera is unavailable.",
      steps: [
        "Close other apps using the camera.",
        "Reload this page after releasing the camera.",
        "Use labeled safe demo data only if live observation cannot be restored.",
      ],
    };
  }

  if (issue === "camera-start-failed") {
    return {
      issue,
      title: "Camera detected but no frames arrived",
      explanation:
        "The browser can see a camera device, but the device did not deliver video frames for MotionQuest to analyze.",
      reassurance:
        "This is a device/browser startup failure, not a movement score. No report should claim live observation until frames arrive.",
      steps: [
        "Close other tabs or apps that may be holding the camera.",
        "Unplug and reconnect the USB webcam, then wait a few seconds.",
        "Reload the HTTPS page and retry Start Camera Check.",
        "If it still fails, use another browser or another webcam before recording live evidence.",
      ],
    };
  }

  return {
    issue,
    title: "Camera issue",
    explanation:
      "MotionQuest could not confirm a stable live camera session yet.",
    reassurance:
      "The report will clearly state when tracking is limited or not valid enough.",
    steps: [
      "Improve lighting and keep the body in frame.",
      "Reload the page if the camera does not recover.",
      "Use safe demo data only as a clearly labeled fallback.",
    ],
  };
}

export function isPreparingStatus(status: string) {
  return /loading|starting|preparing/i.test(status);
}

export function partialVisibilityMessage(missingLabels: string[]) {
  if (missingLabels.length === 0) {
    return "All required signals are visible.";
  }

  return `Partial visibility: missing ${missingLabels.join(
    ", ",
  )}. Adjust only those signals before treating the session as usable.`;
}
