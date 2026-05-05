import { expect, test, type Locator } from "@playwright/test";

const appUrl = "https://motionquest-app.vercel.app";

test("judge walkthrough reaches the caregiver report without camera hardware", async ({
  page,
}) => {
  await page.goto(appUrl);

  await expect(page.getByText("Judge Proof")).toBeVisible();
  await expect(page.getByText("Use Safe Demo Data")).toBeVisible();
  await expect(page.getByRole("button", { name: "I can stand safely" })).toBeVisible();
  await expect(page.getByRole("button", { name: "I will stay seated" })).toBeVisible();
  await expect(page.getByText("Review Method")).toBeVisible();
  await expect(page.getByText("Lower-friction movement practice")).toBeVisible();
  await expect(
    page.getByText("How to verify the actual outcome in under two minutes."),
  ).toBeVisible();
  await expect(page.getByText("Required joints")).toBeVisible();
  await expect(page.getByText("Adjust camera").first()).toBeVisible();
  await expect(page.getByText("Shoulders").first()).toBeVisible();

  await page.getByRole("button", { name: "Start Seated Judge Walkthrough" }).click();
  await expect(page.getByText("Activity 1")).toBeVisible();
  await expect(page.getByText("Ready for seated adaptive movement")).toBeVisible();

  await page.getByRole("button", { name: "Start seated mode" }).click();
  await expect(
    page.getByText("Seated mode is already selected."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Finish early" }).click();

  await expect(page.getByText("Activity 2")).toBeVisible();
  await expect(page.getByText("Ready for Reach Stars")).toBeVisible();

  await page.getByRole("button", { name: "Start Reach Stars" }).click();
  await expect(
    page.getByText("Raise one visible hand."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Finish & View Report" }).click();

  await expect(page.getByText("Caregiver Report")).toBeVisible();
  await expect(page.getByText("Interpretation", { exact: true })).toBeVisible();
  await expect(page.getByText("Session not valid enough")).toBeVisible();
  await expect(
    page.getByText(
      "No usable body tracking was detected. Repeat the setup with full-body visibility before using the numbers.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    page.getByText("Next session suggestion", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Export", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy report" })).toBeVisible();
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
    page.getByText("Judge Proof").first(),
    page.getByRole("button", { name: "Start Seated Judge Walkthrough" }),
    page.getByText("Lower-friction movement practice"),
    page.getByRole("button", { name: "Verify Seated Camera Flow" }),
    page.getByText("Video stays in the browser").first(),
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

test("keyboard flow and focus rings cover primary actions", async ({ page }) => {
  await page.goto(appUrl);

  const firstAction = page.getByRole("button", {
    name: "Start Seated Judge Walkthrough",
  });
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

  const copy = page.getByRole("button", { name: "Copy report" });
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

  await page.getByRole("button", { name: "Open Labeled Safe Demo Report" }).click();
  await expect(page.getByText("Caregiver Report")).toBeVisible();
});

test("camera recovery text is visible when no camera is available", async ({
  page,
}) => {
  await page.goto(appUrl);

  await page.getByRole("button", { name: "Start Camera Check" }).click();

  await expect(page.getByText("Camera not found")).toBeVisible({
    timeout: 15000,
  });
  await expect(page.getByText("Camera/model needs attention")).toBeVisible();
  await expect(page.getByText("No usable camera was found")).toBeVisible();
  await expect(page.getByText("Connect a webcam or enable the built-in camera.")).toBeVisible();
});

test("safe demo report is visibly labeled as fallback data", async ({ page }) => {
  await page.goto(appUrl);

  await page.getByRole("button", { name: "Open Labeled Safe Demo Report" }).click();

  await expect(page.getByText("Caregiver Report")).toBeVisible();
  await expect(page.getByText("Demo fallback").first()).toBeVisible();
  await expect(page.getByText("Safe demo data only")).toBeVisible();
  await expect(page.getByText("Source: safe demo fallback")).toBeVisible();
  await expect(page.getByText("Session mode: seated-adaptive")).toBeVisible();
  await expect(page.getByText("Primary movement: seated-arm-movement")).toBeVisible();
  await expect(page.getByText("Tracking validity: valid")).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download report" }).click();
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
