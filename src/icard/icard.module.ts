import { Module } from '@nestjs/common';
import { IcardService } from './icard.service';
import { IcardController } from './icard.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [IcardController],
  providers: [IcardService, PrismaService, CloudinaryService],
})
export class IcardModule { }
