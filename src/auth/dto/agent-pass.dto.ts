import { IsNotEmpty, IsString } from "class-validator";

export class PassworddDto {

    @IsString()
    password: string
    @IsString()
    Oldpassword: string
}
