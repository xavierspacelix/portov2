# 0001. Design system and UI foundation · rationale

## Context

The portfolio needs a visual identity before any page is built. Today the project is a bare Next.js 16 scaffold with Tailwind v4: a default `globals.css`, one placeholder page, and no shared components. Building the home page first without a system would hardcode colors, spacing, and component styles, and every later page would drift.

The forces at play: one developer, a small static site with no backend, a requirement for a premium editorial look, a WCAG AA accessibility baseline, and both light and dark palettes from the start. The stack already uses Tailwind v4, where the idiomatic token approach is CSS variables mapped with `@theme inline`. The cost of not deciding is inconsistent pages and an accessibility retrofit later.

## Options considered

### Option 1: Custom Tailwind v4 primitives with CVA

Build the tokens and primitives directly on Tailwind v4, using class variance authority for typed component variants.

**Pros**:

- Full control over the look, with no framework opinions to fight.
- Small dependency surface; the tokens stay the single source of truth.
- Fits the existing Tailwind v4 setup directly.

**Cons**:

- More code to write and maintain than a ready made kit.
- Accessibility and edge cases are on us to get right.

### Option 2: shadcn/ui

Copy in components built on accessible primitives (Radix or Base UI) that we own and can edit.

**Pros**:

- Accessible primitives out of the box, and a fast path to many components later.
- Large community and many examples.

**Cons**:

- More files and a CLI to manage, and it brings conventions we may not want for a small editorial site.
- We only need a handful of primitives now.

### Option 3: Headless library (Base UI or Radix) with custom styles

Use unstyled accessible primitives and style them ourselves.

**Pros**:

- A strong accessibility foundation with full visual control.

**Cons**:

- Extra dependency and indirection for components as simple as a button or a toggle.

### Option 4: A styled kit (MUI or Chakra)

Adopt a full component library with its own design language.

**Pros**:

- Many components immediately.

**Cons**:

- Heavy and opinionated, and hard to make look bespoke; a poor fit for a small premium portfolio.

## Rationale

Option 1 wins because the site is small, static, and already on Tailwind v4, and the goal is a distinctive editorial look rather than a large component catalog. shadcn/ui is the strong runner up: if the site later needs many complex components (dialogs, menus, tables), adopting it then would be reasonable. For now, the base set is small enough that owning it keeps the bundle lean and the tokens clean. The accessibility baseline is met with careful focus styling and AA contrast, verified in both palettes.
