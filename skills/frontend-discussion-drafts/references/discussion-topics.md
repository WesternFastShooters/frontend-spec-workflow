# Discussion Topics

Use this checklist to steer a frontend engineering discussion before or during draft writing.

The goal is not to force every topic every time. The goal is to avoid missing critical areas just because the user did not know what to discuss yet.

## Requirement clarity

- Is there a real requirement document, ticket, or PRD?
- If not, what is the current requirement statement in plain language?
- Is the requirement already sufficient to implement?
- Are there obvious gaps, contradictions, or hidden assumptions?
- What is explicitly out of scope?
- What acceptance criteria are already agreed?
- What still depends on verbal consensus rather than written confirmation?

## Product and user behavior

- What user-visible problem is being solved?
- Who are the target users or roles?
- What are the expected user flows?
- What are the key success and failure outcomes?
- Are there tricky edge cases or business rules already known?
- Are there permission, role, or tenant differences?
- Are there onboarding, empty-state, or recovery flows that matter?

## Design and visual references

- Is there UED, Figma, a design system, Storybook, screenshots, or an old product reference?
- Which visual details are fixed and which are still approximate?
- Are there interaction patterns such as drag, hover, keyboard shortcuts, overlays, or animation expectations?
- Are responsive breakpoints, mobile behavior, or container-embedding rules already defined?

## Architecture and technical choices

- What architecture direction is already chosen?
- What technical choices are already fixed?
- What can still change?
- Are there known constraints from legacy systems, frameworks, or deployment targets?
- Are there package, build, runtime, or monorepo constraints?
- Are there requirements around SSR, hydration, offline support, or editor/runtime boundaries?

## Layering

- What layers exist?
- What belongs in each layer?
- What must not cross layer boundaries directly?
- Which concerns must stay framework-agnostic or pure logic?

## Module decomposition

- What modules should exist?
- Which modules are being introduced, refactored, or removed?
- What are the high-risk module boundaries?
- What ownership split exists between core, shell, node/plugin, shared UI, data, and integration code?
- Which modules need to stay independently testable?

## Contracts and behavior

- What interfaces, commands, events, or APIs must be defined?
- What behaviors need structured descriptions?
- What must be observable from outside the module?
- What TS types, payloads, selectors, ids, or registries should become explicit?
- What invariants or state transitions must always hold?

## Data and state

- What core entities, documents, or models are involved?
- What state is local, shared, persisted, cached, or server-sourced?
- What refresh, retry, undo, redo, rollback, or recovery behavior exists?
- Are there ordering, idempotency, or stale-data concerns?

## Integration and critical paths

- What are the key critical paths?
- Which modules must integrate for the slice to be useful?
- What ordering or readiness constraints matter?
- What external services, browser APIs, or host containers are involved?
- What are the failure boundaries and fallback behavior?

## Testing and verification

- What kinds of verification are expected?
- Which scenarios are obvious must-cover items?
- Which scenarios are risky but still unclear?
- Are there environment, layout, permission, or async race concerns?
- Which parts should be verified at contract, logic-unit, component-unit, integration, and journey layers?
- Are there coverage priorities, non-goals, or pruning rules?

## Non-functional constraints

- What browser, device, platform, locale, or accessibility constraints matter?
- Are there performance budgets or large-data concerns?
- Are there analytics, logging, monitoring, or audit requirements?
- Are there security, compliance, privacy, or permission-boundary expectations?
- Are there rollout, feature-flag, migration, compatibility, or rollback requirements?

## Unknowns

- What is still undecided?
- What could block implementation or scenario design?
- What needs explicit follow-up rather than quiet guessing?
