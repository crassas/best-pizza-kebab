import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { LanguageProvider } from "@/lib/i18n";
import { OrderProvider } from "@/lib/order-store";
import { OrderBar } from "@/components/site/order-bar";
import { OrderDrawer } from "@/components/site/order-drawer";
import { restaurant, seo } from "@/lib/restaurant";
import appCss from "../styles.css?url";

const APP_NAME = "Best Kebab & Pizza";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: seo.title.pt },
      { name: "description", content: seo.description.pt },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "theme-color", content: "#100E0C" },
      { name: "color-scheme", content: "dark" },
      { name: "author", content: APP_NAME },
      { name: "geo.region", content: "PT-13" },
      { name: "geo.placename", content: "Porto" },
      { name: "geo.position", content: `${restaurant.geo.lat};${restaurant.geo.lng}` },
      { name: "ICBM", content: `${restaurant.geo.lat}, ${restaurant.geo.lng}` },

      // Open Graph
      { property: "og:site_name", content: APP_NAME },
      { property: "og:type", content: "restaurant" },
      { property: "og:title", content: seo.title.pt },
      { property: "og:description", content: seo.description.pt },
      { property: "og:url", content: seo.canonical },
      { property: "og:image", content: "https://bestpizzakebab.pt/og.jpg" },
      { property: "og:image:alt", content: "Best Kebab & Pizza — kebab e pizza em Campanhã, Porto" },
      { property: "og:locale", content: "pt_PT" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title.pt },
      { name: "twitter:description", content: seo.description.pt },
      { name: "twitter:image", content: "https://bestpizzakebab.pt/og.jpg" },
    ],
    links: [
      { rel: "canonical", href: seo.canonical },
      { rel: "icon", type: "image/png", href: "/best-kebab-favicon-v2.png?v=2" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/best-kebab-favicon-v2.png?v=2" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <PreviewHostBridge />
        <AuthProvider>
          <LanguageProvider>
            <OrderProvider>
              <Outlet />
              <OrderBar />
              <OrderDrawer />
            </OrderProvider>
          </LanguageProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
