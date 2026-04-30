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
- converting requirement, interface, and behavior discussions into traceable scenario records
- enumerating scenario dimensions beyond happy-path requirements
- identifying high-risk pairs and coverage rules so later agents do not under-test critical behavior

This skill is not responsible for:

- generating final Playwright, component-test, or unit-test files
- deciding unresolved product behavior without surfacing the ambiguity
- replacing the later OpenSpec convergence step

## Output shape

Read [references/output-structure.md](references/output-structure.md) before writing files.
Read [references/scenario-dimensions.md](references/scenario-dimensions.md) before expanding coverage.
Read [references/scenario-design-methods.md](references/scenario-design-methods.md) before turning requirements or interfaces into scenarios.
Read [references/requirements-first-testing.md](references/requirements-first-testing.md) before converting accepted requirements into scenario drafts that later AI test authors can trust.

Default destination:

- `planning/frontend/testing/test-scenarios-draft.md`

Optional support locations when the slice is large or highly combinatorial:

- `planning/frontend/testing/scenario-records.md`
- `planning/frontend/testing/flow-matrix.yaml`
- `planning/frontend/testing/interaction-matrices/`
- `planning/frontend/testing/environment-matrix.yaml`
- `planning/frontend/testing/data-variants.yaml`
- `planning/frontend/testing/interface-matrix.yaml`
- `planning/frontend/testing/coverage-rules.yaml`
- `planning/frontend/testing/high-risk-pairs.yaml`
- `planning/frontend/testing/verification-layer-map.yaml`
- `planning/frontend/testing/assertion-hints.md`
- `planning/frontend/testing/open-questions.md`

## Templates

If you need a starting point, adapt the relevant templates from `assets/templates/`:

- `test-scenarios-draft.md.tpl`
- `overview.md.tpl`
- `scenario-records.md.tpl`
- `flow-matrix.yaml.tpl`
- `environment-matrix.yaml.tpl`
- `interface-matrix.yaml.tpl`
- `coverage-rules.yaml.tpl`
- `high-risk-pairs.yaml.tpl`
- `verification-layer-map.yaml.tpl`

Use these as scaffolding for the current bounded slice rather than as a universal schema.

## Coverage method

Start from a bounded feature, module, or journey and expand coverage across these dimensions:

- requirement and interface intent
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
Every scenario should have a stable scenario ID so later test code can trace back to it.
Prefer requirement-first scenario design over implementation-first case invention.
Write or refresh the canonical testing draft first, then split into extra matrices only when that adds review value.

## Enumeration rules

1. Begin with the current bounded slice, not the whole product.
2. Read the current draft artifacts first, especially `planning/frontend/frontend-discussion-draft.md` and any requirement, architecture, contract, scenario, and open-question drafts under `planning/frontend/`.
3. Treat approved requirement statements, interface definitions, and accepted business rules as the truth source for expected behavior instead of reverse-engineering intent from the current implementation.
4. If requirement or interface clarity is weak, record that weakness and enumerate scenarios against the best-known requirement statement instead of silently inventing product behavior.
5. Enumerate candidate scenarios by combining dimensions and by applying explicit scenario-design methods instead of relying on memory.
6. Make scenario-to-requirement traceability explicit so later test-code generation can map `requirement -> scenario id -> automated test`.
7. Add pruning rules so the result stays reviewable.
8. Mark:
- must-cover scenarios
- high-risk pairs
- deferred combinations
- unknowns that block reliable test planning
9. Keep the result ready for later OpenSpec convergence and later test-code generation.

## Downstream test-code guidance

This skill does not generate final unit-test or E2E files, but it should prepare the exact material a later test-code agent will need.

Make the testing draft support these downstream rules:

- later test authors should generate tests from the accepted scenario set, not from coverage chasing alone
- later test authors should detect and surface `scenario vs implementation` conflicts instead of silently aligning expectations to current code
- later test authors should avoid asserting private implementation details when an observable contract is available
- later test authors should only mock external dependencies and environment boundaries, not the business behavior being verified
- later test authors should be able to point each generated test back to a stable scenario ID

## What to challenge

When reviewing discussion output, explicitly challenge whether it covers:

- whether the expected result comes from requirement or interface truth rather than from current code behavior
- requirement and interface acceptance criteria
- empty, min, max, and malformed data
- loading, error, retry, rollback, and recovery
- hover, focus, keyboard, drag, selection, and scroll combinations
- viewport, zoom, layering, modal, sticky, and embedding environments
- timing races, duplicate actions, rapid repeated input, and async re-entry
- permission differences, feature flags, and config switches
- browser or platform assumptions when they materially affect behavior
- idempotency, dependency failure, and security-sensitive cases when APIs or commands are involved

## Completion bar

The scenario draft is in good shape when:

- requirement and interface intent has been translated into stable scenario records with IDs
- the expected results are sourced from requirements or contracts rather than inferred from current implementation behavior
- the next agent can see what must be covered at each verification layer
- major scenario dimensions are explicit rather than implied
- high-risk pairs are called out instead of buried
- the testing draft can be consumed by `openspec-frontend-project` without replaying the discussion
