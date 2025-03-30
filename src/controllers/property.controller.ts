import { PropertyDTO } from "@/src/controllers/contract/dto/property.dto";
import { Property } from "@/src/db/entities";
import { LeaseRepository, PropertyRepository } from "@/src/db/repository";
import s3Client from "@/src/storage/s3-storage";
import { Upload } from "@aws-sdk/lib-storage";
import axios from "axios";
import { Request, Response } from "express";

/**
 * Контроллер для работы с объектами недвижимости.
 */
export class PropertyController {
  private readonly propertyRepository: PropertyRepository;
  private readonly leaseRepository: LeaseRepository;

  /**
   * Конструктор для инициализации контроллера.
   * @param propertyRepository Репозиторий для работы с недвижимостью
   */
  constructor(propertyRepository: PropertyRepository) {
    this.propertyRepository = propertyRepository;
  }
  /**
   *
   * @param req
   * @param res
   */
  async createProperty(req: Request, res: Response): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];
      const { latitude, longitude, ...propertyData } = req.body;
      if (!propertyData.name || !propertyData.pricePerMonth) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const photoUrls = await Promise.all(
        files.map(async (file) => {
          const key = `properties/${Date.now()}-${file.originalname}`;
          const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
          };

          const uploadResult = await new Upload({
            client: s3Client,
            params: uploadParams,
          }).done();

          return uploadResult.Location;
        }),
      );
      let propertyLongitude = longitude ? parseFloat(longitude) : null;
      let propertyLatitude = latitude ? parseFloat(latitude) : null;
      if (propertyLongitude === null || propertyLatitude === null) {
        try {
          const geocodingUrl = `https://nominatim.openstreetmap.org/search?${new URLSearchParams({
            street: propertyData.address,
            city: propertyData.city,
            country: propertyData.country,
            postalcode: propertyData.postalCode,
            format: "json",
            limit: "1",
          }).toString()}`;

          const geocodingResponse = await axios.get(geocodingUrl, {
            headers: {
              "User-Agent": "RealEstateApp (german1kosach@gmail.com)",
            },
          });

          if (geocodingResponse.data && geocodingResponse.data.length > 0) {
            propertyLongitude = parseFloat(geocodingResponse.data[0].lon);
            propertyLatitude = parseFloat(geocodingResponse.data[0].lat);
          }
        } catch (geocodingError) {
          console.error("Geocoding error:", geocodingError);
        }
      }
      if (
        propertyLatitude !== null &&
        propertyLongitude !== null &&
        (propertyLatitude < -90 || propertyLatitude > 90 || propertyLongitude < -180 || propertyLongitude > 180)
      ) {
        res.status(400).json({ message: "Invalid coordinates" });
        return;
      }
      const normalizedPropertyData = {
        ...propertyData,
        photoUrls,
        managerId: (req as any).user.id,
        latitude: propertyLatitude ?? 0,
        longitude: propertyLongitude ?? 0,
        isPetsAllowed: propertyData.isPetsAllowed === "true",
        isParkingIncluded: propertyData.isParkingIncluded === "true",
        pricePerMonth: parseFloat(propertyData.pricePerMonth),
        securityDeposit: parseFloat(propertyData.securityDeposit || "0"),
        applicationFee: parseFloat(propertyData.applicationFee || "0"),
        beds: parseInt(propertyData.beds || "0"),
        baths: parseFloat(propertyData.baths || "0"),
        squareFeet: parseInt(propertyData.squareFeet || "0"),
      };

      const newProperty = await this.propertyRepository.createProperty(normalizedPropertyData);
      const propertyWithRelations = await this.propertyRepository.findPropertyById(newProperty.id);

      if (!propertyWithRelations) {
        res.status(500).json({ message: "Error retrieving created property" });
        return;
      }
      const propertyDto = PropertyDTO.fromEntity(propertyWithRelations);

      res.status(201).json(propertyDto);
    } catch (error: any) {
      console.error("Error creating property:", error);
      res.status(500).json({
        message: `Error creating property: ${error.message}`,
      });
    }
  }

  /**
   *
   * @param req
   * @param res
   */
  async getProperties(req: Request<{ cognitoId: string }>, res: Response): Promise<void> {
    try {
      const { cognitoId } = req.params;
      const properties = await this.propertyRepository.findPropertiesByCognitoId(cognitoId);

      const propertyDtos = properties.map((property) => {
        return PropertyDTO.fromEntity(property);
      });

      res.json(propertyDtos);
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving properties: ${error.message}`,
      });
    }
  }

  /**
   * Получает объект недвижимости по ID
   * @param req Запрос с параметром id
   * @param res Ответ с объектом недвижимости или сообщением об ошибке
   */
  async getProperty(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const propertyId = Number(id);

      if (isNaN(propertyId)) {
        res.status(400).json({ message: "Invalid property ID" });
        return;
      }
      const property = await this.propertyRepository.findPropertyById(propertyId);
      if (property) {
        const propertyDto = PropertyDTO.fromEntity(property);
        res.json(propertyDto);
      } else {
        res.status(404).json({ message: "Property not found" });
      }
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving property: ${error.message}`,
      });
    }
  }

  async filterProperties(req: Request, res: Response): Promise<void> {
    try {
      const filters = req.query;
      const properties = await this.propertyRepository.findPropertiesByFilters(filters);
      const propertyDtos = properties.map((property) => {
        return PropertyDTO.fromEntity(property);
      });
      res.json(propertyDtos);
    } catch (error: any) {
      res.status(500).json({
        message: `Error filtering properties: ${error.message}`,
      });
    }
  }

  /**
   * Обновляет существующий объект недвижимости
   * @param req Запрос с ID в параметрах и данными для обновления в теле
   * @param res Ответ с подтверждением или ошибкой
   */
  async updateProperty(req: Request<{ id: string }, unknown, Partial<Property>>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const propertyId = Number(id);

      if (isNaN(propertyId)) {
        res.status(400).json({ message: "Invalid property ID" });
        return;
      }

      const updateData = req.body;

      await this.propertyRepository.updateProperty(propertyId, updateData);
      res.status(200).json({ message: "Property updated successfully" });
    } catch (error: any) {
      res.status(500).json({
        message: `Error updating property: ${error.message}`,
      });
    }
  }

  /**
   * Удаляет объект недвижимости
   * @param req Запрос с ID объекта для удаления
   * @param res Ответ с подтверждением или ошибкой
   */
  async deleteProperty(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const propertyId = Number(id);

      if (isNaN(propertyId)) {
        res.status(400).json({ message: "Invalid property ID" });
        return;
      }

      await this.propertyRepository.deleteProperty(propertyId);
      res.status(200).json({ message: "Property deleted successfully" });
    } catch (error: any) {
      res.status(500).json({
        message: `Error deleting property: ${error.message}`,
      });
    }
  }
}
