import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Prisma, PrismaClient } from "@prisma/client";
import axios from "axios";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const s3Client = new S3Client({ region: process.env.AWS_REGION });

/**
 * Геокодирует адрес в координаты через OpenStreetMap API
 * @returns {Promise<[number, number]>} [longitude, latitude]
 */
const geocodeAddress = async (
  address: string,
  city: string,
  postalCode: string,
  country: string,
): Promise<[number, number]> => {
  try {
    const geocodingUrl = `https://nominatim.openstreetmap.org/search?${new URLSearchParams({
      street: address,
      city,
      country,
      postalcode: postalCode,
      format: "json",
      limit: "1",
    }).toString()}`;

    const response = await axios.get(geocodingUrl, {
      headers: { "User-Agent": "RealEstateApp (contact@example.com)" },
    });

    return response.data[0]?.lon && response.data[0]?.lat
      ? [parseFloat(response.data[0].lon), parseFloat(response.data[0].lat)]
      : [0, 0];
  } catch (error) {
    console.error("Geocoding error:", error);
    return [0, 0];
  }
};

/**
 * Нормализует входные данные в массив строк
 * @returns {string[]} Результатирующий массив
 */
const normalizeArray = (input: string | string[] | undefined): string[] => {
  if (!input) return [];
  return Array.isArray(input) ? input : input.split(",");
};

/**
 * Получает список свойств с фильтрацией
 * @query {Object} Параметры фильтрации
 * @returns {Property[]} Список свойств с локациями
 */
export const getProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const { latitude, longitude, ...queryParams } = req.query;
    const whereConditions: Prisma.Sql[] = [];

    // Обработка параметров фильтрации
    Object.entries(queryParams).forEach(([key, value]) => {
      if (!value) return;

      switch (key) {
        case "favoriteIds":
          const ids = (value as string).split(",").map(Number);
          whereConditions.push(Prisma.sql`p.id IN (${Prisma.join(ids)})`);
          break;

        case "priceMin":
        case "priceMax":
          whereConditions.push(Prisma.sql`p."pricePerMonth" ${key === "priceMin" ? ">=" : "<="} ${Number(value)}`);
          break;

        case "beds":
        case "baths":
          if (value !== "any") {
            whereConditions.push(Prisma.sql`p.${key} >= ${Number(value)}`);
          }
          break;

        case "squareFeetMin":
        case "squareFeetMax":
          const operator = key.endsWith("Min") ? ">=" : "<=";
          whereConditions.push(Prisma.sql`p."squareFeet" ${operator} ${Number(value)}`);
          break;

        case "propertyType":
          if (value !== "any") {
            whereConditions.push(Prisma.sql`p."propertyType" = ${value}::"PropertyType"`);
          }
          break;

        case "amenities":
          if (value !== "any") {
            whereConditions.push(Prisma.sql`p.amenities @> ${(value as string).split(",")}`);
          }
          break;

        case "availableFrom":
          const date = new Date(value as string);
          if (!isNaN(date.getTime())) {
            whereConditions.push(
              Prisma.sql`EXISTS (
                SELECT 1 FROM "Lease" l 
                WHERE l."propertyId" = p.id 
                AND l."startDate" <= ${date.toISOString()}
              )`,
            );
          }
          break;
      }
    });

    // Обработка гео-фильтра
    if (latitude && longitude) {
      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      const radiusKm = 5;
      const degreesPerKm = 0.009;

      whereConditions.push(Prisma.sql`
        l.latitude BETWEEN ${lat - radiusKm * degreesPerKm} 
        AND ${lat + radiusKm * degreesPerKm}
        AND l.longitude BETWEEN ${lng - radiusKm * degreesPerKm} 
        AND ${lng + radiusKm * degreesPerKm}
      `);
    }

    // Формирование итогового запроса
    const query = Prisma.sql`
      SELECT 
        p.*,
        json_build_object(
          'id', l.id,
          'address', l.address,
          'city', l.city,
          'state', l.state,
          'country', l.country,
          'postalCode', l."postalCode",
          'coordinates', json_build_object(
            'longitude', l.longitude,
            'latitude', l.latitude
          )
        ) as location
      FROM "Property" p
      JOIN "Location" l ON p."locationId" = l.id
      ${whereConditions.length ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}` : Prisma.empty}
    `;

    const properties = await prisma.$queryRaw(query);
    res.json(properties);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving properties: ${error.message}` });
  }
};

/**
 * Получает детальную информацию о свойстве по ID
 * @param {number} id ID свойства
 * @returns {Property} Объект свойства с координатами
 */
export const getProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: Number(req.params.id) },
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

    if (!property) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    res.json({
      ...property,
      location: {
        ...property.location,
        coordinates: {
          longitude: property.location.longitude,
          latitude: property.location.latitude,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving property: ${error.message}` });
  }
};

/**
 * Создает новое свойство с прикрепленными фото
 * @body {PropertyData} Данные свойства
 * @files {File[]} Фотографии недвижимости
 * @returns {Property} Созданный объект свойства
 */
export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address, city, state, country, postalCode, managerCognitoId, ...propertyData } = req.body;
    const files = req.files as Express.Multer.File[];

    // Загрузка фото в S3
    const photoUrls = await Promise.all(
      files.map(async (file) => {
        const uploadParams = {
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: `properties/${Date.now()}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        const result = await new Upload({ client: s3Client, params: uploadParams }).done();
        return result.Location;
      }),
    );

    // Геокодирование адреса
    const [longitude, latitude] = await geocodeAddress(address, city, postalCode, country);

    // Создание связанной локации
    const location = await prisma.location.create({
      data: { address, city, state, country, postalCode, longitude, latitude },
    });

    // Валидация и преобразование данных
    const validatedData = {
      ...propertyData,
      pricePerMonth: parseFloat(propertyData.pricePerMonth),
      securityDeposit: parseFloat(propertyData.securityDeposit),
      applicationFee: parseFloat(propertyData.applicationFee),
      beds: parseInt(propertyData.beds, 10),
      baths: parseFloat(propertyData.baths),
      squareFeet: parseInt(propertyData.squareFeet, 10),
      amenities: normalizeArray(propertyData.amenities),
      highlights: normalizeArray(propertyData.highlights),
      isPetsAllowed: propertyData.isPetsAllowed === "true",
      isParkingIncluded: propertyData.isParkingIncluded === "true",
    };

    // Создание основного объекта свойства
    const newProperty = await prisma.property.create({
      data: {
        ...validatedData,
        photoUrls,
        locationId: location.id,
        managerCognitoId,
      },
      include: { location: true, manager: true },
    });

    res.status(201).json(newProperty);
  } catch (error: any) {
    const response: { message: string; stack?: string } = {
      message: `Error creating property: ${error.message}`,
    };

    if (process.env.NODE_ENV === "development") {
      response.stack = error.stack;
    }

    res.status(500).json(response);
  }
};
