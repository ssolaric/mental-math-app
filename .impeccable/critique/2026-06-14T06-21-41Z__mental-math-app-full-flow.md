---
target: mental-math-app (full flow)
total_score: 28
p0_count: 0
p1_count: 3
timestamp: 2026-06-14T06-21-41Z
slug: mental-math-app-full-flow
---
# Critique: Mental Math App (full flow)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Rich visual feedback (dots, score, streak, timer); no screen-reader announcement of correct/wrong or the revealed answer |
| 2 | Match System / Real World | 3 | Natural `a × b = ?` layout, plain Spanish; strategy names ("Por 25") are opaque |
| 3 | User Control and Freedom | 3 | One-tap exit, back links, change-level everywhere; no pause / previous-question |
| 4 | Consistency and Standards | 2 | Expert plum collides with multiplication's identity color; difficulty intensity scale breaks at the top tier; strategy screen sits outside the documented system |
| 5 | Error Prevention | 3 | Numeric-only input, armed two-tap reset; exit is one-tap without confirm (low cost) |
| 6 | Recognition Rather Than Recall | 3 | Options visible, step indicator present; strategy techniques require prior knowledge |
| 7 | Flexibility and Efficiency | 3 | Enter-to-submit, autofocus, any-digit-advances on wrong; fully keyboard-driven |
| 8 | Aesthetic and Minimalist Design | 3 | Landing/arena/stats are exemplary; strategy screen repeats "Técnica mental" on every row and overflows the viewport |
| 9 | Error Recovery | 3 | Wrong answer shows the correct one and moves on; recovery uses the reward color; no SR path |
| 10 | Help and Documentation | 2 | No explanation of scoring, streaks, or what each strategy teaches |
| **Total** | | **28/40** | **Good — strong core, recent additions dragged consistency and help down** |

## Anti-Patterns Verdict

**Does this look AI-generated? No.** This passes the product slop test convincingly. It has a committed point of view (warm paper hub that dims into a saturated emerald arena), a single disciplined accent, real exponential-eased motion, tabular numerals, no card-grid sprawl, no hero-metric template, no glassmorphism. A user fluent in well-made tools would trust it.

**Deterministic scan:** `detect.mjs --json src` returned `[]` (exit 0) — clean. No banned patterns (side-stripes, gradient text, ghost-card shadow+border, over-rounding, stripe backgrounds) detected.

**The one tell:** the tiny uppercase letter-spaced eyebrow appears above nearly every screen ("PRÁCTICA DIARIA", "PASO 1 DE 2", "MODO DE PRÁCTICA", "EN TOTAL", "POR OPERACIÓN"). The step indicators ("Paso 1/2 de 2") are legitimate wayfinding; the purely decorative ones ("Práctica diaria", "Modo de práctica") are the AI-scaffold cadence.

## Overall Impression

The core loop is genuinely excellent. The hub→arena lighting metaphor is a real idea executed with restraint, and the arena is the best surface in the app: one giant problem, one amber rule to type on, honest stats at the foot. The cracks are all in the surfaces added *after* the design system was written — the strategy selector and the expert difficulty tier. They reuse colors against the system's own rules and skip the polish the rest of the app earned. The single biggest opportunity: bring the strategy/expert additions up to the standard of the arena, and resolve the amber overload at the moment of error.

## What's Working

