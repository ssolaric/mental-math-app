import { CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationContext';

interface FeedbackProps {
  isCorrect: boolean;
  correctAnswer?: number;
}

export const Feedback = ({ isCorrect, correctAnswer }: FeedbackProps) => {
  const { t } = useTranslation();

  if (isCorrect) {
    return (
      <div className="flex items-center gap-3 text-green-600 text-2xl font-bold animate-bounce">
        <CheckCircle size={32} />
        <span>{t('game.correctFeedback')}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 text-red-600">
      <div className="flex items-center gap-3 text-2xl font-bold">
        <XCircle size={32} />
        <span>{t('game.incorrectFeedback')}</span>
      </div>
      {correctAnswer !== undefined && (
        <p className="text-xl text-gray-700">
          {t('game.correctAnswerIs')} <span className="font-bold text-green-600">{correctAnswer}</span>
        </p>
      )}
    </div>
  );
};
