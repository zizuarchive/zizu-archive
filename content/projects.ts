// PORTFOLIO DATA. Add, remove or reorder projects here. Order here = order on the site.
// To use REAL work: put files in public/media/photos (or /video), then fill in `cover`, `gallery`, etc.
// Delete `placeholder: true` once a project is real. Placeholders are drawn as hatched empty frames.
export const categories = ["Film", "Photography", "Video Editing", "Social Media", "Digital Content"] as const;
export type Category = (typeof categories)[number];

// One extra image in a project: an alternate frame, a behind-the-scenes photo, or a plain still.
export type Shot = { src?: string; broken?: string; caption?: string; kind?: "still" | "alt" | "bts"; ratio?: string };

export type Project = {
  slug: string;            // web address: /work/<slug>
  detailPage?: boolean;    // set false to keep an archive card without a project detail route
  title: string;
  category: Category;
  year: string;
  ratio: string;           // thumbnail shape: "4/5", "9/16", "1/1", "3/2", "2.39/1"
  color: string;           // background colour shown while your image loads (pick a colour from the photo)
  cover?: string;          // "/media/photos/my-photo.jpg"
  focus?: string;          // which part stays in view when cropped, e.g. "50% 30%"
  alt?: string;            // describe the image for screen readers
  video?: { src?: string; embed?: string; missing?: string };   // src: "/media/video/x.mp4"  or  embed: a YouTube/Vimeo embed URL
  summary: string;
  note?: string;           // a short creative note in your own words
  intention?: string;
  role?: string;
  details?: string[];
  gallery?: Shot[];        // alternate frames, behind the scenes, more stills
  compare?: { before?: string; after?: string; caption?: string };  // editing/grade comparison
  broken?: string;         // set automatically if a file you named is missing
  dark?: boolean;          // optional: give this project's page a dark background (for a film)
  n?: number;              // frame number, set automatically
  placeholder?: boolean;   // delete this line once the project is real
};

