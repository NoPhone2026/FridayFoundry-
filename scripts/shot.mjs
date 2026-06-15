// Usage: node scripts/shot.mjs [out] [width] [fullPage(0|1)] [url]
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const out = process.argv[2] || "/tmp/ff-full.png";
const width = parseInt(process.argv[3] || "1728", 10);
const fullPage = (process.argv[4] || "1") === "1";
const url = process.argv[5] || "http://localhost:3001";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
  defaultViewport: { width, height: 1080, deviceScaleFactor: 1 },
});
const selector = process.argv[6] || "";
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
// scroll through so whileInView reveals fire, then back to top
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y <= h; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 250));
});
await new Promise((r) => setTimeout(r, 400));
if (selector) {
  const el = await page.$(selector);
  await el.screenshot({ path: out });
} else {
  await page.screenshot({ path: out, fullPage });
}
await browser.close();
console.log("saved", out);
