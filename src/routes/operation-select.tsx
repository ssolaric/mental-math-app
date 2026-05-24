import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OperationSelector } from "../components/OperationSelector";
import { useGameProgress } from "../progress/useGameProgress";
import type { Operation } from "../types";

export const Route = createFileRoute("/operation-select")({
  component: OperationSelectPage,
});

function OperationSelectPage() {
  const navigate = useNavigate();
  const gameProgress = useGameProgress();

  const handleSelectOperation = (operation: Operation) => {
    navigate({
      to: "/difficulty-select",
      search: { operation },
    });
  };

  return (
    <OperationSelector
      onSelectOperation={handleSelectOperation}
      gameProgress={gameProgress}
    />
  );
}
