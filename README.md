# Claude Editing Motion — Remotion recreation

Editable reconstruction of the 30-second hand-drawn editing animation from [MotionFace](https://motionface.cc/?recording=e3ee409a-50f7-4b4a-af27-288226e47a57).

![Rendered ending](docs/preview.jpg)

## Run

Requires Node.js 22 or newer and npm. On first render, Remotion downloads Chrome Headless Shell if it is not available yet.

```sh
npm ci
npm run dev
```

Select **EditingMotion** in Remotion Studio. The composition is 1280 × 720, 30 fps, 900 frames (30 seconds).

## Render

```sh
npm run render
```

Output: `out/editing-motion.mp4` (H.264 with AAC audio).

```sh
npm run lint
npm run build
npx remotion still EditingMotion out/preview.png --frame=870
```

## Edit

- `src/Root.tsx`: composition dimensions, fps, duration.
- `src/EditingMotion.tsx`: exported `Mascot`, `Art`, `Library`, `Controls`, `Timeline`, `Phone` and main `EditingMotion` components.
- `public/fonts/`: locally bundled Long Cang and Ma Shan Zheng handwriting fonts, with their OFL notices.
- `public/reference-audio.m4a`: audio extracted losslessly from the user-provided reference.
- `ANALYSIS.md`: visual analysis and timing breakdown.
- `REQUIREMENTS.md`: agreed scope and acceptance mapping.
- `VALIDATION.md`: checks performed on the final render.

All animation is calculated from `useCurrentFrame()`; seeking and offline rendering are deterministic. All visual artwork is SVG/React. No reference video is embedded, and rendering assets are local.

## Fidelity and attribution

The layout, main actions, duration and ending follow the reference. Illustrated footage, typography, mascot expressions and motion paths are redrawn approximations, not a pixel-identical reproduction. The original audio is retained to preserve timing. Source reference artwork, audio and brand names remain attributable to their respective owners; this repository does not grant a license to those materials. Font licenses are included. The repository is public for inspection; `UNLICENSED` means no blanket redistribution license is granted.

Signed reference URLs, authorization tokens and local reference-video downloads are not included. Rendered MP4 files are ignored by Git; use the render command above to generate one.
