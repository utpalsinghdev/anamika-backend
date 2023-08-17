import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgentApplicationDto } from './dto/create-agent-application.dto';
import { UpdateAgentApplicationDto } from './dto/update-agent-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLE, Status } from '@prisma/client';

@Injectable()
export class AgentApplicationService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createAgentApplicationDto: CreateAgentApplicationDto) {
    const [findEmail, findPhone] = await Promise.all([
      this.prisma.careerApplication.findUnique({
        where: { Email: createAgentApplicationDto.email },
      }),
      this.prisma.careerApplication.findUnique({
        where: { Phone: createAgentApplicationDto.phone },
      }),
    ]);

    if (!!findEmail) {
      throw new HttpException('Your Form is already Submitted', HttpStatus.CONFLICT);
    }

    if (!!findPhone) {
      throw new HttpException('Your Form is already Submitted', HttpStatus.BAD_REQUEST);
    }

    const [lastApplication] = await this.prisma.careerApplication.findMany({
      take: 1,
      orderBy: { id: 'desc' },
    });

    let a_id = "APID";
    if (!lastApplication?.ApplicationID) {
      a_id = a_id + "0001";
    } else {
      const id = parseInt(lastApplication.ApplicationID.split("APID")[1]) + 1;
      a_id = a_id + id.toString().padStart(4, '0');
    }

    const newApplication = await this.prisma.careerApplication.create({
      data: {
        ApplicationID: a_id,
        firstName: createAgentApplicationDto.firstName,
        LastName: createAgentApplicationDto.lastName,
        Email: createAgentApplicationDto.email,
        Phone: createAgentApplicationDto.phone,
        city: createAgentApplicationDto.city,
        Status: Status.PENDING,
        role: createAgentApplicationDto.role as ROLE,
        title: createAgentApplicationDto.title,
        resume: {
          create: {
            name: "resume",
            url: "createAgentApplicationDto.resume.path",
            size: "createAgentApplicationDto.resume.size",
          }
        },
      },
    });

    return newApplication;
  }

  async findAll() {
    return `This action returns all agentApplication`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} agentApplication`;
  }

  async update(id: number, updateAgentApplicationDto: UpdateAgentApplicationDto) {
    return `This action updates a #${id} agentApplication`;
  }

  async remove(id: number) {
    return `This action removes a #${id} agentApplication`;
  }
}
