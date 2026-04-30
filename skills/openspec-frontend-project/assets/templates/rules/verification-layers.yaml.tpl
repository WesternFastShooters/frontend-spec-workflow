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
  - name: no-free-selector
    description: Selectors and test ids must come from contracts, not ad hoc generation.
  - name: preserve-ambiguity
    description: Unresolved decisions must be recorded explicitly instead of guessed away.
