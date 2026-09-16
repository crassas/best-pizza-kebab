import type { Localized, MenuCategory, MenuItem, MenuSize } from "./restaurant-base";

const L = (pt: string, en: string): Localized => ({ pt, en });

type ItemCorrection = {
  price?: number | null;
  sizes?: MenuSize[];
  name?: Localized;
  description?: Localized;
  servedWith?: Localized;
};

// Evidence source: current in-store menu board photographed on 2026-09-16.
// Keep corrections conservative: only values that are clearly legible on the board.
const CORRECTIONS: Record<string, ItemCorrection> = {
  durum: { price: 4.5 },
  doner: { price: 4.0 },

  "hamburger-menu": { price: 7.5 },
  "double-hamburger-menu": { price: 11.0 },
  "egg-burger-menu": { price: 6.99 },
  "crispy-chicken-burger": { price: 7.5 },
  "cheese-burger-menu": { price: 7.5 },

  "chicken-strips-menu": { price: 7.5 },
  "chicken-nugget-menu": { price: 6.5 },
  "chicken-wings-menu": { price: 7.5 },
  "chicken-mix-box": {
    price: 10.0,
    description: L("4 nuggets + 4 asinhas + 4 tiras de frango", "4 nuggets + 4 wings + 4 chicken strips"),
  },

  margherita: {
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 6.0 },
      { id: "large", label: L("Grande", "Large"), price: 8.99 },
    ],
  },
  tuna: {
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 6.99 },
      { id: "large", label: L("Grande", "Large"), price: 9.99 },
    ],
  },
  "special-kebab": {
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 6.99 },
      { id: "large", label: L("Grande", "Large"), price: 9.99 },
    ],
  },
  "chicken-pizza": {
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 7.99 },
      { id: "large", label: L("Grande", "Large"), price: 10.99 },
    ],
  },
  vegetarian: {
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 6.99 },
      { id: "large", label: L("Grande", "Large"), price: 9.99 },
    ],
  },
  "doner-chicken": {
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 6.99 },
      { id: "large", label: L("Grande", "Large"), price: 9.99 },
    ],
  },
  "pepperoni-lover": {
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 6.99 },
      { id: "large", label: L("Grande", "Large"), price: 9.99 },
    ],
  },
  "frutti-di-mare": {
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 9.0 },
      { id: "large", label: L("Grande", "Large"), price: 10.0 },
    ],
  },
  "pizza-salmao": {
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 8.0 },
      { id: "large", label: L("Grande", "Large"), price: 9.0 },
    ],
  },
  "pizza-salami": {
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 9.0 },
      { id: "large", label: L("Grande", "Large"), price: 10.0 },
    ],
  },
  "pizza-4-cheese": {
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 8.0 },
      { id: "large", label: L("Grande", "Large"), price: 9.0 },
    ],
  },

  "extra-carne": { price: 1.5 },
  "mozzarella-stick": {
    name: L("Palitos de Mozzarella (8 peças)", "Mozzarella Sticks (8 pcs)"),
    price: 7.0,
  },
  "rolinho-primavera": {
    name: L("Rolinhos Primavera (10 peças)", "Spring Rolls (10 pcs)"),
    price: 8.0,
  },
  "batata-frita": {
    price: null,
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 1.5 },
      { id: "large", label: L("Grande", "Large"), price: 2.5 },
    ],
  },
  "agua-natural": {
    name: L("Água (33 cl)", "Water (33 cl)"),
    price: 1.0,
  },
  fanta: { price: 1.7 },
  "extra-power": { price: 2.0 },
};

const extraPizzaItems: MenuItem[] = [
  {
    id: "pizza-ricola",
    name: L("Pizza Ricola", "Ricola Pizza"),
    description: L(
      "Espinafres, queijo feta, pimento e cebola.",
      "Spinach, feta cheese, pepper and onion.",
    ),
    vegetarian: true,
    price: null,
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 8.5 },
      { id: "large", label: L("Grande", "Large"), price: 9.5 },
    ],
  },
  {
    id: "calzone-kebab",
    name: L("Calzone de Kebab", "Kebab Calzone"),
    description: L(
      "Recheio de kebab, queijo feta e cebola.",
      "Filled with kebab, feta cheese and onion.",
    ),
    price: null,
    sizes: [
      { id: "small", label: L("Pequena", "Small"), price: 8.0 },
      { id: "large", label: L("Grande", "Large"), price: 9.0 },
    ],
  },
];

const indianCategory: MenuCategory = {
  id: "indian",
  label: L("Comida Indiana", "Indian Dishes"),
  intro: L("Pratos com arroz indicados na carta do restaurante.", "Rice dishes listed on the restaurant menu board."),
  items: [
    {
      id: "indian-chicken-curry-rice",
      name: L("Frango de Caril com Arroz", "Chicken Curry with Rice"),
      price: 8.5,
    },
    {
      id: "indian-chicken-peppers-rice",
      name: L("Frango com Pimentos e Cebola", "Chicken with Peppers and Onion"),
      description: L("Ligeiramente picante, servido com arroz.", "Slightly spicy, served with rice."),
      price: 9.0,
    },
    {
      id: "indian-butter-chicken-almonds",
      name: L("Frango com Manteiga e Amêndoas", "Butter Chicken with Almonds"),
      servedWith: L("arroz", "rice"),
      price: 9.0,
    },
    {
      id: "indian-mixed-vegetables-curry",
      name: L("Legumes Mistos com Molho Curry", "Mixed Vegetables with Curry Sauce"),
      vegetarian: true,
      servedWith: L("arroz", "rice"),
      price: 9.5,
    },
  ],
};

