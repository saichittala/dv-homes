"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollBlurFadeInProps {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
  blurPx?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollBlurFadeIn({
  children,
  delay = 0,
  yOffset = 24,
  blurPx = 16,
  duration = 0.7,
  className = "",
  style = {},
}: ScrollBlurFadeInProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: `blur(${blurPx}px)`,
        y: yOffset,
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
