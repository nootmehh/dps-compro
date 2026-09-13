import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Layanan",
  description:
    "Jelajahi seluruh layanan konstruksi, pengecatan marka jalan, pemasangan rambu lalu lintas, guardrail, dan penerangan jalan umum (PJU) dari PT. Dua Putra Srikandi.",
  openGraph: {
    title: "Katalog Layanan | PT. Dua Putra Srikandi",
    description:
      "Jelajahi seluruh layanan konstruksi, pengecatan marka jalan, pemasangan rambu lalu lintas, guardrail, dan penerangan jalan umum (PJU) dari PT. Dua Putra Srikandi.",
    type: "website",
    siteName: "PT. Dua Putra Srikandi",
    locale: "id_ID",
    images: [
      {
        url: "/dps-logo-default.png",
        width: 1200,
        height: 630,
        alt: "Katalog Layanan PT. Dua Putra Srikandi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Katalog Layanan | PT. Dua Putra Srikandi",
    description:
      "Jelajahi seluruh layanan konstruksi, pengecatan marka jalan, pemasangan rambu lalu lintas, guardrail, dan penerangan jalan umum (PJU) dari PT. Dua Putra Srikandi.",
    images: ["/dps-logo-default.png"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
