"use client";

import LordIcon from "../common/lordIcon";

export interface WhyChooseUsStat {
  id?: string | number;
  value: string;
  label: string;
  iconName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  quaternaryColor?: string;
  imageSrc?: string;
}

export interface WhyChooseUsProps {
  title?: string;
  stats?: WhyChooseUsStat[];
  className?: string;
}

const DEFAULT_STATS: WhyChooseUsStat[] = [
  {
    id: 1,
    value: "99%",
    label: "Pelanggan Puas",
    iconName: "ThumbsUp",
    primaryColor: "#0A9863",
    secondaryColor: "#ffc738",
    tertiaryColor: "#f9c9c0",
    quaternaryColor: "#4bb3fd",
  },
  {
    id: 2,
    value: "50+",
    label: "Layanan Diselesaikan",
    iconName: "Road",
    primaryColor: "#0A9863",
    secondaryColor: "#ebe6ef",
    tertiaryColor: "#f24c00",
    quaternaryColor: "#3a3347",
  },
  {
    id: 3,
    value: "300+",
    label: "Produk Diproduksi",
    iconName: "Bucket",
    primaryColor: "#0A9863",
    secondaryColor: "#ffc738",
  },
  {
    id: 4,
    value: "5+",
    label: "Tahun Pengalaman",
    iconName: "Check",
    primaryColor: "#0A9863",
    secondaryColor: "#06D07A",
  },
];

export default function WhyChooseUs({
  title = "Kenapa Pilih Kami?",
  stats = DEFAULT_STATS,
  className = "",
}: WhyChooseUsProps) {
  const hasBg = className.includes("bg-");
  return (
    <section
      aria-label="Why Choose Us Section"
      className={`w-full ${hasBg ? "" : "bg-white"} pt-8 md:pt-8 ${className}`}
    >
      <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto flex flex-col justify-start items-start gap-6">
        {/* Section Heading */}
        <h2 className="self-stretch text-left text-dark text-2xl sm:text-2xl font-bold font-sans">
          {title}
        </h2>

        {/* Stats Row / Grid */}
        <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {stats.map((stat, index) => (
            <div
              key={stat.id || index}
              className="flex-1 flex justify-start items-center gap-4 group"
            >
              {/* Icon */}
              <LordIcon
                name={stat.iconName || "Services"}
                size={64}
                primaryColor={stat.primaryColor || "#0A9863"}
                secondaryColor={stat.secondaryColor}
                tertiaryColor={stat.tertiaryColor}
                quaternaryColor={stat.quaternaryColor}
              />

              {/* Value & Label */}
              <div className="flex-1 flex flex-col justify-start items-start">
                <span className="self-stretch text-left text-g1 text-3xl font-bold font-sans leading-tight">
                  {stat.value}
                </span>
                <span className="self-stretch text-left text-dark/60 text-base font-bold font-sans">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
