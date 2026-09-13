"use client";

import { useState } from "react";
import Link from "next/link";
import Badge, { type BadgeVariant } from "../ui/badge";
import LordIcon from "../common/lordIcon";

export interface ArticleCardProps {
  imageSrc?: string;
  category?: string;
  categoryVariant?: BadgeVariant;
  categoryColor?: string; // backwards compatibility
  title: string;
  date?: string;
  href?: string;
  onReadMore?: () => void;
  className?: string;
}

export default function ArticleCard({
  imageSrc = "https://placehold.co/320x160",
  category = "Keselamatan Jalan",
  categoryVariant = "green",
  categoryColor,
  title,
  date = "22 Jan 2026",
  href = "/artikel/1",
  onReadMore,
  className = "",
}: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Map categoryColor string to BadgeVariant if provided
  const badgeVar: BadgeVariant =
    categoryVariant ||
    (categoryColor === "amber" || categoryColor === "yellow"
      ? "amber"
      : categoryColor === "blue"
      ? "blue"
      : categoryColor === "red"
      ? "red"
      : "green");

  return (
    <Link href={href} onClick={onReadMore} className="w-full flex justify-center h-full">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-hover-target="true"
        style={{
          border: isHovered ? "1.5px solid var(--g1, #0A9863)" : "1.5px solid #e5e7eb",
        }}
        className={`group h-full w-full min-w-0 max-w-full sm:max-w-95 xl:max-w-none mx-auto bg-white rounded-3xl flex flex-col justify-between items-center overflow-hidden transition-all duration-200 select-none cursor-pointer ${className}`}
      >
        {/* Full-bleed Thumbnail: No top/left/right margins */}
        <div className="w-full h-36 sm:h-40 overflow-hidden shrink-0">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={imageSrc}
            alt={title}
          />
        </div>

        {/* Card Content with standard margin/padding */}
        <div className="w-full px-4 pt-3.5 pb-5 flex flex-col justify-between items-start gap-3 flex-1">
          {/* Meta Content */}
          <div className="self-stretch flex flex-col justify-start items-start gap-3 flex-1 w-full">
            {/* Category Badge using Badge component */}
            <div className="self-stretch flex flex-col justify-start items-start">
              <Badge text={category} variant={badgeVar} />
            </div>

            {/* Title */}
            <p className="self-stretch text-slate-900 text-sm font-semibold font-sans line-clamp-2 min-h-10 leading-snug group-hover:text-g1 transition-colors">
              {title}
            </p>

            {/* Divider */}
            <div className="self-stretch h-px bg-dark/10 mt-auto" />
          </div>

          {/* Bottom Row: Date Badge & Selengkapnya Link */}
          <div className="self-stretch flex justify-between items-center gap-2 pt-0.5 w-full">
            {/* Date Pill with LordIcon Clock */}
            <div className="px-2.5 py-2 bg-g1/5 rounded-full flex items-center gap-1.5 shrink-0">
              <LordIcon
                name="Clock"
                size={16}
                primaryColor="#0A9863"
                trigger="hover"
                target="[data-hover-target]"
              />
              <span className="text-g1 text-xs font-semibold font-sans">
                {date}
              </span>
            </div>

            {/* Selengkapnya CTA Link: animated, expanded padding & arrow slide on hover */}
            <div
              className={`flex items-center justify-end gap-1.5 px-2 py-2 -mr-1 rounded-full transition-all duration-200 ${
                isHovered
                  ? "bg-g1/10 -translate-y-0.5 scale-[1.03] pr-3 gap-2.5"
                  : "bg-transparent group-hover:bg-g1/10 group-hover:-translate-y-0.5 group-hover:scale-[1.03] group-hover:pr-3 group-hover:gap-2.5"
              }`}
            >
              <span className="text-g1 text-xs font-semibold font-sans">
                Selengkapnya
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
    </Link>
  );
}
