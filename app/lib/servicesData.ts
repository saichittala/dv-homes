export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  mainImage: string;
  gallery: string[];
  features: string[];
  specs: {
    material: string;
    warranty: string;
    hardware: string;
    turnaround: string;
  };
  metaTitle?: string;
  metaDescription?: string;
  faqs?: { question: string; answer: string }[];
}

export const servicesData: ServiceDetail[] = [
  // --- CORE INTENT SERVICES ---
  {
    id: "home-interior-design",
    title: "Complete Home Interior Design",
    category: "Turnkey Interiors",
    tagline: "End-to-end residential interior design & execution across Hyderabad",
    description: "Complete home interior design by DV Homes takes full responsibility for your entire living space from raw floorplan to final handover. We combine spatial planning, 3D visualization, factory-controlled manufacturing at Kokapet, electrical ceiling design, custom woodwork, quartz installation, and white-glove site cleaning.",
    mainImage: "/assets/parthu/hero-living.jpg",
    gallery: [
      "/assets/parthu/hero-living.jpg",
      "/assets/parthu/viswajeet-villa.jpg",
      "/assets/parthu/bedroom-suite.jpg",
      "/assets/parthu/modular-kitchen.jpg"
    ],
    features: [
      "Dedicated Lead Designer (Arige Praveenkumar) & Site Project Engineer",
      "100% Boiling Water Proof (BWP) Marine Plywood Construction",
      "German Soft-Close Fittings (Blum & Hafele) with 10-Year Warranty",
      "Itemized Transparent Pricing - Zero Unexpected Budget Creep",
      "45-Day Factory-to-Site Execution Commitment"
    ],
    specs: {
      material: "BWP Grade Marine Plywood, Acrylic, PU & Natural Veneers",
      warranty: "10 Years Structural Warranty",
      hardware: "Blum Tandembox & Hafele German Systems",
      turnaround: "45 Days Factory Execution"
    },
    metaTitle: "Complete Home Interior Design & Turnkey Execution Hyderabad | DV Homes",
    metaDescription: "Comprehensive end-to-end home interior design & execution in Hyderabad. BWP marine plywood, German hardware, transparent budgeting & 10-year warranty.",
    faqs: [
      {
        question: "What is included in a complete home interior project?",
        answer: "Our turnkey package covers modular kitchen, master & guest wardrobes, living room TV console & panelling, dining area crockery unit, foyer, pooja mandir, false ceiling with magnetic track lights, electrical work, paint, and final deep cleaning."
      },
      {
        question: "Where are your interiors manufactured?",
        answer: "85% of precision cutting, edge-banding, and drilling is performed at our state-of-the-art manufacturing facility in Kokapet, Hyderabad. This ensures dust-free, high-quality on-site assembly."
      }
    ]
  },
  {
    id: "luxury-interior-design",
    title: "Bespoke Luxury Interiors",
    category: "Luxury Residences",
    tagline: "Architectural grandeur & rare materials for discerning Hyderabad homes",
    description: "Our luxury interior design studio creates signature living environments for luxury villas, penthouse suites, and high-end residences in Jubilee Hills, Banjara Hills, Kokapet, and Financial District. Featuring Italian marble, natural book-matched veneers, brass PVD accents, and custom upholstered furnishings.",
    mainImage: "/assets/parthu/rajasekhar-home.jpg",
    gallery: [
      "/assets/parthu/rajasekhar-home.jpg",
      "/assets/parthu/hero-living.jpg",
      "/assets/parthu/viswajeet-villa.jpg",
      "/assets/parthu/dining-interior.jpg"
    ],
    features: [
      "Book-Matched Italian Marble & Charcoal Louver Wall Cladding",
      "Custom Fluted Glass & PVD Gold Stainless Steel Screens",
      "Acoustically Treated Master Suites with Leather Headboards",
      "Bespoke Bar & Wine Display Suites with Sensor Backlighting",
      "White-Glove Design Supervision from Concept to Handover"
    ],
    specs: {
      material: "Italian Marble, Burma Teak, PVD Steel & Natural Veneers",
      warranty: "10 Years Structural Warranty",
      hardware: "Hafele Premium Concealed & Soft-Close Hardware",
      turnaround: "50-60 Days Customized Fabrication"
    },
    metaTitle: "Bespoke Luxury Interior Designers in Hyderabad | DV Homes",
    metaDescription: "Luxury interior design for private villas, estates & luxury apartments in Jubilee Hills, Banjara Hills & Kokapet. Italian marble, veneers & fine finishes.",
    faqs: [
      {
        question: "Do you design custom furniture for luxury residences?",
        answer: "Yes, we custom-fabricate sofa suites, upholstered headboards, dining tables, console units, and bar cabinets to match your exact interior architectural theme."
      }
    ]
  },
  {
    id: "apartment-interiors",
    title: "Apartment Interior Design",
    category: "Apartments",
    tagline: "Space-maximizing luxury layouts for 2BHK, 3BHK & 4BHK apartments",
    description: "Modern apartment interior design in Hyderabad demands smart spatial planning, high storage efficiency, and elegant lighting. We specialize in transforming high-rise gated community apartments in Madhapur, Gachibowli, Kondapur, Financial District, and Nanakramguda into expansive, serene sanctuaries.",
    mainImage: "/assets/parthu/bedroom-suite.jpg",
    gallery: [
      "/assets/parthu/bedroom-suite.jpg",
      "/assets/parthu/hero-living.jpg",
      "/assets/parthu/modular-kitchen.jpg",
      "/assets/parthu/after-room.jpg"
    ],
    features: [
      "Custom Floor-to-Ceiling Wardrobes with Loft Storage Extensions",
      "Integrated Space-Saving Ergonomic Workstations & Study Units",
      "Acoustic Wall Panelling for Reduced Inter-Apartment Ambient Noise",
      "Anti-Fingerprint Acrylic & Matte Laminate Finishes",
      "Compact Dining & Foyer Storage Systems"
    ],
    specs: {
      material: "BWP Marine Plywood & Acrylic/Laminate Finishes",
      warranty: "10 Years Structural Warranty",
      hardware: "Blum Tandembox & Hettich German Slides",
      turnaround: "40 Days Delivery & Assembly"
    },
    metaTitle: "Modern Apartment Interior Design in Hyderabad | DV Homes",
    metaDescription: "Specialized interior design for 2BHK, 3BHK & 4BHK apartments in Madhapur, Gachibowli & Kondapur. Smart storage, BWP marine plywood & 10-yr warranty.",
    faqs: [
      {
        question: "How do you maximize space in 2BHK or 3BHK apartments?",
        answer: "We utilize floor-to-ceiling wardrobe lofts, sliding doors, hidden bed drawers, floating TV consoles, and fluted glass partitions to create open sightlines and eliminate clutter."
      }
    ]
  },
  {
    id: "villa-interiors",
    title: "Villa Interior Design",
    category: "Villas & Estates",
    tagline: "Expansive spatial planning & architectural harmony for multi-story villas",
    description: "Designing a villa requires a master layout strategy that connects multi-level living areas, grand entrance foyers, private bedrooms, outdoor lounges, and sacred spaces into one harmonious narrative. DV Homes brings deep expertise in villa interiors across Kokapet, Jubilee Hills, and Kompally.",
    mainImage: "/assets/parthu/viswajeet-villa.jpg",
    gallery: [
      "/assets/parthu/viswajeet-villa.jpg",
      "/assets/parthu/hero-living.jpg",
      "/assets/parthu/puja-room.jpg",
      "/assets/parthu/dining-interior.jpg"
    ],
    features: [
      "Double-Height Feature Ceiling Panelling & Chandelier Backdrops",
      "Custom Teak Wood Mandirs with Handcrafted Brass Detail",
      "Private Home Theater Wall Acoustic Treatments",
      "Island Modular Kitchens with Secondary Utility Dirty Kitchens",
      "Courtyard & Balcony Terrace Bar Consoles"
    ],
    specs: {
      material: "Burma Teak, BWP Marine Plywood, Italian Marble & Quartz",
      warranty: "10 Years Structural Warranty",
      hardware: "Heavy-Duty Commercial German Fittings",
      turnaround: "50-60 Days Turnkey Execution"
    },
    metaTitle: "Luxury Villa Interior Design & Execution Hyderabad | DV Homes",
    metaDescription: "Comprehensive interior design for luxury villas & independent homes in Kokapet, Jubilee Hills & Kompally. Grand double-height layouts & fine woodwork.",
    faqs: [
      {
        question: "Can you handle civil and electrical modifications during villa execution?",
        answer: "Yes, our turnkey team manages all civil alterations, plumbing rewiring, ceiling grid modifications, and electrical magnetic track lighting."
      }
    ]
  },
  {
    id: "modular-kitchens",
    title: "German Modular Kitchens",
    category: "Kitchens",
    tagline: "Ergonomically engineered kitchens blending aesthetics and efficiency",
    description: "Experience the perfect harmony of German modular engineering and luxury design. Manufactured in our Kokapet facility, our kitchens feature 100% waterproof BWP marine plywood, anti-fingerprint acrylic and PU finishes, quartz counter surfaces, and intelligent pantry organizers.",
    mainImage: "/assets/parthu/modular-kitchen.jpg",
    gallery: [
      "/assets/parthu/modular-kitchen.jpg",
      "/assets/parthu/kitchen-detail-1.jpg",
      "/assets/parthu/kitchen-detail-2.jpg",
      "/assets/parthu/viswajeet-villa.jpg"
    ],
    features: [
      "100% Boiling Water Proof (BWP) Marine Plywood Carcass",
      "Hafele & Blum Soft-Close Drawer & Lift-up Systems",
      "Italian Quartz & Calacatta Marble Countertops",
      "Pull-out Pantry Towers & Blind Corner Magic Trays",
      "Seamless Built-in Appliance Cabinets"
    ],
    specs: {
      material: "Marine BWP Plywood + Anti-Fingerprint Acrylic / PU",
      warranty: "10 Years Structural Warranty",
      hardware: "Blum Tandembox & Hafele Hettich Systems",
      turnaround: "40 Days Delivery & Installation"
    },
    metaTitle: "German Modular Kitchen Design Hyderabad | BWP Plywood | DV Homes",
    metaDescription: "Custom modular kitchens in Hyderabad built with 100% BWP marine plywood, quartz counters & Blum/Hafele German fittings. 10-year warranty.",
    faqs: [
      {
        question: "Why use BWP Marine Plywood instead of Commercial Plywood or MDF?",
        answer: "BWP (Boiling Water Proof) Marine Plywood uses synthetic phenol formaldehyde resin, making it completely impervious to water leakage, termite attack, and humidity warp—essential for Indian cooking habits."
      }
    ]
  },
  {
    id: "wardrobe-design",
    title: "Bespoke Wardrobes & Storage",
    category: "Storage",
    tagline: "Custom sliding, hinged & walk-in wardrobe suites crafted for luxury",
    description: "Maximize your bedroom storage with custom wardrobes engineered for organization and style. From floor-to-ceiling glass sliding doors with LED sensor profiles to velvet-lined jewelry drawers, pull-out trouser racks, and concealed safes.",
    mainImage: "/assets/parthu/bedroom-suite.jpg",
    gallery: [
      "/assets/parthu/bedroom-suite.jpg",
      "/assets/parthu/rajasekhar-home.jpg",
      "/assets/parthu/study-room.jpg",
      "/assets/parthu/hero-living.jpg"
    ],
    features: [
      "Tinted Fluted Glass & Mirror Sliding Door Panels",
      "Integrated Automatic Sensor LED Wardrobe Strip Lights",
      "Velvet Accessories Drawers & Pull-Out Shoe Trays",
      "Concealed Biometric Safes & Laundry Baskets",
      "Heavy-Duty Top-Hung Soft-Close Sliding Track Systems"
    ],
    specs: {
      material: "BWP Marine Plywood, Tinted Glass & High-Gloss Acrylic",
      warranty: "10 Years Structural Warranty",
      hardware: "Hafele Slido & Hettich InLine Sliding Systems",
      turnaround: "35 Days Installation"
    },
    metaTitle: "Bespoke Modular Wardrobe Design Hyderabad | DV Homes",
    metaDescription: "Custom luxury wardrobes, sliding door closets & walk-in closet suites in Hyderabad. Fluted glass, BWP plywood & sensor lighting.",
    faqs: [
      {
        question: "Which is better: Sliding wardrobes or Hinged wardrobes?",
        answer: "Sliding wardrobes are ideal for rooms where floor space in front of the wardrobe is tight. Hinged wardrobes offer full visibility of all compartments at once and work great in larger master bedrooms or walk-in closets."
      }
    ]
  },
  {
    id: "turnkey-interiors",
    title: "Turnkey Interior Execution",
    category: "Execution",
    tagline: "Single-point responsibility from initial design to final key handover",
    description: "Eliminate the stress of coordinating multiple sub-contractors, electricians, painters, and carpenters. DV Homes turnkey execution handles every single detail with single-point accountability, transparent budgeting, and strict milestone tracking.",
    mainImage: "/assets/parthu/viswajeet-villa.jpg",
    gallery: [
      "/assets/parthu/viswajeet-villa.jpg",
      "/assets/parthu/hero-living.jpg",
      "/assets/parthu/after-room.jpg",
      "/assets/parthu/kitchen-detail-1.jpg"
    ],
    features: [
      "Single Point of Contact - Founder & Project Director",
      "Factory-Driven Woodwork Execution from Kokapet Facility",
      "Comprehensive Civil, Plumbing, Electrical & Ceiling Coordination",
      "Rigorous 50-Point Quality Assurance Audit Prior to Handover",
      "Post-Handover Support & 10-Year Structural Guarantee"
    ],
    specs: {
      material: "BWP Marine Plywood, Premium Paints & Quartz",
      warranty: "10 Years Structural Warranty",
      hardware: "Top-tier German Soft-Close Fittings",
      turnaround: "45 Days Factory-to-Site Delivery"
    },
    metaTitle: "Turnkey Home Interior Execution Company in Hyderabad | DV Homes",
    metaDescription: "Hassle-free turnkey home interior design & execution in Hyderabad. Direct factory manufacturing at Kokapet, transparent pricing & 10-year warranty.",
    faqs: [
      {
        question: "How does DV Homes prevent project budget overruns?",
        answer: "We provide an itemized, transparent BOQ (Bill of Quantities) based on frozen 3D designs before work starts. Once signed, your price is locked with zero surprise additions."
      }
    ]
  },

  // --- ROOM & CATEGORY SERVICES ---
  {
    id: "bedrooms",
    title: "Master & Guest Bedrooms",
    category: "Bedrooms",
    tagline: "Turn your bedroom into a peaceful sanctuary with bespoke luxury design",
    description: "Your bedroom is your private sanctuary. Our bespoke bedroom interior designs combine quiet luxury, ergonomic spatial planning, and high-end material finishes. From custom upholstered headboards and fluted paneling to velvet-lined wardrobe drawers and integrated mood lighting, every detail is engineered to create a tranquil, spa-like atmosphere.",
    mainImage: "/assets/parthu/bedroom-suite.jpg",
    gallery: [
      "/assets/parthu/bedroom-suite.jpg",
      "/assets/parthu/rajasekhar-home.jpg",
      "/assets/parthu/study-room.jpg"
    ],
    features: [
      "Custom Upholstered Velvet & Italian Leather Headboards",
      "Sliding Fluted Glass & Mirror Panel Wardrobes",
      "Integrated Sensor LED Strip Illumination",
      "Concealed Bedside Drops & Smart Automation Switchboards",
      "Custom Floating Vanity Units & Dressers"
    ],
    specs: {
      material: "BWP Grade Marine Plywood & Acrylic/PU Spray Finish",
      warranty: "10 Years Structural Warranty",
      hardware: "Hafele & Blum Soft-Close German Fittings",
      turnaround: "45 Days Factory-to-Site Installation"
    },
    metaTitle: "Luxury Bedroom Interior Design Hyderabad | DV Homes",
    metaDescription: "Bespoke bedroom interior design in Hyderabad. Custom headboards, wardrobes, ambient LED lighting & vanity dressers with 10-year warranty."
  },
  {
    id: "kitchens",
    title: "Kitchens & Pantries",
    category: "Kitchens",
    tagline: "Ergonomically engineered kitchens blending aesthetics and efficiency",
    description: "Experience the perfect harmony of German modular engineering and luxury design. Manufactured in our state-of-the-art Kokapet facility, our kitchens feature 100% waterproof BWP marine plywood, anti-fingerprint acrylic and PU finishes, quartz counter surfaces, and intelligent pantry organizers.",
    mainImage: "/assets/parthu/modular-kitchen.jpg",
    gallery: [
      "/assets/parthu/modular-kitchen.jpg",
      "/assets/parthu/kitchen-detail-1.jpg",
      "/assets/parthu/kitchen-detail-2.jpg",
      "/assets/parthu/viswajeet-villa.jpg"
    ],
    features: [
      "100% Boiling Water Proof (BWP) Marine Plywood Carcass",
      "Hafele & Blum Soft-Close Drawer & Lift-up Systems",
      "Italian Quartz & Calacatta Marble Countertops",
      "Pull-out Pantry Towers & Blind Corner Magic Trays",
      "Seamless Built-in Appliance Cabinets"
    ],
    specs: {
      material: "Marine BWP Plywood + Anti-Fingerprint Acrylic / PU",
      warranty: "10 Years Structural Warranty",
      hardware: "Blum Tandembox & Hafele Hettich Systems",
      turnaround: "40 Days Delivery & Installation"
    },
    metaTitle: "Modular Kitchen Interior Designers Hyderabad | DV Homes",
    metaDescription: "High-end modular kitchen interiors in Hyderabad using 100% waterproof BWP marine plywood, quartz tops & German soft-close drawers."
  },
  {
    id: "living-rooms",
    title: "Living Rooms & Lounges",
    category: "Living Rooms",
    tagline: "Grand entertaining spaces crafted with architectural sophistication",
    description: "Create an unforgettable impression with a living room designed around your lifestyle. Featuring custom fluted wood paneling, floating marble TV consoles, acoustic ceiling treatments, and ambient magnetic track lighting.",
    mainImage: "/assets/parthu/hero-living.jpg",
    gallery: [
      "/assets/parthu/hero-living.jpg",
      "/assets/parthu/viswajeet-villa.jpg",
      "/assets/parthu/after-room.jpg",
      "/assets/parthu/dining-interior.jpg"
    ],
    features: [
      "Bespoke Charcoal & Veneer Wall Cladding Paneling",
      "Italian Marble Floating TV Units with LED Backlighting",
      "Architectural Gypsum Ceiling & Magnetic Track Lighting",
      "Custom Leather & Velvet Sofa Sets",
      "Designer Bar & Display Crockery Units"
    ],
    specs: {
      material: "Natural Veneers, Charcoal Louvers & Italian Marble",
      warranty: "10 Years Structural Warranty",
      hardware: "Concealed Heavy-Duty Mounting Hardware",
      turnaround: "45 Days Factory Execution"
    },
    metaTitle: "Living Room Interior Designers Hyderabad | DV Homes",
    metaDescription: "Architectural living room interiors in Hyderabad. Italian marble TV consoles, fluted wall paneling & magnetic track lighting."
  },
  {
    id: "dining-rooms",
    title: "Dining Suites & Crockery",
    category: "Dining Rooms",
    tagline: "Dine in style with elegant spaces tailored for gatherings",
    description: "Elevate your dining experience with custom marble tables, upholstered dining chairs, stylish crockery display cabinets, and warm ambient pendant lighting that set the mood for every meal.",
    mainImage: "/assets/parthu/dining-interior.jpg",
    gallery: [
      "/assets/parthu/dining-interior.jpg",
      "/assets/parthu/kitchen-detail-1.jpg",
      "/assets/parthu/hero-living.jpg"
    ],
    features: [
      "Custom Italian Marble & Solid Wood Dining Tables",
      "Glass Display Cabinets with Touch Sensor Lighting",
      "Designer Crockery & Wine Storage Consoles",
      "Upholstered Ergonomic Dining Chairs",
      "Accent Feature Wall Paneling"
    ],
    specs: {
      material: "Solid Teak Wood, Italian Marble & Tinted Glass",
      warranty: "10 Years Structural Warranty",
      hardware: "Soft-close Hettich Glass Hinges",
      turnaround: "35 Days Custom Fabrication"
    },
    metaTitle: "Dining Room & Crockery Unit Design Hyderabad | DV Homes",
    metaDescription: "Custom dining room interior design & crockery cabinet units in Hyderabad. Italian marble tables, tinted glass displays & ambient lighting."
  },
  {
    id: "puja",
    title: "Pooja Mandirs & Sacred Spaces",
    category: "Puja",
    tagline: "Serene sacred sanctuaries designed for peace and spiritual warmth",
    description: "Our puja room designs blend sacred tradition with modern aesthetic refinement. From intricate CNC lattice jaali work and brass inlay bells to warm teak wood mandir structures and ambient backlighting.",
    mainImage: "/assets/parthu/puja-room.jpg",
    gallery: [
      "/assets/parthu/puja-room.jpg",
      "/assets/parthu/after-room.jpg",
      "/assets/parthu/rajasekhar-home.jpg"
    ],
    features: [
      "Precision CNC Jaali Cutting & Brass Bell Inlays",
      "Teak Wood Mandir Structure & Marble Steps",
      "Warm Concealed LED Backlighting",
      "Concealed Drawer Storage for Sacred Accessories",
      "Stain-Resistant Washable Wall Treatments"
    ],
    specs: {
      material: "Burma Teak Wood, Corian & Brass Elements",
      warranty: "10 Years Structural Warranty",
      hardware: "Heavy-Duty Brass Fittings & Concealed Hinges",
      turnaround: "30 Days On-Site Installation"
    },
    metaTitle: "Pooja Room Mandir Interior Design Hyderabad | DV Homes",
    metaDescription: "Custom pooja mandir & sacred space interior design in Hyderabad. Teak wood mandirs, CNC jaali work, brass bells & concealed LED lighting."
  },
  {
    id: "partitions",
    title: "Architectural Partitions & Screens",
    category: "Partitions",
    tagline: "Effortless architectural dividers enhancing privacy and space flow",
    description: "Define distinct zones within open-plan homes using handcrafted fluted glass partitions, PVD gold stainless steel screens, wooden swivel louvers, and decorative room dividers.",
    mainImage: "/assets/parthu/after-room.jpg",
    gallery: [
      "/assets/parthu/after-room.jpg",
      "/assets/parthu/hero-living.jpg",
      "/assets/parthu/dining-interior.jpg"
    ],
    features: [
      "PVD Coated Rose Gold & Brass Stainless Steel Frames",
      "Toughened Fluted & Tinted Glass Inserts",
      "Swivel Wooden Louver Dividers",
      "Integrated Planter & Display Nooks",
      "Slimline Ceiling-Mounted Sliding Tracks"
    ],
    specs: {
      material: "304 Stainless Steel PVD, Fluted Glass & Teak Wood",
      warranty: "10 Years Structural Warranty",
      hardware: "Top-Hung Smooth Sliding Tracks",
      turnaround: "25 Days Custom Manufacturing"
    },
    metaTitle: "Architectural Room Partitions & Fluted Glass Screens Hyderabad | DV Homes",
    metaDescription: "Custom fluted glass partitions, PVD gold metal screens & wooden room dividers in Hyderabad homes."
  },
  {
    id: "study-rooms",
    title: "Home Office & Study Rooms",
    category: "Study Rooms",
    tagline: "Ergonomic workspaces designed to inspire productivity and focus",
    description: "Designed for modern remote work and study, our custom study rooms feature ergonomic desk layouts, integrated bookshelf units, hidden cable management, and glare-free task illumination.",
    mainImage: "/assets/parthu/study-room.jpg",
    gallery: [
      "/assets/parthu/study-room.jpg",
      "/assets/parthu/bedroom-suite.jpg",
      "/assets/parthu/dining-interior.jpg"
    ],
    features: [
      "Custom Floating Writing Desks with Leather Tops",
      "Floor-to-Ceiling Bookshelves with Glass Doors",
      "Concealed Cable Pass-Through & Power Hubs",
      "Acoustic Wall Paneling for Quiet Focus",
      "Under-Shelf LED Task Lighting"
    ],
    specs: {
      material: "BWP Plywood, Veneer & Matte Laminates",
      warranty: "10 Years Structural Warranty",
      hardware: "Full-Extension Soft-Close Ball Bearing Slides",
      turnaround: "30 Days Installation"
    },
    metaTitle: "Home Office & Study Room Interior Design Hyderabad | DV Homes",
    metaDescription: "Ergonomic home office study room interior design in Hyderabad. Custom floating desks, bookshelves & concealed cable management."
  },
  {
    id: "office-spaces",
    title: "Executive Office Interiors",
    category: "Office Spaces",
    tagline: "Professional executive office interiors tailored for business success",
    description: "Transform commercial and home office environments into high-performance executive suites. Featuring custom conference tables, acoustic wall treatments, ergonomic workstation grids, and executive lounge seating.",
    mainImage: "/assets/parthu/hero-living.jpg",
    gallery: [
      "/assets/parthu/hero-living.jpg",
      "/assets/parthu/study-room.jpg",
      "/assets/parthu/kitchen-detail-2.jpg"
    ],
    features: [
      "Executive Desk Suites with Integrated Credenzas",
      "Acoustic Slat Paneling & Glass Partition Walls",
      "Conference Room Tables with Integrated AV Connections",
      "Ergonomic Task Seating & Lounge Chairs",
      "Custom Reception Desks & Brand Feature Walls"
    ],
    specs: {
      material: "Commercial Grade BWP Plywood, Aluminum & Quartz",
      warranty: "10 Years Commercial Warranty",
      hardware: "Heavy-Duty Commercial Soft-Close Hardware",
      turnaround: "45 Days Turnkey Execution"
    },
    metaTitle: "Executive Office & Commercial Interior Design Hyderabad | DV Homes",
    metaDescription: "Commercial office interior design & executive desk suites in Hyderabad. Acoustic paneling, conference tables & turnkey execution."
  }
];
