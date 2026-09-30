import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "../../components/Footer";
import JsonLd, { defaultOrganizationSchema } from "../../components/JsonLd";
import { getPublishedBlogs, getReadingTime, getRelatedPosts, parseMarkdown, generateTableOfContents } from "../../lib/blog";
import { ChevronRightIcon, SparklesIcon, PhoneIcon } from "../../components/Icons";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = getPublishedBlogs();
  return blogs.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogs = getPublishedBlogs();
  const post = blogs.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | DV Homes"
    };
  }

  const canonicalUrl = post.canonicalUrl || `https://dvhomes.in/blog/${post.slug}`;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      url: canonicalUrl,
      siteName: "DV Homes & Interiors",
      locale: "en_IN",
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate || post.publishedDate,
      authors: [post.author || "Arige Praveenkumar"],
      images: [
        {
          url: post.ogImage || post.featuredImage || "https://dvhomes.in/assets/parthu/hero-living.jpg",
          alt: post.title
        }
      ]
    }
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blogs = getPublishedBlogs();
  const post = blogs.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const parsedHtml = parseMarkdown(post.content || "");
  const tableOfContents = generateTableOfContents(post.content || "");
  const readingTime = getReadingTime(post.content || "");
  const relatedPosts = getRelatedPosts(post, 3);

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://dvhomes.in/blog/${post.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.featuredImage || "https://dvhomes.in/assets/parthu/hero-living.jpg",
    "datePublished": post.publishedDate,
    "dateModified": post.updatedDate || post.publishedDate,
    "author": {
      "@type": "Person",
      "name": post.author || "Arige Praveenkumar",
      "jobTitle": "Principal Designer & Founder",
      "worksFor": {
        "@type": "Organization",
        "name": "DV Homes & Interiors"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "DV Homes & Interiors",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dvhomes.in/logo.png"
      }
    },
    "mainEntityOfPage": `https://dvhomes.in/blog/${post.slug}`
  };

  const faqSchema = post.faq && post.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  return (
    <main style={{ background: "#060606", color: "#FFFFFF", minHeight: "100vh" }}>
      <JsonLd data={[defaultOrganizationSchema, breadcrumbSchema, articleSchema, ...(faqSchema ? [faqSchema] : [])]} />

      {/* Article Header */}
      <section style={{ padding: "100px 24px 30px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px", flexWrap: "wrap" }}>
            <span style={{ background: "rgba(56, 208, 89, 0.15)", color: "#38d059", border: "1px solid rgba(56, 208, 89, 0.3)", borderRadius: "6px", padding: "4px 10px", fontSize: "0.78rem", fontWeight: "600" }}>
              {post.category}
            </span>
            <span style={{ fontSize: "0.82rem", color: "#a0a0a0" }}>
              {post.publishedDate} • {readingTime}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(1.75rem, 3.8vw, 2.5rem)", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.15", marginBottom: "16px", color: "#FFFFFF" }}>
            {post.title}
          </h1>

          <p style={{ fontSize: "1.05rem", color: "#e0e0e0", lineHeight: "1.6", marginBottom: "20px" }}>
            {post.description}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#38d059", color: "#000000", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>
              AP
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#FFFFFF" }}>
                {post.author || "Arige Praveenkumar"}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#a0a0a0" }}>
                Principal Designer &amp; Founder, DV Homes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Banner Image */}
      {post.featuredImage && (
        <section style={{ padding: "20px 24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", maxHeight: "440px" }}>
              <img
                src={post.featuredImage}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Body + Table of Contents */}
      <section style={{ padding: "30px 24px 60px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          
          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <div style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "16px", padding: "20px 24px", marginBottom: "36px" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#38d059", marginBottom: "12px" }}>
                Table of Contents
              </h2>
              <ul style={{ paddingLeft: "16px", margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {tableOfContents.map((item, idx) => (
                  <li key={idx} style={{ fontSize: "0.9rem" }}>
                    <a href={`#${item.id}`} style={{ color: "#e0e0e0", textDecoration: "none" }}>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* HTML Rendered Content */}
          <div
            className="blog-content-body"
            dangerouslySetInnerHTML={{ __html: parsedHtml }}
            style={{
              fontSize: "1rem",
              lineHeight: "1.75",
              color: "#d0d0d0"
            }}
          />

          {/* Article FAQs */}
          {post.faq && post.faq.length > 0 && (
            <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "20px" }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {post.faq.map((f, idx) => (
                  <div key={idx} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", padding: "18px 20px", borderRadius: "12px" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "6px" }}>
                      {f.question}
                    </h3>
                    <p style={{ fontSize: "0.92rem", color: "#cccccc", lineHeight: "1.55", margin: 0 }}>
                      {f.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Consultation Banner inside Article */}
          <div style={{ marginTop: "48px", background: "transparent", border: "1px solid rgba(56,208,89,0.3)", borderRadius: "18px", padding: "32px 28px", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "10px" }}>
              Planning Your Home Interiors in Hyderabad?
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#cccccc", lineHeight: "1.6", maxWidth: "600px", margin: "0 auto 20px auto" }}>
              Speak directly with Arige Praveenkumar and our design team for floorplan reviews, material guidance, and transparent budget estimates.
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#38d059",
                color: "#000000",
                fontWeight: "700",
                padding: "12px 28px",
                borderRadius: "9999px",
                textDecoration: "none",
                fontSize: "0.9rem"
              }}
            >
              <span>Schedule Free Consultation</span>
              <ChevronRightIcon size={16} color="#000000" />
            </Link>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: "60px", paddingTop: "32px" }}>
              <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#FFFFFF", marginBottom: "20px" }}>
                Related Guides
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                {relatedPosts.map((rel) => (
                  <Link key={rel.id} href={`/blog/${rel.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", padding: "18px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "#38d059", fontWeight: "600", marginBottom: "4px" }}>{rel.category}</div>
                        <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#FFFFFF", marginBottom: "6px", lineHeight: "1.3" }}>{rel.title}</h3>
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "#38d059", fontWeight: "600", marginTop: "10px", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span>Read Guide</span>
                        <ChevronRightIcon size={14} color="#38d059" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
