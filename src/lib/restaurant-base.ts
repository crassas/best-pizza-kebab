export type Lang = "pt" | "en";

export type Localized = { pt: string; en: string };

export type Money = number | null;

export type MenuSize = {
  id: string;
  label: Localized;
  price: Money;
};

export type MenuItem = {
  id: string;
  name: Localized;
  description?: Localized;
  servedWith?: Localized;
  vegetarian?: boolean;
  price: Money;
  sizes?: MenuSize[];
  image?: string;
  imageAlt?: Localized;
};

export type MenuCategory = {
  id: string;
  label: Localized;
  intro?: Localized;
  items: MenuItem[];
};

export type FeaturedDish = {
  id: string;
  categoryId: string;
  title: Localized;
  image: string;
  alt: Localized;
};

export type GoogleReviewLink = {
  id: string;
  label: Localized;
  url: string;
};

const L = (pt: string, en: string): Localized => ({ pt, en });

/**
 * Flip this when prices are ready. Keep item.price / sizes[].price filled
 * (or null) in the data below — the UI only renders them when this is true.
 */
export const SHOW_PRICES = true;

export const boltFood = {
  storeUrl: "https://food.bolt.eu/pt-pt/437/p/191572-best-kebab-pizza?utm_source=share_provider&utm_medium=product&utm_content=menu_header",
  cta: L("Consultar menu e promoções disponíveis na Bolt Food", "Check menu and promotions available on Bolt Food"),
  supportCta: L("Disponível através da Bolt Food", "Available on Bolt Food"),
  orderItem: L("Bolt Food", "Bolt Food"),
};

export const boltPromotion = {
  enabled: true,
  text: L("30% na Bolt Food em pedidos desde 12 € — ver condições", "30% off on Bolt Food for orders over 12 € — see terms"),
  cta: L("ver condições", "see terms"),
  url: "https://food.bolt.eu/pt-pt/437/p/191572-best-kebab-pizza?utm_source=share_provider&utm_medium=product&utm_content=menu_header",
};

