import { Payment } from "@/src/database/entities";
import { Expose } from "class-transformer";
import { IsDate, IsNumber, IsString, IsUUID } from "class-validator";

@Expose()
export class PaymentDto {
  @IsUUID() id!: string;
  @IsNumber() amountDue!: number;
  @IsNumber() amountPaid!: number;
  @IsDate() dueDate!: Date;
  @IsDate() paymentDate!: Date | null;
  @IsString() paymentStatus!: string;

  static fromEntity(entity: Payment): PaymentDto {
    const dto = new PaymentDto();
    dto.id = entity.id;
    dto.amountDue = entity.amountDue;
    dto.amountPaid = entity.amountPaid;
    dto.dueDate = entity.dueDate;
    dto.paymentDate = entity.paymentDate;
    dto.paymentStatus = entity.paymentStatus;
    return dto;
  }
}
