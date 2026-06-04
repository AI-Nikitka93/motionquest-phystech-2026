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
});
