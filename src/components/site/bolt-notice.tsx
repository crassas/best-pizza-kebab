import { boltPromotion } from "@/lib/restaurant";
import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

export function BoltNotice() {
  const { t } = useI18n();

  if (!boltPromotion.enabled) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
      <a
        href={boltPromotion.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("bolt_food_click", { from: "compact_notice" })}
        className="group flex min-h-12 items-center justify-between gap-4 rounded-xl border border-bolt/40 bg-bolt/10 px-4 py-3 text-sm text-cream transition-colors hover:border-bolt/70 hover:bg-bolt/15 focus:outline-none focus:ring-2 focus:ring-bolt"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="inline-block size-2.5 shrink-0 rounded-full bg-bolt" aria-hidden="true" />
          <span className="font-semibold">{t(boltPromotion.text)}</span>
        </span>
        <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-bolt group-hover:underline">
          Bolt Food
        </span>
      </a>
    </div>
  );
}
