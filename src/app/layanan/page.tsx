"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ServiceCard from "@/components/card/serviceCard";
import Button from "@/components/ui/button";
import LordIcon from "@/components/common/lordIcon";
import type { BadgeVariant } from "@/components/ui/badge";

interface ServiceItemData {
  id: string | number;
  imageSrc: string;
  category: string;
  categoryVariant: BadgeVariant;
  title: string;
  href: string;
}

const ALL_SERVICES: ServiceItemData[] = [
  {
    id: 1,
    imageSrc: "https://placehold.co/246x134",
    category: "Bahan Marka Jalan",
    categoryVariant: "amber",
    title: "Jasa Pengecatan & Penghapusan Marka Jalan",
    href: "/layanan/marka-jalan",
  },
  {
    id: 2,
    imageSrc: "https://placehold.co/246x134",
    category: "Penerangan Jalan",
    categoryVariant: "sky",
    title: "Pemasangan PJU (Penerangan Jalan Umum)",
    href: "/layanan/pju",
  },
  {
    id: 3,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas Keselamatan Jalan",
    categoryVariant: "green",
    title: "Pemasangan Guardrail",
    href: "/layanan/guardrail",
  },
  {
    id: 4,
    imageSrc: "https://placehold.co/246x134",
    category: "Rambu Lalu Lintas",
    categoryVariant: "pink",
    title: "Pemasangan Rambu Lalu Lintas & RPPJ",
    href: "/layanan/rambu-lalu-lintas",
  },
  {
    id: 5,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas Keselamatan Jalan",
    categoryVariant: "green",
    title: "Pemasangan Paku Marka",
    href: "/layanan/paku-marka",
  },
  {
    id: 6,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas Keselamatan Jalan",
    categoryVariant: "green",
    title: "Pemasangan Deliniator",
    href: "/layanan/deliniator",
  },
  {
    id: 7,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas Keselamatan Jalan",
    categoryVariant: "green",
    title: "Pemasangan Wheel Stopper",
    href: "/layanan/wheel-stopper",
  },
  {
    id: 8,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas Keselamatan Jalan",
    categoryVariant: "green",
    title: "Pemasangan Speed Trap (Pita Penggaduh) & Zona Selamat Sekolah (ZoSS)",
    href: "/layanan/speed-trap",
  },
];

const SERVICE_CATEGORIES = [
  "Semua",
  "Bahan Marka Jalan",
  "Penerangan Jalan",
  "Fasilitas Keselamatan Jalan",
  "Rambu Lalu Lintas",
];

export default function ServicesCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter services by search and category
  const filteredServices = useMemo(() => {
    return ALL_SERVICES.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Sticky Navbar */}
      <Navbar variant="auto" />

      {/* Hero / Search Bar Section */}
      <section
        aria-label="Services Search Header"
        className="w-full relative overflow-hidden bg-linear-to-r from-white from-25% via-[#D3D351] via-85% to-[#0A9863] pt-28 md:pt-36 pb-12 md:pb-16"
      >
        <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto flex flex-col justify-start items-start gap-6 relative z-10">
          {/* Section Headline */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
              LAYANAN KAMI
            </span>
            <h1 className="text-dark text-2xl sm:text-3xl lg:text-4xl font-bold font-sans">
              Jelajahi Katalog Layanan Kami
            </h1>
          </div>

          {/* Search & Filter Controls */}
          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
            {/* Search Input */}
            <div className="w-full sm:w-80 flex flex-col justify-start items-start gap-1">
              <label
                htmlFor="service-search"
                className="text-dark text-sm font-semibold font-sans"
              >
                Cari Layanan
              </label>
              <div
                data-hover-target="true"
                className="w-full h-12 px-4 py-2.5 bg-brand-background rounded-[120px] inline-flex items-center gap-2.5 border border-transparent hover:border-g1/20 focus-within:ring-1 focus-within:ring-g1 transition-all cursor-text"
              >
                <LordIcon
                  name="Search"
                  size={20}
                  primaryColor="#64748b"
                  trigger="hover"
                  target="[data-hover-target]"
                />
                <input
                  id="service-search"
                  type="text"
                  placeholder="Nama Layanan..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-transparent border-none outline-none text-dark text-sm font-normal font-sans placeholder:text-dark/40"
                />
              </div>
            </div>

            {/* Filter Dropdown Button */}
            <div className="relative">
              <Button
                type="button"
                text={
                  selectedCategory === "Semua"
                    ? "Pilih Kategori"
                    : selectedCategory
                }
                variant="unique-green"
                rightIcon="Figures"
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
              />

              {/* Category Dropdown Menu */}
              {filterDropdownOpen && (
                <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-30 flex flex-col">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setFilterDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2.5 text-left text-sm font-sans transition-colors cursor-pointer flex items-center justify-between ${
                        selectedCategory === cat
                          ? "bg-g1/10 text-g1 font-semibold"
                          : "text-dark/80 hover:bg-stone-50"
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && (
                        <LordIcon
                          name="Check"
                          size={16}
                          primaryColor="#0A9863"
                          trigger="hover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Absolute Bottom-Aligned Services Illustration */}
        <div className="absolute right-4 md:right-12 lg:right-24 bottom-0 z-0 pointer-events-none hidden md:flex items-end justify-end">
          <img
            className="w-auto h-52 sm:h-64 md:h-72 lg:h-80 max-w-95 sm:max-w-120 lg:max-w-140 object-contain object-bottom select-none"
            src="/illustration/Services Illustration.png"
            alt="Services Illustration"
          />
        </div>
      </section>

      {/* Main Catalog Content Section */}
      <main className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto py-10 md:py-12 flex flex-col justify-start items-start gap-8">
        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                imageSrc={service.imageSrc}
                category={service.category}
                categoryVariant={service.categoryVariant}
                title={service.title}
                href={service.href}
              />
            ))}
          </div>
        ) : (
          <div className="w-full py-16 flex flex-col items-center justify-center gap-3 text-center">
            <LordIcon
              name="Search"
              size={48}
              primaryColor="#0A9863"
              trigger="hover"
            />
            <h3 className="text-dark text-lg font-bold font-sans">
              Layanan Tidak Ditemukan
            </h3>
            <p className="text-dark/60 text-sm font-sans max-w-sm">
              Tidak ada layanan yang sesuai dengan kata kunci &quot;{searchQuery}&quot;. Coba gunakan kata kunci lain.
            </p>
          </div>
        )}

        {/* Pagination & Results Summary Row */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-100">
          <div className="text-dark/60 text-sm font-normal font-sans">
            Menampilkan{" "}
            <span className="text-g1 font-semibold">
              {filteredServices.length}
            </span>{" "}
            dari{" "}
            <span className="text-g1 font-semibold">
              {ALL_SERVICES.length} Layanan
            </span>
          </div>

          {/* Pagination Navigation */}
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center">
            {/* Previous Button */}
            <Button
              type="button"
              text="Sebelumnya"
              variant="unique-stroke"
              leftIcon="Left"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="cursor-pointer shadow-none"
            />

            {/* Page Number Pills */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`size-8 rounded-full text-sm font-medium font-sans flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === page
                      ? "bg-g1 text-white shadow-sm"
                      : "text-g1 hover:bg-g1/10"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <Button
              type="button"
              text="Selanjutnya"
              variant="unique-green"
              rightIcon="Right 1"
              onClick={() => setCurrentPage((p) => p + 1)}
              className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
            />
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
