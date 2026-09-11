import { createFileRoute } from "@tanstack/react-router";
import { ActionBar } from "@/components/site/action-bar";
import { BoltNotice } from "@/components/site/bolt-notice";
import { Featured } from "@/components/site/featured";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { HowToOrder } from "@/components/site/how-to-order";
import { JsonLd } from "@/components/site/json-ld";
import { Location } from "@/components/site/location";
import { MenuSection } from "@/components/site/menu-section";
import { Reviews } from "@/components/site/reviews";
import { useI18n } from "@/lib/i18n";
import { copy } from "@/lib/restaurant";
import { scrollToElement } from "@/lib/scroll";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t } = useI18n();

  return (
    <>
      <JsonLd />
      <a
        href="#menu"
        onClick={(e) => {
          e.preventDefault();
          scrollToElement("menu", 70);
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-orange focus:px-4 focus:py-2 focus:text-ink"
      >
        {t(copy.skip)}
      </a>
      <Header />
      <main className="pb-16 md:pb-0">
        <Hero />
        <BoltNotice />
        <Featured />
        <MenuSection />
        <HowToOrder />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <ActionBar />
    </>
  );
}
