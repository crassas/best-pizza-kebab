import { Phone, UtensilsCrossed, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n";
import { copy, restaurant } from "@/lib/restaurant";
import { useRestaurantData } from "@/lib/restaurant-context";
import { scrollToElement } from "@/lib/scroll";
import { trackEvent } from "@/lib/analytics";

export function ActionBar() {
  const { lang, t } = useI18n();
  const { totalCount, totalPrice, setOpen, isOpen } = useCartStore();
  const { settings } = useRestaurantData();
  const count = totalCount();
  const total = totalPrice();
  const isPt = lang === "pt";

  if (isOpen) return null;

  return (
    <AnimatePresence>
      <motion.nav initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} transition={{ type: "spring", stiffness: 350, damping: 30 }} aria-label={t(copy.navQuick)} className="fixed inset-x-0 bottom-0 z-40 border-t-3 border-black bg-brand-black md:hidden shadow-2xl" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="checker-red-white h-1 w-full border-b border-black" />
        <ul className="grid grid-cols-3 divide-x-2 divide-black">
          <li><a href="#menu" onClick={(e) => { e.preventDefault(); trackEvent("menu_view", { from: "bottom_bar" }); scrollToElement("menu", 80); }} className="flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-white hover:text-brand-red active:bg-surface transition-colors cursor-pointer"><UtensilsCrossed className="size-4.5 text-brand-red" /><span className="font-display text-xs uppercase tracking-wider">{t(copy.navMenu)}</span></a></li>
          <li><button type="button" onClick={() => { trackEvent("cart_open", { from: "bottom_bar" }); setOpen(true); }} className="relative flex w-full min-h-14 flex-col items-center justify-center gap-1 px-1 text-white bg-brand-red active:bg-brand-red-dark transition-colors cursor-pointer"><div className="relative"><ShoppingBag className="size-4.5 text-white" />{count > 0 && <span className="absolute -top-1.5 -right-2.5 flex size-4 items-center justify-center rounded-full bg-white text-[10px] font-black text-brand-red border border-black shadow-xs">{count}</span>}</div><span className="font-display text-xs uppercase tracking-wider">{isPt ? "O Meu Pedido" : "My Tray"} {count > 0 && `(${total.toFixed(2)}€)`}</span></button></li>
          <li><a href={`tel:${settings.deliveryLinks.phoneTel || restaurant.phoneTel}`} onClick={() => { trackEvent("phone_click", { from: "bottom_bar" }); }} className="flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-white hover:text-brand-red active:bg-surface transition-colors cursor-pointer"><Phone className="size-4.5 text-brand-red" /><span className="font-display text-xs uppercase tracking-wider">{isPt ? "Ligar / Apoio" : "Call / Support"}</span></a></li>
        </ul>
      </motion.nav>
    </AnimatePresence>
  );
}
