import React from "react";
import { useRestaurantData } from "@/lib/restaurant-context";
import { History, ArrowLeft, Clock, UserCheck } from "lucide-react";

interface HistoryViewProps {
  onBack: () => void;
}

export function HistoryView({ onBack }: HistoryViewProps) {
  const { history } = useRestaurantData();

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
            <History className="size-5 text-brand-yellow" />
            <span>Activity &amp; Change History</span>
          </h2>
        </div>
      </div>

      {/* History Feed */}
      <div className="rounded-2xl border-4 border-black bg-surface-card p-5 sm:p-7 shadow-fastfood space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-10 text-muted">
            <Clock className="size-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-bold text-white">No history recorded yet</p>
            <p className="text-xs text-muted mt-1">
              Changes made to prices, promotions, availability, and hours will appear here in chronological order.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-line bg-surface p-3.5 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-white uppercase text-sm">
                    {item.action}
                  </span>
                  <span className="text-[11px] text-muted">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>

                <p className="text-cream/80 font-medium">{item.details}</p>

                <div className="flex items-center gap-1.5 text-[11px] text-brand-yellow pt-1">
                  <UserCheck className="size-3" />
                  <span>By: {item.userEmail || "Authorized Owner"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
