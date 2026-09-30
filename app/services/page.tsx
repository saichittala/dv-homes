"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import ConsultationModal from "../components/ConsultationModal";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import ImageWithSkeleton from "../components/ImageWithSkeleton";

export default function ServicesPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const mosaicImages = [
    { src: "/assets/parthu/bedroom-suite.jpg", alt: "Luxury Bedroom Design" },
    { src: "/assets/parthu/dining-interior.jpg", alt: "Dining Room Interior" },
    { src: "/assets/parthu/modular-kitchen.jpg", alt: "Modular Kitchen Interior" },
    { src: "/assets/parthu/hero-living.jpg", alt: "Living Room Interior" },
    { src: "/assets/parthu/puja-room.jpg", alt: "Puja Room Mandir" },
    { src: "/assets/parthu/study-room.jpg", alt: "Study Room Office" },
    { src: "/assets/parthu/after-room.jpg", alt: "Living Room Partitions" },
    { src: "/assets/parthu/dining-interior.jpg", alt: "Luxury Dining Room Interior" },
  ];

  const serviceCategories = [
    {
      id: "bedrooms",
      title: "Bed Rooms",
      image: "/assets/parthu/bedroom-suite.jpg",
    },
    {
      id: "kitchens",
      title: "Kitchens",
      image: "/assets/parthu/modular-kitchen.jpg",
    },
    {
      id: "living-rooms",
      title: "Living Rooms",
      image: "/assets/parthu/hero-living.jpg",
    },
    {
      id: "dining-rooms",
      title: "Dining Rooms",
      image: "/assets/parthu/dining-interior.jpg",
    },
    {
      id: "puja",
      title: "Puja",
      image: "/assets/parthu/puja-room.jpg",
    },
    {
      id: "partitions",
      title: "Partitions",
      image: "/assets/parthu/after-room.jpg",
    },
    {
      id: "study-rooms",
      title: "Study Rooms",
      image: "/assets/parthu/study-room.jpg",
    },
    {
      id: "office-spaces",
      title: "Office Spaces",
      image: "/assets/parthu/dining-interior.jpg",
    },
  ];

  return (
    <div className="services-page-wrapper">
      <main>
        {/* Top Full-Width Luxury Hero Banner */}
        <section className="services-hero-banner">
          <img
            src="/assets/parthu/hero-living.jpg"
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
              <span>Free Planning Session</span>
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
