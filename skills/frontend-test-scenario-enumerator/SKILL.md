---
name: frontend-test-scenario-enumerator
description: Installable skill for frontend projects that enumerates and structures test scenarios during discussion under planning/frontend/testing/ before OpenSpec convergence. Use when the team wants to maximize coverage by modeling flows, interactions, environments, data variants, failures, and high-risk pairs instead of relying on ad hoc human memory.
---

# Frontend Test Scenario Enumerator

Use this skill during discussion when the team wants to make test coverage explicit before final OpenSpec solidification.

This skill should enumerate scenarios, not generate final test code.

Recommended trigger phrase: `/frontend-spec-workflow-enumerate-tests`

Suggested invocation shape:

```text
/frontend-spec-workflow-enumerate-tests
Scope: <bounded frontend slice>
Write testing drafts under planning/frontend/testing/.
Expand flows, interactions, environments, data variants, failures, and verification layers.
```

## Responsibility

This skill is responsible for:

- expanding frontend test scenarios into a structured draft bundle under `planning/frontend/testing/`
- enumerating scenario dimensions beyond happy-path requirements
- identifying high-risk pairs and coverage rules so later agents do not under-test critical behavior

This skill is not responsible for:

- generating final Playwright, component-test, or unit-test files
- deciding unresolved product behavior without surfacing the ambiguity
- replacing the later OpenSpec convergence step

## Output shape

Read [references/output-structure.md](references/output-structure.md) before writing files.
Read [references/scenario-dimensions.md](references/scenario-dimensions.md) before expanding coverage.

Default destination:

- `planning/frontend/testing/overview.md`
- `planning/frontend/testing/flow-matrix.yaml`
- `planning/frontend/testing/interaction-matrices/`
- `planning/frontend/testing/environment-matrix.yaml`
- `planning/frontend/testing/data-variants.yaml`
- `planning/frontend/testing/coverage-rules.yaml`
- `planning/frontend/testing/high-risk-pairs.yaml`
- `planning/frontend/testing/verification-layer-map.yaml`
- `planning/frontend/testing/assertion-hints.md`
- `planning/frontend/testing/open-questions.md`

## Templates

If you need a starting point, adapt the relevant templates from `assets/templates/`:

- `overview.md.tpl`
- `flow-matrix.yaml.tpl`
- `environment-matrix.yaml.tpl`
- `coverage-rules.yaml.tpl`
- `high-risk-pairs.yaml.tpl`
- `verification-layer-map.yaml.tpl`

Use these as scaffolding for the current bounded slice rather than as a universal schema.

## Coverage method

Start from a bounded feature, module, or journey and expand coverage across these dimensions:

- business flow
- interaction state
- environment and layout
- data variant
- state transition
- failure and recovery
- role and permission
- timing and concurrency
- accessibility and input mode
- configuration or feature flag
- persistence, refresh, and navigation
- verification layer mapping

Prefer structured matrices over prose-only notes.

## Enumeration rules

1. Begin with the current bounded slice, not the whole product.
2. Enumerate candidate scenarios by combining dimensions instead of relying on memory.
3. Add pruning rules so the result stays reviewable.
4. Mark:
- must-cover scenarios
- high-risk pairs
- deferred combinations
- unknowns that block reliable test planning
5. Keep the result ready for later OpenSpec convergence.

## What to challenge

When reviewing discussion output, explicitly challenge whether it covers:

- empty, min, max, and malformed data
- loading, error, retry, rollback, and recovery
- hover, focus, keyboard, drag, selection, and scroll combinations
- viewport, zoom, layering, modal, sticky, and embedding environments
- timing races, duplicate actions, rapid repeated input, and async re-entry
- permission differences, feature flags, and config switches
- browser or platform assumptions when they materially affect behavior

## Completion bar

The scenario draft is in good shape when:

- the next agent can see what must be covered at each verification layer
- major scenario dimensions are explicit rather than implied
- high-risk pairs are called out instead of buried
- the testing draft can be consumed by `openspec-frontend-project` without replaying the discussion
