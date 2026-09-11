import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BoltFoodIcon } from "@/components/site/bolt-food-icon";
import { UberIcon } from "@/components/site/uber-icon";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { useI18n } from "@/lib/i18n";
import { boltFood, getWhatsAppUrl, restaurant, uberEats } from "@/lib/restaurant";
import { trackEvent } from "@/lib/analytics";

export function HowToOrder() {
  const { lang, t } = useI18n();
  const wa = getWhatsAppUrl(lang);

  return (
    <section id="encomenda" className="scroll-mt-[calc(4rem+env(safe-area-inset-top))] border-t border-line bg-bg px-4 py-10 sm:px-6 sm:py-14 text-cream">
      <div className="mx-auto max-w-4xl">
        
        {/* Section Title */}
        <div className="border-b border-line pb-4">
          <div className="border-l-2 border-orange pl-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
            {t({ pt: "FAÇA O SEU PEDIDO", en: "MAKE YOUR ORDER" })}
          </div>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl text-cream">
            {t({ pt: "Como prefere encomendar?", en: "How would you like to order?" })}
          </h2>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          
          {/* Option A - Levantamento no Restaurante */}
          <div className="flex flex-col justify-between rounded-xs border border-line bg-surface p-5 sm:p-6">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex size-6 items-center justify-center rounded-xs bg-orange text-xs font-bold text-white">
                  1
                </span>
                <h3 className="font-display text-xl font-bold text-cream">
                  {t({ pt: "Levantamento no Restaurante", en: "Restaurant Takeaway" })}
                </h3>
              </div>
              
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted">
                {t({
                  pt: "Faça o seu pedido por WhatsApp ou por chamada e levante comodamente no balcão.",
                  en: "Place your order via WhatsApp or phone call and pick it up at the counter.",
                })}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <Button asChild variant="whatsapp" size="md" className="w-full h-11 text-xs font-bold uppercase tracking-wider rounded-xs">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { from: "how_to_order_section" })}
                >
                  <WhatsAppIcon size="xs" />
                  <span>{t({ pt: "Pedir por WhatsApp", en: "Order via WhatsApp" })}</span>
                </a>
              </Button>

              <Button asChild variant="secondary" size="md" className="w-full h-11 text-xs font-bold uppercase tracking-wider rounded-xs border-line bg-surface hover:bg-raised">
                <a
                  href={`tel:${restaurant.phoneTel}`}
                  onClick={() => trackEvent("phone_click", { from: "how_to_order_section" })}
                >
                  <Phone className="size-4 text-orange" />
                  <span>{restaurant.phoneDisplay}</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Option B - Entrega ao Domicílio */}
          <div className="flex flex-col justify-between rounded-xs border border-line bg-surface p-5 sm:p-6">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex size-6 items-center justify-center rounded-xs bg-orange text-xs font-bold text-white">
                  2
                </span>
                <h3 className="font-display text-xl font-bold text-cream">
                  {t({ pt: "Entrega ao Domicílio", en: "Home Delivery" })}
                </h3>
              </div>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted">
                {t({
                  pt: "Peça através das nossas plataformas parceiras para receber no conforto de sua casa.",
                  en: "Order through our partner platforms to receive your meal at your door.",
                })}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <Button asChild variant="boltFood" size="md" className="w-full h-11 text-xs font-bold uppercase tracking-wider rounded-xs">
                <a
                  href={boltFood.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("bolt_food_click", { from: "how_to_order_section" })}
                >
                  <BoltFoodIcon size="xs" />
                  <span>Bolt Food</span>
                </a>
              </Button>

              <Button asChild variant="uber" size="md" className="w-full h-11 text-xs font-bold uppercase tracking-wider rounded-xs">
                <a
                  href={uberEats.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("uber_eats_click", { from: "how_to_order_section" })}
                >
                  <UberIcon size="xs" />
                  <span>Uber Eats</span>
                </a>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
