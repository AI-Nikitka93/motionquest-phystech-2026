# Release Risk Register

Date: 2026-05-05

| Risk | Severity | Owner | Mitigation | Current Status |
|---|---|---|---|---|
| Physical webcam unavailable or blocked | High | Presenter | Use HTTPS URL, browser permission recovery, safe demo fallback. | App has recovery + fallback; real camera evidence still needed. |
| Poor lighting causes landmark noise | High | Presenter | Use bright front lighting, plain background, avoid backlight. | Needs real-room rehearsal. |
| Standing branch unsafe for participant | High | Presenter | Use seated-adaptive branch by default. | Implemented. |
| Standing thresholds unreliable | Medium | Engineer | Tune after physical camera run; keep seated branch as reliable demo path. | Blocked by real camera evidence. |
| Reach false positives | Medium | Engineer | Require 0.5s dwell before counting. | Implemented and unit-tested. |
| Model assets fail to load | Medium | Engineer | CDN URLs checked; model failure text and safe demo fallback. | Verified assets returned 200. |
| Judges see demo fallback as fake result | High | Presenter | Strong visible labels: Demo fallback, safe demo data only, source text. | Implemented and e2e-tested. |
| Medical overclaim | High | Presenter | Use scripted language and visible limitations. | Copy prepared. |
| Public package missing actual outcome | High | Engineer | Publish source/storage link and verify from clean session. | Pending GitHub publication/verification. |
| Presentation overruns 10 minutes | Medium | Presenter | Use 7-minute story + 3-minute Q&A script. | Script prepared; rehearsal pending. |
