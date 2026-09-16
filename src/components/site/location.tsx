import { useState } from "react";
import {
  ExternalLink,
  Globe2,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { HoursBlock } from "@/components/site/hours";
import { CesiumGlobe } from "@/components/site/cesium-globe";
import { CheckeredRibbon } from "@/components/site/marquee-banner";
import { useI18n } from "@/lib/i18n";
import { maps, restaurant } from "@/lib/restaurant";
import { useRestaurantData } from "@/lib/restaurant-context";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Location() {
  const { lang } = useI18n();
  const { settings } = useRestaurantData();
  const [mapMode, setMapMode] = useState<"2d" | "cesium">("cesium");
  const isPt = lang === "pt";
  const links = settings.deliveryLinks;
  const address =
    links.address ||
    `${restaurant.address.street}, ${restaurant.address.postalCode} ${restaurant.address.locality}`;
  const phoneDisplay = links.phoneDisplay || restaurant.phoneDisplay;
  const phoneTel = links.phoneTel || restaurant.phoneTel;
  const mapUrl = links.googleMaps || maps.directions;

  return (
    <section
      id="local"
      className="scroll-mt-[calc(4rem+env(safe-area-inset-top))] overflow-hidden border-y-4 border-black bg-brand-black text-cream"
    >
      <CheckeredRibbon height="h-1.5 sm:h-3" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="mb-8 sm:mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="badge-stamp -rotate-1 bg-brand-yellow px-3 py-1 text-[11px] sm:text-xs text-black">
              <MapPin className="mr-1 size-3.5" />
              {isPt ? "SÃO ROQUE DA LAMEIRA · CAMPANHÃ" : "SÃO ROQUE DA LAMEIRA · CAMPANHÃ"}
            </div>
            <h2 className="mt-3 font-display text-4xl sm:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight text-white">
              {isPt ? (
                <>
                  Mesmo aqui no
                  <br />
                  <span className="text-brand-red">Porto.</span>
                </>
              ) : (
                <>
                  Right here in
                  <br />
                  <span className="text-brand-red">Porto.</span>
                </>
              )}
            </h2>
          </div>

          <p className="max-w-xl text-sm sm:text-base font-medium leading-relaxed text-cream/70">
            {isPt
              ? "Best Kebab & Pizza fica em São Roque da Lameira, Campanhã. Consulta o horário, abre a localização e segue diretamente para o restaurante."
              : "Best Kebab & Pizza is in São Roque da Lameira, Campanhã. Check the opening hours, open the location and head straight to the restaurant."}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <article className="relative overflow-hidden rounded-xl border-4 border-black bg-brand-red p-5 sm:p-6 shadow-fastfood">
              <div className="absolute -right-4 -top-10 font-display text-[9rem] leading-none text-black/10 select-none">
                01
              </div>
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <span className="badge-stamp bg-white px-3 py-1 text-[11px] text-brand-red">
                    {isPt ? "MORADA" : "ADDRESS"}
                  </span>
                  <ShieldCheck className="size-6 text-brand-yellow" />
                </div>

                <p className="mt-5 font-display text-3xl sm:text-4xl uppercase leading-tight text-white">
                  Rua de São Roque da Lameira 2346
                </p>
                <p className="mt-1 text-base font-bold text-white/80">4350-306 Porto, Portugal</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border-2 border-black bg-brand-yellow px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
                    {isPt ? "Opções Halal" : "Halal Options"}
                  </span>
                  <span className="rounded-full border-2 border-black bg-black/25 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                    Campanhã · Porto
                  </span>
                </div>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("directions_click", { from: "location_section" })}
                  className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-md border-3 border-black bg-white px-5 py-3 text-sm font-black uppercase tracking-wider text-black shadow-fastfood transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <Navigation className="size-4 text-brand-red" />
                  {isPt ? "Abrir direções" : "Open directions"}
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </article>

            <article className="rounded-xl border-4 border-black bg-surface-card p-5 sm:p-6 shadow-fastfood">
              <HoursBlock />
            </article>

            <article className="rounded-xl border-4 border-black bg-surface-card p-5 sm:p-6 shadow-fastfood">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-yellow">
                    {isPt ? "CONTACTO" : "CONTACT"}
                  </p>
                  <a
                    href={`tel:${phoneTel}`}
                    onClick={() => trackEvent("phone_click", { from: "location_section" })}
                    className="mt-1 block font-display text-3xl sm:text-4xl tracking-wide text-white transition-colors hover:text-brand-yellow"
                  >
                    {phoneDisplay}
                  </a>
                </div>
                <a
                  href={`tel:${phoneTel}`}
                  onClick={() => trackEvent("phone_click", { from: "location_section_icon" })}
                  className="flex size-12 shrink-0 items-center justify-center rounded-md border-3 border-black bg-brand-yellow text-black shadow-fastfood"
                  aria-label={isPt ? "Ligar para o restaurante" : "Call the restaurant"}
                >
                  <Phone className="size-5" />
                </a>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">
                {isPt
                  ? "Para informações sobre o restaurante, horários ou apoio ao pedido."
                  : "For restaurant information, opening hours or order support."}
              </p>
            </article>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl border-4 border-black bg-surface-card shadow-fastfood">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black bg-brand-yellow px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="font-display text-xl uppercase tracking-wider text-black">
                    {isPt ? "Encontra-nos no mapa" : "Find us on the map"}
                  </p>
                  <p className="truncate text-xs font-bold text-black/65">{address}</p>
                </div>

                <div className="inline-flex rounded-md border-2 border-black bg-black p-1">
                  <button
                    type="button"
                    onClick={() => setMapMode("cesium")}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors",
                      mapMode === "cesium"
                        ? "bg-brand-red text-white"
                        : "text-white/65 hover:text-white",
                    )}
                  >
                    <Globe2 className="size-3.5" />
                    3D
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapMode("2d")}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors",
                      mapMode === "2d"
                        ? "bg-brand-red text-white"
                        : "text-white/65 hover:text-white",
                    )}
                  >
                    <MapPin className="size-3.5" />
                    2D
                  </button>
                </div>
              </div>

              <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[640px] bg-black">
                {mapMode === "cesium" ? (
                  <CesiumGlobe />
                ) : (
                  <iframe
                    title={isPt ? "Mapa do Best Kebab & Pizza" : "Best Kebab & Pizza map"}
                    src={maps.osmEmbed}
                    width="800"
                    height="650"
                    className="absolute inset-0 size-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </div>

              <div className="grid gap-2 border-t-3 border-black bg-surface-card p-3 sm:grid-cols-2 sm:p-4">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("directions_click", { from: "location_map_footer" })}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-md border-2 border-black bg-brand-red px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-fastfood"
                >
                  <Navigation className="size-4 text-brand-yellow" />
                  {isPt ? "Como chegar" : "Directions"}
                </a>
                <a
                  href={`tel:${phoneTel}`}
                  onClick={() => trackEvent("phone_click", { from: "location_map_footer" })}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-md border-2 border-black bg-white px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-fastfood"
                >
                  <Phone className="size-4 text-brand-red" />
                  {isPt ? "Ligar / Apoio" : "Call / Support"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CheckeredRibbon height="h-1.5 sm:h-3" />
    </section>
  );
}
