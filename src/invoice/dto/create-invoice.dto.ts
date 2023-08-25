import { Method } from "@prisma/client";
import { IsNotEmpty, IsString, IsInt, IsOptional, IsIn, IsEnum } from "class-validator";

export class CreateInvoiceDto {
    @IsInt()
    @IsNotEmpty()
    customerId: number

    @IsInt()
    @IsNotEmpty()
    total: number

    @IsString()
    @IsNotEmpty()
    desciption: string

    @IsString()
    @IsNotEmpty()
    refence: string
    @IsString()
    @IsNotEmpty()
    invoiceId: string



    @IsOptional()
    @IsInt()
    price: number

    @IsOptional()
    @IsInt()
    qty: number

    @IsOptional()
    @IsInt()
    subT: number
    @IsOptional()
    @IsInt()
    recived: number


    @IsString()
    @IsEnum(Method)
    paymentMethod: Method
}
