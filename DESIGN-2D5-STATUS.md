# 2.5D design progress — 2026-11-20

This is an intermediate implementation, not final visual acceptance or deployment approval.
Reference: approved LAST DEFENSE image, dark urban quarantine street, warm work lights, diagonal quarter view, female survivor and metal HUD.

## Changes
- Applied urban art layer and female ground ring/rim light to all waves.
- Fixed diagonal high camera with portrait/landscape framing; ground-plane relative dragging preserves horizontal movement under the angled camera.
- Female survivor selected by default, existing model and movement/weapon synchronization retained.
- Added deterministic cracked asphalt texture, sidewalks, striped roadblocks, abandoned police vehicles, work lamps, warm camp light and muted atmospheric palette.
- Zombie face recesses, wounds and front-facing eyes; thinner elongated bullet tracers and muted death particles.
- Metal HUD, selected weapon outline, descriptive weapon stats, minimum touch sizes, safe-area spacing and landscape-specific panel layout.
- Existing combat rules, weapons, shop, items, checkpoint and wave logic retained.

## Validation
`THREE_MODULE=/absolute/path/to/three.module.mjs node tests/logic.mjs`
Use official Three.js version 0.160.1, matching the game import.

Passed in two simulated dimensions (390×844 and 844×390): initialization, default female selection, reset, enemy kill/reward, shop transition, purchase upgrade, weapon upgrade isolation, all weapon selection, checkpoint serialization, wave 5 single boss, wave 10 three bosses, all-wave art visibility, and ground-ray drag direction/clamp.
The harness uses real Three.js scene/math and stubs DOM, WebGL and audio. It does not validate layout, rendered visuals, real touch events, GLB loading, FPS or device behavior.

Browser preview reached WebGL initialization error. No actual gameplay or mobile browser visual pass could be completed in this environment. No deployment was performed.

## Remaining before release
- Current geometric models do not yet match the approved image's high-detail female anatomy, face, costume, hair and illustrated zombie silhouettes.
- Environment is procedural geometry; needs visual review and detailed art to reach the image reference.
- Review camera visibility, aiming alignment, enemy readability and HUD overlap in actual portrait/landscape rendering.
- Verify female GLB animation/weapon alignment, all weapons and items, boss patterns, sound, checkpoint continuation and performance on Android Chrome/Samsung Internet.
- Particle/mesh disposal and long-session memory performance need profiling; existing resource lifetime behavior was retained.
- Final deployment requires separate user approval. Do not merge into main or deploy this branch automatically.
