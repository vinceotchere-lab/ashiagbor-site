import { chromium } from "playwright";
import fs from "fs";

async function run() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  const outDir = "./test-screenshots";
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  // Desktop capture
  const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto("http://localhost:3001/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await desktopPage.waitForTimeout(3000);
  await desktopPage.locator(".site-footer").scrollIntoViewIfNeeded();
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({ path: `${outDir}/footer-desktop.png` });
  console.log("Captured footer-desktop.png");
  await desktopContext.close();

  // Mobile capture
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3001/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.locator(".site-footer").scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: `${outDir}/footer-mobile.png` });
  console.log("Captured footer-mobile.png");
  await mobileContext.close();

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
