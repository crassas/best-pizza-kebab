import { useI18n } from "@/lib/i18n";
import { restaurant } from "@/lib/restaurant";
import { useRestaurantData } from "@/lib/restaurant-context";

interface MarqueeBannerProps {
  variant?: "red" | "white" | "yellow" | "dark";
  speed?: "normal" | "fast" | "reverse";
  className?: string;
  isTopBanner?: boolean;
}

export function MarqueeBanner({
  variant = "red",
  speed = "normal",
  className = "",
  isTopBanner = false,
}: MarqueeBannerProps) {
  const { lang } = useI18n();
  const { settings, activePromotions } = useRestaurantData();
  const isPt = lang === "pt";

  if (isTopBanner && settings.tickerActive === false) return null;

  const promoPhrases = (activePromotions || [])
    .filter((promotion) => promotion.locations.includes("ticker"))
    .map((promotion) =>
      isPt
        ? `⚡ ${promotion.messagePt.toUpperCase()}`
        : `⚡ ${promotion.messageEn.toUpperCase()}`,
    );

  const customMessages = (settings.tickerMessages || [])
    .filter((message) => message.active)
    .map((message) => (isPt ? message.textPt : message.textEn));

  const defaults = isPt
    ? [
        "🥙 DONER KEBAB • DURUM • FALAFEL",
        "★ OPÇÕES HALAL",
        "🍕 PIZZAS • HAMBÚRGUERES • FRANGO & SNACKS",
        "🍝 MASSAS • COMIDA INDIANA • PRATOS ASIÁTICOS",
        "🍽️ PRATOS DE KEBAB • FALAFEL",
        "🍟 BATATAS • EXTRAS • BEBIDAS",
        "⚡ TAKEAWAY • BOLT FOOD • UBER EATS",
        "📍 SÃO ROQUE DA LAMEIRA 2346",
        `📞 ${settings.deliveryLinks.phoneDisplay || restaurant.phoneDisplay}`,
      ]
    : [
        "🥙 DONER KEBAB • DURUM • FALAFEL",
        "★ HALAL OPTIONS",
        "🍕 PIZZA • BURGERS • CHICKEN & SNACKS",
        "🍝 PASTA • INDIAN DISHES • ASIAN DISHES",
        "🍽️ KEBAB PLATES • FALAFEL",
        "🍟 FRIES • EXTRAS • DRINKS",
        "⚡ TAKEAWAY • BOLT FOOD • UBER EATS",
        "📍 SÃO ROQUE DA LAMEIRA 2346",
        `📞 ${settings.deliveryLinks.phoneDisplay || restaurant.phoneDisplay}`,
      ];

  const phrases = [...promoPhrases, ...(customMessages.length ? customMessages : defaults)];
  const bg = {
    red: "bg-brand-red text-white border-y-2 border-black font-extrabold tracking-wider",
    white: "bg-white text-brand-red border-y-2 border-brand-red font-extrabold tracking-wider",
    yellow: "bg-brand-yellow text-black border-y-2 border-black font-extrabold",
    dark: "bg-brand-black text-white border-y-2 border-brand-red font-bold",
  }[variant];
  const anim = {
    normal: "animate-marquee",
    fast: "animate-marquee-fast",
    reverse: "animate-marquee-reverse",
  }[speed];

  return (
    <div
      className={`relative w-full overflow-hidden select-none py-2.5 sm:py-3 ${bg} ${className}`}
      aria-hidden="true"
    >
      <div className={anim}>
        {[0, 1, 2, 3].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-8 shrink-0 px-4">
            {phrases.map((phrase, index) => (
              <span
                key={`${copyIndex}-${index}`}
                className="flex items-center gap-4 text-sm sm:text-base md:text-lg font-display tracking-wider uppercase whitespace-nowrap"
              >
                <span>{phrase}</span>
                <span className="inline-block size-2 rounded-full bg-current opacity-70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CheckeredRibbon({ height = "h-1 sm:h-4" }: { height?: string }) {
  return (
    <div
      className={`w-full ${height} checker-red-white border-y border-black/80 shadow-xs`}
      aria-hidden="true"
    />
  );
}
