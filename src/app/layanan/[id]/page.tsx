"use client";

import { use, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ServiceCard from "@/components/card/serviceCard";
import Badge, { type BadgeVariant } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Accordion from "@/components/ui/accordion";
import LordIcon from "@/components/common/lordIcon";

interface RelatedService {
  id: number;
  imageSrc: string;
  category: string;
  categoryVariant: BadgeVariant;
  title: string;
  href: string;
}

interface ProjectStep {
  step: number;
  title: string;
  desc: string;
  icon: string;
}

const PROJECT_STEPS: ProjectStep[] = [
  {
    step: 1,
    title: "Konsultasi Awal",
    desc: "Diskusi kebutuhan, spesifikasi teknis, dan target waktu proyek.",
    icon: "Phone",
  },
  {
    step: 2,
    title: "Survei Lokasi",
    desc: "Peninjauan lapangan untuk pengukuran dan pemetaan area kerja.",
    icon: "Location",
  },
  {
    step: 3,
    title: "Penawaran & Kontrak",
    desc: "Pengajuan estimasi biaya (RAB) dan penandatanganan kesepakatan kerja.",
    icon: "Edit",
  },
  {
    step: 4,
    title: "Pelaksanaan Proyek",
    desc: "Eksekusi pengerjaan oleh tenaga ahli sesuai standar mutu dan K3.",
    icon: "Wheelbarrow",
  },
  {
    step: 5,
    title: "Serah Terima",
    desc: "Inspeksi kualitas hasil akhir dan penyerahan proyek kepada klien.",
    icon: "CheckCircle",
  },
];

const RELATED_SERVICES: RelatedService[] = [
  {
    id: 1,
    imageSrc: "https://placehold.co/246x134",
    category: "Penerangan Jalan",
    categoryVariant: "sky",
    title: "Pemasangan PJU (Penerangan Jalan Umum)",
    href: "/layanan/pju",
  },
  {
    id: 2,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas Keselamatan Jalan",
    categoryVariant: "green",
    title: "Pemasangan Guardrail",
    href: "/layanan/guardrail",
  },
  {
    id: 3,
    imageSrc: "https://placehold.co/246x134",
    category: "Rambu Lalu Lintas",
    categoryVariant: "pink",
    title: "Pemasangan Rambu Lalu Lintas & RPPJ",
    href: "/layanan/rambu-lalu-lintas",
  },
  {
    id: 4,
    imageSrc: "https://placehold.co/246x134",
    category: "Fasilitas Keselamatan Jalan",
    categoryVariant: "green",
    title: "Pemasangan Paku Marka",
    href: "/layanan/paku-marka",
  },
];

const GALLERY_IMAGES = [
  "https://placehold.co/668x364",
  "https://placehold.co/668x364/0a9863/ffffff",
  "https://placehold.co/668x364/f8f4f0/110d31",
];

const USED_MATERIALS = [
  {
    id: 1,
    title: "Coldplastic Merk DPS (MMA Coldplastic Paint)",
    category: "Bahan Marka Jalan",
    categoryVariant: "amber" as BadgeVariant,
    imageSrc: "https://placehold.co/160x87",
    href: "/produk/coldplastic-dps",
  },
  {
    id: 2,
    title: "Cat Thermoplastik (AASHTO M-249)",
    category: "Bahan Marka Jalan",
    categoryVariant: "amber" as BadgeVariant,
    imageSrc: "https://placehold.co/160x87",
    href: "/produk/cat-thermoplastik",
  },
];

const FAQ_ITEMS = [
  {
    id: 1,
    question:
      "Apakah PT. Dua Putra Srikandi melayani warna marka selain putih dan kuning?",
    answer:
      "Ya, selain putih dan kuning, kami juga melayani aplikasi pengecatan khusus seperti warna merah untuk Zona Selamat Sekolah (ZoSS) atau hijau untuk jalur khusus pesepeda, menggunakan material Thermoplastic maupun Coldplastic.",
  },
  {
    id: 2,
    question: "Bagaimana proses penghapusan marka jalan lama dilakukan?",
    answer:
      "Penghapusan marka jalan lama dilakukan menggunakan mesin cold milling / road marking removal khusus yang presisi, sehingga cat lama terhapus bersih tanpa merusak struktur permukaan aspal atau beton.",
  },
  {
    id: 3,
    question: "Siapa saja klien yang dapat dilayani oleh jasa ini?",
    answer:
      "Kami melayani instansi pemerintah (Kementerian PUPR, Dinas Perhubungan), BUMN pengelola jalan tol, kontraktor utama jalan raya, pengelola kawasan industri, hingga pengelola gedung swasta dan perumahan.",
  },
];

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(1);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isAdvHovered, setIsAdvHovered] = useState(false);

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
            href="/layanan"
            className="text-dark/60 hover:text-g1 font-normal transition-colors"
          >
            Layanan
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
            Detail Layanan
          </span>
        </nav>

        {/* 2-Column Service Content Layout */}
        <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-10">
          {/* Left Column: Service Details & Interactive Sections */}
          <div className="flex-1 min-w-0 flex flex-col justify-start items-start gap-8">
            {/* Image Gallery with Main View and Thumbnails */}
            <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-3">
              {/* Main Active Image */}
              <div className="flex-1 w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-brand-background border border-gray-100">
                <img
                  className="w-full h-full object-cover transition-all duration-300"
                  src={GALLERY_IMAGES[selectedImageIndex]}
                  alt="Service preview"
                />
              </div>

              {/* Vertical Thumbnail List (Centered vertically in the middle) */}
              <div className="flex sm:flex-col items-center justify-center gap-3 shrink-0 self-center">
                {GALLERY_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`size-20 rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer ${selectedImageIndex === idx
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

            {/* Section 1: Service Description */}
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                DESKRIPSI LAYANAN
              </span>
              <p className="w-full text-dark text-sm sm:text-base font-normal font-sans leading-relaxed text-justify">
                Layanan Jasa Pengecatan & Penghapusan Marka Jalan dari PT. Dua
                Putra Srikandi adalah solusi profesional untuk kebutuhan
                infrastruktur lalu lintas yang aman dan tertib. Kami melayani
                aplikasi marka jalan baru, pengecatan ulang (re-marking),
                pengecatan Zona Selamat Sekolah (ZoSS), hingga penghapusan marka
                jalan yang sudah pudar atau tidak relevan. Dikerjakan oleh
                tenaga ahli tersertifikasi dengan menggunakan mesin marka
                modern, kami memastikan setiap garis marka presisi, memiliki daya
                pantul (reflektif) yang optimal, dan tahan lama.
              </p>
            </div>

            {/* Section 2: Service Key Advantages */}
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                KEUNGGULAN LAYANAN INI
              </span>

              <div
                id="card-advantages"
                onMouseEnter={() => setIsAdvHovered(true)}
                onMouseLeave={() => setIsAdvHovered(false)}
                style={{
                  border: isAdvHovered
                    ? "1.5px solid var(--g1, #0A9863)"
                    : "1.5px solid #e5e7eb",
                }}
                className="w-full p-6 bg-white rounded-3xl flex flex-col justify-start items-start gap-4 transition-all duration-200 select-none"
              >
                <div className="self-stretch w-full flex justify-between items-center pb-4 mb-2 border-b border-[#e5e7eb]">
                  <span className="text-dark text-sm font-semibold font-sans">
                    Keunggulan Yang Dapat Kami Tawarkan
                  </span>
                  <div className="ml-auto shrink-0 flex items-center justify-end">
                    <LordIcon
                      name="CheckCircle"
                      size={20}
                      primaryColor="#56C439"
                      trigger="hover"
                      target="#card-advantages"
                    />
                  </div>
                </div>

                {/* Point 1 */}
                <div id="adv-point-1" className="w-full flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    <LordIcon
                      name="CheckCircle"
                      size={18}
                      primaryColor="#56C439"
                      trigger="hover"
                      target="#adv-point-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span className="text-dark text-sm font-semibold font-sans">
                      Berstandar & Tersertifikasi:
                    </span>
                    <p className="text-dark/80 text-sm font-normal font-sans leading-relaxed text-justify">
                      Menggunakan material yang telah memiliki sertifikat Tingkat
                      Komponen Dalam Negeri (TKDN) dari Kementerian Perindustrian
                      serta Standar Nasional Indonesia.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div id="adv-point-2" className="w-full flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    <LordIcon
                      name="CheckCircle"
                      size={18}
                      primaryColor="#56C439"
                      trigger="hover"
                      target="#adv-point-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span className="text-dark text-sm font-semibold font-sans">
                      Pengalaman Teruji:
                    </span>
                    <p className="text-dark/80 text-sm font-normal font-sans leading-relaxed text-justify">
                      Rekam jejak terbukti dalam menangani berbagai proyek skala
                      besar, termasuk di jalan tol (seperti Tol Cipali dan JORR II)
                      hingga jalan daerah lintas provinsi.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div id="adv-point-3" className="w-full flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    <LordIcon
                      name="CheckCircle"
                      size={18}
                      primaryColor="#56C439"
                      trigger="hover"
                      target="#adv-point-3"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span className="text-dark text-sm font-semibold font-sans">
                      Jaminan Mutu & K3:
                    </span>
                    <p className="text-dark/80 text-sm font-normal font-sans leading-relaxed text-justify">
                      Manajemen operasional diawasi ketat dan memegang sertifikasi
                      ISO 9001:2015 (Manajemen Mutu) dan ISO 45001:2018
                      (Manajemen K3), menjamin hasil akhir yang maksimal tanpa
                      mengabaikan keselamatan kerja.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Material & Equipment Used */}
            <div className="w-full flex flex-col justify-start items-start gap-3">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                MATERIAL & PERALATAN YANG DIGUNAKAN
              </span>

              <div className="w-full flex flex-col gap-3">
                {USED_MATERIALS.map((material) => (
                  <Link
                    key={material.id}
                    id={`material-card-${material.id}`}
                    href={material.href}
                    className="group w-full p-3 bg-white rounded-3xl border-[1.5px] border-[#e5e7eb] hover:border-g1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-200 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <img
                        className="w-28 sm:w-40 h-16 sm:h-20 rounded-2xl object-cover shrink-0"
                        src={material.imageSrc}
                        alt={material.title}
                      />
                      <div className="flex flex-col justify-start items-start gap-1 min-w-0">
                        <Badge
                          text={material.category}
                          variant={material.categoryVariant}
                        />
                        <h4 className="text-dark text-sm sm:text-base font-bold font-sans line-clamp-2">
                          {material.title}
                        </h4>
                      </div>
                    </div>

                    <div className="shrink-0 self-end sm:self-center">
                      <span className="btn-custom btn-variant-ghost-green h-12 px-4 py-3 rounded-[48px] inline-flex items-center gap-2 text-sm font-semibold font-sans">
                        <span>Lihat Produk</span>
                        <span className="size-6 shrink-0 flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:translate-x-1.5">
                          <LordIcon
                            name="Right 1"
                            size={22}
                            trigger="hover"
                            target={`#material-card-${material.id}`}
                            primaryColor="#0A9863"
                            secondaryColor="#0A9863"
                          />
                        </span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Section 4: Frequently Asked Questions (FAQ) */}
            <div className="w-full flex flex-col justify-start items-start gap-3">
              <div className="text-dark/60 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                FREQUENTLY ASKED QUESTION (
                <span className="font-bold text-dark/80">FAQ</span>)
              </div>

              <Accordion
                items={FAQ_ITEMS}
                activeId={expandedFaqId}
                onToggle={(id) =>
                  setExpandedFaqId(expandedFaqId === id ? null : (id as number))
                }
              />
            </div>
          </div>

          {/* Right Column: Sidebar (Service Name + Sticky Sales CTA) */}
          <aside className="w-full lg:w-96 flex flex-col justify-start items-start gap-6 shrink-0 self-stretch">
            {/* Card 1: Service Details Summary */}
            <div className="w-full p-6 bg-brand-background rounded-3xl flex flex-col justify-start items-start gap-3">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                NAMA LAYANAN
              </span>
              <h1 className="text-dark text-xl sm:text-2xl font-bold font-sans leading-snug">
                Jasa Pengecatan & Penghapusan Marka Jalan
              </h1>
              <div>
                <Badge text="Marka Jalan" variant="amber" />
              </div>
              <div className="w-full h-px bg-dark/10 my-1" />
            </div>

            {/* Card 2: Sales CTA Card (Sticky at top: 112px, 72px icon on top-left, G1 outline on hover) */}
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
                  name="Wheelbarrow"
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

        {/* Section: Tahapan Pelaksanaan Proyek Dengan Kami */}
        <section
          aria-label="Tahapan Pelaksanaan Proyek Dengan Kami"
          className="w-full flex flex-col justify-start items-start gap-4 pt-4 pb-2"
        >
          <span className="text-dark/60 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
            TAHAPAN PELAKSANAAN PROYEK DENGAN KAMI
          </span>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 xl:gap-5">
            {PROJECT_STEPS.map((step) => (
              <div
                key={step.step}
                id={`project-step-${step.step}`}
                className="p-5 sm:p-6 bg-brand-background rounded-3xl flex flex-col justify-between items-start gap-4 border border-transparent hover:border-g1 transition-all duration-200 select-none group"
              >
                {/* Top Row: Icon & Step Number Badge */}
                <div className="w-full flex justify-between items-start">
                  <div className="size-12 sm:size-14 shrink-0 flex items-center justify-start">
                    <LordIcon
                      name={step.icon}
                      size={44}
                      primaryColor="#0A9863"
                      trigger="hover"
                      target={`#project-step-${step.step}`}
                    />
                  </div>
                  <div className="size-8 rounded-full bg-g1 flex items-center justify-center shrink-0 shadow-xs">
                    <span className="text-white text-sm font-bold font-sans">
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Bottom Content: Title & Description */}
                <div className="w-full flex flex-col justify-start items-start gap-1">
                  <h4 className="text-g1 text-sm sm:text-base font-bold font-sans">
                    {step.title}
                  </h4>
                  <p className="text-dark/80 text-xs font-normal font-sans leading-relaxed text-justify">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-px bg-g1/10 my-4" />

        {/* Bottom Section: Related Services */}
        <section aria-label="Related Services" className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="flex flex-col justify-start items-start gap-1">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                LAYANAN LAINNYA
              </span>
              <h2 className="text-dark text-2xl sm:text-3xl font-bold font-sans">
                Jelajahi Layanan Lainnya
              </h2>
            </div>

            <Link href="/layanan">
              <Button
                type="button"
                text="Lihat Layanan Lainnya"
                variant="unique-stroke"
                rightIcon="Right 1"
                className="cursor-pointer shadow-none [&_.pill-segment]:shadow-none"
              />
            </Link>
          </div>

          {/* 4 Related Service Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {RELATED_SERVICES.map((srv) => (
              <ServiceCard
                key={srv.id}
                imageSrc={srv.imageSrc}
                category={srv.category}
                categoryVariant={srv.categoryVariant}
                title={srv.title}
                href={srv.href}
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
