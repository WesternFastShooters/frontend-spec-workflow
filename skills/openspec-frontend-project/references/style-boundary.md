# Style Boundary

OpenSpec should describe how the frontend behaves, not how it looks at the CSS-detail level.

## Put in OpenSpec

- UI structure that affects behavior
- selector or test-id registries
- accessibility or semantic interaction requirements
- stateful visibility rules
- layout constraints only when they affect behavior or risk

## Keep out of OpenSpec

- visual polish goals
- color, spacing, typography, and CSS tuning notes
- pixel-perfect alignment instructions
- visual parity descriptions that have no behavioral impact

## Where visual fidelity should live

- Storybook stories
- screenshot baselines
- design files
- a separate style-restoration skill or workflow

If a visual issue has behavioral risk, record that risk in `openspec/environments/` or `openspec/interactions/` rather than embedding raw styling instructions into behavior files.
