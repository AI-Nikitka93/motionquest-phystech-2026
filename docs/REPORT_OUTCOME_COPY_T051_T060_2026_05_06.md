# MotionQuest Report Outcome Copy

Project: MotionQuest
Date: 2026-05-06
Timezone: Europe/Minsk
Scope: Phase 3 T051-T060 of the full-release master TODO.

## T051 Required Report Sections

The Caregiver Report must always expose these sections in this order:

1. **Session summary** - one plain-language paragraph that says whether the session is live, sample, valid, limited or not valid enough.
2. **Observed activity** - adaptive movement count, Reach Stars target result and timing, framed as one practice session.
3. **Confidence** - tracking validity and tracking confidence in human language.
4. **Limitations** - camera, lighting, body/hand visibility, chair setup and branch-specific limits.
5. **Interpretation** - readable meaning of the observed activity without clinical claims.
6. **Next safe step** - conservative next-session suggestion.
7. **Disclaimer** - practice feedback only, not diagnosis, assessment or prediction.

Implementation status:

- The app report screen now labels `Observed activity`, `Confidence`, `Limitations`, `Interpretation`, `Next session suggestion` and `Export`.
- The exported text now includes `Session summary`, `Observed activity`, `Confidence`, `Limitations`, `Interpretation`, `Next safe step` and `Disclaimer`.
- Sample sessions show a persistent yellow sample-data notice.

## T052 Caregiver Copy: Valid Standing Session

Use when:

- Source is live camera.
- Primary movement is `chair-stand`.
- Tracking validity is `valid`.

Summary:

> Live standing session captured chair-stand-style practice and Reach Stars interaction.

Interpretation pattern:

> [N] chair-stand reps were recorded, [X] of [Y] reach targets were hit, and tracking confidence was [level]. Reach interaction looked consistent / may need easier target placement. Use this as session feedback, not diagnosis.

Limitations:

- Results depend on camera angle, lighting, body visibility and safe chair setup.
- Chair-stand-style practice is not a formal Senior Fitness Test score.
- Report is single-session feedback, not diagnosis.

Next safe step:

> Keep the setup conservative unless tracking stays high and the movement feels comfortable.

## T053 Caregiver Copy: Valid Seated Session

Use when:

- Source is live camera.
- Primary movement is `seated-arm-movement`.
- Tracking validity is `valid`.

Summary:

> Live seated session captured seated upper-body movement practice and Reach Stars interaction.

Interpretation pattern:

> [N] seated arm movement reps were recorded, [X] of [Y] reach targets were hit, and tracking confidence was [level]. Reach interaction looked consistent / may need easier target placement. Use this as session feedback, not diagnosis.

Limitations:

- Results depend on camera angle, lighting, hand visibility and safe seated setup.
- Seated adaptive mode uses visible hand tracking and is not a clinical strength score.
- The seated path is an equal-dignity activity path, not a failure fallback.

Next safe step:

> Repeat with the same seated setup if the range felt comfortable; do not increase difficulty only because the score looks high.

## T054 Caregiver Copy: Limited-Confidence Session

Use when:

- Source is live camera.
- Some movement was captured.
- Tracking validity is `limited`.

Summary:

> Movement was attempted, but tracking confidence was limited. Treat the report as setup feedback before using the numbers.

Interpretation:

> The report is still readable, but low tracking confidence means the counts may be incomplete. Repeat with better lighting and clearer full-body or hand visibility before relying on the trend.

Limitations:

- Tracking confidence was low, so movement counts may be incomplete.
- Results depend on camera angle, lighting and body/hand visibility.
- Do not compare limited-confidence counts against valid sessions.

Next safe step:

> Repeat the same activity with better framing before changing difficulty.

## T055 Caregiver Copy: Sample / Fallback Session

Use when:

- Source is `safe-demo`.
- No live camera session should be implied.

Summary:

> Sample session loaded to show the caregiver report format when a live webcam is unavailable.

Persistent visible banner:

> Sample session - not live camera data.

Disclaimer:

> Sample session only - not live camera data. Use live camera results for real session feedback.

