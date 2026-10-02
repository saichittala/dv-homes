"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ChoiceChips, { ChoiceOption } from "./ui/ChoiceChips";
import { XCloseIcon, CheckCircleIcon, LockIcon } from "./Icons";
import { submitLeadToGoogleSheet, openWhatsAppLeadChat } from "../lib/leadSubmission";

const PROPERTY_OPTIONS: ChoiceOption[] = [
  { value: "2 BHK Apartment", label: "2 BHK" },
  { value: "3 BHK Apartment", label: "3 BHK" },
  { value: "Villa / House", label: "Villa / House" },
  { value: "Home Renovation", label: "Renovation" },
];

const BUDGET_OPTIONS: ChoiceOption[] = [
  { value: "Custom Budget", label: "Flexible Budget" },
  { value: "2BHK Package", label: "2BHK Package" },
  { value: "3BHK Package", label: "3BHK Package" },
  { value: "Villa Scope", label: "Luxury Villa" },
];

const TIMELINE_OPTIONS: ChoiceOption[] = [
  { value: "Immediate (< 30 days)", label: "Immediate (<30d)" },
  { value: "1-3 Months", label: "1-3 Months" },
  { value: "Planning Stage (> 3 months)", label: "Planning Stage" },
];

export default function TimedLeadModal() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showOptionalDetails, setShowOptionalDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "Hyderabad",
    propertyType: "3 BHK Apartment",
    budget: "",
    timeToStart: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);

    const hasBeenShown = sessionStorage.getItem("lead_modal_shown");
    if (hasBeenShown) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("lead_modal_shown", "true");
    }, 60000); // 1 minute (60,000ms)

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone.trim() || !formData.location.trim()) {
      return;
    }

    setIsSubmitting(true);

    const cleanPhone = formData.phone.trim();
    const formattedPhone = cleanPhone.startsWith("+91") ? cleanPhone : `+91 ${cleanPhone}`;

    const leadPayload = {
      name: formData.name.trim() || "Valued Client",
      phone: formattedPhone,
      location: formData.location.trim(),
      propertyType: formData.propertyType || "Interior Design",
      budget: formData.budget || "Standard Scope",
      timeToStart: formData.timeToStart || "Immediate",
      source: "Timed 1-Min Auto Lead Modal",
    };

    await submitLeadToGoogleSheet(leadPayload);

    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      openWhatsAppLeadChat(leadPayload);
    }, 800);
  };

  if (!mounted || !isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`modal-backdrop ${isOpen ? "open" : ""}`} onClick={handleClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "460px",
          padding: "24px 22px",
          background: "#0a0b0d",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.95), 0 0 32px rgba(80, 255, 153, 0.08)",
        }}
      >
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close Modal">
          <XCloseIcon size={18} color="#FFFFFF" />
        </button>

        {submitted ? (
          <div className="form-success-state" style={{ padding: "16px 0", textAlign: "center" }}>
            <div
              className="form-success-icon featured-icon"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
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
              Request Received!
            </h3>
            <p className="modal-body-text" style={{ fontSize: "13px", marginBottom: "16px" }}>
              Opening WhatsApp chat with our interior team for instant 3D layout &amp; estimate...
            </p>
            <button
              className="btn btn-primary btn-md"
              style={{ width: "100%", background: "#ff6364", color: "#FFFFFF", fontWeight: 700 }}
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <h3 className="modal-title" style={{ fontSize: "20px", marginBottom: "14px" }}>
              DV HOMES Planning Session
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
                options={PROPERTY_OPTIONS}
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
                  <span>+ Add Budget &amp; Timeline (Optional)</span>
                </button>
              ) : (
                <>
                  <ChoiceChips
                    label="Budget Range"
                    options={BUDGET_OPTIONS}
                    selectedValue={formData.budget}
                    onChange={(val) => setFormData({ ...formData, budget: val })}
                    variant="dark"
                    compact={true}
                  />

                  <ChoiceChips
                    label="Timeline to Start"
                    options={TIMELINE_OPTIONS}
                    selectedValue={formData.timeToStart}
                    onChange={(val) => setFormData({ ...formData, timeToStart: val })}
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
                  borderRadius: "14px",
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
                <span>{isSubmitting ? "Submitting Request..." : "Get Free Estimate on WhatsApp →"}</span>
              </button>

              <div className="modal-privacy-note" style={{ marginTop: "10px", fontSize: "11.5px", color: "rgba(255, 255, 255, 0.6)" }}>
                <LockIcon size={13} color="#ff6364" />
                <span>Zero Spam Guarantee • 100% Confidential • Free 3D Plan</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
