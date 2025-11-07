// const services = [
//   {
//     id: 1,
//     title: "Invisible Grills",
//     shortDescription: 
//       "Safe, modern solution for windows and balconies without compromising view.",
//     description: 
//       "Invisible grills are a modern and safe solution to protect your home or office. They are perfect for windows and balconies, providing safety while maintaining the aesthetics of your space.",
//     imageUrl: "/images/ourspecialization/invinsible_grills.png", // Image URL
//     category: "Main Service",
//     priceRange: "$$$", // Optional: Price range
//     moreInfoUrl: "/services/invisible-grills", // URL to dedicated service page
//   },
  // {
  //   id: 2,
  //   title: "Bird Safety Nets",
  //   shortDescription: 
  //     "Durable bird safety nets to protect property from damage and health risks.",
  //   description: 
  //     "Keep your property free from bird-related damage and health risks with our discreet, durable bird safety nets. Ideal for balconies, rooftops, and terraces, they are designed for long-term use and maximum protection.",
  //   imageUrl: "/images/ourspecialization/bird_safety_net.png", // Image URL
  //   category: "Additional Service",
  //   priceRange: "$$",
  //   moreInfoUrl: "/services/bird-safety-nets",
  // },
//   {
//     id: 3,
//     title: "Ceiling Clothes Hangers",
//     shortDescription: 
//       "Maximize apartment space with ceiling-mounted clothes hangers.",
//     description: 
//       "Maximize space and convenience with our ceiling-mounted clothes hangers, ideal for apartments with limited space. These hangers help organize your living area while providing easy access to clothes and drying space.",
//     imageUrl: "/images/ourspecialization/cloth_hangers.png", // Image URL
//     category: "Additional Service",
//     priceRange: "$$",
//     moreInfoUrl: "/services/ceiling-clothes-hangers",
//   },
//   {
//     id: 4,
//     title: "Balcony Safety Nets",
//     shortDescription: 
//       "Protect children and pets from falling with durable balcony safety nets.",
//     description: 
//       "Ensure the safety of your family with our durable and discreet balcony safety nets. These nets are perfect for protecting children and pets from falling, providing peace of mind while preserving the aesthetic of your space.",
//     imageUrl: "/images/ourspecialization/balcony_safety_nets.png", // Image URL
//     category: "Additional Service",
//     priceRange: "$$",
//     moreInfoUrl: "/services/balcony-safety-nets",
//   },
//   {
//     id: 5,
//     title: "Cricket Practice Nets",
//     shortDescription: 
//       "Durable, easy-to-install cricket nets for indoor and outdoor use.",
//     description: 
//       "For sports enthusiasts, we offer cricket practice nets that are durable, easy to install, and suitable for both personal and professional use. These nets are designed to withstand heavy use and provide safety during practice sessions.",
//     imageUrl: "/images/ourspecialization/cricket_nets.png", // Image URL
//     category: "Additional Service",
//     priceRange: "$$",
//     moreInfoUrl: "/services/cricket-practice-nets",
//   },
// ];

// export default services;


