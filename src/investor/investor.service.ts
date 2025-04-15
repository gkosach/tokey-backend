import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class InvestorService {
  async getInvestor(cognitoId: string) {
    return prisma.investor.findUnique({
      where: { cognitoId },
      include: {
        favorites: true,
        Application: true,
        tokens: true,
      },
    });
  }

  async createInvestor(data: {
    cognitoId: string;
    name: string;
    email: string;
    phoneNumber: string;
    cryptoWallet?: string;
    bankAccount?: string;
  }) {
    return prisma.investor.create({
      data: {
        ...data,
        preferredMethod: data.cryptoWallet ? "CRYPTO" : "VISA",
      },
    });
  }

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
    return prisma.investor.update({
      where: { cognitoId },
      data: {
        ...data,
        ...(data.cryptoWallet && { preferredMethod: "CRYPTO" }),
        ...(data.bankAccount && { preferredMethod: "VISA" }),
      },
    });
  }

  async getCurrentResidences(cognitoId: string) {
    const investor = await prisma.investor.findUnique({
      where: { cognitoId },
      select: { id: true },
    });

    if (!investor) throw new Error("Investor not found");

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


  async addFavoriteProperty(cognitoId: string, propertyId: number) {
    return prisma.$transaction(async (tx) => {
      const investor = await tx.investor.findUnique({
        where: { cognitoId },
        include: { favorites: true },
      });

      if (!investor) {
        throw new Error("Investor not found");
      }

      if (investor.favorites.some((fav) => fav.id === propertyId)) {
        return investor;
      }

      return tx.investor.update({
        where: { cognitoId },
        data: {
          favorites: {
            connect: { id: propertyId },
          },
        },
        include: { favorites: true },
      });
    });
  }

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
