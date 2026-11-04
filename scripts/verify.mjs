import { chromium } from "playwright";
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://127.0.0.1:3210";
const executablePath =
  process.env.CHROMIUM_PATH ??
  "/Users/bishal/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
});

const result = {};

async function diff(a, b) {
  const [rawA, rawB] = await Promise.all([
    sharp(a).raw().toBuffer({ resolveWithObject: true }),
    sharp(b).raw().toBuffer({ resolveWithObject: true }),
  ]);
  const len = Math.min(rawA.data.length, rawB.data.length);
  let changed = 0;
  for (let i = 0; i < len; i += 4) {
    if (Math.abs(rawA.data[i] - rawB.data[i]) > 6) changed++;
  }
  return +((changed / (len / 4)) * 100).toFixed(2);
}

// warm the GPU process once so cold-start shader compilation is not
// mistaken for page performance
const warmup = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const warmupPage = await warmup.newPage();
await warmupPage.goto(`${base}/`, { waitUntil: "load" });
await warmupPage.waitForTimeout(2500);
await warmup.close();

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await context.addInitScript(() => {
  window.__lcp = 0;
  window.__cls = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) window.__lcp = entry.startTime;
  }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) window.__cls += entry.value;
    }
  }).observe({ type: "layout-shift", buffered: true });
});

const errors = [];
const page = await context.newPage();
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.waitForSelector("canvas", { timeout: 15000 });
await page.waitForTimeout(2000);

result.home = await page.evaluate(() => {
  const resources = performance.getEntriesByType("resource");
  const sum = (filter) =>
    Math.round(
      resources
        .filter(filter)
        .reduce((acc, r) => acc + (r.transferSize || 0), 0) / 1024,
    );
  const nav = performance.getEntriesByType("navigation")[0];
  return {
    lcp: Math.round(window.__lcp),
    cls: +window.__cls.toFixed(4),
    ttfb: Math.round(nav.responseStart),
    domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
    jsKB: sum((r) => r.name.endsWith(".js")),
    cssKB: sum((r) => r.name.endsWith(".css")),
    fontsKB: sum((r) => /\.(woff2?|ttf)$/.test(r.name)),
    imgKB: sum((r) => /\.(png|jpg|jpeg|webp|avif|svg)$/.test(r.name)),
    threeChunkKB: Math.round(
      resources.find((r) => r.name.includes("b536a0f1"))?.transferSize / 1024 || 0,
    ),
    h1Count: document.querySelectorAll("h1").length,
    title: document.title,
    og: document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
    description: document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content")
      ?.slice(0, 80),
    fontLoaded: document.fonts.check("16px 'Space Grotesk'"),
    images: [...document.images].map((img) => ({
      src: img.currentSrc.split("/").pop(),
      ok: img.complete && img.naturalWidth > 0,
    })),
  };
});

// canvas animation diff
const canvas = page.locator("#top canvas");
await canvas.screenshot({ path: "artifacts/canvas-a.png" });
await page.waitForTimeout(700);
await canvas.screenshot({ path: "artifacts/canvas-b.png" });
result.canvasAnimationPercent = await diff(
  "artifacts/canvas-a.png",
  "artifacts/canvas-b.png",
);

// pointer reaction
await page.mouse.move(120, 120);
await page.waitForTimeout(600);
await canvas.screenshot({ path: "artifacts/canvas-pointer-a.png" });
await page.mouse.move(1320, 780);
await page.waitForTimeout(600);
await canvas.screenshot({ path: "artifacts/canvas-pointer-b.png" });
result.canvasPointerPercent = await diff(
  "artifacts/canvas-pointer-a.png",
  "artifacts/canvas-pointer-b.png",
);

// client-side navigation
await page.getByRole("link", { name: "Work", exact: true }).first().click();
await page.waitForURL("**/projects");
await page.waitForTimeout(1200);
result.navigation = {
  url: page.url(),
  h1: await page.locator("h1").textContent(),
  canvasOnProjects: await page.locator("canvas").count(),
  scrollY: await page.evaluate(() => window.scrollY),
};

// back home, then hash anchor
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.getByRole("link", { name: "About", exact: true }).first().click();
await page.waitForTimeout(1600);
result.anchorScrollY = await page.evaluate(() => window.scrollY);
result.anchorHash = await page.evaluate(() => window.location.hash);

// form typing
await page.goto(`${base}/contact`, { waitUntil: "networkidle" });
await page.fill("#name", "Test Person");
await page.fill("#email", "test@example.com");
await page.fill("#message", "Hello, I would like to talk about a project.");
result.form = await page.evaluate(() => ({
  name: document.querySelector("#name").value,
  email: document.querySelector("#email").value,
  messageLength: document.querySelector("#message").value.length,
}));

// narrow viewport overflow
const narrow = await browser.newContext({ viewport: { width: 360, height: 740 } });
const narrowPage = await narrow.newPage();
await narrowPage.goto(`${base}/`, { waitUntil: "networkidle" });
await narrowPage.waitForTimeout(1500);
result.narrow = await narrowPage.evaluate(() => ({
  overflowX: document.documentElement.scrollWidth - window.innerWidth,
  h1: document.querySelector("h1")?.getBoundingClientRect().toJSON(),
}));

// mobile nav
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2,
});
const m = await mobile.newPage();
await m.goto(`${base}/`, { waitUntil: "networkidle" });
await m.getByRole("button", { name: /open menu/i }).click();
await m.getByRole("link", { name: "Work", exact: true }).click();
await m.waitForURL("**/projects");
await m.waitForTimeout(800);
result.mobileNav = { url: m.url(), h1: await m.locator("h1").textContent() };

result.errors = [...new Set(errors)];
await browser.close();
writeFileSync("artifacts/verify.json", JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
