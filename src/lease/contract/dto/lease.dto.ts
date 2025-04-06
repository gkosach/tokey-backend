import { Lease } from "@/src/database/entities";
import { PaymentDto } from "@/src/payment/contract/dto/payment.dto";
import { PropertyDto } from "@/src/property/contract/dto/property.dto";
import { UserDto } from "@/src/user/contract/dto/user.dto";
import { Expose, Transform } from "class-transformer";
import { IsDate, IsNumber, IsUUID, ValidateNested } from "class-validator";

@Expose()
export class LeaseDto {
  @IsUUID() id!: string;

  @IsDate()
  startDate!: Date;

  @IsDate()
  endDate!: Date;

  @IsNumber()
  rent!: number;

  @IsNumber()
  deposit!: number;

  @ValidateNested()
  @Transform(({ value }) => PropertyDto.fromEntity(value))
  property!: PropertyDto;

  @ValidateNested()
  @Transform(({ value }) => UserDto.fromEntity(value))
  manager!: UserDto;

  @ValidateNested()
  @Transform(({ value }) => UserDto.fromEntity(value))
  investor!: UserDto;

  @ValidateNested({ each: true })
  @Transform(({ value }) => value.map(PaymentDto.fromEntity))
  payments!: PaymentDto[];

  static fromEntity(entity: Lease): LeaseDto {
    const dto = new LeaseDto();
    dto.id = entity.id;
    dto.startDate = entity.startDate;
    dto.endDate = entity.endDate;
    dto.rent = entity.rent;
    dto.deposit = entity.deposit;
    dto.property = PropertyDto.fromEntity(entity.property);
    dto.manager = UserDto.fromEntity(entity.manager);
    dto.investor = UserDto.fromEntity(entity.investor);
    dto.payments = entity.payments.map(PaymentDto.fromEntity);
    return dto;
  }
}
