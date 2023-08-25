import { IsBase64, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateApprovalLetterDto {
    @IsNotEmpty()
    @IsInt()
    customerId: number;


    @IsNotEmpty()
    @IsString()
    address: string;


    @IsNotEmpty()
    @IsString()
    permanentAddress: string;

    @IsNotEmpty()
    @IsString()
    processingCharge: string;


    @IsOptional()
    @IsBase64()
    @IsString()
    photo: string;

}
