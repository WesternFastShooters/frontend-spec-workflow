# Source Of Truth

This skill generates test code from accepted intent, not from code alone.

Use this priority order when deciding what a test should expect:

1. current user instruction
2. accepted requirement or interface statements
3. `openspec/`
4. testing drafts under `planning/frontend/testing/`
5. implementation details

## Core rule

Implementation code helps determine how to write the test.
It does not, by itself, define what the expected behavior should be.

## Why this matters

If AI writes code and later writes tests only by reading that code, it can create high-coverage but low-value tests that merely mirror accidental behavior.

## Practical consequence

- derive expected results from requirements, contracts, scenario drafts, and OpenSpec constraints
- use implementation details to locate files, fixtures, selectors, and integration seams
- if accepted scenario intent conflicts with implementation behavior, surface the mismatch explicitly
