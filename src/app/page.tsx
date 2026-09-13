import Script from "next/script";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import WhyChooseUs from "@/components/sections/whyChooseUs";
import About from "@/components/sections/about";
import WhatWeDo from "@/components/sections/whatWeDo";
import GallerySection from "@/components/sections/gallerySection";
import PartnerSection from "@/components/sections/partnerSection";
import ArticleSection from "@/components/sections/articleSection";
import Testimonial from "@/components/sections/testimonial";
import CtaSection from "@/components/sections/cta";
import RevealSection from "@/components/common/revealSection";
import { getSiteContent } from "@/api/siteContent";

export default async function HomePage() {
  const siteContent = await getSiteContent();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center w-full">
      {/* Google tag (gtag.js) - Google Analytics */}
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
      {/* Fixed Sticky Navbar */}
      <Navbar variant="auto" />

      {/* 1. Hero Section */}
      <RevealSection className="w-full" delay={80}>
        <Hero heroMediaUrl={siteContent?.hero_img_url || undefined} />
      </RevealSection>

      {/* 2. Why Choose Us (Key Metrics Bar) */}
      <RevealSection className="w-full">
        <WhyChooseUs />
      </RevealSection>

      {/* 3. About Us Section */}
      <RevealSection className="w-full">
        <About />
      </RevealSection>

      {/* 4. What We Do (Products & Services Tab Section) */}
      <RevealSection className="w-full">
        <WhatWeDo />
      </RevealSection>

      {/* 5. Gallery Section (Results of Our Work) */}
      <RevealSection className="w-full">
        <GallerySection />
      </RevealSection>

      {/* 5b. Trusted Partners Section */}
      <RevealSection className="w-full">
        <PartnerSection />
      </RevealSection>

      {/* 6. Articles Section */}
      <RevealSection className="w-full">
        <ArticleSection />
      </RevealSection>

      {/* 7. Testimonials Section */}
      <RevealSection className="w-full">
        <Testimonial />
      </RevealSection>

      {/* 8. Call to Action Banner */}
      <RevealSection className="w-full">
        <CtaSection />
      </RevealSection>

      {/* 9. Footer Section */}
      <RevealSection className="w-full">
        <Footer />
      </RevealSection>
    </div>
  );
}
