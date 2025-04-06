import { APPLICATION_STATUS } from "@/src/application";
import { Application } from "@/src/database/entities";
import { PropertyDto } from "@/src/property/contract/dto/property.dto";
import { UserDto } from "@/src/user/contract/dto/user.dto";
import { Expose, Type } from "class-transformer";
import { IsDate, IsEnum, IsString, IsUUID, ValidateNested } from "class-validator";

@Expose()
export class ApplicationDto {
  @IsUUID()
  id!: string;

  @IsDate()
  @Type(() => Date)
  applicationDate!: Date;

  @IsEnum(APPLICATION_STATUS)
  status!: string;

  @IsString()
  message!: string;

  @ValidateNested()
  @Type(() => PropertyDto)
  property!: PropertyDto;

  @ValidateNested()
  @Type(() => UserDto)
  applicant!: UserDto;

  static fromEntity(entity: Application): ApplicationDto {
    const dto = new ApplicationDto();
    dto.id = entity.id;
    dto.applicationDate = entity.applicationDate;
    dto.status = entity.status;
    dto.message = entity.message;

    if (entity.property) {
      dto.property = PropertyDto.fromEntity(entity.property);
    }

    if (entity.applicant) {
      dto.applicant = UserDto.fromEntity(entity.applicant);
    }

    return dto;
  }
}
