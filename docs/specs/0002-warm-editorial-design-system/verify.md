# Verify: Design system and UI foundation (warm editorial) · spec 0002 · updated 2026-09-10

_Steps derived from spec 0002 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## UI / manual

- [x] Run a production build with the system set to dark, expect the warm ink palette with no flash of the wrong theme → AC-2
- [x] Toggle to light and reload, expect the light choice persists → AC-3
- [x] Headings render in Fraunces with optical sizing, body stays Geist Sans, code stays Geist Mono, and there is no layout jump from fallback metrics → AC-4
- [x] Tab through `Button`, `Link`, `ThemeToggle`, and an interactive `Card`, expect the terracotta focus ring in both palettes → AC-6, AC-7
- [x] Enable reduced motion, expect transitions to collapse → AC-9
- [x] With JavaScript off, load the page, expect the correct warm palette from the `prefers-color-scheme` fallback → AC-2

## Commands

- [x] `bunx tsc --noEmit` → passes → AC-10
- [x] `bun run lint` → passes
- [x] `bun run build` → production build passes
- [x] Sweep `app/`, `components/`, `lib/`, and `design.md` for the old hex literals (`#fafafa`, `#f4f4f5`, `#e4e4e7`, `#d4d4d8`, `#a1a1aa`, `#71717a`, `#52525b`, `#3f3f46`, `#27272a`, `#18181b`, `#09090b`, `#60a5fa`, `#3b82f6`, `#2563eb`, `#1d4ed8`) and the old primitive names (`--gray-`, `--blue-`, and any `zinc` utility) → zero hits → AC-13

## Contrast ratios (computed, both palettes)

| Pair                                | Light  | Dark   | Gate |
| ----------------------------------- | ------ | ------ | ---- |
| `--foreground` on `--background`    | 13.8:1 | 14.8:1 | 4.5  |
| `--foreground` on `--card`          | 15.2:1 | 13.7:1 | 4.5  |
| `--foreground` on `--raised`        | 15.8:1 | 12.7:1 | 4.5  |
| `--muted-foreground` on `--muted`   | 5.2:1  | 6.2:1  | 4.5  |
| `--accent-foreground` on `--accent` | 5.7:1  | 6.0:1  | 4.5  |
| `--link` on `--background`          | 5.2:1  | 6.7:1  | 4.5  |
| `--link` on `--card`                | 5.7:1  | 6.2:1  | 4.5  |
| `--ring` on `--background`          | 5.2:1  | 6.7:1  | 3.0  |
| `--ring` on `--card`                | 5.7:1  | 6.2:1  | 3.0  |
| `--ring` on `--raised`              | 5.9:1  | 5.8:1  | 3.0  |
| `--boundary` on `--background`      | 3.4:1  | 4.6:1  | 3.0  |
| `--boundary` on `--card`            | 3.8:1  | 4.2:1  | 3.0  |
| `--boundary` on `--raised`          | 3.9:1  | 3.9:1  | 3.0  |

Every required pair passes; the lowest is `--boundary` on `--raised` in light at 3.9:1. Body pairs sit at 5.2:1 or better → AC-8.

## Acceptance-criteria coverage

- AC-1 warm palettes and no undefined token → manual theme check plus `globals.css` review
- AC-2 no flash and no JS fallback → UI steps 1 and 6
- AC-3 ThemeToggle persistence → UI step 2
- AC-4 Fraunces display font → UI step 3
- AC-5 existing primitives keep props, restyled → visual review of the preview page
- AC-6, AC-7 keyboard reach and terracotta ring → UI step 4
- AC-8 contrast → ratio table above
- AC-9 reduced motion → UI step 5
- AC-10 tokens via `@theme inline`, no hardcoded values → typecheck plus `globals.css` review
- AC-11 new primitives exist → visual review of the preview page
- AC-12 depth via surfaces, hairlines, and glow, no shadows → visual review of the preview page
- AC-13 old system removed → sweep command
- AC-14 `design.md` rewritten → review of `design.md`
