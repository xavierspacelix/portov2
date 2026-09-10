# 0002. Warm editorial design system

**Date**: 2026-09-10
**Status**: Accepted

## Summary

This decision replaces the blue on zinc design system with a warm editorial one. Light becomes warm paper, dark becomes warm ink, terracotta replaces blue as the single accent, and Fraunces (an expressive display serif, self hosted) takes over the headings while Geist Sans stays for body text. The system also grows: tinted surface steps, a meaningful boundary token, a soft amber glow for depth, and four new primitives (Card, Eyebrow, Divider, Badge). It supersedes spec 0001.

## Requirements

**User stories**:

- As a visitor, I want the site to feel warm, calm, and premium, so that I remember the developer behind it.
- As a visitor who prefers dark mode, I want a rich warm dark palette (not flat black), so that reading is comfortable and the site feels crafted.
- As a keyboard user, I want a clear terracotta focus ring in both palettes, so that I can use the site without a mouse.
- As the engineer building later pages, I want a richer token set (surfaces, boundary, glow) and more primitives, so that editorial layouts build fast without inventing styles.

**Acceptance criteria** (the contract, each criterion is IDed and independently checkable):

- **AC-1**: Both palettes are warm: light is warm paper, dark is warm ink. All semantic tokens are defined in both palettes, with no token undefined in either theme.
- **AC-2**: The site follows the operating system preference on first load with no visible flash (verified in a production build), and without JavaScript the page still renders the correct warm palette from the `prefers-color-scheme` CSS fallback.
- **AC-3**: A `ThemeToggle` switches light and dark, and the choice persists across reloads (localStorage key `theme`), unchanged from the current behavior.
- **AC-4**: Fraunces is self hosted via `next/font` and drives every heading through a `--font-display` token, with optical sizing on; body and UI text stay Geist Sans; code stays Geist Mono.
- **AC-5**: `Container`, `Section`, `Stack`, `Heading`, and `Text` keep their current props and behavior, restyled from the new tokens.
- **AC-6**: `Button` (variants primary, secondary, ghost; sizes sm, md, lg; disabled and loading) and `Link` keep their current props, are keyboard reachable, and show a visible focus ring.
- **AC-7**: Every interactive element shows the terracotta focus ring in both palettes, at 3:1 or better against its adjacent surface.
- **AC-8**: Text and interface colors meet WCAG AA in both palettes: 4.5:1 for body text, 3:1 for large text and meaningful boundaries. Decorative separators and the glow are exempt. Every required pair is verified by computed contrast with the ratios recorded.
- **AC-9**: Transitions respect `prefers-reduced-motion` and collapse when it is set (the global rule from the current system carries over).
- **AC-10**: Tokens are defined once as CSS custom properties and consumed through `@theme inline`; no component hardcodes a color, font, or spacing value; `cn()` still resolves the custom font size tokens (the merge config must keep matching them).
- **AC-11**: New primitives `Card`, `Eyebrow`, `Divider`, and `Badge` exist, token driven, with documented APIs.
- **AC-12**: Depth is available and used: tinted surface steps (background, card, raised), hairline decorative borders, a meaningful boundary token at 3:1, and a soft radial amber glow. No box shadows for depth anywhere in the base system.
- **AC-13**: The old blue on zinc system is fully removed: no old primitive variable, semantic value, or hex literal survives in app code. Old and new must not coexist.
- **AC-14**: `design.md` is rewritten as the visual source of truth for the new system: character, tokens, both palettes, component APIs, and usage.

## Decision

**Chosen option**: Option 2: full warm editorial retheme plus expansion

One pass that retokens the whole system to the warm editorial palette, adds the Fraunces display font and the four new primitives, and rewrites `design.md`. Direct replacement, not a staged migration: only one consumer exists today (the placeholder preview page), so a revert is one commit and nothing real sits on the old look.

**Implementation skills**: `tailwind-4-docs` (`lombiq/tailwind-agent-skills`, `.agents/skills/tailwind-4-docs/`) · `tailwind-v4-shadcn` (`secondsky/claude-skills`, `.agents/skills/tailwind-v4-shadcn/`) · `next-themes` (`pharbuz/ai-agent-skills`, `.agents/skills/next-themes/`) · `vercel-composition-patterns` (`vercel-labs/agent-skills`, `.agents/skills/vercel-composition-patterns/`)

## Feature design

**Data model**: Not applicable. No persistence; the only stored value is the theme preference in `localStorage`.

### Token architecture

Two layers, as in the current system: a primitive scale of raw values (never used directly in components), and a semantic layer of named roles that components use. Every value is defined once in `app/globals.css`.

