/**
 * Snapshot regression tests for all calculator scenarios.
 *
 * Usage:
 *   npm run test:scenarios          → compare results against stored snapshots
 *   npm run test:scenarios -- --update  → regenerate snapshots (after intentional changes)
 *
 * Requires the dev server to be running: npm run dev
 */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SNAPSHOTS_PATH = join(__dirname, '../src/test/snapshots.json');
const { default: scenarios } = await import('../src/test/testScenarios.mjs');
const UPDATE = process.argv.includes('--update');
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

const GREEN  = '\x1b[32m';
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BOLD   = '\x1b[1m';
const RESET  = '\x1b[0m';

async function runScenario(page, scenario) {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => typeof window.__runTestScenario === 'function', { timeout: 10000 });

  await page.evaluate((s) => window.__runTestScenario(s), scenario);
  await page.waitForTimeout(500);

  const cells = await page.$$eval('td', tds => tds.map(td => td.innerText.trim()).filter(t => t));
  const rows = [];
  for (let i = 0; i < cells.length; i += 3) {
    const parts = cells[i].split('\n');
    rows.push({
      name:  parts[0],
      euro:  cells[i + 1],
      lei:   cells[i + 2],
      avans: parts.length > 2 ? parts[2] : null
    });
  }
  return rows;
}

function diffRows(expected, actual) {
  const diffs = [];
  for (let i = 0; i < Math.max(expected.length, actual.length); i++) {
    const e = expected[i];
    const a = actual[i];
    if (!a) { diffs.push(`  row ${i}: missing (expected ${e.name})`); continue; }
    if (!e) { diffs.push(`  row ${i}: unexpected (${a.name})`);       continue; }
    const changes = [];
    if (e.euro  !== a.euro)  changes.push(`euro:  ${e.euro}  →  ${a.euro}`);
    if (e.lei   !== a.lei)   changes.push(`lei:   ${e.lei}  →  ${a.lei}`);
    if (e.avans !== a.avans) changes.push(`avans: ${e.avans}  →  ${a.avans}`);
    if (changes.length) diffs.push(`  ${e.name}: ${changes.join(' | ')}`);
  }
  return diffs;
}

// ── main ──────────────────────────────────────────────────────────────────────

let browser;
try {
  browser = await chromium.launch({ headless: true });
} catch {
  console.error(`${RED}Could not launch Chromium. Run: npx playwright install chromium${RESET}`);
  process.exit(1);
}

const page = await browser.newPage();

// Check server is up
try {
  await page.goto(BASE_URL, { timeout: 5000 });
} catch {
  console.error(`${RED}Dev server not reachable at ${BASE_URL}. Start it with: npm run dev${RESET}`);
  await browser.close();
  process.exit(1);
}

console.log(`\n${BOLD}Running ${scenarios.length} scenario(s) against ${BASE_URL}${RESET}\n`);

const results = [];
for (const scenario of scenarios) {
  process.stdout.write(`  Running: ${scenario.label}...`);
  const rows = await runScenario(page, scenario);
  results.push({ label: scenario.label, rows });
  process.stdout.write(' done\n');
}

await browser.close();
console.log('');

// ── update mode ───────────────────────────────────────────────────────────────
if (UPDATE || !existsSync(SNAPSHOTS_PATH)) {
  writeFileSync(SNAPSHOTS_PATH, JSON.stringify(results, null, 2));
  const action = existsSync(SNAPSHOTS_PATH) ? 'updated' : 'created';
  console.log(`${YELLOW}${BOLD}Snapshots ${action}${RESET} → src/test/snapshots.json\n`);
  results.forEach(s => console.log(`  ${YELLOW}✓${RESET} ${s.label}`));
  console.log('');
  process.exit(0);
}

// ── compare mode ──────────────────────────────────────────────────────────────
const snapshots = JSON.parse(readFileSync(SNAPSHOTS_PATH, 'utf8'));
let passed = 0;
let failed = 0;

results.forEach((result, i) => {
  const snap = snapshots[i];
  if (!snap) {
    console.log(`${YELLOW}⚠  ${result.label} — no snapshot (run --update to add it)${RESET}`);
    return;
  }
  const diffs = diffRows(snap.rows, result.rows);
  if (diffs.length === 0) {
    console.log(`${GREEN}✓  ${result.label}${RESET}`);
    passed++;
  } else {
    console.log(`${RED}✗  ${result.label}${RESET}`);
    diffs.forEach(d => console.log(`${RED}${d}${RESET}`));
    failed++;
  }
});

if (snapshots.length > results.length) {
  console.log(`\n${YELLOW}⚠  ${snapshots.length - results.length} orphan snapshot(s) — run --update to clean up${RESET}`);
}

console.log(`\n${BOLD}${failed === 0 ? GREEN : RED}${passed} passed, ${failed} failed${RESET}\n`);
process.exit(failed > 0 ? 1 : 0);
