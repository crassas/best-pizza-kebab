import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Leaf, Search, X, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { useOrder } from "@/lib/order-store";
import {
  copy,
  getCategoryAnchor,
  menu,
  SHOW_PRICES,
  type MenuCategory,
  type MenuItem,
  type MenuSize,
} from "@/lib/restaurant";
import { cn, formatEuro } from "@/lib/utils";

const visibleMenu = menu.filter((c) => c.items.length > 0);

export function MenuSection() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});
  const categoriesNavRef = useRef<HTMLDivElement | null>(null);
  const menuHeaderRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = useCallback((categoryId: string) => {
    setSearch("");
    setSelectedCategory(categoryId);

    // Scroll smoothly to top of category navigation bar
    if (categoriesNavRef.current) {
      const yOffset = -80;
      const element = categoriesNavRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  // Listen for custom category selection from featured cards or hash
  useEffect(() => {
    function scrollToCategory(catId: string) {
      if (!catId || catId === "all" || catId === "menu-categories") {
        handleSelect("all");
        return;
      }
      const clean = catId.startsWith("menu-") ? catId.slice(5) : catId;
      const matched = clean === "pizzas" ? "pizza" : clean;
      if (visibleMenu.some((c) => c.id === matched)) {
        handleSelect(matched);
      }
    }

    function handleCustomSelect(e: Event) {
      const customEvent = e as CustomEvent<string>;
      const catId = customEvent.detail;
      if (catId) {
        scrollToCategory(catId);
      }
    }

    function handleHash() {
      const rawHash = window.location.hash.replace("#", "");
      if (rawHash) {
        scrollToCategory(rawHash);
      }
    }

    window.addEventListener("select-menu-category", handleCustomSelect);
    window.addEventListener("hashchange", handleHash);

    if (window.location.hash) {
      const timer = setTimeout(handleHash, 100);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("select-menu-category", handleCustomSelect);
        window.removeEventListener("hashchange", handleHash);
      };
    }

    return () => {
      window.removeEventListener("select-menu-category", handleCustomSelect);
      window.removeEventListener("hashchange", handleHash);
    };
  }, [handleSelect]);

  // When selectedCategory changes, center its chip in the horizontal scroller
  useEffect(() => {
    chipRefs.current[selectedCategory]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedCategory]);

  const filteredMenu = useMemo(() => {
    const q = search.trim().toLowerCase();

    return visibleMenu
      .map((cat) => {
        const catLabelPt = cat.label.pt.toLowerCase();
        const catLabelEn = cat.label.en.toLowerCase();
        const catMatches = q ? catLabelPt.includes(q) || catLabelEn.includes(q) : false;

        const filteredItems = cat.items.filter((item) => {
          if (vegOnly && !item.vegetarian) return false;
          if (!q) return true;
          if (catMatches) return true;
          const namePt = item.name.pt.toLowerCase();
          const nameEn = item.name.en.toLowerCase();
          const descPt = item.description?.pt.toLowerCase() ?? "";
          const descEn = item.description?.en.toLowerCase() ?? "";
          return (
            namePt.includes(q) ||
            nameEn.includes(q) ||
            descPt.includes(q) ||
            descEn.includes(q)
          );
        });

        if (filteredItems.length === 0) return null;
        return { ...cat, items: filteredItems };
      })
      .filter((cat): cat is MenuCategory => Boolean(cat));
  }, [search, vegOnly]);

  // Display categories logic:
  // If searching or veg filtering: show all matching categories in full.
  // If specific category selected (and no search): show ONLY that category in full.
  // If "all" selected (and no search): show curated preview (3-4 items per category).
  const isSearchOrFilterActive = Boolean(search.trim() || vegOnly);

  const displayedCategories = useMemo(() => {
    if (isSearchOrFilterActive) {
      return filteredMenu;
    }
    if (selectedCategory !== "all") {
      return filteredMenu.filter((c) => c.id === selectedCategory);
    }
    return filteredMenu;
  }, [filteredMenu, selectedCategory, isSearchOrFilterActive]);

  return (
    <section id="menu" className="relative scroll-mt-[calc(4rem+env(safe-area-inset-top))] border-t border-line bg-cream text-ink">
      <div ref={menuHeaderRef} className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
        <p className="font-display text-xs sm:text-sm tracking-[0.22em] text-red uppercase">{t(copy.menuKicker)}</p>
        <h2 className="mt-1 font-display text-section text-ink">{t(copy.menuTitle)}</h2>
        <p className="mt-2.5 max-w-xl text-sm sm:text-base leading-relaxed text-ink/80">{t(copy.menuLead)}</p>

        {/* Filter and Search Bar */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink/45" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(copy.menuSearchPlaceholder)}
              className="h-10 w-full rounded-lg border border-line-cream bg-cream pl-10 pr-9 text-sm text-ink placeholder:text-ink/50 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange transition-colors"
              aria-label={t(copy.menuSearchPlaceholder)}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-ink/50 hover:text-ink transition-colors cursor-pointer"
                aria-label={t(copy.menuClearSearch)}
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setVegOnly(!vegOnly)}
              className={cn(
                "inline-flex h-10 items-center gap-1.5 rounded-lg border px-3.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer",
                vegOnly
                  ? "border-red bg-red text-cream shadow-sm"
                  : "border-line-cream bg-cream text-ink/80 hover:bg-cream-dim hover:text-ink",
              )}
              aria-pressed={vegOnly}
            >
              <Leaf className={cn("size-3.5", vegOnly ? "text-cream" : "text-orange")} aria-hidden="true" />
              {t(copy.menuFilterVeg)}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Categories Bar */}
      <div
        id="menu-categories"
        ref={categoriesNavRef}
        className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-30 mt-5 scroll-mt-[calc(4rem+env(safe-area-inset-top))] border-y border-line-cream bg-cream"
      >
        <nav aria-label={t(copy.menuJump)} className="mx-auto max-w-6xl">
          <div className="no-scrollbar flex gap-1 overflow-x-auto px-4 py-2 sm:px-6">
            {/* 'Todas' chip */}
            <button
              type="button"
              id="menu-chip-all"
              ref={(el) => {
                chipRefs.current["all"] = el;
              }}
              onClick={() => handleSelect("all")}
              className={cn(
                "h-9 shrink-0 rounded-xs px-3.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border",
                selectedCategory === "all" && !isSearchOrFilterActive
                  ? "bg-ink text-cream border-ink"
                  : "bg-cream-dim/50 text-ink/80 border-line-cream/70 hover:bg-cream-dim hover:text-ink",
              )}
              aria-pressed={selectedCategory === "all" && !isSearchOrFilterActive}
            >
              {t(copy.menuAll)}
            </button>

            {/* Category chips */}
            {visibleMenu.map((category) => {
              const isActive = selectedCategory === category.id && !isSearchOrFilterActive;
              return (
                <button
                  key={category.id}
                  id={`menu-chip-${category.id}`}
                  type="button"
                  ref={(el) => {
                    chipRefs.current[category.id] = el;
                  }}
                  onClick={() => handleSelect(category.id)}
                  className={cn(
                    "h-9 shrink-0 rounded-xs px-3 text-xs font-bold tracking-wide transition-colors cursor-pointer border",
                    isActive
                      ? "bg-ink text-cream border-ink"
                      : "bg-cream-dim/50 text-ink/80 border-line-cream/70 hover:bg-cream-dim hover:text-ink",
                  )}
                  aria-pressed={isActive}
                >
                  {t(category.label)}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Menu Cards Grid */}
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        {/* Single category view top navigation pill */}
        {selectedCategory !== "all" && !isSearchOrFilterActive && (
          <div className="mb-6 flex items-center justify-between border-b border-line-cream/80 pb-4">
            <button
              type="button"
              onClick={() => handleSelect("all")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line-cream bg-cream px-3 py-1.5 text-xs font-semibold text-ink hover:bg-cream-dim transition-colors cursor-pointer shadow-xs"
            >
              <ArrowLeft className="size-3.5 text-orange" />
              {t(copy.viewAllCategories)}
            </button>
            <span className="text-xs font-medium text-ink/60">
              {t(copy.showingCategory)}: <strong className="text-ink font-semibold">{t(visibleMenu.find((c) => c.id === selectedCategory)?.label ?? { pt: "", en: "" })}</strong>
            </span>
          </div>
        )}

        {/* Search header status */}
        {isSearchOrFilterActive && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-orange/30 bg-orange/5 px-4 py-3">
            <p className="text-xs sm:text-sm font-medium text-ink">
              {vegOnly ? t({ pt: "Opções vegetarianas disponíveis", en: "Vegetarian options available" }) : t({ pt: "Resultados da pesquisa", en: "Search results" })}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setVegOnly(false);
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-orange hover:text-orange-hot transition-colors cursor-pointer"
            >
              <X className="size-3.5" />
              {t(copy.menuClearSearch)}
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + (search ? `-search-${search}` : "") + (vegOnly ? "-veg" : "")}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {displayedCategories.length > 0 ? (
              <div className="grid gap-10 md:gap-x-12 md:gap-y-12 md:grid-cols-2">
                {displayedCategories.map((category) => {
                  const isCuratedPreview = selectedCategory === "all" && !isSearchOrFilterActive;
                  const displayItems = isCuratedPreview
                    ? category.items.slice(0, 4)
                    : category.items;

                  return (
                    <CategoryBlock
                      key={category.id}
                      category={category}
                      displayItems={displayItems}
                      isCuratedPreview={isCuratedPreview}
                      totalItemsCount={category.items.length}
                      onViewFullCategory={() => handleSelect(category.id)}
                      ref={(el) => {
                        categoryRefs.current[category.id] = el;
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="mx-auto max-w-md py-12 text-center">
                <p className="font-display text-xl text-ink">{t(copy.menuNoResults)}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setVegOnly(false);
                    setSelectedCategory("all");
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-ink/85 transition-colors cursor-pointer shadow-xs"
                >
                  <X className="size-4" />
                  {t(copy.menuClearSearch)}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

const CategoryBlock = forwardRef<
  HTMLElement,
  {
    category: MenuCategory;
    displayItems: MenuItem[];
    isCuratedPreview: boolean;
    totalItemsCount: number;
    onViewFullCategory: () => void;
  }
>(function CategoryBlock(
  { category, displayItems, isCuratedPreview, totalItemsCount, onViewFullCategory },
  ref,
) {
  const { t } = useI18n();
  const anchorId = getCategoryAnchor(category.id);

  return (
    <section
      ref={ref}
      id={anchorId}
      className="flex flex-col justify-between rounded-xs border border-line-cream/90 bg-[#f5efe5] p-4.5 sm:p-5.5"
    >
      <div>
        <div className="flex items-baseline justify-between gap-2 border-b-2 border-line-cream pb-3">
          <h3 className="font-display text-2xl tracking-wide text-ink">{t(category.label)}</h3>
          <span className="text-xs font-bold tracking-wider text-ink/60 uppercase">
            {totalItemsCount} {t(copy.itemsCount)}
          </span>
        </div>

        {category.intro ? (
          <p className="mt-2 text-xs sm:text-sm text-ink/80 font-medium leading-relaxed">{t(category.intro)}</p>
        ) : null}

        <div className="mt-2 divide-y divide-line-cream/60">
          {displayItems.map((item) => (
            <ItemRow key={item.id} item={item} categoryId={category.id} />
          ))}
        </div>
      </div>

      {isCuratedPreview && totalItemsCount > displayItems.length && (
        <div className="mt-4 border-t border-line-cream/80 pt-3">
          <button
            type="button"
            onClick={onViewFullCategory}
            className="group flex w-full items-center justify-between rounded-xs border border-line-cream/80 bg-cream-dim/60 px-3.5 py-2.5 text-xs font-bold text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer"
          >
            <span>
              {t({
                pt: `Ver ${t(category.label)} completo (${totalItemsCount} opções)`,
                en: `View full ${t(category.label)} (${totalItemsCount} options)`,
              })}
            </span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
});

function ItemRow({ item }: { item: MenuItem; categoryId: string }) {
  const { t } = useI18n();
  const { addItem } = useOrder();
  const [modalOpen, setModalOpen] = useState(false);
  const price = SHOW_PRICES && item.price != null ? formatEuro(item.price) : null;

  return (
    <>
      <article
        onClick={() => setModalOpen(true)}
        className="group flex items-center justify-between gap-3 py-3 transition-colors hover:bg-cream-dim/30 rounded-xs px-1.5 -mx-1.5 cursor-pointer"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <h4 className="font-sans text-sm sm:text-[0.95rem] font-bold leading-snug text-ink group-hover:text-orange transition-colors">
              {t(item.name)}
            </h4>
            {item.vegetarian ? (
              <span className="inline-flex items-center gap-1 rounded-xs bg-emerald-100/80 border border-emerald-800/30 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-900">
                <Leaf className="size-2.5" aria-hidden="true" />
                {t(copy.vegBadge)}
              </span>
            ) : null}
          </div>
          {item.description ? (
            <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-ink/75">{t(item.description)}</p>
          ) : null}
          {item.servedWith ? (
            <p className="mt-0.5 text-xs font-medium text-ink/70">
              {t(copy.servedWith)} {t(item.servedWith)}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
          {item.image ? (
            <div
              onClick={() => setModalOpen(true)}
              className="relative size-12 sm:size-14 shrink-0 overflow-hidden rounded-xs border border-line-cream bg-cream-dim cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src={item.image}
                alt={item.imageAlt ? t(item.imageAlt) : t(item.name)}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
          ) : null}

          {SHOW_PRICES && item.sizes && item.sizes.length > 0 ? (
            <div className="flex flex-col gap-1 items-end">
              {item.sizes.map((s) => (
                <div key={s.id} className="flex items-center gap-2">
                  <span className="text-xs font-medium text-ink/80">
                    {t(s.label)} {s.price != null ? `· ${formatEuro(s.price)}` : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => addItem(item, s)}
                    className="inline-flex items-center gap-1 rounded-xs bg-ink text-cream hover:bg-orange px-2 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    aria-label={`Add ${t(item.name)} (${t(s.label)})`}
                  >
                    <Plus className="size-3" />
                    <span>{t({ pt: "Adicionar", en: "Add" })}</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {price ? (
                <p className="font-bold tabular-nums text-ink text-sm sm:text-base">{price}</p>
              ) : null}
              <button
                type="button"
                onClick={() => addItem(item)}
                className="inline-flex items-center gap-1 rounded-xs bg-ink text-cream hover:bg-orange px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                aria-label={`Add ${t(item.name)}`}
              >
                <Plus className="size-3.5" />
                <span>{t({ pt: "Adicionar", en: "Add" })}</span>
              </button>
            </div>
          )}
        </div>
      </article>

      <ItemDetailModal item={modalOpen ? item : null} onClose={() => setModalOpen(false)} />
    </>
  );
}

function ItemDetailModal({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const { t } = useI18n();
  const { addItem, setIsDrawerOpen } = useOrder();
  const [selectedSize, setSelectedSize] = useState<MenuSize | undefined>(item?.sizes?.[0]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (item?.sizes?.[0]) {
      setSelectedSize(item.sizes[0]);
    }
    setQty(1);
  }, [item]);

  if (!item) return null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem(item, selectedSize);
    }
    setIsDrawerOpen(true);
    onClose();
  };

  const activePrice = selectedSize ? selectedSize.price : item.price;
  const priceFormatted = SHOW_PRICES && activePrice != null ? formatEuro(activePrice * qty) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-xs bg-surface border border-line shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-xs bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        {item.image ? (
          <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-bg border-b border-line">
            <img
              src={item.image}
              alt={item.imageAlt ? t(item.imageAlt) : t(item.name)}
              className="size-full object-cover"
            />
          </div>
        ) : null}

        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 id="modal-title" className="font-display text-2xl tracking-wide text-cream">
                {t(item.name)}
              </h3>
              {item.vegetarian ? (
                <span className="inline-flex items-center gap-1 rounded-xs bg-emerald-100/80 border border-emerald-800/30 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-900">
                  <Leaf className="size-3" aria-hidden="true" />
                  {t(copy.vegBadge)}
                </span>
              ) : null}
            </div>

            {item.description ? (
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(item.description)}</p>
            ) : null}

            {item.servedWith ? (
              <p className="mt-1.5 text-xs font-medium text-cream/80">
                {t(copy.servedWith)} {t(item.servedWith)}
              </p>
            ) : null}
          </div>

          {SHOW_PRICES && item.sizes && item.sizes.length > 0 ? (
            <div className="space-y-2 pt-2 border-t border-line">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                {t({ pt: "Escolher tamanho", en: "Choose size" })}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {item.sizes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xs border text-left transition-colors cursor-pointer",
                      selectedSize?.id === s.id
                        ? "border-orange bg-orange/10 text-cream font-bold"
                        : "border-line bg-surface text-muted hover:border-cream/40"
                    )}
                  >
                    <span>{t(s.label)}</span>
                    <span className="tabular-nums">{s.price != null ? formatEuro(s.price) : ""}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between pt-3 border-t border-line">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                {t({ pt: "Quantidade", en: "Quantity" })}
              </span>
              <div className="flex items-center rounded-xs border border-line bg-bg">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-1 text-cream hover:bg-raised transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold text-cream tabular-nums">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-1 text-cream hover:bg-raised transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {priceFormatted ? (
              <div className="text-right">
                <span className="text-xs text-muted block">{t({ pt: "Total", en: "Total" })}</span>
                <span className="font-display text-xl text-cream tabular-nums">{priceFormatted}</span>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 rounded-xs bg-orange hover:bg-orange/90 text-white px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
          >
            <Plus className="size-4" />
            <span>{t({ pt: "Adicionar ao pedido", en: "Add to order" })}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

