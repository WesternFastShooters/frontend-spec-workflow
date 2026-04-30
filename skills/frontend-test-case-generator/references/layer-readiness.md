# Layer Readiness

Choose the smallest verification layer that matches the current readiness of the code.

## `logic-unit`

Ready when:

- input and output behavior is concrete
- logic can run without page-level wiring
- boundaries and failure modes are already known

## `component-unit`

Ready when:

- a single component has a stable public interface
- visible states and interactions are concrete
- local accessibility and UI behavior can be asserted without full application wiring

## `integration`

Ready when:

- multiple modules are wired together
- contracts and boundary behavior can be exercised end to end inside the module slice
- failure handling across boundaries is meaningful

## `journey`

Ready when:

- the user-visible critical path is implemented
- selectors or locator strategy are stable enough
- data setup and environment bootstrapping are repeatable
- major bridge behavior has already been covered at lower layers

Do not generate `journey` tests just because a flow exists in `openspec/flows/`.
The flow definition comes earlier than E2E readiness.
