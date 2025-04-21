import { InvestorError } from "./index";
import { prisma } from "../common";
import { Prisma, Property } from "@prisma/client";

export class InvestorService {
  /**
   * Получение информации об инвесторе по Cognito ID
   * @param cognitoId - Уникальный идентификатор инвестора в Cognito
   * @returns Объект инвестора с списком избранного и токенов
   */
  async getInvestor(cognitoId: string) {
    try {
      const investor = await prisma.investor.findUnique({
        where: { cognitoId },
        include: { favorites: true, tokens: true },
      });

      if (!investor) {
        throw InvestorError.notFound();
      }
      return investor;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw InvestorError.databaseError();
      }
      throw error;
    }
  }
  /**
   * Создание нового инвестора
   * @param data - Данные для создания инвестора
   * @returns Созданный объект инвестора
   */
  async createInvestor(data: {
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    cryptoWallet?: string;
    bankAccount?: string;
  }) {
    try {
      if (!data.name || !data.email || !data.phoneNumber) {
        throw InvestorError.invalidData();
      }

      return await prisma.investor.create({
        data: {
          ...data,
          preferredMethod: data.cryptoWallet ? "CRYPTO" : "VISA",
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw InvestorError.databaseError();
      }
      throw error;
    }
  }
  /**
   * Обновление данных инвестора
   * @param cognitoId - Идентификатор инвестора
   * @param data - Обновляемые данные
   * @returns Обновленный объект инвестора
   */
  async updateInvestor(
    cognitoId: string,
    data: {
      name?: string;
      email?: string;
      phoneNumber?: string;
      cryptoWallet?: string;
      bankAccount?: string;
    },
  ) {
    try {
      // Валидация обновляемых данных
      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
        throw InvestorError.invalidData();
      }

      return await prisma.investor.update({
        where: { cognitoId },
        data: {
          ...data,
          ...(data.cryptoWallet && { preferredMethod: "CRYPTO" }),
          ...(data.bankAccount && { preferredMethod: "VISA" }),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw InvestorError.notFound();
        }
        throw InvestorError.databaseError();
      }
      throw error;
    }
  }
  /**
   * Получение списка объектов недвижимости, принадлежащих инвестору
   * @param cognitoId - Идентификатор инвестора
   * @returns Массив объектов недвижимости
   */
  async getCurrentResidences(cognitoId: string): Promise<Property[]> {
    const investor = await prisma.investor.findUnique({
      where: { cognitoId },
      select: { id: true },
    });

    if (!investor) {
      throw InvestorError.notFound();
    }

    return prisma.property.findMany({
      where: {
        tokens: {
          some: {
            investorId: investor.id,
          },
        },
      },
      include: { location: true },
    });
  }

  /**
   * Добавление объекта в избранное
   * @param cognitoId - Идентификатор инвестора
   * @param propertyId - ID объекта недвижимости
   * @returns Обновленный объект инвестора
   */
  async addFavoriteProperty(cognitoId: string, propertyId: number) {
    return prisma.$transaction(async (tx) => {
      const investor = await tx.investor.findUnique({
        where: { cognitoId },
        include: { favorites: true },
      });

      if (!investor) {
        throw InvestorError.notFound();
      }

      if (investor.favorites.some((fav) => fav.id === propertyId)) {
        return investor;
      }

      return tx.investor.update({
        where: { cognitoId },
        data: { favorites: { connect: { id: propertyId } } },
        include: { favorites: true },
      });
    });
  }

  /**
   * Удаление объекта из избранного
   * @param cognitoId - Идентификатор инвестора
   * @param propertyId - ID объекта недвижимости
   * @returns Обновленный объект инвестора
   */
  async removeFavoriteProperty(cognitoId: string, propertyId: number) {
    return prisma.investor.update({
      where: { cognitoId },
      data: {
        favorites: {
          disconnect: { id: propertyId },
        },
      },
      include: { favorites: true },
    });
  }
}
