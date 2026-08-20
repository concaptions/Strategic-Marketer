"use client";

import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape and when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 760 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header>
      <div className="wrap nav">
        <Logo />
        <nav className="nav-links" aria-label="Primary">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <a className="agencies" href="/for-agencies">
            For Agencies
          </a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-gold btn-sm" href={site.bookingHref}>
            Book Assessment
          </a>
          <button
            className="hamburger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`mobile-menu${open ? " open" : ""}`} hidden={!open}>
        <nav className="wrap" aria-label="Mobile">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a href="/for-agencies" onClick={() => setOpen(false)}>
            For Agencies
          </a>
          <a className="btn btn-gold btn-sm" href={site.bookingHref} onClick={() => setOpen(false)}>
            Book Assessment
          </a>
        </nav>
      </div>
    </header>
  );
}
