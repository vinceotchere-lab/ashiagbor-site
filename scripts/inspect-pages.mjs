import { chromium } from "playwright";
import fs from "fs";

async function run() {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();

  page.on("console", (msg) => console.log(`[PAGE LOG]: ${msg.text()}`));
  page.on("pageerror", (err) => console.log(`[PAGE ERROR]: ${err}`));

  const pagesToTest = [
    { name: "mobile-home-hero", url: "http://localhost:3001/", scrollY: 0 },
    { name: "mobile-home-quotes", url: "http://localhost:3001/", scrollSelector: ".fieldnotes-section" },
    { name: "mobile-about", url: "http://localhost:3001/about", scrollY: 0 },
    { name: "mobile-map", url: "http://localhost:3001/map", scrollY: 350 },
    { name: "mobile-publications", url: "http://localhost:3001/publications", scrollY: 0 },
    { name: "mobile-timeline", url: "http://localhost:3001/timeline", scrollY: 0 },
    { name: "mobile-connect", url: "http://localhost:3001/connect", scrollY: 0 },
  ];

  if (!fs.existsSync("./test-screenshots")) {
    fs.mkdirSync("./test-screenshots");
  }

  for (const p of pagesToTest) {
    try {
      console.log(`Navigating to ${p.url}...`);
      await page.goto(p.url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForTimeout(2500);

      if (p.scrollSelector) {
        await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
        }, p.scrollSelector);
        await page.waitForTimeout(1000);
      } else if (p.scrollY) {
        await page.evaluate((y) => window.scrollBy(0, y), p.scrollY);
        await page.waitForTimeout(1000);
      }

      await page.screenshot({ path: `./test-screenshots/${p.name}.png`, fullPage: false });
      console.log(`Saved screenshot for ${p.name}`);
    } catch (pageErr) {
      console.error(`Error capturing ${p.name}:`, pageErr.message);
    }
  }

  await browser.close();
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
