import { createClassLogger } from "@/src/common/config/logger.config";
import s3Client from "@/src/common/config/s3-storage.config";
import { Property } from "@/src/database/entities";
import { LeaseRepository, PropertyRepository } from "@/src/database/repository";
import { PropertyDto } from "@/src/property/contract/dto/property.dto";
import { Upload } from "@aws-sdk/lib-storage";
import axios from "axios";
import { Request, Response } from "express";

/**
 * Контроллер для работы с объектами недвижимости.
 */
export class PropertyController {
  private readonly propertyRepository: PropertyRepository;
  private readonly leaseRepository: LeaseRepository;
  private readonly logger;

  /**
   * Конструктор для инициализации контроллера.
   * @param propertyRepository Репозиторий для работы с недвижимостью
   */
  constructor(propertyRepository: PropertyRepository) {
    this.logger = createClassLogger(this.constructor.name);
    this.propertyRepository = propertyRepository;
  }

  async getAllProperties(req: Request, res: Response): Promise<void> {
    try {
      const properties = await this.propertyRepository.find();
      res.status(200).json(
        properties.map((p) => {
          return this.mapToDto(p);
        }),
      );
    } catch (error: any) {
      res.status(500).json({ message: `Error retrieving properties: ${error.message}` });
    }
  }

  async getManagedProperties(req: Request, res: Response): Promise<void> {
    try {
      const managerId = req.user?.id;
      if (!managerId) throw new Error("User not authenticated");

      const properties = await this.propertyRepository.findPropertiesByManagerId(managerId);
      res.status(200).json(
        properties.map((p) => {
          return this.mapToDto(p);
        }),
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: "Failed to get managed properties", details: message });
    }
  }

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

      let propertyLatitude = latitude ? parseFloat(latitude) : null;
      let propertyLongitude = longitude ? parseFloat(longitude) : null;

      if (propertyLatitude === null || propertyLongitude === null) {
        const coordinates = await this.getCoordinatesFromAddress({
          address: propertyData.address,
          postalCode: propertyData.postalCode,
        });

        propertyLatitude = coordinates.latitude;
        propertyLongitude = coordinates.longitude;
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
        managerId: req.user?.id,
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

      const newProperty = await this.propertyRepository.save(normalizedPropertyData);
      res.status(201).json(this.mapToDto(newProperty));
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error("Error creating property:", error.message);
        res.status(500).json({ message: `Error creating property: ${error.message}` });
      } else {
        this.logger.error("Unknown error occurred while creating property:", error);
        res.status(500).json({ message: "An unknown error occurred while creating the property." });
      }
    }
  }

  /**
   * Получает объект недвижимости по ID
   * @param req Запрос с параметром id
   * @param res Ответ с объектом недвижимости или сообщением об ошибке
   */
  async getProperty(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const property = await this.propertyRepository.findById(req.params.id);
      if (property) {
        res.json(this.mapToDto(property));
      } else {
        res.status(404).json({ message: "Property not found" });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ message: `Error retrieving property: ${message}` });
    }
  }

  async filterProperties(req: Request, res: Response): Promise<void> {
    try {
      const properties = await this.propertyRepository.findByFilters(req.query);
      res.json(
        properties.map((p) => {
          return this.mapToDto(p);
        }),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ message: `Error filtering properties: ${message}` });
    }
  }

  /**
   * Обновляет существующий объект недвижимости
   * @param req Запрос с ID в параметрах и данными для обновления в теле
   * @param res Ответ с подтверждением или ошибкой
   */
  async updateProperty(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const existingProperty = await this.propertyRepository.findById(req.params.id);
      if (!existingProperty) {
        res.status(404).json({ message: "Property not found" });
        return;
      }

      await this.propertyRepository.update(req.params.id, req.body);
      const updatedProperty = await this.propertyRepository.findById(req.params.id);

      if (!updatedProperty) {
        res.status(500).json({ message: "Failed to fetch updated property" });
        return;
      }

      res.json(this.mapToDto(updatedProperty));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`Update property error: ${message}`);
      res.status(500).json({ message: `Error updating property: ${message}` });
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
      await this.propertyRepository.delete(id);
      res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ message: `Error deleting property: ${message}` });
    }
  }

  private mapToDto(property: Property): PropertyDto {
    return {
      ...property,
      postedDate: property.postedDate.toISOString(),
      postalCode: property.postalCode,
      latitude: property.latitude,
      longitude: property.longitude,
    };
  }

  private async getCoordinatesFromAddress(addressData: {
    address: string;
    postalCode: string;
  }): Promise<{ latitude: number | null; longitude: number | null }> {
    try {
      const geocodingUrl = `https://nominatim.openstreetmap.org/search?${new URLSearchParams({
        street: addressData.address,
        postalcode: addressData.postalCode,
        format: "json",
        limit: "1",
      }).toString()}`;

      const geocodingResponse = await axios.get(geocodingUrl, {
        headers: {
          "User-Agent": "RealEstateApp (german1kosach@gmail.com)",
        },
      });

      if (geocodingResponse.data && geocodingResponse.data.length > 0) {
        return {
          latitude: parseFloat(geocodingResponse.data[0].lat),
          longitude: parseFloat(geocodingResponse.data[0].lon),
        };
      }
    } catch (error) {
      this.logger.error("Geocoding error:", error);
    }

    return { latitude: null, longitude: null };
  }
}
