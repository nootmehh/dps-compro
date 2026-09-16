import type { MetadataRoute } from "next";
import { getSeoSettings } from "@/api/seo";
import { getArticles } from "@/api/articles";
import { getProducts } from "@/api/products";
import { getServices } from "@/api/services";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://dev.dpsmarkajalan.com"
  ).replace(/\/$/, "");

  const seo = await getSeoSettings();

  // If auto generate sitemap is explicitly turned off in CMS
  if (seo && (seo as any).auto_generate_sitemap === false) {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
    ];
  }

  // 1. Static Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/layanan`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/produk`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // 2. Dynamic Articles (/artikel/[id])
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await getArticles();
    articleRoutes = articles.map((article) => ({
      url: `${baseUrl}/artikel/${article.id}`,
      lastModified: article.edited_at
        ? new Date(article.edited_at)
        : article.created_at
        ? new Date(article.created_at)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Error building sitemap article routes:", err);
  }

  // 3. Dynamic Products (/produk/[id])
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/produk/${product.id}`,
      lastModified: product.edited_at
        ? new Date(product.edited_at)
        : product.created_at
        ? new Date(product.created_at)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Error building sitemap product routes:", err);
  }

  // 4. Dynamic Services (/layanan/[id])
  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const services = await getServices();
    serviceRoutes = services.map((service) => ({
      url: `${baseUrl}/layanan/${service.id}`,
      lastModified: service.edited_at
        ? new Date(service.edited_at)
        : service.created_at
        ? new Date(service.created_at)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (err) {
    console.error("Error building sitemap service routes:", err);
  }

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...productRoutes,
    ...articleRoutes,
  ];
}
