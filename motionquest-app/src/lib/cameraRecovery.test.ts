import assert from "node:assert/strict";
import test from "node:test";
import {
  cameraRecoveryContent,
  classifyCameraIssue,
  isPreparingStatus,
  partialVisibilityMessage,
} from "./cameraRecovery";

test("no-camera flow remains a useful product explanation", () => {
  const content = cameraRecoveryContent(
    "No usable camera was found. Connect a webcam or use the labeled safe demo.",
  );

  assert.equal(content.issue, "no-camera");
  assert.equal(classifyCameraIssue("No usable camera was found"), "no-camera");
  assert.match(content.explanation, /product still explains/);
  assert.match(content.reassurance, /not a dead end/);
  assert.match(content.steps.join(" "), /safe demo/i);
});

test("permission-denied flow includes plain recovery and privacy reassurance", () => {
  const content = cameraRecoveryContent(
    "Camera permission is blocked. Allow camera access in the browser.",
  );

  assert.equal(content.issue, "permission-denied");
  assert.match(content.explanation, /denied camera access/);
  assert.match(content.reassurance, /video is not saved/);
  assert.match(content.steps.join(" "), /browser camera icon/);
});

test("preparing state detects loading and starting statuses", () => {
  assert.equal(isPreparingStatus("Loading pose model"), true);
  assert.equal(isPreparingStatus("Starting camera"), true);
  assert.equal(isPreparingStatus("Tracking stable body pose"), false);
});

test("camera-start-failed flow separates detected device from no camera", () => {
  const content = cameraRecoveryContent(
    "The camera was found but the video source timed out before frames arrived.",
  );

  assert.equal(content.issue, "camera-start-failed");
  assert.equal(
    classifyCameraIssue("AbortError: Timeout starting video source"),
    "camera-start-failed",
  );
  assert.match(content.explanation, /can see a camera device/);
  assert.match(content.reassurance, /not a movement score/);
  assert.match(content.steps.join(" "), /reconnect the USB webcam/i);
});

test("unsupported browser camera runtime is not treated as missing hardware", () => {
  const content = cameraRecoveryContent(
    "Browser camera runtime is not supported in this browser mode.",
  );

  assert.equal(content.issue, "browser-unsupported");
  assert.equal(
    classifyCameraIssue("NotSupportedError: Not supported"),
    "browser-unsupported",
  );
  assert.match(content.explanation, /browser can see a camera path/i);
  assert.match(content.steps.join(" "), /regular Chrome or Edge window/i);
});

test("partial visibility message names missing signals", () => {
  assert.equal(
    partialVisibilityMessage(["Left hand", "Right hand"]),
    "Partial visibility: missing Left hand, Right hand. Adjust only those signals before treating the session as usable.",
  );
});
