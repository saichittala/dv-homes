"use client";

import React, { useState, useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  parallaxSpeed?: number;
  enableParallax?: boolean;
  priority?: boolean;
}

export default function ImageWithSkeleton({
  src,
  alt,
  className = "",
  style,
  parallaxSpeed = 0.25,
  enableParallax = true,
  priority = false,
  ...props
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth vertical parallax translation
  const travel = 30 * parallaxSpeed;
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);
  const baseScale = enableParallax ? 1.2 : 1.0;

  // Compute webp src path if possible
  const webpSrc = src && (src.endsWith(".jpg") || src.endsWith(".png") || src.endsWith(".jpeg"))
    ? src.replace(/\.(jpg|jpeg|png)$/, ".webp")
    : null;

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`img-skeleton-wrapper ${loaded ? "is-loaded" : "is-loading"}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "block",
      }}
    >
      <picture style={{ display: "block", width: "100%", height: "100%" }}>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <motion.img
          ref={imgRef as any}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          initial={{ scale: baseScale }}
          whileHover={{ scale: baseScale * 1.025 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            y: enableParallax ? y : 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transformOrigin: "center center",
            willChange: "transform",
            ...style,
          }}
          className={`${className} ${loaded ? "is-loaded image-reveal-active" : "is-loaded image-reveal-active"}`}
          {...(props as any)}
        />
      </picture>
    </div>
  );
}

