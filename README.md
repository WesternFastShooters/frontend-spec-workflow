# OpenSpec Frontend Project

`@your-org/openspec-frontend-project` is a Codex skill package for frontend teams that discuss a project or feature first, then want to converge the agreed context into durable OpenSpec assets under `openspec/`.

## What This Skill Does

This skill turns already-discussed project materials into project-local spec assets that later AI agents can consume.

Typical inputs include:

- requirement documents
- design notes
- legacy code references
- API notes
- screenshots
- long discussion context from Codex, Claude, or similar tools

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

## Primary Responsibility

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

## What This Skill Does Not Do

This skill does not:

- replace product discussion or architecture decision-making
- silently invent missing selectors, APIs, or command names
- write business implementation code
- embed runner-specific testing instructions such as Jest or Playwright directly into OpenSpec
- act as a one-pass full-repo migration engine for an entire large legacy application

## Typical Workflow

1. Discuss the bounded project slice in Codex, Claude, or another AI workspace.
2. Reach enough clarity on scope, boundaries, and intended behavior.
3. Invoke this skill to converge the current context into `openspec/`.
   Recommended trigger phrase: `/openspec-solidify-frontend-project`
4. Use the generated OpenSpec as the durable constraint input for downstream implementation, test generation, and verification work.

## Recommended Trigger

Use `/openspec-solidify-frontend-project` as the team-facing trigger phrase when the current frontend scope has been discussed clearly enough and the next step is to write the agreed context into OpenSpec.

Treat this trigger as meaning:

- converge the current bounded scope
- preserve ambiguity instead of guessing
- write the result into project-local `openspec/` assets

## Success Criteria

This skill is successful when:

- multiple source materials are converged into one durable spec tree
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
npx @your-org/openspec-frontend-project --tool codex
```
