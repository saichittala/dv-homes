import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "../../components/Footer";
import JsonLd, { defaultOrganizationSchema } from "../../components/JsonLd";
import { locationsData, LocationDetail } from "../../lib/locationsData";
import { servicesData } from "../../lib/servicesData";
import {
  MapPinIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  PhoneIcon,
  CompassIcon,
  CheckIcon
} from "../../components/Icons";

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return locationsData.map((loc) => ({
    slug: loc.slug
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);

  if (!location) {
    return {
      title: "Location Not Found | DV Homes"
    };
  }

  const canonicalUrl = `https://dvhomes.in/locations/${location.slug}`;

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: canonicalUrl,
      siteName: "DV Homes & Interiors",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: `https://dvhomes.in${location.featuredImage}`,
          alt: `${location.name} Interior Design - DV Homes`
        }
      ]
    }
  };
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  const nearbyLocations = locationsData.filter((l) =>
    location.nearbyAreas.some(area => area.toLowerCase() === l.name.toLowerCase()) || l.zone === location.zone
  ).filter((l) => l.slug !== location.slug).slice(0, 5);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dvhomes.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": "https://dvhomes.in/locations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": location.name,
        "item": `https://dvhomes.in/locations/${location.slug}`
      }
    ]
  };

  const faqSchema = location.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": location.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <main style={{ background: "#060606", color: "#FFFFFF", minHeight: "100vh" }}>
      <JsonLd data={[defaultOrganizationSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]} />

      {/* Hero */}
      <section style={{ position: "relative", padding: "120px 24px 80px 24px", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", height: "100%", opacity: 0.15, pointerEvents: "none", background: `radial-gradient(circle at 50% 20%, #38d059 0%, transparent 60%)` }} />

        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(56, 208, 89, 0.12)", color: "#38d059", border: "1px solid rgba(56, 208, 89, 0.3)", borderRadius: "9999px", padding: "6px 16px", fontSize: "0.85rem", fontWeight: "600", marginBottom: "20px" }}>
            <MapPinIcon size={16} color="#38d059" />
            <span>INTERIOR DESIGN IN {location.name.toUpperCase()}, HYDERABAD</span>
          </div>

          <h1 style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.1", marginBottom: "20px", color: "#FFFFFF" }}>
            {location.heroHeadline}
          </h1>

          <p style={{ fontSize: "1.2rem", color: "#e0e0e0", lineHeight: "1.6", maxWidth: "780px", marginBottom: "32px" }}>
            {location.heroSubheadline}
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#38d059",
                color: "#000000",
                fontWeight: "700",
                padding: "16px 36px",
                borderRadius: "9999px",
                textDecoration: "none",
                fontSize: "1rem"
              }}
            >
              <span>Book a Consultation</span>
              <ChevronRightIcon size={18} color="#000000" />
            </Link>

            <a
              href="tel:+919916862442"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#FFFFFF",
                fontWeight: "600",
                padding: "16px 28px",
                borderRadius: "9999px",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontSize: "1rem"
              }}
            >
              <PhoneIcon size={18} color="#38d059" />
              <span>+91 99168 62442</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content & Local Relevance */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "flex-start" }}>
            
            {/* Left Column: Context & Design Considerations */}
            <div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "20px" }}>
                Residential Interiors for Refined Homes in {location.name}
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#cccccc", lineHeight: "1.7", marginBottom: "28px" }}>
                {location.intro}
              </p>

              <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "16px" }}>
                Property Types We Commonly Serve in {location.name}:
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
                {location.propertyTypes.map((pt, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255, 255, 255, 0.03)", padding: "12px 18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <CheckIcon size={18} color="#38d059" />
                    <span style={{ fontSize: "0.98rem", color: "#e0e0e0", fontWeight: "500" }}>{pt}</span>
                  </div>
                ))}
              </div>

              {location.localDesignConsiderations.length > 0 && (
                <>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "16px" }}>
                    Local Design &amp; Architectural Considerations:
                  </h3>
                  <ul style={{ paddingLeft: "20px", color: "#cccccc", lineHeight: "1.7", fontSize: "0.98rem", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {location.localDesignConsiderations.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Right Column: Key Highlights Box */}
            <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "36px 28px" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "20px" }}>
                Why DV Homes in {location.name}?
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {location.keyHighlights.map((kh, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <div style={{ background: "rgba(56, 208, 89, 0.15)", borderRadius: "8px", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <SparklesIcon size={18} color="#38d059" />
                    </div>
                    <span style={{ fontSize: "0.95rem", color: "#e0e0e0", lineHeight: "1.5" }}>{kh}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                <p style={{ fontSize: "0.88rem", color: "#b0b0b0", marginBottom: "16px" }}>
                  Factory-controlled woodwork manufactured at our Kokapet facility.
                </p>
                <Link
                  href="/contact"
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    background: "#38d059",
                    color: "#000000",
                    fontWeight: "700",
                    padding: "14px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "0.95rem"
                  }}
                >
                  Request Floorplan Review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Services Grid */}
      <section style={{ padding: "60px 24px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "12px", textAlign: "center" }}>
            Services Offered in {location.name}
          </h2>
          <p style={{ fontSize: "1rem", color: "#b0b0b0", textAlign: "center", marginBottom: "40px" }}>
            Comprehensive interior solutions tailored to your floorplan requirements.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {servicesData.slice(0, 6).map((srv) => (
              <Link key={srv.id} href={`/services/${srv.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "20px", transition: "all 0.3s ease" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "8px" }}>
                    {srv.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#a0a0a0", lineHeight: "1.4", margin: 0 }}>
                    {srv.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local FAQs */}
      {location.faqs.length > 0 && (
        <section style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: "840px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "32px", textAlign: "center" }}>
              Frequently Asked Questions - {location.name} Interiors
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {location.faqs.map((faq, idx) => (
                <div key={idx} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "24px" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "10px" }}>
                    {faq.question}
                  </h3>
                  <p style={{ fontSize: "0.98rem", color: "#cccccc", lineHeight: "1.6", margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Location Links */}
      {nearbyLocations.length > 0 && (
        <section style={{ padding: "40px 24px 80px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#e0e0e0", marginBottom: "20px" }}>
              Explore Interior Design Services in Nearby Areas:
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
              {nearbyLocations.map((nl) => (
                <Link
                  key={nl.slug}
                  href={`/locations/${nl.slug}`}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#38d059",
                    padding: "8px 18px",
                    borderRadius: "9999px",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                    fontWeight: "500"
                  }}
                >
                  Interior Designers in {nl.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
