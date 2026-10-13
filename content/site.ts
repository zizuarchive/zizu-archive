// SITE SETTINGS: edit the text here. No other file needs touching for these.
export type Post = { platform: "Instagram" | "TikTok"; title: string; url: string; thumb?: string };

export const site = {
  name: "ZIZU.archive",
  business: "ZIZU Studios",
  email: "zizuarchive50@gmail.com",            // business email
  instagram: "https://www.instagram.com/zizu.archive/",
  tiktok: "https://www.tiktok.com/@zizu.archive",
  headline: ["Visuals with feeling.", "Stories with purpose."],
  intro: [
    "I'm a videographer, content creator, filmmaker and photographer with a passion for capturing moments, exploring perspectives and bringing ideas to life through visuals.",
    "From cinematic films and creative edits to photography and everyday moments, my work is driven by curiosity, storytelling and the details that make each frame unique.",
    "Welcome to my archive — a collection of work, experiments and perspectives that reflect how I see the world.",
  ],
  about: [
    "I'm a videographer, content creator, filmmaker and photographer who enjoys visual storytelling, composition, editing and the details that make images memorable.",
    "My work spans cinematic visuals, photography, events, lifestyle content and creative experiments.",
  ],
  // Slugs (from content/projects.ts) shown on the homepage, in this order.
  // Project (slug) used for the scroll sequence on the homepage: its cover, then its gallery.
  sequence: "players-lounge",
  featured: ["players-lounge", "social-media-vlog", "lts-personal-styling", "lunatico-bts", "paradol-ekeno", "lover-boy-syndrome-lems", "lifestyle-film", "fitness-by-ami", "before-the-vows", "new-balance-versus-blanco", "versus-behind-the-noise", "fitness-in-motion"],
  // Add price / turnaround / deliverables later: they appear automatically once filled in.
  services: [
    { title: "Videography and filmmaking", text: "Creative shoots, event coverage, visual storytelling and promotional content.", price: "", turnaround: "" },
    { title: "Video editing", text: "YouTube videos, short-form videos, cinematic edits, social media content and post-production.", price: "", turnaround: "" },
    { title: "Photography", text: "Lifestyle, street, portrait, event and creative photography.", price: "", turnaround: "" },
    { title: "Digital content creation", text: "Visual content for social platforms, creators, brands and businesses.", price: "", turnaround: "" },
  ],
  // Selected social posts. Add one object per post; leave empty to show profile links only.
  posts: [] as Post[],
};
