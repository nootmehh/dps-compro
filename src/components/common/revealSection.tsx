"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  threshold?: number;
}

export default function RevealSection({
  children,
  className = "",
  delay = 0,
  threshold = 0,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    // Pre-trigger 150px before entering viewport so animations glide in seamlessly ahead of the scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsRevealed(true), delay);
          } else {
            setIsRevealed(true);
          }
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: "150px 0px 100px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`reveal-section ${isRevealed ? "is-revealed" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
