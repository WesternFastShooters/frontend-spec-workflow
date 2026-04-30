---
name: openspec-frontend-project
description: Installable skill for frontend projects that turns already-discussed requirements documents, design notes, legacy references, API notes, and discussion context into durable OpenSpec artifacts under openspec/. Use when the user wants to synthesize or refresh OpenSpec for a frontend project without binding the spec to a specific test runner such as Jest or Playwright.
---

# OpenSpec Frontend Project

Use this skill when a frontend project has fragmented inputs such as requirement docs, design notes, old code, API notes, screenshots, or long discussion history, and the goal is to produce or refresh a project-local `openspec/` tree that AI agents can rely on.

This skill is a convergence step. The user discusses the work in Codex, Claude, or another AI workspace first, then explicitly invokes this skill once the current scope feels clear enough to write down.

Recommended trigger phrase: `/openspec-solidify-frontend-project`

## Responsibility

This skill is responsible for one thing:

- converge already-discussed frontend context into durable, project-local OpenSpec artifacts

In practice that means:

- gather the bounded set of source materials for the current slice
- extract contracts, behaviors, flows, and rules from those materials
- preserve assumptions, open questions, and source trace where needed
- produce `openspec/` files that downstream implementation and verification agents can use as their constraint input

It is not responsible for driving the original product discussion, making hidden design decisions, or writing business implementation code.

## Application Scenarios

Suitable project shapes:

- greenfield frontend project setup
- scoped legacy refactors with clear module or journey boundaries
- net-new feature work inside an existing frontend project

Avoid treating this skill as a one-shot whole-repo migration engine for an entire legacy application.

## Outcome

Produce durable OpenSpec artifacts that:

- capture contracts, behaviors, flows, and rules
- describe verification intent in abstract layers rather than specific test frameworks
- separate system behavior from visual styling concerns
- record assumptions and unresolved questions instead of guessing
- become the durable constraint input for downstream implementation, test-generation, and verification work inside the current scope

The invocation itself is the user's signal that the current scope should be converged. Do not re-open product decisions unless the inputs are still contradictory or materially incomplete.

## Do not do these things

- Do not treat OpenSpec as a prose-only document dump.
- Do not write framework-specific testing requirements into OpenSpec.
- Do not put styling fidelity, raw CSS guidance, or pixel-level appearance rules into OpenSpec.
- Do not invent selectors, command names, or APIs when the source material is ambiguous.
- Do not replace product discussion or solution design with silent agent decisions.
- Do not generate business implementation code as part of the spec-convergence step.
- Do not attempt to auto-spec an entire large legacy codebase in one pass when the scope has not been bounded.

## Typical Use

Use this skill after a discussion has already produced enough clarity for a bounded slice such as:

- a project bootstrap direction
- a refactor boundary such as `hawk` vs `cougar`
- a module family such as nodes, plugins, commands, or UI shells
- a feature slice such as `history jump`, `undo/redo`, or `hover toolbar`

The invocation means: "take the current agreed context and write it down as OpenSpec."

When using the recommended trigger phrase `/openspec-solidify-frontend-project`, interpret it as a request to solidify the already-discussed frontend scope into durable OpenSpec files rather than to continue product ideation.

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

Use `openspec/references/` to keep normalized source notes, copied excerpts, or source-trace summaries near the spec when that helps preserve provenance for downstream agents.

## Working method

1. Confirm the active convergence scope.
Treat the skill invocation as the user's signal to converge the current discussion. Identify the bounded project slice being written down: greenfield setup, a scoped refactor, or a net-new feature.

2. Gather the real inputs.
Read only the specific requirement docs, design docs, API notes, screenshots, Storybook references, and legacy code pointers that matter for the requested scope.

3. Normalize the truth sources.
Separate the inputs into:
- stable facts
- settled decisions
- inferred structure
- unresolved questions

4. Build OpenSpec from the inside out.
- Contracts define the hard boundaries.
- Behaviors define module-level units.
- Flows define cross-module user journeys.
- Rules define project-wide constraints and coverage expectations.

5. Preserve uncertainty.
When something is not settled, write it down as an assumption or open question rather than silently deciding.

6. Preserve source trace when it matters.
If multiple inputs contributed to a decision, keep that provenance in `openspec/references/` or in the project documents so later agents can see where constraints came from.

7. Keep visual constraints out of OpenSpec.
If styling fidelity matters, point to Storybook stories, screenshots, or visual references instead. Read [references/style-boundary.md](references/style-boundary.md) when the project mixes behavior and appearance concerns.

## File authoring guidance

### `openspec/project/proposal.md`

- Summarize product intent, user value, scope, and non-goals.
- Record the bounded delivery slice that this spec covers.
- Record the source inputs that informed the current convergence pass.
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

1. Identify the bounded scope the user wants to converge right now.
2. Identify which source artifacts are in scope.
3. Synthesize `proposal.md` and `design.md`.
4. Create or refresh contracts.
5. Create the minimum useful behavior units.
6. Create only the highest-value flows.
7. Add rules for verification abstraction, selector sourcing, mock boundaries, and unresolved risks.

## Completion bar

The spec is in good shape when:

- an implementation agent can tell what must be built
- a test-generation agent can tell what should be verified at each abstract layer
- selectors and API shapes come from contracts rather than invention
- unresolved ambiguity is explicit
- the scope is bounded enough that a downstream agent does not need to re-read the entire discussion thread to begin implementation
- multiple input sources have been converged into one durable spec tree instead of leaving the next agent to reconcile them again
