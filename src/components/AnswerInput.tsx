import { useState, useEffect, useRef } from 'react';
import { isValidNumber } from '../utils/validators';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

export const AnswerInput = ({ onSubmit, disabled = false }: AnswerInputProps) => {
  const [answer, setAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidNumber(value) || value === '') {
      setAnswer(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() && !disabled) {
      onSubmit(answer);
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={answer}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Your answer"
        className="w-64 text-4xl text-center font-bold border-4 border-blue-500 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-200 disabled:border-gray-400"
      />
      <button
        type="submit"
        disabled={!answer.trim() || disabled}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold text-xl px-12 py-4 rounded-xl transition-colors disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
};
