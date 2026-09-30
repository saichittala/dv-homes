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
      <section style={{ position: "relative", padding: "100px 24px 60px 24px", overflow: "hidden" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(56, 208, 89, 0.12)", color: "#38d059", border: "1px solid rgba(56, 208, 89, 0.3)", borderRadius: "9999px", padding: "6px 16px", fontSize: "0.85rem", fontWeight: "600", marginBottom: "16px" }}>
            <MapPinIcon size={16} color="#38d059" />
            <span>INTERIOR DESIGN IN {location.name.toUpperCase()}, HYDERABAD</span>
          </div>

          <h1 style={{ fontSize: "clamp(1.75rem, 3.8vw, 2.5rem)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.15", marginBottom: "16px", color: "#FFFFFF" }}>
            {location.heroHeadline}
          </h1>

          <p style={{ fontSize: "1.05rem", color: "#e0e0e0", lineHeight: "1.6", maxWidth: "780px", marginBottom: "28px" }}>
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
                padding: "14px 32px",
                borderRadius: "9999px",
                textDecoration: "none",
                fontSize: "0.95rem"
              }}
            >
              <span>Book a Consultation</span>
              <ChevronRightIcon size={16} color="#000000" />
            </Link>

            <a
              href="tel:+919916862442"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                color: "#FFFFFF",
                fontWeight: "600",
                padding: "14px 24px",
                borderRadius: "9999px",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontSize: "0.95rem"
              }}
            >
              <PhoneIcon size={16} color="#38d059" />
              <span>+91 99168 62442</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content & Local Relevance */}
      <section style={{ padding: "40px 24px 60px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "flex-start" }}>
            
            {/* Left Column */}
            <div>
              <h2 style={{ fontSize: "1.45rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "16px" }}>
                Residential Interiors for Refined Homes in {location.name}
              </h2>
              <p style={{ fontSize: "0.98rem", color: "#cccccc", lineHeight: "1.65", marginBottom: "24px" }}>
                {location.intro}
              </p>

              <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "14px" }}>
                Property Types We Commonly Serve in {location.name}:
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {location.propertyTypes.map((pt, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", background: "transparent", padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <CheckIcon size={16} color="#38d059" />
                    <span style={{ fontSize: "0.92rem", color: "#e0e0e0", fontWeight: "500" }}>{pt}</span>
                  </div>
                ))}
              </div>

              {location.localDesignConsiderations.length > 0 && (
                <>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "14px" }}>
                    Local Design &amp; Architectural Considerations:
                  </h3>
                  <ul style={{ paddingLeft: "18px", color: "#cccccc", lineHeight: "1.65", fontSize: "0.92rem", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {location.localDesignConsiderations.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Right Column: Key Highlights Box */}
            <div style={{ background: "transparent", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "20px", padding: "28px 24px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "16px" }}>
                Why DV Homes in {location.name}?
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {location.keyHighlights.map((kh, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ background: "rgba(56, 208, 89, 0.15)", borderRadius: "8px", padding: "6px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <SparklesIcon size={16} color="#38d059" />
                    </div>
                    <span style={{ fontSize: "0.9rem", color: "#e0e0e0", lineHeight: "1.5" }}>{kh}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                <p style={{ fontSize: "0.85rem", color: "#b0b0b0", marginBottom: "14px" }}>
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
                    padding: "12px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "0.9rem"
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
      <section style={{ padding: "50px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "10px", textAlign: "center" }}>
            Services Offered in {location.name}
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#b0b0b0", textAlign: "center", marginBottom: "32px" }}>
            Comprehensive interior solutions tailored to your floorplan requirements.
          </p>

          <div className="grid-3x2-equal">
            {servicesData.slice(0, 6).map((srv) => (
              <Link key={srv.id} href={`/services/${srv.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", padding: "18px", transition: "all 0.3s ease" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "6px" }}>
                    {srv.title}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "#a0a0a0", lineHeight: "1.4", margin: 0 }}>
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
        <section style={{ padding: "50px 24px" }}>
          <div style={{ maxWidth: "840px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "24px", textAlign: "center" }}>
              Frequently Asked Questions - {location.name} Interiors
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {location.faqs.map((faq, idx) => (
                <div key={idx} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", padding: "20px 22px" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "8px" }}>
                    {faq.question}
                  </h3>
                  <p style={{ fontSize: "0.92rem", color: "#cccccc", lineHeight: "1.6", margin: 0 }}>
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
        <section style={{ padding: "40px 24px 60px 24px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#e0e0e0", marginBottom: "16px" }}>
              Explore Interior Design Services in Nearby Areas:
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
              {nearbyLocations.map((nl) => (
                <Link
                  key={nl.slug}
                  href={`/locations/${nl.slug}`}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#38d059",
                    padding: "6px 16px",
                    borderRadius: "9999px",
                    textDecoration: "none",
                    fontSize: "0.85rem",
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
