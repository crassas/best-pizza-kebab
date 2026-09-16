import React, { useState } from "react";
import { useRestaurantData, type DeliveryLinks } from "@/lib/restaurant-context";
import { useOwnerAuth } from "@/lib/owner-auth";
import { Bike, ArrowLeft, Save, Check, ExternalLink } from "lucide-react";

interface DeliveryLinksEditorProps {
  onBack: () => void;
}

export function DeliveryLinksEditor({ onBack }: DeliveryLinksEditorProps) {
  const { settings, updateSettings } = useRestaurantData();
  const { user } = useOwnerAuth();

  const [links, setLinks] = useState<DeliveryLinks>(settings.deliveryLinks);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateUrl = (url: string): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = async () => {
    const errs: Record<string, string> = {};

    if (links.bolt && !validateUrl(links.bolt)) {
      errs.bolt = "Please enter a valid URL (including https://)";
    }
    if (links.uber && !validateUrl(links.uber)) {
      errs.uber = "Please enter a valid URL (including https://)";
    }
    if (!links.whatsapp) {
      errs.whatsapp = "WhatsApp number is required";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      await updateSettings({ deliveryLinks: links }, user?.email || undefined);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e: any) {
      alert("Failed to save delivery links: " + e.message);
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
            <Bike className="size-5 text-brand-yellow" />
            <span>Delivery &amp; Contact Links</span>
          </h2>
        </div>

        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-xl border-3 border-black bg-brand-yellow px-5 py-2.5 font-display font-black text-sm text-black uppercase tracking-wider shadow-fastfood hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
        >
          {savedSuccess ? <Check className="size-4" /> : <Save className="size-4" />}
          <span>{isSaving ? "Saving..." : savedSuccess ? "SAVED!" : "SAVE LINKS"}</span>
        </button>
      </div>

      {/* Form */}
      <div className="rounded-2xl border-4 border-black bg-surface-card p-5 sm:p-7 shadow-fastfood space-y-6">
        <div>
          <h3 className="font-display font-black text-lg text-white uppercase mb-1">
            External App URLs &amp; Phone Contact
          </h3>
          <p className="text-xs text-muted">
            All public CTA buttons, order links, and footer links automatically use these verified URLs.
          </p>
        </div>

        {/* WhatsApp */}
        <div className="space-y-1.5">
          <label className="block text-xs font-black uppercase tracking-wider text-muted">
            WhatsApp Direct Number (Digits only, including country code 351) *
          </label>
          <input
            type="text"
            value={links.whatsapp}
            onChange={(e) => setLinks({ ...links, whatsapp: e.target.value })}
            placeholder="351920163613"
            className="w-full rounded-xl border-2 border-line bg-surface px-4 py-2.5 text-sm font-bold text-white focus:border-brand-yellow focus:outline-none"
          />
          {errors.whatsapp && (
            <p className="text-xs text-brand-red font-medium">{errors.whatsapp}</p>
          )}
        </div>

        {/* Bolt Food Link */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-black uppercase tracking-wider text-muted">
              Bolt Food Restaurant Store URL
            </label>
            {links.bolt && validateUrl(links.bolt) && (
              <a
                href={links.bolt}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-bolt hover:underline"
              >
                <span>Test Link</span>
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>
          <input
            type="url"
            value={links.bolt}
            onChange={(e) => setLinks({ ...links, bolt: e.target.value })}
            placeholder="https://food.bolt.eu/pt-pt/437/p/..."
            className="w-full rounded-xl border-2 border-line bg-surface px-4 py-2.5 text-sm font-medium text-white focus:border-brand-yellow focus:outline-none"
          />
          {errors.bolt && (
            <p className="text-xs text-brand-red font-medium">{errors.bolt}</p>
          )}
        </div>

        {/* Uber Eats Link */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-black uppercase tracking-wider text-muted">
              Uber Eats Restaurant Store URL
            </label>
            {links.uber && validateUrl(links.uber) && (
              <a
                href={links.uber}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-uber hover:underline"
              >
                <span>Test Link</span>
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>
          <input
            type="url"
            value={links.uber}
            onChange={(e) => setLinks({ ...links, uber: e.target.value })}
            placeholder="https://www.ubereats.com/pt-en/store/..."
            className="w-full rounded-xl border-2 border-line bg-surface px-4 py-2.5 text-sm font-medium text-white focus:border-brand-yellow focus:outline-none"
          />
          {errors.uber && (
            <p className="text-xs text-brand-red font-medium">{errors.uber}</p>
          )}
        </div>

        {/* Phone Display & Dial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-muted mb-1">
              Phone Display (e.g. +351 920 163 613)
            </label>
            <input
              type="text"
              value={links.phoneDisplay}
              onChange={(e) => setLinks({ ...links, phoneDisplay: e.target.value })}
              className="w-full rounded-xl border-2 border-line bg-surface px-4 py-2.5 text-sm font-bold text-white focus:border-brand-yellow focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-muted mb-1">
              Phone Tel Dial (e.g. +351920163613)
            </label>
            <input
              type="text"
              value={links.phoneTel}
              onChange={(e) => setLinks({ ...links, phoneTel: e.target.value })}
              className="w-full rounded-xl border-2 border-line bg-surface px-4 py-2.5 text-sm font-bold text-white focus:border-brand-yellow focus:outline-none"
            />
          </div>
        </div>

        {/* Address & Google Maps */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-muted mb-1">
              Restaurant Street Address
            </label>
            <input
              type="text"
              value={links.address}
              onChange={(e) => setLinks({ ...links, address: e.target.value })}
              className="w-full rounded-xl border-2 border-line bg-surface px-4 py-2.5 text-sm font-bold text-white focus:border-brand-yellow focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-muted mb-1">
              Google Maps Search / Directions URL
            </label>
            <input
              type="url"
              value={links.googleMaps}
              onChange={(e) => setLinks({ ...links, googleMaps: e.target.value })}
              className="w-full rounded-xl border-2 border-line bg-surface px-4 py-2.5 text-sm font-medium text-white focus:border-brand-yellow focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
