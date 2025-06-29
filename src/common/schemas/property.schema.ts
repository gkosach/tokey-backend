/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         contractAddress:
 *           type: string
 *         title:
 *           type: string
 *         status:
 *           type: string
 *           enum: [COMING_SOON, ACTIVE, SOLD_OUT, COMPLETED]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *         address:
 *           type: string
 *         media:
 *           type: object
 *         tiers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PropertyTier'
 *
 *     PropertyTier:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         propertyId:
 *           type: string
 *         type:
 *           type: string
 *           enum: [PLATINUM, RUBY, DIAMOND]
 *         price:
 *           type: number
 *         totalSupply:
 *           type: integer
 *         benefits:
 *           type: object
 *
 *     PropertyCreateInput:
 *       type: object
 *       properties:
 *         contractAddress:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         address:
 *           type: string
 *         media:
 *           type: object
 *       required:
 *         - contractAddress
 *         - title
 */
export const PropertySchema = {};
