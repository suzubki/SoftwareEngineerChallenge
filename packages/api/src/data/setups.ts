import type { Model } from "@acme/db/schema";

export const mockSetups: Model<"Setup">[] = [
  {
    id: "1",
    title: "Minimalist Developer Paradise",
    author: "Alex Chen",
    imageUrl:
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&h=600&fit=crop",
    description:
      "Clean lines, natural lighting, and everything I need for productive coding sessions.",
    likes: 42,
    tags: ["minimalist", "natural-light", "productivity"],
  },
  {
    id: "2",
    title: "RGB Gaming Battle Station",
    author: "Jordan Martinez",
    imageUrl:
      "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&h=600&fit=crop",
    description:
      "Triple monitor setup with custom RGB lighting for both work and gaming.",
    likes: 89,
    tags: ["gaming", "rgb", "multi-monitor"],
  },
  {
    id: "3",
    title: "Cozy Home Office Corner",
    author: "Sarah Johnson",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    description: "Warm and inviting workspace in the corner of my living room.",
    likes: 27,
    tags: ["cozy", "home-office", "plants"],
  },
  {
    id: "4",
    title: "Industrial Standing Desk",
    author: "Mike Thompson",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop",
    description:
      "Height-adjustable desk with industrial design and plenty of storage.",
    likes: 56,
    tags: ["standing-desk", "industrial", "storage"],
  },
  {
    id: "5",
    title: "Creative Designer's Haven",
    author: "Emma Rodriguez",
    imageUrl:
      "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=800&h=600&fit=crop",
    description:
      "Inspiring workspace with art supplies, dual monitors, and creative chaos.",
    likes: 73,
    tags: ["creative", "art", "designer"],
  },
  {
    id: "6",
    title: "Scandinavian Simplicity",
    author: "Lars Andersson",
    imageUrl:
      "https://images.unsplash.com/photo-1586617420803-97269ccc6b94?w=800&h=600&fit=crop",
    description:
      "Clean Scandinavian design with natural wood and white accents.",
    likes: 38,
    tags: ["scandinavian", "wood", "simple"],
  },
  {
    id: "7",
    title: "Tech Enthusiast Command Center",
    author: "David Kim",
    imageUrl:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    description:
      "Multiple screens, mechanical keyboards, and all the latest tech gear.",
    likes: 94,
    tags: ["tech", "mechanical-keyboard", "command-center"],
  },
  {
    id: "8",
    title: "Vintage Writer's Desk",
    author: "Rachel Green",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    description:
      "Classic wooden desk with vintage typewriter and leather chair.",
    likes: 31,
    tags: ["vintage", "writing", "classic"],
  },
  {
    id: "9",
    title: "Mobile Developer Setup",
    author: "Carlos Silva",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    description: "Compact laptop setup perfect for working from anywhere.",
    likes: 45,
    tags: ["mobile", "laptop", "portable"],
  },
  {
    id: "10",
    title: "Plant-Filled Productivity Zone",
    author: "Maya Patel",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    description:
      "Surrounded by greenery for a calming and productive work environment.",
    likes: 67,
    tags: ["plants", "green", "productivity"],
  },
  {
    id: "11",
    title: "Ultrawide Monitor Paradise",
    author: "Ryan Brooks",
    imageUrl:
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&h=600&fit=crop",
    description:
      "Single ultrawide monitor for immersive coding and design work.",
    likes: 82,
    tags: ["ultrawide", "immersive", "single-monitor"],
  },
  {
    id: "12",
    title: "Basement Dev Cave",
    author: "Tom Wilson",
    imageUrl:
      "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&h=600&fit=crop",
    description:
      "Cozy basement setup with mood lighting and comfortable seating.",
    likes: 29,
    tags: ["basement", "cozy", "mood-lighting"],
  },
];
