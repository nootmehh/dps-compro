"use client";

import { useState, useEffect } from "react";
import Button from "../ui/button";
import { getSiteContent, isVideoUrl, formatWhatsAppUrl } from "@/api/siteContent";

export interface HeroProps {
  title?: string;
  subtitle?: string;
  readMoreText?: string;
  contactText?: string;
  onReadMore?: () => void;
  onContact?: () => void;
  backgroundImageSrc?: string;
  heroMediaUrl?: string;
  whatsappUrl?: string;
  className?: string;
}

export default function Hero({
  title = "Solusi Lengkap Konstruksi & Keselamatan Jalan.",
  subtitle = "Kami adalah penyedia bahan dan kontraktor terpercaya untuk proyek Pemerintah hingga Swasta dengan jaminan mutu dan ketepatan waktu.",
  readMoreText = "Baca Selengkapnya",
  contactText = "Hubungi Kami",
  onReadMore,
  onContact,
  backgroundImageSrc,
  heroMediaUrl,
  whatsappUrl,
  className = "",
}: HeroProps) {
  const initialMedia = heroMediaUrl || backgroundImageSrc || null;
  const [media, setMedia] = useState<string | null>(initialMedia);
  const [siteWhatsappUrl, setSiteWhatsappUrl] = useState<string | null>(whatsappUrl || null);

  useEffect(() => {
    if (heroMediaUrl || backgroundImageSrc) {
      setMedia(heroMediaUrl || backgroundImageSrc || null);
      return;
    }

    let isMounted = true;
    getSiteContent().then((content) => {
      if (isMounted && content) {
        if (!initialMedia && content.hero_img_url) {
          setMedia(content.hero_img_url);
        }
        if (!whatsappUrl && content.whatsapp_url) {
          setSiteWhatsappUrl(content.whatsapp_url);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [heroMediaUrl, backgroundImageSrc, whatsappUrl, initialMedia]);

  const handleContact = () => {
    if (onContact) {
      onContact();
    } else {
      const targetUrl = formatWhatsAppUrl(whatsappUrl || siteWhatsappUrl);
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  const isVideo = isVideoUrl(media);
  const fallbackImage = "https://placehold.co/1440x600";
  const activeMediaSource = media || fallbackImage;

  return (
    <section
      aria-label="Hero Section"
      className={`relative w-full h-[90vh] min-h-145 bg-dark overflow-hidden flex flex-col justify-end items-center ${className}`}
    >
      {/* Background Media with Dark Overlay */}
      {media && isVideo ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 transition-transform duration-1000"
            src={media}
          />
          <div className="absolute inset-0 bg-dark/60 bg-linear-to-r from-dark/80 via-dark/50 to-dark/30" />
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('${activeMediaSource}')` }}
        >
          <div className="absolute inset-0 bg-dark/60 bg-linear-to-r from-dark/80 via-dark/50 to-dark/30" />
        </div>
      )}

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-360 px-6 md:px-16 lg:px-24 py-16 lg:py-24 flex-1 flex flex-col justify-end items-start">
        {/* Text & CTA Column */}
        <div className="w-full max-w-146.5 flex flex-col justify-start items-start gap-6 relative z-10">
          {/* Logo Icon on Top of Heading */}
          <div className="flex items-center">
            <img
              src="/dps-logo-icon-white.png"
              alt="DPS Logo Icon"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain select-none"
            />
          </div>

          {/* Heading & Subheading */}
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <h1 className="self-stretch text-white text-3xl sm:text-4xl lg:text-[40px] leading-tight font-bold font-sans">
              {title}
            </h1>
            <p className="self-stretch text-white/90 text-sm sm:text-base font-normal font-sans leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="inline-flex flex-wrap justify-start items-center gap-3 pt-2">
            {/* Primary Action Button (Unique Green Pill) */}
            <Button
              type="button"
              text={readMoreText}
              variant="unique-green"
              rightIcon="Right 1"
              onClick={onReadMore}
              className="cursor-pointer shadow-lg"
            />

            {/* Secondary Action Button (Glass Pill) */}
            <Button
              type="button"
              text={contactText}
              variant="glass"
              onClick={handleContact}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Absolute Bottom-Right Hero Illustration */}
      <div className="absolute inset-x-0 bottom-0 max-w-360 px-6 md:px-16 lg:px-24 mx-auto pointer-events-none hidden md:flex justify-end items-end z-0">
        <img
          className="w-auto h-60 sm:h-76 md:h-97.5 lg:h-115 xl:h-127.5 max-w-105 sm:max-w-132.5 lg:max-w-162.5 object-contain object-bottom select-none"
          src="/illustration/Hero Illustration.png"
          alt="Hero Illustration"
        />
      </div>
    </section>
  );
}
