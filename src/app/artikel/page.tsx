"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ArticleCard from "@/components/card/articleCard";
import Button from "@/components/ui/button";
import LordIcon from "@/components/common/lordIcon";
import EmptyState from "@/components/common/emptyState";
import LoadingState from "@/components/common/loadingState";
import { getArticles, getArticleSlug } from "@/api/articles";
import { type BadgeVariant, resolveBadgeVariant } from "@/components/ui/badge";

interface ArticleItemData {
  id: string | number;
  imageSrc: string;
  category: string;
  categoryVariant: BadgeVariant;
  title: string;
  date: string;
  timestamp: number; // for chronological sorting
  href: string;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const DEFAULT_FILTER_CATEGORIES = [
  "Semua",
  "Penghargaan & Pencapaian",
  "Proyek & Infrastruktur",
  "Tanggung Jawab Sosial (CSR)",
  "Inovasi Produk",
];

export default function ArticleCatalogPage() {
  const [articles, setArticles] = useState<ArticleItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(DEFAULT_FILTER_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedSort, setSelectedSort] = useState<"terbaru" | "terlama">("terbaru");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Temporary filter modal states (applied on clicking "Terapkan Filter")
  const [tempCategory, setTempCategory] = useState("Semua");
  const [tempSort, setTempSort] = useState<"terbaru" | "terlama">("terbaru");

  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getArticles();
        const mapped: ArticleItemData[] = data.map((a) => ({
          id: a.id,
          imageSrc: "https://placehold.co/320x160",
          category: a.category || "Artikel",
          categoryVariant: resolveBadgeVariant(a.category_color, a.category, "green"),
          title: a.title,
          date: formatDate(a.created_at),
          timestamp: new Date(a.created_at).getTime(),
          href: `/artikel/${getArticleSlug(a, data)}`,
        }));
        setArticles(mapped);

        const distinctCats = Array.from(
          new Set(data.map((a) => a.category).filter(Boolean))
        ) as string[];
        if (distinctCats.length > 0) {
          setCategories(["Semua", ...distinctCats]);
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Open filter pop-up and synchronize temporary state
  const handleOpenFilter = () => {
    setTempCategory(selectedCategory);
    setTempSort(selectedSort);
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  // Close filter on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }
    };
    if (filterDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterDropdownOpen]);

  // Pagination Collision Detection
  const paginationContainerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const paginationControlsRef = useRef<HTMLDivElement>(null);
  const countWidthRef = useRef<number>(180);
  const controlsWidthRef = useRef<number>(470);
  const [isPaginationStacked, setIsPaginationStacked] = useState(false);

  // Filtered and sorted articles
  const filteredArticles = useMemo(() => {
    const list = articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort by timestamp (terbaru = descending, terlama = ascending)
    return list.sort((a, b) => {
      if (selectedSort === "terlama") {
        return a.timestamp - b.timestamp;
      }
      return b.timestamp - a.timestamp;
    });
  }, [articles, searchQuery, selectedCategory, selectedSort]);

  // Check 24px collision between item count and pagination controls
  useEffect(() => {
    const checkPaginationCollision = () => {
      const container = paginationContainerRef.current;
      const count = countRef.current;
      const controls = paginationControlsRef.current;
      if (!container) return;

      if (count && count.offsetWidth > 0 && !isPaginationStacked) {
        countWidthRef.current = count.offsetWidth;
      }
      if (controls && controls.offsetWidth > 0 && !isPaginationStacked) {
        controlsWidthRef.current = controls.offsetWidth;
      }

      const containerW = container.clientWidth;
      const countW = countWidthRef.current || 180;
      const controlsW = controlsWidthRef.current || 470;
      const GAP = 24; // 24px gap threshold before colliding

      setIsPaginationStacked(containerW < countW + GAP + controlsW);
    };

    checkPaginationCollision();

    const ro = new ResizeObserver(checkPaginationCollision);
    if (paginationContainerRef.current) ro.observe(paginationContainerRef.current);
    window.addEventListener("resize", checkPaginationCollision);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", checkPaginationCollision);
    };
  }, [isPaginationStacked, filteredArticles.length]);

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  if (loading) {
    return <LoadingState />;
  }

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

          {/* Search & Filter Controls — expands to full width when under the heading (< lg) */}
          <div className="w-full lg:w-auto flex-1 lg:flex-initial flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
            {/* Search Input Box — full width when under the heading */}
            <div className="w-full flex-1 lg:w-80 lg:flex-initial flex flex-col justify-start items-start gap-1">
              <label
                htmlFor="article-search"
                className="text-slate-900 text-sm font-semibold font-sans"
              >
                Cari Artikel
              </label>
              <div
                data-hover-target="true"
                className="search-input-box w-full h-12 px-4 py-2.5 bg-brand-background rounded-[120px] inline-flex items-center gap-2.5 cursor-text"
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

            {/* Filter Button / Pop-up Dialog */}
            <div ref={filterContainerRef} className="relative shrink-0">
              <Button
                type="button"
                text={
                  selectedCategory !== "Semua"
                    ? selectedCategory
                    : selectedSort === "terlama"
                    ? "Artikel Terlama"
                    : "Pilih Filter"
                }
                variant="unique-green"
                rightIcon="Figures"
                onClick={handleOpenFilter}
                className="w-full sm:w-auto shadow-none [&_.pill-segment]:shadow-none cursor-pointer"
              />

