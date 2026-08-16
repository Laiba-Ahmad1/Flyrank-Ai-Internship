export const projects = [
  {
    title: "Neon Drift",
    slug: "neon-drift",
    shortDescription:
      "A futuristic motion branding concept built for a digital-first racing campaign.",
    category: "2D Animation",
    fullDescription:
      "Neon Drift is a high-energy concept piece merging cinematic motion graphics with immersive UI storytelling for a fictional racing brand. The experience blends kinetic typography, atmospheric lighting, and bold product visuals to create an unmistakable sense of speed and spectacle.",
  },
  {
    title: "Northstar Studio",
    slug: "northstar-studio",
    shortDescription:
      "A polished portfolio redesign for a creative consultancy with a warm editorial feel.",
    category: "Web Dev",
    fullDescription:
      "Northstar Studio needed a digital presence that balanced trust, clarity, and creative credibility. This redesign introduced a refined editorial layout, stronger project storytelling, and a modular structure that made their services and work easier to explore.",
  },
  {
    title: "Bloom Commerce",
    slug: "bloom-commerce",
    shortDescription:
      "An e-commerce landing experience focused on conversions, storytelling, and product discovery.",
    category: "Graphic Designing",
    fullDescription:
      "Bloom Commerce is a concept storefront designed around product education and emotional brand storytelling. Built to help customers discover features quickly and move confidently toward purchase, the experience prioritizes clarity, rhythm, and visual confidence.",
  },
  {
    title: "Pulse Motion",
    slug: "pulse-motion",
    shortDescription:
      "A campaign microsite with dynamic motion principles tailored to a music release.",
    category: "Motion Graphics",
    fullDescription:
      "Pulse Motion was designed as a launch microsite for a music release, combining layered animation, strong typography, and immersive pacing. The layout creates a sense of movement and anticipation while keeping the content easy to navigate across devices.",
  },
  {
    title: "Harbor Labs",
    slug: "harbor-labs",
    shortDescription:
      "A clean and conversion-driven marketing site for a product innovation team.",
    category: "Web Dev",
    fullDescription:
      "Harbor Labs needed a clearer way to present their product strategy and engineering expertise. The site emphasizes trust, credibility, and simplicity, helping visitors understand the team and explore services through a highly structured, user-friendly layout.",
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
