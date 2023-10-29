import { IsBase64, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateIcardDto {
    @IsNotEmpty()
    @IsInt()
    employeeId: number



    @IsNotEmpty()
    @IsString()
    location: string
}
