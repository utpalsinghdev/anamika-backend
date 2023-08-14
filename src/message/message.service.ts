import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prismaServices: PrismaService) { }

  async create(createMessageDto: CreateMessageDto) {
    try {
      console.log(createMessageDto)
      return {
        sucess: true,
        message: "Message Sent, We will get back to you soon",
        data: await this.prismaServices.message.create({
          data: {
            name: createMessageDto.name,
            email: createMessageDto.email,
            phone: createMessageDto.phone,
            message: createMessageDto.message
          }
        })
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    return {
      sucess: true,
      message: "All Messages",
      data: await this.prismaServices.message.findMany()
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  async remove(id: number) {
    return {
      sucess: true,
      message: "Message Deleted Successfully",
      data: await this.prismaServices.message.delete({
        where: {
          id: id
        }
      })
    }
  }
}
