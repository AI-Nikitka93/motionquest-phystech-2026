import { existsSync, readFileSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, resolve } from "node:path";

const appRoot = resolve(process.cwd());
const projectRoot = resolve(appRoot, "..");
const args = new Set(process.argv.slice(2));
const publicSmokeDryRun = args.has("--public-smoke-dry-run");

const checks = [];
const problems = [];

const requiredLocalFiles = [
  "README.md",
  "AGENTS.md",
  "docs/STATE.md",
  "docs/EXEC_PLAN.md",
  "docs/PROJECT_MAP.md",
  "docs/MOTIONQUEST_WORLD_CLASS_MASTER_BRIEF.md",
  "docs/MOTIONQUEST_FULL_RELEASE_MASTER_TODO_2026_05_06.md",
  "docs/DEVPOST_SUBMISSION_COPY.md",
  "docs/FINAL_SUBMISSION_CHECKLIST.md",
  "docs/PRESENTATION_SCRIPT.md",
  "docs/JUDGE_QA_ANSWER_BANK.md",
  "docs/JUDGING_CLAIMS_AND_LIMITS.md",
  "docs/RELEASE_EVIDENCE_2026_05_05.md",
  "docs/POST_CONTEST_CONTINUITY.md",
  "evidence/submission-proof/README.md",
  "output/README.md",
  "output/devpost-screenshots/README.md",
  "output/demo-video/README.md",
  "output/playwright/README.md",
];

const requiredLocalArtifacts = [
  "output/devpost-screenshots/01-home-desktop.png",
  "output/devpost-screenshots/02-seated-adaptive-stage.png",
  "output/devpost-screenshots/03-reach-stars-stage.png",
  "output/devpost-screenshots/04-caregiver-report.png",
  "output/devpost-screenshots/05-home-mobile.png",
  "output/devpost-screenshots/06-evidence-surface-before-after.png",
  "output/devpost-screenshots/07-safe-demo-fallback-banner.png",
  "output/demo-video/motionquest-adaptive-demo.webm",
  "output/playwright/public-link-clean-browser-current-home-2026-06-04.png",
  "output/playwright/public-link-clean-browser-current-report-2026-06-04.png",
  "output/playwright/public-link-clean-browser-current-github-2026-06-04.png",
];

const completedLocalTasks = [
  "T142",
  "T143",
  "T144",
  "T145",
  "T148",
  "T149",
  "T150",
  "T151",
  "T152",
  "T153",
  "T154",
  "T155",
  "T156",
  "T157",
  "T159",
  "T162",
  "T164",
  "T165",
  "T166",
  "T167",
  "T168",
  "T169",
  "T170",
  "T174",
  "T175",
  "T176",
  "T177",
  "T178",
  "T179",
  "T187",
  "T191",
  "T192",
  "T193",
  "T194",
  "T195",
  "T196",
  "T197",
  "T198",
  "T202",
  "T203",
  "T204",
  "T205",
  "T206",
  "T207",
  "T208",
  "T209",
];

const submissionProofFiles = [
  "evidence/submission-proof/devpost-submission-confirmation.png",
  "evidence/submission-proof/presentation-registration-confirmation.png",
  "evidence/submission-proof/public-link-clean-browser.png",
  "evidence/submission-proof/public-link-clean-browser.json",
  "evidence/submission-proof/discord-schedule-or-zoom-note.png",
  "evidence/submission-proof/submission-proof-notes.md",
];

const realCameraProofFiles = [
  "evidence/camera-smoke/home-calibration.png",
  "evidence/camera-smoke/chair-stand-tracking.png",
  "evidence/camera-smoke/reach-stars-tracking.png",
  "evidence/camera-smoke/caregiver-report.png",
  "evidence/camera-smoke/live-evidence.txt",
];

const publicPackagePathspecs = [
  "README.md",
  "AGENTS.md",
  "DESIGN.md",
  "research-synthesis-MotionQuest.md",
  "УСЛОВИЯ.txt",
  "docs",
  "motionquest-app",
  "output",
];

