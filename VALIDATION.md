# Validation

Final local verification, 2026-10-03:

- `npm run lint`: passed (ESLint and TypeScript).
- Full Remotion render: completed all 900 frames.
- Independently decoded the final MP4 with OpenCV: 900 frames, 1280 × 720, 30 fps, 30 seconds.
- FFprobe: H.264 video, AAC audio. Video duration 30.000 s; audio duration 30.016 s (AAC frame padding).
- Inspected comparison frames at 2, 7, 10.8, 14.2, 17, 22, 24 and 29 seconds. Corrected camera framing, thumbnail crops and duplicate ending layers during review.
- Final rendered file: 12,507,377 bytes.
- SHA-256: `59b38468a8ad044c64c1cb8dd3c9d7b96eada23ec93148fa15176c85b50ca137`.

Visual fidelity was assessed manually, not with an automated similarity score. Redrawn illustration details and transitions remain approximate, as described in REQUIREMENTS.md. The phone/editor are animated artwork, not a functioning video editor application.

- Clean dependency installation with npm ci: passed.
- Remotion production bundle: passed.
