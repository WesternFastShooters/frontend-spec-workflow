# Testing Draft Output Structure

Use this structure for discussion-stage frontend testing drafts:

```text
planning/
  frontend/
    testing/
      overview.md
      flow-matrix.yaml
      interaction-matrices/
      environment-matrix.yaml
      data-variants.yaml
      coverage-rules.yaml
      high-risk-pairs.yaml
      verification-layer-map.yaml
      assertion-hints.md
      open-questions.md
```

## File meanings

- `overview.md`: what slice is being covered, what is intentionally out of scope
- `flow-matrix.yaml`: key business paths and flow-level combinations
- `interaction-matrices/`: per-component or per-module interaction combinations
- `environment-matrix.yaml`: viewport, scroll, layering, zoom, embedding, and related conditions
- `data-variants.yaml`: happy path, empty, boundary, malformed, and stateful data variations
- `coverage-rules.yaml`: must-cover categories and pruning rules
- `high-risk-pairs.yaml`: risky pairings or triples worth prioritizing
- `verification-layer-map.yaml`: what belongs to logic-unit, component-unit, integration, and journey
- `assertion-hints.md`: important assertion focus such as visibility, coverage, not-covered, rollback, sync
- `open-questions.md`: unknowns that still block good scenario coverage
