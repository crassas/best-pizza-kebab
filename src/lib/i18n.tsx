import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { seo, type Lang, type Localized } from "@/lib/restaurant";

const STORAGE_KEY = "bpk-lang";

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (value: Localized) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function applyDocumentLang(lang: Lang) {
  document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
  document.title = seo.title[lang];

  const description = seo.description[lang];
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", seo.title[lang]);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", description);

  const pageUrl =
    lang === "en"
      ? "https://bestpizzaandkebab.pt/?lang=en"
      : "https://bestpizzaandkebab.pt/";

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", pageUrl);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", pageUrl);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    try {
      const requested = new URLSearchParams(window.location.search).get("lang");
      if (requested === "pt" || requested === "en") {
        setLangState(requested);
        return;
      }

      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "pt" || saved === "en") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    applyDocumentLang(lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);

      const url = new URL(window.location.href);
      if (next === "en") {
        url.searchParams.set("lang", "en");
      } else {
        url.searchParams.delete("lang");
      }
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback((value: Localized) => value[lang], [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
