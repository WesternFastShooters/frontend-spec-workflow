verification_layers:
  contract:
    purpose: Validate interface shapes, selector registries, command contracts, and data boundaries.
  logic-unit:
    purpose: Validate pure logic, data transforms, state transitions, and rules.
  component-unit:
    purpose: Validate single-view behavior and user-driven component interaction without full app journeys.
  integration:
    purpose: Validate module-to-module interaction and bridge behavior with controlled dependencies.
  journey:
    purpose: Validate critical user-visible flows that cross module boundaries.

rules:
  - name: framework-agnostic-verification
    description: OpenSpec must name verification intent by abstract layer, not by concrete test runner.
  - name: contract-first
    description: Contracts are written or refreshed before implementation-specific work starts.
  - name: behavior-before-tests
    description: Verification scope must come from contracts, behaviors, and flows rather than ad hoc invention.
  - name: logic-tests-before-logic-implementation
    description: Logic-heavy behaviors should have logic-unit verification skeletons before or alongside implementation work.
  - name: component-tests-at-component-ready
    description: Single-component verification can begin once the component interface and interaction shape are stable, without waiting for full page integration.
  - name: integration-before-journey
    description: Journey-level implementation should follow the point where the relevant modules, routes, and interaction bridges are integrated enough to validate.
  - name: no-early-e2e
    description: Do not author runnable end-to-end tests for a flow until the route, selectors, mocks, and critical UI path are integration-ready.
  - name: tests-are-layer-bound
    description: Each verification layer should validate its own responsibility instead of leaking into higher or lower layers.
  - name: no-free-selector
    description: Selectors and test ids must come from contracts, not ad hoc generation.
  - name: preserve-ambiguity
    description: Unresolved decisions must be recorded explicitly instead of guessed away.
