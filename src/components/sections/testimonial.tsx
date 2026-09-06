"use client";

import TestimonialCard from "../card/testimonialCard";

export interface TestimonialItem {
  id?: string | number;
  quote: string;
  name: string;
  role: string;
  avatarSrc?: string;
}

export interface TestimonialProps {
  tagline?: string;
  title?: string;
  testimonials?: TestimonialItem[];
  className?: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote:
      '"Kualitas marka jalan dan guardrail dari PT Dua Putra Srikandi sangat presisi sesuai standar Dishub. Pengerjaan proyek tol selesai tepat waktu."',
    name: "Ir. Bambang Prasetyo",
    role: "Project Manager, PT Wijaya Karya (WIKA)",
    avatarSrc: "https://placehold.co/40x40/png?text=BP",
  },
  {
    id: 2,
    quote:
      '"Pengadaan rambu lalu lintas dan perlengkapan keselamatan jalan sangat lengkap dan bersertifikasi. Mutu bahan terjamin awet."',
    name: "Hendra Gunawan, S.T.",
    role: "Kepala Pengadaan, Dishub Jawa Barat",
    avatarSrc: "https://placehold.co/40x40/png?text=HG",
  },
  {
    id: 3,
    quote:
      '"Respon cepat dan tim lapangan profesional. Pelaksanaan perbaikan jalan dan pengaspalan di area komersial kami sangat rapi."',
    name: "Dedi Setiawan",
    role: "Site Engineer, PT Jaya Konstruksi",
    avatarSrc: "https://placehold.co/40x40/png?text=DS",
  },
  {
    id: 4,
    quote:
      '"Dukungan material keselamatan konstruksi dari DPS membantu proyek kami lolos uji kelayakan K3 dengan nilai sempurna."',
    name: "Siti Nurhaliza",
    role: "HSE Lead, Adhi Karya Infrastructure",
    avatarSrc: "https://placehold.co/40x40/png?text=SN",
  },
];

export default function Testimonial({
  tagline = "APA KATA MEREKA?",
  title = "Siap Dengan Kualitas & Jaminan Keselamatan",
  testimonials = DEFAULT_TESTIMONIALS,
  className = "",
}: TestimonialProps) {
  // Duplicate array 3 times for seamless infinite continuous ticker loop
  const tickerItems = [...testimonials, ...testimonials, ...testimonials];

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
          {title}
        </h2>
      </div>

      {/* Ticker Container with Edge-to-Edge Full-Screen Track */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Ticker Track */}
        <div className="animate-ticker-right flex items-center gap-6">
          {tickerItems.map((item, index) => (
            <TestimonialCard
              key={`${item.id || index}-${index}`}
              quote={item.quote}
              name={item.name}
              role={item.role}
              avatarSrc={item.avatarSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
