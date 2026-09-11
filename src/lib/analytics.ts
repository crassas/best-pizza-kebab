/**
 * Local Conversion & Action Tracking Engine
 * Designed to capture user funnel metrics safely without paid external trackers.
 * Dispatches a standard DOM Event 'app_analytics' so third-party pixel wrappers can listen directly.
 */

export type TrackingEvent =
  | "menu_view"
  | "dish_view"
  | "banner_click"
  | "whatsapp_click"
  | "phone_click"
  | "directions_click"
  | "bolt_food_click"
  | "uber_eats_click";

export function trackEvent(event: TrackingEvent, metadata?: Record<string, any>) {
  const timestamp = new Date().toISOString();
  
  // 1. Console logging for active testing/validation
  console.log(
    `%c[Analytics Log] Event: %c${event}%c triggered at %c${timestamp}`,
    "color: #FF7A00; font-weight: bold;",
    "color: #25D366; font-weight: bold; text-decoration: underline;",
    "color: inherit;",
    "color: #34BB78;"
  );
  if (metadata) {
    console.log("[Analytics Meta]", metadata);
  }

  // 2. Dispatch a real browser custom event
  if (typeof window !== "undefined") {
    const customEvent = new CustomEvent("app_analytics", {
      detail: {
        event,
        metadata,
        timestamp,
      },
    });
    window.dispatchEvent(customEvent);
  }
}
