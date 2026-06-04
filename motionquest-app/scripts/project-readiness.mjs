import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const appRoot = resolve(process.cwd());
const projectRoot = resolve(appRoot, "..");

const requiredProjectFiles = [
  "AGENTS.md",
  "УСЛОВИЯ.txt",
  "research-synthesis-MotionQuest.md",
  "docs/STATE.md",
  "docs/EXEC_PLAN.md",
  "docs/PROJECT_HISTORY.md",
  "docs/DECISIONS.md",
  "docs/PROJECT_MAP.md",
  "docs/MOTIONQUEST_WORLD_CLASS_MASTER_BRIEF.md",
  "docs/MOTIONQUEST_FULL_RELEASE_MASTER_TODO_2026_05_06.md",
  "docs/CAMERA_SMOKE_TEST_PROTOCOL.md",
  "evidence/camera-smoke/README.md",
];

const requiredProjectDirectories = [
  "docs",
  "evidence/camera-smoke",
  "output/devpost-screenshots",
  "output/demo-video",
];

const requiredArtifactFiles = [
  "output/devpost-screenshots/01-home-desktop.png",
  "output/devpost-screenshots/02-seated-adaptive-stage.png",
  "output/devpost-screenshots/03-reach-stars-stage.png",
  "output/devpost-screenshots/04-caregiver-report.png",
  "output/devpost-screenshots/05-home-mobile.png",
  "output/demo-video/motionquest-adaptive-demo.webm",
];

const requiredAppFiles = [
  "package.json",
  "src/components/MotionQuestApp.tsx",
  "src/components/CameraStage.tsx",
  "src/hooks/usePoseTracking.ts",
  "src/lib/gameLogic.ts",
  "src/lib/sessionStorage.ts",
  "src/lib/cameraRecovery.ts",
  "src/lib/visualSystem.ts",
  "tests/e2e/motionquest-flow.spec.ts",
  "scripts/final-submission-audit.mjs",
  "scripts/capture-public-proof.mjs",
];

const requiredInstructionContracts = [
  { file: "AGENTS.md", text: "No-secret workflow rule" },
  { file: "AGENTS.md", text: "Codebase impact checklist" },
  { file: "AGENTS.md", text: "Dependency audit checklist" },
  { file: "AGENTS.md", text: "Agent handoff checklist" },
  { file: "AGENTS.md", text: "Verification contract" },
  { file: "AGENTS.md", text: "Camera limitation notes" },
  { file: "AGENTS.md", text: "Branch and change hygiene" },
  { file: "AGENTS.md", text: "Release evidence structure" },
  { file: "docs/PROJECT_MAP.md", text: "Artifact Ownership Map" },
  { file: "docs/STATE.md", text: "Phase 7 acceptance" },
];

const forbiddenBackendPaths = [
  "src/app/api",
  "src/pages/api",
  "prisma",
  "drizzle",
  "supabase",
  "server",
];

const requiredScripts = ["build", "lint", "test", "test:e2e", "project:readiness", "project:final-audit", "project:capture-public-proof"];
const allowedDependencies = new Set([
  "@mediapipe/tasks-vision",
  "next",
  "react",
  "react-dom",
]);
const allowedDevDependencies = new Set([
  "@playwright/test",
  "@tailwindcss/postcss",
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "eslint",
  "eslint-config-next",
  "tailwindcss",
  "tsx",
  "typescript",
]);
const requiredVerificationCommands = [
  "npm run project:readiness",
  "npm test",
  "npm run lint",
  "npm run build",
  "npm audit --audit-level=moderate",
  "E2E_APP_URL=http://localhost:3013 npm run test:e2e",
];
const problems = [];

for (const file of requiredProjectFiles) {
  assertExists(join(projectRoot, file), `missing project file: ${file}`);
  assertNonEmpty(join(projectRoot, file), `empty project file: ${file}`);
}

for (const directory of requiredProjectDirectories) {
  assertDirectory(join(projectRoot, directory), `missing project directory: ${directory}`);
}

for (const file of requiredArtifactFiles) {
  assertExists(join(projectRoot, file), `missing artifact file: ${file}`);
  assertNonEmpty(join(projectRoot, file), `empty artifact file: ${file}`);
}

