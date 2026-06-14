import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GameArena } from "../../../src/components/arena/GameArena";
import {
  configureProgressStorage,
  getProgress,
} from "../../../src/progress/progressStore";
import { inMemoryStorageAdapter } from "../../../src/progress/storageAdapter";

// Drive the whole arena (component + useRound + progressStore) the way a player
// does: read the rendered addition problem, type the answer, press Enter.
// Addition keeps the expected answer trivially derivable from the DOM.

const readCurrentAnswer = (): number => {
  const equals = screen.getByText("=");
  const equation = equals.parentElement;
  if (!equation) throw new Error("could not locate the equation container");
  const digits = equation.textContent?.match(/\d+/g);
  if (!digits || digits.length < 2) {
    throw new Error(`unexpected equation text: ${equation.textContent}`);
  }
  const [a, b] = digits.map(Number);
  return a + b;
};

const renderArena = () => {
  const onExit = vi.fn();
  const onChangeLevel = vi.fn();
  const user = userEvent.setup();
  render(
    <GameArena
      operation="addition"
      difficulty="easy"
      onExit={onExit}
      onChangeLevel={onChangeLevel}
    />,
  );
  return { user, onExit, onChangeLevel };
};

const answerOnce = async (
  user: ReturnType<typeof userEvent.setup>,
  value: number,
) => {
  const input = screen.getByLabelText("Tu respuesta");
  await user.type(input, String(value));
  await user.keyboard("{Enter}");
};

const playCorrect = (user: ReturnType<typeof userEvent.setup>) =>
  answerOnce(user, readCurrentAnswer());

beforeEach(() => {
  configureProgressStorage(inMemoryStorageAdapter());
});

afterEach(() => {
  configureProgressStorage(inMemoryStorageAdapter());
});

describe("GameArena", () => {
  it("renders an addition problem with an answer input", () => {
    renderArena();
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByLabelText("Tu respuesta")).toBeEnabled();
  });

  it("accepts a correct answer and increases the score", async () => {
    const { user } = renderArena();
    expect(screen.getByText("Pts").nextSibling).toHaveTextContent("0");

    await playCorrect(user);

    // a fresh problem is presented and the score is no longer zero
    expect(screen.getByText("Pts").nextSibling).not.toHaveTextContent("0");
    expect(screen.getByLabelText("Tu respuesta")).toHaveValue("");
  });

  it("reveals the answer and pauses when the player is wrong", async () => {
    const { user } = renderArena();
    const correct = readCurrentAnswer();

    await answerOnce(user, correct + 1);

    expect(screen.getByText("Enter para continuar")).toBeInTheDocument();
    expect(screen.getByLabelText("Tu respuesta")).toBeDisabled();
  });

  it("resumes the next problem after acknowledging a wrong answer with Enter", async () => {
    const { user } = renderArena();
    const correct = readCurrentAnswer();
    await answerOnce(user, correct + 1);
    expect(screen.getByText("Enter para continuar")).toBeInTheDocument();

    await user.keyboard("{Enter}");

    expect(screen.queryByText("Enter para continuar")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Tu respuesta")).toBeEnabled();
  });

  it("shows the results screen and records progress after a full round", async () => {
    const { user } = renderArena();

    for (let i = 0; i < 10; i++) {
      await playCorrect(user);
    }

    const results = await screen.findByText("Otra ronda");
    expect(results).toBeInTheDocument();
    // 10 of 10 correct shown on the results screen
    expect(screen.getByText("/").parentElement).toHaveTextContent("10");

    // the finished round was persisted through the progress store
    expect(getProgress().stats.addition.totalAttempts).toBe(10);
    expect(getProgress().stats.addition.correctAnswers).toBe(10);
    expect(getProgress().totalProblems).toBe(10);
  });

  it("starts a new round when choosing to play again", async () => {
    const { user } = renderArena();
    for (let i = 0; i < 10; i++) {
      await playCorrect(user);
    }
    const playAgain = await screen.findByText("Otra ronda");

    await user.click(playAgain);

    // back to a live problem with a fresh, enabled input
    expect(screen.getByLabelText("Tu respuesta")).toBeEnabled();
    expect(screen.queryByText("Otra ronda")).not.toBeInTheDocument();
    expect(screen.getByText("Pts").nextSibling).toHaveTextContent("0");
  });

  it("exits the arena via the Salir button", async () => {
    const { user, onExit } = renderArena();
    await user.click(screen.getByRole("button", { name: "Salir" }));
    expect(onExit).toHaveBeenCalledTimes(1);
  });

  it("invokes change-level from the results screen", async () => {
    const { user, onChangeLevel } = renderArena();
    for (let i = 0; i < 10; i++) {
      await playCorrect(user);
    }
    await screen.findByText("Otra ronda");

    await user.click(screen.getByText("Cambiar nivel"));
    expect(onChangeLevel).toHaveBeenCalledTimes(1);
  });

  it("does not submit an empty answer", async () => {
    const { user } = renderArena();
    const input = screen.getByLabelText("Tu respuesta");
    input.focus();

    await user.keyboard("{Enter}");

    // still the first problem, nothing recorded
    expect(screen.getByText("Pts").nextSibling).toHaveTextContent("0");
    const dots = within(document.body);
    expect(dots.queryByText("Otra ronda")).not.toBeInTheDocument();
  });
});
