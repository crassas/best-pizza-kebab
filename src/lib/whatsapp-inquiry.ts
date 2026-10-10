import { restaurant } from "@/lib/restaurant";

export type InquiryTopic = "burgers" | "kebab" | "takeaway" | "general";

const INQUIRY_MESSAGES: Record<InquiryTopic, { pt: string; en: string }> = {
  burgers: {
    pt: "Olá! Vi o vosso site da Best Pizza & Kebab. Que hambúrgueres têm disponíveis hoje? Posso encomendar para recolher no balcão?",
    en: "Hello! I found your Best Pizza & Kebab website. Which burgers are available today? Can I order for pickup?",
  },
  kebab: {
    pt: "Olá! Vi o vosso site da Best Pizza & Kebab. O que leva o kebab? Podem explicar as opções de molhos e ingredientes?",
    en: "Hello! I found your Best Pizza & Kebab website. What is in your kebab? Could you explain the sauce and ingredient options?",
  },
  takeaway: {
    pt: "Olá! Vi o vosso site da Best Pizza & Kebab. Aceitam encomendas pelo WhatsApp para recolha no balcão? Como funciona e quanto tempo costuma demorar?",
    en: "Hello! I found your Best Pizza & Kebab website. Can I order by WhatsApp for pickup? How does it work and how long does it normally take?",
  },
  general: {
    pt: "Olá! Vi o vosso site da Best Pizza & Kebab e queria esclarecer uma dúvida sobre o menu ou fazer um pedido para recolha. Podem ajudar?",
    en: "Hello! I found your Best Pizza & Kebab website and have a question about the menu or a pickup order. Can you help?",
  },
};

/** Opening WhatsApp prepares a message; the visitor still needs to tap Send. */
export function getInquiryWhatsAppUrl(
  configuredNumber: string | undefined,
  lang: "pt" | "en",
  topic: InquiryTopic,
): string {
  const phone = (configuredNumber || restaurant.whatsapp).replace(/\D/g, "") || restaurant.whatsapp;
  return `https://wa.me/${phone}?text=${encodeURIComponent(INQUIRY_MESSAGES[topic][lang])}`;
}
