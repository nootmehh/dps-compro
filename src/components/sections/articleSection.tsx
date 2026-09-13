"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../ui/button";
import ArticleCard, { ArticleCardProps } from "../card/articleCard";
import EmptyState from "../common/emptyState";
import { getArticles, getArticleSlug } from "@/api/articles";

export interface ArticleItem extends Omit<ArticleCardProps, "className"> {
  id?: string | number;
}

export interface ArticleSectionProps {
  tagline?: string;
  title?: string;
  articles?: ArticleItem[];
  viewMoreHref?: string;
  onViewMore?: () => void;
  className?: string;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const DEFAULT_ARTICLES: ArticleItem[] = [];

export default function ArticleSection({
  tagline = "ARTIKEL KAMI",
  title = "Ikuti Perkembangan Terbaru Kami",
  articles = DEFAULT_ARTICLES,
  viewMoreHref = "/artikel",
  onViewMore,
  className = "",
}: ArticleSectionProps) {
  const [fetchedArticles, setFetchedArticles] = useState<ArticleItem[]>([]);

  useEffect(() => {
    if (articles.length === 0) {
      getArticles({ limit: 4 }).then((data) => {
        setFetchedArticles(
          data.map((a) => ({
            id: a.id,
            imageSrc: "https://placehold.co/320x160",
            category: a.category || "Artikel",
            categoryColor: a.category_color || undefined,
            title: a.title,
            date: formatDate(a.created_at),
            href: `/artikel/${getArticleSlug(a, data)}`,
          }))
        );
      });
    }
  }, [articles.length]);

  const displayArticles = articles.length > 0 ? articles : fetchedArticles;

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

          {displayArticles.length > 0 && (
            <Link href={viewMoreHref} onClick={onViewMore}>
              <Button
                type="button"
                text="Artikel Lainnya"
                variant="unique-stroke"
                rightIcon="Right 1"
                className="cursor-pointer shadow-none shrink-0"
              />
            </Link>
          )}
        </div>

        {/* Article Cards Grid or Empty State */}
        {displayArticles.length > 0 ? (
          <div className="w-full flex justify-center">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch justify-items-center max-w-[340px] sm:max-w-[688px] xl:max-w-none mx-auto">
              {displayArticles.map((article, index) => (
                <ArticleCard
                  key={article.id || index}
                  imageSrc={article.imageSrc}
                  category={article.category}
                  categoryVariant={article.categoryVariant}
                  categoryColor={article.categoryColor}
                  title={article.title}
                  date={article.date}
                  href={article.href}
                  onReadMore={article.onReadMore}
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            iconName="StorageBox"
            text="Belum ada artikel yang dapat ditampilkan saat ini."
          />
        )}
      </div>
    </section>
  );
}
