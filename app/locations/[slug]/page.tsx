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
      <section style={{ position: "relative", padding: "96px 32px 40px 32px", overflow: "hidden" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "clamp(2rem, 4.2vw, 2.8rem)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.2", marginBottom: "20px", color: "#FFFFFF" }}>
            {location.heroHeadline}
          </h1>

          <p style={{ fontSize: "1.1rem", color: "#e0e0e0", lineHeight: "1.65", maxWidth: "800px", marginBottom: "36px" }}>
            {location.heroSubheadline}
          </p>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#ff6364",
                color: "#FFFFFF",
                fontWeight: "700",
                padding: "16px 36px",
                borderRadius: "var(--radius-pill)",
                textDecoration: "none",
                fontSize: "0.98rem"
              }}
            >
              <span>Book a Consultation</span>
              <ChevronRightIcon size={18} color="#FFFFFF" />
            </Link>

            <a
              href="tel:+919916862442"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "transparent",
                color: "#FFFFFF",
                fontWeight: "600",
                padding: "16px 28px",
                borderRadius: "var(--radius-pill)",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                fontSize: "0.98rem"
              }}
            >
              <PhoneIcon size={18} color="#ff6364" />
              <span>+91 99168 62442</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content & Local Relevance */}
      <section style={{ padding: "80px 32px 100px 32px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "56px", alignItems: "flex-start" }}>
            
            {/* Left Column */}
            <div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "20px", lineHeight: "1.3" }}>
                Residential Interiors for Refined Homes in {location.name}
              </h2>
              <p style={{ fontSize: "1.02rem", color: "#cccccc", lineHeight: "1.7", marginBottom: "32px" }}>
                {location.intro}
              </p>

              <h3 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "18px" }}>
                Property Types We Commonly Serve in {location.name}:
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                {location.propertyTypes.map((pt, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", background: "transparent", padding: "14px 18px", borderRadius: "var(--radius-brand-12)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <CheckIcon size={18} color="#ff6364" />
                    <span style={{ fontSize: "0.95rem", color: "#e0e0e0", fontWeight: "500" }}>{pt}</span>
                  </div>
                ))}
              </div>

              {location.localDesignConsiderations.length > 0 && (
                <>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "18px" }}>
                    Local Design &amp; Architectural Considerations:
                  </h3>
                  <ul style={{ paddingLeft: "20px", color: "#cccccc", lineHeight: "1.7", fontSize: "0.95rem", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {location.localDesignConsiderations.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Right Column: Key Highlights Box */}
            <div style={{ background: "transparent", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "var(--radius-brand-24)", padding: "36px 32px" }}>
              <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "24px" }}>
                Why DV Homes in {location.name}?
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {location.keyHighlights.map((kh, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <div style={{ background: "rgba(255, 99, 100, 0.15)", borderRadius: "var(--radius-brand-10)", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <SparklesIcon size={18} color="#ff6364" />
                    </div>
                    <span style={{ fontSize: "0.95rem", color: "#e0e0e0", lineHeight: "1.6" }}>{kh}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                <p style={{ fontSize: "0.88rem", color: "#b0b0b0", marginBottom: "18px" }}>
                  Factory-controlled woodwork manufactured at our Kokapet facility.
                </p>
                <Link
                  href="/contact"
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    background: "#ff6364",
                    color: "#FFFFFF",
                    fontWeight: "700",
                    padding: "14px",
                    borderRadius: "var(--radius-brand-12)",
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
      <section style={{ padding: "80px 32px 100px 32px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "14px", textAlign: "center" }}>
            Services Offered in {location.name}
          </h2>
          <p style={{ fontSize: "1.02rem", color: "#b0b0b0", textAlign: "center", marginBottom: "48px" }}>
            Comprehensive interior solutions tailored to your floorplan requirements.
          </p>

          <div className="grid-3x2-equal">
            {servicesData.slice(0, 6).map((srv) => (
              <Link key={srv.id} href={`/services/${srv.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-brand-18)", padding: "28px 24px", height: "100%", transition: "all 0.3s ease", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "10px", lineHeight: "1.3" }}>
                      {srv.title}
                    </h3>
                    <p style={{ fontSize: "0.88rem", color: "#a0a0a0", lineHeight: "1.5", margin: 0 }}>
                      {srv.tagline}
                    </p>
                  </div>
                  <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#ff6364", fontWeight: "600" }}>
                    <span>Learn More</span>
                    <ChevronRightIcon size={14} color="#ff6364" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local FAQs */}
      {location.faqs.length > 0 && (
        <section style={{ padding: "80px 32px 100px 32px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "36px", textAlign: "center" }}>
              Frequently Asked Questions - {location.name} Interiors
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {location.faqs.map((faq, idx) => (
                <div key={idx} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--radius-brand-18)", padding: "28px 32px" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "12px" }}>
                    {faq.question}
                  </h3>
                  <p style={{ fontSize: "0.98rem", color: "#cccccc", lineHeight: "1.65", margin: 0 }}>
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
        <section style={{ padding: "60px 32px 100px 32px" }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "#e0e0e0", marginBottom: "24px" }}>
              Explore Interior Design Services in Nearby Areas:
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px" }}>
              {nearbyLocations.map((nl) => (
                <Link
                  key={nl.slug}
                  href={`/locations/${nl.slug}`}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "#ff6364",
                    padding: "8px 20px",
                    borderRadius: "var(--radius-pill)",
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
