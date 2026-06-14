---
name: Mental Math Practice
description: A focused arithmetic drill for 5th graders, designed as a small lit stage for honest reps.
colors:
  arena-bg: "oklch(0.22 0.07 158)"
  arena-bg-soft: "oklch(0.28 0.065 158)"
  arena-bg-elev: "oklch(0.34 0.06 158)"
  ink: "oklch(0.97 0.015 158)"
  ink-muted: "oklch(0.78 0.025 158)"
  ink-subtle: "oklch(0.63 0.035 158)"
  paper: "oklch(0.97 0.012 158)"
  paper-elev: "oklch(0.99 0.008 158)"
  paper-border: "oklch(0.88 0.022 158)"
  graphite: "oklch(0.24 0.045 158)"
  graphite-mid: "oklch(0.46 0.04 158)"
  graphite-light: "oklch(0.52 0.035 158)"
  accent: "oklch(0.83 0.15 78)"
  accent-hover: "oklch(0.77 0.16 78)"
  accent-soft: "oklch(0.83 0.15 78 / 0.4)"
  accent-dim: "oklch(0.58 0.12 78)"
  wrong: "oklch(0.66 0.14 28)"
  wrong-dim: "oklch(0.42 0.11 28)"
  op-add: "oklch(0.55 0.14 158)"
  op-sub: "oklch(0.55 0.15 25)"
  op-mul: "oklch(0.5 0.17 305)"
  op-div: "oklch(0.55 0.11 215)"
  diff-easy: "oklch(0.83 0.09 158)"
  diff-medium: "oklch(0.82 0.12 75)"
  diff-hard: "oklch(0.76 0.13 22)"
typography:
  display:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "clamp(3.75rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "normal"
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.22em"
    textTransform: "uppercase"
  numeral:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "normal"
    fontFeature: "tnum"
rounded:
  sm: "0.125rem"
  md: "0.375rem"
  lg: "0.5rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  hero: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.md}"
    padding: "1rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.md}"
    padding: "1rem 2rem"
  text-link:
    backgroundColor: "transparent"
    textColor: "{colors.graphite-mid}"
    padding: "0"
  exit-button:
    backgroundColor: "{colors.arena-bg-soft}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
---

# Design System: Mental Math Practice

## 1. Overview

**Creative North Star: "The Practice Room."**

A practice room is small, well-lit, and uncluttered. There is one thing to do here and the room makes that obvious. Equipment is where you need it; nothing is on display for its own sake. The light is warm. You can come in for two minutes or twenty, and the room treats both the same. That is the design system: a focused space where a 5th grader can do reps on arithmetic facts, see whether they got faster or more accurate, and leave.

The system is organized around a deliberate spatial story: the **selectors and stats are the hub** (warm paper, dark ink, calm), and the **game arena is the stage** (deep saturated emerald, light ink, one amber accent that does the work of every reward signal). Moving from the hub into the arena is meant to feel like dimming the room lights for the real work. Returning is meant to feel like the lights coming back up.

This system explicitly rejects the four anti-references in PRODUCT.md: the generic SaaS dashboard (no navy gradient, no hero-metric template), the cliché kids app (no Comic Sans, no primary rainbow, no clip-art mascots), gamified-to-death patterns (no XP bars, no slot-machine reward FX, no manipulative streak guilt), and sterile ed-tech (no institutional beige, no school-portal navigation).

**Key Characteristics:**
- A single shared accent (amber) carries every primary action and every reward beat
- Two surfaces, two postures: warm paper for the hub, deep emerald for the arena
- Math glyphs and digits live in a monospaced display font; everything else is in a geometric grotesk
- One CTA per screen. Secondary actions are text links, not second buttons
- Motion is short, exponential, and respects `prefers-reduced-motion`

## 2. Colors

The palette commits to one warm hue family (emerald) and one warm accent (amber). Operation identity colors and difficulty intensity colors are deliberately picked to **not** reuse the accent or the destructive red, so meanings never collide.

### Primary

- **Burnished Amber** (`oklch(0.83 0.15 78)`): The single primary-action color. Lives on the "Comenzar" button on landing, "Otra ronda" on round-results, and every reward beat in the arena (score bump, correct-answer dot pulse, streak-tier flare). Its hover form is **Burnished Amber Deep** (`oklch(0.77 0.16 78)`), a small darkening that keeps text color stable.

### Secondary (operation identity, only on selectors)

