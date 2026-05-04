import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(rootDir, "public");
const appDir = path.join(rootDir, "src", "app");
const markSvgPath = path.join(publicDir, "logo-mark.svg");
const ogSvgPath = path.join(publicDir, "og-image.svg");

function createIco(pngImages) {
  const directorySize = 6 + pngImages.length * 16;
  const header = Buffer.alloc(directorySize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngImages.length, 4);

  let offset = directorySize;
  pngImages.forEach(({ size, buffer }, index) => {
    const entryOffset = 6 + index * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entryOffset);
    header.writeUInt8(size >= 256 ? 0 : size, entryOffset + 1);
    header.writeUInt8(0, entryOffset + 2);
    header.writeUInt8(0, entryOffset + 3);
    header.writeUInt16LE(1, entryOffset + 4);
    header.writeUInt16LE(32, entryOffset + 6);
    header.writeUInt32LE(buffer.length, entryOffset + 8);
    header.writeUInt32LE(offset, entryOffset + 12);
    offset += buffer.length;
  });

  return Buffer.concat([header, ...pngImages.map((image) => image.buffer)]);
}

async function renderSquarePng(svgBuffer, size, outputPath) {
  await sharp(svgBuffer, { density: 384 })
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
}

async function renderPngBuffer(svgBuffer, size) {
  return sharp(svgBuffer, { density: 384 })
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const markSvg = await fs.readFile(markSvgPath);
await fs.copyFile(markSvgPath, path.join(publicDir, "favicon.svg"));

await renderSquarePng(markSvg, 48, path.join(publicDir, "icon-48.png"));
await renderSquarePng(markSvg, 180, path.join(publicDir, "apple-touch-icon.png"));
await renderSquarePng(markSvg, 192, path.join(publicDir, "icon-192.png"));
await renderSquarePng(markSvg, 512, path.join(publicDir, "icon-512.png"));

const icoImages = await Promise.all(
  [16, 32, 48, 96].map(async (size) => ({
    size,
    buffer: await renderPngBuffer(markSvg, size),
  })),
);
const faviconIco = createIco(icoImages);
await fs.writeFile(path.join(appDir, "favicon.ico"), faviconIco);
await fs.writeFile(path.join(publicDir, "favicon.ico"), faviconIco);

const ogSvg = await fs.readFile(ogSvgPath);
await sharp(ogSvg, { density: 192 })
  .resize(1200, 630, { fit: "cover" })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, "og-image.png"));

console.log("Generated favicon, app icons, Apple touch icon, and PNG Open Graph image.");
