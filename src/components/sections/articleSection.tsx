"use client";

import Button from "../ui/button";
import ArticleCard, { ArticleCardProps } from "../card/articleCard";

export interface ArticleItem extends Omit<ArticleCardProps, "className"> {
  id?: string | number;
}

export interface ArticleSectionProps {
  tagline?: string;
  title?: string;
  articles?: ArticleItem[];
  onViewMore?: () => void;
  className?: string;
}

const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: 1,
    imageSrc: "https://placehold.co/246x134",
    category: "Penghargaan & Pencapaian",
    categoryColor: "pink",
    title:
      "Komitmen Terhadap Keselamatan, Perusahaan Raih Penghargaan Zero Accident 2026",
    date: "10 Juli, 2026",
    href: "/artikel/zero-accident-2026",
  },
  {
    id: 2,
    imageSrc: "https://placehold.co/246x134",
    category: "Proyek & Infrastruktur",
    categoryColor: "amber",
    title: "Penyelesaian Proyek Marka Jalan Tol Cipali Selesai Lebih Awal",
    date: "8 Juli, 2026",
    href: "/artikel/proyek-tol-cipali",
  },
  {
    id: 3,
    imageSrc: "https://placehold.co/246x134",
    category: "Tanggung Jawab Sosial (CSR)",
    categoryColor: "green",
    title:
      "Program CSR: Revitalisasi Zona Selamat Sekolah (ZoSS) di Kota Depok",
    date: "6 Juli, 2026",
    href: "/artikel/csr-zoss-depok",
  },
  {
    id: 4,
    imageSrc: "https://placehold.co/246x134",
    category: "Inovasi Produk",
    categoryColor: "sky",
    title:
      "Peluncuran Inovasi Cat Coldplastic Ramah Lingkungan Generasi Terbaru",
    date: "4 Juli, 2026",
    href: "/artikel/inovasi-coldplastic",
  },
];

export default function ArticleSection({
  tagline = "ARTIKEL KAMI",
  title = "Ikuti Perkembangan Terbaru Kami",
  articles = DEFAULT_ARTICLES,
  onViewMore,
  className = "",
}: ArticleSectionProps) {
  return (
    <section
      aria-label="Article Section"
      className={`w-full bg-linear-to-b from-white-100 to-[#f9f9f9] border-b border-white-70 py-12 md:py-16 ${className}`}
    >
      <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto flex flex-col justify-start items-start gap-8">
        {/* Header Row: Title & Action Button */}
        <div className="self-stretch flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="flex-1 flex flex-col justify-start items-start gap-1">
            <span className="text-dark/60 text-xs sm:text-sm font-normal font-sans tracking-wider uppercase">
              {tagline}
            </span>
            <h2 className="text-dark text-2xl sm:text-3xl font-bold font-sans">
              {title}
            </h2>
          </div>

          <Button
            type="button"
            text="Artikel Lainnya"
            variant="unique-stroke"
            rightIcon="Right 1"
            onClick={onViewMore}
            className="cursor-pointer shadow-none shrink-0"
          />
        </div>

        {/* Article Cards Grid */}
        <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id || index}
              imageSrc={article.imageSrc}
              category={article.category}
              categoryColor={article.categoryColor}
              title={article.title}
              date={article.date}
              href={article.href}
              onReadMore={article.onReadMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
