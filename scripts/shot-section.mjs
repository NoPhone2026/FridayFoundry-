// Scroll to an h2 by text and screenshot the viewport. Usage: node shot-section.mjs out "Heading"
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const out = process.argv[2] || "/tmp/section.png";
const find = process.argv[3] || "Previous Events";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
  defaultViewport: { width: 1728, height: 1080, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await page.evaluate((t) => {
  const el = [...document.querySelectorAll("h2")].find((h) =>
    h.textContent.includes(t),
  );
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo(0, y);
  }
}, find);
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: out });
await browser.close();
console.log("saved", out);
