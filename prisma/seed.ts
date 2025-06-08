import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();
const dataDir = path.join(__dirname, "seedData");

/**
 * Основная функция для заполнения базы данных тестовыми данными
 */
async function seed() {
  console.log("🌱 Начинаем заполнение базы данных...");
  await prisma.$transaction([prisma.transaction.deleteMany(), prisma.property.deleteMany(), prisma.user.deleteMany()]);
  console.log("🗑️ Очистили существующие данные");
  const seedOrder = ["user", "property", "transaction"] as const;
  for (const model of seedOrder) {
    const filePath = path.join(dataDir, `${model}.json`);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ Файл ${model}.json не найден, пропускаем`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await (prisma[model] as any).createMany({
      data,
      skipDuplicates: true,
    });

    console.log(`✅ Заполнили таблицу ${model} (${data.length} записей)`);
  }

  console.log("🎉 Заполнение базы данных завершено!");
}

seed()
  .catch((e) => {
    console.error("❌ Ошибка при заполнении базы данных:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
