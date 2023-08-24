import { PartialType } from '@nestjs/swagger';
import { CreateIcardDto } from './create-icard.dto';
import { IsBase64, IsOptional } from 'class-validator';

export class UpdateIcardDto extends PartialType(CreateIcardDto) {
    @IsOptional()
    @IsBase64()
    photo: string;
}
