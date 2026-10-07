import { MapPin, Navigation, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { maps } from "@/lib/restaurant";
import { localAreas, localFaq, nearbyLocalAnchors } from "@/lib/local-seo";
import { trackEvent } from "@/lib/analytics";

export function Hyperlocal() {
  const { lang } = useI18n();
  const isPt = lang === "pt";

  return (
    <section
      id="zona"
      className="border-b-4 border-black bg-cream text-ink [content-visibility:auto] [contain-intrinsic-size:760px]"
      aria-labelledby="zona-title"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <span className="badge-stamp bg-brand-yellow px-3 py-1 text-[11px] text-black">
              <Search className="mr-1 size-3.5" />
              {isPt ? "SÃO ROQUE · CAMPANHÃ" : "SÃO ROQUE · CAMPANHÃ"}
            </span>

            <h2
              id="zona-title"
              className="mt-4 font-display text-4xl uppercase leading-[0.94] tracking-tight sm:text-5xl"
            >
              {isPt ? "Kebab e pizza mesmo na tua zona." : "Kebab and pizza right in your area."}
            </h2>

            <p className="mt-4 max-w-xl text-sm font-semibold leading-relaxed text-ink/75 sm:text-base">
              {isPt
                ? "Estamos na Rua de São Roque da Lameira 2346. Para quem pesquisa perto de São Roque, Cartes, Falcão, Cerco ou Corujeira, esta é a referência local do Best Pizza & Kebab em Campanhã."
                : "We are at Rua de São Roque da Lameira 2346. For anyone searching around São Roque, Cartes, Falcão, Cerco or Corujeira, this is the local Best Pizza & Kebab reference in Campanhã."}
            </p>

            <div className="mt-5 flex flex-wrap gap-2" aria-label={isPt ? "Zonas próximas" : "Nearby areas"}>
              {localAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border-2 border-black bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-wide shadow-[2px_2px_0_#000]"
                >
                  {area}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("directions_click", { from: "hyperlocal" })}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-3 border-black bg-brand-red px-5 py-3 text-sm font-black uppercase tracking-wider text-white shadow-fastfood transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                <Navigation className="size-4" />
                {isPt ? "Traçar rota até São Roque" : "Get directions to São Roque"}
              </a>
              <a
                href="/kebab-porto/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-3 border-black bg-white px-5 py-3 text-sm font-black uppercase tracking-wider text-black shadow-fastfood transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                <Search className="size-4 text-brand-red" />
                {isPt ? "Kebab no Porto: guia" : "Kebab in Porto: guide"}
              </a>
              <a
                href="/pizza-campanha/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-3 border-black bg-brand-yellow px-5 py-3 text-sm font-black uppercase tracking-wider text-black shadow-fastfood transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                <Search className="size-4 text-brand-red" />
                {isPt ? "Pizza em Campanhã" : "Pizza in Campanhã"}
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {nearbyLocalAnchors.map((anchor, index) => (
              <article
                key={anchor.name}
                className="rounded-xl border-3 border-black bg-white p-4 shadow-[4px_4px_0_#000]"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md border-2 border-black bg-brand-yellow font-display text-lg">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl uppercase leading-none">{anchor.name}</h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-ink/70">
                      {anchor.detail[lang]}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-9 border-t-3 border-black pt-7">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="size-5 text-brand-red" />
            <h2 className="font-display text-3xl uppercase">
              {isPt ? "Respostas rápidas sobre a zona" : "Quick local answers"}
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {localFaq.map((item) => (
              <article key={item.question.pt} className="rounded-xl border-2 border-line-cream bg-white p-4">
                <h3 className="text-sm font-black leading-snug">{item.question[lang]}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-ink/70">{item.answer[lang]}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
