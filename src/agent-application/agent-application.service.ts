import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgentApplicationDto } from './dto/create-agent-application.dto';
import { UpdateAgentApplicationDto } from './dto/update-agent-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GuardianRelation, ROLE, Status } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { hash } from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import mailEnums from 'src/utils/mailEnumbs';

@Injectable()
export class AgentApplicationService {
  constructor(private readonly prisma: PrismaService,
    private readonly cloud: CloudinaryService, private readonly mail: MailService) { }
  async create(createAgentApplicationDto: CreateAgentApplicationDto,) {


    let a_id = await this._employeeCode()
    const [uploadedFile, _profilePic] = await Promise.all([
      this.cloud.uploadBase64File(createAgentApplicationDto.resume),
      this.cloud.uploadBase64File(createAgentApplicationDto.profilePic)
    ]);
    const newApplication = await this.prisma.careerApplication.create({
      data: {
        ApplicationID: a_id,
        firstName: createAgentApplicationDto.firstName,
        LastName: createAgentApplicationDto.lastName,
        Email: createAgentApplicationDto.email,
        Phone: createAgentApplicationDto.phone,
        location: createAgentApplicationDto.location,
        guardian_name: createAgentApplicationDto.guardian_name,
        address: createAgentApplicationDto.address,
        guradian_relation: createAgentApplicationDto.guradian_relation as GuardianRelation,
        city: createAgentApplicationDto.city,
        profilePic: _profilePic?.secure_url,
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
        Status: "PENDING"
      }
    })
    if (!get_application) throw new HttpException("Application not Found", HttpStatus.NOT_FOUND)
    let a_id = await this._employeeCode()
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
        profilePic: body.profilePic ? body.profilePic : get_application.profilePic,
        city: body.city,
        employeeCode: a_id,
        location: body.location || "",
        address: body.address || "",
        guardian_name: body.guardian_name || null,
        guradian_relation: body.guradian_relation as GuardianRelation || null,
        password: await hash(body.password, 10),
        e_password: body.password,
        managedById: Number(body.workUnder) || null
      }
    })
    await this.prisma.careerApplication.update({
      where: {
        id
      },
      data: {
        Status: "APPROVED",
        approvedAt: new Date().toISOString().slice(0, -1) + "Z"
      }
    })

    /**
    *? Need To Send Message to Inform about Selection
    * 
    *? And Need to Send EmployeeCode and Their Password
    */
    await this.mail.sendSms({
      numbers: body.Phone,
      type: mailEnums.JOINING.toString(),
      value: `${body.title} ${body.firstName} ${body.LastName}|${a_id}|${body.password}`
    })
    const { password, status, ...rest } = create_agent
    return rest;
  }

  async reject(id: number) {
    const get_application = await this.prisma.careerApplication.findFirst({
      where: {
        id,

        Status: "PENDING"
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
  private async _employeeCode(): Promise<string> {
    let uniqueCode = '';
    let isUnique = false;

    while (!isUnique) {
      const randomPin = Math.floor(10000 + Math.random() * 90000).toString();
      const employeeCode = `EFID${randomPin}`;

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
