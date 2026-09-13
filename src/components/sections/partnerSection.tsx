"use client";

import { useState, useEffect, useMemo } from "react";
import { getSiteContent } from "@/api/siteContent";

export interface PartnerLogo {
  id?: string | number;
  name?: string;
  imageSrc?: string;
  widthClass?: string;
}

export interface PartnerSectionProps {
  title?: string;
  partner_img_url?: string[] | null;
  partners?: (string | PartnerLogo)[];
  className?: string;
}

const DEFAULT_PARTNERS: PartnerLogo[] = [
  { id: 1, name: "Partner 1", imageSrc: "https://placehold.co/84x56/f8f4f0/94a3b8?text=Logo+1" },
  { id: 2, name: "Partner 2", imageSrc: "https://placehold.co/76x56/f8f4f0/94a3b8?text=Logo+2" },
  { id: 3, name: "Partner 3", imageSrc: "https://placehold.co/84x56/f8f4f0/94a3b8?text=Logo+3" },
  { id: 4, name: "Partner 4", imageSrc: "https://placehold.co/61x56/f8f4f0/94a3b8?text=Logo+4" },
  { id: 5, name: "Partner 5", imageSrc: "https://placehold.co/242x56/f8f4f0/94a3b8?text=Partner+Corporation" },
  { id: 6, name: "Partner 6", imageSrc: "https://placehold.co/64x56/f8f4f0/94a3b8?text=Logo+6" },
  { id: 7, name: "Partner 7", imageSrc: "https://placehold.co/98x56/f8f4f0/94a3b8?text=Logo+7" },
];

export default function PartnerSection({
  title = "Mitra Terpercaya Kami",
  partner_img_url,
  partners,
  className = "",
}: PartnerSectionProps) {
  const [dbPartners, setDbPartners] = useState<string[] | null>(partner_img_url || null);

  useEffect(() => {
    if (partner_img_url) {
      setDbPartners(partner_img_url);
    } else if (!partners) {
      let isMounted = true;
      getSiteContent().then((content) => {
        if (isMounted && content?.partner_img_url && content.partner_img_url.length > 0) {
          setDbPartners(content.partner_img_url);
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [partner_img_url, partners]);

  const displayLogos = useMemo(() => {
    const rawList = dbPartners || partner_img_url || partners;
    if (rawList && rawList.length > 0) {
      return rawList.map((item, idx) => {
        if (typeof item === "string") {
          return {
            id: `partner-${idx}`,
            src: item,
            alt: `Partner logo ${idx + 1}`,
          };
        }
        return {
          id: item.id ?? `partner-${idx}`,
          src: item.imageSrc || "",
          alt: item.name || `Partner ${idx + 1}`,
        };
      });
    }

    return DEFAULT_PARTNERS.map((p) => ({
      id: p.id,
      src: p.imageSrc || "",
      alt: p.name || `Partner ${p.id}`,
    }));
  }, [dbPartners, partner_img_url, partners]);

  const hasBg = className.includes("bg-");
  const hasBorder = className.includes("border-");
  const hasPaddingY = className.includes("py-") || (className.includes("pt-") && className.includes("pb-"));

  return (
    <section
      aria-label="Partner Section"
      className={`w-full ${hasBg ? "" : "bg-brand-background"} ${hasPaddingY ? "" : "py-10 md:py-12"} ${hasBorder ? "" : "border-b border-gray-100"} ${className}`}
    >
      <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto flex flex-col justify-center items-center gap-6">
        {/* Section Heading */}
        <h2 className="w-full text-center text-dark text-xl sm:text-2xl font-bold font-sans">
          {title}
        </h2>

        {/* Partner Logos Row */}
        <div className="w-full flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-10">
          {displayLogos.map((logo) => (
            <div
              key={logo.id}
              className="h-14 flex items-center justify-center select-none shrink-0 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-14 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
