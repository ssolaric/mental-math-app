import { OPERATION_SYMBOLS } from "../../constants/operationSymbols";
import type { Question } from "../../types";
import { spokenProblem } from "../../utils/problemText";

interface ArenaQuestionProps {
  question: Question;
  reveal: number | null;
}

// The expression on the left of the "=". Most operations render as
// `num1 <symbol> num2`; powers stack the exponent as a superscript and roots
// draw a radical (with a small index for cube roots) over the radicand.
const ProblemExpression = ({ question }: { question: Question }) => {
  if (question.operation === "power") {
    return (
      <span className="flex items-start">
        <span className="text-7xl md:text-8xl font-bold text-ink">
          {question.num1}
        </span>
        <span className="text-4xl md:text-5xl font-bold text-ink -mt-1 md:-mt-2">
          {question.num2}
        </span>
      </span>
    );
  }

  if (question.operation === "root") {
    return (
      <span className="flex items-start gap-1">
        {question.num2 === 3 && (
          <span className="self-start mt-1 text-3xl md:text-4xl font-bold text-ink-muted">
            3
          </span>
        )}
        <span className="self-start text-5xl md:text-6xl font-normal text-ink-muted">
          √
        </span>
        <span className="border-t-2 border-ink pt-1 text-7xl md:text-8xl font-bold text-ink">
          {question.num1}
        </span>
      </span>
    );
  }

  return (
    <>
      <span className="text-7xl md:text-8xl font-bold text-ink">
        {question.num1}
      </span>
      <span className="text-5xl md:text-6xl font-normal text-ink-muted">
        {OPERATION_SYMBOLS[question.operation]}
      </span>
      <span className="text-7xl md:text-8xl font-bold text-ink">
        {question.num2}
      </span>
    </>
  );
};

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
        <ProblemExpression question={question} />
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
