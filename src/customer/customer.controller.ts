import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ROLE } from '@prisma/client';
import { Response } from 'express';
import { Roles } from 'src/decoretors/role.decorator';

@Controller('customer')
export class CustomerController {
  constructor(private readonly newService: CustomerService) { }

  @Post()
  async create(@Body() createNewDto: CreateCustomerDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Loan Application Submitted Successfully",
        data: await this.newService.create(createNewDto)
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


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "All Loan Application Fetched",
        data: await this.newService.findAll()
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


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "One Application",
        data: await this.newService.findOne(+id)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNewDto: UpdateCustomerDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Application Approved",
        data: await this.newService.update(+id, updateNewDto)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Application Rejected",
        data: await this.newService.remove(+id)
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
