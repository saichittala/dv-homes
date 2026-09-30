import React from "react";

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const defaultOrganizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["InteriorDesignStudio", "LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": "https://dvhomes.in/#organization",
      "name": "DV Homes & Interiors",
      "legalName": "DV Homes & Interiors",
      "alternateName": ["DV Homes", "DV Homes Interiors"],
      "url": "https://dvhomes.in",
      "logo": "https://dvhomes.in/logo.png",
      "image": "https://dvhomes.in/assets/parthu/hero-living.jpg",
      "description": "Turnkey residential interior design and execution firm in Hyderabad, Telangana. Specializing in luxury 2BHK/3BHK apartments, villas, modular kitchens & bespoke woodwork.",
      "telephone": "+91-9916862442",
      "email": "dvhomes.hyderabad@gmail.com",
      "priceRange": "₹₹₹",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "17.3850",
        "longitude": "78.4867"
      },
      "areaServed": [
        { "@type": "City", "name": "Hyderabad" },
        { "@type": "AdministrativeArea", "name": "Madhapur" },
        { "@type": "AdministrativeArea", "name": "Gachibowli" },
        { "@type": "AdministrativeArea", "name": "Kondapur" },
        { "@type": "AdministrativeArea", "name": "Jubilee Hills" },
        { "@type": "AdministrativeArea", "name": "Banjara Hills" },
        { "@type": "AdministrativeArea", "name": "Kokapet" },
        { "@type": "AdministrativeArea", "name": "Financial District" },
        { "@type": "AdministrativeArea", "name": "Nanakramguda" },
        { "@type": "AdministrativeArea", "name": "Manikonda" },
        { "@type": "AdministrativeArea", "name": "HITEC City" },
        { "@type": "AdministrativeArea", "name": "Narsingi" },
        { "@type": "AdministrativeArea", "name": "Secunderabad" },
        { "@type": "AdministrativeArea", "name": "Kompally" },
        { "@type": "AdministrativeArea", "name": "Attapur" }
      ],
      "founder": {
        "@type": "Person",
        "name": "Arige Praveenkumar"
      },
      "sameAs": [
        "https://dvhomes.in"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://dvhomes.in/#website",
      "url": "https://dvhomes.in",
      "name": "DV Homes & Interiors",
      "publisher": {
        "@id": "https://dvhomes.in/#organization"
      }
    }
  ]
};
