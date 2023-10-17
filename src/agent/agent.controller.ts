import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, UseGuards } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/decoretors/role.decorator';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Post('/employee')
  async create(@Body() createBody: CreateAgentDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Employee Created Successfully",
        data: await this.agentService.createEmployee(createBody)
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
  async findAll() {
    return {
      success: true,
      message: "All Agents Successfully",
      data: await this.agentService.findAll()
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get('/employee')
  async findAllEmployee() {
    return {
      success: true,
      message: "All Employees Successfully",
      data: await this.agentService.findAllEmployee()
    }

  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Employee Updated Successfully",
        data: await this.agentService.update(+id, updateAgentDto)
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
        message: "Employee Removed Successfully",
        data: await await this.agentService.remove(+id)
      }
    } catch (error) {
      res.status(error.status || 500)
      return {
        success: false,
        message: error.message,
        data: null
      }
    }
    return;
  }

}
