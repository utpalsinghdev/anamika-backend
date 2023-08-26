import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { IcardService } from './icard.service';
import { CreateIcardDto } from './dto/create-icard.dto';
import { UpdateIcardDto } from './dto/update-icard.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/decoretors/role.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLE.ADMIN)
@Controller('icard')
export class IcardController {
  constructor(private readonly icardService: IcardService) { }

  @Post()
  async create(@Body() createIcardDto: CreateIcardDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Icard Created Successfully",
        data: await this.icardService.create(createIcardDto)
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
        message: "All Icards Fetched",
        data: await this.icardService.findAll()
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
        message: "Icard Fetched",
        data: await this.icardService.findOne(+id)

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
  async update(@Param('id',) id: string, @Body() updateIcardDto: UpdateIcardDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Icard Updated Successfully",
        data: await this.icardService.update(+id, updateIcardDto)
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
        message: "Icard Deleted Successfully",
        data: await this.icardService.remove(+id)
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
