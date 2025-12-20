import { createFileRoute } from '@tanstack/react-router';
import { STORAGE_KEYS } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { createEmptyGameProgress } from '../utils/storage';
import { ProgressStats } from '../components/ProgressStats';

export const Route = createFileRoute('/stats')({
  component: StatsPage,
});

function StatsPage() {
  const [gameProgress, setGameProgress] = useLocalStorage(
    STORAGE_KEYS.GAME_PROGRESS,
    createEmptyGameProgress()
  );

  const handleResetProgress = () => {
    setGameProgress(createEmptyGameProgress());
  };

  return <ProgressStats gameProgress={gameProgress} onResetProgress={handleResetProgress} />;
}
