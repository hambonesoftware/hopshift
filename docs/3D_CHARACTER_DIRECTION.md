# Kip 3D — canonical character direction

**Approved direction:** A *real three-dimensional anthropomorphic cube*, rendered inside a mostly 2D side-scrolling platformer (2.5D). Kip is not a flat square, and the front-facing expression must not be billboarded to camera during directional movement.

## 3D character identity

- Rounded cube body with **actual width, height and depth**, soft bevels, directional lights, visible side/back faces.
- Two expressive eyes and a mouth permanently mounted on the cube's **front surface**.
- Very short arms, very short legs, miniature hands and shoes, rigged as part of the *same 3D model*.
- Idle/front-facing pose presents the face to the viewer.
- **Running right**: body smoothly turns toward screen-right (near profile, not a flat sprite flip).
- **Running left**: body smoothly turns toward screen-left. The side face is genuinely revealed.
- Running limbs animate in their own local forward coordinate system, so after turning, feet pump naturally in the direction of movement.
- The face turns *with the body*: when seen from the side it may be foreshortened, not pasted on a plane facing the camera.
- Animation includes 3D body lean, squat, airborne tuck, complete flips, inversion, compressed top-of-head slide, recovery.

## Camera and game world

- **World gameplay stays constrained to X/Y**, preserving the sharp, readable level mechanics of a 2D precision platformer.
- Character itself is **3D and physically rotates in yaw** to face the chosen horizontal direction.
- Camera is fixed/side-on for normal play with a very modest cinematic 3/4 angle if useful.
- A character showcase may allow camera orbit. The camera-orbit control is for inspection only, not core gameplay.
- Avoid uncontrolled camera changes and Sonic-like speed physics.

## Runtime technology

Existing pages use Canvas 2D. To implement the approved model, move character visuals to a WebGL renderer (custom WebGL now available in `character-3d.html`, or a carefully chosen 3D runtime), keeping platformer physics on an independent deterministic 2D collision plane.

- Render geometry with normal-based lighting and stable depth ordering.
- Preserve semantic 2D collider(s); visual 3D rotation must not unpredictably change hitboxes.
- Shadow remains attached to world ground, while cube/limbs rotate.
- Mouse/touch orbit only in the character viewer; keyboard/touch gameplay keeps manual X direction controls.
- Keep downloads reasonable for iPhone browsers, respect reduced-effects settings eventually.

## Turning behavior

1. Idle defaults to front/three-quarter, keeping both eyes clearly visible.
2. When a direction input begins, yaw **quickly** toward screen-left or screen-right (initial target 70°–85°).
3. Arms and feet pump in the character's local forward direction.
4. Upon release, character may ease to a partly camera-facing idle, or stay briefly side-facing for state continuity. Test both for readability.
5. If input reverses, rotate through the short arc with squash/twist anticipation; never visually mirror a flat image.

## Flip and head slide

- Flips are true 3D transforms of the entire cube and its attached face and limbs.
- During an inverted landing, the top of the 3D cube touches the terrain.
- When sliding, the cube body squashes vertically and widens a little, with stubby feet pointing upward and hands trailing.
- Gameplay collision changes to a stable lower slide profile, with a safe ceiling-clearance check before returning upright.
- The real head-slide collision remains **future work**, even though the 3D character viewer demonstrates the animation pose.

## Visual proof

- [Kip 3D interactive WebGL studio](../character-3d.html): actual 3D rounded cube geometry, orbit inspection, directional turn, jump/flip/head-slide poses.
- [Earlier 2D character lab](../character-lab.html): historical exploration only; superseded as the canonical direction.
- [Movement engineering contract](MOVEMENT_AND_COLLISION.md)
- [Milestone roadmap](ROADMAP.md)

**Acceptance criterion for M1:** At normal gameplay size, press Right and visibly see the full cube yaw toward the right, exposing its side geometry, while legs run, then press Left and see real turning toward the left. This must not be a 2D sprite mirrored or skewed.

**State:** 3D character viewer implemented. Integration into the main playable `index.html` and real flip-to-slide collider are not yet complete.
