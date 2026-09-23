import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Leaf, Plus, Search, X, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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

const CATEGORY_IMAGES: Record<string, string> = {
  kebabs: "/images/enhanced/06_kebab_batatas.png",
  burgers: "/food/burger.jpg",
  chicken: "/food/chicken.jpg",
  pizza: "/images/enhanced/05_pizza.png",
  pizzas: "/images/enhanced/05_pizza.png",
  plates: "/images/enhanced/07_kebab_prato_agua.png",
  pasta: "/food/pizza.jpg",
  indian: "/food/hero.jpg",
  drinks: "/food/hero.jpg",
};

const visibleMenu = menu.filter((c) => c.items.length > 0);

export function MenuSection() {
  const { lang, t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const isPt = lang === "pt";
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const categoriesNavRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = useCallback((categoryId: string) => {
    setSearch("");
    setSelectedCategory(categoryId);
    if (categoriesNavRef.current) {
      const y = categoriesNavRef.current.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const scrollToCategory = (catId: string) => {
      if (!catId || catId === "all" || catId === "menu-categories") return handleSelect("all");
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

  useEffect(() => { chipRefs.current[selectedCategory]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); }, [selectedCategory]);

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
  const displayedCategories = filtered ? filteredMenu : selectedCategory === "all" ? filteredMenu : filteredMenu.filter((c) => c.id === selectedCategory);

  return (
    <section id="menu" className="relative scroll-mt-[calc(4rem+env(safe-area-inset-top))] border-t-4 border-black bg-brand-black text-cream">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="flex flex-col items-start md:flex-row md:items-end md:justify-between gap-4">
          <div><div className="inline-block rounded-xs bg-brand-red px-2.5 py-1 text-xs font-black uppercase tracking-widest text-white mb-2 shadow-xs">★ {isPt ? "CARDÁPIO OFICIAL" : "OFFICIAL MENU"} ★</div><h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">{isPt ? "Kebab no Porto, pizza em Campanhã" : "Kebab in Porto, pizza in Campanhã"}</h2><p className="mt-2 text-sm sm:text-base text-muted max-w-2xl">{isPt ? "Na Rua de São Roque da Lameira encontra doner kebab, durum, pizzas, falafel, hambúrgueres, pratos e snacks para takeaway. Escolha os seus itens e monte o pedido no site." : "On Rua de São Roque da Lameira you can find doner kebab, durum, pizza, falafel, burgers, plates and snacks for takeaway. Choose your items and build your order on the site."}</p></div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto"><div className="relative w-full sm:w-72"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted"/><input type="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={isPt ? "Pesquisar kebab, pizza..." : "Search kebab, pizza..."} className="h-10 w-full rounded-md border-2 border-black bg-surface pl-9 pr-8 text-xs font-bold text-white placeholder:text-muted focus:border-brand-yellow focus:outline-none"/>{search && <button type="button" onClick={()=>setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-white"><X className="size-3.5"/></button>}</div><button type="button" onClick={()=>setVegOnly(!vegOnly)} className={cn("flex h-10 w-full sm:w-auto items-center justify-center gap-1.5 rounded-md border-2 border-black px-4 text-xs font-black uppercase tracking-wider transition-all", vegOnly ? "bg-brand-red text-white shadow-fastfood-red" : "bg-surface hover:bg-surface-card text-muted hover:text-white shadow-xs")}><Leaf className="size-3.5 text-bolt"/><span>{isPt ? "Vegetariano" : "Vegetarian"}</span></button></div>
        </div>
        <details className="mt-6 rounded-lg border-2 border-line bg-surface-card p-4 text-sm text-cream/85">
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
      <div id="menu-categories" ref={categoriesNavRef} className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-30 mt-8 border-y-2 border-black bg-surface/95 backdrop-blur-md"><div className="mx-auto max-w-7xl"><div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2.5 sm:px-6"><button type="button" ref={(el)=>{chipRefs.current.all=el}} onClick={()=>handleSelect("all")} className={cn("relative z-10 h-10 shrink-0 rounded-md border-2 border-black px-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-xs", selectedCategory === "all" && !filtered ? "bg-brand-red text-white shadow-fastfood-red" : "bg-surface text-muted hover:text-white hover:bg-raised")}>{isPt ? "★ TODAS AS CATEGORIAS" : "★ ALL CATEGORIES"}</button>{visibleMenu.map((category)=><button key={category.id} type="button" ref={(el)=>{chipRefs.current[category.id]=el}} onClick={()=>handleSelect(category.id)} className={cn("relative z-10 h-10 shrink-0 rounded-md border-2 border-black px-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-xs", selectedCategory===category.id && !filtered ? "bg-brand-yellow text-black shadow-fastfood-yellow" : "bg-surface text-muted hover:text-white hover:bg-raised")}>{t(category.label)}</button>)}</div></div></div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        {selectedCategory !== "all" && !filtered && <div className="mb-6 flex items-center justify-between border-b-2 border-line pb-4"><button type="button" onClick={()=>handleSelect("all")} className="inline-flex items-center gap-1.5 rounded-md border-2 border-black bg-surface hover:bg-raised px-4 py-2 text-xs font-black uppercase tracking-wider text-brand-yellow shadow-fastfood"><ArrowLeft className="size-4"/>{isPt ? "Ver Todas as Categorias" : "View All Categories"}</button></div>}
        <AnimatePresence mode="wait"><motion.div key={selectedCategory+search+(vegOnly?"-veg":"")} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.2}}>
          {displayedCategories.length ? <div className="space-y-12">{displayedCategories.map((category)=>{const preview=selectedCategory==="all"&&!filtered; const items=preview?category.items.slice(0,6):category.items; const image=CATEGORY_IMAGES[category.id]||"/food/hero.jpg"; return <div key={category.id} id={getCategoryAnchor(category.id)} className="rounded-xl border-4 border-black bg-surface-card p-5 sm:p-7 shadow-fastfood overflow-hidden"><div className="hidden sm:block checker-red-white sm:h-3 w-full border-b-2 border-black sm:-mt-7 sm:-mx-7 mb-6 sm:w-[calc(100%+3.5rem)]"/><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-3 border-black pb-4 mb-6"><div className="flex items-center gap-3"><div className="size-14 rounded-lg border-2 border-black overflow-hidden shadow-fastfood"><img src={image} alt={isPt ? `${t(category.label)} — Best Kebab & Pizza em Campanhã, Porto` : `${t(category.label)} — Best Kebab & Pizza in Campanhã, Porto`} className="size-full object-cover"/></div><div><div className="badge-stamp bg-brand-yellow text-black px-2 py-0.5 text-[10px] mb-1">★ CATEGORIA OFICIAL ★</div><h3 className="font-display text-2xl sm:text-4xl uppercase tracking-wider text-white leading-none">{t(category.label)}</h3>{category.intro&&<p className="text-xs text-brand-yellow font-bold mt-1">{t(category.intro)}</p>}</div></div><span className="badge-stamp bg-surface px-3 py-1 text-xs text-muted border-black">{category.items.length} {isPt?"Opções Disponíveis":"Available Options"}</span></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item)=><FastFoodItemCard key={item.id} item={item}/>)}</div>{preview&&category.items.length>items.length&&<div className="mt-6 border-t-2 border-line pt-4 text-center"><button type="button" onClick={()=>handleSelect(category.id)} className="inline-flex items-center gap-2 rounded-md border-2 border-black bg-brand-yellow px-6 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-fastfood-yellow">{isPt?`Ver Todos os ${category.items.length} ${t(category.label)}`:`View All ${category.items.length} ${t(category.label)}`}<ArrowRight className="size-4"/></button></div>}</div>})}</div> : <div className="mx-auto max-w-md py-16 text-center"><p className="font-display text-2xl uppercase text-white">{isPt?"Nenhum artigo encontrado":"No items found"}</p><button type="button" onClick={()=>{setSearch("");setVegOnly(false);setSelectedCategory("all")}} className="mt-4 inline-flex items-center gap-1.5 rounded-md border-2 border-black bg-brand-red px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-fastfood"><X className="size-4"/>{isPt?"Limpar Filtros":"Clear Filters"}</button></div>}
        </motion.div></AnimatePresence>
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
  const customImg = getDishImage(item.id);
  const dynamicName = getDishName(item.id, item.name);
  const dynamicDesc = getDishDescription(item.id, item.description);
  const hasSizes = Boolean(item.sizes?.length);
  const activeSize = hasSizes && item.sizes ? item.sizes[selectedSizeIndex] : null;
  const rawPrice = activeSize?.price ?? item.price ?? 0;
  const currentPrice = activeSize ? (getDishSizePrice(item.id, activeSize.id, rawPrice) ?? rawPrice) : (getDishPrice(item.id, rawPrice) ?? rawPrice);
  const handleAddToCart = () => { if (!isAvailable || settings.isOnlineOrderingPaused) return; addItem({id:item.id,name:dynamicName[lang],sizeName:activeSize?t(activeSize.label):undefined,price:currentPrice}); setAddedAnimation(true); setTimeout(()=>setAddedAnimation(false),1200); trackEvent("add_to_cart",{item:item.id,price:currentPrice}); };
  return <div className={cn("flex flex-col justify-between rounded-lg border-3 border-black bg-surface p-4 shadow-fastfood transition-all",isAvailable?"hover:border-brand-yellow hover:bg-raised":"opacity-75 border-brand-red/40 bg-surface/80")}><div>{customImg&&<div className="mb-3 h-36 w-full overflow-hidden rounded-md border-2 border-black"><img src={customImg} alt={dynamicName[lang]} className="h-full w-full object-cover"/></div>}<div className="flex items-start justify-between gap-2"><h4 className="font-display text-xl uppercase tracking-wide text-white leading-tight">{dynamicName[lang]}</h4><div className="flex items-center gap-1 shrink-0">{!isAvailable?<span className="badge-stamp bg-brand-red text-white border-black px-1.5 py-0.5 text-[10px] font-black uppercase">{isPt?"Esgotado":"Sold Out"}</span>:item.vegetarian?<span className="badge-stamp bg-bolt text-black border-black px-1.5 py-0.5 text-[10px]"><Leaf className="size-2.5 mr-0.5"/>Veg</span>:null}</div></div>{dynamicDesc&&<p className="mt-1 text-xs text-cream/70 leading-relaxed font-medium">{dynamicDesc[lang]}</p>}{item.servedWith&&<p className="mt-1 text-[11px] font-black text-brand-yellow">+ {t(item.servedWith)}</p>}{item.knownAllergens?.length ? <p className="mt-2 text-[10px] leading-relaxed text-cream/60"><strong className="text-cream/80">{isPt?"Alergénios identificados":"Identified allergens"}:</strong> {item.knownAllergens.map((id)=>t(ALLERGEN_LABELS[id])).join(", ")}. {isPt?"Confirme outros alergénios e contaminação cruzada com o restaurante.":"Confirm other allergens and cross-contact with the restaurant."}</p> : <p className="mt-2 text-[10px] leading-relaxed text-cream/55">{isPt?"Alergénios: confirme com o restaurante antes de encomendar.":"Allergens: confirm with the restaurant before ordering."}</p>}{hasSizes&&item.sizes&&<div className="mt-3 flex gap-1.5">{item.sizes.map((size,idx)=>{const sizePrice=getDishSizePrice(item.id,size.id,size.price??0)??size.price??0;return <button key={size.id} type="button" onClick={()=>setSelectedSizeIndex(idx)} className={cn("flex-1 rounded border-2 py-1 text-[11px] font-black uppercase",selectedSizeIndex===idx?"border-black bg-brand-yellow text-black shadow-xs":"border-black/60 bg-surface-card text-muted hover:text-white")}>{t(size.label)}: {sizePrice>0?`${sizePrice.toFixed(2)} €`:""}</button>})}</div>}</div><div className="mt-4 pt-3 border-t-2 border-line flex items-center justify-between gap-2"><div className="badge-stamp bg-brand-red text-white px-2.5 py-1 text-xl leading-none">{currentPrice>0?`${currentPrice.toFixed(2)} €`:""}</div>{isAvailable?<button type="button" disabled={settings.isOnlineOrderingPaused} onClick={handleAddToCart} className={cn("flex items-center gap-1.5 rounded-md border-2 border-black px-3.5 py-1.5 text-xs font-black uppercase tracking-wider disabled:opacity-50",addedAnimation?"bg-bolt text-black":"bg-brand-yellow text-black shadow-fastfood-yellow")}>{addedAnimation?<><Check className="size-3.5"/>{isPt?"Adicionado!":"Added!"}</>:<><Plus className="size-3.5"/>{isPt?"Adicionar ao Pedido":"Add to Order"}</>}</button>:<span className="text-xs font-black uppercase text-brand-red">{isPt?"Indisponível hoje":"Unavailable today"}</span>}</div></div>;
}
