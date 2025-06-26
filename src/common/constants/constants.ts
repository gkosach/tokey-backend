import { AllowedFileTypes } from "../types";

export const POLYGON_RPC_URLS = {
  TESTNET: "https://rpc-amoy.polygon.technology/",
  MAINNET: "https://polygon-rpc.com/",
};

export const PERSONA_BASE_URI = "https://api.withpersona.com/api/v1";

export const SUPPORTED_PROPERTY_FILE_TYPES: Array<AllowedFileTypes> = ["image", "application/pdf", "video"] as const;
