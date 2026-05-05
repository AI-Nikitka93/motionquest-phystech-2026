"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CameraStage,
  type CameraTrackingData,
} from "@/components/CameraStage";
import {
  averageY,
  detectReachDwellHit,
  detectChairStandTransition,
  detectSeatedWristLiftTransition,
  getVisibleWristLiftDeltas,
  getPoseConfidence,
  hasUsablePose,
  type ChairStandPhase,
  type PoseConfidence,
  type SeatedArmPhase,
  type SessionMode,
  type StarTarget,
} from "@/lib/gameLogic";
import {
  buildDemoSession,
  buildSession,
  getSessions,
  saveSession,
  type MotionQuestSession,
  type SessionDraft,
} from "@/lib/sessionStorage";

type Screen = "home" | "chair" | "reach" | "report";

const createInitialDraft = (sessionMode: SessionMode): SessionDraft => ({
  sessionMode,
  primaryMovement:
    sessionMode === "seated-adaptive"
      ? "seated-arm-movement"
      : "chair-stand",
  chairReps: 0,
  seatedArmReps: 0,
  chairDurationSec: 30,
  reachTargetsShown: 0,
  reachTargetsHit: 0,
  reachReactionTimes: [],
  poseConfidence: "low",
  bodyLandmarksDetected: false,
});

const INITIAL_DRAFT = createInitialDraft("seated-adaptive");

const TARGETS: Omit<StarTarget, "id" | "shownAt">[] = [
  { label: "Left shoulder reach", x: 10, y: 24, size: 15 },
  { label: "Right shoulder reach", x: 74, y: 24, size: 15 },
  { label: "High center reach", x: 43, y: 14, size: 15 },
  { label: "Midline reach", x: 43, y: 34, size: 15 },
];

const FLOW_STEPS: { id: Screen; label: string; outcome: string }[] = [
  {
    id: "home",
    label: "1. Calibrate",
    outcome: "Problem, method, camera readiness",
  },
  {
    id: "chair",
    label: "2. Adaptive Movement",
    outcome: "Standing or seated reps",
  },
  {
    id: "reach",
    label: "3. Reach Stars",
    outcome: "Reach targets and timing",
  },
  {
    id: "report",
    label: "4. Report",
    outcome: "Caregiver-readable summary",
  },
];

export function MotionQuestApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [draft, setDraft] = useState<SessionDraft>(INITIAL_DRAFT);
  const [report, setReport] = useState<MotionQuestSession | null>(() => {
    if (typeof window === "undefined") return null;
    return getSessions()[0] ?? null;
  });

  const startOver = () => {
    setDraft(INITIAL_DRAFT);
    setReport(null);
    setScreen("home");
  };

  const loadDemo = () => {
    const demo = buildDemoSession();
    saveSession(demo);
    setReport(demo);
    setScreen("report");
  };

  const startLiveSession = (sessionMode: SessionMode) => {
    setDraft(createInitialDraft(sessionMode));
    setReport(null);
    setScreen("chair");
  };

  return (
    <main className="min-h-screen bg-[#FFF8E7] px-4 py-6 text-[#10231F] sm:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-5 rounded-lg bg-white p-6 shadow-camera">
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-[#075E54] bg-[#FFF8E7] text-3xl font-black text-[#075E54] shadow-camera">
              MQ
            </div>
            <div>
              <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
                PhysTech 2026 · Evidence-aligned exergame prototype
              </p>
              <h1 className="mt-2 text-4xl font-black leading-tight md:text-5xl">
                MotionQuest
              </h1>
              <p className="mt-3 max-w-3xl text-xl leading-relaxed text-[#394B45]">
                A browser webcam becomes a functional movement session for older
                adults: calibrate, move through two evidence-inspired
                activities, then read a caregiver-friendly report.
              </p>
            </div>
          </div>
          <div
            className="grid gap-3 text-base font-bold md:grid-cols-4"
            aria-label="MotionQuest session flow"
          >
            {FLOW_STEPS.map((step, index) => {
              const state = getFlowState(screen, step.id);
              return (
                <div
                  key={step.id}
                  className={`rounded-xl border-2 p-4 ${
                    state === "current"
                      ? "border-[#075E54] bg-[#075E54] text-white"
                      : state === "complete"
                        ? "border-[#075E54] bg-[#D8F3DC] text-[#10231F]"
                        : "border-[#D8F3DC] bg-[#FFF8E7] text-[#394B45]"
                  }`}
                >
                  <span className="block text-lg font-black">{step.label}</span>
                  <span className="mt-1 block text-base leading-snug">
                    {state === "complete" ? "Done: " : ""}
                    {step.outcome}
                  </span>
                  <span className="sr-only">
                    {index + 1} of {FLOW_STEPS.length}, {state}
                  </span>
                </div>
              );
            })}
          </div>
        </header>

        {screen === "home" ? (
          <HomeScreen onStart={startLiveSession} onDemo={loadDemo} />
        ) : null}
        {screen === "chair" ? (
          <ChairStandScreen
            draft={draft}
            onComplete={(nextDraft) => {
              setDraft(nextDraft);
              setScreen("reach");
            }}
          />
        ) : null}
        {screen === "reach" ? (
          <ReachStarsScreen
            draft={draft}
            onComplete={(nextDraft) => {
              const session = buildSession(nextDraft);
              saveSession(session);
              setReport(session);
              setScreen("report");
            }}
          />
        ) : null}
        {screen === "report" ? (
          <ReportScreen report={report} onRestart={startOver} onDemo={loadDemo} />
        ) : null}
      </div>
    </main>
  );
}

