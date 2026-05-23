# Mental Math Practice

A practice app for arithmetic operations. A student picks an **Operation** and a **Difficulty**, plays a fixed-length **Round** of questions, and the result accumulates into their **GameProgress** across rounds.

## Language

**Round**:
A fixed-length practice of N **Question**s for one (**Operation**, **Difficulty**) pair. Has a status of `playing`, `wrong`, or `finished`. Currently N = 10.
_Avoid_: session, game, practice session.

**Question**:
A single arithmetic problem within a Round, with a generated `correctAnswer`.
_Avoid_: problem, exercise.

**Operation**:
One of addition, subtraction, multiplication, division. Selected at the start of a Round.
_Avoid_: op, kind.

**Difficulty**:
One of easy, medium, hard. Determines number ranges for **Question** generation and base points for scoring.
_Avoid_: level, mode.

**GameProgress**:
The persisted record of everything a student has done across **Round**s — totals, per-Operation stats, all-time best streak. Lives in `localStorage`.
_Avoid_: profile, history, save data.

**Streak**:
The count of consecutive correct **Submit**s within a single **Round**. Resets to zero on a wrong answer. Crosses **Streak tiers** (3 / 5 / 10) which multiply scoring.
_Avoid_: combo, run.

**Submit**:
A student's answer for the current **Question**. Either correct (Round auto-advances to the next Question, or finishes) or wrong (Round enters `wrong` state and waits for **Advance**).
_Avoid_: attempt, guess.

**Advance**:
The explicit dismiss of the `wrong` state — moves the Round to the next Question, or to `finished` if it was the last.
_Avoid_: next, continue.

**Summary**:
The terminal record of a finished **Round**: correct count, total, best Streak, score, elapsed time. Distinct from **GameProgress**, which aggregates across all Rounds.
_Avoid_: report, recap.

## Relationships

- A **GameProgress** is updated by zero or more finished **Round**s.
- A **Round** contains N **Question**s and produces one **Summary** on finishing.
- A **Streak** is a property of a **Round**, not of **GameProgress** (though GameProgress records the all-time best Streak across Rounds).

## Example dialogue

> **Dev:** When the student gets the 10th question wrong, what's the order of events?
>
> **Domain:** They Submit the wrong answer — the Round enters `wrong` and shows the correct answer. They Advance (any key), and because there are no more Questions, the Round goes straight to `finished` and emits its Summary.
>
> **Dev:** And the GameProgress?
>
> **Domain:** The Summary is what gets folded into GameProgress. The Round itself doesn't touch storage — the route observes `status === 'finished'` and writes the Summary into GameProgress.
