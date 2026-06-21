// Encode PNG -> WebP via Chrome canvas (preserves alpha). No native deps.
import { readFileSync, writeFileSync } from "fs";
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const QUALITY = 0.85;

const jobs = [
  ["/Users/dominiquetorfs/Desktop/odile-breffa.png", "public/images/speakers/odile.webp"],
  ["/Users/dominiquetorfs/Desktop/jolyon-white.png", "public/images/speakers/jolyon.webp"],
  ["/Users/dominiquetorfs/Desktop/farah-el-feghali.png", "public/images/speakers/farah.webp"],
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();

for (const [src, out] of jobs) {
  const dataUrl = `data:image/png;base64,${readFileSync(src).toString("base64")}`;
  const webp = await page.evaluate(async (url, q) => {
    const img = await new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = url;
    });
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    c.getContext("2d").drawImage(img, 0, 0);
    return c.toDataURL("image/webp", q);
  }, dataUrl, QUALITY);
  writeFileSync(out, Buffer.from(webp.split(",")[1], "base64"));
  console.log("wrote", out);
}
await browser.close();
