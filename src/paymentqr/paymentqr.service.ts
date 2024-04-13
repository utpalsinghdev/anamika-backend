import { Injectable } from '@nestjs/common';
import { CreatePaymentqrDto } from './dto/create-paymentqr.dto';
import { UpdatePaymentqrDto } from './dto/update-paymentqr.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PaymentqrService {
  constructor(private prisma: PrismaService, private cloud: CloudinaryService) { }

  async create(createPaymentqrDto: CreatePaymentqrDto) {
    let data = {
      ...createPaymentqrDto as any
    };
    if (createPaymentqrDto.qr) {
      const _qr = await this.cloud.uploadBase64File(createPaymentqrDto.qr.toString());
      data = {
        url: _qr.secure_url,
        bankName: createPaymentqrDto.bankName,
        accountNo: createPaymentqrDto.accountNo,
        ifsc: createPaymentqrDto.ifsc,
        holderName: createPaymentqrDto.holderName,
        fileCharge: createPaymentqrDto.fileCharge
      }
    } else {
      delete data.qr;
    }

    const allPaymentqr = await this.prisma.paymentqr.findMany();
    if (allPaymentqr.length > 0) {
      await this.prisma.paymentqr.deleteMany({});
    }
    return await this.prisma.paymentqr.create({
      data: {
        ...data
      }
    });
  }

  getQR() {
    return this.prisma.paymentqr.findMany({});
  }

}