for (const file of requiredAppFiles) {
  assertExists(join(appRoot, file), `missing app file: ${file}`);
  assertNonEmpty(join(appRoot, file), `empty app file: ${file}`);
}

const packageJson = JSON.parse(readFileSync(join(appRoot, "package.json"), "utf8"));
for (const script of requiredScripts) {
  if (!packageJson.scripts?.[script]) {
    problems.push(`missing package script: ${script}`);
  }
}

for (const dependency of Object.keys(packageJson.dependencies ?? {})) {
  if (!allowedDependencies.has(dependency)) {
    problems.push(`unexpected runtime dependency requires review: ${dependency}`);
  }
}

for (const dependency of Object.keys(packageJson.devDependencies ?? {})) {
  if (!allowedDevDependencies.has(dependency)) {
    problems.push(`unexpected dev dependency requires review: ${dependency}`);
  }
}

for (const contract of requiredInstructionContracts) {
  const filePath = join(projectRoot, contract.file);
  const text = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  if (!text.includes(contract.text)) {
    problems.push(`missing instruction contract "${contract.text}" in ${contract.file}`);
  }
}

const agentsText = readFileSync(join(projectRoot, "AGENTS.md"), "utf8");
for (const command of requiredVerificationCommands) {
  if (!agentsText.includes(command)) {
    problems.push(`missing verification command in AGENTS.md: ${command}`);
  }
}

for (const path of forbiddenBackendPaths) {
  const absolutePath = join(appRoot, path);
  if (existsSync(absolutePath)) {
    problems.push(`backend/auth/database path is not allowed for MVP: ${path}`);
  }
}

for (const file of collectFiles(projectRoot, ["AGENTS.md", "docs", "motionquest-app/package.json", "motionquest-app/scripts", "motionquest-app/src", ".github"])) {
  const text = readFileSync(file, "utf8");
  if (/(sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}|AIza[0-9A-Za-z_-]{20,}|xox[baprs]-[A-Za-z0-9-]{20,})/.test(text)) {
    problems.push(`possible committed secret in ${file.replace(projectRoot, ".")}`);
  }
}

if (problems.length > 0) {
  console.error("MotionQuest readiness check failed:");
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exit(1);
}

console.log("MotionQuest readiness check passed.");
console.log(`Checked ${requiredProjectFiles.length} project files.`);
console.log(`Checked ${requiredProjectDirectories.length} project directories.`);
console.log(`Checked ${requiredArtifactFiles.length} release artifacts.`);
console.log(`Checked ${requiredAppFiles.length} app files.`);
console.log(`Checked ${requiredInstructionContracts.length} agent workflow instruction contracts.`);
console.log(`Checked ${Object.keys(packageJson.dependencies ?? {}).length} runtime dependencies.`);
console.log(`Checked ${Object.keys(packageJson.devDependencies ?? {}).length} development dependencies.`);
console.log("No backend/auth/database paths detected for MVP.");
console.log("No obvious token patterns detected in project instructions/docs/src.");

function assertExists(path, message) {
  if (!existsSync(path)) {
    problems.push(message);
  }
}

function assertDirectory(path, message) {
  if (!existsSync(path) || !statSync(path).isDirectory()) {
    problems.push(message);
  }
}

function assertNonEmpty(path, message) {
  if (existsSync(path) && statSync(path).isFile() && statSync(path).size === 0) {
    problems.push(message);
  }
}

function collectFiles(root, entries) {
  const files = [];
  for (const entry of entries) {
    const absolutePath = join(root, entry);
    if (!existsSync(absolutePath)) continue;
    const stats = statSync(absolutePath);
    if (stats.isFile()) {
      files.push(absolutePath);
      continue;
    }
    walk(absolutePath, files);
  }
  return files;
}

function walk(directory, files) {
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    if (item.name === "node_modules" || item.name === ".next" || item.name === ".git") {
      continue;
    }
    const absolutePath = join(directory, item.name);
    if (item.isDirectory()) {
      walk(absolutePath, files);
    } else if (/\.(md|txt|ts|tsx|json|js|mjs)$/.test(item.name)) {
      files.push(absolutePath);
    }
  }
}
