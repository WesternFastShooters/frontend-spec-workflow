---
name: openspec-frontend-project
description: Installable skill for frontend projects that turns requirements documents, design notes, legacy references, API notes, and discussion context into durable OpenSpec artifacts under openspec/. Use when the user wants to synthesize or refresh OpenSpec for a frontend project without binding the spec to a specific test runner such as Jest or Playwright.
---

# OpenSpec Frontend Project

Use this skill when a frontend project has fragmented inputs such as requirement docs, design notes, old code, API notes, screenshots, or long discussion history, and the goal is to produce or refresh a project-local `openspec/` tree that AI agents can rely on.

## Outcome

Produce durable OpenSpec artifacts that:

- capture contracts, behaviors, flows, and rules
- describe verification intent in abstract layers rather than specific test frameworks
- separate system behavior from visual styling concerns
- record assumptions and unresolved questions instead of guessing

## Do not do these things

- Do not treat OpenSpec as a prose-only document dump.
- Do not write framework-specific testing requirements into OpenSpec.
- Do not put styling fidelity, raw CSS guidance, or pixel-level appearance rules into OpenSpec.
- Do not invent selectors, command names, or APIs when the source material is ambiguous.

## Verification abstraction

Inside OpenSpec, refer to verification by intent:

- `contract`
- `logic-unit`
- `component-unit`
- `integration`
- `journey`

Do not write `jest`, `vitest`, `playwright`, or other runner names into OpenSpec unless the user explicitly asks for an implementation mapping outside the spec itself.

## Output shape

Read [references/output-structure.md](references/output-structure.md) before creating files.

Always target this minimum structure when enough information exists:

- `openspec/project/proposal.md`
- `openspec/project/design.md`
- `openspec/contracts/`
- `openspec/behaviors/`
- `openspec/flows/`
- `openspec/rules/`

Add `openspec/interactions/` and `openspec/environments/` when the project has complex UI interaction matrices or layout/environment risks.

## Working method

1. Gather the real inputs.
Read only the specific requirement docs, design docs, API notes, screenshots, Storybook references, and legacy code pointers that matter for the requested scope.

2. Normalize the truth sources.
Separate the inputs into:
- stable facts
- inferred structure
- unresolved questions

3. Build OpenSpec from the inside out.
- Contracts define the hard boundaries.
- Behaviors define module-level units.
- Flows define cross-module user journeys.
- Rules define project-wide constraints and coverage expectations.

4. Preserve uncertainty.
When something is not settled, write it down as an assumption or open question rather than silently deciding.

5. Keep visual constraints out of OpenSpec.
If styling fidelity matters, point to Storybook stories, screenshots, or visual references instead. Read [references/style-boundary.md](references/style-boundary.md) when the project mixes behavior and appearance concerns.

## File authoring guidance

### `openspec/project/proposal.md`

- Summarize product intent, user value, scope, and non-goals.
- Keep it readable by humans.
- Record major assumptions and open questions.

### `openspec/project/design.md`

- Describe module decomposition, boundaries, dependencies, and key risks.
- Include the critical path only at a high level.
- Do not duplicate low-level contract details here.

### `openspec/contracts/`

- Put strong constraints here: types, API I/O, commands, selector registry, dependency boundaries.
- Prefer structured lists and code-like declarations over narrative prose.
- Centralize global selector or test-id registries instead of duplicating them per flow.

### `openspec/behaviors/`

- One file per behavior unit.
- Each behavior unit should be narrow enough that an implementation agent can work from it without guessing.
- Read [references/behavior-unit.md](references/behavior-unit.md) before creating behavior files.

### `openspec/flows/`

- Use flows for cross-module, user-visible journeys.
- Flows are the source for journey-level verification, not the behavior files alone.
- Read [references/flow-layer.md](references/flow-layer.md) before writing flow files.

### `openspec/rules/`

- Capture project-wide constraints such as contract-first sequencing, selector rules, coverage intent, environment requirements, and CI gates.
- Prefer rules that are reusable across modules.

## Templates

If you need a starting point, copy and adapt only the relevant templates from `assets/templates/`:

- `project-proposal.md.tpl`
- `project-design.md.tpl`
- `behavior-unit.yaml.tpl`
- `flow.yaml.tpl`
- `rules/verification-layers.yaml.tpl`

Do not copy templates blindly. Remove sections that do not apply.

## When the user asks for "generate the spec"

Default to this sequence:

1. Identify which source artifacts are in scope.
2. Synthesize `proposal.md` and `design.md`.
3. Create or refresh contracts.
4. Create the minimum useful behavior units.
5. Create only the highest-value flows.
6. Add rules for verification abstraction, selector sourcing, mock boundaries, and unresolved risks.

## Completion bar

The spec is in good shape when:

- an implementation agent can tell what must be built
- a test-generation agent can tell what should be verified at each abstract layer
- selectors and API shapes come from contracts rather than invention
- unresolved ambiguity is explicit

