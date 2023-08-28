import { Injectable } from '@nestjs/common';
import { CreateJointPrecentDto } from './dto/create-joint-precent.dto';
import { UpdateJointPrecentDto } from './dto/update-joint-precent.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AgentService } from 'src/agent/agent.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class JointPrecentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly agent: AgentService,
    private readonly cloud: CloudinaryService
  ) { }
  async create(body: CreateJointPrecentDto) {

    const promises = [
      this.agent.createEmployee(
        {
          title: body.title,
          firstName: body.firstName,
          LastName: body.LastName,
          role: "AGENT",
          Email: body.Email,
          designation: body.designation,
          city: body.city,
          password: "123456",
          Phone: body.Phone,
          workUnder: null
        }
      ),
      this.cloud.uploadBase64File(body.photo)
    ]
    const [n_agent, u_photo] = await Promise.all(promises)
    const n_appointment = await this.prisma.jointPercent.create({
      data: {
        agent: {
          connect: {
            id: +n_agent.id
          }
        },
        add_charge: body.add_charge,
        address: body.address,
        location: body.city,
        file_charge: body.file_charge,
        loan_amount: body.loan_amount,
        processing_fee: body.processing_fee,
        service_tax: body.service_tax,
        photo: u_photo.secure_url
      }

    })
    return n_appointment;
  }

  async findAll() {
    return await this.prisma.jointPercent.findMany({
      include: {
        agent: true
      }
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} jointPrecent`;
  }

  async update(id: number, updateJointPrecentDto: UpdateJointPrecentDto) {
    return `This action updates a #${id} jointPrecent`;
  }

  async remove(id: number) {
    return await this.prisma.jointPercent.delete({ where: { id } });
  }
}
