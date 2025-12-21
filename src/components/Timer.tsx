import { Clock } from "lucide-react";
import { useTranslation } from "../i18n/TranslationContext";

interface TimerProps {
  elapsedTime: number;
}

export const Timer = ({ elapsedTime }: TimerProps) => {
  const { t } = useTranslation();

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center gap-3">
      <Clock className="text-blue-600" size={32} />
      <div className="text-center">
        <p className="text-gray-600 text-sm font-medium">{t("game.time")}</p>
        <p className="text-3xl font-bold text-gray-800">
          {formatTime(elapsedTime)}
        </p>
      </div>
    </div>
  );
};
