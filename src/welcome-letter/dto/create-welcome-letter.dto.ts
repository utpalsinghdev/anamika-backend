import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateWelcomeLetterDto {
    @IsNumber()
    @IsNotEmpty()
    customerId: number


    @IsNumber()
    @IsNotEmpty()
    employeeId: number


    @IsNumber()
    @IsNotEmpty()
    charge: number
}
