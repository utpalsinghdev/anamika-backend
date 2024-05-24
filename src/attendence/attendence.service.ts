import { Injectable } from '@nestjs/common';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { UpdateAttendenceDto } from './dto/update-attendence.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ATTENDANCE } from '@prisma/client';

@Injectable()
export class AttendenceService {
  constructor(
    private readonly prisma: PrismaService
  ) { }


  async findAll() {
    return await this.prisma.attendance.findMany(
      {
        include: {
          employee: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    )
  }

  async punchIn(userId: number) {
    return await this.prisma.attendance.create(
      {
        data: {
          employeeId: userId,
          status: ATTENDANCE.PENDING
        }
      }
    )
  }

  async markPresent(userId: number) {
    return await this.prisma.attendance.update(
      {
        where: {
          id: userId
        },
        data: {
          status: ATTENDANCE.PRESENT
        }
      }
    )
  }

  async markAbsent(userId: number) {
    return await this.prisma.attendance.update(
      {
        where: {
          id: userId
        },
        data: {
          status: ATTENDANCE.ABSENT
        }
      }
    )
  }


}
