import { IsBase64, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePaymentqrDto {
    @IsOptional()
    @IsString()
    qr: String;

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

}