**Primitive layer**.

| Primitive        | Value     | Primitive      | Value     |
| ---------------- | --------- | -------------- | --------- |
| `paper-0`        | `#ffffff` | `ink-100`      | `#f3e9db` |
| `paper-50`       | `#fdfbf4` | `ink-300`      | `#a99a86` |
| `paper-100`      | `#f6efe4` | `ink-400`      | `#8a7a66` |
| `paper-200`      | `#f0e7d8` | `ink-500`      | `#6b5d4f` |
| `paper-300`      | `#e4d7c3` | `ink-600`      | `#7a6c5a` |
| `paper-400`      | `#ede3d2` | `ink-700`      | `#3a2f24` |
| `terracotta-300` | `#e08a5b` | `ink-800`      | `#2b2117` |
| `terracotta-600` | `#a8461a` | `ink-850`      | `#251e17` |
| `terracotta-700` | `#8f3b14` | `ink-875`      | `#211b15` |
| `amber-400`      | `#e0b341` | `ink-900`      | `#1c1712` |
| `amber-600`      | `#b8862b` | `ink-925`      | `#2c241c` |
|                  |           | `boundary-500` | `#9e7b52` |

**Semantic layer** (the roles components use; each theme remaps them). Ratios are computed against the exact pair a component uses.

| Token                   | Light            | Dark             | Pair and ratio                                             |
| ----------------------- | ---------------- | ---------------- | ---------------------------------------------------------- |
| `--background`          | `paper-100`      | `ink-900`        | page canvas                                                |
| `--foreground`          | `ink-800`        | `ink-100`        | on background, 13.8:1 light, 14.8:1 dark                   |
| `--card`                | `paper-50`       | `ink-850`        | card surface                                               |
| `--raised`              | `paper-0`        | `ink-925`        | raised surface                                             |
| `--muted`               | `paper-200`      | `ink-875`        | soft inset surface                                         |
| `--muted-foreground`    | `ink-500`        | `ink-300`        | on muted, 5.2:1 light, 6.2:1 dark                          |
| `--border`              | `paper-300`      | `ink-700`        | decorative hairline only                                   |
| `--boundary`            | `boundary-500`   | `boundary-500`   | meaningful boundary, 3.4:1 light, 4.6:1 dark on background |
| `--accent`              | `terracotta-600` | `terracotta-300` | solid action surface                                       |
| `--accent-foreground`   | `paper-50`       | `ink-800`        | on accent, 5.7:1 light, 6.0:1 dark                         |
| `--link`                | `terracotta-600` | `terracotta-300` | on background, 5.2:1 light, 6.7:1 dark                     |
| `--ring`                | `terracotta-600` | `terracotta-300` | focus ring, 5.2:1 light, 6.7:1 dark on background          |
| `--glow`                | `amber-600`      | `amber-400`      | decorative gradient only, exempt                           |
| `--disabled`            | `paper-400`      | `ink-850`        | disabled surface, exempt                                   |
| `--disabled-foreground` | `ink-400`        | `ink-600`        | disabled label, exempt                                     |

`@theme inline` maps each role to a utility as today (`--color-background` gives `bg-background`, `--color-raised` gives `bg-raised`, `--color-boundary` gives `border-boundary`, `--color-glow` gives `from-glow`), plus `--font-display: var(--font-fraunces)` for `font-display`. The `@custom-variant dark` line carries over unchanged. The `.dark` class on `html` swaps the values; the `prefers-color-scheme` fallback block (scoped to the unclassed root, as built) carries over with the warm values.

**Carried over unchanged** from the current system, names and values, so this spec stands alone (the type scale tokens are restated in the Typography section below):

| Token                                                           | Value                                       |
| --------------------------------------------------------------- | ------------------------------------------- |
| `--container-max` / `--container-narrow` / `--container-wide`   | `72rem` / `48rem` / `84rem`                 |
| `--container-gutter`                                            | `1.5rem`, `2rem` from the `md` breakpoint   |
| `--section-y`                                                   | `4rem`, `6rem` from the `md` breakpoint     |
| `--section-y-tight`                                             | `2.5rem`, `3.5rem` from the `md` breakpoint |
| `--section-y-loose`                                             | `6rem`, `8rem` from the `md` breakpoint     |
| `--radius-sm` / `--radius-md` / `--radius-lg` / `--radius-full` | `6px` / `8px` / `12px` / `9999px`           |
| `--motion-fast` / `--motion-base`                               | `150ms` / `200ms`                           |
| `--motion-ease`                                                 | `cubic-bezier(0.4, 0, 0.2, 1)`              |