function HomeScreen({
  onStart,
  onDemo,
}: {
  onStart: (sessionMode: SessionMode) => void;
  onDemo: () => void;
}) {
  return (
    <section className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-lg bg-white p-6 shadow-camera md:p-8">
          <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
            Problem
          </p>
          <h2 className="mt-2 text-4xl font-black leading-tight">
            Older adults need movement practice that is easy to start and easy
            to explain.
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-[#394B45]">
            Many tools require wearables, accounts, or clinical context.
            MotionQuest keeps the first step simple: a browser, a webcam, two
            short movement activities, and a report that a caregiver or judge can
            understand.
          </p>
        </article>
        <article className="rounded-lg bg-[#D8F3DC] p-6 shadow-camera md:p-8">
          <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
            What MotionQuest does
          </p>
          <p className="mt-3 text-2xl font-black leading-tight">
            Webcam-guided Adaptive Chair Movement + Reach Stars + session
            report.
          </p>
          <p className="mt-4 text-xl leading-relaxed text-[#394B45]">
            The prototype estimates reps, target hits, timing, and tracking
            quality. It is research-aligned practice, not a medical test.
          </p>
        </article>
      </section>

      <JudgeDemoEntry onStart={onStart} onDemo={onDemo} />
      <ImpactMethodOutcomeStrip />
      <InfoGrid />
      <MethodAndTrust id="research-basis" />
      <JudgeVerificationSection onStart={onStart} onDemo={onDemo} />
      <CameraStage
        mode="calibration"
        title="Camera setup"
        instruction="Choose standing only if it is safe. Seated mode works with visible shoulders and arms."
      />
      <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-camera md:flex-row">
        <div className="flex-1">
          <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
            Standing path
          </p>
          <button
            type="button"
            onClick={() => onStart("standing")}
            className="mt-3 min-h-16 w-full rounded-xl bg-[#075E54] px-7 text-xl font-bold text-white hover:bg-[#064C45] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
          >
            I can stand safely
          </button>
          <p className="mt-3 text-base font-bold leading-relaxed text-[#394B45]">
            Uses the 30-second sit-to-stand branch when shoulders, hips and
            knees are visible.
          </p>
        </div>
        <div className="flex-1">
          <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
            Seated adaptive path
          </p>
          <button
            type="button"
            onClick={() => onStart("seated-adaptive")}
            className="mt-3 min-h-16 w-full rounded-xl bg-[#F6C85F] px-7 text-xl font-black text-[#10231F] hover:bg-[#E4B94E] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#075E54]"
          >
            I will stay seated
          </button>
          <p className="mt-3 text-base font-bold leading-relaxed text-[#394B45]">
            Uses visible shoulders, elbows and wrists for seated upper-body
            movement. It is not a fallback failure state.
          </p>
        </div>
        <div className="flex-1">
          <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
            Safe fallback
          </p>
          <button
            type="button"
            onClick={onDemo}
            className="mt-3 min-h-14 w-full rounded-xl border-2 border-[#075E54] bg-[#FFF8E7] px-7 text-xl font-bold text-[#10231F] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
          >
            Use Safe Demo Data
          </button>
          <p className="mt-3 text-base font-bold leading-relaxed text-[#394B45]">
            Clearly labeled fallback for no camera, no room, or stage lighting.
            It demonstrates the report format without pretending to be a live
            measurement.
          </p>
        </div>
        <div className="flex-1">
          <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
            Research basis
          </p>
          <a
            href="#research-basis"
            className="mt-3 flex min-h-14 w-full items-center justify-center rounded-xl border-2 border-[#10231F] bg-white px-7 text-center text-xl font-bold text-[#10231F] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
          >
            Review Method
          </a>
        </div>
      </div>
    </section>
  );
}

function ChairStandScreen({
  draft,
  onComplete,
}: {
  draft: SessionDraft;
  onComplete: (draft: SessionDraft) => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const isSeated = draft.sessionMode === "seated-adaptive";

  return (
    <section className="space-y-6">
      <JudgeFacingSummary
        title="Adaptive Chair Movement no longer forces everyone to stand."
        body="The first activity chooses the safest valid branch: sit-to-stand cycles for users who can stand safely, or seated upper-body movement for users who need to remain seated."
      />
      <ActivityIntroCard
        label="Activity 1"
        title="Adaptive Chair Movement"
        measures={
          isSeated
            ? [
                "Visible seated arm movement repetitions",
                "30-second session duration",
                "Upper-body pose tracking confidence",
              ]
            : [
                "Visible sit-to-stand repetitions",
                "30-second session duration",
                "Full-body pose tracking confidence",
              ]
        }
        whatCounts={
          isSeated
            ? "One seated rep counts after the arm visibly bends and returns to extended."
            : "One standing rep counts after a full stand and return to seated position."
        }
      />
      {!confirmed ? (
        <ReadinessConfirmation
          title={isSeated ? "Ready for seated adaptive movement" : "Ready for standing movement"}
          checks={
            isSeated
              ? [
                  "Stay seated in a stable chair and keep shoulders visible.",
                  "Raise and lower one visible hand in a comfortable range.",
                  "Move only in a comfortable range.",
                ]
              : [
                  "Use a stable chair and keep the camera in front of the body.",
                  "Keep shoulders, hips, knees, and ankles visible.",
                  "Stop immediately if the movement feels unsafe.",
                ]
          }
          action={isSeated ? "Start seated mode" : "I am in position"}
          onConfirm={() => setConfirmed(true)}
        />
      ) : isSeated ? (
        <CameraStage
          mode="seated"
          autoStart
          title="Seated Adaptive Movement"
          instruction="Keep shoulders visible, then raise and lower one hand."
        >
          {(tracking) => (
            <SeatedArmHud
              tracking={tracking}
              draft={draft}
              onComplete={onComplete}
            />
          )}
        </CameraStage>
      ) : (
        <CameraStage
          mode="chair"
          autoStart
          title="Chair Stand"
          instruction="Stand fully, then sit. One complete cycle counts as one rep."
        >
          {(tracking) => (
            <ChairStandHud
              tracking={tracking}
              draft={draft}
              onComplete={onComplete}
            />
          )}
        </CameraStage>
      )}
    </section>
  );
}

function ChairStandHud({
  tracking,
  draft,
  onComplete,
}: {
  tracking: CameraTrackingData;
  draft: SessionDraft;
  onComplete: (draft: SessionDraft) => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [reps, setReps] = useState(0);
  const [pulse, setPulse] = useState(false);
  const phaseRef = useRef<ChairStandPhase>("seated");
  const repsRef = useRef(0);
  const completedRef = useRef(false);
  const hasUsableChairPose = hasUsablePose(tracking.landmarks, "chair");

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete({
      ...draft,
      chairReps: repsRef.current,
      chairDurationSec: Math.max(1, 30 - secondsLeft),
      poseConfidence: mergeConfidence(draft.poseConfidence, tracking.confidence),
      bodyLandmarksDetected: draft.bodyLandmarksDetected || hasUsableChairPose,
    });
  }, [
    draft,
    hasUsableChairPose,
    onComplete,
    secondsLeft,
    tracking.confidence,
  ]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      finish();
    }
  }, [finish, secondsLeft]);

  useEffect(() => {
    const hipY = averageY(tracking.landmarks, [23, 24]);
    const kneeY = averageY(tracking.landmarks, [25, 26]);

    if (hipY === null || kneeY === null) return;

    const result = detectChairStandTransition({
      previousPhase: phaseRef.current,
      reps: repsRef.current,
      hipY,
      kneeY,
    });

    if (result.reps !== repsRef.current) {
      repsRef.current = result.reps;
      setReps(result.reps);
      setPulse(true);
      window.setTimeout(() => setPulse(false), 280);
    }
    phaseRef.current = result.phase;
  }, [tracking.landmarks]);

  return (
    <>
      <HudChip className="left-4 top-24">
        <span className="block text-base">Timer</span>
        <span className="text-6xl font-black tabular-nums">{secondsLeft}</span>
      </HudChip>
      <HudChip className="bottom-28 left-4">
        <span className="block text-base">Stands</span>
        <span
          className={`text-7xl font-black tabular-nums transition-transform ${
            pulse ? "scale-[1.04]" : "scale-100"
          }`}
        >
          {reps}
        </span>
      </HudChip>
      <HudChip className="left-4 right-4 top-4 md:left-auto md:right-4 md:max-w-sm">
        <span className="block text-base">What counts</span>
        <span className="text-xl font-black leading-snug">
          Stand tall, then return to seated. The seated return completes the rep.
        </span>
      </HudChip>
      {pulse ? (
        <div className="pointer-events-none absolute inset-0 border-[12px] border-[#D8F3DC]" />
      ) : null}
      <button
        type="button"
        onClick={finish}
        className="absolute bottom-4 right-4 min-h-14 rounded-xl bg-[#075E54] px-7 text-xl font-bold text-white hover:bg-[#064C45] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
      >
        Finish early
      </button>
    </>
  );
}

