import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/site/logo";
import { MarqueeBanner, CheckeredRibbon } from "@/components/site/marquee-banner";
import { useI18n } from "@/lib/i18n";
import { copy, restaurant } from "@/lib/restaurant";
import { useRestaurantData } from "@/lib/restaurant-context";
import { Phone, MapPin, ShieldCheck, Lock } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

export function Footer() {
  const { lang, t } = useI18n();
  const { settings } = useRestaurantData();
  const isPt = lang === "pt";
  const currentYear = new Date().getFullYear();

  const links = settings.deliveryLinks;
  const waUrl = `https://wa.me/${links.whatsapp}?text=${encodeURIComponent(
    isPt
      ? "Olá! Gostaria de obter informações sobre o Best Kebab & Pizza."
      : "Hello! I'd like some information about Best Kebab & Pizza."
  )}`;

  return (
    <footer className="border-t-4 border-black bg-brand-black text-cream pb-[calc(5.75rem+env(safe-area-inset-bottom))] md:pb-12">
      {/* Energetic Pre-Footer Marquee */}
      <MarqueeBanner variant="yellow" speed="reverse" />
      <CheckeredRibbon height="h-1 sm:h-2.5" />

      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12 pb-10 border-b-2 border-line">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <Wordmark compact />
            <p className="text-sm text-muted leading-relaxed max-w-sm">
              {isPt
                ? "Doner kebab, durum, pizzas, hambúrgueres e falafel em São Roque da Lameira, Campanhã, Porto."
                : "Doner kebab, durum, pizza, burgers and falafel in São Roque da Lameira, Campanhã, Porto."}
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-brand-red px-3 py-1 text-xs font-black uppercase tracking-wider text-white shadow-xs">
                <ShieldCheck className="size-3.5 text-brand-yellow" />
                <span>{isPt ? "Opções Halal" : "Halal Options"}</span>
              </span>
              <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold text-brand-yellow">
                ★ 4.9 Google Reviews
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-lg uppercase tracking-wider text-white border-b border-line pb-1">
              {isPt ? "Navegação Rápida" : "Quick Links"}
            </h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted">
              <a href="#menu" className="hover:text-brand-yellow transition-colors">
                {t(copy.navMenu)}
              </a>
              <a href="#destaques" className="hover:text-brand-yellow transition-colors">
                {isPt ? "Mais Pedidos" : "Top Sellers"}
              </a>
              <a href="#encomenda" className="hover:text-brand-yellow transition-colors">
                {isPt ? "Promoção Bolt Food (-30%)" : "Bolt Food 30% Off"}
              </a>
              <a href="#avaliacoes" className="hover:text-brand-yellow transition-colors">
                {t(copy.navReviews)}
              </a>
              <a href="#local" className="hover:text-brand-yellow transition-colors">
                {t(copy.navDirections)}
              </a>
            </nav>
          </div>

          {/* Contact and Orders */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display text-lg uppercase tracking-wider text-white border-b border-line pb-1">
              {isPt ? "Contacto & Entregas" : "Contact & Delivery"}
            </h4>
            <div className="space-y-2 text-sm text-muted">
              <p className="flex items-start gap-2 text-white">
                <MapPin className="size-4 text-brand-red shrink-0 mt-0.5" />
                <span>
                  {links.address || `${restaurant.address.street}, ${restaurant.address.postalCode} ${restaurant.address.locality}`}
                </span>
              </p>
              <p className="flex items-center gap-2 pt-1">
                <Phone className="size-4 text-brand-yellow shrink-0" />
                <a
                  href={`tel:${links.phoneTel || restaurant.phoneTel}`}
                  className="font-display text-xl font-black text-white hover:text-brand-yellow transition-colors"
                >
                  {links.phoneDisplay || restaurant.phoneDisplay}
                </a>
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-line bg-surface px-3 py-1.5 text-xs font-bold text-bolt hover:bg-raised"
                >
                  <WhatsAppIcon size="xs" className="text-bolt" />
                  <span>WhatsApp</span>
                </a>
                {links.bolt && (
                  <a href={links.bolt} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded border border-line bg-surface px-3 py-1.5 text-xs font-bold text-white hover:border-bolt"><span className="size-2 rounded-full bg-bolt" /><span>Bolt Food</span></a>
                )}
                {links.uber && (
                  <a href={links.uber} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded border border-line bg-surface px-3 py-1.5 text-xs font-bold text-white hover:border-uber"><span className="size-2 rounded-full bg-uber" /><span>Uber Eats</span></a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {currentYear} {restaurant.name}. {isPt ? "Todos os direitos reservados." : "All rights reserved."}</p>
          <div className="flex items-center gap-4">
            <p className="text-center sm:text-right">{isPt ? "Preços com IVA incluído à taxa legal em vigor." : "All prices include VAT."}</p>
            <Link to="/manage" className="inline-flex items-center gap-1 text-[11px] text-muted/60 hover:text-brand-yellow transition-colors" title="Acesso Reservado ao Proprietário"><Lock className="size-3" /><span>{isPt ? "Área Reservada" : "Owner Login"}</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
