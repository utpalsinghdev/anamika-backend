import { Injectable } from '@nestjs/common';
import { CreatePaymentqrDto } from './dto/create-paymentqr.dto';
import { UpdatePaymentqrDto } from './dto/update-paymentqr.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PaymentqrService {
  constructor(private prisma: PrismaService, private cloud: CloudinaryService) { }

  async create(createPaymentqrDto: CreatePaymentqrDto) {
    // const { qr } = createPaymentqrDto;x
    const _qr = await this.cloud.uploadBase64File(createPaymentqrDto.qr.toString());

    const allPaymentqr = await this.prisma.paymentqr.findMany();
    if (allPaymentqr.length > 0) {
      await this.prisma.paymentqr.deleteMany({});
    }
    return await this.prisma.paymentqr.create({
      data: {
        url: _qr.secure_url,
      }
    });
  }

  getQR() {
    return this.prisma.paymentqr.findMany({});
  }

}
