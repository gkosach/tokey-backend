import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import "reflect-metadata"; // Добавляем импорт полифилла

class MetadataDto {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsNumber()
  @IsNotEmpty()
  roi!: number;

  @IsString()
  @IsNotEmpty()
  docsIpfs!: string;

  @IsString({ each: true })
  photos?: string[];
}

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  solanaMint!: string;

  @IsUUID()
  @IsNotEmpty()
  ownerId!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @ValidateNested()
  @Type(() => {
    return MetadataDto;
  })
  metadata!: MetadataDto;
}
