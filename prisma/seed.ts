import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();
const dataDir = path.join(__dirname, "seedData");

// ... (isValidUUID, getFileTypeFromUrl, getExtensionFromUrl, getFilenameFromUrl)

async function seed() {
  console.log("🌱 Starting database seeding...");

  // Новый порядок удаления с учетом зависимостей
  await prisma.tokenTransaction.deleteMany();
  await prisma.propertyTier.deleteMany();
  await prisma.files.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();
  console.log("🗑️ Cleared existing data");

  // Сначала создаем пользователей и свойства
  await seedModel("user");
  await seedModel("property");

  // Затем создаем файлы, используя реальные ID свойств
  await seedFiles();

  // Создаем остальные данные
  await seedModel("property_tier");
  await seedModel("token_transaction");

  console.log("🎉 Database seeding completed!");
}

async function seedModel(modelName: string) {
  const filePath = path.join(dataDir, `${modelName}.json`);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ File ${modelName}.json not found, skipping`);
    return;
  }

  const rawData = fs.readFileSync(filePath, "utf-8");
  let data = JSON.parse(rawData);

  if (modelName === "property") {
    data = data.map((property: any) => {
      const { media, ...rest } = property;
      return rest;
    });
  }

  try {
    switch (modelName) {
      case "user":
        await prisma.user.createMany({ data, skipDuplicates: true });
        break;
      case "property":
        await prisma.property.createMany({ data, skipDuplicates: true });
        break;
      case "property_tier":
        await prisma.propertyTier.createMany({ data, skipDuplicates: true });
        break;
      case "token_transaction":
        await prisma.tokenTransaction.createMany({ data, skipDuplicates: true });
        break;
    }
    console.log(`✅ Seeded ${modelName} (${data.length} records)`);
  } catch (error: any) {
    console.error(`❌ Error seeding ${modelName}:`, error.message);
    throw error;
  }
}

async function seedFiles() {
  const filePath = path.join(dataDir, "files.json");

  if (!fs.existsSync(filePath)) {
    console.log("⚠️ File files.json not found, skipping");
    return;
  }

  const filesData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Получаем все существующие свойства
  const properties = await prisma.property.findMany();
  const propertyIds = properties.map((p) => p.id);

  const validFilesData = filesData.filter((file: any) => propertyIds.includes(file.propertyId));

  if (validFilesData.length > 0) {
    await prisma.files.createMany({
      data: validFilesData,
      skipDuplicates: true,
    });
    console.log(`✅ Seeded files (${validFilesData.length} records)`);
  } else {
    console.log("⚠️ No valid files to seed");
  }
}

seed()
  .catch((e) => {
    console.error("❌ Critical error:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
