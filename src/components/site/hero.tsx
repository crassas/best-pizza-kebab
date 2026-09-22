import { useState } from "react";
import {
  UtensilsCrossed,
  Flame,
  Star,
  MapPin,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n";
import { ALL_DISHES, maps } from "@/lib/restaurant";
import { getManagedLiveStatus, useRestaurantData } from "@/lib/restaurant-context";
import { scrollToElement } from "@/lib/scroll";
import { trackEvent } from "@/lib/analytics";

type SignatureDish = { id: string; tag: string; image: string; sizeId?: string };

const SIGNATURE_DISHES: SignatureDish[] = [
  { id: "durum-kebab", tag: "DURUM KEBAB", image: "/images/enhanced/06_kebab_batatas.png" },
  { id: "special-kebab", tag: "PIZZA", image: "/images/enhanced/05_pizza.png", sizeId: "small" },
  { id: "doner-mix-box", tag: "DONER MIX BOX", image: "/images/enhanced/06_kebab_batatas.png" },
  { id: "crispy-chicken-burger", tag: "BURGER", image: "/food/burger.jpg" },
  { id: "doner-falafel", tag: "FALAFEL", image: "/images/enhanced/08_falafel.png" },
];

export function Hero() {
  const { lang, t } = useI18n();
  const { addItem, setOpen } = useCartStore();
  const {
    settings,
    getDishPrice,
    getDishSizePrice,
    getDishName,
    getDishDescription,
    getDishImage,
    isDishAvailable,
  } = useRestaurantData();
  const [activeIndex, setActiveIndex] = useState(0);
  const isPt = lang === "pt";
  const live = getManagedLiveStatus(settings.openingHours);
  const links = settings.deliveryLinks;
  const signature = SIGNATURE_DISHES[activeIndex];
  const dish = ALL_DISHES.find((item) => item.id === signature.id) ?? ALL_DISHES[0];
  const size = signature.sizeId
    ? dish?.sizes?.find((item) => item.id === signature.sizeId)
    : undefined;
  const price = dish
    ? size
      ? getDishSizePrice(dish.id, size.id, size.price)
      : getDishPrice(dish.id, dish.price)
    : null;
  const name = dish ? getDishName(dish.id, dish.name) : { pt: signature.tag, en: signature.tag };
  const description = dish ? getDishDescription(dish.id, dish.description) : undefined;
  const image = dish ? getDishImage(dish.id, signature.image) || signature.image : signature.image;
  const available = dish ? isDishAvailable(dish.id) : false;

  const addActive = () => {
    if (!dish || !available || settings.isOnlineOrderingPaused || price === null) return;
    addItem({
      id: dish.id,
      name: name[lang],
      sizeName: size ? t(size.label) : undefined,
      price,
    });
    trackEvent("add_to_cart", { item: dish.id, from: "hero_showcase", price });
  };

  const primaryTicker = isPt
    ? [
        "★ DONER KEBAB · DURUM · PIZZAS · HAMBÚRGUERES ★",
        "● FALAFEL · PRATOS · SNACKS ●",
        "★ TAKEAWAY · BOLT FOOD · UBER EATS ★",
        "● SÃO ROQUE DA LAMEIRA 2346 · CAMPANHÃ ●",
      ]
    : [
        "★ DONER KEBAB · DURUM · PIZZA · BURGERS ★",
        "● FALAFEL · PLATES · SNACKS ●",
        "★ TAKEAWAY · BOLT FOOD · UBER EATS ★",
        "● SÃO ROQUE DA LAMEIRA 2346 · CAMPANHÃ ●",
      ];

  const secondaryTicker = isPt
    ? [
        "★ MONTE O PEDIDO NO SITE E ENVIE PARA CONFIRMAÇÃO ★",
        "● BOLT FOOD COM 30% DE DESCONTO ●",
        "★ HORÁRIOS ATUALIZADOS NESTA PÁGINA ★",
        "● KEBAB · PIZZA · FALAFEL · HAMBÚRGUERES ●",
      ]
    : [
        "★ BUILD YOUR ORDER ON THE SITE AND SEND IT FOR CONFIRMATION ★",
        "● 30% OFF ON BOLT FOOD ●",
        "★ OPENING HOURS UPDATED ON THIS PAGE ★",
        "● KEBAB · PIZZA · FALAFEL · BURGERS ●",
      ];

  return (
    <section
      id="topo"
      className="relative overflow-hidden border-b-4 border-black bg-brand-black text-cream"
    >
      <div className="absolute inset-0 bg-diner-dots opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14 lg:py-16">
        <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="badge-stamp bg-surface px-3.5 py-1.5 text-xs text-white">
            <span
              className={`mr-2 inline-block size-2.5 rounded-full ${live.isOpen ? "bg-bolt animate-beacon" : "bg-red-500"}`}
            />
            {t(live.label)}
          </div>
          <div className="badge-stamp -rotate-1 bg-brand-red px-3 py-1.5 text-xs text-white">
            <ShieldCheck className="mr-1.5 size-3.5" />
            {isPt ? "Opções Halal" : "Halal Options"}
          </div>
          <a
            href={links.googleMaps || maps.search}
            target="_blank"
            rel="noopener noreferrer"
            className="badge-stamp rotate-1 bg-brand-yellow px-3 py-1.5 text-xs text-black"
          >
            <Star className="mr-1 size-3.5 fill-black" />4.9 / 5.0 Google Reviews
          </a>
          <div className="hidden sm:inline-flex badge-stamp bg-surface/90 px-3 py-1.5 text-xs text-muted border-line">
            <MapPin className="mr-1.5 size-3.5 text-brand-red" />
            São Roque da Lameira 2346, Porto
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="badge-stamp -rotate-1 bg-brand-red px-3 py-1 text-xs sm:text-sm text-white shadow-fastfood">
              ★ KEBAB • DURUM • PIZZA • FALAFEL ★
            </div>
            <h1 className="mt-3 font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.88] uppercase tracking-tight text-white">
              BEST KEBAB
              <br />
              <span className="mt-1 inline-block -rotate-1 border-3 border-black bg-white px-3 py-0.5 text-brand-red shadow-fastfood">
                &amp; PIZZA
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg sm:text-xl font-medium text-cream/90 leading-snug">
              {isPt
                ? "Doner Kebab, Durum, Pizzas, Hambúrgueres, Falafel, Pratos e Snacks. Doses generosas e serviço rápido em Campanhã."
                : "Doner Kebab, Durum, Pizza, Burgers, Falafel, Plates and Snacks. Generous portions and fast service in Campanhã."}
            </p>
            <div className="mt-7 flex w-full sm:w-auto flex-wrap gap-3 sm:gap-4">
              <a
                href="#menu"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent("menu_view", { from: "hero_cta" });
                  scrollToElement("menu", 80);
                }}
                className="flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-md border-3 border-black bg-brand-red px-7 py-3.5 text-base sm:text-lg font-extrabold uppercase tracking-wider text-white shadow-fastfood hover:bg-brand-red-dark"
              >
                <UtensilsCrossed className="size-5" />
                {isPt ? "Ver Cardápio & Preços" : "Explore Menu & Prices"}
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-md border-3 border-black bg-white px-6 py-3.5 text-base sm:text-lg font-extrabold uppercase tracking-wider text-black shadow-fastfood hover:bg-neutral-100"
              >
                <ShoppingBag className="size-5 text-brand-red" />
                {isPt ? "Ver Pedido" : "View Order"}
              </button>
            </div>
            <div className="mt-8 w-full max-w-lg border-t-2 border-line/60 pt-6">
              <p className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-red">
                <Zap className="size-4" />
                {isPt ? "Peça Também Pelas Apps Parceiras:" : "Also Available On Official Apps:"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {links.bolt && (
                  <a
                    href={links.bolt}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-md border-2 border-black bg-surface p-2.5 shadow-fastfood hover:border-bolt"
                  >
                    <span>
                      <b className="text-white">Bolt Food</b>
                      <small className="block font-black text-bolt">-30% DESCONTO</small>
                    </span>
                    <ArrowRight className="size-4 text-bolt" />
                  </a>
                )}
                {links.uber && (
                  <a
                    href={links.uber}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-md border-2 border-black bg-surface p-2.5 shadow-fastfood hover:border-uber"
                  >
                    <span>
                      <b className="text-white">Uber Eats</b>
                      <small className="block text-muted">{isPt ? "Entrega" : "Delivery"}</small>
                    </span>
                    <ArrowRight className="size-4 text-uber" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-xl border-4 border-black bg-surface-card p-4 sm:p-6 shadow-fastfood">
              <div className="hidden sm:block checker-red-white sm:h-3.5 w-full border-b-2 border-black sm:-mt-6 sm:-mx-6 mb-4 sm:w-[calc(100%+3rem)]" />
              <div className="mb-4 flex items-center justify-between border-b-2 border-black pb-3">
                <span className="flex items-center gap-2 font-display text-xl uppercase tracking-wider text-white">
                  <Flame className="size-5 text-brand-red" />
                  {isPt ? "Especialidades" : "Specialties"}
                </span>
                <span className="badge-stamp -rotate-1 bg-brand-red px-2 py-0.5 text-[11px] text-white">
                  {signature.tag}
                </span>
              </div>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border-3 border-black bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={signature.id}
                    src={image}
                    alt={name[lang]}
                    className="h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </AnimatePresence>
                <div className="absolute left-3 top-3 badge-stamp -rotate-2 bg-white px-2.5 py-1 text-[11px] text-brand-red">
                  ★ {isPt ? "DESTAQUE DO MENU" : "MENU PICK"} ★
                </div>
                <div className="absolute right-3 top-3 rounded-md border-3 border-black bg-brand-red px-3.5 py-1.5 shadow-fastfood">
                  <span className="font-display text-2xl sm:text-3xl font-black text-white">
                    {price !== null ? `${price.toFixed(2)} €` : "—"}
                  </span>
                </div>
              </div>
              <h3 className="mt-4 font-display text-2xl sm:text-3xl uppercase tracking-wide text-white">
                {name[lang]}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-muted">{description?.[lang] || ""}</p>
              <button
                type="button"
                onClick={addActive}
                disabled={!available || settings.isOnlineOrderingPaused || price === null}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border-2 border-black bg-brand-red py-3 text-sm font-black uppercase tracking-wider text-white shadow-fastfood hover:bg-brand-red-dark disabled:opacity-50"
              >
                <ShoppingBag className="size-4" />
                {!available
                  ? isPt
                    ? "Esgotado"
                    : "Sold Out"
                  : settings.isOnlineOrderingPaused
                    ? isPt
                      ? "Pedidos Pausados"
                      : "Orders Paused"
                    : `${isPt ? "Adicionar ao Pedido" : "Add to Order"} (${price !== null ? `${price.toFixed(2)} €` : "—"})`}
              </button>
              <div className="mt-5 border-t-2 border-line pt-4">
                <p className="mb-2 text-[11px] font-black uppercase tracking-wider text-muted">
                  {isPt ? "Escolha uma especialidade:" : "Choose a specialty:"}
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {SIGNATURE_DISHES.map((item, index) => (
                    <button
                      key={`${item.id}-${item.sizeId || "base"}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`relative aspect-square overflow-hidden rounded border-2 ${activeIndex === index ? "border-brand-red ring-2 ring-brand-red scale-105" : "border-black/60 opacity-60 hover:opacity-100"}`}
                      aria-label={item.tag}
                    >
                      <img src={item.image} alt={`${item.tag} — Best Kebab & Pizza Porto`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y-4 border-black bg-black overflow-hidden">
        <div className="checker-red-white h-1 sm:h-3.5 w-full border-b sm:border-b-2 border-black" />

        <div className="bg-brand-red py-2.5 overflow-hidden whitespace-nowrap border-b-2 border-black" aria-hidden="true">
          <div className="animate-marquee-fast">
            {[0, 1, 2, 3].map((copyIndex) => (
              <div
                key={`primary-${copyIndex}`}
                className="flex shrink-0 items-center gap-8 px-4 font-display text-lg sm:text-xl tracking-wider uppercase text-white font-black"
              >
                {primaryTicker.map((phrase, index) => (
                  <span key={`${copyIndex}-${index}`} className={index % 2 ? "text-brand-yellow" : undefined}>
                    {phrase}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white py-2 overflow-hidden whitespace-nowrap" aria-hidden="true">
          <div className="animate-marquee-reverse">
            {[0, 1, 2, 3].map((copyIndex) => (
              <div
                key={`secondary-${copyIndex}`}
                className="flex shrink-0 items-center gap-8 px-4 font-display text-base sm:text-lg tracking-wider uppercase text-black font-black"
              >
                {secondaryTicker.map((phrase, index) => (
                  <span key={`${copyIndex}-${index}`} className={index % 2 === 0 ? "text-brand-red" : undefined}>
                    {phrase}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden sm:block checker-red-white sm:h-3.5 w-full sm:border-t-2 border-black" />
      </div>
    </section>
  );
}
