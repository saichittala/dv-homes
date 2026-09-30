"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  XCloseIcon,
  CheckCircleIcon,
  LockIcon,
} from "./Icons";
import ChoiceChips, { ChoiceOption } from "./ui/ChoiceChips";
import { submitLeadToGoogleSheet, openWhatsAppLeadChat } from "../lib/leadSubmission";

const PROPERTY_TYPES: ChoiceOption[] = [
  { value: "2 BHK Apartment", label: "2 BHK" },
  { value: "3 BHK Apartment", label: "3 BHK" },
  { value: "Villa / Independent House", label: "Villa / House" },
  { value: "Home Renovation", label: "Renovation" },
];

const SCOPE_TYPES: ChoiceOption[] = [
  { value: "Complete Home Interior", label: "Complete Home" },
  { value: "Modular Kitchen & Wardrobes", label: "Kitchen & Wardrobes" },
  { value: "Living & TV Unit", label: "Living & TV Unit" },
  { value: "False Ceiling & Lighting", label: "Ceiling & Lighting" },
];

const BUDGET_TYPES: ChoiceOption[] = [
  { value: "Custom Budget", label: "Flexible Budget" },
  { value: "2BHK Complete", label: "2BHK Package" },
  { value: "3BHK Premium", label: "3BHK Package" },
  { value: "Luxury Villa Scope", label: "Luxury Villa" },
];

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    location: "Hyderabad",
    scope: "",
    budget: "",
    timeToStart: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanPhone = formData.phone.trim();
    const formattedPhone = cleanPhone.startsWith("+91") ? cleanPhone : `+91 ${cleanPhone}`;

    const leadPayload = {
      name: formData.name || "Client",
      phone: formattedPhone,
      email: formData.email,
      propertyType: formData.propertyType,
      location: formData.location || "Hyderabad",
      scope: formData.scope,
      budget: formData.budget,
      timeToStart: formData.timeToStart,
      source: "Book Consultation Modal",
    };

    await submitLeadToGoogleSheet(leadPayload);

    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      openWhatsAppLeadChat(leadPayload);
    }, 800);
  };

  return ReactDOM.createPortal(
    <div className={`modal-backdrop ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">
          <XCloseIcon size={20} color="#FFFFFF" />
        </button>

        {submitted ? (
          <div className="form-success-state">
            <div className="form-success-icon featured-icon featured-icon-brand">
              <CheckCircleIcon size={28} color="var(--brand-primary, #ff6364)" />
            </div>
            <h3 className="modal-title">
              Consultation Request Received!
            </h3>
            <p className="modal-body-text">
              Our senior interior architect will connect with you within 2 business hours. Opening WhatsApp chat for priority booking...
            </p>
            <button className="btn btn-primary btn-md" onClick={onClose}>
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="section-eyebrow">
              Free Planning Session
            </div>

            <h3 className="modal-title">
              Free Home Interior Planning Session
            </h3>

            <p className="modal-body-text">
              Requirements discussion, lifestyle design direction, budget factors, kitchen/wardrobe/living suggestions and preparation checklist.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Rao"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    WhatsApp Number *
                  </label>
                  <div className="phone-input-group">
                    <span className="phone-prefix">+91</span>
                    <span className="phone-separator" />
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      className="phone-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ananya@gmail.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <ChoiceChips
                label="Property Type"
                options={PROPERTY_TYPES}
                selectedValue={formData.propertyType}
                onChange={(val) => setFormData({ ...formData, propertyType: val })}
                variant="dark"
              />

              <ChoiceChips
                label="Design Scope"
                options={SCOPE_TYPES}
                selectedValue={formData.scope}
                onChange={(val) => setFormData({ ...formData, scope: val })}
                variant="dark"
              />

              <ChoiceChips
                label="Planned Investment / Budget"
                options={BUDGET_TYPES}
                selectedValue={formData.budget}
                onChange={(val) => setFormData({ ...formData, budget: val })}
                variant="dark"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg w-full"
                style={{ width: "100%" }}
              >
                <span>{isSubmitting ? "Submitting..." : "Get a Free Quote"}</span>
              </button>

              <div className="modal-privacy-note">
                <LockIcon size={14} color="var(--brand-primary, #ff6364)" />
                <span>Zero spam. Free 3D plan &amp; site assessment included.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
