const { existsSync } = require("fs");
const { join } = require("path");
const { execSync } = require("child_process");
const fs = require("fs");

async function runTestsWithBadges() {
  console.log("\x1b[36m🚀 Starting automated test & badge generation...\x1b[0m\n");

  try {
    // 1. Запускаем тесты с покрытием
    console.log("\x1b[33m📊 Running tests with coverage...\x1b[0m");
    execSync("npm run test", { stdio: "inherit" });

    // 2. Проверяем, что coverage-summary.json создался
    if (!existsSync(join(__dirname, "../non-bll-scripts/generate-badges.js"))) {
      throw new Error("generate-badges.js not found");
    }

    // 3. Генерируем бейджи
    console.log("\n\x1b[33m🎨 Generating coverage badges...\x1b[0m");
    execSync("node non-bll-scripts/generate-badges.js", { stdio: "inherit" });

    console.log("\n\x1b[32m✅ All operations completed successfully!\x1b[0m");
  } catch (error) {
    console.error("\n\x1b[31m❌ Error during test execution:\x1b[0m", error.message);
    process.exit(1);
  }
}

runTestsWithBadges();
