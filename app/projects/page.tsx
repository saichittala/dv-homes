import React from "react";
import Metadata from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import JsonLd, { defaultOrganizationSchema } from "../components/JsonLd";
import { projectsData } from "../lib/projectsData";
import { ChevronRightIcon, MapPinIcon } from "../components/Icons";
import ImageWithSkeleton from "../components/ImageWithSkeleton";

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
      <section style={{ padding: "160px 32px 50px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.2", marginBottom: "12px", color: "#FFFFFF" }}>
            Real Homes, Exceptional Execution
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#cccccc", lineHeight: "1.6", maxWidth: "680px", margin: "0 auto" }}>
            Explore our curated showcase of turnkey residential interior projects executed across Hyderabad's premier neighborhoods.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: "20px 32px 100px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="projects-cards-grid">
            {projectsData.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="project-card-item"
                style={{ textDecoration: "none" }}
              >
                <div className="project-card-img-wrapper">
                  <ImageWithSkeleton
                    src={project.mainImage}
                    alt={`${project.title} - ${project.location} Interior Design by DV Homes`}
                  />
                </div>
                <div className="project-card-white-box">
                  <h2 className="project-card-title">{project.title}</h2>
                  <p className="project-card-location">{project.location}</p>
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
