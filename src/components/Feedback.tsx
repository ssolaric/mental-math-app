import { CheckCircle, XCircle } from "lucide-react";

interface FeedbackProps {
  isCorrect: boolean;
  correctAnswer?: number;
}

export const Feedback = ({ isCorrect, correctAnswer }: FeedbackProps) => {
  if (isCorrect) {
    return (
      <div className="flex items-center gap-3 text-green-600 text-2xl font-bold animate-bounce">
        <CheckCircle size={32} />
        <span>¡Correcto!</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 text-red-600">
      <div className="flex items-center gap-3 text-2xl font-bold">
        <XCircle size={32} />
        <span>¡No del todo!</span>
      </div>
      {correctAnswer !== undefined && (
        <p className="text-xl text-gray-700">
          La respuesta correcta es{" "}
          <span className="font-bold text-green-600">{correctAnswer}</span>
        </p>
      )}
    </div>
  );
};
