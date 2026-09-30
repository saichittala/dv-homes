import React from "react";
import Metadata from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import JsonLd, { defaultOrganizationSchema } from "../components/JsonLd";
import { getPublishedBlogs, getReadingTime } from "../lib/blog";
import { ChevronRightIcon, SparklesIcon } from "../components/Icons";

export const metadata = {
  title: "Hyderabad Interior Design Guides & Articles | DV Homes",
  description: "Expert interior design guides for Hyderabad homeowners. Cost breakdowns, modular kitchen guides, material selection tips, space planning & villa design trends.",
  alternates: {
    canonical: "https://dvhomes.in/blog"
  },
  openGraph: {
    title: "Hyderabad Interior Design Guides & Articles | DV Homes",
    description: "In-depth interior design guides, cost breakdowns and material checklists for Hyderabad homeowners.",
    url: "https://dvhomes.in/blog",
    siteName: "DV Homes & Interiors",
    type: "website"
  }
};

export default function BlogListingPage() {
  const blogs = getPublishedBlogs();

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
        "name": "Blog",
        "item": "https://dvhomes.in/blog"
      }
    ]
  };

  return (
    <main style={{ background: "#060606", color: "#FFFFFF", minHeight: "100vh" }}>
      <JsonLd data={[defaultOrganizationSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section style={{ padding: "120px 24px 60px 24px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(56, 208, 89, 0.12)", color: "#38d059", border: "1px solid rgba(56, 208, 89, 0.3)", borderRadius: "9999px", padding: "6px 16px", fontSize: "0.85rem", fontWeight: "600", marginBottom: "20px" }}>
            <SparklesIcon size={16} color="#38d059" />
            <span>DESIGN INSIGHTS &amp; GUIDES</span>
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.15", marginBottom: "20px", color: "#FFFFFF" }}>
            Hyderabad Home Interior Guides
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#e0e0e0", lineHeight: "1.6", maxWidth: "680px", margin: "0 auto" }}>
            Expert, actionable advice on interior design costs, material selection, layout planning, and construction quality for Hyderabad homeowners.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "36px" }}>
            {blogs.map((post) => {
              const readingTime = getReadingTime(post.content || "");
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <article style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.3s ease" }}>
                    <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                      <img
                        src={post.featuredImage || "/assets/parthu/hero-living.jpg"}
                        alt={post.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        loading="lazy"
                      />
                      <div style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", color: "#38d059", padding: "4px 12px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: "600" }}>
                        {post.category}
                      </div>
                    </div>

                    <div style={{ padding: "28px 24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "0.8rem", color: "#a0a0a0", marginBottom: "10px" }}>
                          {post.publishedDate} • {readingTime}
                        </div>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "12px", lineHeight: "1.35" }}>
                          {post.title}
                        </h2>
                        <p style={{ fontSize: "0.92rem", color: "#b0b0b0", lineHeight: "1.5", marginBottom: "20px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {post.description}
                        </p>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", color: "#38d059", fontWeight: "600", marginTop: "16px" }}>
                        <span>Read Full Guide</span>
                        <ChevronRightIcon size={16} color="#38d059" />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
