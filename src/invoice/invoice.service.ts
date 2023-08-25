import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Method } from '@prisma/client';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createInvoiceDto: CreateInvoiceDto) {
    const _id = await this._invoiceId()

    return await this.prisma.invoice.create({
      data: {
        invoiceId: _id,
        customerId: createInvoiceDto.customerId,
        desciption: createInvoiceDto.desciption,
        total: createInvoiceDto.total,
        refence: createInvoiceDto.refence,
        paymentMethod: createInvoiceDto.paymentMethod as Method,
        price: createInvoiceDto.price || null,
        qty: createInvoiceDto.qty || null,
        subT: createInvoiceDto.subT || null,
        recived: createInvoiceDto.recived || null
      },
      include: {
        customer: {
          include: {
            agent: true
          }
        }
      }
    });
  }

  async findAll() {
    return await this.prisma.invoice.findMany({
      include: {
        customer: {
          include: {
            agent: true
          }
        }
      }
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  async remove(id: number) {
    return await this.prisma.invoice.delete({ where: { id } });
  }

  private async _invoiceId() {
    const latest_inovice = await this.prisma.invoice.findMany({
      take: 1,
      orderBy: {
        id: "desc"
      }
    })

    const last_invoice = latest_inovice[0]

    let a_id = "GAINID"

    if (!last_invoice.invoiceId) {
      a_id = a_id + "0001"
    } else {
      const last_id = last_invoice.invoiceId
      const _id = last_id.split("GAINID")[1]
      const id = parseInt(_id)
      a_id = a_id + id.toString().padStart(4, '0')
    }

    return a_id
  }
}
