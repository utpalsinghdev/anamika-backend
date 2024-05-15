import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator";

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    @IsIn([
        "EMI",
        "PAYMENT",
        "SUBSIDY",
        "login_fee",
        "Disburse",
        "Emi_date",
        "Closed",
        "Disburse_verify",
        "sanction",
        "bank_verification",
        "sing_kit"
    ])
    name: string

    @IsNotEmpty()
    @IsString()
    @IsIn(["done", "pending"])
    status: string

    @IsOptional()
    @IsString()
    date: string

    @IsOptional()
    @IsString()
    amount: string

    @IsOptional()
    @IsString()
    pending: string

    @IsOptional()
    @IsString()
    total: string

    @IsNotEmpty()
    @IsNumber()
    customerId: number

}
