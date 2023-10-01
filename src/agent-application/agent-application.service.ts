import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgentApplicationDto } from './dto/create-agent-application.dto';
import { UpdateAgentApplicationDto } from './dto/update-agent-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLE, Status } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import moment from 'moment';
import { hash } from 'bcrypt';

@Injectable()
export class AgentApplicationService {
  constructor(private readonly prisma: PrismaService,
    private readonly cloud: CloudinaryService) { }
  async create(createAgentApplicationDto: CreateAgentApplicationDto,) {


    const applicationId = await this.prisma.careerApplication.findMany({
      take: 1,
      orderBy: {
        id: 'desc'
      }
    })
    const last_application = applicationId[0]
    let a_id = "APID"
    if (!last_application?.ApplicationID) {
      a_id = a_id + "0001"
    } else {
      const last_id = last_application.ApplicationID
      const _id = last_id.split("APID")[1]
      const id = parseInt(_id) + 1
      a_id = a_id + id.toString().padStart(4, '0')
    }
    const uploadedFile = await this.cloud.uploadBase64File(createAgentApplicationDto.resume);

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
            url: uploadedFile?.secure_url,
          }

        },
      },

    })
    /**
       ** Need To Send Message to Inform about application id
       * 
       */
    return newApplication;
  }

  async findAll() {

    return await this.prisma.careerApplication.findMany({
      where: {
        Status: "PENDING"
      },
      include: {
        resume: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} agentApplication`;
  }

  async approve(id: number, body: UpdateAgentApplicationDto) {
    const get_application = await this.prisma.careerApplication.findFirst({
      where: {
        id,
        Status: {
          not: "APPROVED" || "REJECTED"
        }
      }
    })
    if (!get_application) throw new HttpException("Application not Found", HttpStatus.NOT_FOUND)

    await this.prisma.careerApplication.update({
      where: {
        id
      },
      data: {
        Status: "APPROVED",
        approvedAt: new Date().toISOString().slice(0, -1) + "Z"
      }
    })
    const applicationId = await this.prisma.employee.findMany({
      take: 1,
      where: {
        park: false,
      },
      orderBy: {
        id: 'desc'
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
    /**
    *? Need To Send Message to Inform about Selection
    * 
    *? And Need to Send EmployeeCode and Their Password
    */
    const { password, status, ...rest } = create_agent
    return rest;
  }

  async reject(id: number) {
    const get_application = await this.prisma.careerApplication.findFirst({
      where: {
        id,

        Status: {
          not: "APPROVED" || "REJECTED"
        }
      }
    })
    if (!get_application) throw new HttpException("Application not Found", HttpStatus.NOT_FOUND)
    /**
     *! Need To Send Message to Inform about Rejection
     */
    return await this.prisma.careerApplication.update({
      where: {
        id
      },
      data: {
        Status: "REJECTED",
      }
    })

  }
}