const publicSmokeSpecs = [
  {
    name: "production_app",
    url: "https://motionquest-app.vercel.app",
    expected: ["MotionQuest", "Adaptive Home Movement Lab", "Safe demo"],
  },
  {
    name: "public_source",
    url: "https://github.com/AI-Nikitka93/motionquest-phystech-2026",
    expected: ["motionquest-phystech-2026"],
  },
  {
    name: "raw_readme",
    url: "https://raw.githubusercontent.com/AI-Nikitka93/motionquest-phystech-2026/master/README.md",
    expected: ["MotionQuest", "Adaptive Home Movement Lab", "caregiver-readable"],
  },
  {
    name: "devpost",
    url: "https://phystech-2026.devpost.com/",
    expected: ["Physical Activity and Technology Hack Day"],
  },
  {
    name: "binnovative",
    url: "https://binnovative-boston.github.io/phystech/2026.html",
    expected: ["PhysTech 2026"],
  },
];

const todoText = readProjectFile("docs/MOTIONQUEST_FULL_RELEASE_MASTER_TODO_2026_05_06.md");
const stateText = readProjectFile("docs/STATE.md");
const rootReadmeText = readProjectFile("README.md");
const appReadmeText = readAppFile("README.md");
const devpostCopyText = readProjectFile("docs/DEVPOST_SUBMISSION_COPY.md");
const finalChecklistText = readProjectFile("docs/FINAL_SUBMISSION_CHECKLIST.md");
const presentationScriptText = readProjectFile("docs/PRESENTATION_SCRIPT.md");
const finalRehearsalText = readProjectFile("docs/FINAL_REHEARSAL_PLAN.md");
const judgeQaText = readProjectFile("docs/JUDGE_QA_ANSWER_BANK.md");
const releaseEvidenceText = readProjectFile("docs/RELEASE_EVIDENCE_2026_05_05.md");
const visualSpecText = readProjectFile("docs/visual-spec.md");
const appMetadataText = readAppFile("src/app/layout.tsx");
const packageJson = JSON.parse(readFileSync(join(appRoot, "package.json"), "utf8"));
const publicFramingText = [
  rootReadmeText,
  appReadmeText,
  devpostCopyText,
  judgeQaText,
  visualSpecText,
  appMetadataText,
].join("\n");

const stalePublicFramingPatterns = [
  /webcam exergame prototype/i,
  /Camera-only exergame prototype/i,
  /Two quick movement games/i,
  /Stand so your shoulders/i,
  /validated 30-second chair stand/i,
  /validated chair stand scoring/i,
  /shoulder-elbow-wrist/i,
  /Pose-only/i,
  /browser pose landmarks/i,
];

const finalPublicLinkScreenshot = hasPlausibleImageProof("evidence/submission-proof/public-link-clean-browser.png");
const finalPublicLinkManifest = hasPublicLinkProofManifest("evidence/submission-proof/public-link-clean-browser.json");

const proof = {
  devpostSubmission: hasPlausibleImageProof("evidence/submission-proof/devpost-submission-confirmation.png"),
  presentationRegistration: hasPlausibleImageProof("evidence/submission-proof/presentation-registration-confirmation.png"),
  finalPublicLinkScreenshot,
  finalPublicLinkManifest,
  finalPublicLink: finalPublicLinkScreenshot && finalPublicLinkManifest,
  scheduleOrZoom: hasPlausibleImageProof("evidence/submission-proof/discord-schedule-or-zoom-note.png"),
  submissionNotes: hasSubmissionProofNotes("evidence/submission-proof/submission-proof-notes.md"),
  realCamera: hasRealCameraProof(),
};

const gitPublication = getGitPublicationInfo(args.has("--public-smoke"));

for (const file of requiredLocalFiles) {
  check("local_package", `required file exists: ${file}`, isNonEmpty(join(projectRoot, file)));
}

