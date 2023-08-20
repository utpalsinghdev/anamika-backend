import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { CreateNewDto } from './dto/create-new.dto';
import { UpdateNewDto } from './dto/update-new.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Lane } from '@prisma/client';

@Injectable()
export class NewService {
  constructor(private readonly prisma: PrismaService) {

  }
  async create(createNewDto: CreateNewDto) {
    const new_news = await this.prisma.news.create(
      {
        data: {
          text: createNewDto.text,
          lane: createNewDto.lane as Lane
        }
      }
    )
    return new_news;
  }

  async findAll() {
    const all_news = await this.prisma.news.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
    return all_news;
  }

  async findOne(id: number) {
    const find_news = await this.prisma.news.findFirst({
      where: {
        id
      }
    })
    if (!find_news) {
      throw new HttpException("New Not Found", HttpStatus.NOT_FOUND)
    }
    return find_news;
  }

  async update(id: number, updateNewDto: UpdateNewDto) {
    const find_news = await this.prisma.news.findFirst({
      where: {
        id
      }
    })
    if (!find_news) {
      throw new HttpException("New Not Found", HttpStatus.NOT_FOUND)
    }
    const update_news = await this.prisma.news.update(
      {
        where: {
          id
        },
        data: {
          text: updateNewDto.text,
          lane: updateNewDto.lane as Lane
        },

      }
    )
    return update_news;
  }

  async remove(id: number) {
    const find_news = await this.prisma.news.findFirst({
      where: {
        id
      }
    })
    if (!find_news) {
      throw new HttpException("New Not Found", HttpStatus.NOT_FOUND)
    }
    const delete_news = await this.prisma.news.delete({
      where: {
        id
      }
    })
    return delete_news;
  }
}
