import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventType } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {

  }
  async create(createEventDto: CreateEventDto) {
    return await this.prisma.event.create({
      data: {
        name: createEventDto.name as EventType,
        date: createEventDto.date || null,
        amount: createEventDto.amount || null,
        status: createEventDto.status,
        customerId: Number(createEventDto.customerId)
      }
    });
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  async update(id: number, updateEventDto: CreateEventDto) {
    const _event = await this.prisma.event.findUnique({
      where: {
        id
      }
    })
    return await this.prisma.event.update({
      where: { id },
      data: {
        name: updateEventDto.name as EventType,
        date: updateEventDto.date || _event.date,
        amount: updateEventDto.amount || _event.amount,
        status: updateEventDto.status,
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.event.delete({ where: { id } });
  }
}
