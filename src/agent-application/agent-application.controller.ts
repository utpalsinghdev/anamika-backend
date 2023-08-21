import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, HttpException, HttpStatus, HttpCode, Res, UseGuards } from '@nestjs/common';
import { AgentApplicationService } from './agent-application.service';
import { CreateAgentApplicationDto } from './dto/create-agent-application.dto';
import { UpdateAgentApplicationDto } from './dto/update-agent-application.dto';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/decoretors/role.decorator';
import { ROLE } from '@prisma/client';

@Controller('agent-application')
export class AgentApplicationController {
  constructor(private readonly prisma: PrismaService, private readonly agentApplicationService: AgentApplicationService,
  ) { }

  @Post()
  @HttpCode(200)
  async create(@Body() createAgentApplicationDto: CreateAgentApplicationDto, @Res({ passthrough: true }) res: Response) {
    try {
      const findEmail = await this.prisma.careerApplication.findFirst({
        where: {
          Email: createAgentApplicationDto.email,
        },
      });
      if (!!findEmail) {
        throw new HttpException('Your Form is already Submitted', HttpStatus.CONFLICT);
      }

      const findPhone = await this.prisma.careerApplication.findFirst({
        where: {
          Phone: createAgentApplicationDto.phone,
        },
      });
      if (!!findPhone) {
        throw new HttpException('Your Form is already Submitted', HttpStatus.BAD_REQUEST);
      }
     await this.agentApplicationService.create(createAgentApplicationDto);
      return {
        success: true,
        message: 'Your application has been submitted successfully, we will get back to you soon',
        data: {}
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get()
  async findAll() {
    try {
      return {
        success: true,
        message: 'All Job Application Fetched',
        data: await this.agentApplicationService.findAll()
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Post(':id')
  async update(@Param('id') id: string, @Body() updatePayload: UpdateAgentApplicationDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: 'Employee Added Successfully',
        data: await this.agentApplicationService.approve(+id, updatePayload)
      }

    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null,
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
        message: 'Application Rejected',
        data: await this.agentApplicationService.reject(+id)
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }
}
