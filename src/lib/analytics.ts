/**
 * Lightweight funnel analytics.
 *
 * Remote analytics are disabled unless VITE_POSTHOG_KEY is configured.
 * Existing app_analytics DOM events remain available for local/debug consumers.
 *
 * Owner/test-device exclusion:
 *   ?analytics=exclude  -> persistently excludes this browser
 *   ?analytics=include  -> re-enables analytics for this browser
 */

export type TrackingEvent =
  | "page_view"
  | "menu_view"
  | "dish_view"
  | "banner_click"
  | "add_to_cart"
  | "cart_open"
  | "order_send_whatsapp"
  | "whatsapp_click"
  | "phone_click"
  | "directions_click"
  | "bolt_food_click"
  | "uber_eats_click"
  | "language_change";

type AnalyticsMetadata = Record<string, unknown>;

type AnalyticsClient = {
  capture: (event: string, properties?: AnalyticsMetadata) => void;
};

const OWNER_EXCLUDE_KEY = "bpk-analytics-excluded";
const SITE_ID = "bestpizzaandkebab.pt";

let client: AnalyticsClient | null = null;
let clientPromise: Promise<AnalyticsClient | null> | null = null;

function consumeOwnerDirective() {
  if (typeof window === "undefined") return;

  try {
    const url = new URL(window.location.href);
    const directive = url.searchParams.get("analytics");

    if (directive === "exclude") {
      window.localStorage.setItem(OWNER_EXCLUDE_KEY, "1");
    } else if (directive === "include") {
      window.localStorage.removeItem(OWNER_EXCLUDE_KEY);
    } else {
      return;
    }

    url.searchParams.delete("analytics");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  } catch {
    // Analytics must never affect the ordering experience.
  }
}

export function isAnalyticsExcluded() {
  if (typeof window === "undefined") return true;

  consumeOwnerDirective();

  try {
    return window.localStorage.getItem(OWNER_EXCLUDE_KEY) === "1";
  } catch {
    return false;
  }
}

async function getClient(): Promise<AnalyticsClient | null> {
  if (typeof window === "undefined" || isAnalyticsExcluded()) return null;
  if (client) return client;
  if (clientPromise) return clientPromise;

  const key = import.meta.env.VITE_POSTHOG_KEY?.trim();
  if (!key) return null;

  clientPromise = (async () => {
    const { default: posthog } = await import("posthog-js");
    const host = import.meta.env.VITE_POSTHOG_HOST?.trim() || "https://eu.i.posthog.com";

    posthog.init(key, {
      api_host: host,
      person_profiles: "identified_only",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: true,
      disable_session_recording: true,
      persistence: "localStorage",
    });

    client = posthog;
    return client;
  })().catch((error) => {
    if (import.meta.env.DEV) {
      console.warn("[Analytics] PostHog initialization failed", error);
    }
    clientPromise = null;
    return null;
  });

  return clientPromise;
}

export function trackEvent(event: TrackingEvent, metadata: AnalyticsMetadata = {}) {
  const timestamp = new Date().toISOString();
  const excluded = isAnalyticsExcluded();

  const properties: AnalyticsMetadata = {
    ...metadata,
    site: SITE_ID,
    path: typeof window !== "undefined" ? window.location.pathname : "/",
    timestamp,
  };

  if (import.meta.env.DEV) {
    console.log("[Analytics]", { event, properties, excluded });
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("app_analytics", {
        detail: { event, metadata: properties, timestamp, excluded },
      }),
    );
  }

  if (excluded) return;

  void getClient().then((posthog) => {
    if (!posthog) return;
    posthog.capture(event === "page_view" ? "$pageview" : event, properties);
  });
}
