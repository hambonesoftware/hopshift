# HopShift — development roadmap

**Canonical direction (approved):** A character-driven 2D precision platformer starring **Kip**, an expressive rounded cube with a front-facing face, very short arms and legs, and a signature **flip → upside-down head slide → spring-up / cancel jump** movement chain.

**Genre guardrails:** Deliberate Mario-like left/right movement; short readable Geometry Dash-like challenge rooms; not a Sonic momentum game and not an auto-runner. Movement and legibility come before more levels.

## Current baseline

The deployed `index.html` is a **single-file playable character showcase** using an older tall adventurer/scarf design. It already has a basic Canvas render loop, keyboard and on-screen controls, variable-height jumping, particles, a parallax scene, and a close-up portrait. It **does not** yet contain the cube redesign, Flip input, inverted pose, real head-slide collider, or a complete precision challenge level.

Do not advertise these planned features as playable until they are merged and verified.

## Ordered delivery plan

### M0 — Baseline and safe handoff (first)

**Scope**
- Preserve existing live Pages build and confirm the character stage is reproducible.
- Document `index.html` responsibilities: `drawKip`, `simulate`, `render`, `handleKey`, and touch handlers.
- Decide a light module decomposition without introducing a complicated build pipeline.
- Create smoke checks for desktop keyboard and iPhone touch.

**Done when:** Legacy prototype remains playable; changes can be rolled out in individually verifiable commits.

### M1 — Kip 2.0: living cube character

**Scope**
- Replace elongated adventurer silhouette with near-square body, face on front, short arms/legs.
- Build hierarchical transform rig with independent expression, limb swing, squash/stretch and body rotation.
- Add 2D bevel lighting, silhouette-preserving shadows, and at least idle/run/jump/fall/hard-land poses.
- Keep gameplay controls and basic stage working.

**Done when:** Kip unmistakably reads as a small animated cube at standard zoom; old humanoid/scarf design is gone.

### M2 — Deterministic precision controller

**Scope**
- Extract game logic from render loop; fix input lifecycle.
- Fixed-step (prefer 120 Hz) simulation; interpolated rendering.
- Tune intentional responsive running, air steering, variable jump height, coyote time, jump buffer.
- Add reliable world collision and test-friendly level geometry.

**Done when:** Keyboard and touch jump behavior is consistent on 30/60/120 Hz displays, without frame-rate-dependent drift.

### M3 — Signature flip + head-slide system (game identity)

**Scope**
- Add X key / Flip button; tap = full 360° flip, hold = inverted 180° stance.
- Add land detection for inverted top-of-cube contact, including a funny slow-speed wobble.
- Add visually compressed upside-down slide with shorter collider and skid animation.
- Add slide friction, slope response, speed cap, blocked stand-up detection, and slide-cancel jump.
- Preserve legibility, prevent collider snaps and tunneling.

**Done when:** Running jump → hold Flip → inverted landing → head-slide under a low ceiling → cancel jump is reproducible and looks polished.

### M4 — First real challenge chamber

**Scope**
- Build a short, cohesive test course: practice runway → landing platform → low tunnel → downhill slope → jump orb → precision exit.
- Add checkpoint, retry, completion feedback and simple timing.
- Introduce obstacles that reward combining regular Mario-like jumps with the cube trick.

**Done when:** First-time players can discover the head slide without reading a manual; skilled players can chain the moves into a clean run.

### M5 — Animation, sound and usability polish

**Scope**
- Layer facial reactions, animation anticipation/follow-through, dust, controlled motion trails, landing effects and expressive idle.
- Add original short UI/game sound effects and optional musical accents; effects must not delay input.
- Refine touchscreen control spacing, dynamic canvas resolution, performance, safe area and reduced effects.

**Done when:** Fluid 60 FPS presentation on typical supported phones, steady collision logic, crisp small sprite, no touchscreen stuck keys.

### M6 — Vertical slice and expansion decision

**Scope**
- Build two further challenge rooms, one enemy-bounce interaction, collectible secrets, and a minimal hub/progression loop.
- Gather playtest observations on flip comprehension, slide timing, and difficulty spikes.
- Decide whether to add wall interactions or gravity portals **after** core mechanic validation.

**Done when:** A player can finish and replay a coherent small game slice rather than a character toy.

## Implementation order and dependencies

```text
Existing prototype
  ↓
M0 Baseline
  ↓
M1 Cube rig & animation
  ↓
M2 Deterministic control and collisions
  ↓
M3 Flip / inverted landing / head slide / recovery
  ↓
M4 Mechanic test chamber
  ↓
M5 Production polish
  ↓
M6 Small vertical slice
```

Visual polish in M1 can be refined alongside M2, but **do not** build a large set of levels before M3 collision cases are green.

## Quality gates

Each milestone must pass:
1. No JavaScript runtime errors; Pages builds successfully.
2. Character remains in frame and controls are operable on a real narrow touch viewport.
3. Hitboxes represent what players see; zero geometry clipping in normal moves.
4. No loss of input during flip/landing state changes.
5. Restart/blur/reset paths cleanly clear state.
6. Existing controls remain functional.

Target success condition for first major release: **a player can run, jump, flip upside down, slide under a low obstacle, and hop back upright in one fluid sequence**, with a charming recognizable cube on screen.

## Documentation

- [Character art and animation](CHARACTER_DESIGN.md)
- [Movement / collision engineering](MOVEMENT_AND_COLLISION.md)

## First implementation PR / commit

Focus exclusively on **M1**. Replace the renderer and update character portrait to the living cube design, retaining the current jump physics. The first code-changing milestone should be reviewable with side-by-side images and a playable GitHub Pages link. Then build M2 and M3.
