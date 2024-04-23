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
      // const _qr = await this.cloud.uploadBase64File(createPaymentqrDto.qr.toString());
      // data = {
      //   url: _qr.secure_url,
      //   bankName: createPaymentqrDto.bankName,
      //   accountNo: createPaymentqrDto.accountNo,
      //   ifsc: createPaymentqrDto.ifsc,
      //   holderName: createPaymentqrDto.holderName,
      //   fileCharge: createPaymentqrDto.fileCharge
      // }
      data.url = createPaymentqrDto.qr;
    } else {
      delete data.qr;
    }

    const lastCreated = await this.prisma.paymentqr.findMany({
      orderBy: {
        id: 'desc'
      },
      take: 1
    });
    if (lastCreated) {
      return await this.prisma.paymentqr.update({
        where: {
          id: lastCreated[0].id
        },
        data: {
          url: data.url || lastCreated[0].url,
          bankName: data.bankName || lastCreated[0].bankName,
          accountNo: data.accountNo || lastCreated[0].accountNo,
          ifsc: data.ifsc || lastCreated[0].ifsc,
          holderName: data.holderName || lastCreated[0].holderName,
          fileCharge: data.fileCharge || lastCreated[0].fileCharge
        }
      });
    } else {
      return await this.prisma.paymentqr.create({
        data: {
          ...data
        }
      });
    }

  }

  getQR() {
    return this.prisma.paymentqr.findMany({});
  }

}
