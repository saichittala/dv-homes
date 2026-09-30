import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";
import JsonLd, { defaultOrganizationSchema } from "../../components/JsonLd";
import { servicesData } from "../../lib/servicesData";

interface ServiceDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return servicesData.map((s) => ({
    id: s.id,
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    return {
      title: "Service Not Found | DV Homes"
    };
  }

  const canonicalUrl = `https://dvhomes.in/services/${service.id}`;

  return {
    title: service.metaTitle || `${service.title} Interior Design Hyderabad | DV Homes`,
    description: service.metaDescription || service.description.slice(0, 160),
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: service.metaTitle || `${service.title} Interior Design Hyderabad | DV Homes`,
      description: service.metaDescription || service.description.slice(0, 160),
      url: canonicalUrl,
      siteName: "DV Homes & Interiors",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: `https://dvhomes.in${service.mainImage}`,
          alt: `${service.title} - DV Homes Hyderabad`
        }
      ]
    }
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

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
        "name": "Services",
        "item": "https://dvhomes.in/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://dvhomes.in/services/${service.id}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "InteriorDesignStudio",
      "name": "DV Homes & Interiors",
      "url": "https://dvhomes.in"
    },
    "areaServed": {
      "@type": "City",
      "name": "Hyderabad"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.category,
      "itemListElement": service.features.map((feat, idx) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feat
        }
      }))
    }
  };

  const faqSchema = service.faqs && service.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  return (
    <>
      <JsonLd data={[defaultOrganizationSchema, breadcrumbSchema, serviceSchema, ...(faqSchema ? [faqSchema] : [])]} />
      <ServiceDetailClient service={service} />
    </>
  );
}
