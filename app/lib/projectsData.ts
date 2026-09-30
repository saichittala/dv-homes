export interface ProjectDetail {
  id: string;
  title: string;
  location: string;
  projectType: string;
  scope: string;
  designStyle: string;
  completionYear: string;
  mainImage: string;
  gallery: string[];
  metaTitle: string;
  metaDescription: string;
  concept: string;
  materials: string[];
  keyFeatures: string[];
  challenge: string;
  solution: string;
  relatedServiceId: string;
  relatedLocationSlug: string;
}

export const projectsData: ProjectDetail[] = [
  {
    id: "kokapet-gated-villa-interior",
    title: "Gated Villa Interior in Kokapet",
    location: "Kokapet, Hyderabad",
    projectType: "Luxury Villa",
    scope: "Full Turnkey Interior Design & Execution",
    designStyle: "Warm Contemporary Minimalist",
    completionYear: "2026",
    mainImage: "/assets/parthu/viswajeet-villa.jpg",
    gallery: [
      "/assets/parthu/viswajeet-villa.jpg",
      "/assets/parthu/hero-living.jpg",
      "/assets/parthu/modular-kitchen.jpg",
      "/assets/parthu/puja-room.jpg"
    ],
    metaTitle: "Kokapet Luxury Villa Interior Design Project Showcase | DV Homes",
    metaDescription: "Explore this complete turnkey luxury villa interior project in Kokapet, Hyderabad featuring Italian marble, fluted panelling & custom BWP marine plywood woodwork.",
    concept: "Designed for an executive family in Kokapet, this 5,400 sq. ft. villa seamlessly blends modern architectural minimalism with warm natural textures. The living space revolves around a double-height ceiling anchored by Italian marble wall cladding and integrated magnetic track lights.",
    materials: [
      "Book-Matched Botticino Italian Marble",
      "Natural Teak Wood Veneer Louvers",
      "100% Boiling Water Proof (BWP) Marine Plywood",
      "Anti-Fingerprint Acrylic Shutters",
      "PVD Coated Stainless Steel Metal Trims"
    ],
    keyFeatures: [
      "Double-height living room TV console with ambient LED backlight coving",
      "German modular kitchen with island breakfast counter & quartz top",
      "Custom Burma teak pooja mandir with brass bell jaali inlay",
      "Master suite walk-in closet with tinted fluted glass sliding doors"
    ],
    challenge: "The primary challenge was managing acoustical reverberation across the expansive double-height living room without adding heavy curtain draping.",
    solution: "DV Homes engineered custom micro-perforated veneer wall panels backed by high-density acoustic insulation, maintaining sleek visual minimalism while ensuring crystal-clear acoustics.",
    relatedServiceId: "villa-interiors",
    relatedLocationSlug: "kokapet"
  },
  {
    id: "financial-district-3bhk-apartment",
    title: "Contemporary 3BHK Apartment",
    location: "Financial District, Hyderabad",
    projectType: "High-Rise Apartment",
    scope: "Complete Residential Interior Execution",
    designStyle: "Modern Urban Luxury",
    completionYear: "2026",
    mainImage: "/assets/parthu/hero-living.jpg",
    gallery: [
      "/assets/parthu/hero-living.jpg",
      "/assets/parthu/bedroom-suite.jpg",
      "/assets/parthu/kitchen-detail-1.jpg",
      "/assets/parthu/dining-interior.jpg"
    ],
    metaTitle: "Financial District 3BHK Apartment Interior Project | DV Homes",
    metaDescription: "Inside a contemporary 3BHK high-rise apartment interior in Financial District, Hyderabad. Custom modular kitchen, master suite & space-maximizing layouts.",
    concept: "A modern 2,200 sq. ft. high-rise apartment designed for a technology leader. The design emphasizes clean horizontal lines, concealed storage, and a cohesive neutral color palette accented by muted emerald and warm oak tones.",
    materials: [
      "BWP Marine Plywood Carcass",
      "Matte Charcoal Louvered Panels",
      "Calacatta Quartz Kitchen Countertop",
      "Soft-Close Blum Tandembox Hardware"
    ],
    keyFeatures: [
      "Floating TV console with concealed cable management and soundbar recess",
      "Parallel modular kitchen with pull-out pantry tower and tandem drawers",
      "Ergonomic home office workstation with floating shelves and under-shelf task LEDs"
    ],
    challenge: "Maximizing storage capacity in the master bedroom while preserving comfortable walking clearance around the king bed frame.",
    solution: "We custom-built a floor-to-ceiling sliding wardrobe with top-hung Blum tracks, incorporating an integrated dresser mirror to save 18 inches of floor space.",
    relatedServiceId: "apartment-interiors",
    relatedLocationSlug: "financial-district"
  },
  {
    id: "jubilee-hills-luxury-residence",
    title: "Luxury Residence in Jubilee Hills",
    location: "Jubilee Hills, Hyderabad",
    projectType: "Private Luxury Residence",
    scope: "Architectural Interior Design & Furnishing",
    designStyle: "Timeless Luxury & Art Deco Accents",
    completionYear: "2026",
    mainImage: "/assets/parthu/rajasekhar-home.jpg",
    gallery: [
      "/assets/parthu/rajasekhar-home.jpg",
      "/assets/parthu/dining-interior.jpg",
      "/assets/parthu/viswajeet-villa.jpg",
      "/assets/parthu/puja-room.jpg"
    ],
    metaTitle: "Jubilee Hills Luxury Residence Interior Design Project | DV Homes",
    metaDescription: "Exclusive luxury interior design showcase for a private residence in Jubilee Hills, Hyderabad. Rare veneers, brass accents & bespoke furniture.",
    concept: "An exquisite luxury residence in Jubilee Hills featuring handcrafted wood veneer panelling, custom velvet sofa suites, a private wine display console, and opulent master suites.",
    materials: [
      "Imported Italian Dyued Veneer",
      "PVD Rose Gold Metal Inlays",
      "Custom Upholstered Italian Leather & Velvet",
      "Tinted Fluted Glass Cabinets"
    ],
    keyFeatures: [
      "Custom bar & crockery suite with sensor-touch lighting",
      "Master bedroom with velvet tufted headboard and fluted wall panel backdrop",
      "Private lounge area with accent track lighting"
    ],
    challenge: "Integrating modern home automation switchboards seamlessly into custom wood veneer panelling.",
    solution: "DV Homes precision CNC-routed flush metal trim housings so automation keypads sit perfectly flush with the veneer surface.",
    relatedServiceId: "luxury-interior-design",
    relatedLocationSlug: "jubilee-hills"
  },
  {
    id: "gachibowli-modular-kitchen-suite",
    title: "Modern Modular Kitchen Suite",
    location: "Gachibowli, Hyderabad",
    projectType: "Kitchen & Dining Renovation",
    scope: "Modular Kitchen & Dining Interior",
    designStyle: "German Ergonomic Minimalist",
    completionYear: "2026",
    mainImage: "/assets/parthu/modular-kitchen.jpg",
    gallery: [
      "/assets/parthu/modular-kitchen.jpg",
      "/assets/parthu/kitchen-detail-1.jpg",
      "/assets/parthu/kitchen-detail-2.jpg"
    ],
    metaTitle: "Gachibowli Modular Kitchen Interior Design Project | DV Homes",
    metaDescription: "Step inside a high-performance German modular kitchen in Gachibowli, Hyderabad built with 100% BWP marine plywood & anti-fingerprint acrylic shutters.",
    concept: "Designed for a family passionate about cooking, this kitchen features a high-durability BWP marine plywood carcass, anti-fingerprint white acrylic shutters, quartz waterfall counter, and Hafele magic corner accessories.",
    materials: [
      "100% BWP Marine Plywood",
      "Anti-Fingerprint Acrylic",
      "Calacatta Gold Quartz",
      "Hafele Soft-Close Tandembox Systems"
    ],
    keyFeatures: [
      "Pantry pull-out unit with 6 adjustable basket layers",
      "Under-cabinet sensor LED illumination for food preparation areas",
      "Built-in microwave and oven appliance tower"
    ],
    challenge: "Protecting kitchen cabinetry against heavy water exposure around the double-bowl sink area.",
    solution: "The sink module was constructed using 100% waterproof BWP marine plywood sealed with SS304 aluminum foil liner drip trays.",
    relatedServiceId: "modular-kitchens",
    relatedLocationSlug: "gachibowli"
  },
  {
    id: "madhapur-minimalist-master-suite",
    title: "Minimalist Master Suite",
    location: "Madhapur, Hyderabad",
    projectType: "Master Bedroom & Walk-in Closet",
    scope: "Bedroom Interior Design",
    designStyle: "Warm Japandi & Minimalist",
    completionYear: "2026",
    mainImage: "/assets/parthu/bedroom-suite.jpg",
    gallery: [
      "/assets/parthu/bedroom-suite.jpg",
      "/assets/parthu/study-room.jpg",
      "/assets/parthu/after-room.jpg"
    ],
    metaTitle: "Madhapur Minimalist Master Suite Interior Design Project | DV Homes",
    metaDescription: "A calm, spa-like master bedroom interior design in Madhapur, Hyderabad featuring custom upholstered headboard & walk-in wardrobe closet.",
    concept: "Designed as a tranquil sanctuary away from the city's pulse, this master suite combines soft oat upholstery, warm wood tones, fluted glass wardrobe panels, and indirect coves.",
    materials: [
      "Custom Boucle Upholstery",
      "Natural Ash Wood Veneer",
      "Fluted Glass Wardrobe Panels",
      "Warm 3000K Architectural Cove Lighting"
    ],
    keyFeatures: [
      "Floating bed structure with concealed nightstand drawers and wireless charging ports",
      "Walk-in closet with velvet jewelry organizers and sensor LED clothing rods"
    ],
    challenge: "Creating a serene atmosphere while accommodating substantial storage requirements.",
    solution: "We designed a hidden walk-in closet behind a seamless fluted glass partition wall, keeping clothes out of sight from the main sleeping area.",
    relatedServiceId: "bedrooms",
    relatedLocationSlug: "madhapur"
  }
];
