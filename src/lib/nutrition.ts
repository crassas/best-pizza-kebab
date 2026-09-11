import type { Localized } from "@/lib/restaurant";

export type NutritionInfo = {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  allergens: Localized[];
};

const L = (pt: string, en: string): Localized => ({ pt, en });

export function getNutritionInfo(itemId: string, categoryId: string, isVegetarian: boolean): NutritionInfo {
  const normalizedId = itemId.toLowerCase();
  const normalizedCat = categoryId.toLowerCase();

  // 1. Pizzas
  if (normalizedCat === "pizza" || normalizedCat === "pizzas" || normalizedId.includes("pizza")) {
    const isLarge = normalizedId.includes("large");
    const baseAllergens = [L("Glúten", "Gluten"), L("Laticínios", "Dairy/Milk")];
    
    if (normalizedId.includes("tuna") || normalizedId.includes("atum")) {
      return {
        calories: isLarge ? "1200 - 1400 kcal" : "750 - 850 kcal",
        protein: isLarge ? "58g" : "34g",
        carbs: isLarge ? "150g" : "90g",
        fat: isLarge ? "40g" : "24g",
        allergens: [...baseAllergens, L("Peixe", "Fish")]
      };
    }
    if (normalizedId.includes("frutti") || normalizedId.includes("mare") || normalizedId.includes("marisco")) {
      return {
        calories: isLarge ? "1100 - 1300 kcal" : "700 - 800 kcal",
        protein: isLarge ? "52g" : "31g",
        carbs: isLarge ? "148g" : "88g",
        fat: isLarge ? "32g" : "19g",
        allergens: [...baseAllergens, L("Moluscos", "Molluscs"), L("Crustáceos", "Crustaceans")]
      };
    }
    if (normalizedId.includes("pepperoni")) {
      return {
        calories: isLarge ? "1350 - 1550 kcal" : "850 - 950 kcal",
        protein: isLarge ? "62g" : "38g",
        carbs: isLarge ? "145g" : "86g",
        fat: isLarge ? "55g" : "32g",
        allergens: baseAllergens
      };
    }
    if (isVegetarian || normalizedId.includes("veg") || normalizedId.includes("margherita") || normalizedId.includes("onion") || normalizedId.includes("cebola")) {
      return {
        calories: isLarge ? "1000 - 1150 kcal" : "620 - 720 kcal",
        protein: isLarge ? "45g" : "28g",
        carbs: isLarge ? "145g" : "86g",
        fat: isLarge ? "28g" : "17g",
        allergens: baseAllergens
      };
    }
    // Default Pizza
    return {
      calories: isLarge ? "1250 - 1450 kcal" : "780 - 880 kcal",
      protein: isLarge ? "56g" : "35g",
      carbs: isLarge ? "148g" : "88g",
      fat: isLarge ? "44g" : "26g",
      allergens: baseAllergens
    };
  }

  // 2. Kebabs
  if (normalizedCat === "kebabs" || normalizedId.includes("kebab") || normalizedId.includes("durum") || normalizedId.includes("doner")) {
    const isCombo = normalizedId.includes("menu") || normalizedId.includes("combo") || normalizedId.includes("-kebab") || normalizedId.includes("durum-kebab");
    const isFalafel = normalizedId.includes("falafel");
    const isFamily = normalizedId.includes("family");

    const baseAllergens = [
      L("Glúten", "Gluten"),
      L("Laticínios (molho de iogurte)", "Dairy/Milk (yogurt sauce)"),
      L("Sementes de sésamo", "Sesame seeds")
    ];

    if (isFamily) {
      return {
        calories: "1600 - 2000 kcal (total)",
        protein: isFalafel ? "42g" : "90g",
        carbs: "190g",
        fat: isFalafel ? "50g" : "85g",
        allergens: [...baseAllergens, L("Mostarda", "Mustard")]
      };
    }

    if (isFalafel) {
      return {
        calories: isCombo ? "950 - 1100 kcal" : "550 - 650 kcal",
        protein: "18g",
        carbs: isCombo ? "130g" : "75g",
        fat: isCombo ? "38g" : "20g",
        allergens: baseAllergens
      };
    }

    // Default Meat Kebab
    return {
      calories: isCombo ? "1100 - 1300 kcal" : "680 - 780 kcal",
      protein: "38g",
      carbs: isCombo ? "125g" : "65g",
      fat: isCombo ? "46g" : "28g",
      allergens: baseAllergens
    };
  }

  // 3. Burgers
  if (normalizedCat === "burgers" || normalizedId.includes("burger")) {
    const isDouble = normalizedId.includes("double") || normalizedId.includes("duplo");
    const isChicken = normalizedId.includes("chicken");
    const isEgg = normalizedId.includes("egg");

    const baseAllergens = [
      L("Glúten", "Gluten"),
      L("Laticínios", "Dairy/Milk"),
      L("Sementes de sésamo (pão)", "Sesame seeds (bun)"),
      L("Mostarda", "Mustard")
    ];

    if (isDouble) {
      return {
        calories: "950 - 1100 kcal",
        protein: "52g",
        carbs: "78g",
        fat: "48g",
        allergens: baseAllergens
      };
    }
    if (isEgg) {
      return {
        calories: "780 - 880 kcal",
        protein: "38g",
        carbs: "74g",
        fat: "36g",
        allergens: [...baseAllergens, L("Ovos", "Eggs")]
      };
    }
    if (isChicken) {
      return {
        calories: "750 - 850 kcal",
        protein: "31g",
        carbs: "82g",
        fat: "32g",
        allergens: baseAllergens
      };
    }

    // Standard Cheeseburger/Hamburger
    return {
      calories: "650 - 750 kcal",
      protein: "32g",
      carbs: "72g",
      fat: "25g",
      allergens: baseAllergens
    };
  }

  // 4. Chicken & Snacks
  if (normalizedCat === "chicken" || normalizedId.includes("chicken") || normalizedId.includes("nuggets") || normalizedId.includes("wings") || normalizedId.includes("strips")) {
    const isLargeBox = normalizedId.includes("box") || normalizedId.includes("mix");
    const baseAllergens = [L("Glúten", "Gluten"), L("Aipo", "Celery")];

    if (isLargeBox) {
      return {
        calories: "850 - 1000 kcal",
        protein: "48g",
        carbs: "75g",
        fat: "42g",
        allergens: baseAllergens
      };
    }

    return {
      calories: "450 - 550 kcal",
      protein: "26g",
      carbs: "35g",
      fat: "22g",
      allergens: baseAllergens
    };
  }

  // 5. Dishes (Pratos)
  if (normalizedCat === "dishes" || normalizedCat === "pratos" || normalizedId.includes("prato") || normalizedId.includes("salad-kebab")) {
    const isFalafel = normalizedId.includes("falafel");
    const isSaladOnly = normalizedId.includes("salad") || normalizedId.includes("salada");

    const baseAllergens = [
      L("Laticínios (molho)", "Dairy/Milk (sauce)"),
      L("Sementes de sésamo", "Sesame seeds")
    ];

    if (isSaladOnly) {
      return {
        calories: "350 - 450 kcal",
        protein: "24g",
        carbs: "12g",
        fat: "25g",
        allergens: baseAllergens
      };
    }

    if (isFalafel) {
      return {
        calories: "680 - 780 kcal",
        protein: "22g",
        carbs: "85g",
        fat: "28g",
        allergens: baseAllergens
      };
    }

    // Meat Kebab Plate
    return {
      calories: "850 - 1000 kcal",
      protein: "45g",
      carbs: "90g",
      fat: "38g",
      allergens: baseAllergens
    };
  }

  // 6. Fallback (e.g. general extras/drinks/unmatched)
  return {
    calories: "150 - 350 kcal",
    protein: "5g",
    carbs: "25g",
    fat: "8g",
    allergens: [L("Pode conter vestígios de glúten", "May contain traces of gluten")]
  };
}
