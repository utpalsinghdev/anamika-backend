import { PartialType } from '@nestjs/swagger';
import { CreateNewDto } from './create-new.dto';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateNewDto extends PartialType(CreateNewDto) {
    @IsNotEmpty()
    @IsString()
    text: string

    @IsNotEmpty()
    @IsString()
    @IsIn(["FIRST", "SECOND"])
    lane: string

}
