import { Controller, Get, Res, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentqrService } from './paymentqr.service';
import { CreatePaymentqrDto } from './dto/create-paymentqr.dto';
import { UpdatePaymentqrDto } from './dto/update-paymentqr.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/decoretors/role.decorator';
import { Response } from 'express';

@Controller('payment-qr')
export class PaymentqrController {
  constructor(private readonly paymentqrService: PaymentqrService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Post()
  async create(@Body() createPaymentqrDto: CreatePaymentqrDto, @Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "News Created Successfully",
        data: await this.paymentqrService.create(createPaymentqrDto)
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
  findAll(@Res({ passthrough: true }) res: Response) {
    try {
      return {
        success: true,
        message: "All News Fetched",
        data: this.paymentqrService.getQR()
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
