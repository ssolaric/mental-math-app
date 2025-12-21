import type { Translations } from './types';

export const en: Translations = {
  common: {
    startPractice: 'Start Practice',
    viewProgress: 'View Progress',
    quit: 'Quit',
    submit: 'Submit',
    yourAnswer: 'Your answer',
    questionNumber: 'Question #{{number}}',
  },
  operations: {
    addition: 'Addition',
    subtraction: 'Subtraction',
    multiplication: 'Multiplication',
    division: 'Division',
  },
  difficulty: {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    chooseLevel: 'Choose your difficulty level',
    descriptions: {
      addition: {
        easy: '1-9 + 1-9',
        medium: '10-99 + 10-99',
        hard: '100-999 + 10-99',
      },
      subtraction: {
        easy: '5-9 − 1-5',
        medium: '20-99 − 1-50',
        hard: '100-999 − 10-99',
      },
      multiplication: {
        easy: '1-9 × 1-9',
        medium: '1-9 × 10-20',
        hard: '10-25 × 2-9',
      },
      division: {
        easy: 'Basic facts',
        medium: '20-90 ÷ 2-9',
        hard: '10-99 ÷ 2-9',
      },
    },
  },
  game: {
    score: 'Score',
    correct: 'Correct',
    accuracy: 'Accuracy',
    time: 'Time',
    currentStreak: 'Current Streak',
    best: 'Best',
    correctFeedback: 'Correct!',
    incorrectFeedback: 'Not quite!',
    correctAnswerIs: 'The correct answer is',
  },
  stats: {
    yourProgress: 'Your Progress',
    resetAllProgress: 'Reset All Progress',
    resetConfirmation: 'Are you sure you want to reset ALL progress? This cannot be undone!',
    overallStats: 'Overall Stats',
    totalProblems: 'Total Problems',
    bestStreak: 'Best Streak',
    byOperation: 'By Operation',
    attempts: 'Attempts',
    bestScore: 'Best Score',
  },
  landing: {
    title: 'Mental Math Practice',
    subtitle: 'Practice your math skills and track your progress!',
    chooseOperation: 'Choose an operation to practice',
  },
};
