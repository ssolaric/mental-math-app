import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MathExpression } from "../../../src/components/math/MathExpression";
import type { Difficulty, Operation, Question } from "../../../src/types";

// MathExpression is the single seam that turns a Question into the visual
// left-hand side of the equation. These tests pin the contract every renderer
// behind that seam must honour: operands are present and the right notation
// (operator glyph / exponent / radical) is shown.

const makeQuestion = (
  operation: Operation,
  num1: number,
  num2: number,
  difficulty: Difficulty = "easy",
): Question => ({
  num1,
  num2,
  operation,
  difficulty,
  correctAnswer: 0,
});

describe("MathExpression", () => {
  it.each([
    ["addition", "+"],
    ["subtraction", "−"],
    ["multiplication", "×"],
    ["division", "÷"],
    ["percentage", "% de"],
  ] as const)("renders %s operands with its %s glyph", (operation, glyph) => {
    render(<MathExpression question={makeQuestion(operation, 12, 7)} />);
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText(glyph)).toBeInTheDocument();
  });

  it("renders a power as base and exponent", () => {
    render(<MathExpression question={makeQuestion("power", 2, 8)} />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("renders a square root as a radicand under an SVG radical, no index", () => {
    const { container } = render(
      <MathExpression question={makeQuestion("root", 49, 2)} />,
    );
    expect(screen.getByText("49")).toBeInTheDocument();
    // a real radical is drawn with SVG, not a glyph + border hack
    expect(container.querySelector("svg")).not.toBeNull();
    // square roots show no index
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });

  it("renders a cube root with its index", () => {
    render(<MathExpression question={makeQuestion("root", 27, 3)} />);
    expect(screen.getByText("27")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
