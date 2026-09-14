export interface Article {
  id: string;
  title: string;
  category: string | null;
  content: string | null;
  img_url?: string | null;
  created_at: string;
  edited_at: string;
  category_color?: string | null;
}

export interface ProductDetailItem {
  title: string;
  value: string;
}

export interface SuitableForItem {
  title: string;
  description?: string;
  value?: string;
}

export interface ProsConsItem {
  title: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  detail_product: ProductDetailItem[] | Record<string, string> | null;
  suitable_for: Array<SuitableForItem | string> | null;
  kelebihan: ProsConsItem[] | string[] | null;
  kekurangan: ProsConsItem[] | string[] | null;
  product_image_url: string[] | null;
  highlight_img_url: string | null;
  created_at: string;
  edited_at: string;
  category_color?: string | null;
}

export interface ServiceAdvantageItem {
  title: string;
  value?: string;
  desc?: string;
}

export interface ServiceFaqItem {
  id?: number | string;
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  category: string | null;
  keunggulan: ServiceAdvantageItem[] | null;
  faq: ServiceFaqItem[] | null;
  product_id: string[] | null;
  service_image_url: string[] | null;
  created_at: string;
  edited_at: string;
  category_color?: string | null;
}

export interface SeoSettings {
  id: string;
  site_title_default: string;
  meta_description_default: string;
  keywords: string | null;
  favicon_url: string | null;
  ga_connected: boolean;
  ga_measurement_id: string | null;
  created_at: string;
  updated_at: string;
}
