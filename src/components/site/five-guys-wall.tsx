import { Star, ExternalLink, Award, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { googleReviewLinks, maps } from "@/lib/restaurant";
import { CheckeredRibbon } from "@/components/site/marquee-banner";

export function FiveGuysWall() {
  const { lang } = useI18n();
  const isPt = lang === "pt";
  const reviewLinks = googleReviewLinks.slice(0, 4);

  return (
    <section id="avaliacoes" className="relative bg-brand-black text-cream py-16 sm:py-20 border-b-4 border-black overflow-hidden [content-visibility:auto] [contain-intrinsic-size:900px]">
      <div className="absolute top-0 inset-x-0"><CheckeredRibbon height="h-1 sm:h-4" /></div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="badge-stamp bg-brand-yellow text-black px-4 py-1.5 text-xs sm:text-sm mb-4 -rotate-1"><Award className="size-4 fill-black text-black mr-1.5" /><span>{isPt ? "AVALIAÇÕES NO GOOGLE" : "GOOGLE REVIEWS"}</span></div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-none">{isPt ? "A Parede da Fama" : "Wall of Fame"}</h2>
          <p className="mt-3 text-base sm:text-lg text-cream/80 max-w-xl font-medium">{isPt ? "Consulte as avaliações reais do Best Kebab & Pizza diretamente no Google Maps." : "Open real Best Kebab & Pizza customer reviews directly on Google Maps."}</p>
          <div className="mt-6 flex items-center gap-3 rounded-lg border-3 border-black bg-brand-red px-6 py-3.5 shadow-fastfood rotate-1">
            <div className="flex text-brand-yellow">{[...Array(5)].map((_, i) => (<Star key={i} className="size-5 fill-brand-yellow" />))}</div>
            <div className="text-left border-l-2 border-white/40 pl-3"><span className="block font-display text-2xl sm:text-3xl text-white leading-none">4.9 / 5.0</span><span className="text-[11px] font-black text-brand-yellow uppercase tracking-wider">Google Maps</span></div>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviewLinks.map((review, idx) => (
            <a key={review.id} href={review.url} target="_blank" rel="noopener noreferrer" className="relative flex min-h-52 flex-col justify-between rounded-xl border-4 border-black bg-surface-card p-5 shadow-fastfood fastfood-card group overflow-hidden hover:border-brand-yellow transition-colors" aria-label={review.label[lang]}>
              <div className="hidden sm:block checker-red-white sm:h-2 w-full border-b-2 border-black sm:-mt-5 sm:-mx-5 mb-4 sm:w-[calc(100%+2.5rem)]" />
              <div><div className="flex items-center justify-between gap-2 mb-4"><span className="badge-stamp bg-brand-yellow text-black text-[10px] px-2 py-0.5 -rotate-1">{isPt ? `AVALIAÇÃO ${idx + 1}` : `REVIEW ${idx + 1}`}</span><CheckCircle2 className="size-4 text-bolt" /></div><p className="font-display text-2xl uppercase tracking-wide text-white leading-tight">Google Maps</p><p className="mt-2 text-sm font-medium text-cream/80 leading-relaxed">{isPt ? "Abrir esta avaliação diretamente no Google para consultar o texto original." : "Open this review directly on Google to read the original text."}</p></div>
              <div className="mt-5 pt-3 border-t-2 border-line flex items-center justify-between text-brand-yellow"><span className="text-[11px] font-black uppercase tracking-wider">{isPt ? "Ver avaliação real" : "View real review"}</span><ExternalLink className="size-4" /></div>
            </a>
          ))}
        </div>
        <div className="mt-10 text-center"><a href={maps.search} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border-2 border-black bg-surface hover:bg-raised px-6 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-brand-yellow shadow-fastfood transition-all"><span>{isPt ? "Ver Todas as Avaliações no Google Maps" : "View All Reviews on Google Maps"}</span><ExternalLink className="size-4" /></a></div>
      </div>
      <div className="hidden sm:block absolute bottom-0 inset-x-0"><CheckeredRibbon height="h-4" /></div>
    </section>
  );
}
