# Submission And Registration Proof

Use this folder only for final public-action evidence after Devpost submission and presentation registration.

Required proof files:

- `devpost-submission-confirmation.png`
- `presentation-registration-confirmation.png`
- `public-link-clean-browser.png`
- `public-link-clean-browser.json`
- `discord-schedule-or-zoom-note.png`
- `submission-proof-notes.md`

Rules:

1. Do not include tokens, cookies, account settings, private email inboxes or private Discord messages beyond the minimum organizer-facing proof.
2. Crop or redact personal contact details unless the screenshot needs them to prove successful registration.
3. Keep the final public app link, source/package link, submission timestamp and registration timestamp in `submission-proof-notes.md`.
4. Run `npm run project:capture-public-proof` from `motionquest-app/` only after the final push/deploy. It writes both `public-link-clean-browser.png` and `public-link-clean-browser.json` only after the public app, public source and raw README content checks pass.
5. Do not mark Devpost, registration, public-verification or Phase 10 launch tasks complete without real files in this folder.
6. Before final submission claims, run `npm run project:final-audit -- --public-smoke` from `motionquest-app/` and confirm `external_submission` and `final_submission` are no longer `NO-GO`.

`public-link-clean-browser.json` is a machine-readable companion to the screenshot, not a hand-written note. The final audit rejects the public-link proof unless the screenshot and JSON manifest are both present, the manifest has `PROOF_STATUS: REAL`, the expected final public URLs, successful HTTP statuses and empty `missing` arrays.

`submission-proof-notes.md` must be real evidence, not a template. Include these exact fields only after the public actions happened:

- `PROOF_STATUS: REAL`
- `Final app link:`
- `Final source/package link:`
- `Devpost submission timestamp:`
- `Presentation registration timestamp:`
- `Clean-browser proof file:`

The final audit intentionally rejects notes containing `template`, `pending`, `todo`, `tbd` or `placeholder`.
