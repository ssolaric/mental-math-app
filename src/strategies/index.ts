import type { Difficulty, Operation, Question } from "../types";
import { generateQuestion } from "../utils/mathGenerator";
import { addBridgeTen } from "./addBridgeTen";
import { addCompensation } from "./addCompensation";
import { addLeftToRight } from "./addLeftToRight";
import { addNearDoubles } from "./addNearDoubles";
import { divideFactors } from "./divideFactors";
import { divideFive } from "./divideFive";
import { divideFour } from "./divideFour";
import { divideTwentyFive } from "./divideTwentyFive";
import { doubling } from "./doubling";
import { halving } from "./halving";
import { nearBase } from "./nearBase";
import { powersBasic } from "./powersBasic";
import { powersSpecial } from "./powersSpecial";
import { rootApprox } from "./rootApprox";
import { rootExact } from "./rootExact";
import { squaresEndingFive } from "./squaresEndingFive";
import { subCompensation } from "./subCompensation";
import { subComplement } from "./subComplement";
import { subCountUp } from "./subCountUp";
import { subSameDifference } from "./subSameDifference";
import { successiveHalving } from "./successiveHalving";
import { timesEight } from "./timesEight";
import { timesEleven } from "./timesEleven";
import { timesFive } from "./timesFive";
import { timesFour } from "./timesFour";
import { timesNine } from "./timesNine";
import { timesNineNine } from "./timesNineNine";
import { timesTwentyFive } from "./timesTwentyFive";
import type { Strategy, StrategyId } from "./types";

export type { Strategy, StrategyId } from "./types";

// Ordered by pedagogical suitability per operation: the most foundational,
// concrete techniques come first and build toward the specialized/abstract ones.
const STRATEGIES: Record<StrategyId, Strategy> = {
  // Addition: make-ten → near doubles → place-value parts → round-and-adjust
  "add-bridge-ten": addBridgeTen,
  "add-near-doubles": addNearDoubles,
  "add-left-to-right": addLeftToRight,
  "add-compensation": addCompensation,
  // Subtraction: count up → complement → same difference → round-and-adjust
  "sub-count-up": subCountUp,
  "sub-complement": subComplement,
  "sub-same-difference": subSameDifference,
  "sub-compensation": subCompensation,
  // Multiplication: doubling family (×2→×4→×8) → ×5 → ×9 → ×11 → ×25 → ×99 → squares → near-base
  doubling: doubling,
  "times-four": timesFour,
  "times-eight": timesEight,
  "times-five": timesFive,
  "times-nine": timesNine,
  "times-eleven": timesEleven,
  "times-twentyfive": timesTwentyFive,
  "times-ninetynine": timesNineNine,
  "squares-ending-five": squaresEndingFive,
  "near-base": nearBase,
  // Division: ÷2 → ÷4 → ÷5 → successive halving → ÷25 → factoring
  halving: halving,
  "divide-four": divideFour,
  "divide-five": divideFive,
  "successive-halving": successiveHalving,
  "divide-twentyfive": divideTwentyFive,
  "divide-factors": divideFactors,
  // Powers: exact powers (squares→fifths) then powers of fixed bases (2,3,5,7,11…)
  "powers-basic": powersBasic,
  "powers-special": powersSpecial,
  // Roots: exact square/cube roots then floor (approximate) roots
  "root-exact": rootExact,
  "root-approx": rootApprox,
};

export const getStrategy = (id: StrategyId): Strategy => STRATEGIES[id];

export const strategiesForOperation = (operation: Operation): Strategy[] =>
  Object.values(STRATEGIES).filter((s) => s.operation === operation);

/** Whether an operation has a strategy step (its own technique screen). */
export const hasStrategies = (operation: Operation): boolean =>
  strategiesForOperation(operation).length > 0;

/**
 * Stable identity of a problem within a round. Two questions collide when they
 * share an operation and both operands — that is the same operation the student
 * would see twice. The correct answer is derived from these, so it is omitted.
 */
export const questionKey = (q: Question): string =>
  `${q.operation}:${q.num1}:${q.num2}`;

// Generators are pure random draws, so the only way to avoid a repeat is to
// re-draw. Every offered pool is sized comfortably above the round length
// (see constants/difficulty.ts and the strategy configs), so a fresh draw is
// found in a handful of tries; the cap is a safety valve, never the norm.
const UNIQUE_GENERATION_ATTEMPTS = 80;

/**
 * Resolve the generator for a round: a strategy generator when a strategyId is
 * given, otherwise the standard generator for the operation.
 *
 * When `seen` is supplied, the result is guaranteed not to repeat a key already
 * in it (subject to the attempt cap) so a single round never shows the same
 * operation twice.
 */
export const generateForRound = (
  operation: Operation,
  difficulty: Difficulty,
  strategyId?: StrategyId,
  seen?: ReadonlySet<string>,
): Question => {
  const draw = (): Question =>
    strategyId
      ? getStrategy(strategyId).generate(difficulty)
      : generateQuestion(operation, difficulty);

  let question = draw();
  if (seen && seen.size > 0) {
    for (
      let attempt = 0;
      attempt < UNIQUE_GENERATION_ATTEMPTS && seen.has(questionKey(question));
      attempt++
    ) {
      question = draw();
    }
  }
  return question;
};
