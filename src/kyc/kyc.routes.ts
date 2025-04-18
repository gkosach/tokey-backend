import express from "express";
import { KycService } from "./kyc.service";
import { CreateKycSessionDto } from "./contract/dto/kyc.dto";
import { KycErrorMessages } from "../common/enum/error/kyc-error.enum";
import { KycError } from "./contract/error/kyc.error";

const router = express.Router();
const kycService = new KycService();

router.post("/init", async (req, res) => {
  try {
    const dto: CreateKycSessionDto = req.body;
    const result = await kycService.createSession(dto.userId, dto.userType);
    res.json(result);
  } catch (error) {
    if (error instanceof KycError) {
      res.status(error.statusCode).json({
        error: error.message,
        code: error.statusCode,
      });
    } else {
      res.status(500).json({
        error: KycErrorMessages.KYC_GENERIC_ERROR,
      });
    }
  }
});

export default router;
