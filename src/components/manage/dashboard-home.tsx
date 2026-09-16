import React from "react";
import { useRestaurantData } from "@/lib/restaurant-context";
import { useOwnerAuth } from "@/lib/owner-auth";
import { ALL_DISHES } from "@/lib/restaurant";
import {
  Zap,
  Tag,
  UtensilsCrossed,
  XCircle,
  Camera,
  Clock,
  Bike,
  Megaphone,
  Globe,
  History,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export type ManageTab =
  | "dashboard"
  | "new-promotion"
  | "promotions"
  | "menu"
  | "availability"
  | "photos"
  | "hours"
  | "delivery"
  | "ticker"
  | "history";

interface DashboardHomeProps {
  onNavigate: (tab: ManageTab) => void;
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const { settings, updateSettings, isDishAvailable, activePromotions } = useRestaurantData();
  const { user } = useOwnerAuth();

  const isPaused = settings.isOnlineOrderingPaused;

  const handleToggleOnlineOrders = async () => {
    const nextState = !isPaused;
    await updateSettings(
      { isOnlineOrderingPaused: nextState },
      user?.email || undefined
    );
  };

  // Count sold out items
  const soldOutCount = ALL_DISHES.filter((d) => !isDishAvailable(d.id)).length;

  return (
    <div className="space-y-6">
      {/* 1. Master Online Orders Status Control */}
      <div
        className={`rounded-2xl border-4 border-black p-5 sm:p-6 shadow-fastfood transition-colors ${
          isPaused ? "bg-brand-red text-white" : "bg-brand-green text-white"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block size-3.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-black/80 bg-white/90 px-2 py-0.5 rounded">
                Online Ordering Status
              </span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wide mt-1">
              {isPaused ? "ONLINE ORDERS PAUSED" : "ACCEPTING ONLINE ORDERS"}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-0.5 font-medium">
              {isPaused
                ? "Public cart checkout is paused. Customers are advised to call or visit."
                : "Customers can build orders and submit them directly via WhatsApp."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleOnlineOrders}
            className={`shrink-0 rounded-xl border-3 border-black px-6 py-3.5 font-display font-black text-base sm:text-lg uppercase tracking-wider shadow-fastfood active:translate-x-0.5 active:translate-y-0.5 transition-all ${
              isPaused
                ? "bg-white text-black hover:bg-cream"
                : "bg-brand-red text-white hover:bg-red-700"
            }`}
          >
            {isPaused ? "▶ RESTORE ORDERS" : "⏸ PAUSE ONLINE ORDERS"}
          </button>
        </div>
      </div>

      {/* Quick Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border-2 border-line bg-surface-card p-3.5">
          <span className="text-xs text-muted block font-medium">Active Promos</span>
          <span className="font-display font-black text-xl text-brand-yellow">
            {activePromotions.length} Live
          </span>
        </div>
        <div className="rounded-xl border-2 border-line bg-surface-card p-3.5">
          <span className="text-xs text-muted block font-medium">Menu Items</span>
          <span className="font-display font-black text-xl text-white">
            {ALL_DISHES.length} Total
          </span>
        </div>
        <div className="rounded-xl border-2 border-line bg-surface-card p-3.5">
          <span className="text-xs text-muted block font-medium">Sold Out Status</span>
          <span
            className={`font-display font-black text-xl ${
              soldOutCount > 0 ? "text-brand-red" : "text-brand-green"
            }`}
          >
            {soldOutCount} Sold Out
          </span>
        </div>
        <div className="rounded-xl border-2 border-line bg-surface-card p-3.5">
          <span className="text-xs text-muted block font-medium">Ticker Banner</span>
          <span
            className={`font-display font-black text-xl ${
              settings.tickerActive ? "text-brand-green" : "text-muted"
            }`}
          >
            {settings.tickerActive ? "Active" : "Paused"}
          </span>
        </div>
      </div>

      {/* Active Promotion Highlight if any */}
      {activePromotions.length > 0 && (
        <div className="rounded-xl border-3 border-brand-yellow bg-brand-yellow/10 p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-brand-yellow text-black flex items-center justify-center font-bold">
              <Sparkles className="size-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-black tracking-wider text-brand-yellow block">
                Active Flash Promo: {activePromotions[0].title}
              </span>
              <p className="text-sm text-white font-medium">
                "{activePromotions[0].messageEn}"
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("promotions")}
            className="rounded-lg border-2 border-brand-yellow bg-brand-yellow px-3 py-1.5 text-xs font-black text-black hover:bg-yellow-400 shrink-0"
          >
            Manage
          </button>
        </div>
      )}

      {/* 2. Large Touch-Friendly Quick Action Grid */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-muted mb-3">
          Quick Management Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Action 1: New Flash Promotion */}
          <button
            type="button"
            onClick={() => onNavigate("new-promotion")}
            className="flex items-center gap-4 rounded-xl border-3 border-black bg-brand-yellow p-4 text-left shadow-fastfood hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 transition-all text-black group"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-black text-brand-yellow border-2 border-black">
              <Zap className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-display font-black text-lg uppercase tracking-wide block">
                NEW FLASH PROMOTION
              </span>
              <span className="text-xs font-bold text-black/75 block">
                Create 2-for-1, lunch deal, or special discount
              </span>
            </div>
          </button>

          {/* Action 2: Edit Promotions */}
          <button
            type="button"
            onClick={() => onNavigate("promotions")}
            className="flex items-center gap-4 rounded-xl border-3 border-black bg-surface-card p-4 text-left shadow-fastfood hover:border-brand-yellow active:translate-x-0.5 active:translate-y-0.5 transition-all group"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white border-2 border-black">
              <Tag className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-display font-black text-lg uppercase tracking-wide text-white block">
                EDIT PROMOTIONS
              </span>
              <span className="text-xs text-muted block">
                Activate, pause, duplicate or schedule offers
              </span>
            </div>
          </button>

          {/* Action 3: Menu & Prices */}
          <button
            type="button"
            onClick={() => onNavigate("menu")}
            className="flex items-center gap-4 rounded-xl border-3 border-black bg-surface-card p-4 text-left shadow-fastfood hover:border-brand-yellow active:translate-x-0.5 active:translate-y-0.5 transition-all group"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface text-cream border-2 border-black">
              <UtensilsCrossed className="size-6 text-brand-yellow" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-display font-black text-lg uppercase tracking-wide text-white block">
                MENU &amp; PRICES
              </span>
              <span className="text-xs text-muted block">
                Update prices, descriptions and featured items
              </span>
            </div>
          </button>

          {/* Action 4: Sold Out / Available (High Priority) */}
          <button
            type="button"
            onClick={() => onNavigate("availability")}
            className="flex items-center gap-4 rounded-xl border-3 border-black bg-surface-card p-4 text-left shadow-fastfood hover:border-brand-red active:translate-x-0.5 active:translate-y-0.5 transition-all group"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-red/20 text-brand-red border-2 border-brand-red">
              <XCircle className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-display font-black text-lg uppercase tracking-wide text-white block">
                SOLD OUT / AVAILABLE
              </span>
              <span className="text-xs text-muted block">
                Fast 1-tap item availability toggle
              </span>
            </div>
          </button>

          {/* Action 5: Photos */}
          <button
            type="button"
            onClick={() => onNavigate("photos")}
            className="flex items-center gap-4 rounded-xl border-3 border-black bg-surface-card p-4 text-left shadow-fastfood hover:border-brand-yellow active:translate-x-0.5 active:translate-y-0.5 transition-all group"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface text-cream border-2 border-black">
              <Camera className="size-6 text-brand-yellow" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-display font-black text-lg uppercase tracking-wide text-white block">
                PHOTOS
              </span>
              <span className="text-xs text-muted block">
                Take photo from phone or upload dish images
              </span>
            </div>
          </button>

          {/* Action 6: Opening Hours */}
          <button
            type="button"
            onClick={() => onNavigate("hours")}
            className="flex items-center gap-4 rounded-xl border-3 border-black bg-surface-card p-4 text-left shadow-fastfood hover:border-brand-yellow active:translate-x-0.5 active:translate-y-0.5 transition-all group"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface text-cream border-2 border-black">
              <Clock className="size-6 text-brand-yellow" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-display font-black text-lg uppercase tracking-wide text-white block">
                OPENING HOURS
              </span>
              <span className="text-xs text-muted block">
                Set daily schedule and special closure days
              </span>
            </div>
          </button>

          {/* Action 7: Delivery Links */}
          <button
            type="button"
            onClick={() => onNavigate("delivery")}
            className="flex items-center gap-4 rounded-xl border-3 border-black bg-surface-card p-4 text-left shadow-fastfood hover:border-brand-yellow active:translate-x-0.5 active:translate-y-0.5 transition-all group"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface text-cream border-2 border-black">
              <Bike className="size-6 text-brand-yellow" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-display font-black text-lg uppercase tracking-wide text-white block">
                DELIVERY LINKS
              </span>
              <span className="text-xs text-muted block">
                WhatsApp, Bolt Food &amp; Uber Eats store links
              </span>
            </div>
          </button>

          {/* Action 8: Website Banner / Ticker */}
          <button
            type="button"
            onClick={() => onNavigate("ticker")}
            className="flex items-center gap-4 rounded-xl border-3 border-black bg-surface-card p-4 text-left shadow-fastfood hover:border-brand-yellow active:translate-x-0.5 active:translate-y-0.5 transition-all group"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface text-cream border-2 border-black">
              <Megaphone className="size-6 text-brand-yellow" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-display font-black text-lg uppercase tracking-wide text-white block">
                WEBSITE BANNER
              </span>
              <span className="text-xs text-muted block">
                Top ticker announcement messages
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Secondary Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t-2 border-line">
        <button
          type="button"
          onClick={() => onNavigate("history")}
          className="flex items-center gap-2 text-xs font-bold text-muted hover:text-cream transition-colors"
        >
          <History className="size-4" />
          <span>View Change History Log</span>
        </button>

        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-line bg-surface px-5 py-2.5 text-sm font-black uppercase text-cream hover:border-brand-yellow transition-colors"
        >
          <Globe className="size-4 text-brand-yellow" />
          <span>VIEW WEBSITE (LIVE)</span>
        </Link>
      </div>
    </div>
  );
}
