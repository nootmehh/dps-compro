import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel & Berita",
  description:
    "Ikuti perkembangan terbaru, edukasi marka jalan, inovasi keselamatan lalu lintas, dan informasi proyek dari PT. Dua Putra Srikandi.",
  openGraph: {
    title: "Artikel & Berita | PT. Dua Putra Srikandi",
    description:
      "Ikuti perkembangan terbaru, edukasi marka jalan, inovasi keselamatan lalu lintas, dan informasi proyek dari PT. Dua Putra Srikandi.",
    type: "website",
    siteName: "PT. Dua Putra Srikandi",
    locale: "id_ID",
    images: [
      {
        url: "/dps-logo-default.png",
        width: 1200,
        height: 630,
        alt: "Artikel & Berita PT. Dua Putra Srikandi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artikel & Berita | PT. Dua Putra Srikandi",
    description:
      "Ikuti perkembangan terbaru, edukasi marka jalan, inovasi keselamatan lalu lintas, dan informasi proyek dari PT. Dua Putra Srikandi.",
    images: ["/dps-logo-default.png"],
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
