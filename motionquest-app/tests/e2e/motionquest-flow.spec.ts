import { expect, test, type Locator } from "@playwright/test";

const appUrl = process.env.E2E_APP_URL ?? "https://motionquest-app.vercel.app";

test("judge walkthrough reaches the caregiver report without camera hardware", async ({
  page,
}) => {
  await page.goto(appUrl);

  await expect(page.getByText("Start", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Safe demo" })).toBeVisible();
  await expect(page.getByRole("button", { name: "I can stand safely" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Seated adaptive" })).toBeVisible();
  await expect(page.getByText("No account. No wearable. Camera only during the session.")).toBeVisible();
  await expect(page.getByText("Research, safety and judge evidence")).toBeVisible();
  await expect(page.getByText("Required joints")).toBeVisible();
  await expect(page.getByText("Human setup guidance")).toBeVisible();
  await expect(page.getByText("Adjust camera").first()).toBeVisible();
  await expect(page.getByText("Shoulders").first()).toBeVisible();

  await page.getByRole("button", { name: "Seated adaptive" }).click();
  await expect(page.getByText("Activity 1", { exact: true })).toBeVisible();
  await expect(page.getByText("Ready for seated adaptive movement")).toBeVisible();
  await expect(
    page.getByText("Adaptive movement is complete. Continue into Reach Stars."),
  ).not.toBeVisible();

  await page.getByRole("button", { name: "Start seated mode" }).click();
  await expect(
    page.getByText("Seated mode is already selected."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Finish early" }).click();

  await expect(page.getByText("Activity 2")).toBeVisible();
  await expect(
    page.getByText("Adaptive movement is complete. Continue into Reach Stars."),
  ).toBeVisible();
  await expect(page.getByText("Ready for Reach Stars")).toBeVisible();

  await page.getByRole("button", { name: "Start Reach Stars" }).click();
  await expect(
    page.getByText("Cover the yellow target with one visible hand"),
  ).toBeVisible();
  await page.getByRole("button", { name: "Finish & View Report" }).click();

  await expect(page.getByText("Caregiver Report")).toBeVisible();
  await expect(page.getByText("Interpretation", { exact: true })).toBeVisible();
  await expect(page.getByText("Observed activity", { exact: true })).toBeVisible();
  await expect(page.getByText("Confidence", { exact: true })).toBeVisible();
  await expect(page.getByText("Limitations", { exact: true })).toBeVisible();
  await expect(page.getByText("Next session suggestion", { exact: true })).toBeVisible();
  await expect(page.getByText("Export", { exact: true })).toBeVisible();
  await expect(page.getByText("Session not valid enough")).toBeVisible();
  await expect(
    page.getByText(
      "The camera did not capture enough movement signal. Try a calmer setup before using the numbers",
      { exact: false },
    ).first(),
  ).toBeVisible();
  await expect(page.getByText("Session complete")).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy practice note" })).toBeVisible();
});

test("visible interactive controls and text respect visual accessibility floor", async ({
  page,
}) => {
  await page.goto(appUrl);

  const smallControls = await page.locator("button, a").evaluateAll((items) =>
    items
      .filter((item) => {
        const rect = item.getBoundingClientRect();
        const style = window.getComputedStyle(item);
        if (item.getAttribute("data-nextjs-dev-tools-button") === "true") {
          return false;
        }
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.visibility !== "hidden" &&
          style.display !== "none"
        );
      })
      .map((item) => {
        const rect = item.getBoundingClientRect();
        const label = item.textContent?.replace(/\s+/g, " ").trim() ?? "";
        return { label, height: Math.round(rect.height) };
      })
      .filter((item) => item.height < 56),
  );

  expect(smallControls).toEqual([]);

  const tinyText = await page.locator("body *").evaluateAll((items) =>
    items
      .filter((item) => {
        const rect = item.getBoundingClientRect();
        const style = window.getComputedStyle(item);
        const text = item.textContent?.replace(/\s+/g, " ").trim() ?? "";
        return (
          text.length > 0 &&
          rect.width > 0 &&
          rect.height > 0 &&
          style.visibility !== "hidden" &&
          style.display !== "none"
        );
      })
      .map((item) => {
        const style = window.getComputedStyle(item);
        const text = item.textContent?.replace(/\s+/g, " ").trim() ?? "";
        return { text: text.slice(0, 80), fontSize: parseFloat(style.fontSize) };
      })
      .filter((item) => item.fontSize < 16),
  );

  expect(tinyText).toEqual([]);
});

test("key visual sections keep accessible contrast", async ({ page }) => {
  await page.goto(appUrl);

  const samples = [
    page.getByRole("heading", { name: "MotionQuest" }),
    page.getByText("Start", { exact: true }),
    page.getByRole("button", { name: "Seated adaptive" }),
    page.getByText("No account. No wearable. Camera only during the session."),
    page.getByText("Research, safety and judge evidence"),
    page.getByText("Human setup guidance").first(),
  ];

  for (const locator of samples) {
    const pair = await locator.evaluate((element) => {
      const parse = (value: string) => {
        const match = value.match(/rgba?\(([^)]+)\)/);
        if (!match) return { r: 0, g: 0, b: 0, a: 0 };
        const [r, g, b, a = "1"] = match[1]
          .split(",")
          .map((part) => part.trim());
        return {
          r: Number(r),
          g: Number(g),
          b: Number(b),
          a: Number(a),
        };
      };
      const blend = (
        fg: { r: number; g: number; b: number; a: number },
        bg: { r: number; g: number; b: number; a: number },
      ) => ({
        r: Math.round(fg.r * fg.a + bg.r * (1 - fg.a)),
        g: Math.round(fg.g * fg.a + bg.g * (1 - fg.a)),
        b: Math.round(fg.b * fg.a + bg.b * (1 - fg.a)),
        a: 1,
      });
      const style = window.getComputedStyle(element);
      let background = { r: 255, g: 248, b: 231, a: 1 };
      const layers: { r: number; g: number; b: number; a: number }[] = [];
      let current: Element | null = element;
      while (current) {
        const candidate = parse(window.getComputedStyle(current).backgroundColor);
        if (candidate.a > 0) {
          layers.push(candidate);
          if (candidate.a === 1) break;
        }
        current = current.parentElement;
      }
      for (const layer of layers.reverse()) {
        background = layer.a < 1 ? blend(layer, background) : layer;
      }
      return {
        text: parse(style.color),
        background,
        label: element.textContent?.replace(/\s+/g, " ").trim() ?? "",
      };
    });

    expect(contrastRatio(pair.text, pair.background), pair.label).toBeGreaterThanOrEqual(
      4.5,
    );
  }
});

test("Phase 4 visual trust surfaces are visible and production-readable", async ({
  page,
}) => {
  await page.goto(appUrl);
  await page.getByText("Research, safety and judge evidence").click();

  await expect(page.getByText("Dignity & Privacy Promise")).toBeVisible();
  await expect(page.getByText("Before camera use", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Camera only during the session" }),
  ).toBeVisible();
  await expect(page.getByText("Video is not saved")).toBeVisible();
  await expect(page.getByText("Participant controls the data")).toBeVisible();
  await expect(page.getByText("Visual production system")).toBeVisible();
  await expect(page.getByText("One asset at a time")).toBeVisible();
  await expect(page.getByText("Reject fake medical cues")).toBeVisible();
  await expect(page.getByText("Keep provenance visible")).toBeVisible();
  await expect(page.getByText("Prototype risk")).toBeVisible();
  await expect(page.getByText("Inclusive movement lab")).toBeVisible();
  await expect(page.getByText("Phase 4 acceptance")).toBeVisible();
  await expect(page.getByText("Phase 5 acceptance")).toBeVisible();
  await expect(
    page.getByText("Every core screen has normal, degraded and fallback states."),
  ).toBeVisible();
  await expect(page.getByText("Home calibration")).toBeVisible();
  await expect(page.getByText("Phase 6 trust contract").first()).toBeVisible();
  await expect(page.getByText("Safety first")).toBeVisible();
  await expect(page.getByText("Camera control")).toBeVisible();
  await expect(page.getByText("Dignity by design")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Independence" })).toBeVisible();
  await expect(page.getByText("Caregiver interpretation rules")).toBeVisible();
  await expect(page.getByText("High confidence")).toBeVisible();
  await expect(page.getByText("Medium confidence")).toBeVisible();
  await expect(page.getByText("Low confidence")).toBeVisible();
  await expect(page.getByText("Camera limitation rules")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Close camera" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Hand near lens" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Partial view" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Poor lighting" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Seated hand" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Standing body" })).toBeVisible();
  await expect(page.getByText("Trust checklist by screen")).toBeVisible();
  await expect(page.getByText("Manual review protocol")).toBeVisible();
  await expect(page.getByText("User-side smoke protocol")).toBeVisible();
  await expect(page.getByText("Claim escalation rule").first()).toBeVisible();

  await page.getByRole("button", { name: "Verify Safe Demo Report" }).click();
  await expect(page.getByText("Session complete")).toBeVisible();
  await expect(page.getByText("Caregiver artifact")).toBeVisible();
  await expect(page.getByLabel("Sample data warning")).toBeVisible();
  await expect(page.getByText("Evidence surface")).toBeVisible();
  await expect(page.getByText("Why this report is useful, and where it stops.")).toBeVisible();
  await expect(page.getByText("Mini-bibliography")).toBeVisible();
  await expect(page.getByText("Confidence by mode")).toBeVisible();
  await expect(page.getByText("Functional movement", { exact: true })).toBeVisible();
  await expect(page.getByText("Browser pose limits", { exact: true })).toBeVisible();
  await expect(page.getByText("Dignity and privacy", { exact: true })).toBeVisible();
  await expect(page.getByText("Confidence explanation:").first()).toBeVisible();
  await expect(page.getByText("Caregiver interpretation rules")).toBeVisible();
  await expect(page.getByText("Camera limitation rules")).toBeVisible();
  await expect(page.getByText("Claim escalation rule")).toBeVisible();
});

test("keyboard flow and focus rings cover primary actions", async ({ page }) => {
  await page.goto(appUrl);

  const firstAction = page.getByRole("button", { name: "Seated adaptive" });
  await firstAction.focus();
  await expect(firstAction).toBeFocused();
  await expectOutlineVisible(firstAction);
  await page.keyboard.press("Enter");

  const ready = page.getByRole("button", { name: "Start seated mode" });
  await expect(ready).toBeVisible();
  await ready.focus();
  await expectOutlineVisible(ready);
  await page.keyboard.press("Enter");

  const finish = page.getByRole("button", { name: "Finish early" });
  await expect(finish).toBeVisible();
  await finish.focus();
  await expectOutlineVisible(finish);
  await page.keyboard.press("Enter");

  const reach = page.getByRole("button", { name: "Start Reach Stars" });
  await expect(reach).toBeVisible();
  await reach.focus();
  await expectOutlineVisible(reach);
  await page.keyboard.press("Enter");

  const report = page.getByRole("button", { name: "Finish & View Report" });
  await expect(report).toBeVisible();
  await report.focus();
  await expectOutlineVisible(report);
  await page.keyboard.press("Enter");

  const copy = page.getByRole("button", { name: "Copy practice note" });
  await expect(copy).toBeVisible();
  await copy.focus();
  await expectOutlineVisible(copy);
});

test("reduced motion keeps navigation usable without animated emphasis", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(appUrl);

  const animatedElements = await page
    .locator("button, a, [class*='transition']")
    .evaluateAll((items) =>
      items.map((item) => {
        if (item.getAttribute("data-nextjs-dev-tools-button") === "true") {
          return {
            transitionDuration: "0s",
            animationDuration: "0s",
          };
        }
        const style = window.getComputedStyle(item);
        return {
          transitionDuration: style.transitionDuration,
          animationDuration: style.animationDuration,
        };
      }),
    );

  const longMotion = animatedElements.filter(
    (item) =>
      durationListToMs(item.transitionDuration) > 1 ||
      durationListToMs(item.animationDuration) > 1,
  );

  expect(longMotion).toEqual([]);

  await page.getByRole("button", { name: "Safe demo" }).click();
  await expect(page.getByText("Caregiver Report", { exact: true })).toBeVisible();
});

test("camera recovery text is visible when live camera cannot start", async ({
  page,
}) => {
  await page.goto(appUrl);

  await page.getByRole("button", { name: "Start Camera Check" }).click();

  await expect(page.getByText("Camera/model needs attention")).toBeVisible();
  await expect(
    page.getByText(
      /Camera not found|Camera runtime not supported|Camera detected but no frames arrived/,
    ),
  ).toBeVisible({ timeout: 15000 });
  await expect(
    page.getByText(/Camera diagnostics|No camera is not a dead end/).first(),
  ).toBeVisible();
  await expect(
    page.getByText(/safe demo|regular Chrome or Edge|another browser/).first(),
  ).toBeVisible();
});

test("camera stage instruction hierarchy avoids overlay collisions", async ({
  page,
}) => {
  await page.goto(appUrl);

  await page.getByRole("button", { name: "Seated adaptive" }).click();
  await page.getByRole("button", { name: "Start seated mode" }).click();

  const whatCounts = page
    .locator("div.absolute")
    .filter({ hasText: "What counts" })
    .first();
  const modePill = page
    .locator("div.absolute")
    .filter({ hasText: /^Seated Adaptive$/ })
    .first();

  await expect(whatCounts).toBeVisible();
  await expect(modePill).toBeVisible();

  const [whatCountsBox, modePillBox] = await Promise.all([
    whatCounts.boundingBox(),
    modePill.boundingBox(),
  ]);

  expect(whatCountsBox).not.toBeNull();
  expect(modePillBox).not.toBeNull();
  expect(
    overlapArea(whatCountsBox!, modePillBox!),
    "What counts guidance must not cover the stage label",
  ).toBe(0);
});

test("camera stage does not stretch below the live video frame", async ({
  page,
}) => {
  await page.goto(appUrl);

  const cameraStage = page.locator("video").first().locator("xpath=ancestor::div[contains(@class,'relative')][1]");
  const [stageBox, videoBox] = await Promise.all([
    cameraStage.boundingBox(),
    page.locator("video").first().boundingBox(),
  ]);

  expect(stageBox).not.toBeNull();
  expect(videoBox).not.toBeNull();
  expect(
    Math.abs(stageBox!.height - videoBox!.height),
    "Camera stage should not stretch to match the taller diagnostics panel",
  ).toBeLessThanOrEqual(12);
});

test("standing branch pauses measurement until full-body tracking is usable", async ({
  page,
}) => {
  await page.goto(appUrl);

  await page.getByRole("button", { name: "I can stand safely" }).click();
  await page.getByRole("button", { name: "I am in position" }).click();

  await expect(
    page.getByText(
      "Timer is paused. Keep shoulders, hips and knees visible before the standing branch can count.",
    ),
  ).toBeVisible({ timeout: 15000 });
  await page.getByRole("button", { name: "Finish early" }).click();
  await page.getByRole("button", { name: "Start Reach Stars" }).click();
  await page.getByRole("button", { name: "Finish & View Report" }).click();
  await expect(page.getByText("Session not valid enough")).toBeVisible();
  await expect(
    page.getByText("not an official medical record", { exact: false }).first(),
  ).toBeVisible();
});

test("safe demo report is visibly labeled as fallback data", async ({ page }) => {
  await page.goto(appUrl);

  await page.getByRole("button", { name: "Safe demo" }).click();

  await expect(page.getByText("Caregiver Report", { exact: true })).toBeVisible();
  await expect(page.getByText("Demo fallback").first()).toBeVisible();
  await expect(page.getByLabel("Sample data warning")).toBeVisible();
  await expect(page.getByText("Sample session - not live camera data.").first()).toBeVisible();
  await expect(page.getByText("Not an official medical record.").first()).toBeVisible();
  await expect(page.getByText("Source: safe demo fallback")).toBeVisible();
  await expect(page.getByText("Session mode: seated-adaptive")).toBeVisible();
  await expect(page.getByText("Primary movement: seated-arm-movement")).toBeVisible();
  await expect(page.getByText("Observed activity", { exact: true })).toBeVisible();
  await expect(page.getByText("Confidence", { exact: true })).toBeVisible();
  await expect(page.getByText("Next session suggestion", { exact: true })).toBeVisible();
  await expect(page.getByText("Tracking validity: valid")).toBeVisible();
  await expect(page.getByText("Confidence explanation:").first()).toBeVisible();
  await expect(
    page.getByText("Seated mode uses visible hand movement only").first(),
  ).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download practice note" }).click();
  const artifact = await download;
  expect(artifact.suggestedFilename()).toMatch(/^motionquest-.*\.txt$/);
});

async function expectOutlineVisible(locator: Locator) {
  const outline = await locator.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: parseFloat(style.outlineWidth),
    };
  });
  expect(outline.outlineStyle).not.toBe("none");
  expect(outline.outlineWidth).toBeGreaterThanOrEqual(3);
}

function contrastRatio(
  foreground: { r: number; g: number; b: number },
  background: { r: number; g: number; b: number },
) {
  const fg = relativeLuminance(foreground);
  const bg = relativeLuminance(background);
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

function relativeLuminance(color: { r: number; g: number; b: number }) {
  const values = [color.r, color.g, color.b].map((value) => {
    const channel = value / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}

function durationListToMs(value: string) {
  return Math.max(
    ...value.split(",").map((part) => {
      const item = part.trim();
      if (item.endsWith("ms")) return Number(item.replace("ms", ""));
      if (item.endsWith("s")) return Number(item.replace("s", "")) * 1000;
      return 0;
    }),
  );
}

function overlapArea(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
) {
  const xOverlap = Math.max(
    0,
    Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x),
  );
  const yOverlap = Math.max(
    0,
    Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y),
  );
  return Math.round(xOverlap * yOverlap);
}
