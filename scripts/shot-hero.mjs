// Captures the hero after dragging the cursor across it (to trigger the reveal).
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const out = process.argv[2] || "/tmp/hero.png";
const url = process.argv[3] || "http://localhost:3001";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
  defaultViewport: { width: 1728, height: 1000, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 300));

// fast steady drag across "Foundry" — reveal is velocity-driven, capture mid-motion
await page.mouse.move(250, 700);
for (let x = 250; x <= 820; x += 85) {
  await page.mouse.move(x, 700 + Math.sin(x / 90) * 45, { steps: 1 });
  await new Promise((r) => setTimeout(r, 16));
}
// capture right away so the moving reveal + trail are still on screen
await new Promise((r) => setTimeout(r, 16));

const el = await page.$("#top");
await el.screenshot({ path: out });
await browser.close();
console.log("saved", out);
