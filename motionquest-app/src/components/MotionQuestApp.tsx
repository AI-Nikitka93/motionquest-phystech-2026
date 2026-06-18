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
import {
  beforeAfterSlide,
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
  type MotionQuestIcon,
} from "@/lib/visualSystem";

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
  { label: "Left shoulder reach", x: 11, y: 27, size: 18 },
  { label: "Right shoulder reach", x: 71, y: 27, size: 18 },
  { label: "High center reach", x: 41, y: 18, size: 18 },
  { label: "Midline reach", x: 41, y: 40, size: 18 },
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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <header className="rounded-lg bg-white p-5 shadow-camera">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-4 border-[#075E54] bg-[#FFF8E7] text-2xl font-black text-[#075E54] shadow-camera">
              MQ
            </div>
            <div>
              <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
                PhysTech 2026 · Evidence-aligned exergame session
              </p>
              <h1 className="mt-1 text-3xl font-black leading-tight md:text-4xl">
                MotionQuest
              </h1>
              <p className="mt-1 max-w-3xl text-lg font-bold leading-relaxed text-[#394B45]">
                Webcam movement practice with a clear report.
              </p>
            </div>
          </div>
          {screen !== "home" ? (
            <div
              className="mt-4 grid gap-3 text-base font-bold md:grid-cols-4"
              aria-label="MotionQuest session flow"
            >
              {FLOW_STEPS.map((step, index) => {
                const state = getFlowState(screen, step.id);
                return (
                  <div
                    key={step.id}
                    className={`rounded-xl border-2 p-3 ${
                      state === "current"
                        ? "border-[#075E54] bg-[#075E54] text-white"
                        : state === "complete"
                          ? "border-[#075E54] bg-[#D8F3DC] text-[#10231F]"
                          : "border-[#D8F3DC] bg-[#FFF8E7] text-[#394B45]"
                    }`}
                  >
                    <span className="block text-lg font-black">{step.label}</span>
                    <span className="sr-only">
                      {index + 1} of {FLOW_STEPS.length}, {state}. {step.outcome}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : null}
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
    <section className="space-y-5">
      <section className="rounded-lg bg-white p-5 shadow-camera">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
              Adaptive Home Movement Lab
            </p>
            <h2 className="mt-2 max-w-4xl text-4xl font-black leading-tight md:text-5xl">
              Movement practice that includes seated users and ends in a report.
            </h2>
            <p className="mt-4 max-w-4xl text-xl font-bold leading-relaxed text-[#394B45]">
              MotionQuest turns one browser webcam into a short, confidence-aware
              activity session for older adults, seated users and caregivers.
            </p>
          </div>
          <div className="rounded-xl border-2 border-[#075E54] bg-[#D8F3DC] p-5">
            <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
              90-second judge path
            </p>
            <ol className="mt-3 space-y-2 text-lg font-black leading-relaxed">
              <li>1. Choose seated adaptive.</li>
              <li>2. Run movement plus Reach Stars.</li>
              <li>3. Verify the caregiver-readable report.</li>
            </ol>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <ProofPillar title="Impact: seated users included" body="The product does not treat seated movement as failure." />
          <ProofPillar title="Creativity: confidence-aware webcam lab" body="Camera limits become visible report language." />
          <ProofPillar title="Presentation: report judges can verify" body="The outcome is a readable artifact, not only a score." />
        </div>
        <p className="mt-5 text-base font-black uppercase tracking-wide text-[#394B45]">
          Start
        </p>
        <p className="mt-2 text-2xl font-black leading-tight">
          Choose a live path or open the labeled demo.
        </p>
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <button
            type="button"
            onClick={() => onStart("standing")}
            className="min-h-14 flex-1 rounded-xl bg-[#075E54] px-6 text-lg font-bold text-white hover:bg-[#064C45] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
          >
            I can stand safely
          </button>
          <button
            type="button"
            onClick={() => onStart("seated-adaptive")}
            className="min-h-14 flex-1 rounded-xl bg-[#F6C85F] px-6 text-lg font-black text-[#10231F] hover:bg-[#E4B94E] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#075E54]"
          >
            Seated adaptive
          </button>
          <button
            type="button"
            onClick={onDemo}
            className="min-h-14 flex-1 rounded-xl border-2 border-[#075E54] bg-[#FFF8E7] px-6 text-lg font-bold text-[#10231F] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
          >
            Safe demo
          </button>
        </div>
        <p className="mt-3 text-base font-black text-[#394B45]">
          No account. No wearable. Camera only during the session.
        </p>
      </section>
      <CameraStage
        mode="calibration"
        title="Camera setup"
        instruction="Choose the movement path first, then let the camera check whether the chosen setup is observable."
      />
      <details
        id="research-basis"
        className="rounded-lg border-2 border-[#075E54] bg-white p-5 shadow-camera"
      >
        <summary className="cursor-pointer text-xl font-black leading-tight text-[#10231F] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]">
          Research, safety and judge evidence
        </summary>
        <div className="mt-5 space-y-6">
          <BeforeCameraUse />
          <DignityPrivacyCard />
          <ImpactMethodOutcomeStrip />
          <InfoGrid />
          <MethodAndTrust id="method-detail" />
          <VisualSystemSection />
          <PhaseFiveAcceptanceMatrix />
          <PhaseSixTrustContract />
          <JudgeVerificationSection onStart={onStart} onDemo={onDemo} />
        </div>
      </details>
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
                "Hand tracking confidence",
              ]
            : [
                "Visible sit-to-stand repetitions",
                "30-second session duration",
                "Full-body pose tracking confidence",
              ]
        }
        whatCounts={
          isSeated
            ? "One seated rep counts after one visible open hand raises and lowers in view. No lower-body ability is inferred."
            : "One standing rep counts after a full stand and return to seated position while full-body tracking is usable."
        }
      />
      {!confirmed ? (
        <ReadinessConfirmation
          title={isSeated ? "Ready for seated adaptive movement" : "Ready for standing movement"}
          checks={
            isSeated
              ? [
                "Stay seated in a stable chair.",
                "Raise and lower one open hand where the camera can see it.",
                "Move only in a comfortable range.",
                "Stop if the movement feels uncomfortable.",
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
          instruction="Stay seated, then raise and lower one open hand."
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
      if (hasUsableChairPose) {
        setSecondsLeft((value) => Math.max(0, value - 1));
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [hasUsableChairPose]);

  useEffect(() => {
    if (secondsLeft === 0) {
      finish();
    }
  }, [finish, secondsLeft]);

  useEffect(() => {
    if (!hasUsableChairPose) return;

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
  }, [hasUsableChairPose, tracking.landmarks]);

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
      <HudChip className="left-4 right-4 top-44 md:left-auto md:right-4 md:top-24 md:max-w-sm">
        <span className="block text-base">What counts</span>
        <span className="text-xl font-black leading-snug">
          Stand tall, then return to seated. The seated return completes the rep.
        </span>
      </HudChip>
      {!hasUsableChairPose ? (
        <div className="absolute bottom-28 left-4 max-w-xl rounded-xl bg-[#D8F3DC] p-4 text-xl font-bold text-[#10231F] shadow-camera">
          Timer is paused. Keep shoulders, hips and knees visible before the
          standing branch can count.
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
      <HudChip className="left-4 right-4 top-44 md:left-auto md:right-4 md:top-24 md:max-w-sm">
        <span className="block text-base">What counts</span>
        <span className="text-xl font-black leading-snug">
          Seated mode is already selected. Raise and lower the same visible hand
          to complete the rep.
        </span>
      </HudChip>
      {!hasUsableSeatedPose ? (
        <div className="absolute bottom-28 left-4 max-w-xl rounded-xl bg-[#D8F3DC] p-4 text-xl font-bold text-[#10231F] shadow-camera">
          Timer is paused. Raise one open hand where the camera can see it.
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
      <CompletionBridge
        label="Activity 1 saved"
        title="Adaptive movement is complete. Continue into Reach Stars."
        body="The next step keeps the flow natural: one movement branch is saved first, then the reach activity adds target interaction and timing before the report."
      />
      <JudgeFacingSummary
        title="Reach Stars connects play to visible reach practice."
        body="The target game records visible hand-to-target hits and timing. It is an engagement and reach-practice proxy, not a medical range-of-motion assessment."
      />
      <ActivityIntroCard
        label="Activity 2"
        title="Reach Stars"
        measures={[
          "Hand-to-target hits",
          "Average reaction timing",
          "Pose tracking confidence",
        ]}
        whatCounts="A hit counts when the yellow target overlaps the visible hand area for half a second."
      />
      {!confirmed ? (
        <ReadinessConfirmation
          title="Ready for Reach Stars"
          checks={[
            "Sit or stand in a comfortable position.",
            "Raise one open hand where the camera can see it.",
            "Reach only within a comfortable range; large targets are enough.",
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
    : "Raise one open hand where the camera can see it.";

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
          Cover the yellow target with one visible hand and hold for half a
          second.
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
  const [copyStatus, setCopyStatus] = useState("Copy practice note");
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
      window.setTimeout(() => setCopyStatus("Copy practice note"), 1400);
    } catch {
      setCopyStatus("Copy unavailable");
      window.setTimeout(() => setCopyStatus("Copy practice note"), 1800);
    }
  };

  return (
    <section className="space-y-6 text-[#10231F]">
      <CompletionBridge
        label="Session complete"
        title="Movement is finished. Review the caregiver-readable practice note."
        body="The report is the handoff: it states what was observed, what was limited, and what should happen next without implying an official medical record."
      />
      <article className="rounded-lg bg-white p-6 shadow-camera md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
              Caregiver Report
            </p>
            <h2 className="mt-2 text-4xl font-black leading-tight">
              Today&apos;s Movement Summary
            </h2>
            <p className="mt-4 max-w-4xl text-xl leading-relaxed text-[#394B45]">
              {fallback.report.summary}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-[#075E54] bg-[#D8F3DC] p-5 text-[#10231F] lg:max-w-sm">
            <IconMark icon="report" />
            <p className="mt-3 text-base font-black uppercase tracking-wide text-[#394B45]">
              Caregiver artifact
            </p>
            <p className="mt-2 text-xl font-black leading-snug">
              Plain-language session note with counts, confidence, limits and
              next safe step.
            </p>
          </div>
        </div>
        {isSafeDemo ? (
          <p className="mt-4 rounded-lg bg-[#FFE8A3] p-4 text-lg font-black leading-relaxed text-[#10231F]">
            This is labeled safe demo data for presentation fallback. It is not
            a live webcam measurement.
          </p>
        ) : null}
      </article>

      <section className="grid gap-4 rounded-lg border-2 border-[#075E54] bg-[#D8F3DC] p-6 shadow-camera md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div>
          <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
            Why this report matters
          </p>
          <h2 className="mt-2 text-3xl font-black leading-tight">
            Observed movement, visible limitations, and next safe step in one handoff note.
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <ReportProof title="Observed" body="Counts and reach hits stay tied to one session." />
          <ReportProof title="Limited" body="Confidence and camera limits stay visible." />
          <ReportProof title="Actionable" body="The next step is conservative and non-medical." />
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-camera md:p-8">
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          Observed activity
        </p>
        <p className="mt-3 text-lg font-bold leading-relaxed text-[#394B45]">
          {fallback.source === "safe-demo"
            ? "Sample session - not live camera data."
            : "Live camera session."}{" "}
          The numbers below describe this single practice session only.
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <MetricCard
            label={fallback.adaptiveMovement.label}
            value={`${fallback.adaptiveMovement.reps}`}
            note={`30-sec ${fallback.sessionMode === "seated-adaptive" ? "seated adaptive" : "standing"} branch, avg ${fallback.adaptiveMovement.avgRepSec ?? "n/a"} sec per rep`}
            badge={metricBadge}
            confidenceNote={movementConfidenceNote(fallback)}
          />
          <MetricCard
            label="Reach Stars"
            value={`${fallback.reachStars.targetsHit}/${fallback.reachStars.targetsShown}`}
            note={`Avg reaction ${fallback.reachStars.avgReactionMs ?? "n/a"} ms`}
            badge={metricBadge}
            confidenceNote={reachConfidenceNote(fallback)}
          />
          <MetricCard
            label="Tracking"
            value={fallback.poseConfidence}
            note="Browser webcam pose confidence"
            badge={metricBadge}
            confidenceNote={trackingConfidenceNote(fallback)}
          />
        </div>
      </section>

      {isSafeDemo ? <SampleDataBanner /> : null}

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
          <div className="flex items-center gap-3">
            <IconMark icon="evidence" />
            <h3 className="text-2xl font-black">Method used</h3>
          </div>
          <p className="mt-2 text-[#394B45]">
            Browser webcam pose tracking estimated the selected adaptive
            movement branch, reach-target hits, reaction timing, and tracking
            confidence for this single session.
          </p>
        </article>
        <article className="rounded-lg border-2 border-[#FFE8A3] bg-[#FFF8E7] p-5 text-lg leading-relaxed">
          <div className="flex items-center gap-3">
            <IconMark icon="warning" />
            <h3 className="text-2xl font-black">Limitations</h3>
          </div>
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
          Confidence
        </p>
        <h3 className="mt-2 text-3xl font-black leading-tight">
          {trackingQualityTitle(fallback.trackingQuality.validity)}
        </h3>
        <p className="mt-3 text-xl leading-relaxed text-[#10231F]">
          {trackingQualityText(fallback)}
        </p>
      </section>

      <PhaseSixTrustContract compact />

      <section className="rounded-lg bg-white p-6 shadow-camera md:p-8">
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          Evidence surface
        </p>
        <h3 className="mt-2 text-3xl font-black leading-tight">
          Why this report is useful, and where it stops.
        </h3>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {evidenceCards.map((card) => (
            <EvidenceReferenceCard key={card.title} {...card} />
          ))}
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-lg bg-[#FFF8E7] p-5">
            <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
              Mini-bibliography
            </p>
            <ul className="mt-3 space-y-3">
              {miniBibliography.map((item) => (
                <li key={item.label} className="rounded-lg bg-white p-4">
                  <p className="text-xl font-black">{item.label}</p>
                  <p className="mt-1 text-lg font-bold leading-relaxed text-[#394B45]">
                    {item.note}
                  </p>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg bg-[#D8F3DC] p-5">
            <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
              Confidence by mode
            </p>
            <div className="mt-3 grid gap-3">
              {confidenceByMode.map((item) => (
                <div key={item.mode} className="rounded-lg bg-white p-4">
                  <p className="text-xl font-black">{item.mode}</p>
                  <p className="mt-1 text-lg font-bold leading-relaxed text-[#394B45]">
                    Observes: {item.observes}
                  </p>
                  <p className="mt-1 text-lg font-bold leading-relaxed text-[#394B45]">
                    Boundary: {item.boundary}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-camera">
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          Export
        </p>
        <p className="mt-3 rounded-lg bg-[#FFE8A3] p-4 text-base font-bold leading-relaxed">
          {fallback.report.disclaimer} This export is a personal practice note,
          not an official medical record.
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
          Download practice note
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

function CompletionBridge({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <section className="rounded-lg border-2 border-[#075E54] bg-[#D8F3DC] p-5 shadow-camera">
      <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
        {label}
      </p>
      <h2 className="mt-2 text-3xl font-black leading-tight">{title}</h2>
      <p className="mt-3 text-lg font-bold leading-relaxed text-[#394B45]">
        {body}
      </p>
    </section>
  );
}

function BeforeCameraUse() {
  return (
    <section className="rounded-lg border-2 border-[#075E54] bg-white p-6 shadow-camera md:p-8">
      <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
        Before camera use
      </p>
      <h2 className="mt-2 text-3xl font-black leading-tight">
        The participant sees the purpose, safe choice and proof path first.
      </h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {homeProofPathItems.map((item) => (
          <article key={item.title} className="rounded-lg bg-[#FFF8E7] p-5">
            <h3 className="text-2xl font-black">{item.title}</h3>
            <p className="mt-2 text-lg font-bold leading-relaxed text-[#394B45]">
              {item.body}
            </p>
          </article>
        ))}
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
        title="The report is the product outcome"
        body="The activity exists to produce a caregiver-readable artifact: observed movement, confidence, limitations, interpretation, and next safe step in one copyable note."
      />
    </section>
  );
}

function DignityPrivacyCard() {
  return (
    <section className="rounded-lg border-2 border-[#075E54] bg-white p-6 shadow-camera md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
            Dignity & Privacy Promise
          </p>
          <h2 className="mt-2 text-3xl font-black leading-tight">
            Camera movement practice without hidden data capture.
          </h2>
          <p className="mt-3 max-w-4xl text-xl leading-relaxed text-[#394B45]">
            MotionQuest makes trust visible before the participant starts. The
            app uses the camera for the session, stores report data locally, and
            avoids raw video retention. Privacy promises are written to match
            what the browser app actually does.
          </p>
        </div>
        <div className="rounded-2xl bg-[#D8F3DC] p-5 text-xl font-black leading-tight text-[#10231F] lg:max-w-xs">
          Participant dignity is part of the product, not fine print.
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {dignityPrivacyItems.map((item) => (
          <TrustPromiseItem key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

function PhaseSixTrustContract({ compact = false }: { compact?: boolean }) {
  return (
    <section className="space-y-5 rounded-lg border-2 border-[#075E54] bg-white p-6 shadow-camera md:p-8">
      <div>
        <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
          Phase 6 trust contract
        </p>
        <h2 className="mt-2 text-3xl font-black leading-tight">
          Confidence, safety, privacy and dignity are explicit product behavior.
        </h2>
        <p className="mt-3 max-w-5xl text-xl font-bold leading-relaxed text-[#394B45]">
          MotionQuest weakens claims when observation is weak. It never turns a
          seated adaptation, camera problem or sample session into fake success.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {phaseSixSafetyPrivacyItems.map((item) => (
          <article key={item.title} className="rounded-lg bg-[#D8F3DC] p-4">
            <h3 className="text-2xl font-black">{item.title}</h3>
            <p className="mt-2 text-lg font-bold leading-relaxed text-[#394B45]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
      <section className="rounded-lg border-2 border-[#D8F3DC] bg-[#FFF8E7] p-5">
        <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
          Caregiver interpretation rules
        </p>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {caregiverInterpretationRules.map((item) => (
            <article key={item.state} className="rounded-lg bg-white p-4">
              <h3 className="text-xl font-black">{item.state}</h3>
              <p className="mt-2 text-base font-bold leading-relaxed text-[#394B45]">
                {item.reportLanguage}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="rounded-lg border-2 border-[#FFE8A3] bg-white p-5">
        <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
          Camera limitation rules
        </p>
        <div className="mt-3 grid gap-3 lg:grid-cols-4">
          {cameraLimitationRules.map((item) => (
            <article key={item.condition} className="rounded-lg bg-[#FFE8A3] p-4">
              <h3 className="text-xl font-black">{item.condition}</h3>
              <p className="mt-2 text-base font-bold leading-relaxed text-[#394B45]">
                {item.reportLanguage}
              </p>
            </article>
          ))}
        </div>
      </section>
      {!compact ? (
        <>
          <div className="grid gap-4 lg:grid-cols-5">
            {phaseSixTrustContracts.map((item) => (
              <article key={item.mode} className="rounded-lg bg-[#FFF8E7] p-4">
                <h3 className="text-xl font-black">{item.mode}</h3>
                <p className="mt-2 text-base font-bold leading-relaxed text-[#394B45]">
                  <strong className="text-[#10231F]">Confidence:</strong>{" "}
                  {item.confidence}
                </p>
                <p className="mt-2 text-base font-bold leading-relaxed text-[#394B45]">
                  <strong className="text-[#10231F]">Counts:</strong>{" "}
                  {item.counts}
                </p>
                <p className="mt-2 text-base font-bold leading-relaxed text-[#394B45]">
                  <strong className="text-[#10231F]">Boundary:</strong>{" "}
                  {item.boundary}
                </p>
              </article>
            ))}
          </div>
          <section className="rounded-lg bg-[#10231F] p-5 text-white">
            <p className="text-base font-black uppercase tracking-wide text-[#F6C85F]">
              Trust checklist by screen
            </p>
            <div className="mt-3 grid gap-3 lg:grid-cols-4">
              {phaseSixScreenTrustChecklist.map((item) => (
                <article key={item.screen} className="rounded-lg bg-white/10 p-4">
                  <h3 className="text-xl font-black">{item.screen}</h3>
                  <p className="mt-2 text-base font-bold leading-relaxed">
                    Visible: {item.visible}
                  </p>
                  <p className="mt-2 text-base font-bold leading-relaxed">
                    Counted: {item.counted}
                  </p>
                  <p className="mt-2 text-base font-bold leading-relaxed">
                    Limited: {item.limited}
                  </p>
                  <p className="mt-2 text-base font-bold leading-relaxed">
                    User controls: {item.control}
                  </p>
                </article>
              ))}
            </div>
          </section>
          <section className="grid gap-4 lg:grid-cols-2">
            <ProtocolCard
              title="Manual review protocol"
              items={manualReviewProtocol}
            />
            <ProtocolCard
              title="User-side smoke protocol"
              items={userSmokeProtocol}
            />
          </section>
        </>
      ) : null}
      <section className="rounded-lg border-2 border-[#075E54] bg-[#D8F3DC] p-5">
        <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
          Claim escalation rule
        </p>
        <p className="mt-2 text-xl font-black leading-relaxed">
          {claimEscalationRule}
        </p>
        <p className="mt-3 rounded-lg bg-white p-4 text-lg font-bold leading-relaxed text-[#394B45]">
          Acceptance note: {phaseSixAcceptanceNote}
        </p>
      </section>
    </section>
  );
}

function ProtocolCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-lg border-2 border-[#D8F3DC] bg-white p-5">
      <h3 className="text-2xl font-black leading-tight">{title}</h3>
      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg bg-[#FFF8E7] p-4 text-base font-bold leading-relaxed text-[#394B45]"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function SampleDataBanner() {
  return (
    <section
      className="sticky top-3 z-10 rounded-lg border-2 border-[#10231F] bg-[#FFE8A3] p-4 text-lg font-black leading-relaxed text-[#10231F] shadow-camera"
      aria-label="Sample data warning"
    >
      This is a sample session - not live camera data. It stays visible so the
      report cannot be confused with a real webcam session.
    </section>
  );
}

function TrustPromiseItem({
  icon,
  title,
  body,
}: {
  icon: MotionQuestIcon;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-lg bg-[#FFF8E7] p-5">
      <IconMark icon={icon} />
      <h3 className="mt-3 text-2xl font-black leading-tight">{title}</h3>
      <p className="mt-2 text-lg font-bold leading-relaxed text-[#394B45]">
        {body}
      </p>
    </article>
  );
}

function EvidenceReferenceCard({
  icon,
  label,
  title,
  body,
  source,
  href,
}: (typeof evidenceCards)[number]) {
  return (
    <article className="rounded-lg border-2 border-[#D8F3DC] bg-[#FFF8E7] p-5">
      <div className="flex items-center gap-3">
        <IconMark icon={icon} />
        <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
          {label}
        </p>
      </div>
      <h3 className="mt-3 text-2xl font-black leading-tight">{title}</h3>
      <p className="mt-2 text-lg font-bold leading-relaxed text-[#394B45]">
        {body}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex min-h-14 items-center rounded-xl border-2 border-[#075E54] bg-white px-5 text-lg font-black text-[#10231F] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#F6C85F]"
      >
        Source: {source}
      </a>
    </article>
  );
}

function VisualSystemSection() {
  return (
    <section className="space-y-5 rounded-lg bg-white p-6 shadow-camera md:p-8">
      <div>
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          Visual production system
        </p>
        <h2 className="mt-2 text-3xl font-black leading-tight">
          Assets must reinforce dignity, clarity and trust.
        </h2>
        <p className="mt-3 max-w-5xl text-xl leading-relaxed text-[#394B45]">
          MotionQuest now treats icons, references and generated visuals as a
          controlled product surface. Anything that looks fake, medicalized,
          distorted or unreadable is rejected before it reaches the app.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {visualAssetStandards.map((item) => (
          <TrustPromiseItem key={item.title} {...item} />
        ))}
      </div>
      <section className="grid gap-4 rounded-lg bg-[#10231F] p-5 text-white lg:grid-cols-2">
        <BeforeAfterPanel
          label="Before"
          title={beforeAfterSlide.leftTitle}
          body={beforeAfterSlide.leftBody}
        />
        <BeforeAfterPanel
          label="After"
          title={beforeAfterSlide.rightTitle}
          body={beforeAfterSlide.rightBody}
        />
      </section>
      <section className="rounded-lg border-2 border-[#075E54] bg-[#D8F3DC] p-5">
        <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
          Phase 4 acceptance
        </p>
        <ul className="mt-3 grid gap-3 text-lg font-black leading-relaxed lg:grid-cols-2">
          {phaseFourAcceptanceItems.map((item) => (
            <li key={item} className="rounded-lg bg-white p-4">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

function PhaseFiveAcceptanceMatrix() {
  return (
    <section className="rounded-lg border-2 border-[#075E54] bg-white p-6 shadow-camera md:p-8">
      <p className="text-base font-black uppercase tracking-wide text-[#394B45]">
        Phase 5 acceptance
      </p>
      <h2 className="mt-2 text-3xl font-black leading-tight">
        Every core screen has normal, degraded and fallback states.
      </h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {phaseFiveStateMatrix.map((item) => (
          <article key={item.screen} className="rounded-lg bg-[#FFF8E7] p-5">
            <h3 className="text-2xl font-black">{item.screen}</h3>
            <dl className="mt-3 grid gap-3 text-base font-bold leading-relaxed text-[#394B45]">
              <div className="rounded-lg bg-white p-3">
                <dt className="font-black text-[#10231F]">Normal</dt>
                <dd>{item.normal}</dd>
              </div>
              <div className="rounded-lg bg-[#FFE8A3] p-3">
                <dt className="font-black text-[#10231F]">Degraded</dt>
                <dd>{item.degraded}</dd>
              </div>
              <div className="rounded-lg bg-[#D8F3DC] p-3">
                <dt className="font-black text-[#10231F]">Fallback</dt>
                <dd>{item.fallback}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function BeforeAfterPanel({
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
      <h3 className="mt-2 text-2xl font-black leading-tight">{title}</h3>
      <p className="mt-3 text-lg font-bold leading-relaxed text-white/95">
        {body}
      </p>
    </article>
  );
}

function IconMark({ icon }: { icon: MotionQuestIcon }) {
  const paths: Record<MotionQuestIcon, React.ReactNode> = {
    privacy: (
      <>
        <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-5" />
      </>
    ),
    camera: (
      <>
        <path d="M4 8h4l2-3h4l2 3h4v11H4V8z" />
        <path d="M12 11a3 3 0 100 6 3 3 0 000-6z" />
      </>
    ),
    evidence: (
      <>
        <path d="M6 4h12v16H6V4z" />
        <path d="M9 9h6" />
        <path d="M9 13h6" />
        <path d="M9 17h4" />
      </>
    ),
    caregiver: (
      <>
        <path d="M8 11a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M16 11a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M4 20c0-3 2-5 4-5s4 2 4 5" />
        <path d="M12 20c0-3 2-5 4-5s4 2 4 5" />
      </>
    ),
    asset: (
      <>
        <path d="M5 5h14v14H5V5z" />
        <path d="M8 16l3-4 2 3 2-2 2 3" />
        <path d="M9 9h.1" />
      </>
    ),
    warning: (
      <>
        <path d="M12 4l9 16H3L12 4z" />
        <path d="M12 10v4" />
        <path d="M12 17h.1" />
      </>
    ),
    report: (
      <>
        <path d="M7 3h8l4 4v14H7V3z" />
        <path d="M15 3v5h4" />
        <path d="M10 12h6" />
        <path d="M10 16h6" />
      </>
    ),
  };

  return (
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#075E54] text-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      >
        {paths[icon]}
      </svg>
    </span>
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

function ProofPillar({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg border-2 border-[#D8F3DC] bg-[#FFF8E7] p-4">
      <h3 className="text-xl font-black leading-tight">{title}</h3>
      <p className="mt-2 text-base font-bold leading-relaxed text-[#394B45]">
        {body}
      </p>
    </article>
  );
}

function ReportProof({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg bg-white p-4">
      <h3 className="text-xl font-black leading-tight">{title}</h3>
      <p className="mt-2 text-base font-bold leading-relaxed text-[#394B45]">
        {body}
      </p>
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
  confidenceNote,
}: {
  label: string;
  value: string;
  note: string;
  badge: string;
  confidenceNote: string;
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
      <p className="mt-3 rounded-lg bg-[#FFF8E7] p-3 text-base font-black leading-relaxed text-[#394B45]">
        Confidence explanation: {confidenceNote}
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
        body="Adaptive Chair Movement supports standing or seated reps. Reach Stars records visible hand-to-target interactions."
      />
      <InfoCard
        label="3. Read report"
        title="Use the outcome"
        body="The report is the main product artifact: a plain-language explanation of what was observed, what was limited, and what to do next."
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
            body="A reach-practice target activity. MotionQuest records visible hand-to-target hits and timing when available."
          />
        </div>
      </article>
      <article className="rounded-lg bg-[#FFE8A3] p-6 shadow-camera">
        <p className="text-base font-bold uppercase tracking-wide text-[#394B45]">
          Privacy + limits
        </p>
        <p className="mt-3 text-xl font-bold leading-relaxed">
          Video stays in the browser. No account, backend, or database is needed
          for this browser release.
        </p>
        <p className="mt-4 text-lg font-bold leading-relaxed text-[#394B45]">
          MotionQuest is a hackathon build. It does not diagnose, predict
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
    "MotionQuest personal practice note",
    "Not an official medical record.",
    session.source === "safe-demo"
      ? "Sample session - not live camera data."
      : "Live camera session.",
    "",
    "Session summary",
    `Created: ${new Date(session.createdAt).toLocaleString()}`,
    `Source: ${session.source === "safe-demo" ? "safe demo fallback" : "live camera session"}`,
    `Session mode: ${session.sessionMode}`,
    `Primary movement: ${session.primaryMovement}`,
    `Summary: ${session.report.summary}`,
    "",
    "Observed activity",
    `Adaptive movement: ${session.adaptiveMovement.reps} ${session.adaptiveMovement.label} reps in ${session.adaptiveMovement.durationSec}s`,
    `Chair Stand: ${session.chairStand.reps} reps in ${session.chairStand.durationSec}s`,
    `Reach Stars: ${session.reachStars.targetsHit}/${session.reachStars.targetsShown} targets`,
    `Average reach reaction: ${session.reachStars.avgReactionMs ?? "n/a"} ms`,
    "",
    "Confidence",
    `Tracking confidence: ${session.poseConfidence}`,
    `Tracking validity: ${session.trackingQuality.validity}`,
    `Adaptive movement confidence explanation: ${movementConfidenceNote(session)}`,
    `Reach Stars confidence explanation: ${reachConfidenceNote(session)}`,
    `Tracking confidence explanation: ${trackingConfidenceNote(session)}`,
    "",
    "Limitations",
    session.trackingQuality.limitations.join(" | "),
    "",
    "Interpretation",
    `Interpretation: ${session.report.interpretation}`,
    "",
    "Next safe step",
    `Next session suggestion: ${session.report.nextDifficulty}. Keep the setup conservative unless tracking stays high and movement feels comfortable.`,
    "",
    "Disclaimer",
    session.report.disclaimer,
    "General wellness practice feedback only; not a medical assessment.",
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
    return "Required movement data was visible enough to create a personal practice note. This is still not clinical scoring or an official medical record.";
  }
  if (session.trackingQuality.validity === "limited") {
    return "The report is still readable, but low tracking confidence means the counts may be incomplete. Repeat with better lighting and clearer full-body or hand visibility before relying on the trend.";
  }
  return "The app did not detect enough usable movement data to treat this as a usable session. Repeat calibration before judging the movement result.";
}

function movementConfidenceNote(session: MotionQuestSession) {
  if (session.trackingQuality.validity === "not-valid-enough") {
    return "Movement numbers are shown only for transparency because the camera did not capture enough signal.";
  }
  if (session.primaryMovement === "seated-arm-movement") {
    return "Seated mode uses visible hand movement only; it does not interpret lower body or chair-stand ability.";
  }
  return "Standing mode counts chair-stand-style practice only while a plausible body frame is visible; it is not clinical scoring.";
}

function reachConfidenceNote(session: MotionQuestSession) {
  if (session.trackingQuality.validity === "not-valid-enough") {
    return "Reach numbers are setup feedback until the camera sees a usable hand signal in stable lighting and distance.";
  }
  return "Reach Stars counts hand dwell inside a large target as reach practice, not formal mobility assessment.";
}

function trackingConfidenceNote(session: MotionQuestSession) {
  if (session.source === "safe-demo") {
    return "This is labeled sample data and demonstrates the report format only.";
  }
  if (session.poseConfidence === "high") {
    return "High confidence means the selected mode had enough visible landmarks for a practice note.";
  }
  if (session.poseConfidence === "medium") {
    return "Medium confidence means at least one required signal was visible, but interpretation stays conservative.";
  }
  return "Low confidence means the app should weaken claims and ask for better camera setup.";
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
