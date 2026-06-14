import { Flame } from "lucide-react";

interface ArenaStatsProps {
  score: number;
  currentStreak: number;
  elapsedTime: number;
  scoreBumpKey: number;
  streakFlareKey: number;
}

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const streakColor = (streak: number): string => {
  if (streak >= 10) return "text-accent";
  if (streak >= 5) return "text-accent";
  if (streak >= 3) return "text-accent-dim";
  return "text-ink-subtle";
};

export const ArenaStats = ({
  score,
  currentStreak,
  elapsedTime,
  scoreBumpKey,
  streakFlareKey,
}: ArenaStatsProps) => {
  const flame = streakColor(currentStreak);
  return (
    <div className="flex items-baseline justify-between gap-12 font-mono tabular-nums">
      <div className="flex items-baseline gap-2.5">
        <span className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-ink-subtle">
          Pts
        </span>
        <span
          key={`score-${scoreBumpKey}`}
          className={`text-2xl font-semibold anim-score-bump ${
            score > 0 ? "text-accent" : "text-ink-muted"
          }`}
        >
          {score}
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <Flame
          key={`flame-${streakFlareKey}`}
          size={20}
          className={`${flame} ${streakFlareKey > 0 ? "anim-streak-flare" : ""}`}
          strokeWidth={2.25}
        />
        <span className={`text-2xl font-semibold ${flame}`}>
          {currentStreak}
        </span>
      </div>

      <div className="text-2xl font-medium text-ink-muted">
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
};
