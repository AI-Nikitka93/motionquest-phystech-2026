# Submission And Registration Proof

Use this folder only for final public-action evidence after Devpost submission and presentation registration.

Required proof files:

- `devpost-submission-confirmation.png`
- `presentation-registration-confirmation.png`
- `public-link-clean-browser.png`
- `discord-schedule-or-zoom-note.png`
- `submission-proof-notes.md`

Rules:

1. Do not include tokens, cookies, account settings, private email inboxes or private Discord messages beyond the minimum organizer-facing proof.
2. Crop or redact personal contact details unless the screenshot needs them to prove successful registration.
3. Keep the final public app link, source/package link, submission timestamp and registration timestamp in `submission-proof-notes.md`.
4. Do not mark Devpost, registration, public-verification or Phase 10 launch tasks complete without real files in this folder.
5. Before final submission claims, run `npm run project:final-audit -- --public-smoke` from `motionquest-app/` and confirm `external_submission` and `final_submission` are no longer `NO-GO`.

`submission-proof-notes.md` must be real evidence, not a template. Include these exact fields only after the public actions happened:

- `PROOF_STATUS: REAL`
- `Final app link:`
- `Final source/package link:`
- `Devpost submission timestamp:`
- `Presentation registration timestamp:`
- `Clean-browser proof file:`

The final audit intentionally rejects notes containing `template`, `pending`, `todo`, `tbd` or `placeholder`.
