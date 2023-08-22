import { GuardianRelation, Proof, Type } from "@prisma/client";
import { IsBase64, IsDateString, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(GuardianRelation)
    guardian_relation: GuardianRelation;

    @IsNotEmpty()
    guardian_name: string;

    @IsNotEmpty()
    phone: string;

    @IsDateString()
    dob: Date;

    @IsEmail()
    email: string;

    @IsInt()
    loanInNumber: number;

    @IsNotEmpty()
    loanInWords: string;

    @IsInt()
    loanYear: number;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    district: string;

    @IsNotEmpty()
    @IsString()
    State: string;

    @IsInt()
    pinCode: number;

    @IsOptional()
    @IsNumber()
    agentId: string;

    @IsNotEmpty()
    @IsString()
    bank: string;

    @IsNotEmpty()
    AccountNumber: string;

    @IsNotEmpty()
    @IsString()
    ifsc: string;

    @IsEnum(Type)
    accountType: Type;

    @IsNotEmpty()
    @IsBase64()
    photo: string;

    @IsNotEmpty()
    @IsBase64()
    AdharCard: string;

    @IsNotEmpty()
    adharNumber: string;

    @IsNotEmpty()
    panNumber: string;

    @IsEnum(Proof)
    bankProof: Proof;

    @IsNotEmpty()
    @IsBase64()
    proofDoc: string; // Base64 encoded proof document
    
    @IsNotEmpty()
    @IsBase64()
    panCard: string; // Base64 encoded proof document

}
