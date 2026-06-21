// Capture at a mobile/tablet width with touch emulation (triggers the ambient hero).
// Usage: node shot-mobile.mjs out width height fullPage(1|0)
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const out = process.argv[2] || "/tmp/mobile.png";
const w = parseInt(process.argv[3] || "390", 10);
const h = parseInt(process.argv[4] || "844", 10);
const full = (process.argv[5] || "1") === "1";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
  defaultViewport: {
    width: w,
    height: h,
    deviceScaleFactor: 2,
    hasTouch: true,
    isMobile: true,
  },
});
const page = await browser.newPage();
// raw CDP: this puppeteer build's high-level API rejects hover/pointer features,
// but Chrome supports them — needed to trigger the hero's ambient (touch) mode.
const client = await page.createCDPSession();
await client.send("Emulation.setEmulatedMedia", {
  features: [
    { name: "hover", value: "none" },
    { name: "pointer", value: "coarse" },
  ],
});
await page.goto("http://localhost:3001", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
// scroll through so whileInView reveals fire, then back to top
await page.evaluate(async () => {
  const H = document.body.scrollHeight;
  for (let y = 0; y <= H; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 50));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
});
await new Promise((r) => setTimeout(r, 600)); // let the ambient hero animate
await page.screenshot({ path: out, fullPage: full });
await browser.close();
console.log("saved", out);
