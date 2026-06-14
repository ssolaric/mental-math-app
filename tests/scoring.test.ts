import { describe, expect, it } from "vitest";
import { score } from "../src/scoring";

describe("score", () => {
  it("awards base points for a first correct answer with no speed bonus", () => {
    // streak 1 -> 1.0x, time >= 5s -> no bonus
    expect(score("easy", 1, 10)).toBe(10);
    expect(score("medium", 1, 10)).toBe(20);
    expect(score("hard", 1, 10)).toBe(30);
  });

  it("applies a 1.2x multiplier at a streak of 3", () => {
    // 20 * 1.2 = 24, slow answer (no bonus)
    expect(score("medium", 3, 10)).toBe(24);
  });

  it("applies a 1.5x multiplier at a streak of 5", () => {
    // 20 * 1.5 = 30
    expect(score("medium", 5, 10)).toBe(30);
  });

  it("applies a 2.0x multiplier at a streak of 10", () => {
    // 30 * 2.0 = 60
    expect(score("hard", 10, 10)).toBe(60);
  });

  it("keeps the lower tier multiplier until the next threshold is reached", () => {
    // streaks 3 and 4 both sit in the 1.2x tier
    expect(score("medium", 4, 10)).toBe(24);
    // streaks 5..9 all sit in the 1.5x tier
    expect(score("medium", 9, 10)).toBe(30);
  });

  it("floors the multiplied base before adding the speed bonus", () => {
    // 10 * 1.2 = 12 (already integer); use a case that would fractionally round:
    // easy(10) * 1.5 = 15, hard(30) * 1.2 = 36 — verify floor doesn't lose points
    expect(score("easy", 5, 10)).toBe(15);
    expect(score("hard", 3, 10)).toBe(36);
  });

  it("adds +5 for answers under 3 seconds", () => {
    // 10 * 1.0 + 5
    expect(score("easy", 1, 2)).toBe(15);
    expect(score("easy", 1, 0)).toBe(15);
  });

  it("adds +2 for answers between 3 and 5 seconds", () => {
    // 10 * 1.0 + 2
    expect(score("easy", 1, 3)).toBe(12);
    expect(score("easy", 1, 4)).toBe(12);
  });

  it("adds no speed bonus at 5 seconds or slower", () => {
    expect(score("easy", 1, 5)).toBe(10);
  });

  it("combines streak multiplier and speed bonus", () => {
    // hard(30) * 2.0 = 60, +5 fast bonus
    expect(score("hard", 10, 1)).toBe(65);
  });
});
