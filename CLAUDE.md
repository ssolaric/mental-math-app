# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mental Math Practice App - A TypeScript/React application for 5th grade students to practice arithmetic operations (addition, subtraction, multiplication, division) with three difficulty levels each. Progress is tracked locally using browser localStorage (no backend).

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite 7
- **Routing**: TanStack Router (file-based routing)
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **State Management**: React hooks (useState, useCallback) - no external state library
- **Data Persistence**: Browser localStorage only

## Development Commands

```bash
npm run dev      # Start development server (usually runs on port 5173 or 5174)
npm run build    # TypeScript check + production build
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## TypeScript Import Requirements

**CRITICAL**: This project uses `"verbatimModuleSyntax": true` in tsconfig.app.json. You MUST use `import type` for type-only imports:

```typescript
// Correct
import type { Operation, Difficulty } from './types';
import { STORAGE_KEYS } from './types';

// Wrong - will cause runtime errors
import { Operation, Difficulty, STORAGE_KEYS } from './types';
```

Always separate type imports from value imports.

## Architecture

### Core Data Flow

1. **Game State**: Managed by `useGameState` hook - handles question generation, answer validation, scoring with streak multipliers
2. **Timer**: Separate `useTimer` hook tracks elapsed time
3. **Progress Persistence**: `useLocalStorage` hook syncs to browser storage automatically
4. **Screen Navigation**: TanStack Router file-based routing - routes: / (landing) → /operation-select → /difficulty-select → /game → /stats

### Key Files

- **src/types/index.ts**: All TypeScript interfaces and types (Operation, Difficulty, Question, SessionData, GameProgress, etc.)
- **src/constants/gameConfig.ts**: Number ranges for each operation/difficulty, scoring rules (base points, streak multipliers, speed bonuses)
- **src/utils/mathGenerator.ts**: Generates random problems ensuring valid answers (e.g., subtraction never produces negatives, division always produces integers on easy/medium)
- **src/hooks/useGameState.ts**: Central game logic orchestrator
- **src/utils/storage.ts**: Helper functions to initialize/update GameProgress structure in localStorage
- **src/routes/**: File-based routes for TanStack Router
  - **__root.tsx**: Root layout component with Outlet for child routes
  - **index.tsx**: Landing page (/)
  - **operation-select.tsx**: Operation selection screen
  - **difficulty-select.tsx**: Difficulty selection (receives operation via search params)
  - **game.tsx**: Main game screen (receives operation & difficulty via search params)
  - **stats.tsx**: Progress statistics page
- **src/routeTree.gen.ts**: Auto-generated route tree (do not edit manually)

### Scoring System

- Base points: Easy (10), Medium (20), Hard (30)
- Streak multipliers: 3+ correct (1.2x), 5+ correct (1.5x), 10+ correct (2.0x)
- Speed bonuses: <3s (+5), <5s (+2)
- Calculated in `constants/gameConfig.ts::calculatePoints()`

### Math Problem Constraints (5th Grade Appropriate)

- **Addition**: Easy (1-9), Medium (10-99), Hard (100-999 + 10-99)
- **Subtraction**: Always ensures num1 ≥ num2 (no negatives)
- **Multiplication**: Easy (times tables 1-9), Medium (1-9 × 10-20), Hard (10-25 × 2-9)
- **Division**: Always generates problems with integer quotients (uses multiplication in reverse)

## Routing with TanStack Router

This app uses TanStack Router with file-based routing. The router is configured in `vite.config.ts` with the `@tanstack/router-plugin` which auto-generates the route tree.

### Route Flow & Search Params

- **/** (index): Landing page with "Start Practice" and "View Progress" buttons
- **/operation-select**: Choose math operation (addition, subtraction, multiplication, division)
- **/difficulty-select?operation=X**: Choose difficulty level (easy, medium, hard) - receives `operation` via search params
- **/game?operation=X&difficulty=Y**: Main game screen - receives both `operation` and `difficulty` via search params
- **/stats**: View overall progress and per-operation statistics

Search params are type-validated using `validateSearch` in route definitions. Routes use TanStack Router's `useNavigate()` hook and `Link` component for navigation.

### Adding New Routes

1. Create a new file in `src/routes/` (e.g., `my-route.tsx`)
2. Use `createFileRoute('/my-route')` to define the route
3. The Vite plugin will auto-regenerate `routeTree.gen.ts`
4. Import and use with `<Link to="/my-route">` or `navigate({ to: '/my-route' })`

## Component Structure

Components are mostly presentational - state lives in routes or custom hooks:

- **OperationSelector**: Shows 4 operation buttons with mini stats from gameProgress
- **DifficultySelector**: Shows 3 difficulty buttons with number range descriptions
- **Question**: Displays math problem using OPERATION_SYMBOLS
- **AnswerInput**: Number-only input with Enter-to-submit, auto-focus management
- **Feedback**: Shows correct/incorrect with animation, displays correct answer when wrong
- **ScoreBoard/StreakIndicator/Timer**: Display session stats, update from sessionData prop
- **ProgressStats**: Reads from localStorage, shows overall + per-operation statistics

## State Management Pattern

No Redux/Zustand - uses composition of hooks within routes:

```typescript
// In a route component
const [gameProgress, setGameProgress] = useLocalStorage(STORAGE_KEYS.GAME_PROGRESS, createEmptyGameProgress());
const { currentQuestion, sessionData, submitAnswer, ... } = useGameState();
const { elapsedTime, start, pause, reset } = useTimer();
```

Game progress is managed locally within routes using the `useLocalStorage` hook. On game session end, routes call `updateGameProgress()` to merge session stats into overall progress and persist to localStorage.

## localStorage Schema

- **mental-math-progress**: GameProgress object with totalProblems, totalCorrect, allTimeStreak, and per-operation OperationStats
- **mental-math-session**: (unused currently, reserved for session resume feature)
- **mental-math-preferences**: (unused currently, reserved for settings)

## Common Patterns

1. **Adding new operations**: Update Operation type → add to DIFFICULTY_RANGES → add generator function in mathGenerator.ts → add label/symbol in gameConfig.ts
2. **Adding new difficulty**: Update Difficulty type → add ranges to DIFFICULTY_RANGES → add descriptions to DIFFICULTY_DESCRIPTIONS
3. **New UI components**: Follow existing pattern - accept props, no internal state unless for UI-only concerns (animations, focus), use Tailwind for styling

## Styling Notes

- Uses Tailwind CSS v4 (imported via `@import "tailwindcss"` in index.css)
- Kid-friendly: large buttons, bright colors, clear visual feedback
- Responsive: uses md: breakpoints for desktop layouts
- Color scheme: operation buttons have distinct colors (green/blue/purple/orange), streak indicator changes color based on streak level
