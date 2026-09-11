#!/usr/bin/env node
import { spawn } from "node:child_process";
import { copyFile, mkdir } from "node:fs/promises";
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

const isCloudflare =
  process.env.WORKERS_CI === "1" || process.env.DEPLOY_TARGET === "cloudflare";

if (isCloudflare) {
  console.log("[build-target] Cloudflare detected — building compiled SPA assets to dist/.");
  await run("vite", ["build", "--config", "vite.cloudflare.config.ts"]);
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
