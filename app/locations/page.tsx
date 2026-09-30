import React from "react";
import Metadata from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JsonLd, { defaultOrganizationSchema } from "../components/JsonLd";
import { locationsData } from "../lib/locationsData";
import { ChevronRightIcon, MapPinIcon, SparklesIcon, ShieldCheckIcon } from "../components/Icons";

export const metadata = {
  title: "Interior Designers in Hyderabad Locations | DV Homes & Interiors",
  description: "Explore turnkey interior design & execution across Madhapur, Gachibowli, Kondapur, Jubilee Hills, Banjara Hills, Kokapet, Financial District & all Hyderabad locations.",
  alternates: {
    canonical: "https://dvhomes.in/locations"
  },
  openGraph: {
    title: "Interior Designers in Hyderabad Locations | DV Homes",
    description: "Architectural luxury home interior design & turnkey execution across major Hyderabad neighborhoods.",
    url: "https://dvhomes.in/locations",
    siteName: "DV Homes & Interiors",
    type: "website"
  }
};

export default function LocationsHubPage() {
  const zones = ["West Hyderabad", "Central Hyderabad", "North Hyderabad", "South Hyderabad"] as const;

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
      }
    ]
  };

  return (
    <main style={{ background: "#060606", color: "#FFFFFF", minHeight: "100vh" }}>
      <JsonLd data={[defaultOrganizationSchema, breadcrumbSchema]} />

      {/* Hero Section */}
      <section style={{ padding: "120px 24px 60px 24px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(56, 208, 89, 0.12)", color: "#38d059", border: "1px solid rgba(56, 208, 89, 0.3)", borderRadius: "9999px", padding: "6px 16px", fontSize: "0.85rem", fontWeight: "600", marginBottom: "20px" }}>
            <MapPinIcon size={16} color="#38d059" />
            <span>HYDERABAD SERVICE AREAS</span>
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.15", marginBottom: "20px", color: "#FFFFFF" }}>
            Interior Design Across Hyderabad
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#e0e0e0", lineHeight: "1.6", maxWidth: "680px", margin: "0 auto 32px auto" }}>
            DV Homes delivers bespoke residential interior design &amp; factory-controlled execution for high-rise apartments, gated villas, and luxury estates across all major Hyderabad enclaves.
          </p>
        </div>
      </section>

      {/* Zones Grid */}
      <section style={{ padding: "80px 24px" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {zones.map((zone) => {
            const locationsInZone = locationsData.filter((loc) => loc.zone === zone);
            if (locationsInZone.length === 0) return null;

            return (
              <div key={zone} style={{ marginBottom: "64px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <div style={{ width: "4px", height: "24px", background: "#38d059", borderRadius: "2px" }} />
                  <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "#FFFFFF", margin: 0 }}>
                    {zone}
                  </h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
                  {locationsInZone.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/locations/${loc.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "16px",
                          padding: "28px 24px",
                          height: "100%",
                          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between"
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                            <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "#FFFFFF", margin: 0 }}>
                              {loc.name}
                            </h3>
                            <ChevronRightIcon size={20} color="#38d059" />
                          </div>
                          <p style={{ fontSize: "0.92rem", color: "#b0b0b0", lineHeight: "1.5", marginBottom: "20px" }}>
                            {loc.heroSubheadline}
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {loc.propertyTypes.slice(0, 2).map((pt, idx) => (
                              <span key={idx} style={{ background: "rgba(255,255,255,0.06)", color: "#e0e0e0", fontSize: "0.78rem", padding: "4px 10px", borderRadius: "6px" }}>
                                {pt}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#38d059", fontWeight: "600" }}>
                          <span>View {loc.name} Interiors</span>
                          <ChevronRightIcon size={14} color="#38d059" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section style={{ padding: "60px 24px", background: "rgba(255, 255, 255, 0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", textAlign: "center" }}>
          <ShieldCheckIcon size={40} color="#38d059" style={{ marginBottom: "16px" }} />
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "12px" }}>
            Direct Factory Execution from Kokapet
          </h2>
          <p style={{ fontSize: "1rem", color: "#cccccc", lineHeight: "1.6", maxWidth: "720px", margin: "0 auto 24px auto" }}>
            Regardless of your home location in Hyderabad, our centralized Kokapet facility handles precision CNC woodworking, PUR hotmelt edge-banding, and quality audits before site assembly.
          </p>
          <Link
            href="/contact"
            className="magnetic-btn-wrapper"
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
            <span>Book a Design Consultation</span>
            <ChevronRightIcon size={18} color="#000000" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
