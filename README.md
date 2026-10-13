# ZIZU.archive: website

**Adding your photos, films and projects? Start with `HOW-TO-ADD-WORK.md`.**

Built with Next.js, React and TypeScript. All the text and projects you will edit live in two files: `content/site.ts` and `content/projects.ts`.

## 1. Install the tools (once)
1. Go to nodejs.org and install the **LTS** version. 2. Go to code.visualstudio.com and install VS Code.

## 2. Open and run it
1. Unzip this folder. In VS Code: **File > Open Folder** and choose `zizu-archive`.
2. **Terminal > New Terminal**, then run `npm install` (wait for it to finish).
3. Run `npm run dev`, then open http://localhost:3000 in your browser. Edits appear instantly. Stop it with Ctrl+C.

## 3. Add work (open `content/projects.ts`)
- **Add a photograph:** put the file in `public/media/photos/`. Copy an existing project block, give it a new unique `slug`, and set `cover: "/media/photos/yourfile.jpg"` and `ratio` ("4/5" portrait, "3/2" landscape, "1/1" square). Delete `placeholder: true`.
- **Replace a thumbnail:** change `cover`. **Edit title, category, year, description:** edit those lines.
- **Add a video:** put an MP4 in `public/media/video/` and set `video: { src: "/media/video/x.mp4" }`. For a long film, upload to YouTube or Vimeo and use `video: { embed: "https://www.youtube.com/embed/VIDEOID" }`. Keep files in the site folder under about 30 MB. Anything bigger belongs on YouTube or Vimeo.
- **Add a gallery:** `gallery: ["/media/photos/a.jpg", "/media/photos/b.jpg"]`.
- **Reorder:** move blocks up or down. Order in the file is the order on the site.
- **Homepage selection:** edit `featured` in `content/site.ts`.

## 4. Other edits (`content/site.ts`)
Email, Instagram and TikTok links, the homepage headline and intro, services text. Add `price`, `turnaround` to a service and it appears on the Services page. To feature a social post, add `{ platform: "Instagram", title: "...", url: "https://..." }` to `posts`. Links are the reliable method. Automatic feed syncing needs API access you do not need yet.

## 5. Make the contact form send email
1. Create a free account at resend.com **using zizuarchive50@gmail.com** (until you verify your own domain, Resend only delivers to the account email).
2. Create an API key. Locally: copy `.env.example` to `.env.local` and paste the key after `RESEND_API_KEY=`.
3. Restart `npm run dev` and send a test enquiry. Never put the key in any other file.

## 6. Put it online
1. Make an account at github.com, then create a new **private** repository.
2. In the VS Code terminal: `git init`, `git add .`, `git commit -m "first version"`, then run the three commands GitHub shows you ("push an existing repository").
3. At vercel.com, sign in with GitHub, **Add New > Project**, choose the repository, and add environment variables `RESEND_API_KEY` and `NEXT_PUBLIC_SITE_URL` (your final web address). Click **Deploy**.
4. **Custom domain:** Vercel project > Settings > Domains > add your domain and follow the DNS steps it shows.
5. **Update the live site:** after any edit, run `git add .`, `git commit -m "update"`, `git push`. Vercel republishes automatically.

## Motion
The scroll animations use GSAP and live in one file: `components/Motion.tsx` (comments explain each effect). After updating, run `npm install` once more so GSAP is installed, then `npm run dev`.
- The opening animation plays once per visit. To see it again, close the tab and reopen the site.
- On phones the selected-work row is a normal swipe. On desktop it pins and moves sideways as you scroll.
- If your computer is set to "reduce motion", the site shows everything instantly with no animation.

## Cursor and small interactions
- The custom cursor is in `components/Cursor.tsx`. It appears only when you use a mouse. On phones and tablets, with "reduce motion" switched on, or if JavaScript fails, the normal cursor is used.
- It shows "VIEW PROJECT ↗" over project images and "PLAY FILM ↗" over a paused self-hosted video. To change the wording, edit the two strings in that file. Embedded YouTube/Vimeo players can't show the label, because the browser hands the mouse to the player.
- Link, button, form and previous/next styles are in the "CURSOR + MICRO-INTERACTIONS" block at the end of `app/globals.css`.
- "Currently in the archive" on the homepage lists your two newest projects that no longer have `placeholder: true`. Until you have real projects, it stays hidden.
- After updating, run `npm install` and `npm run dev`. To test: move the mouse over frames, links and the form; tab through the page with the keyboard; try the site on your phone.

## Using your real work (art-direction update)
- **Placeholders are hatched, dashed empty frames** labelled "add your photo", with "placeholder" in their captions. Anything showing a photo is real work.
- **Add a photo:** put the file in `public/media/photos/`, then in `content/projects.ts` set `cover: "/media/photos/yourfile.jpg"`. Use `focus: "50% 30%"` to choose which part stays visible when it is cropped. Set `color` to a colour from the photo (shown while it loads). Delete `placeholder: true`.
- **Behind the scenes and alternate frames:** add items to `gallery`, for example `{ src: "/media/photos/bts1.jpg", caption: "On set", kind: "bts" }`. `kind` can be `"still"`, `"alt"` (alternate frame) or `"bts"`.
- **Before/after edit comparison:** `compare: { before: "/media/photos/raw.jpg", after: "/media/photos/graded.jpg", caption: "..." }`. Remove the line if you do not need one.
- **Creative note:** the `note` line on a project appears as a short italic note on its page.
- **The signature scroll sequence on the homepage** is built from one project: its cover, then its gallery, in order. Choose the project with `sequence: "your-slug"` in `content/site.ts`. It looks best with 3 to 6 strong images.
- **Homepage selection:** the order of `featured` in `content/site.ts`. The first one is the large photograph beside the headline; the second is the small alternate frame.
- The sideways pinned reel was replaced by an asymmetric grid so the sequence is the one pinned moment.

## Final refinements
- **Drop-in photos (no code editing):** put a file in `public/media/photos/` named after the project's `slug` and it is used automatically. `my-slug.jpg` is the cover; `my-slug-1.jpg`, `my-slug-2.jpg` fill that project's `gallery` entries in order; `my-slug-before.jpg` and `my-slug-after.jpg` fill its comparison. JPG, PNG and WebP work. Restart `npm run dev` after adding files. You still edit the title, year and description in `content/projects.ts`, and delete `placeholder: true` when a project is real.
- **Placeholders stay labelled** (hatched frames, "placeholder" in captions, titles beginning "Placeholder:") until you replace them.
- **Contact form is in demo mode** (sends nothing, says so on screen) until you set up Resend (section 5 above), send yourself a test enquiry, and only then set `NEXT_PUBLIC_FORM_LIVE=true` in `.env.local` and in Vercel. Until then visitors are pointed to your email.
- **Checks:** `npm run typecheck` checks the TypeScript and `npm run build` makes a production build. If either prints errors, paste them to me.