- **Reps Emerald** (`oklch(0.55 0.14 158)`): Addition.
- **Workshop Clay** (`oklch(0.55 0.15 25)`): Subtraction.
- **Inked Plum** (`oklch(0.5 0.17 305)`): Multiplication.
- **Slate Cyan** (`oklch(0.55 0.11 215)`): Division.

Each is paired with an 8-to-14%-alpha tint of itself for hover backgrounds on operation tiles. Identity colors are spread across the hue wheel for color-blind separability.

### Tertiary (difficulty heat ramp, only on the difficulty selector)

- **Soft Sage** (`oklch(0.83 0.09 158)`): Fácil.
- **Soft Ochre** (`oklch(0.82 0.12 75)`): Medio.
- **Soft Terra** (`oklch(0.76 0.13 22)`): Difícil.
- **Forge Red** (`oklch(0.66 0.18 18)`): Experto.

A continuous warm-temperature heat ramp: cool and calm at Fácil, hottest and most intense at Experto. Hue travels green → ochre → terra → deep red; chroma rises and lightness falls as difficulty climbs, so "hotter = harder" reads as one learnable gradient across all four tiers. Experto is the hottest end of that ramp, **not** a hue jump. It is deliberately *not* plum: an earlier Experto reused the multiplication identity color (Inked Plum, hue 305), which collided with operation meaning. Difficulty never reuses the amber CTA hue; the destructive red lives only in the arena, so the difficulty selector's Forge Red (a fill on the hub) does not read as "danger."

### Neutral (hub surface)

- **Practice Paper** (`oklch(0.97 0.012 158)`): The hub background (landing, selectors, stats). Warm off-white tinted toward the brand emerald, never `#fff`.
- **Paper Elev** (`oklch(0.99 0.008 158)`): A slightly brighter surface for elevated states (rare).
- **Paper Border** (`oklch(0.88 0.022 158)`): Hairlines on tiles and dividers.
- **Practice Graphite** (`oklch(0.24 0.045 158)`): Dark ink, used for headings, body, and primary content. Never `#000`.
- **Graphite Mid** (`oklch(0.46 0.04 158)`): Secondary text, body prose.
- **Graphite Light** (`oklch(0.52 0.035 158)`): Eyebrow labels, subtle metadata, back-link affordances. Darkened so small eyebrow text clears WCAG AA 4.5:1 on paper.

### Neutral (arena surface)

- **Deep Practice Green** (`oklch(0.22 0.07 158)`): The arena background. Saturated emerald-warm, never near-black. Inverts the hub's lightness without changing the hue family.
- **Arena Soft** (`oklch(0.28 0.065 158)`): Slightly lifted surfaces (exit button background).
- **Arena Elev** (`oklch(0.34 0.06 158)`): Subtle elevation; dot row pending state.
- **Arena Ink** (`oklch(0.97 0.015 158)`): Light text on the arena.
- **Arena Ink Muted** (`oklch(0.78 0.025 158)`): Secondary text on the arena.
- **Arena Ink Subtle** (`oklch(0.63 0.035 158)`): Subdued text on the arena (the `?` in the problem, "Enter para continuar" hint). Raised so small non-bold text clears WCAG AA 4.5:1 on the arena.

### Destructive

- **Correction Red** (`oklch(0.66 0.14 28)`): The wrong-answer signal in the arena (the `Incorrecto` marker, wrong dot). Tuned to clear AA 4.5:1 for the 14px-bold marker on the arena. Its darker sibling **Correction Red Dim** (`oklch(0.42 0.11 28)`) carries destructive *text* on the light paper hub (the reset-armed link), where the lighter arena red would fail contrast. Reserved exclusively for "this destroys data" or "this answer is wrong" semantics.

### Named Rules

**The One Accent Rule.** Burnished Amber is the only primary-action color in the system. If you find yourself reaching for a second accent, you are designing a different system. The single accent is what makes "Comenzar" and "correct answer" feel like the same kind of moment.

**The Color-Means-One-Thing Rule.** Operation identity colors appear *only* on operation selectors. Difficulty colors appear *only* on the difficulty selector. The destructive red appears *only* on wrong answers and destructive confirms. Amber appears *only* on primary CTAs and reward beats. Reusing a hue across roles is the fastest way to make the system feel cheap.

**The Surface Mirror Rule.** Hub and arena are not different palettes; they are the same emerald hue inverted in lightness. Paper at L=0.97 mirrors Arena at L=0.22. Graphite at L=0.24 mirrors Arena Ink at L=0.97. Moving between surfaces should feel like the room dimming, not like a different app.

