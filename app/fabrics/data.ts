export type Fabric = {
  slug: string;
  name: string;
  manufacturer?: string;
  category: "Blackouts" | "Sheers" | "Dyed" | "Patterns";
  image: string;
  specs: {
    application: string;
    width: string;
    designTypes: string;
    fireCodes: string;
    content: string;
    railroaded: string;
  };
};

export const FABRICS: Fabric[] = [
  {
    slug: "cali",
    name: "Cali",
    category: "Sheers",
    image: "/assets/Specialty Items/Roman Shades/Relaxed Style Roman Shade.png",
    specs: {
      application: "Drapery",
      width: "118\"",
      designTypes: "Solid / Linen-Look / Contemporary / Modern",
      fireCodes: "NFPA701",
      content: "100% Polyester",
      railroaded: "Yes",
    },
  },
  {
    slug: "noir-blackout",
    name: "Noir Blackout",
    category: "Blackouts",
    image: "/assets/Specialty Items/Roller Shades/Blackout Roller Shades.png",
    specs: {
      application: "Drapery / Shade",
      width: "110\"",
      designTypes: "Blackout / Solid",
      fireCodes: "NFPA701",
      content: "Poly / Acrylic",
      railroaded: "No",
    },
  },
  {
    slug: "linen-dyed",
    name: "Linen Dyed",
    category: "Dyed",
    image: "/assets/Project Portfolio/Andaz Miami Beach FL - GR.png",
    specs: {
      application: "Drapery",
      width: "118\"",
      designTypes: "Solid / Linen-Look",
      fireCodes: "NFPA701",
      content: "100% Polyester",
      railroaded: "Yes",
    },
  },
  {
    slug: "taupe-pattern",
    name: "Taupe Pattern",
    category: "Patterns",
    image: "/assets/Project Portfolio/The Bellevue Hotel Philadelphia PA - Public Area.png",
    specs: {
      application: "Drapery",
      width: "118\"",
      designTypes: "Patterned",
      fireCodes: "NFPA701",
      content: "Poly Blend",
      railroaded: "No",
    },
  },
];
