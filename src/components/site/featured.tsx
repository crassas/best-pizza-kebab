import { useState, useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { copy, featured, getCategoryAnchor, type Localized } from "@/lib/restaurant";
import { trackEvent } from "@/lib/analytics";

const bannerPhrases: Localized[] = [
  {
    pt: "Os favoritos dos nossos clientes no Porto",
    en: "Our customers' favorites in Porto",
  },
  {
    pt: "O melhor sabor na Rua São Roque da Lameira",
    en: "The best flavor on Rua São Roque da Lameira",
  },
  {
    pt: "Pizzas estaladiças & Kebabs suculentos todos os dias",
    en: "Crispy pizzas & juicy kebabs every day",
  },
  {
    pt: "Ingredientes frescos & confeção na hora no Porto",
    en: "Fresh ingredients & made fresh to order in Porto",
  },
  {
    pt: "Clique aqui para ver o menu completo & fazer pedido",
    en: "Click here to view full menu & order",
  },
];

export function Featured() {
  const { t } = useI18n();
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % bannerPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleBannerClick = () => {
    trackEvent("banner_click", { from: "featured_banner", phraseIndex });
    if (typeof window !== "undefined") {
      const menuEl = document.getElementById("menu");
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

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
    <section id="destaques" className="scroll-mt-[calc(4rem+env(safe-area-inset-top))] border-t border-line bg-bg px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-2 border-b border-line pb-4 sm:flex-row sm:items-end">
          <div>
            <div className="border-l-2 border-orange pl-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
              {t(copy.featuredKicker)}
            </div>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl text-cream">
              {t(copy.featuredTitle)}
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-muted sm:text-sm">
            {t({
              pt: "Quatro formas de começar. Escolhe uma para abrir a categoria correspondente no menu.",
              en: "Four ways to start. Choose one to open its category in the menu.",
            })}
          </p>
        </div>

        {/* Interactive Banner with Framer Motion text carousel */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleBannerClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleBannerClick();
            }
          }}
          className="group mt-6 mb-6 block w-full overflow-hidden rounded-xs border border-line bg-black/60 relative h-32 sm:h-40 text-left cursor-pointer transition-all hover:border-orange/60 focus:outline-none focus:ring-2 focus:ring-orange/50"
          aria-label={t({ pt: "Ver menu completo do Best Pizza & Kebab", en: "View full Best Pizza & Kebab menu" })}
        >
          <img
            src="/images/uploaded/banner_mais_populares.webp"
            alt={t({ pt: "Banner Mais Populares Best Pizza & Kebab", en: "Best Pizza & Kebab Popular Items Banner" })}
            className="size-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-95"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 flex flex-col justify-between p-4 sm:p-6">
            <div className="flex items-center justify-between w-full">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/90 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black">
                {t({ pt: "Destaque", en: "Highlight" })}
              </span>

              <div className="flex items-center gap-1 text-xs font-bold text-orange group-hover:text-cream transition-colors">
                <span className="hidden xs:inline">{t({ pt: "Ver Menu", en: "View Menu" })}</span>
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="min-h-[2.5rem] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="font-display text-base sm:text-2xl text-cream tracking-wide drop-shadow-md"
                  >
                    {t(bannerPhrases[phraseIndex])}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Carousel indicator dots */}
              <div className="flex items-center gap-1.5 mt-1">
                {bannerPhrases.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhraseIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === phraseIndex ? "w-6 bg-orange" : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
          {featured.map((dish) => (
            <div key={dish.id} className="w-[78vw] max-w-[18rem] shrink-0 snap-start md:w-auto md:max-w-none">
              <a
                href={`#${getCategoryAnchor(dish.categoryId)}`}
                onClick={(e) => handleCardClick(e, dish.categoryId, dish.id, dish.title)}
                className="group flex h-full flex-col overflow-hidden rounded-xs border border-line bg-surface transition-colors hover:bg-raised cursor-pointer"
              >
                {/* Photo Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg border-b border-line">
                  <img
                    src={dish.image}
                    alt={t(dish.alt)}
                    width={600}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 justify-between p-3.5 sm:p-4">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl tracking-wide text-cream group-hover:text-orange transition-colors">
                      {t(dish.title)}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange">
                    <span>{t(copy.featuredCta)}</span>
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
