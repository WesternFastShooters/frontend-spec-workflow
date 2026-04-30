# Scenario Design Methods

When turning requirements, interfaces, or behavior notes into test scenarios, use explicit design methods instead of intuition alone.

## Start from the requirement or interface

Do not start from implementation code when the goal is to enumerate the intended test surface.

Prefer this order:

1. requirement or requirement statement
2. interface or contract definition
3. behavior description
4. current draft artifacts
5. implementation details only as supporting context

## Stable scenario record

Every scenario record should try to include:

- `id`
- `title`
- `source`
- `preconditions`
- `input_or_action`
- `expected_result`
- `priority`
- `verification_layer`
- `notes_or_unknowns`

This makes later test-code generation traceable.

## Recommended methods

### Equivalence classes

Split inputs or actors into meaningful valid and invalid groups.

Examples:

- valid user vs disabled user vs missing user
- empty selection vs text selection vs node selection
- supported file type vs unsupported file type

### Boundary values

Force explicit discussion of edge values.

Examples:

- 0, 1, max, max + 1
- first item, last item
- start of day, end of day

### State machine or lifecycle

Model states and legal transitions.

Examples:

- idle -> loading -> success -> error
- created -> paid -> shipped -> canceled
- selection created -> command applied -> undo -> redo

### Decision table

Use when multiple conditions interact and can produce many combinations.

Examples:

- role + feature flag + data state
- viewport + layering + interaction mode

## Interface-specific prompts

When commands, APIs, or service interfaces are involved, explicitly cover:

- happy path
- invalid or missing parameters
- permission or auth differences
- dependency failure
- idempotency or repeated request behavior
- security-sensitive outcomes

## Traceability

The scenario draft should make it easy to build and review a chain like:

`requirement -> scenario id -> later automated test`

Do not leave scenario records anonymous if you expect later automation work.
