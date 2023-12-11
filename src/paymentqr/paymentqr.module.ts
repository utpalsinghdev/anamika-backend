import { Module } from '@nestjs/common';
import { PaymentqrService } from './paymentqr.service';
import { PaymentqrController } from './paymentqr.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [PaymentqrController],
  providers: [PaymentqrService, PrismaService, CloudinaryService],
})
export class PaymentqrModule { }
