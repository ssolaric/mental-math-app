import type { Difficulty, Operation, Question } from "../types";

export type StrategyId =
  | "add-compensation"
  | "add-bridge-ten"
  | "add-near-doubles"
  | "sub-complement"
  | "sub-compensation"
  | "sub-count-up"
  | "times-eleven"
  | "times-twentyfive"
  | "times-five"
  | "times-nine"
  | "squares-ending-five"
  | "near-base"
  | "divide-five"
  | "successive-halving"
  | "divide-factors";

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
