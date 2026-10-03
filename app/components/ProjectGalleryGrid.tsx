"use client";

import React, { useState } from "react";
import ImageWithSkeleton from "./ImageWithSkeleton";
import LightboxModal from "./LightboxModal";
import { getRoomHeading } from "../lib/roomHelper";

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
          <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              onClick={() => handleImageClick(idx)}
              style={{
                borderRadius: "var(--radius-brand-20)",
                overflow: "hidden",
                height: "360px",
                border: "1px solid rgba(255,255,255,0.14)",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <ImageWithSkeleton
                src={imgUrl}
                alt={`${projectTitle} - ${getRoomHeading(imgUrl, idx)} - DV Homes`}
              />
            </div>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#FFFFFF",
                margin: "0",
                paddingLeft: "4px",
                letterSpacing: "-0.01em",
              }}
            >
              {getRoomHeading(imgUrl, idx)}
            </h4>
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
