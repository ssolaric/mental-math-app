import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { Operation } from '../types';
import { STORAGE_KEYS } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { createEmptyGameProgress } from '../utils/storage';
import { OperationSelector } from '../components/OperationSelector';

export const Route = createFileRoute('/operation-select')({
  component: OperationSelectPage,
});

function OperationSelectPage() {
  const navigate = useNavigate();
  const [gameProgress] = useLocalStorage(
    STORAGE_KEYS.GAME_PROGRESS,
    createEmptyGameProgress()
  );

  const handleSelectOperation = (operation: Operation) => {
    navigate({
      to: '/difficulty-select',
      search: { operation },
    });
  };

  return <OperationSelector onSelectOperation={handleSelectOperation} gameProgress={gameProgress} />;
}
