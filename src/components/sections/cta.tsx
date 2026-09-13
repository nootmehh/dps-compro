"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../ui/button";
import { getSiteContent, formatWhatsAppUrl } from "@/api/siteContent";

export interface CtaSectionProps {
  titlePrefix?: string;
  titleHighlight?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  whatsappUrl?: string;
  imageSrc?: string;
  className?: string;
}

export default function CtaSection({
  titlePrefix = "Sudah Siap Untuk\nMembuat ",
  titleHighlight = "Penawaran?",
  primaryButtonText = "Hubungi Kami",
  secondaryButtonText = "Lihat Produk Kami",
  primaryButtonHref,
  secondaryButtonHref = "/produk",
  onPrimaryClick,
  onSecondaryClick,
  whatsappUrl,
  imageSrc = "/illustration/CTA llustration.png",
  className = "",
}: CtaSectionProps) {
  const [siteWhatsappUrl, setSiteWhatsappUrl] = useState<string | null>(whatsappUrl || null);

  useEffect(() => {
    if (whatsappUrl) {
      setSiteWhatsappUrl(whatsappUrl);
    } else if (!primaryButtonHref && !onPrimaryClick) {
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
  }, [whatsappUrl, primaryButtonHref, onPrimaryClick]);

  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else if (!primaryButtonHref) {
      const url = formatWhatsAppUrl(whatsappUrl || siteWhatsappUrl);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <section
      aria-label="Call to Action Section"
      className={`relative w-full overflow-visible bg-linear-to-r from-white to-[#D3D351] via-none min-[420px]:from-25% min-[420px]:via-[#D3D351] min-[420px]:via-85% min-[420px]:to-[#0A9863] ${className}`}
    >
      <div className="relative z-10 w-full max-w-360 px-6 md:px-16 lg:px-24 py-8 mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        {/* Left Column: Heading & Action Buttons */}
        <div className="w-full max-w-xl flex flex-col justify-start items-start gap-6 relative z-10">
          <h2 className="text-dark text-2xl sm:text-3xl font-bold font-sans leading-tight whitespace-pre-line">
            <span>{titlePrefix}</span>
            <span className="text-g1">{titleHighlight}</span>
          </h2>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Primary Action Button (Unique Green connected pill with right icon) */}
            {primaryButtonHref ? (
              <Link href={primaryButtonHref}>
                <Button
                  type="button"
                  text={primaryButtonText}
                  variant="unique-green"
                  rightIcon="Right 1"
                  onClick={handlePrimaryClick}
                  className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
                />
              </Link>
            ) : (
              <Button
                type="button"
                text={primaryButtonText}
                variant="unique-green"
                rightIcon="Right 1"
                onClick={handlePrimaryClick}
                className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
              />
            )}

            {/* Secondary Action Button (Stroke Button) */}
            {secondaryButtonHref ? (
              <Link href={secondaryButtonHref}>
                <Button
                  type="button"
                  text={secondaryButtonText}
                  variant="stroke"
                  onClick={onSecondaryClick}
                  className="cursor-pointer bg-white/40 hover:bg-white/60 shadow-none"
                />
              </Link>
            ) : (
              <Button
                type="button"
                text={secondaryButtonText}
                variant="stroke"
                onClick={onSecondaryClick}
                className="cursor-pointer bg-white/40 hover:bg-white/60 shadow-none"
              />
            )}
          </div>
        </div>
      </div>

      {/* Absolute Bottom-Aligned CTA Illustration */}
      {imageSrc && (
        <div className="hidden md:flex absolute inset-x-0 bottom-0 max-w-360 px-6 md:px-16 lg:px-24 mx-auto pointer-events-none justify-end items-end z-0">
          <img
            className="w-auto h-52 md:h-60 lg:h-76 xl:h-88 max-w-[320px] md:max-w-100 lg:max-w-130 object-contain object-bottom select-none opacity-95"
            src={imageSrc}
            alt="CTA Illustration"
          />
        </div>
      )}
    </section>
  );
}
