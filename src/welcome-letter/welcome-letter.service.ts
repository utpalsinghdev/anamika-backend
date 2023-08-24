import { Injectable } from '@nestjs/common';
import { CreateWelcomeLetterDto } from './dto/create-welcome-letter.dto';
import { UpdateWelcomeLetterDto } from './dto/update-welcome-letter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WelcomeLetterService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createWelcomeLetterDto: CreateWelcomeLetterDto) {
    return await this.prisma.welcomeLetter.create({
      data: createWelcomeLetterDto,
      include: {
        for: true,
        with: true
      }
    });
  }

  async findAll() {
    return await this.prisma.welcomeLetter.findMany({
      include: {
        for: true,
        with: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.welcomeLetter.findFirst({
      where: { id }, include: {
        for: true,
        with: true
      }
    });
  }

  async update(id: number, updateWelcomeLetterDto: UpdateWelcomeLetterDto) {
    return await this.prisma.welcomeLetter.update({
      where: { id },
      data: updateWelcomeLetterDto,
      include: {
        for: true,
        with: true
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.welcomeLetter.delete({ where: { id } });
  }
}
