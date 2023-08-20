import { Lane } from "@prisma/client";
import { IsIn, IsNotEmpty, IsString, } from "class-validator";

export class CreateNewDto {
    @IsNotEmpty()
    @IsString()
    text: string

    @IsNotEmpty()
    @IsString()
    @IsIn(["FIRST", "SECOND"])
    lane: string

}
