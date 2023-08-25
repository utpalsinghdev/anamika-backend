import { PartialType } from '@nestjs/swagger';
import { CreateApprovalLetterDto } from './create-approval-letter.dto';

export class UpdateApprovalLetterDto extends PartialType(CreateApprovalLetterDto) {}
