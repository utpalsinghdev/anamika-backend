import { Controller, Get, Res, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AttendenceService } from './attendence.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/decoretors/role.decorator';
import { ROLE } from '@prisma/client';
import { jwtDecode } from 'jwt-decode';

@Controller('attendence')
export class AttendenceController {
  constructor(private readonly attendenceService: AttendenceService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "All Attendence Fetched",
        data: await this.attendenceService.findAll()
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
  @Roles(ROLE.AGENT, ROLE.DEALERSHIP, ROLE.FEILDOFFICER)
  @Get("/punch-in/:userId")
  async punchIn(@Res({ passthrough: true }) res: Response, @Param('userId') userId: string) {
    try {
      const user_id = Number(userId)
      return {
        success: true,
        message: "Punched In Successfully",
        data: await this.attendenceService.punchIn(user_id)
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
  @Get("/mark-present/:userId")
  async markPresent(@Res({ passthrough: true }) res: Response, @Param('userId') userId: string) {
    try {
      const user_id = Number(userId)
      return {
        success: true,
        message: "Marked Present Successfully",
        data: await this.attendenceService.markPresent(user_id)
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
  @Roles(ROLE.AGENT, ROLE.DEALERSHIP, ROLE.FEILDOFFICER)
  @Get("/one")
  async findOne(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const user: any = await jwtDecode(token)
      return {
        success: true,
        message: "Attendence Fetched",
        data: await this.attendenceService.findOne(+user.id)
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
  @Get("/mark-absent/:userId")
  async markAbsent(@Res({ passthrough: true }) res: Response, @Param('userId') userId: string) {
    try {
      const user_id = Number(userId)
      return {
        success: true,
        message: "Marked Absent Successfully",
        data: await this.attendenceService.markAbsent(user_id)
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
