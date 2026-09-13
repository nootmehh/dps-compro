"use client";

import { useState } from "react";
import { isVideoUrl } from "@/api/siteContent";

export interface GalleryCardProps {
  imageSrc?: string;
  url?: string;
  title: string;
  location?: string;
  category?: string;
  className?: string;
}

export default function GalleryCard({
  imageSrc,
  url,
  title,
  location,
  category,
  className = "",
}: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const displayMedia = url || imageSrc || "https://placehold.co/320x220";
  const displaySubtitle = category || location;
  const isVideo = isVideoUrl(displayMedia);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-80 h-56 relative rounded-3xl shadow-[0px_2px_4px_0px_rgba(6,137,81,0.25)] border-2 border-g2 overflow-hidden shrink-0 group select-none cursor-pointer ${className}`}
    >
      {/* Background Media */}
      {isVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`size-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "group-hover:scale-105"
          }`}
          src={displayMedia}
        />
      ) : (
        <img
          className={`size-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "group-hover:scale-105"
          }`}
          src={displayMedia}
          alt={title}
        />
      )}

      {/* Reduced Black Gradient Overlay (appears on hover) */}
      <div
        className={`absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent transition-opacity duration-300 flex flex-col justify-end p-5 ${
          isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {/* Title & Category/Location Slide-up from Bottom */}
        <div
          className={`transition-transform duration-300 ease-out flex flex-col justify-end gap-1 ${
            isHovered
              ? "translate-y-0"
              : "transform translate-y-3 group-hover:translate-y-0"
          }`}
        >
          <h3 className="text-white text-base font-bold font-sans leading-tight line-clamp-1">
            {title}
          </h3>
          {displaySubtitle && (
            <p className="text-white/80 text-xs sm:text-sm font-normal font-sans line-clamp-1">
              {displaySubtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
