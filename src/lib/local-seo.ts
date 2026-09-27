export type LocalizedText = { pt: string; en: string };

const L = (pt: string, en: string): LocalizedText => ({ pt, en });

export const localAreas = [
  "São Roque da Lameira",
  "Campanhã",
  "Cartes",
  "Falcão",
  "Cerco",
  "Corujeira",
] as const;

export const nearbyLocalAnchors = [
  {
    name: "Casa São Roque",
    detail: L(
      "Na própria Rua de São Roque da Lameira, uma referência local para quem procura comida nesta zona.",
      "On Rua de São Roque da Lameira itself, a useful local landmark when looking for food nearby.",
    ),
  },
  {
    name: "Alameda de Cartes",
    detail: L(
      "Zona do Mercadona e da Piscina Municipal de Cartes, a poucos minutos de São Roque da Lameira.",
      "Area around Mercadona and Piscina Municipal de Cartes, a short distance from São Roque da Lameira.",
    ),
  },
  {
    name: "Falcão e Cerco",
    detail: L(
      "O Best Kebab & Pizza fica no eixo local entre São Roque, Falcão e Cerco, em Campanhã.",
      "Best Kebab & Pizza sits on the local São Roque–Falcão–Cerco axis in Campanhã.",
    ),
  },
  {
    name: "Corujeira",
    detail: L(
      "Outra referência próxima em Campanhã para pesquisas locais de kebab, pizza e takeaway.",
      "Another nearby Campanhã reference for local kebab, pizza and takeaway searches.",
    ),
  },
] as const;

export const localFaq = [
  {
    question: L(
      "Onde fica o Best Kebab & Pizza em São Roque da Lameira?",
      "Where is Best Kebab & Pizza in São Roque da Lameira?",
    ),
    answer: L(
      "Fica na Rua de São Roque da Lameira 2346, 4350-306 Porto, em Campanhã. A Casa São Roque e a zona da Alameda de Cartes são referências próximas.",
      "It is at Rua de São Roque da Lameira 2346, 4350-306 Porto, in Campanhã. Casa São Roque and the Alameda de Cartes area are nearby reference points.",
    ),
  },
  {
    question: L(
      "Há kebab e pizza perto de São Roque, Cartes, Falcão ou Cerco?",
      "Is there kebab and pizza near São Roque, Cartes, Falcão or Cerco?",
    ),
    answer: L(
      "Sim. O restaurante fica em São Roque da Lameira e serve quem está nesta zona de Campanhã, incluindo Cartes, Falcão, Cerco e Corujeira.",
      "Yes. The restaurant is in São Roque da Lameira and serves this part of Campanhã, including Cartes, Falcão, Cerco and Corujeira.",
    ),
  },
  {
    question: L(
      "Posso pedir takeaway em Campanhã?",
      "Can I order takeaway in Campanhã?",
    ),
    answer: L(
      "Sim. Podes escolher no menu, contactar o restaurante e levantar o pedido na Rua de São Roque da Lameira 2346. Também existem opções de entrega através das plataformas indicadas no site.",
      "Yes. You can choose from the menu, contact the restaurant and collect your order at Rua de São Roque da Lameira 2346. Delivery options are also available through the platforms shown on the site.",
    ),
  },
  {
    question: L(
      "Existem opções Halal?",
      "Are Halal options available?",
    ),
    answer: L(
      "O restaurante assinala opções Halal. Confirma no balcão quais os artigos abrangidos e qualquer questão sobre fornecedor ou certificação.",
      "The restaurant indicates Halal options. Ask at the counter which items are covered and for any supplier or certification details.",
    ),
  },
] as const;