for (const file of requiredLocalArtifacts) {
  check("local_package", `required artifact exists: ${file}`, isNonEmpty(join(projectRoot, file)));
}

for (const task of completedLocalTasks) {
  check("local_package", `${task} is locally closed`, hasTaskStatus(todoText, task, "x"));
}

checkBoundaryTask("T146", "registration process is not closed without presentation-registration proof", proof.presentationRegistration);
checkBoundaryTask("T147", "judge-openable public proof is not closed without final public-link proof", proof.finalPublicLink);
checkBoundaryTask("T158", "clean-browser public-link check is not closed without final public-link proof", proof.finalPublicLink);
checkBoundaryTask("T160", "Phase 8 acceptance is not closed without final public-link proof", proof.finalPublicLink);
checkBoundaryTask("T161", "Phase 8 anchor is not closed without final public-link proof", proof.finalPublicLink);
checkBoundaryTask("T163", "standing proof is not closed without real-camera evidence", proof.realCamera);
checkBoundaryTask("T171", "close seated real-camera proof is not closed without real-camera evidence", proof.realCamera);
checkBoundaryTask("T172", "standing real-camera proof is not closed without real-camera evidence", proof.realCamera);
checkBoundaryTask("T173", "manual camera review is not closed without real-camera evidence", proof.realCamera);
checkBoundaryTask("T180", "Phase 9 release readiness is not closed without public and camera proof", proof.finalPublicLink && proof.realCamera);
checkBoundaryTask("T181", "Phase 9 anchor is not closed without public and camera proof", proof.finalPublicLink && proof.realCamera);
checkBoundaryTask("T182", "Devpost submission is not closed without Devpost confirmation proof", proof.devpostSubmission);
checkBoundaryTask("T183", "presentation registration is not closed without registration proof", proof.presentationRegistration);
checkBoundaryTask("T184", "official public verification is not closed without final public-link proof", proof.finalPublicLink);
checkBoundaryTask("T185", "live-path rehearsal is not closed without submission notes", proof.submissionNotes);
checkBoundaryTask("T186", "judge Q&A rehearsal is not closed without submission notes", proof.submissionNotes);
checkBoundaryTask("T188", "post-presentation feedback is not closed without submission notes", proof.submissionNotes);
checkBoundaryTask("T189", "judge-question issue log is not closed without submission notes", proof.submissionNotes);
checkBoundaryTask("T190", "feedback classification is not closed without submission notes", proof.submissionNotes);
checkBoundaryTask("T199", "final retrospective is not closed without submission notes", proof.submissionNotes);
checkBoundaryTask("T200", "Phase 10 acceptance is not closed without submission and feedback notes", proof.submissionNotes);
checkBoundaryTask("T201", "Phase 10 anchor is not closed without submission and feedback notes", proof.submissionNotes);
checkBoundaryTask("T210", "Phase 11 acceptance is not closed without submission and feedback notes", proof.submissionNotes);
checkBoundaryTask("T211", "Phase 11 anchor is not closed without submission and feedback notes", proof.submissionNotes);

