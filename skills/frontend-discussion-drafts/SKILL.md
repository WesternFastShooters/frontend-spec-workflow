---
name: frontend-discussion-drafts
description: Installable skill for frontend projects that writes already-discussed planning material into stable, reviewable draft documents under planning/frontend/ before OpenSpec convergence. Use when discussion context should be turned into project-local drafts instead of being left only in chat history.
---

# Frontend Discussion Drafts

Use this skill during discussion when the team has already produced enough clarity to write down a bounded slice, but it is still too early to finalize `openspec/`.

This skill is for draft stabilization, not final spec convergence.

Recommended trigger phrase: `/frontend-spec-workflow-draft`

Suggested invocation shape:

```text
/frontend-spec-workflow-draft
Scope: <bounded frontend slice>
Write draft artifacts under planning/frontend/.
Use the current discussion plus the relevant source documents.
```

## Responsibility

This skill is responsible for:

- turning already-discussed frontend context into reviewable draft files under `planning/frontend/`
- preserving confirmed decisions, assumptions, open questions, and source trace
- keeping project knowledge on disk so later agents do not depend on volatile chat history

This skill is not responsible for:

- finalizing OpenSpec assets
- writing production implementation code
- silently closing unresolved architectural or product questions

## Output shape

Read [references/output-structure.md](references/output-structure.md) before creating or updating files.

Default destination:

- `planning/frontend/overview.md`
- `planning/frontend/architecture.md`
- `planning/frontend/decisions.md`
- `planning/frontend/modules/`
- `planning/frontend/contracts/`
- `planning/frontend/scenarios/`
- `planning/frontend/references/`
- `planning/frontend/open-questions.md`

Use the `testing/` subtree only when the discussion specifically enters scenario coverage and verification planning. That area is primarily owned by `frontend-test-scenario-enumerator`.

## Templates

If you need a starting point, adapt the relevant templates from `assets/templates/`:

- `overview.md.tpl`
- `architecture.md.tpl`
- `decisions.md.tpl`
- `module-brief.md.tpl`
- `open-questions.md.tpl`

Do not copy templates blindly. Keep only the sections that help the current bounded slice.

## Writing method

1. Confirm the bounded slice being discussed.
2. Read only the source materials that matter for that slice.
3. Separate inputs into:
- confirmed decisions
- assumptions
- open questions
- evidence or source trace
4. Write stable project-local drafts instead of leaving important conclusions only in the chat transcript.
5. Prefer updating existing draft files over creating scattered one-off notes.

## Draft rules

- Keep these files human-reviewable.
- Keep them concrete enough that a later solidify step can consume them.
- Distinguish facts from inferences.
- Record where a key decision came from when that provenance matters.
- Do not pretend draft artifacts are already final OpenSpec.

## Completion bar

The draft pass is in good shape when:

- a teammate can review the current bounded slice on disk
- a later agent can find the architecture, module, and contract drafts without replaying the whole discussion
- unresolved items are explicit instead of buried in chat history
