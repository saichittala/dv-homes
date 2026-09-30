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
      <section style={{ padding: "120px 24px 60px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(56, 208, 89, 0.12)", color: "#38d059", border: "1px solid rgba(56, 208, 89, 0.3)", borderRadius: "9999px", padding: "6px 16px", fontSize: "0.85rem", fontWeight: "600", marginBottom: "20px" }}>
            <MapPinIcon size={16} color="#38d059" />
            <span>{project.location.toUpperCase()}</span>
          </div>

          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.15", marginBottom: "24px", color: "#FFFFFF" }}>
            {project.title}
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", background: "rgba(255,255,255,0.03)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div style={{ fontSize: "0.8rem", color: "#a0a0a0", textTransform: "uppercase" }}>Project Type</div>
              <div style={{ fontSize: "1rem", fontWeight: "600", color: "#FFFFFF", marginTop: "4px" }}>{project.projectType}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "#a0a0a0", textTransform: "uppercase" }}>Scope</div>
              <div style={{ fontSize: "1rem", fontWeight: "600", color: "#FFFFFF", marginTop: "4px" }}>{project.scope}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "#a0a0a0", textTransform: "uppercase" }}>Design Style</div>
              <div style={{ fontSize: "1rem", fontWeight: "600", color: "#FFFFFF", marginTop: "4px" }}>{project.designStyle}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "#a0a0a0", textTransform: "uppercase" }}>Completion</div>
              <div style={{ fontSize: "1rem", fontWeight: "600", color: "#FFFFFF", marginTop: "4px" }}>{project.completionYear}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image Showcase */}
      <section style={{ padding: "40px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
            <img
              src={project.mainImage}
              alt={`${project.title} in ${project.location} - Main Interior View by DV Homes`}
              style={{ width: "100%", height: "auto", maxHeight: "600px", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* Design Story & Materials */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px" }}>
            <div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "20px" }}>
                Design Concept &amp; Story
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#cccccc", lineHeight: "1.7", marginBottom: "32px" }}>
                {project.concept}
              </p>

              <h3 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "16px" }}>
                Project Challenge &amp; Solution
              </h3>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
                <div style={{ fontWeight: "600", color: "#38d059", marginBottom: "8px" }}>Challenge:</div>
                <p style={{ fontSize: "0.95rem", color: "#e0e0e0", margin: "0 0 16px 0", lineHeight: "1.5" }}>{project.challenge}</p>
                <div style={{ fontWeight: "600", color: "#38d059", marginBottom: "8px" }}>DV Homes Solution:</div>
                <p style={{ fontSize: "0.95rem", color: "#e0e0e0", margin: 0, lineHeight: "1.5" }}>{project.solution}</p>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "20px" }}>
                Materials &amp; Finishes Used
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
                {project.materials.map((mat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.03)", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <CheckIcon size={18} color="#38d059" />
                    <span style={{ fontSize: "0.95rem", color: "#e0e0e0" }}>{mat}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "20px" }}>
                Key Interior Features
              </h3>
              <ul style={{ paddingLeft: "20px", color: "#cccccc", lineHeight: "1.7", fontSize: "0.95rem", display: "flex", flexDirection: "column", gap: "10px" }}>
                {project.keyFeatures.map((kf, idx) => (
                  <li key={idx}>{kf}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: "60px 24px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "32px", textAlign: "center" }}>
            Project Image Gallery
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {project.gallery.map((imgUrl, idx) => (
              <div key={idx} style={{ borderRadius: "16px", overflow: "hidden", height: "240px", border: "1px solid rgba(255,255,255,0.08)" }}>
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
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "16px" }}>
            Want a Similar Finish for Your Home?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#cccccc", lineHeight: "1.6", marginBottom: "32px" }}>
            Let Arige Praveenkumar and our turnkey execution team design your space with high-precision factory craftsmanship.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                background: "#38d059",
                color: "#000000",
                fontWeight: "700",
                padding: "16px 36px",
                borderRadius: "9999px",
                textDecoration: "none",
                fontSize: "1rem"
              }}
            >
              Book Consultation
            </Link>

            <Link
              href={`/locations/${project.relatedLocationSlug}`}
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                fontWeight: "600",
                padding: "16px 28px",
                borderRadius: "9999px",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                fontSize: "1rem"
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
