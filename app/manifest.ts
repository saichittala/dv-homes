import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DV HOMES",
    short_name: "DV HOMES",
    description: "Complete end-to-end responsibility from initial design to final handover. Advance planning, transparent budgeting, premium materials & regular updates to complete your dream home stress-free – DV HOMES.",
    start_url: "/",
    display: "standalone",
    background_color: "#060606",
    theme_color: "#38d059",
    icons: [
      {
        src: "/assets/favicon.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/assets/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
