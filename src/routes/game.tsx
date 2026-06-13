import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GameArena } from "../components/arena/GameArena";
import type { Difficulty, Operation } from "../types";

type GameSearch = {
  operation: Operation;
  difficulty: Difficulty;
};

export const Route = createFileRoute("/game")({
  validateSearch: (search: Record<string, unknown>): GameSearch => ({
    operation: search.operation as Operation,
    difficulty: search.difficulty as Difficulty,
  }),
  component: GamePage,
});

function GamePage() {
  const navigate = useNavigate();
  const { operation, difficulty } = Route.useSearch();

  return (
    <GameArena
      operation={operation}
      difficulty={difficulty}
      onExit={() => navigate({ to: "/" })}
      onChangeLevel={() =>
        navigate({ to: "/difficulty-select", search: { operation } })
      }
    />
  );
}
