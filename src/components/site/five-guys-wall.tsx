import { Star, Award, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CheckeredRibbon } from "@/components/site/marquee-banner";
import { maps } from "@/lib/restaurant";

export function FiveGuysWall() {
  const { lang } = useI18n();
  const isPt = lang === "pt";

  return (
    <section
      id="avaliacoes"
      className="relative overflow-hidden border-b-4 border-black bg-brand-black py-10 text-cream sm:py-12 [content-visibility:auto] [contain-intrinsic-size:420px]"
    >
      <div className="absolute inset-x-0 top-0">
        <CheckeredRibbon height="h-1 sm:h-3" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="badge-stamp -rotate-1 bg-brand-yellow px-4 py-1.5 text-xs text-black sm:text-sm">
            <Award className="mr-1.5 size-4 fill-black text-black" />
            <span>{isPt ? "AVALIAÇÕES NO GOOGLE" : "GOOGLE REVIEWS"}</span>
          </div>

          <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl">
            {isPt ? "Avaliações reais" : "Real reviews"}
          </h2>

          <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-cream/75 sm:text-base">
            {isPt
              ? "Lê o que outros clientes escreveram no Google ou, depois da tua visita, deixa a tua própria avaliação."
              : "Read what other customers wrote on Google or, after your visit, leave your own review."}
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-lg border-3 border-black bg-brand-red px-5 py-3 shadow-fastfood">
            <div className="flex text-brand-yellow">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-brand-yellow sm:size-5" />
              ))}
            </div>
            <div className="border-l-2 border-white/40 pl-3 text-left">
              <span className="block font-display text-2xl leading-none text-white sm:text-3xl">
                4.9 / 5.0
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-yellow sm:text-[11px]">
                Google Reviews
              </span>
            </div>
          </div>

          <div className="mt-5 grid w-full max-w-lg gap-3 sm:grid-cols-2">
            <a
              href={maps.readReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-3 border-black bg-white px-4 py-3 text-xs font-black uppercase tracking-wider text-black shadow-fastfood transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              {isPt ? "Ler avaliações" : "Read reviews"}
              <ExternalLink className="size-4" />
            </a>
            <a
              href={maps.writeReview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-3 border-black bg-brand-yellow px-4 py-3 text-xs font-black uppercase tracking-wider text-black shadow-fastfood transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              {isPt ? "Deixar uma avaliação" : "Leave a review"}
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 hidden sm:block">
        <CheckeredRibbon height="h-3" />
      </div>
    </section>
  );
}
