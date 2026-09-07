"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Button from "../ui/button";

export interface AboutProps {
  tagline?: string;
  title?: string;
  description?: ReactNode;
  imageSrc?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
  onReadMore?: () => void;
  onLegality?: () => void;
  layout?: "default" | "reversed";
  className?: string;
}

export default function About({
  tagline = "TENTANG KAMI",
  title = "Siap Dengan Kualitas & Jaminan Keselamatan",
  description = "Berdiri sejak tahun 2020, kami adalah penyedia jasa kontraktor dan kelengkapan jalan yang terpercaya. Dengan dukungan tenaga ahli profesional, kami berkomitmen menghadirkan produk bermutu tinggi, tepat waktu, dan berdaya saing untuk setiap proyek pelaksanaan maupun pengadaan Anda.",
  imageSrc = "https://placehold.co/520x320",
  primaryButtonText = "Lihat Selengkapnya",
  secondaryButtonText = "Legalitas Kami",
  primaryButtonHref,
  secondaryButtonHref,
  onReadMore,
  onLegality,
  layout = "default",
  className = "",
}: AboutProps) {
  const [isMediaHovered, setIsMediaHovered] = useState(false);

  const mediaFrame = (
    <div
      onMouseEnter={() => setIsMediaHovered(true)}
      onMouseLeave={() => setIsMediaHovered(false)}
      style={{
        border: isMediaHovered ? "1.5px solid var(--g1, #0A9863)" : "1.5px solid transparent",
      }}
      className="group w-fit max-w-full p-4 sm:p-5 bg-brand-background rounded-[48px] inline-flex flex-col justify-start items-start gap-2.5 shrink-0 transition-all duration-200 cursor-pointer mx-auto min-[1020px]:mx-0 self-center min-[1020px]:self-auto"
    >
      <div className="w-[min(calc(100vw-80px),480px)] sm:w-120 min-[1020px]:w-130 h-56 sm:h-72 min-[1020px]:h-80 rounded-4xl overflow-hidden bg-stone-200/50 transition-all duration-200">
        <img
          src={imageSrc}
          alt="520 x 320"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );

  const contentBlock = (
    <div className="w-full max-w-none min-[1020px]:max-w-129.5 mx-0 flex flex-col justify-start items-start text-left gap-6">
      {/* Header Block */}
      <div className="self-stretch flex flex-col justify-start items-start text-left gap-1">
        <span className="text-dark/60 text-sm font-normal font-sans tracking-wider uppercase">
          {tagline}
        </span>
        <h2 className="text-dark text-2xl sm:text-3xl font-bold font-sans leading-snug">
          {title}
        </h2>
      </div>

      {/* Description Body (Justified left & right) */}
      <div className="self-stretch text-dark/60 text-sm font-normal font-sans leading-relaxed text-justify space-y-3">
        {typeof description === "string" ? (
          <p className="whitespace-pre-line">{description}</p>
        ) : (
          description
        )}
      </div>

      {/* Action Buttons */}
      <div className="self-stretch inline-flex flex-wrap justify-start items-center gap-3">
        {/* 1. Primary Action */}
        {primaryButtonHref ? (
          <Link href={primaryButtonHref}>
            <Button
              type="button"
              text={primaryButtonText}
              variant="unique-green"
              rightIcon="Right 1"
              onClick={onReadMore}
              className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
            />
          </Link>
        ) : (
          <Button
            type="button"
            text={primaryButtonText}
            variant="unique-green"
            rightIcon="Right 1"
            onClick={onReadMore}
            className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
          />
        )}

        {/* 2. Secondary Action */}
        {secondaryButtonHref ? (
          <Link href={secondaryButtonHref}>
            <Button
              type="button"
              text={secondaryButtonText}
              variant="stroke"
              onClick={onLegality}
              className="cursor-pointer"
            />
          </Link>
        ) : (
          <Button
            type="button"
            text={secondaryButtonText}
            variant="stroke"
            onClick={onLegality}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );

  return (
    <section
      aria-label="Tentang Kami Section"
      className={`w-full bg-linear-to-b from-white to-white-90 rounded-b-[48px] border-b border-white-70 py-10 md:py-14 overflow-hidden ${className}`}
    >
      <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto flex flex-col min-[1020px]:flex-row justify-between items-start min-[1020px]:items-center gap-10 min-[1020px]:gap-12">
        {layout === "reversed" ? (
          <>
            {contentBlock}
            {mediaFrame}
          </>
        ) : (
          <>
            {mediaFrame}
            {contentBlock}
          </>
        )}
      </div>
    </section>
  );
}
