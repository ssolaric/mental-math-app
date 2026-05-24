import { createFileRoute } from "@tanstack/react-router";
import { ProgressStats } from "../components/ProgressStats";
import { resetProgress } from "../progress/progressStore";
import { useGameProgress } from "../progress/useGameProgress";

export const Route = createFileRoute("/stats")({
  component: StatsPage,
});

function StatsPage() {
  const gameProgress = useGameProgress();
  return (
    <ProgressStats
      gameProgress={gameProgress}
      onResetProgress={resetProgress}
    />
  );
}
