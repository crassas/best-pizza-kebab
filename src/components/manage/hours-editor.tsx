import React, { useState } from "react";
import { useRestaurantData, type WeekHours } from "@/lib/restaurant-context";
import { useOwnerAuth } from "@/lib/owner-auth";
import { Clock, ArrowLeft, Save, Check } from "lucide-react";

interface HoursEditorProps {
  onBack: () => void;
}

const DAYS_ORDER: Array<{ key: keyof WeekHours; label: string; pt: string }> = [
  { key: "monday", label: "Monday", pt: "Segunda-feira" },
  { key: "tuesday", label: "Tuesday", pt: "Terça-feira" },
  { key: "wednesday", label: "Wednesday", pt: "Quarta-feira" },
  { key: "thursday", label: "Thursday", pt: "Quinta-feira" },
  { key: "friday", label: "Friday", pt: "Sexta-feira" },
  { key: "saturday", label: "Saturday", pt: "Sábado" },
  { key: "sunday", label: "Sunday", pt: "Domingo" },
];

export function HoursEditor({ onBack }: HoursEditorProps) {
  const { settings, updateSettings } = useRestaurantData();
  const { user } = useOwnerAuth();

  const [hours, setHours] = useState<WeekHours>(settings.openingHours);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleTimeChange = (
    day: keyof WeekHours,
    field: "open" | "close",
    val: string
  ) => {
    setHours({
      ...hours,
      [day]: {
        ...hours[day],
        [field]: val,
      },
    });
  };

  const handleToggleClosed = (day: keyof WeekHours) => {
    setHours({
      ...hours,
      [day]: {
        ...hours[day],
        isClosed: !hours[day].isClosed,
      },
    });
  };

  const handleApplyAllWeekdays = () => {
    const mondayVal = hours.monday;
    const updated: WeekHours = {
      ...hours,
      tuesday: { ...mondayVal },
      wednesday: { ...mondayVal },
      thursday: { ...mondayVal },
      saturday: { ...mondayVal },
      sunday: { ...mondayVal },
    };
    setHours(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSavedSuccess(false);
    try {
      await updateSettings({ openingHours: hours }, user?.email || undefined);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e: any) {
      alert("Failed to save hours: " + e.message);
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
            <Clock className="size-5 text-brand-yellow" />
            <span>Opening Hours Editor</span>
          </h2>
        </div>

        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-xl border-3 border-black bg-brand-yellow px-5 py-2.5 font-display font-black text-sm text-black uppercase tracking-wider shadow-fastfood hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
        >
          {savedSuccess ? <Check className="size-4" /> : <Save className="size-4" />}
          <span>{isSaving ? "Saving..." : savedSuccess ? "SAVED!" : "SAVE HOURS"}</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="rounded-2xl border-4 border-black bg-surface-card p-5 sm:p-7 shadow-fastfood space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-line pb-4">
          <div>
            <h3 className="font-display font-black text-lg text-white uppercase">
              Schedule per Day of Week
            </h3>
            <p className="text-xs text-muted">
              Public schedule badges and opening status update immediately.
            </p>
          </div>

          <button
            type="button"
            onClick={handleApplyAllWeekdays}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-bold text-brand-yellow hover:border-brand-yellow self-start sm:self-auto"
          >
            ⚡ Copy Monday Hours to All Days
          </button>
        </div>

        {/* Days List */}
        <div className="space-y-3">
          {DAYS_ORDER.map((d) => {
            const dayData = hours[d.key] || { open: "11:00", close: "00:00", isClosed: false };

            return (
              <div
                key={d.key}
                className={`rounded-xl border-2 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  dayData.isClosed
                    ? "border-brand-red/50 bg-brand-red/5"
                    : "border-line bg-surface"
                }`}
              >
                <div className="w-40">
                  <span className="font-display font-black text-base text-white uppercase block">
                    {d.label}
                  </span>
                  <span className="text-xs text-brand-yellow font-medium block">
                    {d.pt}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap flex-1">
                  {!dayData.isClosed ? (
                    <div className="flex items-center gap-2">
                      <div>
                        <span className="text-[10px] text-muted uppercase font-bold block mb-0.5">
                          Opens
                        </span>
                        <input
                          type="time"
                          value={dayData.open}
                          onChange={(e) => handleTimeChange(d.key, "open", e.target.value)}
                          className="rounded-lg border border-line bg-surface-card px-3 py-1.5 text-xs text-white font-bold focus:border-brand-yellow focus:outline-none"
                        />
                      </div>
                      <span className="text-muted pt-4 font-bold">—</span>
                      <div>
                        <span className="text-[10px] text-muted uppercase font-bold block mb-0.5">
                          Closes
                        </span>
                        <input
                          type="time"
                          value={dayData.close}
                          onChange={(e) => handleTimeChange(d.key, "close", e.target.value)}
                          className="rounded-lg border border-line bg-surface-card px-3 py-1.5 text-xs text-white font-bold focus:border-brand-yellow focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs font-black uppercase text-brand-red py-2">
                      🔴 CLOSED ALL DAY
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => handleToggleClosed(d.key)}
                    className={`ml-auto rounded-lg px-3 py-1.5 text-xs font-black uppercase border transition-colors ${
                      dayData.isClosed
                        ? "bg-brand-green/20 text-brand-green border-brand-green"
                        : "bg-surface text-muted border-line hover:text-brand-red"
                    }`}
                  >
                    {dayData.isClosed ? "Open This Day" : "Set as Closed"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
