# Hero placeholder videos

Both files are stand-ins. Replace them with your own footage in the same format,
or point `components/home/scroll-hero/content.ts` at new paths.

## hero-packed-placeholder.mp4 (1920×1080, H.264, muted loop)

The homepage hero's WebGL scene reads one "packed" video:

| Region (pixels) | Contents |
| --- | --- |
| x 0–1536, y 216–1080 (bottom-left 80%) | The colour shot shown on the main frame |
| x 0–384, y 0–216 (top-left 20% tile) | Black/white mask of the same shot, scaled 25%. White shapes become the white wireframe outlines on the 3D layers |
| top-right pixel (1919, 0) | Red minus green = sideways framing offset on portrait phones. Keep it pure red (offset 1) or black (0) |

Everything else can be black. Keep it short and loopable; ~10–25 s works well.

## quote-placeholder.mp4 (720×1080, H.264, muted loop)

Fills the video card next to the stat. It is cropped with `object-cover`, so any
portrait clip works.
