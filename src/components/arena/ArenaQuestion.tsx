import type { Question } from "../../types";
import { spokenProblem } from "../../utils/problemText";
import { MathExpression } from "../math/MathExpression";

interface ArenaQuestionProps {
  question: Question;
  reveal: number | null;
}

export const ArenaQuestion = ({ question, reveal }: ArenaQuestionProps) => {
  const spoken = `¿Cuánto es ${spokenProblem(question)}?`;
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Accessible name for the problem; the answer input references this via
          aria-describedby so a screen-reader user hears what to solve. The
          visual glyphs below are decorative duplicates and hidden from the AT. */}
      <span id="arena-problem" className="sr-only">
        {spoken}
      </span>
      <div
        aria-hidden="true"
        className="flex items-baseline justify-center gap-5 md:gap-7 font-mono tabular-nums leading-none select-none"
      >
        <MathExpression question={question} />
        <span className="text-5xl md:text-6xl font-normal text-ink-muted">
          =
        </span>
        {reveal != null ? (
          <span
            key={`reveal-${reveal}`}
            className="text-7xl md:text-8xl font-bold text-ink anim-reveal"
          >
            {reveal}
          </span>
        ) : (
          <span className="text-7xl md:text-8xl font-bold text-ink-subtle">
            ?
          </span>
        )}
      </div>
      {reveal != null && (
        <span className="font-sans text-sm font-bold uppercase tracking-[0.18em] text-wrong anim-reveal">
          Incorrecto
        </span>
      )}
    </div>
  );
};
