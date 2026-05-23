import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArenaInput } from "../components/arena/ArenaInput";
import { ArenaQuestion } from "../components/arena/ArenaQuestion";
import { ArenaStats } from "../components/arena/ArenaStats";
import { ProgressDots } from "../components/arena/ProgressDots";
import { RoundResults } from "../components/arena/RoundResults";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRound } from "../hooks/useRound";
import type { Difficulty, Operation } from "../types";
import { STORAGE_KEYS } from "../types";
import { createEmptyGameProgress, updateGameProgress } from "../utils/storage";

type GameSearch = {
  operation: Operation;
  difficulty: Difficulty;
};

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
    status,
    currentQuestion,
    results,
    score,
    streak,
    elapsedMs,
    lastSubmit,
    summary,
    submit,
    advance,
    restart,
  } = useRound(operation, difficulty);

  const [answer, setAnswer] = useState("");
  const [justAnsweredIndex, setJustAnsweredIndex] = useState<number | null>(
    null,
  );
  const [scoreBumpKey, setScoreBumpKey] = useState(0);
  const [streakFlareKey, setStreakFlareKey] = useState(0);

  // animation triggers fed by lastSubmit
  useEffect(() => {
    if (!lastSubmit) return;
    const index = results.length - 1;
    setJustAnsweredIndex(index);
    const id = window.setTimeout(() => setJustAnsweredIndex(null), 240);
    if (lastSubmit.correct) {
      setScoreBumpKey((k) => k + 1);
      setAnswer("");
    }
    if (lastSubmit.crossedTier !== null) {
      setStreakFlareKey((k) => k + 1);
    }
    return () => window.clearTimeout(id);
  }, [lastSubmit, results.length]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: fires once when summary transitions to non-null; reading current gameProgress at that instant is intentional
  useEffect(() => {
    if (!summary) return;
    const avgTime = summary.total > 0 ? summary.elapsedMs / summary.total : 0;
    setGameProgress(
      updateGameProgress(
        gameProgress,
        operation,
        summary.correct,
        summary.total,
        summary.score,
        summary.bestStreak,
        avgTime,
      ),
    );
  }, [summary]);

  // any-digit-during-wrong: prefill next input + advance
  useEffect(() => {
    if (status !== "wrong") return;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT") return;
      if (e.key === "Enter") {
        e.preventDefault();
        setAnswer("");
        advance();
      } else if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        setAnswer(e.key);
        advance();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [status, advance]);

  const handleSubmit = () => {
    if (status !== "playing" || !answer.trim()) return;
    submit(answer);
  };

  const handleExitClick = () => {
    navigate({ to: "/" });
  };

  const handlePlayAgain = () => {
    setAnswer("");
    setJustAnsweredIndex(null);
    restart();
  };

  const handleChangeLevel = () => {
    navigate({ to: "/difficulty-select", search: { operation } });
  };

  const wrongReveal =
    status === "wrong" && lastSubmit ? lastSubmit.correctAnswer : null;

  return (
    <div className="min-h-screen bg-arena-bg text-ink flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-10 py-5">
        <ProgressDots
          results={results}
          total={10}
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
        {summary ? (
          <RoundResults
            correct={summary.correct}
            total={summary.total}
            bestStreak={summary.bestStreak}
            elapsedMs={summary.elapsedMs}
            onPlayAgain={handlePlayAgain}
            onChangeLevel={handleChangeLevel}
          />
        ) : currentQuestion ? (
          <div className="flex flex-col items-center gap-16 md:gap-20">
            <ArenaQuestion question={currentQuestion} reveal={wrongReveal} />
            <div className="flex flex-col items-center gap-3">
              <ArenaInput
                value={answer}
                onChange={setAnswer}
                onSubmit={handleSubmit}
                disabled={status === "wrong"}
              />
              {status === "wrong" && (
                <p className="text-sm text-ink-subtle anim-reveal pt-2">
                  Enter para continuar
                </p>
              )}
            </div>
          </div>
        ) : null}
      </main>

      <footer className="px-6 md:px-10 py-6">
        {!summary && (
          <div className="max-w-md mx-auto">
            <ArenaStats
              score={score}
              currentStreak={streak}
              elapsedTime={elapsedMs}
              scoreBumpKey={scoreBumpKey}
              streakFlareKey={streakFlareKey}
            />
          </div>
        )}
      </footer>
    </div>
  );
}
