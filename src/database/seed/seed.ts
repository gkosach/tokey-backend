import { AppDataSource } from "@/src/common/config/typeorm.config";
import { Application, Lease, Payment, Property, User, UserFavorites } from "@/src/database/entities";
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
      await manager.delete(UserFavorites, {});
      await manager.delete(Payment, {});
      await manager.delete(Application, {});
      await manager.delete(Lease, {});
      await manager.delete(Property, {});
      await manager.delete(User, {});
    });

    /**
     * 1. Тестовый пользователь German
     */
    const testUser = await manager.save(User, {
      id: "64187488-1031-702a-6548-1f285780f4e7",
      name: "German Kosach",
      email: "german1kosach@gmial.com",
      phoneNumber: "+79161234567",
      role: "manager",
    });

    /**
     * 2. 3 случайных пользователя
     */
    const users = await manager.save(
      User,
      Array.from({ length: 3 }).map(() => {
        return {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phoneNumber: "+7##########", // +79211234567
          role: faker.helpers.arrayElement(["investor"]),
        };
      }),
    );
    /**
     * 3. 3 объекта недвижимости German
     */
    const properties = await manager.save(
      Property,
      Array.from({ length: 3 }).map((_, i) => {
        return {
          id: faker.string.uuid(),
          name: `German's Property ${i + 1}`,
          description: `Prime location property #${i + 1}`,
          pricePerMonth: 2000 + i * 500,
          securityDeposit: 1500,
          applicationFee: 100,
          photoUrls: [faker.image.urlLoremFlickr({ category: "apartment" })],
          manager: testUser,
          beds: 2 + i,
          baths: 1 + i * 0.5,
          squareFeet: 800 + i * 200,
          propertyType: "Apartment",
          address: `ул. Тестовая, д. ${i + 1}`,
          city: "Санкт-Петербург",
          state: "SPB",
          country: "Россия",
          postalCode: "190000",
          latitude: 59.93428 + i * 0.01,
          longitude: 30.3351 + i * 0.01,
        };
      }),
    );

    /**
     * 4. 3 договора аренды
     */
    const leases = await manager.save(
      Lease,
      properties.map((property, i) => {
        return {
          id: faker.string.uuid(),
          startDate: new Date(2025, 0, 1),
          endDate: new Date(2025 + i, 0, 1),
          rent: property.pricePerMonth,
          deposit: property.securityDeposit,
          property: property,
          investor: users[i],
          manager: testUser,
        };
      }),
    );

    /**
     * 5. 3 заявки на аренду
     */
    await manager.save(
      Application,
      leases.map((lease) => {
        return {
          id: faker.string.uuid(),
          status: "approved",
          message: "Очень хочу снять это жильё!",
          property: lease.property,
          applicant: users[0],
        };
      }),
    );

    /**
     *  6. 3 платежа
     */
    await manager.save(
      Payment,
      leases.flatMap((lease) => {
        return Array.from({ length: 1 }).map(() => {
          return {
            id: faker.string.uuid(),
            amountDue: lease.rent,
            amountPaid: lease.rent,
            dueDate: new Date(2025, 0, 1),
            paymentDate: new Date(2025, 0, 1),
            paymentStatus: "paid",
            lease: lease,
          };
        });
      }),
    );

    /**
     *  7. 3 избранных объекта
     */
    await manager.save(
      UserFavorites,
      Array.from({ length: 3 }).map((_, i) => {
        return {
          userId: users[i].id,
          propertyId: properties[i].id,
        };
      }),
    );

    console.log("✅ Тестовые данные созданы:");
    console.log(`👨💼 Менеджер: ${testUser.email}`);
    console.log(`🏠 Объектов: ${properties.length}`);
    console.log(`📑 Договоров: ${leases.length}`);
  } catch (error) {
    console.error("Ошибка при создании тестовых данных:", error);
  } finally {
    await AppDataSource.destroy();
  }
}

seedDatabase();
