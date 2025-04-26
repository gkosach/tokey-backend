/**
 * Singleton инициализация PrismaClient для работы с базой данных.
 * Используется глобальный объект для предотвращения создания нескольких инстансов
 * при hot-reload в development-режиме.
 *
 * @module prisma
 */
import { PrismaClient } from "@prisma/client";

/**
 * Глобальный объект для хранения инстанса PrismaClient
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * Экспортируемый экземпляр PrismaClient.
 * Используйте этот объект для всех операций с базой данных.
 */
export const prisma = globalForPrisma.prisma || new PrismaClient();

/**
 * В development режиме сохраняем инстанс в globalThis
 */
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
