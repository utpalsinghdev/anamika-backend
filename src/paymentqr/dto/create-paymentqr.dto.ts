import { IsBase64, IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentqrDto {
    @IsNotEmpty()
    @IsBase64()
    @IsString()
    qr: String;
}
