"use client";

import { useState } from "react";
import Link from "next/link";
import Badge, { type BadgeVariant } from "../ui/badge";
import LordIcon from "../common/lordIcon";

export interface ProductCardProps {
  imageSrc?: string;
  category?: string;
  categoryVariant?: BadgeVariant;
  categoryColor?: string; // backwards compatibility
  title: string;
  href?: string;
  onDetailClick?: () => void;
  className?: string;
}

export default function ProductCard({
  imageSrc = "https://placehold.co/320x160",
  category = "Bahan Marka Jalan",
  categoryVariant = "amber",
  categoryColor,
  title,
  href = "/produk/1",
  onDetailClick,
  className = "",
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Map categoryColor string to BadgeVariant if provided
  const badgeVar: BadgeVariant =
    categoryVariant ||
    (categoryColor === "amber" || categoryColor === "yellow"
      ? "amber"
      : "green");

  const cardContent = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hover-target="true"
      style={{
        border: isHovered ? "1.5px solid var(--g1, #0A9863)" : "1.5px solid #e5e7eb",
      }}
      className={`group h-full flex-1 min-w-60 max-w-full sm:max-w-[320px] lg:max-w-none bg-white rounded-3xl flex flex-col justify-between items-center overflow-hidden transition-all duration-200 select-none cursor-pointer ${className}`}
    >
      {/* Full-bleed Thumbnail: No top/left/right margins */}
      <div className="w-full h-36 sm:h-40 overflow-hidden shrink-0">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={imageSrc}
          alt={title}
        />
      </div>

      {/* Card Content with standard padding */}
      <div className="w-full px-4 pt-4 pb-4 flex flex-col justify-between items-start gap-3 flex-1">
        {/* Meta Content */}
        <div className="self-stretch flex flex-col justify-start items-start gap-3 flex-1 w-full">
          {category && (
            <div className="self-stretch flex flex-col justify-start items-start">
              <Badge text={category} variant={badgeVar} />
            </div>
          )}
          <p className="self-stretch text-dark text-base font-semibold font-sans line-clamp-2 leading-snug group-hover:text-g1 transition-colors">
            {title}
          </p>
          <div className="self-stretch h-px bg-dark/10 mt-auto" />
        </div>

        {/* CTA Link with smooth card hover activation */}
        <div className="self-stretch flex justify-center items-center pt-0.5 w-full">
          <div
            className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full transition-all duration-200 ${
              isHovered
                ? "bg-g1/10 -translate-y-0.5 scale-[1.02] gap-2.5"
                : "bg-transparent group-hover:bg-g1/10 group-hover:-translate-y-0.5 group-hover:scale-[1.02] group-hover:gap-2.5"
            }`}
          >
            <span className="text-g1 text-xs font-semibold font-sans">
              Lihat Detail Produk
            </span>
            <span
              className={`shrink-0 flex items-center justify-center transition-transform duration-200 ${
                isHovered ? "translate-x-1" : "group-hover:translate-x-1"
              }`}
            >
              <LordIcon
                name="Right 1"
                size={16}
                primaryColor="#0A9863"
                trigger="hover"
                target="[data-hover-target]"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onDetailClick} className="flex-1 flex h-full">
        {cardContent}
      </Link>
    );
  }

  return (
    <div onClick={onDetailClick} className="flex-1 flex h-full">
      {cardContent}
    </div>
  );
}
