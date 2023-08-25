import { Module } from '@nestjs/common';
import { AppointmentSalaryService } from './appointment-salary.service';
import { AppointmentSalaryController } from './appointment-salary.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [AppointmentSalaryController],
  providers: [AppointmentSalaryService, PrismaService, CloudinaryService],
})
export class AppointmentSalaryModule {}
