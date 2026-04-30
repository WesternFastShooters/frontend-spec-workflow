# Testing Draft Output Structure

Use this structure for discussion-stage frontend testing drafts:

```text
planning/
  frontend/
    testing/
      test-scenarios-draft.md
```

Optional support files when the slice is too large for one draft:

```text
planning/
  frontend/
    testing/
      scenario-records.md
      flow-matrix.yaml
      interaction-matrices/
      environment-matrix.yaml
      data-variants.yaml
      interface-matrix.yaml
      coverage-rules.yaml
      high-risk-pairs.yaml
      verification-layer-map.yaml
      assertion-hints.md
      open-questions.md
```

## File meanings

- `test-scenarios-draft.md`: canonical testing-draft entry point for the slice, including coverage intent, major scenario groups, risk focus, verification-layer mapping, and open questions
- `scenario-records.md`: stable scenario IDs and structured records that can later map to automated tests
- `flow-matrix.yaml`: key business paths and flow-level combinations
- `interaction-matrices/`: per-component or per-module interaction combinations
- `environment-matrix.yaml`: viewport, scroll, layering, zoom, embedding, and related conditions
- `data-variants.yaml`: happy path, empty, boundary, malformed, and stateful data variations
- `interface-matrix.yaml`: command, API, or service-facing scenario matrix when interfaces are part of the slice
- `coverage-rules.yaml`: must-cover categories and pruning rules
- `high-risk-pairs.yaml`: risky pairings or triples worth prioritizing
- `verification-layer-map.yaml`: what belongs to logic-unit, component-unit, integration, and journey
- `assertion-hints.md`: important assertion focus such as visibility, coverage, not-covered, rollback, sync
- `open-questions.md`: unknowns that still block good scenario coverage

## Keep it clean

- Prefer one strong testing draft plus only the matrices that materially improve traceability.
- Do not split files just because a template exists.
