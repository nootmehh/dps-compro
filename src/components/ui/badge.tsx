export type BadgeVariant =
  | "green"
  | "red"
  | "blue"
  | "yellow"
  | "purple"
  | "gray"
  | "indigo"
  | "orange"
  | "pink"
  | "amber"
  | "sky";

export interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  categoryColor?: string | null;
  className?: string;
  showDot?: boolean;
}

export const variantClasses: Record<
  BadgeVariant,
  { container: string; dot: string; text: string }
> = {
  green: {
    container: "bg-g1/10",
    dot: "bg-g1",
    text: "text-g1",
  },
  red: {
    container: "bg-red-state/10",
    dot: "bg-red-state",
    text: "text-red-state",
  },
  blue: {
    container: "bg-blue-state/10",
    dot: "bg-blue-state",
    text: "text-blue-state",
  },
  yellow: {
    container: "bg-yellow-state/20",
    dot: "bg-yellow-500",
    text: "text-yellow-700",
  },
  purple: {
    container: "bg-purple-500/10",
    dot: "bg-purple-500",
    text: "text-purple-600",
  },
  gray: {
    container: "bg-slate-100",
    dot: "bg-slate-500",
    text: "text-dark",
  },
  indigo: {
    container: "bg-indigo-500/10",
    dot: "bg-indigo-500",
    text: "text-indigo-600",
  },
  orange: {
    container: "bg-orange-500/10",
    dot: "bg-orange-500",
    text: "text-orange-600",
  },
  pink: {
    container: "bg-pink-500/15",
    dot: "bg-pink-500",
    text: "text-pink-600",
  },
  amber: {
    container: "bg-amber-400/20",
    dot: "bg-amber-500",
    text: "text-amber-600",
  },
  sky: {
    container: "bg-sky-400/20",
    dot: "bg-sky-500",
    text: "text-sky-600",
  },
};

/**
 * Resolve any category_color string (e.g. "Green", "Purple", "amber")
 * or fallback categoryName to a valid BadgeVariant.
 */
export function resolveBadgeVariant(
  categoryColor?: string | null,
  categoryName?: string | null,
  fallback: BadgeVariant = "green"
): BadgeVariant {
  if (categoryColor && typeof categoryColor === "string") {
    let clean = categoryColor.toLowerCase().trim();
    if (clean === "grey") clean = "gray";
    if (clean in variantClasses) {
      return clean as BadgeVariant;
    }
  }

  if (categoryName && typeof categoryName === "string") {
    const cat = categoryName.toLowerCase().trim();
    if (cat.includes("marka") || cat.includes("bahan") || cat.includes("material")) return "amber";
    if (cat.includes("keselamatan") || cat.includes("penghargaan") || cat.includes("pencapaian")) return "pink";
    if (cat.includes("perlengkapan") || cat.includes("lalu lintas") || cat.includes("rambu")) return "blue";
    if (cat.includes("mesin") || cat.includes("peralatan") || cat.includes("elektrikal")) return "gray";
  }

  return fallback;
}

export default function Badge({
  text,
  variant,
  categoryColor,
  className = "",
  showDot = true,
}: BadgeProps) {
  const resolvedVariant =
    variant ||
    (categoryColor ? resolveBadgeVariant(categoryColor, text) : "green");

  const selected = variantClasses[resolvedVariant] || variantClasses.green;

  return (
    <div
      className={`h-7 px-2.5 py-1 ${selected.container} rounded-full inline-flex justify-center items-center gap-1.5 transition-all ${className}`}
    >
      {showDot && <div className={`size-1.5 ${selected.dot} rounded-full shrink-0`} />}
      <div className={`justify-start ${selected.text} text-xs font-semibold font-sans`}>
        {text}
      </div>
    </div>
  );
}