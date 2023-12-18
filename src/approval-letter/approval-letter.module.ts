import { Module } from '@nestjs/common';
import { ApprovalLetterService } from './approval-letter.service';
import { ApprovalLetterController } from './approval-letter.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [ApprovalLetterController],
  providers: [ApprovalLetterService, PrismaService, CloudinaryService, MailService],
})
export class ApprovalLetterModule { }
