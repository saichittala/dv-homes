"use client";

import React, { useState, useEffect, useRef } from "react";

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  parallaxSpeed?: number;
  disableParallax?: boolean;
  priority?: boolean;
}

export default function ImageWithSkeleton({
  src,
  alt,
  className = "",
  style,
  parallaxSpeed = 0.15,
  disableParallax = true,
  priority = false,
  ...props
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
    >
      <picture>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            ...style,
          }}
          className={`${className} ${loaded ? "is-loaded image-reveal-active" : "is-loaded image-reveal-active"}`}
          {...(props as any)}
        />
      </picture>
    </div>
  );
}
