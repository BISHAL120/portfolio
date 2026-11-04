import { chromium } from "playwright";

const executablePath =
  process.env.CHROMIUM_PATH ??
  "/Users/bishal/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const [url, out, width = "1440", height = "900"] = process.argv.slice(2);
if (!url || !out) {
  console.error("usage: node scripts/capture.mjs <url> <out.png> [width] [height]");
  process.exit(1);
}

const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({
  viewport: { width: Number(width), height: Number(height) },
  deviceScaleFactor: 1,
});
await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: out });
await browser.close();
console.log("saved", out);
