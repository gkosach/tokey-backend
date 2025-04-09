import { prisma } from "@/src/database/prisma-client";
import { Request, Response } from "express";

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

export const getManagerProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    const properties = await prisma.property.findMany({
      where: { managerCognitoId: cognitoId },
      include: {
        location: {
          select: {
            id: true,
            address: true,
            city: true,
            state: true,
            country: true,
            postalCode: true,
            longitude: true,
            latitude: true,
          },
        },
      },
    });

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

    res.json(propertiesWithCoords);
  } catch (err: any) {
    res.status(500).json({
      message: `Error retrieving manager properties: ${err.message}`,
    });
  }
};
