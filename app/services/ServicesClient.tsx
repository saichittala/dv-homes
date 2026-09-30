"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModal";
import ImageWithSkeleton from "../components/ImageWithSkeleton";

export default function ServicesClient() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const serviceCategories = [
    {
      id: "bedrooms",
      title: "Bed Rooms",
      image: "/assets/main_images/bedroom-interior-design-minimal-aesthetic-3d-rendered.webp",
    },
    {
      id: "kitchens",
      title: "Kitchens",
      image: "/assets/main_images/luxury-interior-design-private-apartment-contemporary-dining-room.webp",
    },
    {
      id: "living-rooms",
      title: "Living Rooms",
      image: "/assets/main_images/luxury-living-room-with-classic-white-sofa-sofa-interior-design.webp",
    },
    {
      id: "dining-rooms",
      title: "Dining Rooms",
      image: "/assets/main_images/luxury-interior-design-private-apartment-contemporary-dining-room.webp",
    },
    {
      id: "puja",
      title: "Puja",
      image: "/assets/main_images/luxury-interior-exterior-design-collection-highend-architectural-home-decor-concepts-feat.webp",
    },
    {
      id: "partitions",
      title: "Partitions",
      image: "/assets/main_images/luxury-living-room-interior-design-opulent-space-with-modern-furniture-warm-lighting.webp",
    },
    {
      id: "study-rooms",
      title: "Study Rooms",
      image: "/assets/main_images/luxury-home-interior-design-3d-visualization-expensive-finishing-materials-furniture.webp",
    },
    {
      id: "office-spaces",
      title: "Office Spaces",
      image: "/assets/main_images/luxury-modern-european-design-cafe-interior-downtown-with-colorful-furniture-3d-rendering.webp",
    },
  ];

  return (
    <div className="services-page-wrapper">
      <main>
        {/* Top Full-Width Luxury Hero Banner */}
        <section className="services-hero-banner">
          <img
            src="/assets/main_images/hero-section.webp"
            alt="DV HOMES Premium Residential Interior Solutions"
            className="services-hero-img"
          />
          <div className="services-hero-overlay" />
        </section>

        {/* Main "Our Services" Section */}
        <section className="services-grid-section">
          <div className="container">
            <h1 className="display-lg services-page-heading">
              Our Services
            </h1>

            {/* 3-Column Service Cards Grid */}
            <div className="services-grid-container">
              {serviceCategories.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="service-card-item"
                >
                  <div className="service-card-img-box">
                    <ImageWithSkeleton src={service.image} alt={service.title} />
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section: Book Free Planning Session */}
        <section className="services-cta-banner-section">
          <div className="services-cta-card">
            <h2 className="services-cta-title">
              Free Home Interior Planning Session
            </h2>
            <p className="services-cta-desc">
              Get expert guidance, material specs, and stage-wise budget planning<br />for your space with DV HOMES.
            </p>
            <button
              onClick={() => setConsultationOpen(true)}
              className="btn btn-primary btn-lg services-cta-btn"
            >
              <span>Get a Free Quote</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
