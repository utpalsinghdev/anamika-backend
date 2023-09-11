import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService,CloudinaryService, PrismaService, MailService],
})
export class CustomerModule {}
