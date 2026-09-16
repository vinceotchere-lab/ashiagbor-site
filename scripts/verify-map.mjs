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

  const outDir = "./test-screenshots";
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  console.log("Navigating to /map...");
  await page.goto("http://localhost:3001/map", { waitUntil: "domcontentloaded", timeout: 60000 });

  // Wait for dynamic component to mount
  console.log("Waiting for site-ledger-list button...");
  const btnLocator = page.locator(".site-ledger-list button").first();
  await btnLocator.waitFor({ state: "visible", timeout: 20000 });

  console.log("Clicking first site ledger button...");
  await btnLocator.click();
  await page.waitForTimeout(1500);

  // Scroll map into view
  const mapLocator = page.locator(".atlas-map-frame");
  await mapLocator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // Capture collapsed state
  await page.screenshot({ path: `${outDir}/fix-map-mobile-collapsed.png`, fullPage: false });
  console.log("Captured fix-map-mobile-collapsed.png");

  // Expand the drawer
  const toggleBtn = page.locator(".dossier-toggle-btn");
  if (await toggleBtn.isVisible()) {
    console.log("Clicking dossier-toggle-btn to expand...");
    await toggleBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${outDir}/fix-map-mobile-expanded.png`, fullPage: false });
    console.log("Captured fix-map-mobile-expanded.png");
  } else {
    console.warn("dossier-toggle-btn was not visible");
  }

  await browser.close();
  console.log("Map verification finished!");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
