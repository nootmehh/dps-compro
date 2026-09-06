"use client";

import { useState } from "react";
import Accordion from "../ui/accordion";

export interface LegalityItem {
  id: number;
  question: string;
  answer: string;
}

export interface LegalitySectionProps {
  tagline?: string;
  title?: string;
  items?: LegalityItem[];
  className?: string;
}

const DEFAULT_LEGALITY_ITEMS: LegalityItem[] = [
  {
    id: 1,
    question:
      "Apakah PT. Dua Putra Srikandi merupakan badan usaha yang terdaftar resmi dan memiliki legalitas pajak?",
    answer:
      "Ya, PT. Dua Putra Srikandi adalah badan hukum berstatus Perseroan Terbatas (PT) yang sah dengan Nomor Induk Berusaha (NIB) 0220305152333 dan beroperasi berdasarkan Akte Pendirian No. 26 tertanggal 20 Januari 2020. Perusahaan juga tertib administrasi pajak dan telah dikukuhkan sebagai Pengusaha Kena Pajak (PKP) dengan Surat Pengukuhan (SPPKP) No. S-275PKP/WPJ.33/KP.0503/2021 serta NPWP 94.116.315.6-448.000.",
  },
  {
    id: 2,
    question:
      "Apakah perusahaan memiliki izin resmi untuk mengerjakan proyek konstruksi dan perlengkapan jalan?",
    answer:
      "Ya, kami memiliki Sertifikat Standar Usaha dan Sertifikat Badan Usaha (SBU) Jasa Konstruksi yang terdaftar di LPJK (Lembaga Pengembangan Jasa Konstruksi) dan Kementerian PUPR untuk bidang konstruksi jalan raya, marka jalan, rambu lalu lintas, guardrail, serta penerangan jalan umum.",
  },
  {
    id: 3,
    question:
      "Apakah sistem manajemen di PT. Dua Putra Srikandi sudah terstandarisasi?",
    answer:
      "Ya, sistem manajemen mutu dan operasional kami telah tersertifikasi standar internasional ISO 9001:2015 (Sistem Manajemen Mutu), ISO 14001:2015 (Sistem Manajemen Lingkungan), dan ISO 45001:2018 (Sistem Manajemen Keselamatan & Kesehatan Kerja K3).",
  },
  {
    id: 4,
    question:
      "Apakah merek produk yang dijual oleh PT. Dua Putra Srikandi sudah dipatenkan secara hukum?",
    answer:
      "Ya, seluruh lini produk cat marka jalan dan perlengkapan jalan bermerek DPS telah terdaftar dan dilindungi secara hukum oleh Direktorat Jenderal Kekayaan Intelektual (DJKI) Kementerian Hukum dan HAM Republik Indonesia.",
  },
];

export default function LegalitySection({
  tagline = "LEGALITAS KAMI",
  title = "Kelengkapan Legalitas Kami",
  items = DEFAULT_LEGALITY_ITEMS,
  className = "",
}: LegalitySectionProps) {
  const [activeId, setActiveId] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section
      aria-label="Legality Section"
      className={`w-full bg-white py-12 md:py-16 overflow-hidden flex flex-col items-center ${className}`}
    >
      <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto flex flex-col justify-start items-start gap-8">
        {/* Header Block */}
        <div className="w-full flex flex-col justify-start items-start gap-1">
          <span className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
            {tagline}
          </span>
          <h2 className="text-dark text-2xl sm:text-3xl lg:text-4xl font-bold font-sans">
            {title}
          </h2>
        </div>

        {/* Accordion Component Styled like Unique Button */}
        <Accordion
          items={items}
          activeId={activeId}
          onToggle={(id) => setActiveId(activeId === id ? null : (id as number))}
        />
      </div>
    </section>
  );
}
