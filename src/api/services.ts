import { supabase } from "@/lib/supabase";
import type { Service } from "@/types/database";
import { slugify, generateUniqueSlugs } from "@/lib/utils";

export interface GetServicesOptions {
  category?: string;
  search?: string;
  limit?: number;
}

/**
 * Fetch list of services from Supabase
 */
export async function getServices(options?: GetServicesOptions): Promise<Service[]> {
  try {
    let query = supabase.from("services").select("*");

    if (options?.category && options.category !== "Semua") {
      query = query.eq("category", options.category);
    }

    if (options?.search && options.search.trim()) {
      query = query.or(
        `title.ilike.%${options.search.trim()}%,category.ilike.%${options.search.trim()}%`
      );
    }

    query = query.order("created_at", { ascending: false });

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching services:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Failed to get services:", err);
    return [];
  }
}

/**
 * Fetch a single service by UUID or slug
 */
export async function getServiceById(idOrSlug: string): Promise<Service | null> {
  try {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      idOrSlug
    );

    if (isUUID) {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", idOrSlug)
        .maybeSingle();

      if (!error && data) {
        return data;
      }
    }

    // Lookup by slug
    const { data: allServices, error: allErr } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: true });

    if (allErr || !allServices) {
      return null;
    }

    const { slugToId } = generateUniqueSlugs(allServices);
    const targetId = slugToId.get(idOrSlug);

    if (targetId) {
      return allServices.find((s) => s.id === targetId) || null;
    }

    // Direct match fallback
    return (
      allServices.find(
        (s) => slugify(s.title) === idOrSlug || s.id === idOrSlug
      ) || null
    );
  } catch (err) {
    console.error(`Failed to get service ${idOrSlug}:`, err);
    return null;
  }
}

/**
 * Get the slug for a service
 */
export function getServiceSlug(
  service: { id: string; title: string },
  allServices?: Array<{ id: string; title: string }>
): string {
  if (allServices && allServices.length > 0) {
    const { idToSlug } = generateUniqueSlugs(allServices);
    return idToSlug.get(service.id) || slugify(service.title) || service.id;
  }
  return slugify(service.title) || service.id;
}

/**
 * Fetch distinct categories from services
 */
export async function getServiceCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("category");

    if (error || !data) return [];

    const categories = Array.from(
      new Set(data.map((item) => item.category).filter(Boolean))
    ) as string[];

    return categories;
  } catch (err) {
    console.error("Failed to get service categories:", err);
    return [];
  }
}
