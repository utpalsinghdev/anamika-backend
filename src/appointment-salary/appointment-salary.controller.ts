import { Controller, Get, Post, Body, Patch, Param,Res, Delete, UseGuards } from '@nestjs/common';
import { AppointmentSalaryService } from './appointment-salary.service';
import { CreateAppointmentSalaryDto } from './dto/create-appointment-salary.dto';
import { UpdateAppointmentSalaryDto } from './dto/update-appointment-salary.dto';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/decoretors/role.decorator';
import { Response } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE.ADMIN)
@Controller('appointment-salary')
export class AppointmentSalaryController {
  constructor(private readonly appointmentSalaryService: AppointmentSalaryService) {}

  @Post()
  async create(@Body() createIcardDto: CreateAppointmentSalaryDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Appointment Letter Created Successfully",
        data: await this.appointmentSalaryService.create(createIcardDto)
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null
      }

    }
  }

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "All Appointment Letter Fetched",
        data: await this.appointmentSalaryService.findAll()
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null
      }

    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Appointment Letter Fetched",
        data: await this.appointmentSalaryService.findOne(+id)

      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null
      }

    }
  }

  @Patch(':id')
  async update(@Param('id',) id: string, @Body() updateIcardDto: UpdateAppointmentSalaryDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Appointment Letter Updated Successfully",
        data: await this.appointmentSalaryService.update(+id, updateIcardDto)
      }
    } catch (error) {
      res.status
      return {
        success: false,
        message: error.message,
        data: null
      }

    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Appointment Letter Deleted Successfully",
        data: await this.appointmentSalaryService.remove(+id)
      }
    } catch (error) {
      res.status
      return {
        success: false,
        message: error.message,
        data: null
      }

    }
  }
}
