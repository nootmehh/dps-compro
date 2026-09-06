"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/button";
import LordIcon from "../common/lordIcon";

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
  className = "",
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (variant !== "auto") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  const isHomePage = pathname === "/";
  const isTransparent = variant === "transparent" || (variant === "auto" && isHomePage && !isScrolled);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 flex justify-center ${isTransparent
        ? "bg-transparent border-none outline-none shadow-none text-white"
        : "bg-white border-b border-white-70 text-dark"
        } ${className}`}
    >
      <div className="w-full px-6 md:px-16 py-4 flex justify-between items-center">
        {/* Left Section: Brand Logo */}
        <Link href="/" className="flex items-center cursor-pointer select-none">
          <img
            className="h-9 w-auto object-contain transition-all"
            src={logoSrc || (isTransparent ? "/dps-logo-white.png" : "/dps-logo-default.png")}
            alt={brandTitle || "DPS Logo"}
          />
        </Link>

        {/* Desktop Navigation Links & CTA */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link-item pb-1 text-sm font-semibold font-sans ${
                isTransparent ? "text-white" : "text-g1"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* CTA Action: Minta Penawaran Harga */}
          <div>
            <Button
              type="button"
              text={ctaText}
              variant="unique-green"
              rightIcon="Phone"
              onClick={onCtaClick}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`size-10 rounded-xl border flex items-center justify-center cursor-pointer transition-colors ${isTransparent
              ? "bg-white/15 border-white/20 text-white hover:bg-white/25"
              : "bg-white-90 border-white-80 text-g1 hover:bg-g1/10"
              }`}
            aria-label="Toggle Navigation Menu"
          >
            <LordIcon
              name={mobileMenuOpen ? "Close" : "Dashboard"}
              size={20}
              primaryColor={isTransparent ? "#FFFFFF" : "#0A9863"}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden absolute top-full left-0 w-full p-6 flex flex-col gap-3 shadow-xl animate-in slide-in-from-top-2 duration-200 border-b ${isTransparent
            ? "bg-dark/95 backdrop-blur-xl border-white/10 text-white"
            : "bg-white border-gray-200 text-dark"
            }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`h-12 px-4 rounded-[48px] inline-flex items-center text-sm font-semibold font-sans transition-all ${isTransparent
                ? "text-white/90 hover:text-white hover:bg-white/10"
                : "text-g1 hover:bg-g1/5"
                }`}
            >
              {item.label}
            </Link>
          ))}

          <div
            className={`pt-3 border-t flex justify-center ${isTransparent ? "border-white/10" : "border-gray-100"
              }`}
          >
            <Button
              type="button"
              text={ctaText}
              variant="unique-green"
              rightIcon="Phone"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onCtaClick) onCtaClick();
              }}
              className="w-full justify-center"
            />
          </div>
        </div>
      )}
    </header>
  );
}
