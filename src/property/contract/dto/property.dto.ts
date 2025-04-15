import { PropertyType } from "@prisma/client";
import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreatePropertyDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  tokenPrice!: number;

  @IsInt()
  totalTokens!: number;

  @IsNumber()
  @IsOptional()
  rentalPercent?: number;

  @IsString()
  address!: string;

  @IsEnum(PropertyType)
  propertyType!: PropertyType;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  photoUrls?: string[];

  @IsString()
  @IsOptional()
  managerCognitoId?: string;
}
