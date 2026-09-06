"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ArticleCard from "@/components/card/articleCard";
import Button from "@/components/ui/button";
import LordIcon from "@/components/common/lordIcon";
import type { BadgeVariant } from "@/components/ui/badge";

interface ArticleItemData {
  id: string | number;
  imageSrc: string;
  category: string;
  categoryVariant: BadgeVariant;
  title: string;
  date: string;
  href: string;
}

const ALL_ARTICLES: ArticleItemData[] = [
  {
    id: 1,
    imageSrc: "https://placehold.co/246x134",
    category: "Penghargaan & Pencapaian",
    categoryVariant: "pink",
    title:
      "Komitmen Terhadap Keselamatan, Perusahaan Raih Penghargaan Zero Accident 2026",
    date: "10 Juli, 2026",
    href: "/artikel/zero-accident-2026",
  },
  {
    id: 2,
    imageSrc: "https://placehold.co/246x134",
    category: "Proyek & Infrastruktur",
    categoryVariant: "amber",
    title: "Penyelesaian Proyek Marka Jalan Tol Cipali Selesai Lebih Awal",
    date: "8 Juli, 2026",
    href: "/artikel/proyek-tol-cipali",
  },
  {
    id: 3,
    imageSrc: "https://placehold.co/246x134",
    category: "Tanggung Jawab Sosial (CSR)",
    categoryVariant: "green",
    title:
      "Program CSR: Revitalisasi Zona Selamat Sekolah (ZoSS) di Kota Depok",
    date: "6 Juli, 2026",
    href: "/artikel/csr-zoss-depok",
  },
  {
    id: 4,
    imageSrc: "https://placehold.co/246x134",
    category: "Inovasi Produk",
    categoryVariant: "sky",
    title:
      "Peluncuran Inovasi Cat Coldplastic Ramah Lingkungan Generasi Terbaru",
    date: "4 Juli, 2026",
    href: "/artikel/inovasi-coldplastic",
  },
  {
    id: 5,
    imageSrc: "https://placehold.co/246x134",
    category: "Penghargaan & Pencapaian",
    categoryVariant: "pink",
    title:
      "Dukung Program Pemerintah, Produk Cat Marka Kami Capai Nilai TKDN Tinggi",
    date: "2 Juli, 2026",
    href: "/artikel/tkdn-cat-marka",
  },
  {
    id: 6,
    imageSrc: "https://placehold.co/246x134",
    category: "Inovasi Produk",
    categoryVariant: "sky",
    title: "Mengenal Perbedaan Cat Marka Thermoplastic dan Coldplastic",
    date: "28 Juni, 2026",
    href: "/artikel/perbedaan-cat-marka",
  },
  {
    id: 7,
    imageSrc: "https://placehold.co/246x134",
    category: "Proyek & Infrastruktur",
    categoryVariant: "amber",
    title:
      "Sukses Selesaikan Pemasangan PJU Tenaga Surya di Kawasan Industri Terpadu",
    date: "25 Juni, 2026",
    href: "/artikel/pju-tenaga-surya",
  },
  {
    id: 8,
    imageSrc: "https://placehold.co/246x134",
    category: "Proyek & Infrastruktur",
    categoryVariant: "amber",
    title:
      "Pentingnya Instalasi Guardrail Berstandar SNI di Jalur Rawan Kecelakaan",
    date: "24 Juni, 2026",
    href: "/artikel/guardrail-sni",
  },
];

const FILTER_CATEGORIES = [
  "Semua",
  "Penghargaan & Pencapaian",
  "Proyek & Infrastruktur",
  "Tanggung Jawab Sosial (CSR)",
  "Inovasi Produk",
];

export default function ArticleCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Sticky Navbar */}
      <Navbar variant="auto" />

      {/* Main Catalog Container */}
      <main className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col justify-start items-start gap-8">
        {/* Header Row: Title & Search/Filter Controls */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          {/* Section Headline */}
          <div className="flex-1 flex flex-col justify-start items-start gap-1">
            <span className="text-slate-900/60 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
              ARTIKEL KAMI
            </span>
            <h1 className="text-slate-900 text-2xl sm:text-3xl font-bold font-sans">
              Ikuti Perkembangan Terbaru Kami
            </h1>
          </div>

          {/* Search & Filter Controls */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
            {/* Search Input Box */}
            <div className="w-full sm:w-80 flex flex-col justify-start items-start gap-1">
              <label
                htmlFor="article-search"
                className="text-slate-900 text-sm font-semibold font-sans"
              >
                Cari Artikel
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
                  id="article-search"
                  type="text"
                  placeholder="Judul Artikel..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-transparent text-slate-900 placeholder:text-slate-900/50 text-sm font-normal font-sans outline-none"
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

            {/* Filter Button / Dropdown */}
            <div className="relative">
              <Button
                type="button"
                text={
                  selectedCategory === "Semua"
                    ? "Pilih Filter"
                    : selectedCategory
                }
                variant="unique-green"
                rightIcon="Figures"
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className="w-full sm:w-auto shadow-none [&_.pill-segment]:shadow-none cursor-pointer"
              />

              {/* Filter Dropdown Menu */}
              {filterDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 p-2 bg-white rounded-2xl shadow-lg border border-slate-100 z-30 flex flex-col gap-1">
                  {FILTER_CATEGORIES.map((cat) => (
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

        {/* G1 Divider */}
        <div className="w-full h-px bg-g1/10" />

        {/* Articles Grid (8 cards) */}
        {filteredArticles.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {filteredArticles.map((article, index) => (
              <ArticleCard
                key={article.id || index}
                imageSrc={article.imageSrc}
                category={article.category}
                categoryVariant={article.categoryVariant}
                title={article.title}
                date={article.date}
                href={article.href}
              />
            ))}
          </div>
        ) : (
          <div className="w-full py-16 flex flex-col items-center justify-center text-center gap-2 bg-brand-background rounded-3xl">
            <LordIcon name="Search" size={48} primaryColor="#0A9863" />
            <p className="text-slate-900 text-lg font-bold font-sans">
              Artikel Tidak Ditemukan
            </p>
            <p className="text-slate-500 text-sm font-sans max-w-md">
              Tidak ada artikel yang cocok dengan kata kunci atau filter yang
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
          <div className="text-slate-900/60 text-sm font-normal font-sans">
            Menampilkan{" "}
            <span className="text-g1 text-sm font-semibold font-sans">
              {filteredArticles.length}
            </span>{" "}
            dari{" "}
            <span className="text-g1 text-sm font-semibold font-sans">
              24 Artikel
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
