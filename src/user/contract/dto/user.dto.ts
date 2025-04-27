import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateManagerDto {
  @IsString()
  cognitoId!: string;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phoneNumber!: string;
}

export class UpdateManagerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
