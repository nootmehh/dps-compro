import type { Metadata } from "next";
import { getProductById } from "@/api/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan",
      description: "Produk yang Anda cari tidak ditemukan atau telah dipindahkan.",
    };
  }

  const title = product.title;
  const description =
    product.description?.trim() ||
    `Beli ${product.title} berkualitas tinggi dari PT. Dua Putra Srikandi. Produsen & penyedia bahan marka jalan dan perlengkapan keselamatan jalan terpercaya.`;

  const imageUrl =
    (product.product_image_url &&
      product.product_image_url.length > 0 &&
      product.product_image_url[0]) ||
    product.highlight_img_url ||
    "/og-image.png";

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

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
