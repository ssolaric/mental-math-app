import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DifficultySelector } from "../components/DifficultySelector";
import { difficultyBackTo } from "../navigation";
import { getStrategy, type StrategyId } from "../strategies";
import type { Difficulty, Operation } from "../types";

type DifficultySearch = {
  operation: Operation;
  strategy?: StrategyId;
};

export const Route = createFileRoute("/difficulty-select")({
  validateSearch: (search: Record<string, unknown>): DifficultySearch => {
    return {
      operation: search.operation as Operation,
      strategy: search.strategy as StrategyId | undefined,
    };
  },
  component: DifficultySelectPage,
});

function DifficultySelectPage() {
  const navigate = useNavigate();
  const { operation, strategy } = Route.useSearch();
  const strategyDef = strategy ? getStrategy(strategy) : null;

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    navigate({
      to: "/game",
      search: { operation, difficulty, strategy },
    });
  };

  return (
    <DifficultySelector
      operation={operation}
      onSelectDifficulty={handleSelectDifficulty}
      backTo={difficultyBackTo(operation)}
      difficulties={strategyDef?.difficulties}
      describe={strategyDef?.describe}
      subtitle={strategyDef?.label}
    />
  );
}
