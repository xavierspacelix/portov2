# 0001. Design system and UI foundation

**Date**: 2026-09-10
**Status**: In Progress

## Summary

This decision defines the visual language for the portfolio: color, type, spacing, shape, and a small set of base components. It uses Tailwind CSS v4 tokens (CSS variables mapped to utility classes) with a light and dark palette, and it builds the shared primitives in `components/ui/`. Every later page and section reuses these tokens and components, so this sets the quality bar for the whole site.

## Requirements

**User stories**:

- As a visitor, I want a clean, premium looking site that is easy to read, so that I trust the developer behind it.
- As a visitor who prefers dark mode, I want the site to respect my system setting and let me switch, so that reading is comfortable.
- As a keyboard user, I want to see where focus is and move through controls, so that I can use the site without a mouse.
- As the engineer building later pages, I want shared tokens and primitives, so that every section stays consistent and fast to build.

**Acceptance criteria** (the contract, each criterion is IDed and independently checkable):

- **AC-1**: A `design.md` at the repo root documents the color, type, spacing, and shape tokens, the two palettes, and the base component APIs and usage.
- **AC-2**: Light and dark palettes are defined as semantic tokens, and the site follows the operating system preference on first load with no visible flash.
- **AC-3**: A `ThemeToggle` lets a visitor switch between light and dark, and the choice persists across reloads.
- **AC-4**: `Container`, `Section`, and `Stack` give every page consistent width and vertical rhythm from tokens, with no per page magic numbers.
- **AC-5**: `Heading` (levels 1 to 4) and `Text` (lead, body, small, and a muted tone) render token driven type styles.
- **AC-6**: `Button` (variants primary, secondary, ghost; sizes sm, md, lg; plus disabled and loading) and `Link` are keyboard reachable and show a visible focus ring.
- **AC-7**: Every interactive element shows the accent focus ring in both palettes.
- **AC-8**: Text and interface colors meet WCAG AA contrast in both palettes: 4.5:1 for body text, 3:1 for large text and meaningful interface boundaries; decorative separators are exempt.
- **AC-9**: Transitions respect `prefers-reduced-motion` and turn off when it is set.
- **AC-10**: Tokens are defined once as CSS custom properties and consumed through Tailwind v4 `@theme inline`; no component hardcodes a color, font, or spacing value.

## Decision

**Chosen option**: Option 1: Custom Tailwind v4 primitives with CVA

Build the design system from scratch on Tailwind CSS v4 and class variance authority (CVA, a small library for typed component variants). Tokens live as CSS variables in `app/globals.css`, mapped to utilities with `@theme inline`; primitives live in `components/ui/`.

**Implementation skills**: `tailwind-4-docs` (`lombiq/tailwind-agent-skills`, `.agents/skills/tailwind-4-docs/`) · `tailwind-v4-shadcn` (`secondsky/claude-skills`, `.agents/skills/tailwind-v4-shadcn/`) · `next-themes` (`pharbuz/ai-agent-skills`, `.agents/skills/next-themes/`) · `vercel-composition-patterns` (`vercel-labs/agent-skills`, `.agents/skills/vercel-composition-patterns/`)

## Feature design

**Data model**: Not applicable. The design system has no persistence; the only stored value is the theme preference in `localStorage`.

### Token architecture

Two layers: a primitive scale of raw values, and a semantic layer of named roles that components use.

**Primitive layer** (raw values, never used directly in components). Every value is defined once in `app/globals.css`.

| Primitive  | Value     | Primitive  | Value     |
| ---------- | --------- | ---------- | --------- |
| `gray-0`   | `#ffffff` | `gray-600` | `#52525b` |
| `gray-50`  | `#fafafa` | `gray-700` | `#3f3f46` |
| `gray-100` | `#f4f4f5` | `gray-800` | `#27272a` |
| `gray-200` | `#e4e4e7` | `gray-900` | `#18181b` |
| `gray-300` | `#d4d4d8` | `gray-950` | `#09090b` |
| `gray-400` | `#a1a1aa` | `blue-400` | `#60a5fa` |
| `gray-500` | `#71717a` | `blue-500` | `#3b82f6` |
| `blue-600` | `#2563eb` | `blue-700` | `#1d4ed8` |

