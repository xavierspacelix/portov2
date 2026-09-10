# Design system

The visual language for the Juan Akbar Indrian portfolio. This document is the source of truth for how the site should look and feel. The exact token values live in `app/globals.css`; this file explains the intent and the rules, and points there for the values.

**Source**: designed in `/architect`, spec `docs/specs/0001-design-system-ui-foundation/index.md`.
**Status**: shipped with the design system and UI foundation feature.

## Character

Quiet confidence. The site reads like a well set editorial page: a near neutral gray canvas, one confident blue accent, generous whitespace, and crisp typography that lets the work speak. Nothing shouts. Depth comes from spacing and type weight, not from shadows, gradients, or decoration.

Three words: calm, precise, premium.

## Build mandate

Every new page or component must:

- Use the semantic tokens only. Never write a raw color, font, or spacing value in a component.
- Compose from the primitives in `components/ui/` before writing new markup.
- Keep one clear accent. Blue is for action and links, never for large fills or decoration.
- Give content room. Use the `Section` rhythm and the `Container` width instead of ad hoc padding.
- Support both palettes and the reduced motion setting. Never ship a surface that only works in one palette or with motion on.
- Keep every interactive element keyboard reachable, with a visible focus ring.

## Where the tokens live

`app/globals.css` holds every token, in two layers:

- **Primitive layer**: raw values (`--gray-500`, `--blue-600`, and so on). These are the palette ingredients. Components never use them directly.
- **Semantic layer**: named roles (`--background`, `--foreground`, `--accent`, and so on). Components use these through Tailwind utilities, which `@theme inline` maps for you. The `.dark` class on the `html` element swaps the semantic values.

Because the semantic layer is remapped per theme, you write `bg-background` once and both palettes work. You almost never need a `dark:` variant.

## Color

Two palettes share one set of semantic roles. The light palette is the default; the dark palette is applied by the `.dark` class, which `next-themes` sets on `html`. When no class is present (no JavaScript), a `prefers-color-scheme` rule applies the same dark values, so the page still renders correctly.

| Role                    | Utility examples           | Light     | Dark      |
| ----------------------- | -------------------------- | --------- | --------- |
| `--background`          | `bg-background`            | `#ffffff` | `#09090b` |
| `--foreground`          | `text-foreground`          | `#09090b` | `#fafafa` |
| `--card`                | `bg-card`                  | `#ffffff` | `#18181b` |
| `--muted`               | `bg-muted`                 | `#f4f4f5` | `#27272a` |
| `--muted-foreground`    | `text-muted-foreground`    | `#52525b` | `#a1a1aa` |
| `--border`              | `border-border`            | `#e4e4e7` | `#27272a` |
| `--accent`              | `bg-accent`                | `#2563eb` | `#2563eb` |
| `--accent-foreground`   | `text-accent-foreground`   | `#ffffff` | `#ffffff` |
| `--link`                | `text-link`                | `#2563eb` | `#60a5fa` |
| `--ring`                | `outline-ring`             | `#2563eb` | `#60a5fa` |
| `--disabled`            | `bg-disabled`              | `#f4f4f5` | `#27272a` |
| `--disabled-foreground` | `text-disabled-foreground` | `#a1a1aa` | `#71717a` |

Rules:

- `--border` is decorative. A meaningful boundary (for example a control outline) needs a role that reaches 3:1, and none exists yet because this pass has no form controls.
- Blue is the only accent. Use `--accent` for solid action surfaces and `--link` for text links. In dark mode the link blue is lightened so it stays readable on the dark canvas.
- Every required pair meets WCAG AA: body text at 4.5:1 or better, large text and meaningful boundaries at 3:1 or better. The disabled roles are intentionally low contrast and are exempt.

## Typography

Two families, both loaded in `app/layout.tsx` with `next/font`:

- **Geist Sans** (`--font-geist-sans`) for all text.
- **Geist Mono** (`--font-geist-mono`) for code and small technical labels.

Heading sizes are fluid (they scale smoothly with the viewport) and share a tight line height, a `-0.02em` letter spacing, and weight 600. Body copy uses weight 400 and a relaxed line height.

| Token          | Utility      | Size                                    | Line height |
| -------------- | ------------ | --------------------------------------- | ----------- |
| `--text-h1`    | `text-h1`    | `clamp(2.5rem, 5vw + 1rem, 4rem)`       | 1.15        |
| `--text-h2`    | `text-h2`    | `clamp(2rem, 3vw + 1rem, 3rem)`         | 1.15        |
| `--text-h3`    | `text-h3`    | `clamp(1.5rem, 2vw + 0.75rem, 2rem)`    | 1.15        |
| `--text-h4`    | `text-h4`    | `clamp(1.25rem, 1vw + 0.75rem, 1.5rem)` | 1.15        |
| `--text-lead`  | `text-lead`  | `1.25rem`                               | 1.6         |
| `--text-body`  | `text-body`  | `1rem`                                  | 1.6         |
| `--text-small` | `text-small` | `0.875rem`                              | 1.6         |

Use the `Heading` and `Text` primitives rather than raw `text-*` classes, so the tag, size, and tone stay consistent.

