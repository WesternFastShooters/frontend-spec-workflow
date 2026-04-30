# Draft Handoff

`openspec-frontend-project` should not rely on chat history alone when the project already contains discussion-stage draft artifacts.

## Preferred draft tree

When these files or directories exist, read the relevant subset before synthesizing `openspec/`:

```text
planning/
  frontend/
    overview.md
    architecture.md
    decisions.md
    modules/
    contracts/
    scenarios/
    testing/
    references/
    open-questions.md
```

## What each area usually means

- `overview.md`: bounded scope, goals, non-goals, and current delivery slice
- `architecture.md`: layering, module map, boundaries, dependency edges
- `decisions.md`: explicit discussion outcomes that should not be rediscovered from scratch
- `modules/`: module-local draft notes such as nodes, plugins, panels, shells, bridges
- `contracts/`: pre-OpenSpec API and type notes worth converging into formal contracts
- `scenarios/`: user or system scenarios that may later become behaviors or flows
- `testing/`: structured test scenario drafts, coverage rules, risk matrices, and verification hints
- `references/`: copied or normalized source excerpts, screenshots, links, and evidence
- `open-questions.md`: unresolved items that should stay explicit in OpenSpec

## Source priority

Use this order when sources disagree:

1. current user instruction
2. explicit on-disk draft artifacts under `planning/frontend/`
3. other stable project source documents
4. chat history recollection

Do not silently drop draft content just because it was produced earlier in the discussion.
