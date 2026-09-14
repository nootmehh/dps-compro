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

export const revalidate = 60;

export default async function HomePage() {
  const siteContent = await getSiteContent();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center w-full">
      {/* Fixed Sticky Navbar */}
      <Navbar variant="auto" whatsappUrl={siteContent?.whatsapp_url || undefined} />

      {/* 1. Hero Section (Rendered immediately above-the-fold for high Speed Index) */}
      <Hero
        heroMediaUrl={siteContent?.hero_img_url || undefined}
        whatsappUrl={siteContent?.whatsapp_url || undefined}
      />

      {/* 2. Why Choose Us (Key Metrics Bar) */}
      <RevealSection className="w-full">
        <WhyChooseUs
          valueSatisfyCustomer={siteContent?.value_satisfy_customer}
          valueFinishedServices={siteContent?.value_finished_services}
          valueProductProduced={siteContent?.value_product_produced}
          valueYearsExperience={siteContent?.value_years_experience}
        />
      </RevealSection>

      {/* 3. About Us Section */}
      <RevealSection className="w-full">
        <About
          mediaUrl={siteContent?.about_image_url || undefined}
          description={siteContent?.about_description_short || undefined}
          primaryButtonHref="/tentang"
          secondaryButtonHref="/tentang#legalitas"
        />
      </RevealSection>

      {/* 4. What We Do (Products & Services Tab Section) */}
      <RevealSection className="w-full">
        <WhatWeDo />
      </RevealSection>

      {/* 5. Gallery Section (Results of Our Work) */}
      <RevealSection className="w-full">
        <GallerySection
          title={siteContent?.more_title || undefined}
          items={siteContent?.gallery || undefined}
        />
      </RevealSection>

      {/* 5b. Trusted Partners Section */}
      <RevealSection className="w-full">
        <PartnerSection partner_img_url={siteContent?.partner_img_url || undefined} />
      </RevealSection>

      {/* 6. Articles Section */}
      <RevealSection className="w-full">
        <ArticleSection />
      </RevealSection>

      {/* 7. Testimonials Section */}
      <RevealSection className="w-full">
        <Testimonial testimonials={siteContent?.testimonials || undefined} />
      </RevealSection>

      {/* 8. Call to Action Banner */}
      <RevealSection className="w-full">
        <CtaSection whatsappUrl={siteContent?.whatsapp_url || undefined} />
      </RevealSection>

      {/* 9. Footer Section */}
      <RevealSection className="w-full">
        <Footer
          phone={siteContent?.phone || undefined}
          email={siteContent?.email || undefined}
          address={siteContent?.address || undefined}
          whatsappUrl={siteContent?.whatsapp_url || undefined}
          socialMedia={siteContent?.social_media || undefined}
        />
      </RevealSection>
    </div>
  );
}
