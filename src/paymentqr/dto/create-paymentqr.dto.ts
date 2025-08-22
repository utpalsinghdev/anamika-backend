import { IsBase64, IsNotEmpty, IsOptional, IsString, IsArray, IsEmail, IsBoolean } from "class-validator";

export class CreatePaymentqrDto {
    @IsOptional()
    @IsString()
    qr: String;

    @IsOptional()
    @IsString()
    title: String;

    @IsOptional()
    @IsEmail()
    email: String;

    @IsOptional()
    @IsString()
    bankName: String;

    @IsOptional()
    @IsString()
    accountNo: String;

    @IsOptional()
    @IsString()
    ifsc: String;

    @IsOptional()
    @IsString()
    holderName: String;

    @IsOptional()
    @IsString()
    fileCharge: String;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    phoneNumbers: String[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    addresses: String[];

    @IsOptional()
    @IsBoolean()
    icardIsPdf: Boolean;
}