## 3. Typography

**Display Font:** JetBrains Mono (variable 400–700), with `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` fallback.
**Body Font:** Space Grotesk (variable 400–700), with `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` fallback.

**Character:** Space Grotesk's geometric sturdiness gives the UI a confident voice without falling into Inter/Roboto defaults. JetBrains Mono is reserved for everything that is "data the kid will read or type": the math problem, the input, the score, the timer, the streak count, percentages, and the operation tile symbols. The pairing reads as "labeled human text vs. machine-precise data," which is the right separation for a math drill.

### Hierarchy

- **Display** (JetBrains Mono, 700, `clamp(3.75rem, 8vw, 6rem)`, line-height 1): The arena math problem and the giant operation tile symbols (`+ − × ÷`). Tabular figures.
- **Headline** (Space Grotesk, 700, `clamp(2.25rem, 5vw, 3rem)`, line-height 1.05): Page titles ("Tu progreso", "¿Qué quieres practicar?", "Matemáticas mentales").
- **Title** (Space Grotesk, 600, 1.5rem, line-height 1.2): Operation tile labels, section headings within stats.
- **Body** (Space Grotesk, 400, 1.125rem, line-height 1.5): Prose, descriptions, the round-results lines. Cap at 65ch.
- **Label** (Space Grotesk, 500, 0.875rem, line-height 1, letter-spacing 0.22em, uppercase): Eyebrows ("Paso 1 de 2", "En total", "Pts"), back-link affordances ("← Inicio"). Always in `graphite-light` or `ink-subtle`.
- **Numeral** (JetBrains Mono, 600, 1.5rem, tabular figures): Inline data in stats and the arena footer. The score, the timer, percentages, attempt counts.

### Named Rules

**The Mono-for-Data Rule.** Every digit the kid types, reads as a result, or sees as a count uses JetBrains Mono. Every word, label, and prose sentence uses Space Grotesk. There is no mixed case: a paragraph that contains both digits and words wraps the digits in mono.

**The Tabular-Figures Rule.** All digits use `tabular-nums`. The score, the timer, and the streak count must never jump width as values change. This is the difference between "data" and "decoration."

**The Weight-Polarization Rule.** Use 400, 500, or 700. Skip 600 except for Title (semibold has a single defined role). Adjacent weights (500 vs 600) are too close to read as hierarchy.

## 4. Elevation

The system is flat by default. There are no `box-shadow` declarations in active code. Depth is conveyed through three lightness-stepped surfaces per theme (paper / paper-elev / paper-border on the hub; arena-bg / arena-bg-soft / arena-bg-elev on the arena), through hairline borders (`paper-border` at 1px), and through color saturation rather than blur.

The system also explicitly avoids glassmorphism. There are no `backdrop-filter: blur()` declarations anywhere.

### Named Rules

**The Flat-By-Default Rule.** Cards do not float. Surfaces sit directly on the page. If you reach for `box-shadow` to give something presence, you are solving the wrong problem; reach for color saturation, border, or larger type instead.

**The No-Glass Rule.** No glassmorphism. Ever. The arena background is opaque emerald; the paper hub is opaque tinted white. Blurs and translucent overlays do not appear in this system.

## 5. Components

For each component, the character line states the intent; the technical specs state the implementation.

### Buttons

The system has one primary button shape and one tonal button (for the arena exit). Secondary actions are always text links, never second buttons.

- **Primary** (the only kind of filled button): Amber fill (`accent`), graphite text, `rounded-md` (0.375rem), padding `1rem 2rem`, font-weight 700, tracking `0.025em`. On hover, the background darkens to `accent-hover`; text color does not change. Focus-visible: 2px amber ring with a 2px offset matching the parent surface.
- **Exit (arena-only tonal)**: Sits on the arena. Background `arena-bg-soft`, text `ink-muted`, `rounded-md`, padding `0.625rem 1.25rem`, font-weight 500, uppercase, letter-spacing `0.025em`. Hover: background lifts to `arena-bg-elev`, text to `ink`. One click exits; no two-tap confirmation (the cost of accidental exit is too low to justify friction).
- **No second filled button per screen.** Secondary action is always a text link with a hairline underline.

### Text Links

