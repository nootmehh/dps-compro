"use client";

import Button from "../ui/button";

export interface CtaSectionProps {
  titlePrefix?: string;
  titleHighlight?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  imageSrc?: string;
  className?: string;
}

export default function CtaSection({
  titlePrefix = "Sudah Siap Untuk\nMembuat ",
  titleHighlight = "Penawaran?",
  primaryButtonText = "Hubungi Kami",
  secondaryButtonText = "Lihat Produk Kami",
  onPrimaryClick,
  onSecondaryClick,
  imageSrc = "/illustration/CTA llustration.png",
  className = "",
}: CtaSectionProps) {
  return (
    <section
      aria-label="Call to Action Section"
      className={`relative w-full overflow-visible bg-linear-to-r from-white from-30% via-[#D3D351] to-[#0A9863] ${className}`}
    >
      <div className="relative z-10 w-full max-w-360 px-6 md:px-16 lg:px-24 py-8 md:py-8 mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
        {/* Left Column: Heading & Action Buttons */}
        <div className="w-full max-w-xl flex flex-col justify-start items-start gap-6">
          <h2 className="text-dark text-3xl sm:text-4xl font-bold font-sans leading-tight whitespace-pre-line">
            <span>{titlePrefix}</span>
            <span className="text-g1">{titleHighlight}</span>
          </h2>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Primary Action Button (Unique Green connected pill with right icon) */}
            <Button
              type="button"
              text={primaryButtonText}
              variant="unique-green"
              rightIcon="Right 1"
              onClick={onPrimaryClick}
              className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
            />

            {/* Secondary Action Button (Stroke Button) */}
            <Button
              type="button"
              text={secondaryButtonText}
              variant="stroke"
              onClick={onSecondaryClick}
              className="cursor-pointer bg-white/40 hover:bg-white/60 shadow-none"
            />
          </div>
        </div>
      </div>

      {/* Absolute Bottom-Aligned CTA Illustration */}
      {imageSrc && (
        <div className="absolute right-4 md:right-12 lg:right-24 bottom-0 z-0 pointer-events-none flex items-end justify-end">
          <img
            className="w-auto h-48 sm:h-56 md:h-64 lg:h-72 max-w-[320px] sm:max-w-105 lg:max-w-120 object-contain object-bottom select-none"
            src={imageSrc}
            alt="CTA Illustration"
          />
        </div>
      )}
    </section>
  );
}
