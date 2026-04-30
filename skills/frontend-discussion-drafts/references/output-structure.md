# Draft Output Structure

Use this draft tree as the default destination for discussion-stage frontend artifacts:

```text
planning/
  frontend/
    frontend-discussion-draft.md
```

Optional support files when the slice grows beyond a clean single draft:

```text
planning/
  frontend/
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

- `frontend-discussion-draft.md`: the canonical discussion-stage entry point for the current slice, including scope, requirement clarity, architecture direction, module split, contracts, behaviors, key flows, decisions, and open questions
- `modules/`: per-module drafts such as editor core, shell panels, nodes, plugins, bridges
- `contracts/`: pre-OpenSpec type and interface notes
- `scenarios/`: early behaviors or flows not yet formalized
- `references/`: copied excerpts, links, screenshots, or normalized evidence
- `open-questions.md`: unresolved items when the main draft's open-question section becomes too large
- `testing/`: discussion-stage scenario coverage artifacts owned mainly by `frontend-test-scenario-enumerator`

## Keep it clean

- Do not write final OpenSpec files here.
- Do not mix polished visual spec prose into unrelated module drafts.
- Do not duplicate the same decision across many files when one canonical draft will do.
- Prefer one strong draft file plus a few purposeful attachments over many tiny notes.
