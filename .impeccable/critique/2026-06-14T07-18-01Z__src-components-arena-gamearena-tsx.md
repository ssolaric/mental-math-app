---
target: the app (full practice flow, anchored on the game arena)
total_score: 30
p0_count: 0
p1_count: 2
timestamp: 2026-06-14T07-18-01Z
slug: src-components-arena-gamearena-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live dots/timer/score/aria all strong; step counter misreports the flow |
| 2 | Match System / Real World | 4 | Plain kid-Spanish, real math glyphs, natural labels |
| 3 | User Control and Freedom | 3 | Exit + back + change-level everywhere; no mid-round restart |
| 4 | Consistency and Standards | 3 | Tight system, but "Paso 1 de 2 / 2 de 2" contradicts the 3-step reality |
| 5 | Error Prevention | 3 | Digit-only input, empty-submit guard, armed reset |
| 6 | Recognition Rather Than Recall | 3 | Strategy examples teach inline; active op/level not shown in arena |
| 7 | Flexibility and Efficiency | 3 | Enter-submit, any-digit-advance, auto-focus; no skip/settings |
| 8 | Aesthetic and Minimalist Design | 3 | Clean and one-CTA; arena dead space + strategy overflow drag it down |
| 9 | Error Recovery | 3 | Wrong-answer reveal is excellent; no real failure-state handling |
| 10 | Help and Documentation | 2 | Zero first-run guidance; empty amber input line is the only cue |
| **Total** | | **30/40** | **Good — solid foundation, a few real gaps** |

## Anti-Patterns Verdict

**Does this look AI-generated? No.** This is a committed, opinionated system that actively dodges the four anti-references in PRODUCT.md. No SaaS navy, no hero-metric template, no primary-rainbow kids cliché, no XP-bar gamification, no institutional beige. The emerald hub / emerald-inverted arena with a single amber accent is a real point of view, executed consistently. Mono-for-data vs grotesk-for-language is a genuine typographic idea, not a default.

**Deterministic scan**: `detect.mjs --json src/components src/routes` returned `[]` (exit 0). No side-stripe borders, gradient text, ghost-card shadow pairs, over-rounding, or eyebrow/numbered-marker slop detected. Clean.

**Visual overlays**: No browser overlay injected. Critique used direct Playwright screenshots + a canvas-pixel contrast probe at 1280×832 and 390×844 instead. No fabricated overlay claim.

## Overall Impression

This is a well-made room, mostly. The arena is the strongest screen: it commits to the "dim the lights for the real work" idea and the wrong-answer reveal (correct answer plainly in the equation, `INCORRECTO` in red, the guess de-emphasized) is genuinely well-judged and respectful of the kid. The biggest opportunity is not aesthetic, it's two craft failures that the design system *documents as solved but ships broken*: the strategy selector overflows the viewport, and a whole tier of secondary text fails the AA contrast the system claims to target.

## What's Working

1. **The wrong-answer moment.** Correct answer revealed in neutral ink inside the equation, `INCORRECTO` in red, the kid's guess dropped to muted gray, `Enter para continuar`, plus an `aria-live` spoken result. It's honest, fast, and doesn't punish. This is the emotional core and it's right.
2. **One coherent material system.** Paper hub ↔ emerald arena as the same hue inverted in lightness, one amber accent carrying every CTA and reward beat, mono digits everywhere data appears. The discipline holds across every screen.
3. **Keyboard-first core loop.** Auto-focus, Enter-to-submit, any-digit-during-wrong auto-advances. The drill genuinely flows without touching the mouse.

## Priority Issues

- **[P1] Strategy selector overflows the screen.** At 1280×832 the page scrolls 149px and the last technique ("Casi base") sits below the fold; on a laptop or tablet height more is buried. `main` uses `justify-center` on content taller than the viewport, so it overflows both ends. This breaks the project's own DESIGN.md rule ("the full set of techniques fits without scrolling... or rarely-used ones collapse behind a disclosure") and Principle 4 (one screen, one job).
  - **Why it matters**: A kid choosing "Por 11" never sees that "Casi base" exists. Techniques below the fold are effectively invisible; the screen silently hides product.
  - **Fix**: Cut tile vertical padding (`p-5` → `p-3.5`) and gap, top-align `main` (drop `justify-center`, add `pt` + scroll-safe `pb`), or move to a 2-up grid / collapse advanced techniques behind a disclosure. Target: 7 tiles fit at ≥768px height.
  - **Suggested command**: `$impeccable layout`

