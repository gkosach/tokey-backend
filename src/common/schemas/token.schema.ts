/**
 * @swagger
 * components:
 *   schemas:
 *     TokenBalance:
 *       type: object
 *       properties:
 *         tier:
 *           $ref: '#/components/schemas/PropertyTier'
 *         property:
 *           $ref: '#/components/schemas/Property'
 *         totalTokens:
 *           type: number
 *         transactions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               tokensAmount:
 *                 type: number
 *               createdAt:
 *                 type: string
 *
 *     TokenTransaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         tierId:
 *           type: string
 *         tokensAmount:
 *           type: number
 *         userAddress:
 *           type: string
 *         contractAddress:
 *           type: string
 *         txHash:
 *           type: string
 *         paymentAmount:
 *           type: number
 *         createdAt:
 *           type: string
 *         tier:
 *           type: object
 *           properties:
 *             property:
 *               $ref: '#/components/schemas/Property'
 */
export const TokenSchema = {};
