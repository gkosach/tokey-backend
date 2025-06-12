import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();
const dataDir = path.join(__dirname, "seedData");

/**
 * Валидация UUID формата
 */
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Валидация данных перед вставкой
 */
function validateData(modelName: string, data: any[]): void {
  for (const item of data) {
    switch (modelName) {
      case "user":
        if (!isValidUUID(item.id)) {
          throw new Error(`Invalid UUID in user.id: ${item.id}`);
        }
        break;
      case "wallet":
        if (!isValidUUID(item.userId)) {
          throw new Error(`Invalid UUID in wallet.userId: ${item.userId}`);
        }
        break;
      case "property":
        if (!isValidUUID(item.id)) {
          throw new Error(`Invalid UUID in property.id: ${item.id}`);
        }
        if (!isValidUUID(item.developerId)) {
          throw new Error(`Invalid UUID in property.developerId: ${item.developerId}`);
        }
        break;
      case "token-transaction":
        if (!isValidUUID(item.id)) {
          throw new Error(`Invalid UUID in transaction.id: ${item.id}`);
        }
        if (!isValidUUID(item.userId)) {
          throw new Error(`Invalid UUID in transaction.userId: ${item.userId}`);
        }
        if (!isValidUUID(item.propertyId)) {
          throw new Error(`Invalid UUID in transaction.propertyId: ${item.propertyId}`);
        }
        break;
    }
  }
}

/**
 * Основная функция для заполнения базы данных тестовыми данными
 */
async function seed() {
  console.log("🌱 Начинаем заполнение базы данных...");

  try {
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      console.log("📊 База данных уже содержит данные, очищаем...");

      await prisma.tokenTransaction.deleteMany();
      await prisma.property.deleteMany();
      await prisma.wallet.deleteMany();
      await prisma.user.deleteMany();

      console.log("🗑️ Очистили существующие данные");
    }

    const seedOrder = ["user", "wallet", "property", "token-transaction"] as const;

    for (const modelName of seedOrder) {
      const filePath = path.join(dataDir, `${modelName}.json`);

      if (!fs.existsSync(filePath)) {
        console.log(`⚠️ Файл ${modelName}.json не найден, пропускаем`);
        continue;
      }

      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      try {
        validateData(modelName, data);
        console.log(`✅ Валидация ${modelName} прошла успешно`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`❌ Ошибка валидации ${modelName}:`, error.message);
        } else {
          console.error(`❌ Неизвестная ошибка валидации ${modelName}:`, error);
        }
        throw error;
      }

      try {
        switch (modelName) {
          case "user":
            await prisma.user.createMany({ data, skipDuplicates: true });
            break;
          case "wallet":
            await prisma.wallet.createMany({ data, skipDuplicates: true });
            break;
          case "property":
            await prisma.property.createMany({ data, skipDuplicates: true });
            break;
          case "token-transaction":
            await prisma.tokenTransaction.createMany({ data, skipDuplicates: true });
            break;
        }
        console.log(`✅ Заполнили таблицу ${modelName} (${data.length} записей)`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(`⚠️ Не удалось заполнить таблицу ${modelName}:`, error.message);
        } else {
          console.log(`⚠️ Неизвестная ошибка при заполнении таблицы ${modelName}:`, error);
        }
        throw error;
      }
    }

    console.log("🎉 Заполнение базы данных завершено!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Ошибка при заполнении базы данных:", error.message);
    } else {
      console.error("❌ Неизвестная ошибка при заполнении базы данных:", error);
    }
    throw error;
  }
}

seed()
  .catch((e: unknown) => {
    if (e instanceof Error) {
      console.error("❌ Критическая ошибка:", e.message);
    } else {
      console.error("❌ Неизвестная критическая ошибка:", e);
    }
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
