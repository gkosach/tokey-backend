import { IsEnum, IsString } from "class-validator";
import { PaymentMethod } from "@prisma/client";

export class CreateInvestorDto {
  @IsString()
  cognitoId!: string;

  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  phoneNumber!: string;

  @IsEnum(PaymentMethod)
  preferredMethod!: PaymentMethod;
}
