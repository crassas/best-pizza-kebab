import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

// Read the existing restaurant artwork directly; the old SVG referenced its
// own output. Make a square crop for icons without changing the site logo.
const source = await readFile("public/best-kebab-favicon-v2.png");
const square = await sharp(source).resize(512, 512, { fit: "cover", position: "centre" }).png().toBuffer();
await sharp(square).resize(96, 96).png().toFile("public/favicon.png");
await sharp(square).resize(180, 180).png().toFile("public/apple-touch-icon.png");
const frame = await sharp(square).resize(48, 48).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 48; header[7] = 48;
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(frame.length, 14); header.writeUInt32LE(22, 18);
await writeFile("public/favicon.ico", Buffer.concat([header, frame]));
console.log("Generated square restaurant icons: 96px, 180px and ICO.");
