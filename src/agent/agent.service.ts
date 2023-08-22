import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLE } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class AgentService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    const ag = await this.prisma.employee.findMany({
      where: {
        role: "AGENT",
        park: false
      },
      orderBy: {
        id: "desc"
      },

    });
    return ag?.map((e) => {
      let { password, ...rest } = e
      return rest
    })
  }

  async findAllEmployee() {
    const em = await this.prisma.employee.findMany({
      where: {
        role: {
          not: "ADMIN",

        },
        park: false,
      },
      orderBy: {
        id: "desc"
      },
      include: {
        managedBy: {
          select: {
            id: true,
            title: true,
            firstName: true,
            LastName: true,
            email: true,
            employeeCode: true
          }
        },
        managing: {
          select: {
            id: true,
            title: true,
            firstName: true,
            LastName: true,
            email: true,
            employeeCode: true

          }
        }
      },
    });
    return em?.map((e) => {
      let { password, ...rest } = e
      return rest
    })
  }

  async createEmployee(body: CreateAgentDto) {
    const applicationId = await this.prisma.employee.findMany({
      take: 1,
      where: {
        park: false,
      },
      orderBy: {
        id: 'desc'
      },
      include: {
        managedBy: true
      }
    })

    const last_application = applicationId[0]
    let a_id = "EMID"
    if (!last_application?.employeeCode) {
      a_id = a_id + "0001"
    } else {
      const last_id = last_application.employeeCode
      const _id = last_id.split("EMID")[1]
      const id = parseInt(_id) + 1
      a_id = a_id + id.toString().padStart(4, '0')
    }

    const create_agent = await this.prisma.employee.create({
      data: {
        title: body.title,
        firstName: body.firstName,
        LastName: body.LastName,
        role: body.role as ROLE,
        email: body.Email,
        status: "APPROVED",
        joinedAt: new Date().toISOString().slice(0, -1) + "Z",
        designation: body.designation,
        phone: body.Phone,
        city: body.city,
        employeeCode: a_id,
        password: await hash(body.password, 10),
        managedById: Number(body.workUnder) || null
      }
    })
    const { password, ...rest } = create_agent
    return rest;
  }

  update(id: number, updateAgentDto: UpdateAgentDto) {
    return `This action updates a #${id} agent`;
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
