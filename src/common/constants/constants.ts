import { AllowedFileTypes } from "../types";

export const POLYGON_RPC_URLS = {
  TESTNET: "https://rpc-amoy.polygon.technology/",
  MAINNET: "https://polygon-rpc.com/",
};

export const PERSONA_BASE_URI = "https://api.withpersona.com/api/v1";

export const SUPPORTED_PROPERTY_FILE_TYPES: Array<AllowedFileTypes> = ["image", "application/pdf", "video"] as const;
export const PROPERTY_FILE_LIMITS = { "application/pdf": 10, image: 20, video: 1 } as const;
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
