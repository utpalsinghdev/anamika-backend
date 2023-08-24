import { Module } from '@nestjs/common';
import { WelcomeLetterService } from './welcome-letter.service';
import { WelcomeLetterController } from './welcome-letter.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WelcomeLetterController],
  providers: [WelcomeLetterService, PrismaService],
})
export class WelcomeLetterModule { }
