import React from "react";
import Link from "next/link";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  SparklesIcon
} from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand Info */}
          <div>
            <img
              src="/assets/logoo.png"
              alt="DV HOMES"
              className="footer-logo-img"
              style={{ height: "80px", maxHeight: "88px", width: "auto", objectFit: "contain", marginBottom: "20px" }}
            />
            <p style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: "500", lineHeight: "1.6", maxWidth: "320px", marginTop: "12px", opacity: 0.9 }}>
              Turnkey residential interior design &amp; execution firm in Hyderabad.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/locations">Locations</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/blog">Blog &amp; Guides</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Top Hyderabad Locations */}
          <div>
            <h4 className="footer-heading">Hyderabad Locations</h4>
            <ul className="footer-links-list">
              <li><Link href="/locations/madhapur">Madhapur</Link></li>
              <li><Link href="/locations/gachibowli">Gachibowli</Link></li>
              <li><Link href="/locations/kondapur">Kondapur</Link></li>
              <li><Link href="/locations/jubilee-hills">Jubilee Hills</Link></li>
              <li><Link href="/locations/kokapet">Kokapet</Link></li>
              <li><Link href="/locations/financial-district">Financial District</Link></li>
              <li><Link href="/locations">All Locations</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h4 className="footer-heading">Get In Touch</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "var(--fs-14)", color: "var(--text-light-muted)" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ marginTop: "2px", flexShrink: 0 }}>
                  <MapPinIcon size={18} color="var(--brand-primary)" />
                </div>
                <span>
                  <strong style={{ color: "var(--text-light-primary)" }}>Location:</strong><br />
                  Hyderabad and nearby areas, Telangana, India
                </span>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <PhoneIcon size={18} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
                <a href="tel:+919916862442" style={{ color: "var(--text-light-primary)", fontWeight: "600" }}>
                  +91 99168 62442
                </a>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <MailIcon size={18} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
                <a href="mailto:dvhomes.hyderabad@gmail.com" style={{ color: "var(--text-light-secondary)" }}>
                  dvhomes.hyderabad@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Divider */}
        <div className="footer-divider">
          <p>© 2026 DV HOMES. All Rights Reserved. Founder: Arige Praveenkumar</p>
          <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <span>Clarity</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>Trust</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>Quality</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>Responsibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
