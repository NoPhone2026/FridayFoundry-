// Hover (not click) a speaker card and capture the carousel to verify the pop.
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
  defaultViewport: { width: 1728, height: 950, deviceScaleFactor: 2 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 300));

await page.evaluate(() => {
  const c = document.querySelectorAll('button[aria-label^="Open"]')[2];
  c?.closest("li")?.scrollIntoView({ block: "center", inline: "center" });
});
await new Promise((r) => setTimeout(r, 400));

const cards = await page.$$('button[aria-label^="Open"]');
const box = await cards[2].boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await new Promise((r) => setTimeout(r, 750)); // width/height transition

await page.screenshot({ path: "/tmp/cardhover.png" });
await browser.close();
console.log("done");
