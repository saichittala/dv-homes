import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "../../components/Footer";
import JsonLd, { defaultOrganizationSchema } from "../../components/JsonLd";
import { projectsData } from "../../lib/projectsData";
import { MapPinIcon } from "../../components/Icons";
import ImageWithSkeleton from "../../components/ImageWithSkeleton";
import ProjectDetailClient from "../../components/ProjectDetailClient";

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

  // Combine mainImage and gallery images (avoiding duplicates)
  const allImages = Array.from(new Set([project.mainImage, ...project.gallery]));

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
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 3.8vw, 2.5rem)",
              fontWeight: "700",
              letterSpacing: "-0.02em",
              lineHeight: "1.15",
              marginBottom: "20px",
              color: "#FFFFFF",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {project.title}
          </h1>

          <ProjectDetailClient
            mainImage={project.mainImage}
            allImages={allImages}
            projectTitle={project.title}
            concept={project.concept}
            challenge={project.challenge}
            solution={project.solution}
            location={project.location}
            projectType={project.projectType}
            completionYear={project.completionYear}
          />

        </div>
      </section>

      {/* Internal Link Shortcuts & CTA */}
      <section style={{ padding: "40px 24px 80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.55rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "12px" }}>
            Want a Similar Finish for Your Home?
          </h2>
          <p style={{ fontSize: "0.98rem", color: "var(--text-light-primary)", lineHeight: "1.6", marginBottom: "24px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
            Let Arige Praveenkumar and our turnkey execution team design your space<br />with high-precision factory craftsmanship.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="btn btn-primary btn-md"
            >
              Book Consultation
            </Link>

            <Link
              href={`/locations/${project.relatedLocationSlug}`}
              className="btn btn-secondary btn-md"
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
