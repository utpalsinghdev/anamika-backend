import { Injectable } from '@nestjs/common';
import { CreateApprovalLetterDto } from './dto/create-approval-letter.dto';
import { UpdateApprovalLetterDto } from './dto/update-approval-letter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ApprovalLetterService {
  constructor(private readonly prisma: PrismaService, private readonly cloud: CloudinaryService) { }
  async create(createApprovalLetterDto: CreateApprovalLetterDto) {
    if (createApprovalLetterDto.photo) {
      const img = await this.cloud.uploadBase64File(createApprovalLetterDto.photo);
      createApprovalLetterDto.photo = img.secure_url
    }
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
            photo:true
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
