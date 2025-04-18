import { IsEnum, IsString } from "class-validator";

export class CreateKycSessionDto {
  @IsString()
  userId!: string;

  @IsEnum(["investor", "manager"], { message: "userType must be investor or manager" })
  userType!: "investor" | "manager";
}