check("local_package", "package exposes project:readiness", Boolean(packageJson.scripts?.["project:readiness"]));
check("local_package", "package exposes project:final-audit", Boolean(packageJson.scripts?.["project:final-audit"]));
check("local_package", "package exposes project:capture-public-proof", Boolean(packageJson.scripts?.["project:capture-public-proof"]));
check("local_package", "public proof capture helper exists", isNonEmpty(join(appRoot, "scripts/capture-public-proof.mjs")));
check("local_package", "public metadata uses Adaptive Home Movement Lab title", appMetadataText.includes("MotionQuest: Adaptive Home Movement Lab"));
check(
  "local_package",
  "public metadata uses caregiver-readable report description",
  appMetadataText.includes("Webcam movement practice for older adults and seated users, ending in a caregiver-readable report."),
);
check(
  "local_package",
  "public framing avoids stale prototype and stand-only wording",
  stalePublicFramingPatterns.every((pattern) => !pattern.test(publicFramingText)),
);
check(
  "local_package",
  "public framing describes seated hand movement and caregiver report",
  ["seated hand movement", "Hand Landmarker", "caregiver-readable"].every((term) => publicFramingText.includes(term)),
);
check("local_package", "Devpost copy contains production app link", devpostCopyText.includes("https://motionquest-app.vercel.app"));
check("local_package", "Devpost copy contains public source link", devpostCopyText.includes("https://github.com/AI-Nikitka93/motionquest-phystech-2026"));
check("local_package", "Devpost copy keeps three-award story", ["Research", "Social Impact", "Entrepreneurship"].every((term) => devpostCopyText.includes(term)));
check(
  "local_package",
  "official rule sources include Devpost and Binnovative",
  ["https://phystech-2026.devpost.com/", "https://binnovative-boston.github.io/phystech/2026.html"].every((url) => finalChecklistText.includes(url)),
);
check(
  "local_package",
  "final checklist includes Europe/Minsk deadline conversions",
  [
    "June 27, 2026, 19:00 Europe/Minsk",
    "June 28, 2026, 17:00 Europe/Minsk",
  ].every((term) => finalChecklistText.includes(term)),
);
check(
  "local_package",
  "final checklist records prize wording source mismatch",
  finalChecklistText.includes("Prize wording differs") && finalChecklistText.includes("Do not depend on exact award names"),
);
check(
  "local_package",
  "presentation script preserves 7-minute story and 3-minute Q&A buffer",
  hasPresentationTimebox(presentationScriptText, devpostCopyText),
);
check(
  "local_package",
  "live demo runbook preserves 90-second path to report",
  hasNinetySecondDemoRunbook(presentationScriptText),
);
check(
  "local_package",
  "rehearsal plan records timing and Q&A practice loop",
  hasRehearsalTimingLoop(finalRehearsalText),
);
check("local_package", "release evidence records preliminary clean-browser smoke", releaseEvidenceText.includes("Preliminary clean-browser public-link smoke"));
check("boundary", "state records local changes newer than latest recorded deployment or final public proof exists", stateText.includes("local dependency, UX-fix and artifact refresh is newer than that recorded deployment") || proof.finalPublicLink);

check("public_publication", "T147 judge-openable public proof is closed", hasTaskStatus(todoText, "T147", "x"));
check("public_publication", "T158 final clean-browser public-link check is closed", hasTaskStatus(todoText, "T158", "x"));
check("public_publication", "final public-link clean-browser screenshot proof is plausible", proof.finalPublicLinkScreenshot);
check("public_publication", "final public-link proof manifest is plausible", proof.finalPublicLinkManifest);
check("public_publication", "public package paths have no unpublished local changes", gitPublication.cleanPublicPackage);
check("public_publication", "public smoke checked remote branch freshness", gitPublication.remoteChecked);
check("public_publication", "remote branch matches local HEAD", gitPublication.remoteMatchesHead);

for (const file of submissionProofFiles) {
  if (file.endsWith(".png")) {
    check("external_submission", `final public-action screenshot proof is plausible: ${file}`, hasPlausibleImageProof(file));
  } else if (file.endsWith(".json")) {
    check("external_submission", `final public-action manifest proof is plausible: ${file}`, hasPublicLinkProofManifest(file));
  } else {
    check("external_submission", `final public-action notes contain real proof fields: ${file}`, hasSubmissionProofNotes(file));
  }
}

check("real_camera", "real-camera screenshots are plausible image files", realCameraProofFiles.filter((file) => file.endsWith(".png")).every(hasPlausibleImageProof));
check("real_camera", "live-evidence.txt contains cameraActive/stageTrackingUsable/error proof", hasLiveCameraEvidence("evidence/camera-smoke/live-evidence.txt"));

