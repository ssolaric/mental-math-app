import { createFileRoute } from "@tanstack/react-router";
import { ProgressStats } from "../components/ProgressStats";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../types";
import { createEmptyGameProgress } from "../utils/storage";

export const Route = createFileRoute("/stats")({
  component: StatsPage,
});

function StatsPage() {
  const [gameProgress, setGameProgress] = useLocalStorage(
    STORAGE_KEYS.GAME_PROGRESS,
    createEmptyGameProgress(),
  );

  const handleResetProgress = () => {
    setGameProgress(createEmptyGameProgress());
  };

  return (
    <ProgressStats
      gameProgress={gameProgress}
      onResetProgress={handleResetProgress}
    />
  );
}
