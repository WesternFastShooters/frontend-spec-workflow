# Scenario Dimensions

The discussion notes already cover a strong core:

- requirement and interface intent
- flow
- interaction
- environment
- assertion strategy
- pruning and high-risk prioritization

To make the scenario draft more complete during discussion, also expand across these dimensions when relevant:

## Data

- empty
- min and max
- malformed
- partial
- stale
- out-of-order

## State

- idle
- loading
- success
- empty state
- error
- retry
- rollback

## Role and permission

- anonymous vs authenticated
- read-only vs editable
- feature-gated vs allowed

## Timing and concurrency

- repeated clicks
- rapid toggles
- async response races
- duplicate submission
- stale response overwrite

## Accessibility and input mode

- keyboard only
- focus traversal
- hover-less interaction
- screen-reader-relevant state changes

## Persistence and navigation

- refresh after action
- route leave and return
- undo after reload
- saved vs unsaved transitions

## Platform and container

- desktop vs small viewport
- zoom
- sticky headers
- modals
- nested scroll containers
- iframe or embedded host constraints

## Layer mapping

Every scenario should be mapped, when possible, to one or more verification layers:

- `logic-unit`
- `component-unit`
- `integration`
- `journey`

Do not force every combination into runnable test code. The discussion-stage goal is to make the candidate surface explicit, then prune and prioritize it.

## Traceability

Keep scenario IDs stable enough that a later agent can map:

- requirement or interface statement
- scenario record
- test-code implementation
