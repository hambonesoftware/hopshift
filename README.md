# HopShift

**HopShift** is a character-driven 2D precision platformer built around **Kip**, a living cube with a face on his front, little arms and legs, and a signature **flip → upside-down head slide → jump recovery** move. The design combines deliberate, Mario-like character control with readable, Geometry Dash-like obstacle courses. It is **not** an automatic runner or a Sonic-style momentum game.

## Try the repaired Clockwork Canopy course

**[Play Clockwork Canopy](https://hambonesoftware.github.io/hopshift/course-concept.html)**

This standalone experimental course now uses **the actual WebGL rounded-cube Kip geometry and face/limb rig** from the [3D Character Studio](https://hambonesoftware.github.io/hopshift/character-3d.html), composited over the colorful Canvas 2D level. Kip turns to run and pitches forward in a jump somersault.

**Raised platforms are real one-way landing surfaces:** Kip can jump onto the exact tops of the garden and factory platforms, stand on them, and jump again. The low tunnel has an overhead solid volume requiring Kip's compressed head slide. A jump input buffer and coyote window improve responsiveness.

The original `index.html` showcase remains unchanged. This course is still an early **prototype**; animations and collision logic need broader real-device testing.

**Verification:** Browser logic tests passed for landing on the first raised platform, standing, jumping back off, landing again, and loading the head-slide scene without JavaScript errors. WebGL rendering could not be visually confirmed in the headless sandbox; test on an actual phone or desktop before treating the visuals as production-final.

## Preview the 3D character (canonical)

**[Launch Kip's 3D Character Studio](https://hambonesoftware.github.io/hopshift/character-3d.html)**

Kip is a genuinely **three-dimensional rounded cube** with a face on his *front*, short arms, and stubby legs. He **rotates his actual 3D body to the left/right when running**, showing real side depth. The WebGL viewer demonstrates front-facing idle, side-facing run, jump, 3D flip, and a compressed upside-down head slide. It supports camera orbit and body color choices.

The 3D viewer is a **character animation prototype**, not integrated platformer gameplay yet. The main `index.html` still contains the original prototype. See the [canonical 3D character direction](docs/3D_CHARACTER_DIRECTION.md) and [M1 integration issue](https://github.com/hambonesoftware/hopshift/issues/2).

## Earlier flat 2D study (superseded)

**[Open the interactive Kip 2.0 Character Lab](https://hambonesoftware.github.io/hopshift/character-lab.html)**

The **superseded** 2D character lab uses **Canvas 2D code** (no bitmap characters or external assets) to render Kip as a softly rounded **anthropomorphic cube**, with a face on the front, short arms/legs, and expressive poses. It includes animated **idle, run, jump, full flip, upside-down head-slide, and recovery** showcases, along with three selectable body colors. The controls are interactive pose demonstrations, **not yet a finished platformer physics/collision system**. The head slide remains a visual prototype while its actual collision mechanics are tracked in M3.

The original game prototype remains available separately on the main URL.

## Play the current prototype

**https://hambonesoftware.github.io/hopshift/**

The existing playable `index.html` is **Kip 1.0, the original adventurer/scarf character showcase**. It runs without external dependencies or a build step. It has an animated character and portrait, keyboard/touch movement, variable-height jumping, basic game feel, particles, and parallax scenery.

**Important:** The 3D character studio is now canonical. The main game's 3D cube integration and head-slide physics are **not yet implemented**; those changes remain tracked as milestones.

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
| [Canonical 3D character direction](docs/3D_CHARACTER_DIRECTION.md) | 3D volume, body turning, 2.5D camera, animation and integration requirements |
| [Early character design](docs/CHARACTER_DESIGN.md) | Original proportions and expressions (superseded where 2D-only) |
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
2. **M1:** Replace the adventurer with the new **rigged 3D cube Kip**, including real body yaw on left/right running.
3. **M2:** Fixed-timestep physics and reliable precision controls.
4. **M3:** Inverted landings, real head-slide collision, recovery and slide-cancel jump.
5. **M4:** Test chamber with a low tunnel, slope, jump orb and checkpoint.
6. **M5:** Animation and audiovisual polish, mobile performance, usability.
7. **M6:** Short multi-room vertical slice.

## Deployment

GitHub Pages uses the checked-in [Pages deployment workflow](.github/workflows/pages.yml) and publishes static files from `main`.

The next code-changing deliverable is **M1, the living cube renderer and animation rig**. Do not extend the world significantly until the signature flip/slide controls and collision tests work.

Built with HTML, CSS and vanilla JavaScript Canvas.
