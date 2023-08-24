import { IsBase64, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateIcardDto {
    @IsNotEmpty()
    @IsInt()
    employeeId: number

    @IsNotEmpty()
    @IsBase64()
    profilepic: string;

    @IsNotEmpty()
    @IsString()
    location: string
}
