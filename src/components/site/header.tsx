import { Phone, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { Wordmark } from "@/components/site/logo";
import { MarqueeBanner, CheckeredRibbon } from "@/components/site/marquee-banner";
import { useCartStore } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n";
import { copy, restaurant } from "@/lib/restaurant";
import { getManagedLiveStatus, useRestaurantData } from "@/lib/restaurant-context";
import { scrollToElement } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function Header() {
  const { lang, setLang, t } = useI18n();
  const { totalCount, setOpen } = useCartStore();
  const { settings } = useRestaurantData();
  const count = totalCount();
  const isPt = lang === "pt";
  const live = getManagedLiveStatus(settings.openingHours);
  const links = settings.deliveryLinks;

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToElement(targetId, 80);
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-black shadow-md">
      <MarqueeBanner isTopBanner variant="red" speed="normal" />
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <a href="#topo" onClick={(e) => handleNav(e, "topo")} className="shrink-0 transition-transform active:scale-95" aria-label={restaurant.name}><Wordmark compact /></a>
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-bold"><span className={cn("size-2 rounded-full", live.isOpen ? "bg-bolt animate-beacon" : "bg-red-500")} /><span className={live.isOpen ? "text-bolt" : "text-red-400"}>{t(live.label)}</span></div>
        </div>
        <nav className="hidden md:flex items-center gap-1 font-display tracking-wider uppercase text-base" aria-label={t(copy.navSections)}>
          <a href="#menu" onClick={(e) => handleNav(e, "menu")} className="rounded px-3 py-1.5 text-cream hover:text-brand-yellow hover:bg-surface transition-colors cursor-pointer">{t(copy.navMenu)}</a>
          <a href="#encomenda" onClick={(e) => handleNav(e, "encomenda")} className="rounded px-3 py-1.5 text-cream hover:text-brand-yellow hover:bg-surface transition-colors cursor-pointer">{isPt ? "Entregas & Takeaway" : "Takeaway & Delivery"}</a>
          <a href="#avaliacoes" onClick={(e) => handleNav(e, "avaliacoes")} className="rounded px-3 py-1.5 text-cream hover:text-brand-yellow hover:bg-surface transition-colors cursor-pointer">{t(copy.navReviews)}</a>
          <a href="#local" onClick={(e) => handleNav(e, "local")} className="rounded px-3 py-1.5 text-cream hover:text-brand-yellow hover:bg-surface transition-colors cursor-pointer">{t(copy.navDirections)}</a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex rounded border-2 border-black bg-surface p-0.5 shadow-xs" role="group" aria-label={t(copy.langSwitch)}>
            {(["pt", "en"] as const).map((code) => {
              const isActive = lang === code;
              return <button key={code} type="button" onClick={() => setLang(code)} className={cn("relative z-10 h-7 min-w-8 rounded-xs px-2 text-xs font-black uppercase transition-colors cursor-pointer", isActive ? "text-black" : "text-muted hover:text-white")} aria-pressed={isActive}>{isActive && <motion.span layoutId="activeLang" className="absolute inset-0 -z-10 rounded-xs bg-brand-yellow" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}{code.toUpperCase()}</button>;
            })}
          </div>
          <a href={`tel:${links.phoneTel || restaurant.phoneTel}`} className="hidden sm:inline-flex items-center gap-1.5 rounded-md border-2 border-black bg-surface hover:bg-raised px-3 py-1.5 text-xs font-black uppercase text-brand-yellow shadow-fastfood transition-transform active:translate-x-0.5 active:translate-y-0.5" aria-label={`${t(copy.ctaCall)} ${links.phoneDisplay || restaurant.phoneDisplay}`}><Phone className="size-3.5 text-brand-yellow" /><span>{links.phoneDisplay || restaurant.phoneDisplay}</span></a>
          <button type="button" onClick={() => setOpen(true)} className="relative flex items-center gap-2 rounded-md border-2 border-black bg-brand-red hover:bg-brand-red-dark px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-fastfood transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer" aria-label={isPt ? "Abrir bandeja de pedido" : "Open order tray"}><ShoppingBag className="size-4 text-brand-yellow" /><span className="hidden xs:inline">{isPt ? "Pedido" : "Tray"}</span>{count > 0 && <span className="flex size-5 items-center justify-center rounded-full bg-brand-yellow text-[11px] font-black text-black">{count}</span>}</button>
        </div>
      </div>
      <CheckeredRibbon height="h-1 sm:h-2.5" />
    </header>
  );
}
