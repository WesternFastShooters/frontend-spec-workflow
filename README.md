# Frontend Spec Workflow

`@westernfastshooters/frontend-spec-workflow` is a Codex frontend workflow package and plugin shape for teams that want discussion-stage drafts, test planning, test generation, and a later OpenSpec convergence step.

## Bundled Skills

This package now bundles a small frontend engineering skill stack:

- `frontend-discussion-drafts`
  Writes already-discussed project context into stable, reviewable draft documents under `planning/frontend/` instead of leaving important decisions trapped in chat history.
  Recommended trigger: `/frontend-spec-workflow-draft`
- `frontend-test-scenario-enumerator`
  Enumerates frontend test scenarios as structured draft assets during discussion, with strong coverage across flows, interactions, environments, data variants, failure cases, and risk pairs.
  Recommended trigger: `/frontend-spec-workflow-enumerate-tests`
- `frontend-test-case-generator`
  Generates concrete unit, component, integration, and Playwright journey test code from accepted requirements, OpenSpec assets, testing drafts, and current implementation.
  Recommended trigger: `/frontend-spec-workflow-generate-tests`
- `openspec-frontend-project`
  Reads the draft artifacts and other source materials, then converges them into durable OpenSpec assets under `openspec/`.
  Recommended trigger: `/frontend-spec-workflow-solidify-openspec`

## Draft-First Workflow

The intended workflow is:

1. Discuss a bounded project slice in Codex, Claude, or another AI workspace.
2. Use `frontend-discussion-drafts` with `/frontend-spec-workflow-draft` to write stable planning artifacts into `planning/frontend/`.
3. Use `frontend-test-scenario-enumerator` with `/frontend-spec-workflow-enumerate-tests` to expand and structure the candidate verification space in `planning/frontend/testing/`.
4. Use `openspec-frontend-project` with `/frontend-spec-workflow-solidify-openspec` to turn the draft tree plus other sources into `openspec/`.
5. Use `frontend-test-case-generator` with `/frontend-spec-workflow-generate-tests` when the bounded slice is ready for real test files at the correct verification layer.

This makes the discussion phase reviewable on disk before formal OpenSpec convergence begins.

## Shared Draft Tree

The discussion-stage skills share a preferred draft location:

```text
planning/
  frontend/
    frontend-discussion-draft.md
    modules/
    contracts/
    scenarios/
    testing/
      test-scenarios-draft.md
    references/
    open-questions.md
```

The test-scenario skill typically adds a canonical testing draft plus optional support files:

```text
planning/
  frontend/
    testing/
      test-scenarios-draft.md
      scenario-records.md
      flow-matrix.yaml
      interaction-matrices/
      environment-matrix.yaml
      data-variants.yaml
      interface-matrix.yaml
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

## Recommended Triggers

- `/frontend-spec-workflow-draft`
  Write the current bounded frontend discussion into draft artifacts under `planning/frontend/`.
- `/frontend-spec-workflow-enumerate-tests`
  Expand the current bounded frontend testing surface into structured scenario drafts under `planning/frontend/testing/`.
- `/frontend-spec-workflow-generate-tests`
  Generate concrete frontend test files from accepted scenarios, OpenSpec constraints, and current implementation.
- `/frontend-spec-workflow-solidify-openspec`
  Converge the draft tree and other source materials into durable OpenSpec assets under `openspec/`.

## Copyable Trigger Templates

Use these as starting points in Codex or another AI workspace.

### Draft Discussion Output

```text
/frontend-spec-workflow-draft
Scope: <bounded feature / module / refactor slice>
Write draft artifacts under planning/frontend/.
Sources to consume:
- current discussion context
- <requirement docs>
- <design notes>
- <legacy code pointers>
- <screenshots or Storybook references>
Focus:
- overview
- architecture
- confirmed decisions
- module briefs
- open questions
```

### Enumerate Frontend Test Scenarios

```text
/frontend-spec-workflow-enumerate-tests
Scope: <bounded feature / module / journey>
Write testing drafts under planning/frontend/testing/.
Enumerate coverage across:
- flows
- interactions
- environments
- data variants
- failure and recovery
- high-risk pairs
- verification layers
Return:
- must-cover scenarios
- pruned/deferred combinations
- open questions that block reliable coverage
```

### Solidify Into OpenSpec

```text
/frontend-spec-workflow-solidify-openspec
Scope: <bounded feature / module / refactor slice>
Read planning/frontend/ first, then other source materials.
Converge the agreed context into openspec/.
Preserve:
- assumptions
- open questions
- source trace
Do not invent missing contracts, selectors, or APIs.
```

### Generate Frontend Test Files

```text
/frontend-spec-workflow-generate-tests
Scope: <bounded module / component / flow>
Target layer: <logic-unit | component-unit | integration | journey>
Read openspec/ and planning/frontend/testing/ first.
Generate concrete test files.
Rules:
- expected behavior comes from accepted scenarios and contracts first
- preserve scenario-id traceability
- mock only external dependencies
- do not generate journey tests before the path is integration-ready
```

## OpenSpec Skill Trigger

Use `/frontend-spec-workflow-solidify-openspec` as the team-facing trigger phrase when the current frontend scope has been discussed clearly enough and the next step is to write the agreed context into OpenSpec.

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

## Plugin Shape

This repo can also be treated as a Codex workflow plugin shape rather than only a raw skill bundle.

The plugin manifest lives at:

- `.codex-plugin/plugin.json`

Conceptually, the plugin bundles:

- skills
- team-facing slash triggers
- agent metadata under each skill's `agents/openai.yaml`

Its purpose is to provide an OpenSpec-based frontend delivery workflow for:

- project bootstrap
- feature implementation
- bounded refactor delivery

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
npx @westernfastshooters/frontend-spec-workflow --tool codex --skill frontend-discussion-drafts --skill frontend-test-scenario-enumerator --skill frontend-test-case-generator
```
