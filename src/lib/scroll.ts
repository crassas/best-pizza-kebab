/**
 * Smoothly and reliably scrolls to any element by ID across desktop, mobile,
 * and iframe environments, accounting for sticky headers and safe area insets.
 */
export function scrollToElement(id: string, offset = 110) {
  if (typeof window === "undefined") return false;
  const cleanId = id.startsWith("#") ? id.slice(1) : id;
  const element = document.getElementById(cleanId);
  if (!element) {
    // Retry once in case DOM was updated in the current tick
    setTimeout(() => {
      const el = document.getElementById(cleanId);
      if (el) {
        performScroll(el, offset);
      }
    }, 60);
    return false;
  }

  performScroll(element, offset);
  return true;
}

function performScroll(element: HTMLElement, offset: number) {
  // Method 1: Native scrollIntoView works inside iframes and respects CSS scroll-margin-top
  try {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } catch {
    try {
      element.scrollIntoView(true);
    } catch {
      // Fallback
    }
  }

  // Method 2: Adjust window/document scroll positions if still outside header offset
  try {
    const rect = element.getBoundingClientRect();
    const currentScrollY =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const targetTop = Math.max(0, rect.top + currentScrollY - offset);

    if (Math.abs(rect.top - offset) > 25) {
      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
      if (document.documentElement) {
        document.documentElement.scrollTop = targetTop;
      }
      if (document.body) {
        document.body.scrollTop = targetTop;
      }
    }
  } catch {
    // Ignore environment restrictions
  }
}
