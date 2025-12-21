import type { Translations } from './types';

export const es: Translations = {
  common: {
    startPractice: 'Comenzar práctica',
    viewProgress: 'Ver progreso',
    quit: 'Salir',
    submit: 'Enviar',
    yourAnswer: 'Tu respuesta',
    questionNumber: 'Pregunta #{{number}}',
  },
  operations: {
    addition: 'Suma',
    subtraction: 'Resta',
    multiplication: 'Multiplicación',
    division: 'División',
  },
  difficulty: {
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
    chooseLevel: 'Elige tu nivel de dificultad',
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
        easy: 'Datos básicos',
        medium: '20-90 ÷ 2-9',
        hard: '10-99 ÷ 2-9',
      },
    },
  },
  game: {
    score: 'Puntuación',
    correct: 'Correctas',
    accuracy: 'Precisión',
    time: 'Tiempo',
    currentStreak: 'Racha actual',
    best: 'Mejor',
    correctFeedback: '¡Correcto!',
    incorrectFeedback: '¡No del todo!',
    correctAnswerIs: 'La respuesta correcta es',
  },
  stats: {
    yourProgress: 'Tu progreso',
    resetAllProgress: 'Reiniciar todo el progreso',
    resetConfirmation: '¿Estás seguro de que quieres reiniciar TODO tu progreso? ¡Esto no se puede deshacer!',
    overallStats: 'Estadísticas generales',
    totalProblems: 'Problemas totales',
    bestStreak: 'Mejor racha',
    byOperation: 'Por operación',
    attempts: 'Intentos',
    bestScore: 'Mejor puntuación',
  },
  landing: {
    title: 'Práctica de matemáticas mentales',
    subtitle: '¡Practica tus habilidades matemáticas y haz seguimiento de tu progreso!',
    chooseOperation: 'Elige una operación para practicar',
  },
};
