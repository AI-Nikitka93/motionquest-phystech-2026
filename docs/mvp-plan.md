# MotionQuest MVP Scope Plan

Проект: PhysTech 2026  
Идея: MotionQuest - Webcam Exergame for Older Adults  
Дата: 2026-05-04  
Последнее обновление: 2026-05-05  
Источник метрик: `research-synthesis-MotionQuest.md`, `docs/ADAPTIVE_SEATED_METRICS_RESEARCH_2026_05_05.md`

## SUMMARY

MotionQuest MVP должен быть client-only web app: камера видит позу, мини-игра считает движение, отчет показывает caregiver-friendly результат. Скоуп режется до **2 активностей** и **1 Caregiver Report**. Первая активность теперь адаптивная: пользователь выбирает standing branch или seated-adaptive branch. Никакого backend, auth, database, accounts, cloud sync, social, leaderboard или сложного 3D.

Главный demo promise: **"Обычная веб-камера превращает research-backed functional movements в понятную игру и отчет для caregiver/trainer."**

## Chosen Stack

| Layer | Choice | Why |
|---|---|---|
| App | Next.js + React | Быстрый scaffold, удобно деплоить на Vercel/Netlify/Pages, достаточно для static/client app. |
| Pose | MediaPipe Pose / `@mediapipe/tasks-vision` | Работает в браузере, дает body landmarks без backend. |
| Styling | Tailwind CSS | Быстро собрать крупный, доступный UI без дизайн-системы. |
| State | React state + localStorage | Достаточно для одной demo/session history. |
| Data | Hardcoded task configs + local JSON | Нет причин поднимать сервер или БД. |
| Deployment | Static web deploy | Минимальный operational risk. |

## Product Cut

### Must Have

| Feature | Description | Acceptance |
|---|---|---|
| Adaptive Chair Movement | 30-sec adaptive movement counter. Standing branch counts sit-to-stand cycles; seated-adaptive branch counts visible seated arm movement cycles. | User chooses safe mode, timer runs, reps counted, session mode saved. |
| Reach Stars mini-game | User reaches left/right/up to touch large targets with wrist landmarks. | Targets appear, reaches detected, reaction/completion score saved. |
| Caregiver Report | Single report screen summarizes both games in plain language. | Shows reps, reach score, confidence, suggested next difficulty and disclaimer. |

### Should Have

| Feature | Description |
|---|---|
| Camera calibration card | Setup: choose standing/seated, check required joints for that branch. |
| Pose confidence label | High/Medium/Low based on landmark visibility and tracking stability. |
| Demo mode fallback | If webcam fails, load scripted sample results so presentation continues. |

### Could Have

| Feature | Description |
|---|---|
| Audio cues | Gentle start/stop/target sounds. |
| Session history | Last 3 local sessions in localStorage. |
| Research citations panel | Tiny "based on 30-sec chair stand / reach task evidence" section. |

### Won't Have

| Rejected | Reason |
|---|---|
| Auth/accounts | No judging value, high friction. |
| Backend/API | Client-only is enough. |
| Database | localStorage JSON is enough. |
| Medical diagnosis/fall prediction | Not valid from one webcam demo. |
| Leaderboards/social feed | Scope bloat. |
| Complex 3D models/avatar | Visual risk and time sink. |
| Multi-user/caregiver portal | Too much infrastructure. |
| Full TUG/BBS/Tinetti clinical scoring | Protocol-heavy; use inspired-by proxies only. |

## Data Architecture

Store one `motionquest_sessions` key in localStorage.

```json
{
  "sessions": [
    {
      "id": "demo-2026-06-27-001",
      "createdAt": "2026-06-27T15:40:00+03:00",
      "participantLabel": "Demo participant",
      "poseConfidence": "high",
      "sessionMode": "seated-adaptive",
      "primaryMovement": "seated-arm-movement",
      "chairStand": {
        "durationSec": 30,
        "reps": 0,
        "incompleteReps": 0,
        "avgRepSec": null
      },
      "adaptiveMovement": {
        "label": "Seated arm movement",
        "durationSec": 30,
        "reps": 10,
        "avgRepSec": 3.0
      },
      "reachStars": {
        "targetsShown": 12,
        "targetsHit": 10,
        "avgReactionMs": 940,
        "leftRightBalance": "balanced"
      },
      "report": {
        "summary": "Completed both functional movement games with stable tracking.",
        "nextDifficulty": "same",
        "disclaimer": "Research-inspired movement feedback, not medical diagnosis."
      }
    }
  ]
}
```

