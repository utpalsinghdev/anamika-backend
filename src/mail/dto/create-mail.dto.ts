import { IsNotEmpty } from "class-validator"

export class CreateMailDto {
    @IsNotEmpty()
    numbers:string
    @IsNotEmpty()
    message: string
}
