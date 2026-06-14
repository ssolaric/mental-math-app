import { hasStrategies } from "./strategies";
import type { Operation } from "./types";

/**
 * Where the difficulty screen's Back link returns to. Mirrors how operation
 * select routes *forward*: an operation with a strategy step is reached via the
 * strategy selector, so Back returns there rather than skipping back to the
 * operation selector.
 */
export const difficultyBackTo = (
  operation: Operation,
): "/strategy-select" | "/operation-select" =>
  hasStrategies(operation) ? "/strategy-select" : "/operation-select";
