// Mobile nav: capture closed, then open the dropdown and capture.
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
  defaultViewport: { width: 390, height: 600, deviceScaleFactor: 2, hasTouch: true, isMobile: true },
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
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: "/tmp/nav-closed.png" });
await page.click('button[aria-label="Open menu"]');
await new Promise((r) => setTimeout(r, 450));
await page.screenshot({ path: "/tmp/nav-open.png" });
console.log("done");
await browser.close();