const pastaAsianCategory: MenuCategory = {
  id: "pasta",
  label: L("Massas & Asiático", "Pasta & Asian"),
  intro: L("Massas e pratos asiáticos da carta física.", "Pasta and Asian dishes from the in-store menu board."),
  items: [
    {
      id: "pasta-napoli",
      name: L("Pasta Napoli", "Napoli Pasta"),
      description: L("Molho de tomate, com rigatoni ou esparguete.", "Tomato sauce, served with rigatoni or spaghetti."),
      vegetarian: true,
      price: 7.0,
    },
    {
      id: "pasta-quattro-formaggi",
      name: L("Pasta Quattro Formaggi", "Quattro Formaggi Pasta"),
      description: L("Com rigatoni ou esparguete.", "Served with rigatoni or spaghetti."),
      vegetarian: true,
      price: 9.0,
    },
    {
      id: "pasta-chicken-pineapple-curry",
      name: L("Peito de Frango Milan", "Milan Chicken Breast"),
      description: L("Caril de ananás e molho cremoso.", "Pineapple curry with creamy sauce."),
      price: 8.5,
    },
    {
      id: "pasta-broccoli-peas-creamy",
      name: L("Especial com Brócolos e Ervilhas", "Broccoli & Peas Special"),
      description: L("Com molho cremoso.", "With creamy sauce."),
      vegetarian: true,
      price: 8.5,
    },
    {
      id: "pasta-seafood-garlic",
      name: L("Marisco Frutti di Mare", "Seafood Frutti di Mare"),
      description: L("Molho de tomate com alho.", "Tomato sauce with garlic."),
      price: 9.5,
    },
    {
      id: "thai-chicken-noodles-rice",
      name: L("Noodles ou Arroz com Frango", "Noodles or Rice with Chicken"),
      description: L("Com ovo e vegetais asiáticos.", "With egg and Asian vegetables."),
      price: 9.0,
    },
    {
      id: "thai-crab-noodles-rice",
      name: L("Noodles ou Arroz com Caranguejo", "Noodles or Rice with Crab"),
      description: L("Com ovo e vegetais asiáticos.", "With egg and Asian vegetables."),
      price: 9.5,
    },
    {
      id: "thai-vegetable-noodles-rice",
      name: L("Noodles ou Arroz com Legumes", "Noodles or Rice with Vegetables"),
      description: L("Vegetais asiáticos salteados.", "Stir-fried Asian vegetables."),
      vegetarian: true,
      price: 8.0,
    },
  ],
};

const extraItems: MenuItem[] = [
  { id: "garlic-naan", name: L("Garlic Naan", "Garlic Naan"), price: 2.5 },
  { id: "sada-naan", name: L("Sada Naan", "Sada Naan"), price: 1.5 },
  { id: "batata-doce", name: L("Batata Doce", "Sweet Potato Fries"), price: 3.0 },
  { id: "batatas-trelica", name: L("Batatas em Treliça", "Lattice Fries"), price: 3.0 },
  { id: "punjabi-veg-samosa", name: L("Punjabi Veg Samosa", "Punjabi Veg Samosa"), vegetarian: true, price: 1.5 },
];

const beerItems: MenuItem[] = [
  { id: "sagres", name: L("Sagres", "Sagres Beer"), price: 2.0 },
];

function applyCorrection(item: MenuItem): MenuItem {
  const correction = CORRECTIONS[item.id];
  if (!correction) return item;
  return {
    ...item,
    ...correction,
    name: correction.name ?? item.name,
    description: correction.description ?? item.description,
    servedWith: correction.servedWith ?? item.servedWith,
    sizes: correction.sizes ?? item.sizes,
  };
}

function appendUnique(items: MenuItem[], additions: MenuItem[]) {
  const ids = new Set(items.map((item) => item.id));
  return [...items, ...additions.filter((item) => !ids.has(item.id))];
}

export function buildVerifiedMenu(baseMenu: MenuCategory[]): MenuCategory[] {
  const corrected = baseMenu.map((category) => {
    let items = category.items.map(applyCorrection);
    if (category.id === "pizza") items = appendUnique(items, extraPizzaItems);
    if (category.id === "extras") items = appendUnique(items, extraItems);
    if (category.id === "beers") items = appendUnique(items, beerItems);
    return { ...category, items };
  });

  const withoutExpansion = corrected.filter((category) => !["indian", "pasta"].includes(category.id));
  const pizzaIndex = withoutExpansion.findIndex((category) => category.id === "pizza");
  const insertAt = pizzaIndex >= 0 ? pizzaIndex : withoutExpansion.length;

  return [
    ...withoutExpansion.slice(0, insertAt),
    indianCategory,
    pastaAsianCategory,
    ...withoutExpansion.slice(insertAt),
  ];
}
