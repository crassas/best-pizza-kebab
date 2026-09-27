import { useEffect, useState } from "react";
import { ArrowRight, Users, UtensilsCrossed } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { scrollToElement } from "@/lib/scroll";
import { trackEvent } from "@/lib/analytics";

type Slide = {
  id: string;
  lang: "pt" | "en";
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  detail: string;
  price: string;
  cta: string;
};

type Pack = {
  id: string;
  image: string;
  price: string;
  pt: { name: string; detail: string; callout: string };
  en: { name: string; detail: string; callout: string };
};

const PACKS: Pack[] = [
  {
    id: "family-kebab",
    image: "/images/menu-optimized/uploaded/menu_doner.webp",
    price: "15€",
    pt: {
      name: "Family Kebab Menu",
      detail: "2 kebabs + 2 batatas + 2 bebidas",
      callout: "Ideal para partilhar",
    },
    en: {
      name: "Family Kebab Menu",
      detail: "2 kebabs + 2 fries + 2 drinks",
      callout: "Made for sharing",
    },
  },
  {
    id: "family-durum",
    image: "/images/menu-optimized/uploaded/durum_kebab.webp",
    price: "16€",
    pt: {
      name: "Family Durum Kebab",
      detail: "2 durum + 2 batatas + 2 bebidas",
      callout: "Feito para partilhar",
    },
    en: {
      name: "Family Durum Kebab",
      detail: "2 durum + 2 fries + 2 drinks",
      callout: "Made to share",
    },
  },
  {
    id: "chicken-mix-box",
    image: "/images/menu-optimized/uploaded/imagens_menu_10_organizadas/chicken_mix_box.webp",
    price: "10€",
    pt: {
      name: "Chicken Mix Box",
      detail: "4 nuggets + 4 asinhas + 4 tiras de frango",
      callout: "Crocante para dividir",
    },
    en: {
      name: "Chicken Mix Box",
      detail: "4 nuggets + 4 wings + 4 chicken strips",
      callout: "Crispy and shareable",
    },
  },
  {
    id: "doner-mix-box",
    image: "/images/menu-optimized/uploaded/doner_box.webp",
    price: "7,50€",
    pt: {
      name: "Doner Mix Box",
      detail: "Mix de doner para partilhar",
      callout: "Boa escolha para dividir",
    },
    en: {
      name: "Doner Mix Box",
      detail: "Doner mix made for sharing",
      callout: "Easy to share",
    },
  },
];

const GENERAL_SLIDES: Slide[] = [
  {
    id: "family-overview-pt",
    lang: "pt",
    image: "/images/optimized/01_interior_refeicao.webp",
    eyebrow: "SÃO ROQUE · CAMPANHÃ · PORTO",
    title: "MENUS FAMILY",
    subtitle: "Boa comida. Bom preço. Boa companhia.",
    detail: "Menus e caixas pensados para dividir à mesa.",
    price: "DESDE 7,50€",
    cta: "Ver menu",
  },
  {
    id: "family-overview-en",
    lang: "en",
    image: "/images/optimized/01_interior_refeicao.webp",
    eyebrow: "SÃO ROQUE · CAMPANHÃ · PORTO",
    title: "FAMILY MENUS",
    subtitle: "Good food. Fair price. Good company.",
    detail: "Menus and sharing boxes made for the table.",
    price: "FROM €7.50",
    cta: "See menu",
  },
  {
    id: "best-kebab-porto-pt",
    lang: "pt",
    image: "/images/optimized/06_kebab_batatas.webp",
    eyebrow: "DESAFIO · PORTO",
    title: "O MELHOR KEBAB DO PORTO?",
    subtitle: "SÓ HÁ UMA MANEIRA DE DESCOBRIR.",
    detail: "Prova primeiro. Discute depois.",
    price: "TU DECIDES",
    cta: "Ver kebabs",
  },
  {
    id: "best-kebab-porto-en",
    lang: "en",
    image: "/images/optimized/06_kebab_batatas.webp",
    eyebrow: "PORTO · CHALLENGE",
    title: "BEST KEBAB IN PORTO?",
    subtitle: "THERE'S ONLY ONE WAY TO FIND OUT.",
    detail: "Taste first. Argue later.",
    price: "YOU DECIDE",
    cta: "See kebabs",
  },
];

const TOP_TICKER = [
  "FAMILY MENUS",
  "MENUS PARA PARTILHAR",
  "BEST KEBAB & PIZZA",
  "SÃO ROQUE DA LAMEIRA",
  "CAMPANHÃ · PORTO",
  "GOOD FOOD · GOOD COMPANY",
];

