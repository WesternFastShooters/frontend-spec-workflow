---
name: frontend-test-case-generator
description: Installable skill for frontend projects that generates concrete unit, component, integration, and Playwright end-to-end test code from accepted requirements, OpenSpec assets, testing drafts, and existing implementation. Use when a frontend slice is ready for real test files instead of discussion-stage scenario enumeration.
---

# Frontend Test Case Generator

Use this skill when a frontend project already has enough accepted context to generate real automated test code.

This skill generates test code.

Recommended trigger phrase: `/frontend-spec-workflow-generate-tests`

Suggested invocation shape:

```text
/frontend-spec-workflow-generate-tests
Scope: <bounded module / component / flow>
Target layer: <logic-unit | component-unit | integration | journey>
Read openspec/ and planning/frontend/testing/ first.
Generate concrete test files for the current project stack.
```

## Responsibility

This skill is responsible for:

- generating concrete frontend test code from accepted requirements, contracts, scenario drafts, OpenSpec assets, and implementation
- mapping stable scenario IDs to real test files and test names
- choosing the right verification layer for the current implementation readiness
- keeping tests aligned to observable behavior rather than private implementation details

This skill is not responsible for:

- inventing product behavior that was never confirmed
- replacing discussion-stage scenario design
- forcing end-to-end tests before the target path is integration-ready

## Required inputs

Read the smallest relevant subset of these inputs before generating code:

- `openspec/`
- `planning/frontend/testing/test-scenarios-draft.md`
- `planning/frontend/testing/scenario-records.md`
- `planning/frontend/frontend-discussion-draft.md`
- current implementation files for the bounded scope
- existing test utilities, fixtures, and test conventions in the repo

Read these references before generating tests:

- [references/source-of-truth.md](references/source-of-truth.md)
- [references/layer-readiness.md](references/layer-readiness.md)
- [references/test-generation-rules.md](references/test-generation-rules.md)
- [references/playwright-agent-patterns.md](references/playwright-agent-patterns.md) when generating `journey` tests

## Generation order

Prefer this order unless the user clearly requests otherwise:

1. `logic-unit`
2. `component-unit`
3. `integration`
4. `journey`

Use `journey` only when the critical path is already integration-ready enough to support stable selectors, fixtures, mocks, and assertions.

## Source-of-truth rules

- Expected behavior comes from accepted requirements, interfaces, testing drafts, and OpenSpec constraints before it comes from current implementation behavior.
- Implementation code is evidence for how to wire the test, not the authority for what the test should expect.
- If scenario intent and implementation behavior conflict, surface the conflict explicitly instead of silently aligning the test to the code.

## Layer guidance

### `logic-unit`

- Target pure logic, data transforms, reducers, state machines, adapters, and other behavior with explicit input and output.
- Prefer narrow tests with strong boundary and error coverage.
- Mock only external dependencies or environment boundaries.

### `component-unit`

- Target a single public UI component with its props, emitted events, visible states, accessibility behavior, and local interactions.
- Do not overload a component test with page-level business journeys.
- Prefer observable DOM behavior over internal instance details.

### `integration`

- Target module bridges, contract wiring, command-to-state pipelines, and view-model-to-service connections.
- Assert collaboration boundaries and failure handling across modules.

### `journey`

- Target cross-module, user-visible critical paths.
- Keep flows aligned to `openspec/flows/` and testing drafts.
- Prefer stable locators and explicit readiness checks.
- Do not generate broad E2E coverage before route, selector, and environment stability exist.

## Naming and traceability

- Each generated test should map back to a stable scenario ID when one exists.
- Keep the traceability chain understandable: `requirement -> scenario id -> test file -> test name`.
- Use the repo's existing naming style when present. If no house style exists, prefer clear `should_xxx_when_yyy` names for unit-like tests and flow-oriented names for journey tests.

## Mocking rules

- Mock external services, time, storage, browser APIs, network boundaries, or host integrations when needed.
- Do not mock the business behavior that the test is supposed to validate.
- Prefer test doubles that preserve contract shape.

## Conflict handling

When a confirmed scenario and the current implementation disagree:

- do not silently change the expected result to match the code
- do not generate a misleading passing test
- instead, leave a clear conflict note in the output or test file comments and explain what needs human review

## Playwright guidance

For `journey` tests, borrow the useful parts of the Playwright agent workflow:

- start from an accepted plan or scenario draft
- use or create a seed setup when the app needs repeatable initialization
- keep generated tests aligned to human-readable flow specs
- stabilize selectors and assertions against the live UI, not only static code reading

Do not cargo-cult the full planner, generator, and healer loop when the project only needs a small bounded update.

## Completion bar

The generation pass is in good shape when:

- generated tests clearly map to accepted scenarios or OpenSpec constraints
- the chosen verification layer matches implementation readiness
- mocks stay outside the behavior being verified
- tests assert observable behavior rather than private implementation details
- `journey` tests are only generated for integration-ready critical paths
