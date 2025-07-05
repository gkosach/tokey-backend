const fs = require("fs");
const path = require("path");

const huskyDir = ".husky";

// Создаем папку .husky
if (!fs.existsSync(huskyDir)) {
  fs.mkdirSync(huskyDir);
}

// Pre-push хук
const prePushContent = `#!/usr/bin/env sh

echo "\\n\\x1b[36m╔══════════════════════════════════════╗\\x1b[0m"
echo "\\x1b[36m║        🛡️  SECURITY PROTOCOL        ║\\x1b[0m"
echo "\\x1b[36m╚══════════════════════════════════════╝\\x1b[0m\\n"

echo "\\x1b[33m⚡ INITIATING PRE-PUSH VALIDATION...\\x1b[0m\\n"

npm run test:badges

if [ $? -eq 0 ]; then
    echo "\\n\\x1b[92m┌─────────────────────────────────────┐\\x1b[0m"
    echo "\\x1b[92m│     ✅ VALIDATION SUCCESSFUL       │\\x1b[0m"
    echo "\\x1b[92m│     🚀 PUSH AUTHORIZED             │\\x1b[0m"
    echo "\\x1b[92m└─────────────────────────────────────┘\\x1b[0m\\n"
    
    if [ -n "$(git status --porcelain assets/coverage/)" ]; then
        echo "\\x1b[36m🎯 UPDATING COVERAGE ARTIFACTS...\\x1b[0m"
        git add assets/coverage/
        git commit --amend --no-edit --no-verify
        echo "\\x1b[32m✓ Coverage badges updated\\x1b[0m\\n"
    fi
    
    exit 0
else
    echo "\\n\\x1b[91m┌─────────────────────────────────────┐\\x1b[0m"
    echo "\\x1b[91m│     ❌ VALIDATION FAILED           │\\x1b[0m"
    echo "\\x1b[91m│     🚫 PUSH BLOCKED                │\\x1b[0m"
    echo "\\x1b[91m└─────────────────────────────────────┘\\x1b[0m\\n"
    echo "\\x1b[31m💀 Fix tests before pushing to repository\\x1b[0m\\n"
    exit 1
fi
`;

// Pre-commit хук
const preCommitContent = `#!/usr/bin/env sh

echo "\\n\\x1b[35m╔══════════════════════════════════════╗\\x1b[0m"
echo "\\x1b[35m║       🔍 CODE QUALITY CHECK         ║\\x1b[0m"
echo "\\x1b[35m╚══════════════════════════════════════╝\\x1b[0m\\n"

echo "\\x1b[33m⚡ SCANNING CODE QUALITY...\\x1b[0m"

echo "\\x1b[36m🔧 Checking TypeScript compilation...\\x1b[0m"
npx tsc --noEmit

if [ $? -ne 0 ]; then
    echo "\\x1b[31m❌ TypeScript compilation failed\\x1b[0m"
    exit 1
fi

echo "\\x1b[36m🔍 Running ESLint...\\x1b[0m"
npm run lint

if [ $? -ne 0 ]; then
    echo "\\x1b[31m❌ ESLint check failed\\x1b[0m"
    exit 1
fi

echo "\\x1b[92m✅ PRE-COMMIT CHECKS PASSED\\x1b[0m\\n"
`;

// Записываем файлы
// fs.writeFileSync(path.join(huskyDir, "pre-push"), prePushContent);
fs.writeFileSync(path.join(huskyDir, "pre-commit"), preCommitContent);

if (process.platform !== "win32") {
  //   fs.chmodSync(path.join(huskyDir, "pre-push"), "755");
  fs.chmodSync(path.join(huskyDir, "pre-commit"), "755");
}

console.log("🎯 Husky hooks created successfully!");