export function FamilyAds() {
  const { lang } = useI18n();
  const slides = GENERAL_SLIDES;
  const [active, setActive] = useState(0);
  const current = slides[active] ?? slides[0]!;
  const isPt = lang === "pt";

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((value) => (value + 1) % slides.length);
    }, 4400);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const goMenu = (from: string, packId?: string) => {
    trackEvent("banner_click", { banner: "family_menus", from, slide: current.id, packId });
    if (!packId) {
      scrollToElement("menu-quick", 128);
      return;
    }
    const category = packId === "chicken-mix-box" ? "chicken" : "kebabs";
    window.dispatchEvent(new CustomEvent("select-menu-category", { detail: category }));
    window.setTimeout(() => scrollToElement(`dish-${packId}`, 105), 280);
  };

  return (
    <section
      id="family-menus"
      className="relative overflow-hidden border-y-4 border-black bg-brand-black text-white"
      aria-label={isPt ? "Menus Family e packs para partilhar" : "Family menus and sharing packs"}
    >
      <div className="overflow-hidden border-b-2 border-black bg-brand-yellow py-2 text-black" aria-hidden="true">
        <div className="animate-marquee-fast">
          {[0, 1, 2, 3].map((copyIndex) => (
            <div
              key={`family-top-${copyIndex}`}
              className="flex shrink-0 items-center gap-8 px-4 font-display text-base font-black uppercase tracking-wider sm:text-lg"
            >
              {TOP_TICKER.map((text, index) => (
                <span key={`${copyIndex}-${index}`} className={index % 2 ? "text-brand-red" : ""}>
                  ★ {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7">
        <div className="relative min-h-[430px] overflow-hidden rounded-2xl border-4 border-black bg-black shadow-fastfood sm:min-h-[520px]">
          <AnimatePresence initial={false} mode="sync">
            <motion.img
              key={current.id + "-image"}
              src={current.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.035 }}
              animate={{ opacity: 1, scale: 1.075 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.75 }, scale: { duration: 4.6, ease: "linear" } }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,.97)_0%,rgba(8,7,6,.84)_36%,rgba(8,7,6,.30)_66%,rgba(8,7,6,.48)_100%)] sm:bg-[linear-gradient(90deg,rgba(8,7,6,.98)_0%,rgba(8,7,6,.82)_38%,rgba(8,7,6,.18)_70%,rgba(8,7,6,.34)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent" />

          <div className="relative z-10 flex min-h-[430px] items-end p-5 sm:min-h-[520px] sm:p-9 lg:p-12">
            <div className="max-w-2xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(7px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-brand-yellow px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-black shadow-fastfood sm:text-xs">
                    <Users className="size-3.5" />
                    {current.eyebrow}
                    <span className="rounded-full bg-black px-2 py-0.5 text-[9px] text-white">
                      {current.lang.toUpperCase()}
                    </span>
                  </div>

                  <h2 className="mt-4 max-w-2xl font-display text-5xl uppercase leading-[0.84] tracking-tight text-white sm:text-7xl lg:text-8xl">
                    {current.title}
                  </h2>

                  <p className="mt-4 font-display text-2xl uppercase leading-none text-brand-yellow sm:text-3xl">
                    {current.subtitle}
                  </p>

                  <p className="mt-3 max-w-xl text-sm font-bold leading-relaxed text-white/80 sm:text-lg">
                    {current.detail}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <div className="badge-stamp -rotate-1 bg-brand-red px-4 py-2 font-display text-3xl leading-none text-white shadow-fastfood sm:text-4xl">
                      {current.price}
                    </div>
                    <button
                      type="button"
                      onClick={() => goMenu("family_billboard")}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-3 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-wider text-black shadow-fastfood transition-transform hover:-translate-y-0.5"
                    >
                      <UtensilsCrossed className="size-4 text-brand-red" />
                      {current.cta}
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 z-20 hidden gap-1.5 sm:flex" aria-hidden="true">
            {slides.map((slide, index) => (
              <span
                key={slide.id}
                className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? "w-8 bg-brand-yellow" : "w-2 bg-white/35"}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PACKS.map((pack) => {
            const copy = isPt ? pack.pt : pack.en;
            return (
              <motion.button
                key={pack.id}
                type="button"
                onClick={() => {
                  goMenu("family_card", pack.id);
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.985 }}
                className="group relative min-h-[255px] overflow-hidden rounded-xl border-3 border-black bg-surface-card text-left shadow-fastfood"
              >
                <img
                  src={pack.image}
                  alt={copy.name}
                  width={900}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/15" />
                <div className="relative z-10 flex min-h-[255px] flex-col justify-end p-4">
                  <span className="mb-2 inline-flex w-fit rounded-full border-2 border-black bg-brand-yellow px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-black">
                    {copy.callout}
                  </span>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl uppercase leading-none text-white">
                        {copy.name}
                      </h3>
                      <p className="mt-1 text-[11px] font-semibold leading-snug text-white/75">
                        {copy.detail}
                      </p>
                    </div>
                    <strong className="badge-stamp shrink-0 bg-brand-red px-2.5 py-1 font-display text-2xl leading-none text-white">
                      {pack.price}
                    </strong>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

    </section>
  );
}
