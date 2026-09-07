"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ServiceCard from "@/components/card/serviceCard";
import Badge, { type BadgeVariant } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Accordion from "@/components/ui/accordion";
import LordIcon from "@/components/common/lordIcon";
import EmptyState from "@/components/common/emptyState";
import { getServiceById, getServices, getServiceSlug } from "@/api/services";
import { getProductsByIds, getProductSlug } from "@/api/products";
import type { Service, ServiceAdvantageItem, ServiceFaqItem } from "@/types/database";

interface RelatedService {
  id: string | number;
  imageSrc: string;
  category: string;
  categoryVariant: BadgeVariant;
  title: string;
  href: string;
}

interface UsedMaterial {
  id: string | number;
  title: string;
  category: string;
  categoryVariant: BadgeVariant;
  imageSrc: string;
  href: string;
}

interface ProjectStep {
  step: number;
  title: string;
  desc: string;
  icon: string;
}

function getCategoryVariant(category?: string | null): BadgeVariant {
  if (!category) return "green";
  const cat = category.toLowerCase();
  if (cat.includes("marka") || cat.includes("bahan") || cat.includes("material")) return "amber";
  if (cat.includes("keselamatan") || cat.includes("penghargaan") || cat.includes("pencapaian")) return "pink";
  if (cat.includes("perlengkapan") || cat.includes("lalu lintas") || cat.includes("rambu")) return "blue";
  if (cat.includes("mesin") || cat.includes("peralatan") || cat.includes("elektrikal")) return "gray";
  return "green";
}

const PROJECT_STEPS: ProjectStep[] = [
  {
    step: 1,
    title: "Konsultasi Awal",
    desc: "Diskusi kebutuhan, spesifikasi teknis, dan target waktu proyek.",
    icon: "phone-question",
  },
  {
    step: 2,
    title: "Survei Lokasi",
    desc: "Peninjauan lapangan untuk pengukuran dan pemetaan area kerja.",
    icon: "road-navigation",
  },
  {
    step: 3,
    title: "Penawaran & Kontrak",
    desc: "Pengajuan estimasi biaya (RAB) dan penandatanganan kesepakatan kerja.",
    icon: "signature",
  },
  {
    step: 4,
    title: "Pelaksanaan Proyek",
    desc: "Eksekusi pengerjaan oleh tenaga ahli sesuai standar mutu dan K3.",
    icon: "brush-alt",
  },
  {
    step: 5,
    title: "Serah Terima",
    desc: "Inspeksi kualitas hasil akhir dan penyerahan proyek kepada klien.",
    icon: "handshake",
  },
];

const DEFAULT_GALLERY = [
  "https://placehold.co/668x364",
  "https://placehold.co/668x364/0a9863/ffffff",
  "https://placehold.co/668x364/f8f4f0/110d31",
];

