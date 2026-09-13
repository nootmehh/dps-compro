"use client";

import { useState, useEffect, useMemo } from "react";
import TestimonialCard from "../card/testimonialCard";
import { getSiteContent, type TestimonialItem as ApiTestimonialItem } from "@/api/siteContent";

export interface TestimonialItem {
  id?: string | number;
  name: string;
  role?: string;
  company?: string;
  content?: string;
  quote?: string;
  avatarSrc?: string;
  avatar_url?: string;
}

export interface TestimonialProps {
  tagline?: string;
  title?: string;
  testimonials?: (TestimonialItem | ApiTestimonialItem)[];
  className?: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testi-1789194578757",
    name: "Ir. Bambang Suryanto, M.T.",
    role: "Kepala Bidang Pemeliharaan Jalan",
    company: "Dinas PUPR",
    content:
      "Kami sudah beberapa kali menggunakan jasa pengecatan marka jalan dari PT Dua Putra Srikandi untuk proyek revitalisasi jalan protokol di wilayah kami. Hasil pengerjaannya rapi, presisi, dan daya tahan cat thermoplastiknya sangat baik meski dilalui kendaraan berat setiap hari. Tim mereka juga selalu tepat waktu sesuai jadwal yang disepakati",
  },
  {
    id: "testi-1789194641817",
    name: "Hendra Wijaya",
    role: "Manajer Proyek",
    company: "",
    content:
      "Sebagai kontraktor yang sering menangani proyek jalan tol dan kawasan industri, kami butuh mitra yang bisa diandalkan untuk kebutuhan perlengkapan jalan. Dua Putra Srikandi selalu memberikan produk berkualitas, mulai dari deliniator, guardrail, hingga rambu lalu lintas, dengan harga yang kompetitif dan pengiriman yang konsisten",
  },
  {
    id: "testi-1789194666908",
    name: "Siti Nurhaliza",
    role: "Facility Manager",
    company: "",
    content:
      "Kami mempercayakan pemasangan wheel stopper, speed bump, dan paku marka jalan di area kawasan industri kami kepada PT Dua Putra Srikandi. Prosesnya cepat, hasilnya kokoh, dan tim mereka sangat responsif terhadap kebutuhan tambahan di lapangan. Sangat direkomendasikan untuk kebutuhan perlengkapan jalan skala besar.",
  },
  {
    id: "testi-1789194687560",
    name: "Agus Setiawan",
    role: "Site Engineer",
    company: "",
    content:
      "Kualitas cat coldplastic dan glass beads dari DPS terbukti tahan lama meski terkena hujan dan panas ekstrem di lokasi proyek kami. Selain produknya bagus, tim teknis mereka juga membantu memberikan rekomendasi spesifikasi yang tepat sesuai kondisi jalan kami.",
  },
  {
    id: "testi-1789194714658",
    name: "Rina Marlina, S.T.",
    role: "Koordinator K3 dan Fasilitas",
    company: "",
    content:
      "Penerangan jalan umum dan traffic cone yang dipasang oleh PT Dua Putra Srikandi di area gudang kami sangat membantu meningkatkan keselamatan operasional malam hari. Layanan purna jualnya juga baik, setiap ada kendala langsung ditindaklanjuti.",
  },
];

export default function Testimonial({
  tagline = "APA KATA MEREKA?",
  title = "Siap Dengan Kualitas & Jaminan Keselamatan",
  testimonials,
  className = "",
}: TestimonialProps) {
  const [dbTestimonials, setDbTestimonials] = useState<(TestimonialItem | ApiTestimonialItem)[] | null>(
    testimonials || null
  );

  useEffect(() => {
    if (testimonials) {
      setDbTestimonials(testimonials);
    } else {
      let isMounted = true;
      getSiteContent().then((content) => {
        if (isMounted && content?.testimonials && content.testimonials.length > 0) {
          setDbTestimonials(content.testimonials);
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [testimonials]);

  const activeItems = useMemo(() => {
    if (dbTestimonials && dbTestimonials.length > 0) return dbTestimonials;
    return DEFAULT_TESTIMONIALS;
  }, [dbTestimonials]);

  // Duplicate items sufficiently for continuous infinite ticker loop without empty space
  const tickerItems = useMemo(() => {
    const repeatCount = Math.max(3, Math.ceil(12 / activeItems.length));
    return Array.from({ length: repeatCount }, () => activeItems).flat();
  }, [activeItems]);

  return (
    <section
      aria-label="Testimonial Section"
      className={`w-full py-12 md:py-16 bg-white flex flex-col justify-start items-center gap-8 overflow-hidden ${className}`}
    >
      {/* Header Block */}
      <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 flex flex-col justify-start items-start gap-1">
        <span className="text-dark/60 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
          {tagline}
        </span>
        <h2 className="text-dark text-2xl sm:text-3xl font-bold font-sans">
          {displayTitle(title)}
        </h2>
      </div>

      {/* Ticker Container with Edge-to-Edge Full-Screen Track */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Ticker Track */}
        <div className="animate-ticker-right flex items-center gap-6">
          {tickerItems.map((item, index) => {
            const quote = item.content || ("quote" in item ? item.quote : "") || "";
            return (
              <TestimonialCard
                key={`${item.id || index}-${index}`}
                quote={quote}
                name={item.name}
                role={item.role}
                company={item.company}
                avatarSrc={
                  ("avatarSrc" in item ? item.avatarSrc : undefined) ||
                  ("avatar_url" in item ? item.avatar_url : undefined)
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function displayTitle(title?: string) {
  return title || "Siap Dengan Kualitas & Jaminan Keselamatan";
}
