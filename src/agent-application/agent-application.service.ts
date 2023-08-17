import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgentApplicationDto } from './dto/create-agent-application.dto';
import { UpdateAgentApplicationDto } from './dto/update-agent-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLE, Status } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

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
    console.log(uploadedFile)
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
    console.log(newApplication)

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
