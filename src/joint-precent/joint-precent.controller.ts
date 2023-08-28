import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { JointPrecentService } from './joint-precent.service';
import { CreateJointPrecentDto } from './dto/create-joint-precent.dto';
import { UpdateJointPrecentDto } from './dto/update-joint-precent.dto';
import { Response } from 'express';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/decoretors/role.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('joint-precent')
export class JointPrecentController {
  constructor(private readonly jointPrecentService: JointPrecentService) { }
  @Roles(ROLE.ADMIN)
  @Post()
  async create(@Body() createJointPrecentDto: CreateJointPrecentDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: `${createJointPrecentDto.designation} Created SuccessFully !`,
        data: await this.jointPrecentService.create(createJointPrecentDto)
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
  @Roles(ROLE.ADMIN)
  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: `DSA/DMA Fetched SuccessFully !`,
        data: await this.jointPrecentService.findAll()
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null
      }
    }
    return
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jointPrecentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJointPrecentDto: UpdateJointPrecentDto) {
    return this.jointPrecentService.update(+id, updateJointPrecentDto);
  }

  @Roles(ROLE.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: `Letter Deleted SuccessFully !`,
        data: await this.jointPrecentService.remove(+id)
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
}
