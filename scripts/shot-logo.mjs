// Hover the nav logo and capture a zoomed crop to verify the glitch animation.
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const out = process.argv[2] || "/tmp/logo.png";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
  defaultViewport: { width: 1728, height: 900, deviceScaleFactor: 3 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);

const logo = await page.$("header a[aria-label='Friday Foundry']");
const box = await logo.boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await new Promise((r) => setTimeout(r, 260)); // let a few glitch frames pass
await page.screenshot({
  path: out,
  clip: { x: box.x - 22, y: box.y - 22, width: box.width + 64, height: box.height + 64 },
});
await browser.close();
console.log("saved", out);
