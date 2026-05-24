import { OPERATION_SYMBOLS } from "../../constants/operationSymbols";
import type { Question } from "../../types";

interface ArenaQuestionProps {
  question: Question;
  reveal: number | null;
}

export const ArenaQuestion = ({ question, reveal }: ArenaQuestionProps) => {
  return (
    <div className="flex items-baseline justify-center gap-5 md:gap-7 font-mono tabular-nums leading-none select-none">
      <span className="text-7xl md:text-8xl font-bold text-ink">
        {question.num1}
      </span>
      <span className="text-5xl md:text-6xl font-normal text-ink-muted">
        {OPERATION_SYMBOLS[question.operation]}
      </span>
      <span className="text-7xl md:text-8xl font-bold text-ink">
        {question.num2}
      </span>
      <span className="text-5xl md:text-6xl font-normal text-ink-muted">=</span>
      {reveal != null ? (
        <span
          key={`reveal-${reveal}`}
          className="text-7xl md:text-8xl font-bold text-accent anim-reveal"
        >
          {reveal}
        </span>
      ) : (
        <span className="text-7xl md:text-8xl font-bold text-ink-subtle">
          ?
        </span>
      )}
    </div>
  );
};
