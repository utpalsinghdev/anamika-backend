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

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    guradian_relation: string;


    @IsNotEmpty()
    @IsString()
    guardian_name: string;

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

    @IsBase64()
    @IsNotEmpty()
    profilePic: string;


}
