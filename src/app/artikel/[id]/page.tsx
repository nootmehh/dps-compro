"use client";

import { use, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Badge, { type BadgeVariant } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import LordIcon from "@/components/common/lordIcon";

interface RelatedArticle {
  id: string | number;
  imageSrc: string;
  category: string;
  categoryVariant: BadgeVariant;
  title: string;
  href: string;
}

const RELATED_ARTICLES: RelatedArticle[] = [
  {
    id: 1,
    imageSrc: "https://placehold.co/80x80",
    category: "Proyek & Infrastruktur",
    categoryVariant: "amber",
    title: "Penyelesaian Proyek Marka Jalan Tol Cipali Selesai Lebih Awal",
    href: "/artikel/proyek-tol-cipali",
  },
  {
    id: 2,
    imageSrc: "https://placehold.co/80x80",
    category: "Tanggung Jawab Sosial (CSR)",
    categoryVariant: "green",
    title:
      "Program CSR: Revitalisasi Zona Selamat Sekolah (ZoSS) di Kota Depok",
    href: "/artikel/csr-zoss-depok",
  },
  {
    id: 3,
    imageSrc: "https://placehold.co/80x80",
    category: "Inovasi Produk",
    categoryVariant: "sky",
    title:
      "Peluncuran Inovasi Cat Coldplastic Ramah Lingkungan Generasi Terbaru",
    href: "/artikel/inovasi-coldplastic",
  },
];

function RelatedArticleCard({ item }: { item: RelatedArticle }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: isHovered
          ? "1.5px solid var(--g1, #0A9863)"
          : "1.5px solid transparent",
      }}
      className="w-full p-3 bg-white rounded-2xl flex items-center gap-3 transition-all duration-200 group cursor-pointer select-none"
    >
      <div className="size-20 rounded-xl overflow-hidden shrink-0">
        <img
          className={`size-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "group-hover:scale-105"
          }`}
          src={item.imageSrc}
          alt={item.title}
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center items-start gap-1.5 overflow-hidden">
        <Badge text={item.category} variant={item.categoryVariant} />
        <p
          className={`text-dark text-sm font-semibold font-sans line-clamp-2 leading-snug transition-colors ${
            isHovered ? "!text-g1" : "group-hover:text-g1"
          }`}
        >
          {item.title}
        </p>
      </div>
    </Link>
  );
}

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap Next.js 15+ async params
  const resolvedParams = use(params);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Sticky Navbar */}
      <Navbar variant="auto" />

      {/* Main Container */}
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
            href="/artikel"
            className="text-dark/60 hover:text-g1 font-normal transition-colors"
          >
            Artikel
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
            Detail Artikel
          </span>
        </nav>

        {/* Two-Column Layout (Article Detail Body + Sticky Sidebar) */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
          {/* Left Column: Full Article Content */}
          <article className="flex-1 w-full flex flex-col justify-start items-start gap-6">
            {/* Header: Title, Category Badge, Author & Date */}
            <header className="w-full flex flex-col justify-start items-start gap-4">
              <div className="flex items-center gap-2">
                <Badge text="Penghargaan & Pencapaian" variant="pink" />
              </div>

              <h1 className="w-full text-dark text-2xl sm:text-3xl lg:text-[32px] font-bold font-sans leading-tight">
                Komitmen Terhadap Keselamatan, Perusahaan Raih Penghargaan Zero
                Accident 2026
              </h1>

              <div className="w-full flex items-center gap-4 text-xs sm:text-sm text-dark/60 font-sans border-b border-gray-100 pb-4">
                <div className="flex items-center gap-1.5">
                  <LordIcon
                    name="Phone"
                    size={16}
                    primaryColor="#0A9863"
                    trigger="hover"
                  />
                  <span>Ditulis oleh: Tim Humas DPS</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1.5">
                  <LordIcon
                    name="Clock"
                    size={16}
                    primaryColor="#0A9863"
                    trigger="hover"
                  />
                  <span>10 Juli, 2026</span>
                </div>
              </div>
            </header>

            {/* Featured Hero Banner Image */}
            <div className="w-full h-64 sm:h-80 md:h-103.5 rounded-4xl overflow-hidden bg-brand-background shadow-xs">
              <img
                className="size-full object-cover"
                src="https://placehold.co/780x414"
                alt="Penghargaan Zero Accident 2026"
              />
            </div>

            {/* Rich Article Prose Body */}
            <div className="w-full text-dark/80 text-sm sm:text-base font-normal font-sans leading-relaxed text-justify space-y-4">
              <p>
                <strong>JAKARTA</strong> &mdash; PT. Dua Putra Srikandi kembali
                menorehkan prestasi membanggakan di bidang Keselamatan dan
                Kesehatan Kerja (K3). Pada penganugerahan K3 Award Nasional yang
                diselenggarakan oleh Kementerian Ketenagakerjaan Republik
                Indonesia pada awal bulan ini, perusahaan berhasil meraih
                penghargaan <strong>Zero Accident Award (Kecelakaan Nihil)</strong>{" "}
                atas pencapaian operasional tanpa kecelakaan kerja selama lebih
                dari 3 tahun berturut-turut.
              </p>

              <p>
                Penghargaan bergengsi ini diserahkan langsung oleh perwakilan
                pemerintah sebagai bentuk apresiasi atas dedikasi nyata manajemen
                dan seluruh jajaran teknisi lapangan dalam menerapkan Sistem
                Manajemen Keselamatan dan Kesehatan Kerja (SMK3) secara ketat,
                konsisten, dan menyeluruh di setiap titik pelaksanaan proyek.
              </p>

              <h2 className="text-dark text-xl sm:text-2xl font-bold font-sans pt-4 pb-1">
                Penerapan Standar K3 Ketat di Lapangan
              </h2>

              <p>
                Dalam pengerjaan proyek-proyek kelengkapan jalan raya seperti
                pengecatan marka jalan raya, pemasangan guardrail, hingga
                instalasi rambu lalu lintas, risiko keselamatan kerja di area lalu
                lintas aktif selalu menjadi prioritas utama. PT. Dua Putra
                Srikandi menerapkan protokol pengamanan zona kerja berstandar
                tinggi, termasuk penyediaan rambu peringatan kerja berjarak aman,
                penggunaan Alat Pelindung Diri (APD) lengkap berdaya pantul tinggi
                (fluorescent), serta penempatan traffic warden bersertifikat di
                lapangan.
              </p>

              <p>
                &ldquo;Penghargaan ini adalah bukti nyata komitmen kami bahwa
                produktivitas tinggi, pengerjaan yang cepat, dan keselamatan
                kerja dapat berjalan beriringan tanpa harus ada yang dikorbankan.
                Kami sangat bangga dengan kedisiplinan seluruh elemen
                perusahaan,&rdquo; ujar perwakilan manajemen.
              </p>

              <p>
                Keberhasilan mempertahankan rekor Zero Accident ini sekaligus
                semakin mengukuhkan posisi perusahaan sebagai mitra penyedia
                bahan dan kontraktor jalan yang andal. Bagi kami, menjamin
                keselamatan kerja bukan hanya soal kepatuhan terhadap regulasi
                perundangan, melainkan juga sebuah jaminan langsung kepada para
                klien—baik dari instansi Pemerintah, BUMN, BUMD, maupun
                Swasta—bahwa setiap proyek akan dieksekusi secara efisien,
                terukur, tepat waktu, dan bebas dari penundaan akibat insiden
                kerja.
              </p>

              <p>
                Ke depannya, perusahaan berkomitmen untuk terus berinovasi dalam
                mengadopsi teknologi keselamatan terbaru dan secara rutin
                meningkatkan kapasitas K3 para pekerja demi mewujudkan lingkungan
                kerja yang 100% aman dan produktif.
              </p>
            </div>
          </article>

          {/* Right Column: Sidebar "Artikel Lainnya" */}
          <aside
            style={{ position: "sticky", top: "112px" }}
            className="w-full lg:w-96 p-6 bg-brand-background rounded-3xl flex flex-col justify-start items-start gap-4 shrink-0 shadow-xs self-start"
          >
            {/* Sidebar Title */}
            <h2 className="text-dark/40 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
              ARTIKEL LAINNYA
            </h2>

            {/* Related Articles List */}
            <div className="w-full flex flex-col gap-3">
              {RELATED_ARTICLES.map((item) => (
                <RelatedArticleCard key={item.id} item={item} />
              ))}
            </div>

            {/* View More Button */}
            <div className="w-full pt-1">
              <Link href="/artikel" className="w-full flex">
                <Button
                  type="button"
                  text="Lihat Lebih Banyak"
                  variant="unique-green"
                  rightIcon="Right 1"
                  className="w-full justify-center shadow-none [&_.pill-segment]:shadow-none cursor-pointer"
                />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