function SeatedArmHud({
  tracking,
  draft,
  onComplete,
}: {
  tracking: CameraTrackingData;
  draft: SessionDraft;
  onComplete: (draft: SessionDraft) => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [reps, setReps] = useState(0);
  const [pulse, setPulse] = useState(false);
  const phaseRef = useRef<SeatedArmPhase>("extended");
  const repsRef = useRef(0);
  const completedRef = useRef(false);
  const hasUsableSeatedPose = hasUsablePose(tracking.landmarks, "seated");

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete({
      ...draft,
      seatedArmReps: repsRef.current,
      chairDurationSec: Math.max(1, 30 - secondsLeft),
      poseConfidence: mergeConfidence(draft.poseConfidence, tracking.confidence),
      bodyLandmarksDetected: draft.bodyLandmarksDetected || hasUsableSeatedPose,
    });
  }, [
    draft,
    hasUsableSeatedPose,
    onComplete,
    secondsLeft,
    tracking.confidence,
  ]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (hasUsableSeatedPose) {
        setSecondsLeft((value) => Math.max(0, value - 1));
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [hasUsableSeatedPose]);

  useEffect(() => {
    if (secondsLeft === 0) {
      finish();
    }
  }, [finish, secondsLeft]);

  useEffect(() => {
    if (!hasUsableSeatedPose) return;

    const liftDeltas = getVisibleWristLiftDeltas(tracking.landmarks);
    if (liftDeltas.length === 0) return;

    const liftDelta = Math.max(...liftDeltas);
    const result = detectSeatedWristLiftTransition({
      previousPhase: phaseRef.current,
      reps: repsRef.current,
      liftDelta,
    });

    if (result.reps !== repsRef.current) {
      repsRef.current = result.reps;
      setReps(result.reps);
      setPulse(true);
      window.setTimeout(() => setPulse(false), 280);
    }
    phaseRef.current = result.phase;
  }, [hasUsableSeatedPose, tracking.landmarks]);

  return (
    <>
      <HudChip className="left-4 top-24">
        <span className="block text-base">Timer</span>
        <span className="text-6xl font-black tabular-nums">{secondsLeft}</span>
      </HudChip>
      <HudChip className="bottom-28 left-4">
        <span className="block text-base">Arm reps</span>
        <span
          className={`text-7xl font-black tabular-nums transition-transform ${
            pulse ? "scale-[1.04]" : "scale-100"
          }`}
        >
          {reps}
        </span>
      </HudChip>
      <HudChip className="left-4 right-4 top-4 md:left-auto md:right-4 md:max-w-sm">
        <span className="block text-base">What counts</span>
        <span className="text-xl font-black leading-snug">
          First show shoulders and one hand. Then raise and lower the same hand
          to complete the rep.
        </span>
      </HudChip>
      {!hasUsableSeatedPose ? (
        <div className="absolute bottom-28 left-4 max-w-xl rounded-xl bg-[#D8F3DC] p-4 text-xl font-bold text-[#10231F] shadow-camera">
          Timer is paused. Keep shoulders visible and raise one hand until it is
          visible.
        </div>
      ) : null}
      {pulse ? (
        <div className="pointer-events-none absolute inset-0 border-[12px] border-[#D8F3DC]" />
      ) : null}
      <button
        type="button"
        onClick={finish}
        className="absolute bottom-4 right-4 min-h-14 rounded-xl bg-[#075E54] px-7 text-xl font-bold text-white hover:bg-[#064C45] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
      >
        Finish early
      </button>
    </>
  );
}