**Semantic layer** (the roles components use; each theme remaps these). The contrast column states the ratio for the pair a component actually uses.

| Token                   | Light     | Dark      | Pair and ratio                          |
| ----------------------- | --------- | --------- | --------------------------------------- |
| `--background`          | `#ffffff` | `#09090b` | page canvas                             |
| `--foreground`          | `#09090b` | `#fafafa` | on background, 19.7:1                   |
| `--card`                | `#ffffff` | `#18181b` | card surface                            |
| `--muted`               | `#f4f4f5` | `#27272a` | muted surface                           |
| `--muted-foreground`    | `#52525b` | `#a1a1aa` | on muted, 7.0:1 light, 5.8:1 dark       |
| `--border`              | `#e4e4e7` | `#27272a` | decorative separators only              |
| `--accent`              | `#2563eb` | `#2563eb` | solid button background                 |
| `--accent-foreground`   | `#ffffff` | `#ffffff` | on accent, 5.1:1                        |
| `--link`                | `#2563eb` | `#60a5fa` | on background, 5.1:1 light, 7.7:1 dark  |
| `--ring`                | `#2563eb` | `#60a5fa` | focus ring, 3:1 against both surfaces   |
| `--disabled`            | `#f4f4f5` | `#27272a` | disabled surface (exempt from contrast) |
| `--disabled-foreground` | `#a1a1aa` | `#71717a` | disabled label (exempt from contrast)   |

`@theme inline` maps each semantic token to a utility. For example `--color-background: var(--background)` gives `bg-background`, and `--color-link: var(--link)` gives `text-link`. The `.dark` class on the `html` element switches the semantic values. The `--border` token is decorative only; a meaningful component boundary (for example an input outline) must use a token that reaches 3:1, and none exists yet because this pass has no form controls.

### Motion tokens

| Token           | Value                          |
| --------------- | ------------------------------ |
| `--motion-fast` | `150ms`                        |
| `--motion-base` | `200ms`                        |
| `--motion-ease` | `cubic-bezier(0.4, 0, 0.2, 1)` |

Motion is limited to color and opacity transitions on hover and focus. When `prefers-reduced-motion: reduce` is set, all transitions and animations collapse to `0.01ms` with a single iteration, applied globally with `*, *::before, *::after`.

### Theme switching

`next-themes` is configured with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `storageKey="theme"`, and `disableTransitionOnChange`. The provider lives in a client component `app/providers.tsx`; `app/layout.tsx` wraps the app in it and adds `suppressHydrationWarning` to the `html` element. The provider's injected script sets the class before first paint, so there is no flash of the wrong theme.

Three states exist: `system` (follow the operating system), `light`, and `dark`. While `system` is active, a change to the operating system preference is followed live. A persisted `light` or `dark` overrides the operating system until the visitor chooses `system` again.

Without JavaScript, the CSS falls back to `@media (prefers-color-scheme: dark)` on the same semantic variables, so the page still renders in the correct palette. The `color-scheme` property is set per palette so native controls and scrollbars match.

### Typography

- Families: Geist Sans (`--font-geist-sans`) for text and Geist Mono (`--font-geist-mono`) for code, both already loaded in `app/layout.tsx`.
- Fluid scale (clamp based), so headings scale smoothly with the viewport:
  - h1: `clamp(2.5rem, 5vw + 1rem, 4rem)`
  - h2: `clamp(2rem, 3vw + 1rem, 3rem)`
  - h3: `clamp(1.5rem, 2vw + 0.75rem, 2rem)`
  - h4: `clamp(1.25rem, 1vw + 0.75rem, 1.5rem)`
- Body sizes: lead `1.25rem`, body `1rem`, small `0.875rem`.
- Line height: headings `1.15`, body `1.6`. Weight: headings `600`, body `400`. Heading letter spacing `-0.02em`.

### Spacing and shape

