import { IsBase64, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PassworddDto {

    @IsString()
    password: string

    @IsString()
    Oldpassword: string

    @IsString()
    @IsOptional()
    @IsBase64()
    profilePic: string
}
