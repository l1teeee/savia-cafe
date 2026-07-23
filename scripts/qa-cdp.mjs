import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const endpoint = process.env.CDP_ENDPOINT ?? "http://127.0.0.1:9224";
const siteUrl = process.env.SITE_URL ?? "http://127.0.0.1:3000";
const screenshotDir = process.env.SCREENSHOT_DIR;
const target = await fetch(
  `${endpoint}/json/new?${encodeURIComponent("about:blank")}`,
  { method: "PUT" },
).then((response) => response.json());

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});
console.error("qa: connected");

let nextId = 1;
const pending = new Map();
const eventWaiters = new Map();

socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);

  if (message.id) {
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message));
    else waiter.resolve(message.result);
    return;
  }

  const waiter = eventWaiters.get(message.method);
  if (waiter) {
    eventWaiters.delete(message.method);
    waiter(message.params);
  }
});

function send(method, params = {}) {
  const id = nextId++;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
  });
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    const detail = result.exceptionDetails.exception?.description;
    throw new Error(detail ?? result.exceptionDetails.text);
  }

  return result.result.value;
}

async function delay(milliseconds = 80) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function captureScreenshot(filename) {
  if (!screenshotDir) return;

  await mkdir(screenshotDir, { recursive: true });
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  await writeFile(path.join(screenshotDir, filename), data, "base64");
}

await send("Page.enable");
await send("Runtime.enable");

const viewports = [];

for (const width of [390, 768, 1280, 1440]) {
  console.error(`qa: viewport ${width} start`);
  const height = width === 390 ? 844 : 1000;
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 768,
  });

  await send("Page.navigate", { url: `${siteUrl}?qa=viewport-${width}` });
  console.error(`qa: viewport ${width} navigated`);
  await delay(1200);
  await evaluate(`Promise.race([
    Promise.all([
      document.fonts.ready,
      document.querySelector("#inicio img")?.decode().catch(() => undefined)
    ]),
    new Promise((resolve) => setTimeout(resolve, 2500))
  ])`);
  console.error(`qa: viewport ${width} media ready`);
  await delay(250);

  viewports.push(
    await evaluate(`(() => {
      const h1 = document.querySelector("h1");
      const hero = document.querySelector("#inicio");
      const heroCopy = h1?.parentElement;
      const heroImage = hero?.querySelector("figure img");
      const header = document.querySelector("header");
      const rect = (element) => element
        ? Object.fromEntries(["left", "right", "top", "bottom", "width", "height"]
            .map((key) => [key, Math.round(element.getBoundingClientRect()[key])]))
        : null;

      return {
        requestedWidth: ${width},
        innerWidth: window.innerWidth,
        clientWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        h1: rect(h1),
        heroCopy: rect(heroCopy),
        heroImage: rect(heroImage),
        headingVisuallyHidden: h1?.classList.contains("sr-only") ?? false,
        headingText: h1?.textContent?.trim() ?? "",
        discoverCtaPresent: Boolean(hero?.querySelector('a[href="#nuestro-cafe"]')),
        heroCtaCount: hero?.querySelectorAll("a, button").length ?? 0,
        header: rect(header),
      };
    })()`),
  );
  await captureScreenshot(`hero-${width}.png`);
  console.error(`qa: viewport ${width} measured`);
}

await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await send("Page.navigate", { url: `${siteUrl}?qa=interactions` });
console.error("qa: interactions navigated");
await delay(1200);
await delay(1000);

const interactions = {};

interactions.menuButtonFound = await evaluate(`(() => {
  const button = document.querySelector('[aria-controls="mobile-menu"]');
  button?.click();
  return Boolean(button);
})()`);
console.error("qa: menu clicked");
await delay(350);
interactions.menuDialog = await evaluate(
  `Boolean(document.querySelector('#mobile-menu[role="dialog"][aria-modal="true"]'))`,
);
interactions.menuFocus = await evaluate(
  `document.activeElement?.getAttribute("aria-label")`,
);
await captureScreenshot("header-menu-mobile.png");

await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape" });
await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape" });
await delay(650);
interactions.menuClosedWithEscape = await evaluate(
  `!document.querySelector('#mobile-menu')`,
);

await evaluate(`document.querySelector('[aria-label="Mi bolsa"]')?.click()`);
await delay(350);
interactions.bagDialog = await evaluate(
  `document.querySelector('[role="dialog"] h2')?.textContent?.trim()`,
);
await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape" });
await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape" });
await delay(650);
interactions.bagClosedWithEscape = await evaluate(
  `!document.querySelector('[role="dialog"]')`,
);

await evaluate(`document.querySelector('[aria-controls="mobile-menu"]')?.click()`);
await delay(350);
await evaluate(`(() => {
  const button = [...document.querySelectorAll('#mobile-menu button')]
    .find((element) => element.textContent?.trim() === "Buscar");
  button?.click();
})()`);
await delay(350);
interactions.searchDialog = await evaluate(
  `document.querySelector('[role="dialog"] h2')?.textContent?.trim()`,
);
interactions.searchFocus = await evaluate(
  `document.activeElement?.getAttribute("type")`,
);
await evaluate(`(() => {
  const input = document.querySelector('input[type="search"]');
  if (!input) return false;
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
  setter.call(input, "Aurora");
  input.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
})()`);
await delay();
interactions.searchResult = await evaluate(
  `document.querySelector('[aria-live="polite"] button')?.textContent?.trim()`,
);

await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape" });
await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape" });
await delay(650);
await evaluate(`document.querySelector('[aria-controls="mobile-menu"]')?.click()`);
await delay(350);
interactions.accountButtonFound = await evaluate(`(() => {
  const button = [...document.querySelectorAll('#mobile-menu button')]
    .find((element) => element.textContent?.trim() === "Mi cuenta");
  button?.click();
  return Boolean(button);
})()`);
await delay(350);
interactions.accountDialog = await evaluate(
  `document.querySelector('[role="dialog"] h2')?.textContent?.trim()`,
);

const report = { viewports, interactions };
const hasOverflow = viewports.some(
  ({ innerWidth, documentScrollWidth }) => documentScrollWidth > innerWidth,
);
const heroPass = viewports.every(
  ({
    heroImage,
    headingVisuallyHidden,
    headingText,
    discoverCtaPresent,
    heroCtaCount,
  }) =>
    heroImage?.width > 0 &&
    heroImage?.height > 0 &&
    !headingVisuallyHidden &&
    headingText === "Savia Café" &&
    !discoverCtaPresent &&
    heroCtaCount === 0,
);
const interactionsPass =
  interactions.menuButtonFound &&
  interactions.menuDialog &&
  interactions.menuClosedWithEscape &&
  interactions.bagDialog === "Tu bolsa" &&
  interactions.bagClosedWithEscape &&
  interactions.searchDialog?.startsWith("Buscar en") &&
  interactions.searchFocus === "search" &&
  interactions.searchResult?.startsWith("Aurora") &&
  interactions.accountButtonFound &&
  interactions.accountDialog === "Mi cuenta";
console.log(JSON.stringify(report, null, 2));
socket.close();

if (hasOverflow || !heroPass || !interactionsPass) {
  process.exitCode = 1;
}
