import { Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { maps } from "@/lib/restaurant";

export function Reviews() {
  const { t } = useI18n();

  const reviews = [
    {
      id: "hugo",
      text: "Comida e atendimento excelentes. O dono é muito gentil e simpático.",
      author: "Hugo Nicha",
    },
    {
      id: "tetyana",
      text: "Excelente lugar para jantares saborosos e batatas fritas bem temperadas. Atendimento muito simpático, bons preços, ótimo para crianças.",
      author: "Tetyana Bilyachenko",
    },
  ];

  return (
    <section id="avaliacoes" className="scroll-mt-[calc(4rem+env(safe-area-inset-top))] border-t border-line bg-surface px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col">
          <div className="border-l-2 border-orange pl-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
            {t({ pt: "Avaliações no Google", en: "Google reviews" })}
          </div>
          <h2 className="mt-1 font-display text-2xl text-cream sm:text-3xl">
            {t({ pt: "O que dizem os clientes", en: "What customers say" })}
          </h2>
          <p className="mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-muted">
            {t({
              pt: "Comida, atendimento e simpatia — algumas opiniões deixadas por quem já passou por cá.",
              en: "Food, service and friendly hospitality — a few comments from people who have already visited us.",
            })}
          </p>

          <div className="mt-6 flex flex-col gap-1 md:mt-8">
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-cream">4,9</span>
              <div className="flex flex-col gap-0.5">
                <div className="flex text-orange">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  {t({ pt: "149 avaliações no Google", en: "149 Google reviews" })}
                </p>
              </div>
            </div>
          </div>

          {maps.search && (
            <a
              href={maps.search}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange transition-colors hover:text-orange-hot md:mt-auto"
            >
              {t({ pt: "Ver todas no Google ↗", en: "View all on Google ↗" })}
            </a>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between rounded-xs border border-line bg-bg p-5 sm:p-6"
            >
              <p className="font-serif text-sm sm:text-[15px] italic leading-relaxed text-cream/90">
                “{review.text}”
              </p>
              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wide text-cream uppercase">{review.author}</p>
                  <p className="text-[11px] font-semibold text-muted">Google Review</p>
                </div>
                <div className="flex text-orange">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
