import { supabase } from "@/lib/supabase";

export interface GalleryItem {
  id?: string | number;
  url: string;
  title?: string;
  category?: string;
}

export interface TestimonialItem {
  id?: string | number;
  name: string;
  role?: string;
  company?: string;
  content: string;
  quote?: string;
  rating?: number;
  avatar_url?: string;
}

export interface SocialMediaItem {
  type: string;
  link?: string;
  url?: string;
}

export interface LegalityItem {
  id?: string | number;
  question: string;
  answer: string;
}

export interface SiteContent {
  id: string;
  hero_img_url: string | null;
  partner_img_url: string[] | null;
  about_image_url: string | null;
  about_description_short: string | null;
  about_description_long: string | null;
  more_title: string | null;
  gallery: GalleryItem[] | null;
  value_satisfy_customer: number | null;
  value_finished_services: number | null;
  value_product_produced: number | null;
  value_years_experience: number | null;
  testimonials: TestimonialItem[] | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  social_media: SocialMediaItem[] | null;
  whatsapp_url: string | null;
  vision: string | null;
  mission: string[] | null;
  legality: LegalityItem[] | null;
  vision_img_url: string | null;
  created_at: string;
  edited_at: string;
}

/**
 * Fetch the latest site_content row from Supabase
 */
export async function getSiteContent(): Promise<SiteContent | null> {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching site_content from Supabase:", error.message);
      return null;
    }

    return data as SiteContent;
  } catch (err) {
    console.error("Failed to retrieve site_content:", err);
    return null;
  }
}

/**
 * Check whether a media URL points to a video file
 */
export function isVideoUrl(url?: string | null): boolean {
  if (!url) return false;
  const clean = url.toLowerCase().split("?")[0];
  return (
    clean.endsWith(".mp4") ||
    clean.endsWith(".webm") ||
    clean.endsWith(".ogg") ||
    clean.endsWith(".mov") ||
    clean.includes("/video/") ||
    clean.includes("video/mp4")
  );
}

/**
 * Format a WhatsApp URL with a pre-filled default inquiry message
 */
export function formatWhatsAppUrl(
  urlOrPhone?: string | null,
  message: string = "Halo, Saya ingin mengajukan penawaran"
): string {
  const defaultBase = "https://wa.me/6281380646093";
  if (!urlOrPhone || !urlOrPhone.trim()) {
    return `${defaultBase}?text=${encodeURIComponent(message)}`;
  }

  const trimmed = urlOrPhone.trim();

  // If already a full URL (wa.me, api.whatsapp.com, etc.)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const parsedUrl = new URL(trimmed);
      if (message) {
        parsedUrl.searchParams.set("text", message);
      }
      return parsedUrl.toString();
    } catch {
      const separator = trimmed.includes("?") ? "&" : "?";
      return message ? `${trimmed}${separator}text=${encodeURIComponent(message)}` : trimmed;
    }
  }

  // If raw phone number e.g. "081380646093" or "+62 813 8064 6093"
  let cleanNumber = trimmed.replace(/[^\d]/g, "");
  if (cleanNumber.startsWith("0")) {
    cleanNumber = "62" + cleanNumber.slice(1);
  }
  const base = cleanNumber ? `https://wa.me/${cleanNumber}` : defaultBase;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

