import { useState, useEffect, useRef } from 'react';

export interface UseTimerReturn {
  elapsedTime: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  getElapsedSeconds: () => number;
}

export const useTimer = (): UseTimerReturn => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => {
    if (isRunning) return;

    if (pausedTimeRef.current > 0) {
      // Resuming from pause
      startTimeRef.current = Date.now() - pausedTimeRef.current;
      pausedTimeRef.current = 0;
    } else {
      // Starting fresh
      startTimeRef.current = Date.now();
      setElapsedTime(0);
    }

    setIsRunning(true);
  };

  const pause = () => {
    if (!isRunning) return;

    pausedTimeRef.current = elapsedTime;
    setIsRunning(false);
  };

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
  };

  const getElapsedSeconds = () => {
    return Math.floor(elapsedTime / 1000);
  };

  return {
    elapsedTime,
    isRunning,
    start,
    pause,
    reset,
    getElapsedSeconds,
  };
};
