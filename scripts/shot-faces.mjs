import puppeteer from "puppeteer-core";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "shell", args: ["--no-sandbox","--hide-scrollbars","--force-color-profile=srgb"], defaultViewport: { width:1728, height:1080, deviceScaleFactor:2 }});
const p = await b.newPage();
await p.goto("http://localhost:3001",{waitUntil:"networkidle0"});
await p.evaluate(()=>document.fonts.ready);
await p.evaluate(async()=>{const H=document.body.scrollHeight;for(let y=0;y<=H;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}window.scrollTo(0,0);});
await p.evaluate(()=>{const el=[...document.querySelectorAll("h3")].find(e=>e.textContent.includes("Cannes"));el.scrollIntoView({block:"center"});});
await new Promise(r=>setTimeout(r,500));
const btns = await p.$$("ul button[aria-expanded]");
const names = ["odile","jolyon","farah"];
for (let i=0;i<Math.min(3,btns.length);i++){
  await btns[i].screenshot({path:`/tmp/face-${names[i]}.png`});
  console.log("saved", names[i]);
}
await b.close();