function ReachStarsScreen({
  draft,
  onComplete,
}: {
  draft: SessionDraft;
  onComplete: (draft: SessionDraft) => void;
}) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <section className="space-y-6">
      <JudgeFacingSummary
        title="Reach Stars connects play to visible reach practice."
        body="The target game records wrist-to-target hits and timing. It is an engagement and reach-practice proxy, not a medical range-of-motion assessment."
      />
      <ActivityIntroCard
        label="Activity 2"
        title="Reach Stars"
        measures={[
          "Wrist-to-target hits",
          "Average reaction timing",
          "Pose tracking confidence",
        ]}
        whatCounts="A hit counts when either visible wrist enters the yellow star target."
      />
      {!confirmed ? (
        <ReadinessConfirmation
          title="Ready for Reach Stars"
          checks={[
            "Sit or stand far enough back to show shoulders.",
            "Raise one hand until elbow and wrist are visible.",
            "Reach only within a comfortable range.",
          ]}
          action="Start Reach Stars"
          onConfirm={() => setConfirmed(true)}
        />
      ) : (
        <CameraStage
          mode="reach"
          autoStart
          title="Reach Stars"
          instruction="Reach toward the yellow star"
        >
          {(tracking) => (
            <ReachStarsHud
              tracking={tracking}
              draft={draft}
              onComplete={onComplete}
            />
          )}
        </CameraStage>
      )}
    </section>
  );
}

