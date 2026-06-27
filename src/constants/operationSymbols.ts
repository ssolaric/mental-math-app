import type { Operation } from "../types";

export const OPERATION_SYMBOLS: Record<Operation, string> = {
  addition: "+",
  subtraction: "−",
  multiplication: "×",
  division: "÷",
  // reads as "<percent> % de <base>" between the two operands, e.g. "20 % de 80"
  percentage: "% de",
};
