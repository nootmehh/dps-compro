"use client";

import GalleryCard, { type GalleryCardProps } from "../card/galleryCard";

export interface GalleryItem extends GalleryCardProps {
  id?: string | number;
}

export interface GallerySectionProps {
  tagline?: string;
  title?: string;
  items?: GalleryItem[];
  className?: string;
}

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
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
  title = "Berikut Hasil Pekerjaan Kami",
  items = DEFAULT_GALLERY_ITEMS,
  className = "",
}: GallerySectionProps) {
  // Duplicate array 3 times for seamless infinite continuous ticker loop
  const tickerItems = [...items, ...items, ...items];

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
          {title}
        </h2>
      </div>

      {/* Ticker Container with Edge-to-Edge Full-Screen Track */}
      <div className="relative w-full overflow-hidden py-2">

        {/* Scrolling Ticker Track */}
        <div className="animate-ticker-right flex items-center gap-6">
          {tickerItems.map((item, index) => (
            <GalleryCard
              key={`${item.id || index}-${index}`}
              imageSrc={item.imageSrc}
              title={item.title}
              location={item.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