- **[P1] Secondary text fails the AA contrast the system promises.** Measured (canvas sRGB) against the actual backgrounds: `graphite-light` on paper = **3.3:1** (eyebrows "PASO 1 DE 2"/"MODO DE PRÁCTICA", "Sin jugar aún", every "← back" link); `ink-subtle` hint "Enter para continuar" on arena = **3.69:1**; `INCORRECTO` red on arena = **4.33:1**. All are <18px non-bold, so AA requires 4.5:1. All fail. This is the textbook "muted gray on tinted near-white" trap, and DESIGN.md explicitly claims AA + assigns these very roles to `graphite-light`/`ink-subtle`.
  - **Why it matters**: Low-vision kids and ordinary kids on a glare-y classroom tablet lose the labels that explain where they are in the flow. PRODUCT.md sets WCAG AA as the target; this misses it on real surfaces.
  - **Fix**: Darken `--color-graphite-light` ~`oklch(0.52 0.04 158)`, `--color-ink-subtle` toward `oklch(0.50 0.035 158)`, nudge `--color-wrong` to clear 4.5:1 for the small `INCORRECTO` label (or render it larger/bolder to qualify as large text). Re-measure after.
  - **Suggested command**: `$impeccable colorize` (then `$impeccable audit`)

- **[P2] The step counter lies.** "Paso 1 de 2" (operation) and "Paso 2 de 2" (difficulty) bracket a flow that is actually three steps: every operation routes through the strategy screen, which itself shows an unnumbered "MODO DE PRÁCTICA" eyebrow. So the kid sees 1-of-2 → (mystery screen) → 2-of-2.
  - **Why it matters**: A progress promise the UI then breaks erodes the "visibility of status" the rest of the app earns. Small, but it's a literal falsehood on screen.
  - **Fix**: Make it dynamic (1/2/3 when a strategy step exists, 1/2 when it doesn't), or drop the counter and let the back-link + heading carry orientation.
  - **Suggested command**: `$impeccable clarify`

- **[P2] Arena reward signals live in the basement.** PTS, the streak flame, and the score-bump/streak-flare animations are pinned to the bottom edge, separated from the centered problem by a large empty band (visible on both desktop and mobile). The kid stares at the center; the reward fires in peripheral vision.
  - **Why it matters**: PRODUCT.md's headline is "fast, satisfying feedback with weight." A score bump the player doesn't see isn't satisfying. The composition spends its best motion where no one is looking.
  - **Fix**: Tighten the arena's vertical rhythm so the stat row sits closer to the action, or echo the score/streak beat near the equation on change. Reduce the dead gap between input and footer.
  - **Suggested command**: `$impeccable layout`

- **[P3] First run has no cue.** A first-time kid lands in the arena facing `4 × 62 = ?` and a faint amber underline floating in space. It auto-focuses, so typing works, but nothing *says* "type here." No placeholder, no one-time hint.
  - **Why it matters**: The confident-first-timer ("Jordan") may stall for a beat wondering whether to click something. Cheap to fix, removes the only hesitation point in an otherwise instant loop.
  - **Fix**: A muted caret-blink is present; add a subtle first-question-only hint ("Escribe y pulsa Enter") that disappears after the first answer, or a placeholder ghost digit.
  - **Suggested command**: `$impeccable onboard`

## Persona Red Flags

**Jordan (Confused First-Timer / the 5th-grader's first session)**: Lands in the arena with no instruction; the input is an empty amber line with no label or placeholder — has to infer "just type." On the strategy screen, picks from the first few visible tiles and never scrolls, so "Casi base" doesn't exist to them. The "Paso 1 de 2" promise then gets contradicted by a third screen.

**Sam (Accessibility-Dependent)**: Gets the good stuff — `aria-live="assertive"` result announcements, the progress count in an `sr-only` live region, dots that differ in shape not just color (amber fill vs hollow red ring), visible focus rings everywhere, full keyboard play. But then trips on contrast: every eyebrow, back-link, and "Sin jugar aún" sits at 3.3:1, the "Enter para continuar" hint at 3.69:1, and "INCORRECTO" at 4.33:1 — all under AA.

**Casey (Distracted Tablet/Mobile User)**: 2-up operation grid and numeric `inputMode` are right for thumbs. But the strategy list overflows worse at shorter heights, the arena's reward stats sit at the very bottom edge where a thumb or the browser chrome can crowd them, and there's no round-resume if they get interrupted mid-round (state is in-memory only).

## Minor Observations

- The subtraction "−" (mono minus, in clay-red `op-sub`) renders as a short thick bar that can read like a redaction block rather than a minus. Consider a larger glyph or restyling.
- "Por 11" — the `11` in the Space Grotesk title looks slightly tight against "Por"; the teaching example below already carries the mono digits, so the title digits are the only non-mono numerals in the system.
- Arena: the disabled input keeps showing the wrong guess (e.g. "999") at near-equation size in muted ink. It's correctly de-emphasized, but at `text-6xl/7xl` it still competes with the revealed answer for a beat.

## Questions to Consider

- What would the strategy screen look like if it had to fit in 600px of height — would that force a better information density than the current tall stack?
- The arena has a huge quiet center. Is that stillness intentional restraint, or is the reward beat just stranded at the bottom because the layout defaulted there?
- If a kid only ever sees the first 4 strategy tiles, do the hidden ones earn their place in the codebase at all, or should the best 3-4 per operation be the whole set?