- **The arena is a committed stage.** Dimming from paper to deep emerald, the 7xl/8xl mono problem, the bare amber underline as the only input affordance — it delivers "one screen, one job" and "latency is the headline feature." Nothing competes with the problem.
- **Disciplined color and type system.** One accent, emerald-tinted neutrals (no pure #000/#fff), mono-for-data / grotesk-for-words split, tabular figures everywhere. This is why it doesn't read as AI slop.
- **Honest, non-manipulative reward.** Score/streak/timer describe performance without XP bars, coins, or guilt. The any-digit-advances-on-wrong interaction is a thoughtful power move that keeps the kid in flow.

## Priority Issues

### [P1] Amber means "correct/reward" everywhere — except it also reveals the answer you got *wrong*
**Why it matters:** Amber is the system's single reward color: the CTA, the correct-dot, the score bump, the streak flare. On a wrong answer the correct value (e.g. `198`) renders as a large gold numeral that visually reads as celebration, while the only "you were wrong" signal is a 10px red dot in the far top-left corner. At the moment of error the dominant color cue says *success*. It also violates the system's own "Color-Means-One-Thing Rule."
**Fix:** Decouple the missed-answer reveal from the reward hue. Reveal the correct answer in `ink` (neutral, factual) or in the `wrong` red, and reserve amber strictly for correct/reward. Pair it with a word or icon at the equation, not only a distant dot.
**Suggested command:** `$impeccable colorize`

### [P1] The difficulty intensity scale breaks at "Experto" and collides with the multiplication color
**Why it matters:** Fácil→Medio→Difícil is a learnable warm-temperature ramp (sage → ochre → terra = hotter = harder). "Experto" jumps off that axis to plum/purple, which isn't "hotter" than red, so the heat-equals-difficulty metaphor collapses at the exact tier where it matters most. Worse, that plum (hue 305) is the *multiplication* identity color, so the same hue now means both "multiplication" and "expert" — the very cross-role collision the design system forbids.
**Fix:** Extend the temperature ramp instead of leaving it: make Experto the deepest/most-saturated red-orange (a step beyond terra), or darken terra and push Difícil down a notch. Keep plum exclusive to the multiplication operation.
**Suggested command:** `$impeccable colorize`

### [P1] The strategy selector is a wall of options that overflows the screen and teaches nothing
**Why it matters:** Multiplication shows Estándar plus 6+ techniques (Por 11, Por 25, Por 5, Por 9, Cuadrados, …) in a list that scrolls past the viewport — 7+ choices at one decision point, well over the ≤4 working-memory guideline and against "one screen, one job." Every tile repeats the identical right-hand label "Técnica mental," which is pure noise, and no tile explains what the technique *is*, so a first-timer can't choose meaningfully. This screen was added after the design system and doesn't follow it.
**Fix:** Replace "Técnica mental" with a one-line concrete example that teaches and differentiates (e.g. "37 × 11 = 407" under "Por 11"). Group or paginate so the set fits without scrolling, or collapse rarely-used techniques behind a "Más técnicas" disclosure. Give the tiles a real, documented color role instead of the near-invisible 14%-plum tint.
**Suggested command:** `$impeccable layout`

### [P2] Correct vs. wrong is carried by color (and lightness) alone — no shape, icon, or copy
**Why it matters:** PRODUCT.md explicitly requires not relying on color alone for correct/incorrect. Correct and wrong dots are the same circle, same size, same pulse animation (the "correct-pulse" even plays on wrong answers); only the fill hue differs (amber vs red). There is no "Correcto/Incorrecto" word or icon anywhere, and the progress region's `aria-live` announces only the count ("Progreso: 1 de 10"), never correctness or the revealed answer. A color-blind or screen-reader user can't tell how they did.
**Fix:** Differentiate correct/wrong dots by shape or mark (check vs. cross), not just color, and announce the result + revealed answer via an `aria-live` region ("Incorrecto. 9 × 22 = 198").
**Suggested command:** `$impeccable harden`

### [P3] The subtraction "−" glyph looks weak and lonely at display size
**Why it matters:** On the operation selector, +, ×, ÷ read as substantial display symbols, but the bare minus renders as a small floating dash that looks like a divider or a disabled state rather than a peer operation.
**Fix:** Use a heavier/longer minus (e.g. a sized "−" with adjusted weight, or `–`/custom glyph), or vertically center it so it reads as deliberate.
**Suggested command:** `$impeccable typeset`

## Persona Red Flags

**Mateo (competitive 5th grader, project-specific):** Loves the arena — fast, no fluff, score moves. But hits the strategy screen and stalls: "Por 25? Cuadrados?" with no examples, and has to scroll a long list before even reaching difficulty. The post-round path is good (Otra ronda is auto-focused), but he can't tell at a glance on a wrong answer whether the big gold number means he won or lost.

**Jordan (first-timer):** The arena input is a single faint amber line ~64px below the equation with no label or placeholder — on first load it's not obvious that's where you type (it works because it's autofocused, but the affordance is invisible). Strategy names assume prior knowledge with zero help text. No documentation of how scoring or streaks work.

**Sam (accessibility / screen reader + color):** Correctness is announced only as a count, never as correct/wrong or the right answer. Dots distinguish states by color alone. Small range labels in graphite/75 on the plum "Experto" tile risk failing 4.5:1. Focus states and keyboard play, however, are well handled throughout.

## Minor Observations

- Strategy tiles use the multiplication tint (`op-mul-tint`) regardless of the chosen operation — an addition strategy still shows in plum-gray. Arbitrary.
- Large vertical gap between the equation and the input rule in the arena; on mobile the underline floats far from the problem.
- Decorative eyebrows ("Práctica diaria", "Modo de práctica") could be dropped; the "Paso N de 2" step indicators should stay.
- Score renders in amber even at `0` before any points are earned — slightly overstates "reward" at rest.

## Questions to Consider

- At the moment a kid gets one wrong, what is the *first* thing their eye lands on — and does its color tell the truth?
- Does "Experto" need its own hue, or should it be the hottest end of the same ramp the kid already learned?
- Could each strategy tile teach its technique in one example line, so choosing one is itself a micro-lesson?
- The arena is the standard the rest of the app should meet. What would the strategy screen look like if it were as committed as the arena?
