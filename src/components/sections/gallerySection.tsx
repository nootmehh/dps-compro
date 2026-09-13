"use client";

import { useState, useEffect, useMemo } from "react";
import GalleryCard from "../card/galleryCard";
import { getSiteContent, type GalleryItem as ApiGalleryItem } from "@/api/siteContent";

export interface GallerySectionItem extends Omit<Partial<ApiGalleryItem>, "id"> {
  id?: string | number;
  imageSrc?: string;
  location?: string;
}

export interface GallerySectionProps {
  tagline?: string;
  title?: string;
  items?: GallerySectionItem[];
  className?: string;
}

const DEFAULT_GALLERY_ITEMS: GallerySectionItem[] = [
  {
    id: 1,
    imageSrc: "https://placehold.co/320x220",
    title: "Pengecatan Marka Jalan",
    location: "Jalan Djuanda, Ciputat",
  },
  {
    id: 2,
    imageSrc: "https://placehold.co/320x220",
    title: "Pemasangan Guardrail & Pagar Pengaman",
    location: "Tol Cipali KM 82",
  },
  {
    id: 3,
    imageSrc: "https://placehold.co/320x220",
    title: "Aplikasi Coldplastic MMA",
    location: "Kawasan Industri MM2100",
  },
  {
    id: 4,
    imageSrc: "https://placehold.co/320x220",
    title: "Zona Selamat Sekolah (ZoSS)",
    location: "Kota Depok, Jawa Barat",
  },
  {
    id: 5,
    imageSrc: "https://placehold.co/320x220",
    title: "Pemasangan Rambu Lalu Lintas",
    location: "Jl. Jenderal Sudirman, Jakarta",
  },
];

export default function GallerySection({
  tagline = "DETAIL LEBIH",
  title,
  items,
  className = "",
}: GallerySectionProps) {
  const [dbTitle, setDbTitle] = useState<string | null>(title || null);
  const [dbItems, setDbItems] = useState<GallerySectionItem[] | null>(items || null);

  useEffect(() => {
    if (title) setDbTitle(title);
    if (items) setDbItems(items);

    if (!title || !items) {
      let isMounted = true;
      getSiteContent().then((content) => {
        if (isMounted && content) {
          if (!title && content.more_title) {
            setDbTitle(content.more_title);
          }
          if (!items && content.gallery && content.gallery.length > 0) {
            setDbItems(content.gallery);
          }
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [title, items]);

  const displayTitle = dbTitle || "Berikut Hasil Pekerjaan Kami";
  const activeItems = useMemo(() => {
    if (dbItems && dbItems.length > 0) return dbItems;
    return DEFAULT_GALLERY_ITEMS;
  }, [dbItems]);

  // Duplicate items sufficiently for continuous infinite ticker loop without empty space
  const tickerItems = useMemo(() => {
    const repeatCount = Math.max(3, Math.ceil(12 / activeItems.length));
    return Array.from({ length: repeatCount }, () => activeItems).flat();
  }, [activeItems]);

  return (
    <section
      aria-label="Gallery Section"
      className={`w-full py-8 md:py-8 bg-linear-to-bl from-[#0BA86D] to-[#028151] flex flex-col justify-start items-center gap-6 overflow-hidden ${className}`}
    >
      {/* Header Block */}
      <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto flex flex-col justify-start items-start gap-1">
        <span className="text-white/70 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
          {tagline}
        </span>
        <h2 className="text-white text-2xl sm:text-3xl font-bold font-sans">
          {displayTitle}
        </h2>
      </div>

      {/* Ticker Container with Edge-to-Edge Full-Screen Track */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Scrolling Ticker Track */}
        <div className="animate-ticker-right flex items-center gap-6">
          {tickerItems.map((item, index) => (
            <GalleryCard
              key={`${item.id || index}-${index}`}
              url={item.url || item.imageSrc}
              title={item.title || "Proyek DPS"}
              category={item.category || item.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
