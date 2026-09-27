#!/usr/bin/env node
import { mkdir, stat, readdir } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const sourceDir = join(process.cwd(), "public", "images", "enhanced");
const targetDir = join(process.cwd(), "public", "images", "optimized");

const sources = [
  "01_interior_refeicao.png",
  "02_interior_sala.png",
  "03_interior_balcao.png",
  "04_dono_restaurante.png",
  "05_pizza.png",
  "06_kebab_batatas.png",
  "07_kebab_prato_agua.png",
  "08_falafel.png",
];

await mkdir(targetDir, { recursive: true });

let sourceBytes = 0;
let optimizedBytes = 0;

for (const file of sources) {
  const source = join(sourceDir, file);
  const stem = basename(file, extname(file));
  const full = join(targetDir, `${stem}.webp`);
  const thumb = join(targetDir, `${stem}-thumb.webp`);

  const sourceInfo = await stat(source);
  sourceBytes += sourceInfo.size;

  await sharp(source)
    .rotate()
    .resize({ width: 1280, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: 78, effort: 4, smartSubsample: true })
    .toFile(full);

  await sharp(source)
    .rotate()
    .resize({ width: 320, height: 320, withoutEnlargement: true, fit: "cover" })
    .webp({ quality: 72, effort: 4, smartSubsample: true })
    .toFile(thumb);

  const [fullInfo, thumbInfo] = await Promise.all([stat(full), stat(thumb)]);
  optimizedBytes += fullInfo.size + thumbInfo.size;
}

const sourceMb = (sourceBytes / 1024 / 1024).toFixed(2);
const optimizedMb = (optimizedBytes / 1024 / 1024).toFixed(2);
const reduction = sourceBytes > 0
  ? Math.max(0, (1 - optimizedBytes / sourceBytes) * 100).toFixed(1)
  : "0.0";

console.log(
  `[images] Generated ${sources.length * 2} WebP assets: source ${sourceMb} MB -> optimized set ${optimizedMb} MB (~${reduction}% smaller overall).`,
);


async function optimizeMenuTree(sourceRoot, targetRoot) {
  async function walk(currentSource, currentTarget) {
    let entries;
    try {
      entries = await readdir(currentSource, { withFileTypes: true });
    } catch {
      return;
    }
    await mkdir(currentTarget, { recursive: true });
    for (const entry of entries) {
      const source = join(currentSource, entry.name);
      const target = join(currentTarget, entry.name);
      if (entry.isDirectory()) {
        await walk(source, target);
        continue;
      }
      const ext = extname(entry.name).toLowerCase();
      if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) continue;
      const stem = basename(entry.name, ext);
      const output = join(currentTarget, `${stem}.webp`);
      await sharp(source)
        .rotate()
        .resize({ width: 720, withoutEnlargement: true, fit: "inside" })
        .webp({ quality: 76, effort: 4, smartSubsample: true })
        .toFile(output);
    }
  }
  await walk(sourceRoot, targetRoot);
}

await optimizeMenuTree(
  join(process.cwd(), "public", "images", "uploaded"),
  join(process.cwd(), "public", "images", "menu-optimized", "uploaded"),
);
await optimizeMenuTree(
  join(process.cwd(), "public", "food"),
  join(process.cwd(), "public", "images", "menu-optimized", "food"),
);

console.log("[images] Generated responsive WebP menu assets for uploaded and food directories.");
