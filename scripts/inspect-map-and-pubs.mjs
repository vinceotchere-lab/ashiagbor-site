import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  page.on("console", (msg) => console.log(`[PAGE LOG]: ${msg.text()}`));
  page.on("pageerror", (err) => console.log(`[PAGE ERROR]: ${err}`));

  // 1. Inspect Map
  console.log("Navigating to /map...");
  await page.goto("http://localhost:3001/map", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector(".atlas-ledger", { timeout: 30000 });
  await page.waitForTimeout(2500);

  const ledger = await page.$(".atlas-ledger");
  if (ledger) {
    await ledger.screenshot({ path: "./test-screenshots/map-ledger-fixed.png" });
    console.log("Saved map-ledger-fixed.png");
  }

  await page.evaluate(() => window.scrollBy(0, 420));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "./test-screenshots/map-console-focus.png", fullPage: false });
  console.log("Saved map-console-focus.png");

  await browser.close();
  console.log("Done!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