### Typography

- Families: Geist Sans (`--font-geist-sans`) for body and UI, Geist Mono (`--font-geist-mono`) for code, both unchanged. New: Fraunces (`--font-fraunces`) as the display face for all headings, loaded in `app/layout.tsx` with `next/font/google`: `subsets: ["latin"]`, `variable: "--font-fraunces"`, `display: "swap"`, `axes: ["opsz"]`. The variable font covers weight 100 to 900; only the `opsz` axis needs explicit requesting. Fraunces runs at weight 600 for headings with `font-optical-sizing` left on auto. The built in fallback metric adjustment stays on (the `next/font` default), so the font swap causes no layout jump; and the font downloads at build time from Google, exactly as Geist already does today, so builds need network access to `fonts.gstatic.com`.
- Fluid heading scale (unchanged clamps): h1 `clamp(2.5rem, 5vw + 1rem, 4rem)`, h2 `clamp(2rem, 3vw + 1rem, 3rem)`, h3 `clamp(1.5rem, 2vw + 0.75rem, 2rem)`, h4 `clamp(1.25rem, 1vw + 0.75rem, 1.5rem)`. Heading line height 1.15.
- The old `--tracking-heading` token (`-0.02em`, tuned for sans) is removed: a serif wants its natural spacing, so headings use default letter spacing. New token `--tracking-eyebrow: 0.08em` for the Eyebrow label.
- Body sizes unchanged: lead `1.25rem`, body `1rem`, small `0.875rem`, line height 1.6, weight 400.

### Motion tokens

Unchanged from the current system: `--motion-fast` 150ms, `--motion-base` 200ms, `--motion-ease` the shared curve. Motion stays limited to color and opacity transitions on hover and focus. The glow is a static gradient, never animated, so reduced motion handling is unaffected. The global rule carries over exactly as built: under `prefers-reduced-motion: reduce`, every element and pseudo element (`*, *::before, *::after`) gets animation and transition durations of `0.01ms`, a single animation iteration, and `scroll-behavior: auto`.

### Theme switching

Unchanged configuration: `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `storageKey="theme"`, `disableTransitionOnChange`, provider in `app/providers.tsx`, `suppressHydrationWarning` on `html`. Three states (system, light, dark) behave as today. Without JavaScript, the fallback is the `@media (prefers-color-scheme: dark)` block scoped to `:root:not(.light):not(.dark)` (carried over from the current system), which renders the warm dark palette when the system prefers dark. One honest limit: without JavaScript only the operating system preference applies, because a persisted light or dark choice lives in `localStorage` and needs the script to be read back.

### Depth system

Depth comes from lightness steps and hairlines, never box shadows:

- **Surface steps**: `--background` (canvas) to `--card` (one step up) to `--raised` (two steps up). Cards sit on `--card`; an emphasized inner element sits on `--raised`; `--muted` is a soft inset tone for quiet wells.
- **Hairlines**: `--border` is the default 1px decorative separator (exempt from contrast, it never carries meaning). `--boundary` is the meaningful border at 3:1 or better, used where the edge is an affordance (the secondary Button outline, a later input outline, an active card edge).
- **Glow**: one recipe, defined once: a top radial gradient fading to transparent, `bg-radial-[at_top] from-glow/20 via-transparent to-transparent` (Tailwind v4 ships `bg-radial`; the opacity modifier uses the token). Decorative only: it may never be the only signal for anything, and it is exempt from contrast. In light theme the glow is subtle; in dark theme it is the warm amber signature moment. The glow is a page or section level decoration applied by pages on their own backgrounds, never inside a base primitive; the preview page demonstrates the recipe once so later pages copy it.

### Component API surface

Existing primitives keep their props (AC-5, AC-6): `Container`, `Section`, `Stack`, `Heading`, `Text`, `Button`, `Link`, `ThemeToggle`. Changes: `Heading` renders in the display font; `Button` secondary uses `--boundary` for its outline (it was decorative before, which no longer passes with a meaningful edge); everything else restyles from the new tokens with no API change. Their state contracts, restated so this spec stands alone:

- `Button` loading: `aria-busy="true"`, the label stays in the layout (invisible) so the width holds, an `aria-hidden` spinner centers over it, and activation is blocked (the native `disabled` attribute applies while loading).
- `Button` disabled: the native `disabled` attribute, `--disabled` and `--disabled-foreground` tokens, pointer events removed.
- `Link`: underlined by default (`decoration-1`, offset 4), the decoration thickens on hover, `external` adds `rel="noopener noreferrer"` only (never `target`, which stays a caller choice), and `mailto:` plus `tel:` URLs render as plain anchors.

New primitives:

| Component | Key props                                                                                            | Notes                                                                                                                                               |
| --------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Card`    | `as?`, `tone?` (`default`, `raised`, `muted`), `padding?` (`none`, `sm`, `md`, `lg`), `interactive?` | Tinted surface, hairline border, `rounded-lg`. `interactive` swaps the border to `--boundary` on hover and shows the focus ring for keyboard users. |
| `Eyebrow` | `as?`                                                                                                | Small uppercase spaced label that sits above a heading (Geist Sans, `text-small`, `--tracking-eyebrow`, muted tone).                                |
| `Divider` | `as?`                                                                                                | Decorative hairline (`--border`), full width by default, `aria-hidden` since it carries no meaning.                                                 |
| `Badge`   | `variant?` (`default`, `outline`, `accent`)                                                          | Small pill for tags (tech stack names). `default` is a muted surface, `outline` is a boundary hairline, `accent` is terracotta with its foreground. |

