import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("public proof capture helper exposes safe dry-run contract", () => {
  const result = spawnSync(
    "node",
    ["scripts/capture-public-proof.mjs", "--dry-run"],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      shell: false,
    },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /MotionQuest public proof capture/);
  assert.match(
    result.stdout,
    /writes: ..\\evidence\\submission-proof\\public-link-clean-browser\.png/,
  );
  assert.match(
    result.stdout,
    /writes manifest: ..\\evidence\\submission-proof\\public-link-clean-browser\.json/,
  );
  assert.match(
    result.stdout,
    /requires production app content: MotionQuest; Adaptive Home Movement Lab; Safe demo/,
  );
  assert.match(result.stdout, /does not submit, register, push or deploy/);
});

test("package exposes public proof capture command", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

  assert.equal(
    packageJson.scripts["project:capture-public-proof"],
    "node scripts/capture-public-proof.mjs",
  );
});
