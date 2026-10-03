"use client";

import React, { useState } from "react";
import ImageWithSkeleton from "./ImageWithSkeleton";
import LightboxModal from "./LightboxModal";

interface ProjectGalleryGridProps {
  images: string[];
  projectTitle: string;
}

export default function ProjectGalleryGrid({
  images,
  projectTitle,
}: ProjectGalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="project-interiors-grid">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            onClick={() => handleImageClick(idx)}
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

      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        currentIndex={activeImageIndex}
        onNavigate={(idx: number) => setActiveImageIndex(idx)}
        title={projectTitle}
      />
    </>
  );
}
