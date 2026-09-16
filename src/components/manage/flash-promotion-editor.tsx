import React, { useState } from "react";
import { useRestaurantData, type Promotion } from "@/lib/restaurant-context";
import { useOwnerAuth } from "@/lib/owner-auth";
import { ALL_DISHES } from "@/lib/restaurant";
import { Zap, Eye, Save, ArrowLeft, Sparkles, Check } from "lucide-react";

interface FlashPromotionEditorProps {
  initialData?: Promotion | null;
  onBack: () => void;
  onSuccess: () => void;
}

export function FlashPromotionEditor({
  initialData,
  onBack,
  onSuccess,
}: FlashPromotionEditorProps) {
  const { savePromotion } = useRestaurantData();
  const { user } = useOwnerAuth();

  const [title, setTitle] = useState(initialData?.title || "");
  const [messageEn, setMessageEn] = useState(
    initialData?.messageEn || "🔥 Flash Deal: 2 Kebabs for 12€ today only!"
  );
  const [messagePt, setMessagePt] = useState(
    initialData?.messagePt || "🔥 Oferta Flash: 2 Kebabs por 12€ só hoje!"
  );
  const [isWebsiteOnly, setIsWebsiteOnly] = useState(
    initialData?.isWebsiteOnly ?? true
  );
  const [locations, setLocations] = useState<Array<"ticker" | "homepage" | "menu" | "product">>(
    initialData?.locations || ["ticker", "homepage", "menu"]
  );
  const [targetProductId, setTargetProductId] = useState(
    initialData?.targetProductId || ""
  );
  const [startDate, setStartDate] = useState(
    initialData?.startDate || new Date().toISOString().slice(0, 16)
  );
  const [endDate, setEndDate] = useState(
    initialData?.endDate || ""
  );
  const [status, setStatus] = useState<"active" | "paused" | "scheduled">(
    initialData?.status || "active"
  );
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const toggleLocation = (loc: "ticker" | "homepage" | "menu" | "product") => {
    if (locations.includes(loc)) {
      setLocations(locations.filter((l) => l !== loc));
    } else {
      setLocations([...locations, loc]);
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !messageEn.trim()) {
      alert("Please fill in Title and English message.");
      return;
    }

    setIsSaving(true);
    try {
      await savePromotion(
        {
          ...(initialData ? { id: initialData.id } : {}),
          title: title.trim(),
          messageEn: messageEn.trim(),
          messagePt: messagePt.trim() || messageEn.trim(),
          isWebsiteOnly,
          locations,
          targetProductId: targetProductId || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
          status,
        },
        user?.email || undefined
      );
      onSuccess();
    } catch (err: any) {
      alert(err.message || "Failed to save promotion");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border-2 border-line bg-surface px-3 py-2 text-sm font-bold text-cream hover:border-brand-yellow"
        >
          <ArrowLeft className="size-4" />
          <span>Back</span>
        </button>

        <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wide flex items-center gap-2">
          <Zap className="size-5 text-brand-yellow" />
          <span>{initialData ? "Edit Flash Promotion" : "Create Flash Promotion"}</span>
        </h2>
      </div>

      {/* Form Container */}
      <div className="rounded-2xl border-4 border-black bg-surface-card p-5 sm:p-7 shadow-fastfood space-y-6">
        {/* Title & Quick Presets */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-muted mb-1.5">
            Internal Promotion Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Lunch Special 2-for-1, Weekend Kebab Combo"
            className="w-full rounded-xl border-2 border-line bg-surface px-4 py-3 text-sm font-bold text-white placeholder:text-muted/60 focus:border-brand-yellow focus:outline-none"
          />

          {/* Quick Presets */}
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-xs text-muted font-bold self-center mr-1">Presets:</span>
            {[
              {
                title: "2-for-1 Lunch Deal",
                en: "🔥 2-for-1 Lunch Deal: Buy 1 Dürum Kebab, get 1 free between 12:00 - 15:00!",
                pt: "🔥 Menu Almoço 2-por-1: Na compra de 1 Dürum Kebab, receba o 2º grátis das 12:00 às 15:00!",
              },
              {
                title: "Family Kebab Box Deal",
                en: "👑 Weekend Special: Family Kebab Box + 1.5L Drink only 16.90€!",
                pt: "👑 Especial Fim de Semana: Family Kebab Box + Bebida 1.5L por apenas 16.90€!",
              },
              {
                title: "Pizza Night Special",
                en: "🍕 Pizza Night: Any 2 Large Pizzas for 18.00€ direct on website!",
                pt: "🍕 Noite da Pizza: 2 Pizzas Grandes por 18.00€ direto no website!",
              },
            ].map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setTitle(p.title);
                  setMessageEn(p.en);
                  setMessagePt(p.pt);
                }}
                className="rounded-lg border border-line bg-surface/70 px-2.5 py-1 text-xs text-brand-yellow font-bold hover:border-brand-yellow"
              >
                + {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* English & Portuguese Promotional Copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-muted mb-1.5 flex items-center justify-between">
              <span>English Message * (Shown to tourists & EN visitors)</span>
              <span className="text-brand-yellow">EN</span>
            </label>
            <textarea
              rows={3}
              value={messageEn}
              onChange={(e) => setMessageEn(e.target.value)}
              placeholder="e.g. ⚡ Limited Time: 15% OFF on all Pizza orders tonight!"
              className="w-full rounded-xl border-2 border-line bg-surface px-4 py-3 text-sm font-medium text-white placeholder:text-muted/60 focus:border-brand-yellow focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-muted mb-1.5 flex items-center justify-between">
              <span>Mensagem em Português * (Mostrada aos clientes PT)</span>
              <span className="text-brand-yellow">PT</span>
            </label>
            <textarea
              rows={3}
              value={messagePt}
              onChange={(e) => setMessagePt(e.target.value)}
              placeholder="e.g. ⚡ Tempo Limitado: 15% de Desconto em todas as Pizzas hoje!"
              className="w-full rounded-xl border-2 border-line bg-surface px-4 py-3 text-sm font-medium text-white placeholder:text-muted/60 focus:border-brand-yellow focus:outline-none"
            />
          </div>
        </div>

        {/* Website Only Toggle */}
        <div className="flex items-center justify-between rounded-xl border-2 border-line bg-surface p-4">
          <div>
            <span className="font-bold text-sm text-white block">
              Website Exclusive Badge
            </span>
            <span className="text-xs text-muted block">
              Displays "Exclusive Website Offer" tag to encourage direct orders
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsWebsiteOnly(!isWebsiteOnly)}
            className={`rounded-full px-4 py-1.5 text-xs font-black uppercase border-2 transition-colors ${
              isWebsiteOnly
                ? "bg-brand-yellow text-black border-black"
                : "bg-surface text-muted border-line"
            }`}
          >
            {isWebsiteOnly ? "ON (EXCLUSIVE)" : "OFF"}
          </button>
        </div>

        {/* Display Locations */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-muted mb-2">
            Display Locations on Website
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "ticker", label: "Top Moving Ticker" },
              { id: "homepage", label: "Homepage Banner" },
              { id: "menu", label: "Menu Header" },
              { id: "product", label: "Specific Product" },
            ].map((loc) => {
              const checked = locations.includes(loc.id as any);
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => toggleLocation(loc.id as any)}
                  className={`flex items-center gap-2.5 rounded-xl border-2 p-3 text-left transition-all ${
                    checked
                      ? "border-brand-yellow bg-brand-yellow/15 text-white"
                      : "border-line bg-surface text-muted"
                  }`}
                >
                  <div
                    className={`size-4 rounded flex items-center justify-center border ${
                      checked
                        ? "border-brand-yellow bg-brand-yellow text-black"
                        : "border-muted/50"
                    }`}
                  >
                    {checked && <Check className="size-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-bold">{loc.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Product Selection if "product" location chosen */}
        {locations.includes("product") && (
          <div className="rounded-xl border-2 border-brand-yellow/50 bg-surface p-4 space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-brand-yellow">
              Select Target Menu Product
            </label>
            <select
              value={targetProductId}
              onChange={(e) => setTargetProductId(e.target.value)}
              className="w-full rounded-lg border-2 border-line bg-surface-card px-3 py-2 text-sm text-white font-medium focus:border-brand-yellow focus:outline-none"
            >
              <option value="">-- Apply to all or select specific dish --</option>
              {ALL_DISHES.map((dish) => (
                <option key={dish.id} value={dish.id}>
                  {dish.name.en} ({dish.name.pt}) - {dish.price ? `${dish.price.toFixed(2)}€` : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Start & End Dates / Scheduling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-muted mb-1.5">
              Start Date &amp; Time
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border-2 border-line bg-surface px-4 py-2.5 text-sm font-bold text-white focus:border-brand-yellow focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-muted mb-1.5">
              End Date &amp; Time (Optional Expiration)
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border-2 border-line bg-surface px-4 py-2.5 text-sm font-bold text-white focus:border-brand-yellow focus:outline-none"
            />
          </div>
        </div>

        {/* Status Selection */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-muted mb-2">
            Promotion Status
          </label>
          <div className="flex flex-wrap gap-3">
            {[
              { id: "active", label: "ACTIVE (GO LIVE NOW)", color: "bg-brand-green text-white" },
              { id: "scheduled", label: "SCHEDULED", color: "bg-brand-yellow text-black" },
              { id: "paused", label: "PAUSED / DRAFT", color: "bg-surface text-muted" },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStatus(st.id as any)}
                className={`rounded-xl border-3 border-black px-4 py-2.5 font-display font-bold text-sm tracking-wide shadow-fastfood transition-all ${
                  status === st.id
                    ? `${st.color} scale-102`
                    : "border-line bg-surface text-muted hover:text-white"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="rounded-xl border-2 border-dashed border-line p-4 bg-surface/40">
          <span className="text-xs font-black uppercase tracking-wider text-muted block mb-2">
            Live Preview on Public Site:
          </span>
          <div className="rounded-lg bg-brand-red p-3 text-white flex items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-brand-yellow shrink-0" />
              <span className="text-xs sm:text-sm font-bold">
                {messagePt || messageEn}
              </span>
            </div>
            {isWebsiteOnly && (
              <span className="shrink-0 rounded bg-brand-yellow px-2 py-0.5 text-[10px] font-black text-black uppercase">
                Exclusivo Web
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t-2 border-line">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-line bg-surface px-5 py-3 text-sm font-bold text-cream hover:border-brand-yellow transition-colors"
          >
            <Eye className="size-4" />
            <span>Preview Details</span>
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={handlePublish}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-3 border-black bg-brand-yellow px-7 py-3 font-display font-black text-base text-black uppercase tracking-wider shadow-fastfood hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            <Save className="size-5" />
            <span>{isSaving ? "Publishing..." : "PUBLISH PROMOTION"}</span>
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-lg rounded-2xl border-4 border-black bg-surface-card p-6 shadow-fastfood space-y-4">
            <h3 className="font-display font-black text-xl text-white uppercase">
              Promotion Preview &amp; Review
            </h3>

            <div className="space-y-2 text-sm text-cream/90 bg-surface p-4 rounded-xl border border-line">
              <p>
                <strong>Title:</strong> {title || "Untitled"}
              </p>
              <p>
                <strong>English Copy:</strong> {messageEn}
              </p>
              <p>
                <strong>Portuguese Copy:</strong> {messagePt}
              </p>
              <p>
                <strong>Locations:</strong> {locations.join(", ") || "None"}
              </p>
              <p>
                <strong>Exclusive Web Badge:</strong> {isWebsiteOnly ? "Yes" : "No"}
              </p>
              <p>
                <strong>Status:</strong> {status.toUpperCase()}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="rounded-xl border-2 border-line bg-surface px-4 py-2 text-sm font-bold text-cream hover:bg-black"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPreviewModal(false);
                  handlePublish();
                }}
                className="rounded-xl border-3 border-black bg-brand-yellow px-5 py-2 text-sm font-black text-black uppercase shadow-fastfood hover:bg-yellow-400"
              >
                Confirm &amp; Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
