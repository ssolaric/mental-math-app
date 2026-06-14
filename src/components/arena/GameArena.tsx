import { useEffect, useRef, useState } from "react";
import { OPERATION_SYMBOLS } from "../../constants/operationSymbols";
import { type LastSubmit, useRound } from "../../hooks/useRound";
import { recordRound } from "../../progress/progressStore";
import type { StrategyId } from "../../strategies";
import type { Difficulty, Operation } from "../../types";
import { ArenaInput } from "./ArenaInput";
import { ArenaQuestion } from "./ArenaQuestion";
import { ArenaStats } from "./ArenaStats";
import { ProgressDots } from "./ProgressDots";
import { RoundResults } from "./RoundResults";

type GameArenaProps = {
  operation: Operation;
  difficulty: Difficulty;
  strategy?: StrategyId;
  onExit: () => void;
  onChangeLevel: () => void;
};

export function GameArena({
  operation,
  difficulty,
  strategy,
  onExit,
  onChangeLevel,
}: GameArenaProps) {
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
  } = useRound(operation, difficulty, undefined, strategy);

  const [answer, setAnswer] = useState("");
  const [justAnsweredIndex, setJustAnsweredIndex] = useState<number | null>(
    null,
  );
  const [justAnsweredCorrect, setJustAnsweredCorrect] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [scoreBumpKey, setScoreBumpKey] = useState(0);
  const [streakFlareKey, setStreakFlareKey] = useState(0);
  // the last submission we have already reacted to; lets us read currentQuestion
  // (still the just-answered one when lastSubmit changes) without re-firing when
  // the player later advances and currentQuestion changes but lastSubmit doesn't.
  const processedSubmit = useRef<LastSubmit | null>(null);

  // animation triggers fed by lastSubmit
  useEffect(() => {
    if (!lastSubmit || lastSubmit === processedSubmit.current) return;
    processedSubmit.current = lastSubmit;
    const index = results.length - 1;
    setJustAnsweredIndex(index);
    setJustAnsweredCorrect(lastSubmit.correct);
    const id = window.setTimeout(() => setJustAnsweredIndex(null), 240);
    if (lastSubmit.correct) {
      setScoreBumpKey((k) => k + 1);
      setAnswer("");
      setAnnouncement("Correcto.");
    } else if (currentQuestion) {
      const { num1, num2, operation } = currentQuestion;
      setAnnouncement(
        `Incorrecto. ${num1} ${OPERATION_SYMBOLS[operation]} ${num2} = ${lastSubmit.correctAnswer}.`,
      );
    }
    if (lastSubmit.crossedTier !== null) {
      setStreakFlareKey((k) => k + 1);
    }
    return () => window.clearTimeout(id);
  }, [lastSubmit, results.length, currentQuestion]);

  // persist progress when the round finishes
  useEffect(() => {
    if (!summary) return;
    recordRound(operation, summary);
  }, [summary, operation]);

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

  const handlePlayAgain = () => {
    setAnswer("");
    setJustAnsweredIndex(null);
    setJustAnsweredCorrect(false);
    setAnnouncement("");
    processedSubmit.current = null;
    restart();
  };

  const wrongReveal =
    status === "wrong" && lastSubmit ? lastSubmit.correctAnswer : null;

  const hint =
    status === "wrong"
      ? "Enter para continuar"
      : results.length === 0
        ? "Escribe y pulsa Enter"
        : null;

  return (
    <div className="min-h-dvh bg-arena-bg text-ink flex flex-col">
      <span className="sr-only" aria-live="assertive">
        {announcement}
      </span>
      <header className="flex items-center justify-between px-6 md:px-10 py-5">
        <ProgressDots
          results={results}
          total={10}
          justAnsweredIndex={justAnsweredIndex}
          justAnsweredCorrect={justAnsweredCorrect}
        />
        <button
          type="button"
          onClick={onExit}
          className="px-5 py-2.5 text-base font-medium tracking-wide uppercase text-ink-muted bg-arena-bg-soft hover:bg-arena-bg-elev hover:text-ink rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-arena-bg"
        >
          Salir
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        {summary ? (
          <RoundResults
            correct={summary.correct}
            total={summary.total}
            bestStreak={summary.bestStreak}
            elapsedMs={summary.elapsedMs}
            onPlayAgain={handlePlayAgain}
            onChangeLevel={onChangeLevel}
          />
        ) : currentQuestion ? (
          <div className="flex flex-col items-center gap-8 md:gap-10">
            <ArenaQuestion question={currentQuestion} reveal={wrongReveal} />
            <div className="flex flex-col items-center gap-2">
              <ArenaInput
                value={answer}
                onChange={setAnswer}
                onSubmit={handleSubmit}
                disabled={status === "wrong"}
              />
              {/* Fixed-height line: a one-time "how to play" cue on the very
                  first question, the advance cue while a wrong answer is shown,
                  reserved (invisible) otherwise so the HUD below never shifts. */}
              <p
                className={`h-5 text-sm font-medium pt-1 ${
                  hint ? "text-ink-subtle anim-reveal" : "invisible"
                }`}
              >
                {hint ?? " "}
              </p>
            </div>
            <div className="w-full max-w-md">
              <ArenaStats
                score={score}
                currentStreak={streak}
                elapsedTime={elapsedMs}
                scoreBumpKey={scoreBumpKey}
                streakFlareKey={streakFlareKey}
              />
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
