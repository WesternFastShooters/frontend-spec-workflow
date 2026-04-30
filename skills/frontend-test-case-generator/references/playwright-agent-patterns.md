# Playwright Agent Patterns

This reference captures the parts of Playwright Test Agents that are most useful for this skill.

Based on Playwright's official `test-agents` documentation, the workflow is organized around three roles:

- `planner`: explores the app and creates a human-readable Markdown plan
- `generator`: turns that plan into executable Playwright tests
- `healer`: reruns and repairs failing tests within guardrails

For this skill, the important lessons are the structure and sequencing rather than the exact tooling loop.

## What to borrow

- Start from a human-readable plan or accepted scenario draft, not from raw code alone.
- Use a seed setup when the app needs repeatable initialization, fixtures, or auth state.
- Keep generated tests aligned to one accepted flow or scenario group at a time.
- Verify selectors and assertions against the real UI when possible.
- Prefer resilient locators, especially role, text, and test id strategies, over brittle structural selectors.
- Prefer Playwright's web-first assertions and readiness checks over arbitrary sleeps.

## Useful artifact pattern

Playwright's docs describe a simple structure:

- `specs/` for human-readable plans
- `tests/seed.spec.ts` for reusable setup
- `tests/` for generated journey tests

For this repo's workflow, the nearest equivalents are:

- `planning/frontend/testing/` or `openspec/flows/` as the planning source
- existing project fixtures or seed setup as the initialization source
- generated Playwright tests under the project's normal E2E location

## When to use this

Apply these patterns when generating `journey` tests for critical user-visible flows.

Do not force the full planner, generator, and healer pattern onto simple unit or component testing tasks.
