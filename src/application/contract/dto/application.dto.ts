import { ApplicationStatus } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  investorCognitoId!: string;

  @IsInt()
  propertyId!: number;

  @IsOptional()
  @IsString()
  message?: string;

  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;
}

export class UpdateApplicationStatusDto {
  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;
}
