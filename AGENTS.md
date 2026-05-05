# PhysTech 2026 Project Notes

Purpose: prepare a winning PhysTech 2026 hackathon project around physical activity technology.

Current selected direction: MotionQuest - webcam exergame for older-adult functional movement.

Key artifacts:
- `УСЛОВИЯ.txt` - local copy of hackathon rules.
- `IDEA_DISCOVERY_REPORT_2026-05-04.md` - idea discovery and TOP-3.
- `research-synthesis-MotionQuest.md` - scholarly basis for MotionQuest.
- `docs/mvp-plan.md` - MVP scope plan.
- `docs/visual-spec.md` - MotionQuest visual language and screen spec.
- `motionquest-app/` - Next.js client-only MotionQuest implementation.

Project memory:
- `docs/STATE.md`
- `docs/EXEC_PLAN.md`
- `docs/PROJECT_HISTORY.md`
- `docs/DECISIONS.md`
- `docs/PROJECT_MAP.md`

Current implementation rule: no backend, no database, no auth for MVP unless a later decision explicitly changes this.

MotionQuest app commands:
- `cd motionquest-app`
- `npm run dev -- --port 3001`
- `npm run build`
- `npm test`
- `npm run lint`

Production URL:
- `https://motionquest-app.vercel.app`
