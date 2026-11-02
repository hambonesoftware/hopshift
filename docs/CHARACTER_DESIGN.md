# Kip — character and animation specification

**Status:** Approved design direction; not yet implemented.  
**Target:** HopShift browser game, HTML Canvas, desktop and mobile.

## Creative north star

Kip is **a living Geometry Dash-like cube, not a person dressed as a cube**. His cube is the primary silhouette and the thing players rotate, squash, land on, and slide across the stage. A face is on the *front surface*, with *short arms and legs* and small gloved hands/shoes. His signature move is a controlled somersault into a low, upside-down **head slide**, followed by a springy recovery or cancel jump.

The player should have Mario-style intentional left/right and jump control with Geometry Dash-style readable, precise obstacles. **This is not an automatic runner or a momentum-first Sonic clone.**

## Proportions and rendering

| Part | Design target | Notes |
| --- | --- | --- |
| Cube | ~54 × 54 logical units | Near-square, softly rounded corners (6–8 units), visible front plane |
| Face | Two large eyes, brows, readable mouth | Always attached to front plane, rotating with cube; dynamic expressions |
| Arms | ~12 units from side pivots | Very short; may tuck to maintain safe silhouette |
| Hands | ~9-unit rounded gloves | Clear when rendered at normal gameplay zoom |
| Legs | ~10 units, stubby | Bottom pivots; tuck while tumbling, point up when inverted |
| Shoes | ~15 × 9 units | Rounded, compact, with subtle contact shading |
| Materials | Smooth painted toy, not chrome | Saturated body, darker side face, rim lighting and crisp outline |

Do **not** retain the prototype's tall torso, long scarf, or large explorer-style human proportions when upgrading the model. Keep readable, cheerful color and polished directional lighting.

## Body orientation and pose

- The cube remains the primary, physically meaningful graphic at every rotation.
- Turn/tilt while running is subtle; intentional Flip produces an obvious somersault.
- Head slide is a real inverted state: cube rotates ~180 degrees, feet up, head/top face down; body compresses into a visibly flatter, wider silhouette.
- Eyes, brows, mouth, arm pivots, and leg pivots are **local children of cube body**, so they inherit body rotation rather than floating separately.
- The shadow stays in world space beneath the contact point.
- Limb animation must not affect collision dimensions.

## Expressions

| Situation | Face | Body and limbs |
| --- | --- | --- |
| Idle | Calm smile, blinking, eye tracking | Breathing bob, tiny hand shift |
| Walk/run | Focused brows | Tiny rapid leg cycle, gentle cube lean |
| Jump | Excited wide eyes | Stretch-up then tuck |
| Flip | Playful grin or surprised eyes | Tucked hands and feet, smooth rotation |
| Inverted | Eyes visibly upside down | Feet in air, hold pose |
| Head slide | Compressed grin, determined eyes | Squashed cube, limbs trailing; skid dust |
| Failed low-speed inversion | Comedic dizzy/blink | Wobble on top, pop upright |
| Hard landing | Eyelids pinch, brief grimace | Compression then rebound |
| Perfect chained stunt | Brief smug grin | Tiny celebratory bounce |

## Animated transitions

The animation system should be *pose-driven* rather than a collection of rigid individual images. Implement a hierarchical transform stack:

```text
world root (position, velocity, facing)
└─ cube root (rotation, squash/stretch, body tilt)
   ├─ cube surface + bevel + lighting
   ├─ front face (eyes, pupils, brows, mouth)
   ├─ left/right short arms + gloves
   └─ left/right short legs + shoes
world effects layer: contact shadow, dust, skid trails, landing pulses
```

Suggested animation timing for initial tuning, not final fixed values:

| Transition | Starting target |
| --- | --- |
| Jump anticipation/launch | 50–70 ms (purely visual, **no jump input delay**) |
| Full visual somersault | ~420 ms |
| Intentional half-rotation to invert | ~230 ms |
| Recovery from head slide | ~130 ms |
| Hard landing squash/rebound | ~100 ms |

Animation should be responsive to state and velocity, not tied to wall clock alone. Preserve the old character as a reference only; this new cube design is the new canonical target.

## Signature interaction sequence

1. Run and jump with responsive directional control.
2. Tap Flip to somersault, **or hold Flip to target upside-down**.
3. While holding inversion, contact the ground with the cube's upper/top side.
4. At sufficient horizontal speed and valid clearance, move directly into a **compressed head slide** without position snapping.
5. Release Flip to recover if clear; or press Jump to **slide-cancel jump**.
6. Under low ceilings, delay stand-up until clearance is available.
7. If inversion lands slowly, use a funny wobble/recovery rather than getting permanently stuck.

## Readability / polish requirements

- Front face remains visible and recognizable during all 2D flips.
- A clean hitbox and readable contact marker take priority over decoration.
- No harsh limb popping when the body rotates or compresses.
- Render crisp on retina/high-DPI mobile screens.
- Reach visually convincing frames for idle, run, jump, flip, invert, head-slide, and recovery at the normal **gameplay scale**, not only in a portrait showcase.
- Motion effects (particles, streaks, impact rings) never obscure collision hazards.

## Implementation references

- [Movement engineering spec](MOVEMENT_AND_COLLISION.md)
- [Phased implementation plan](ROADMAP.md)
- [Existing character prototype](../index.html)

**Deliverable status:** This document defines the target. It does **not** claim the playable character has been replaced.
