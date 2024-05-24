import { Injectable } from '@nestjs/common';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { UpdateAttendenceDto } from './dto/update-attendence.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ATTENDANCE } from '@prisma/client';
import moment from 'moment';

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
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const isAlreadyForToday = await this.prisma.attendance.findFirst(
      {
        where: {
          employeeId: userId,
          createdAt: {
            gte: startOfDay,
            lte: endOfDay
          }
        }
      }
    )
    if (isAlreadyForToday) {
      throw {
        status: 400,
        message: "Already punched in for today"
      }
    } else return await this.prisma.attendance.create(
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
