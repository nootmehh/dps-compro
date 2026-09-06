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

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  className?: string;
  showDot?: boolean;
}

const variantClasses: Record<
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

export default function Badge({
  text,
  variant = "green",
  className = "",
  showDot = true,
}: BadgeProps) {
  const selected = variantClasses[variant] || variantClasses.green;

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