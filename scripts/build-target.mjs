#!/usr/bin/env node
import { spawn } from "node:child_process";
import { copyFile, mkdir, readFile } from "node:fs/promises";
import process from "node:process";

function executable(name) {
  return process.platform === "win32" && (name === "vite" || name === "npm")
    ? `${name}.cmd`
    : name;
}

function run(command, args, env = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(executable(command), args, {
      stdio: "inherit",
      env,
    });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(
        new Error(
          `${command} ${args.join(" ")} failed${signal ? ` with ${signal}` : ` with exit code ${code ?? 1}`}`,
        ),
      );
    });
  });
}

async function verifyCloudflareSeoAssets() {
  const [sitemap, robots] = await Promise.all([
    readFile("dist/sitemap.xml", "utf8"),
    readFile("dist/robots.txt", "utf8"),
  ]);

  if (!sitemap.trimStart().startsWith("<?xml") || !sitemap.includes("<urlset")) {
    throw new Error(
      "Cloudflare SEO guard failed: dist/sitemap.xml is missing or is not a valid XML sitemap.",
    );
  }

  if (!sitemap.includes("https://bestpizzaandkebab.pt/")) {
    throw new Error(
      "Cloudflare SEO guard failed: production domain is missing from dist/sitemap.xml.",
    );
  }

  if (!robots.includes("Sitemap: https://bestpizzaandkebab.pt/sitemap.xml")) {
    throw new Error(
      "Cloudflare SEO guard failed: dist/robots.txt does not reference the production sitemap.",
    );
  }

  console.log(
    "[build-target] SEO assets verified — dist/sitemap.xml is XML and dist/robots.txt references it.",
  );
}

const isCloudflare =
  process.env.WORKERS_CI === "1" || process.env.DEPLOY_TARGET === "cloudflare";

console.log("[build-target] Generating optimized WebP image assets.");
await run(process.execPath, ["scripts/optimize-public-images.mjs"]);

if (isCloudflare) {
  console.log("[build-target] Cloudflare detected — building compiled SPA assets to dist/.");
  await run("vite", ["build", "--config", "vite.cloudflare.config.ts"]);
  await verifyCloudflareSeoAssets();
} else {
  console.log("[build-target] Non-Cloudflare build — preserving existing AI Studio/Vercel path.");
  await run(
    process.execPath,
    ["scripts/with-app-env.mjs", "vite", "build"],
    { ...process.env, NODE_ENV: "production" },
  );

  await mkdir(".vercel/output/static", { recursive: true });
  try {
    await copyFile("index.html", ".vercel/output/static/index.html");
  } catch {
    // Preserve the previous best-effort copy behaviour.
  }

  await run("npm", ["run", "db:migrate"]);
}
