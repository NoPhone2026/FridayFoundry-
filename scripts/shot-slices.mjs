// Capture viewport-sized slices down the page at mobile width (full res, readable).
// Usage: node shot-slices.mjs width height count outPrefix
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const w = parseInt(process.argv[2] || "390", 10);
const h = parseInt(process.argv[3] || "844", 10);
const count = parseInt(process.argv[4] || "8", 10);
const prefix = process.argv[5] || "/tmp/slice";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
  defaultViewport: { width: w, height: h, deviceScaleFactor: 2, hasTouch: true, isMobile: true },
});
const page = await browser.newPage();
const client = await page.createCDPSession();
await client.send("Emulation.setEmulatedMedia", {
  features: [
    { name: "hover", value: "none" },
    { name: "pointer", value: "coarse" },
  ],
});
await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
// prime reveals
await page.evaluate(async () => {
  const H = document.body.scrollHeight;
  for (let y = 0; y <= H; y += 300) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
});
const total = await page.evaluate(() => document.body.scrollHeight);
for (let i = 0; i < count; i++) {
  const y = i * h;
  if (y > total) break;
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 250));
  const out = `${prefix}-${String(i).padStart(2, "0")}.png`;
  await page.screenshot({ path: out });
  console.log("saved", out, "y=", y);
}
console.log("pageHeight", total);
await browser.close();
