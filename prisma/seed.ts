import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();
const dataDir = path.join(__dirname, "seedData");

function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

function validateData(modelName: string, data: any[]): void {
  for (const [index, item] of data.entries()) {
    switch (modelName) {
      case "user":
        if (!isValidUUID(item.id)) throw new Error(`Invalid UUID in user.id: ${item.id}`);
        break;
      case "property":
        if (!isValidUUID(item.id)) throw new Error(`Invalid UUID in property.id: ${item.id}`);
        break;
      case "property_tier":
        if (!isValidUUID(item.id)) {
          console.error(`Invalid UUID at index ${index}: ${item.id}`);
          throw new Error(`Invalid UUID in tier.id: ${item.id}`);
        }
        break;
      case "token_transaction":
        if (!isValidUUID(item.id)) throw new Error(`Invalid UUID in transaction.id: ${item.id}`);
        if (!isValidUUID(item.userId)) throw new Error(`Invalid UUID in transaction.userId: ${item.userId}`);
        if (!isValidUUID(item.tierId)) throw new Error(`Invalid UUID in transaction.tierId: ${item.tierId}`);
        break;
    }
  }
}

async function seed() {
  console.log("🌱 Starting database seeding...");

  await prisma.tokenTransaction.deleteMany();
  await prisma.propertyTier.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();
  console.log("🗑️ Cleared existing data");

  const seedOrder = ["user", "property", "property_tier", "token_transaction"];

  for (const modelName of seedOrder) {
    const filePath = path.join(dataDir, `${modelName}.json`);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ File ${modelName}.json not found, skipping`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    validateData(modelName, data);
    console.log(`✅ Validation passed for ${modelName}`);

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

  console.log("🎉 Database seeding completed!");
}

seed()
  .catch((e) => {
    console.error("❌ Critical error:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
