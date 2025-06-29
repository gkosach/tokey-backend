const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

if (!fs.existsSync("./coverage/coverage-summary.json")) {
  console.error("❌ Coverage data not found. Run tests first!");
  process.exit(1);
}

const COVERAGE_DIR = "./assets/coverage";
const COVERAGE_SUMMARY = "./coverage/coverage-summary.json";

function hackerLoader(text, duration = 2000) {
  const frames = [
    "▰▱▱▱▱▱▱▱▱▱",
    "▰▰▱▱▱▱▱▱▱▱",
    "▰▰▰▱▱▱▱▱▱▱",
    "▰▰▰▰▱▱▱▱▱▱",
    "▰▰▰▰▰▱▱▱▱▱",
    "▰▰▰▰▰▰▱▱▱▱",
    "▰▰▰▰▰▰▰▱▱▱",
    "▰▰▰▰▰▰▰▰▱▱",
    "▰▰▰▰▰▰▰▰▰▱",
    "▰▰▰▰▰▰▰▰▰▰",
  ];

  const glitchChars = ["█", "▓", "▒", "░", "▄", "▀"];
  let frameIndex = 0;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const frame = frames[frameIndex % frames.length];
      const glitch = Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : "";

      process.stdout.write(`\r\x1b[36m⚡ ${text} \x1b[32m${frame}\x1b[0m ${glitch}`);
      frameIndex++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      process.stdout.write(`\r\x1b[36m⚡ ${text} \x1b[32m▰▰▰▰▰▰▰▰▰▰\x1b[0m ✓\n`);
      resolve();
    }, duration);
  });
}

function matrixLog(message, type = "info") {
  const colors = {
    info: "\x1b[32m", // зеленый
    success: "\x1b[92m", // ярко-зеленый
    warning: "\x1b[33m", // желтый
    error: "\x1b[31m", // красный
  };

  const symbols = ["◆", "◇", "◈", "◉", "◎"];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];

  console.log(`${colors[type]}${symbol} ${message}\x1b[0m`);
}

async function generateBadges() {
  // Инициализация
  await hackerLoader("INITIALIZING BADGE GENERATOR", 1000);

  if (!fs.existsSync(COVERAGE_DIR)) {
    fs.mkdirSync(COVERAGE_DIR, { recursive: true });
  }

  // Check if coverage file exists
  if (!fs.existsSync(COVERAGE_SUMMARY)) {
    matrixLog("COVERAGE DATA NOT FOUND - RUN TESTS FIRST", "error");
    process.exit(1);
  }

  // Очистка старых данных
  await hackerLoader("PURGING OLD ARTIFACTS", 800);

  const existingBadges = fs.readdirSync(COVERAGE_DIR).filter((file) => file.endsWith(".svg"));
  existingBadges.forEach((file) => fs.unlinkSync(path.join(COVERAGE_DIR, file)));

  // Анализ coverage данных
  await hackerLoader("ANALYZING COVERAGE MATRIX", 1200);

  const coverageData = JSON.parse(fs.readFileSync(COVERAGE_SUMMARY, "utf8"));
  const total = coverageData.total;

  const metrics = {
    coverage: Math.round(total.lines.pct),
    statements: Math.round(total.statements.pct),
    branches: Math.round(total.branches.pct),
    functions: Math.round(total.functions.pct),
  };

  // Генерация бейджей
  await hackerLoader("COMPILING BADGE ALGORITHMS", 1500);

  Object.entries(metrics).forEach(([metric, percentage]) => {
    const outputFile = path.join(COVERAGE_DIR, `badge-${metric}.svg`);
    const command = `npx coverage-badges --source ${COVERAGE_SUMMARY} --output ${outputFile} --label ${metric} --jsonPath total.${getJsonPath(metric)}.pct`;

    try {
      execSync(command, { stdio: "pipe" });
      if (!fs.existsSync(outputFile)) {
        createManualBadge(metric, percentage, outputFile);
      }
    } catch (error) {
      createManualBadge(metric, percentage, outputFile);
    }
  });

  // Финализация
  await hackerLoader("FINALIZING OPERATIONS", 800);

  const generatedBadges = fs.readdirSync(COVERAGE_DIR).filter((file) => file.endsWith(".svg"));

  console.log("\n\x1b[92m┌─────────────────────────────────────┐\x1b[0m");
  console.log("\x1b[92m│         MISSION ACCOMPLISHED       │\x1b[0m");
  console.log("\x1b[92m└─────────────────────────────────────┘\x1b[0m\n");

  matrixLog(`GENERATED ${generatedBadges.length} COVERAGE ARTIFACTS:`, "success");

  Object.entries(metrics).forEach(([metric, percentage]) => {
    const statusColor = percentage >= 80 ? "success" : percentage >= 60 ? "warning" : "error";
    const bar = "█".repeat(Math.floor(percentage / 10)) + "░".repeat(10 - Math.floor(percentage / 10));
    matrixLog(`${metric.toUpperCase().padEnd(12)} │${bar}│ ${percentage}%`, statusColor);
  });

  console.log("\n\x1b[36m⚡ BADGES DEPLOYED TO: \x1b[32m./assets/coverage/\x1b[0m\n");
}

function getJsonPath(metric) {
  const paths = {
    coverage: "lines",
    statements: "statements",
    branches: "branches",
    functions: "functions",
  };
  return paths[metric] || "lines";
}

function createManualBadge(metric, percentage, outputFile) {
  const color = getColor(percentage);
  const metricWidth = metric.length * 7 + 10;
  const totalWidth = metricWidth + 50;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
    <linearGradient id="b" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
      <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <mask id="a">
      <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
    </mask>
    <g mask="url(#a)">
      <path fill="#555" d="M0 0h${metricWidth}v20H0z"/>
      <path fill="${color}" d="M${metricWidth} 0h50v20H${metricWidth}z"/>
      <path fill="url(#b)" d="M0 0h${totalWidth}v20H0z"/>
    </g>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
      <text x="${metricWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${metric}</text>
      <text x="${metricWidth / 2}" y="14">${metric}</text>
      <text x="${metricWidth + 25}" y="15" fill="#010101" fill-opacity=".3">${percentage}%</text>
      <text x="${metricWidth + 25}" y="14">${percentage}%</text>
    </g>
  </svg>`;

  fs.writeFileSync(outputFile, svg);
}

function getColor(percentage) {
  if (percentage >= 90) return "#4c1";
  if (percentage >= 80) return "#97ca00";
  if (percentage >= 70) return "#a4a61d";
  if (percentage >= 60) return "#dfb317";
  if (percentage >= 50) return "#fe7d37";
  return "#e05d44";
}

generateBadges().catch((error) => {
  matrixLog(`SYSTEM ERROR: ${error.message}`, "error");
  process.exit(1);
});
