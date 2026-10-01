import { jsonLd, maps, restaurant, seo } from "@/lib/restaurant";
import { localAreas, localFaq } from "@/lib/local-seo";

export function JsonLd() {
  const baseRestaurant = jsonLd() as Record<string, unknown>;
  const { ["@context"]: _context, ...restaurantNode } = baseRestaurant;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...restaurantNode,
        name: restaurant.name,
        alternateName: ["Best Kebab & Pizza", "Best Pizza and Kebab Porto"],
        address: {
          ...(restaurantNode.address as Record<string, unknown>),
          postalCode: restaurant.address.postalCode,
        },
        areaServed: localAreas.map((name) => ({
          "@type": "Place",
          name,
        })),
        hasMap: maps.search,
        hasMenu: "https://bestpizzaandkebab.pt/#menu-quick",
        sameAs: [
          ...((restaurantNode.sameAs as string[] | undefined) ?? []).filter(
            (url) => !url.includes("google.com/maps"),
          ),
          maps.search,
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://bestpizzaandkebab.pt/#webpage",
        url: seo.canonical,
        name: seo.title.pt,
        description: seo.description.pt,
        inLanguage: "pt-PT",
        about: { "@id": "https://bestpizzaandkebab.pt/#restaurant" },
        spatialCoverage: localAreas.map((name) => ({
          "@type": "Place",
          name,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": "https://bestpizzaandkebab.pt/#local-faq",
        mainEntity: localFaq.map((item) => ({
          "@type": "Question",
          name: item.question.pt,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer.pt,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
