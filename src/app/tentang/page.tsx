import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import About from "@/components/sections/about";
import VisionMission from "@/components/sections/visionMission";
import PartnerSection from "@/components/sections/partnerSection";
import LegalitySection from "@/components/sections/legalitySection";
import GallerySection from "@/components/sections/gallerySection";
import WhatWeDo from "@/components/sections/whatWeDo";
import WhyChooseUs from "@/components/sections/whyChooseUs";
import Testimonial from "@/components/sections/testimonial";
import CtaSection from "@/components/sections/cta";
import RevealSection from "@/components/common/revealSection";
import { getSiteContent } from "@/api/siteContent";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Profil PT. Dua Putra Srikandi - Kontraktor terpercaya spesialis pengecatan marka jalan, penyedia bahan, rambu lalu lintas, dan perlengkapan keselamatan jalan berstandar nasional.",
  openGraph: {
    title: "Tentang Kami | PT. Dua Putra Srikandi",
    description:
      "Profil PT. Dua Putra Srikandi - Kontraktor terpercaya spesialis pengecatan marka jalan, penyedia bahan, rambu lalu lintas, dan perlengkapan keselamatan jalan berstandar nasional.",
    type: "website",
    siteName: "PT. Dua Putra Srikandi",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tentang PT. Dua Putra Srikandi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Kami | PT. Dua Putra Srikandi",
    description:
      "Profil PT. Dua Putra Srikandi - Kontraktor terpercaya spesialis pengecatan marka jalan, penyedia bahan, rambu lalu lintas, dan perlengkapan keselamatan jalan berstandar nasional.",
    images: ["/og-image.png"],
  },
};

export default async function TentangPage() {
  const siteContent = await getSiteContent();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center w-full">
      {/* Sticky / Solid Navbar */}
      <Navbar variant="auto" whatsappUrl={siteContent?.whatsapp_url || undefined} />

      {/* Main Content Area */}
      <main className="w-full flex flex-col items-center">
        {/* 1. About Section (Reversed layout variant with custom text) */}
        <RevealSection className="w-full" delay={80}>
          <About
            tagline="TENTANG KAMI"
            title="Apa itu PT. Dua Putra Srikandi?"
            mediaUrl={siteContent?.about_image_url || undefined}
            description={siteContent?.about_description_long || undefined}
            primaryButtonText="Lihat Layanan Kami"
            primaryButtonHref="/layanan"
            secondaryButtonText="Lihat Produk Kami"
            secondaryButtonHref="/produk"
            layout="reversed"
            className="pt-28 md:pt-36 pb-12 md:pb-16"
          />
        </RevealSection>

        {/* 2. Vision & Mission Section */}
        <RevealSection className="w-full">
          <VisionMission
            vision={siteContent?.vision}
            mission={siteContent?.mission}
            vision_img_url={siteContent?.vision_img_url}
          />
        </RevealSection>

        {/* 3. Trusted Partners Section (White background, no py padding on Tentang page) */}
        <RevealSection className="w-full">
          <PartnerSection
            partner_img_url={siteContent?.partner_img_url || undefined}
            className="bg-white border-b-0 py-0"
          />
        </RevealSection>

        {/* 4. Legality Accordion Section */}
        <RevealSection className="w-full">
          <LegalitySection legality={siteContent?.legality} />
        </RevealSection>

        {/* 5. Gallery Section */}
        <RevealSection className="w-full">
          <div className="w-full bg-linear-to-bl from-[#0BA86D] to-[#028151]">
            <GallerySection
              title={siteContent?.more_title || undefined}
              items={siteContent?.gallery || undefined}
            />
          </div>
        </RevealSection>

        {/* 6. What We Do Section */}
        <RevealSection className="w-full">
          <WhatWeDo />
        </RevealSection>

        {/* 7. Why Choose Us Section (Brand background on Tentang page) */}
        <RevealSection className="w-full">
          <WhyChooseUs
            valueSatisfyCustomer={siteContent?.value_satisfy_customer}
            valueFinishedServices={siteContent?.value_finished_services}
            valueProductProduced={siteContent?.value_product_produced}
            valueYearsExperience={siteContent?.value_years_experience}
            className="bg-brand-background py-10 md:py-12 border-b border-gray-100"
          />
        </RevealSection>

        {/* 8. Testimonials Section */}
        <RevealSection className="w-full">
          <Testimonial testimonials={siteContent?.testimonials || undefined} />
        </RevealSection>

        {/* 9. CTA Banner (Bottom before footer) */}
        <RevealSection className="w-full">
          <CtaSection whatsappUrl={siteContent?.whatsapp_url || undefined} />
        </RevealSection>
      </main>

      {/* Footer */}
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
