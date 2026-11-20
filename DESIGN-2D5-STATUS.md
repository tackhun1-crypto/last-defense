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

## Follow-up on the same branch

- Verified a clipping defect in the original portrait camera with Three.js projection. The camera now maintains a minimum horizontal field of view, blends its angle by aspect ratio, and updates immediately on resize.
- Dragging tracks one pointer and uses its starting height for horizontal movement. Releasing a second pointer, for example after using an item, leaves the drag active.
- Preserved the dusk palette when combat starts. Added a weapon-mounted flash, crates and a drain cover.
- Automated logic checks passed at 320×960, 390×844, 630×900 and 844×390. Coverage now includes the two extreme player positions, second-pointer handling, weapon purchase, obstacle purchase/activation/expiry, straight projectiles, player damage and inventory restore.
- JavaScript syntax and the embedded female GLB container passed static checks. Real WebGL rendering, motion, touch feel and performance still need Android testing. The local Chromium process could not start because its required socket was denied.

## Character and enemy art

- Matched the survivor's existing model to the reference's charcoal gear and warm accents. Weapon changes now briefly lower the weapon with the existing survivor animation.
- Added jointed arms and boots for humanoid enemies. Step animation follows ground distance so limbs stop stepping at barriers. Added a construction helmet and reflective vest accents and refined the police and nurse palettes.
- Verified humanoid step animation and hit flash material restoration in the four viewport logic checks. Final asset fidelity, in-browser appearance and Android performance remain unverified.

## Illustrated street and combat HUD

- Added mobile-sized WebP art for the street surface and the female survivor portrait. The pavement art is projected onto the 3D ground and receives scene shadows. If the art fails to load, the previous geometry and material remain visible.
- Updated the live HUD with a portrait next to base and survivor health, grouped wave and kill counters, gold, and gold-edged active weapon slots. Damage numbers project from the hit location.
- Four emulated viewport logic checks passed, including portrait selection, pavement art activation, and damage-number expiry. Existing character rigs remain in use. On-device visual comparison and frame-rate measurement are pending.

## Street depth and actor lighting

- Added illustrated brick textures, inset window panes, facade trim, and street-edge emergency beacons. Cool ambient light and warm direct light give the level more depth.
- Added soft ground contact shadows to the survivor and enemies. Raised the survivor marker just above the illustrated street to prevent it from disappearing below the ground layer.
- The four viewport logic checks cover the texture fallback and activation, ground-marker layering, and actor shadow cleanup. The Android GPU appearance and frame rate still require on-device review.

## Painted combat actors

- Illustrated full-body replacements for both survivors, the ordinary and specialist infected, ranged infected, dog/bear/tiger variants, armored bosses, and the final boss. Sprites are integrated into the 3D scene with depth testing and independent contact shadows.
- The female survivor selects ready, sidestep, and recoil poses. Enemies use pose motion driven by ground distance, hit tint, and distinct boss charge and casualty poses. Sprites fall back to the existing actor meshes if their art fails to load.
- Hit bounds, damage, shop behavior, items, and waves remain driven by the existing game. Illustrated survivors carry a drawn weapon silhouette across the reload and equipment states.

## Boss HUD and storefront pass

- Boss health lives in the bottom combat dock with the loadout. Main and side bosses do not create world-space health labels. Wave 10 retains an independent meter for the left guard, central boss and right guard.
- The city blocks now alternate boarded stores and shuttered warehouses, with entrance trim, window mullions, awnings, drainage pipes and rooftop equipment.
- Both survivors have independent ready, step and firing poses with calibrated muzzle positions. The male sprite from the animal atlas remains a fallback.
- Logic checks verify direct boss damage, side-boss defeat, no sprite above any boss, and the male and female combat pose selection.

## Clear combat view and action poses

- Removed boss progress bars and moved boss health back to compact numbers anchored just above the painted head. No additional boss panel takes up combat space.
- Replaced tall frontage with single-story shops, garages, kiosks and open repair yards. Lower, set-back scenery on the camera side improves sight lines.
- Added four ordinary infected walking poses and separate final boss windup, run, and stagger frames. Survivor steps now follow actual travel distance and continue through firing, with muzzle flash tracking both the frame and body lean.
- Logic checks cover the above-head boss number projection, damage, low building dimensions, boss phase poses and movement while firing. Android GPU verification remains pending.

## Survivor reactions and obstacle labels

- Barrier and slow mat meters no longer show a waiting label. The seconds label appears when an enemy activates the obstacle.
- Added independent weapon-switch, hit, deployment and boss-arrival brace illustrations for both survivors. The crouch eases in and out while the gameplay events retain their existing timing.
- Viewport logic checks cover the blank and active timer states, item deployment, weapon switch, hit feedback and both survivor selections.

## Player artwork refinement

- Repainted both survivors' eight combat poses at higher source detail. The production atlases use 512 px square cells, a shared foot-contact baseline, and mipmap filtering for clean edges on phones.
- Increased the combat presentation size while retaining view margins at the left and right movement limits. Added a warm muzzle-light response on the player's artwork.
- The character picker previews the actual combat artwork. Gameplay collisions, movement, and weapon timing are kept independent of the art size.

## Original concept survivor

- The default female survivor now uses the outfit and facial direction from the original combat concept. The gray sleeveless top, black shorts, thigh rig, knee guards, goggles and ponytail carry across all eight normal combat and reaction frames.
- The selector uses the same world artwork, the portrait follows the reference portrait, and the muzzle overlay was recalibrated for the new silhouette.

## Seasonal outfits

- The start screen offers original tactical clothing, summer trail gear and winter expedition clothing for both survivors. The models remain cosmetic and share the same stats.
- Each seasonal atlas includes all eight combat and reaction poses. Atlas loading is deferred until a season is selected and the selected outfit is stored in checkpoints.

## Civilian summer and winter outfits

- Added separate casual summer and winter outfits for both survivors alongside the tactical and outdoor choices.
- Outfit previews use the combat art. All eight poses per outfit stay in civilian clothing, and the chosen outfit persists in a saved run.
- Tests exercise both new choices and avatars, complete frame registration, and restoration through the existing checkpoint flow.

## In-game portraits, weapon art, and street themes

- The combat HUD uses ten portraits mapped to survivor and outfit. Seasonal and civilian portraits are cut from the matching character art, and the male survivor now has a portrait.
- Weapon-specific painted front assemblies align to the sprite poses and carry the muzzle effect to the visible barrel tip. The weapon art uses the existing weapon slots and stats. Original carbine art remains underneath the attachments.
- The start menu independently selects dusk, warm summer daylight, or a cool winter evening with instanced snow patches. The street theme is stored in checkpoints while older saves default to dusk.
- Automated checks cover portrait updates, theme selection and restoration, snow visibility, and weapon assembly and muzzle selection.
