import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GameArena } from "../components/arena/GameArena";
import type { StrategyId } from "../strategies";
import type { Difficulty, Operation } from "../types";

type GameSearch = {
  operation: Operation;
  difficulty: Difficulty;
  strategy?: StrategyId;
};

export const Route = createFileRoute("/game")({
  validateSearch: (search: Record<string, unknown>): GameSearch => ({
    operation: search.operation as Operation,
    difficulty: search.difficulty as Difficulty,
    strategy: search.strategy as StrategyId | undefined,
  }),
  component: GamePage,
});

function GamePage() {
  const navigate = useNavigate();
  const { operation, difficulty, strategy } = Route.useSearch();

  return (
    <GameArena
      operation={operation}
      difficulty={difficulty}
      strategy={strategy}
      onExit={() => navigate({ to: "/" })}
      onChangeLevel={() =>
        navigate({ to: "/difficulty-select", search: { operation, strategy } })
      }
    />
  );
}
