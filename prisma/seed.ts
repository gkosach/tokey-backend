import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const dataDir = path.join(__dirname, "seedData");

// Функция для преобразования kebab-case в PascalCase
function toPascalCase(str: string) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

async function seed() {
  const seedOrder = [
    "location.json",
    "manager.json",
    "investor.json",
    "property.json",
    "application.json",
    "payment-history.json", // Преобразуется в PaymentHistory
  ];

  for (const file of seedOrder) {
    const baseName = file.replace(".json", "");
    const modelName = toPascalCase(baseName); // payment-history → PaymentHistory
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf-8"));

    // @ts-ignore
    await prisma[modelName].createMany({ data });
    console.log(`Seeded ${modelName}`);
  }
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
