import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description:
    "Katalog lengkap produk cat marka jalan thermoplastic, coldplastic, glass beads, rambu, paku jalan, dan perlengkapan keselamatan jalan berkualitas dari PT. Dua Putra Srikandi.",
  openGraph: {
    title: "Katalog Produk | PT. Dua Putra Srikandi",
    description:
      "Katalog lengkap produk cat marka jalan thermoplastic, coldplastic, glass beads, rambu, paku jalan, dan perlengkapan keselamatan jalan berkualitas dari PT. Dua Putra Srikandi.",
    type: "website",
    siteName: "PT. Dua Putra Srikandi",
    locale: "id_ID",
    images: [
      {
        url: "/dps-logo-default.png",
        width: 1200,
        height: 630,
        alt: "Katalog Produk PT. Dua Putra Srikandi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Katalog Produk | PT. Dua Putra Srikandi",
    description:
      "Katalog lengkap produk cat marka jalan thermoplastic, coldplastic, glass beads, rambu, paku jalan, dan perlengkapan keselamatan jalan berkualitas dari PT. Dua Putra Srikandi.",
    images: ["/dps-logo-default.png"],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
