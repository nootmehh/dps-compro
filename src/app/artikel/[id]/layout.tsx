import type { Metadata } from "next";
import { getArticleById } from "@/api/articles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang Anda cari tidak ditemukan atau telah dipindahkan.",
    };
  }

  const title = article.title;
  let description = "Baca artikel dan informasi terbaru seputar konstruksi, marka jalan, dan regulasi keselamatan lalu lintas dari PT. Dua Putra Srikandi.";

  if (article.content && article.content.trim()) {
    const clean = article.content.replace(/\s+/g, " ").trim();
    description = clean.length > 160 ? clean.slice(0, 157) + "..." : clean;
  }

  const imageUrl = article.img_url || "/og-image.png";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | PT. Dua Putra Srikandi`,
      description,
      type: "article",
      siteName: "PT. Dua Putra Srikandi",
      locale: "id_ID",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | PT. Dua Putra Srikandi`,
      description,
      images: [imageUrl],
    },
  };
}

export default function ArticleDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
