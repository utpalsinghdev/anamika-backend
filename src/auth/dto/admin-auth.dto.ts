import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    Id: string;
    @IsNotEmpty()
    @IsString()
    password: string
}
