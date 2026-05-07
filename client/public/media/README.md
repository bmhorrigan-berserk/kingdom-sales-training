# Curriculum Media

Drop the companion video and audio files here. Filenames must match the
`src` paths defined in `client/src/lib/mediaData.ts`.

The CurriculumLesson page auto-renders a player for each item. When a
file is missing, the player shows an "Awaiting upload" empty state
listing the expected filename and path.

## Required files

### Video (.mp4, H.264 + AAC, 1080p preferred)
- `kingdom-standard-performance-audit.mp4` — companion for I-1
- `medical-authority-opening.mp4` — companion for 1-1
- `modern-sales-framework.mp4` — companion for 2-1
- `kingdom-value-stack.mp4` — companion for 3-1
- `high-status-objection-handling.mp4` — companion for 4-1
- `199-logistics-close.mp4` — companion for 5-1
- `deconstructing-the-kingdom-sales-engine.mp4` — capstone, R-8

### Audio (.mp3 or .m4a)
- `selling-the-legacy-self.mp3` — companion for I-1
- `current-clinic-commodity-trap.m4a` — companion for 4-10
- `why-we-use-spouses-as-shields.m4a` — companion for 4-10
- `time-to-think-aggressive-approach.m4a` — companion for 4-10
- `pending-labs-aggressive-empathy.m4a` — companion for 4-10
- `payment-delay-polite-negligence.m4a` — companion for 5-8

## Hosting notes

- Files larger than ~50MB bloat the git repo. For long-form video, host
  externally (Vimeo Pro, Cloudflare R2, S3) and replace the `src` field
  in `mediaData.ts` with the full https URL. The MediaPanel component
  works with both local and remote sources.
- For Vimeo / YouTube embeds you will need to swap the `<video>` tag
  for an `<iframe>` in `MediaPanel.tsx`. Ask before doing that so the
  styling stays consistent.
