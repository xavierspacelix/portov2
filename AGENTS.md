<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portv2

Personal portfolio for Juan Akbar Indrian, built to win client work and interest recruiters.

## Stack

- **Language / Runtime**: TypeScript (strict), Node.js, Bun 1.4.2
- **Framework**: Next.js 16.3.4 (App Router), React 19
- **Key dependencies**: Next.js, React 19, Tailwind CSS v4, ESLint 9
- **Package manager**: Bun

## Build approach

**Journey**: build one complete visitor journey, fully polished, before the next.

## Commands

```bash
bun install          # Install
bun dev              # Dev server
bun run build        # Build
bun run lint         # Lint
bunx tsc --noEmit    # Typecheck
```

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title.md`.

## Tooling

ESLint 9 (installed) plus Prettier. A pre-commit hook runs lint, format, and typecheck. Testing gate is typecheck plus manual `/check verify` (Alpha, no test suite). CI runs lint, typecheck, and build on push.

## Git

- integration: on
- branch prefix: feat/
- commit: per-milestone

## Rules

- Pure functions by default; keep data immutable (`const`, `readonly`) with no shared mutable state; push side effects (I/O, network, state) to the edges.
- Compose functions over inheritance; prefer `map`/`filter`/`reduce` over imperative loops; avoid classes where a plain function works.
- Avoid `null`; use `undefined` with unions, and return errors explicitly instead of throwing for expected failures.
- Strict TypeScript: no `any`, exhaustive types.
- Named exports only, except the default export Next.js requires for pages, layouts, and route files; organize by feature and colocate components, styles, and logic.
- Accessibility baseline WCAG AA: keyboard reachable and screen reader friendly UI.
- Conventional commit messages (`feat:`, `fix:`, `docs:`).

## Agent skills

- [vercel-react-best-practices](.agents/skills/vercel-react-best-practices/): `vercel-labs/agent-skills`, React and Next.js performance guidelines.
- [vercel-composition-patterns](.agents/skills/vercel-composition-patterns/): `vercel-labs/agent-skills`, scalable React composition and React 19 APIs.
- [nextjs-app-router-patterns](.agents/skills/nextjs-app-router-patterns/): `wshobson/agents`, App Router routing and data fetching patterns.
- [tailwind-4-docs](.agents/skills/tailwind-4-docs/): `lombiq/tailwind-agent-skills`, Tailwind v4 docs and v3 to v4 migration gotchas.
- [tailwind-v4-shadcn](.agents/skills/tailwind-v4-shadcn/): `secondsky/claude-skills`, Tailwind v4 plus shadcn theming.
- [typescript-best-practices](.agents/skills/typescript-best-practices/): `cursor/plugins`, strict TypeScript conventions.

MCP servers: next-devtools-mcp (recommended)

## Context files

<!-- Nested AGENTS.md files are listed here as they are created -->

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
