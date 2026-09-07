import { supabase } from "@/lib/supabase";
import type { Article } from "@/types/database";
import { slugify, generateUniqueSlugs } from "@/lib/utils";

export interface GetArticlesOptions {
  category?: string;
  search?: string;
  limit?: number;
  sortBy?: "terbaru" | "terlama";
}

/**
 * Fetch list of articles from Supabase
 */
export async function getArticles(options?: GetArticlesOptions): Promise<Article[]> {
  try {
    let query = supabase.from("article").select("*");

    if (options?.category && options.category !== "Semua") {
      query = query.eq("category", options.category);
    }

    if (options?.search && options.search.trim()) {
      query = query.ilike("title", `%${options.search.trim()}%`);
    }

    const ascending = options?.sortBy === "terlama";
    query = query.order("created_at", { ascending });

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching articles:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Failed to get articles:", err);
    return [];
  }
}

/**
 * Fetch a single article by UUID or slug
 */
export async function getArticleById(idOrSlug: string): Promise<Article | null> {
  try {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      idOrSlug
    );

    if (isUUID) {
      const { data, error } = await supabase
        .from("article")
        .select("*")
        .eq("id", idOrSlug)
        .maybeSingle();

      if (!error && data) {
        return data;
      }
    }

    // Lookup by slug
    const { data: allArticles, error: allErr } = await supabase
      .from("article")
      .select("*")
      .order("created_at", { ascending: true });

    if (allErr || !allArticles) {
      return null;
    }

    const { slugToId } = generateUniqueSlugs(allArticles);
    const targetId = slugToId.get(idOrSlug);

    if (targetId) {
      return allArticles.find((a) => a.id === targetId) || null;
    }

    // Direct match fallback
    return (
      allArticles.find(
        (a) => slugify(a.title) === idOrSlug || a.id === idOrSlug
      ) || null
    );
  } catch (err) {
    console.error(`Failed to get article ${idOrSlug}:`, err);
    return null;
  }
}

/**
 * Get the slug for an article
 */
export function getArticleSlug(
  article: { id: string; title: string },
  allArticles?: Array<{ id: string; title: string }>
): string {
  if (allArticles && allArticles.length > 0) {
    const { idToSlug } = generateUniqueSlugs(allArticles);
    return idToSlug.get(article.id) || slugify(article.title) || article.id;
  }
  return slugify(article.title) || article.id;
}

/**
 * Fetch distinct categories from articles
 */
export async function getArticleCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("article")
      .select("category");

    if (error || !data) return [];

    const categories = Array.from(
      new Set(data.map((item) => item.category).filter(Boolean))
    ) as string[];

    return categories;
  } catch (err) {
    console.error("Failed to get article categories:", err);
    return [];
  }
}
