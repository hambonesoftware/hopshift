# HopShift — movement, flip, and head-slide engineering contract

**Status:** Design targets pending implementation and test.  
**Priority:** Game feel and collision correctness before stage content.

## Core rules

1. Character controls are manual left/right, jump, and Flip. No automatic forward motion.
2. **Tap Flip** = a complete in-air 360-degree somersault; **hold Flip** = stop at 180 degrees to prepare an inverted landing.
3. Rotating visuals do not continuously rotate the collision shape; use well-defined stable collider shapes tied to state.
4. When inverted and landing with adequate horizontal speed, Kip compresses and enters head slide.
5. Releasing Flip recovers if free overhead; Jump from slide is an immediate cancel jump.
6. Obstacles must telegraph collisions and remain predictable regardless of frame rate.

## Starter control map

| Action | Desktop | Mobile |
| --- | --- | --- |
| Left/right | A / D or arrows | Large left/right buttons |
| Jump | Space / W / Up | Jump button |
| Flip / invert | X | Flip button |
| Head slide | Land inverted while moving and holding Flip | Same |
| Recover | Release Flip | Release Flip |
| Slide cancel jump | Jump while sliding | Jump while sliding |

Implement key release and pointer-cancel / blur cleanup. Do not trap scroll unless gesture is within the game control area. Support simultaneous move, jump, flip touches.

## State machine

```text
GROUNDED_IDLE  ←→ GROUNDED_RUN
       │               │
       └──── JUMP ─────┘
                │
           AIRBORNE
           /      \
      FLIPPING   INVERTED_HOLD
          |          |
       UPRIGHT    LAND_CHECK
          |          |    \
       LANDING    HEAD_SLIDE  LOW_SPEED_WOBBLE
                      |
                  RECOVER
                      |
                  GROUNDED
```

Implementation may separate physics state (grounded, airborne, sliding) from pose state (upright, flipping, inverted) to avoid combinatorial bugs. **Physics is authoritative.** An airborne full-flip landing can resolve upright without forcing a slide.

## Numeric starting values

These are **tuning hypotheses**, not measurements from the existing code:

| Parameter | Target |
| --- | ---: |
| Ground max speed | 260 px/s |
| Ground acceleration | 1,900 px/s² |
| Ground deceleration | 2,400 px/s² |
| Jump launch velocity | -530 px/s |
| Gravity | 1,550 px/s² |
| Air steering | 80% ground acceleration |
| Terminal falling speed | 950 px/s |
| Coyote time | 100 ms |
| Jump buffer | 120 ms |
| Slide activation horizontal speed | >= 110 px/s |
| Slide max speed | 340 px/s |
| Perfect inversion momentum bonus | 0–10%, capped at slide max |
| Normal body footprint | ~42 × 62 px including shoe envelope |
| Compressed slide footprint | ~48 × 30 px |

Because the art cube is roughly 54 × 54, **keep these gameplay colliders centered in the relevant pose without assuming they exactly trace every visible pixel**. Visual body squash is required to approximately match the shorter slide collider. Tune thresholds by feel and verify tunnel collision.

## Flip input semantics

- Press X / Flip while airborne to begin a single full visual flip. An ordinary tap completes the turn.
- When the hold threshold is passed (initial suggestion 100 ms), route the active rotation toward the **nearest planned inverted orientation** and settle at 180 degrees. Ensure hold never awkwardly reverses more than needed.
- Avoid ambiguous multi-rotation behavior: no additional rotations without a new explicit Flip press.
- While inverted, ground contact can trigger slide; if there is no suitable landing, releasing Flip smoothly returns upright.
- Player left/right steering remains responsive throughout the flip.
- A buffered Flip press shortly before leaving a ledge should work predictably; do not allow accidental slide from an upright flip.

## Slide trigger, collider and movement

Start a head slide only when **all** conditions hold:

- Player was airborne and contacts a supported walkable surface.
- Inverted pose or inversion intent is active, with top-of-cube contact alignment.
- Horizontal speed meets the threshold.
- The intended compressed capsule/AABB location is not inside solid geometry.

At landing, reconcile foot-ground and top-ground positions so there is **no sudden vertical snap**. Apply a one-time landing impact/squash animation. After that, use grounded slide physics with friction and slope response. Use a speed clamped bonus for clean technique, but do not turn the game into an uncontrolled accelerator.

## Standing recovery clearance

When slide ends, cast/check the **full upright collider at the same ground reference**:

- If clear, transition to standing smoothly (~130 ms animation), with collision state safely updated.
- If obstructed by a ceiling, stay compressed, preserve horizontal control, and show a subtle blocked-recovery cue.
- If Jump is pressed under a low ceiling, buffer only the permitted short input window; never teleport or clip through it.
- Do not permit a slide collider to climb walls by changing size at an invalid position.

## Fixed timestep and touch reliability

The current prototype computes simulation from frame-relative ticks in one HTML file. Refactor to a fixed **1/120 s physics timestep** with accumulator and a capped catch-up budget; interpolate visuals for presentation. Avoid "physics speed changes on 120 Hz screens" problems.

Break the implementation into separable responsibilities: input, player state/physics, colliders/world collision, pose/character rendering, camera/effects, and level definition. A multi-file layout is recommended if it stays easily deployable as static GitHub Pages assets.

## Test cases

| ID | Action | Expected |
| --- | --- | --- |
| M01 | Tap Jump quickly | Low jump with variable height |
| M02 | Hold Jump | Higher arc |
| M03 | Jump 80 ms after leaving ledge | Coyote jump succeeds |
| M04 | Press Jump 90 ms before landing | Buffered jump fires |
| F01 | Tap Flip midair | Complete full somersault, upright pose |
| F02 | Hold Flip midair | Invert and hold feet-up pose |
| F03 | Release Flip before landing | Return upright without unintended slide |
| S01 | Land inverted at 180 px/s | Slide starts; no snap or clipping |
| S02 | Land inverted at 40 px/s | Wobble or recover; no indefinite stuck state |
| S03 | Enter low 35 px-tall tunnel | Slide traverses; standing cannot enter |
| S04 | Release Flip inside low tunnel | Stay compressed until clearance |
| S05 | Jump from slide in open air | Slide-cancel jump with clean camera and collider transition |
| S06 | Slide down a slope | Controlled acceleration without unbounded speed |
| S07 | Hit wall mid-slide | Stop/deflect correctly; no wall tunneling |
| I01 | Hold move+jump+flip on touchscreen | All three inputs register independently |
| I02 | Lose browser focus during Flip | Buttons reset; safe consistent state |
| P01 | Simulate at 30/60/120 Hz | Near-identical trajectories |
| P02 | Retry/reset repeatedly | No retained stale slide/flip state |

## Accessibility and fairness

- Make jump-orb and spike collision shapes visible and consistent.
- Keep precision challenge in level geometry, not input latency.
- Reserve instant retries/checkpoints for the first challenge chamber.
- Avoid effects that hide hazards; provide optional reduced particles and screen shake later.
- Touch hit targets should be generously sized and away from iOS gesture edges when possible.

## Gate to unlock level building

Finish this system before designing a large world. The test chamber must prove: consistent movement, an unmistakable cube silhouette, flip skill, reproducible low tunnel head slide, safe recovery, responsive controls on iPhone and desktop, and repeatable physics.
