/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         cognitoId:
 *           type: string
 *         email:
 *           type: string
 *         referralLink:
 *           type: string
 *           nullable: true
 *         kycStatus:
 *           type: string
 *           enum: [CREATED, COMPLETED, APPROVED, DECLINED]
 *           nullable: true
 *         kycProviderId:
 *           type: string
 *           nullable: true
 *         kycCompletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 */
export const UserSchema = {};
