import { ROLE } from '@prisma/client';
import { IsBase64, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateJointPrecentDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    LastName: string

    @IsNotEmpty()
    @IsString()
    Email: string

    @IsNotEmpty()
    @IsString()
    Phone: string

    @IsNotEmpty()
    @IsString()
    city: string

    @IsNotEmpty()
    @IsString()
    designation: string

    @IsNotEmpty()
    @IsBase64()
    @IsString()
    photo: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsInt()
    file_charge: number;

    @IsNotEmpty()
    @IsInt()
    loan_amount: number;

    @IsNotEmpty()
    @IsInt()
    processing_fee: number;

    @IsNotEmpty()
    @IsInt()
    add_charge: number;

    @IsNotEmpty()
    @IsInt()
    service_tax: number;
}
