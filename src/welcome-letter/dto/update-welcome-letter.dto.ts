import { PartialType } from '@nestjs/swagger';
import { CreateWelcomeLetterDto } from './create-welcome-letter.dto';

export class UpdateWelcomeLetterDto extends PartialType(CreateWelcomeLetterDto) {}
