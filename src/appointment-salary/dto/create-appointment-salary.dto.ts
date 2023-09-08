import { IsBase64, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAppointmentSalaryDto {
    @IsNotEmpty()
    @IsInt()
    employeeId: number;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    @IsBase64()
    photo: string;

    @IsNotEmpty()
    @IsString()
    salary: string

    @IsOptional()
    @IsString()
    agentName: string

    @IsOptional()
    @IsString()
    agentNumber: string

    @IsNotEmpty()
    @IsInt()
    targetOne: number;

    @IsNotEmpty()
    @IsInt()
    targetTwo: number;
}
