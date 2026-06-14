import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OperationSelector } from "../components/OperationSelector";
import { useGameProgress } from "../progress/useGameProgress";
import { hasStrategies } from "../strategies";
import type { Operation } from "../types";

export const Route = createFileRoute("/operation-select")({
  component: OperationSelectPage,
});

function OperationSelectPage() {
  const navigate = useNavigate();
  const gameProgress = useGameProgress();

  const handleSelectOperation = (operation: Operation) => {
    // operations with special strategies get an extra step to choose a technique;
    // others go straight to the difficulty screen (unchanged two-step flow).
    const to = hasStrategies(operation)
      ? "/strategy-select"
      : "/difficulty-select";
    navigate({ to, search: { operation } });
  };

  return (
    <OperationSelector
      onSelectOperation={handleSelectOperation}
      gameProgress={gameProgress}
    />
  );
}
