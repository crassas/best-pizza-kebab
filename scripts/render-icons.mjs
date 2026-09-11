import sharp from "sharp";
import { join } from "node:path";

async function render() {
  const svgPath = join(process.cwd(), "public", "favicon.svg");
  const pngPath = join(process.cwd(), "public", "best-kebab-favicon-v2.png");
  const grokPath = join(process.cwd(), "public", "__grok", "icon-180.png");

  console.log("Rendering favicon.svg to best-kebab-favicon-v2.png at 512x512...");
  await sharp(svgPath)
    .resize(512, 512)
    .png()
    .toFile(pngPath);

  console.log("Rendering favicon.svg to public/__grok/icon-180.png at 180x180...");
  await sharp(svgPath)
    .resize(180, 180)
    .png()
    .toFile(grokPath);

  console.log("Icons rendered successfully!");
}

render().catch((err) => {
  console.error("Error rendering icons:", err);
  process.exit(1);
});
