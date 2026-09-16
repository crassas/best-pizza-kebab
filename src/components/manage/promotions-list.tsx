import React, { useState } from "react";
import { useRestaurantData, type Promotion } from "@/lib/restaurant-context";
import { useOwnerAuth } from "@/lib/owner-auth";
import {
  Tag,
  Plus,
  Play,
  Pause,
  Edit2,
  Copy,
  Trash2,
  Sparkles,
  ArrowLeft,
  Clock,
  Calendar,
} from "lucide-react";

interface PromotionsListProps {
  onBack: () => void;
  onNew: () => void;
  onEdit: (promo: Promotion) => void;
}

export function PromotionsList({ onBack, onNew, onEdit }: PromotionsListProps) {
  const {
    promotions,
    togglePromotionStatus,
    deletePromotion,
    savePromotion,
    isPromotionActiveNow,
  } = useRestaurantData();
  const { user } = useOwnerAuth();

  const [activeTab, setActiveTab] = useState<"all" | "active" | "scheduled" | "paused">("all");

  const filtered = promotions.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return isPromotionActiveNow(p);
    if (activeTab === "scheduled") return p.status === "scheduled";
    if (activeTab === "paused") return p.status === "paused";
    return true;
  });

  const handleDuplicate = async (p: Promotion) => {
    await savePromotion(
      {
        title: `${p.title} (Copy)`,
        messageEn: p.messageEn,
        messagePt: p.messagePt,
        isWebsiteOnly: p.isWebsiteOnly,
        locations: p.locations,
        targetProductId: p.targetProductId,
        status: "paused",
      },
      user?.email || undefined
    );
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this promotion?")) {
      await deletePromotion(id, user?.email || undefined);
    }
  };

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
          <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wide flex items-center gap-2">
            <Tag className="size-5 text-brand-red" />
            <span>Promotion Library</span>
          </h2>
        </div>

        <button
          type="button"
          onClick={onNew}
          className="inline-flex items-center justify-center gap-2 rounded-xl border-3 border-black bg-brand-yellow px-5 py-2.5 font-display font-black text-sm text-black uppercase tracking-wider shadow-fastfood hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <Plus className="size-4" />
          <span>NEW FLASH PROMOTION</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-line pb-2">
        {[
          { id: "all", label: `All (${promotions.length})` },
          { id: "active", label: "Active Live" },
          { id: "scheduled", label: "Scheduled" },
          { id: "paused", label: "Paused / Draft" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors ${
              activeTab === tab.id
                ? "bg-brand-yellow text-black"
                : "bg-surface text-muted hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Promotions List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-line p-8 text-center bg-surface/30">
          <Sparkles className="mx-auto size-8 text-muted mb-2" />
          <h3 className="font-display font-bold text-lg text-white uppercase">
            No promotions in this tab
          </h3>
          <p className="text-xs text-muted mt-1 max-w-sm mx-auto mb-4">
            Create flash deals or timed offers to display in the website ticker and banners.
          </p>
          <button
            type="button"
            onClick={onNew}
            className="rounded-lg border-2 border-brand-yellow bg-brand-yellow/10 px-4 py-2 text-xs font-black text-brand-yellow hover:bg-brand-yellow hover:text-black transition-colors"
          >
            + Create First Promotion
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((promo) => {
            const isLive = isPromotionActiveNow(promo);

            return (
              <div
                key={promo.id}
                className="rounded-xl border-3 border-black bg-surface-card p-4 sm:p-5 shadow-fastfood transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase ${
                          isLive
                            ? "bg-brand-green text-white"
                            : promo.status === "scheduled"
                            ? "bg-brand-yellow text-black"
                            : "bg-surface text-muted border border-line"
                        }`}
                      >
                        {isLive ? "LIVE NOW" : promo.status.toUpperCase()}
                      </span>
                      {promo.isWebsiteOnly && (
                        <span className="rounded bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30 px-2 py-0.5 text-[10px] font-bold uppercase">
                          Website Exclusive
                        </span>
                      )}
                      <span className="text-xs text-muted font-medium">
                        Locations: {promo.locations.join(", ")}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-lg text-white uppercase tracking-wide">
                      {promo.title}
                    </h3>
                    <p className="text-xs text-cream/90 font-medium line-clamp-2">
                      <strong>EN:</strong> "{promo.messageEn}"
                    </p>
                    {promo.messagePt && (
                      <p className="text-xs text-cream/70 font-medium line-clamp-2">
                        <strong>PT:</strong> "{promo.messagePt}"
                      </p>
                    )}

                    {(promo.startDate || promo.endDate) && (
                      <div className="flex items-center gap-3 text-[11px] text-muted pt-1">
                        {promo.startDate && (
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            From: {new Date(promo.startDate).toLocaleString()}
                          </span>
                        )}
                        {promo.endDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            Until: {new Date(promo.endDate).toLocaleString()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap pt-2 sm:pt-0 border-t sm:border-t-0 border-line">
                    {/* Toggle Active / Pause */}
                    {promo.status === "active" ? (
                      <button
                        type="button"
                        onClick={() =>
                          togglePromotionStatus(promo.id, "paused", user?.email || undefined)
                        }
                        className="flex items-center gap-1 rounded-lg border-2 border-line bg-surface px-3 py-1.5 text-xs font-bold text-cream hover:border-brand-red"
                        title="Pause Promotion"
                      >
                        <Pause className="size-3.5 text-brand-red" />
                        <span>Pause</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          togglePromotionStatus(promo.id, "active", user?.email || undefined)
                        }
                        className="flex items-center gap-1 rounded-lg border-2 border-brand-green bg-brand-green/20 px-3 py-1.5 text-xs font-bold text-brand-green hover:bg-brand-green hover:text-white"
                        title="Activate Promotion"
                      >
                        <Play className="size-3.5" />
                        <span>Activate</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onEdit(promo)}
                      className="flex items-center gap-1 rounded-lg border-2 border-line bg-surface px-3 py-1.5 text-xs font-bold text-cream hover:border-brand-yellow"
                    >
                      <Edit2 className="size-3.5 text-brand-yellow" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDuplicate(promo)}
                      className="flex items-center gap-1 rounded-lg border-2 border-line bg-surface px-2.5 py-1.5 text-xs font-bold text-muted hover:text-white"
                      title="Duplicate Offer"
                    >
                      <Copy className="size-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(promo.id)}
                      className="flex items-center gap-1 rounded-lg border-2 border-line bg-surface px-2.5 py-1.5 text-xs font-bold text-brand-red hover:bg-brand-red hover:text-white"
                      title="Delete Offer"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
