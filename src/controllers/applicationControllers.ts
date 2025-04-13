import { Request, Response } from "express";

import logger from "../common/utils/logger";
import { prisma } from "../database/prisma-client";

/**
 * Получает список заявок.
 * @param req - HTTP-запрос, содержащий параметры фильтрации.
 * @param res - HTTP-ответ, отправляемый клиенту.
 * @returns void
 */
export const listApplications = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.debug(`Received request to list applications with query params: ${JSON.stringify(req.query)}`);

    const { userId, userType } = req.query;

    let whereClause = {};

    if (userId && userType) {
      if (userType === "investor") {
        whereClause = { investorCognitoId: String(userId) };
      } else if (userType === "manager") {
        whereClause = {
          property: {
            managerCognitoId: String(userId),
          },
        };
      }
    }

    const applications = await prisma.application.findMany({
      where: whereClause,
      include: {
        property: {
          include: {
            location: true,
            manager: true,
          },
        },
        investor: true,
      },
    });

    function calculateNextPaymentDate(startDate: Date): Date {
      const today = new Date();
      const nextPaymentDate = new Date(startDate);
      while (nextPaymentDate <= today) {
        nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
      }
      return nextPaymentDate;
    }

    const formattedApplications = await Promise.all(
      applications.map(async (app) => {
        const lease = await prisma.lease.findFirst({
          where: {
            investor: {
              cognitoId: app.investorCognitoId,
            },
            propertyId: app.propertyId,
          },
          orderBy: { startDate: "desc" },
        });

        return {
          ...app,
          property: {
            ...app.property,
            address: app.property.location.address,
          },
          manager: app.property.manager,
          lease: lease
            ? {
                ...lease,
                nextPaymentDate: calculateNextPaymentDate(lease.startDate),
              }
            : null,
        };
      }),
    );
    logger.debug("Formatted applications data to send back to the client");
    res.json(formattedApplications);
  } catch (error: any) {
    logger.error(`Error retrieving applications: ${error.message}`);
    res.status(500).json({ message: `Error retrieving applications: ${error.message}` });
  }
};

/**
 * Создает новую заявку.
 * @param req - HTTP-запрос с данными заявки в теле запроса.
 * @param res - HTTP-ответ, отправляемый клиенту.
 * @returns void
 */
export const createApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.debug(`Received request to create application with body: ${JSON.stringify(req.body)}`);

    const { applicationDate, status, propertyId, investorCognitoId, name, email, phoneNumber, message } = req.body;

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { pricePerMonth: true, securityDeposit: true },
    });

    if (!property) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    const newApplication = await prisma.$transaction(async (prisma) => {
      const lease = await prisma.lease.create({
        data: {
          startDate: new Date(),
          endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year from today
          rent: property.pricePerMonth,
          deposit: property.securityDeposit,
          property: {
            connect: { id: propertyId },
          },
          investor: {
            connect: { cognitoId: investorCognitoId },
          },
        },
      });

      return prisma.application.create({
        data: {
          applicationDate: new Date(applicationDate),
          status,
          name,
          email,
          phoneNumber,
          message,
          property: {
            connect: { id: propertyId },
          },
          investor: {
            connect: { cognitoId: investorCognitoId },
          },
          lease: {
            connect: { id: lease.id },
          },
        },
        include: {
          property: true,
          investor: true,
          lease: true,
        },
      });
    });

    res.status(201).json(newApplication);
  } catch (error: any) {
    logger.error(`Error creating application: ${error.message}`);

    res.status(500).json({ message: `Error creating application: ${error.message}` });
  }
};

/**
 * Обновляет статус заявки.
 * @param req - HTTP-запрос с ID заявки в параметрах и новым статусом в теле запроса.
 * @param res - HTTP-ответ, отправляемый клиенту.
 * @returns void
 */
export const updateApplicationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.debug(
      `Received request to update application status with params ID=${req.params.id} and body ${JSON.stringify(req.body)}`,
    );
    const { id } = req.params;
    const { status } = req.body;
    console.log("status:", status);

    const application = await prisma.application.findUnique({
      where: { id: Number(id) },
      include: {
        property: true,
        investor: true,
      },
    });

    if (!application) {
      res.status(404).json({ message: "Application not found." });
      return;
    }

    if (status === "Approved") {
      const newLease = await prisma.lease.create({
        data: {
          startDate: new Date(),
          endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          rent: application.property.pricePerMonth,
          deposit: application.property.securityDeposit,
          propertyId: application.propertyId,
          investorCognitoId: application.investorCognitoId,
        },
      });

      await prisma.property.update({
        where: { id: application.propertyId },
        data: {
          investors: {
            connect: { cognitoId: application.investorCognitoId },
          },
        },
      });

      await prisma.application.update({
        where: { id: Number(id) },
        data: { status, leaseId: newLease.id },
        include: {
          property: true,
          investor: true,
          lease: true,
        },
      });
    } else {
      await prisma.application.update({
        where: { id: Number(id) },
        data: { status },
      });
    }

    const updatedApplication = await prisma.application.findUnique({
      where: { id: Number(id) },
      include: {
        property: true,
        investor: true,
        lease: true,
      },
    });

    res.json(updatedApplication);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating application status: ${error.message}` });
  }
};
