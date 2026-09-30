"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Footer from "./components/Footer";
import JsonLd, { defaultOrganizationSchema } from "./components/JsonLd";
import ScrollBeforeAfterSection from "./components/ScrollBeforeAfterSection";

const ConsultationModal = dynamic(() => import("./components/ConsultationModal"), { ssr: false });
const PricingDeliveryModal = dynamic(() => import("./components/PricingDeliveryModal"), { ssr: false });
import FaqAccordion from "./components/FaqAccordion";
import ImageWithSkeleton from "./components/ImageWithSkeleton";
import ChoiceChips, { ChoiceOption } from "./components/ui/ChoiceChips";
import ScrollBlurFadeIn from "./components/ui/ScrollBlurFadeIn";
import { submitLeadToGoogleSheet, openWhatsAppLeadChat } from "./lib/leadSubmission";
import { ParallaxScroll, ParallaxImage } from "./components/ui/parallax-scroll";
import {
  FactoryIcon,
  MapPinIcon,
  ShieldCheckIcon,
  KitchenIcon,
  WardrobeIcon,
  SofaIcon,
  BedIcon,
  CeilingLightIcon,
  ZapIcon,
  GlassIcon,
  PaintIcon,
  HomeIcon,
  SparklesIcon,
  CheckCircleIcon,
  StarIcon,
  MessageChatIcon,
  RulerIcon,
  CompassIcon,
  ToolIcon,
  KeyIcon,
  LayersIcon,
  PhoneIcon,
  WhatsAppIcon,
  ArrowRightIcon,
  ClockIcon,
  AwardIcon,
  DiamondIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "./components/Icons";

const parallaxGalleryImages = [
  "/assets/main_images/hero-section.webp",
  "/assets/main_images/bedroom-interior-design-minimal-aesthetic-3d-rendered.webp",
  "/assets/main_images/interior-design-luxury-living-room.webp",
  "/assets/main_images/luxury-home-interior-design-3d-visualization-expensive-finishing-materials-furniture.webp",
  "/assets/main_images/luxury-interior-design-private-apartment-contemporary-dining-room.webp",
  "/assets/main_images/luxury-interior-exterior-design-collection-highend-architectural-home-decor-concepts-feat.webp",
  "/assets/main_images/luxury-living-room-interior-design-opulent-space-with-modern-furniture-warm-lighting.webp",
  "/assets/main_images/luxury-living-room-with-classic-white-sofa-sofa-interior-design.webp",
  "/assets/main_images/luxury-modern-european-design-cafe-interior-downtown-with-colorful-furniture-3d-rendering.webp",
];

const heroSlides = [
  {
    id: 0,
    image: "/assets/main_images/hero-section.webp",
    title: "From Design to Handover.",
    accent: "Complete Responsibility.",
    alt: "Premium Interior Design & Execution Services - DV HOMES"
  },
  {
    id: 1,
    image: "/assets/main_images/interior-design-luxury-living-room.webp",
    title: "Hyderabad 2BHK, 3BHK & Villa",
    accent: "Stress-Free Interiors.",
    alt: "Luxury Master Bedroom - DV HOMES Hyderabad"
  },
  {
    id: 2,
    image: "/assets/main_images/luxury-interior-design-private-apartment-contemporary-dining-room.webp",
    title: "Complete Interior Execution",
    accent: "From Concept to Handover.",
    alt: "Modular Kitchen & Dining Design - DV HOMES"
  }
];

const heroSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "6%" : "-6%",
    opacity: 0,
    filter: "blur(40px) brightness(0.6)",
    scale: 1.10
  }),
  center: {
    zIndex: 1,
    x: "0%",
    opacity: 1,
    filter: "blur(0px) brightness(1)",
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "6%" : "-6%",
    opacity: 0,
    filter: "blur(40px) brightness(0.5)",
    scale: 0.92
  })
};

const HOME_PROPERTY_OPTIONS: ChoiceOption[] = [
  { value: "2 BHK Apartment", label: "2 BHK" },
  { value: "3 BHK Apartment", label: "3 BHK" },
  { value: "Villa / Independent House", label: "Villa / House" },
  { value: "Home Renovation", label: "Renovation" },
];

const HOME_BUDGET_OPTIONS: ChoiceOption[] = [
  { value: "₹10L - ₹20L", label: "₹10L - ₹20L" },
  { value: "₹20L - ₹35L", label: "₹20L - ₹35L" },
  { value: "₹35L - ₹50L", label: "₹35L - ₹50L" },
  { value: "₹50L+", label: "₹50L+ Luxury" },
];

const COMMUNITY_PROJECTS = [
  { name: "Vasavi Nandanavanam Suchitra", logo: "" },
  { name: "ASBL Springs Pocharam", logo: "/assets/companies_trusted/asbl.svg" },
  { name: "ASBL Springs", logo: "/assets/companies_trusted/asbl.svg" },
  { name: "My Home Bhooja", logo: "/assets/companies_trusted/bhooja_logo.png" },
  { name: "Aparna Zenith", logo: "/assets/companies_trusted/aparna-logo.svg" },
  { name: "INDIS OneCity", logo: "/assets/companies_trusted/indis-logo-light.svg" },
  { name: "Janapriya Upscale", logo: "/assets/companies_trusted/janapriya-logo.png" },
  { name: "ASBL Spectra", logo: "/assets/companies_trusted/asbl.svg" },
  { name: "LODHA Bellezza", logo: "/assets/companies_trusted/asbl-lodha-logo.png" },
  { name: "Prestige High Fields", logo: "/assets/companies_trusted/prestige.svg" },
  { name: "Rajapushpa Atria", logo: "/assets/companies_trusted/rajpushpa.svg" },
];

