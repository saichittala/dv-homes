import React from "react";
import Metadata from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import JsonLd, { defaultOrganizationSchema } from "../components/JsonLd";
import { projectsData } from "../lib/projectsData";
import { ChevronRightIcon, MapPinIcon, SparklesIcon } from "../components/Icons";

export const metadata = {
  title: "Interior Design Portfolio & Projects in Hyderabad | DV Homes",
  description: "Browse real completed residential interior design projects across Kokapet, Financial District, Jubilee Hills, Gachibowli & Madhapur by DV Homes.",
  alternates: {
    canonical: "https://dvhomes.in/projects"
  },
  openGraph: {
    title: "Interior Design Portfolio & Projects in Hyderabad | DV Homes",
    description: "Explore real luxury villa and apartment interior projects in Hyderabad.",
    url: "https://dvhomes.in/projects",
    siteName: "DV Homes & Interiors",
    type: "website"
  }
};

export default function ProjectsPage() {
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
        "name": "Projects",
        "item": "https://dvhomes.in/projects"
      }
    ]
  };

  return (
    <main style={{ background: "#060606", color: "#FFFFFF", minHeight: "100vh" }}>
      <JsonLd data={[defaultOrganizationSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section style={{ padding: "100px 24px 40px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(56, 208, 89, 0.12)", color: "#38d059", border: "1px solid rgba(56, 208, 89, 0.3)", borderRadius: "9999px", padding: "6px 16px", fontSize: "0.85rem", fontWeight: "600", marginBottom: "16px" }}>
            <SparklesIcon size={16} color="#38d059" />
            <span>PROJECT PORTFOLIO</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.4rem)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.2", marginBottom: "16px", color: "#FFFFFF" }}>
            Real Homes, Exceptional Execution
          </h1>
          <p style={{ fontSize: "1.02rem", color: "#e0e0e0", lineHeight: "1.6", maxWidth: "680px", margin: "0 auto" }}>
            Explore our curated showcase of turnkey residential interior projects executed across Hyderabad's premier neighborhoods.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: "40px 24px 60px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="grid-3x2-equal">
            {projectsData.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "18px", overflow: "hidden", transition: "all 0.3s ease" }}>
                  <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                    <img
                      src={project.mainImage}
                      alt={`${project.title} - ${project.location} Interior Design by DV Homes`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      loading="lazy"
                    />
                    <div style={{ position: "absolute", bottom: "14px", left: "14px", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", color: "#38d059", padding: "4px 10px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" }}>
                      <MapPinIcon size={14} color="#38d059" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  <div style={{ padding: "24px" }}>
                    <div style={{ fontSize: "0.78rem", color: "#38d059", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                      {project.projectType} • {project.designStyle}
                    </div>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "10px", lineHeight: "1.3" }}>
                      {project.title}
                    </h2>
                    <p style={{ fontSize: "0.88rem", color: "#b0b0b0", lineHeight: "1.5", marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {project.concept}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "#38d059", fontWeight: "600" }}>
                      <span>View Case Study &amp; Gallery</span>
                      <ChevronRightIcon size={14} color="#38d059" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
