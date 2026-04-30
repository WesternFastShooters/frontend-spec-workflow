# Flow Layer

Flows represent user-visible journeys that cross module boundaries. They are not component specs and they are not low-level contracts.

## Use flows for

- critical business paths
- editor journeys
- multi-panel coordination
- high-risk regressions
- scenarios that should be verified end to end at the journey layer

## Recommended shape

```yaml
name: history_restore
entry:
  route: /editor
  state: existing-document

actors:
  - user

depends_on:
  - behaviors/history.jumpTo.yaml
  - contracts/ui/testid.ts
  - contracts/api/history.ts

steps:
  - action: open-history-panel
  - action: choose-history-item
  - action: restore-version
  - action: observe-editor-update
  - action: observe-preview-update

expected_outcomes:
  - editor content matches selected version
  - preview is synchronized
  - selection is reset according to contract

verification:
  layers:
    - type: journey
      focus:
        - cross-module recovery flow

mock_dependencies:
  - history-api-snapshot-list

environment_tags:
  - desktop
  - standard-scroll
```

## Flow rules

- Reference contracts and behaviors instead of restating them.
- Keep selectors sourced from contracts, not inline invention.
- Use flows only when a user journey crosses module boundaries or carries product-level value.