export default function HomePage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [servicesScrollProgress, setServicesScrollProgress] = useState(25);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [homeForm, setHomeForm] = useState({
    name: "",
    phone: "",
    propertyType: "",
    budget: "",
    location: "",
    timeToStart: "",
  });
  const [homeFormSubmitting, setHomeFormSubmitting] = useState(false);
  const [homeFormSubmitted, setHomeFormSubmitted] = useState(false);
  const servicesSliderRef = useRef<HTMLDivElement>(null);

  const [heroIndex, setHeroIndex] = useState(0);
  const [heroDirection, setHeroDirection] = useState(1);

  const nextHeroSlide = () => {
    setHeroDirection(1);
    setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setHeroDirection(-1);
    setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroDirection(1);
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroIndex]);

  const handleServicesScroll = () => {
    if (!servicesSliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = servicesSliderRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setServicesScrollProgress(100);
      return;
    }
    const currentPercent = (scrollLeft / maxScroll) * 100;
    const calculatedWidth = 25 + (currentPercent * 0.75);
    setServicesScrollProgress(Math.min(100, Math.max(25, calculatedWidth)));
  };

  const scrollServicesLeft = () => {
    if (servicesSliderRef.current) {
      servicesSliderRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollServicesRight = () => {
    if (servicesSliderRef.current) {
      servicesSliderRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const featuredServices = [
    {
      id: "bedrooms",
      num: "01",
      title: "Bed Rooms",
      desc: "Turn your bedroom into a peaceful retreat with bespoke designs tailored to your style.",
      image: "/assets/main_images/bedroom-interior-design-minimal-aesthetic-3d-rendered.webp"
    },
    {
      id: "kitchens",
      num: "02",
      title: "Kitchens",
      desc: "Experience the perfect blend of aesthetics and efficiency with a smart, space-optimized modular kitchen.",
      image: "/assets/main_images/luxury-interior-design-private-apartment-contemporary-dining-room.webp"
    },
    {
      id: "living-rooms",
      num: "03",
      title: "Living Rooms",
      desc: "Create a stunning first impression with a living room that balances elegance, comfort, and functionality.",
      image: "/assets/main_images/luxury-living-room-with-classic-white-sofa-sofa-interior-design.webp"
    },
    {
      id: "dining-rooms",
      num: "04",
      title: "Dining Rooms",
      desc: "Dine in style with elegant and functional spaces designed for memorable gatherings.",
      image: "/assets/main_images/luxury-interior-design-private-apartment-contemporary-dining-room.webp"
    },
    {
      id: "puja",
      num: "05",
      title: "Puja",
      desc: "Create a serene sanctuary with a pooja room designed for peace and positivity.",
      image: "/assets/main_images/luxury-interior-exterior-design-collection-highend-architectural-home-decor-concepts-feat.webp"
    },
    {
      id: "partitions",
      num: "06",
      title: "Partitions",
      desc: "Define spaces effortlessly with stylish, functional partitions that enhance aesthetics and privacy.",
      image: "/assets/main_images/luxury-living-room-interior-design-opulent-space-with-modern-furniture-warm-lighting.webp"
    },
    {
      id: "study-rooms",
      num: "07",
      title: "Study Rooms",
      desc: "Boost focus and productivity with a study space that blends comfort and inspiration.",
      image: "/assets/main_images/luxury-home-interior-design-3d-visualization-expensive-finishing-materials-furniture.webp"
    },
    {
      id: "office-spaces",
      num: "08",
      title: "Office Spaces",
      desc: "Design workspaces that fuel creativity, efficiency, and success.",
      image: "/assets/main_images/luxury-modern-european-design-cafe-interior-downtown-with-colorful-furniture-3d-rendering.webp"
    }
  ];

  const projects = [
    {
      id: "manikonda-3bhk",
      name: "3BHK Premium Interior",
      location: "Manikonda, Hyderabad",
      desc: "A thoughtfully designed premium residential interior featuring modern design elements, customised furniture and elegant finishes.",
      image: "/assets/main_images/interior-design-luxury-living-room.webp",
      category: "living"
    },
    {
      id: "chanda-nagar-3bhk",
      name: "3BHK Interior Project",
      location: "Chanda Nagar, Hyderabad",
      desc: "A complete home interior project designed with customised solutions for modern family living.",
      image: "/assets/main_images/bedroom-interior-design-minimal-aesthetic-3d-rendered.webp",
      category: "bedroom"
    },
    {
      id: "kompally-interior",
      name: "Residential Interior",
      location: "Kompally, Hyderabad",
      desc: "A personalised interior project focusing on functionality, storage and contemporary design.",
      image: "/assets/main_images/luxury-interior-design-private-apartment-contemporary-dining-room.webp",
      category: "living"
    },
    {
      id: "bachupally-2bhk",
      name: "2BHK Interior",
      location: "Bachupally, Hyderabad",
      desc: "A carefully planned home interior designed to maximise available space while creating a comfortable and elegant environment.",
      image: "/assets/main_images/luxury-home-interior-design-3d-visualization-expensive-finishing-materials-furniture.webp",
      category: "kitchen"
    },
    {
      id: "balanagar-3bhk",
      name: "3BHK Interior",
      location: "Bala Nagar, Hyderabad",
      desc: "Customised residential interior solution with modular kitchen, wardrobes, TV unit and false ceiling.",
      image: "/assets/main_images/luxury-living-room-interior-design-opulent-space-with-modern-furniture-warm-lighting.webp",
      category: "living"
    }
  ];

  const services = [
    {
      Icon: KitchenIcon,
      title: "Modular Kitchens",
      desc: "Ergonomically engineered kitchens with marine-grade BWP plywood, anti-fingerprint acrylic/PU finishes, and soft-close German hardware.",
      features: ["Hafele & Blum Soft-Close", "Quartz & Marble Island Tops", "Custom Pantry & Spice Organizers"]
    },
    {
      Icon: WardrobeIcon,
      title: "Modular Wardrobes",
      desc: "Bespoke walk-in closets, sliding fluted glass wardrobes, and hinged units with sensor LED illumination and velvet-lined organizers.",
      features: ["Tinted Fluted Glass Doors", "Aluminum Slim Profile Frames", "Integrated Watch & Jewelry Trays"]
    },
    {
      Icon: SofaIcon,
      title: "Living & Dining",
      desc: "Grand entertaining spaces with custom fluted paneling, designer TV consoles, marble dining accents, and partition screens.",
      features: ["Acoustic Wood Wall Cladding", "Floating TV Consoles", "Designer Bar & Crockery Units"]
    },
    {
      Icon: BedIcon,
      title: "Bedroom Interiors",
      desc: "Serene bedroom sanctuaries featuring upholstered feature walls, integrated study desks, floating nightstands, and mood lighting.",
      features: ["Velvet & Leather Headboards", "Concealed Wiring & Bedside Drops", "Custom Vanity Units"]
    },
    {
      Icon: CeilingLightIcon,
      title: "False Ceiling & Lighting",
      desc: "Architectural gypsum ceiling designs with magnetic track lights, warm LED cove profiles, and automated dimming zones.",
      features: ["Saint-Gobain Gyproc Gypsum", "Magnetic Track & COB Lights", "Zero-Crack Seamless Finishing"]
    },
    {
      Icon: ZapIcon,
      title: "Electrical Works",
      desc: "Concealed automation conduit wiring, designer touch switches, smart ambient dimming circuits, and safety surge protection.",
      features: ["Legrand / Schneider Fittings", "Smart Home Dimming Ready", "Fire-Retardant Copper Cables"]
    },
    {
      Icon: GlassIcon,
      title: "Glass Works",
      desc: "Fluted glass partitions, PVD-coated brass & gold metal dividers, tinted mirrors, and architectural shower cubicles.",
      features: ["PVD Rose Gold & Brass Finish", "Toughened Fluted Glass", "Slimline Aluminum Partitions"]
    },
    {
      Icon: PaintIcon,
      title: "Painting & Textures",
      desc: "Italian Stucco, Venetian plaster, textured lime wash, luxury wallpapers, and flawless PU/polyurethane spray finishes.",
      features: ["Asian Paints Royale & Stucco", "PU Matt & Gloss Spray Polish", "Seamless Base Leveling"]
    },
    {
      Icon: SofaIcon,
      title: "Sofas, Beds & Custom Furniture",
      desc: "Custom-made Italian leather sectional sofas, ergonomic upholstered beds, recliners, and handcrafted marble dining tables.",
      features: ["High-Density Comfort Foam", "Stain-Resistant Imported Fabrics", "Solid Teak & Oak Framing"]
    }
  ];

  return (
    <>
      <JsonLd data={defaultOrganizationSchema} />
      <main id="main-content">
        {/* =================================================================
            1. HERO SECTION (FULL-BLEED CINEMATIC SHOWCASE WITH AUTOMATIC SLIDER)
            ================================================================= */}
        <section className="hero-cinematic-section">
          {/* Background Image Layer with Framer Motion Slide Animation */}
          <div className="hero-bg-layer">
            <AnimatePresence initial={false} custom={heroDirection}>
              <motion.div
                key={heroIndex}
                custom={heroDirection}
                variants={heroSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="hero-slide-frame"
              >
                <img
                  src={heroSlides[heroIndex].image}
                  alt={heroSlides[heroIndex].alt}
                  className="hero-bg-image"
                />
                <div className="hero-bg-overlay" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="container hero-cinematic-container">
            <div className="hero-top-bar">
              {/* Hero Main Content (Left-Aligned) */}
              <div className="hero-cinematic-content">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroIndex}
                    initial={{ opacity: 0, filter: "blur(24px)", y: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(24px)", y: -20 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h1 className="hero-cinematic-title">
                      {heroSlides[heroIndex].title}<br />
                      <span className="hero-title-accent">{heroSlides[heroIndex].accent}</span>
                    </h1>
                  </motion.div>
                </AnimatePresence>

                <div className="hero-cinematic-actions">
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="btn btn-primary btn-lg"
                  >
                    <span>Get a Free Quote</span>
                  </button>

                  <a
                    href="#projects"
                    className="btn btn-secondary-glass btn-lg"
                  >
                    <span>View Latest Projects</span>
                  </a>
                </div>
              </div>

              {/* Slider Navigation Controls (Left/Right Arrow Buttons) */}
              <div className="hero-slider-controls">
                <button
                  onClick={prevHeroSlide}
                  className="hero-slider-btn"
                  aria-label="Previous Slide"
                >
                  <ChevronLeftIcon size={20} color="#FFFFFF" />
                </button>
                <button
                  onClick={nextHeroSlide}
                  className="hero-slider-btn"
                  aria-label="Next Slide"
                >
                  <ChevronRightIcon size={20} color="#FFFFFF" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            COMMUNITY & DEVELOPER PROJECTS TICKER (MAX 900PX SLOW MARQUEE)
            ================================================================= */}
        <section className="community-marquee-section">
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <span style={{ fontSize: "20px", fontWeight: "600", color: "#FFFFFF", letterSpacing: "0.06em" }}>
              Trusted By
            </span>
          </div>

          <div className="community-marquee-container">
            <div className="community-marquee-track">
              {/* Repeated array for seamless infinite marquee loop */}
              {[...COMMUNITY_PROJECTS, ...COMMUNITY_PROJECTS, ...COMMUNITY_PROJECTS].map((item, index) => (
                <div key={index} className="community-pill">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.name}
                      style={{
                        height: "32px",
                        maxHeight: "32px",
                        width: "auto",
                        maxWidth: "140px",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: "1rem", fontWeight: "700", color: "rgba(255, 255, 255, 0.9)", letterSpacing: "0.03em" }}>
                      {item.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            2. ABOUT DV HOMES & INTERIORS SECTION
            ================================================================= */}
        {/* =================================================================
            2. ABOUT DV HOMES & INTERIORS SECTION (ULTRA LUXURY ENHANCED)
            ================================================================= */}
        <section className="who-we-are-section" style={{ position: "relative", padding: "clamp(64px, 8vw, 100px) 0" }}>
          {/* Ambient Glow Spotlight */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "-10%",
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, rgba(122, 158, 0, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            {/* Super Eyebrow Badge */}
            <div className="section-eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "9999px", background: "transparent", border: "1px solid var(--brand-border, rgba(122, 158, 0, 0.3))", marginBottom: "20px" }}>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--brand-primary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                About DV HOMES
              </span>
            </div>

            <div className="who-we-are-grid">
              {/* Left Column: Brand Story & High-Conversion Glass Cards */}
              <div className="who-we-are-content">
                <h2 className="who-we-are-heading" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.3rem)", fontWeight: "800", lineHeight: "1.25", color: "#FFFFFF", marginBottom: "16px", letterSpacing: "-0.02em" }}>
                  From Initial Design to Handover<br />
                  <span style={{ color: "var(--brand-primary)" }}>Complete End-to-End Responsibility.</span>
                </h2>

                <p style={{ fontSize: "1rem", color: "var(--text-light-secondary)", fontWeight: "300", marginBottom: "24px", lineHeight: "1.6" }}>
                  Advance layout planning, transparent budgeting, premium material selection, and regular progress updates to complete your dream home interior journey stress-free – DV HOMES.
                </p>



                {/* Combo Action Buttons */}
                <div className="cta-actions">
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="btn btn-primary btn-lg"
                    style={{ borderRadius: "9999px", boxShadow: "none" }}
                  >
                    <span>Get a Free Quote</span>
                  </button>
                  <Link
                    href="/about"
                    className="btn btn-secondary-glass btn-lg"
                    style={{ borderRadius: "9999px", border: "1px solid rgba(255, 255, 255, 0.2)" }}
                  >
                    <span>About Us ↗</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Dual Visual Showcase (Factory & Showroom) */}
              <div className="who-we-are-visuals">
                {/* Floating Trust Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "20px",
                    zIndex: 10,
                    background: "rgba(18, 18, 18, 0.85)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "16px",
                    padding: "12px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--brand-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontWeight: "800", fontSize: "14px" }}>
                    ★
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#FFFFFF" }}>100+ Homes Handover</div>
                    <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.65)" }}>In Hyderabad &bull; 4.9/5 Rating</div>
                  </div>
                </div>

                {/* Main Luxury Interior Backdrop Card */}
                <div className="who-we-are-factory-card" style={{ borderRadius: "24px", boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)" }}>
                  <ParallaxImage
                    src="/assets/main_images/luxury-living-room-interior-design-opulent-space-with-modern-furniture-warm-lighting.webp"
                    alt="DV HOMES Luxury Design & Execution"
                    className="who-we-are-factory-img"
                    speed={0.3}
                    direction="up"
                  />
                  <div className="who-we-are-factory-tag">
                    OUR PROCESS
                  </div>
                </div>

                {/* Overlaid Finished Showroom / Residence Card */}
                <div className="who-we-are-showroom-card" style={{ borderRadius: "20px", boxShadow: "0 20px 50px rgba(122, 158, 0, 0.2)", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
                  <ParallaxImage
                    src="/assets/main_images/bedroom-interior-design-minimal-aesthetic-3d-rendered.webp"
                    alt="DV HOMES Completed Project"
                    className="who-we-are-showroom-img"
                    speed={0.3}
                    direction="down"
                  />
                  <div className="who-we-are-showroom-tag">
                    HYDERABAD HOMES
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            3. WHY CHOOSE DV HOMES - 4 PILLARS & MARKETING MESSAGES
            ================================================================= */}
        <section id="why-dv-homes" className="why-dv-homes-section why-parthu-section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <h2 className="why-parthu-title">Why Choose DV HOMES?</h2>
            </div>

            <div className="why-parthu-items-grid">
              {/* Item 1 */}
              <div className="why-parthu-item" style={{ textAlign: "center", alignItems: "center", display: "flex", flexDirection: "column", padding: "16px 8px" }}>
                <div className="why-parthu-item-icon" style={{ background: "var(--brand-tint-10)", color: "var(--brand-primary)", borderRadius: "12px", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
                  <CompassIcon size={26} color="var(--brand-primary)" strokeWidth={2} />
                </div>
                <div className="why-parthu-item-label" style={{ fontWeight: "600", fontSize: "1rem", color: "var(--text-dark-primary)", lineHeight: "1.35", textAlign: "center" }}>
                  Customised Interior Solutions
                </div>
              </div>

              {/* Item 2 */}
              <div className="why-parthu-item" style={{ textAlign: "center", alignItems: "center", display: "flex", flexDirection: "column", padding: "16px 8px" }}>
                <div className="why-parthu-item-icon" style={{ background: "var(--brand-tint-10)", color: "var(--brand-primary)", borderRadius: "12px", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
                  <ShieldCheckIcon size={26} color="var(--brand-primary)" strokeWidth={2} />
                </div>
                <div className="why-parthu-item-label" style={{ fontWeight: "600", fontSize: "1rem", color: "var(--text-dark-primary)", lineHeight: "1.35", textAlign: "center" }}>
                  End-to-End Execution
                </div>
              </div>

              {/* Item 3 */}
              <div className="why-parthu-item" style={{ textAlign: "center", alignItems: "center", display: "flex", flexDirection: "column", padding: "16px 8px" }}>
                <div className="why-parthu-item-icon" style={{ background: "var(--brand-tint-10)", color: "var(--brand-primary)", borderRadius: "12px", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
                  <DiamondIcon size={26} color="var(--brand-primary)" strokeWidth={2} />
                </div>
                <div className="why-parthu-item-label" style={{ fontWeight: "600", fontSize: "1rem", color: "var(--text-dark-primary)", lineHeight: "1.35", textAlign: "center" }}>
                  Quality Materials
                </div>
              </div>

              {/* Item 4 */}
              <div className="why-parthu-item" style={{ textAlign: "center", alignItems: "center", display: "flex", flexDirection: "column", padding: "16px 8px" }}>
                <div className="why-parthu-item-icon" style={{ background: "var(--brand-tint-10)", color: "var(--brand-primary)", borderRadius: "12px", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
                  <RulerIcon size={26} color="var(--brand-primary)" strokeWidth={2} />
                </div>
                <div className="why-parthu-item-label" style={{ fontWeight: "600", fontSize: "1rem", color: "var(--text-dark-primary)", lineHeight: "1.35", textAlign: "center" }}>
                  Smart Space Planning
                </div>
              </div>

              {/* Item 5 */}
              <div className="why-parthu-item" style={{ textAlign: "center", alignItems: "center", display: "flex", flexDirection: "column", padding: "16px 8px" }}>
                <div className="why-parthu-item-icon" style={{ background: "var(--brand-tint-10)", color: "var(--brand-primary)", borderRadius: "12px", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
                  <HomeIcon size={26} color="var(--brand-primary)" strokeWidth={2} />
                </div>
                <div className="why-parthu-item-label" style={{ fontWeight: "600", fontSize: "1rem", color: "var(--text-dark-primary)", lineHeight: "1.35", textAlign: "center" }}>
                  Modern &amp; Functional Design
                </div>
              </div>

              {/* Item 6 */}
              <div className="why-parthu-item" style={{ textAlign: "center", alignItems: "center", display: "flex", flexDirection: "column", padding: "16px 8px" }}>
                <div className="why-parthu-item-icon" style={{ background: "var(--brand-tint-10)", color: "var(--brand-primary)", borderRadius: "12px", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
                  <ToolIcon size={26} color="var(--brand-primary)" strokeWidth={2} />
                </div>
                <div className="why-parthu-item-label" style={{ fontWeight: "600", fontSize: "1rem", color: "var(--text-dark-primary)", lineHeight: "1.35", textAlign: "center" }}>
                  Professional Project Management
                </div>
              </div>
            </div>

            {/* Black Bottom Banner */}
            <div className="why-parthu-black-banner" style={{ backgroundColor: "#060606" }}>
              <div className="why-parthu-banner-text">
                Complete Customized Residential Interior Solutions in Hyderabad
              </div>
              <button
                onClick={() => setConsultationOpen(true)}
                className="btn btn-primary btn-md"
              >
                <span>Get a Free Consultation</span>
              </button>
            </div>
          </div>
        </section>

        {/* =================================================================
            4. FEATURED SERVICES (DARK LUXURY SLIDER - IMAGE MATCHED)
            ================================================================= */}
        <section id="services" className="featured-services-section">
          <div className="container">
            <ScrollBlurFadeIn>
              <div className="featured-services-top-bar">
                <h2 className="featured-services-heading">Featured Services</h2>
                <div className="featured-services-nav-btns">
                  <button
                    onClick={scrollServicesLeft}
                    className="featured-services-nav-btn"
                    aria-label="Previous Services"
                  >
                    <ChevronLeftIcon size={20} />
                  </button>
                  <button
                    onClick={scrollServicesRight}
                    className="featured-services-nav-btn"
                    aria-label="Next Services"
                  >
                    <ChevronRightIcon size={20} />
                  </button>
                </div>
              </div>

              <div className="featured-services-progress-track">
                <div
                  className="featured-services-progress-fill"
                  style={{ width: `${servicesScrollProgress}%` }}
                />
              </div>

              <div
                ref={servicesSliderRef}
                onScroll={handleServicesScroll}
                className="featured-services-slider-container"
              >
                {featuredServices.map((service) => (
                  <Link
                    key={service.num}
                    href={`/services/${service.id}`}
                    className="featured-service-card-item"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="featured-service-num">{service.num}</div>
                    <div className="featured-service-img-wrapper">
                      <ImageWithSkeleton src={service.image} alt={service.title} />
                    </div>
                    <div className="featured-service-white-box">
                      <div>
                        <h3 className="featured-service-title">{service.title}</h3>
                        <p className="featured-service-desc">{service.desc}</p>
                      </div>
                      <div
                        className="featured-service-arrow-btn"
                        aria-label={`Explore ${service.title}`}
                      >
                        <ArrowRightIcon size={18} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollBlurFadeIn>
          </div>
        </section>

        {/* =================================================================
            4. LATEST PROJECTS GALLERY (EXACT IMAGE MATCHED DESIGN)
            ================================================================= */}
        <section id="projects" className="projects-section">
          <div className="container">
            <ScrollBlurFadeIn>
              <div className="section-header section-header--left section-header--mb">
                <h2 className="projects-section-title">Latest Projects</h2>
              </div>

              {/* Projects Grid */}
              <div className="projects-cards-grid">
                {(showAllProjects ? projects : projects.slice(0, 4)).map((project) => (
                  <div key={project.id} className="project-card-item">
                    <div className="project-card-img-wrapper">
                      <ImageWithSkeleton src={project.image} alt={project.name} />
                    </div>
                    <div className="project-card-white-box">
                      <h3 className="project-card-title">{project.name}</h3>
                      <p className="project-card-location">{project.location}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Projects / Show Less Button */}
              {projects.length > 4 && (
                <div className="projects-cta-wrap">
                  <button
                    type="button"
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className="btn btn-secondary btn-lg"
                  >
                    {showAllProjects ? "Show Less Projects" : "View All Projects"}
                  </button>
                </div>
              )}
            </ScrollBlurFadeIn>
          </div>
        </section>



        {/* =================================================================
            6. BEFORE / AFTER TRANSFORMATION (Scroll-Driven Fullscreen Expansion)
            ================================================================= */}
        <ScrollBeforeAfterSection onOpenConsultation={() => setConsultationOpen(true)} />

        {/* =================================================================
            7. OUR PROCESS & APPROACH
            ================================================================= */}
        <section id="process" className="section-py">
          <div className="container">
            <ScrollBlurFadeIn>
              <div
                className="section-header section-header--left section-header--mb"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: "40px",
                  flexWrap: "wrap",
                  marginBottom: "48px"
                }}
              >
                <div style={{ flex: "1 1 450px", minWidth: "280px" }}>
                  <div className="section-eyebrow" style={{ display: "inline-block", marginBottom: "12px" }}>WHAT MAKES US DIFFERENT?</div>
                  <h2 className="display-md" style={{ margin: 0 }}>Our Approach &amp; 4-Step Process</h2>
                </div>
                <div style={{ flex: "1 1 480px", minWidth: "280px" }}>
                  <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.75)", fontSize: "1.05rem", lineHeight: "1.6" }}>
                    We don’t believe in a one-size-fits-all approach. Every project begins with understanding your requirements and vision. We carefully analyse the available space and develop customised solutions that balance aesthetics, functionality and budget.
                  </p>
                </div>
              </div>

              <div className="process-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
                <div className="process-step-item">
                  <div className="process-circle-badge">
                    <span className="process-step-number">01</span>
                  </div>
                  <h3 className="process-step-title">Consultation &amp; Vision</h3>
                  <p className="process-step-desc">
                    Understanding your requirements, lifestyle, design preferences and budget.
                  </p>
                </div>

                <div className="process-step-item">
                  <div className="process-circle-badge">
                    <span className="process-step-number">02</span>
                  </div>
                  <h3 className="process-step-title">Space &amp; 3D Design</h3>
                  <p className="process-step-desc">
                    Creating practical layouts and customised 3D design concepts tailored to your space.
                  </p>
                </div>

                <div className="process-step-item">
                  <div className="process-circle-badge">
                    <span className="process-step-number">03</span>
                  </div>
                  <h3 className="process-step-title">Material Selection</h3>
                  <p className="process-step-desc">
                    Selecting premium materials, finishes and hardware engineered for quality and durability.
                  </p>
                </div>

                <div className="process-step-item">
                  <div className="process-circle-badge">
                    <span className="process-step-number">04</span>
                  </div>
                  <h3 className="process-step-title">Execution &amp; Handover</h3>
                  <p className="process-step-desc">
                    Managing manufacturing, installation and final handover to deliver a ready home.
                  </p>
                </div>
              </div>
            </ScrollBlurFadeIn>
          </div>
        </section>

        {/* =================================================================
            7B. QUALITY & MATERIALS SECTION
            ================================================================= */}
        <section className="section-py" style={{ backgroundColor: "#060606", color: "#FFFFFF" }}>
          <div className="container">
            <ScrollBlurFadeIn>
              <div className="section-header section-header--left section-header--mb">
                <div className="section-eyebrow" style={{ color: "var(--brand-primary)" }}>QUALITY &amp; MATERIALS</div>
                <h2 className="display-md" style={{ color: "#FFFFFF" }}>Built with Branded Materials &amp; Quality Checklists</h2>
                <p style={{ marginTop: "12px", color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem", maxWidth: "800px" }}>
                  We disclose brand names, core board thickness, and surface finishes upfront. At DV HOMES, we provide total transparency in material selection, construction standards, and site execution.
                </p>
              </div>

              <div className="materials-grid-3x2" style={{ marginTop: "32px" }}>
                {[
                  { name: "Premium Plywood", icon: "🪵", desc: "Durable marine-grade plywood for strength" },
                  { name: "HDHMR Boards", icon: "📐", desc: "High-density moisture-resistant boards" },
                  { name: "Quality Hardware", icon: "🔩", desc: "Reliable soft-close hinges and sliders" },
                  { name: "High-Quality Laminates", icon: "✨", desc: "Scratch & stain resistant surface finishes" },
                  { name: "Acrylic Finishes", icon: "💎", desc: "Glossy, modern high-aesthetic panels" },
                  { name: "Glass & Lighting", icon: "💡", desc: "Fluted glass, profile LED & feature accents" },
                ].map((item, idx) => (
                  <div key={idx} className="materials-card-clean">
                    <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{item.icon}</div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "6px" }}>{item.name}</h3>
                    <p style={{ fontSize: "0.88rem", color: "rgba(255, 255, 255, 0.65)", lineHeight: "1.5" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollBlurFadeIn>
          </div>
        </section>

        {/* =================================================================
            8. CLIENT TESTIMONIALS
            ================================================================= */}
        <section id="testimonials" className="section-py">
          <div className="container">
            <ScrollBlurFadeIn>
              <div className="section-header section-header--left section-header--mb">
                <div className="section-eyebrow">CLIENT TESTIMONIALS</div>
                <h2 className="display-md">What Our Clients Say</h2>
              </div>

              <div className="testimonials-grid">
                <div className="testimonial-card">
                  <div>
                    <div className="testimonial-stars-row">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} size={18} color="var(--brand-primary)" />
                      ))}
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "10px", marginBottom: "8px", color: "var(--text-dark-primary)" }}>
                      “A Smooth and Professional Experience”
                    </h3>
                    <p className="testimonial-text">
                      “DV HOMES understood our requirements clearly and provided customised solutions for our home. The overall design and execution experience was smooth and professional.”
                    </p>
                  </div>
                  <div className="testimonial-author-block">
                    <div className="testimonial-avatar-circle" style={{ backgroundColor: "var(--brand-primary)", color: "#FFFFFF" }}>RC</div>
                    <div>
                      <div className="testimonial-author-name">Residential Interior Client</div>
                      <div className="testimonial-author-role">Hyderabad</div>
                    </div>
                  </div>
                </div>

                <div className="testimonial-card">
                  <div>
                    <div className="testimonial-stars-row">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} size={18} color="var(--brand-primary)" />
                      ))}
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "10px", marginBottom: "8px", color: "var(--text-dark-primary)" }}>
                      “Beautiful and Functional Design”
                    </h3>
                    <p className="testimonial-text">
                      “We wanted an interior that looked modern but was also practical for everyday use. The team helped us achieve a beautiful and functional home.”
                    </p>
                  </div>
                  <div className="testimonial-author-block">
                    <div className="testimonial-avatar-circle" style={{ backgroundColor: "var(--brand-primary)", color: "#FFFFFF" }}>HO</div>
                    <div>
                      <div className="testimonial-author-name">Homeowner</div>
                      <div className="testimonial-author-role">Hyderabad</div>
                    </div>
                  </div>
                </div>

                <div className="testimonial-card">
                  <div>
                    <div className="testimonial-stars-row">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} size={18} color="var(--brand-primary)" />
                      ))}
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "10px", marginBottom: "8px", color: "var(--text-dark-primary)" }}>
                      “Attention to Every Detail”
                    </h3>
                    <p className="testimonial-text">
                      “From design discussions to the final execution, the team paid attention to our requirements and helped us create a space that feels personalised.”
                    </p>
                  </div>
                  <div className="testimonial-author-block">
                    <div className="testimonial-avatar-circle" style={{ backgroundColor: "var(--brand-primary)", color: "#FFFFFF" }}>RC</div>
                    <div>
                      <div className="testimonial-author-name">Residential Client</div>
                      <div className="testimonial-author-role">Hyderabad</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollBlurFadeIn>
          </div>
        </section>

        {/* =================================================================
            9. NUMBERS / METRICS
            ================================================================= */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div>
                <div className="stat-item-number">100+</div>
                <div className="stat-item-title">Homes Delivered</div>
                <div className="stat-item-sub">Across Hyderabad</div>
              </div>

              <div>
                <div className="stat-item-number">100%</div>
                <div className="stat-item-title">Customised Designs</div>
                <div className="stat-item-sub">Tailored to your space</div>
              </div>

              <div>
                <div className="stat-item-number">10 Yrs</div>
                <div className="stat-item-title">Material Warranty</div>
                <div className="stat-item-sub">BWP Plywood &amp; HDHMR</div>
              </div>

              <div>
                <div className="stat-item-number">45 Days</div>
                <div className="stat-item-title">On-Time Handover</div>
                <div className="stat-item-sub">Site to final key delivery</div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            10. FAQ ACCORDION
            ================================================================= */}
        <section className="section-py">
          <div className="container">
            <div className="section-header">
              <div className="section-eyebrow">FREQUENTLY ASKED QUESTIONS</div>
              <h2 className="display-md">Got Questions? We Have Answers.</h2>
            </div>

            <FaqAccordion />
          </div>
        </section>

        {/* =================================================================
            11. FINAL CTA & ADDRESS BAR
            ================================================================= */}
        <section className="cta-dark-section">
          <div className="container">
            <div className="cta-dark-grid">
              <div>
                <div className="section-eyebrow">STRESS-FREE HOME INTERIORS</div>

                <h2 className="cta-hero-title">
                  Your Dream Home Starts<br />
                  <span className="cta-hero-title-accent">with DV HOMES</span>
                </h2>

                <p className="cta-hero-desc">
                  Complete end-to-end responsibility from initial concept to final key handover. Connect with our team on WhatsApp or book your complimentary planning session.
                </p>

                <div className="cta-actions">
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="btn btn-primary btn-lg"
                  >
                    <span>Free Planning Session</span>
                  </button>
                  <a
                    href={`https://wa.me/919916862442?text=${encodeURIComponent("Hi DV HOMES! 👋 I would like to request a Free Home Interior Planning Session.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                  >
                    <WhatsAppIcon size={18} />
                    <span>WhatsApp Consultation</span>
                  </a>
                </div>

                <div className="cta-contact-line">
                  <PhoneIcon size={14} color="var(--brand-primary)" />
                  <span>DV HOMES &bull; Founder: Arige Praveenkumar &bull; 📍 Hyderabad &amp; nearby areas</span>
                </div>
              </div>

              {/* Instant Booking Form Card */}
              <div className="cta-form-card">
                <h3 className="cta-form-card-title">
                  Book a Free Consultation
                </h3>
                <p className="cta-form-card-subtitle">
                  Get a personalized 3D design concept and exact factory-direct estimate.
                </p>

                {homeFormSubmitted ? (
                  <div className="form-success-state">
                    <div className="form-success-icon featured-icon featured-icon-brand">
                      <CheckCircleIcon size={28} color="var(--brand-primary, #ff6364)" />
                    </div>
                    <h4 className="form-success-title">
                      Consultation Requested!
                    </h4>
                    <p className="form-success-desc">
                      Our interior architect will get in touch shortly. Opening WhatsApp chat...
                    </p>
                    <button className="btn btn-secondary btn-sm" onClick={() => setHomeFormSubmitted(false)}>
                      Book Another
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const cleanPhone = homeForm.phone.trim();
                      const formattedPhone = cleanPhone.startsWith("+91") ? cleanPhone : `+91 ${cleanPhone}`;
                      setHomeFormSubmitting(true);
                      const payload = {
                        name: homeForm.name || "Client",
                        phone: formattedPhone,
                        propertyType: homeForm.propertyType,
                        location: homeForm.location || "Hyderabad",
                        budget: homeForm.budget,
                        timeToStart: homeForm.timeToStart,
                        source: "Homepage Inline Consultation Form",
                      };
                      await submitLeadToGoogleSheet(payload);
                      setHomeFormSubmitting(false);
                      setHomeFormSubmitted(true);
                      setTimeout(() => {
                        openWhatsAppLeadChat(payload);
                      }, 800);
                    }}
                  >
                    <div className="form-group" style={{ marginBottom: "14px" }}>
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Suresh Varma"
                        className="form-input"
                        value={homeForm.name}
                        onChange={(e) => setHomeForm({ ...homeForm, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: "14px" }}>
                      <label className="form-label">Phone Number (WhatsApp) *</label>
                      <div className="phone-input-group">
                        <span className="phone-prefix">+91</span>
                        <span className="phone-separator" />
                        <input
                          type="tel"
                          required
                          placeholder="98765 43210"
                          className="phone-input"
                          value={homeForm.phone}
                          onChange={(e) => setHomeForm({ ...homeForm, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: "16px" }}>
                      <label className="form-label">Site / Community Location *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Magna Solitaire, Kokapet"
                        className="form-input"
                        value={homeForm.location}
                        onChange={(e) => setHomeForm({ ...homeForm, location: e.target.value })}
                      />
                    </div>

                    {/* Directly clickable luxury Choice Chips */}
                    <ChoiceChips
                      label="Property Type"
                      options={HOME_PROPERTY_OPTIONS}
                      selectedValue={homeForm.propertyType}
                      onChange={(val) => setHomeForm({ ...homeForm, propertyType: val })}
                      variant="dark"
                    />

                    <ChoiceChips
                      label="Estimated Budget Range"
                      options={HOME_BUDGET_OPTIONS}
                      selectedValue={homeForm.budget}
                      onChange={(val) => setHomeForm({ ...homeForm, budget: val })}
                      variant="dark"
                    />

                    <button
                      type="submit"
                      disabled={homeFormSubmitting}
                      className="btn btn-primary btn-lg"
                      style={{ width: "100%", marginTop: "8px" }}
                    >
                      <span>{homeFormSubmitting ? "Submitting..." : "Request Free Consultation"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            12. BOTTOM VALUE PROPS STRIP (Deep Charcoal #060606)
            ================================================================= */}
        <section className="value-strip-section">
          <div className="container">
            <div className="guarantee-badges-grid">
              <div className="value-badge">
                <div className="value-badge-icon">
                  <CompassIcon size={24} color="#ffffff" />
                </div>
                <div className="value-badge-title">Custom Designs</div>
                <div className="value-badge-desc">Tailored for you</div>
              </div>

              <div className="value-badge">
                <div className="value-badge-icon">
                  <DiamondIcon size={24} color="#ffffff" />
                </div>
                <div className="value-badge-title">Premium Materials</div>
                <div className="value-badge-desc">Lasting beauty</div>
              </div>

              <div className="value-badge">
                <div className="value-badge-icon">
                  <ToolIcon size={24} color="#ffffff" />
                </div>
                <div className="value-badge-title">Expert Team</div>
                <div className="value-badge-desc">Professional installation</div>
              </div>

              <div className="value-badge">
                <div className="value-badge-icon">
                  <ClockIcon size={24} color="#ffffff" />
                </div>
                <div className="value-badge-title">On-Time Delivery</div>
                <div className="value-badge-desc">Every single time</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
      <PricingDeliveryModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        onBookConsultation={() => setConsultationOpen(true)}
      />
    </>
  );
}
