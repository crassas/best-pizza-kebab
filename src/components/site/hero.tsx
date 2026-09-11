import { MapPin, Phone, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoursCompact } from "@/components/site/hours";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { useI18n } from "@/lib/i18n";
import { copy, getWhatsAppUrl, restaurant } from "@/lib/restaurant";
import { scrollToElement } from "@/lib/scroll";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const { lang, t } = useI18n();
  const wa = getWhatsAppUrl(lang);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, eventName: "menu_view" | "directions_click") => {
    e.preventDefault();
    trackEvent(eventName, { from: "hero" });
    scrollToElement(targetId, 70);
  };

  return (
    <section id="topo" className="relative border-b border-line bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:py-14">
        <div className="grid gap-8 md:grid-cols-12 md:items-center lg:gap-12">
          
          {/* Text Content */}
          <div className="flex flex-col items-start md:col-span-7">
            <div className="inline-flex items-center gap-2 border-l-2 border-orange pl-2.5 text-xs font-bold uppercase tracking-[0.2em] text-orange">
              <MapPin className="size-3.5" aria-hidden="true" />
              <span>{t(copy.heroKicker)}</span>
            </div>

            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.92] text-cream">
              {t(copy.heroHeadline)}
            </h1>

            <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {t({
                pt: "Takeaway em São Roque da Lameira com kebab, pizza, hambúrgueres, frango, falafel e pratos combinados.",
                en: "Takeaway in São Roque da Lameira with kebab, pizza, burgers, chicken, falafel and mixed plates.",
              })}
            </p>

            {/* Horário & Estado Aberto/Fechado - Solid editorial block */}
            <div className="mt-5 rounded-xs border border-line bg-surface p-3.5 sm:p-4 w-full max-w-lg">
              <HoursCompact />
            </div>

            {/* Primary CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="md" className="h-11 px-6 rounded-xs bg-orange hover:bg-orange-hot font-bold text-white transition-colors cursor-pointer">
                <a href="#menu" onClick={(e) => handleScroll(e, "menu", "menu_view")}>
                  <UtensilsCrossed className="size-4 mr-2" />
                  <span>{t(copy.ctaMenu)}</span>
                </a>
              </Button>
            </div>

            {/* Quick Actions Bar */}
            <div className="mt-4 flex w-full max-w-lg flex-wrap items-center gap-2 border-t border-line/50 pt-4">
              <Button asChild variant="secondary" size="sm" className="h-9 px-3 text-xs text-cream rounded-xs border border-line bg-surface hover:bg-raised transition-colors cursor-pointer">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { from: "hero_quick" })}
                >
                  <WhatsAppIcon size="xs" className="text-whatsapp" />
                  <span>WhatsApp</span>
                </a>
              </Button>

              <Button asChild variant="secondary" size="sm" className="h-9 px-3 text-xs text-cream rounded-xs border border-line bg-surface hover:bg-raised transition-colors cursor-pointer">
                <a
                  href={`tel:${restaurant.phoneTel}`}
                  onClick={() => trackEvent("phone_click", { from: "hero_quick" })}
                  aria-label={`${t(copy.ctaCall)} ${restaurant.phoneDisplay}`}
                >
                  <Phone className="size-3.5 text-orange" />
                  <span>{restaurant.phoneDisplay}</span>
                </a>
              </Button>

              <Button asChild variant="secondary" size="sm" className="h-9 px-3 text-xs text-cream rounded-xs border border-line bg-surface hover:bg-raised transition-colors cursor-pointer">
                <a
                  href="#local"
                  onClick={(e) => handleScroll(e, "local", "directions_click")}
                >
                  <MapPin className="size-3.5 text-orange" />
                  <span>{t(copy.ctaDirections)}</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Authentic Food Photo - Clean editorial frame */}
          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-xs border border-line bg-surface">
              <img
                src={restaurant.photos.interiorRefeicao}
                alt={t({
                  pt: "Refeição no interior do Best Kebab & Pizza em São Roque da Lameira, Porto",
                  en: "Meal inside Best Kebab & Pizza in São Roque da Lameira, Porto",
                })}
                width={800}
                height={600}
                className="aspect-[4/5] w-full object-cover sm:aspect-[4/3] md:aspect-[4/5]"
                loading="eager"
                fetchPriority="high"
              />
              <div className="border-t border-line bg-bg px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange">
                  {t({ pt: "Na tua zona · Campanhã", en: "In your neighbourhood · Campanhã" })}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-cream">
                  {t({ pt: "Mais perto do que pensas.", en: "Closer than you think." })}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
