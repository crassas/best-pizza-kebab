import { ArrowRight, Flame } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { featured, getCategoryAnchor, type Localized } from "@/lib/restaurant";
import { trackEvent } from "@/lib/analytics";

export function Featured() {
  const { lang, t } = useI18n();
  const isPt = lang === "pt";

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: string, dishId: string, titleObj: Localized) => {
    e.preventDefault();
    trackEvent("dish_view", { itemId: dishId, itemName: t(titleObj), from: "featured" });
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-menu-category", { detail: categoryId }),
      );
      const menuEl = document.getElementById("menu");
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section id="destaques" className="scroll-mt-[calc(4rem+env(safe-area-inset-top))] bg-brand-black px-4 py-12 sm:px-6 sm:py-16 border-t-4 border-black [content-visibility:auto] [contain-intrinsic-size:850px]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end mb-8">
          <div>
            <div className="badge-stamp bg-brand-yellow text-black px-3 py-1 text-xs mb-2.5 -rotate-1">
              <Flame className="size-3.5 fill-black mr-1" />
              <span>{isPt ? "OS MAIS PEDIDOS" : "TOP SELLERS"}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              {isPt ? "Favoritos dos Nossos Clientes" : "Customer Favorites"}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-cream/80">
            {isPt
              ? "Quatro das nossas opções mais consagradas. Clique em qualquer prato para saltar diretamente para a respetiva categoria no menu."
              : "Four of our most famous options. Click any card to jump directly to its category on the menu."}
          </p>
        </div>

        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {featured.map((dish, idx) => (
            <div key={dish.id} className="w-[78vw] max-w-[19rem] shrink-0 snap-start md:w-auto md:max-w-none">
              <a
                href={`#${getCategoryAnchor(dish.categoryId)}`}
                onClick={(e) => handleCardClick(e, dish.categoryId, dish.id, dish.title)}
                className="group flex h-full flex-col overflow-hidden rounded-xl border-4 border-black bg-surface-card fastfood-card active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <div className="hidden md:block checker-red-white md:h-2.5 w-full border-b-2 border-black" />
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black border-b-3 border-black">
                  <img src={dish.image} alt={t(dish.alt)} width={600} height={450} loading="lazy" decoding="async" fetchPriority="low" className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" />
                  <div className="absolute top-2.5 left-2.5 flex size-8 items-center justify-center rounded-md border-2 border-black bg-brand-yellow font-display text-lg font-black text-black shadow-xs -rotate-2">0{idx + 1}</div>
                  <div className="absolute top-2.5 right-2.5 badge-stamp bg-brand-red text-white text-[10px] px-2 py-0.5 rotate-1">★ {isPt ? "DESTAQUE" : "POPULAR"}</div>
                </div>
                <div className="flex flex-col flex-1 justify-between p-4 bg-surface-card">
                  <div><h3 className="font-display text-2xl tracking-wide uppercase text-white group-hover:text-brand-yellow transition-colors leading-tight">{t(dish.title)}</h3></div>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t-2 border-line text-xs font-black uppercase tracking-wider text-brand-yellow group-hover:text-white transition-colors"><span>{isPt ? "Pedir ou Ver no Menu" : "Order / View in Menu"}</span><ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" /></div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
