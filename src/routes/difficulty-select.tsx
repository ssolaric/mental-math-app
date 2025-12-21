import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DifficultySelector } from "../components/DifficultySelector";
import type { Difficulty, Operation } from "../types";

type DifficultySearch = {
  operation: Operation;
};

export const Route = createFileRoute("/difficulty-select")({
  validateSearch: (search: Record<string, unknown>): DifficultySearch => {
    return {
      operation: search.operation as Operation,
    };
  },
  component: DifficultySelectPage,
});

function DifficultySelectPage() {
  const navigate = useNavigate();
  const { operation } = Route.useSearch();

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    navigate({
      to: "/game",
      search: { operation, difficulty },
    });
  };

  return (
    <DifficultySelector
      operation={operation}
      onSelectDifficulty={handleSelectDifficulty}
    />
  );
}
