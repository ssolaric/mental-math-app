import type { Question as QuestionType } from '../types';
import { OPERATION_SYMBOLS } from '../constants/gameConfig';
import { useTranslation } from '../i18n/TranslationContext';

interface QuestionProps {
  question: QuestionType;
  questionNumber: number;
}

export const Question = ({ question, questionNumber }: QuestionProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center mb-8">
      <p className="text-gray-600 text-lg mb-4">{t('common.questionNumber', { number: questionNumber })}</p>
      <div className="text-6xl md:text-7xl font-bold text-gray-800 flex items-center gap-6">
        <span>{question.num1}</span>
        <span className="text-5xl md:text-6xl">{OPERATION_SYMBOLS[question.operation]}</span>
        <span>{question.num2}</span>
        <span className="text-5xl md:text-6xl">=</span>
        <span className="text-blue-600">?</span>
      </div>
    </div>
  );
};
