# Scope: Personal portfolio (Juan Akbar Indrian)

A stunning English portfolio for a full stack developer, built to win client work and interest recruiters. Every visitor journey is finished and polished before the next one starts.

**Build approach:** Journey (one complete visitor journey, fully polished, before the next).
**Workflow:** Alpha (after `/develop`, run `/check verify`; no separate test suite by default). `/architect` is still the first stop for a feature with a real decision, skippable when you already know the build.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| #   | Feature                       | Phase            | Status           |
| --- | ----------------------------- | ---------------- | ---------------- |
| A   | Next.js scaffold              | Foundation       | existing         |
| 1   | Coding standards & tooling    | Foundation       | done             |
| 2   | Design system & UI foundation | Foundation       | needs a decision |
| 3   | Home & hero                   | First impression | planned          |
| 4   | Projects & case studies       | Proof            | needs a decision |
| 5   | About & experience            | Trust            | planned          |
| 6   | Contact & CV                  | Act              | planned          |
| 7   | SEO & social sharing          | Polishing        | planned          |
| 8   | Analytics                     | Polishing        | needs a decision |

## Foundations

### A. Next.js scaffold · existing

Next.js 16 with Tailwind already scaffolds and boots. The foundation stack exists; features build on top. code in `app/`

### 1. Coding standards & tooling · done

Capture conventions, then install lint and format checks so every later feature follows the same rules.
**Done when:** root `AGENTS.md` reflects the real stack and lint runs clean.

- [x] Capture conventions + tooling: `/audit`
- [x] Install the tooling: `/develop tooling`

### 2. Design system & UI foundation · needs a decision

The visual language: color tokens (light and dark), type, spacing, and base components, so every section feels cohesive and premium. This sets the bar for the whole site.
**Done when:** `design.md` covers color, type, spacing, and components; base components handle focus and keyboard; both palettes are defined.

- [ ] Design it (spec): `/architect design system & UI foundation`

## First impression

### 3. Home & hero

The landing experience: name, role, a one line pitch, navigation, hero visual, dark mode toggle, responsive on every screen size. Finished and polished before anything else.
**Done when:** a first time visitor understands who he is and what he does in seconds; navigation works; the page is fast; the dark mode toggle works.

- [ ] Build it: `/develop home & hero`

## Proof

### 4. Projects & case studies · needs a decision

The proof journey: real projects shown as case studies, each with problem, role, stack, and result, so clients and recruiters see capability quickly.
**Done when:** a visitor scans the work at a glance and can open any project for the full story; content comes from real projects.

- [ ] Design it (spec): `/architect projects & case studies`

## Trust

### 5. About & experience

The trust journey: bio, work history, and skills, making him credible and easy to work with.
**Done when:** a visitor understands his background, what he is good at, and the kind of work he does.

- [ ] Build it: `/develop about & experience`

## Act

### 6. Contact & CV

The conversion step: clear email and LinkedIn links plus a download CV button, so a client or recruiter reaches out in one click.
**Done when:** contact links and the CV download work and are one click from anywhere.

- [ ] Build it: `/develop contact & CV`

## Polishing

### 7. SEO & social sharing

Metadata, social cards, sitemap, and structured data so the site ranks in search and previews well when shared.
**Done when:** every page has proper metadata and sharing the site shows a good preview.

- [ ] Build it: `/develop SEO & social sharing`

### 8. Analytics · needs a decision

Measure visits and key clicks so he learns what works. Choosing an analytics provider is a decision.
**Done when:** pageviews and key clicks are recorded without slowing the site.

- [ ] Design it (spec): `/architect analytics`

## Deferred

Out of scope for the current pass, kept so the plan stays honest.

- **Blog**: long form writing for search over time · needs a decision
- **Contact form**: an in site form instead of direct links · needs a decision
- **Multi language**: a toggle between English and Indonesian

## Legend

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **needs a decision** = run `/architect` first; otherwise go straight to `/develop`.
- **Status** `planned` → `in-progress` → `done`, plus `existing` (pre-workflow) and `dropped` (de-scoped, kept for history).
- **Workflow** (header line) is the project default: **Alpha** = after `/develop`, `/check verify`; no test suite by default. A feature can carry its own tag (e.g. `· Beta`) for more or less rigor.
- **Approach tag** beside a heading overrides the project default build approach for that feature; no tag inherits Journey.
