"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/cv#about", label: "About" },
  { href: "/cv#skills", label: "Skills" },
  { href: "/cv#portfolio", label: "Portfolio" },
  { href: "/cv#capabilities", label: "Capabilities" },
  { href: "/", label: "Services" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link href="/cv" className="header__brand">
            <img
              src="/assets/profile-picture.png"
              alt=""
              className="header__avatar"
            />
            <span>John Dominic Jasmin</span>
          </Link>

          <nav className="header__nav">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="header__link">
                {link.label}
              </Link>
            ))}
            <Link href="/cv#contact" className="btn btn--primary">
              Get in touch
            </Link>
          </nav>

          <button
            type="button"
            className="header__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        <div className={`header__mobile${open ? " is-open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/cv#contact" onClick={() => setOpen(false)}>
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
}