const services = [
  {
    id: 1,
    slug: "invisible-grills",
    title: "Invisible Grills",
    shortTitle: "Invisible Grills for Balconies & Windows",
    shortDescription:
      "Safe, modern solution for windows and balconies without compromising your view.",
    description:
      "Invisible grills are the perfect blend of safety and aesthetics, ideal for modern homes, offices, and apartments. Made of high-tensile stainless steel wires, they provide unobstructed views while ensuring top-notch safety for children, pets, and loved ones.",
    imageUrl: "/images/ourspecialization/invinsible_grills.png",
    category: "Main Service",
    priceRange: "$$$",
    moreInfoUrl: "/services/invisible-grills",

    // SEO and metadata
    seo: {
      title: "Invisible Grills Installation | Safe & Stylish Balcony Solutions",
      description:
        "Protect your family with modern invisible grills for balconies and windows. Strong, rust-free, and elegantly designed. Contact us for installation today!",
      keywords: [
        "invisible grills",
        "balcony safety grills",
        "modern window grills",
        "stainless steel invisible grill",
        "safety grills installation",
      ],
      canonicalUrl: "https://yourdomain.com/services/invisible-grills",
      ogImage: "/images/seo/invisible-grills-og.jpg",
    },

    // Feature Highlights
    features: [
      {
        title: "High Safety & Strength",
        detail:
          "Made with high-tensile stainless steel wires that can withstand up to 400 kg of pressure, ensuring absolute safety.",
        icon: "/icons/safety.svg",
      },
      {
        title: "Unobstructed View",
        detail:
          "Enjoy panoramic views from your balcony or window while maintaining safety and ventilation.",
        icon: "/icons/view.svg",
      },
      {
        title: "Rust & Weather Resistant",
        detail:
          "Coated with a protective layer to resist corrosion, moisture, and weathering for long-lasting performance.",
        icon: "/icons/weather.svg",
      },
    ],

    // Specifications or Technical Details
    specifications: {
      material: "316 Grade Stainless Steel",
      wireThickness: "2.5 mm",
      spacing: "2 inches between wires",
      coating: "Nylon/UV Protective Coating",
      warranty: "5 Years",
    },

    // Use Cases / Applications
    applications: [
      "Balconies and Terraces",
      "Windows and French Windows",
      "Staircase Railings",
      "Office Partitions",
      "High-rise Apartments",
    ],

    // Gallery for detailed service page
    gallery: [
      "/images/gallery/invisible-grill-1.jpg",
      "/images/gallery/invisible-grill-2.jpg",
      "/images/gallery/invisible-grill-3.jpg",
    ],

    // FAQs (optional but SEO + UX friendly)
    faqs: [
      {
        question: "Are invisible grills safe for children and pets?",
        answer:
          "Yes, invisible grills are designed to ensure complete safety for children and pets without blocking your view.",
      },
      {
        question: "Do invisible grills rust over time?",
        answer:
          "No, they are made from 316-grade stainless steel with anti-rust and weather-resistant coating for long-term durability.",
      },
      {
        question: "Can invisible grills be customized for different window sizes?",
        answer:
          "Absolutely. We provide custom installations based on window or balcony dimensions and design preferences.",
      },
    ],

    // Testimonials (optional)
    testimonials: [
      {
        name: "Amit Sharma",
        feedback:
          "Professional installation and top-quality product. My balcony looks elegant and feels safer than ever.",
        rating: 5,
      },
    ],

    // Call to Action
    callToAction: {
      text: "Book a Free Site Inspection",
      buttonLabel: "Get a Quote",
      link: "/contact",
    },
  },
  {
  id: 2,
  slug: "bird-safety-nets",
  title: "Bird Safety Nets",
  shortTitle: "Durable Bird Safety Nets for Homes & Buildings",
  shortDescription:
    "Durable bird safety nets to protect property from damage and health risks.",
  description:
    "Keep your property free from bird-related damage and health risks with our discreet, durable bird safety nets. Ideal for balconies, rooftops, and terraces, they are designed for long-term use and maximum protection.",
  imageUrl: "/images/ourspecialization/bird_safety_net.png",
  category: "Additional Service",
  priceRange: "$$",
  moreInfoUrl: "/services/bird-safety-nets",

  // SEO and metadata
  seo: {
    title: "Bird Safety Nets Installation | Protect Your Balconies & Windows",
    description:
      "Install high-quality bird safety nets to prevent pigeons and other birds from entering balconies and open spaces. Long-lasting, safe, and easy to maintain.",
    keywords: [
      "bird safety nets",
      "pigeon nets for balconies",
      "anti-bird nets",
      "balcony safety nets",
      "bird net installation",
      "bird protection nets",
    ],
    canonicalUrl: "https://yourdomain.com/services/bird-safety-nets",
    ogImage: "/images/seo/bird-safety-nets-og.jpg",
  },

  // Feature Highlights
  features: [
    {
      title: "Premium-Grade Material",
      detail:
        "Crafted from high-density polyethylene (HDPE) with UV stabilization, ensuring long-lasting outdoor durability.",
      icon: "/icons/durability.svg",
    },
    {
      title: "Safe and Humane",
      detail:
        "Effectively deters birds without causing them harm — a completely humane and eco-friendly solution.",
      icon: "/icons/safe.svg",
    },
    {
      title: "Custom Fit Installations",
      detail:
        "Tailored to fit balconies, windows, and open spaces of any size or shape.",
      icon: "/icons/customize.svg",
    },
    {
      title: "Weather & UV Resistant",
      detail:
        "Resistant to sunlight, rain, and dust — ideal for all weather conditions throughout the year.",
      icon: "/icons/weather.svg",
    },
  ],

  // Specifications or Technical Details
  specifications: {
    material: "High-Density Polyethylene (HDPE)",
    colorOptions: ["Transparent", "White", "Black", "Green"],
    meshSize: "1 inch to 1.5 inch",
    tensileStrength: "23–27 kg per thread",
    warranty: "3 Years",
  },

  // Use Cases / Applications
  applications: [
    "Residential Balconies and Terraces",
    "Apartment Duct Areas",
    "Windows and Ventilation Openings",
    "Commercial Buildings and Warehouses",
    "Hotels, Restaurants, and Rooftop Spaces",
  ],

  // Gallery for detailed service page
  gallery: [
    "/images/gallery/bird-net-1.jpg",
    "/images/gallery/bird-net-2.jpg",
    "/images/gallery/bird-net-3.jpg",
  ],

  // FAQs
  faqs: [
    {
      question: "Will bird safety nets block ventilation or sunlight?",
      answer:
        "No, our nets are designed with optimal mesh size that allows full airflow and light while preventing bird entry.",
    },
    {
      question: "How long does the bird safety net last?",
      answer:
        "With proper maintenance, our HDPE bird nets last 3–5 years, even under extreme weather conditions.",
    },
    {
      question: "Can you install nets in high-rise buildings?",
      answer:
        "Yes, our expert team installs nets safely at any height using certified safety equipment and trained professionals.",
    },
  ],

  // Testimonials
  testimonials: [
    {
      name: "Sneha Patel",
      feedback:
        "Very professional team and excellent product quality. My balcony is now bird-free and looks clean!",
      rating: 5,
    },
    {
      name: "Rohit Mehta",
      feedback:
        "Affordable, durable, and effective solution. Highly recommend their bird net installation service!",
      rating: 5,
    },
  ],

  // Call to Action
  callToAction: {
    text: "Keep your balconies and windows bird-free today!",
    buttonLabel: "Book Installation",
    link: "/contact",
  },
},
{
  id: 3,
  slug: "ceiling-clothes-hangers",
  title: "Ceiling Clothes Hangers",
  shortTitle: "Space-Saving Ceiling Clothes Hangers for Homes",
  shortDescription:
    "Maximize apartment space with ceiling-mounted clothes hangers designed for convenience and durability.",
  description:
    "Ceiling clothes hangers are the perfect space-saving solution for modern homes and apartments. Designed to utilize overhead space efficiently, these hangers help you dry and organize clothes with ease while keeping your living areas clutter-free. Built with corrosion-resistant stainless steel pipes and a pulley system, they ensure smooth operation and long-lasting performance.",
  imageUrl: "/images/ourspecialization/cloth_hangers.png",
  category: "Additional Service",
  priceRange: "$$",
  moreInfoUrl: "/services/ceiling-clothes-hangers",

  // SEO and metadata
  seo: {
    title:
      "Ceiling Clothes Hangers | Space-Saving Drying Solutions for Apartments",
    description:
      "Install ceiling-mounted clothes hangers to save space and dry clothes efficiently indoors. Rustproof, easy to use, and ideal for apartments and balconies.",
    keywords: [
      "ceiling clothes hanger",
      "ceiling drying rack",
      "pulley clothes hanger",
      "indoor drying system",
      "balcony drying hangers",
      "space-saving clothes hanger",
    ],
    canonicalUrl: "https://yourdomain.com/services/ceiling-clothes-hangers",
    ogImage: "/images/seo/ceiling-hangers-og.jpg",
  },

  // Feature Highlights
  features: [
    {
      title: "Space Optimization",
      detail:
        "Designed to maximize floor space by utilizing overhead areas for drying and hanging clothes.",
      icon: "/icons/space.svg",
    },
    {
      title: "Durable and Rustproof",
      detail:
        "Made from high-quality stainless steel pipes that are rust-resistant and long-lasting.",
      icon: "/icons/durability.svg",
    },
    {
      title: "Smooth Pulley Mechanism",
      detail:
        "Comes with a pulley lift system for easy lowering and raising of rods, allowing effortless operation.",
      icon: "/icons/pulley.svg",
    },
    {
      title: "Elegant and Minimal Design",
      detail:
        "Sleek modern finish complements apartment interiors and balconies without affecting aesthetics.",
      icon: "/icons/design.svg",
    },
  ],

  // Specifications or Technical Details
  specifications: {
    material: "Stainless Steel 304 Grade",
    rodDiameter: "22 mm",
    numberOfRods: "4–6 rods (customizable)",
    operation: "Manual Pulley System",
    coating: "Anti-Corrosive Powder Coating",
    warranty: "2 Years",
  },

  // Use Cases / Applications
  applications: [
    "Apartments and Flats",
    "Balconies and Laundry Areas",
    "Indoor Utility Spaces",
    "Bathrooms and Verandas",
    "Commercial Laundries",
  ],

  // Gallery for detailed service page
  gallery: [
    "/images/gallery/ceiling-hanger-1.jpg",
    "/images/gallery/ceiling-hanger-2.jpg",
    "/images/gallery/ceiling-hanger-3.jpg",
  ],

  // FAQs
  faqs: [
    {
      question: "Can ceiling clothes hangers handle heavy loads?",
      answer:
        "Yes, our stainless steel models can easily support wet clothes and multiple garments without bending or sagging.",
    },
    {
      question: "Is installation possible on any ceiling type?",
      answer:
        "Yes, our team installs hangers on concrete, wood, and false ceilings using the right fixtures and anchors.",
    },
    {
      question: "How do I maintain the pulley system?",
      answer:
        "Just apply light lubrication every few months and clean dust off the ropes or wires for smooth operation.",
    },
  ],

  // Testimonials
  testimonials: [
    {
      name: "Ramesh Iyer",
      feedback:
        "Excellent quality and installation. Saved a lot of space in our apartment balcony — very convenient design.",
      rating: 5,
    },
    {
      name: "Priya Menon",
      feedback:
        "Smooth pulley movement and rust-free rods. A must-have for small flats with limited space.",
      rating: 5,
    },
  ],

  // Call to Action
  callToAction: {
    text: "Upgrade your home with our smart ceiling hangers!",
    buttonLabel: "Request Installation",
    link: "/contact",
  },
},
{
  id: 4,
  slug: "balcony-safety-nets",
  title: "Balcony Safety Nets",
  shortTitle: "Reliable Balcony Safety Nets for Families & Pets",
  shortDescription:
    "Protect your loved ones and pets with durable balcony safety nets that ensure safety without blocking your view.",
  description:
    "Balcony safety nets provide essential protection for homes and high-rise apartments, ensuring the safety of children, pets, and belongings. Designed with high-strength, UV-resistant materials, our nets blend seamlessly with your balcony architecture while providing maximum safety. They are professionally installed by experts and require minimal maintenance, making them a long-term safety investment for your property.",
  imageUrl: "/images/ourspecialization/balcony_safety_nets.png",
  category: "Additional Service",
  priceRange: "$$",
  moreInfoUrl: "/services/balcony-safety-nets",

  // SEO and metadata
  seo: {
    title: "Balcony Safety Nets | Child & Pet Protection for Apartments",
    description:
      "Install high-quality balcony safety nets for child and pet safety. Durable, UV-resistant nets designed for apartments and high-rise buildings.",
    keywords: [
      "balcony safety net",
      "child safety net",
      "pet protection net",
      "apartment balcony nets",
      "fall protection nets",
      "bird and safety nets"
    ],
    canonicalUrl: "https://yourdomain.com/services/balcony-safety-nets",
    ogImage: "/images/seo/balcony-safety-nets-og.jpg"
  },

  // Feature Highlights
  features: [
    {
      title: "Enhanced Safety for Families",
      detail:
        "Prevents accidental falls and ensures the safety of children and pets in high-rise apartments and balconies.",
      icon: "/icons/safety.svg"
    },
    {
      title: "Durable and UV Resistant",
      detail:
        "Made from high-density polyethylene (HDPE) material that is UV-stabilized for long-term outdoor durability.",
      icon: "/icons/durability.svg"
    },
    {
      title: "Aesthetic and Transparent Design",
      detail:
        "Maintains unobstructed views while blending seamlessly with your home’s balcony design.",
      icon: "/icons/design.svg"
    },
    {
      title: "Professional Installation",
      detail:
        "Installed securely by trained technicians using safety-tested ropes, anchors, and fixtures.",
      icon: "/icons/installation.svg"
    }
  ],

  // Specifications or Technical Details
  specifications: {
    material: "High-Density Polyethylene (HDPE)",
    meshSize: "1.25 inches – 2 inches (customizable)",
    color: "Transparent / White",
    breakingStrength: "Up to 250 kg per strand",
    uvStabilization: "Yes (UV Protected)",
    warranty: "3 Years"
  },

  // Use Cases / Applications
  applications: [
    "Apartment Balconies",
    "High-Rise Buildings",
    "Terrace and Sit-Out Areas",
    "Open Corridors and Staircases",
    "Commercial and Office Balconies"
  ],

  // Gallery for detailed service page
  gallery: [
    "/images/gallery/balcony-net-1.jpg",
    "/images/gallery/balcony-net-2.jpg",
    "/images/gallery/balcony-net-3.jpg"
  ],

  // FAQs
  faqs: [
    {
      question: "Are balcony safety nets visible from outside?",
      answer:
        "No, our transparent nets maintain an almost invisible appearance from a distance, preserving your view and building aesthetics."
    },
    {
      question: "Can these nets withstand sunlight and rain?",
      answer:
        "Yes, they are UV-resistant and weatherproof, designed to withstand years of sun exposure and heavy rain without damage."
    },
    {
      question: "Is it possible to remove or clean the nets?",
      answer:
        "Yes, the nets can be easily cleaned with mild soap and water or replaced if needed without damaging balcony structures."
    }
  ],

  // Testimonials
  testimonials: [
    {
      name: "Amit Raj",
      feedback:
        "Very satisfied with the balcony nets installed at our apartment. Clear view, strong material, and neat installation by the team.",
      rating: 5
    },
    {
      name: "Neha Sharma",
      feedback:
        "Perfect for keeping our toddler safe while still enjoying the balcony space. Quality and finish are excellent.",
      rating: 5
    }
  ],

  // Call to Action
  callToAction: {
    text: "Secure your home with durable and discreet balcony safety nets today!",
    buttonLabel: "Book Installation",
    link: "/contact"
  }
},
{
  id: 5,
  slug: "cricket-practice-nets",
  title: "Cricket Practice Nets",
  shortTitle: "Durable Cricket Practice Nets for Indoor and Outdoor Training",
  shortDescription:
    "High-quality cricket nets designed for players and academies to practice safely indoors or outdoors.",
  description:
    "Cricket practice nets provide a controlled and safe environment for players to train, practice, and refine their skills. Built with premium-grade, weather-resistant materials, our nets are suitable for both indoor and outdoor use. They are easy to install, customizable in size, and designed to endure regular impact from practice sessions. Perfect for schools, academies, clubs, and individuals, they ensure convenience and durability for long-term use.",
  imageUrl: "/images/ourspecialization/cricket_nets.png",
  category: "Additional Service",
  priceRange: "$$",
  moreInfoUrl: "/services/cricket-practice-nets",

  // SEO and metadata
  seo: {
    title: "Cricket Practice Nets | Durable Nets for Professional & Home Training",
    description:
      "Install professional-grade cricket practice nets suitable for academies, clubs, and home practice. Weatherproof, long-lasting, and customizable for any space.",
    keywords: [
      "cricket practice nets",
      "cricket training nets",
      "outdoor cricket nets",
      "indoor practice net",
      "sports netting system",
      "custom cricket nets"
    ],
    canonicalUrl: "https://yourdomain.com/services/cricket-practice-nets",
    ogImage: "/images/seo/cricket-practice-nets-og.jpg"
  },

  // Feature Highlights
  features: [
    {
      title: "High Durability and Strength",
      detail:
        "Made from premium twisted nylon or HDPE material ensuring long-lasting performance even with heavy ball impact.",
      icon: "/icons/durability.svg"
    },
    {
      title: "Weather-Resistant Design",
      detail:
        "UV-stabilized and waterproof nets withstand varying weather conditions, making them perfect for year-round use.",
      icon: "/icons/weather.svg"
    },
    {
      title: "Customizable Dimensions",
      detail:
        "Available in multiple sizes and mesh types to fit your training space—ideal for both backyard and professional setups.",
      icon: "/icons/customize.svg"
    },
    {
      title: "Easy Installation and Portability",
      detail:
        "Lightweight and easy to install, our nets can be set up permanently or used as a portable system for temporary training areas.",
      icon: "/icons/installation.svg"
    }
  ],

  // Specifications or Technical Details
  specifications: {
    material: "HDPE / Nylon Twisted Net",
    meshSize: "30 mm – 45 mm (customizable)",
    color: "Green / Black",
    breakingStrength: "Up to 350 kg per strand",
    uvStabilization: "Yes (UV Protected)",
    availableSizes: "10x10 ft to 100x50 ft",
    warranty: "2 Years"
  },

  // Use Cases / Applications
  applications: [
    "Sports Academies and Training Centers",
    "School and College Playgrounds",
    "Residential Backyards",
    "Indoor Sports Facilities",
    "Clubs and Institutions"
  ],

  // Gallery for detailed service page
  gallery: [
    "/images/gallery/cricket-net-1.jpg",
    "/images/gallery/cricket-net-2.jpg",
    "/images/gallery/cricket-net-3.jpg"
  ],

  // FAQs
  faqs: [
    {
      question: "What material are the cricket nets made of?",
      answer:
        "Our cricket nets are made from high-density nylon or HDPE material, ensuring strength, flexibility, and long-lasting outdoor use."
    },
    {
      question: "Can the net be installed in small spaces?",
      answer:
        "Yes, the nets are fully customizable to fit any area, from small backyards to large sports grounds."
    },
    {
      question: "Are these nets suitable for both indoor and outdoor practice?",
      answer:
        "Absolutely. They are UV-resistant and weatherproof, making them ideal for both indoor halls and outdoor setups."
    }
  ],

  // Testimonials
  testimonials: [
    {
      name: "Rohit Deshmukh",
      feedback:
        "The cricket net quality is excellent and installation was quick. Perfect for regular training sessions at our academy.",
      rating: 5
    },
    {
      name: "Anjali Verma",
      feedback:
        "We installed the net in our backyard and it works perfectly. Durable, safe, and gives a professional practice feel.",
      rating: 5
    }
  ],

  // Call to Action
  callToAction: {
    text: "Set up your professional-grade cricket practice net today!",
    buttonLabel: "Get a Free Quote",
    link: "/contact"
  }
}


];

export default services;
