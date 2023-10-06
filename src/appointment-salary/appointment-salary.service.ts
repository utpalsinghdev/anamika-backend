import { Injectable } from '@nestjs/common';
import { CreateAppointmentSalaryDto } from './dto/create-appointment-salary.dto';
import { UpdateAppointmentSalaryDto } from './dto/update-appointment-salary.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GuardianRelation } from '@prisma/client';

@Injectable()
export class AppointmentSalaryService {
  constructor(private readonly prisma: PrismaService,
    private readonly cloud: CloudinaryService) { }
  async create(createAppointmentSalaryDto: CreateAppointmentSalaryDto) {
    const img = await this.cloud.uploadBase64File(createAppointmentSalaryDto.photo)
    createAppointmentSalaryDto.photo = img.secure_url

    return await this.prisma.appointmentSalary.create({
      data: {
        ...createAppointmentSalaryDto,
        guradian_relation: createAppointmentSalaryDto.guradian_relation ? createAppointmentSalaryDto.guradian_relation as GuardianRelation : null
      },
      select: {
        agent: true
      }
    });
  }

  async findAll() {
    return await this.prisma.appointmentSalary.findMany({
      include: {
        agent: {
          include: {
            managedBy: true
          }
        }
      }
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} appointmentSalary`;
  }

  async update(id: number, updateAppointmentSalaryDto: UpdateAppointmentSalaryDto) {
    return `This action updates a #${id} appointmentSalary`;
  }

  async remove(id: number) {
    return await this.prisma.appointmentSalary.delete({ where: { id } });
  }
}
