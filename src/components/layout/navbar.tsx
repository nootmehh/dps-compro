"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/button";
import LordIcon from "../common/lordIcon";
import { getSiteContent, formatWhatsAppUrl } from "@/api/siteContent";

export interface NavItem {
  label: string;
  href: string;
}

export type NavbarVariant = "solid" | "transparent" | "auto";

export interface NavbarProps {
  variant?: NavbarVariant;
  brandTitle?: string;
  logoSrc?: string;
  navItems?: NavItem[];
  ctaText?: string;
  onCtaClick?: () => void;
  whatsappUrl?: string;
  userName?: string;
  userRole?: string;
  onLogout?: () => void;
  logoutText?: string;
  className?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Layanan", href: "/layanan" },
  { label: "Produk", href: "/produk" },
  { label: "Artikel", href: "/artikel" },
];

export default function Navbar({
  variant = "auto",
  brandTitle = "Dua Putra Srikandi",
  logoSrc,
  navItems = DEFAULT_NAV_ITEMS,
  ctaText = "Minta Penawaran Harga",
  onCtaClick,
  whatsappUrl,
  className = "",
}: NavbarProps) {
  const pathname = usePathname();
  const [siteWhatsappUrl, setSiteWhatsappUrl] = useState<string | null>(whatsappUrl || null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isColliding, setIsColliding] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  // Dedicated invisible container to measure the unconstrained natural width of desktop nav
  const measureRef = useRef<HTMLDivElement>(null);

  // Fetch whatsapp_url to ensure fresh CTA link
  useEffect(() => {
    if (whatsappUrl) {
      setSiteWhatsappUrl(whatsappUrl);
    }
    if (!onCtaClick) {
      let isMounted = true;
      getSiteContent().then((content) => {
        if (isMounted && content?.whatsapp_url) {
          setSiteWhatsappUrl(content.whatsapp_url);
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [whatsappUrl, onCtaClick]);

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      const url = formatWhatsAppUrl(siteWhatsappUrl || whatsappUrl);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Scroll detection for auto variant
  useEffect(() => {
    if (variant !== "auto") return;
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  // Collision Detection:
  // Exactly 32px before the desktop navigation items can touch the right edge of the logo,
  // we transition into the sidebar/hamburger variant.
  // Using an off-screen measure element ensures the natural width is always measured
  // accurately without being compressed by flexbox or causing layout shifts.
  useEffect(() => {
    let rafId: number | null = null;

    const checkCollision = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
          setIsColliding(true);
          return;
        }

        const container = containerRef.current;
        const logo = logoRef.current;
        const measure = measureRef.current;
        if (!container || !logo || !measure) return;

        const containerStyle = window.getComputedStyle(container);
        const paddingLeft = parseFloat(containerStyle.paddingLeft) || 0;
        const paddingRight = parseFloat(containerStyle.paddingRight) || 0;

        // Actual available width inside container between left & right padding
        const availableWidth = container.clientWidth - paddingLeft - paddingRight;

        // Exact logo width (natural aspect ratio for h-9 logo is ~300.4px)
        const logoWidth = logo.getBoundingClientRect().width || 300.4;

        // Natural unconstrained width of the desktop navigation items + CTA
        const navWidth = measure.getBoundingClientRect().width || 680;

        // 32px safety collision buffer on the right of the logo
        const GAP = 32;

        // Trigger sidebar variant whenever available space < (logoWidth + 32px + navWidth)
        const shouldCollide = availableWidth < logoWidth + GAP + navWidth;
        setIsColliding(shouldCollide);
      });
    };

    checkCollision();

    // Re-check after custom web fonts load
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(checkCollision).catch(() => {});
    }

    const ro = new ResizeObserver(checkCollision);
    if (containerRef.current) ro.observe(containerRef.current);
    if (logoRef.current) ro.observe(logoRef.current);
    if (measureRef.current) ro.observe(measureRef.current);

    window.addEventListener("resize", checkCollision);
    window.addEventListener("orientationchange", checkCollision);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", checkCollision);
      window.removeEventListener("orientationchange", checkCollision);
    };
  }, [navItems, ctaText]);

  // Lock body scroll while sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close sidebar on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isHomePage = pathname === "/";
  const isTransparent =
    variant === "transparent" || (variant === "auto" && isHomePage && !isScrolled);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 flex justify-center ${
        isTransparent
          ? "bg-transparent border-none outline-none shadow-none text-white"
          : "bg-white border-b border-white-70 text-dark"
      } ${className}`}
    >
      <div
        ref={containerRef}
        className="w-full px-6 md:px-16 py-4 flex justify-between items-center relative"
      >
        {/* Brand Logo (switches to dps-logo-icon on screens < 420px) */}
        <Link
          ref={logoRef}
          href="/"
          className="flex items-center cursor-pointer select-none shrink-0"
        >
          {/* Full Logo on >= 420px */}
          <img
            className="h-9 w-auto object-contain transition-all aspect-801/96 hidden min-[420px]:block"
            src={logoSrc || (isTransparent ? "/dps-logo-white.png" : "/dps-logo-default.png")}
            alt={brandTitle || "DPS Logo"}
          />
          {/* Icon Logo on < 420px */}
          <img
            className="h-9 w-auto object-contain transition-all block min-[420px]:hidden"
            src={isTransparent ? "/dps-logo-icon-white.png" : "/dps-logo-icon.png"}
            alt={brandTitle || "DPS Logo Icon"}
          />
        </Link>

        {/* Desktop Navigation Links & CTA (hidden when colliding within 32px of logo) */}
        <div
          className={`items-center gap-6 shrink-0 ${
            isColliding ? "hidden" : "flex"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link-item pb-1 text-sm font-semibold font-sans whitespace-nowrap ${
                isTransparent ? "text-white" : "text-g1"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Desktop CTA */}
          <div>
            <Button
              type="button"
              text={ctaText}
              variant="unique-green"
              rightIcon="Phone"
              onClick={handleCtaClick}
              className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none whitespace-nowrap"
            />
          </div>
        </div>

        {/* Hamburger / Menu button — G1 filled pill with white hamburger-morph icon, unique-green hover */}
        <div
          className={`items-center gap-2 ${
            isColliding ? "flex" : "hidden"
          }`}
        >
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className={`navbar-hamburger-btn size-10 rounded-full flex items-center justify-center cursor-pointer transition-opacity duration-200 ${
              isTransparent ? "bg-white/20" : "bg-g1"
            }`}
          >
            <LordIcon
              name="Hamburger"
              size={22}
              trigger="click"
              target=".navbar-hamburger-btn"
              primaryColor="#FFFFFF"
            />
          </button>
        </div>
      </div>

      {/* Hidden measurement container to always measure the natural unconstrained width of desktop nav */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="fixed top-[-9999px] left-[-9999px] flex items-center gap-6 pointer-events-none opacity-0 select-none shrink-0"
        style={{ visibility: "hidden" }}
      >
        {navItems.map((item) => (
          <span
            key={item.href}
            className="nav-link-item pb-1 text-sm font-semibold font-sans whitespace-nowrap"
          >
            {item.label}
          </span>
        ))}
        <div>
          <Button
            type="button"
            text={ctaText}
            variant="unique-green"
            rightIcon="Phone"
            className="shadow-none [&_.pill-segment]:shadow-none whitespace-nowrap"
          />
        </div>
      </div>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-60 bg-dark/60 backdrop-blur-xs transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Panel — snug width with backdrop space */}
      <aside
        aria-label="Mobile Navigation Sidebar"
        className={`fixed top-0 left-0 bottom-0 z-70 w-[min(300px,calc(100vw-3rem))] sm:w-80 h-[100dvh] max-h-[100dvh] bg-white text-dark shadow-2xl rounded-r-3xl flex flex-col transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "translate-x-0 visible opacity-100 pointer-events-auto"
            : "-translate-x-full invisible opacity-0 pointer-events-none"
        }`}
      >
        {/* Sidebar Header: Logo & Close Button */}
        <div className="p-5 sm:p-6 flex items-center justify-between border-b border-gray-100 shrink-0">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center cursor-pointer select-none"
          >
            <img
              className="h-8 w-auto object-contain"
              src="/dps-logo-default.png"
              alt={brandTitle || "DPS Logo"}
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Tutup menu"
            className="p-2 text-dark/70 hover:text-dark hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Body: Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-2">
          <span className="text-dark/40 text-sm font-sans tracking-wider uppercase mb-1">
            MENU
          </span>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`btn-custom h-12 px-4 py-3 rounded-[48px] inline-flex items-center gap-2.5 text-sm font-semibold font-sans w-full ${
                  isActive
                    ? "bg-g1/10 text-g1 btn-variant-ghost-green"
                    : "btn-variant-ghost-green"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer: CTA */}
        <div className="p-5 sm:p-6 border-t border-gray-100 shrink-0 pb-[max(1.5rem,env(safe-area-inset-bottom))] bg-white rounded-br-3xl">
          <Button
            type="button"
            text={ctaText}
            variant="unique-green"
            rightIcon="Phone"
            onClick={() => {
              setMobileMenuOpen(false);
              handleCtaClick();
            }}
            className="w-full justify-center cursor-pointer shadow-none [&_.pill-segment]:shadow-none whitespace-nowrap"
          />
        </div>
      </aside>
    </header>
  );
}
