import { IsBase64, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PassworddDto {
    // @IsOptional()
    // @IsString()
    // password: string
    // @IsOptional()
    // @IsString()
    // Oldpassword: string

    @IsString()
    @IsOptional()
    @IsBase64()
    profilePic: string
}

