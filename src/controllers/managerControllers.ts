import { Request, Response } from "express";

import logger from "../common/utils/logger";
import { prisma } from "../database/prisma-client";

/**
 * Получает данные менеджера по его Cognito ID.
 * @param req - HTTP-запрос с параметром Cognito ID.
 * @param res - HTTP-ответ с данными менеджера.
 * @returns void
 */
export const getManager = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const manager = await prisma.manager.findUnique({
      where: { cognitoId },
    });

    if (manager) {
      res.json(manager);
    } else {
      res.status(404).json({ message: "Manager not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving manager: ${error.message}` });
  }
};

/**
 * Создает нового менеджера.
 * @param req - HTTP-запрос с данными нового менеджера в теле запроса.
 * @param res - HTTP-ответ с созданным менеджером.
 * @returns void
 */
export const createManager = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;
    const manager = await prisma.manager.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });
    res.status(201).json(manager);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating manager: ${error.message}` });
  }
};

/**
 * Обновляет данные менеджера по его Cognito ID.
 * @param req - HTTP-запрос с параметром Cognito ID и новыми данными в теле запроса.
 * @param res - HTTP-ответ с обновленным менеджером.
 * @returns void
 */
export const updateManager = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;
    const updateManager = await prisma.manager.update({
      where: { cognitoId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.json(updateManager);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating manager: ${error.message}` });
  }
};

/**
 * Получает список объектов недвижимости, связанных с менеджером.
 * @param req - HTTP-запрос с параметром Cognito ID менеджера.
 * @param res - HTTP-ответ с данными объектов недвижимости.
 * @returns void
 */
export const getManagerProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.debug(`Received request to get properties for manager with params: ${JSON.stringify(req.params)}`);
    const { cognitoId } = req.params;
    const properties = await prisma.property.findMany({
      where: { managerCognitoId: cognitoId },
      include: {
        location: {
          select: {
            id: true,
            address: true,
            postalCode: true,
            longitude: true,
            latitude: true,
          },
        },
      },
    });
    logger.debug(`Fetched ${properties.length} properties from database for manager cognitoId=${cognitoId}`);
    const propertiesWithCoords = properties.map((property) => ({
      ...property,
      location: {
        ...property.location,
        coordinates: {
          longitude: property.location?.longitude || 0,
          latitude: property.location?.latitude || 0,
        },
      },
    }));
    logger.debug("Formatted properties data to send back to the client");

    res.json(propertiesWithCoords);
  } catch (err: any) {
    logger.error(`Error retrieving properties for manager cognitoId=${req.params.cognitoId}: ${err.message}`, {
      stack: err.stack,
    });

    res.status(500).json({
      message: `Error retrieving manager properties: ${err.message}`,
    });
  }
};
