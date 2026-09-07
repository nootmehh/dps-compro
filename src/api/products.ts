import { supabase } from "@/lib/supabase";
import type { Product } from "@/types/database";
import { slugify, generateUniqueSlugs } from "@/lib/utils";

export interface GetProductsOptions {
  category?: string;
  search?: string;
  limit?: number;
}

/**
 * Fetch list of products from Supabase
 */
export async function getProducts(options?: GetProductsOptions): Promise<Product[]> {
  try {
    let query = supabase.from("product").select("*");

    if (options?.category && options.category !== "Semua") {
      query = query.eq("category", options.category);
    }

    if (options?.search && options.search.trim()) {
      query = query.or(
        `title.ilike.%${options.search.trim()}%,description.ilike.%${options.search.trim()}%,category.ilike.%${options.search.trim()}%`
      );
    }

    query = query.order("created_at", { ascending: false });

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Failed to get products:", err);
    return [];
  }
}

/**
 * Fetch a single product by UUID or slug
 */
export async function getProductById(idOrSlug: string): Promise<Product | null> {
  try {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      idOrSlug
    );

    if (isUUID) {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", idOrSlug)
        .maybeSingle();

      if (!error && data) {
        return data;
      }
    }

    // Lookup by slug
    const { data: allProducts, error: allErr } = await supabase
      .from("product")
      .select("*")
      .order("created_at", { ascending: true });

    if (allErr || !allProducts) {
      return null;
    }

    const { slugToId } = generateUniqueSlugs(allProducts);
    const targetId = slugToId.get(idOrSlug);

    if (targetId) {
      return allProducts.find((p) => p.id === targetId) || null;
    }

    // Direct match fallback
    return (
      allProducts.find(
        (p) => slugify(p.title) === idOrSlug || p.id === idOrSlug
      ) || null
    );
  } catch (err) {
    console.error(`Failed to get product ${idOrSlug}:`, err);
    return null;
  }
}

/**
 * Get the slug for a product
 */
export function getProductSlug(
  product: { id: string; title: string },
  allProducts?: Array<{ id: string; title: string }>
): string {
  if (allProducts && allProducts.length > 0) {
    const { idToSlug } = generateUniqueSlugs(allProducts);
    return idToSlug.get(product.id) || slugify(product.title) || product.id;
  }
  return slugify(product.title) || product.id;
}

/**
 * Fetch multiple products by an array of IDs (used e.g. for materials in services)
 */
export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (!ids || ids.length === 0) return [];
  try {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .in("id", ids);

    if (error) {
      console.error("Error fetching products by ids:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Failed to get products by ids:", err);
    return [];
  }
}

/**
 * Fetch distinct categories from products
 */
export async function getProductCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("product")
      .select("category");

    if (error || !data) return [];

    const categories = Array.from(
      new Set(data.map((item) => item.category).filter(Boolean))
    ) as string[];

    return categories;
  } catch (err) {
    console.error("Failed to get product categories:", err);
    return [];
  }
}
