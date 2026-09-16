import { ArrowRight, CheckCircle2, ExternalLink, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n";
import { boltFood, uberEats } from "@/lib/restaurant";
import { useRestaurantData } from "@/lib/restaurant-context";
import { scrollToElement } from "@/lib/scroll";
import { trackEvent } from "@/lib/analytics";

export function HowToOrder() {
  const { lang } = useI18n();
  const { setOpen, totalCount, totalPrice } = useCartStore();
  const { settings } = useRestaurantData();
  const isPt = lang === "pt";
  const count = totalCount();
  const total = totalPrice();
  const boltUrl = settings.deliveryLinks.bolt || boltFood.storeUrl;
  const uberUrl = settings.deliveryLinks.uber || uberEats.storeUrl;

  const goToMenu = () => {
    trackEvent("menu_view", { from: "how_to_order_section" });
    scrollToElement("menu", 80);
  };

  const openTray = () => {
    trackEvent("cart_open", { from: "how_to_order_section" });
    setOpen(true);
  };

  return (
    <section
      id="encomenda"
      className="relative overflow-hidden border-y-4 border-black bg-brand-black text-cream"
    >
      <div className="checker-red-white h-1.5 sm:h-3 w-full border-b-2 border-black" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="mb-8 sm:mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="badge-stamp -rotate-1 bg-brand-yellow px-3 py-1 text-[11px] sm:text-xs text-black">
              {isPt ? "PEDIR É SIMPLES" : "ORDERING IS SIMPLE"}
            </div>
            <h2 className="mt-3 font-display text-4xl sm:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight text-white">
              {isPt ? (
                <>
                  Escolhe. Adiciona.
                  <br />
                  <span className="text-brand-red">Envia.</span>
                </>
              ) : (
                <>
                  Choose. Add.
                  <br />
                  <span className="text-brand-red">Send.</span>
                </>
              )}
            </h2>
          </div>
          <p className="max-w-lg text-sm sm:text-base font-medium leading-relaxed text-cream/75">
            {isPt
              ? "Monta o pedido diretamente no site. No fim, enviamos o resumo ao restaurante para confirmação."
              : "Build your order directly on the site. At the end, send the full order to the restaurant for confirmation."}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-5 lg:gap-6">
          <article className="relative overflow-hidden rounded-xl border-4 border-black bg-brand-red p-5 sm:p-7 shadow-fastfood lg:col-span-3">
            <div className="absolute -right-6 -top-8 font-display text-[9rem] sm:text-[12rem] leading-none text-black/10 select-none">
              01
            </div>

            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <div className="badge-stamp bg-white px-3 py-1 text-[11px] text-brand-red">
                  {isPt ? "TAKEAWAY NO RESTAURANTE" : "RESTAURANT TAKEAWAY"}
                </div>
                <ShoppingBag className="size-7 sm:size-9 text-brand-yellow" />
              </div>

              <h3 className="mt-5 max-w-xl font-display text-3xl sm:text-5xl uppercase leading-none text-white">
                {isPt ? "Faz o pedido aqui." : "Order right here."}
              </h3>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
                {[
                  isPt ? "Escolhe no menu" : "Choose from the menu",
                  isPt ? "Adiciona ao pedido" : "Add to your order",
                  isPt ? "Envia para confirmação" : "Send for confirmation",
                ].map((label, index) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-md border-2 border-black bg-black/20 px-3 py-3 text-xs sm:text-sm font-black uppercase tracking-wide text-white"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-black bg-brand-yellow text-xs font-black text-black">
                      {index + 1}
                    </span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={goToMenu}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-md border-3 border-black bg-white px-5 py-3 text-sm font-black uppercase tracking-wider text-black shadow-fastfood transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <UtensilsCrossed className="size-4 text-brand-red" />
                  {isPt ? "Escolher no menu" : "Choose from menu"}
                  <ArrowRight className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={openTray}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-md border-3 border-black bg-brand-yellow px-5 py-3 text-sm font-black uppercase tracking-wider text-black shadow-fastfood transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <ShoppingBag className="size-4" />
                  {isPt ? "O meu pedido" : "My order"}
                  {count > 0 && (
                    <span className="rounded-full border-2 border-black bg-black px-2 py-0.5 text-[10px] text-white">
                      {count} · {total.toFixed(2)}€
                    </span>
                  )}
                </button>
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-md border-2 border-black/60 bg-black/20 px-3.5 py-3 text-xs sm:text-sm font-semibold text-white/90">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-yellow" />
                <span>
                  {isPt
                    ? "O envio do pedido não é confirmação automática. O restaurante confirma antes da preparação."
                    : "Sending the order is not automatic confirmation. The restaurant confirms it before preparation."}
                </span>
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-xl border-4 border-black bg-surface-card p-5 sm:p-7 shadow-fastfood lg:col-span-2">
            <div className="absolute -right-5 -top-7 font-display text-[8rem] sm:text-[10rem] leading-none text-white/5 select-none">
              02
            </div>

            <div className="relative flex h-full flex-col">
              <div className="badge-stamp -rotate-1 self-start bg-brand-yellow px-3 py-1 text-[11px] text-black">
                {isPt ? "ENTREGA EM CASA" : "HOME DELIVERY"}
              </div>

              <h3 className="mt-5 font-display text-3xl sm:text-4xl uppercase leading-none text-white">
                {isPt ? "Preferes entrega?" : "Prefer delivery?"}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                {isPt
                  ? "Usa uma das plataformas parceiras. O pedido e a entrega são tratados diretamente pela respetiva app."
                  : "Use one of the partner platforms. Ordering and delivery are handled directly by the selected app."}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={boltUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("bolt_food_click", { from: "how_to_order_section" })}
                  className="flex min-h-14 items-center justify-between rounded-md border-3 border-black bg-bolt px-5 py-3 text-sm font-black uppercase tracking-wider text-black shadow-fastfood transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span>
                    <span className="block">Bolt Food</span>
                    <span className="block text-[10px] tracking-normal normal-case">{isPt ? "30% de desconto — ver condições" : "30% off — see terms"}</span>
                  </span>
                  <ExternalLink className="size-4" />
                </a>

                <a
                  href={uberUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("uber_eats_click", { from: "how_to_order_section" })}
                  className="flex min-h-14 items-center justify-between rounded-md border-3 border-black bg-black px-5 py-3 text-sm font-black uppercase tracking-wider text-white shadow-fastfood transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span>Uber Eats</span>
                  <ExternalLink className="size-4 text-uber" />
                </a>
              </div>

              <div className="mt-auto pt-6">
                <div className="border-t-2 border-line pt-4 text-[11px] font-black uppercase tracking-wider text-muted">
                  {isPt ? "Takeaway no site · Entrega nas apps" : "Takeaway on site · Delivery in apps"}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="checker-red-white h-1.5 sm:h-3 w-full border-t-2 border-black" />
    </section>
  );
}
