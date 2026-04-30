# Draft Output Structure

Use this draft tree as the default destination for discussion-stage frontend artifacts:

```text
planning/
  frontend/
    overview.md
    architecture.md
    decisions.md
    modules/
    contracts/
    scenarios/
    references/
    open-questions.md
```

Optional when testing coverage is in scope:

```text
planning/
  frontend/
    testing/
```

## File meanings

- `overview.md`: goal, scope, non-goals, current delivery slice
- `architecture.md`: layers, module boundaries, dependencies, high-risk edges
- `decisions.md`: explicit discussion outcomes worth freezing before OpenSpec
- `modules/`: per-module drafts such as editor core, shell panels, nodes, plugins, bridges
- `contracts/`: pre-OpenSpec type and interface notes
- `scenarios/`: early behaviors or flows not yet formalized
- `references/`: copied excerpts, links, screenshots, or normalized evidence
- `open-questions.md`: unresolved items

## Keep it clean

- Do not write final OpenSpec files here.
- Do not mix polished visual spec prose into unrelated module drafts.
- Do not duplicate the same decision across many files when one canonical draft will do.
