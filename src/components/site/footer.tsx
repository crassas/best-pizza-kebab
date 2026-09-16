import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ExternalLink,
  Lock,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Wordmark } from "@/components/site/logo";
import { MarqueeBanner, CheckeredRibbon } from "@/components/site/marquee-banner";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { useI18n } from "@/lib/i18n";
import { copy, maps, restaurant } from "@/lib/restaurant";
import { useRestaurantData } from "@/lib/restaurant-context";
import { scrollToElement } from "@/lib/scroll";

export function Footer() {
  const { lang, t } = useI18n();
  const { settings } = useRestaurantData();
  const isPt = lang === "pt";
  const currentYear = new Date().getFullYear();
  const links = settings.deliveryLinks;

  const phoneDisplay = links.phoneDisplay || restaurant.phoneDisplay;
  const phoneTel = links.phoneTel || restaurant.phoneTel;
  const address =
    links.address ||
    `${restaurant.address.street}, ${restaurant.address.postalCode} ${restaurant.address.locality}`;
  const mapUrl = links.googleMaps || maps.directions;
  const whatsapp = links.whatsapp || restaurant.whatsapp;
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    isPt
      ? "Olá! Gostaria de obter informações sobre o Best Kebab & Pizza."
      : "Hello! I'd like some information about Best Kebab & Pizza.",
  )}`;

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToElement(targetId, 80);
  };

  return (
    <footer className="border-t-4 border-black bg-brand-black text-cream pb-[calc(5.75rem+env(safe-area-inset-bottom))] md:pb-8">
      <MarqueeBanner variant="yellow" speed="reverse" />
      <CheckeredRibbon height="h-1.5 sm:h-3" />

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <section className="relative overflow-hidden rounded-xl border-4 border-black bg-brand-red p-5 sm:p-7 shadow-fastfood lg:col-span-5">
            <div className="absolute -right-8 -bottom-14 font-display text-[13rem] leading-none text-black/10 select-none">
              B
            </div>
            <div className="relative">
              <Wordmark compact />
              <p className="mt-5 max-w-md font-display text-3xl sm:text-4xl uppercase leading-none text-white">
                {isPt ? "Kebab, pizza e muito mais." : "Kebab, pizza and much more."}
              </p>
              <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-white/75">
                {isPt
                  ? "São Roque da Lameira, Campanhã, Porto. Consulta o menu, monta o pedido e envia-o para confirmação."
                  : "São Roque da Lameira, Campanhã, Porto. Explore the menu, build your order and send it for confirmation."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-brand-yellow px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
                  <ShieldCheck className="size-3.5" />
                  {isPt ? "Opções Halal" : "Halal Options"}
                </span>
                <span className="rounded-full border-2 border-black bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
                  ★ 4.9 Google Reviews
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-xl border-4 border-black bg-surface-card p-5 sm:p-6 shadow-fastfood lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-yellow">
                  {isPt ? "NAVEGAÇÃO" : "NAVIGATION"}
                </p>
                <nav className="mt-3 grid gap-2" aria-label={isPt ? "Navegação do rodapé" : "Footer navigation"}>
                  {[
                    { id: "menu", label: t(copy.navMenu) },
                    { id: "destaques", label: isPt ? "Mais pedidos" : "Top sellers" },
                    { id: "encomenda", label: isPt ? "Fazer pedido" : "Place order" },
                    { id: "avaliacoes", label: t(copy.navReviews) },
                    { id: "local", label: isPt ? "Localização" : "Location" },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleAnchor(e, item.id)}
                      className="group flex items-center justify-between rounded-md border-2 border-line bg-black/20 px-3.5 py-2.5 text-sm font-bold text-cream/75 transition-colors hover:border-brand-yellow hover:text-white"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="size-4 text-brand-red transition-transform group-hover:translate-x-1" />
                    </a>
                  ))}
                </nav>
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-yellow">
                  {isPt ? "CONTACTO & ENTREGAS" : "CONTACT & DELIVERY"}
                </p>

                <div className="mt-3 space-y-2.5">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 rounded-md border-2 border-line bg-black/20 px-3.5 py-3 transition-colors hover:border-brand-yellow"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-red text-white">
                      <MapPin className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-black uppercase tracking-wider text-brand-yellow">
                        {isPt ? "Morada" : "Address"}
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold leading-snug text-white">
                        {address}
                      </span>
                    </span>
                  </a>

                  <a
                    href={`tel:${phoneTel}`}
                    className="flex items-center gap-3 rounded-md border-2 border-line bg-black/20 px-3.5 py-3 transition-colors hover:border-brand-yellow"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-yellow text-black">
                      <Phone className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[10px] font-black uppercase tracking-wider text-cream/55">
                        {isPt ? "Telefone" : "Phone"}
                      </span>
                      <span className="font-display text-xl tracking-wide text-white">{phoneDisplay}</span>
                    </span>
                  </a>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-10 items-center justify-center gap-1.5 rounded-md border-2 border-black bg-bolt px-3 py-2 text-[10px] font-black uppercase tracking-wider text-black shadow-xs"
                  >
                    <WhatsAppIcon size="xs" />
                    WhatsApp
                  </a>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-10 items-center justify-center gap-1.5 rounded-md border-2 border-black bg-white px-3 py-2 text-[10px] font-black uppercase tracking-wider text-black shadow-xs"
                  >
                    <Navigation className="size-3.5 text-brand-red" />
                    {isPt ? "Direções" : "Directions"}
                  </a>
                </div>

                {(links.bolt || links.uber) && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {links.bolt && (
                      <a
                        href={links.bolt}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-10 items-center justify-center gap-1.5 rounded-md border-2 border-black bg-bolt/90 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-black shadow-xs"
                      >
                        Bolt Food
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                    {links.uber && (
                      <a
                        href={links.uber}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-10 items-center justify-center gap-1.5 rounded-md border-2 border-black bg-black px-3 py-2 text-[10px] font-black uppercase tracking-wider text-white shadow-xs"
                      >
                        Uber Eats
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t-2 border-line pt-5 text-[11px] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {restaurant.name}. {isPt ? "Todos os direitos reservados." : "All rights reserved."}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>{isPt ? "Preços com IVA incluído à taxa legal em vigor." : "All prices include VAT."}</p>
            <Link
              to="/manage"
              className="inline-flex items-center gap-1 text-cream/35 transition-colors hover:text-brand-yellow"
              title="Acesso Reservado ao Proprietário"
            >
              <Lock className="size-3" />
              <span>{isPt ? "Área Reservada" : "Owner Login"}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
