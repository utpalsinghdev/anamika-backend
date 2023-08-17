import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, HttpException, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { AgentApplicationService } from './agent-application.service';
import { CreateAgentApplicationDto } from './dto/create-agent-application.dto';
import { UpdateAgentApplicationDto } from './dto/update-agent-application.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

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
      this.agentApplicationService.create(createAgentApplicationDto);
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

  @Get()
  async findAll() {
    try {
      return await this.agentApplicationService.findAll();
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.agentApplicationService.findOne(+id);
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAgentApplicationDto: UpdateAgentApplicationDto) {
    try {
      return await this.agentApplicationService.update(+id, updateAgentApplicationDto);
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.agentApplicationService.remove(+id);
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      }
    }
  }
}
