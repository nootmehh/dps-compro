import type { Metadata } from "next";
import { getServiceById } from "@/api/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan",
      description: "Layanan yang Anda cari tidak ditemukan atau telah dipindahkan.",
    };
  }

  const title = service.title;
  let description = `Layanan spesialis ${service.title} oleh PT. Dua Putra Srikandi. Kontraktor terpercaya penyedia jasa marka jalan, perlengkapan jalan, dan fasilitas keselamatan lalu lintas.`;

  if (Array.isArray(service.keunggulan) && service.keunggulan.length > 0) {
    const first = service.keunggulan[0];
    const extracted =
      typeof first === "string"
        ? first
        : first.desc || first.value || first.title;
    if (extracted && extracted.trim()) {
      description = `${extracted.trim()} Hubungi PT. Dua Putra Srikandi untuk penawaran dan konsultasi gratis.`;
    }
  }

  const imageUrl =
    (service.service_image_url &&
      service.service_image_url.length > 0 &&
      service.service_image_url[0]) ||
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

export default function ServiceDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