- Spacing base `4px` (Tailwind default `0.25rem` steps).
- Section rhythm: `--section-y` `4rem` on mobile, `6rem` from the `md` breakpoint.
- Container: `--container-max` `72rem`, with a `1.5rem` gutter (`2rem` from `md`).
- Radius: `--radius-sm` `6px`, `--radius-md` `8px`, `--radius-lg` `12px`, `--radius-full` `9999px`.

### Focus

Every interactive element uses `:focus-visible` with `outline: 2px solid var(--ring); outline-offset: 2px;`. Outline, not `box-shadow`, is authoritative, so the indicator survives in forced colors mode (Windows high contrast). Never set `outline: none` without applying the ring in the same rule. The ring reaches 3:1 against the adjacent surface in both palettes.

### Component API surface

| Component     | Key props                                                                                                   | Notes                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `Container`   | `as?`, `size?` (`default`, `wide`, `narrow`)                                                                | Centered max width wrapper                                                                  |
| `Section`     | `as?`, `spacing?` (`default`, `tight`, `loose`)                                                             | Vertical rhythm wrapper                                                                     |
| `Stack`       | `as?`, `direction?` (`col`, `row`), `gap?`, `align?`, `justify?`                                            | Flex layout primitive                                                                       |
| `Heading`     | `level` (`1` to `4`), `as?`, `tone?`                                                                        | Renders the matching tag and size                                                           |
| `Text`        | `size?` (`lead`, `body`, `small`), `tone?` (`default`, `muted`), `as?`                                      | Body copy                                                                                   |
| `Button`      | `variant` (`primary`, `secondary`, `ghost`), `size` (`sm`, `md`, `lg`), `loading?`, `disabled?`, `asChild?` | CVA variants; `loading` sets `aria-busy`                                                    |
| `Link`        | `href`, `external?`, `className?`                                                                           | Focus ring; `external` adds `rel="noopener noreferrer"`                                     |
| `ThemeToggle` | none                                                                                                        | Client component using `next-themes`, with sun and moon lucide icons and an accessible name |

All primitives accept `className` and merge classes with `cn(cvaOutput, className)`, where `cn()` is `clsx` plus `tailwind-merge`. `tailwind-merge` is the only conflict resolver, so a caller class always wins over the component default, including responsive and state variants. CVA is reserved for genuinely variant heavy components (`Button`); the layout and text primitives use plain token driven classes.

**Button states**:

- `disabled`: sets the native `disabled` attribute, uses `--disabled` and `--disabled-foreground`, and removes pointer events.
- `loading`: sets `aria-busy="true"`, keeps the button width stable (the label stays in the layout), shows a lucide spinner marked `aria-hidden`, and blocks activation while loading.
- `asChild`: renders the single child element with the button classes (a link that looks like a button). It supports one compatible child only; when the child is an anchor, `loading` and `disabled` are not supported and must not be passed. Omit `asChild` if no page needs it.

**Link behavior**: `external` adds `rel="noopener noreferrer"` only, and never opens a new tab on its own, so `target` stays a caller choice. `mailto:` and `tel:` URLs are allowed and render as normal anchors.

**ThemeToggle contract**: a native `button` with an action oriented accessible name that states the next action ("Switch to dark mode" when light is active, and the reverse). It renders a stable, server safe placeholder of the same size while unmounted, so there is no layout shift, then reveals the sun or moon lucide icon once mounted.

### Value sourcing

| Action                        | Value produced / displayed       | Source                                                             |
| ----------------------------- | -------------------------------- | ------------------------------------------------------------------ |
| Theme applied to the document | active palette                   | `next-themes` `theme` (localStorage key `theme`), default `system` |
| ThemeToggle icon              | sun or moon                      | `next-themes` `resolvedTheme`, rendered only after client mount    |
| Any component color           | background, text, border, accent | semantic CSS variables in `app/globals.css`                        |
| Container width               | max width and gutter             | `--container-max` and gutter tokens                                |
| Heading size                  | font size per level              | the clamp scale tokens                                             |
| Focus ring color              | ring color                       | `--ring` token                                                     |

### Key invariants

