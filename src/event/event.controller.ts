import { Controller, Get, Post, Body, Patch, Res, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/decoretors/role.decorator';
import { Response } from 'express';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Post()
  async create(@Body() createEventDto: CreateEventDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Event Created Successfully",
        data: await this.eventService.create(createEventDto)
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
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: CreateEventDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "Event Updated Successfully",
        data: await this.eventService.update(+id, updateEventDto)
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

  @Delete(':id')
  async remove(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    try {
      const devent = await this.eventService.remove(+id);
      res.status(200)
      return devent
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
