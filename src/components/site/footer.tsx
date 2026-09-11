import { Wordmark } from "@/components/site/logo";
import { useI18n } from "@/lib/i18n";
import { copy, restaurant } from "@/lib/restaurant";

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg px-4 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-10 sm:px-6 md:pb-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Main 3-Column Footer Layout */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Column 1: Brand & Descriptor (~42% desktop) */}
          <div className="lg:col-span-5">
            <Wordmark compact />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {t({
                pt: "Best Kebab & Pizza — takeaway, kebab e pizza em Campanhã, Porto.",
                en: "Best Kebab & Pizza — takeaway, kebab and pizza in Campanhã, Porto.",
              })}
            </p>
          </div>

          {/* Column 2: Quick Links (~25% desktop) */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-faint">
              {t({ pt: "Navegação", en: "Navigation" })}
            </p>
            <nav aria-label="Navegação de rodapé" className="mt-3 flex flex-col space-y-2 text-sm text-muted">
              <a href="#menu" className="transition-colors hover:text-cream">
                {t({ pt: "Menu", en: "Menu" })}
              </a>
              <a href="#destaques" className="transition-colors hover:text-cream">
                {t({ pt: "Destaques", en: "Highlights" })}
              </a>
              <a href="#encomenda" className="transition-colors hover:text-cream">
                {t({ pt: "Encomendar", en: "Order" })}
              </a>
              <a href="#avaliacoes" className="transition-colors hover:text-cream">
                {t(copy.navReviews)}
              </a>
              <a href="#local" className="transition-colors hover:text-cream">
                {t({ pt: "Localização & Contacto", en: "Location & Contact" })}
              </a>
            </nav>
          </div>

          {/* Column 3: Contact & Hours (~33% desktop) */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-faint">
              {t({ pt: "Contacto & Horário", en: "Contact & Hours" })}
            </p>
            <address className="mt-3 not-italic text-sm text-muted space-y-1.5">
              <p className="font-medium text-cream">{restaurant.name}</p>
              <p>{restaurant.address.street}</p>
              <p>{restaurant.address.postalCode} {restaurant.address.locality}, Portugal</p>
              <p className="pt-1">
                <a
                  href={`tel:${restaurant.phoneTel}`}
                  className="font-medium text-orange transition-colors hover:text-orange-hot"
                >
                  {restaurant.phoneDisplay}
                </a>
              </p>
              <p className="pt-1 text-xs text-faint">
                {t({
                  pt: "Sáb–Qui: 11:00–00:00 · Sex: 15:30–00:00",
                  en: "Sat–Thu: 11:00–00:00 · Fri: 15:30–00:00",
                })}
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Line Bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-line/50 pt-6 text-center text-xs text-faint sm:flex-row sm:text-left">
          <p>
            © {currentYear} {restaurant.name}. {t(copy.footerRights)}.
          </p>
          <p className="text-[11px] text-faint/80">
            {t({
              pt: "Takeaway em Campanhã · Entregas via Bolt Food & Uber Eats",
              en: "Takeaway in Campanhã · Delivery via Bolt Food & Uber Eats",
            })}
          </p>
        </div>

        {/* QuasiNorte Signature */}
        <div className="pt-2 text-center text-xs text-muted/80">
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
            <span>
              {t({
                pt: "Site criado pela",
                en: "Website by",
              })}{" "}
              <span className="font-medium text-cream">QuasiNorte</span>
            </span>
            <span aria-hidden="true" className="text-faint">·</span>
            <span>
              {t({
                pt: "Precisa de um site?",
                en: "Need a website?",
              })}
            </span>{" "}
            <a
              href="mailto:quasinorte@proton.me"
              aria-label={t({
                pt: "Enviar email para QuasiNorte (quasinorte@proton.me)",
                en: "Send email to QuasiNorte (quasinorte@proton.me)",
              })}
              className="text-muted transition-colors hover:text-orange focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange rounded-xs"
            >
              quasinorte@proton.me
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
