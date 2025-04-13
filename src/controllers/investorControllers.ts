import { Request, Response } from "express";

import logger from "../common/utils/logger";
import { prisma } from "../database/prisma-client";

/**
 * Получает данные инвестора по его Cognito ID.
 * @param req - HTTP-запрос с параметром Cognito ID.
 * @param res - HTTP-ответ, отправляемый клиенту.
 * @returns void
 */
export const getInvestor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const investor = await prisma.investor.findUnique({
      where: { cognitoId },
      include: {
        favorites: true,
      },
    });

    if (investor) {
      res.json(investor);
    } else {
      res.status(404).json({ message: "Investor not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving investor: ${error.message}` });
  }
};

/**
 * Создает нового инвестора.
 * @param req - HTTP-запрос с данными нового инвестора в теле запроса.
 * @param res - HTTP-ответ, отправляемый клиенту.
 * @returns void
 */
export const createInvestor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;
    const investor = await prisma.investor.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });
    res.status(201).json(investor);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating investor: ${error.message}` });
  }
};

/**
 * Обновляет данные инвестора по его Cognito ID.
 * @param req - HTTP-запрос с параметром Cognito ID и новыми данными в теле запроса.
 * @param res - HTTP-ответ, отправляемый клиенту.
 * @returns void
 */
export const updateInvestor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;
    const updateInvestor = await prisma.investor.update({
      where: { cognitoId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.json(updateInvestor);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating investor: ${error.message}` });
  }
};

/**
 * Получает текущие резиденции инвестора по его Cognito ID.
 * @param req - HTTP-запрос с параметром Cognito ID.
 * @param res - HTTP-ответ с данными резиденций.
 * @returns void
 */
export const getCurrentResidences = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const properties = await prisma.property.findMany({
      where: { investors: { some: { cognitoId } } },
      include: {
        location: true,
      },
    });
    const residencesWithFormattedLocation = properties.map((property) => ({
      ...property,
      location: {
        ...property.location,
        longitude: property.location.longitude,
        latitude: property.location.latitude,
      },
    }));

    res.json(residencesWithFormattedLocation);
  } catch (err: any) {
    res.status(500).json({ message: `Error retrieving manager properties: ${err.message}` });
  }
};

/**
 * Добавляет объект недвижимости в избранное инвестора.
 * @param req - HTTP-запрос с параметрами Cognito ID и Property ID.
 * @param res - HTTP-ответ с обновленным списком избранного.
 * @returns void
 */
export const addFavoriteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId, propertyId } = req.params;
    const investor = await prisma.investor.findUnique({
      where: { cognitoId },
      include: { favorites: true },
    });

    if (!investor) {
      res.status(404).json({ message: "Investor not found" });
      return;
    }

    const propertyIdNumber = Number(propertyId);
    const existingFavorites = investor.favorites || [];

    if (!existingFavorites.some((fav) => fav.id === propertyIdNumber)) {
      const updatedInvestor = await prisma.investor.update({
        where: { cognitoId },
        data: {
          favorites: {
            connect: { id: propertyIdNumber },
          },
        },
        include: { favorites: true },
      });
      logger.debug(`Added property ID=${propertyIdNumber} to favorites for investor=${cognitoId}`);

      res.json(updatedInvestor);
    } else {
      logger.debug(`Property ID=${propertyIdNumber} already in favorites for investor=${cognitoId}`);

      res.status(409).json({ message: "Property already added as favorite" });
    }
  } catch (error: any) {
    logger.error(`Error adding favorite property for cognitoId=${req.params.cognitoId}: ${error.message}`);

    res.status(500).json({ message: `Error adding favorite property: ${error.message}` });
  }
};

/**
 * Удаляет объект недвижимости из избранного инвестора.
 * @param req - HTTP-запрос с параметрами Cognito ID и Property ID.
 * @param res - HTTP-ответ с обновленным списком избранного.
 * @returns void
 */
export const removeFavoriteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.debug(`Received request to remove favorite property with params:${JSON.stringify(req.params)}`);

    const { cognitoId, propertyId } = req.params;
    const propertyIdNumber = Number(propertyId);

    const updatedInvestor = await prisma.investor.update({
      where: { cognitoId },
      data: {
        favorites: {
          disconnect: { id: propertyIdNumber },
        },
      },
      include: { favorites: true },
    });

    res.json(updatedInvestor);
  } catch (err: any) {
    res.status(500).json({ message: `Error removing favorite property: ${err.message}` });
  }
};
