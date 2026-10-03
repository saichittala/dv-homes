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
  const [showOptionalDetails, setShowOptionalDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "3 BHK Apartment",
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
        style={{
          maxWidth: "460px",
          padding: "24px 22px",
          background: "#0a0b0d",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.95), 0 0 32px rgba(255, 99, 100, 0.08)",
        }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">
          <XCloseIcon size={18} color="#FFFFFF" />
        </button>

        {submitted ? (
          <div className="form-success-state" style={{ padding: "16px 0", textAlign: "center" }}>
            <div
              className="form-success-icon featured-icon"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-circle)",
                background: "rgba(255, 99, 100, 0.15)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              <CheckCircleIcon size={26} color="#ff6364" />
            </div>
            <h3 className="modal-title" style={{ fontSize: "19px", marginBottom: "6px" }}>
              Consultation Requested!
            </h3>
            <p className="modal-body-text" style={{ fontSize: "13px", marginBottom: "16px" }}>
              Our senior interior architect will connect with you within 2 business hours. Opening WhatsApp chat...
            </p>
            <button
              className="btn btn-primary btn-md"
              style={{ width: "100%", background: "#ff6364", color: "#FFFFFF", fontWeight: 700 }}
              onClick={onClose}
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <h3 className="modal-title" style={{ fontSize: "20px", marginBottom: "14px" }}>
              Free Home Planning Consultation
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: "12px", marginBottom: "4px" }}>
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

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: "12px", marginBottom: "4px" }}>
                    WhatsApp Phone *
                  </label>
                  <div className="phone-input-group">
                    <span className="phone-prefix" style={{ fontSize: "13px" }}>+91</span>
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
              </div>

              <div className="form-group" style={{ marginBottom: "10px" }}>
                <label className="form-label" style={{ fontSize: "12px", marginBottom: "4px" }}>
                  Project Location / Apartment *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Magna Solitaire, Kokapet"
                  className="form-input"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <ChoiceChips
                label="Property Type"
                options={PROPERTY_TYPES}
                selectedValue={formData.propertyType}
                onChange={(val) => setFormData({ ...formData, propertyType: val })}
                variant="dark"
                compact={true}
              />

              {!showOptionalDetails ? (
                <button
                  type="button"
                  onClick={() => setShowOptionalDetails(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.55)",
                    fontSize: "12px",
                    cursor: "pointer",
                    padding: "2px 0 8px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6364")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.55)")}
                >
                  <span>+ Add Design Scope &amp; Budget (Optional)</span>
                </button>
              ) : (
                <>
                  <ChoiceChips
                    label="Design Scope"
                    options={SCOPE_TYPES}
                    selectedValue={formData.scope}
                    onChange={(val) => setFormData({ ...formData, scope: val })}
                    variant="dark"
                    compact={true}
                  />

                  <ChoiceChips
                    label="Planned Investment / Budget"
                    options={BUDGET_TYPES}
                    selectedValue={formData.budget}
                    onChange={(val) => setFormData({ ...formData, budget: val })}
                    variant="dark"
                    compact={true}
                  />
                </>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  height: "46px",
                  borderRadius: "var(--radius-brand-14)",
                  background: "linear-gradient(135deg, #ff6364 0%, #e55556 100%)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "14.5px",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 8px 24px rgba(255, 99, 100, 0.3)",
                  transition: "all 0.2s ease",
                }}
              >
                <span>{isSubmitting ? "Submitting..." : "Get Free Quote on WhatsApp →"}</span>
              </button>

              <div className="modal-privacy-note" style={{ marginTop: "10px", fontSize: "11.5px", color: "rgba(255, 255, 255, 0.6)" }}>
                <LockIcon size={13} color="#ff6364" />
                <span>Zero Spam Guarantee • Free 3D Plan &amp; Site Assessment</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