## Mini-Game Mechanics

### 1. Adaptive Chair Movement

Core detection:
- user chooses `standing` only if safe, otherwise `seated-adaptive`;
- standing branch uses shoulders/hips/knees and counts seated -> standing -> seated cycles;
- seated branch uses shoulders/elbows/wrists and counts arm extended -> flexed -> extended cycles;
- timer hard-limited to 30 seconds.

What to show:
- big countdown;
- live skeleton overlay;
- rep counter;
- "complete rep" pulse;
- confidence label.

### 2. Reach Stars

Core detection:
- show large targets in left/right/up zones;
- use wrist landmarks to detect target hit;
- require 0.5s dwell in target before counting, to avoid one-frame wrist noise;
- reaction time from target spawn to wrist entering target zone;
- count hits and misses.

What to show:
- large accessible targets;
- wrist trail or glow;
- hit counter;
- reaction time;
- "great reach" feedback.

## 90-Second Demo Flow

| Time | Action | What judges see |
|---:|---|---|
| 0-10s | One-sentence problem | "Older adults need safe movement practice, but adherence and measurement are hard outside clinics." |
| 10-20s | Open MotionQuest and click `Start Camera Check` | Webcam opens, skeleton overlay appears, confidence turns High/Medium. |
| 20-45s | Run Adaptive Chair Movement demo | Presenter chooses seated branch by default; app counts seated arm cycles. If standing is safe, use standing branch. |
| 45-65s | Run Reach Stars | Large targets appear; presenter reaches to hit 4-5 targets; score updates live. |
| 65-80s | Click `View Caregiver Report` | Report shows chair stand reps, reach hits, tracking confidence and next difficulty. |
| 80-90s | Close with research link | "This is not a medical device; it translates validated functional movement constructs into a browser-based exergame." |

Presentation trick:
- In live demo use seated-adaptive mode by default because it works in tighter rooms and does not exclude users who cannot stand.
- Keep `Load Safe Demo Data` button visible only in presenter controls.

## Cut Line

If time is short, cut in this exact order:

1. Cut session history.
2. Cut audio cues.
3. Cut research citations panel.
4. Cut advanced pose smoothing.
5. Cut incomplete-rep classification; keep simple rep count.
6. Cut dynamic difficulty; hardcode `same` in report.

Do not cut:
- Adaptive Chair Movement with explicit standing/seated choice.
- Reach Stars.
- Caregiver Report.
- Webcam skeleton/landmark proof.

## Implementation Order for 24-48h

1. Scaffold static Next.js app.
2. Add webcam + MediaPipe landmark overlay.
3. Implement calibration/confidence check.
4. Implement Adaptive Chair Movement counter.
5. Implement Reach Stars target hit detection with dwell guard.
6. Save session to localStorage.
7. Render Caregiver Report.
8. Add demo fallback and rehearse.

## BLOCKERS

| Risk | Mitigation |
|---|---|
| MediaPipe model load fails or CDN is slow | Bundle model assets locally if possible; add safe demo data fallback. |
| Webcam permission fails | Add clear permission screen and fallback demo mode. |
| Pose landmarks unstable with chair/camera angle | Gate drawing/counting by required landmark sets and show branch-specific framing hints. |
| Standing branch unsafe or unreliable for a participant | Use seated-adaptive branch and label the session mode in the report. |
| Live presenter movement differs from older adult movement | Present as prototype proof, not clinical validation. |

## Verification Checklist

- No backend.
- No database.
- No auth.
- Exactly 2 activities.
- Exactly 1 report screen.
- Results saved in localStorage JSON.
- Demo flows from problem -> camera magic -> report.
- Clinical claims are conservative and labeled as research-inspired proxies.
