# Requirements and acceptance

Confirmed scope: recreate the supplied 30-second animation with editable Remotion components, keep the original aspect ratio, handwritten visual style, main text, sequence of actions and approximate timing; render and inspect it; publish the complete source and lockfile in the user's public GitHub repository; bind that repository to recording `e3ee409a-50f7-4b4a-af27-288226e47a57`.

| Requirement                                                | Implementation                                                     | Verification                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------- |
| 1280 × 720, 30 fps, 30 seconds                             | `src/Root.tsx`: 900-frame composition                              | Inspect the encoded video stream and decode all frames        |
| Cream editor interface, dark outlines, handwritten Chinese | SVG interface; locally bundled OFL fonts                           | Compare rendered reference timestamps                         |
| City, ramen, dog, disco footage                            | Procedural `Art` components, no reference-video background         | Inspect source and rendered thumbnails/phone                  |
| Import, trim/delete, transitions, text, undo               | `Library`, `Timeline`, `Mascot`, overlays                          | Inspect 2, 7, 10.8 and 14.2 seconds                           |
| Saturation, zoom-impact slider, beat markers, export       | `Controls`, animated arm, timed UI states                          | Inspect 17, 22 and 24 seconds                                 |
| Final phone, handwritten Opus 5.5 card, mascot/confetti    | Ending group                                                       | Inspect 29 seconds                                            |
| Original timing/audio                                      | Original audio track extracted losslessly; frame-derived animation | Verify audio stream and 30-second render                      |
| Reproducible source                                        | Exact dependency versions, lockfile, local assets, README          | `npm ci`, `npm run lint`, `npm run render`                    |
| Public repository and push                                 | GitHub CLI                                                         | Verify `isPrivate=false`, local HEAD equals remote HEAD       |
| Recording binding                                          | Scoped REST endpoint provided by user                              | Verify HTTP response and matching recording ID/repository URL |

## Fidelity limits

This is a component-based reconstruction, not a pixel-identical copy. The illustrated footage, mascot expressions, handwriting, texture and transition trajectories are redrawn approximations. The source audio is reused; the reference video itself is not embedded or committed. No claim of ownership of the original reference artwork, brand names or audio is made.
