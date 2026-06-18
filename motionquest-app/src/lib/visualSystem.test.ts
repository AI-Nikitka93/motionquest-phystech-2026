import test from "node:test";
import assert from "node:assert/strict";
import {
  cameraSetupGuidance,
  cameraLimitationRules,
  caregiverInterpretationRules,
  claimEscalationRule,
  confidenceByMode,
  dignityPrivacyItems,
  evidenceCards,
  homeProofPathItems,
  manualReviewProtocol,
  miniBibliography,
  phaseSixAcceptanceNote,
  phaseFourAcceptanceItems,
  phaseFiveStateMatrix,
  phaseSixSafetyPrivacyItems,
  phaseSixScreenTrustChecklist,
  phaseSixTrustContracts,
  userSmokeProtocol,
  visualAssetStandards,
} from "./visualSystem";

test("visual trust system has concrete visible content for each Phase 4 surface", () => {
  assert.equal(dignityPrivacyItems.length, 3);
  assert.equal(evidenceCards.length, 3);
  assert.equal(visualAssetStandards.length, 3);
  assert.equal(homeProofPathItems.length, 3);
  assert.equal(cameraSetupGuidance.length, 5);
  assert.equal(confidenceByMode.length, 3);
  assert.equal(miniBibliography.length, 3);
  assert.ok(phaseFourAcceptanceItems.length >= 5);

  for (const item of [
    ...dignityPrivacyItems,
    ...evidenceCards,
    ...visualAssetStandards,
  ]) {
    assert.ok(item.title.length >= 10);
    assert.ok(item.body.length >= 40);
  }
});

test("camera setup guidance names close laptop and standing framing limits", () => {
  assert.ok(
    cameraSetupGuidance.some((item) => /close laptop webcam/i.test(item)),
  );
  assert.ok(
    cameraSetupGuidance.some((item) => /4:3|640 x 480|hips and knees/i.test(item)),
  );
});

test("evidence cards keep source provenance links", () => {
  for (const card of evidenceCards) {
    assert.match(card.href, /^https:\/\//);
    assert.ok(card.source.length >= 10);
  }
});

test("Phase 5 state matrix covers every core screen and fallback state", () => {
  assert.equal(phaseFiveStateMatrix.length, 4);

  for (const item of phaseFiveStateMatrix) {
    assert.ok(item.screen.length > 0);
    assert.match(item.normal, /\S/);
    assert.match(item.degraded, /\S/);
    assert.match(item.fallback, /\S/);
  }
});

test("Phase 6 trust contracts cover confidence, safety, privacy and dignity", () => {
  assert.equal(phaseSixTrustContracts.length, 5);
  assert.equal(phaseSixSafetyPrivacyItems.length, 4);
  assert.equal(caregiverInterpretationRules.length, 3);
  assert.equal(cameraLimitationRules.length, 4);
  assert.equal(phaseSixScreenTrustChecklist.length, 4);
  assert.ok(manualReviewProtocol.length >= 4);
  assert.ok(userSmokeProtocol.length >= 3);

  for (const item of phaseSixTrustContracts) {
    assert.match(item.confidence, /\S/);
    assert.match(item.counts, /\S/);
    assert.match(item.boundary, /\S/);
  }

  assert.ok(
    phaseSixSafetyPrivacyItems.some((item) => /Stop the session/.test(item.body)),
  );
  assert.ok(
    phaseSixSafetyPrivacyItems.some((item) => /not raw video/.test(item.body)),
  );
  assert.ok(
    phaseSixSafetyPrivacyItems.some((item) => /first-class path/.test(item.body)),
  );
  assert.ok(
    phaseSixSafetyPrivacyItems.some((item) => /browser webcam only/.test(item.body)),
  );
  assert.ok(
    caregiverInterpretationRules.some((item) => /High confidence/.test(item.state)),
  );
  assert.ok(
    caregiverInterpretationRules.some((item) => /Low confidence/.test(item.state)),
  );
  assert.ok(
    cameraLimitationRules.some((item) => /Close camera/.test(item.condition)),
  );
  assert.ok(
    cameraLimitationRules.some((item) => /Poor lighting/.test(item.condition)),
  );
  assert.ok(
    phaseSixScreenTrustChecklist.every((item) =>
      [item.visible, item.counted, item.limited, item.control].every(
        (value) => value.length >= 20,
      ),
    ),
  );
  assert.match(claimEscalationRule, /weakens the claim/);
  assert.match(phaseSixAcceptanceNote, /confidence, safety, privacy, dignity/);
});
