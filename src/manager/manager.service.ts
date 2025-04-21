import { prisma } from "../common";

export class ManagerService {
  async getManager(cognitoId: string) {
    return prisma.manager.findUnique({
      where: { cognitoId },
      include: { properties: true },
    });
  }

  async createManager(data: { cognitoId: string; name: string; email: string; phoneNumber: string }) {
    return prisma.manager.create({ data });
  }

  async updateManager(
    cognitoId: string,
    data: {
      name?: string;
      email?: string;
      phoneNumber?: string;
    },
  ) {
    return prisma.manager.update({
      where: { cognitoId },
      data,
    });
  }

  async getManagerProperties(cognitoId: string) {
    return prisma.property.findMany({
      where: { manager: { cognitoId } },
      include: {
        location: {
          select: {
            address: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    });
  }
}
