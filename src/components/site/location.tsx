import { ExternalLink, MapPin, Navigation, ShieldCheck } from "lucide-react";
import { HoursBlock } from "@/components/site/hours";
import { CheckeredRibbon } from "@/components/site/marquee-banner";
import { useI18n } from "@/lib/i18n";
import { maps, restaurant } from "@/lib/restaurant";
import { useRestaurantData } from "@/lib/restaurant-context";
import { trackEvent } from "@/lib/analytics";

export function Location() {
  const { lang } = useI18n();
  const { settings } = useRestaurantData();
  const isPt = lang === "pt";
  const links = settings.deliveryLinks;
  const address =
    links.address ||
    `${restaurant.address.street}, ${restaurant.address.postalCode} ${restaurant.address.locality}`;
  const mapUrl = links.googleMaps || maps.directions;

  return (
    <section
      id="local"
      className="scroll-mt-[calc(4rem+env(safe-area-inset-top))] overflow-hidden border-y-4 border-black bg-brand-black text-cream [content-visibility:auto] [contain-intrinsic-size:520px]"
    >
      <CheckeredRibbon height="h-1.5 sm:h-3" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="relative overflow-hidden rounded-xl border-4 border-black bg-brand-red p-5 shadow-fastfood sm:p-7">
            <div className="absolute -right-4 -top-10 font-display text-[9rem] leading-none text-black/10 select-none">
              01
            </div>

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge-stamp bg-brand-yellow px-3 py-1 text-[11px] text-black">
                  <MapPin className="mr-1 size-3.5" />
                  {isPt ? "DEPOIS DO PEDIDO" : "AFTER YOUR ORDER"}
                </span>
                <span className="rounded-full border-2 border-black bg-black/25 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                  Campanhã · Porto
                </span>
              </div>

              <h2 className="mt-4 font-display text-4xl uppercase leading-[0.92] tracking-tight text-white sm:text-5xl">
                {isPt ? "Agora vê o caminho." : "Now check the route."}
              </h2>

              <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/80 sm:text-base">
                {isPt
                  ? "Já escolheste o pedido? Confirma agora a distância e o melhor caminho até ao Best Kebab & Pizza."
                  : "Finished choosing your order? Check the distance and the best route to Best Kebab & Pizza."}
              </p>

              <div className="mt-5 rounded-lg border-2 border-black bg-black/20 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-yellow">
                  {isPt ? "MORADA" : "ADDRESS"}
                </p>
                <p className="mt-1 font-display text-2xl uppercase tracking-wide text-white">
                  {address}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
                  <ShieldCheck className="size-3.5 text-brand-red" />
                  {isPt ? "Opções Halal" : "Halal Options"}
                </div>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("directions_click", { from: "post_order_single_cta" })}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border-3 border-black bg-white px-5 py-3 text-sm font-black uppercase tracking-wider text-black shadow-fastfood transition-transform active:translate-x-0.5 active:translate-y-0.5 sm:w-auto"
              >
                <Navigation className="size-4 text-brand-red" />
                {isPt ? "Ver caminho no Google Maps" : "Open route in Google Maps"}
                <ExternalLink className="size-4" />
              </a>
            </div>
          </article>

          <article className="rounded-xl border-4 border-black bg-surface-card p-5 shadow-fastfood sm:p-6">
            <HoursBlock />
          </article>
        </div>
      </div>
    </section>
  );
}
