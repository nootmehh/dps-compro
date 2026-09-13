"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "../card/productCard";
import ServiceCard from "../card/serviceCard";
import Button from "../ui/button";
import EmptyState from "../common/emptyState";
import { getProducts, getProductSlug } from "@/api/products";
import { getServices, getServiceSlug } from "@/api/services";
import { type BadgeVariant, resolveBadgeVariant } from "../ui/badge";

type TabType = "produk" | "layanan";

export interface WhatWeDoProduct {
  id?: string | number;
  imageSrc?: string;
  category?: string;
  categoryColor?: string;
  categoryVariant?: BadgeVariant;
  title: string;
  href?: string;
}

export interface WhatWeDoService {
  id?: string | number;
  imageSrc?: string;
  category?: string;
  categoryColor?: string;
  categoryVariant?: BadgeVariant;
  title: string;
  href?: string;
}

export interface WhatWeDoProps {
  tagline?: string;
  title?: string;
  products?: WhatWeDoProduct[];
  services?: WhatWeDoService[];
  productsHref?: string;
  servicesHref?: string;
  onViewMoreProducts?: () => void;
  onViewMoreServices?: () => void;
  className?: string;
}

const DEFAULT_PRODUCTS: WhatWeDoProduct[] = [];
const DEFAULT_SERVICES: WhatWeDoService[] = [];

export default function WhatWeDo({
  tagline = "APA YANG KAMI LAKUKAN?",
  title = "Siap Dalam Jasa & Pengadaan",
  products = DEFAULT_PRODUCTS,
  services = DEFAULT_SERVICES,
  productsHref = "/produk",
  servicesHref = "/layanan",
  onViewMoreProducts,
  onViewMoreServices,
  className = "",
}: WhatWeDoProps) {
  const [activeTab, setActiveTab] = useState<TabType>("layanan");
  const [hoveredTab, setHoveredTab] = useState<TabType | null>(null);

  const [fetchedProducts, setFetchedProducts] = useState<WhatWeDoProduct[]>([]);
  const [fetchedServices, setFetchedServices] = useState<WhatWeDoService[]>([]);

  useEffect(() => {
    if (products.length === 0) {
      getProducts({ limit: 4 }).then((data) => {
        setFetchedProducts(
          data.map((p) => ({
            id: p.id,
            imageSrc:
              (p.product_image_url && p.product_image_url.length > 0 && p.product_image_url[0]) ||
              p.highlight_img_url ||
              "https://placehold.co/320x160",
            category: p.category || "Produk",
            categoryColor: p.category_color || undefined,
            categoryVariant: resolveBadgeVariant(p.category_color, p.category, "green"),
            title: p.title,
            href: `/produk/${getProductSlug(p, data)}`,
          }))
        );
      });
    }
    if (services.length === 0) {
      getServices({ limit: 4 }).then((data) => {
        setFetchedServices(
          data.map((s) => ({
            id: s.id,
            imageSrc:
              (s.service_image_url && s.service_image_url[0]) ||
              "https://placehold.co/320x160",
            category: s.category || "Layanan",
            categoryColor: s.category_color || undefined,
            categoryVariant: resolveBadgeVariant(s.category_color, s.category, "amber"),
            title: s.title,
            href: `/layanan/${getServiceSlug(s, data)}`,
          }))
        );
      });
    }
  }, [products.length, services.length]);

  const displayProducts = products.length > 0 ? products : fetchedProducts;
  const displayServices = services.length > 0 ? services : fetchedServices;

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

        {/* Cards Grid or Empty State */}
        <div className="self-stretch flex flex-col gap-6">
          {/* Product Cards */}
          {activeTab === "produk" && (
            displayProducts.length > 0 ? (
              <div className="w-full flex justify-center">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch justify-items-center max-w-[340px] sm:max-w-[688px] xl:max-w-none mx-auto">
                  {displayProducts.map((product, index) => (
                    <ProductCard
                      key={product.id || index}
                      imageSrc={product.imageSrc}
                      category={product.category}
                      categoryVariant={product.categoryVariant}
                      categoryColor={product.categoryColor}
                      title={product.title}
                      href={product.href}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                iconName="StorageBox"
                text="Belum ada produk yang ditampilkan saat ini."
              />
            )
          )}

          {/* Service Cards */}
          {activeTab === "layanan" && (
            displayServices.length > 0 ? (
              <div className="w-full flex justify-center">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch justify-items-center max-w-[340px] sm:max-w-[688px] xl:max-w-none mx-auto">
                  {displayServices.map((service, index) => (
                    <ServiceCard
                      key={service.id || index}
                      imageSrc={service.imageSrc}
                      category={service.category}
                      categoryVariant={service.categoryVariant}
                      categoryColor={service.categoryColor}
                      title={service.title}
                      href={service.href}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                iconName="StorageBox"
                text="Belum ada layanan yang ditampilkan saat ini."
              />
            )
          )}

          {/* Divider & View More Button */}
          {((activeTab === "produk" && displayProducts.length > 0) || (activeTab === "layanan" && displayServices.length > 0)) && (
            <>
              <div className="self-stretch h-px bg-g1/10" />
              <div className="flex justify-center">
                <Link
                  href={activeTab === "produk" ? productsHref : servicesHref}
                  onClick={activeTab === "produk" ? onViewMoreProducts : onViewMoreServices}
                >
                  <Button
                    type="button"
                    text={activeTab === "produk" ? "Lihat Produk Lainnya" : "Lihat Layanan Lainnya"}
                    variant="stroke"
                    rightIcon="Right 1"
                    className="cursor-pointer shadow-none"
                  />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
