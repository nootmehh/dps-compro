"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Badge, { type BadgeVariant, resolveBadgeVariant } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import LordIcon from "@/components/common/lordIcon";
import EmptyState from "@/components/common/emptyState";
import LoadingState from "@/components/common/loadingState";
import { getArticleById, getArticles, getArticleSlug } from "@/api/articles";
import type { Article } from "@/types/database";

interface RelatedArticle {
  id: string | number;
  imageSrc: string;
  category: string;
  categoryVariant: BadgeVariant;
  title: string;
  href: string;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

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
            isHovered ? "text-g1!" : "group-hover:text-g1"
          }`}
        >
          {item.title}
        </p>
      </div>
    </Link>
  );
}

function formatArticleHtml(raw?: string | null): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  const hasHtml = /<[a-z][\s\S]*>/i.test(trimmed);
  if (hasHtml) {
    return trimmed;
  }
  return trimmed
    .split(/\n\s*\n/)
    .map((p) => `<p>${p.trim().replace(/\n/g, "<br/>")}</p>`)
    .join("");
}

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getArticleById(resolvedParams.id);
      setArticle(data);

      const all = await getArticles();
      const filtered = all
        .filter((a) => a.id !== data?.id && a.id !== resolvedParams.id)
        .slice(0, 4)
        .map((a) => ({
          id: a.id,
          imageSrc: a.img_url || "https://placehold.co/320x160",
          category: a.category || "Artikel",
          categoryVariant: resolveBadgeVariant(a.category_color, a.category),
          title: a.title,
          href: `/artikel/${getArticleSlug(a, all)}`,
        }));
      setRelatedArticles(filtered);
      setLoading(false);
    }
    loadData();
  }, [resolvedParams.id]);

  if (loading) {
    return <LoadingState />;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center">
        <Navbar variant="auto" />
        <main className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto pt-32 pb-16 flex flex-col items-center gap-6">
          <EmptyState
            iconName="StorageBox"
            text="Artikel yang Anda cari tidak ditemukan atau telah dihapus."
          />
          <Link href="/artikel">
            <Button
              type="button"
              text="Kembali ke Katalog Artikel"
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

      {/* Main Container */}
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
            href="/artikel"
            className="breadcrumb-link inline-flex items-center"
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
            {article?.title || "Detail Artikel"}
          </span>
        </nav>

        {/* Two-Column Layout (Article Detail Body + Sticky Sidebar) */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
          {/* Left Column: Full Article Content */}
          <article className="flex-1 w-full flex flex-col justify-start items-start gap-6">
            {/* Header: Title, Category Badge & Date Badge */}
            <header className="w-full flex flex-col justify-start items-start gap-4">
              <h1 className="w-full text-dark text-2xl sm:text-3xl lg:text-[32px] font-bold font-sans leading-tight">
                {article?.title || "Judul Artikel"}
              </h1>

              <div className="w-full flex items-center gap-3 border-b border-gray-100 pb-4 flex-wrap">
                {/* Category Badge */}
                <Badge
                  text={article?.category || "Artikel"}
                  variant={resolveBadgeVariant(article?.category_color, article?.category)}
                />

                {/* Upload Time Badge */}
                <div
                  data-hover-target="true"
                  className="time-badge group h-7 px-2.5 py-1 bg-g1/5 hover:bg-g1/10 rounded-full inline-flex items-center gap-1.5 shrink-0 cursor-pointer select-none transition-colors"
                >
                  <LordIcon
                    name="Clock"
                    size={16}
                    primaryColor="#0A9863"
                    trigger="hover"
                    target=".time-badge"
                  />
                  <span className="text-g1 text-xs font-semibold font-sans">
                    {formatDate(article?.created_at) || "Terbaru"}
                  </span>
                </div>
              </div>
            </header>

            {/* Featured Hero Banner Image */}
            <div className="w-full h-64 sm:h-80 md:h-103.5 rounded-4xl overflow-hidden bg-brand-background shadow-xs">
              <img
                className="size-full object-cover"
                src={article?.img_url || "https://placehold.co/780x414"}
                alt={article?.title || "Hero banner"}
              />
            </div>

            {/* Rich Article Prose Body */}
            {article?.content ? (
              <div
                className="article-body"
                dangerouslySetInnerHTML={{
                  __html: formatArticleHtml(article.content),
                }}
              />
            ) : (
              <p className="text-dark/50 italic text-sm sm:text-base">
                Konten artikel belum tersedia.
              </p>
            )}
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

            {/* Related Articles List or Empty State */}
            {relatedArticles.length > 0 ? (
              <div className="w-full flex flex-col gap-3">
                {relatedArticles.map((item) => (
                  <RelatedArticleCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState
                iconName="StorageBox"
                iconSize={48}
                text="Belum ada artikel terkait yang ditampilkan."
                className="py-6 px-2"
              />
            )}

            {/* View More Button (only if items exist) */}
            {relatedArticles.length > 0 && (
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
            )}
          </aside>
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
