import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CupSoda, Leaf, Plus, Search, Soup, UtensilsCrossed, Wine, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useI18n } from "@/lib/i18n";
import { useRestaurantData } from "@/lib/restaurant-context";
import {
  ALLERGEN_IDS,
  ALLERGEN_LABELS,
  getCategoryAnchor,
  menu,
  type MenuCategory,
  type MenuItem,
} from "@/lib/restaurant";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const CATEGORY_IMAGES: Partial<Record<string, string>> = {
  kebabs: "/images/optimized/06_kebab_batatas-thumb.webp",
  burgers: "/images/uploaded/hmm_burger.webp",
  chicken: "/images/uploaded/palitos_de_frango_com_fritas_e_refrigerante.webp",
  dishes: "/images/optimized/07_kebab_prato_agua-thumb.webp",
  indian: "/images/uploaded/samosa_simple.jpg",
  pasta: "/images/categories/massas-asiatico.webp",
  drinks: "/images/categories/bebidas.webp",
  beers: "/images/categories/cervejas-vinhos.webp",
  pizza: "/images/optimized/05_pizza-thumb.webp",
  pizzas: "/images/optimized/05_pizza-thumb.webp",
  extras: "/images/uploaded/samosa_snack.jpg",
};

const CATEGORY_FALLBACK_ICONS = {
  pasta: Soup,
  drinks: CupSoda,
  beers: Wine,
} as const;

const visibleMenu = menu.filter((c) => c.items.length > 0);

function optimizedMenuImage(src?: string) {
  if (!src) return undefined;
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/images/optimized/") || src.startsWith("/images/menu-optimized/")) return src;
  if (src.startsWith("/images/uploaded/")) {
    const relative = src.slice("/images/uploaded/".length).replace(/\.[^.]+$/, ".webp");
    return `/images/menu-optimized/uploaded/${relative}`;
  }
  if (src.startsWith("/food/")) {
    const relative = src.slice("/food/".length).replace(/\.[^.]+$/, ".webp");
    return `/images/menu-optimized/food/${relative}`;
  }
  return src;
}

