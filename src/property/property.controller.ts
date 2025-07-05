import { Request, Response } from "express";
import { GetPropertiesRequest } from "../common";
import { PropertyService } from "./property.service";

export class PropertyController {
  constructor(private propertyService = new PropertyService()) {}

  /**
   * @swagger
   * /api/properties:
   *   post:
   *     summary: Create a new property
   *     tags: [Properties]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PropertyCreateInput'
   *     responses:
   *       201:
   *         description: Property created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Property'
   */
  async createProperty(req: Request, res: Response): Promise<void> {
    const property = await this.propertyService.createProperty(req.body);
    res.status(201).json({
      success: true,
      data: property,
    });
  }

  /**
   * @swagger
   * /api/properties:
   *   get:
   *     summary: Get all properties with optional filters
   *     tags: [Properties]
   *     parameters:
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [COMING_SOON, ACTIVE, SOLD_OUT, COMPLETED]
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *       - in: query
   *         name: offset
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: List of properties
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 properties:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Property'
   *                 total:
   *                   type: integer
   */
  async getAllProperties(req: GetPropertiesRequest, res: Response): Promise<void> {
    const query = req.properties?.query || {};

    const result = await this.propertyService.getAllProperties(query);

    res.json({
      success: true,
      data: result,
    });
  }

  /**
   * @swagger
   * /api/properties/active:
   *   get:
   *     summary: Get active properties
   *     tags: [Properties]
   *     responses:
   *       200:
   *         description: List of active properties
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Property'
   */
  async getActiveProperties(req: Request, res: Response): Promise<void> {
    const result = await this.propertyService.getAllProperties({
      status: "ACTIVE",
    });

    res.json({
      success: true,
      data: result.properties,
    });
  }

  /**
   * @swagger
   * /api/properties/{id}:
   *   get:
   *     summary: Get property by ID
   *     tags: [Properties]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Property details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Property'
   *       404:
   *         description: Property not found
   */
  async getProperty(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const property = await this.propertyService.getPropertyById(id);
    res.json({
      success: true,
      data: property,
    });
  }

  /**
   * @swagger
   * /api/properties/{id}/status:
   *   patch:
   *     summary: Update property status
   *     tags: [Properties]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               status:
   *                 type: string
   *                 enum: [COMING_SOON, ACTIVE, SOLD_OUT, COMPLETED]
   *     responses:
   *       200:
   *         description: Updated property
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Property'
   */
  async updatePropertyStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status } = req.body;

    const property = await this.propertyService.updatePropertyStatus(id, status);

    res.json({
      success: true,
      data: property,
    });
  }
}

export const propertyController = new PropertyController();
