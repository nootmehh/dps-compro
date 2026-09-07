"use client";

import Link from "next/link";
import Button from "../ui/button";
import IconButton from "../ui/iconButton";
import LordIcon from "../common/lordIcon";

export interface FooterProps {
  logoSrc?: string;
  phone?: string;
  email?: string;
  address?: string;
  onQuoteClick?: () => void;
  className?: string;
}

export default function Footer({
  logoSrc = "/dps-logo-icon.png",
  phone = "(+62) 813 8064 6093",
  email = "salesdps77@gmail.com",
  address = "Jl.Raya Pondok Petir RT.02/0, Pondok Petir Bojongsari Kota Depok , Jawa Barat – Indonesia",
  onQuoteClick,
  className = "",
}: FooterProps) {
  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/tentang" },
    { label: "Layanan", href: "/layanan" },
    { label: "Produk", href: "/produk" },
    { label: "Artikel", href: "/artikel" },
  ];

  const cleanPhone = phone.replace(/[^\d+]/g, "");

  return (
    <footer
      className={`relative w-full bg-linear-to-l from-g3 to-g1 text-white overflow-hidden ${className}`}
    >
      {/* Ambient background decorative glow blobs */}
      <div
        className="absolute -left-24 -top-24 w-96 h-96 bg-g2/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-10 bottom-0 w-125 h-100 bg-g1/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Background Badge Illustration (Always full height from top to bottom of the footer, responsive horizontal offset) */}
      <div className="absolute inset-0 pointer-events-none flex justify-end items-end z-0 overflow-hidden">
        <img
          src="/illustration/badgeBackground.png"
          alt="Badge Background"
          className="h-full w-auto max-w-none object-cover object-right select-none translate-x-[12%] min-[720px]:translate-x-[8%] min-[1024px]:translate-x-0 transition-transform duration-300"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 w-full max-w-360 px-6 md:px-16 lg:px-24 py-10 md:py-12 mx-auto flex flex-col gap-8">
        {/* Main Footer Row */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16">
          {/* Left Column: Brand & Contact Info */}
          <div className="w-full lg:max-w-129.5 flex flex-col justify-start items-start gap-6">
            {/* Logo & Headline */}
            <div className="flex flex-col items-start gap-3">
              <img
                className="h-10 w-auto object-contain select-none"
                src={logoSrc}
                alt="DPS Logo Icon"
              />
              <h2 className="text-white text-2xl sm:text-3xl font-bold font-sans leading-tight">
                Solusi Lengkap Konstruksi & Keselamatan Jalan.
              </h2>
            </div>

            {/* Contact Details with Hover-Triggered 20px Icons */}
            <div className="flex flex-col gap-4 text-white-100 text-sm font-normal font-sans">
              {/* Phone Link */}
              <a
                href={`tel:${cleanPhone}`}
                data-hover-target="true"
                className="group inline-flex items-center gap-3 cursor-pointer select-none text-white-100 hover:text-white transition-colors"
              >
                <span className="shrink-0 flex items-center justify-center">
                  <LordIcon name="Phone" size={20} primaryColor="#FFFFFF" target="a" />
                </span>
                <span className="text-sm font-normal text-white-100 group-hover:opacity-80 transition-opacity">
                  {phone}
                </span>
              </a>

              {/* Email Link */}
              <a
                href={`mailto:${email}`}
                data-hover-target="true"
                className="group inline-flex items-center gap-3 cursor-pointer select-none text-white-100 hover:text-white transition-colors"
              >
                <span className="shrink-0 flex items-center justify-center">
                  <LordIcon name="Email" size={20} primaryColor="#FFFFFF" target="a" />
                </span>
                <span className="text-sm font-normal text-white-100 group-hover:opacity-80 transition-opacity">
                  {email}
                </span>
              </a>

              {/* Address Link */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noreferrer"
                data-hover-target="true"
                className="group inline-flex items-start gap-3 cursor-pointer select-none text-white-100 hover:text-white transition-colors"
              >
                <span className="shrink-0 mt-0.5 flex items-center justify-center">
                  <LordIcon name="Location" size={20} primaryColor="#FFFFFF" target="a" />
                </span>
                <p className="flex-1 leading-relaxed text-sm font-normal text-white-100 group-hover:opacity-80 transition-opacity">
                  {address}
                </p>
              </a>
            </div>
          </div>

          {/* Right Columns: Navigation + Socials & Quick Action */}
          <div className="flex flex-col sm:flex-row justify-start items-start gap-10 sm:gap-16">
            {/* Column 1: JELAJAHI (Explore) with vertical spacing and white-100 color */}
            <div className="flex flex-col gap-4">
              <span className="text-white-70/70 text-sm font-sans tracking-widest uppercase">
                JELAJAHI
              </span>
              <nav className="flex flex-col gap-3.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-link-item py-1.5 text-white-100 text-sm font-semibold font-sans inline-block"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 2: IKUTI KAMI & AKSI CEPAT (Stacked vertically) */}
            <div className="flex flex-col items-start gap-6">
              {/* Follow Us Social Media Icons */}
              <div className="flex flex-col gap-3">
                <span className="text-white-70/70 text-sm font-sans tracking-widest uppercase">
                  IKUTI KAMI
                </span>
                <div className="flex items-center gap-3">
                  {/* Social 1: Instagram */}
                  <IconButton
                    icon="Image 2"
                    href="https://instagram.com"
                    target="_blank"
                    title="Instagram"
                    variant="fill"
                  />

                  {/* Social 2: Global / Website */}
                  <IconButton
                    icon="Global"
                    href="https://duaputrasrikandi.com"
                    target="_blank"
                    title="Website Resmi"
                    variant="fill"
                  />

                  {/* Social 3: WhatsApp / Contact */}
                  <IconButton
                    icon="Services"
                    href="https://wa.me/6281380646093"
                    target="_blank"
                    title="WhatsApp"
                    variant="fill"
                  />
                </div>
              </div>

              {/* Quick Action Button (Always under Ikuti Kami) */}
              <div className="flex flex-col gap-3">
                <span className="text-white-70/70 text-sm font-sans tracking-widest uppercase">
                  AKSI CEPAT
                </span>
                <Button
                  type="button"
                  text="Minta Penawaran Harga"
                  variant="unique-green"
                  rightIcon="Phone"
                  onClick={onQuoteClick}
                  className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none whitespace-nowrap [&_.pill-segment]:whitespace-nowrap"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Divider & Copyright (Reduced padding, centered, no policy links) */}
        <div className="w-full pt-4 border-t border-white/20 flex justify-center items-center">
          <p className="text-white-70/70 text-xs sm:text-sm font-sans text-center">
            Copyright 2026 PT. Dua Putra Srikandi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
