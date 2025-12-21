import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OperationSelector } from "../components/OperationSelector";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Operation } from "../types";
import { STORAGE_KEYS } from "../types";
import { createEmptyGameProgress } from "../utils/storage";

export const Route = createFileRoute("/operation-select")({
  component: OperationSelectPage,
});

function OperationSelectPage() {
  const navigate = useNavigate();
  const [gameProgress] = useLocalStorage(
    STORAGE_KEYS.GAME_PROGRESS,
    createEmptyGameProgress(),
  );

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
