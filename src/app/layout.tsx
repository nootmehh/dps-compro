import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Open_Sans } from "next/font/google";
import { getSeoSettings, DEFAULT_SEO_SETTINGS } from "@/api/seo";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();

  const title =
    seo?.site_title_default?.trim() || DEFAULT_SEO_SETTINGS.site_title_default;
  const description =
    seo?.meta_description_default?.trim() ||
    DEFAULT_SEO_SETTINGS.meta_description_default;

  // Split keywords by comma e.g. "Marka Jalanan, Perbaikan Jalan"
  const rawKeywords = seo?.keywords || DEFAULT_SEO_SETTINGS.keywords || "";
  const keywords = rawKeywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://dpsmarkajalan.com"
    ),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords,
    // favicon.ico served natively from src/app/favicon.ico by Next.js App Router
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "96x96" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: "PT. Dua Putra Srikandi",
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: `${title} - PT. Dua Putra Srikandi`,
        },
        {
          url: "/og-image-square.png",
          width: 600,
          height: 600,
          type: "image/png",
          alt: `${title} - PT. Dua Putra Srikandi`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    verification: {
      google: "ui0qt0eB5J39H-iTttcYbh4rVJsBoWLBnq1eLN7pil4",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seo = await getSeoSettings();
  const gaId =
    seo?.ga_connected && seo?.ga_measurement_id?.trim()
      ? seo.ga_measurement_id.trim()
      : "G-3S0T90E0TT";

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://dpsmarkajalan.com"
  ).replace(/\/$/, "");

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dua Putra Srikandi",
    alternateName: ["PT. Dua Putra Srikandi", "DPS Marka Jalan", "DPS"],
    url: siteUrl,
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT. Dua Putra Srikandi",
    alternateName: "Dua Putra Srikandi",
    url: siteUrl,
    logo: `${siteUrl}/icon-192.png`,
    image: `${siteUrl}/og-image.png`,
  };

  return (
    <html lang="en" className={`${openSans.variable} font-sans antialiased`} suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="ui0qt0eB5J39H-iTttcYbh4rVJsBoWLBnq1eLN7pil4"
        />
        {/* Google Site Name & Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Google tag (gtag.js) - Google Analytics across all pages */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </head>
      <body
        className="min-h-screen bg-brand-background text-dark flex flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
