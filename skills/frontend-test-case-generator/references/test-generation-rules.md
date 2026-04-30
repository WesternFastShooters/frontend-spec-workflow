# Test Generation Rules

## Traceability

Keep the path from accepted intent to generated code visible:

`requirement -> scenario id -> test file -> test case`

When a scenario ID exists, preserve it in comments, titles, or nearby documentation according to repo conventions.

## Observable assertions

Prefer assertions on:

- returned values
- state transitions
- emitted outputs
- visible UI states
- accessible names, roles, and interactions
- contract-level effects

Avoid assertions on:

- private fields
- incidental helper calls
- internal arrays or object shapes that are not part of the contract

## Mocking

Prefer mocking:

- network
- persistence
- time
- browser APIs
- host integrations
- external services

Avoid mocking:

- the core business behavior being verified
- the same command or method whose correctness is under test

## Conflict handling

When a confirmed scenario and current code disagree:

- do not silently rewrite the expectation
- do not generate a misleading green test
- instead, leave a visible conflict note for human review

## Coverage strategy

Do not optimize for raw coverage alone.

Prefer:

- representative happy paths
- boundary values
- invalid inputs
- failure and recovery
- permission and configuration variants
- the highest-risk pairs already identified in scenario drafts
