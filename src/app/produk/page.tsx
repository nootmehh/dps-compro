"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/card/productCard";
import Button from "@/components/ui/button";
import LordIcon from "@/components/common/lordIcon";
import type { BadgeVariant } from "@/components/ui/badge";

interface ProductItemData {
  id: string | number;
  imageSrc: string;
  category: string;
  categoryVariant: BadgeVariant;
  title: string;
  href: string;
}

const ALL_PRODUCTS: ProductItemData[] = [
  {
    id: 1,
    imageSrc: "https://placehold.co/246x134",
    category: "Bahan Marka Jalan",
    categoryVariant: "amber",
    title: "Coldplastic Merk DPS (MMA Coldplastic Paint)",
    href: "/produk/coldplastic-dps",
  },
  {
    id: 2,
    imageSrc: "https://placehold.co/246x134",
    category: "Bahan Marka Jalan",
    categoryVariant: "amber",
    title: "Cat Thermoplastik (AASHTO M-249)",
    href: "/produk/cat-thermoplastik",
  },
  {
    id: 3,
    imageSrc: "https://placehold.co/246x134",
    category: "Bahan Marka Jalan",
    categoryVariant: "amber",
    title: "Glass Beads",
    href: "/produk/glass-beads",
  },
  {
    id: 4,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas & Penerangan Jalan",
    categoryVariant: "sky",
    title: "Rambu Lalu Lintas",
    href: "/produk/rambu-lalu-lintas",
  },
  {
    id: 5,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas & Penerangan Jalan",
    categoryVariant: "sky",
    title: "Guardrail Type A & B",
    href: "/produk/guardrail",
  },
  {
    id: 6,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas & Penerangan Jalan",
    categoryVariant: "sky",
    title: "Speed Bumps",
    href: "/produk/speed-bumps",
  },
  {
    id: 7,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas & Penerangan Jalan",
    categoryVariant: "sky",
    title: "PJU (Penerangan Jalan Umum)",
    href: "/produk/pju",
  },
  {
    id: 8,
    imageSrc: "https://placehold.co/246x134",
    category: "Mesin & Peralatan Konstruksi",
    categoryVariant: "pink",
    title: "Mesin Marka Jalan Set",
    href: "/produk/mesin-marka-jalan",
  },
];

const PRODUCT_CATEGORIES = [
  "Semua",
  "Bahan Marka Jalan",
  "Fasilitas & Penerangan Jalan",
  "Mesin & Peralatan Konstruksi",
];

export default function ProductCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Sticky Navbar */}
      <Navbar variant="auto" />

      {/* Hero / Search Bar Section with CTA background styling */}
      <section
        aria-label="Product Search Header"
        className="w-full relative overflow-hidden bg-linear-to-r from-white from-25% via-[#D3D351] via-85% to-[#0A9863] pt-28 md:pt-36 pb-12 md:pb-16"
      >
        <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto flex flex-col justify-start items-start gap-6 relative z-10">
          {/* Section Headline */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
              PRODUK KAMI
            </span>
            <h1 className="text-dark text-2xl sm:text-3xl lg:text-4xl font-bold font-sans">
              Jelajahi Katalog Produk Kami
            </h1>
          </div>

          {/* Search & Filter Controls */}
          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
            {/* Search Input */}
            <div className="w-full sm:w-80 flex flex-col justify-start items-start gap-1">
              <label
                htmlFor="product-search"
                className="text-dark text-sm font-semibold font-sans"
              >
                Cari Produk
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
                  id="product-search"
                  type="text"
                  placeholder="Nama Produk..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-transparent text-dark placeholder:text-dark/50 text-sm font-normal font-sans outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Button / Dropdown */}
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
                className="w-full sm:w-auto shadow-none [&_.pill-segment]:shadow-none cursor-pointer"
              />

              {/* Filter Dropdown Menu */}
              {filterDropdownOpen && (
                <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-64 p-2 bg-white rounded-2xl shadow-lg border border-slate-100 z-30 flex flex-col gap-1">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setFilterDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm font-sans rounded-xl transition-all cursor-pointer ${selectedCategory === cat
                        ? "bg-g1 text-white font-semibold"
                        : "text-slate-700 hover:bg-slate-100"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Absolute Bottom-Aligned Product Illustration */}
        <div className="absolute right-4 md:right-12 lg:right-24 bottom-0 z-0 pointer-events-none hidden md:flex items-end justify-end">
          <img
            className="w-auto h-52 sm:h-60 md:h-72 lg:h-80 max-w-95 sm:max-w-120 lg:max-w-140 object-contain object-bottom select-none"
            src="/illustration/Product Illustration.png"
            alt="Product Illustration"
          />
        </div>
      </section>

      {/* Main Catalog Grid Section */}
      <main className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto py-10 md:py-14 flex flex-col justify-start items-start gap-8">
        {/* Products Grid (8 cards) */}
        {filteredProducts.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id || index}
                imageSrc={product.imageSrc}
                category={product.category}
                categoryVariant={product.categoryVariant}
                title={product.title}
                href={product.href}
              />
            ))}
          </div>
        ) : (
          <div className="w-full py-16 flex flex-col items-center justify-center text-center gap-2 bg-brand-background rounded-3xl">
            <LordIcon name="Search" size={48} primaryColor="#0A9863" />
            <p className="text-dark text-lg font-bold font-sans">
              Produk Tidak Ditemukan
            </p>
            <p className="text-slate-500 text-sm font-sans max-w-md">
              Tidak ada produk yang cocok dengan kata kunci atau kategori yang
              Anda pilih.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua");
              }}
              className="mt-2 text-g1 font-semibold text-sm hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Bottom Bar: Showing Count & Pagination Controls */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
          {/* Item Count Display */}
          <div className="text-dark/60 text-sm font-normal font-sans">
            Menampilkan{" "}
            <span className="text-g1 text-sm font-semibold font-sans">
              {filteredProducts.length}
            </span>{" "}
            dari{" "}
            <span className="text-g1 text-sm font-semibold font-sans">
              24 Produk
            </span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            {/* Previous Button */}
            <Button
              type="button"
              text="Sebelumnya"
              variant="unique-stroke"
              leftIcon="Left 1"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
            />

            {/* Page Number Pills */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`size-8 rounded-full flex items-center justify-center text-sm font-semibold font-sans transition-all cursor-pointer ${currentPage === page
                    ? "bg-g1 text-white shadow-xs"
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
              disabled={currentPage === 3}
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
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
