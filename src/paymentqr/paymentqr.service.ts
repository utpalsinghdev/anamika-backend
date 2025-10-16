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
    if (lastCreated.length) {
      return await this.prisma.paymentqr.update({
        where: {
          id: lastCreated[0].id
        },
        data: {
          url: data.url || lastCreated[0].url,
          title: data.title || lastCreated[0].title,
          email: data.email || lastCreated[0].email,
          bankName: data.bankName || lastCreated[0].bankName,
          accountNo: data.accountNo || lastCreated[0].accountNo,
          ifsc: data.ifsc || lastCreated[0].ifsc,
          holderName: data.holderName || lastCreated[0].holderName,
          fileCharge: data.fileCharge || lastCreated[0].fileCharge,
          phoneNumbers: data.phoneNumbers || lastCreated[0].phoneNumbers,
          addresses: data.addresses || lastCreated[0].addresses,
          icardIsPdf: data.icardIsPdf !== undefined ? data.icardIsPdf : lastCreated[0].icardIsPdf
        }
      });
    } else {
      return await this.prisma.paymentqr.create({
        data: {
          url: data.url || '',
          title: data.title || "",
          email: data.email || '',
          bankName: data.bankName || '',
          accountNo: data.accountNo || '',
          ifsc: data.ifsc || '',
          holderName: data.holderName || '',
          fileCharge: data.fileCharge || '4550',
          phoneNumbers: data.phoneNumbers || [],
          addresses: data.addresses || [],
          icardIsPdf: data.icardIsPdf !== undefined ? data.icardIsPdf : true
        }
      });
    }

  }

  getQR() {
    return this.prisma.paymentqr.findMany({});
  }

}
