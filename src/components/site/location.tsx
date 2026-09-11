import { useEffect, useRef, useState } from "react";
import { Globe, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoursBlock } from "@/components/site/hours";
import { CesiumGlobe } from "@/components/site/cesium-globe";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { useI18n } from "@/lib/i18n";
import { copy, getWhatsAppUrl, maps, restaurant } from "@/lib/restaurant";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Location() {
  const { lang, t } = useI18n();
  const wa = getWhatsAppUrl(lang);
  const [hasEntered, setHasEntered] = useState(false);
  const [mapMode, setMapMode] = useState<"2d" | "cesium">("cesium");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const titleText = t(copy.locationTitle);
  const titleParts = titleText.split("São Roque da Lameira");

  return (
    <section 
      ref={sectionRef}
      id="local" 
      className="scroll-mt-[calc(4rem+env(safe-area-inset-top))] border-t border-line bg-bg px-4 py-10 sm:px-6 sm:py-14"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 lg:items-start">
          
          {/* Left Column: Address, Hours, Phone & Actions */}
          <div className="flex flex-col space-y-6 lg:col-span-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2.5">
                  <span 
                    className={cn(
                      "absolute inline-flex size-full rounded-full bg-orange opacity-75",
                      hasEntered && "animate-ping"
                    )} 
                    style={{ animationDuration: "1200ms", animationIterationCount: 1 }} 
                  />
                  <span className="relative inline-flex size-2.5 rounded-full bg-orange" />
                </span>
                <div className="border-l-2 border-orange pl-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
                  {t(copy.locationKicker)}
                </div>
              </div>

              <h2 
                className={cn(
                  "font-display text-2xl sm:text-3xl text-cream transition-all duration-600 ease-out",
                  hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
              >
                {titleParts[0]}
                <span className="relative inline-block text-orange font-bold">
                  São Roque da Lameira
                  <span 
                    className={cn(
                      "absolute left-0 -bottom-0.5 h-0.5 bg-orange transition-all duration-700 ease-out",
                      hasEntered ? "w-full" : "w-0"
                    )}
                    style={{ transitionDelay: "450ms" }}
                  />
                </span>
                {titleParts[1] || ""}
              </h2>
            </div>

            <p 
              className={cn(
                "text-xs sm:text-sm leading-relaxed text-muted transition-all duration-600 ease-out",
                hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              )}
              style={{ transitionDelay: "150ms" }}
            >
              {t(copy.locationLead)}
            </p>

            <div 
              className={cn(
                "space-y-6 transition-all duration-600 ease-out",
                hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              )}
              style={{ transitionDelay: "300ms" }}
            >
              {/* Address */}
              <address className="not-italic">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-faint">
                    {t(copy.addressLabel)}
                  </p>
                  <span className="inline-flex items-center rounded-xs border border-line bg-surface px-2 py-0.5 text-[11px] font-bold tracking-wide text-cream uppercase">
                    Halal
                  </span>
                </div>
                <p className="mt-1 text-base font-medium text-cream sm:text-lg">
                  {restaurant.address.street}
                  <br />
                  {restaurant.address.postalCode} {restaurant.address.locality}, Portugal
                </p>
              </address>

              {/* Opening Hours */}
              <div className="border-t border-line pt-5">
                <HoursBlock />
              </div>

              {/* Phone */}
              <div className="border-t border-line pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-faint">
                  {t(copy.phoneLabel)}
                </p>
                <a
                  href={`tel:${restaurant.phoneTel}`}
                  className="mt-1 inline-block font-display text-2xl tracking-wide text-orange transition-colors hover:text-orange-hot sm:text-3xl"
                >
                  {restaurant.phoneDisplay}
                </a>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  {t(copy.contactLead)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-line pt-5">
                <div 
                  className={cn(
                    "flex flex-wrap items-center gap-2.5 transition-all duration-600 ease-out",
                    hasEntered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-[0.99]"
                  )}
                  style={{ transitionDelay: "450ms" }}
                >
                  <Button asChild variant="primary" size="sm" className="h-10 px-4 rounded-xs text-xs font-bold uppercase tracking-wider">
                    <a 
                      href={maps.directions} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("directions_click", { from: "location_section" })}
                    >
                      <MapPin className="size-4" />
                      <span>{t(copy.ctaDirections)}</span>
                    </a>
                  </Button>
                  
                  <Button asChild variant="whatsapp" size="sm" className="h-10 px-4 rounded-xs text-xs font-bold uppercase tracking-wider">
                    <a 
                      href={wa} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("whatsapp_click", { from: "location_section" })}
                    >
                      <WhatsAppIcon size="sm" />
                      <span>WhatsApp</span>
                    </a>
                  </Button>

                  <Button asChild variant="secondary" size="sm" className="h-10 px-4 rounded-xs text-xs font-bold uppercase tracking-wider border-line">
                    <a
                      href={`tel:${restaurant.phoneTel}`}
                      onClick={() => trackEvent("phone_click", { from: "location_section" })}
                      aria-label={`${t(copy.ctaCall)} ${restaurant.phoneDisplay}`}
                    >
                      <Phone className="size-3.5 text-orange" />
                      <span>{t(copy.ctaCall)}</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Map Embed or Cesium Globe */}
          <div className="flex flex-col lg:col-span-7">
            {mapMode === "cesium" ? (
              <CesiumGlobe />
            ) : (
              <div className="flex flex-1 flex-col overflow-hidden rounded-xs border border-line bg-surface min-h-[360px] lg:min-h-[460px]">
                {/* Map Header */}
                <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="size-4 shrink-0 text-orange" />
                    <p className="truncate text-xs font-bold text-cream sm:text-sm">
                      {restaurant.address.street}, {restaurant.address.locality}
                    </p>
                  </div>
                  <a
                    href={maps.search}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs font-bold uppercase tracking-wider text-orange hover:text-orange-hot transition-colors"
                  >
                    {t(copy.openMaps)}
                  </a>
                </div>

                {/* Map Embed */}
                <div className="relative flex-1 w-full bg-bg">
                  <iframe
                    title={t(copy.mapTitle)}
                    src={maps.osmEmbed}
                    width="800"
                    height="600"
                    className="absolute inset-0 size-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}

            {/* Map Mode Switcher */}
            <div className="mt-3 flex items-center justify-end gap-2">
              <span className="text-xs text-muted">Visualização de Mapa:</span>
              <div className="inline-flex rounded-xs border border-line bg-surface p-0.5">
                <button
                  type="button"
                  onClick={() => setMapMode("cesium")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-xs px-3 py-1 text-xs font-semibold transition-colors cursor-pointer",
                    mapMode === "cesium" ? "bg-orange text-cream" : "text-muted hover:text-cream"
                  )}
                >
                  <Globe className="size-3.5" />
                  <span>Globo 3D (Cesium)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapMode("2d")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-xs px-3 py-1 text-xs font-semibold transition-colors cursor-pointer",
                    mapMode === "2d" ? "bg-orange text-cream" : "text-muted hover:text-cream"
                  )}
                >
                  <MapPin className="size-3.5" />
                  <span>Mapa 2D</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
