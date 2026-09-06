"use client";

import { useState } from "react";
import ProductCard from "../card/productCard";
import ServiceCard from "../card/serviceCard";
import Button from "../ui/button";

type TabType = "produk" | "layanan";

export interface WhatWeDoProduct {
  id?: string | number;
  imageSrc?: string;
  category?: string;
  categoryColor?: "amber" | "blue" | "green" | "gray";
  title: string;
  href?: string;
}

export interface WhatWeDoService {
  id?: string | number;
  imageSrc?: string;
  category?: string;
  categoryColor?: "amber" | "blue" | "green" | "gray";
  title: string;
  href?: string;
}

export interface WhatWeDoProps {
  tagline?: string;
  title?: string;
  products?: WhatWeDoProduct[];
  services?: WhatWeDoService[];
  onViewMoreProducts?: () => void;
  onViewMoreServices?: () => void;
  className?: string;
}

const DEFAULT_PRODUCTS: WhatWeDoProduct[] = [
  {
    id: 1,
    imageSrc: "https://placehold.co/246x134",
    category: "Bahan Marka Jalan",
    categoryColor: "amber",
    title: "Coldplastic Merk DPS (MMA Coldplastic Paint)",
    href: "/produk/coldplastic-dps",
  },
  {
    id: 2,
    imageSrc: "https://placehold.co/246x134",
    category: "Bahan Marka Jalan",
    categoryColor: "amber",
    title: "Cat Thermoplastik (AASHTO M-249)",
    href: "/produk/cat-thermoplastik",
  },
  {
    id: 3,
    imageSrc: "https://placehold.co/246x134",
    category: "Bahan Marka Jalan",
    categoryColor: "amber",
    title: "Glass Beads",
    href: "/produk/glass-beads",
  },
  {
    id: 4,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas & Penerangan Jalan",
    categoryColor: "blue",
    title: "Rambu Lalu Lintas",
    href: "/produk/rambu-lalu-lintas",
  },
];

const DEFAULT_SERVICES: WhatWeDoService[] = [
  {
    id: 1,
    imageSrc: "https://placehold.co/246x134",
    category: "Pengerjaan Jalan",
    categoryColor: "green",
    title: "Pengecatan Marka Jalan",
    href: "/layanan/pengecatan-marka-jalan",
  },
  {
    id: 2,
    imageSrc: "https://placehold.co/246x134",
    category: "Pengerjaan Jalan",
    categoryColor: "green",
    title: "Pemasangan Guardrail & Pagar Pengaman",
    href: "/layanan/guardrail",
  },
  {
    id: 3,
    imageSrc: "https://placehold.co/246x134",
    category: "Keselamatan Jalan",
    categoryColor: "blue",
    title: "Pemasangan Rambu Lalu Lintas",
    href: "/layanan/rambu-lalin",
  },
  {
    id: 4,
    imageSrc: "https://placehold.co/246x134",
    category: "Konstruksi",
    categoryColor: "gray",
    title: "Perbaikan & Pemeliharaan Jalan",
    href: "/layanan/pemeliharaan-jalan",
  },
];

export default function WhatWeDo({
  tagline = "APA YANG KAMI LAKUKAN?",
  title = "Siap Dalam Jasa & Pengadaan",
  products = DEFAULT_PRODUCTS,
  services = DEFAULT_SERVICES,
  onViewMoreProducts,
  onViewMoreServices,
  className = "",
}: WhatWeDoProps) {
  const [activeTab, setActiveTab] = useState<TabType>("layanan");
  const [hoveredTab, setHoveredTab] = useState<TabType | null>(null);

  return (
    <section
      aria-label="What We Do Section"
      className={`w-full bg-white py-12 md:py-16 ${className}`}
    >
      <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto flex flex-col justify-start items-center gap-6">
        {/* Header with Tabs */}
        <div className="self-stretch flex flex-col justify-start items-center gap-4">
          <div className="self-stretch flex flex-col justify-start items-center gap-1">
            <span className="self-stretch text-center text-dark/60 text-sm font-normal font-sans tracking-wider uppercase">
              {tagline}
            </span>
            <h2 className="self-stretch text-center text-dark text-2xl sm:text-3xl font-bold font-sans">
              {title}
            </h2>
          </div>

          {/* Toggle Tabs */}
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("layanan")}
              onMouseEnter={() => setHoveredTab("layanan")}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                backgroundColor:
                  activeTab === "layanan"
                    ? "var(--g1, #0A9863)"
                    : hoveredTab === "layanan"
                    ? "rgba(10, 152, 99, 0.12)"
                    : "transparent",
                color: activeTab === "layanan" ? "#FFFFFF" : "var(--g1, #0A9863)",
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold font-sans transition-all duration-200 cursor-pointer select-none"
            >
              Layanan Kami
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("produk")}
              onMouseEnter={() => setHoveredTab("produk")}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                backgroundColor:
                  activeTab === "produk"
                    ? "var(--g1, #0A9863)"
                    : hoveredTab === "produk"
                    ? "rgba(10, 152, 99, 0.12)"
                    : "transparent",
                color: activeTab === "produk" ? "#FFFFFF" : "var(--g1, #0A9863)",
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold font-sans transition-all duration-200 cursor-pointer select-none"
            >
              Produk Kami
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="self-stretch flex flex-col gap-6">
          {/* Product Cards */}
          {activeTab === "produk" && (
            <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id || index}
                  imageSrc={product.imageSrc}
                  category={product.category}
                  categoryColor={product.categoryColor}
                  title={product.title}
                  href={product.href}
                />
              ))}
            </div>
          )}

          {/* Service Cards */}
          {activeTab === "layanan" && (
            <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id || index}
                  imageSrc={service.imageSrc}
                  category={service.category}
                  categoryColor={service.categoryColor}
                  title={service.title}
                  href={service.href}
                />
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="self-stretch h-px bg-g1/10" />

          {/* View More Button */}
          <div className="flex justify-center">
            <Button
              type="button"
              text={activeTab === "produk" ? "Lihat Produk Lainnya" : "Lihat Layanan Lainnya"}
              variant="stroke"
              rightIcon="Right 1"
              onClick={activeTab === "produk" ? onViewMoreProducts : onViewMoreServices}
              className="cursor-pointer shadow-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
