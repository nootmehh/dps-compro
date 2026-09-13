import { supabase } from "@/lib/supabase";
import type { SeoSettings } from "@/types/database";

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  id: "default",
  site_title_default: "Dua Putra Srikandi - Jasa & Produk Marka Jalan",
  meta_description_default:
    "Spesialis pengecatan marka jalan, perlengkapan jalan, dan fasilitas keselamatan lalu lintas terpercaya.",
  keywords: "marka jalan, cat thermoplastic, rambu lalu lintas, guardrail, jasa marka jalan",
  favicon_url: null,
  ga_connected: false,
  ga_measurement_id: "G-3S0T90E0TT",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

/**
 * Fetch the latest SEO settings from Supabase
 */
export async function getSeoSettings(): Promise<SeoSettings | null> {
  try {
    const { data, error } = await supabase
      .from("seo_settings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching seo_settings from Supabase:", error.message);
      return null;
    }

    return (data as SeoSettings) || null;
  } catch (err) {
    console.error("Failed to retrieve seo_settings:", err);
    return null;
  }
}
