export * from "./restaurant-base";
import { menu, type MenuItem } from "./restaurant-base";

export type DishWithCategory = MenuItem & { categoryId: string };
export const CATEGORIES = menu;
export const ALL_DISHES: DishWithCategory[] = menu.flatMap((category) =>
  category.items.map((item) => ({ ...item, categoryId: category.id })),
);
