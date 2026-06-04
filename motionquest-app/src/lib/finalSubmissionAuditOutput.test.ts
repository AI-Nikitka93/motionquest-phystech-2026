import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

test("final submission audit reports public framing guardrails", () => {
  const result = spawnSync(
    "node",
    ["scripts/final-submission-audit.mjs"],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      shell: false,
    },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /public metadata uses Adaptive Home Movement Lab title/,
  );
  assert.match(
    result.stdout,
    /public framing avoids stale prototype and stand-only wording/,
  );
  assert.match(
    result.stdout,
    /public framing describes seated hand movement and caregiver report/,
  );
  assert.match(result.stdout, /public proof capture helper exists/);
  assert.match(result.stdout, /package exposes project:capture-public-proof/);
  assert.match(
    result.stdout,
    /official rule sources include Devpost and Binnovative/,
  );
  assert.match(
    result.stdout,
    /final checklist includes Europe\/Minsk deadline conversions/,
  );
  assert.match(
    result.stdout,
    /final checklist records prize wording source mismatch/,
  );
  assert.match(
    result.stdout,
    /final public-link proof manifest is plausible/,
  );
});

test("final submission audit exposes content-aware public smoke requirements", () => {
  const result = spawnSync(
    "node",
    ["scripts/final-submission-audit.mjs", "--public-smoke-dry-run"],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      shell: false,
    },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /public_smoke_requirements:/);
  assert.match(
    result.stdout,
    /production_app requires: MotionQuest; Adaptive Home Movement Lab; Safe demo/,
  );
  assert.match(
    result.stdout,
    /raw_readme requires: MotionQuest; Adaptive Home Movement Lab; caregiver-readable/,
  );
  assert.match(
    result.stdout,
    /devpost requires: Physical Activity and Technology Hack Day/,
  );
});
