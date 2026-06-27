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
};

export const getStrategy = (id: StrategyId): Strategy => STRATEGIES[id];

export const strategiesForOperation = (operation: Operation): Strategy[] =>
  Object.values(STRATEGIES).filter((s) => s.operation === operation);

/** Whether an operation has a strategy step (its own technique screen). */
export const hasStrategies = (operation: Operation): boolean =>
  strategiesForOperation(operation).length > 0;

/**
 * Resolve the generator for a round: a strategy generator when a strategyId is
 * given, otherwise the standard generator for the operation.
 */
export const generateForRound = (
  operation: Operation,
  difficulty: Difficulty,
  strategyId?: StrategyId,
): Question =>
  strategyId
    ? getStrategy(strategyId).generate(difficulty)
    : generateQuestion(operation, difficulty);
