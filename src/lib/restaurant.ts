export * from "./restaurant-base";
import { menu as baseMenu, seo as baseSeo, type MenuItem } from "./restaurant-base";
import { buildVerifiedMenu } from "./menu-expansion";

export type DishWithCategory = MenuItem & { categoryId: string };

// The physical in-store menu photographed on 2026-09-16 is layered on top of
// the existing menu. This keeps the current site stable while adding verified
// categories/items and correcting clearly legible prices without rewriting the
// original source-of-truth file.
export const menu = buildVerifiedMenu(baseMenu);
export const CATEGORIES = menu;
export const ALL_DISHES: DishWithCategory[] = menu.flatMap((category) =>
  category.items.map((item) => ({ ...item, categoryId: category.id })),
);

// Keep all SEO metadata on the real production domain.
export const seo = {
  ...baseSeo,
  canonical: "https://bestpizzaandkebab.pt/",
};
