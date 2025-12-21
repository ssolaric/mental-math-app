# Mental Math Practice App

A kid-friendly math practice application for 5th grade students to practice arithmetic operations with real-time scoring, streak tracking, and progress persistence.

## Features

- **4 Operations**: Addition, Subtraction, Multiplication, Division
- **3 Difficulty Levels**: Easy, Medium, Hard (age-appropriate for 5th graders)
- **Smart Scoring**: Base points + streak multipliers (up to 2x) + speed bonuses
- **Progress Tracking**: All statistics saved in browser localStorage
- **No Login Required**: Single student use, instant access
- **Responsive Design**: Works on desktop, tablet, and mobile

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- React 19 + TypeScript
- Vite 7 (build tool)
- Tailwind CSS v4 (styling)
- lucide-react (icons)
- localStorage (data persistence)

## Project Structure

```
src/
├── components/       # React components (OperationSelector, Question, etc.)
├── hooks/           # Custom hooks (useGameState, useTimer, useLocalStorage)
├── utils/           # Utilities (mathGenerator, validators, storage helpers)
├── constants/       # Game configuration (scoring rules, difficulty ranges)
├── types/           # TypeScript type definitions
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## How It Works

1. Student selects an operation (+ − × ÷)
2. Chooses difficulty level (Easy, Medium, Hard)
3. Answers math problems with immediate feedback
4. Earns points with streak multipliers for consecutive correct answers
5. Progress is automatically saved to browser storage

## Deployment

Built as a static site - can be deployed to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

```bash
npm run build    # Generates dist/ folder
# Deploy the dist/ folder to your hosting service
```

## Development Notes

See [CLAUDE.md](./CLAUDE.md) for detailed architecture and development guidelines.

## License

GPLv3
