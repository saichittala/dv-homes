"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModal";
import {
  FactoryIcon,
  SettingsIcon,
  ShieldCheckIcon,
  DiamondIcon,
  CheckCircleIcon,
  SparklesIcon,
  WhatsAppIcon,
  PhoneIcon
} from "../components/Icons";

export default function AboutPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <main>
        {/* About Hero (2-Column: Left Content, Right Image) */}
        <section className="section-py inner-page-hero">
          <div className="container">
            <div className="about-hero-grid">
              {/* Left Column Content */}
              <div>
                <div className="section-eyebrow" style={{ marginBottom: "16px" }}>
                  About DV HOMES
                </div>
                <h1 className="display-lg" style={{ marginBottom: "20px", textTransform: "none" }}>
                  Complete End-to-End Responsibility From Design to Handover
                </h1>
                <p className="text-xl" style={{ color: "var(--text-dark-secondary)", lineHeight: "1.65", marginBottom: "24px" }}>
                  <strong>DV HOMES</strong> (Founder: Arige Praveenkumar) is a dedicated residential interior design and turnkey execution firm in Hyderabad, specializing in 2BHK, 3BHK, Villa, and Independent house interiors.
                </p>
                <p className="text-md" style={{ color: "var(--text-dark-secondary)", lineHeight: "1.65", marginBottom: "32px" }}>
                  While traditional interior design firms make generic promises about quality work, DV HOMES delivers structured transparency: advance planning, clear material specifications, transparent stage-wise budgeting, and regular site updates to make your dream home journey completely stress-free.
                </p>
                <div className="about-hero-actions">
                  <button onClick={() => setConsultationOpen(true)} className="btn btn-primary btn-lg">
                    <span>Free Planning Session</span>
                  </button>
                  <a href="tel:+919916862442" className="btn btn-secondary btn-lg" style={{ gap: "8px" }}>
                    <PhoneIcon size={16} />
                    <span>Call +91 99168 62442</span>
                  </a>
                </div>
              </div>

              {/* Right Column Image */}
              <div className="about-hero-img-box">
                <img
                  src="/assets/main_images/luxury-living-room-with-classic-white-sofa-sofa-interior-design.webp"
                  alt="DV HOMES Residential Project Hyderabad"
                  className="about-hero-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* USP & Philosophy Section */}
        <section className="section-py" style={{ backgroundColor: "var(--bg-light-secondary)" }}>
          <div className="container">
            <div className="about-philosophy-grid">
              {/* Left Column Image */}
              <div className="about-philosophy-img-box">
                <img
                  src="/assets/main_images/luxury-interior-design-private-apartment-contemporary-dining-room.webp"
                  alt="DV HOMES Custom Interior Design"
                  className="about-philosophy-img"
                />
              </div>

              {/* Right Column Content */}
              <div>
                <div className="section-eyebrow">
                  OUR BRAND PROMISE
                </div>
                <h2 className="display-md" style={{ marginBottom: "24px", color: "var(--text-dark-primary)" }}>
                  Clear Planning + Quality Execution + Responsible Communication
                </h2>
                <p className="text-md" style={{ marginBottom: "16px", color: "var(--text-dark-secondary)" }}>
                  Before work begins on site, we provide a complete budget plan, material specifications, and a stage-wise cost breakdown. Every project phase comes with advance timelines and active progress updates.
                </p>
                <p className="text-md" style={{ marginBottom: "24px", color: "var(--brand-primary-lightmode, #0f8a33)", fontWeight: "600" }}>
                  “Complete End-to-End Responsibility from Concept to Key Handover – DV HOMES.”
                </p>

                <div className="about-stats-grid">
                  <div style={{ padding: "18px", background: "var(--bg-light)", borderRadius: "var(--radius-brand-18)", border: "1px solid var(--border-light-subtle)" }}>
                    <div style={{ fontSize: "var(--fs-28)", fontWeight: "800", color: "var(--brand-primary-lightmode, #0f8a33)", marginBottom: "8px" }}>4 Pillars</div>
                    <div style={{ fontSize: "var(--fs-14)", fontWeight: "700", color: "var(--text-dark-primary)" }}>Clarity, Trust, Quality &amp; Responsibility</div>
                  </div>
                  <div style={{ padding: "18px", background: "var(--bg-light)", borderRadius: "var(--radius-brand-18)", border: "1px solid var(--border-light-subtle)" }}>
                    <div style={{ fontSize: "var(--fs-28)", fontWeight: "800", color: "var(--brand-primary-lightmode, #0f8a33)", marginBottom: "8px" }}>Hyderabad</div>
                    <div style={{ fontSize: "var(--fs-14)", fontWeight: "700", color: "var(--text-dark-primary)" }}>2BHK, 3BHK &amp; Villa Focus</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why DV HOMES - 4 Pillars Section */}
        <section className="section-py">
          <div className="container">
            <div className="section-header">
              <div className="section-eyebrow">
                THE 4 PILLARS OF DV HOMES
              </div>
              <h2 className="display-md">Built on Real Trust &amp; Systems</h2>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="featured-icon featured-icon-brand">
                  <CheckCircleIcon size={24} color="var(--brand-primary-lightmode, #0f8a33)" />
                </div>
                <h3 className="feature-title">1. Clarity</h3>
                <p className="feature-desc">
                  Detailed advance project roadmaps explaining what happens when. Zero hidden surprises.
                </p>
              </div>

              <div className="feature-card">
                <div className="featured-icon featured-icon-brand">
                  <SettingsIcon size={24} color="var(--brand-primary-lightmode, #0f8a33)" />
                </div>
                <h3 className="feature-title">2. Trust</h3>
                <p className="feature-desc">
                  100% written transparency across budgets, material specifications, and execution timelines.
                </p>
              </div>

              <div className="feature-card">
                <div className="featured-icon featured-icon-brand">
                  <ShieldCheckIcon size={24} color="var(--brand-primary-lightmode, #0f8a33)" />
                </div>
                <h3 className="feature-title">3. Quality</h3>
                <p className="feature-desc">
                  Branded materials, clear core board thickness disclosure, and multi-stage quality checklists.
                </p>
              </div>

              <div className="feature-card">
                <div className="featured-icon featured-icon-brand">
                  <DiamondIcon size={24} color="var(--brand-primary-lightmode, #0f8a33)" />
                </div>
                <h3 className="feature-title">4. Responsibility</h3>
                <p className="feature-desc">
                  Not just design ideas—a single dedicated team supervising your site right up to final handover.
                </p>
              </div>

              <div className="feature-card">
                <div className="featured-icon featured-icon-brand">
                  <SparklesIcon size={24} color="var(--brand-primary-lightmode, #0f8a33)" />
                </div>
                <h3 className="feature-title">Free Planning Session</h3>
                <p className="feature-desc">
                  Home requirement reviews, lifestyle design direction, budget analysis &amp; preparation checklists.
                </p>
              </div>

              <div className="feature-card">
                <div className="featured-icon featured-icon-brand">
                  <FactoryIcon size={24} color="var(--brand-primary-lightmode, #0f8a33)" />
                </div>
                <h3 className="feature-title">Founder Leadership</h3>
                <p className="feature-desc">
                  Led by Founder Arige Praveenkumar with a steadfast commitment to responsible communication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="cta-dark-section" style={{ padding: "clamp(60px, 8vw, 90px) 0" }}>
          <div className="container" style={{ textAlign: "center", maxWidth: "720px" }}>
            <div className="section-eyebrow" style={{ color: "var(--brand-primary)", marginBottom: "14px" }}>
              DV HOMES PROMISE
            </div>
            <h2 className="cta-dark-title" style={{ fontSize: "24px", fontWeight: "700", lineHeight: "1.25", marginBottom: "16px" }}>
              Clear Planning, Quality Execution &amp; Responsible Communication.
            </h2>
            <p className="cta-dark-desc" style={{ fontSize: "18px", color: "var(--text-light-secondary)", marginBottom: "28px", lineHeight: "1.6" }}>
              Connect with our design team on WhatsApp or request a complimentary Home Interior Planning Session.
            </p>
            <div className="cta-actions" style={{ margin: "0 auto", justifyContent: "center" }}>
              <button
                onClick={() => setConsultationOpen(true)}
                className="btn btn-primary btn-lg"
              >
                <span>Free Planning Session</span>
              </button>
              <a
                href={`https://wa.me/919916862442?text=${encodeURIComponent("Hi DV HOMES! 👋 I would like to request a Free Home Interior Planning Session.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ gap: "8px" }}
              >
                <WhatsAppIcon size={18} />
                <span>WhatsApp Consultation</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </>
  );
}
