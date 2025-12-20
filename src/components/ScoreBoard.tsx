import type { SessionData } from '../types';

interface ScoreBoardProps {
  sessionData: SessionData;
}

export const ScoreBoard = ({ sessionData }: ScoreBoardProps) => {
  const accuracy =
    sessionData.questionsAnswered > 0
      ? Math.round((sessionData.correctAnswers / sessionData.questionsAnswered) * 100)
      : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex justify-around items-center gap-4">
      <div className="text-center">
        <p className="text-gray-600 text-sm font-medium">Score</p>
        <p className="text-3xl font-bold text-blue-600">{sessionData.score}</p>
      </div>
      <div className="h-12 w-px bg-gray-300"></div>
      <div className="text-center">
        <p className="text-gray-600 text-sm font-medium">Correct</p>
        <p className="text-2xl font-bold text-gray-800">
          {sessionData.correctAnswers}/{sessionData.questionsAnswered}
        </p>
      </div>
      <div className="h-12 w-px bg-gray-300"></div>
      <div className="text-center">
        <p className="text-gray-600 text-sm font-medium">Accuracy</p>
        <p className="text-2xl font-bold text-gray-800">{accuracy}%</p>
      </div>
    </div>
  );
};
