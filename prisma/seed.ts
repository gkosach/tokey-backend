import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const dataDir = path.join(__dirname, "seedData");

async function seed() {
  // Очистка данных в правильном порядке
  await prisma.$transaction([
    prisma.stakingRecord.deleteMany(),
    prisma.transaction.deleteMany(),
    prisma.property.deleteMany(),
    prisma.wallet.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const seedOrder = ["user", "wallet", "property", "transaction", "stakingRecord"] as const;

  for (const model of seedOrder) {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, `${model}.json`), "utf-8"));

    await (prisma[model] as any).createMany({ data });
    console.log(`✅ Seeded ${model}`);
  }
}

seed()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
