"use client";

import { useState } from "react";
import LordIcon from "../common/lordIcon";

export interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarSrc?: string;
  className?: string;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  className = "",
}: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hover-target="true"
      style={{
        border: isHovered ? "1.5px solid #0A9863" : "1.5px solid transparent",
      }}
      className={`group w-80 h-60 p-6 bg-brand-background rounded-3xl flex flex-col justify-between items-start shrink-0 shadow-xs hover:shadow-md transition-all duration-200 select-none cursor-pointer ${className}`}
    >
      {/* Quote Icon */}
      <div className="size-10 flex items-center justify-center">
        <LordIcon
          name="Quote"
          size={40}
          primaryColor="#0A9863"
          trigger="hover"
          target="[data-hover-target]"
        />
      </div>

      {/* Quote */}
      <p className="text-dark text-sm font-normal font-sans line-clamp-3 leading-relaxed">
        {quote}
      </p>

      {/* Author Row with Emerald Accent Bar */}
      <div className="w-full flex items-center gap-3">
        <div className="w-0.5 h-8 bg-g1 rounded-full shrink-0" />
        <div className="flex-1 flex flex-col justify-start items-start min-w-0">
          <span className="text-g1 text-sm font-semibold font-sans truncate w-full">
            {name}
          </span>
          <span className="text-dark/75 text-xs font-normal font-sans truncate w-full">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}
