import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://127.0.0.1:3210";
const executablePath =
  process.env.CHROMIUM_PATH ??
  "/Users/bishal/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

mkdirSync("artifacts", { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader"],
});

const report = { base, pages: {}, console: [], pageErrors: [], failedRequests: [], badResponses: [], links: [] };

async function newPage(context) {
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") report.console.push(msg.text());
  });
  page.on("pageerror", (err) => report.pageErrors.push(err.message));
  page.on("requestfailed", (req) =>
    report.failedRequests.push(`${req.url()} — ${req.failure()?.errorText}`),
  );
  page.on("response", (res) => {
    if (res.status() >= 400) report.badResponses.push(`${res.status()} ${res.url()}`);
  });
  return page;
}

async function inspect(page, name) {
  await page.waitForTimeout(1200);
  const data = await page.evaluate(() => {
    const canvas = document.querySelector("#top canvas");
    let renderer = null;
    let glVersion = null;
    if (canvas) {
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (gl) {
        glVersion = gl.getParameter(gl.VERSION);
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        renderer = ext
          ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
          : gl.getParameter(gl.RENDERER);
      }
    }
    const rect = canvas?.getBoundingClientRect();
    const h1 = document.querySelector("h1");
    const headings = [...document.querySelectorAll("h1,h2,h3")].map((h) => ({
      tag: h.tagName,
      text: h.textContent?.trim().slice(0, 90),
    }));
    const images = [...document.querySelectorAll("img")];
    return {
      title: document.title,
      h1: h1?.textContent?.trim(),
      h1Size: h1 ? getComputedStyle(h1).fontSize : null,
      headings,
      canvas: canvas
        ? {
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            renderer,
            glVersion,
          }
        : null,
      overflowX: document.documentElement.scrollWidth - window.innerWidth,
      scrollHeight: document.documentElement.scrollHeight,
      images: images.length,
      imagesMissingAlt: images.filter((img) => !img.alt).length,
      unlabeledButtons: [...document.querySelectorAll("button")].filter(
        (b) => !b.textContent?.trim() && !b.getAttribute("aria-label"),
      ).length,
      internalLinks: [
        ...new Set([...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute("href"))),
      ],
      bodyBg: getComputedStyle(document.body).backgroundColor,
      navVisible: !!document.querySelector("header"),
    };
  });

  await page.screenshot({ path: `artifacts/${name}.png`, fullPage: false });
  const stats = await sharp(`artifacts/${name}.png`).stats();
  data.screenshot = {
    mean: stats.channels.map((c) => Math.round(c.mean)),
    stdev: stats.channels.map((c) => Math.round(c.stdev)),
  };
  report.pages[name] = data;
  return data;
}

const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const home = await newPage(desktop);
await home.goto(`${base}/`, { waitUntil: "networkidle" });
await home.waitForTimeout(2500);

const homeData = await inspect(home, "home-desktop");

report.pages["home-desktop"].fps = await home.evaluate(
  () =>
    new Promise((resolve) => {
      let frames = 0;
      const start = performance.now();
      const tick = (t) => {
        frames++;
        if (t - start < 1000) requestAnimationFrame(tick);
        else resolve(frames);
      };
      requestAnimationFrame(tick);
    }),
);

report.pages["home-desktop"].lcp = await home.evaluate(
  () => performance.getEntriesByType("largest-contentful-paint").at(-1)?.startTime ?? null,
);

// scroll through to trigger in-view reveals, then full page shot
const height = homeData.scrollHeight;
for (let y = 0; y < height; y += 700) {
  await home.evaluate((top) => window.scrollTo(0, top), y);
  await home.waitForTimeout(120);
}
await home.waitForTimeout(600);
await home.evaluate(() => window.scrollTo(0, 0));
await home.waitForTimeout(400);
await home.screenshot({ path: "artifacts/home-full.png", fullPage: true });

// section screenshots
await home.locator("#about").scrollIntoViewIfNeeded();
await home.waitForTimeout(700);
await home.screenshot({ path: "artifacts/home-about.png" });
await home.locator("#work").scrollIntoViewIfNeeded();
await home.waitForTimeout(700);
await home.screenshot({ path: "artifacts/home-work.png" });

report.links = homeData.internalLinks;

// projects + contact + 404
const projects = await newPage(desktop);
const projectsResponse = await projects.goto(`${base}/projects`, { waitUntil: "networkidle" });
await inspect(projects, "projects-desktop");
report.pages["projects-desktop"].status = projectsResponse?.status();
await projects.screenshot({ path: "artifacts/projects-full.png", fullPage: true });

const contact = await newPage(desktop);
const contactResponse = await contact.goto(`${base}/contact`, { waitUntil: "networkidle" });
await inspect(contact, "contact-desktop");
report.pages["contact-desktop"].status = contactResponse?.status();

// form validation check
await contact.getByRole("button", { name: /send message/i }).click();
await contact.waitForTimeout(300);
report.pages["contact-desktop"].validationMessage = await contact
  .locator("[aria-live=polite]")
  .textContent();

const notFound = await newPage(desktop);
const nfResponse = await notFound.goto(`${base}/definitely-not-a-page`, {
  waitUntil: "networkidle",
});
await inspect(notFound, "not-found");
report.pages["not-found"].status = nfResponse?.status();

// mobile
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const mobileHome = await newPage(mobile);
await mobileHome.goto(`${base}/`, { waitUntil: "networkidle" });
await mobileHome.waitForTimeout(2500);
const mobileData = await inspect(mobileHome, "home-mobile");
await mobileHome.screenshot({ path: "artifacts/home-mobile-full.png", fullPage: true });

// mobile menu
await mobileHome.evaluate(() => window.scrollTo(0, 0));
await mobileHome.getByRole("button", { name: /open menu/i }).click();
await mobileHome.waitForTimeout(600);
report.pages["home-mobile"].menuLinks = await mobileHome
  .locator("text=Contact")
  .count();
await mobileHome.screenshot({ path: "artifacts/mobile-menu.png" });

// reduced motion
const reduced = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const reducedPage = await newPage(reduced);
await reducedPage.goto(`${base}/`, { waitUntil: "networkidle" });
await reducedPage.waitForTimeout(2000);
report.pages["home-reduced-motion"] = await reducedPage.evaluate(() => ({
  prefersReduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  canvas: !!document.querySelector("canvas"),
  overflowX: document.documentElement.scrollWidth - window.innerWidth,
}));

// internal link status
const linkChecks = [];
for (const href of report.links) {
  const url = new URL(href, base).toString();
  const res = await desktop.request.get(url, { maxRedirects: 3 });
  linkChecks.push({ href, status: res.status() });
}
report.links = linkChecks;

report.failedRequests = [...new Set(report.failedRequests)];
await browser.close();
writeFileSync("artifacts/audit.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
