import type { Difficulty, Operation, Question } from "../types";

// Listed in pedagogical order, mirroring the STRATEGIES registry in index.ts.
export type StrategyId =
  | "add-bridge-ten"
  | "add-near-doubles"
  | "add-left-to-right"
  | "add-compensation"
  | "sub-count-up"
  | "sub-complement"
  | "sub-same-difference"
  | "sub-compensation"
  | "doubling"
  | "times-four"
  | "times-eight"
  | "times-five"
  | "times-nine"
  | "times-eleven"
  | "times-twentyfive"
  | "times-ninetynine"
  | "squares-ending-five"
  | "near-base"
  | "halving"
  | "divide-four"
  | "divide-five"
  | "successive-halving"
  | "divide-twentyfive"
  | "divide-factors"
  | "powers-basic"
  | "powers-special"
  | "root-exact"
  | "root-approx";

export interface Strategy {
  id: StrategyId;
  /** Base operation — drives stats roll-up and the displayed symbol. */
  operation: Operation;
  /** UI label (es). */
  label: string;
  /** Difficulty levels this strategy offers (may be fewer than the four). */
  difficulties: Difficulty[];
  /** Range hint shown per difficulty on the difficulty screen (offered levels only). */
  describe: Partial<Record<Difficulty, string>>;
  /** Short, concrete worked example that teaches the technique at a glance. */
  example: string;
  generate: (difficulty: Difficulty) => Question;
}
