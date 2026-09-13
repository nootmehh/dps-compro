"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Button from "../ui/button";
import IconButton from "../ui/iconButton";
import LordIcon from "../common/lordIcon";
import {
  getSiteContent,
  formatWhatsAppUrl,
  type SiteContent,
  type SocialMediaItem,
} from "@/api/siteContent";

export interface FooterProps {
  logoSrc?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsappUrl?: string;
  socialMedia?: SocialMediaItem[];
  onQuoteClick?: () => void;
  className?: string;
}

const DEFAULT_PHONE = "(+62) 813 8064 6093";
const DEFAULT_EMAIL = "salesdps77@gmail.com";
const DEFAULT_ADDRESS =
  "Jl.Raya Pondok Petir RT.02/0, Pondok Petir Bojongsari Kota Depok , Jawa Barat – Indonesia";

export default function Footer({
  logoSrc = "/dps-logo-icon.png",
  phone,
  email,
  address,
  whatsappUrl,
  socialMedia,
  onQuoteClick,
  className = "",
}: FooterProps) {
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    // If contact props or socialMedia are missing, fetch from Supabase
    if (!phone || !email || !address || !whatsappUrl || !socialMedia) {
      let isMounted = true;
      getSiteContent().then((data) => {
        if (isMounted && data) {
          setSiteContent(data);
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [phone, email, address, whatsappUrl, socialMedia]);

  const displayPhone = phone || siteContent?.phone || DEFAULT_PHONE;
  const displayEmail = email || siteContent?.email || DEFAULT_EMAIL;
  const displayAddress = address || siteContent?.address || DEFAULT_ADDRESS;
  const cleanPhone = displayPhone.replace(/[^\d+]/g, "");

  const displayWhatsapp = formatWhatsAppUrl(
    whatsappUrl || siteContent?.whatsapp_url || displayPhone
  );

  // Derive active social media links directly from the social_media column
  const rawSocialMedia = socialMedia || siteContent?.social_media;

  const socialList = useMemo(() => {
    if (!rawSocialMedia) return [];

    let parsedList: SocialMediaItem[] = [];
    if (Array.isArray(rawSocialMedia)) {
      parsedList = rawSocialMedia;
    } else if (typeof rawSocialMedia === "string") {
      try {
        parsedList = JSON.parse(rawSocialMedia);
      } catch {
        parsedList = [];
      }
    }

    return parsedList
      .filter((item) => item && (item.url || item.link))
      .map((item, index) => {
        const rawUrl = (item.url || item.link || "").trim();
        const href =
          rawUrl.startsWith("http://") ||
          rawUrl.startsWith("https://") ||
          rawUrl.startsWith("mailto:") ||
          rawUrl.startsWith("tel:")
            ? rawUrl
            : `https://${rawUrl}`;

        const config = getSocialMediaConfig(item.type);
        return {
          id: `social-${item.type || "item"}-${index}`,
          href,
          title: config.title,
          icon: config.icon,
          primaryColor: config.primaryColor,
          secondaryColor: config.secondaryColor,
        };
      });
  }, [rawSocialMedia]);

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Tentang", href: "/tentang" },
    { label: "Layanan", href: "/layanan" },
    { label: "Produk", href: "/produk" },
    { label: "Artikel", href: "/artikel" },
  ];

  const handleQuoteClick = () => {
    if (onQuoteClick) {
      onQuoteClick();
    } else if (displayWhatsapp) {
      window.open(displayWhatsapp, "_blank", "noopener,noreferrer");
    }
  };

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
                  {displayPhone}
                </span>
              </a>

              {/* Email Link */}
              <a
                href={`mailto:${displayEmail}`}
                data-hover-target="true"
                className="group inline-flex items-center gap-3 cursor-pointer select-none text-white-100 hover:text-white transition-colors"
              >
                <span className="shrink-0 flex items-center justify-center">
                  <LordIcon name="Email" size={20} primaryColor="#FFFFFF" target="a" />
                </span>
                <span className="text-sm font-normal text-white-100 group-hover:opacity-80 transition-opacity">
                  {displayEmail}
                </span>
              </a>

              {/* Address Link */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(displayAddress)}`}
                target="_blank"
                rel="noreferrer"
                data-hover-target="true"
                className="group inline-flex items-start gap-3 cursor-pointer select-none text-white-100 hover:text-white transition-colors"
              >
                <span className="shrink-0 mt-0.5 flex items-center justify-center">
                  <LordIcon name="Location" size={20} primaryColor="#FFFFFF" target="a" />
                </span>
                <p className="flex-1 leading-relaxed text-sm font-normal text-white-100 group-hover:opacity-80 transition-opacity">
                  {displayAddress}
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
              {/* Follow Us Social Media Icons (Render only when social media items exist) */}
              {socialList.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="text-white-70/70 text-sm font-sans tracking-widest uppercase">
                    IKUTI KAMI
                  </span>
                  <div className="grid grid-cols-4 gap-3 w-fit">
                    {socialList.map((social) => (
                      <IconButton
                        key={social.id}
                        icon={social.icon}
                        href={social.href}
                        target="_blank"
                        title={social.title}
                        variant="fill"
                        iconSize={28}
                        iconColor={social.primaryColor}
                        secondaryColor={social.secondaryColor}
                      />
                    ))}
                  </div>
                </div>
              )}

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
                  onClick={handleQuoteClick}
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

export function getSocialMediaConfig(type?: string | null) {
  const clean = (type || "").toLowerCase().trim();

  // TikTok, LinkedIn, and X use first color: white-100 (#FFFFFF), secondary: g1 (#0A9863)
  // Others use first color: g1 (#0A9863), secondary: white-100 (#FFFFFF)
  if (clean.includes("tik")) {
    return {
      icon: "/lord-icons/lineal/social-media/wired-flat-2546-logo-tiktok-hover-draw.json",
      title: "TikTok",
      primaryColor: "#FFFFFF",
      secondaryColor: "#0A9863",
    };
  }
  if (clean.includes("link")) {
    return {
      icon: "/lord-icons/lineal/social-media/wired-flat-2549-logo-linkedin-hover-draw.json",
      title: "LinkedIn",
      primaryColor: "#FFFFFF",
      secondaryColor: "#0A9863",
    };
  }
  if (clean === "x" || clean.includes("twit")) {
    return {
      icon: "/lord-icons/lineal/social-media/wired-flat-2714-logo-x-hover-pinch.json",
      title: "X (Twitter)",
      primaryColor: "#FFFFFF",
      secondaryColor: "#0A9863",
    };
  }
  if (clean.includes("insta") || clean === "ig") {
    return {
      icon: "/lord-icons/lineal/social-media/wired-flat-2626-logo-circle-instagram-hover-roll.json",
      title: "Instagram",
      primaryColor: "#0A9863",
      secondaryColor: "#FFFFFF",
    };
  }
  if (clean.includes("face") || clean === "fb") {
    return {
      icon: "/lord-icons/lineal/social-media/wired-flat-2624-logo-circle-facebook-hover-pinch.json",
      title: "Facebook",
      primaryColor: "#0A9863",
      secondaryColor: "#FFFFFF",
    };
  }
  if (clean.includes("you") || clean === "yt") {
    return {
      icon: "/lord-icons/lineal/social-media/wired-flat-2547-logo-youtube-hover-pinch.json",
      title: "YouTube",
      primaryColor: "#0A9863",
      secondaryColor: "#FFFFFF",
    };
  }
  if (clean.includes("thread")) {
    return {
      icon: "/lord-icons/lineal/social-media/wired-flat-2668-logo-circle-threads-hover-draw.json",
      title: "Threads",
      primaryColor: "#0A9863",
      secondaryColor: "#FFFFFF",
    };
  }
  if (clean.includes("what") || clean === "wa") {
    return {
      icon: "Phone",
      title: "WhatsApp",
      primaryColor: "#0A9863",
      secondaryColor: "#FFFFFF",
    };
  }
  if (clean.includes("web") || clean.includes("site") || clean.includes("glob")) {
    return {
      icon: "Global",
      title: "Website Resmi",
      primaryColor: "#0A9863",
      secondaryColor: "#FFFFFF",
    };
  }

  return {
    icon: "Global",
    title: type ? type.charAt(0).toUpperCase() + type.slice(1) : "Social Media",
    primaryColor: "#0A9863",
    secondaryColor: "#FFFFFF",
  };
}

