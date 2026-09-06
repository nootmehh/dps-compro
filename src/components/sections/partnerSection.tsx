"use client";

export interface PartnerLogo {
  id: string | number;
  name?: string;
  imageSrc?: string;
  widthClass?: string;
}

export interface PartnerSectionProps {
  title?: string;
  partners?: PartnerLogo[];
  className?: string;
}

const DEFAULT_PARTNERS: PartnerLogo[] = [
  { id: 1, name: "Partner 1", imageSrc: "https://placehold.co/84x64/f8f4f0/94a3b8?text=Logo+1", widthClass: "w-20" },
  { id: 2, name: "Partner 2", imageSrc: "https://placehold.co/76x64/f8f4f0/94a3b8?text=Logo+2", widthClass: "w-20" },
  { id: 3, name: "Partner 3", imageSrc: "https://placehold.co/84x63/f8f4f0/94a3b8?text=Logo+3", widthClass: "w-20" },
  { id: 4, name: "Partner 4", imageSrc: "https://placehold.co/61x64/f8f4f0/94a3b8?text=Logo+4", widthClass: "w-16" },
  { id: 5, name: "Partner 5", imageSrc: "https://placehold.co/242x63/f8f4f0/94a3b8?text=Partner+Corporation", widthClass: "w-48 sm:w-60" },
  { id: 6, name: "Partner 6", imageSrc: "https://placehold.co/64x64/f8f4f0/94a3b8?text=Logo+6", widthClass: "w-16" },
  { id: 7, name: "Partner 7", imageSrc: "https://placehold.co/98x66/f8f4f0/94a3b8?text=Logo+7", widthClass: "w-24" },
];

export default function PartnerSection({
  title = "Mitra Terpercaya Kami",
  partners = DEFAULT_PARTNERS,
  className = "",
}: PartnerSectionProps) {
  const hasBg = className.includes("bg-");
  const hasBorder = className.includes("border-");
  const hasPaddingY = className.includes("py-") || (className.includes("pt-") && className.includes("pb-"));
  return (
    <section
      aria-label="Partner Section"
      className={`w-full ${hasBg ? "" : "bg-brand-background"} ${hasPaddingY ? "" : "py-10 md:py-12"} ${hasBorder ? "" : "border-b border-gray-100"} ${className}`}
    >
      <div className="w-full max-w-360 px-6 md:px-16 lg:px-24 mx-auto flex flex-col justify-center items-center gap-6">
        {/* Section Heading */}
        <h2 className="w-full text-center text-dark text-xl sm:text-2xl font-bold font-sans">
          {title}
        </h2>

        {/* Partner Logos Row */}
        <div className="w-full flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-10">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className={`h-16 ${partner.widthClass || "w-24"} flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 select-none`}
            >
              <img
                src={partner.imageSrc}
                alt={partner.name || `Partner ${partner.id}`}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
