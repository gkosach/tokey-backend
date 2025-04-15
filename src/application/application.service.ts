import { PrismaClient } from "@prisma/client";
import { ApplicationError } from "./contract/error/application.error";
import { CreateApplicationDto, UpdateApplicationStatusDto } from "./contract/dto/application.dto";
import { ErrorStatus } from "../common/enum/error/error-status.enum";
import { ApplicationErrorMessages } from "../common/enum/error/apllication-error.enum";

const prisma = new PrismaClient();

export class ApplicationService {
  async listApplications(filter: { userId?: string; userType?: "investor" | "manager" }) {
    let whereClause = {};

    if (filter.userId && filter.userType) {
      if (filter.userType === "investor") {
        whereClause = { investor: { cognitoId: filter.userId } };
      } else {
        whereClause = { property: { manager: { cognitoId: filter.userId } } };
      }
    }

    return prisma.application.findMany({
      where: whereClause,
      include: {
        property: { include: { location: true, manager: true } },
        investor: true,
      },
    });
  }

  async createApplication(dto: CreateApplicationDto) {
    return prisma.$transaction(async (tx) => {
      const [property, investor] = await Promise.all([
        tx.property.findUnique({ where: { id: dto.propertyId } }),
        tx.investor.findUnique({ where: { cognitoId: dto.investorCognitoId } }),
      ]);

      if (!property) {
        throw new ApplicationError(ErrorStatus.NotFound, ApplicationErrorMessages.APPLICATION_ERROR_PROPERTY_NOT_FOUND);
      }

      if (!investor) {
        throw new ApplicationError(ErrorStatus.NotFound, ApplicationErrorMessages.APPLICATION_ERROR_INVESTOR_NOT_FOUND);
      }

      return tx.application.create({
        data: {
          status: dto.status,
          message: dto.message,
          propertyId: dto.propertyId,
          investorId: investor.id,
          applicationDate: new Date(),
        },
        include: { property: true, investor: true },
      });
    });
  }

  async updateApplicationStatus(id: number, dto: UpdateApplicationStatusDto) {
    return prisma.$transaction(async (tx) => {
      const application = await tx.application.findUnique({
        where: { id },
        include: { property: true, investor: true },
      });

      if (!application) {
        throw new ApplicationError(ErrorStatus.NotFound, ApplicationErrorMessages.APPLICATION_NOT_FOUND);
      }

      if (dto.status === "Approved") {
        await tx.property.update({
          where: { id: application.propertyId },
          data: {
            investors: {
              connect: { id: application.investor.id },
            },
          },
        });
      }

      return tx.application.update({
        where: { id },
        data: { status: dto.status },
        include: { property: true, investor: true },
      });
    });
  }
}
