import { IsBase64, IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateAgentApplicationDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['AGENT', 'DEALERSHIP', 'FEILDOFFICER'])
    role: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsBase64()
    @IsNotEmpty()
    resume: string;
}
