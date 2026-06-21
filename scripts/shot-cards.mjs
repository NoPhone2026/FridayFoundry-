// Scroll the speaker carousel into view and screenshot (no click).
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const out = process.argv[2] || "/tmp/cards.png";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
  defaultViewport: { width: 1728, height: 1080, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => {
  const c = document.querySelector('button[aria-label*="details"]');
  c?.closest("li")?.scrollIntoView({ block: "center", inline: "start" });
});
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: out });
await browser.close();
console.log("saved", out);