function ReachStarsHud({
  tracking,
  draft,
  onComplete,
}: {
  tracking: CameraTrackingData;
  draft: SessionDraft;
  onComplete: (draft: SessionDraft) => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [shown, setShown] = useState(1);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [targetState, setTargetState] = useState(() => ({
    index: 0,
    target: makeTarget(0),
  }));
  const [feedback, setFeedback] = useState("Reach toward the yellow star");
  const hitGuardRef = useRef(false);
  const dwellStartedAtRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const target = targetState.target;
  const hasUsableReachPose = hasUsablePose(tracking.landmarks, "reach");
  const displayFeedback = hasUsableReachPose
    ? feedback
    : "Show shoulders, then raise one hand until elbow and wrist are visible.";

  const finish = useCallback(
    (confidence: PoseConfidence) => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete({
        ...draft,
        reachTargetsShown: shown,
        reachTargetsHit: score,
        reachReactionTimes: reactionTimes,
        poseConfidence: mergeConfidence(draft.poseConfidence, confidence),
        bodyLandmarksDetected: draft.bodyLandmarksDetected || hasUsableReachPose,
      });
    },
    [draft, hasUsableReachPose, onComplete, reactionTimes, score, shown],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (hasUsableReachPose) {
        setSecondsLeft((value) => Math.max(0, value - 1));
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [hasUsableReachPose]);

  useEffect(() => {
    if (!hasUsableReachPose) {
      dwellStartedAtRef.current = null;
      return;
    }

    const nowMs = performance.now();
    const dwell = detectReachDwellHit({
      landmarks: tracking.landmarks,
      target,
      nowMs,
      dwellStartedAtMs: dwellStartedAtRef.current,
    });
    dwellStartedAtRef.current = dwell.dwellStartedAtMs;

    if (!hitGuardRef.current && dwell.hit) {
      hitGuardRef.current = true;
      const reaction = Math.round(nowMs - target.shownAt);
      setReactionTimes((items) => [...items, reaction]);
      setScore((value) => value + 1);
      setShown((value) => value + 1);
      setTargetState((value) => {
        const nextIndex = value.index + 1;
        return { index: nextIndex, target: makeTarget(nextIndex) };
      });
      setFeedback("Nice steady reach");
      window.setTimeout(() => setFeedback("Reach and hold the yellow star"), 500);
    } else if (dwell.dwellStartedAtMs !== null) {
      setFeedback("Hold steady");
    } else {
      setFeedback("Reach and hold the yellow star");
    }
  }, [hasUsableReachPose, target, tracking.landmarks]);

  useEffect(() => {
    hitGuardRef.current = false;
    dwellStartedAtRef.current = null;
  }, [target.id]);

  useEffect(() => {
    if (secondsLeft === 0) {
      finish(getPoseConfidence(tracking.landmarks, "reach"));
    }
  }, [finish, secondsLeft, tracking.landmarks]);

  return (
    <>
      <HudChip className="left-4 top-24">
        <span className="block text-base">Stars</span>
        <span className="text-6xl font-black tabular-nums">{score}</span>
      </HudChip>
      <HudChip className="right-4 top-24">
        <span className="block text-base">Timer</span>
        <span className="text-6xl font-black tabular-nums">{secondsLeft}</span>
      </HudChip>
      {hasUsableReachPose ? (
        <div
          className="absolute flex items-center justify-center rounded-full border-4 border-[#10231F] bg-[#F6C85F] text-5xl font-black text-[#10231F] shadow-camera"
          style={{
            left: `${target.x}%`,
            top: `${target.y}%`,
            width: `${target.size}%`,
            aspectRatio: "1",
          }}
          aria-label={target.label}
        >
          ★
        </div>
      ) : null}
      <div className="absolute bottom-28 left-4 rounded-xl bg-[#D8F3DC] p-4 text-xl font-bold text-[#10231F] shadow-camera">
        {displayFeedback}
      </div>
      <HudChip className="left-4 right-4 top-44 md:left-auto md:right-4 md:max-w-sm">
        <span className="block text-base">What counts</span>
        <span className="text-xl font-black leading-snug">
          First show shoulders and one raised hand. Then hold your wrist inside
          the yellow target for half a second.
        </span>
      </HudChip>
      <button
        type="button"
        onClick={() => finish(getPoseConfidence(tracking.landmarks, "reach"))}
        className="absolute bottom-4 right-4 min-h-14 rounded-xl bg-[#075E54] px-7 text-xl font-bold text-white hover:bg-[#064C45] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
      >
        Finish & View Report
      </button>
    </>
  );
}

function ReportScreen({
  report,
  onRestart,
  onDemo,
}: {
  report: MotionQuestSession | null;
  onRestart: () => void;
  onDemo: () => void;
}) {
  const fallback = report ?? buildDemoSession();
  const [copyStatus, setCopyStatus] = useState("Copy report");
  const reportText = buildReportText(fallback);
  const isSafeDemo = fallback.source === "safe-demo";
  const isInvalid = fallback.trackingQuality.validity === "not-valid-enough";
  const metricBadge = isSafeDemo
    ? "Demo fallback"
    : isInvalid
      ? "Not valid"
      : "Measured";

  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(reportText);
      setCopyStatus("Copied");
      window.setTimeout(() => setCopyStatus("Copy report"), 1400);
    } catch {
      setCopyStatus("Copy unavailable");
      window.setTimeout(() => setCopyStatus("Copy report"), 1800);
    }
  };

  return (
    <section className="space-y-6 text-[#10231F]">
      <article className="rounded-lg bg-white p-6 shadow-camera md:p-8">
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          Caregiver Report
        </p>
        <h2 className="mt-2 text-4xl font-black leading-tight">
          Today&apos;s Movement Summary
        </h2>
        <p className="mt-4 max-w-4xl text-xl leading-relaxed text-[#394B45]">
          {fallback.report.summary}
        </p>
        {isSafeDemo ? (
          <p className="mt-4 rounded-lg bg-[#FFE8A3] p-4 text-lg font-black leading-relaxed text-[#10231F]">
            This is labeled safe demo data for presentation fallback. It is not
            a live webcam measurement.
          </p>
        ) : null}
      </article>

      <section className="rounded-lg bg-white p-6 shadow-camera md:p-8">
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          Metrics
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <MetricCard
            label={fallback.adaptiveMovement.label}
            value={`${fallback.adaptiveMovement.reps}`}
            note={`30-sec ${fallback.sessionMode === "seated-adaptive" ? "seated adaptive" : "standing"} branch, avg ${fallback.adaptiveMovement.avgRepSec ?? "n/a"} sec per rep`}
            badge={metricBadge}
          />
          <MetricCard
            label="Reach Stars"
            value={`${fallback.reachStars.targetsHit}/${fallback.reachStars.targetsShown}`}
            note={`Avg reaction ${fallback.reachStars.avgReactionMs ?? "n/a"} ms`}
            badge={metricBadge}
          />
          <MetricCard
            label="Tracking"
            value={fallback.poseConfidence}
            note="Browser webcam pose confidence"
            badge={metricBadge}
          />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <article
          className={`rounded-lg p-6 text-xl leading-relaxed shadow-camera ${
            isInvalid ? "bg-[#FFE8A3]" : "bg-[#D8F3DC]"
          }`}
        >
          <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
            Interpretation
          </p>
          <p className="mt-3">{fallback.report.interpretation}</p>
        </article>
        <article className="rounded-lg bg-[#FFE8A3] p-6 text-xl leading-relaxed shadow-camera">
          <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
            Next session suggestion
          </p>
          <p className="mt-3">
            Suggested difficulty:{" "}
            <strong className="font-black">
              {fallback.report.nextDifficulty}
            </strong>
            . Keep the setup conservative unless tracking stays high and the
            movement feels comfortable.
          </p>
        </article>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="rounded-lg border-2 border-[#D8F3DC] bg-white p-5 text-lg leading-relaxed">
          <h3 className="text-2xl font-black">Method used</h3>
          <p className="mt-2 text-[#394B45]">
            Browser webcam pose tracking estimated the selected adaptive
            movement branch, reach-target hits, reaction timing, and tracking
            confidence for this single session.
          </p>
        </article>
        <article className="rounded-lg border-2 border-[#FFE8A3] bg-[#FFF8E7] p-5 text-lg leading-relaxed">
          <h3 className="text-2xl font-black">Limitations</h3>
          <ul className="mt-2 space-y-2 text-[#394B45]">
            {fallback.trackingQuality.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section
        className={`rounded-lg border-2 p-6 shadow-camera ${
          fallback.trackingQuality.validity === "valid"
            ? "border-[#075E54] bg-[#D8F3DC]"
            : "border-[#F6C85F] bg-[#FFE8A3]"
        }`}
      >
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          Tracking quality
        </p>
        <h3 className="mt-2 text-3xl font-black leading-tight">
          {trackingQualityTitle(fallback.trackingQuality.validity)}
        </h3>
        <p className="mt-3 text-xl leading-relaxed text-[#10231F]">
          {trackingQualityText(fallback)}
        </p>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-camera">
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          Export
        </p>
        <p className="mt-3 rounded-lg bg-[#FFE8A3] p-4 text-base font-bold leading-relaxed">
          {fallback.report.disclaimer}
        </p>
        <pre className="mt-5 whitespace-pre-wrap rounded-lg border-2 border-[#D8F3DC] bg-[#FFF8E7] p-5 text-base font-bold leading-relaxed text-[#10231F]">
          {reportText}
        </pre>
      </section>

      <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-camera md:flex-row">
        <button
          type="button"
          onClick={onRestart}
          className="min-h-16 flex-1 rounded-xl bg-[#075E54] px-7 text-xl font-bold text-white hover:bg-[#064C45] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
        >
          Run again
        </button>
        <button
          type="button"
          onClick={() => void copyReport()}
          className="min-h-14 flex-1 rounded-xl border-2 border-[#075E54] bg-white px-7 text-xl font-bold text-[#10231F] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
        >
          {copyStatus}
        </button>
        <button
          type="button"
          onClick={() => downloadReport(reportText, fallback)}
          className="min-h-14 flex-1 rounded-xl border-2 border-[#075E54] bg-white px-7 text-xl font-bold text-[#10231F] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
        >
          Download report
        </button>
        <button
          type="button"
          onClick={onDemo}
          className="min-h-14 flex-1 rounded-xl border-2 border-[#075E54] bg-[#FFF8E7] px-7 text-xl font-bold text-[#10231F] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
        >
          Load safe demo data
        </button>
      </div>
    </section>
  );
}

