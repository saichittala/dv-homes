"use client";

import React, { useState } from "react";
import ImageWithSkeleton from "./ImageWithSkeleton";
import LightboxModal from "./LightboxModal";

interface ProjectDetailClientProps {
  mainImage: string;
  allImages: string[];
  projectTitle: string;
  concept: string;
  challenge: string;
  solution: string;
  location: string;
  projectType: string;
  completionYear: string;
}

export default function ProjectDetailClient({
  mainImage,
  allImages,
  projectTitle,
  concept,
  challenge,
  solution,
  location,
  projectType,
  completionYear,
}: ProjectDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const mainImageIndex = allImages.findIndex((img) => img === mainImage);
  const heroIndex = mainImageIndex >= 0 ? mainImageIndex : 0;

  return (
    <>
      {/* Big Featured Hero Showcase Image */}
      <div
        onClick={() => openLightbox(heroIndex)}
        style={{
          marginTop: "0px",
          borderRadius: "var(--radius-brand-20)",
          overflow: "hidden",
          height: "clamp(320px, 50vh, 520px)",
          width: "100%",
          border: "1px solid rgba(255,255,255,0.14)",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <ImageWithSkeleton
          src={mainImage}
          alt={`${projectTitle} Featured Interior - DV Homes`}
          priority
        />
      </div>

      {/* Location, Project Type & Completion Metadata Card - Placed AFTER Hero Image */}
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          background: "transparent",
          padding: "20px",
          borderRadius: "var(--radius-brand-16)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div>
          <div style={{ fontSize: "0.75rem", color: "#a0a0a0", textTransform: "uppercase" }}>Location</div>
          <div
            style={{
              fontSize: "0.95rem",
              fontWeight: "600",
              color: "#FFFFFF",
              marginTop: "4px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {location}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "0.75rem", color: "#a0a0a0", textTransform: "uppercase" }}>Project Type</div>
          <div
            style={{
              fontSize: "0.95rem",
              fontWeight: "600",
              color: "#FFFFFF",
              marginTop: "4px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {projectType}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "0.75rem", color: "#a0a0a0", textTransform: "uppercase" }}>Completion</div>
          <div
            style={{
              fontSize: "0.95rem",
              fontWeight: "600",
              color: "#FFFFFF",
              marginTop: "4px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {completionYear}
          </div>
        </div>
      </div>

      {/* LINE BY LINE SECTIONS */}
      <section style={{ padding: "40px 24px 60px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "44px" }}>
          
          {/* LINE 1: PROJECT OVERVIEW */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#FFFFFF", marginBottom: "16px", letterSpacing: "-0.01em" }}>
              Project Overview
            </h3>
            <p style={{ fontSize: "16px", fontWeight: "400", color: "var(--text-light-primary)", lineHeight: "1.6" }}>
              {concept}
            </p>
          </div>

          {/* LINE 2: THE PROBLEM & SOLUTION */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#FFFFFF", marginBottom: "16px", letterSpacing: "-0.01em" }}>
              Project Challenge &amp; Solution
            </h3>
            <div style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.14)", padding: "28px 28px", borderRadius: "var(--radius-brand-18)", display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <div style={{ fontWeight: "500", color: "#FFFFFF", fontSize: "16px", marginBottom: "6px" }}>
                  Challenge:
                </div>
                <p style={{ fontSize: "16px", fontWeight: "400", color: "var(--text-light-primary)", margin: 0, lineHeight: "1.6" }}>
                  {challenge}
                </p>
              </div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

              <div>
                <div style={{ fontWeight: "500", color: "#FFFFFF", fontSize: "16px", marginBottom: "6px" }}>
                  DV Homes Solution:
                </div>
                <p style={{ fontSize: "16px", fontWeight: "400", color: "var(--text-light-primary)", margin: 0, lineHeight: "1.6" }}>
                  {solution}
                </p>
              </div>
            </div>
          </div>

          {/* LINE 3: IMAGES OF THE INTERIORS */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#FFFFFF", marginBottom: "20px", letterSpacing: "-0.01em" }}>
              Images of the Interiors
            </h3>
            <div className="project-interiors-grid">
              {allImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  style={{
                    borderRadius: "var(--radius-brand-20)",
                    overflow: "hidden",
                    height: "380px",
                    border: "1px solid rgba(255,255,255,0.14)",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <ImageWithSkeleton
                    src={imgUrl}
                    alt={`${projectTitle} Interior View ${idx + 1} - DV Homes`}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={allImages}
        currentIndex={activeImageIndex}
        onNavigate={(idx: number) => setActiveImageIndex(idx)}
        title={projectTitle}
      />
    </>
  );
}
