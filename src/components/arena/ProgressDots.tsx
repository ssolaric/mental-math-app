import type { DotResult } from "../../hooks/useRound";

interface ProgressDotsProps {
  results: ReadonlyArray<DotResult>;
  total: number;
  justAnsweredIndex: number | null;
}

const dotState = (
  result: DotResult | undefined,
  isCurrent: boolean,
): string => {
  if (result === "correct") return "bg-accent";
  if (result === "wrong") return "bg-wrong";
  if (isCurrent) return "bg-arena-bg-soft ring-1 ring-accent ring-inset";
  return "bg-arena-bg-elev";
};

export const ProgressDots = ({
  results,
  total,
  justAnsweredIndex,
}: ProgressDotsProps) => {
  const dots = Array.from({ length: total }, (_, i) => ({
    id: `dot-${i}`,
    index: i,
    result: results[i],
    isCurrent: i === results.length,
    justAnswered: justAnsweredIndex === i,
  }));

  return (
    <div className="flex items-center gap-2">
      <span className="sr-only" aria-live="polite">
        Progreso: {results.length} de {total}
      </span>
      {dots.map(({ id, result, isCurrent, justAnswered }) => (
        <span
          key={id}
          aria-hidden="true"
          className={`w-2.5 h-2.5 rounded-full ${dotState(result, isCurrent)}${
            justAnswered ? " anim-correct-pulse" : ""
          }`}
        />
      ))}
    </div>
  );
};
