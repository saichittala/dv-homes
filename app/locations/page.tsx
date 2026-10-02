import React from "react";
import Metadata from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JsonLd, { defaultOrganizationSchema } from "../components/JsonLd";
import { locationsData } from "../lib/locationsData";
import { ChevronRightIcon, MapPinIcon, ShieldCheckIcon } from "../components/Icons";

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
      <section style={{ padding: "160px 32px 80px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255, 99, 100, 0.12)", color: "#ff6364", border: "1px solid rgba(255, 99, 100, 0.3)", borderRadius: "9999px", padding: "8px 20px", fontSize: "0.85rem", fontWeight: "600", marginBottom: "20px" }}>
            <MapPinIcon size={16} color="#ff6364" />
            <span>HYDERABAD SERVICE AREAS</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4.2vw, 2.8rem)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.2", marginBottom: "20px", color: "#FFFFFF" }}>
            Interior Design Across Hyderabad
          </h1>
          <p style={{ fontSize: "1.08rem", color: "#e0e0e0", lineHeight: "1.65", maxWidth: "720px", margin: "0 auto 32px auto" }}>
            DV Homes delivers bespoke residential interior design &amp; factory-controlled execution for high-rise apartments, gated villas, and luxury estates across all major Hyderabad enclaves.
          </p>
        </div>
      </section>

      {/* Zones Grid */}
      <section style={{ padding: "60px 32px 100px 32px" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {zones.map((zone) => {
            const locationsInZone = locationsData.filter((loc) => loc.zone === zone);
            if (locationsInZone.length === 0) return null;

            return (
              <div key={zone} style={{ marginBottom: "64px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                  <div style={{ width: "4px", height: "24px", background: "#ff6364", borderRadius: "2px" }} />
                  <h2 style={{ fontSize: "1.45rem", fontWeight: "700", color: "#FFFFFF", margin: 0 }}>
                    {zone}
                  </h2>
                </div>

                <div className="grid-3x2-equal">
                  {locationsInZone.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/locations/${loc.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "18px",
                          padding: "32px 28px",
                          height: "100%",
                          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between"
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#FFFFFF", margin: 0 }}>
                              {loc.name}
                            </h3>
                            <ChevronRightIcon size={18} color="#ff6364" />
                          </div>
                          <p style={{ fontSize: "0.9rem", color: "#b0b0b0", lineHeight: "1.55", marginBottom: "20px" }}>
                            {loc.heroSubheadline}
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {loc.propertyTypes.slice(0, 2).map((pt, idx) => (
                              <span key={idx} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#d0d0d0", fontSize: "0.78rem", padding: "4px 10px", borderRadius: "6px" }}>
                                {pt}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#ff6364", fontWeight: "600" }}>
                          <span>View {loc.name} Interiors</span>
                          <ChevronRightIcon size={14} color="#ff6364" />
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
      <section style={{ padding: "80px 32px 100px 32px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", textAlign: "center" }}>
          <ShieldCheckIcon size={40} color="#ff6364" style={{ marginBottom: "18px" }} />
          <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "14px" }}>
            Direct Factory Execution from Kokapet
          </h2>
          <p style={{ fontSize: "1.02rem", color: "#cccccc", lineHeight: "1.65", maxWidth: "720px", margin: "0 auto 28px auto" }}>
            Regardless of your home location in Hyderabad, our centralized Kokapet facility handles precision CNC woodworking, PUR hotmelt edge-banding, and quality audits before site assembly.
          </p>
          <Link
            href="/contact"
            className="magnetic-btn-wrapper"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#ff6364",
              color: "#FFFFFF",
              fontWeight: "700",
              padding: "16px 36px",
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
