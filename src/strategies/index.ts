import type { Difficulty, Operation, Question } from "../types";
import { generateQuestion } from "../utils/mathGenerator";
import { addBridgeTen } from "./addBridgeTen";
import { addCompensation } from "./addCompensation";
import { addNearDoubles } from "./addNearDoubles";
import { divideFactors } from "./divideFactors";
import { divideFive } from "./divideFive";
import { nearBase } from "./nearBase";
import { squaresEndingFive } from "./squaresEndingFive";
import { subCompensation } from "./subCompensation";
import { subComplement } from "./subComplement";
import { subCountUp } from "./subCountUp";
import { successiveHalving } from "./successiveHalving";
import { timesEleven } from "./timesEleven";
import { timesFive } from "./timesFive";
import { timesNine } from "./timesNine";
import { timesTwentyFive } from "./timesTwentyFive";
import type { Strategy, StrategyId } from "./types";

export type { Strategy, StrategyId } from "./types";

const STRATEGIES: Record<StrategyId, Strategy> = {
  "add-compensation": addCompensation,
  "add-bridge-ten": addBridgeTen,
  "add-near-doubles": addNearDoubles,
  "sub-complement": subComplement,
  "sub-compensation": subCompensation,
  "sub-count-up": subCountUp,
  "times-eleven": timesEleven,
  "times-twentyfive": timesTwentyFive,
  "times-five": timesFive,
  "times-nine": timesNine,
  "squares-ending-five": squaresEndingFive,
  "near-base": nearBase,
  "divide-five": divideFive,
  "successive-halving": successiveHalving,
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