const publicSmokeResults = args.has("--public-smoke") ? await runPublicSmoke() : [];
if (args.has("--public-smoke")) {
  check(
    "public_publication",
    "public smoke content matches expected current public surfaces",
    publicSmokeResults.every((result) => result.status >= 200 && result.status < 400 && result.contentOk),
  );
}

const decisions = {
  local_package: decide("local_package"),
  boundary: decide("boundary"),
  public_publication: decide("public_publication"),
  external_submission: decide("external_submission"),
  real_camera_evidence: decide("real_camera"),
  final_submission: "NO-GO",
};

if (
  decisions.local_package === "GO" &&
  decisions.boundary === "GO" &&
  decisions.public_publication === "GO" &&
  decisions.external_submission === "GO" &&
  decisions.real_camera_evidence === "GO"
) {
  decisions.final_submission = "GO";
}

printAudit(decisions, publicSmokeResults);

if (decisions.local_package !== "GO" || decisions.boundary !== "GO") {
  problems.push("local package or boundary audit failed");
}

if (args.has("--require-final-go") && decisions.final_submission !== "GO") {
  problems.push("final submission is still NO-GO");
}

if (problems.length > 0) {
  process.exit(1);
}

function check(group, label, passed) {
  checks.push({ group, label, passed });
}

function checkBoundaryTask(task, label, proofExists) {
  check("boundary", label, hasTaskStatus(todoText, task, " ") || (hasTaskStatus(todoText, task, "x") && proofExists));
}

function decide(group) {
  return checks.filter((item) => item.group === group).every((item) => item.passed) ? "GO" : "NO-GO";
}

