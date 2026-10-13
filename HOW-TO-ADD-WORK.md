# How to add your work (beginner guide)

You only ever touch two places: the **photos/videos folders** and **one file** called `content/projects.ts`.

## 1. Where files go
- Photos and video stills: `public/media/photos/`
- Videos (MP4 or WebM): `public/media/video/`
- JPG, PNG and WebP photos all work. Keep each photo under about 2 MB (export "for web"), and videos you host here under about 30 MB. Longer films are better on YouTube or Vimeo (see step 4).

## 2. Easiest way: name the file after the project
Every project has a `slug` (its short name) in `content/projects.ts`, for example `placeholder-film`. Name your files after it:

| File name | What it becomes |
|---|---|
| `placeholder-film.jpg` | the project's cover image |
| `placeholder-film-1.jpg`, `-2.jpg`, `-3.jpg` | gallery images, in order (alternates, behind the scenes) |
| `placeholder-film-before.jpg` and `-after.jpg` | the before/after slider |
| `video/placeholder-film.mp4` | the film. The cover is used as its poster image |

Save, and the site picks them up. You can also write a path by hand (`cover: "/media/photos/my-picture.jpg"`). If a file you name is missing, the site shows a labelled "Image not found" frame, never a broken-image icon.

## 3. Add a new project
1. Open `content/projects.ts`.
2. Copy the commented template just above `export const projects`, paste it under the `[` line and remove the `//` marks.
3. Change `slug` (lowercase, no spaces, unique), `title`, `category` (must be one of the listed categories), `year` and `summary`.
4. Set `ratio` to the shape of your photo: `"4/5"` Instagram portrait, `"1/1"` square, `"3/2"` landscape photo, `"16/9"` wide video, `"2.39/1"` cinematic, `"9/16"` vertical video. Matching the shape means nothing is cropped.
5. Add your photo (step 2). Optional extras: `note` (a short personal note), `role`, `gallery`, `compare`, `focus: "50% 30%"` (which part stays in view), `dark: true` (dark page for a film).
6. Delete `placeholder: true` on projects that are real. Placeholders are hatched, labelled "placeholder", and meant to be removed.
7. To feature it on the homepage, add its `slug` to `featured` in `content/site.ts` (the first is the big photo beside the headline). To use it in the scroll sequence, set `sequence` there.

## 4. Videos
- Hosted here: add `video/<slug>.mp4` and a cover photo (the poster). Phones play it inline.
- YouTube or Vimeo: set `video: { embed: "https://www.youtube.com/embed/VIDEO_ID" }` on the project.

## 5. Preview your changes
In the VS Code terminal run `npm run dev`, then open http://localhost:3000 and refresh the page after each change (restart `npm run dev` if a new file does not appear). Stop with Ctrl+C. To check for mistakes before publishing run `npm run typecheck` and `npm run build`.
