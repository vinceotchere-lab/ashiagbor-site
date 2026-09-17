import { chromium } from "playwright";
import fs from "fs";

async function run() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const outDir = "./test-screenshots";
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  // Mobile test
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();

  // Test home thesis link on mobile
  await mobilePage.goto("http://localhost:3001/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await mobilePage.waitForTimeout(2500);
  const thesisLink = mobilePage.locator(".thesis-body .ink-link");
  await thesisLink.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: `${outDir}/fix-mobile-thesis-arrow.png` });
  console.log("Captured fix-mobile-thesis-arrow.png");

  // Test publications lead researcher caption
  await mobilePage.goto("http://localhost:3001/publications", { waitUntil: "domcontentloaded", timeout: 60000 });
  await mobilePage.waitForTimeout(2500);
  await mobilePage.locator(".reticle-box").scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: `${outDir}/fix-mobile-research-title.png` });
  console.log("Captured fix-mobile-research-title.png");

  await mobileContext.close();
  await browser.close();
  console.log("Done verification!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
