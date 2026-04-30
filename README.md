# Frontend Spec Workflow

`@westernfastshooters/frontend-spec-workflow` is a Codex skill package for frontend teams that want a discussion-stage draft stack and a later OpenSpec convergence step.

## Bundled Skills

This package now bundles a small frontend engineering skill stack:

- `frontend-discussion-drafts`
  Writes already-discussed project context into stable, reviewable draft documents under `planning/frontend/` instead of leaving important decisions trapped in chat history.
- `frontend-test-scenario-enumerator`
  Enumerates frontend test scenarios as structured draft assets during discussion, with strong coverage across flows, interactions, environments, data variants, failure cases, and risk pairs.
- `openspec-frontend-project`
  Reads the draft artifacts and other source materials, then converges them into durable OpenSpec assets under `openspec/`.

## Draft-First Workflow

The intended workflow is:

1. Discuss a bounded project slice in Codex, Claude, or another AI workspace.
2. Use `frontend-discussion-drafts` to write stable planning artifacts into `planning/frontend/`.
3. Use `frontend-test-scenario-enumerator` to expand and structure the candidate verification space in `planning/frontend/testing/`.
4. Use `openspec-frontend-project` with `/openspec-solidify-frontend-project` to turn the draft tree plus other sources into `openspec/`.

This makes the discussion phase reviewable on disk before formal OpenSpec convergence begins.

## Shared Draft Tree

The discussion-stage skills share a preferred draft location:

```text
planning/
  frontend/
    overview.md
    architecture.md
    decisions.md
    modules/
    contracts/
    scenarios/
    testing/
    references/
    open-questions.md
```

The test-scenario skill typically adds:

```text
planning/
  frontend/
    testing/
      overview.md
      flow-matrix.yaml
      interaction-matrices/
      environment-matrix.yaml
      data-variants.yaml
      coverage-rules.yaml
      high-risk-pairs.yaml
      verification-layer-map.yaml
      assertion-hints.md
      open-questions.md
```

## What The OpenSpec Skill Does

`openspec-frontend-project` turns already-discussed project materials into project-local spec assets that later AI agents can consume.

Typical inputs include:

- requirement documents
- design notes
- legacy code references
- API notes
- screenshots
- long discussion context from Codex, Claude, or similar tools
- project-local draft artifacts under `planning/frontend/`

Typical outputs include:

- `openspec/project/proposal.md`
- `openspec/project/design.md`
- `openspec/contracts/`
- `openspec/behaviors/`
- `openspec/flows/`
- `openspec/rules/`

When interaction risk or layout risk matters, it may also add:

- `openspec/interactions/`
- `openspec/environments/`
- `openspec/references/`

## Primary Responsibility Of The OpenSpec Skill

The responsibility of this skill is to converge fragmented frontend context into durable OpenSpec constraints.

That means it should:

- synthesize a bounded scope, not the whole universe
- write down contracts, behavior units, journey flows, and project rules
- preserve assumptions, open questions, and provenance when inputs are incomplete or conflicting
- keep the resulting spec framework-agnostic so later agents can map it to concrete tooling

## Application Scenarios

Use this skill for:

- greenfield frontend projects
- bounded legacy refactors
- new feature work inside an existing project

Examples:

- splitting a legacy editor into `hawk` and `cougar`
- defining command, plugin, node, and UI boundaries before implementation
- converging discussion output for a feature such as `undo/redo`, `history jump`, or `hover toolbar`

## What This Skill Stack Does Not Do

The bundled skills do not:

- replace product discussion or architecture decision-making
- silently invent missing selectors, APIs, or command names
- write business implementation code
- embed runner-specific testing instructions such as Jest or Playwright directly into OpenSpec
- act as a one-pass full-repo migration engine for an entire large legacy application

## OpenSpec Skill Trigger

Use `/openspec-solidify-frontend-project` as the team-facing trigger phrase when the current frontend scope has been discussed clearly enough and the next step is to write the agreed context into OpenSpec.

Treat this trigger as meaning:

- converge the current bounded scope
- read the shared draft tree under `planning/frontend/` first
- preserve ambiguity instead of guessing
- write the result into project-local `openspec/` assets

## Success Criteria For The OpenSpec Skill

This skill is successful when:

- multiple source materials are converged into one durable spec tree
- the draft artifacts under `planning/frontend/` are consumed instead of ignored
- downstream AI agents can implement against the spec without re-reading the entire discussion
- downstream AI agents can tell which verification layer should be written now versus later
- selectors, APIs, and boundaries come from contracts instead of invention
- unresolved ambiguity is explicit instead of silently guessed away

## Verification Timing

The generated OpenSpec should also encode verification timing, not just verification coverage.

- logic-heavy behaviors should point first to `logic-unit`
- single UI components can point to `component-unit` as soon as their local interface and interactions are stable
- integrated module bridges can point to `integration`
- user-visible critical paths can be described in `flows/` early, but runnable `journey` tests should wait until the relevant path is integration-ready

This helps downstream agents avoid writing end-to-end tests too early or overloading component tests with page-level business assertions.

## Install

```bash
npx @westernfastshooters/frontend-spec-workflow --tool codex
```

If the npm package has not been published yet, use the GitHub source directly:

```bash
npx github:WesternFastShooters/frontend-spec-workflow --tool codex
```

Install a subset if needed:

```bash
npx @westernfastshooters/frontend-spec-workflow --tool codex --skill frontend-discussion-drafts --skill frontend-test-scenario-enumerator
```
