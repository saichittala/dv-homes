"use client";

import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "../Icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`breadcrumb-nav-wrapper ${className}`}>
      <div className="header-breadcrumb-links">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <ChevronRightIcon
                size={14}
                color="rgba(255, 255, 255, 0.4)"
                className="header-breadcrumb-sep"
              />
            )}
            {item.href ? (
              <Link href={item.href} className="header-breadcrumb-link">
                {item.label}
              </Link>
            ) : (
              <span className="header-breadcrumb-current">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
