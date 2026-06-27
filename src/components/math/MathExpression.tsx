import type { ReactNode } from "react";
import { OPERATION_SYMBOLS } from "../../constants/operationSymbols";
import type { Question } from "../../types";

// The single seam between a Question and its visual notation. Every operation's
// left-hand-side rendering lives here, composed from small primitives below.
// Keeping rendering behind one component means a future swap to a math engine
// (KaTeX/MathML) — or new notation like fractions — is a local change, and the
// rest of the app keeps passing a plain Question.

interface MathExpressionProps {
  question: Question;
}

// A base with a raised exponent, e.g. 2⁸. items-start drops the exponent onto
// the base's top edge; the explicit sizes keep the long-standing visual weight.
const Superscript = ({
  base,
  exponent,
}: {
  base: number;
  exponent: number;
}) => (
  <span className="inline-flex items-start text-ink">
    <span className="text-7xl md:text-8xl font-bold leading-none">{base}</span>
    <span className="text-4xl md:text-5xl font-bold leading-none">
      {exponent}
    </span>
  </span>
);

// A radical drawn as an SVG (the check-mark tick) whose top-right corner meets a
// CSS overline above the radicand, giving one continuous stroke with a real
// vinculum — no detached glyph or border-only fake. preserveAspectRatio="none"
// pins the path's endpoints to the box corners so the tick always lands exactly
// on the overline regardless of font size; non-scaling-stroke keeps the line the
// same 2px weight as the border it joins. An optional index renders the small
// degree (e.g. the 3 of a cube root).
//
// Only the radicand sits in normal flow, so the inline-block's baseline is the
// radicand's text baseline — that's what the surrounding "= ?" aligns to. The
// tick and overline are positioned decoratively and never shift that baseline.
const RADICAL_WIDTH = "0.66em"; // tick width == left room reserved for it
// Distance from the vinculum down to the radicand baseline (in em, so it holds
// across the text-7xl→8xl breakpoint). The tick spans exactly this, so its
// V-tip rests on the baseline; the top padding above the digits is part of it.
// Measured against the mono figures in use (~1em from overline to baseline).
const RADICAL_HEIGHT = "1em";
const Radical = ({
  index,
  children,
}: {
  index?: number;
  children: ReactNode;
}) => (
  <span
    className="relative inline-block pt-[0.16em] text-7xl md:text-8xl leading-none text-ink"
    style={{ paddingLeft: RADICAL_WIDTH }}
  >
    {index != null && (
      <span className="absolute left-0 top-[-0.04em] text-[0.34em] font-bold text-ink-muted">
        {index}
      </span>
    )}
    {/* the vinculum starts at the tick's peak (right edge of the svg) and runs
        across the radicand; a hair of overlap hides any subpixel seam */}
    <span
      className="absolute top-0 right-0 border-t-2 border-ink"
      style={{ left: `calc(${RADICAL_WIDTH} - 0.02em)` }}
    />
    {/* viewBox endpoints map to the box corners (preserveAspectRatio="none"):
        the peak (20 0) lands on the vinculum, the V-tip (8.5 24) on the
        baseline. Butt caps keep the peak from poking past the overline. */}
    <svg
      viewBox="0 0 20 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute left-0 top-0"
      style={{ width: RADICAL_WIDTH, height: RADICAL_HEIGHT }}
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M0 13 L3.5 13 L8.5 24 L20 0"
        vectorEffect="non-scaling-stroke"
        strokeWidth={2}
        strokeLinecap="butt"
        strokeLinejoin="round"
      />
    </svg>
    <span className="font-bold">{children}</span>
  </span>
);

export const MathExpression = ({ question }: MathExpressionProps) => {
  if (question.operation === "power") {
    return <Superscript base={question.num1} exponent={question.num2} />;
  }

  if (question.operation === "root") {
    // Square roots are written bare; any higher root shows its degree as the
    // index, so the primitive is fed the real num2 rather than a hardcoded 3.
    return (
      <Radical index={question.num2 === 2 ? undefined : question.num2}>
        {question.num1}
      </Radical>
    );
  }

  // Every binary/percentage operation: `num1 <glyph> num2`. The internal gap
  // mirrors the equation row's spacing so operands keep their familiar rhythm.
  return (
    <span className="inline-flex items-baseline gap-5 md:gap-7">
      <span className="text-7xl md:text-8xl font-bold text-ink">
        {question.num1}
      </span>
      <span className="text-5xl md:text-6xl font-normal text-ink-muted">
        {OPERATION_SYMBOLS[question.operation]}
      </span>
      <span className="text-7xl md:text-8xl font-bold text-ink">
        {question.num2}
      </span>
    </span>
  );
};
