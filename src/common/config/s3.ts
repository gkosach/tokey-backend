import { S3Client } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";

const validateAWSEnv = () => {
  if (!process.env.AWS_REGION) {
    throw new Error("AWS_REGION is required in .env");
  }
};

validateAWSEnv();

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
});
