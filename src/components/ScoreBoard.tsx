import type { SessionData } from '../types';
import { useTranslation } from '../i18n/TranslationContext';

interface ScoreBoardProps {
  sessionData: SessionData;
}

export const ScoreBoard = ({ sessionData }: ScoreBoardProps) => {
  const { t } = useTranslation();
  const accuracy =
    sessionData.questionsAnswered > 0
      ? Math.round((sessionData.correctAnswers / sessionData.questionsAnswered) * 100)
      : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex justify-around items-center gap-4">
      <div className="text-center">
        <p className="text-gray-600 text-sm font-medium">{t('game.score')}</p>
        <p className="text-3xl font-bold text-blue-600">{sessionData.score}</p>
      </div>
      <div className="h-12 w-px bg-gray-300"></div>
      <div className="text-center">
        <p className="text-gray-600 text-sm font-medium">{t('game.correct')}</p>
        <p className="text-2xl font-bold text-gray-800">
          {sessionData.correctAnswers}/{sessionData.questionsAnswered}
        </p>
      </div>
      <div className="h-12 w-px bg-gray-300"></div>
      <div className="text-center">
        <p className="text-gray-600 text-sm font-medium">{t('game.accuracy')}</p>
        <p className="text-2xl font-bold text-gray-800">{accuracy}%</p>
      </div>
    </div>
  );
};