// TO ADD A PROJECT: copy this block, paste it just below the "[" line, and edit it.
// { slug: "my-new-project", title: "My new project", category: "Photography", year: "2026",
//   ratio: "4/5", color: "#8a6a3a", summary: "One or two sentences about it." },
// Then add public/media/photos/my-new-project.jpg. That is all. (See HOW-TO-ADD-WORK.md.)
export const projects: Project[] = [
  { slug: "players-lounge", title: "The Player's Lounge", category: "Photography", year: "2026", ratio: "4/5", color: "#2a2f3a",
    cover: "/media/optimized/DSC00216.jpg",
    alt: "Three friends seated beneath The Player's Lounge sign.",
    summary: "A portrait-led study of The Player's Lounge, bringing together the people, signage and atmosphere of a shared space.",
    note: "The oversized sign frames a relaxed group portrait, balancing the venue's bold identity with the people who bring the space to life.",
    role: "Photography and image editing",
    gallery: [
     { src: "/media/optimized/blanco-performance.jpg", caption: "An establishing view of The Player's Lounge sign.", kind: "alt" },
    ],
  },
  { slug: "social-media-vlog", title: "Social Media Vlog", category: "Social Media", year: "2026", ratio: "16/9", color: "#2a2f3a",
    cover: "/media/social/m7-vlog-poster.jpg",
    video: { src: "/media/social/m7 vlog with colour.mov" },
    alt: "A social media vlog created for TikTok.",
    summary: "A TikTok vlog capturing a day through colour and candid moments." },
  { slug: "lts-personal-styling", title: "LTS", category: "Social Media", year: "2026", ratio: "9/16", color: "#2a2f3a",
    cover: "/media/social/lts-personal-styling-poster.jpg",
    video: { src: "/media/social/lts-personal-styling.mp4" },
    alt: "A vertical personal styling video for LTS.",
    summary: "A vertical personal styling video showcasing LTS looks and details." },
  { slug: "lunatico-bts", title: "Lunatico BTS", category: "Digital Content", year: "2026", ratio: "16/9", color: "#2a2f3a",
    cover: "/media/social/lunatico bts.mp4.png",
    video: { src: "/media/social/lunatico bts.mp4" },
    alt: "Behind-the-scenes footage from a Lunatico clothing brand shoot.",
    summary: "Behind the scenes of a clothing brand shoot for Lunatico." },
  { slug: "paradol-ekeno", title: "PARADOL — EKENO", category: "Film", year: "2026", ratio: "9/16", color: "#2a2f3a",
    cover: "/media/social/PARADOL — EKENO.mp4.png",
    video: { src: "/media/social/PARADOL — EKENO.mp4" },
    alt: "EKENO performing in the PARADOL music promo.",
    summary: "Music promo video for PARADOL by EKENO." },
  { slug: "lover-boy-syndrome-lems", title: "Lover Boy Syndrome — Lems", category: "Film", year: "2026", ratio: "9/16", color: "#2a2f3a",
    cover: "/media/social/lems-lover-boy-syndrome.mov.png",
    video: { src: "/media/social/lems-lover-boy-syndrome-v2.mp4" },
    alt: "Lems in the Lover Boy Syndrome music promo.",
    summary: "Music promo video for Lover Boy Syndrome by Lems." },
  { slug: "lifestyle-film", title: "Lifestyle Film", category: "Film", year: "2026", ratio: "9/16", color: "#2a2f3a",
    cover: "/media/social/lifestyle-film.mp4.png",
    video: { src: "/media/social/lifestyle-film.mp4" },
    alt: "A portrait-oriented lifestyle film in a garden setting.",
    summary: "A vertical lifestyle film captured in a green garden setting." },
  { slug: "fitness-by-ami", title: "Fitness by Ami", category: "Social Media", year: "2026", ratio: "9/16", color: "#2a2f3a",
    cover: "/media/social/fitness-by-ami.mov.png",
    video: { src: "/media/social/fitness-by-ami.mov" },
    alt: "A vertical fitness video for Ami.",
    summary: "A portrait-format social video for Fitness by Ami." },
  { slug: "before-the-vows", title: "Before the Vows", category: "Social Media", year: "2026", ratio: "16/9", color: "#2a2f3a",
    cover: "/media/social/before-the-vows.mov.png",
    video: { src: "/media/social/before-the-vows.mov" },
    alt: "Wedding highlights from Before the Vows.",
    summary: "Wedding highlights captured before the vows." },
  { slug: "new-balance-versus-blanco", title: "New Balance × Versus", category: "Social Media", year: "2026", ratio: "9/16", color: "#2a2f3a",
    cover: "/media/social/new-balance-versus-blanco.mov.png",
    video: { src: "/media/social/new-balance-versus-blanco.mov" },
    alt: "Blanco performing live at the New Balance × Versus event.",
    summary: "A high-energy event Reel capturing Blanco performing live at the New Balance × Versus event." },
  { slug: "versus-behind-the-noise", detailPage: false, title: "Versus — Behind the Noise", category: "Photography", year: "2026", ratio: "3/4", color: "#2a2f3a",
    cover: "/media/photos/blanco-performance.jpeg",
    alt: "Blanco performing live at Versus.",
    summary: "An event photo story capturing the performance, crowd, and atmosphere at Versus.",
    gallery: [
      { src: "/media/photos/blanco-performance-bw.jpeg", caption: "A monochrome frame from Blanco's performance.", kind: "alt", ratio: "3/4" },
      { src: "/media/optimized/versus-crowd.jpg", caption: "The crowd gathered for the event.", kind: "bts", ratio: "3/4" },
      { src: "/media/optimized/versus-dj.jpg", caption: "The DJ keeping the event moving.", kind: "still", ratio: "3/4" },
    ] },
  { slug: "fitness-in-motion", title: "Fitness in Motion", category: "Photography", year: "2026", ratio: "3/4", color: "#2a2f3a",
    cover: "/media/optimized/fitness-session.jpg",
    alt: "A fitness training session in progress.",
    summary: "A photography series capturing strength, movement, and recovery.",
    gallery: [
      { src: "/media/optimized/fitness-stretching.jpg", caption: "A stretching moment after the session.", kind: "alt", ratio: "3/4" },
    ] },
];
