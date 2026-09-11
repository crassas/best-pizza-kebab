import { MapPin, Phone, UtensilsCrossed } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { useI18n } from "@/lib/i18n";
import { copy, getWhatsAppUrl, restaurant } from "@/lib/restaurant";
import { scrollToElement } from "@/lib/scroll";
import { trackEvent } from "@/lib/analytics";

export function ActionBar() {
  const { lang, t } = useI18n();

  const items = [
    {
      id: "menu",
      href: "#menu",
      targetId: "menu",
      icon: UtensilsCrossed,
      label: copy.navMenu,
      external: false,
      colorClass: "text-orange",
      onClick: () => trackEvent("menu_view", { from: "bottom_bar" }),
    },
    {
      id: "whatsapp",
      href: getWhatsAppUrl(lang),
      icon: WhatsAppIcon,
      label: copy.ctaWhatsapp,
      external: true,
      colorClass: "text-[#8ba27d]",
      onClick: () => trackEvent("whatsapp_click", { from: "bottom_bar" }),
    },
    {
      id: "phone",
      href: `tel:${restaurant.phoneTel}`,
      icon: Phone,
      label: copy.navCall,
      external: false,
      colorClass: "text-orange",
      onClick: () => trackEvent("phone_click", { from: "bottom_bar" }),
    },
    {
      id: "directions",
      href: "#local",
      targetId: "local",
      icon: MapPin,
      label: copy.ctaDirections,
      external: false,
      colorClass: "text-orange",
      onClick: () => trackEvent("directions_click", { from: "bottom_bar" }),
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof items[number]) => {
    item.onClick();
    if (item.targetId) {
      e.preventDefault();
      scrollToElement(item.targetId, 70);
    }
  };

  return (
    <nav
      aria-label={t(copy.navQuick)}
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-line bg-bg md:hidden shadow-lg"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4 divide-x divide-line">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item)}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex min-h-14 flex-col items-center justify-center gap-1 px-0.5 transition-colors cursor-pointer text-cream hover:bg-surface active:bg-raised"
              >
                <Icon className={`size-4 shrink-0 ${item.colorClass}`} aria-hidden="true" />
                <span className="max-w-full truncate px-0.5 text-[11px] font-bold uppercase tracking-wider">
                  {t(item.label)}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
