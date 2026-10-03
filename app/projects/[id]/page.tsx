import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "../../components/Footer";
import JsonLd, { defaultOrganizationSchema } from "../../components/JsonLd";
import { projectsData } from "../../lib/projectsData";
import {
  MapPinIcon,
  ChevronRightIcon,
  SparklesIcon,
  PhoneIcon,
  CheckIcon
} from "../../components/Icons";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((proj) => ({
    id: proj.id
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | DV Homes"
    };
  }

  const canonicalUrl = `https://dvhomes.in/projects/${project.id}`;

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url: canonicalUrl,
      siteName: "DV Homes & Interiors",
      locale: "en_IN",
      type: "article",
      images: [
        {
          url: `https://dvhomes.in${project.mainImage}`,
          alt: `${project.title} - ${project.location} Interior Design by DV Homes`
        }
      ]
    }
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `https://dvhomes.in/projects/${project.id}`
      }
    ]
  };

  return (
    <main style={{ background: "#060606", color: "#FFFFFF", minHeight: "100vh" }}>
      <JsonLd data={[defaultOrganizationSchema, breadcrumbSchema]} />

      {/* Hero Header */}
      <section style={{ padding: "140px 24px 30px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255, 99, 100, 0.12)", color: "#ff6364", border: "1px solid rgba(255, 99, 100, 0.3)", borderRadius: "var(--radius-pill)", padding: "6px 16px", fontSize: "0.85rem", fontWeight: "600", marginBottom: "16px" }}>
            <MapPinIcon size={16} color="#ff6364" />
            <span>{project.location.toUpperCase()}</span>
          </div>

          <h1 style={{ fontSize: "clamp(1.75rem, 3.8vw, 2.5rem)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.15", marginBottom: "20px", color: "#FFFFFF" }}>
            {project.title}
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", background: "transparent", padding: "20px", borderRadius: "var(--radius-brand-16)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#a0a0a0", textTransform: "uppercase" }}>Project Type</div>
              <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "#FFFFFF", marginTop: "4px" }}>{project.projectType}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#a0a0a0", textTransform: "uppercase" }}>Scope</div>
              <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "#FFFFFF", marginTop: "4px" }}>{project.scope}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#a0a0a0", textTransform: "uppercase" }}>Design Style</div>
              <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "#FFFFFF", marginTop: "4px" }}>{project.designStyle}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#a0a0a0", textTransform: "uppercase" }}>Completion</div>
              <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "#FFFFFF", marginTop: "4px" }}>{project.completionYear}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image Showcase */}
      <section style={{ padding: "20px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ borderRadius: "var(--radius-brand-20)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
            <img
              src={project.mainImage}
              alt={`${project.title} in ${project.location} - Main Interior View by DV Homes`}
              style={{ width: "100%", height: "auto", maxHeight: "540px", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* Design Story & Materials */}
      <section style={{ padding: "40px 24px 60px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
            <div>
              <h2 style={{ fontSize: "1.45rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "16px" }}>
                Design Concept &amp; Story
              </h2>
              <p style={{ fontSize: "0.98rem", color: "#cccccc", lineHeight: "1.65", marginBottom: "24px" }}>
                {project.concept}
              </p>

              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "14px" }}>
                Project Challenge &amp; Solution
              </h3>
              <div style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", padding: "20px 22px", borderRadius: "var(--radius-brand-14)", marginBottom: "20px" }}>
                <div style={{ fontWeight: "600", color: "#ff6364", marginBottom: "6px" }}>Challenge:</div>
                <p style={{ fontSize: "0.92rem", color: "#e0e0e0", margin: "0 0 12px 0", lineHeight: "1.5" }}>{project.challenge}</p>
                <div style={{ fontWeight: "600", color: "#ff6364", marginBottom: "6px" }}>DV Homes Solution:</div>
                <p style={{ fontSize: "0.92rem", color: "#e0e0e0", margin: 0, lineHeight: "1.5" }}>{project.solution}</p>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "16px" }}>
                Materials &amp; Finishes Used
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {project.materials.map((mat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", background: "transparent", padding: "10px 14px", borderRadius: "var(--radius-brand-10)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <CheckIcon size={16} color="#ff6364" />
                    <span style={{ fontSize: "0.9rem", color: "#e0e0e0" }}>{mat}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "16px" }}>
                Key Interior Features
              </h3>
              <ul style={{ paddingLeft: "18px", color: "#cccccc", lineHeight: "1.65", fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "8px" }}>
                {project.keyFeatures.map((kf, idx) => (
                  <li key={idx}>{kf}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: "40px 24px 60px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "24px", textAlign: "center" }}>
            Project Image Gallery
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {project.gallery.map((imgUrl, idx) => (
              <div key={idx} style={{ borderRadius: "var(--radius-brand-14)", overflow: "hidden", height: "220px", border: "1px solid rgba(255,255,255,0.12)" }}>
                <img
                  src={imgUrl}
                  alt={`${project.title} ${project.location} Interior Shot ${idx + 1} - DV Homes`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Link Shortcuts & CTA */}
      <section style={{ padding: "60px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.55rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "12px" }}>
            Want a Similar Finish for Your Home?
          </h2>
          <p style={{ fontSize: "0.98rem", color: "#cccccc", lineHeight: "1.6", marginBottom: "24px" }}>
            Let Arige Praveenkumar and our turnkey execution team design your space with high-precision factory craftsmanship.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                background: "#ff6364",
                color: "#FFFFFF",
                fontWeight: "700",
                padding: "14px 32px",
                borderRadius: "var(--radius-pill)",
                textDecoration: "none",
                fontSize: "0.95rem"
              }}
            >
              Book Consultation
            </Link>

            <Link
              href={`/locations/${project.relatedLocationSlug}`}
              style={{
                background: "transparent",
                color: "#FFFFFF",
                fontWeight: "600",
                padding: "14px 24px",
                borderRadius: "var(--radius-pill)",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                fontSize: "0.95rem"
              }}
            >
              Interiors in {project.location.split(",")[0]}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
