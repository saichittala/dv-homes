"use client";

import React, { useState } from "react";
import { PlusIcon } from "./Icons";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How do you ensure 100% price transparency with zero hidden costs?",
    answer:
      "We provide a comprehensive, itemized quotation detailing materials, hardware, and finishes upfront. Once your 3D design and BOQ (Bill of Quantities) are finalized and approved, the price is locked—meaning zero hidden costs, unexpected surcharges, or mid-project price hikes.",
  },
  {
    question: "How do you guarantee on-time project completion?",
    answer:
      "Because 85% of our modular woodwork (kitchens, wardrobes, TV units) is manufactured in our automated factory, site installation takes just 15-20 days. We commit to a clear 45-day handover timeline with structured milestone updates.",
  },
  {
    question: "What grade of Plywood & HDHMR do you use? Are they waterproof and termite-proof?",
    answer:
      "We exclusively use IS:710 100% BWP (Boiling Water Proof) Marine Grade Plywood for moisture-prone areas (kitchens & bathrooms) and High-Density High-Moisture Resistance (HDHMR) for dry zones. All materials come with 10-Year anti-termite warranties and German soft-close hardware (Hettich / Hafele / Blum).",
  },
  {
    question: "Can I see photorealistic 3D designs of my home before production begins?",
    answer:
      "Yes! Our interior architects create detailed 3D visual renders mapped to your exact floor plan. You get to review custom color palettes, lighting, material textures, and layout dimensions—allowing you to customize every detail before manufacturing starts.",
  },
  {
    question: "Why is DV HOMES' transparent execution superior to standard site work?",
    answer:
      "While traditional designers make generic promises, DV HOMES provides complete written transparency: advance layout planning, material thickness disclosures, stage-wise cost explanations, and dedicated site supervision from design to final handover.",
  },
  {
    question: "What after-sales service and warranty support do you provide post-handover?",
    answer:
      "We offer up to 10 Years of structural material warranty and dedicated post-handover customer support. Should any hinge, slider, or fitting need adjustment after you move in, our service technician visits your site within 24–48 hours.",
  },
  {
    question: "I live outside Hyderabad or overseas. How can I track my home interior progress?",
    answer:
      "We provide remote project tracking for NRIs and out-of-station homeowners. Your assigned Project Manager sends weekly video walkthroughs, production photo logs, and milestone status reports on WhatsApp so you stay updated without needing to visit the site.",
  },
  {
    question: "Do you handle complete turnkey execution including ceilings, electrical, and painting?",
    answer:
      "Yes! DV HOMES is a complete turnkey specialist. In addition to modular woodwork, we manage false ceilings, magnetic LED lighting, concealed electrical points, paint finishes, fluted glass partitions, and custom furniture—giving you 1 single point of contact.",
  },
  {
    question: "What is your payment structure for interior execution?",
    answer:
      "We follow a transparent, stage-wise payment plan explained before work starts: 1. Advance Planning → 2. Design & Material Specs Approval → 3. Material Dispatch → 4. Handover & Quality Sign-Off.",
  },
  {
    question: "How do I book a Free Home Interior Planning Session?",
    answer:
      "Simply click 'Free Planning Session' or send 'HOME' on WhatsApp (+91 99168 62442). We will discuss home requirements, lifestyle design direction, budget factors, and a pre-work preparation checklist.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={`faq-item ${isOpen ? "active" : ""}`}>
            <button
              className="faq-button"
              onClick={() => toggleIndex(index)}
              aria-expanded={isOpen}
            >
              <span className="faq-question-text">{faq.question}</span>
              <span
                className="faq-icon-circle"
                style={{
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <PlusIcon size={20} color="#111111" strokeWidth={1.5} />
              </span>
            </button>
            <div className="faq-answer-wrapper">
              <div className="faq-answer-inner">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
