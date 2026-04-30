# Behavior Unit

A behavior unit is the smallest stable slice of system behavior that should be spec'd independently.

## A good behavior unit

- has a clear actor and trigger
- maps to one primary responsibility
- depends on explicit contracts
- has observable state transitions or side effects
- implies verification intent at one or more abstract layers

## Recommended shape

```yaml
name: history.jumpTo
module: history-panel
summary: Jump the editor state to a selected history snapshot.

contracts:
  - contracts/hawk/history.ts
  - contracts/ui/testid.ts

actor: user

trigger:
  type: click
  target: history-item

preconditions:
  - history list is loaded
  - selected version exists

system_flow:
  - call: HistoryService.jumpTo
  - update: editor.document
  - update: editor.selection
  - emit: onChange
  - notify: preview.sync

state_transitions:
  - from: history.idle
    to: history.applied

side_effects:
  - analytics event is optional

verification:
  layers:
    - type: logic-unit
      focus:
        - history selection rules
    - type: component-unit
      focus:
        - history panel emits selected version
    - type: integration
      focus:
        - history panel invokes editor bridge correctly
    - type: journey
      focus:
        - user restores a prior version from the UI

assumptions:
  - history data is already available in memory

open_questions:
  - should restore also move focus back into editor
```

## Naming

- Prefer `<domain>.<action>` for file names and `name`.
- Keep one primary action per file.
- Split behaviors when multiple branches require different contracts or state models.
