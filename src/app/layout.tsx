import type { Metadata } from "next";
import Script from "next/script";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DPS CMS",
  description: "DPS Content Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} font-sans antialiased`}>
      <head>
        {/* Google tag (gtag.js) - Google Analytics across all pages */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3S0T90E0TT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3S0T90E0TT');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-brand-background text-dark flex flex-col">
        {children}
      </body>
    </html>
  );
}
