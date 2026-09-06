"use client";

import { use, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/card/productCard";
import Badge, { type BadgeVariant } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import LordIcon from "@/components/common/lordIcon";

interface RelatedProduct {
  id: number;
  imageSrc: string;
  category: string;
  categoryVariant: BadgeVariant;
  title: string;
  href: string;
}

const RELATED_PRODUCTS: RelatedProduct[] = [
  {
    id: 1,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas & Penerangan Jalan",
    categoryVariant: "sky",
    title: "Guardrail Type A & B",
    href: "/produk/guardrail",
  },
  {
    id: 2,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas & Penerangan Jalan",
    categoryVariant: "sky",
    title: "Speed Bumps",
    href: "/produk/speed-bumps",
  },
  {
    id: 3,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas & Penerangan Jalan",
    categoryVariant: "sky",
    title: "PJU (Penerangan Jalan Umum)",
    href: "/produk/pju",
  },
  {
    id: 4,
    imageSrc: "https://placehold.co/246x134",
    category: "Mesin & Peralatan Konstruksi",
    categoryVariant: "pink",
    title: "Mesin Marka Jalan Set",
    href: "/produk/mesin-marka-jalan",
  },
];

const GALLERY_IMAGES = [
  "https://placehold.co/668x364",
  "https://placehold.co/668x364/0a9863/ffffff",
  "https://placehold.co/668x364/f8f4f0/110d31",
];

const PRODUCT_SPECS = [
  { label: "Kisaran Harga", value: "Sekitar Rp60.000–65.000/kg" },
  { label: "Kemasan", value: "25 kg" },
  { label: "Pemakaian", value: "Sekitar 0,5 kg/m2" },
  { label: "Pengencer", value: "Air / Solvent Khusus" },
  { label: "Aplikasi", value: "Bisa spray, roller, atau kuas" },
];

const SUITABLE_FOR = [
  {
    title: "Proyek Pemerintah & BUMN:",
    description:
      "Sangat direkomendasikan untuk pelaksanaan dan pengadaan proyek Pemerintah, BUMN, dan BUMD yang mewajibkan penggunaan produk dengan sertifikat TKDN resmi.",
  },
  {
    title: "Area Zona Khusus:",
    description:
      "Ideal untuk area jalan yang membutuhkan marka visual dengan warna khusus (merah atau hijau) seperti Zona Selamat Sekolah (ZoSS) atau jalur khusus pesepeda.",
  },
  {
    title: "Jalan Bebas Tumpahan Bahan Bakar:",
    description:
      "Sangat cocok diaplikasikan pada permukaan jalan dan fasilitas yang minim risiko tumpahan bensin secara langsung.",
  },
];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isProsHovered, setIsProsHovered] = useState(false);
  const [isConsHovered, setIsConsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Sticky Navbar */}
      <Navbar variant="auto" />

      {/* Main Content Container */}
      <main className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col justify-start items-start gap-3">
        {/* Breadcrumb Row */}
        <nav
          aria-label="Breadcrumb"
          className="w-full flex items-center gap-2 text-sm font-sans flex-wrap"
        >
          <Link
            href="/"
            className="text-dark/60 hover:text-g1 font-normal transition-colors"
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
            className="text-dark/60 hover:text-g1 font-normal transition-colors"
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
            Detail Produk
          </span>
        </nav>

        {/* 2-Column Product Content Layout */}
        <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-10">
          {/* Left Column: Product Information & Specifications */}
          <div className="flex-1 min-w-0 flex flex-col justify-start items-start gap-8">
            {/* Image Gallery with Main View and Thumbnails */}
            <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-3">
              {/* Main Active Image */}
              <div className="flex-1 w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-brand-background border border-gray-100">
                <img
                  className="w-full h-full object-cover transition-all duration-300"
                  src={GALLERY_IMAGES[selectedImageIndex]}
                  alt="Product preview"
                />
              </div>

              {/* Vertical Thumbnail List (Centered vertically in the middle) */}
              <div className="flex sm:flex-col items-center justify-center gap-3 shrink-0 self-center">
                {GALLERY_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`size-20 rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer ${
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

            {/* Section 1: Product Description */}
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                DESKRIPSI PRODUK
              </span>
              <p className="w-full text-dark text-sm sm:text-base font-normal font-sans leading-relaxed text-justify">
                Cat Coldplastic Merk DPS adalah cat marka jalan berbasis pelarut
                (solvent based) berkualitas tinggi. Diproduksi oleh PT. Dua
                Putra Srikandi, produk ini telah mengantongi Sertifikat Tingkat
                Komponen Dalam Negeri (TKDN) dari Kementerian Perindustrian dan
                telah melalui serangkaian uji laboratorium di Balai Besar
                Standardisasi dan Pelayanan Jasa Industri.
              </p>
            </div>

            {/* Section 2: Product Suitable For */}
            <section
              aria-label="Produk Ini Cocok Untuk"
              className="w-full flex flex-col md:flex-row justify-start items-start gap-6"
            >
              <img
                className="w-full md:w-72 h-44 rounded-2xl object-cover shrink-0"
                src="https://placehold.co/300x164"
                alt="Penggunaan produk"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-start items-start gap-2">
                <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                  PRODUK INI COCOK UNTUK?
                </span>
                <ul className="w-full list-disc list-outside pl-4 text-dark text-sm font-normal font-sans leading-relaxed space-y-3">
                  {SUITABLE_FOR.map((item, idx) => (
                    <li key={idx} className="pl-1">
                      <span className="font-semibold text-dark block">
                        {item.title}
                      </span>
                      <p className="text-dark/80 text-justify mt-0.5">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 3: Pros & Cons */}
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                KELEBIHAN & KEKURANGAN PRODUK
              </span>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pros Card (Lime/Green tint) */}
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

                  {/* Pro Item 1 */}
                  <div
                    id="pro-item-1"
                    className="w-full flex items-start gap-2.5"
                  >
                    <div className="shrink-0 mt-0.5">
                      <LordIcon
                        name="CheckCircle"
                        size={18}
                        primaryColor="#56C439"
                        trigger="hover"
                        target="#pro-item-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <span className="text-dark text-sm font-semibold font-sans">
                        Tersertifikasi TKDN:
                      </span>
                      <p className="text-dark/80 text-sm font-normal font-sans leading-relaxed text-justify">
                        Memiliki nilai TKDN sebesar 30,30% hingga 31,01%, sehingga
                        sangat mendukung program Peningkatan Penggunaan Produk
                        Dalam Negeri (P3DN).
                      </p>
                    </div>
                  </div>

                  {/* Pro Item 2 */}
                  <div
                    id="pro-item-2"
                    className="w-full flex items-start gap-2.5"
                  >
                    <div className="shrink-0 mt-0.5">
                      <LordIcon
                        name="CheckCircle"
                        size={18}
                        primaryColor="#56C439"
                        trigger="hover"
                        target="#pro-item-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <span className="text-dark text-sm font-semibold font-sans">
                        Tahan Tumpahan Oli:
                      </span>
                      <p className="text-dark/80 text-sm font-normal font-sans leading-relaxed text-justify">
                        Berdasarkan hasil uji spot test selama 24 jam, cat ini
                        terbukti tahan dan tidak mengalami perubahan saat terkena
                        oli.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cons Card (Red tint) */}
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

                  {/* Con Item 1 */}
                  <div
                    id="con-item-1"
                    className="w-full flex items-start gap-2.5"
                  >
                    <div className="shrink-0 mt-0.5">
                      <LordIcon
                        name="CrossCircle"
                        size={18}
                        primaryColor="#F84A4A"
                        trigger="hover"
                        target="#con-item-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <span className="text-dark text-sm font-semibold font-sans">
                        Rentan Terhadap Bensin:
                      </span>
                      <p className="text-dark/80 text-sm font-normal font-sans leading-relaxed text-justify">
                        Cat ini memiliki ketahanan yang rendah terhadap bensin.
                        Berdasarkan hasil uji laboratorium, paparan bensin dapat
                        menyebabkan cat terlarut, retak, atau mengerut.
                      </p>
                    </div>
                  </div>

                  {/* Con Item 2 */}
                  <div
                    id="con-item-2"
                    className="w-full flex items-start gap-2.5"
                  >
                    <div className="shrink-0 mt-0.5">
                      <LordIcon
                        name="CrossCircle"
                        size={18}
                        primaryColor="#F84A4A"
                        trigger="hover"
                        target="#con-item-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <span className="text-dark text-sm font-semibold font-sans">
                        Sensitif Terhadap Cairan Alkali:
                      </span>
                      <p className="text-dark/80 text-sm font-normal font-sans leading-relaxed text-justify">
                        Terpapar cairan Alkali (NaOH 10%) selama 48 jam dapat
                        menyebabkan terjadinya perubahan warna, khususnya pada
                        varian warna Putih dan Hijau.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar (Product Specs + Sticky CTA) */}
          <aside className="w-full lg:w-96 flex flex-col justify-start items-start gap-6 shrink-0 self-stretch">
            {/* Card 1: Product Specifications Summary (Flows normally) */}
            <div className="w-full p-6 bg-brand-background rounded-3xl flex flex-col justify-start items-start gap-3">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                NAMA PRODUK
              </span>
              <h1 className="text-dark text-xl sm:text-2xl font-bold font-sans leading-snug">
                Cat Coldplastic Merk DPS (MMA Coldplastic Paint)
              </h1>
              <div>
                <Badge text="Bahan Marka Jalan" variant="amber" />
              </div>

              <div className="w-full h-px bg-dark/10 my-1" />

              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                DETAIL PRODUK
              </span>

              <ul className="w-full list-disc list-outside pl-4 text-sm font-sans space-y-2 pt-1">
                {PRODUCT_SPECS.map((spec, idx) => (
                  <li key={idx} className="pl-1 text-dark/80 font-normal">
                    <span className="font-semibold text-dark">
                      {spec.label}:
                    </span>{" "}
                    {spec.value}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Sales CTA Card (Sticky at top: 112px, 72px Wheelbarrow on top-left, G1 outline on hover) */}
            <div
              data-hover-target="true"
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              style={{
                position: "sticky",
                top: "112px",
                border: isCtaHovered
                  ? "1.5px solid var(--g1, #0A9863)"
                  : "1.5px solid transparent",
              }}
              className="w-full p-6 bg-brand-background rounded-3xl flex flex-col justify-start items-start gap-4 text-left transition-all duration-200 select-none group"
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
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="flex flex-col justify-start items-start gap-1">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                PRODUK LAINNYA
              </span>
              <h2 className="text-dark text-2xl sm:text-3xl font-bold font-sans">
                Jelajahi Produk Lainnya
              </h2>
            </div>

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

          {/* 4 Related Product Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {RELATED_PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                imageSrc={prod.imageSrc}
                category={prod.category}
                categoryVariant={prod.categoryVariant}
                title={prod.title}
                href={prod.href}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
