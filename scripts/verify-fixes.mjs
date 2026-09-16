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

  console.log("Testing /map with selected site...");
  await page.goto("http://localhost:3001/map", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2500);

  // Click on the first site in the ledger
  const firstSiteBtn = await page.$(".site-ledger-list button");
  if (firstSiteBtn) {
    await firstSiteBtn.click();
    console.log("Clicked first site button");
    await page.waitForTimeout(1000);
  }

  // Scroll to the map container so we see the map frame + docked peek drawer
  await page.evaluate(() => {
    const mapEl = document.querySelector(".atlas-map-frame");
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: "instant", block: "start" });
    }
  });
  await page.waitForTimeout(1000);

  await page.screenshot({ path: `${outDir}/fix-map-mobile-collapsed.png`, fullPage: false });
  console.log("Saved fix-map-mobile-collapsed.png");

  // Click the toggle button to expand
  const expandBtn = await page.$(".dossier-toggle-btn");
  if (expandBtn) {
    await expandBtn.click();
    console.log("Clicked expand button");
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${outDir}/fix-map-mobile-expanded.png`, fullPage: false });
    console.log("Saved fix-map-mobile-expanded.png");
  }

  console.log("Testing /timeline badge...");
  await page.goto("http://localhost:3001/timeline", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2500);

  // Scroll to the end badge
  await page.evaluate(() => {
    const badges = Array.from(document.querySelectorAll("span"));
    const target = badges.find(b => b.textContent && b.textContent.includes("Active Research & Field Work"));
    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "center" });
    }
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${outDir}/fix-timeline-mobile-badge.png`, fullPage: false });
  console.log("Saved fix-timeline-mobile-badge.png");

  await browser.close();
  console.log("Verification finished successfully!");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
