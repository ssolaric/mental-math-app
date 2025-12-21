export type Locale = 'en' | 'es';

export interface Translations {
  common: {
    startPractice: string;
    viewProgress: string;
    quit: string;
    submit: string;
    yourAnswer: string;
    questionNumber: string; // "Pregunta #{{number}}" / "Question #{{number}}"
  };
  operations: {
    addition: string;
    subtraction: string;
    multiplication: string;
    division: string;
  };
  difficulty: {
    easy: string;
    medium: string;
    hard: string;
    chooseLevel: string;
    descriptions: {
      addition: {
        easy: string;
        medium: string;
        hard: string;
      };
      subtraction: {
        easy: string;
        medium: string;
        hard: string;
      };
      multiplication: {
        easy: string;
        medium: string;
        hard: string;
      };
      division: {
        easy: string;
        medium: string;
        hard: string;
      };
    };
  };
  game: {
    score: string;
    correct: string;
    accuracy: string;
    time: string;
    currentStreak: string;
    best: string;
    correctFeedback: string;
    incorrectFeedback: string;
    correctAnswerIs: string;
  };
  stats: {
    yourProgress: string;
    resetAllProgress: string;
    resetConfirmation: string;
    overallStats: string;
    totalProblems: string;
    bestStreak: string;
    byOperation: string;
    attempts: string;
    bestScore: string;
  };
  landing: {
    title: string;
    subtitle: string;
    chooseOperation: string;
  };
}