export const uberEats = {
  storeUrl: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA",
  cta: L("Pedir no Uber Eats", "Order on Uber Eats"),
  orderItem: L("Pedir", "Order"),
  products: {
    "durum": { price: 6.00, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "doner": { price: 5.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "doner-mix-box": { price: 7.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "doner-falafel": { price: 5.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "doner-kebab": { price: 8.00, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "durum-kebab": { price: 8.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "doner-box": { price: 9.00, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "falafel-kebab": { price: 8.00, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "family-kebab": { price: 15.00, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "family-durum": { price: 16.00, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "hamburger": { price: 5.00, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "double-hamburger": { price: 6.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "egg-burger": { price: 5.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "crispy-chicken-burger": { price: 6.00, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "cheese-burger": { price: 5.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "chicken-strips": { price: 5.00, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "chicken-nuggets": { price: 4.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "chicken-wings": { price: 5.00, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "chicken-mix-box": { price: 9.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "prato-kebab": { price: 9.00, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "prato-falafel": { price: 8.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "prato-kebab-rice": { price: 9.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "prato-special": { price: 10.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "salad-kebab": { price: 7.50, url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "margherita": { url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "tuna": { url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "special-kebab": { url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "chicken-pizza": { url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "vegetarian": { url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "doner-chicken": { url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "onion": { url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "pepperoni": { url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
    "frutti-di-mare": { url: "https://www.ubereats.com/pt-en/store/best-kebab-%26-pizza/J3MzFmc1VcSlu0T7FKhxPA" },
  },
} as const;

export const TIMEZONE = "Europe/Lisbon";

/** JS getDay(): 0 Sunday … 6 Saturday. Friday opens later. */
const HOURS_DEFAULT = { open: "11:00", close: "00:00" } as const;
const HOURS_FRIDAY = { open: "15:30", close: "00:00" } as const;

export const restaurant = {
  name: "Best Kebab & Pizza",
  shortName: "Best Kebab & Pizza",
  phoneDisplay: "+351 920 163 613",
  phoneTel: "+351920163613",
  whatsapp: "351920163613",
  email: null as string | null,
  cuisine: [
    "Pizza",
    "Kebab",
    "Burger",
    "Chicken",
    "Falafel",
    "Indian",
    "Pasta",
    "Salad",
    "Halal",
  ],
  address: {
    street: "Rua de São Roque da Lameira 2346",
    postalCode: "4350-306",
    locality: "Porto",
    region: "Porto",
    country: "PT",
    countryName: L("Portugal", "Portugal"),
    neighbourhood: L("Campanhã", "Campanhã"),
  },
  geo: {
    // Street-level pin for the high-number stretch (near 2346). Directions use the address string.
    lat: 41.1573572,
    lng: -8.5880384,
  },
  mapsQuery: "Rua de São Roque da Lameira 2346, 4350-306 Porto, Portugal",
  timezone: TIMEZONE,
  /**
   * Horários verificados presencialmente na porta do estabelecimento:
   * Sábado a quinta: 11:00–00:00 | Sexta-feira: 15:30–00:00.
   */
  hoursNotice: [
    {
      days: [0, 1, 2, 3, 4, 6] as const,
      schemaDays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
      ],
      open: HOURS_DEFAULT.open,
      close: HOURS_DEFAULT.close,
      label: L("Sábado a quinta", "Saturday–Thursday"),
      labelShort: L("Sáb–qui", "Sat–Thu"),
    },
    {
      days: [5] as const,
      schemaDays: ["Friday"],
      open: HOURS_FRIDAY.open,
      close: HOURS_FRIDAY.close,
      label: L("Sexta-feira", "Friday"),
      labelShort: L("Sex", "Fri"),
    },
  ],
  /** Display names only — no platform URLs have been verified. */
  delivery: ["Bolt Food", "Uber Eats"] as const,
  photos: {
    hero: "/images/hero-logo.webp",
    pizza: "/images/enhanced/05_pizza.png",
    kebab: "/images/enhanced/06_kebab_batatas.png",
    kebabPrato: "/images/enhanced/07_kebab_prato_agua.png",
    falafel: "/images/enhanced/08_falafel.png",
    burger: "/images/uploaded/hmm_burger.webp",
    chicken: "/images/uploaded/palitos_de_frango_com_fritas_e_refrigerante.webp",
    interiorRefeicao: "/images/enhanced/01_interior_refeicao.png",
    interiorSala: "/images/enhanced/02_interior_sala.png",
    interiorBalcao: "/images/enhanced/03_interior_balcao.png",
    dono: "/images/enhanced/04_dono_restaurante.png",
  },
} as const;

export const maps = {
  search: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.mapsQuery)}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.mapsQuery)}`,
  osmEmbed: `https://www.openstreetmap.org/export/embed.html?bbox=${restaurant.geo.lng - 0.008}%2C${restaurant.geo.lat - 0.005}%2C${restaurant.geo.lng + 0.008}%2C${restaurant.geo.lat + 0.005}&layer=mapnik&marker=${restaurant.geo.lat}%2C${restaurant.geo.lng}`,
};

export function getWhatsAppUrl(lang: "pt" | "en" = "pt", customMsg?: string) {
  const text =
    customMsg ||
    (lang === "pt"
      ? "Olá! Gostaria de consultar o menu e fazer um pedido no BEST KEBAB & PIZZA."
      : "Hello! I would like to check the menu and place an order at BEST KEBAB & PIZZA.");
  return `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const weekdayName: Localized[] = [
  L("domingo", "Sunday"),
  L("segunda", "Monday"),
  L("terça", "Tuesday"),
  L("quarta", "Wednesday"),
  L("quinta", "Thursday"),
  L("sexta", "Friday"),
  L("sábado", "Saturday"),
];

export const copy = {
  skip: L("Saltar para o conteúdo", "Skip to content"),
  navMenu: L("Menu", "Menu"),
  navReviews: L("Avaliações", "Reviews"),
  navCall: L("Ligar", "Call"),
  navDirections: L("Como chegar", "Directions"),
  navContact: L("Contacto", "Contact"),
  navQuick: L("Ações rápidas", "Quick actions"),
  navSections: L("Secções", "Sections"),
  langPt: "PT",
  langEn: "EN",
  langSwitch: L("Idioma", "Language"),
  heroKicker: L("São Roque da Lameira · Porto", "São Roque da Lameira · Porto"),
  heroHeadline: L("Kebab no ponto. Pizza a sair.", "Kebab done right. Pizza just out."),
  heroSub: L(
    "Takeaway no bairro: pizza, kebab, hambúrgueres, frango, falafel e pratos indianos.",
    "Neighbourhood takeaway: pizza, kebab, burgers, chicken, falafel and Indian dishes.",
  ),
  ctaMenu: L("Ver menu", "See menu"),
  ctaDirections: L("Como chegar", "Get directions"),
  ctaCall: L("Ligar", "Call"),
  ctaWhatsapp: L("WhatsApp", "WhatsApp"),
  featuredKicker: L("Em destaque", "Featured"),
  featuredTitle: L("Começa pelos favoritos da casa", "Start with the house favourites"),
  featuredCta: L("Ver no menu", "See on the menu"),
  menuKicker: L("Menu Completo", "Full Menu"),
  menuTitle: L("Todas as especialidades", "Our specialties"),
  menuLead: L(
    "Consulta a nossa seleção. Para encomendas e informações, liga-nos.",
    "Explore our selection. For orders and information, give us a call.",
  ),
  menuJump: L("Ir para a categoria", "Jump to category"),
  menuSearchPlaceholder: L("Pesquisar pizzas, kebabs, pratos...", "Search pizzas, kebabs, dishes..."),
  menuAll: L("Todas", "All"),
  menuFilterVeg: L("Vegetariano", "Vegetarian"),
  showingCategory: L("A mostrar", "Showing"),
  viewAllCategories: L("Ver todas as categorias", "View all categories"),
  itemsCount: L("opções", "options"),
  menuNoResults: L("Nenhum prato encontrado.", "No dishes found."),
  menuClearSearch: L("Limpar pesquisa", "Clear search"),
  menuPriceNotice: L(
    "Preços e promoções do dia disponíveis no balcão, telefone ou WhatsApp.",
    "Current prices and daily specials available at the counter, phone, or WhatsApp.",
  ),
  vegBadge: L("Vegetariano", "Vegetarian"),
  servedWith: L("Inclui", "Includes"),
  comingSoon: L("Em breve", "Coming soon"),
  sizesNote: L("Pequena e grande", "Small and large"),
  locationKicker: L("O sítio", "Find us"),
  locationTitle: L("Mesmo aqui em São Roque da Lameira", "Right here in São Roque da Lameira"),
  locationLead: L(
    "Encontra-nos na Rua de São Roque da Lameira 2346, Porto, a poucos passos das paragens STCP das linhas 800 e 801, incluindo no sentido da Rua de Fernão de Magalhães. Se estás a sair do trabalho, a caminho do centro ou vais para a zona do Dragão, podes fazer o pedido antes e levantar quando passares por cá.",
    "Find us at Rua de São Roque da Lameira 2346, Porto, a few steps from STCP bus stops for lines 800 and 801, including towards Rua de Fernão de Magalhães. Whether you're leaving work, heading into town, or going towards Dragão stadium, you can place your order ahead and pick it up when you pass by."
  ),
  addressLabel: L("Morada", "Address"),
  phoneLabel: L("Telefone", "Phone"),
  hoursLabel: L("Horário", "Hours"),
  openNow: L("Aberto agora", "Open now"),
  closedNow: L("Fechado agora", "Closed now"),
  untilTime: L("até às {time}", "until {time}"),
  opensAt: L("Abre às {time}", "Opens at {time}"),
  opensDayAt: L("Abre {day} às {time}", "Opens {day} at {time}"),
  deliveryLabel: L("Entrega", "Delivery"),
  openMaps: L("Abrir no Google Maps", "Open in Google Maps"),
  mapTitle: L("Mapa — BEST PIZZA & KEBAB, Porto", "Map — BEST PIZZA & KEBAB, Porto"),
  contactLead: L(
    "Liga para pedir ou envia mensagem. Atendemos em português e inglês.",
    "Call to order or send a message. We speak Portuguese and English.",
  ),
  reviewsKicker: L("Avaliações no Google", "Google Reviews"),
  reviewsTitle: L("Avaliações no Google Maps", "Google Maps Reviews"),
  reviewsLead: L(
    "Consulte as avaliações e opiniões reais dos nossos clientes diretamente no Google.",
    "Read real customer reviews and ratings directly on Google.",
  ),
  googleRatingLabel: L("Avaliações verificadas", "Verified reviews"),
  readOnGoogle: L("Ver no Google", "Open on Google"),
  allReviewsOnGoogle: L("Ver todas as avaliações no Google Maps", "View all reviews on Google Maps"),
  footerNote: L("BEST KEBAB & PIZZA — Porto", "BEST KEBAB & PIZZA — Porto"),
  footerRights: L("Takeaway em Campanhã", "Takeaway in Campanhã"),
};

export const googleReviewLinks: GoogleReviewLink[] = [
  { id: "rev-1", label: L("Avaliação no Google #1", "Google Review #1"), url: "https://share.google/EKiN4sx02vVBF3k8F" },
  { id: "rev-2", label: L("Avaliação no Google #2", "Google Review #2"), url: "https://share.google/7hR0lqiqSDIO3Kd97" },
  { id: "rev-3", label: L("Avaliação no Google #3", "Google Review #3"), url: "https://share.google/2HTGzDwUpfmF1uP9E" },
  { id: "rev-4", label: L("Avaliação no Google #4", "Google Review #4"), url: "https://share.google/NMgITL52PTrDH8ocX" },
  { id: "rev-5", label: L("Avaliação no Google #5", "Google Review #5"), url: "https://share.google/ckgs78RM3eTPauwqn" },
  { id: "rev-6", label: L("Avaliação no Google #6", "Google Review #6"), url: "https://share.google/xEAtC58iuebWT6aLt" },
  { id: "rev-7", label: L("Avaliação no Google #7", "Google Review #7"), url: "https://share.google/nLYAdmno5K0d0OaeY" },
];

export const featured: FeaturedDish[] = [
  {
    id: "pizza-kebab-special",
    categoryId: "pizza",
    title: L("Pizza Kebab Special", "Pizza Kebab Special"),
    image: "/images/uploaded/pizza_kebab_special.png",
    alt: L("Pizza Kebab Special da Best Pizza & Kebab", "Best Pizza & Kebab Pizza Kebab Special"),
  },
  {
    id: "menu-doner",
    categoryId: "kebabs",
    title: L("Menu Döner", "Döner Menu"),
    image: "/images/uploaded/menu_doner.png",
    alt: L("Menu Döner da Best Pizza & Kebab", "Best Pizza & Kebab Döner Menu"),
  },
  {
    id: "durum-kebab",
    categoryId: "kebabs",
    title: L("Durum Kebab", "Durum Kebab"),
    image: "/images/uploaded/durum_kebab.png",
    alt: L("Durum Kebab da Best Pizza & Kebab", "Best Pizza & Kebab Durum Kebab"),
  },
  {
    id: "menu-falafel",
    categoryId: "kebabs",
    title: L("Menu Dürüm de Falafel", "Falafel Dürüm Menu"),
    image: "/images/uploaded/menu_durum_de_falafel.png",
    alt: L("Menu Dürüm de Falafel da Best Pizza & Kebab", "Best Pizza & Kebab Falafel Dürüm Menu"),
  },
];

const withFriesDrink = L("batata frita e bebida", "fries and a drink");

export function getCategoryAnchor(categoryId: string): string {
  if (categoryId === "pizza" || categoryId === "pizzas") return "menu-pizzas";
  return `menu-${categoryId}`;
}

export const menu: MenuCategory[] = [
  {
    id: "kebabs",
    label: L("Kebabs", "Kebabs"),
    items: [
      { id: "durum", name: L("Durum (1 peça)", "Durum (1 pc)"), description: L("Wrap de tortilha com carne, vegetais e molho.", "Thin rolled wrap filled with meat, salad and sauce."), price: 4.99, image: "/images/uploaded/durum_kebab.png", imageAlt: L("Durum da Best Pizza & Kebab", "Best Pizza & Kebab Durum") },
      { id: "doner", name: L("Doner Kebab (1 peça)", "Doner Kebab (1 pc)"), description: L("Carne grelhada no espeto com vegetais em pão pita.", "Kebab sandwich with sliced spit-roasted meat."), price: 4.50, image: "/images/uploaded/doner_kebab.webp", imageAlt: L("Doner Kebab da Best Pizza & Kebab", "Best Pizza & Kebab Doner Kebab") },
      { id: "doner-mix-box", name: L("Doner Mix Box", "Doner Mix Box"), price: 7.50 },
      {
        id: "doner-falafel",
        name: L("Kebab Falafel (4 peças)", "Kebab Falafel (4 pcs)"),
        description: L("Bolinhos fritos de grão-de-bico e especiarias.", "4 chickpea and herb falafel pieces."),
        vegetarian: true,
        price: 4.50,
        image: "/images/enhanced/08_falafel.png",
        imageAlt: L("Falafel da Best Pizza & Kebab", "Best Pizza & Kebab Falafel"),
      },
      {
        id: "doner-kebab-menu",
        name: L("Doner Kebab Menu", "Doner Kebab Menu"),
        servedWith: withFriesDrink,
        price: 7.99,
        image: "/images/uploaded/menu_doner.png",
        imageAlt: L("Menu Döner da Best Pizza & Kebab", "Best Pizza & Kebab Döner Menu"),
      },
      {
        id: "durum-menu",
        name: L("Durum Menu", "Durum Menu"),
        servedWith: withFriesDrink,
        price: 8.99,
        image: "/images/uploaded/durum_kebab.png",
        imageAlt: L("Durum Kebab da Best Pizza & Kebab", "Best Pizza & Kebab Durum Kebab"),
      },
      {
        id: "doner-box",
        name: L("Doner Box Menu", "Doner Box Menu"),
        servedWith: withFriesDrink,
        price: 7.99,
        image: "/images/uploaded/doner_box.webp",
        imageAlt: L("Döner Box da Best Pizza & Kebab", "Best Pizza & Kebab Döner Box"),
      },
      {
        id: "doner-box-single",
        name: L("Doner Box (1 peça)", "Doner Box (1 pc)"),
        description: L("Carne doner com acompanhamentos em caixa.", "Sliced doner meat with sides served in a box."),
        price: 4.99,
      },
      {
        id: "falafel-kebab-menu",
        name: L("Kebab Falafel Menu", "Kebab Falafel Menu"),
        vegetarian: true,
        servedWith: withFriesDrink,
        price: 7.99,
        image: "/images/uploaded/menu_durum_de_falafel.png",
        imageAlt: L("Menu Dürüm de Falafel da Best Pizza & Kebab", "Best Pizza & Kebab Falafel Dürüm Menu"),
      },
      {
        id: "durum-falafel-menu",
        name: L("Durum Falafel Menu", "Durum Falafel Menu"),
        vegetarian: true,
        servedWith: withFriesDrink,
        price: 8.99,
      },
      {
        id: "pita-shoarma-menu",
        name: L("Pita Shoarma Menu", "Pita Shoarma Menu"),
        servedWith: withFriesDrink,
        price: 9.99,
      },
      {
        id: "family-kebab",
        name: L("Family Kebab Menu", "Family Kebab Menu"),
        description: L(
          "2 kebabs, 2 batatas fritas e 2 bebidas",
          "2 kebabs, 2 portions of fries and 2 drinks",
        ),
        price: 15.00,
      },
      {
        id: "family-durum",
        name: L("Family Durum Kebab", "Family Durum Kebab"),
        description: L(
          "2 durum wraps, 2 batatas fritas e 2 bebidas",
          "2 durum wraps, 2 portions of fries and 2 drinks",
        ),
        price: 16.00,
      },
    ],
  },
  {
    id: "burgers",
    label: L("Hambúrgueres", "Burgers"),
    intro: L("Todos com batata frita e bebida (nos menus).", "All served with fries and a drink in menus."),
    items: [
      {
        id: "hamburger-menu",
        name: L("Hambúrguer Menu", "Hamburger Menu"),
        description: L("Burger, batata e bebida.", "Burger, fries and drink."),
        servedWith: L("batata frita e bebida", "fries and a drink"),
        price: 8.50,
        image: "/images/uploaded/hmm_burger.webp",
        imageAlt: L("Hambúrguer da Best Pizza & Kebab", "Best Pizza & Kebab Hamburger"),
      },
      {
        id: "double-hamburger-menu",
        name: L("Hambúrguer Duplo Menu", "Double Hamburger Menu"),
        description: L("Duplo burger, batata e bebida.", "Double burger, fries and drink."),
        servedWith: L("batata frita e bebida", "fries and a drink"),
        price: 11.00,
        image: "/images/uploaded/imagens_menu_10_organizadas/hamburguer_duplo.png",
        imageAlt: L("Hambúrguer Duplo da Best Pizza & Kebab", "Best Pizza & Kebab Double Hamburger"),
      },
      {
        id: "egg-burger-menu",
        name: L("Hambúrguer com Ovo Menu", "Egg Burger Menu"),
        description: L("Ovo burger, batata e bebida.", "Egg burger, fries and drink."),
        servedWith: L("batata frita e bebida", "fries and a drink"),
        price: 8.99,
        image: "/images/uploaded/imagens_menu_10_organizadas/egg_burger.png",
        imageAlt: L("Egg Burger da Best Pizza & Kebab", "Best Pizza & Kebab Egg Burger"),
      },
      {
        id: "crispy-chicken-burger",
        name: L("Frango Crocante Burger Menu", "Crispy Chicken Burger Menu"),
        description: L("Tiras de frango burger, batata e bebida.", "Crispy chicken burger, fries and drink."),
        servedWith: L("batata frita e bebida", "fries and a drink"),
        price: 8.50,
        image: "/images/uploaded/crispy_chicken_burger.webp",
        imageAlt: L("Crispy Chicken Burger da Best Pizza & Kebab", "Best Pizza & Kebab Crispy Chicken Burger"),
      },
      {
        id: "cheese-burger-menu",
        name: L("Cheeseburger Menu", "Cheeseburger Menu"),
        description: L("Cheese burger, batata e bebida.", "Cheese burger, fries and drink."),
        servedWith: L("batata frita e bebida", "fries and a drink"),
        price: 8.50,
        image: "/images/uploaded/hmm_burger.webp",
        imageAlt: L("Cheeseburger Menu da Best Pizza & Kebab", "Best Pizza & Kebab Cheeseburger Menu"),
      },
      {
        id: "chicken-burgers-single",
        name: L("Chicken Burgers (1 peça)", "Chicken Burgers (1 pc)"),
        description: L("Hambúrguer de frango com salada mista (160g).", "Chicken burger with mixed salad (160g)."),
        price: 4.99,
      },
      {
        id: "cheese-burger-single",
        name: L("Cheese Burger (1 peça)", "Cheese Burger (1 pc)"),
        description: L("Hambúrguer com queijo (160g).", "Cheeseburger (160g)."),
        price: 4.50,
      },
      {
        id: "hamburger-single",
        name: L("Hambúrguer (1 peça)", "Hamburger (1 pc)"),
        description: L("Hambúrguer simples com salada mista (160g).", "Simple burger with mixed salad (160g)."),
        price: 4.99,
      },
    ],
  },
  {
    id: "chicken",
    label: L("Frango e snacks", "Chicken & snacks"),
    items: [
      {
        id: "chicken-strips-menu",
        name: L("Tiras de Frango Menu", "Chicken Strips Menu"),
        description: L("4 tiras de frango + batata frita + bebida", "4 chicken strips + fries + drink"),
        servedWith: withFriesDrink,
        price: 7.99,
        image: "/images/uploaded/palitos_de_frango_com_fritas_e_refrigerante.webp",
        imageAlt: L("Palitos de Frango com Fritas e Refrigerante da Best Pizza & Kebab", "Best Pizza & Kebab Chicken Strips with Fries and Drink"),
      },
      {
        id: "chicken-nugget-menu",
        name: L("Nuggets de Frango Menu", "Chicken Nuggets Menu"),
        description: L("4 nuggets de frango + batata frita + bebida", "4 chicken nuggets + fries + drink"),
        servedWith: withFriesDrink,
        price: 7.99,
        image: "/images/uploaded/menu_de_chicken_nuggets.webp",
        imageAlt: L("Menu de Chicken Nuggets da Best Pizza & Kebab", "Best Pizza & Kebab Chicken Nuggets Menu"),
      },
      {
        id: "chicken-wings-menu",
        name: L("Asinhas de Frango Menu", "Chicken Wings Menu"),
        description: L("4 asinhas de frango + batata frita + bebida", "4 chicken wings + fries + drink"),
        servedWith: withFriesDrink,
        price: 7.99,
        image: "/images/uploaded/imagens_menu_10_organizadas/asas_de_frango.png",
        imageAlt: L("Asinhas de Frango Menu da Best Pizza & Kebab", "Best Pizza & Kebab Chicken Wings Menu"),
      },
      {
        id: "chicken-mix-box",
        name: L("Chicken Mix Box", "Chicken Mix Box"),
        description: L(
          "4 nuggets + 4 asinhas + 4 tiras de frango",
          "4 nuggets + 4 wings + 4 strips",
        ),
        price: 12.50,
        image: "/images/uploaded/imagens_menu_10_organizadas/chicken_mix_box.png",
        imageAlt: L("Chicken Mix Box da Best Pizza & Kebab", "Best Pizza & Kebab Chicken Mix Box"),
      },
      {
        id: "chicken-strips-single",
        name: L("Tiras de Frango (4 peças)", "Chicken Strips (4 pcs)"),
        description: L("Tiras de frango empanadas e fritas.", "4 crispy breaded chicken strips."),
        price: 5.00,
      },
      {
        id: "chicken-nuggets-single",
        name: L("Nuggets de Frango (4 peças)", "Chicken Nuggets (4 pcs)"),
        description: L("Nuggets de frango empanados e fritos.", "4 crispy breaded chicken nuggets."),
        price: 3.99,
      },
      {
        id: "chicken-wings-single",
        name: L("Asinhas de Frango (4 peças)", "Chicken Wings (4 pcs)"),
        description: L("Asas de frango temperadas e grelhadas.", "4 seasoned grilled chicken wings."),
        price: 5.00,
        image: "/images/uploaded/imagens_menu_10_organizadas/asas_de_frango.png",
        imageAlt: L("Chicken Wings da Best Pizza & Kebab", "Best Pizza & Kebab Chicken Wings"),
      },
      {
        id: "chamuca",
        name: L("Chamuça (1 peça)", "Samosa (1 pc)"),
        description: L("Chamuça frita e estaladiça.", "Crispy fried samosa."),
        price: 1.50,
        image: "/images/uploaded/samosa_simple.jpg",
        imageAlt: L("Chamuça da Best Pizza & Kebab", "Best Pizza & Kebab Samosa"),
      },
    ],
  },
  {
    id: "dishes",
    label: L("Pratos", "Pratos"),
    items: [
      {
        id: "kebab-salada-prato",
        name: L("Salada com Kebab", "Salad with Kebab"),
        description: L("Salada de kebab e água.", "Kebab salad and water."),
        servedWith: L("água", "water"),
        price: 5.99,
        image: "/images/enhanced/07_kebab_prato_agua.png",
        imageAlt: L("Salada com Kebab da Best Pizza & Kebab", "Best Pizza & Kebab Kebab Salad"),
      },
      {
        id: "prato-kebab",
        name: L("Prato Kebab", "Kebab Plate"),
        description: L("Prato kebab e bebida.", "Kebab plate and drink."),
        servedWith: L("bebida", "a drink"),
        price: 8.99,
        image: "/images/uploaded/prato_kebab_com_bebida.webp",
        imageAlt: L("Prato Kebab com Bebida da Best Pizza & Kebab", "Best Pizza & Kebab Kebab Plate with Drink"),
      },
      {
        id: "prato-falafel",
        name: L("Prato Falafel", "Falafel Plate"),
        description: L("Prato falafel e bebida.", "Falafel plate and drink."),
        vegetarian: true,
        servedWith: L("bebida", "a drink"),
        price: 8.99,
        image: "/images/uploaded/menu_prato_de_falafel.webp",
        imageAlt: L("Menu Prato de Falafel da Best Pizza & Kebab", "Best Pizza & Kebab Falafel Plate Menu"),
      },
      {
        id: "prato-kebab-rice",
        name: L("Prato Kebab com Arroz", "Kebab Plate with Rice"),
        description: L("Prato kebab com arroz e bebida.", "Kebab plate with rice and drink."),
        servedWith: L("bebida", "a drink"),
        price: 9.99,
        image: "/images/uploaded/kebab_prato_com_arroz.webp",
        imageAlt: L("Prato Kebab com Arroz da Best Pizza & Kebab", "Best Pizza & Kebab Kebab Plate with Rice"),
      },
      {
        id: "prato-special",
        name: L("Prato Especial", "Special Plate"),
        description: L("Prato especial e bebida.", "Special plate and drink."),
        servedWith: L("bebida", "a drink"),
        price: 10.50,
        image: "/images/uploaded/prato_kebab_com_bebida.webp",
        imageAlt: L("Prato Especial da Best Pizza & Kebab", "Best Pizza & Kebab Special Plate"),
      },
    ],
  },
  {
    id: "pizza",
    label: L("Pizzas", "Pizzas"),
    intro: L("Disponível em pequena e grande.", "Available in small and large."),
    items: [
      {
        id: "margherita",
        name: L("Pizza Margherita", "Margherita Pizza"),
        description: L("Molho de tomate, queijo mozzarella e orégãos.", "Tomato sauce, mozzarella cheese and oregano."),
        vegetarian: true,
        price: null,
        sizes: [
          { id: "small", label: L("Pequena", "Small"), price: 7.99 },
          { id: "large", label: L("Grande (Big)", "Large (Big)"), price: 9.99 },
        ],
        image: "/images/uploaded/imagens_menu_10_organizadas/margherita.png",
        imageAlt: L("Pizza Margherita da Best Pizza & Kebab", "Best Pizza & Kebab Margherita Pizza"),
      },
      {
        id: "tuna",
        name: L("Pizza de Atum", "Tuna Pizza"),
        description: L(
          "Molho de tomate, queijo e atum.",
          "Tomato sauce, cheese and tuna.",
        ),
        price: null,
        sizes: [
          { id: "small", label: L("Pequena", "Small"), price: 7.99 },
          { id: "large", label: L("Grande (Big)", "Large (Big)"), price: 10.50 },
        ],
        image: "/images/uploaded/imagens_menu_10_organizadas/atum.png",
        imageAlt: L("Pizza de Atum da Best Pizza & Kebab", "Best Pizza & Kebab Tuna Pizza"),
      },
      {
        id: "special-kebab",
        name: L("Pizza Special Kebab", "Special Kebab Pizza"),
        description: L(
          "Molho de tomate, cebola, kebab e mozzarella.",
          "Tomato sauce, onion, kebab and mozzarella.",
        ),
        price: null,
        sizes: [
          { id: "small", label: L("Pequena", "Small"), price: 7.99 },
          { id: "large", label: L("Grande (Big)", "Large (Big)"), price: 10.99 },
        ],
        image: "/images/uploaded/pizza_kebab_special.png",
        imageAlt: L("Pizza Kebab Special da Best Pizza & Kebab", "Best Pizza & Kebab Pizza Kebab Special"),
      },
      {
        id: "chicken-pizza",
        name: L("Pizza de Frango", "Chicken Pizza"),
        description: L(
          "Molho de tomate, frango, cebola, azeitonas, cogumelos e mozzarella.",
          "Tomato sauce, chicken, onion, olives, mushrooms and mozzarella.",
        ),
        price: null,
        sizes: [
          { id: "small", label: L("Pequena", "Small"), price: 7.99 },
          { id: "large", label: L("Grande", "Large"), price: 12.50 },
        ],
        image: "/images/uploaded/chicken_pizza_simple.jpg",
        imageAlt: L("Pizza de Frango da Best Pizza & Kebab", "Best Pizza & Kebab Chicken Pizza"),
      },
      {
        id: "vegetarian",
        name: L("Pizza Vegetariana", "Vegetarian Pizza"),
        description: L(
          "Molho de tomate, pimentas, cebola, azeitona, cogumelos e mussarella.",
          "Tomato sauce, peppers, onion, olives, mushrooms and mozzarella.",
        ),
        vegetarian: true,
        price: null,
        sizes: [
          { id: "small", label: L("Pequena", "Small"), price: 7.99 },
          { id: "large", label: L("Grande (Big)", "Large (Big)"), price: 10.50 },
        ],
        image: "/images/uploaded/vegetarian_pizza_simple.jpg",
        imageAlt: L("Pizza Vegetariana da Best Pizza & Kebab", "Best Pizza & Kebab Vegetarian Pizza"),
      },
      {
        id: "doner-chicken",
        name: L("Pizza Döner", "Doner Pizza"),
        description: L(
          "Molho de tomate, queijo, kebab e cebola.",
          "Tomato sauce, cheese, kebab and onion.",
        ),
        price: null,
        sizes: [
          { id: "small", label: L("Pequena", "Small"), price: 8.99 },
          { id: "large", label: L("Grande (Big)", "Large (Big)"), price: 10.99 },
        ],
        image: "/images/uploaded/imagens_menu_10_organizadas/doner_chicken.png",
        imageAlt: L("Pizza Döner da Best Pizza & Kebab", "Best Pizza & Kebab Doner Pizza"),
      },
      {
        id: "onion-pizza",
        name: L("Pizza de Cebola", "Onion Pizza"),
        description: L("Molho de tomate, queijo e cebola.", "Tomato sauce, cheese and onion."),
        vegetarian: true,
        price: null,
        sizes: [
          { id: "small", label: L("Pequena", "Small"), price: 6.99 },
          { id: "large", label: L("Grande", "Large"), price: 10.99 },
        ],
        image: "/images/uploaded/imagens_menu_10_organizadas/cebola.png",
        imageAlt: L("Pizza de Cebola da Best Pizza & Kebab", "Best Pizza & Kebab Onion Pizza"),
      },
      {
        id: "pepperoni-lover",
        name: L("Pizza Pepperoni Lover", "Pepperoni Lover Pizza"),
        description: L(
          "Molho de tomate, mozzarella 100% e pepperoni.",
          "Tomato sauce, 100% mozzarella and pepperoni.",
        ),
        price: null,
        sizes: [
          { id: "small", label: L("Pequena", "Small"), price: 7.99 },
          { id: "large", label: L("Grande (Big)", "Large (Big)"), price: 10.99 },
        ],
        image: "/images/uploaded/imagens_menu_10_organizadas/pepperoni.png",
        imageAlt: L("Pizza Pepperoni Lover da Best Pizza & Kebab", "Best Pizza & Kebab Pepperoni Lover Pizza"),
      },
      {
        id: "frutti-di-mare",
        name: L("Pizza Frutti Di Mare", "Frutti Di Mare Pizza"),
        description: L("Frutti di mare.", "Seafood pizza."),
        price: null,
        sizes: [
          { id: "small", label: L("Pequena", "Small"), price: 9.99 },
          { id: "large", label: L("Grande", "Large"), price: 14.99 },
        ],
        image: "/images/uploaded/imagens_menu_10_organizadas/frutti_di_mare.png",
        imageAlt: L("Pizza Frutti Di Mare da Best Pizza & Kebab", "Best Pizza & Kebab Frutti Di Mare Pizza"),
      },
      {
        id: "pizza-salmao",
        name: L("Pizza Salmão", "Salmon Pizza"),
        description: L("Salmão, espinafres e cebola.", "Salmon, spinach and onion."),
        price: null,
        sizes: [
          { id: "small", label: L("Pequena", "Small"), price: 9.99 },
          { id: "large", label: L("Grande", "Large"), price: 14.99 },
        ],
        image: "/images/uploaded/salmon_pizza_simple.jpg",
        imageAlt: L("Pizza Salmão da Best Pizza & Kebab", "Best Pizza & Kebab Salmon Pizza"),
      },
      {
        id: "pizza-salami",
        name: L("Pizza Salame", "Salami Pizza"),
        description: L("Molho de tomate, salami, queijo e orégãos.", "Tomato sauce, salami, cheese and oregano."),
        price: null,
        sizes: [
          { id: "small", label: L("Pequena", "Small"), price: 7.99 },
          { id: "large", label: L("Grande (Big)", "Large (Big)"), price: 10.99 },
        ],
        image: "/images/uploaded/imagens_menu_10_organizadas/pepperoni.png",
        imageAlt: L("Pizza Salame da Best Pizza & Kebab", "Best Pizza & Kebab Salami Pizza"),
      },
      {
        id: "pizza-4-cheese",
        name: L("Pizza 4 Queijos", "4 Cheese Pizza"),
        description: L("Molho de tomate e seleção de 4 queijos.", "Tomato sauce and 4 cheese selection."),
        vegetarian: true,
        price: null,
        sizes: [
          { id: "small", label: L("Pequena", "Small"), price: 8.99 },
          { id: "large", label: L("Grande", "Large"), price: 13.99 },
        ],
        image: "/images/uploaded/four_cheese_pizza_simple.jpg",
        imageAlt: L("Pizza 4 Queijos da Best Pizza & Kebab", "Best Pizza & Kebab 4 Cheese Pizza"),
      },
    ],
  },
  {
    id: "drinks",
    label: L("Bebidas", "Bebidas"),
    items: [
      { id: "pedras-limao", name: L("Pedras Limão (330 ml)", "Lemon Sparkling Water (330 ml)"), price: 1.50 },
      { id: "nestea-manga-ananas", name: L("Nestea Manga e Ananás (330 ml)", "Mango & Pineapple Nestea (330 ml)"), price: 1.50 },
      { id: "nestea-limao", name: L("Nestea Limão (330 ml)", "Lemon Nestea (330 ml)"), price: 1.50 },
      { id: "sprite", name: L("Sprite (330 ml)", "Sprite (330 ml)"), price: 1.50 },
      { id: "coca-cola-zero", name: L("Coca-Cola Zero (330 ml)", "Coca-Cola Zero (330 ml)"), price: 1.50 },
      { id: "coca-cola-original", name: L("Coca-Cola (330 ml)", "Coca-Cola (330 ml)"), description: L("Sabor original.", "Original flavor."), price: 1.50 },
      { id: "fanta", name: L("Fanta Laranja (330 ml)", "Fanta Orange (330 ml)"), price: 1.50 },
      { id: "icetea-limao", name: L("Ice Tea Limão (330 ml)", "Lemon Ice Tea (330 ml)"), description: L("Chá gelado com sabor a limão.", "Lemon flavored iced tea."), price: 1.50 },
      { id: "icetea-manga", name: L("Ice Tea Manga (330 ml)", "Mango Ice Tea (330 ml)"), price: 1.50 },
      { id: "icetea-pessego", name: L("Ice Tea Pêssego (330 ml)", "Peach Ice Tea (330 ml)"), price: 1.50 },
      { id: "sumol-laranja", name: L("Sumol Laranja (330 ml)", "Sumol Orange (330 ml)"), price: 1.50 },
      { id: "sumol-ananas", name: L("Sumol Ananás (330 ml)", "Sumol Pineapple (330 ml)"), price: 1.50 },
      { id: "agua-natural", name: L("Água Natural (50 ml)", "Natural Water (50 ml)"), description: L("Água natural.", "Natural water."), price: 1.00 },
      { id: "agua-com-gas", name: L("Água com Gás", "Sparkling Water"), price: 1.50 },
      { id: "cafe", name: L("Café", "Coffee"), price: 0.80 },
      { id: "cha", name: L("Chá", "Tea"), price: 1.00 },
      { id: "red-bull", name: L("Red Bull (250 ml)", "Red Bull (250 ml)"), price: 2.50 },
      { id: "extra-power", name: L("Extra Power Energy Drink (250 ml)", "Extra Power Energy Drink (250 ml)"), price: 1.99 },
    ],
  },
  {
    id: "beers",
    label: L("Cervejas e Vinhos", "Beers & Wines"),
    items: [
      { id: "super-bock", name: L("Super Bock (330 ml)", "Super Bock Beer (330 ml)"), price: 2.00 },
      { id: "somersby-apple", name: L("Somersby Apple", "Somersby Apple Cider"), price: 2.50 },
      { id: "vinho-tinto-copo", name: L("Vinho Tinto (Copo)", "Red Wine (Glass)"), price: 3.50 },
      { id: "vinho-branco-copo", name: L("Vinho Branco (Copo)", "White Wine (Glass)"), price: 3.50 },
      { id: "terras-de-alleu", name: L("Vinho Terras De Alleu (75 cl)", "Terras De Alleu Wine (75 cl)"), price: 7.99 },
    ],
  },
  {
    id: "extras",
    label: L("Extras e Embalagens", "Extras & Packaging"),
    items: [
      { id: "molho-adicional", name: L("Molho Adicional (1 peça)", "Additional Sauce (1 pc)"), description: L("Dose individual de molho adicional.", "Individual portion of extra sauce."), price: 0.50 },
      { id: "extra-carne", name: L("Extra Carne", "Extra Meat"), description: L("Porção extra de carne.", "Extra portion of meat."), price: 2.00 },
      { id: "salada-mista", name: L("Salada Mista", "Mixed Salad"), description: L("Mistura de folhas e legumes variados.", "Mixed salad leaves and vegetables."), price: 2.00 },
      { id: "batata-frita", name: L("Batatas Fritas", "French Fries"), description: L("Porção de batatas cortadas e fritas.", "Portion of crispy french fries."), price: 3.99 },
      { id: "mozzarella-stick", name: L("Mozzarella Sticks", "Mozzarella sticks (7 pcs)"), description: L("Palitos de mozzarella panados.", "Crispy breaded mozzarella sticks."), price: 7.99 },
      { id: "rolinho-primavera", name: L("Rolinho Primavera (9 peças)", "Spring rolls (9 pcs)"), description: L("Rolinhos de primavera crocantes.", "Crispy spring rolls."), price: 7.99 },
      { id: "embalagem-transporte", name: L("Embalagem de Utilização Única", "Single-Use Container"), description: L("Embalagem para transporte de alimentos.", "Food takeaway container."), price: 0.37 },
      { id: "saco-transporte", name: L("Saco", "Bag"), description: L("Saco para transporte do seu pedido.", "Bag for your order."), price: 0.10 },
    ],
  },
];

export const seo = {
  title: L(
    "Best Kebab & Pizza | Kebab, Pizza e Takeaway no Porto",
    "Best Kebab & Pizza | Kebab, Pizza & Takeaway in Porto"
  ),
  description: L(
    "Best Kebab & Pizza em São Roque da Lameira, Campanhã, Porto. Kebab, pizza, hambúrgueres e falafel para takeaway; entrega via Bolt Food e Uber Eats. Telefone: +351 920 163 613.",
    "Best Kebab & Pizza in São Roque da Lameira, Campanhã, Porto. Kebab, pizza, burgers and falafel for takeaway; delivery via Bolt Food and Uber Eats. Phone: +351 920 163 613."
  ),
  canonical: "https://bestpizzakebab.pt/",
};

function interpolate(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}

export function fill(localized: Localized, vars: Record<string, string>): Localized {
  return {
    pt: interpolate(localized.pt, vars),
    en: interpolate(localized.en, vars),
  };
}

export function hoursForDay(day: number) {
  return day === 5 ? HOURS_FRIDAY : HOURS_DEFAULT;
}

function toMinutes(hhmm: string, isCloseTime = false) {
  const [h, m] = hhmm.split(":").map(Number);
  if (isCloseTime && h === 0 && m === 0) {
    return 24 * 60; // Midnight (00:00) as closing time = 1440 minutes
  }
  return h * 60 + m;
}

const WEEKDAY_SHORT: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** Clock in Europe/Lisbon — DST-safe via Intl. */
export function lisbonClock(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  const day = WEEKDAY_SHORT[get("weekday")] ?? 0;
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  return { day, minutes };
}

export type HoursStatus = {
  isOpen: boolean;
  todayOpen: string;
  todayClose: string;
  /** True when closed but still before today's opening time. */
  opensLaterToday: boolean;
  nextOpenDay: number;
  nextOpenTime: string;
};

export function getHoursStatus(date: Date): HoursStatus {
  const { day, minutes } = lisbonClock(date);
  const today = hoursForDay(day);
  const openM = toMinutes(today.open, false);
  const closeM = toMinutes(today.close, true);
  const isOpen = minutes >= openM && minutes < closeM;

  if (isOpen) {
    return {
      isOpen: true,
      todayOpen: today.open,
      todayClose: today.close,
      opensLaterToday: false,
      nextOpenDay: day,
      nextOpenTime: today.open,
    };
  }

  if (minutes < openM) {
    return {
      isOpen: false,
      todayOpen: today.open,
      todayClose: today.close,
      opensLaterToday: true,
      nextOpenDay: day,
      nextOpenTime: today.open,
    };
  }

  const nextDay = (day + 1) % 7;
  const next = hoursForDay(nextDay);
  return {
    isOpen: false,
    todayOpen: today.open,
    todayClose: today.close,
    opensLaterToday: false,
    nextOpenDay: nextDay,
    nextOpenTime: next.open,
  };
}

export function jsonLd() {
  const domain = seo.canonical.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${domain}/#restaurant`,
    name: restaurant.name,
    legalName: restaurant.name,
    url: domain,
    image: [
      `${domain}${restaurant.photos.hero}`,
      `${domain}${restaurant.photos.pizza}`,
      `${domain}${restaurant.photos.kebab}`,
      `${domain}${restaurant.photos.interiorRefeicao}`,
    ],
    servesCuisine: restaurant.cuisine,
    priceRange: "€",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Campanhã, Porto"
    },
    telephone: restaurant.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address.street,
      addressLocality: restaurant.address.locality,
      addressRegion: restaurant.address.region,
      postalCode: restaurant.address.postalCode,
      addressCountry: restaurant.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurant.geo.lat,
      longitude: restaurant.geo.lng,
    },
    openingHours: ["Sa-Th 11:00-00:00", "Fr 15:30-00:00"],
    openingHoursSpecification: restaurant.hoursNotice.map((block) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: block.schemaDays,
      opens: block.open,
      closes: block.close,
    })),
    hasMenu: `${domain}/#menu`,
    hasMap: maps.search,
    sameAs: [
      boltFood.storeUrl,
      uberEats.storeUrl,
      maps.search
    ],
    potentialAction: [
      {
        "@type": "OrderAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": boltFood.storeUrl,
          "inLanguage": ["pt", "en"],
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        },
        "deliveryMethod": ["http://purl.org/goodrelations/v1#DeliveryModeDirectOutbound"]
      },
      {
        "@type": "OrderAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": uberEats.storeUrl,
          "inLanguage": ["pt", "en"],
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        },
        "deliveryMethod": ["http://purl.org/goodrelations/v1#DeliveryModeDirectOutbound"]
      }
    ]
  };
}
