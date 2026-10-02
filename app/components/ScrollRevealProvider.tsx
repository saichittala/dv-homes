"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Setup button text-swap attributes & child wrapping for signature text-roll animation
    const initButtons = () => {
      const buttons = document.querySelectorAll(".btn-primary");
      buttons.forEach((btn) => {
        const text = btn.textContent?.trim();
        if (text && !btn.getAttribute("data-text")) {
          btn.setAttribute("data-text", text);
        }

        // Ensure direct text nodes are wrapped in span for clean transform animation
        btn.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.nodeValue?.trim()) {
            const span = document.createElement("span");
            span.textContent = node.nodeValue;
            btn.replaceChild(span, node);
          }
        });
      });
    };

    initButtons();

    // Observe DOM mutations so dynamic buttons (modals, client renders) get data-text immediately
    const mutationObserver = new MutationObserver(() => {
      initButtons();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.08,
    };

    const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Auto observe any element with .reveal-on-scroll or target key section elements
    const elementsToObserve = document.querySelectorAll(
      ".reveal-on-scroll, .section-header, .feature-card, .project-card-item, .featured-service-card-item, .process-minimal-step, .faq-item, .who-we-are-content, .who-we-are-visuals, .cta-dark-section .container, .hero-content"
    );

    elementsToObserve.forEach((el) => {
      if (!el.classList.contains("reveal-on-scroll")) {
        el.classList.add("reveal-on-scroll");
      }
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