Rendered defaults: `Card` renders a `div`, `Eyebrow` a `p`, `Badge` a `span`, and `Divider` a `div` marked `aria-hidden="true"` (pass `as="hr"` when a real thematic break is wanted, which then drops the hiding). Every `as` override stays available on all four. `Card` with `interactive` does not render its own link or button: it is a `div` whose border shifts to `--boundary` on hover and on `focus-within`, and the wrapped link inside keeps its own focus ring; it has no disabled state.

All primitives accept `className` and merge with `cn()`, caller wins, exactly as today. CVA stays reserved for genuinely variant heavy components (`Button`, now also `Badge`); the rest use plain token driven classes.

### Value sourcing

| Action                        | Value produced / displayed                       | Source                                                             |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| Theme applied to the document | active palette                                   | `next-themes` `theme` (localStorage key `theme`), default `system` |
| ThemeToggle icon              | sun or moon                                      | `next-themes` `resolvedTheme`, rendered only after client mount    |
| Any component color           | background, text, border, boundary, accent, glow | semantic CSS variables in `app/globals.css`                        |
| Heading font                  | display serif                                    | `--font-display` token, Fraunces loaded in `app/layout.tsx`        |
| Heading size                  | font size per level                              | the fluid clamp text tokens                                        |
| Container width               | max width and gutter                             | `--container-max` and gutter tokens                                |
| Focus ring color              | terracotta                                       | `--ring` token                                                     |
| Card surface                  | tinted step                                      | `--card`, `--raised`, `--muted` tokens                             |
| Glow decoration               | amber radial                                     | `--glow` token in the single glow recipe                           |
| Eyebrow style                 | small uppercase spaced label                     | `text-small` plus `--tracking-eyebrow` token                       |
| Badge tone                    | pill surface                                     | `--muted`, `--boundary`, `--accent` tokens                         |

### Key invariants

- No component hardcodes a color, font family, or spacing value; every value comes from a token.
- Both palettes define every semantic token; no token is undefined in either theme.
- Every interactive element exposes the terracotta focus ring in both palettes.
- `prefers-reduced-motion` disables non essential transitions.
- `--border` and `--glow` are decorative only and never the sole carrier of information.
- No box shadows in the base system; depth is surface steps and hairlines.
- Nothing of the old blue on zinc system survives in app code.

### Security model

Public static content. No user data, no authentication, no secrets, no new environment variables. The only client side state is the theme preference in `localStorage`.

### Configuration required

None.

### Critical test scenarios

- Happy path: production build with the system set to dark, expect the warm ink palette with no flash, then toggle to light and reload, expect light persists. Verifies **AC-2**, **AC-3**.
- No JavaScript: load with scripting off, expect the correct warm palette from the `prefers-color-scheme` fallback. Verifies **AC-2**.
- Display font: headings render in Fraunces with optical sizing, body stays Geist, no layout jump from fallback metrics (keep the built in fallback adjustment on). Verifies **AC-4**.
- Contrast: computed check of the full required pair list in both palettes: `--foreground` on `--background`, `--card`, and `--raised`; `--muted-foreground` on `--muted`; `--accent-foreground` on `--accent`; `--link` on `--background` and `--card`; `--ring` on `--background`, `--card`, and `--raised`; `--boundary` on `--background`, `--card`, and `--raised`. All pairs pass today (the lowest is `--boundary` at 3.4:1 light and 3.9:1 dark; body pairs sit at 5.2:1 or better), and the ratio table is recorded in this spec's `verify.md`. Verifies **AC-8**.
- Accessibility: tab through `Button`, `Link`, `ThemeToggle`, and an interactive `Card`, expect the terracotta ring in both palettes with no missing indicator. Verifies **AC-6**, **AC-7**.
- Reduced motion: enable it, expect transitions to stop. Verifies **AC-9**.
- Removal sweep: search `app/`, `components/`, `lib/`, and `design.md` for the old hex literals (`#fafafa`, `#f4f4f5`, `#e4e4e7`, `#d4d4d8`, `#a1a1aa`, `#71717a`, `#52525b`, `#3f3f46`, `#27272a`, `#18181b`, `#09090b`, `#60a5fa`, `#3b82f6`, `#2563eb`, `#1d4ed8`) and the old primitive names (`--gray-`, `--blue-`, and any `zinc` utility class), expect zero hits. The semantic token names (`--background`, `--accent`, and the rest) intentionally keep their names; only their values change. Verifies **AC-13**.
- New primitives: render `Card`, `Eyebrow`, `Divider`, `Badge` on the preview page, expect token driven styles and correct states. Verifies **AC-11**, **AC-12**.

