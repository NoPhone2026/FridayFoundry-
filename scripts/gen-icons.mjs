// Render the favicon SVG to PNGs and build favicon.ico (PNG-encoded entries).
import { readFileSync, writeFileSync } from "fs";
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SVG = readFileSync("src/app/icon.svg", "utf8");

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();

async function png(size) {
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  const svg = SVG.replace(
    /width="\d+" height="\d+"/,
    `width="${size}" height="${size}"`,
  );
  await page.setContent(
    `<!doctype html><html><head><style>*{margin:0;padding:0}</style></head><body>${svg}</body></html>`,
  );
  const buf = await page.screenshot({
    type: "png",
    clip: { x: 0, y: 0, width: size, height: size },
  });
  return Buffer.from(buf);
}

const p96 = await png(96);
const p180 = await png(180);
await browser.close();

// Next App Router auto-wires src/app/icon.* and apple-icon.* (plus icon.svg).
// No favicon.ico: Next's ICO decoder needs RGBA-encoded entries and modern
// browsers use the SVG/PNG anyway.
writeFileSync("src/app/icon.png", p96);
writeFileSync("src/app/apple-icon.png", p180);
console.log("wrote icon.png (96), apple-icon.png (180)");
