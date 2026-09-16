import React, { useState } from "react";
import { useRestaurantData, type TickerMessageItem } from "@/lib/restaurant-context";
import { useOwnerAuth } from "@/lib/owner-auth";
import { Megaphone, Plus, Trash2, ArrowLeft, Save, Check } from "lucide-react";

interface TickerEditorProps {
  onBack: () => void;
}

export function TickerEditor({ onBack }: TickerEditorProps) {
  const { settings, updateSettings } = useRestaurantData();
  const { user } = useOwnerAuth();

  const [tickerActive, setTickerActive] = useState(settings.tickerActive ?? true);
  const [messages, setMessages] = useState<TickerMessageItem[]>(
    settings.tickerMessages || []
  );
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New message draft state
  const [newTextPt, setNewTextPt] = useState("");
  const [newTextEn, setNewTextEn] = useState("");

  const handleAddMessage = () => {
    if (!newTextPt.trim() && !newTextEn.trim()) return;
    const item: TickerMessageItem = {
      id: Date.now().toString(),
      textPt: newTextPt.trim() || newTextEn.trim(),
      textEn: newTextEn.trim() || newTextPt.trim(),
      active: true,
    };
    setMessages([...messages, item]);
    setNewTextPt("");
    setNewTextEn("");
  };

  const handleRemove = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
  };

  const handleToggle = (id: string) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    );
  };

  const handleUpdate = (id: string, field: "textPt" | "textEn", val: string) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, [field]: val } : m))
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSavedSuccess(false);
    try {
      await updateSettings(
        {
          tickerActive,
          tickerMessages: messages,
        },
        user?.email || undefined
      );
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e: any) {
      alert(e.message || "Failed to save ticker settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            <Megaphone className="size-5 text-brand-yellow" />
            <span>Animated Website Ticker</span>
          </h2>
        </div>

        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-xl border-3 border-black bg-brand-yellow px-5 py-2.5 font-display font-black text-sm text-black uppercase tracking-wider shadow-fastfood hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
        >
          {savedSuccess ? <Check className="size-4" /> : <Save className="size-4" />}
          <span>{isSaving ? "Saving..." : savedSuccess ? "SAVED!" : "SAVE TICKER"}</span>
        </button>
      </div>

      {/* Master Toggle Banner */}
      <div className="rounded-2xl border-4 border-black bg-surface-card p-5 sm:p-6 shadow-fastfood flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-muted">
            Master Ticker Visibility
          </span>
          <h3 className="font-display font-black text-xl text-white uppercase mt-0.5">
            {tickerActive ? "Top Ticker is Currently ACTIVE" : "Top Ticker is PAUSED / HIDDEN"}
          </h3>
          <p className="text-xs text-cream/70 mt-1">
            When active, the top marquee continuously scrolls across the entire public website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setTickerActive(!tickerActive)}
          className={`rounded-xl border-3 border-black px-6 py-3 font-display font-black text-sm uppercase tracking-wider shadow-fastfood transition-all ${
            tickerActive
              ? "bg-brand-green text-white hover:bg-green-700"
              : "bg-surface text-muted border-line hover:text-white"
          }`}
        >
          {tickerActive ? "TICKER: ACTIVE" : "TICKER: PAUSED"}
        </button>
      </div>

      {/* Messages List & Add Form */}
      <div className="rounded-2xl border-4 border-black bg-surface-card p-5 sm:p-6 shadow-fastfood space-y-6">
        <div>
          <h3 className="font-display font-black text-lg text-white uppercase mb-1">
            Manage Scrolling Messages
          </h3>
          <p className="text-xs text-muted">
            Customize the animated ribbon phrases. Both Portuguese and English versions are automatically matched to the visitor's language.
          </p>
        </div>

        {/* Existing Messages */}
        <div className="space-y-3">
          {messages.map((item, index) => (
            <div
              key={item.id}
              className={`rounded-xl border-2 p-3.5 space-y-2 transition-all ${
                item.active
                  ? "border-line bg-surface"
                  : "border-line/40 bg-surface/30 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-brand-yellow uppercase">
                  Message #{index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                      item.active
                        ? "bg-brand-green/20 text-brand-green border border-brand-green/40"
                        : "bg-surface text-muted border border-line"
                    }`}
                  >
                    {item.active ? "ENABLED" : "MUTED"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="p-1 rounded text-muted hover:text-brand-red"
                    title="Delete Message"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase text-muted block mb-0.5">
                    Português (PT)
                  </span>
                  <input
                    type="text"
                    value={item.textPt}
                    onChange={(e) => handleUpdate(item.id, "textPt", e.target.value)}
                    className="w-full rounded-lg border border-line bg-surface-card px-3 py-1.5 text-xs text-white font-medium focus:border-brand-yellow focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-muted block mb-0.5">
                    English (EN)
                  </span>
                  <input
                    type="text"
                    value={item.textEn}
                    onChange={(e) => handleUpdate(item.id, "textEn", e.target.value)}
                    className="w-full rounded-lg border border-line bg-surface-card px-3 py-1.5 text-xs text-white font-medium focus:border-brand-yellow focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Message */}
        <div className="rounded-xl border-2 border-dashed border-brand-yellow/50 bg-brand-yellow/5 p-4 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-brand-yellow flex items-center gap-1.5">
            <Plus className="size-4" />
            <span>Add New Scrolling Phrase</span>
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-muted block mb-1">
                Português (PT)
              </label>
              <input
                type="text"
                value={newTextPt}
                onChange={(e) => setNewTextPt(e.target.value)}
                placeholder="Ex: 🔥 NOVO: Kebab XL com Queijo Duplo"
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-xs text-white placeholder:text-muted/50 focus:border-brand-yellow focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-muted block mb-1">
                English (EN)
              </label>
              <input
                type="text"
                value={newTextEn}
                onChange={(e) => setNewTextEn(e.target.value)}
                placeholder="Ex: 🔥 NEW: XL Kebab with Double Cheese"
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-xs text-white placeholder:text-muted/50 focus:border-brand-yellow focus:outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddMessage}
            className="rounded-lg border-2 border-black bg-brand-yellow px-4 py-2 text-xs font-black uppercase text-black shadow-sm hover:bg-yellow-400"
          >
            + Add to Ticker
          </button>
        </div>

        {/* Live Preview Ribbon */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-black uppercase tracking-wider text-muted">
            Live Ticker Preview:
          </span>
          <div className="rounded-xl border-2 border-black bg-brand-red text-white py-2 px-4 overflow-hidden shadow-inner">
            <div className="flex items-center gap-6 overflow-x-auto text-xs font-display font-bold tracking-wider uppercase whitespace-nowrap">
              {messages
                .filter((m) => m.active)
                .map((m, idx) => (
                  <span key={idx} className="flex items-center gap-3">
                    <span>{m.textPt}</span>
                    <span className="size-1.5 rounded-full bg-brand-yellow" />
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
