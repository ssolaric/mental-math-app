import { useEffect, useRef } from "react";

interface RoundResultsProps {
  correct: number;
  total: number;
  bestStreak: number;
  elapsedMs: number;
  onPlayAgain: () => void;
  onChangeLevel: () => void;
}

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const RoundResults = ({
  correct,
  total,
  bestStreak,
  elapsedMs,
  onPlayAgain,
  onChangeLevel,
}: RoundResultsProps) => {
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    primaryRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-10 anim-reveal max-w-md">
      <div className="text-7xl md:text-8xl font-bold text-ink font-mono tabular-nums leading-none">
        {correct} <span className="text-ink-subtle font-medium">/</span> {total}
      </div>

      <div className="space-y-2.5 text-lg md:text-xl text-ink-muted tabular-nums">
        <p>
          <span className="text-accent font-mono font-semibold">{correct}</span>
          <span className="font-mono"> </span>
          correctas, <span className="font-mono">{accuracy}%</span>
        </p>
        <p>
          Mejor racha de la ronda:{" "}
          <span className="text-ink font-mono font-semibold">{bestStreak}</span>
        </p>
        <p>
          Tiempo total:{" "}
          <span className="text-ink font-mono">{formatTime(elapsedMs)}</span>
        </p>
      </div>

      <div className="flex items-center gap-8 pt-2">
        <button
          ref={primaryRef}
          type="button"
          onClick={onPlayAgain}
          className="px-8 py-4 bg-accent hover:bg-accent-hover text-arena-bg font-bold text-lg tracking-wide rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-arena-bg transition-colors"
        >
          Otra ronda
        </button>
        <button
          type="button"
          onClick={onChangeLevel}
          className="py-2 -my-2 text-ink-muted hover:text-ink underline underline-offset-4 decoration-ink-subtle/60 hover:decoration-ink"
        >
          Cambiar nivel
        </button>
      </div>
    </div>
  );
};
