# Draft Handoff

`openspec-frontend-project` should not rely on chat history alone when the project already contains discussion-stage draft artifacts.

## Preferred draft tree

When these files or directories exist, read the relevant subset before synthesizing `openspec/`:

```text
planning/
  frontend/
    frontend-discussion-draft.md
    modules/
    contracts/
    scenarios/
    testing/
      test-scenarios-draft.md
    references/
    open-questions.md
```

## What each area usually means

- `frontend-discussion-draft.md`: the canonical discussion-stage summary for the bounded slice, including scope, requirement clarity, design references, architecture direction, module split, contracts, critical paths, decisions, and open questions
- `modules/`: module-local draft notes such as nodes, plugins, panels, shells, bridges
- `contracts/`: pre-OpenSpec API and type notes worth converging into formal contracts
- `scenarios/`: user or system scenarios that may later become behaviors or flows
- `testing/`: testing-draft entry points and optional support matrices, including `test-scenarios-draft.md`, scenario records, coverage rules, risk matrices, and verification hints
- `references/`: copied or normalized source excerpts, screenshots, links, and evidence
- `open-questions.md`: unresolved items that should stay explicit in OpenSpec

## Source priority

Use this order when sources disagree:

1. current user instruction
2. explicit on-disk draft artifacts under `planning/frontend/`
3. other stable project source documents
4. chat history recollection

Do not silently drop draft content just because it was produced earlier in the discussion.
