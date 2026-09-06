"use client";

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

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Sticky / Solid Navbar */}
      <Navbar variant="auto" />

      {/* Main Content Area */}
      <main className="w-full flex flex-col items-center">
        {/* 1. About Section (Reversed layout variant with custom text) */}
        <About
          tagline="TENTANG KAMI"
          title="Apa itu PT. Dua Putra Srikandi?"
          description={
            <>
              <p>
                Berdiri sejak tahun 2020, kami adalah{" "}
                <span className="font-semibold text-dark/80">
                  penyedia jasa kontraktor dan kelengkapan jalan yang terpercaya
                </span>
                . Dengan dukungan tenaga ahli profesional, kami berkomitmen
                menghadirkan produk bermutu tinggi, tepat waktu, dan berdaya
                saing untuk setiap proyek pelaksanaan maupun pengadaan Anda.
              </p>
              <p>
                Sebagai mitra strategis dalam pengembangan infrastruktur,
                portofolio layanan kami mencakup berbagai kebutuhan esensial
                keselamatan dan kelengkapan jalan. Kami melayani pengerjaan marka
                jalan, instalasi rambu lalu lintas, pemasangan guardrail (pagar
                pengaman), delineator, hingga penyediaan paku jalan dan
                Penerangan Jalan Umum (PJU). Seluruh material dan proses kerja
                yang kami aplikasikan selalu dipastikan memenuhi Standar Nasional
                Indonesia (SNI) serta regulasi spesifikasi teknis yang berlaku,
                demi menjamin durabilitas dan tingkat keamanan maksimal bagi para
                pengguna jalan.
              </p>
            </>
          }
          primaryButtonText="Lihat Layanan Kami"
          primaryButtonHref="/layanan"
          secondaryButtonText="Lihat Produk Kami"
          secondaryButtonHref="/produk"
          layout="reversed"
          className="pt-28 md:pt-36 pb-12 md:pb-16"
        />

        {/* 2. Vision & Mission Section */}
        <VisionMission />

        {/* 3. Trusted Partners Section (White background, no py padding on Tentang page) */}
        <PartnerSection className="bg-white border-b-0 py-0" />

        {/* 4. Legality Accordion Section */}
        <LegalitySection />

        {/* 5. Gallery Section */}
        <div className="w-full bg-linear-to-bl from-[#0BA86D] to-[#028151]">
          <GallerySection />
        </div>

        {/* 6. What We Do Section */}
        <WhatWeDo />

        {/* 7. Why Choose Us Section (Brand background on Tentang page) */}
        <WhyChooseUs className="bg-brand-background py-10 md:py-12 border-b border-gray-100" />

        {/* 8. Testimonials Section */}
        <Testimonial />

        {/* 9. CTA Banner (Bottom before footer) */}
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