## Build plan

Journey approach: the foundation lands as one complete, coherent slice before any real page is built on it.

1. Retoken `app/globals.css`: warm primitives, both semantic palettes, `--raised`, `--boundary`, `--glow`, `--font-display`, `--tracking-eyebrow`; keep the motion, layout, radius, and type scale tokens; remove the zinc and blue scales and the old `--tracking-heading`. Satisfies **AC-1**, **AC-2**, **AC-8**, **AC-10**, **AC-13**.
2. Load Fraunces in `app/layout.tsx` via `next/font` (opsz axis, `--font-fraunces`) and restyle `Heading` in the display font with natural spacing. Satisfies **AC-4**, **AC-5**.
3. Restyle the existing primitives from the new tokens (`Button` secondary outline moves to `--boundary`; `Link`, `ThemeToggle`, `Container`, `Section`, `Stack`, `Text` retheme, with the toggle behavior untouched), and confirm the `cn()` merge config still matches the custom text tokens. Satisfies **AC-3**, **AC-5**, **AC-6**, **AC-7**, **AC-10**.
4. Build `Card`, `Eyebrow`, `Divider`, `Badge` in `components/ui/`. Satisfies **AC-11**.
5. Add the glow recipe and use the surface steps and hairlines across the primitives (no shadows anywhere). Satisfies **AC-12**.
6. Rebuild the preview page as a full showcase of the expanded system in both palettes (type, buttons, cards, badges, divider, glow). Satisfies **AC-12** and gives `/check verify` a live surface.
7. Contrast verification pass (computed, both palettes, the full pair list, recorded in this spec's `verify.md`) plus the reduced motion check. Satisfies **AC-8**, **AC-9**.
8. Rewrite `design.md` as the new visual source of truth. Satisfies **AC-14**.
9. Removal sweep and green gate: no old token, utility, or hex anywhere; typecheck, lint, and production build pass. Satisfies **AC-13**.

## Consequences

**Positive**:

- A distinctive warm editorial identity that does not read like every developer portfolio.
- A richer token set (surface steps, boundary, glow) so later pages build faster and stay consistent.
- The display serif buys instant character for little code; the body stays clean and readable.
- The accessibility baseline is preserved with computed proof for every pair.

**Negative / tradeoffs**:

- Fraunces adds a second variable font to the payload (the `opsz` axis adds weight; body font unchanged).
- A serif display is a strong taste; walking it back later means retheming every heading.
- Terracotta on warm paper pops less than blue on white, so hierarchy must lean on type scale, spacing, and surfaces, not hue alone.
- Warm palettes need more care with embedded third party visuals (syntax highlighting themes, screenshots with white backgrounds); those arrive with later features.

**Neutral**:

- Spec 0001 and the current `design.md` are superseded; the record stays for history.
- `components/ui/` remains the deliberate shared primitives home.
- The preview page stays a placeholder until the home and hero feature replaces it.

## Follow-up

- [ ] Connect the Tailwind CSS MCP and lucide icons MCP in the opencode config (carried from 0001, still open).
- [ ] Semantic heading order stays a review guideline, not enforced by components (carried from 0001).
- [ ] The `tailwind-4-docs` skill snapshot is not initialized locally; initialize it before the build if Tailwind guidance is needed.
- [ ] Choose a warm syntax highlighting theme when the projects feature first needs code blocks.
- [ ] At merge, `/sync` promotes the token discipline (no hardcoded colors, fonts, or spacing in components) into root `AGENTS.md` rules, so later features cannot quietly reintroduce raw values.

## Rationale

Reasoning and options: see [rationale.md](./rationale.md).
