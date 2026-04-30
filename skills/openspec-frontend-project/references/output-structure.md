# Output Structure

Use this structure as the default destination for generated spec assets:

```text
openspec/
  project/
    proposal.md
    design.md
  contracts/
  behaviors/
  flows/
  rules/
  references/
```

Optional directories when the project needs them:

```text
openspec/
  interactions/
  environments/
```

## Rules

- `project/` is for high-level human-readable documents.
- `contracts/` is for hard constraints and registries.
- `behaviors/` is for module-level behavior units.
- `flows/` is for journey-level cross-module paths.
- `rules/` is for global constraints and validation intent.
- `references/` is for copied or normalized source material that should stay near the spec.

## Keep it clean

- Do not store generated test code under `openspec/`.
- Do not mix styling references into behavior or flow files.
- Do not duplicate the same selector registry across multiple locations.
