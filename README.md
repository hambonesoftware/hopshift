# HopShift

**HopShift** is a character-driven 2D precision platformer built around **Kip**, a living cube with a face on his front, little arms and legs, and a signature **flip → upside-down head slide → jump recovery** move. The design combines deliberate, Mario-like character control with readable, Geometry Dash-like obstacle courses. It is **not** an automatic runner or a Sonic-style momentum game.

## Play the current prototype

**https://hambonesoftware.github.io/hopshift/**

The existing playable `index.html` is **Kip 1.0, the original adventurer/scarf character showcase**. It runs without external dependencies or a build step. It has an animated character and portrait, keyboard/touch movement, variable-height jumping, basic game feel, particles, and parallax scenery.

**Important:** The approved cube character and head-slide mechanic are **planned, not yet playable**. The prototype will be upgraded milestone by milestone.

## New character direction

- Rounded, front-faced cube body, very short arms, very short legs, gloved hands and compact shoes.
- Responsive jumping and intentional air control.
- **Tap Flip:** full 360-degree somersault.
- **Hold Flip:** invert the body and prepare a top-first landing.
- **Head slide:** a compressed, low-profile upside-down landing that lets Kip slide under hazards.
- **Recover / cancel jump:** spring upright or hop directly out of a slide when there is clearance.
- Expressive face, charming wobble on low-speed inverted landings, polished squash/stretch.

## Product and implementation documents

| Document | Contents |
| --- | --- |
| [Roadmap](docs/ROADMAP.md) | M0–M6 milestone sequence, dependencies, and quality gates |
| [Character design](docs/CHARACTER_DESIGN.md) | Cube silhouette, proportions, hierarchical animation, expression and effects |
| [Movement & collision](docs/MOVEMENT_AND_COLLISION.md) | Input contract, state machine, physics targets and test cases |
| [GitHub issues](https://github.com/hambonesoftware/hopshift/issues) | Track implementation and validation work |

## Current controls

| Action | Keyboard | Touch |
| --- | --- | --- |
| Move | A/D or arrows | Left/right buttons |
| Jump | Space / Up / W | Jump button |
| Variable jump | Tap or hold | Tap or hold |

**Flip and head-slide controls are not implemented yet.** Proposed Flip controls: X on keyboard and a dedicated mobile button.

## Implementation order

1. **M0:** Preserve and verify the baseline.
2. **M1:** Replace the adventurer with the new rigged cube Kip and animated front-facing features.
3. **M2:** Fixed-timestep physics and reliable precision controls.
4. **M3:** Inverted landings, real head-slide collision, recovery and slide-cancel jump.
5. **M4:** Test chamber with a low tunnel, slope, jump orb and checkpoint.
6. **M5:** Animation and audiovisual polish, mobile performance, usability.
7. **M6:** Short multi-room vertical slice.

## Deployment

GitHub Pages uses the checked-in [Pages deployment workflow](.github/workflows/pages.yml) and publishes static files from `main`.

The next code-changing deliverable is **M1, the living cube renderer and animation rig**. Do not extend the world significantly until the signature flip/slide controls and collision tests work.

Built with HTML, CSS and vanilla JavaScript Canvas.
