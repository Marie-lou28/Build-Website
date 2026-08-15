#!/usr/bin/env node
/**
 * Generates the downloadable CV PDF from the live /cv page.
 *
 *   npm run cv:pdf
 *
 * Why this way: the PDF and the web CV are rendered from the same data
 * (src/lib/cv.ts) and the same styles (the @media print block in globals.css),
 * so they can never drift apart. Edit the data, re-run this, commit the PDF.
 *
 * It uses whatever Chrome or Chromium is already on the machine — no extra
 * dependency to install. If it cannot find one, set CHROME_PATH:
 *
 *   CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run cv:pdf
 */

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = process.env.CV_PDF_PORT ?? "4321";
const URL_TO_PRINT = `http://127.0.0.1:${PORT}/cv`;
const OUT_DIR = join(root, "public", "cv");
const OUT_FILE = join(OUT_DIR, "marie-lou-mueller-cv.pdf");

/* ------------------------------------------------------------------ */
/* Find a browser                                                      */
/* ------------------------------------------------------------------ */

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  const candidates = [
    // macOS
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    // Linux
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    // Windows
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ];

  // Playwright-managed builds, if this project ever adds Playwright.
  const pwRoot = process.env.PLAYWRIGHT_BROWSERS_PATH ?? "";
  if (pwRoot && existsSync(pwRoot)) {
    for (const entry of readdirSync(pwRoot)) {
      if (!entry.startsWith("chromium-")) continue;
      const bin = join(pwRoot, entry, "chrome-linux", "chrome");
      if (existsSync(bin)) candidates.push(bin);
    }
  }

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  for (const name of ["google-chrome", "chromium", "chromium-browser"]) {
    const found = spawnSync("which", [name], { encoding: "utf8" });
    if (found.status === 0 && found.stdout.trim()) return found.stdout.trim();
  }

  return null;
}

/* ------------------------------------------------------------------ */
/* Wait for the dev server                                             */
/* ------------------------------------------------------------------ */

async function waitForServer(url, timeoutMs = 120_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

/* ------------------------------------------------------------------ */

async function main() {
  const chrome = findChrome();
  if (!chrome) {
    console.error(
      "\n✗ No Chrome or Chromium found.\n" +
        "  Install Google Chrome, or point CHROME_PATH at an existing binary:\n" +
        '  CHROME_PATH="/path/to/chrome" npm run cv:pdf\n',
    );
    process.exit(1);
  }
  console.log(`→ Browser: ${chrome}`);

  mkdirSync(OUT_DIR, { recursive: true });

  console.log(`→ Starting Next.js on port ${PORT}…`);
  const server = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "dev", "-p", PORT],
    { cwd: root, stdio: "ignore", detached: process.platform !== "win32" },
  );

  const stopServer = () => {
    try {
      if (process.platform === "win32") server.kill();
      else process.kill(-server.pid, "SIGTERM");
    } catch {
      /* already gone */
    }
  };
  process.on("exit", stopServer);
  process.on("SIGINT", () => {
    stopServer();
    process.exit(130);
  });

  try {
    if (!(await waitForServer(URL_TO_PRINT))) {
      throw new Error(`Server did not come up at ${URL_TO_PRINT}`);
    }
    console.log("→ Server ready, printing /cv…");

    const result = spawnSync(
      chrome,
      [
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--no-pdf-header-footer",
        "--run-all-compositor-stages-before-draw",
        // Give fonts and the first render time to settle.
        "--virtual-time-budget=15000",
        `--print-to-pdf=${OUT_FILE}`,
        URL_TO_PRINT,
      ],
      { encoding: "utf8", stdio: ["ignore", "inherit", "pipe"] },
    );

    if (result.status !== 0 || !existsSync(OUT_FILE)) {
      throw new Error(`Chrome failed to print.\n${result.stderr ?? ""}`);
    }

    const kb = (statSync(OUT_FILE).size / 1024).toFixed(0);
    console.log(`\n✓ Wrote public/cv/marie-lou-mueller-cv.pdf (${kb} KB)\n`);
  } finally {
    stopServer();
  }
}

main().catch((error) => {
  console.error(`\n✗ ${error.message}\n`);
  process.exit(1);
});
