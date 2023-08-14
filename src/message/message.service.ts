import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prismaServices: PrismaService) { }

  async create(createMessageDto: CreateMessageDto) {

    return await this.prismaServices.message.create({
      data: {
        name: createMessageDto.name,
        email: createMessageDto.email,
        phone: createMessageDto.phone,
        message: createMessageDto.message
      }
    })

  }

  async findAll() {
    return await this.prismaServices.message.findMany()
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  async remove(id: number) {
    return await this.prismaServices.message.delete({
      where: {
        id: id
      }
    })
  }

}