The default secondary affordance. `graphite-mid` text with `paper-border` underline (offset 4px). On hover, both text and underline darken to `graphite` and `graphite-mid` respectively. Used for "Ver progreso," "Cambiar nivel," "Reiniciar," back-links.

### Operation Tiles (operation selector)

- **Shape:** `rounded-lg` (0.5rem), 1px hairline border in `paper-border`, background `paper`.
- **Internal layout:** large math symbol in the operation's identity color at the top-left in JetBrains Mono 700 (`text-7xl md:text-8xl`); operation label in graphite Title weight below; per-operation stats (`X% precisión, Y intentos` or `Sin jugar aún`) in `graphite-light` small text under the label.
- **Hover:** the tile's background fills with an 14%-alpha tint of the operation's identity color; the border transitions to the identity color at full saturation.
- **Focus-visible:** 2px amber ring with 2px offset on paper.

### Difficulty Buttons

- **Shape:** `rounded-lg` (0.5rem). Full color fill in the difficulty's heat-ramp color (sage / ochre / terra / forge-red).
- **Layout:** inline horizontal, the difficulty label (Title weight) on the left, the numerical range (JetBrains Mono, smaller) on the right.
- **Range-label contrast:** the range label must clear 4.5:1 against its tile fill. On the lighter tiles full `graphite` at 75% opacity passes; on the darker Experto fill the label uses full-strength `graphite` (no opacity reduction) so small text stays AA-legible.
- **Hover:** `filter: brightness(0.95)`.
- **Focus-visible:** 2px graphite ring with 2px offset on paper.

### Strategy Tiles (strategy selector)

The screen between operation and difficulty for operations that have mental techniques. It must obey "one screen, one job": the full set of techniques fits without scrolling at common viewport heights, or rarely-used ones collapse behind a disclosure.

- **Shape & surface:** the neutral selectable-tile vocabulary — `paper`, 1px `paper-border`, `rounded-lg`. Strategy tiles do **not** carry an operation or difficulty color; the earlier flat plum tint (`op-mul-tint` on every tile regardless of operation) is removed because it reused a meaning-bearing hue arbitrarily. Differentiation comes from content, not color.
- **Estándar tile:** the first option, same neutral tile; its supporting line reads "Práctica general."
- **Technique tiles:** label (bold, Title-ish) stacked **above** a **concrete one-line teaching example** (e.g. `37 × 11 = 407`) rendered in JetBrains Mono `graphite-mid`, so the choice itself teaches the technique. The example sits on its own line (not inline-right) so longer worked examples and longer technique names never collide or overflow the tile at any width. The generic repeated "Técnica mental" label is removed — every tile's secondary line must carry information unique to that technique.
- **Hover:** border transitions to `graphite-light` (matching the Estándar tile), `filter: brightness(0.98)` optional.
- **Focus-visible:** 2px graphite ring with 2px offset on paper.

### Arena Question Display

Not a component the kid interacts with; the most important visible element in the system. The math problem renders in JetBrains Mono 700, baseline-aligned with a gap of `1.25rem md:1.75rem`, all-tabular-figures, leading `1`.

On a **wrong** answer the `?` swaps to the `correctAnswer` numeral rendered in neutral **`ink`** (factual, "here is the answer, plainly"), with the 260ms reveal animation (translateY 6px → 0, opacity 0 → 1), and an **`Incorrecto` marker in `wrong` red** appears at the equation. The revealed answer is **never** shown in amber: amber is the reward color (correct dot, score bump, streak, CTA), and tinting the missed answer gold made an error read as a celebration. Amber and the wrong-answer reveal are now strictly separated — this upholds the Color-Means-One-Thing Rule at the most emotionally charged moment.

### Arena Input

A single-line numeric input with no fill and no rounded shape: only a bottom hairline border in `accent-soft` that brightens to `accent` on focus. Disabled state desaturates the rule to `ink-subtle/40` and the text to `ink-subtle`. JetBrains Mono 700, tabular figures, width `w-64 md:w-72`. Caret is amber.

### Progress Dots (arena header)

Ten markers in a row, gap 8px. Correct and wrong are **not** distinguished by color alone (a hard PRODUCT.md rule): they differ in shape/treatment as well as hue.
- **Pending** (positions ahead of the cursor): filled `arena-bg-elev` circle.
- **Current** (the position about to be answered): `arena-bg-soft` circle with 1px amber ring (inset).
- **Just-answered correct**: solid amber **filled** circle, played through a 220ms `scale(1) → scale(1.55) → scale(1)` pulse on the `ease-out-quart` curve. The pulse fires on correct answers **only**.
- **Wrong**: `wrong`-red marker with a distinct shape treatment (hollow/ringed rather than solid-fill, or an inset cross) so it is separable from a correct dot without relying on the amber-vs-red hue difference. No correct-pulse.

