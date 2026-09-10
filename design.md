# Design system

The visual language for the Juan Akbar Indrian portfolio. This document is the source of truth for how the site should look and feel. The exact token values live in `app/globals.css`; this file explains the intent and the rules, and points there for the values.

**Source**: designed in `/architect`, spec `docs/specs/0002-warm-editorial-design-system/index.md`. Supersedes the cold palette of spec `0001`.
**Status**: shipped with the design system and UI foundation feature.

## Character

Warm, calm, premium. The site reads like a well set editorial page on warm paper: a near neutral warm canvas, one confident terracotta accent, an expressive display serif for headings, and generous whitespace. Depth comes from surface steps and hairlines, never from shadows or gradients. Nothing shouts.

Three words: warm, precise, editorial.

## Build mandate

Every new page or component must:

- Use the semantic tokens only. Never write a raw color, font, or spacing value in a component.
- Compose from the primitives in `components/ui/` before writing new markup.
- Keep one clear accent. Terracotta is for action and links, never for large fills or decoration.
- Give content room. Use the `Section` rhythm and the `Container` width instead of ad hoc padding.
- Support both palettes and the reduced motion setting. Never ship a surface that only works in one palette or with motion on.
- Keep every interactive element keyboard reachable, with a visible focus ring.
- Build depth from surface steps and hairlines, never from box shadows.

## Where the tokens live

`app/globals.css` holds every token, in two layers:

- **Primitive layer**: raw values (`--paper-100`, `--ink-800`, and so on). These are the palette ingredients. Components never use them directly.
- **Semantic layer**: named roles (`--background`, `--foreground`, `--accent`, and so on). Components use these through Tailwind utilities, which `@theme inline` maps for you. The `.dark` class on the `html` element swaps the semantic values.

Because the semantic layer is remapped per theme, you write `bg-background` once and both palettes work. You almost never need a `dark:` variant.

## Color

Two warm palettes share one set of semantic roles. The light palette is the default; the dark palette is applied by the `.dark` class, which `next-themes` sets on `html`. When no class is present (no JavaScript), a `prefers-color-scheme` rule applies the same dark values, so the page still renders correctly.

| Role                    | Utility examples           | Light     | Dark      |
| ----------------------- | -------------------------- | --------- | --------- |
| `--background`          | `bg-background`            | `#f6efe4` | `#1c1712` |
| `--foreground`          | `text-foreground`          | `#2b2117` | `#f3e9db` |
| `--card`                | `bg-card`                  | `#fdfbf4` | `#251e17` |
| `--raised`              | `bg-raised`                | `#ffffff` | `#2c241c` |
| `--muted`               | `bg-muted`                 | `#f0e7d8` | `#211b15` |
| `--muted-foreground`    | `text-muted-foreground`    | `#6b5d4f` | `#a99a86` |
| `--border`              | `border-border`            | `#e4d7c3` | `#3a2f24` |
| `--boundary`            | `border-boundary`          | `#9e7b52` | `#9e7b52` |
| `--accent`              | `bg-accent`                | `#a8461a` | `#e08a5b` |
| `--accent-foreground`   | `text-accent-foreground`   | `#fdfbf4` | `#2b2117` |
| `--link`                | `text-link`                | `#a8461a` | `#e08a5b` |
| `--ring`                | `outline-ring`             | `#a8461a` | `#e08a5b` |
| `--glow`                | `from-glow`                | `#b8862b` | `#e0b341` |
| `--disabled`            | `bg-disabled`              | `#ede3d2` | `#251e17` |
| `--disabled-foreground` | `text-disabled-foreground` | `#8a7a66` | `#7a6c5a` |

Rules:

- `--border` is decorative. A meaningful boundary (for example a control outline or an active card edge) uses `--boundary`, which reaches 3:1 or better in both palettes.
- Terracotta is the only accent. Use `--accent` for solid action surfaces and `--link` for text links. In dark mode the accent and link terracotta is lightened so it stays readable on the warm ink canvas.
- Every required pair meets WCAG AA: body text at 4.5:1 or better, large text and meaningful boundaries at 3:1 or better. The disabled roles and the glow are intentionally exempt. The full pair list with computed ratios is in `docs/specs/0002-warm-editorial-design-system/verify.md`.

## Typography

Three families, all loaded in `app/layout.tsx` with `next/font`:

- **Fraunces** (`--font-fraunces`) for all headings, through the `--font-display` token. Optical sizing stays on auto; weight runs at 600.
- **Geist Sans** (`--font-geist-sans`) for all body and interface text.
- **Geist Mono** (`--font-geist-mono`) for code and small technical labels.

Heading sizes are fluid (they scale smoothly with the viewport) and share a tight line height and weight 600. A serif wants its natural spacing, so headings use default letter spacing. Body copy uses weight 400 and a relaxed line height. Small uppercase labels use the `Eyebrow` primitive, which carries the `--tracking-eyebrow` spacing.

