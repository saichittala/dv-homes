"use client";

import React from "react";
import { WhatsAppIcon } from "./Icons";

export default function FloatingWhatsApp() {
  const waMsg = encodeURIComponent(
    "Hi DV HOMES! 👋 I am interested in interior design & turnkey execution for my home in Hyderabad. Please share your free planning session & 3D estimate."
  );
  return (
    <div
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <a
        href={`https://wa.me/919916862442?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "none",
          alignItems: "center",
          gap: "8px",
          background: "rgba(6, 6, 6, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(37, 211, 102, 0.4)",
          padding: "8px 16px",
          borderRadius: "9999px",
          color: "#FFFFFF",
          fontSize: "13px",
          fontWeight: "600",
          textDecoration: "none",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
        }}
        className="floating-whatsapp-tooltip"
      >
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#25D366", display: "inline-block", boxShadow: "0 0 10px #25D366" }} />
        <span>Chat with Architect • Online Now</span>
      </a>

      <a
        href={`https://wa.me/919916862442?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          textDecoration: "none",
        }}
      >
        <WhatsAppIcon size={30} color="#FFFFFF" />
      </a>
    </div>
  );
}
