import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
    @IsNotEmpty()
    @IsString()
    LastName: string
    @IsNotEmpty()
    @IsString()
    password: string
}
