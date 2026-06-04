import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { chromium } from "playwright";

const appRoot = resolve(process.cwd());
const projectRoot = resolve(appRoot, "..");
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");

const appUrl = process.env.FINAL_APP_URL ?? "https://motionquest-app.vercel.app";
const sourceUrl = process.env.FINAL_SOURCE_URL ?? "https://github.com/AI-Nikitka93/motionquest-phystech-2026";
const rawReadmeUrl = process.env.FINAL_RAW_README_URL ?? "https://raw.githubusercontent.com/AI-Nikitka93/motionquest-phystech-2026/master/README.md";
const outputRelativePath = "evidence/submission-proof/public-link-clean-browser.png";
const outputPath = join(projectRoot, outputRelativePath);
const manifestRelativePath = "evidence/submission-proof/public-link-clean-browser.json";
const manifestPath = join(projectRoot, manifestRelativePath);

const checks = [
  {
    name: "production app",
    url: appUrl,
    expected: ["MotionQuest", "Adaptive Home Movement Lab", "Safe demo"],
    screenshot: true,
  },
  {
    name: "public source",
    url: sourceUrl,
    expected: ["motionquest-phystech-2026"],
  },
  {
    name: "raw README",
    url: rawReadmeUrl,
    expected: ["MotionQuest", "Adaptive Home Movement Lab", "caregiver-readable"],
  },
];

printHeader();

if (dryRun) {
  printDryRun();
  process.exit(0);
}

const browser = await chromium.launch();
try {
  const capturedAtStart = new Date().toISOString();
  const results = [];
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  for (const check of checks) {
    const response = await page.goto(check.url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    const status = response?.status() ?? 0;
    if (status < 200 || status >= 400) {
      throw new Error(`${check.name} returned HTTP ${status || "unknown"}`);
    }
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => undefined);
    const bodyText = await page.locator("body").innerText({ timeout: 10_000 }).catch(async () => page.content());
    const normalizedText = bodyText.toLowerCase();
    const missing = check.expected.filter((snippet) => !normalizedText.includes(snippet.toLowerCase()));
    if (missing.length > 0) {
      throw new Error(`${check.name} is missing expected content: ${missing.join(", ")}`);
    }
    results.push({
      name: check.name,
      url: check.url,
      status,
      expected: check.expected,
      missing,
      contentOk: missing.length === 0,
      screenshot: check.screenshot ? outputRelativePath : null,
    });
    console.log(`OK ${check.name} content verified`);
    if (check.screenshot) {
      mkdirSync(resolve(outputPath, ".."), { recursive: true });
      await page.screenshot({ path: outputPath, fullPage: true });
      console.log(`WROTE ${outputRelativePath}`);
    }
  }
  mkdirSync(resolve(manifestPath, ".."), { recursive: true });
  writeFileSync(
    manifestPath,
    `${JSON.stringify({
      PROOF_STATUS: "REAL",
      generatedBy: "npm run project:capture-public-proof",
      sideEffects: "does not submit, register, push or deploy",
      capturedAtStart,
      capturedAtEnd: new Date().toISOString(),
      appUrl,
      sourceUrl,
      rawReadmeUrl,
      screenshot: outputRelativePath,
      checks: results,
    }, null, 2)}\n`,
    "utf8",
  );
  console.log(`WROTE ${manifestRelativePath}`);
} finally {
  await browser.close();
}

function printHeader() {
  console.log("MotionQuest public proof capture");
  console.log("--------------------------------");
}

function printDryRun() {
  console.log("does not submit, register, push or deploy");
  console.log(`writes: ..\\${outputRelativePath.replaceAll("/", "\\")}`);
  console.log(`writes manifest: ..\\${manifestRelativePath.replaceAll("/", "\\")}`);
  console.log(`app url: ${appUrl}`);
  console.log(`source url: ${sourceUrl}`);
  console.log(`raw README url: ${rawReadmeUrl}`);
  console.log(`requires production app content: ${checks[0].expected.join("; ")}`);
  console.log(`requires public source content: ${checks[1].expected.join("; ")}`);
  console.log(`requires raw README content: ${checks[2].expected.join("; ")}`);
}
