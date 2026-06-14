import { describe, expect, it } from "vitest";
import { difficultyBackTo } from "../src/navigation";
import type { Operation } from "../src/types";

const OPERATIONS: Operation[] = [
  "addition",
  "subtraction",
  "multiplication",
  "division",
];

describe("difficultyBackTo", () => {
  it("returns to the strategy selector for an operation with a strategy step", () => {
    expect(difficultyBackTo("multiplication")).toBe("/strategy-select");
  });

  it("returns to the strategy selector for every operation that offers strategies", () => {
    // every operation currently exposes strategies, so Back never skips that step
    for (const operation of OPERATIONS) {
      expect(difficultyBackTo(operation)).toBe("/strategy-select");
    }
  });
});
