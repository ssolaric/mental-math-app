import { useEffect, useRef } from "react";

interface ArenaInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export const ArenaInput = ({
  value,
  onChange,
  onSubmit,
  disabled,
}: ArenaInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSubmit();
      }
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      value={value}
      onChange={(e) => {
        const v = e.target.value;
        if (v === "" || /^[0-9]+$/.test(v)) onChange(v);
      }}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label="Tu respuesta"
      aria-describedby="arena-problem"
      className="w-64 md:w-72 text-6xl md:text-7xl text-center font-mono font-bold tabular-nums text-ink bg-transparent border-0 border-b border-accent-soft focus:border-accent focus:outline-none disabled:text-ink-subtle disabled:border-ink-subtle/40 pb-3 caret-accent"
    />
  );
};