| Token          | Utility      | Size                                    | Line height |
| -------------- | ------------ | --------------------------------------- | ----------- |
| `--text-h1`    | `text-h1`    | `clamp(2.5rem, 5vw + 1rem, 4rem)`       | 1.15        |
| `--text-h2`    | `text-h2`    | `clamp(2rem, 3vw + 1rem, 3rem)`         | 1.15        |
| `--text-h3`    | `text-h3`    | `clamp(1.5rem, 2vw + 0.75rem, 2rem)`    | 1.15        |
| `--text-h4`    | `text-h4`    | `clamp(1.25rem, 1vw + 0.75rem, 1.5rem)` | 1.15        |
| `--text-lead`  | `text-lead`  | `1.25rem`                               | 1.6         |
| `--text-body`  | `text-body`  | `1rem`                                  | 1.6         |
| `--text-small` | `text-small` | `0.875rem`                              | 1.6         |

Use the `Heading`, `Text`, and `Eyebrow` primitives rather than raw `text-*` classes, so the tag, size, and tone stay consistent.

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

Motion tokens: `--motion-fast` `150ms`, `--motion-base` `200ms`, `--motion-ease` `cubic-bezier(0.4, 0, 0.2, 1)`. Motion is limited to color and opacity changes on hover and focus. When `prefers-reduced-motion: reduce` is set, all transitions and animations collapse to `0.01ms` through one global rule. The glow is a static gradient, never animated.

## Depth

Depth never comes from box shadows. It comes from three things:

- **Surface steps**: `--background` (canvas) to `--card` (one step up) to `--raised` (two steps up). `--muted` is a soft inset tone for quiet wells.
- **Hairlines**: `--border` for decorative separators, `--boundary` where the edge is an affordance.
- **Glow**: one recipe, defined once, applied by pages on their own backgrounds: `bg-radial-[at_top] from-glow/20 via-transparent to-transparent`. Decorative only. In light theme it is subtle; in dark theme it is the warm amber signature moment.

## Focus

Every interactive element uses `:focus-visible` with a 2px `--ring` outline and a 2px offset, applied globally in `app/globals.css`. Outline, not `box shadow`, so the indicator survives forced colors mode (Windows high contrast). Never set `outline: none` without applying the ring in the same rule. The ring is terracotta and reaches 3:1 or better against the adjacent surface in both palettes.

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

Renders the matching heading tag, fluid size, and the Fraunces display font. Props: `level` (`1` to `4`), `as` (override the tag), `tone` (`default`, `muted`). Heading order is not enforced by the component, so keep it semantic by hand.

```tsx
<Heading level={1}>Juan Akbar Indrian</Heading>
<Heading level={2} tone="muted">Selected work</Heading>
```

### Eyebrow

Small uppercase spaced label that sits above a heading. Props: `as` (default `p`). Geist Sans, `text-small`, `--tracking-eyebrow`, muted tone.

```tsx
<Eyebrow>Selected work</Eyebrow>
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
- The secondary outline uses `--boundary`, so the edge is a real affordance at 3:1.

```tsx
<Button variant="primary" size="lg">Get in touch</Button>
<Button variant="secondary" loading>Saving</Button>
```

### Link

Styled anchor. Props: `href`, `external`, plus native anchor props. Internal links use `next/link`; `mailto:` and `tel:` render as plain anchors. `external` adds `rel="noopener noreferrer"` only and never sets `target`, so opening a new tab stays a caller choice. Underlined by default, decoration thickens on hover.

```tsx
<Link href="/projects">See the work</Link>
<Link href="https://github.com/..." external>GitHub</Link>
```

### Card

Tinted surface with a hairline border and `rounded-lg`. Props: `as` (default `div`), `tone` (`default`, `raised`, `muted`), `padding` (`none`, `sm`, `md`, `lg`), `interactive`. With `interactive`, the border shifts to `--boundary` on hover and on focus within, and the wrapped link keeps its own focus ring. It renders no link or button of its own.

```tsx
<Card tone="raised" padding="lg" interactive>
  <Heading level={4}>Project title</Heading>
  <Link href="/projects/project-slug">Read the case study</Link>
</Card>
```

### Divider

Decorative hairline (`--border`), full width. Props: `as` (default `div`). It is `aria-hidden` by default; pass `as="hr"` for a real thematic break, which drops the hiding.

```tsx
<Divider />
```

### Badge

Small pill for tags, like tech stack names. Props: `variant` (`default`, `outline`, `accent`), `as` (default `span`). `default` is a muted surface, `outline` a boundary hairline, `accent` terracotta with its foreground.

```tsx
<Badge variant="accent">Next.js</Badge>
```

### ThemeToggle

Client component using `next-themes`, with sun and moon icons from `lucide-react`. It follows the system preference by default, lets the visitor switch, and persists the choice under the `theme` localStorage key. Its accessible name states the next action ("Switch to dark mode" when light is active, and the reverse). While unmounted it renders a same size placeholder, so there is no layout shift and no hydration mismatch.

```tsx
<ThemeToggle />
```

## Theming

`next-themes` runs with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and `storageKey="theme"`. The provider lives in `app/providers.tsx` and wraps the app in `app/layout.tsx`, which also carries `suppressHydrationWarning` on `html`. The injected script sets the class before first paint, so there is no flash of the wrong theme. Without JavaScript the CSS falls back to the system preference on its own.
