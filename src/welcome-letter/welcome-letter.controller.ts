import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { WelcomeLetterService } from './welcome-letter.service';
import { CreateWelcomeLetterDto } from './dto/create-welcome-letter.dto';
import { UpdateWelcomeLetterDto } from './dto/update-welcome-letter.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/decoretors/role.decorator';
import { CreateWelomeCustomerDto } from './dto/welcome-manual.dto';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('welcome-letter')
export class WelcomeLetterController {
  constructor(private readonly welcomeLetterService: WelcomeLetterService) { }
  @Roles(ROLE.ADMIN)

  @Post()
  async create(@Body() createWelcomeLetterDto: CreateWelcomeLetterDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Welcome Letter Created Successfully",
        data: await this.welcomeLetterService.create(createWelcomeLetterDto)
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
  @Post('/manual')
  async manual(@Body() CreateWelomeCustomerDto: CreateWelomeCustomerDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Welcome Letter Created Successfully",
        data: await this.welcomeLetterService.createManual(CreateWelomeCustomerDto)
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
        message: "Welcome Letted Fetched",
        data: await this.welcomeLetterService.findAll()
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

  @Roles(ROLE.ADMIN, ROLE.AGENT, ROLE.CUSTOMER, ROLE.DEALERSHIP, ROLE.FEILDOFFICER)

  @Get(':id')
  async findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "One Welcome Letted Fetched",
        data: await this.welcomeLetterService.findOne(+id)
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
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWelcomeLetterDto: UpdateWelcomeLetterDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Welcome Letted Updated",
        data: await this.welcomeLetterService.update(+id, updateWelcomeLetterDto)
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
  @Delete(':id')
  async remove(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Welcome Letted Deleted",
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
