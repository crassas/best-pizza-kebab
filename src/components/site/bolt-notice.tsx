import { Zap, ExternalLink } from "lucide-react";
import { boltFood, boltPromotion, uberEats } from "@/lib/restaurant";
import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";

export function BoltNotice() {
  const { lang, t } = useI18n();
  const isPt = lang === "pt";

  if (!boltPromotion.enabled) return null;

  return (
    <section id="encomenda" className="bg-brand-black py-6 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-xl border-3 border-black bg-surface-card p-5 sm:p-7 shadow-fastfood voucher-ticket">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="flex size-16 sm:size-20 shrink-0 flex-col items-center justify-center rounded-xl border-3 border-black bg-bolt text-black font-display font-black shadow-fastfood -rotate-2">
                <span className="text-2xl sm:text-3xl leading-none">30%</span><span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">OFF</span>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 badge-stamp bg-bolt/20 text-bolt border-bolt px-2.5 py-0.5 text-[11px] mb-1.5"><Zap className="size-3 fill-bolt" /><span>{isPt ? "CUPÃO DE DESCONTO AUTOMÁTICO" : "AUTOMATIC DISCOUNT VOUCHER"}</span></div>
                <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-wide text-white leading-none">{isPt ? "30% DE DESCONTO NA BOLT FOOD" : "30% OFF ON BOLT FOOD"}</h3>
                <p className="text-xs sm:text-sm text-cream/80 mt-1.5 max-w-xl font-medium">{t(boltPromotion.text)} • <strong className="text-brand-yellow font-bold">{isPt ? "Desconto direto sem código. Válido para entrega no Porto." : "Direct discount. Valid for Porto delivery."}</strong></p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto shrink-0">
              <a href={boltFood.storeUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("bolt_food_click", { from: "promo_banner" })} className="flex items-center gap-2 rounded-md border-3 border-black bg-bolt hover:bg-emerald-500 px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-black shadow-fastfood active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"><span>{isPt ? "Pedir com -30% Desconto" : "Order with -30% Off"}</span><ExternalLink className="size-4" /></a>
              <a href={uberEats.storeUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("uber_eats_click", { from: "promo_banner" })} className="flex items-center gap-2 rounded-md border-3 border-black bg-surface hover:bg-raised px-5 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-fastfood active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer border-uber/60"><span className="size-2.5 rounded-full bg-uber" /><span>Uber Eats</span><ExternalLink className="size-3.5 text-muted" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
