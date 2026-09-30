import React from "react";
import Metadata from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import JsonLd, { defaultOrganizationSchema } from "../components/JsonLd";
import { servicesData } from "../lib/servicesData";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import { SparklesIcon, ChevronRightIcon } from "../components/Icons";

export const metadata = {
  title: "Residential Interior Design Services in Hyderabad | DV Homes",
  description: "Explore turnkey interior design services in Hyderabad. Modular kitchens, luxury bedrooms, living suites, wardrobes, pooja rooms & office space interiors.",
  alternates: {
    canonical: "https://dvhomes.in/services"
  },
  openGraph: {
    title: "Residential Interior Design Services in Hyderabad | DV Homes",
    description: "Complete residential interior design & turnkey execution services in Hyderabad.",
    url: "https://dvhomes.in/services",
    siteName: "DV Homes & Interiors",
    type: "website"
  }
};

export default function ServicesPage() {
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
        "name": "Services",
        "item": "https://dvhomes.in/services"
      }
    ]
  };

  return (
    <main style={{ background: "#060606", color: "#FFFFFF", minHeight: "100vh" }}>
      <JsonLd data={[defaultOrganizationSchema, breadcrumbSchema]} />

      {/* Hero Banner */}
      <section style={{ padding: "100px 24px 40px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(56, 208, 89, 0.12)", color: "#38d059", border: "1px solid rgba(56, 208, 89, 0.3)", borderRadius: "9999px", padding: "6px 16px", fontSize: "0.85rem", fontWeight: "600", marginBottom: "16px" }}>
            <SparklesIcon size={16} color="#38d059" />
            <span>INTERIOR SERVICES</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.4rem)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.2", marginBottom: "16px", color: "#FFFFFF" }}>
            Our Interior Design Services
          </h1>
          <p style={{ fontSize: "1.02rem", color: "#e0e0e0", lineHeight: "1.6", maxWidth: "680px", margin: "0 auto" }}>
            Bespoke spatial design, German modular engineering, and direct factory execution tailored for your home.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: "40px 24px 60px 24px" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
            {servicesData.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "18px",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                    <ImageWithSkeleton src={service.mainImage} alt={service.title} />
                  </div>

                  <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "#38d059", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                        {service.category}
                      </div>
                      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "8px" }}>
                        {service.title}
                      </h2>
                      <p style={{ fontSize: "0.88rem", color: "#b0b0b0", lineHeight: "1.5", margin: 0 }}>
                        {service.tagline}
                      </p>
                    </div>

                    <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "#38d059", fontWeight: "600" }}>
                      <span>Explore Service Details</span>
                      <ChevronRightIcon size={14} color="#38d059" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "60px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "12px" }}>
            Free Home Interior Planning Session
          </h2>
          <p style={{ fontSize: "0.98rem", color: "#cccccc", lineHeight: "1.6", marginBottom: "24px" }}>
            Get expert guidance, material specs, and stage-wise budget planning for your space with DV HOMES.
          </p>
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
            <span>Book Free Planning Session</span>
            <ChevronRightIcon size={16} color="#000000" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
