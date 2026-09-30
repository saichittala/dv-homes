"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "../Icons";

export interface ChoiceOption {
  value: string;
  label: string;
}

interface ChoiceChipsProps {
  options: ChoiceOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  variant?: "light" | "dark";
}

export default function ChoiceChips({
  options,
  selectedValue,
  onChange,
  label,
  required = false,
  variant = "light",
}: ChoiceChipsProps) {
  const isDark = variant === "dark";

  return (
    <div style={{ marginBottom: "18px", width: "100%" }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: isDark ? "rgba(255, 255, 255, 0.85)" : "#374151",
            marginBottom: "10px",
            letterSpacing: "normal",
          }}
        >
          {label} {required && <span style={{ color: "var(--brand-primary, #ff6364)" }}>*</span>}
        </label>
      )}

      <motion.div
        layout
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {options.map((option) => {
          const isActive = option.value === selectedValue;
          
          const bgNormal = isDark ? "rgba(255, 255, 255, 0.04)" : "#F3F4F6";
          const bgActive = isDark ? "rgba(107, 255, 139, 0.16)" : "rgba(107, 255, 139, 0.14)";
          const bgHover = isDark
            ? isActive ? "rgba(107, 255, 139, 0.22)" : "rgba(255, 255, 255, 0.08)"
            : isActive ? "rgba(107, 255, 139, 0.20)" : "#E5E7EB";

          const borderNormal = isDark
            ? isActive ? "transparent" : "rgba(255, 255, 255, 0.14)"
            : isActive ? "transparent" : "rgba(23, 23, 22, 0.12)";

          const textNormal = isDark
            ? isActive ? "#6bff8b" : "rgba(255, 255, 255, 0.85)"
            : isActive ? "#0f8a33" : "#374151";

          return (
            <motion.button
              layout
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              animate={{
                backgroundColor: isActive ? bgActive : bgNormal,
                borderColor: borderNormal,
                color: textNormal,
              }}
              whileHover={{
                backgroundColor: bgHover,
                borderColor: "transparent",
                scale: 1.02,
              }}
              whileTap={{ scale: 0.97 }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                padding: "0 16px",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                border: `1px solid ${borderNormal}`,
                boxShadow: "none",
                outline: "none",
                userSelect: "none",
                boxSizing: "border-box",
                lineHeight: "1",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <motion.span
                initial={false}
                animate={{
                  width: isActive ? 16 : 0,
                  opacity: isActive ? 1 : 0,
                  marginRight: isActive ? 6 : 0,
                  scale: isActive ? 1 : 0.4,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <CheckIcon size={14} color={isDark ? "#6bff8b" : "#0f8a33"} strokeWidth={2.5} />
              </motion.span>
              <span>{option.label}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
