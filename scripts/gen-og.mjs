// Generate the 1200×630 social share image (public/og.png) with the real brand
// font embedded. Run: node scripts/gen-og.mjs
import puppeteer from "puppeteer-core";
import { readFileSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const font = readFileSync("src/fonts/OverusedGrotesk-VF.woff2").toString("base64");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{font-family:'OG';src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-style:normal;}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px}
  body{background:#FF4800;color:#E4E4E4;font-family:'OG',sans-serif;-webkit-font-smoothing:antialiased;
       display:flex;flex-direction:column;justify-content:space-between;padding:84px 88px}
  .mark{display:grid;grid-template-columns:repeat(2,30px);grid-template-rows:repeat(2,30px);gap:8px;transform:rotate(0deg)}
  .mark i{background:#222}
  .mark i:nth-child(1){border-radius:0 0 0 0}
  .word{font-weight:600;font-size:176px;line-height:0.86;letter-spacing:-0.025em}
  .tag{font-weight:500;font-size:35px;line-height:1.18;max-width:820px;margin-top:24px}
  .foot{display:flex;justify-content:space-between;align-items:flex-end;font-weight:500;font-size:27px;opacity:.92}
  .bottom{display:flex;flex-direction:column;gap:34px}
</style></head><body>
  <div class="mark"><i></i><i></i><i></i><i></i></div>
  <div class="bottom">
    <div>
      <div class="word">Friday<br>Foundry</div>
      <div class="tag">Live events connecting emerging creatives with established industry leaders.</div>
    </div>
    <div class="foot"><span>friday-foundry.com</span><span>Cannes Lions · 2026</span></div>
  </div>
</body></html>`;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox", "--force-color-profile=srgb"],
  defaultViewport: { width: 1200, height: 630, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log("wrote public/og.png");
