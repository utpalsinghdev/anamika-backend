import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLE } from '@prisma/client';
import { hash } from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AgentService {
  constructor(private readonly prisma: PrismaService, private readonly mail: MailService) { }

  async findAll() {
    const ag = await this.prisma.employee.findMany({
      where: {
        role: {
          not: "ADMIN"
        },
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
      orderBy: {
        id: 'desc'
      },
      include: {
        managedBy: true
      }
    })

    const last_application = applicationId[0]
    let a_id = "VFEID"
    if (!last_application?.employeeCode) {
      a_id = a_id + "0001"
    } else {
      const last_id = last_application.employeeCode
      const _id = last_id.split("VFEID")[1]
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
    const data = {
      message: `Congratulations! Welcome to Green Apple Financial Services Pvt. Ltd. Your Joining has been Accepted By Company. Your Login ID ${a_id} And Password is ${body.password}`,
      numbers: body.Phone
    }
    const res = await this.mail.sendSms(data)
    console.log(res)
    const { password, ...rest } = create_agent
    return rest;
  }

  async update(id: number, updateAgentDto: UpdateAgentDto) {
    const Get_age = await this.prisma.employee.findFirst({
      where: { id }
    })
    const update_agent = await this.prisma.employee.update({
      where: {
        id
      },
      data: {
        title: updateAgentDto.title || Get_age.title,
        firstName: updateAgentDto.firstName || Get_age.firstName,
        LastName: updateAgentDto.LastName || Get_age.LastName,
        role: updateAgentDto.role as ROLE || Get_age.role,
        email: updateAgentDto.Email || Get_age.email,
        designation: updateAgentDto.designation || Get_age.designation,
        phone: updateAgentDto.Phone || Get_age.phone,
        city: updateAgentDto.city || Get_age.city,
        password: updateAgentDto.password ? await hash(updateAgentDto.password, 10) : Get_age.password,
        managedById: Number(updateAgentDto.workUnder) || Get_age.managedById || null
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
        }
      }
    });

    const { password, ...rest } = update_agent

    return rest
  }

  async remove(id: number) {
    const f_em = await this.prisma.employee.update({
      where: {
        id
      },
      data: {
        park: true,
      },
      include: {
        managing: true
      }
    });
    const managedEmployeeIds = f_em.managing.map((employee) => employee.id);
    const updatAl = await this.prisma.employee.updateMany(

      {
        where: {
          id: {
            in: managedEmployeeIds,
          },
        },
        data: {
          managedById: null
        }
      }
    )

    return updatAl
  }
}