              {/* Filter Pop-up Modal Panel */}
              {filterDropdownOpen && (
                <div className="filter-popup-modal absolute right-0 top-[calc(100%+8px)] w-80 sm:w-96 p-5 bg-white rounded-3xl shadow-none border border-slate-200 z-30 flex flex-col gap-4 items-start text-left animate-fade-in">
                  {/* Pop-up Header */}
                  <div className="w-full pb-3 border-b border-white-70 text-left">
                    <span className="text-dark text-base font-bold font-sans text-left">
                      Filter Artikel
                    </span>
                  </div>

                  {/* Section 1: Kategori Artikel (Single select) */}
                  <div className="w-full flex flex-col items-start gap-2 text-left">
                    <span className="text-dark/60 text-xs font-medium font-sans tracking-wider uppercase text-left">
                      KATEGORI
                    </span>
                    <div className="flex flex-wrap gap-1.5 justify-start">
                      {categories.map((cat) => {
                        const isSelected = tempCategory === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setTempCategory(cat)}
                            className={`filter-category-btn px-3.5 py-1.5 rounded-full text-xs font-semibold font-sans ${
                              isSelected ? "is-active" : ""
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 2: Urutkan Berdasarkan (Sort: Terbaru / Terlama — styled like What We Do tabs) */}
                  <div className="w-full flex flex-col items-start gap-2 text-left">
                    <span className="text-dark/60 text-xs font-medium font-sans tracking-wider uppercase text-left">
                      URUTKAN
                    </span>
                    <div className="inline-flex items-center gap-2 justify-start">
                      <button
                        type="button"
                        onClick={() => setTempSort("terbaru")}
                        className={`filter-sort-btn px-4 py-2 rounded-full text-xs font-semibold font-sans ${
                          tempSort === "terbaru" ? "is-active" : ""
                        }`}
                      >
                        Artikel Terbaru
                      </button>
                      <button
                        type="button"
                        onClick={() => setTempSort("terlama")}
                        className={`filter-sort-btn px-4 py-2 rounded-full text-xs font-semibold font-sans ${
                          tempSort === "terlama" ? "is-active" : ""
                        }`}
                      >
                        Artikel Terlama
                      </button>
                    </div>
                  </div>

                  {/* Pop-up Footer: Apply Filter Button */}
                  <div className="w-full pt-2">
                    <Button
                      type="button"
                      text="Terapkan Filter"
                      variant="unique-green"
                      rightIcon="Right 1"
                      onClick={() => {
                        setSelectedCategory(tempCategory);
                        setSelectedSort(tempSort);
                        setFilterDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className="w-full justify-center shadow-none [&_.pill-segment]:shadow-none cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* G1 Divider */}
        <div className="w-full h-px bg-g1/10" />

        {/* Articles Grid — collapses into centered stack with 24px gap */}
        {paginatedArticles.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch justify-items-center">
            {paginatedArticles.map((article, index) => (
              <ArticleCard
                key={article.id || index}
                imageSrc={article.imageSrc}
                category={article.category}
                categoryVariant={article.categoryVariant}
                title={article.title}
                date={article.date}
                href={article.href}
                className="max-w-md sm:max-w-none w-full"
              />
            ))}
          </div>
        ) : (
          <EmptyState
            iconName="StorageBox"
            text={
              searchQuery || selectedCategory !== "Semua"
                ? "Tidak ada artikel yang cocok dengan pencarian atau filter yang dipilih."
                : "Belum ada artikel yang dapat ditampilkan saat ini."
            }
          >
            {(searchQuery || selectedCategory !== "Semua") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Semua");
                  setSelectedSort("terbaru");
                  setCurrentPage(1);
                }}
                className="text-g1 font-semibold text-sm hover:underline cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </EmptyState>
        )}

        {/* Bottom Bar: Showing Count & Pagination Controls */}
        {filteredArticles.length > 0 && (
          <div
            ref={paginationContainerRef}
            className={`w-full flex ${
              isPaginationStacked
                ? "flex-col items-center gap-6"
                : "flex-row justify-between items-center gap-4"
            } pt-2 transition-all`}
          >
            {/* Item Count Display — centered when stacked */}
            <div
              ref={countRef}
              className={`text-slate-900/60 text-sm font-normal font-sans shrink-0 ${
                isPaginationStacked ? "text-center w-full" : "text-left"
              }`}
            >
              Menampilkan{" "}
              <span className="text-g1 text-sm font-semibold font-sans">
                {filteredArticles.length}
              </span>{" "}
              Artikel
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div
                ref={paginationControlsRef}
                className={`flex items-center gap-3 sm:gap-6 flex-wrap justify-center ${
                  isPaginationStacked ? "w-full" : "shrink-0"
                }`}
              >
                <Button
                  type="button"
                  text="Sebelumnya"
                  variant="unique-stroke"
                  leftIcon="Left 1"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
                />

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`size-8 rounded-full flex items-center justify-center text-sm font-semibold font-sans transition-all duration-150 cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-g1 text-white shadow-xs"
                          : "bg-transparent text-dark/70 hover:bg-g1/10 hover:text-g1"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <Button
                  type="button"
                  text="Selanjutnya"
                  variant="unique-stroke"
                  rightIcon="Right 1"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
