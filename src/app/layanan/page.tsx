"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ServiceCard from "@/components/card/serviceCard";
import Button from "@/components/ui/button";
import LordIcon from "@/components/common/lordIcon";
import EmptyState from "@/components/common/emptyState";
import LoadingState from "@/components/common/loadingState";
import { getServices, getServiceSlug } from "@/api/services";
import { type BadgeVariant, resolveBadgeVariant } from "@/components/ui/badge";

interface ServiceItemData {
  id: string | number;
  imageSrc: string;
  category: string;
  categoryVariant: BadgeVariant;
  title: string;
  href: string;
}

const DEFAULT_SERVICE_CATEGORIES = [
  "Semua",
  "Jasa Marka Jalan",
  "Jasa Perlengkapan Jalan",
  "Jasa Elektrikal Jalan",
];

export default function ServicesCatalogPage() {
  const [services, setServices] = useState<ServiceItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(DEFAULT_SERVICE_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Temporary category state for filter pop-up
  const [tempCategory, setTempCategory] = useState("Semua");

  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getServices();
        const mapped: ServiceItemData[] = data.map((s) => ({
          id: s.id,
          imageSrc:
            (s.service_image_url && s.service_image_url[0]) ||
            "https://placehold.co/320x160",
          category: s.category || "Layanan",
          categoryVariant: resolveBadgeVariant(s.category_color, s.category, "amber"),
          title: s.title,
          href: `/layanan/${getServiceSlug(s, data)}`,
        }));
        setServices(mapped);

        const distinctCats = Array.from(
          new Set(data.map((s) => s.category).filter(Boolean))
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

  // Open filter pop-up and sync tempCategory
  const handleOpenFilter = () => {
    setTempCategory(selectedCategory);
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  // Hero collision detection: hide illustration & expand search when touching the heading
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const headingTextRef = useRef<HTMLSpanElement>(null);
  const illustrationRef = useRef<HTMLImageElement>(null);
  const headingWidthRef = useRef<number>(520);
  const illustrationWidthRef = useRef<number>(460);
  const [isHeroColliding, setIsHeroColliding] = useState(false);

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

  // Hero heading vs illustration collision detection
  useEffect(() => {
    const checkHeroCollision = () => {
      const container = heroInnerRef.current;
      const heading = headingTextRef.current;
      const illustration = illustrationRef.current;
      if (!container) return;

      if (illustration && illustration.offsetWidth > 0) {
        illustrationWidthRef.current = illustration.offsetWidth;
      }
      if (heading && heading.offsetWidth > 0) {
        headingWidthRef.current = heading.offsetWidth;
      }

      const containerW = container.clientWidth;
      const headingW = headingWidthRef.current || 520;
      const illustrationW = illustrationWidthRef.current || 460;
      const GAP = 24; // 24px margin before touching heading

      setIsHeroColliding(containerW < headingW + GAP + illustrationW);
    };

    checkHeroCollision();

    const ro = new ResizeObserver(checkHeroCollision);
    if (heroInnerRef.current) ro.observe(heroInnerRef.current);
    window.addEventListener("resize", checkHeroCollision);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", checkHeroCollision);
    };
  }, []);

  // Pagination collision detection
  const paginationContainerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const paginationControlsRef = useRef<HTMLDivElement>(null);
  const countWidthRef = useRef<number>(180);
  const controlsWidthRef = useRef<number>(470);
  const [isPaginationStacked, setIsPaginationStacked] = useState(false);

  // Filter services by search and category
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchQuery, selectedCategory]);

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
      const GAP = 24;

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
  }, [isPaginationStacked, filteredServices.length]);

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE) || 1;
  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredServices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredServices, currentPage]);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Sticky Navbar */}
      <Navbar variant="auto" />

      {/* Hero / Search Bar Section */}
      <section
        aria-label="Services Search Header"
        className="w-full relative z-20 overflow-visible bg-linear-to-r from-white to-[#D3D351] via-none min-[420px]:from-25% min-[420px]:via-[#D3D351] min-[420px]:via-85% min-[420px]:to-[#0A9863] pt-28 md:pt-36 pb-8"
      >
        <div
          ref={heroInnerRef}
          className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto flex flex-col justify-start items-start gap-6 relative z-10"
        >
          {/* Section Headline */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1 relative">
            {/* Hidden measurement reference for single-line collision detection */}
            <span
              ref={headingTextRef}
              aria-hidden="true"
              className="absolute opacity-0 pointer-events-none whitespace-nowrap text-2xl sm:text-3xl lg:text-4xl font-bold font-sans"
            >
              Jelajahi Katalog Layanan Kami
            </span>
            <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
              LAYANAN KAMI
            </span>
            <h1 className="text-dark text-2xl sm:text-3xl lg:text-4xl font-bold font-sans leading-tight">
              Jelajahi Katalog Layanan Kami
            </h1>
          </div>

          {/* Search & Filter Controls */}
          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-end gap-3 relative z-10">
            {/* Search Input — full-width when illustration is hidden */}
            <div
              className={`flex flex-col justify-start items-start gap-1 transition-all ${
                isHeroColliding ? "w-full flex-1" : "w-full sm:w-80"
              }`}
            >
              <label
                htmlFor="service-search"
                className="text-dark text-sm font-semibold font-sans"
              >
                Cari Layanan
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
            <div ref={filterContainerRef} className="filter-category-container relative shrink-0 z-30">
              <Button
                type="button"
                text={
                  selectedCategory !== "Semua"
                    ? selectedCategory
                    : "Pilih Kategori"
                }
                variant="unique-green"
                rightIcon="Figures"
                onClick={handleOpenFilter}
                className="w-full sm:w-auto shadow-none [&_.pill-segment]:shadow-none cursor-pointer"
              />

              {/* Filter Pop-up Modal Panel */}
              {filterDropdownOpen && (
                <div className="filter-popup-modal absolute left-0 sm:left-auto sm:right-0 top-[calc(100%+8px)] w-80 sm:w-96 p-5 bg-white rounded-3xl shadow-none border border-slate-200 z-50 flex flex-col gap-4 items-start text-left animate-fade-in">
                  {/* Pop-up Header */}
                  <div className="w-full pb-3 border-b border-white-70 text-left">
                    <span className="text-dark text-base font-bold font-sans text-left">
                      Pilih Kategori
                    </span>
                  </div>

                  {/* Section: Kategori Layanan (Single select chips) */}
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

                  {/* Pop-up Footer: Apply Filter Button */}
                  <div className="w-full pt-2">
                    <Button
                      type="button"
                      text="Terapkan Kategori"
                      variant="unique-green"
                      rightIcon="Right 1"
                      onClick={() => {
                        setSelectedCategory(tempCategory);
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

        {/* Absolute Bottom-Aligned Services Illustration — hidden when colliding with heading */}
        <div
          className={`absolute inset-x-0 bottom-0 max-w-360 px-6 md:px-16 lg:px-24 mx-auto pointer-events-none ${
            isHeroColliding ? "hidden" : "hidden md:flex"
          } justify-end items-end z-0`}
        >
          <img
            ref={illustrationRef}
            className="w-auto h-52 sm:h-64 md:h-72 lg:h-80 max-w-95 sm:max-w-120 lg:max-w-140 object-contain object-bottom select-none"
            src="/illustration/Services Illustration.png"
            alt="Services Illustration"
          />
        </div>
      </section>

      {/* Main Catalog Content Section */}
      <main className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto py-10 md:py-14 flex flex-col justify-start items-start gap-8">
        {/* Services Grid — collapses into centered stack */}
        {paginatedServices.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch justify-items-center">
            {paginatedServices.map((service, index) => (
              <ServiceCard
                key={service.id || index}
                imageSrc={service.imageSrc}
                category={service.category}
                categoryVariant={service.categoryVariant}
                title={service.title}
                href={service.href}
                className="max-w-md sm:max-w-none w-full"
              />
            ))}
          </div>
        ) : (
          <EmptyState
            iconName="StorageBox"
            text={
              searchQuery || selectedCategory !== "Semua"
                ? "Tidak ada layanan yang cocok dengan pencarian atau filter yang dipilih."
                : "Belum ada layanan yang dapat ditampilkan saat ini."
            }
          >
            {(searchQuery || selectedCategory !== "Semua") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Semua");
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
        {filteredServices.length > 0 && (
          <div
            ref={paginationContainerRef}
            className={`w-full flex ${
              isPaginationStacked
                ? "flex-col items-center gap-6"
                : "flex-row justify-between items-center gap-4"
            } pt-2 transition-all`}
          >
            {/* Item Count Display */}
            <div
              ref={countRef}
              className={`text-dark/60 text-sm font-normal font-sans shrink-0 ${
                isPaginationStacked ? "text-center w-full" : "text-left"
              }`}
            >
              Menampilkan{" "}
              <span className="text-g1 text-sm font-semibold font-sans">
                {filteredServices.length}
              </span>{" "}
              Layanan
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
