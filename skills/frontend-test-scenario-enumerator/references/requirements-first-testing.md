# Requirements-First Testing

This reference captures the most important testing-process lessons for AI-assisted frontend teams.

The short version:

- do not let AI derive the expected behavior only from implementation code
- make requirement and interface expectations explicit before asking AI to write test code
- keep a traceable chain from requirement to scenario to automated test

## Why this matters

Coverage can look high while test value is low if the same AI both writes the implementation and later invents tests from that implementation.

That failure mode usually looks like this:

- the code defines behavior implicitly
- the test mirrors that behavior
- mocks are shaped to make the test pass
- the coverage report rises without proving the intended business behavior

The scenario-enumeration step exists to break that loop.

## Preferred workflow

Use this order:

1. requirement or interface is written down
2. discussion produces accepted scenario records
3. implementation is built against those scenarios
4. later AI test authors generate test code from `scenario + contract + code`, not from `code only`

## What this skill should produce

The testing draft should make later automation work safer by giving downstream test authors:

- stable scenario IDs
- preconditions
- input or action
- expected observable result
- priority
- verification layer
- notes about required mocks or external dependencies

## Scenario design reminders

Always prefer scenario statements that can be reviewed without reading the implementation first.

Good scenario sources:

- requirement docs
- interface definitions
- accepted business rules
- interaction specifications
- explicit acceptance criteria

Weaker sources:

- current code behavior alone
- incidental state shape
- internal helper method structure

## Required traceability

Aim to preserve a chain like:

`requirement -> scenario id -> later automated test`

That makes later review and change impact analysis much easier.

## Conflict handling

If the implementation appears to disagree with the accepted scenario intent, downstream AI test authors should surface the conflict instead of rewriting the scenario to match the code.

This skill should therefore make expected results explicit enough that later agents can notice mismatches.

## Mocking guidance for later test authors

This skill does not write test code, but its notes should help later agents avoid bad mocking habits.

Prefer notes that distinguish:

- external dependencies that may need mocking
- business behavior that should stay real and be asserted through observable outputs

Do not encourage scenario records that depend on mocking the very behavior being verified.