function ImpactMethodOutcomeStrip() {
  return (
    <section
      className="grid gap-4 rounded-lg bg-[#10231F] p-5 text-white shadow-camera lg:grid-cols-3"
      aria-label="MotionQuest impact method and outcome"
    >
      <OutcomeProofCard
        label="Impact"
        title="Lower-friction movement practice"
        body="Older adults and caregivers can start with a webcam instead of accounts, wearables, or clinic-only tools."
      />
      <OutcomeProofCard
        label="Method"
        title="Functional tasks, not generic play"
        body="Chair Stand and Reach Stars map the game flow to measurable movement constructs and tracking quality."
      />
      <OutcomeProofCard
        label="Outcome"
        title="A readable session artifact"
        body="The report turns reps, target hits, timing, confidence, method, limits, and next-session guidance into one copyable note."
      />
    </section>
  );
}

function OutcomeProofCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-lg border-2 border-white/20 bg-white/10 p-5">
      <p className="text-base font-black uppercase tracking-wide text-[#F6C85F]">
        {label}
      </p>
      <h2 className="mt-2 text-3xl font-black leading-tight">{title}</h2>
      <p className="mt-3 text-lg font-bold leading-relaxed text-white/95">
        {body}
      </p>
    </article>
  );
}

function JudgeDemoEntry({
  onStart,
  onDemo,
}: {
  onStart: (sessionMode: SessionMode) => void;
  onDemo: () => void;
}) {
  return (
    <section className="rounded-lg bg-[#10231F] p-6 text-white shadow-camera md:p-8">
      <p className="text-base font-bold uppercase tracking-wide text-[#F6C85F]">
        Judge Demo · 90 seconds
      </p>
      <h2 className="mt-2 text-3xl font-black leading-tight">
        A guided walkthrough from problem to camera proof to report.
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        <DemoStep time="0-15s" text="State the problem and why no wearable is needed." />
        <DemoStep time="15-35s" text="Run camera check and show visible pose tracking." />
        <DemoStep time="35-65s" text="Choose standing or seated adaptive movement, then complete Reach Stars or use fallback if stage conditions fail." />
        <DemoStep time="65-90s" text="Open the caregiver report and show metrics, limits, and export." />
      </div>
      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <button
          type="button"
          onClick={() => onStart("seated-adaptive")}
          className="min-h-16 flex-1 rounded-xl bg-[#F6C85F] px-7 text-xl font-black text-[#10231F] focus-visible:outline focus-visible:outline-4 focus-visible:outline-white"
        >
          Start Seated Judge Walkthrough
        </button>
        <button
          type="button"
          onClick={onDemo}
          className="min-h-14 flex-1 rounded-xl border-2 border-[#F6C85F] px-7 text-xl font-black text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-white"
        >
          Open Labeled Safe Demo Report
        </button>
      </div>
    </section>
  );
}

