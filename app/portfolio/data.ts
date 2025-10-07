export type Project = {
  slug: string;
  name: string;
  location: string;
  hero: string;
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "ocean-vista",
    name: "Ocean Vista Resort",
    location: "Miami, FL",
    hero: "https://images.unsplash.com/photo-1578894380845-3cf7b4d4bda9?w=1600&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1628428988931-14bc33099075?w=1200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1551902954-264b0f5d7f9b?w=1200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1708640511131-9bd92f708d80?w=1200&auto=format&fit=crop&q=60",
    ],
  },
  {
    slug: "skyline-hotel",
    name: "Skyline Hotel",
    location: "New York, NY",
    hero: "https://images.unsplash.com/photo-1551902954-264b0f5d7f9b?w=1600&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1628428988931-14bc33099075?w=1200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1578894380845-3cf7b4d4bda9?w=1200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1708640511131-9bd92f708d80?w=1200&auto=format&fit=crop&q=60",
    ],
  },
  {
    slug: "emerald-cruise",
    name: "Emerald Cruise",
    location: "Caribbean",
    hero: "https://images.unsplash.com/photo-1708640511131-9bd92f708d80?w=1600&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1551902954-264b0f5d7f9b?w=1200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1628428988931-14bc33099075?w=1200&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1578894380845-3cf7b4d4bda9?w=1200&auto=format&fit=crop&q=60",
    ],
  },
];


