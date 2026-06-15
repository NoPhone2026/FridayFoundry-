import puppeteer from "puppeteer-core";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.goto("http://localhost:3001", { waitUntil: "domcontentloaded" });
const data = await page.evaluate(async () => {
  const load = (src) =>
    new Promise((res) => {
      const i = new Image();
      i.onload = () => res(i);
      i.src = src;
    });
  const out = {};
  for (const name of ["alpha_layer", "colorful_rectangles"]) {
    const img = await load("/images/hero/" + name + ".png");
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const x = c.getContext("2d");
    x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data;
    let minA = 255,
      maxA = 0,
      opaque = 0;
    const total = d.length / 4;
    const colorHist = {};
    for (let i = 0; i < d.length; i += 4) {
      const a = d[i + 3];
      if (a < minA) minA = a;
      if (a > maxA) maxA = a;
      if (a > 10) opaque++;
      if (i % (4 * 997) === 0) {
        const key = `${d[i]},${d[i + 1]},${d[i + 2]},${a}`;
        colorHist[key] = (colorHist[key] || 0) + 1;
      }
    }
    const top = Object.entries(colorHist)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([k, v]) => `${k} (${v})`);
    out[name] = {
      size: [c.width, c.height],
      minAlpha: minA,
      maxAlpha: maxA,
      opaqueFrac: +(opaque / total).toFixed(3),
      topColors: top,
    };
  }
  return out;
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
