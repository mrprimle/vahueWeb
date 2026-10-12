# Placeholder media

Every file here is a stand-in for the native scroll hero (`components/home/scroll-hero`).
Each one matches the size and slot of the asset it replaces. To swap one in, drop your file
into `public/` and change its path in `components/home/scroll-hero/content.ts`.
`.mp4` / `.webm` paths render as muted looping video; anything else renders as an image.

| File | Slot | Size | Intended format |
| --- | --- | --- | --- |
| hero-media.svg | Opening full-bleed frame | 1920×1080 | MP4 loop (≈10s, muted) |
| stage-1…4.svg | 3D pane, one per stage | 1600×1000 | MP4 loop or image |
| quote-video.svg | Video card beside the stat | 720×1080 | MP4 loop (portrait) |
