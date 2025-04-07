import { AppDataSource } from "@/src/common/config/typeorm.config";
import { Property, User } from "@/src/database/entities";
import { faker } from "@faker-js/faker/locale/en";

async function seedDatabase() {
  await AppDataSource.initialize();
  const manager = AppDataSource.manager;

  try {
    /**
     * Очистка базы
     */
    const tablesExist = await AppDataSource.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('users', 'properties')
      )
    `);

    if (!tablesExist[0].exists) {
      throw new Error("Сначала выполните миграции!");
    }

    /**
     * Очистка данных (не структур)
     */
    await AppDataSource.transaction(async (manager) => {
      await manager.delete(Property, {});
      await manager.delete(User, {});
    });

    /**
     * 1. Создание тестового пользователя (менеджера)
     */
    const testUser = await manager.save(User, {
      id: "64187488-1031-702a-6548-1f285780f4e7",
      name: "German Kosach",
      email: "german1kosach@gmial.com",
      role: "manager",
    });

    /**
     * 2. Создание объекта недвижимости в Дубае
     */
    const dubaiProperty = await manager.save(Property, {
      id: faker.string.uuid(),
      name: "Luxury Apartment in Dubai",
      description: "A stunning luxury apartment located in the heart of Dubai.",
      pricePerMonth: 5000,
      securityDeposit: 2500,
      applicationFee: 200,
      photoUrls: [faker.image.urlLoremFlickr({ category: "apartment" })],
      manager: testUser,
      beds: 3,
      baths: 2.5,
      squareFeet: 1500,
      address: "Downtown Dubai, Burj Khalifa Street",
      postalCode: "00000",
      latitude: 25.1972,
      longitude: 55.2744,
    });

    console.log("✅ Тестовые данные созданы:");
    console.log(`👨💼 Менеджер: ${testUser.email}`);
    console.log("🏠 Объект недвижимости в Дубае добавлен:", dubaiProperty.name);
  } catch (error) {
    console.error("Ошибка при создании тестовых данных:", error);
  } finally {
    await AppDataSource.destroy();
  }
}

seedDatabase();