## Spacing, layout, and shape

Spacing follows the Tailwind base of `0.25rem` steps. The layout tokens handle the two things every page shares: horizontal gutters and vertical section rhythm.

| Token                | Purpose                | Mobile   | From `md` |
| -------------------- | ---------------------- | -------- | --------- |
| `--container-max`    | default content width  | `72rem`  | `72rem`   |
| `--container-narrow` | narrow content width   | `48rem`  | `48rem`   |
| `--container-wide`   | wide content width     | `84rem`  | `84rem`   |
| `--container-gutter` | page side padding      | `1.5rem` | `2rem`    |
| `--section-y`        | default section rhythm | `4rem`   | `6rem`    |
| `--section-y-tight`  | tight section rhythm   | `2.5rem` | `3.5rem`  |
| `--section-y-loose`  | loose section rhythm   | `6rem`   | `8rem`    |

Radius tokens: `--radius-sm` `6px`, `--radius-md` `8px`, `--radius-lg` `12px`, `--radius-full` `9999px`. Use `rounded-md` for buttons and small controls, `rounded-lg` for cards and panels.

Motion tokens: `--motion-fast` `150ms`, `--motion-base` `200ms`, `--motion-ease` `cubic-bezier(0.4, 0, 0.2, 1)`. Motion is limited to color and opacity changes on hover and focus. When `prefers-reduced-motion: reduce` is set, all transitions and animations collapse to `0.01ms` through one global rule.

## Focus

Every interactive element uses `:focus-visible` with a 2px `--ring` outline and a 2px offset, applied globally in `app/globals.css`. Outline, not `box shadow`, so the indicator survives forced colors mode (Windows high contrast). Never set `outline: none` without applying the ring in the same rule. The ring reaches 3:1 against the adjacent surface in both palettes.

## Components

All primitives live in `components/ui/`, accept `className`, and merge it with `cn()` (from `lib/utils.ts`). A caller class always wins over the component default.

### Container

Centered width wrapper. Props: `as` (element, default `div`), `size` (`default`, `narrow`, `wide`).

```tsx
<Container size="narrow">{children}</Container>
```

### Section

Vertical rhythm wrapper. Props: `as` (default `section`), `spacing` (`default`, `tight`, `loose`).

```tsx
<Section spacing="loose">{children}</Section>
```

### Stack

Flex layout primitive. Props: `as` (default `div`), `direction` (`col`, `row`), `gap` (`none`, `xs`, `sm`, `md`, `lg`, `xl`), `align` (`start`, `center`, `end`, `stretch`, `baseline`), `justify` (`start`, `center`, `end`, `between`, `around`).

```tsx
<Stack direction="row" gap="sm" align="center">
  <Button>Primary</Button>
  <Button variant="secondary">Secondary</Button>
</Stack>
```

### Heading

Renders the matching heading tag and fluid size. Props: `level` (`1` to `4`), `as` (override the tag), `tone` (`default`, `muted`). Heading order is not enforced by the component, so keep it semantic by hand.

```tsx
<Heading level={1}>Juan Akbar Indrian</Heading>
<Heading level={2} tone="muted">Selected work</Heading>
```

### Text

Body copy. Props: `size` (`lead`, `body`, `small`), `tone` (`default`, `muted`), `as` (default `p`).

```tsx
<Text size="lead" tone="muted">
  Full stack developer.
</Text>
```

### Button

CVA variants with sizes and states. Props: `variant` (`primary`, `secondary`, `ghost`), `size` (`sm`, `md`, `lg`), `loading`, plus native button props.

- `loading` sets `aria-busy`, keeps the button width stable (the label stays in place), shows an `aria-hidden` spinner, and blocks activation.
- `disabled` sets the native attribute, uses the disabled tokens, and removes pointer events.

```tsx
<Button variant="primary" size="lg">Get in touch</Button>
<Button variant="secondary" loading>Saving</Button>
```

`asChild` (a link that looks like a button) is intentionally not built yet, because no page needs it. Add it when a page does, together with its dependency.

### Link

Styled anchor. Props: `href`, `external`, plus native anchor props. Internal links use `next/link`; `mailto:` and `tel:` render as plain anchors. `external` adds `rel="noopener noreferrer"` only and never sets `target`, so opening a new tab stays a caller choice.

```tsx
<Link href="/projects">See the work</Link>
<Link href="https://github.com/..." external>GitHub</Link>
```

### ThemeToggle

Client component using `next-themes`, with sun and moon icons from `lucide-react`. It follows the system preference by default, lets the visitor switch, and persists the choice under the `theme` localStorage key. Its accessible name states the next action ("Switch to dark mode" when light is active, and the reverse). While unmounted it renders a same size placeholder, so there is no layout shift and no hydration mismatch.

```tsx
<ThemeToggle />
```

## Theming

`next-themes` runs with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and `storageKey="theme"`. The provider lives in `app/providers.tsx` and wraps the app in `app/layout.tsx`, which also carries `suppressHydrationWarning` on `html`. The injected script sets the class before first paint, so there is no flash of the wrong theme. Without JavaScript the CSS falls back to the system preference on its own.
