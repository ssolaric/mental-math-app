import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArenaInput } from "../components/arena/ArenaInput";
import { ArenaQuestion } from "../components/arena/ArenaQuestion";
import { ArenaStats } from "../components/arena/ArenaStats";
import { type DotResult, ProgressDots } from "../components/arena/ProgressDots";
import { RoundResults } from "../components/arena/RoundResults";
import { useGameState } from "../hooks/useGameState";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useTimer } from "../hooks/useTimer";
import type { Difficulty, Operation } from "../types";
import { STORAGE_KEYS } from "../types";
import { createEmptyGameProgress, updateGameProgress } from "../utils/storage";

const ROUND_LENGTH = 10;
const STREAK_TIERS = [3, 5, 10] as const;

type GameSearch = {
  operation: Operation;
  difficulty: Difficulty;
};

type FeedbackState = "idle" | "wrong";

interface RoundSummary {
  correct: number;
  total: number;
  bestStreak: number;
  elapsedMs: number;
}

export const Route = createFileRoute("/game")({
  validateSearch: (search: Record<string, unknown>): GameSearch => ({
    operation: search.operation as Operation,
    difficulty: search.difficulty as Difficulty,
  }),
  component: GamePage,
});

function GamePage() {
  const navigate = useNavigate();
  const { operation, difficulty } = Route.useSearch();

  const [gameProgress, setGameProgress] = useLocalStorage(
    STORAGE_KEYS.GAME_PROGRESS,
    createEmptyGameProgress(),
  );

  const {
    currentQuestion,
    sessionData,
    startSession,
    submitAnswer,
    nextQuestion,
    endSession,
  } = useGameState();

  const {
    elapsedTime,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
  } = useTimer();

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<FeedbackState>("idle");
  const [results, setResults] = useState<ReadonlyArray<DotResult>>([]);
  const [justAnsweredIndex, setJustAnsweredIndex] = useState<number | null>(
    null,
  );
  const [wrongReveal, setWrongReveal] = useState<number | null>(null);
  const [scoreBumpKey, setScoreBumpKey] = useState(0);
  const [streakFlareKey, setStreakFlareKey] = useState(0);
  const [roundSummary, setRoundSummary] = useState<RoundSummary | null>(null);

  const prevStreakRef = useRef(0);
  const finalElapsedRef = useRef(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: session lifecycle is keyed to route params, not hook identities
  useEffect(() => {
    startSession(operation, difficulty);
    startTimer();
    return () => {
      resetTimer();
    };
  }, [operation, difficulty]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: streak tier crossing keyed to currentStreak only
  useEffect(() => {
    if (!sessionData) return;
    const prev = prevStreakRef.current;
    const curr = sessionData.currentStreak;
    if (STREAK_TIERS.some((t) => prev < t && curr >= t)) {
      setStreakFlareKey((k) => k + 1);
    }
    prevStreakRef.current = curr;
  }, [sessionData?.currentStreak]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: advanceFromWrong closes over latest state via the same render
  useEffect(() => {
    if (feedback !== "wrong") return;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT") return;
      if (e.key === "Enter") {
        e.preventDefault();
        advanceFromWrong("");
      } else if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        advanceFromWrong(e.key);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [feedback, results.length]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: finalize fires once per round when both gates clear
  useEffect(() => {
    if (roundSummary) return;
    if (results.length < ROUND_LENGTH) return;
    if (feedback !== "idle") return;
    if (!sessionData) return;

    finalElapsedRef.current = elapsedTime;
    pauseTimer();

    const finalSession = endSession();
    if (!finalSession) return;

    const avgTime =
      finalSession.questionsAnswered > 0
        ? (Date.now() - finalSession.startTime) / finalSession.questionsAnswered
        : 0;

    setGameProgress(
      updateGameProgress(
        gameProgress,
        operation,
        finalSession.correctAnswers,
        finalSession.questionsAnswered,
        finalSession.score,
        finalSession.bestStreak,
        avgTime,
      ),
    );

    setRoundSummary({
      correct: finalSession.correctAnswers,
      total: finalSession.questionsAnswered,
      bestStreak: finalSession.bestStreak,
      elapsedMs: finalElapsedRef.current,
    });
  }, [results.length, feedback]);

  const advanceFromWrong = (prefill: string) => {
    setFeedback("idle");
    setWrongReveal(null);
    setAnswer(prefill);
    if (results.length < ROUND_LENGTH) {
      nextQuestion();
    }
  };

  const handleSubmit = () => {
    if (!currentQuestion || !sessionData) return;
    if (feedback === "wrong" || roundSummary) return;
    if (!answer.trim()) return;

    const timeInSeconds = Math.floor(elapsedTime / 1000);
    const isCorrect = submitAnswer(answer, timeInSeconds);
    const index = results.length;
    const next: ReadonlyArray<DotResult> = [
      ...results,
      isCorrect ? "correct" : "wrong",
    ];
    setResults(next);
    setJustAnsweredIndex(index);
    window.setTimeout(() => setJustAnsweredIndex(null), 240);

    if (isCorrect) {
      setScoreBumpKey((k) => k + 1);
      setAnswer("");
      if (next.length < ROUND_LENGTH) {
        nextQuestion();
      }
    } else {
      setWrongReveal(currentQuestion.correctAnswer);
      setFeedback("wrong");
    }
  };

  const handleExitClick = () => {
    pauseTimer();
    endSession();
    navigate({ to: "/" });
  };

  const handlePlayAgain = () => {
    prevStreakRef.current = 0;
    finalElapsedRef.current = 0;
    setResults([]);
    setFeedback("idle");
    setWrongReveal(null);
    setAnswer("");
    setJustAnsweredIndex(null);
    setRoundSummary(null);
    resetTimer();
    startSession(operation, difficulty);
    startTimer();
  };

  const handleChangeLevel = () => {
    pauseTimer();
    endSession();
    navigate({ to: "/difficulty-select", search: { operation } });
  };

  return (
    <div className="min-h-screen bg-arena-bg text-ink flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-10 py-5">
        <ProgressDots
          results={results}
          total={ROUND_LENGTH}
          justAnsweredIndex={justAnsweredIndex}
        />
        <button
          type="button"
          onClick={handleExitClick}
          className="px-5 py-2.5 text-base font-medium tracking-wide uppercase text-ink-muted bg-arena-bg-soft hover:bg-arena-bg-elev hover:text-ink rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-arena-bg"
        >
          Salir
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-8">
        {roundSummary ? (
          <RoundResults
            correct={roundSummary.correct}
            total={roundSummary.total}
            bestStreak={roundSummary.bestStreak}
            elapsedMs={roundSummary.elapsedMs}
            onPlayAgain={handlePlayAgain}
            onChangeLevel={handleChangeLevel}
          />
        ) : currentQuestion ? (
          <div className="flex flex-col items-center gap-16 md:gap-20">
            <ArenaQuestion
              question={currentQuestion}
              reveal={feedback === "wrong" ? wrongReveal : null}
            />
            <div className="flex flex-col items-center gap-3">
              <ArenaInput
                value={answer}
                onChange={setAnswer}
                onSubmit={handleSubmit}
                disabled={feedback === "wrong"}
              />
              {feedback === "wrong" && (
                <p className="text-sm text-ink-subtle anim-reveal pt-2">
                  Enter para continuar
                </p>
              )}
            </div>
          </div>
        ) : null}
      </main>

      <footer className="px-6 md:px-10 py-6">
        {sessionData && !roundSummary && (
          <div className="max-w-md mx-auto">
            <ArenaStats
              score={sessionData.score}
              currentStreak={sessionData.currentStreak}
              elapsedTime={elapsedTime}
              scoreBumpKey={scoreBumpKey}
              streakFlareKey={streakFlareKey}
            />
          </div>
        )}
      </footer>
    </div>
  );
}
