import { Injectable } from '@nestjs/common';
import { CreateApprovalLetterDto } from './dto/create-approval-letter.dto';
import { UpdateApprovalLetterDto } from './dto/update-approval-letter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MailService } from 'src/mail/mail.service';
import mailEnums from 'src/utils/mailEnumbs';

@Injectable()
export class ApprovalLetterService {
  constructor(private readonly prisma: PrismaService, private readonly cloud: CloudinaryService, private readonly mail: MailService) { }
  async create(createApprovalLetterDto: CreateApprovalLetterDto) {
    if (createApprovalLetterDto.photo) {
      const img = await this.cloud.uploadBase64File(createApprovalLetterDto.photo);
      createApprovalLetterDto.photo = img.secure_url
    }
    const _customer = await this.prisma.customer.findUnique({
      where: {
        id: createApprovalLetterDto.customerId
      }
    })
    const res = await this.mail.sendSms({
      numbers: _customer.phone,
      type: mailEnums.LOAN_APPROVED.toString(),
      value: `${_customer.name}|${_customer.loanInNumber}`
    })
    return await this.prisma.approvalLetter.create({
      data: createApprovalLetterDto,
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
    return await this.prisma.approvalLetter.findMany({
      include: {
        customer: {
          include: {
            agent: true,
            photo: true
          }
        }
      }
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} approvalLetter`;
  }

  async update(id: number, updateApprovalLetterDto: UpdateApprovalLetterDto) {
    return `This action updates a #${id} approvalLetter`;
  }

  async remove(id: number) {
    return await this.prisma.approvalLetter.delete({ where: { id } });
  }
}
