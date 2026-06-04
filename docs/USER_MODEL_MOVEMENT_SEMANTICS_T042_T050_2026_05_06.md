# MotionQuest User Model And Movement Semantics

Project: MotionQuest
Date: 2026-05-06
Timezone: Europe/Minsk
Scope: Phase 3 T042-T050 of the full-release master TODO.

## Product Outcome Principle

MotionQuest is not a score-first webcam game. The primary outcome is a caregiver-readable movement report that explains what happened in a short home activity session, what the browser could observe, what it could not observe, and what the safest next step is.

Every activity, button, timer, score and tracking message must serve that report outcome.

## T042 Primary User Model

Primary user:

- An older adult at home.
- A seated user who may not be able to stand safely.
- A mobility-diverse participant who may use a chair, desk, small room or close webcam.
- A person who needs large text, explicit controls, low cognitive load and dignity-preserving language.
- A person who should not be asked to prove disability, diagnosis or medical status before using the safer seated path.

Product rule:

MotionQuest must treat seated and standing participation as equally valid ways to use the product. The user is choosing the safest route for today, not admitting failure.

## T043 Caregiver / Reviewer Model

Caregiver, family member, facilitator or judge needs:

- Plain-language understanding of the session.
- A quick answer to: what activity was attempted, what was observed, how confident the tracking was, and what limitation matters.
- A non-medical interpretation that avoids diagnosis, risk prediction and clinical scoring.
- A copyable artifact that can be read outside the app.
- A clear distinction between live camera data and safe demo fallback data.

Product rule:

The report must not expose raw technical measurements as the main output. Technical signals can appear only after they are translated into readable meaning and limitations.

## T044 Standing And Seated Path Equality

Standing path:

- For users who can stand safely.
- Uses visible shoulders, hips and knees.
- Counts one complete sit-to-stand-style cycle only when the return to seated completes the repetition.
- Requires enough full-body visibility before the timer and count should move.

Seated adaptive path:

- For users who prefer or need to remain seated.
- Uses one visible open hand.
- Counts a comfortable raise-and-lower hand cycle as seated upper-body movement practice.
- Does not require hips, knees, ankles or a full-body camera view.

Equal-dignity rule:

The app copy must say "standing path" and "seated adaptive path", not "normal mode" and "fallback". Safe demo data is a fallback; seated mode is not.

## T045 Ability-Choice Copy

Approved choice copy:

- "Choose standing only if it is safe."
- "I can stand safely."
- "I will stay seated."
- "Stay seated in a stable chair."
- "Move only in a comfortable range."
- "Stop immediately if the movement feels unsafe."

Forbidden choice copy:

- "Disabled mode."
- "Weak user mode."
- "Unable to stand?"
- "Rehab mode."
- "Patient mode."
- Any wording that asks for diagnosis, disability status or medical proof.

Product rule:

The question is safety and comfort today, not identity or diagnosis.

## T046 Adaptive Chair Movement Semantics

Adaptive Chair Movement contains two valid branches.

Standing branch means:

- A visible sit-to-stand-style practice signal.
- A count of complete visible stand-and-return cycles.
- A home activity practice signal, not a formal Senior Fitness Test score.
- A session-level observation, not diagnosis.

Seated branch means:

- A visible seated upper-body practice signal.
- A count of visible hand raise-and-lower cycles.
- A mobility-inclusive substitute path for the activity, not a failed Chair Stand.
- A session-level participation signal, not a clinical strength score.

Report language:

- Standing: "standing branch" or "chair-stand-style practice".
- Seated: "seated adaptive branch" or "seated upper-body movement practice".
- Never: "clinical test result", "strength diagnosis", "fall-risk score" or "medical assessment".

## T047 Reach Stars Semantics

Reach Stars means:

- A visible hand-to-target interaction.
- A short engagement and reach-practice task.
- A comfortable upper-body movement game.
- A scoreable event only when at least one visible hand enters and holds the target long enough.

