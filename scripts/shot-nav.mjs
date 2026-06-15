// Capture the nav at the top (spread) and scrolled (condensed floating pill).
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
  defaultViewport: { width: 1728, height: 900, deviceScaleFactor: 2 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 300));

// full viewport (fixed nav sits at the top); crop the strip afterward
await page.screenshot({ path: "/tmp/nav-top.png" });

await page.evaluate(() => window.scrollTo(0, 700));
await new Promise((r) => setTimeout(r, 900)); // morph + settle
await page.screenshot({ path: "/tmp/nav-scrolled.png" });

await browser.close();
console.log("done");
