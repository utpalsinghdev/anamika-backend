import { Injectable } from '@nestjs/common';
import { CreateIcardDto } from './dto/create-icard.dto';
import { UpdateIcardDto } from './dto/update-icard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class IcardService {
  constructor(private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService

  ) { }

  async create(createIcardDto: CreateIcardDto) {

    return await this.prisma.icard.create({
      data: createIcardDto,
      include: {
        agent: true
      }
    })
  }

  async findAll() {
    return await this.prisma.icard.findMany({
      include: {
        agent: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.icard.findUnique({ where: { id }, include: { agent: true } });
  }

  async update(id: number, updateIcardDto: UpdateIcardDto) {
    if (updateIcardDto.photo) {
      const photo = await this.cloudinary.uploadBase64File(updateIcardDto.photo)
      updateIcardDto.photo = photo.secure_url
    }

    return await this.prisma.icard.update({
      where: { id },
      data: updateIcardDto,
      include: {
        agent: true
      }

    });
  }

  async remove(id: number) {
    return await this.prisma.icard.delete({ where: { id }, include: { agent: true } });
  }
}
