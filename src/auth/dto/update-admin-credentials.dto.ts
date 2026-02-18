import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateAdminCredentialsDto {
  @IsString()
  @MinLength(1, { message: "Current password is required" })
  currentPassword: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: "Username must be at least 3 characters" })
  employeeCode?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: "New password must be at least 6 characters" })
  newPassword?: string;
}
