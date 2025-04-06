import { Property } from "@/src/database/entities";
import { Expose } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsInt, IsNumber, IsString, IsUUID } from "class-validator";

@Expose()
export class PropertyDto {
  @IsUUID() id!: string;
  @IsString() name!: string;
  @IsString() description!: string;
  @IsNumber() pricePerMonth!: number;
  @IsNumber() securityDeposit!: number;
  @IsNumber() applicationFee!: number;
  @IsArray()
  @IsString({ each: true })
  photoUrls!: string[];
  @IsBoolean() isPetsAllowed!: boolean;
  @IsBoolean() isParkingIncluded!: boolean;
  @IsInt() beds!: number;
  @IsNumber() baths!: number;
  @IsInt() squareFeet!: number;
  @IsString() propertyType!: string;
  @IsString() address!: string;
  @IsString() city!: string;
  @IsString() state!: string;
  @IsString() country!: string;
  @IsString() postalCode!: string;
  @IsNumber() latitude!: number;
  @IsNumber() longitude!: number;
  @IsDate() postedDate!: Date;
  @IsNumber() averageRating!: number;
  @IsInt() numberOfReviews!: number;

  static fromEntity(entity: Property): PropertyDto {
    const dto = new PropertyDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.pricePerMonth = entity.pricePerMonth;
    dto.securityDeposit = entity.securityDeposit;
    dto.applicationFee = entity.applicationFee;
    dto.photoUrls = entity.photoUrls;
    dto.isPetsAllowed = entity.isPetsAllowed;
    dto.isParkingIncluded = entity.isParkingIncluded;
    dto.beds = entity.beds;
    dto.baths = entity.baths;
    dto.squareFeet = entity.squareFeet;
    dto.propertyType = entity.propertyType;
    dto.address = entity.address;
    dto.city = entity.city;
    dto.state = entity.state;
    dto.country = entity.country;
    dto.postalCode = entity.postalCode;
    dto.latitude = entity.latitude;
    dto.longitude = entity.longitude;
    dto.postedDate = entity.postedDate;
    dto.averageRating = entity.averageRating;
    dto.numberOfReviews = entity.numberOfReviews;
    return dto;
  }
}