- No component hardcodes a color, font family, or spacing value; every value comes from a token.
- Both palettes define every semantic token; no token is undefined in either theme.
- Every interactive element exposes a visible focus indicator in both palettes.
- `prefers-reduced-motion` disables non essential transitions.

### Security model

Public static content. No user data, no authentication, no secrets, and no new environment variables. The only client side state is the theme preference in `localStorage`.

### Configuration required

None. No new environment variables or credentials.

### Critical test scenarios

- Happy path: load the site with the system set to dark, expect the dark palette with no flash (verify in a production build, since dev can still flash), then toggle to light and reload, expect light persists, verifies **AC-2**, **AC-3**.
- System change: with `system` active, change the operating system preference, expect the palette to follow live; then pick `light` and change the operating system again, expect the persisted choice to hold, verifies **AC-2**.
- Failure case: load with JavaScript disabled, expect the page still renders the correct palette from the `prefers-color-scheme` CSS fallback, verifies **AC-2**.
- Accessibility: tab through `Button`, `Link`, and `ThemeToggle`, expect a visible outline ring in both palettes and no missing indicator, verifies **AC-6**, **AC-7**.
- Contrast: check these pairs with an automated tool (for example the WebAIM contrast checker), then spot check by eye: `--foreground` on `--background`, `--muted-foreground` on `--muted`, `--accent-foreground` on `--accent`, and `--link` on `--background`, in both palettes, verifies **AC-8**.
- Motion: enable reduced motion, expect transitions to stop, verifies **AC-9**.

## Build plan

Journey approach: finish the foundation as one complete, coherent slice before any page is built, so the first page starts from a polished system.

1. Add the token layer to `app/globals.css` (primitive scales, semantic light and dark values, `@theme inline` mapping, spacing, radius, type scale, and motion tokens), satisfies **AC-2**, **AC-10**.
2. Add the theme provider in a client `app/providers.tsx` and wire it in `app/layout.tsx` with `attribute="class"`, `defaultTheme="system"`, and `suppressHydrationWarning`, satisfies **AC-2**.
3. Add `cn()` in `lib/utils.ts` and install `class-variance-authority`, `clsx`, and `tailwind-merge`, satisfies **AC-10**.
4. Build the layout primitives `Container`, `Section`, and `Stack` in `components/ui/`, satisfies **AC-4**.
5. Build the typography primitives `Heading` and `Text`, satisfies **AC-5**.
6. Build `Button` and `Link` with CVA variants, sizes, disabled and loading states, and the focus ring, satisfies **AC-6**, **AC-7**.
7. Build `ThemeToggle` with `next-themes` and lucide icons, satisfies **AC-3**.
8. Verify contrast in both palettes and reduced motion handling, satisfies **AC-8**, **AC-9**.
9. Write `design.md` at the repo root documenting the tokens, palettes, components, and usage, satisfies **AC-1**.

## Consequences

**Positive**:

- Every later page reuses one coherent set of tokens and primitives, so the site stays consistent and builds fast.
- Both palettes and the accessibility baseline exist from day one, instead of being retrofitted.
- No interface framework lock in; the system is small and fully owned.

**Negative / tradeoffs**:

- Adds `next-themes`, `lucide-react`, `class-variance-authority`, `clsx`, and `tailwind-merge` dependencies.
- Custom primitives mean more code to maintain than a ready made kit, and new components must follow the token discipline by hand.
- A design system is never finished; this pass covers only the base set, so later features may need new primitives.

**Neutral**:

- `components/ui/` is a deliberate exception to the folder by feature rule, because shared primitives are not owned by one feature.
- `design.md` becomes the visual source of truth that `/develop` reads for later pages.

## Follow-up

- [ ] Connect the Tailwind CSS MCP and lucide icons MCP in the opencode config, as chosen during design.
- [ ] Semantic heading order is not enforced by the components (the engineer opted out); keep it a review guideline.
- [ ] The installed `tailwind-v4-shadcn` skill was used only for Tailwind v4 theming patterns; shadcn/ui is not part of this design.

## Rationale

Reasoning and options: see [rationale.md](./rationale.md).