Report/export rules:

- Every sample report must say `safe demo fallback` or `Sample session - not live camera data`.
- Sample metrics may demonstrate layout and meaning, but cannot be described as the user's result.
- Sample report can be used for judging the report design, not for judging movement performance.

## T056 Sample / Live Distinction Rules

Live camera session:

- Source label: `live camera session`.
- Metric badge: `Measured`.
- Report may be valid, limited or not valid enough depending on tracking.
- Export may be used as a session artifact if the report is valid or limited with visible limitations.

Sample fallback session:

- Source label: `safe demo fallback`.
- Metric badge: `Demo fallback`.
- Yellow banner must remain visible above report metrics.
- Export must say `Sample session - not live camera data`.
- Sample fallback must never silently replace a failed live session.

Not-valid-enough live session:

- Source label remains live.
- Metric badge: `Not valid`.
- Report must show the failure as a tracking/session-quality outcome, not hide it behind sample data.
- User can choose safe demo afterward, but the source distinction must remain explicit.

## T057 Movement Passport Future Meaning

Movement Passport is future product language, not first-release medical storage.

Meaning:

- A human-readable record of movement participation.
- A collection of session summaries, confidence levels and limitations.
- A way for older adults, family and caregivers to discuss activity without needing raw sensor data.
- A non-medical continuity artifact for people excluded by normal fitness tracking.

Boundaries:

- Not a diagnosis.
- Not a clinical record.
- Not a fall-risk profile.
- Not a performance leaderboard.
- Not a hidden surveillance log.

First-release implication:

The current report should already be shaped like a future Movement Passport entry: readable, source-labeled, confidence-aware and limitation-aware.

## T058 Return-User Story Without Medical Tracking

Return-user story:

1. User returns to repeat a comfortable activity path.
2. User chooses standing or seated based on today's safety and comfort.
3. User sees whether tracking is usable before trusting the result.
4. User receives a report that explains this session.
5. User may compare reports informally for participation and setup quality, not clinical trend claims.

Forbidden return-user framing:

- "Your health score improved."
- "Fall risk decreased."
- "Clinical mobility trend."
- "Diagnosis changed."
- "Treatment progress verified."

Allowed return-user framing:

- "You completed another practice session."
- "Tracking was clearer than last time."
- "The same seated path stayed comfortable."
- "Next time, keep the same setup."
- "Repeat before increasing difficulty."

## T059 Edge Cases

Close camera:

- Use seated/reach hand-only mode when full body is impossible.
- Do not draw fake body skeletons from noisy pose landmarks.
- Keep report confidence honest.

Partial body:

- Standing path must pause until shoulders, hips and knees are usable.
- Seated/reach path may proceed with one visible open hand.

Seated desk setup:

- Treat seated as a first-class activity path.
- Do not ask for hips, knees or ankles.
- Report seated upper-body movement as practice feedback.

Poor lighting:

- Show limited-confidence or not-valid-enough report language.
- Recommend repeating with better lighting before using the numbers.

Hand near lens:

- Do not score standing path from hand-like false body geometry.
- Score seated/reach only from usable hand tracking.

No camera:

- Show recovery instructions.
- Offer safe demo as labeled report-format fallback.
- Never claim live measurement.

Permission denied:

- Explain browser permission issue.
- Offer retry and safe demo.
- Preserve report/source distinction.

## T060 Phase 3 Acceptance Note

Phase 3 is acceptable only if:

- User model is clear: older adult, seated user and mobility-diverse home participant.
- Caregiver/reviewer model is clear: readable session understanding, not raw technical measurements.
- Standing and seated paths are equal-dignity choices.
- Movement meanings are explicit and non-medical.
- What-counts rules are written for app and report.
- Timer, scoring and report validity are tied to usable session conditions.
- Report is treated as the primary product outcome.
- Sample/live distinction is visible in the report and export.
- Movement Passport remains future, non-medical and privacy-aware.
- Edge cases are acknowledged without pretending the app can measure what it cannot see.

Result:

Phase 3 report outcome layer is unambiguous for the next implementation/design phase.
