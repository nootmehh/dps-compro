"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/card/productCard";
import Badge, { type BadgeVariant, resolveBadgeVariant } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import LordIcon from "@/components/common/lordIcon";
import EmptyState from "@/components/common/emptyState";
import LoadingState from "@/components/common/loadingState";
import { getProductById, getProducts, getProductSlug } from "@/api/products";
import { getSiteContent, formatWhatsAppUrl } from "@/api/siteContent";
import type { Product, ProductDetailItem } from "@/types/database";

interface RelatedProduct {
  id: string | number;
  imageSrc: string;
  category: string;
  categoryVariant: BadgeVariant;
  title: string;
  href: string;
}

const DEFAULT_GALLERY = [
  "https://placehold.co/668x364",
  "https://placehold.co/668x364/0a9863/ffffff",
  "https://placehold.co/668x364/f8f4f0/110d31",
];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isProsHovered, setIsProsHovered] = useState(false);
  const [isConsHovered, setIsConsHovered] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [data, content] = await Promise.all([
        getProductById(resolvedParams.id),
        getSiteContent(),
      ]);
      setProduct(data);
      if (content?.whatsapp_url) {
        setWhatsappUrl(content.whatsapp_url);
      }

      const all = await getProducts();
      const filtered = all
        .filter((p) => p.id !== data?.id && p.id !== resolvedParams.id)
        .slice(0, 4)
        .map((p) => ({
          id: p.id,
          imageSrc:
            (p.product_image_url && p.product_image_url.length > 0 && p.product_image_url[0]) ||
            p.highlight_img_url ||
            "https://placehold.co/320x160",
          category: p.category || "Produk",
          categoryVariant: resolveBadgeVariant(p.category_color, p.category),
          title: p.title,
          href: `/produk/${getProductSlug(p, all)}`,
        }));
      setRelatedProducts(filtered);
      setLoading(false);
    }
    loadData();
  }, [resolvedParams.id]);

  const handleContactClick = () => {
    const message = `Halo, Saya Tertarik Dengan Produk Ini : ${product?.title || ""}`;
    const url = formatWhatsAppUrl(whatsappUrl, message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Gallery Images
  const galleryImages =
    product?.product_image_url && product.product_image_url.length > 0
      ? product.product_image_url
      : DEFAULT_GALLERY;

  // Specs
  const specs: Array<{ label: string; value: string }> = [];
  if (Array.isArray(product?.detail_product)) {
    (product.detail_product as ProductDetailItem[]).forEach((item) => {
      if (item && item.title) {
        specs.push({ label: item.title, value: item.value || "-" });
      }
    });
  } else if (product?.detail_product && typeof product.detail_product === "object") {
    Object.entries(product.detail_product).forEach(([key, val]) => {
      specs.push({ label: key, value: String(val) });
    });
  }

  // Suitable for
  const suitableForList: Array<{ title: string; description: string }> = [];
  if (Array.isArray(product?.suitable_for)) {
    product.suitable_for.forEach((item) => {
      if (typeof item === "string") {
        const colonIdx = item.indexOf(":");
        if (colonIdx !== -1) {
          suitableForList.push({
            title: item.slice(0, colonIdx).trim(),
            description: item.slice(colonIdx + 1).trim(),
          });
        } else {
          suitableForList.push({
            title: item.trim(),
            description: "",
          });
        }
      } else if (item && typeof item === "object") {
        const rawTitle = (item.title || "").trim();
        const rawValue = (item.description || item.value || "").trim();
        const colonIdx = rawTitle.indexOf(":");

        if (colonIdx !== -1) {
          const extractedTitle = rawTitle.slice(0, colonIdx).trim();
          const extractedDesc = rawTitle.slice(colonIdx + 1).trim();
          const combinedDesc = [extractedDesc, rawValue].filter(Boolean).join(" ");
          suitableForList.push({
            title: extractedTitle,
            description: combinedDesc,
          });
        } else {
          suitableForList.push({
            title: rawTitle,
            description: rawValue,
          });
        }
      }
    });
  }

  // Pros
  const prosList: Array<{ title: string; value: string }> = [];
  if (Array.isArray(product?.kelebihan)) {
    product.kelebihan.forEach((item) => {
      if (typeof item === "string") {
        prosList.push({ title: item, value: "" });
      } else if (item && typeof item === "object") {
        prosList.push({ title: item.title || "", value: item.value || "" });
      }
    });
  }

  // Cons
  const consList: Array<{ title: string; value: string }> = [];
  if (Array.isArray(product?.kekurangan)) {
    product.kekurangan.forEach((item) => {
      if (typeof item === "string") {
        consList.push({ title: item, value: "" });
      } else if (item && typeof item === "object") {
        consList.push({ title: item.title || "", value: item.value || "" });
      }
    });
  }

  if (loading) {
    return <LoadingState />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        <Navbar variant="auto" />
        <main className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto pt-32 pb-16 flex flex-col items-center gap-6">
          <EmptyState
            iconName="StorageBox"
            text="Produk yang Anda cari tidak ditemukan atau telah dihapus."
          />
          <Link href="/produk">
            <Button
              type="button"
              text="Kembali ke Katalog Produk"
              variant="unique-green"
              rightIcon="Right 1"
            />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Sticky Navbar */}
      <Navbar variant="auto" whatsappUrl={whatsappUrl || undefined} />

      {/* Main Content Container */}
      <main className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col justify-start items-start gap-3">
        {/* Breadcrumb Row */}
        <nav
          aria-label="Breadcrumb"
          className="w-full flex items-center gap-2 text-sm font-sans flex-wrap"
        >
          <Link
            href="/"
            className="breadcrumb-link inline-flex items-center"
          >
            Beranda
          </Link>
          <div className="shrink-0 flex items-center justify-center opacity-60">
            <LordIcon
              name="Right 1"
              size={14}
              primaryColor="#110D31"
              trigger="hover"
            />
          </div>
          <Link
            href="/produk"
            className="breadcrumb-link inline-flex items-center"
          >
            Produk
          </Link>
          <div className="shrink-0 flex items-center justify-center opacity-60">
            <LordIcon
              name="Right 1"
              size={14}
              primaryColor="#110D31"
              trigger="hover"
            />
          </div>
          <span className="text-g1 font-semibold truncate max-w-xs sm:max-w-md">
            {product?.title || "Detail Produk"}
          </span>
        </nav>

        {/* 2-Column Product Content Layout on min-[1200px]+, reordered gracefully on < 1200px */}
        <div className="w-full flex flex-col min-[1200px]:flex-row justify-start items-start gap-8 min-[1200px]:gap-10">
          {/* Left Column Group: (Becomes contents on < 1200px for natural interleaved ordering) */}
          <div className="contents min-[1200px]:flex min-[1200px]:flex-col min-[1200px]:flex-1 min-[1200px]:min-w-0 min-[1200px]:justify-start min-[1200px]:items-start min-[1200px]:gap-8">
            {/* 1. Image Gallery with Main View and Thumbnails (order-1) */}
            <div className="order-1 w-full flex flex-col sm:flex-row justify-start items-center gap-3">
              {/* Main Active Image */}
              <div className="flex-1 w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-brand-background border border-gray-100">
                <img
                  className="w-full h-full object-cover transition-all duration-300"
                  src={galleryImages[selectedImageIndex] || galleryImages[0]}
                  alt={product?.title || "Product preview"}
                />
              </div>

              {/* Vertical Thumbnail List (Centered vertically in the middle, compact size-14 on mobile) */}
              <div className="flex sm:flex-col items-center justify-center gap-2 sm:gap-3 shrink-0 self-center">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`size-14 sm:size-20 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer ${
                      selectedImageIndex === idx
                        ? "ring-2 ring-g1 shadow-sm"
                        : "opacity-70 hover:opacity-100 border border-gray-200 hover:ring-2 hover:ring-g1 hover:border-transparent"
                    }`}
                  >
                    <img
                      className="size-full object-cover"
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Section: Product Description (order-4 on < 1200px, after Specs & CTA) */}
            <div className="order-4 w-full flex flex-col justify-start items-start gap-2">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                DESKRIPSI PRODUK
              </span>
              <p className="w-full text-dark text-sm sm:text-base font-normal font-sans leading-relaxed text-justify">
                {product?.description || "Deskripsi produk belum tersedia."}
              </p>
            </div>

            {/* 5. Section: Product Suitable For & Highlight Image (order-5, text stacks under image on < 1200px, image does not expand) */}
            {(suitableForList.length > 0 || Boolean(product?.highlight_img_url?.trim())) && (
              <section
                aria-label="Produk Ini Cocok Untuk"
                className="order-5 w-full flex flex-col min-[1200px]:flex-row justify-start items-start gap-6"
              >
                {product?.highlight_img_url?.trim() ? (
                  <img
                    className="w-72 max-w-full h-44 sm:h-48 rounded-2xl object-cover shrink-0"
                    src={product.highlight_img_url.trim()}
                    alt={product.title || "Penggunaan produk"}
                  />
                ) : null}
                {suitableForList.length > 0 && (
                  <div className="flex-1 min-w-0 flex flex-col justify-start items-start gap-2">
                    <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                      PRODUK INI COCOK UNTUK?
                    </span>
                    <ul className="w-full list-disc list-outside pl-4 text-dark text-sm font-normal font-sans leading-relaxed space-y-3">
                      {suitableForList.map((item, idx) => (
                        <li key={idx} className="pl-1">
                          <span className="font-semibold text-dark block">
                            {item.title}
                          </span>
                          {item.description && (
                            <p className="text-dark/80 font-normal text-sm font-sans leading-relaxed text-justify mt-0.5">
                              {item.description}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* 6. Section: Pros & Cons (order-6, stacks top-to-bottom on < 1200px) */}
            {(prosList.length > 0 || consList.length > 0) && (
              <div className="order-6 w-full flex flex-col justify-start items-start gap-2">
                <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                  KELEBIHAN & KEKURANGAN PRODUK
                </span>

                <div className="w-full grid grid-cols-1 min-[1200px]:grid-cols-2 gap-4">
                  {/* Pros Card (Lime/Green tint) */}
                  {prosList.length > 0 && (
                    <div
                      id="card-pros"
                      onMouseEnter={() => setIsProsHovered(true)}
                      onMouseLeave={() => setIsProsHovered(false)}
                      style={{
                        border: isProsHovered
                          ? "1.5px solid #56C439"
                          : "1.5px solid transparent",
                      }}
                      className="p-6 bg-[#56C439]/10 rounded-3xl flex flex-col justify-start items-start gap-4 transition-all duration-200 select-none"
                    >
                      <div className="self-stretch w-full flex justify-between items-center pb-4 border-b border-[#56C439]/15">
                        <span className="text-[#56C439] text-sm font-semibold font-sans">
                          Kelebihan Produk
                        </span>
                        <div className="ml-auto shrink-0 flex items-center justify-end">
                          <LordIcon
                            name="CheckCircle"
                            size={20}
                            primaryColor="#56C439"
                            trigger="hover"
                            target="#card-pros"
                          />
                        </div>
                      </div>

                      {prosList.map((pro, pIdx) => (
                        <div
                          key={pIdx}
                          id={`pro-item-${pIdx}`}
                          className="w-full flex items-start gap-2.5"
                        >
                          <div className="shrink-0 mt-0.5">
                            <LordIcon
                              name="CheckCircle"
                              size={18}
                              primaryColor="#56C439"
                              trigger="hover"
                              target={`#pro-item-${pIdx}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                            <span className="text-dark text-sm font-semibold font-sans">
                              {pro.title}
                            </span>
                            {pro.value && (
                              <p className="text-dark/80 text-sm font-normal font-sans leading-relaxed text-justify">
                                {pro.value}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Cons Card (Red tint) */}
                  {consList.length > 0 && (
                    <div
                      id="card-cons"
                      onMouseEnter={() => setIsConsHovered(true)}
                      onMouseLeave={() => setIsConsHovered(false)}
                      style={{
                        border: isConsHovered
                          ? "1.5px solid #F84A4A"
                          : "1.5px solid transparent",
                      }}
                      className="p-6 bg-[#F84A4A]/10 rounded-3xl flex flex-col justify-start items-start gap-4 transition-all duration-200 select-none"
                    >
                      <div className="self-stretch w-full flex justify-between items-center pb-4 border-b border-[#F84A4A]/15">
                        <span className="text-[#F84A4A] text-sm font-semibold font-sans">
                          Kekurangan Produk
                        </span>
                        <div className="ml-auto shrink-0 flex items-center justify-end">
                          <LordIcon
                            name="CrossCircle"
                            size={20}
                            primaryColor="#F84A4A"
                            trigger="hover"
                            target="#card-cons"
                          />
                        </div>
                      </div>

                      {consList.map((con, cIdx) => (
                        <div
                          key={cIdx}
                          id={`con-item-${cIdx}`}
                          className="w-full flex items-start gap-2.5"
                        >
                          <div className="shrink-0 mt-0.5">
                            <LordIcon
                              name="CrossCircle"
                              size={18}
                              primaryColor="#F84A4A"
                              trigger="hover"
                              target={`#con-item-${cIdx}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                            <span className="text-dark text-sm font-semibold font-sans">
                              {con.title}
                            </span>
                            {con.value && (
                              <p className="text-dark/80 text-sm font-normal font-sans leading-relaxed text-justify">
                                {con.value}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column Group: Sidebar (NAMA PRODUK & CTA Section) */}
          <aside className="contents min-[1200px]:flex min-[1200px]:flex-col min-[1200px]:w-96 min-[1200px]:justify-start min-[1200px]:items-start min-[1200px]:gap-6 min-[1200px]:shrink-0 min-[1200px]:sticky min-[1200px]:top-28 min-[1200px]:self-start min-[1200px]:max-h-[calc(100vh-8rem)] min-[1200px]:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* 2. Card: Product Specifications Summary (NAMA PRODUK, order-2 directly below image) */}
            <div className="order-2 w-full p-6 bg-brand-background rounded-3xl flex flex-col justify-start items-start gap-3">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                NAMA PRODUK
              </span>
              <h1 className="text-dark text-xl sm:text-2xl font-bold font-sans leading-snug">
                {product?.title || "Nama Produk"}
              </h1>
              <div>
                <Badge
                  text={product?.category || "Produk"}
                  variant={resolveBadgeVariant(product?.category_color, product?.category)}
                />
              </div>

              <div className="w-full h-px bg-dark/10 my-1" />

              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                DETAIL PRODUK
              </span>

              {specs.length > 0 ? (
                <ul className="w-full list-disc list-outside pl-4 text-sm font-sans space-y-2 pt-1">
                  {specs.map((spec, idx) => (
                    <li key={idx} className="pl-1 text-dark/80 font-normal">
                      <span className="font-semibold text-dark">
                        {spec.label}:
                      </span>{" "}
                      {spec.value}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-dark/60 text-xs font-sans">
                  Detail spesifikasi belum ditambahkan.
                </p>
              )}
            </div>

            {/* 3. Card: Sales CTA Card (order-3 under Specs on < 1200px) */}
            <div
              data-hover-target="true"
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              style={{
                border: isCtaHovered
                  ? "1.5px solid var(--g1, #0A9863)"
                  : "1.5px solid transparent",
              }}
              className="order-3 w-full p-6 bg-brand-background rounded-3xl flex flex-col justify-start items-start gap-4 text-left transition-all duration-200 select-none group"
            >
              <div className="self-start">
                <LordIcon
                  name="PaintBucket"
                  size={72}
                  primaryColor="#0A9863"
                  trigger="hover"
                  target="[data-hover-target]"
                />
              </div>

              <div className="w-full flex flex-col justify-start items-start gap-1 text-left">
                <h3 className="text-dark text-xl sm:text-2xl font-bold font-sans leading-tight text-left">
                  Sudah Siap Untuk <br />
                  <span className="text-g1">Membuat Penawaran?</span>
                </h3>
                <p className="text-dark/50 text-xs sm:text-sm font-normal font-sans text-left">
                  Hubungi Sales kami untuk detail lebih lanjut
                </p>
              </div>

              <div className="w-full pt-1">
                <Button
                  type="button"
                  text="Hubungi Kami"
                  variant="unique-green"
                  rightIcon="Phone"
                  onClick={handleContactClick}
                  className="w-full justify-center shadow-none [&_.pill-segment]:shadow-none cursor-pointer"
                />
              </div>
            </div>
          </aside>
        </div>

        {/* Section Divider */}
        <div className="w-full h-px bg-g1/10 my-4" />

        {/* Bottom Section: Related Products */}
        <section aria-label="Related Products" className="w-full flex flex-col gap-6">
          <div className="w-full flex justify-between items-end gap-4">
            <div className="flex flex-col justify-start items-start gap-1">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                PRODUK LAINNYA
              </span>
              <h2 className="text-dark text-2xl sm:text-3xl font-bold font-sans">
                Jelajahi Produk Lainnya
              </h2>
            </div>

            {/* Desktop (>= 720px) Button in header */}
            <div className="hidden min-[720px]:block">
              <Link href="/produk">
                <Button
                  type="button"
                  text="Lihat Produk Lainnya"
                  variant="unique-stroke"
                  rightIcon="Right 1"
                  className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
                />
              </Link>
            </div>
          </div>

          {/* 4 Related Product Cards or Empty State */}
          {relatedProducts.length > 0 ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch justify-items-center">
              {relatedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  imageSrc={prod.imageSrc}
                  category={prod.category}
                  categoryVariant={prod.categoryVariant}
                  title={prod.title}
                  href={prod.href}
                  className="max-w-md sm:max-w-none w-full"
                />
              ))}
            </div>
          ) : (
            <EmptyState
              iconName="StorageBox"
              text="Belum ada produk terkait yang ditampilkan saat ini."
            />
          )}

          {/* Mobile (< 720px) Button under the 4 cards (only if products exist) */}
          {relatedProducts.length > 0 && (
            <div className="w-full flex justify-center min-[720px]:hidden pt-2">
              <Link href="/produk" className="w-full max-w-md">
                <Button
                  type="button"
                  text="Lihat Produk Lainnya"
                  variant="unique-stroke"
                  rightIcon="Right 1"
                  className="w-full justify-center cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
                />
              </Link>
            </div>
          )}
        </section>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
