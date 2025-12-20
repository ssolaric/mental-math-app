import { Flame } from 'lucide-react';

interface StreakIndicatorProps {
  currentStreak: number;
  bestStreak: number;
}

export const StreakIndicator = ({ currentStreak, bestStreak }: StreakIndicatorProps) => {
  const getStreakColor = (streak: number): string => {
    if (streak >= 10) return 'text-red-500';
    if (streak >= 5) return 'text-orange-500';
    if (streak >= 3) return 'text-yellow-500';
    return 'text-gray-400';
  };

  const getStreakBgColor = (streak: number): string => {
    if (streak >= 10) return 'bg-red-100';
    if (streak >= 5) return 'bg-orange-100';
    if (streak >= 3) return 'bg-yellow-100';
    return 'bg-gray-100';
  };

  return (
    <div className={`${getStreakBgColor(currentStreak)} rounded-xl shadow-lg p-6 flex items-center justify-center gap-4`}>
      <Flame className={getStreakColor(currentStreak)} size={40} />
      <div className="text-center">
        <p className="text-gray-600 text-sm font-medium">Current Streak</p>
        <p className={`text-4xl font-bold ${getStreakColor(currentStreak)}`}>{currentStreak}</p>
      </div>
      <div className="h-12 w-px bg-gray-300"></div>
      <div className="text-center">
        <p className="text-gray-600 text-sm font-medium">Best</p>
        <p className="text-2xl font-bold text-gray-800">{bestStreak}</p>
      </div>
    </div>
  );
};
