import { ApplicationDto } from "@/src/application";
import { User } from "@/src/database/entities";
import { LeaseDto } from "@/src/lease/contract/dto/lease.dto";
import { PropertyDto } from "@/src/property/contract/dto/property.dto";
import { Exclude, Expose, Transform } from "class-transformer";
import { IsEmail, IsString, IsUUID, ValidateNested } from "class-validator";

@Exclude()
export class UserDto {
  @Expose()
  @IsUUID()
  id!: string;

  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  role!: string;

  @Expose()
  @ValidateNested({ each: true })
  @Transform(({ value }) => {
    return (value ?? []).map(PropertyDto.fromEntity);
  })
  managedProperties!: PropertyDto[];

  @Expose()
  @ValidateNested({ each: true })
  @Transform(({ value }) => {
    return (value ?? []).map(LeaseDto.fromEntity);
  })
  leases!: LeaseDto[];

  @Expose()
  @Transform(({ value }) => {
    return (value ?? []).map((f) => {
      return f.propertyId;
    });
  })
  @IsString({ each: true })
  favorites!: string[];

  @Expose()
  @ValidateNested({ each: true })
  @Transform(({ value }) => {
    return (value ?? []).map(ApplicationDto.fromEntity);
  })
  applications!: ApplicationDto[];

  static fromEntity(entity: User): UserDto {
    const dto = new UserDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.role = entity.role;

    // Универсальная обработка массивов
    const safeMap = <T, R>(arr: T[] | undefined, mapper: (item: T) => R) => {
      return (arr ?? []).map(mapper);
    };

    dto.managedProperties = safeMap(entity.managedProperties, PropertyDto.fromEntity);
    dto.leases = safeMap(entity.leases, LeaseDto.fromEntity);
    dto.applications = safeMap(entity.applications, ApplicationDto.fromEntity);
    dto.favorites = safeMap(entity.favorites, (f) => {
      return f.propertyId;
    });

    return dto;
  }
}
