import sharp from "sharp";
import { join } from "node:path";

async function run() {
  const imagePath = join(process.cwd(), "public", "images", "hero-logo.png");
  
  // Exact colorful drawing box bounds
  const left = 85;
  const top = 143;
  const extractW = 1064 - 85 + 1; // 980
  const extractH = 679 - 143 + 1; // 537

  console.log("Extracting rect:", { left, top, width: extractW, height: extractH });

  const destPngPath = join(process.cwd(), "public", "best-kebab-favicon-v2.png");
  await sharp(imagePath)
    .extract({ left, top, width: extractW, height: extractH })
    .extend({
      top: 221, // (980 - 537) / 2 = ~221
      bottom: 222,
      left: 0,
      right: 0,
      background: { r: 16, g: 14, b: 12, alpha: 1 } // #100e0c
    })
    .resize(512, 512)
    .png()
    .toFile(destPngPath);

  const destGrokPath = join(process.cwd(), "public", "__grok", "icon-180.png");
  await sharp(imagePath)
    .extract({ left, top, width: extractW, height: extractH })
    .extend({
      top: 221,
      bottom: 222,
      left: 0,
      right: 0,
      background: { r: 16, g: 14, b: 12, alpha: 1 } // #100e0c
    })
    .resize(180, 180)
    .png()
    .toFile(destGrokPath);

  console.log("Favicon PNG cropped, padded to square, and rendered!");
}

run().catch(console.error);
