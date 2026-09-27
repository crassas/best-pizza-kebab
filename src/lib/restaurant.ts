export * from "./restaurant-base";
import {
  menu as baseMenu,
  maps as baseMaps,
  restaurant as baseRestaurant,
  seo as baseSeo,
  type AllergenId,
  type MenuItem,
} from "./restaurant-base";
import { buildVerifiedMenu } from "./menu-expansion";

export type DishWithCategory = MenuItem & { categoryId: string };

export const restaurant = {
  ...baseRestaurant,
  address: {
    ...baseRestaurant.address,
    postalCode: "4350-306",
  },
  mapsQuery: "Rua de São Roque da Lameira 2346, 4350-306 Porto, Portugal",
} as const;

export const maps = {
  search: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.mapsQuery)}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.mapsQuery)}`,
  osmEmbed: baseMaps.osmEmbed,
  readReviews: baseMaps.search,
  writeReview: `https://search.google.com/local/writereview?placeid=${baseRestaurant.googlePlaceId}`,
};

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
  title: {
    pt: "Kebab e Pizza em São Roque da Lameira, Porto | Best Kebab & Pizza",
    en: "Kebab & Pizza in São Roque da Lameira, Porto | Best Kebab & Pizza",
  },
  description: {
    pt: "Kebab, pizza, falafel e takeaway na Rua de São Roque da Lameira 2346, Campanhã. Perto de Cartes, Falcão, Cerco e Corujeira. Tel: 920 163 613.",
    en: "Kebab, pizza, falafel and takeaway at Rua de São Roque da Lameira 2346, Campanhã. Near Cartes, Falcão, Cerco and Corujeira. Phone: +351 920 163 613.",
  },
  canonical: "https://bestpizzaandkebab.pt/",
};