function JudgeVerificationSection({
  onStart,
  onDemo,
}: {
  onStart: (sessionMode: SessionMode) => void;
  onDemo: () => void;
}) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-camera md:p-8">
      <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
        For judges
      </p>
      <h2 className="mt-2 text-3xl font-black leading-tight">
        How to verify the actual outcome in under two minutes.
      </h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <VerificationStep
          number="1"
          title="Open the live app"
          body="Use the public HTTPS deployment and choose the live camera path when camera and room conditions allow it."
        />
        <VerificationStep
          number="2"
          title="Complete the flow"
          body="Run Adaptive Chair Movement, then Reach Stars. Each activity shows what counts and what the browser is measuring."
        />
        <VerificationStep
          number="3"
          title="Check the artifact"
          body="The Caregiver Report displays metrics, interpretation, method, limitations, next-session guidance, and a copyable export."
        />
      </div>
      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <button
          type="button"
          onClick={() => onStart("seated-adaptive")}
          className="min-h-16 flex-1 rounded-xl bg-[#075E54] px-7 text-xl font-bold text-white hover:bg-[#064C45] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
        >
          Verify Seated Camera Flow
        </button>
        <button
          type="button"
          onClick={onDemo}
          className="min-h-14 flex-1 rounded-xl border-2 border-[#075E54] bg-[#FFF8E7] px-7 text-xl font-bold text-[#10231F] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
        >
          Verify Safe Demo Report
        </button>
      </div>
    </section>
  );
}

