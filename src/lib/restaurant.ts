export * from "./restaurant-base";
import {
  menu as baseMenu,
  seo as baseSeo,
  type AllergenId,
  type MenuItem,
} from "./restaurant-base";
import { buildVerifiedMenu } from "./menu-expansion";

export type DishWithCategory = MenuItem & { categoryId: string };

// The physical in-store menu photographed on 2026-09-16 is layered on top of
// the existing menu. This keeps the current site stable while adding verified
// categories/items and correcting clearly legible prices without rewriting the
// original source-of-truth file.
const KNOWN_ALLERGENS_BY_ITEM: Partial<Record<string, AllergenId[]>> = {
  "egg-burger-menu": ["eggs"],
  "cheese-burger-menu": ["milk"],
  "cheese-burger-single": ["milk"],
  margherita: ["milk"],
  tuna: ["fish", "milk"],
  "special-kebab": ["milk"],
  "chicken-pizza": ["milk"],
  vegetarian: ["milk"],
  "doner-chicken": ["milk"],
  "onion-pizza": ["milk"],
  "pepperoni-lover": ["milk"],
  "pizza-salmao": ["fish"],
  "pizza-salami": ["milk"],
  "pizza-4-cheese": ["milk"],
  "mozzarella-stick": ["milk"],
};

const verifiedMenu = buildVerifiedMenu(baseMenu);

export const menu = verifiedMenu.map((category) => ({
  ...category,
  items: category.items.map((item) => ({
    ...item,
    knownAllergens: KNOWN_ALLERGENS_BY_ITEM[item.id] ?? item.knownAllergens,
  })),
}));
export const CATEGORIES = menu;
export const ALL_DISHES: DishWithCategory[] = menu.flatMap((category) =>
  category.items.map((item) => ({ ...item, categoryId: category.id })),
);

// Keep all SEO metadata on the real production domain.
export const seo = {
  ...baseSeo,
  canonical: "https://bestpizzaandkebab.pt/",
};
