import { GuardianRelation, Proof, Type } from "@prisma/client";
import { IsBase64, IsDateString, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class CreateWelomeCustomerDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(GuardianRelation)
    guardian_relation: GuardianRelation;

    @IsNotEmpty()
    guardian_name: string;

    @IsNotEmpty()
    phone: string;

    @IsInt()
    loanInNumber: number;

    @IsNotEmpty()
    loanInWords: string;

    @IsInt()
    loanYear: number;

    @IsOptional()
    @IsNumber()
    agentId: string;

    @IsNumber()
    @IsNotEmpty()
    charge: number

    @IsNumber()
    @IsNotEmpty()
    employeeId: number



}