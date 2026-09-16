import React, { useState, useMemo } from "react";
import { useRestaurantData } from "@/lib/restaurant-context";
import { useOwnerAuth } from "@/lib/owner-auth";
import { CATEGORIES, ALL_DISHES } from "@/lib/restaurant";
import {
  XCircle,
  CheckCircle2,
  Search,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

interface AvailabilityViewProps {
  onBack: () => void;
}

export function AvailabilityView({ onBack }: AvailabilityViewProps) {
  const { isDishAvailable, toggleDishAvailability, getDishName, getDishPrice } =
    useRestaurantData();
  const { user } = useOwnerAuth();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const filteredDishes = useMemo(() => {
    return ALL_DISHES.filter((dish) => {
      const matchCategory =
        selectedCategory === "all" || dish.categoryId === selectedCategory;
      const q = searchQuery.toLowerCase();
      const currentName = getDishName(dish.id, dish.name);
      const matchSearch =
        !q ||
        currentName.pt.toLowerCase().includes(q) ||
        currentName.en.toLowerCase().includes(q) ||
        dish.id.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery, getDishName]);

  const handleToggle = async (dishId: string, currentAvailable: boolean, dishName: string) => {
    setTogglingId(dishId);
    try {
      await toggleDishAvailability(
        dishId,
        !currentAvailable,
        dishName,
        user?.email || undefined
      );
    } catch (e: any) {
      alert("Error updating availability: " + e.message);
    } finally {
      setTogglingId(null);
    }
  };

  const soldOutCount = ALL_DISHES.filter((d) => !isDishAvailable(d.id)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-line bg-surface px-3 py-2 text-sm font-bold text-cream hover:border-brand-yellow"
          >
            <ArrowLeft className="size-4" />
            <span>Back</span>
          </button>
          <div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wide flex items-center gap-2">
              <XCircle className="size-5 text-brand-red" />
              <span>Fast Item Availability Toggle</span>
            </h2>
            <p className="text-xs text-muted">
              1-tap instant switch. Sold out dishes immediately disable checkout in the public cart.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-xl border-2 px-3 py-1.5 text-xs font-black uppercase ${
              soldOutCount > 0
                ? "border-brand-red bg-brand-red/20 text-brand-red"
                : "border-brand-green bg-brand-green/20 text-brand-green"
            }`}
          >
            {soldOutCount > 0 ? `${soldOutCount} Sold Out` : "All Dishes Available"}
          </span>
        </div>
      </div>

      {/* Controls: Search & Categories */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by name..."
            className="w-full rounded-xl border-2 border-line bg-surface-card pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-muted/60 focus:border-brand-yellow focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors ${
              selectedCategory === "all"
                ? "bg-brand-yellow text-black font-black"
                : "bg-surface text-muted hover:text-white"
            }`}
          >
            All ({ALL_DISHES.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors ${
                selectedCategory === cat.id
                  ? "bg-brand-yellow text-black font-black"
                  : "bg-surface text-muted hover:text-white"
              }`}
            >
              {cat.label.en}
            </button>
          ))}
        </div>
      </div>

      {/* 1-Tap List Items */}
      <div className="space-y-2.5">
        {filteredDishes.map((dish) => {
          const available = isDishAvailable(dish.id);
          const name = getDishName(dish.id, dish.name);
          const price = getDishPrice(dish.id, dish.price);
          const isPending = togglingId === dish.id;

          return (
            <div
              key={dish.id}
              className={`rounded-xl border-2 p-3.5 flex items-center justify-between gap-3 transition-all ${
                available
                  ? "border-line bg-surface-card"
                  : "border-brand-red bg-brand-red/10"
              }`}
            >
              {/* Item Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-wide truncate">
                    {name.en}
                  </h4>
                  {price !== null && (
                    <span className="text-xs font-bold text-muted shrink-0">
                      ({price.toFixed(2)}€)
                    </span>
                  )}
                </div>
                <p className="text-xs text-brand-yellow font-bold truncate">
                  {name.pt}
                </p>
              </div>

              {/* Ultra-Fast Toggle Button (Min touch target 48px) */}
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleToggle(dish.id, available, name.en)}
                className={`min-h-[48px] min-w-[130px] rounded-xl border-3 border-black px-4 py-2 font-display font-black text-sm uppercase tracking-wider shadow-fastfood active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 shrink-0 ${
                  available
                    ? "bg-brand-green text-white hover:bg-green-700"
                    : "bg-brand-red text-white hover:bg-red-700"
                }`}
              >
                {isPending ? (
                  <RefreshCw className="size-4 animate-spin" />
                ) : available ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    <span>AVAILABLE</span>
                  </>
                ) : (
                  <>
                    <XCircle className="size-4" />
                    <span>SOLD OUT</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
