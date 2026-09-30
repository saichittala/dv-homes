import React from "react";
import JsonLd, { defaultOrganizationSchema } from "../components/JsonLd";
import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Residential Interior Design Services in Hyderabad | DV Homes",
  description: "Explore turnkey interior design services in Hyderabad. Modular kitchens, luxury bedrooms, living suites, wardrobes, pooja rooms & office space interiors.",
  alternates: {
    canonical: "https://dvhomes.in/services"
  },
  openGraph: {
    title: "Residential Interior Design Services in Hyderabad | DV Homes",
    description: "Complete residential interior design & turnkey execution services in Hyderabad.",
    url: "https://dvhomes.in/services",
    siteName: "DV Homes & Interiors",
    type: "website"
  }
};

export default function ServicesPage() {
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
      }
    ]
  };

  return (
    <>
      <JsonLd data={[defaultOrganizationSchema, breadcrumbSchema]} />
      <ServicesClient />
    </>
  );
}
