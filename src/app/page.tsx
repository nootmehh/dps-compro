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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Fixed Sticky Navbar */}
      <Navbar variant="auto" />

      {/* 1. Hero Section */}
      <div className="w-full">
        <Hero />
      </div>

      {/* 2. Why Choose Us (Key Metrics Bar) */}
      <WhyChooseUs />

      {/* 3. About Us Section */}
      <About />

      {/* 4. What We Do (Products & Services Tab Section) */}
      <WhatWeDo />

      {/* 5. Gallery Section (Results of Our Work) */}
      <GallerySection />

      {/* 5b. Trusted Partners Section */}
      <PartnerSection />

      {/* 6. Articles Section */}
      <ArticleSection />

      {/* 7. Testimonials Section */}
      <Testimonial />

      {/* 8. Call to Action Banner */}
      <CtaSection />

      {/* 9. Footer Section */}
      <Footer />
    </div>
  );
}
