# HopShift

**HopShift** is a character-driven 2D precision platformer prototype blending expressive Mario-style character control with Geometry Dash-inspired obstacle-course design.

## Play

The playable character showcase lives in [index.html](./index.html), a standalone HTML Canvas app that works on desktop and mobile with no installation, external dependencies, or build system.

If GitHub Pages is enabled for this repository, the live URL is:

**https://hambonesoftware.github.io/hopshift/**

## Meet Kip

Kip is a tiny adventurer with an animated scarf, expressive face, oversized boots, and squash-and-stretch movement. This first build is a **character and movement study**, not a finished game.

The demo includes:
- Live Canvas-rendered character art and animated portrait
- Keyboard and touch controls
- Acceleration, air steering, variable-height jumps, coyote time, and jump buffering
- Responsive stage composition with parallax landscape, platforms, floating orbs, and particle effects

## Controls

| Action | Keyboard | Mobile / touch |
| --- | --- | --- |
| Move left | Left arrow / A | Left button |
| Move right | Right arrow / D | Right button |
| Jump | Space / Up arrow / W | Jump button |
| Short jump | Tap jump briefly | Tap jump briefly |
| Higher jump | Hold jump | Hold jump |

## GitHub Pages deployment

A workflow in [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) deploys the repository on pushes to `main`. To activate it:

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open **Actions → Deploy HopShift to GitHub Pages** and run the workflow manually if needed.
4. Visit **https://hambonesoftware.github.io/hopshift/** when the workflow succeeds.

## Roadmap

Next: expand this character study into the first playable precision-platforming chamber, with responsive obstacles, clear checkpoints, distinct enemy behaviors, and polish passes on movement and animation.

Built with vanilla HTML, CSS, and JavaScript Canvas.
