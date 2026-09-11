import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Cloudflare production build for the public restaurant microsite.
// This intentionally builds the existing React/TanStack Router app as a
// client-side SPA. Auth and database deploy features are disabled for this
// project, so the Cloudflare runtime does not need the AI Studio/Nitro server
// layer. Keeping this in a separate config preserves the existing local and
// AI Studio build behaviour in vite.config.ts.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": join(process.cwd(), "src"),
    },
  },
  plugins: [tailwindcss(), viteReact()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },
});
