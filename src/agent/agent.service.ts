import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AgentService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.employee.findMany({
      where: {
        role: "AGENT",
        park: false
      }
    });
  }
  async findAllEmployee() {
    return await this.prisma.employee.findMany({
      where: {
        role: {
          not: "ADMIN",

        },
        park: false
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} agent`;
  }

  update(id: number, updateAgentDto: UpdateAgentDto) {
    return `This action updates a #${id} agent`;
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
