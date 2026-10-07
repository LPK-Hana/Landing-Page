'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand" onClick={() => setOpen(false)}>
          <Image
            src={site.media.logoBanner}
            alt={site.name}
            width={280}
            height={104}
            className="site-header__logo"
            priority
          />
        </Link>

        <button
          type="button"
          className="site-header__menu-btn"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-header__nav ${open ? "is-open" : ""}`} aria-label="Utama">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-header__link"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a href={site.cta.masuk()} className="site-header__cta site-header__cta--ghost">
            Masuk
          </a>
          <a href={site.cta.daftar()} className="site-header__cta">
            Daftar
          </a>
        </nav>
      </div>
    </header>
  );
}
