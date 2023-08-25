import { IsBase64, IsInt, IsNotEmpty, IsString } from "class-validator";

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

    @IsNotEmpty()
    @IsInt()
    targetOne: number;

    @IsNotEmpty()
    @IsInt()
    targetTwo: number;
}
