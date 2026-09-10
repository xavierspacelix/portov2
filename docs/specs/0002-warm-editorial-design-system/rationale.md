# 0002. Warm editorial design system · rationale

## Context

The portfolio shipped its first design system (spec 0001): zinc grays with a blue accent, Geist Sans everywhere, light and dark, fully token driven. It works and it is accessible. The engineer looked at it and did not love it. The named problem was the blue accent, and underneath that, the whole neutral zinc canvas reads cold and generic, like every developer portfolio template. For a site whose whole point is to win client work and interest recruiters, a forgettable look is a real cost, not a taste quibble.

The forces at play: one developer, a small static site with no backend, a premium editorial ambition, a WCAG AA baseline that must hold, both palettes from day one, and one timing gift. Only a placeholder preview page consumes the system today. A retheme now is nearly free; after the home page, projects, and case studies are built on top, the same change gets expensive. That asymmetry is the strongest force in this decision.

In conversation the engineer chose a direction: dark, rich, editorial; terracotta as the accent; a warm paper light palette to match the warm ink dark palette; Fraunces as an expressive display serif with Geist Sans staying for body; both palettes richer (tinted surfaces, hairline borders, a soft amber glow); and an expanded component set (Card, Eyebrow, Divider, Badge) so later pages have more to compose with.

## Options considered

### Option 1: Minimal recolor (swap blue for terracotta, keep everything else)

Rehue the accent and the neutrals, change no structure.

**Pros**:

- Smallest possible change, fast, no new font payload, no new components to maintain.
- Zero risk to the working accessibility baseline.

**Cons**:

- The complaint is atmosphere, not just hue. A single flat surface and a sans only scale still reads template, so the stated goal is unmet.
- Saves the work now and pays more later, once real pages sit on the flat system.

### Option 2: Full warm editorial retheme plus expansion

Retoken everything to warm paper and warm ink, add the Fraunces display face, the surface steps, the boundary token, the amber glow, and four new primitives, then rewrite `design.md`.

**Pros**:

- Lands the actual ambition: a memorable, warm, editorial identity.
- The richer token set (raised, boundary, glow) is exactly what later pages need to build fast without inventing styles.
- Still one small owned system; no framework, no kit.

**Cons**:

- A second variable font in the payload, and a bigger diff to review.
- A serif display is a committed taste; backing out later touches every heading.
- Terracotta on paper has less pop than blue on white, so hierarchy leans harder on type and spacing.

### Option 3: Adopt shadcn/ui and retheme it

Bring in the ready made kit and restyle it warm.

**Pros**:

- Many accessible components immediately, and a large community.

**Cons**:

- The runner up from 0001, and its tradeoffs still stand: a CLI, conventions we do not want, and a house look to fight on a small editorial site.
- The need is still a handful of primitives, now just four more. A kit is weight without payoff.

### Option 4: Rebuild the styling stack (CSS modules or vanilla extract)

Change how styles are written, not just how they look.

**Pros**:

- None that serve this project.

**Cons**:

- Throws away a working Tailwind v4 token pipeline and the project convention for zero visual gain. The look is orthogonal to the pipeline.

## Rationale

Option 2 wins because the complaint is atmosphere, not hue. A recolor (Option 1) would answer the letter of the objection and miss it: the engineer wants a site people remember, and the levers for that are the display serif, the warm canvas, and depth through surfaces. Option 3 reopens a settled question for components we can own in an afternoon. Option 4 changes nothing a visitor can see.

The timing force decides the migration shape. With exactly one consumer (the preview page), direct replacement is safe and cheap, and it honors the "old and new must not coexist" rule: a strangler migration would leave two token systems alive for no benefit. That window closes the moment the home page feature starts.

The research check settled the concrete facts before writing: Fraunces self hosts through `next/font` with the `opsz` axis requested explicitly; Tailwind v4 natively supports `clamp()` inside `--text-*` tokens, `@theme inline` for variable references, and ships `bg-radial` for the glow; and the computed contrast pairs all pass AA with headroom: terracotta on warm paper at 5.2:1, terracotta on warm ink at 6.7:1, the boundary hairline at 3.4:1 light and 4.6:1 dark. The palette values were picked warm first and then verified, not the reverse.

Two deliberate sub decisions inside the direction. First, amber survives as the glow, not as a second accent: the engineer asked for the "warm ink, warm paper, amber" signature moment but chose terracotta for action color, so amber is demoted to a decorative gradient token that may never carry meaning. The single accent rule survives. Second, depth comes from lightness steps and hairlines rather than box shadows, because warm dark canvases turn muddy under stacked shadows, and hairlines keep the editorial calm.

One honest note on the tradeoff: terracotta on warm paper is quieter than blue on white. That is accepted, and it is why the expansion includes the display serif and the surface steps: when the accent pops less, type and composition must carry more of the hierarchy.