### Result Announcement (arena, screen-reader)

Correctness is conveyed visually (dot shape + color, the question reveal, the `Incorrecto` marker) and must also be announced. An `aria-live="assertive"` (or polite) region announces each outcome in plain Spanish, including the answer on a miss: "Correcto." / "Incorrecto. 9 × 22 = 198." This is separate from the existing progress count announcement.

### Round Results

A four-line column on the arena surface:
1. The big score `correct / total` in JetBrains Mono 700 display size, with the `/` in `ink-subtle` Medium weight.
2. `{correct} correctas, {accuracy}%` with the digits in JetBrains Mono and `correct` in amber.
3. Best streak of the round with the digit in JetBrains Mono.
4. Total time in JetBrains Mono.

Two actions follow: amber primary "Otra ronda" (auto-focused) and a text link "Cambiar nivel."

### Stats Page Layout

A typographic sentence at the top instead of a hero-metric grid. Per-operation rows are dividers, not cards: the operation label in Title weight on the left, the stats inline with mono digits on the right. Untouched operations show `Sin jugar aún` in italic `graphite-light`.

### Named Rules

**The One-CTA Rule.** Every screen has exactly one filled primary button. The second action, if any, is a text link. There are no equally-weighted button pairs anywhere in the system.

**The No-Cards Rule.** Lists are dividers (`divide-y divide-paper-border`), not cards. Cards appear only when the content is genuinely a discrete object that must be selected or acted on (the operation tiles). Lists of statistics are not cards.

## 6. Do's and Don'ts

### Do:

- **Do** use Burnished Amber (`oklch(0.83 0.15 78)`) as the single primary-action color across every surface.
- **Do** invert the same emerald hue family between surfaces: Practice Paper for the hub (L=0.97), Deep Practice Green for the arena (L=0.22). Both are the same hue (158°), only the lightness flips.
- **Do** wrap every digit in JetBrains Mono with `tabular-nums`. Score, timer, streak, percentages, attempt counts, the math problem itself.
- **Do** keep operation identity colors scoped to the operation selector. The arena uses no operation color.
- **Do** use `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quart) or `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for every transition. 220–320ms is the working range.
- **Do** respect `prefers-reduced-motion`. All four named animations (`anim-correct-pulse`, `anim-streak-flare`, `anim-score-bump`, `anim-reveal`) degrade to instant state changes.
- **Do** put a back link (`← Inicio` or `← {operation}`) at the top-left of every non-root hub surface in Label type, `graphite-light`.

### Don't:

- **Don't** use navy or blue gradient backgrounds. This system is emerald, never blue.
- **Don't** use the hero-metric template (big number, small label, supporting stats, gradient accent). Stats are written as sentences, not as a SaaS dashboard.
- **Don't** use identical card grids of icon-plus-heading-plus-text. Per-operation stats are list rows, not cards.
- **Don't** use Comic Sans, primary-rainbow palettes, balloon-pop celebrations, clip-art mascots, or any other cliché-kids-app pattern. This product respects the user.
- **Don't** introduce XP bars, coin/gem currencies, slot-machine reward FX, daily-streak guilt, or loot-box framing. Reward is the score number going up, honestly.
- **Don't** use Google-Classroom beige, muted institutional grays-and-blues, or stock illustrations of smiling children at laptops. This is not ed-tech.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored side-stripe. Use a full hairline border, a background tint, or nothing.
- **Don't** use `background-clip: text` with a gradient for headline emphasis. Use weight and color, not gradient.
- **Don't** use glassmorphism, `backdrop-filter: blur()`, or translucent layered cards.
- **Don't** use bounce or elastic easing. Exponential ease-out only.
- **Don't** use pure `#000` or `#fff` anywhere. Every neutral is tinted toward the brand emerald hue.
- **Don't** use `box-shadow` for ambient elevation. Depth comes from color steps and hairlines.
- **Don't** ship more than one filled button per screen. If you find yourself adding a second filled CTA, demote one to a text link.
- **Don't** use em dashes (`—`) in copy. Use commas, colons, semicolons, periods, or parentheses.
- **Don't** restate headings in body copy. Every word earns its place.