function VerificationStep({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-lg border-2 border-[#D8F3DC] bg-[#FFF8E7] p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#075E54] text-2xl font-black text-white">
        {number}
      </div>
      <h3 className="mt-4 text-2xl font-black leading-tight">{title}</h3>
      <p className="mt-3 text-lg font-bold leading-relaxed text-[#394B45]">
        {body}
      </p>
    </article>
  );
}

function DemoStep({ time, text }: { time: string; text: string }) {
  return (
    <article className="rounded-lg border-2 border-white/25 bg-white/10 p-4">
      <p className="text-2xl font-black text-[#F6C85F]">{time}</p>
      <p className="mt-2 text-lg font-bold leading-relaxed">{text}</p>
    </article>
  );
}

function ActivityIntroCard({
  label,
  title,
  measures,
  whatCounts,
}: {
  label: string;
  title: string;
  measures: string[];
  whatCounts: string;
}) {
  return (
    <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <article className="rounded-lg bg-white p-6 shadow-camera">
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          {label}
        </p>
        <h2 className="mt-2 text-3xl font-black leading-tight">{title}</h2>
        <p className="mt-4 rounded-lg bg-[#D8F3DC] p-4 text-xl font-bold leading-relaxed">
          {whatCounts}
        </p>
      </article>
      <article className="rounded-lg bg-[#FFF8E7] p-6 shadow-camera">
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          Measured in this activity
        </p>
        <ul className="mt-4 space-y-3 text-xl font-bold leading-relaxed">
          {measures.map((item) => (
            <li key={item} className="rounded-lg bg-white p-4">
              {item}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function ReadinessConfirmation({
  title,
  checks,
  action,
  onConfirm,
}: {
  title: string;
  checks: string[];
  action: string;
  onConfirm: () => void;
}) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-camera md:p-8">
      <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
        Readiness confirmation
      </p>
      <h2 className="mt-2 text-3xl font-black leading-tight">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {checks.map((check) => (
          <div
            key={check}
            className="rounded-lg border-2 border-[#D8F3DC] bg-[#FFF8E7] p-4 text-xl font-bold leading-relaxed"
          >
            {check}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onConfirm}
        className="mt-6 min-h-16 w-full rounded-xl bg-[#075E54] px-7 text-xl font-bold text-white hover:bg-[#064C45] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F] md:w-auto"
      >
        {action}
      </button>
    </section>
  );
}

function MetricCard({
  label,
  value,
  note,
  badge,
}: {
  label: string;
  value: string;
  note: string;
  badge: string;
}) {
  return (
    <article className="rounded-lg border-2 border-[#075E54] bg-white p-6 shadow-camera">
      <div className="flex items-start justify-between gap-3">
        <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
          {label}
        </p>
        <span className="rounded-full bg-[#D8F3DC] px-3 py-2 text-base font-black text-[#10231F]">
          {badge}
        </span>
      </div>
      <p className="mt-5 border-y-2 border-[#D8F3DC] py-5 text-6xl font-black leading-none tabular-nums">
        {value}
      </p>
      <p className="mt-4 text-lg font-bold leading-relaxed text-[#394B45]">
        {note}
      </p>
    </article>
  );
}

function HudChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`absolute rounded-xl bg-[#071B17]/85 p-4 text-white shadow-camera ${className}`}
    >
      {children}
    </div>
  );
}

function InfoGrid() {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      <InfoCard
        label="1. Calibrate"
        title="Frame the body"
        body="The app checks camera readiness and whether key landmarks are visible before movement."
      />
      <InfoCard
        label="2. Move"
        title="Two short activities"
        body="Adaptive Chair Movement supports standing or seated reps. Reach Stars records wrist-to-target interactions."
      />
      <InfoCard
        label="3. Read report"
        title="Explain the session"
        body="The result is a caregiver-readable summary with metrics, tracking quality, and limitations."
      />
    </section>
  );
}

function MethodAndTrust({ id }: { id: string }) {
  return (
    <section id={id} className="grid scroll-mt-6 gap-5 lg:grid-cols-3">
      <article className="rounded-lg border-2 border-[#D8F3DC] bg-white p-6 shadow-camera lg:col-span-2">
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          Method + evidence
        </p>
        <h2 className="mt-2 text-3xl font-black leading-tight">
          Functional movement constructs, not generic points.
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <EvidenceNote label="Basis" text="Research-inspired functional tasks" />
          <EvidenceNote label="Signal" text="Reps, targets, timing, confidence" />
          <EvidenceNote label="Boundary" text="Practice feedback, not diagnosis" />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <MiniMethod
            title="Adaptive Chair Movement"
            body="Supports a standing sit-to-stand branch and a seated upper-body branch so the app does not exclude users who cannot stand."
          />
          <MiniMethod
            title="Reach Stars"
            body="A reach-practice target activity. MotionQuest records wrist-to-target hits and timing when available."
          />
        </div>
      </article>
      <article className="rounded-lg bg-[#FFE8A3] p-6 shadow-camera">
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          Privacy + limits
        </p>
        <p className="mt-3 text-xl font-bold leading-relaxed">
          Video stays in the browser. No account, backend, or database is needed
          for this MVP.
        </p>
        <p className="mt-4 text-lg font-bold leading-relaxed text-[#394B45]">
          MotionQuest is a hackathon prototype. It does not diagnose, predict
          falls, or replace professional evaluation.
        </p>
      </article>
    </section>
  );
}

function EvidenceNote({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-lg bg-[#D8F3DC] p-4">
      <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
        {label}
      </p>
      <p className="mt-2 text-lg font-black leading-relaxed text-[#10231F]">
        {text}
      </p>
    </div>
  );
}

function buildReportText(session: MotionQuestSession) {
  return [
    "MotionQuest session report",
    `Created: ${new Date(session.createdAt).toLocaleString()}`,
    `Source: ${session.source === "safe-demo" ? "safe demo fallback" : "live camera session"}`,
    `Session mode: ${session.sessionMode}`,
    `Primary movement: ${session.primaryMovement}`,
    `Adaptive movement: ${session.adaptiveMovement.reps} ${session.adaptiveMovement.label} reps in ${session.adaptiveMovement.durationSec}s`,
    `Chair Stand: ${session.chairStand.reps} reps in ${session.chairStand.durationSec}s`,
    `Reach Stars: ${session.reachStars.targetsHit}/${session.reachStars.targetsShown} targets`,
    `Average reach reaction: ${session.reachStars.avgReactionMs ?? "n/a"} ms`,
    `Tracking confidence: ${session.poseConfidence}`,
    `Tracking validity: ${session.trackingQuality.validity}`,
    `Next session suggestion: ${session.report.nextDifficulty}`,
    `Interpretation: ${session.report.interpretation}`,
    `Limitations: ${session.trackingQuality.limitations.join(" | ")}`,
    "Limit: practice feedback only; not a medical assessment.",
  ].join("\n");
}

function trackingQualityTitle(
  validity: MotionQuestSession["trackingQuality"]["validity"],
) {
  if (validity === "valid") return "Usable practice report";
  if (validity === "limited") return "Limited tracking quality";
  return "Session not valid enough";
}

function trackingQualityText(session: MotionQuestSession) {
  if (session.trackingQuality.validity === "valid") {
    return "Required movement data was visible enough to create a practice report.";
  }
  if (session.trackingQuality.validity === "limited") {
    return "The report is still readable, but low pose confidence means the counts may be incomplete. Repeat with better lighting and full-body visibility before relying on the trend.";
  }
  return "The app did not detect enough body landmarks to treat this as a usable session. Repeat calibration before judging the movement result.";
}

function downloadReport(reportText: string, session: MotionQuestSession) {
  const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${session.id}.txt`;
  document.body.append(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

function JudgeFacingSummary({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-camera">
      <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
        For judges
      </p>
      <h2 className="mt-2 text-3xl font-black leading-tight">{title}</h2>
      <p className="mt-3 max-w-5xl text-xl leading-relaxed text-[#394B45]">
        {body}
      </p>
    </section>
  );
}

function InfoCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-lg bg-white p-6 shadow-camera">
      <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
        {label}
      </p>
      <h3 className="mt-2 text-2xl font-black leading-tight">{title}</h3>
      <p className="mt-3 text-lg leading-relaxed text-[#394B45]">{body}</p>
    </article>
  );
}

function MiniMethod({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg border-2 border-[#D8F3DC] bg-[#FFF8E7] p-5">
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-2 text-lg leading-relaxed text-[#394B45]">{body}</p>
    </article>
  );
}

function getFlowState(current: Screen, step: Screen) {
  const currentIndex = FLOW_STEPS.findIndex((item) => item.id === current);
  const stepIndex = FLOW_STEPS.findIndex((item) => item.id === step);
  if (stepIndex < currentIndex) return "complete";
  if (stepIndex === currentIndex) return "current";
  return "upcoming";
}

function mergeConfidence(
  previous: PoseConfidence,
  current: PoseConfidence,
): PoseConfidence {
  const rank: Record<PoseConfidence, number> = { low: 0, medium: 1, high: 2 };
  return rank[current] > rank[previous] ? current : previous;
}

function makeTarget(index: number): StarTarget {
  const config = TARGETS[index % TARGETS.length];
  return {
    ...config,
    id: `target-${index}`,
    shownAt:
      typeof performance !== "undefined" ? performance.now() : Date.now(),
  };
}