Reach Stars does not mean:

- Formal range-of-motion assessment.
- Balance assessment.
- Upper-limb clinical test.
- Evidence of improvement over time.
- Diagnosis or rehabilitation prescription.

Report language:

"Reach Stars records visible hand-to-target interaction and timing during this session. Use it as engagement and reach-practice feedback, not a medical range measurement."

## T048 What Counts And What Does Not Count

Adaptive Chair Movement, standing branch:

- Counts: one visible stand-and-return cycle, with shoulders, hips and knees trackable.
- Does not count: partial standing, leaning, hand movement near the lens, camera noise, or movement when full-body visibility is not usable.
- User instruction: "Stand tall, then return to seated. The seated return completes the rep."
- Report wording: "Visible chair-stand-style repetitions were recorded."

Adaptive Chair Movement, seated branch:

- Counts: one visible hand raise-and-lower cycle while the user remains seated.
- Does not count: hidden hand movement, a hand too close to the lens, background motion, or body landmarks invented by pose tracking.
- User instruction: "Raise and lower the same visible hand to complete the rep."
- Report wording: "Visible seated upper-body movement repetitions were recorded."

Reach Stars:

- Counts: one visible hand held inside the yellow target for half a second.
- Does not count: passing near the target too quickly, target overlap without a visible hand, body skeleton noise, or decorative movement.
- User instruction: "Raise one visible hand. Then hold it inside the yellow target for half a second."
- Report wording: "Visible hand-to-target interactions were recorded."

## T049 Usable-Condition Gating

Timer rule:

- Standing timer moves only when shoulders, hips and knees are visible enough for the standing branch.
- Seated timer moves only when one open hand is visible enough for seated hand movement.
- Reach Stars timer moves only when one open hand is visible enough for target interaction.

Scoring rule:

- Standing reps are counted only after a usable full-body standing branch frame exists.
- Seated reps are counted only after a usable hand-tracking frame exists.
- Reach hits are counted only after hand-to-target dwell is satisfied.

Report validity rule:

- If no usable tracking occurred, the report must be labeled not valid enough.
- If tracking confidence is low, the report must show limitations before interpretation is trusted.
- Safe demo data must remain visibly labeled as fallback data.

Implementation checkpoint:

- Standing branch now pauses timer and scoring until usable full-body tracking exists.
- Seated branch already pauses timer and scoring until usable hand tracking exists.
- Reach Stars already pauses timer, hides targets and blocks scoring until usable hand tracking exists.

## T050 Report As Primary Outcome

The report is the product outcome, not a decorative post-game summary.

The report must answer:

- What activity path was chosen?
- What movement was observed?
- Was the session live or safe demo fallback?
- Was tracking valid, limited or not valid enough?
- What did the numbers mean in plain language?
- What limitations matter?
- What should the next safe session do?
- What claims are explicitly not being made?

App-facing rule:

The home screen, judge walkthrough and report screen must describe the report as the main artifact. The games exist to create a trustworthy session artifact.

Presentation rule:

The demo must finish on the Caregiver Report and export, not on the skeleton overlay.

## Dependency / Hidden Requirement / Edge-Case Check

| Item | Closed Result |
|---|---|
| Dependencies | T001-T040 product, evidence and claims artifacts were used as the boundary. |
| Hidden requirement | The product cannot shame seated users or imply medical diagnosis. |
| Hidden requirement | Report copy must be understandable without raw landmark knowledge. |
| Edge case | Close camera is handled by hand-only seated/reach mode and no full-body requirement for seated path. |
| Edge case | Standing path remains full-body because the sit-to-stand-style branch needs lower-body visibility. |
| Edge case | No camera or poor tracking produces safe-demo or not-valid-enough labeling, not fake completion. |
| Missing assets | No external image, API, dataset or user-supplied file is required for T042-T050. |
