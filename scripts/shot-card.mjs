// Click a speaker card's + and capture the expanded panel (one-shot sanity check).
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

// open the 3rd card (John Doe), then center its card in view
await page.evaluate(() => {
  const btns = [...document.querySelectorAll('button[aria-label^="Open"]')];
  (btns[2] || btns[0]).click();
});
await new Promise((r) => setTimeout(r, 150));
await page.evaluate(() => {
  const open = document.querySelector('button[aria-expanded="true"]');
  open?.closest("li")?.scrollIntoView({ block: "center", inline: "center" });
});
await new Promise((r) => setTimeout(r, 750));

await page.screenshot({ path: "/tmp/card.png" });
await browser.close();
console.log("done");
