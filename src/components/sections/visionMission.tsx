"use client";

import { useState } from "react";
import LordIcon from "../common/lordIcon";

export interface VisionMissionProps {
  title?: string;
  imageSrc?: string;
  visionText?: string;
  missionList?: string[];
  className?: string;
}

const DEFAULT_MISSION_LIST = [
  "Memberikan layanan terbaik dengan ketepatan waktu dan harga yang kompetitif.",
  "Menghasilkan produk dan jasa yang sesuai dengan standar mutu.",
  "Meningkatkan efisiensi dan produktivitas.",
  "Membuat strategi khusus guna membuat mitra kerja yang sehat serta hubungan yang berkesinambungan.",
  "Berusaha menciptakan kesejahteraan karyawan.",
];

export default function VisionMission({
  title = "Visi & Misi Kami",
  imageSrc = "https://placehold.co/520x320",
  visionText = "Menyediakan produk dan jasa bermutu tinggi, berdaya saing kuat demi terciptanya kerjasama yang baik, serta meningkatkan keuntungan dan pertumbuhan bagi perusahaan serta instansi terkait.",
  missionList = DEFAULT_MISSION_LIST,
  className = "",
}: VisionMissionProps) {
  const [isVisionHovered, setIsVisionHovered] = useState(false);
  const [isMissionHovered, setIsMissionHovered] = useState(false);

  return (
    <section
      aria-label="Vision and Mission Section"
      className={`w-full bg-white py-12 md:py-16 overflow-hidden flex flex-col items-center ${className}`}
    >
      <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto flex flex-col items-center gap-8 md:gap-10">
        {/* Section Heading (Matches Our Partner heading size) */}
        <h2 className="w-full text-center text-dark text-xl sm:text-2xl font-bold font-sans">
          {title}
        </h2>

        {/* 2-Column Content: Left Image, Right Vision & Mission Cards */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16">
          {/* Left Column: Image Preview */}
          <div className="w-full lg:w-130 h-72 sm:h-80 rounded-4xl overflow-hidden bg-brand-background border border-gray-100 shrink-0">
            <img
              src={imageSrc}
              alt="Visi dan Misi PT. Dua Putra Srikandi"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Vision & Mission Cards */}
          <div className="flex-1 w-full flex flex-col justify-start items-center gap-6">
            {/* Vision Card (G1 outline on hover) */}
            <div
              id="card-vision"
              onMouseEnter={() => setIsVisionHovered(true)}
              onMouseLeave={() => setIsVisionHovered(false)}
              style={{
                border: isVisionHovered
                  ? "1.5px solid var(--g1, #0A9863)"
                  : "1.5px solid transparent",
              }}
              className="w-full p-6 bg-brand-background rounded-3xl flex flex-col justify-start items-center text-center gap-3 transition-all duration-200 select-none"
            >
              {/* Header Centered with LordIcon on the left side */}
              <div className="flex flex-row justify-center items-center gap-2 text-center">
                <div className="shrink-0 flex items-center justify-center">
                  <LordIcon
                    name="Info"
                    size={20}
                    primaryColor="#0A9863"
                    trigger="hover"
                    target="#card-vision"
                  />
                </div>
                <h3 className="text-center text-g1 text-base sm:text-lg font-bold font-sans">
                  Visi Perusahaan Kami
                </h3>
              </div>

              {/* Vision Description */}
              <p className="w-full text-center text-dark/60 text-sm font-normal font-sans leading-relaxed">
                {visionText}
              </p>
            </div>

            {/* Mission Card (G1 outline on hover) */}
            <div
              id="card-mission"
              onMouseEnter={() => setIsMissionHovered(true)}
              onMouseLeave={() => setIsMissionHovered(false)}
              style={{
                border: isMissionHovered
                  ? "1.5px solid var(--g1, #0A9863)"
                  : "1.5px solid transparent",
              }}
              className="w-full p-6 bg-brand-background rounded-3xl flex flex-col justify-start items-center text-center gap-3 transition-all duration-200 select-none"
            >
              {/* Header Centered with LordIcon on the left side */}
              <div className="flex flex-row justify-center items-center gap-2 text-center">
                <div className="shrink-0 flex items-center justify-center">
                  <LordIcon
                    name="Target"
                    size={20}
                    primaryColor="#0A9863"
                    trigger="hover"
                    target="#card-mission"
                  />
                </div>
                <h3 className="text-center text-g1 text-base sm:text-lg font-bold font-sans">
                  Misi Perusahaan Kami
                </h3>
              </div>

              {/* Mission Content: Array of points with dots on the left */}
              <ul className="w-full list-disc list-outside pl-5 text-left text-dark/70 text-sm font-normal font-sans leading-relaxed space-y-2">
                {missionList.map((item, idx) => (
                  <li key={idx} className="pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