export function MenuSection() {
  const { lang, t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const isPt = lang === "pt";
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const categoriesNavRef = useRef<HTMLDivElement | null>(null);

  const clearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const handleSelect = useCallback((categoryId: string) => {
    clearSearch();
    setSelectedCategory(categoryId);
  }, [clearSearch]);

  useEffect(() => {
    const scrollToCategory = (catId: string) => {
      if (!catId || catId === "all" || catId === "menu-categories" || catId === "menu-quick") return handleSelect("all");
      const clean = catId.startsWith("menu-") ? catId.slice(5) : catId;
      const matched = clean === "pizzas" ? "pizza" : clean;
      if (visibleMenu.some((c) => c.id === matched)) handleSelect(matched);
    };
    const custom = (e: Event) => scrollToCategory((e as CustomEvent<string>).detail);
    const hash = () => scrollToCategory(window.location.hash.replace("#", ""));
    window.addEventListener("select-menu-category", custom);
    window.addEventListener("hashchange", hash);
    if (window.location.hash) setTimeout(hash, 100);
    return () => { window.removeEventListener("select-menu-category", custom); window.removeEventListener("hashchange", hash); };
  }, [handleSelect]);

  useEffect(() => {
    const scroller = categoriesNavRef.current;
    const chip = chipRefs.current[selectedCategory];
    if (!scroller || !chip) return;
    const left = chip.offsetLeft - (scroller.clientWidth - chip.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [selectedCategory]);

  const filteredMenu = useMemo(() => {
    const q = search.trim().toLowerCase();
    return visibleMenu.map((cat) => {
      const catMatches = q ? cat.label.pt.toLowerCase().includes(q) || cat.label.en.toLowerCase().includes(q) : false;
      const items = cat.items.filter((item) => {
        if (vegOnly && !item.vegetarian) return false;
        if (!q || catMatches) return true;
        return item.name.pt.toLowerCase().includes(q) || item.name.en.toLowerCase().includes(q) || (item.description?.pt.toLowerCase() ?? "").includes(q) || (item.description?.en.toLowerCase() ?? "").includes(q);
      });
      return items.length ? { ...cat, items } : null;
    }).filter((cat): cat is MenuCategory => Boolean(cat));
  }, [search, vegOnly]);

  const filtered = Boolean(search.trim() || vegOnly);
  const showCategoryOverview = selectedCategory === "all" && !filtered;
  const displayedCategories = filtered ? filteredMenu : selectedCategory === "all" ? [] : filteredMenu.filter((c) => c.id === selectedCategory);

  return (
    <section id="menu" className="relative scroll-mt-[calc(4rem+env(safe-area-inset-top))] border-t-4 border-black bg-brand-black text-cream">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10">
        <div className="inline-block rounded-xs bg-brand-red px-2.5 py-1 text-xs font-black uppercase tracking-widest text-white mb-2 shadow-xs">★ {isPt ? "CARDÁPIO OFICIAL" : "OFFICIAL MENU"} ★</div>
        <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">{isPt ? "Kebab no Porto, pizza em Campanhã" : "Kebab in Porto, pizza in Campanhã"}</h2>
        <p className="mt-2 text-sm sm:text-base text-muted max-w-2xl">{isPt ? "Escolhe primeiro a categoria e chega logo aos produtos. A pesquisa, o filtro vegetariano e os alergénios ficam logo a seguir." : "Choose a category first and go straight to the products. Search, vegetarian filter and allergen information follow immediately after."}</p>
      </div>

      <div id="menu-quick" className="scroll-mt-[calc(8rem+env(safe-area-inset-top))]">
        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-brand-yellow">{isPt ? "ESCOLHE UMA CATEGORIA" : "CHOOSE A CATEGORY"}</p>
          <div className="mt-1 flex items-end justify-between gap-4">
            <h3 className="font-display text-3xl uppercase text-white sm:text-4xl">{isPt ? "Menu rápido" : "Quick menu"}</h3>
            <span className="hidden rounded-full border-2 border-black bg-surface px-3 py-1 text-[10px] font-black uppercase text-muted sm:inline-flex">{visibleMenu.reduce((sum, category) => sum + category.items.length, 0)} {isPt ? "itens" : "items"}</span>
          </div>
        </div>
        <div id="menu-categories" className="relative z-20 mt-3 border-y-2 border-black bg-surface/95 md:sticky md:top-[calc(5rem+env(safe-area-inset-top))] md:z-30 md:backdrop-blur-md"><div className="mx-auto max-w-7xl"><div ref={categoriesNavRef} className="no-scrollbar flex touch-pan-x gap-2 overflow-x-auto px-4 py-2.5 sm:px-6"><button type="button" ref={(el)=>{chipRefs.current.all=el}} onClick={()=>handleSelect("all")} className={cn("relative z-10 h-10 shrink-0 rounded-md border-2 border-black px-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-xs", selectedCategory === "all" && !filtered ? "bg-brand-red text-white shadow-fastfood-red" : "bg-surface text-muted hover:text-white hover:bg-raised")}>{isPt ? "★ TODAS AS CATEGORIAS" : "★ ALL CATEGORIES"}</button>{visibleMenu.map((category)=><button key={category.id} type="button" ref={(el)=>{chipRefs.current[category.id]=el}} onClick={()=>handleSelect(category.id)} className={cn("relative z-10 h-10 shrink-0 rounded-md border-2 border-black px-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-xs", selectedCategory===category.id && !filtered ? "bg-brand-yellow text-black shadow-fastfood-yellow" : "bg-surface text-muted hover:text-white hover:bg-raised")}>{t(category.label)}</button>)}</div></div></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative z-20 w-full sm:max-w-sm pointer-events-auto"><Search className="pointer-events-none absolute left-3 top-1/2 z-30 -translate-y-1/2 size-5 text-muted"/><input type="search" inputMode="search" enterKeyHint="search" autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false} value={search} onChange={(e)=>setSearch(e.currentTarget.value)} onFocus={(e)=>e.currentTarget.select()} placeholder={isPt ? "Pesquisar kebab, pizza..." : "Search kebab, pizza..."} aria-label={isPt ? "Pesquisar no menu" : "Search the menu"} className="relative z-20 h-12 w-full touch-manipulation rounded-md border-2 border-black bg-surface pl-10 pr-10 text-base font-bold text-white placeholder:text-muted focus:border-brand-yellow focus:outline-none" style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff", caretColor: "#ffc72c" }}/>{search && <button type="button" onClick={clearSearch} aria-label={isPt ? "Limpar pesquisa" : "Clear search"} className="absolute right-3 top-1/2 z-30 -translate-y-1/2 text-muted hover:text-white"><X className="size-4"/></button>}</div>
          <button type="button" onClick={()=>setVegOnly(!vegOnly)} className={cn("flex h-12 w-full sm:w-auto items-center justify-center gap-1.5 rounded-md border-2 border-black px-4 text-xs font-black uppercase tracking-wider transition-all", vegOnly ? "bg-brand-red text-white shadow-fastfood-red" : "bg-surface hover:bg-surface-card text-muted hover:text-white shadow-xs")}><Leaf className="size-3.5 text-bolt"/><span>{isPt ? "Vegetariano" : "Vegetarian"}</span></button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-4 pb-8 sm:px-6 sm:pt-5 sm:pb-12">
        {selectedCategory !== "all" && !filtered && <div className="mb-6 flex items-center justify-between border-b-2 border-line pb-4"><button type="button" onClick={()=>handleSelect("all")} className="inline-flex items-center gap-1.5 rounded-md border-2 border-black bg-surface hover:bg-raised px-4 py-2 text-xs font-black uppercase tracking-wider text-brand-yellow shadow-fastfood"><ArrowLeft className="size-4"/>{isPt ? "Ver Todas as Categorias" : "View All Categories"}</button></div>}
        <div>
          {showCategoryOverview ? (
            <div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {visibleMenu.map((category) => {
                  const image = optimizedMenuImage(CATEGORY_IMAGES[category.id]);
                const FallbackIcon = CATEGORY_FALLBACK_ICONS[category.id as keyof typeof CATEGORY_FALLBACK_ICONS] ?? UtensilsCrossed;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleSelect(category.id)}
                      className="group relative min-h-28 overflow-hidden rounded-xl border-3 border-black bg-surface-card text-left shadow-fastfood"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt=""
                          aria-hidden="true"
                          width={640}
                          height={360}
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 flex items-center justify-end bg-gradient-to-br from-surface-card via-raised to-brand-black pr-8"
                        >
                          <FallbackIcon className="size-20 text-brand-yellow/55" strokeWidth={1.4} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20" />
                      <div className="relative z-10 flex min-h-28 items-center justify-between gap-3 p-4">
                        <div>
                          <h4 className="font-display text-2xl uppercase leading-none text-white">
                            {t(category.label)}
                          </h4>
                          <p className="mt-1 text-[11px] font-bold text-brand-yellow">
                            {category.items.length} {isPt ? "opções" : "options"}
                          </p>
                        </div>
                        <ArrowRight className="size-5 shrink-0 text-brand-yellow transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : displayedCategories.length ? (
            <div className="space-y-12">
              {displayedCategories.map((category) => {
                const items = category.items;
                const image = optimizedMenuImage(CATEGORY_IMAGES[category.id]);
                  const FallbackIcon = CATEGORY_FALLBACK_ICONS[category.id as keyof typeof CATEGORY_FALLBACK_ICONS] ?? UtensilsCrossed;
                return (
                  <div key={category.id} id={getCategoryAnchor(category.id)} className="rounded-xl border-4 border-black bg-surface-card p-5 sm:p-7 shadow-fastfood overflow-hidden [content-visibility:auto] [contain-intrinsic-size:700px]">
                    <div className="hidden sm:block checker-red-white sm:h-3 w-full border-b-2 border-black sm:-mt-7 sm:-mx-7 mb-6 sm:w-[calc(100%+3.5rem)]"/>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-3 border-black pb-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="size-14 rounded-lg border-2 border-black overflow-hidden bg-black/30 shadow-fastfood">
                          {image ? <img src={image} alt={isPt ? `${t(category.label)} — Best Kebab & Pizza em Campanhã, Porto` : `${t(category.label)} — Best Kebab & Pizza in Campanhã, Porto`} width={112} height={112} loading="lazy" decoding="async" fetchPriority="low" className="size-full object-cover"/> : <div aria-hidden="true" className="flex size-full items-center justify-center bg-raised"><FallbackIcon className="size-7 text-brand-yellow" strokeWidth={1.6}/></div>}
                        </div>
                        <div>
                          <div className="badge-stamp bg-brand-yellow text-black px-2 py-0.5 text-[10px] mb-1">★ CATEGORIA OFICIAL ★</div>
                          <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-wider text-white leading-none">{t(category.label)}</h3>
                          {category.intro&&<p className="text-xs text-brand-yellow font-bold mt-1">{t(category.intro)}</p>}
                        </div>
                      </div>
                      <span className="badge-stamp bg-surface px-3 py-1 text-xs text-muted border-black">{category.items.length} {isPt?"Opções Disponíveis":"Available Options"}</span>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item)=><FastFoodItemCard key={item.id} item={item}/>)}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto max-w-md py-16 text-center">
              <p className="font-display text-2xl uppercase text-white">{isPt?"Nenhum artigo encontrado":"No items found"}</p>
              <button type="button" onClick={()=>{clearSearch();setVegOnly(false);setSelectedCategory("all")}} className="mt-4 inline-flex items-center gap-1.5 rounded-md border-2 border-black bg-brand-red px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-fastfood"><X className="size-4"/>{isPt?"Limpar Filtros":"Clear Filters"}</button>
            </div>
          )}
        </div>

        <details className="mt-7 rounded-lg border-2 border-line bg-surface-card p-4 text-sm text-cream/85">
          <summary className="cursor-pointer font-black uppercase tracking-wider text-brand-yellow">
            {isPt ? "Informação sobre alergénios" : "Allergen information"}
          </summary>
          <p className="mt-3 max-w-4xl text-xs sm:text-sm leading-relaxed text-cream/75">
            {isPt
              ? "Indicamos apenas alergénios que são diretamente identificáveis nos ingredientes publicados. Receitas, molhos e fornecedores podem mudar. Se tem uma alergia ou intolerância, confirme sempre com o restaurante antes de encomendar."
              : "We only show allergens directly identifiable from the published ingredients. Recipes, sauces and suppliers can change. If you have an allergy or intolerance, always confirm with the restaurant before ordering."}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {ALLERGEN_IDS.map((id) => (
              <span key={id} className="rounded-full border border-line bg-brand-black px-2.5 py-1 text-[10px] font-bold text-cream/80">
                {t(ALLERGEN_LABELS[id])}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted">
            {isPt
              ? "A lista acima corresponde aos 14 grupos de alergénios de declaração obrigatória na UE. A informação específica de cada artigo deve ser confirmada quando não estiver identificada no cartão."
              : "The list above reflects the 14 allergen groups requiring declaration in the EU. Item-specific information should be confirmed whenever it is not identified on the product card."}
          </p>
        </details>
      </div>
    </section>
  );
}

function FastFoodItemCard({ item }: { item: MenuItem }) {
  const { lang, t } = useI18n();
  const { addItem } = useCartStore();
  const { isDishAvailable, getDishPrice, getDishSizePrice, getDishName, getDishDescription, getDishImage, settings } = useRestaurantData();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const isPt = lang === "pt";
  const isAvailable = isDishAvailable(item.id);
  const customImg = optimizedMenuImage(getDishImage(item.id, item.image));
  const dynamicName = getDishName(item.id, item.name);
  const dynamicDesc = getDishDescription(item.id, item.description);
  const hasSizes = Boolean(item.sizes?.length);
  const activeSize = hasSizes && item.sizes ? item.sizes[selectedSizeIndex] : null;
  const rawPrice = activeSize?.price ?? item.price ?? 0;
  const currentPrice = activeSize ? (getDishSizePrice(item.id, activeSize.id, rawPrice) ?? rawPrice) : (getDishPrice(item.id, rawPrice) ?? rawPrice);
  const handleAddToCart = () => { if (!isAvailable || settings.isOnlineOrderingPaused) return; addItem({id:item.id,name:dynamicName[lang],sizeName:activeSize?t(activeSize.label):undefined,price:currentPrice}); setAddedAnimation(true); setTimeout(()=>setAddedAnimation(false),1200); trackEvent("add_to_cart",{item:item.id,price:currentPrice}); };
  return <div id={`dish-${item.id}`} className={cn("scroll-mt-28 flex flex-col justify-between rounded-lg border-3 border-black bg-surface p-4 shadow-fastfood transition-all",isAvailable?"hover:border-brand-yellow hover:bg-raised":"opacity-75 border-brand-red/40 bg-surface/80")}><div>{customImg&&<div className="mb-3 h-36 w-full overflow-hidden rounded-md border-2 border-black bg-raised"><img src={customImg} alt={dynamicName[lang]} width={640} height={360} loading="lazy" decoding="async" fetchPriority="low" className="h-full w-full object-cover"/></div>}<div className="flex items-start justify-between gap-2"><h4 className="font-display text-xl uppercase tracking-wide text-white leading-tight">{dynamicName[lang]}</h4><div className="flex items-center gap-1 shrink-0">{!isAvailable?<span className="badge-stamp bg-brand-red text-white border-black px-1.5 py-0.5 text-[10px] font-black uppercase">{isPt?"Esgotado":"Sold Out"}</span>:item.vegetarian?<span className="badge-stamp bg-bolt text-black border-black px-1.5 py-0.5 text-[10px]"><Leaf className="size-2.5 mr-0.5"/>Veg</span>:null}</div></div>{dynamicDesc&&<p className="mt-1 text-xs text-cream/70 leading-relaxed font-medium">{dynamicDesc[lang]}</p>}{item.servedWith&&<p className="mt-1 text-[11px] font-black text-brand-yellow">+ {t(item.servedWith)}</p>}{item.knownAllergens?.length ? <p className="mt-2 text-[10px] leading-relaxed text-cream/60"><strong className="text-cream/80">{isPt?"Alergénios identificados":"Identified allergens"}:</strong> {item.knownAllergens.map((id)=>t(ALLERGEN_LABELS[id])).join(", ")}. {isPt?"Confirme outros alergénios e contaminação cruzada com o restaurante.":"Confirm other allergens and cross-contact with the restaurant."}</p> : <p className="mt-2 text-[10px] leading-relaxed text-cream/55">{isPt?"Alergénios: confirme com o restaurante antes de encomendar.":"Allergens: confirm with the restaurant before ordering."}</p>}{hasSizes&&item.sizes&&<div className="mt-3 flex gap-1.5">{item.sizes.map((size,idx)=>{const sizePrice=getDishSizePrice(item.id,size.id,size.price??0)??size.price??0;return <button key={size.id} type="button" onClick={()=>setSelectedSizeIndex(idx)} className={cn("flex-1 rounded border-2 py-1 text-[11px] font-black uppercase",selectedSizeIndex===idx?"border-black bg-brand-yellow text-black shadow-xs":"border-black/60 bg-surface-card text-muted hover:text-white")}>{t(size.label)}: {sizePrice>0?`${sizePrice.toFixed(2)} €`:""}</button>})}</div>}</div><div className="mt-4 pt-3 border-t-2 border-line flex items-center justify-between gap-2"><div className="badge-stamp bg-brand-red text-white px-2.5 py-1 text-xl leading-none">{currentPrice>0?`${currentPrice.toFixed(2)} €`:""}</div>{isAvailable?<button type="button" disabled={settings.isOnlineOrderingPaused} onClick={handleAddToCart} className={cn("flex items-center gap-1.5 rounded-md border-2 border-black px-3.5 py-1.5 text-xs font-black uppercase tracking-wider disabled:opacity-50",addedAnimation?"bg-bolt text-black":"bg-brand-yellow text-black shadow-fastfood-yellow")}>{addedAnimation?<><Check className="size-3.5"/>{isPt?"Adicionado!":"Added!"}</>:<><Plus className="size-3.5"/>{isPt?"Adicionar ao Pedido":"Add to Order"}</>}</button>:<span className="text-xs font-black uppercase text-brand-red">{isPt?"Indisponível hoje":"Unavailable today"}</span>}</div></div>;
}