function ProjectStepCard({ step }: { step: ProjectStep }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardId = `project-step-${step.step}`;

  return (
    <div
      id={cardId}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hover-target="true"
      style={{
        border: isHovered
          ? "1.5px solid var(--g1, #0A9863)"
          : "1.5px solid transparent",
      }}
      className="p-5 sm:p-6 bg-brand-background rounded-3xl flex flex-col justify-between items-start gap-4 transition-all duration-200 select-none cursor-pointer group"
    >
      {/* Top Row: Icon & Step Number Badge */}
      <div className="w-full flex justify-between items-start">
        <div className="size-12 sm:size-14 shrink-0 flex items-center justify-start">
          <LordIcon
            name={step.icon}
            size={48}
            primaryColor="#0A9863"
            trigger="hover"
            target={`#${cardId}`}
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
  );
}

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [service, setService] = useState<Service | null>(null);
  const [usedMaterials, setUsedMaterials] = useState<UsedMaterial[]>([]);
  const [relatedServices, setRelatedServices] = useState<RelatedService[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedFaqId, setExpandedFaqId] = useState<number | string | null>(1);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isAdvHovered, setIsAdvHovered] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getServiceById(resolvedParams.id);
      setService(data);

      if (data?.product_id && data.product_id.length > 0) {
        const materialsData = await getProductsByIds(data.product_id);
        const mappedMaterials: UsedMaterial[] = materialsData.map((m) => ({
          id: m.id,
          title: m.title,
          category: m.category || "Bahan Marka Jalan",
          categoryVariant: getCategoryVariant(m.category),
          imageSrc:
            m.highlight_img_url ||
            (m.product_image_url && m.product_image_url[0]) ||
            "https://placehold.co/160x87",
          href: `/produk/${getProductSlug(m, materialsData)}`,
        }));
        setUsedMaterials(mappedMaterials);
      } else {
        setUsedMaterials([]);
      }

      const all = await getServices();
      const filtered = all
        .filter((s) => s.id !== data?.id && s.id !== resolvedParams.id)
        .slice(0, 4)
        .map((s) => ({
          id: s.id,
          imageSrc:
            (s.service_image_url && s.service_image_url[0]) ||
            "https://placehold.co/320x160",
          category: s.category || "Layanan",
          categoryVariant: getCategoryVariant(s.category),
          title: s.title,
          href: `/layanan/${getServiceSlug(s, all)}`,
        }));
      setRelatedServices(filtered);
      setLoading(false);
    }
    loadData();
  }, [resolvedParams.id]);

  const galleryImages =
    service?.service_image_url && service.service_image_url.length > 0
      ? service.service_image_url
      : DEFAULT_GALLERY;

  const advantagesList: Array<{ title: string; desc: string }> = [];
  if (Array.isArray(service?.keunggulan)) {
    service.keunggulan.forEach((item: ServiceAdvantageItem | string) => {
      if (typeof item === "string") {
        advantagesList.push({ title: item, desc: "" });
      } else if (item && typeof item === "object") {
        advantagesList.push({
          title: item.title || "",
          desc: item.value || item.desc || "",
        });
      }
    });
  }

  const faqItems: Array<{ id: number | string; question: string; answer: string }> = [];
  if (Array.isArray(service?.faq)) {
    service.faq.forEach((item: ServiceFaqItem, idx) => {
      faqItems.push({
        id: item.id !== undefined ? item.id : idx + 1,
        question: item.question || "",
        answer: item.answer || "",
      });
    });
  }

  if (!loading && !service) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        <Navbar variant="auto" />
        <main className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto pt-32 pb-16 flex flex-col items-center gap-6">
          <EmptyState
            iconName="StorageBox"
            text="Layanan yang Anda cari tidak ditemukan atau telah dihapus."
          />
          <Link href="/layanan">
            <Button
              type="button"
              text="Kembali ke Katalog Layanan"
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
      <Navbar variant="auto" />

      {/* Main Content Container */}
      <main className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col justify-start items-start gap-[12px]">
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
            href="/layanan"
            className="breadcrumb-link inline-flex items-center"
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
            {service?.title || "Detail Layanan"}
          </span>
        </nav>

        {/* 2-Column Service Content Layout on min-[1200px]+, reordered gracefully on < 1200px */}
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
                  alt={service?.title || "Service preview"}
                />
              </div>

              {/* Vertical Thumbnail List (Centered vertically in the middle, compact on mobile) */}
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

            {/* 4. Section: Service Description (order-4 on < 1200px, after Specs & CTA) */}
            <div className="order-4 w-full flex flex-col justify-start items-start gap-2">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                DESKRIPSI LAYANAN
              </span>
              <p className="w-full text-dark text-sm sm:text-base font-normal font-sans leading-relaxed text-justify">
                {service?.title} dari PT. Dua Putra Srikandi adalah solusi
                profesional untuk kebutuhan infrastruktur lalu lintas yang aman
                dan tertib. Dikerjakan oleh tenaga ahli tersertifikasi dengan
                menggunakan mesin modern dan material berstandar, kami
                memastikan setiap hasil pengerjaan presisi, memiliki daya tahan
                tinggi, dan optimal.
              </p>
            </div>

            {/* 5. Section: Service Key Advantages (order-5) */}
            {advantagesList.length > 0 && (
              <div className="order-5 w-full flex flex-col justify-start items-start gap-2">
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

                  {advantagesList.map((adv, idx) => (
                    <div
                      key={idx}
                      id={`adv-point-${idx + 1}`}
                      className="w-full flex items-start gap-3"
                    >
                      <div className="shrink-0 mt-0.5">
                        <LordIcon
                          name="CheckCircle"
                          size={18}
                          primaryColor="#56C439"
                          trigger="hover"
                          target={`#adv-point-${idx + 1}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <span className="text-dark text-sm font-semibold font-sans">
                          {adv.title}:
                        </span>
                        {adv.desc && (
                          <p className="text-dark/80 text-sm font-normal font-sans leading-relaxed text-justify">
                            {adv.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Section: Material & Equipment Used (order-6) */}
            {usedMaterials.length > 0 && (
              <div className="order-6 w-full flex flex-col justify-start items-start gap-3">
                <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                  MATERIAL & PERALATAN YANG DIGUNAKAN
                </span>

                <div className="w-full flex flex-col gap-3">
                  {usedMaterials.map((material) => (
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

                      <div className="hidden min-[720px]:block shrink-0 self-center">
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
            )}

            {/* 7. Section: Frequently Asked Questions (FAQ, order-7) */}
            {faqItems.length > 0 && (
              <div className="order-7 w-full flex flex-col justify-start items-start gap-3">
                <div className="text-dark/60 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                  FREQUENTLY ASKED QUESTION (
                  <span className="font-bold text-dark/80">FAQ</span>)
                </div>

                <Accordion
                  items={faqItems}
                  activeId={expandedFaqId as number | null}
                  onToggle={(id) =>
                    setExpandedFaqId(expandedFaqId === id ? null : id)
                  }
                />
              </div>
            )}
          </div>

          {/* Right Column Group: Sidebar (NAMA LAYANAN & CTA Section) */}
          <aside className="contents min-[1200px]:flex min-[1200px]:flex-col min-[1200px]:w-96 min-[1200px]:justify-start min-[1200px]:items-start min-[1200px]:gap-6 min-[1200px]:shrink-0 min-[1200px]:self-stretch">
            {/* 2. Card: Service Details Summary */}
            <div className="order-2 w-full p-6 bg-brand-background rounded-3xl flex flex-col justify-start items-start gap-3">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                NAMA LAYANAN
              </span>
              <h1 className="text-dark text-xl sm:text-2xl font-bold font-sans leading-snug">
                {service?.title || "Nama Layanan"}
              </h1>
              <div>
                <Badge
                  text={service?.category || "Layanan"}
                  variant={getCategoryVariant(service?.category)}
                />
              </div>
              <div className="w-full h-px bg-dark/10 my-1" />
            </div>

            {/* 3. Card: Sales CTA Card */}
            <div
              data-hover-target="true"
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              style={{
                border: isCtaHovered
                  ? "1.5px solid var(--g1, #0A9863)"
                  : "1.5px solid transparent",
              }}
              className="order-3 w-full p-6 bg-brand-background rounded-3xl flex flex-col justify-start items-start gap-4 text-left transition-all duration-200 select-none group min-[1200px]:sticky min-[1200px]:top-28"
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

        {/* Section: Tahapan Pelaksanaan Proyek Kami */}
        <section
          aria-label="Tahapan Pelaksanaan Proyek Kami"
          className="w-full flex flex-col justify-start items-start gap-4 pt-4 pb-2"
        >
          <span className="text-dark/60 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
            TAHAPAN PELAKSANAAN PROYEK KAMI
          </span>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 xl:gap-5">
            {PROJECT_STEPS.map((step) => (
              <ProjectStepCard key={step.step} step={step} />
            ))}
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-px bg-g1/10 my-4" />

        {/* Bottom Section: Related Services */}
        <section aria-label="Related Services" className="w-full flex flex-col gap-6">
          <div className="w-full flex justify-between items-end gap-4">
            <div className="flex flex-col justify-start items-start gap-1">
              <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
                LAYANAN LAINNYA
              </span>
              <h2 className="text-dark text-2xl sm:text-3xl font-bold font-sans">
                Jelajahi Layanan Lainnya
              </h2>
            </div>

            {/* Desktop (>= 720px) Button in header */}
            <div className="hidden min-[720px]:block">
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
          </div>

          {/* 4 Related Service Cards or Empty State */}
          {relatedServices.length > 0 ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch justify-items-center">
              {relatedServices.map((srv) => (
                <ServiceCard
                  key={srv.id}
                  imageSrc={srv.imageSrc}
                  category={srv.category}
                  categoryVariant={srv.categoryVariant}
                  title={srv.title}
                  href={srv.href}
                  className="max-w-md sm:max-w-none w-full"
                />
              ))}
            </div>
          ) : (
            <EmptyState
              iconName="StorageBox"
              text="Belum ada layanan terkait yang ditampilkan saat ini."
            />
          )}

          {/* Mobile (< 720px) Button under the 4 cards (only if services exist) */}
          {relatedServices.length > 0 && (
            <div className="w-full flex justify-center min-[720px]:hidden pt-2">
              <Link href="/layanan" className="w-full max-w-md">
                <Button
                  type="button"
                  text="Lihat Layanan Lainnya"
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