function readProjectFile(relativePath) {
  const path = join(projectRoot, relativePath);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function readAppFile(relativePath) {
  const path = join(appRoot, relativePath);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function isNonEmpty(path) {
  return existsSync(path) && statSync(path).isFile() && statSync(path).size > 0;
}

function hasPlausibleImageProof(relativePath) {
  const path = join(projectRoot, relativePath);
  return isNonEmpty(path) && statSync(path).size >= 10_000;
}

function hasSubmissionProofNotes(relativePath) {
  const text = readProjectFile(relativePath);
  const requiredFields = [
    "PROOF_STATUS: REAL",
    "Final app link:",
    "Final source/package link:",
    "Devpost submission timestamp:",
    "Presentation registration timestamp:",
    "Clean-browser proof file:",
  ];
  return requiredFields.every((field) => text.includes(field)) && !/template|pending|todo|tbd|placeholder/i.test(text);
}

function hasPresentationTimebox(scriptText, submissionText) {
  const requiredScriptSnippets = [
    "Time limit: 10 minutes total, including about 3 minutes Q&A",
    "Recommended structure: 7-minute story + 3-minute Q&A buffer",
    "| 0:00-0:45 | Hook |",
    "| 6:20-7:00 | Limits and next step |",
    "| 7:00-10:00 | Q&A |",
  ];
  const requiredSubmissionSnippets = [
    "10 minute presentation including Q&A",
    "7-minute story plus 3-minute Q&A buffer",
  ];
  return requiredScriptSnippets.every((snippet) => scriptText.includes(snippet))
    && requiredSubmissionSnippets.every((snippet) => submissionText.includes(snippet));
}

function hasNinetySecondDemoRunbook(scriptText) {
  const requiredSnippets = [
    "## T156 — 90-Second Live Demo Runbook",
    "| 0-10s | Open Home |",
    "| 20-30s | Click `Seated adaptive` |",
    "| 45-60s | Finish early, start Reach Stars |",
    "| 60-75s | Click `Finish & View Report` |",
    "| 75-90s | Show report/export/limitations |",
    "The report includes confidence and limits, so we do not overclaim.",
  ];
  return requiredSnippets.every((snippet) => scriptText.includes(snippet));
}

function hasRehearsalTimingLoop(rehearsalText) {
  const requiredSnippets = [
    "Run three rehearsals:",
    "Full 7-minute story without interruption.",
    "Full 90-second demo inside the story.",
    "Full Q&A practice with hard questions",
    "total time;",
    "Presentation timebox recovery:",
    "Preserve Q&A time",
  ];
  return requiredSnippets.every((snippet) => rehearsalText.includes(snippet));
}

function hasPublicLinkProofManifest(relativePath) {
  const text = readProjectFile(relativePath);
  if (!text || /template|pending|todo|tbd|placeholder/i.test(text)) {
    return false;
  }

  let manifest;
  try {
    manifest = JSON.parse(text);
  } catch {
    return false;
  }

  const requiredChecks = [
    {
      name: "production app",
      url: "https://motionquest-app.vercel.app",
      expected: ["MotionQuest", "Adaptive Home Movement Lab", "Safe demo"],
    },
    {
      name: "public source",
      url: "https://github.com/AI-Nikitka93/motionquest-phystech-2026",
      expected: ["motionquest-phystech-2026"],
    },
    {
      name: "raw README",
      url: "https://raw.githubusercontent.com/AI-Nikitka93/motionquest-phystech-2026/master/README.md",
      expected: ["MotionQuest", "Adaptive Home Movement Lab", "caregiver-readable"],
    },
  ];
  const capturedAtStart = Date.parse(manifest.capturedAtStart ?? "");
  const capturedAtEnd = Date.parse(manifest.capturedAtEnd ?? "");

  return manifest.PROOF_STATUS === "REAL"
    && manifest.generatedBy === "npm run project:capture-public-proof"
    && manifest.sideEffects === "does not submit, register, push or deploy"
    && manifest.screenshot === "evidence/submission-proof/public-link-clean-browser.png"
    && manifest.appUrl === requiredChecks[0].url
    && manifest.sourceUrl === requiredChecks[1].url
    && manifest.rawReadmeUrl === requiredChecks[2].url
    && Number.isFinite(capturedAtStart)
    && Number.isFinite(capturedAtEnd)
    && capturedAtEnd >= capturedAtStart
    && Array.isArray(manifest.checks)
    && requiredChecks.every((requiredCheck) => {
      const actualCheck = manifest.checks.find((checkItem) => checkItem.name === requiredCheck.name);
      return actualCheck
        && actualCheck.url === requiredCheck.url
        && Number.isInteger(actualCheck.status)
        && actualCheck.status >= 200
        && actualCheck.status < 400
        && Array.isArray(actualCheck.expected)
        && requiredCheck.expected.every((snippet) => actualCheck.expected.includes(snippet))
        && actualCheck.contentOk === true
        && Array.isArray(actualCheck.missing)
        && actualCheck.missing.length === 0
        && (requiredCheck.name === "production app"
          ? actualCheck.screenshot === "evidence/submission-proof/public-link-clean-browser.png"
          : actualCheck.screenshot === null);
    });
}

function hasLiveCameraEvidence(relativePath) {
  const text = readProjectFile(relativePath);
  const requiredSnippets = [
    "MotionQuest live camera evidence",
    "cameraActive: yes",
    "stageTrackingUsable: yes",
    "error: none",
    "mode: chair",
    "mode: reach",
  ];
  return requiredSnippets.every((snippet) => text.includes(snippet)) && !/safe demo|fake camera|placeholder|template/i.test(text);
}

function hasRealCameraProof() {
  return realCameraProofFiles
    .filter((file) => file.endsWith(".png"))
    .every(hasPlausibleImageProof) && hasLiveCameraEvidence("evidence/camera-smoke/live-evidence.txt");
}

function getGitPublicationInfo(requireRemoteCheck) {
  const status = runGit(["status", "--porcelain", "--", ...publicPackagePathspecs]);
  const branchResult = runGit(["branch", "--show-current"]);
  const headResult = runGit(["rev-parse", "--verify", "HEAD"]);
  const branch = branchResult.stdout.trim() || "HEAD";
  const head = headResult.stdout.trim();
  const cleanPublicPackage = status.ok && status.stdout.trim().length === 0;
  const dirtyCount = status.stdout.trim() ? status.stdout.trim().split(/\r?\n/).length : 0;

  if (!requireRemoteCheck) {
    return {
      cleanPublicPackage,
      remoteChecked: false,
      remoteMatchesHead: false,
      summary: `public-package-dirty=${dirtyCount}; remote-check=not-run; branch=${branch}; head=${head || "unknown"}`,
    };
  }

  const remote = runGit(["ls-remote", "--heads", "origin", branch]);
  const remoteHead = remote.stdout.trim().split(/\s+/)[0] ?? "";
  const remoteMatchesHead = Boolean(head && remoteHead && head === remoteHead);
  return {
    cleanPublicPackage,
    remoteChecked: remote.ok && Boolean(remoteHead),
    remoteMatchesHead,
    summary: `public-package-dirty=${dirtyCount}; remote-check=${remote.ok ? "ok" : "failed"}; branch=${branch}; head=${head || "unknown"}; remoteHead=${remoteHead || "unknown"}`,
  };
}

function runGit(gitArgs) {
  const result = spawnSync("git", gitArgs, {
    cwd: projectRoot,
    encoding: "utf8",
    shell: false,
  });
  return {
    ok: result.status === 0,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

function hasTaskStatus(text, task, status) {
  return text.includes(`[${status}] ${task} `);
}

async function runPublicSmoke() {
  const results = [];
  for (const spec of publicSmokeSpecs) {
    let timeout;
    try {
      const controller = new AbortController();
      timeout = setTimeout(() => controller.abort(), 20_000);
      const response = await fetch(spec.url, { signal: controller.signal });
      const text = await response.text();
      const normalizedText = text.toLowerCase();
      const missing = spec.expected.filter((snippet) => !normalizedText.includes(snippet.toLowerCase()));
      results.push({
        name: spec.name,
        url: spec.url,
        status: response.status,
        contentOk: missing.length === 0,
        missing,
      });
    } catch (error) {
      results.push({ name: spec.name, url: spec.url, error: String(error), contentOk: false, missing: spec.expected });
    } finally {
      clearTimeout(timeout);
    }
  }
  return results;
}

function printAudit(decisions, publicSmokeResults) {
  console.log("MotionQuest final submission audit");
  console.log("-----------------------------------");
  for (const [name, decision] of Object.entries(decisions)) {
    console.log(`${name}: ${decision}`);
  }
  console.log("");
  console.log("NO-GO is expected until final deploy/push, Devpost submission, presentation registration, official public-link proof and real camera evidence exist.");
  console.log("");
  printGroup("local_package");
  printGroup("boundary");
  printGroup("public_publication");
  printGroup("external_submission");
  printGroup("real_camera");
  console.log(`git_publication_status: ${gitPublication.summary}`);
  console.log("");
  if (publicSmokeResults.length > 0) {
    console.log("public_smoke:");
    for (const result of publicSmokeResults) {
      const content = result.contentOk ? "; content OK" : `; content MISSING: ${(result.missing ?? []).join(", ")}`;
      const status = result.error ? result.error : `HTTP ${result.status}${content}`;
      console.log(`- ${result.name}: ${status}`);
    }
  }
  if (publicSmokeDryRun) {
    console.log("public_smoke_requirements:");
    for (const spec of publicSmokeSpecs) {
      console.log(`- ${spec.name} requires: ${spec.expected.join("; ")}`);
    }
  }
}

function printGroup(group) {
  console.log(`${group}:`);
  for (const item of checks.filter((checkItem) => checkItem.group === group)) {
    console.log(`- ${item.passed ? "OK" : "MISSING"} ${item.label}`);
  }
  console.log("");
}
