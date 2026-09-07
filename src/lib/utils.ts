/**
 * Utility functions
 */

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateUniqueSlugs<T extends { id: string; title: string }>(
  items: T[]
): { idToSlug: Map<string, string>; slugToId: Map<string, string> } {
  const slugCounts = new Map<string, number>();
  const idToSlug = new Map<string, string>();
  const slugToId = new Map<string, string>();

  items.forEach((item) => {
    const baseSlug = slugify(item.title) || item.id;
    const count = (slugCounts.get(baseSlug) || 0) + 1;
    slugCounts.set(baseSlug, count);

    const finalSlug = count === 1 ? baseSlug : `${baseSlug}-${count}`;
    idToSlug.set(item.id, finalSlug);
    slugToId.set(finalSlug, item.id);
  });

  return { idToSlug, slugToId };
}
