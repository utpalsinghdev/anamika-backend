import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLE } from '@prisma/client';
import { hash } from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AgentService {
  constructor(private readonly prisma: PrismaService, private readonly mail: MailService, private readonly cloud: CloudinaryService) { }

  async findAll() {
    const ag = await this.prisma.employee.findMany({
      where: {
        role: {
          not: "ADMIN"
        },
        park: false
      },
      include: {
        AppointmentSalary: true
      },
      orderBy: {
        id: "desc"
      },

    });
    return ag?.map((e) => {
      let { password, email, city, designation, resumeId, park, managedById, joinedAt, createdAt, updatedAt, ...rest } = e
      rest.profilePic = rest.profilePic ? rest.profilePic : rest.AppointmentSalary.length > 0 ? rest.AppointmentSalary?.[0].photo : null
      rest.phone = this._numberMaster(rest.phone)
      delete rest.AppointmentSalary
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

    let a_id = await this._employeeCode()
    let img: string
    if (body.profilePic) {
      const _profile = await this.cloud.uploadBase64File(body.profilePic)
      img = _profile.secure_url
    }
    const create_agent = await this.prisma.employee.create({
      data: {
        title: body.title,
        firstName: body.firstName,
        LastName: body.LastName,
        role: body.role as ROLE,
        email: body.Email,
        profilePic: img,
        displayPic: img,
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
    let img: string
    if (updateAgentDto.profilePic) {
      const _profile = await this.cloud.uploadBase64File(updateAgentDto.profilePic)
      img = _profile.secure_url
    }
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
        profilePic: img ? img : Get_age.profilePic,
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

  private _numberMaster(number: string | undefined) {
    return `${number?.slice(0, 5) || ''}XXXXX${number?.slice(10)}`
  }

  private async _employeeCode(): Promise<string> {
    let uniqueCode = '';
    let isUnique = false;

    while (!isUnique) {
      const randomPin = Math.floor(10000 + Math.random() * 90000).toString();
      const employeeCode = `FFPVT${randomPin}`;

      const agents = await this.prisma.employee.findUnique({
        where: {
          employeeCode,
        },
      });

      if (!agents) {
        uniqueCode = employeeCode;
        isUnique = true;
      }
    }

    return uniqueCode;
  }
}
