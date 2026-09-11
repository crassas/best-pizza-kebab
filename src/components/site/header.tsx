import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/site/logo";
import { useI18n } from "@/lib/i18n";
import { copy, restaurant } from "@/lib/restaurant";
import { scrollToElement } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function Header() {
  const { lang, setLang, t } = useI18n();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToElement(targetId, 70);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Official logo - linking only to top of page */}
        <a
          href="#topo"
          onClick={(e) => handleNav(e, "topo")}
          className="min-w-0 transition-opacity hover:opacity-85"
          aria-label={restaurant.name}
        >
          <Wordmark compact />
        </a>

        {/* Clean, editorial navigation */}
        <nav className="hidden items-center gap-6 md:flex" aria-label={t(copy.navSections)}>
          <a
            href="#menu"
            onClick={(e) => handleNav(e, "menu")}
            className="text-xs font-bold uppercase tracking-widest text-muted hover:text-cream transition-colors cursor-pointer"
          >
            {t(copy.navMenu)}
          </a>
          <a
            href="#encomenda"
            onClick={(e) => handleNav(e, "encomenda")}
            className="text-xs font-bold uppercase tracking-widest text-muted hover:text-cream transition-colors cursor-pointer"
          >
            {t({ pt: "Encomendar", en: "Order" })}
          </a>
          <a
            href="#avaliacoes"
            onClick={(e) => handleNav(e, "avaliacoes")}
            className="text-xs font-bold uppercase tracking-widest text-muted hover:text-cream transition-colors cursor-pointer"
          >
            {t(copy.navReviews)}
          </a>
          <a
            href="#local"
            onClick={(e) => handleNav(e, "local")}
            className="text-xs font-bold uppercase tracking-widest text-muted hover:text-cream transition-colors cursor-pointer"
          >
            {t(copy.navDirections)}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Switcher PT / EN - Crisp flat toggle */}
          <div
            className="relative flex rounded-xs border border-line bg-surface p-0.5"
            role="group"
            aria-label={t(copy.langSwitch)}
          >
            {(["pt", "en"] as const).map((code) => {
              const isActive = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  lang={code === "pt" ? "pt-PT" : "en"}
                  onClick={() => setLang(code)}
                  className={cn(
                    "relative z-10 h-7 min-w-8 rounded-xs px-2 text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer",
                    isActive ? "bg-cream text-ink" : "text-muted hover:text-cream",
                  )}
                  aria-pressed={isActive}
                >
                  {code === "pt" ? copy.langPt : copy.langEn}
                </button>
              );
            })}
          </div>

          {/* Discreet call button */}
          <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex h-8 px-3 text-xs rounded-xs border-line bg-surface hover:bg-raised">
            <a
              href={`tel:${restaurant.phoneTel}`}
              aria-label={`${t(copy.ctaCall)} ${restaurant.phoneDisplay}`}
            >
              <Phone className="size-3 text-orange" />
              <span>{t(copy.ctaCall)}</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
